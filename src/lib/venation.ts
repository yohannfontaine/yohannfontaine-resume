/**
 * « La rencontre » — les illustrations du site, générées par le code.
 *
 * Deux structures poussent l'une vers l'autre par colonisation de l'espace
 * (Runions & al., 2005) : l'algorithme qui produit la nervation d'une feuille.
 * À gauche elle pousse libre, à droite ses directions sont contraintes à des
 * multiples de 45° — et devient un tracé de circuit. Même algorithme, deux
 * contraintes : c'est ça, la symbiose, et non deux dessins collés.
 *
 * Aucune dépendance, aucune image sous licence, sortie SVG déterministe.
 * Ce module ne doit rien importer : il est exécuté tel quel par Node pour les
 * prévisualisations, et par Astro au build.
 */

/** mulberry32 : reproductible d'une exécution à l'autre. */
function rng(seed: number): () => number {
  let a = seed >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

const r1 = (n: number) => Math.round(n * 10) / 10;

interface Node {
  x: number;
  y: number;
  parent: number;
  /** Nombre de descendants : donne l'épaisseur, comme la sève ou le courant. */
  weight: number;
  organic: boolean;
}

export interface Figure {
  svg: string;
  width: number;
  height: number;
  nodes: number;
  /** Ponts effectivement formés entre les deux structures. */
  contacts: number;
}

export interface FigureOptions {
  width?: number;
  height?: number;
  seed?: number;
  /** 0 = tout organique, 1 = tout machine. 0.5 = la rencontre. */
  balance?: number;
  /** Densité du semis : plus haut = structure plus fournie. */
  density?: number;
  /** Affiche la lueur de contact au centre. */
  bloom?: boolean;
  /** Impulsions de lumière circulant le long des nervures. */
  flow?: boolean;
  /** `slice` recadre comme `object-fit: cover`, `meet` montre tout. */
  fit?: "meet" | "slice";
  /** Révélation génération par génération au chargement. */
  grow?: boolean;
}

/** Grille uniforme : la recherche du nœud le plus proche est le coût dominant. */
class Grid {
  cell: number;
  cols: number;
  rows: number;
  buckets: number[][];

  constructor(w: number, h: number, cell: number) {
    this.cell = cell;
    this.cols = Math.ceil(w / cell) + 1;
    this.rows = Math.ceil(h / cell) + 1;
    this.buckets = Array.from({ length: this.cols * this.rows }, () => []);
  }

  add(x: number, y: number, i: number) {
    const c = Math.max(0, Math.min(this.cols - 1, Math.floor(x / this.cell)));
    const r = Math.max(0, Math.min(this.rows - 1, Math.floor(y / this.cell)));
    this.buckets[r * this.cols + c]!.push(i);
  }

  near(x: number, y: number, radius: number): number[] {
    const span = Math.ceil(radius / this.cell);
    const c = Math.floor(x / this.cell);
    const r = Math.floor(y / this.cell);
    const out: number[] = [];
    for (let rr = r - span; rr <= r + span; rr++) {
      if (rr < 0 || rr >= this.rows) continue;
      for (let cc = c - span; cc <= c + span; cc++) {
        if (cc < 0 || cc >= this.cols) continue;
        const b = this.buckets[rr * this.cols + cc];
        if (b) out.push(...b);
      }
    }
    return out;
  }
}

export function generateFigure(options: FigureOptions = {}): Figure {
  const W = options.width ?? 1600;
  const H = options.height ?? 1000;
  const seed = options.seed ?? 1;
  const balance = options.balance ?? 0.5;
  const density = options.density ?? 1;
  const bloom = options.bloom ?? true;
  const flow = options.flow ?? true;
  const grow = options.grow ?? false;

  const random = rng(seed);
  const meetX = W * balance;

  // ------------------------------------------------------------ attracteurs
  interface Attractor {
    x: number;
    y: number;
    organic: boolean;
    alive: boolean;
  }
  const attractors: Attractor[] = [];

  /**
   * Le vide au milieu est la pièce maîtresse. Sans lui, les deux structures
   * s'interpénètrent et il n'y a plus de rencontre — juste une superposition.
   * Chaque camp pousse jusqu'au bord de ce couloir et s'y arrête.
   */
  const gap = W * 0.085;
  const oEdge = meetX - gap / 2;
  const mEdge = meetX + gap / 2;

  // Côté vivant : nuage elliptique, densité décroissante vers les bords.
  const organicCount = Math.round(1250 * density);
  const oCx = oEdge * 0.5;
  const oCy = H * 0.5;
  const oRx = oEdge * 0.92;
  const oRy = H * 0.44;
  for (let i = 0; i < organicCount; i++) {
    const t = random() * Math.PI * 2;
    // Racine carrée du rayon = répartition uniforme dans le disque ; sans elle
    // tout s'agglutine au centre.
    const rad = Math.sqrt(random());
    const x = oCx + Math.cos(t) * rad * oRx;
    const y = oCy + Math.sin(t) * rad * oRy;
    if (x < 6 || x > oEdge || y < 6 || y > H - 6) continue;
    attractors.push({ x, y, organic: true, alive: true });
  }

  // Côté machine : une trame régulière, pas un nuage. C'est la trame qui rend
  // le tracé « fabriqué » avant même que les angles ne soient contraints.
  const pitch = 32 / Math.sqrt(density);
  for (let x = mEdge; x < W - pitch * 0.5; x += pitch) {
    for (let y = H * 0.06; y < H * 0.94; y += pitch) {
      if (random() > 0.74) continue;
      const dx = (x - mEdge) / (W - mEdge);
      const dy = (y - H / 2) / (H / 2);
      // Bord droit dégarni : la structure s'ouvre en éventail vers le centre.
      if (dx * dx * 0.85 + dy * dy * 0.85 > 1) continue;
      attractors.push({ x, y, organic: false, alive: true });
    }
  }

  // ------------------------------------------------------------- croissance
  const nodes: Node[] = [
    { x: 4, y: H * 0.56, parent: -1, weight: 0, organic: true },
    { x: W - 4, y: H * 0.46, parent: -1, weight: 0, organic: false },
  ];

  const grid = new Grid(W, H, 40);
  grid.add(nodes[0]!.x, nodes[0]!.y, 0);
  grid.add(nodes[1]!.x, nodes[1]!.y, 1);

  const ATTRACT = 190;
  const KILL = 17;
  const STEP_ORGANIC = 11;
  const STEP_MACHINE = 15;

  for (let iter = 0; iter < 320; iter++) {
    // Chaque attracteur tire le nœud le plus proche de son propre camp.
    const pull = new Map<number, { x: number; y: number; n: number }>();
    let alive = 0;

    for (const a of attractors) {
      if (!a.alive) continue;
      alive++;
      let best = -1;
      let bestD = ATTRACT * ATTRACT;
      for (const i of grid.near(a.x, a.y, ATTRACT)) {
        const n = nodes[i]!;
        if (n.organic !== a.organic) continue;
        const d = (n.x - a.x) ** 2 + (n.y - a.y) ** 2;
        if (d < bestD) {
          bestD = d;
          best = i;
        }
      }
      if (best < 0) continue;
      const n = nodes[best]!;
      const len = Math.hypot(a.x - n.x, a.y - n.y) || 1;
      const acc = pull.get(best) ?? { x: 0, y: 0, n: 0 };
      acc.x += (a.x - n.x) / len;
      acc.y += (a.y - n.y) / len;
      acc.n++;
      pull.set(best, acc);
    }

    if (alive === 0 || pull.size === 0) break;

    for (const [i, acc] of pull) {
      const parent = nodes[i]!;
      let dx = acc.x / acc.n;
      let dy = acc.y / acc.n;
      const len = Math.hypot(dx, dy) || 1;
      dx /= len;
      dy /= len;

      let step: number;
      if (parent.organic) {
        // Léger désordre : sans lui, la nervation est trop lisse pour être
        // vivante.
        const j = (random() - 0.5) * 0.28;
        const c = Math.cos(j);
        const s = Math.sin(j);
        [dx, dy] = [dx * c - dy * s, dx * s + dy * c];
        step = STEP_ORGANIC;
      } else {
        // Quantification à 45° : la seule différence de règle entre les deux
        // moitiés du dessin.
        const snapped = Math.round(Math.atan2(dy, dx) / (Math.PI / 4)) * (Math.PI / 4);
        dx = Math.cos(snapped);
        dy = Math.sin(snapped);
        step = STEP_MACHINE;
      }

      const nx = parent.x + dx * step;
      const ny = parent.y + dy * step;
      if (nx < 0 || nx > W || ny < 0 || ny > H) continue;

      nodes.push({ x: nx, y: ny, parent: i, weight: 0, organic: parent.organic });
      grid.add(nx, ny, nodes.length - 1);
    }

    for (const a of attractors) {
      if (!a.alive) continue;
      for (const i of grid.near(a.x, a.y, KILL)) {
        const n = nodes[i]!;
        if (n.organic !== a.organic) continue;
        if ((n.x - a.x) ** 2 + (n.y - a.y) ** 2 < KILL * KILL) {
          a.alive = false;
          break;
        }
      }
    }
  }

  // Épaisseur : chaque nœud transmet son poids à son parent, des extrémités
  // vers la racine. Un tronc porte tout ce qui pousse dessus.
  for (let i = nodes.length - 1; i > 0; i--) {
    const n = nodes[i]!;
    n.weight += 1;
    if (n.parent >= 0) nodes[n.parent]!.weight += n.weight;
  }

  // --------------------------------------------------------------- rendu
  const maxWeight = Math.max(...nodes.map((n) => n.weight), 1);
  const strokeFor = (w: number) => r1(0.9 + 5.4 * Math.pow(w / maxWeight, 0.42));

  /**
   * Les segments sont recousus en polylignes : un rameau qui ne bifurque pas
   * est un seul `d`, pas trente. Sur le côté machine, dont les tracés sont
   * longs et rectilignes, le gain est décisif — et l'épaisseur est de toute
   * façon constante le long d'une branche, donc rien n'est perdu.
   */
  const children: number[][] = Array.from({ length: nodes.length }, () => []);
  for (let i = 2; i < nodes.length; i++) children[nodes[i]!.parent]!.push(i);

  /**
   * Les tracés sont rangés par génération. L'indice d'un nœud est exactement
   * son rang de création : les regrouper par tranches d'indice, c'est rejouer
   * la chronologie réelle de la pousse. C'est ce qui permet à l'animation de
   * révélation de partir des deux racines et de converger vers le centre, au
   * lieu de faire apparaître la figure d'un bloc.
   */
  const GENERATIONS = 18;
  const buckets = new Map<string, string[]>();
  const ri = Math.round;
  for (let i = 2; i < nodes.length; i++) {
    const parent = nodes[i]!.parent;
    // Une chaîne démarre après une bifurcation ou à la racine.
    if (parent >= 2 && children[parent]!.length === 1) continue;

    const chain = [nodes[parent]!, nodes[i]!];
    let cur = i;
    while (children[cur]!.length === 1) {
      cur = children[cur]![0]!;
      chain.push(nodes[cur]!);
    }

    const sw = Math.round(strokeFor(nodes[i]!.weight) * 2) / 2;
    const gen = Math.min(GENERATIONS - 1, Math.floor((i / nodes.length) * GENERATIONS));
    const d =
      `M${ri(chain[0]!.x)} ${ri(chain[0]!.y)}` +
      chain
        .slice(1)
        .map((n) => `L${ri(n.x)} ${ri(n.y)}`)
        .join("");
    const key = `${gen}|${sw}`;
    const list = buckets.get(key) ?? [];
    list.push(d);
    buckets.set(key, list);
  }

  const genGroups: string[] = [];
  for (let g = 0; g < GENERATIONS; g++) {
    const inner = [...buckets.entries()]
      .filter(([k]) => k.startsWith(`${g}|`))
      .sort((a, b) => Number(b[0].split("|")[1]) - Number(a[0].split("|")[1]))
      .map(([k, cmds]) => `<path d="${cmds.join("")}" stroke-width="${k.split("|")[1]}"/>`)
      .join("");
    genGroups.push(`<g id="g${g}">${inner}</g>`);
  }

  // Les couches de lueur réutilisent les mêmes groupes. Le filtre est posé sur
  // le parent, pas sur chaque réutilisation : un seul flou pour toute la couche.
  const genUses = Array.from(
    { length: GENERATIONS },
    (_, g) => `<use href="#g${g}" style="--g:${g}"/>`,
  ).join("");

  // Extrémités : bourgeons à gauche, pastilles de circuit à droite.
  const isTip = new Set(nodes.map((_, i) => i));
  for (const n of nodes) if (n.parent >= 0) isTip.delete(n.parent);
  const tips = [...isTip].map((i) => nodes[i]!);

  const buds = tips
    .filter((n) => n.organic && random() > 0.55)
    .map((n) => `<circle cx="${r1(n.x)}" cy="${r1(n.y)}" r="${r1(2 + random() * 3)}"/>`)
    .join("");

  const vias = tips
    .filter((n) => !n.organic && random() > 0.62)
    .map(
      (n) =>
        `<circle cx="${r1(n.x)}" cy="${r1(n.y)}" r="${r1(2.6 + random() * 1.8)}" class="via"/>`,
    )
    .join("");

  // Les ponts : chaque extrémité végétale la plus avancée cherche la pastille
  // la plus proche de l'autre bord. C'est le seul endroit où les deux systèmes
  // se touchent, et il porte la lumière.
  // Seules les extrémités réellement au bord du couloir peuvent se toucher.
  const oTips = tips.filter((n) => n.organic && n.x > oEdge - 70);
  const mTips = tips.filter((n) => !n.organic && n.x < mEdge + 70);

  /**
   * Appariement un-à-un, du plus court au plus long. Sans cette contrainte,
   * plusieurs extrémités végétales élisent la même pastille et le dessin part
   * en éventail — ça se lit comme un défaut, pas comme une poignée de main.
   */
  const pairs: { o: Node; m: Node; d: number }[] = [];
  const maxSpan = gap * 1.45;
  for (const o of oTips) {
    for (const m of mTips) {
      const d = Math.hypot(m.x - o.x, m.y - o.y);
      if (d <= maxSpan) pairs.push({ o, m, d });
    }
  }
  pairs.sort((a, b) => a.d - b.d);

  const usedO = new Set<Node>();
  const usedM = new Set<Node>();
  const bridges: string[] = [];
  const contactDots: string[] = [];
  for (const { o, m } of pairs) {
    if (bridges.length >= 9) break;
    if (usedO.has(o) || usedM.has(m)) continue;
    usedO.add(o);
    usedM.add(m);
    const mx = (o.x + m.x) / 2;
    const my = (o.y + m.y) / 2 + (random() - 0.5) * 18;
    bridges.push(
      `<path d="M${r1(o.x)} ${r1(o.y)}Q${r1(mx)} ${r1(my)} ${r1(m.x)} ${r1(m.y)}"/>`,
    );
    // Une pastille à chaque extrémité : le contact est un point précis, pas
    // une lueur floue.
    contactDots.push(
      `<circle cx="${r1(o.x)}" cy="${r1(o.y)}" r="3"/>`,
      `<circle cx="${r1(m.x)}" cy="${r1(m.y)}" r="3"/>`,
    );
  }

  /**
   * `userSpaceOnUse` est obligatoire ici. Par défaut un dégradé se recalcule
   * sur la boîte de chaque élément peint : chaque `<path>` regroupé par
   * épaisseur reçoit alors tout le dégradé sur sa propre largeur, et l'on voit
   * des rameaux végétaux virer au cyan à gauche. En espace utilisateur, la
   * couleur ne dépend que de l'abscisse absolue — le vivant reste vert, la
   * machine reste bleue, quel que soit le découpage des tracés.
   *
   * La bande claire est étroite et centrée sur le point de rencontre : la
   * lumière doit signaler le contact, pas blanchir tout le centre.
   */
  const stop = (t: number, color: string) =>
    `<stop offset="${r1(Math.max(0, Math.min(1, t)) * 100) / 100}" stop-color="${color}"/>`;
  const grad = `
    <linearGradient id="veins" gradientUnits="userSpaceOnUse" x1="0" y1="0" x2="${W}" y2="0">
      ${stop(0, "#3f8a2e")}
      ${stop(balance - 0.17, "#8ed455")}
      ${stop(balance - 0.05, "#d6f3a0")}
      ${stop(balance, "#f7fde8")}
      ${stop(balance + 0.05, "#9ee9ff")}
      ${stop(balance + 0.17, "#5cc6f5")}
      ${stop(1, "#1f6ba8")}
    </linearGradient>`;

  /**
   * Le flux de sève : une copie du tracé en pointillé très espacé, dont le
   * décalage défile. Le pointillé se réinitialise à chaque sous-tracé, donc
   * chaque rameau porte sa propre impulsion — c'est ce qui donne un réseau qui
   * circule plutôt qu'une figure qui clignote.
   *
   * L'animation vit dans le SVG, pas dans la feuille de style de la page : elle
   * fonctionne donc aussi quand la figure est servie par une balise `img`.
   */
  /**
   * `stroke-dashoffset` est une propriété héritée : l'animer sur le groupe
   * parent suffit, les réutilisations en héritent. Une seule animation pilote
   * donc toutes les branches.
   */
  const flowLayer = flow
    ? `<g class="flow" stroke="#f2ffe0" fill="none" stroke-linecap="round" opacity="0.9" filter="url(#glow)">
  <g class="flow-a">${genUses}</g>
  <g class="flow-b">${genUses}</g>
</g>`
    : "";

  /**
   * La révélation joue sur l'opacité, génération par génération, et non sur un
   * tracé qui se dessine. Le dessin au pointillé dépend de la façon dont le
   * moteur réinitialise le motif à chaque sous-tracé et de `pathLength` sur des
   * tracés multiples : deux comportements que je ne peux pas vérifier ici, et
   * dont l'échec laisserait la figure invisible. L'opacité, elle, ne rate pas.
   *
   * L'ordre reste juste : l'indice d'un nœud est son rang de création, donc les
   * générations apparaissent dans l'ordre où la structure a réellement poussé —
   * des deux racines vers le couloir central.
   */
  /**
   * `backwards` et non `forwards`, avec l'opacité pleine comme état naturel.
   *
   * Écrit dans l'autre sens — `opacity: 0` au repos, remontée par une animation
   * en `forwards` — la figure resterait entièrement invisible partout où les
   * animations ne s'exécutent pas. C'est un échec silencieux, le pire genre.
   * Ici, pas d'animation veut simplement dire : figure visible, tout de suite.
   */
  const growCss = grow
    ? `.veins use { animation: appear .9s cubic-bezier(.22,1,.36,1) backwards; animation-delay: calc(var(--g) * 90ms); }
    .after { animation: appear .8s ease-out 2.4s backwards; }
    @keyframes appear { from { opacity: 0; } }`
    : "";

  const flowCss = flow
    ? `.flow > g { stroke-dasharray: 22 460; animation: flow 7.5s linear infinite; }
    .flow-b { animation-delay: -3.7s; }
    ${grow ? ".flow { animation: appear .9s ease-out 2.8s backwards; }" : ""}
    @keyframes flow { from { stroke-dashoffset: 482; } to { stroke-dashoffset: 0; } }`
    : "";

  const style = `<style>
    ${growCss}
    ${flowCss}
    @media (prefers-reduced-motion: reduce) {
      .flow { display: none; }
      .veins use, .after { animation: none; }
    }
  </style>`;

  const fit = options.fit ?? "meet";
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}" width="${W}" height="${H}" preserveAspectRatio="xMidYMid ${fit}" fill="none">${style}
<defs>${grad}
  <radialGradient id="halo" cx="${balance}" cy="0.5" r="0.5">
    <stop offset="0" stop-color="#d6fff2" stop-opacity="0.34"/>
    <stop offset="0.18" stop-color="#5fd0e0" stop-opacity="0.2"/>
    <stop offset="0.55" stop-color="#2b7d9c" stop-opacity="0.1"/>
    <stop offset="1" stop-color="#06110f" stop-opacity="0"/>
  </radialGradient>

  <!-- Vignette : les bords retombent dans le fond, le texte peut s'y poser. -->
  <radialGradient id="vignette" cx="0.5" cy="0.5" r="0.78">
    <stop offset="0.5" stop-color="#06110f" stop-opacity="0"/>
    <stop offset="1" stop-color="#06110f" stop-opacity="0.72"/>
  </radialGradient>
  <filter id="glow" x="-12%" y="-12%" width="124%" height="124%">
    <feGaussianBlur stdDeviation="9"/>
  </filter>
  <filter id="softglow" x="-20%" y="-20%" width="140%" height="140%">
    <feGaussianBlur stdDeviation="22"/>
  </filter>

  <!-- Le trace n'est decrit qu'une fois : les trois passes de lueur le
       reutilisent. Sans ca, le SVG pese trois fois son poids utile. -->
  <!-- Aucune couleur n'est posee ici : chaque reutilisation choisit la sienne,
       ce qui permet a la couche de flux d'etre plus claire que le trace. -->
  ${genGroups.join("")}
  <g id="t">${buds}${vias}</g>
  <g id="b" stroke-width="1.7" stroke-linecap="round">${bridges.join("")}</g>
  <g id="c">${contactDots.join("")}</g>
</defs>
<rect width="${W}" height="${H}" fill="#06110f"/>
${bloom ? `<rect width="${W}" height="${H}" fill="url(#halo)"/>` : ""}
<g class="veins" stroke="url(#veins)" fill="none" stroke-linecap="round" stroke-linejoin="round">
  <g filter="url(#softglow)" opacity="0.45">${genUses}</g>
  <g filter="url(#glow)" opacity="0.55">${genUses}</g>
  <g>${genUses}</g>
</g>
<g class="after" fill="url(#veins)" stroke="none">
  <use href="#t" filter="url(#glow)" opacity="0.6"/>
  <use href="#t"/>
</g>
<g class="after" stroke="#eef9d4" fill="none" opacity="0.92">
  <use href="#b" filter="url(#glow)"/>
  <use href="#b"/>
</g>
<g class="after" fill="#f7fde8" stroke="none">
  <use href="#c" filter="url(#glow)"/>
  <use href="#c"/>
</g>
${flowLayer}
<rect width="${W}" height="${H}" fill="url(#vignette)"/>
</svg>`;

  return { svg, width: W, height: H, nodes: nodes.length, contacts: bridges.length };
}
