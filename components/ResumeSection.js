import { motion } from "framer-motion";
import Image from "next/image";
export default function ResumeSection({ isActive }) {
  const animations = {
    startShow: { opacity: 0, scale: 0.5, visibility: "hidden" },
    finishShow: { opacity: 1, scale: 1, visibility: "visible" },
  };

  const start = isActive ? animations.startShow : animations.finishShow;
  const finish = isActive ? animations.finishShow : animations.startShow;

  return (
    <motion.section
      initial={start}
      animate={finish}
      data-id="resume"
      className="animated-section"
    >
      <div className="section-content">
        <div className="page-title">
          <h2>Resume</h2>
        </div>

        <div className="row">
          <div className="col-xs-12 col-sm-7">
            <div className="block-title">
              <h3>Experience</h3>
            </div>

            <div className="timeline timeline-second-style clearfix">
              <div className="timeline-item clearfix">
                <div className="left-part">
                  <h5 className="item-period">2021 - ce jour</h5>
                  <span className="item-company">Bpifrance</span>
                </div>
                <div className="divider"></div>
                <div className="right-part">
                  <h4 className="item-title">Lead Architect</h4>
                  <p>Pilotage tech du train Assurance Export (70 pers)</p>
                </div>
              </div>

              <div className="timeline-item clearfix">
                <div className="left-part">
                  <h5 className="item-period">2020-2021</h5>
                  <span className="item-company">Keolis Lille</span>
                </div>
                <div className="divider"></div>
                <div className="right-part">
                  <h4 className="item-title">Digital Factory Lead</h4>
                  <p>Pilotage de la Fabrik digitale et du périmètre Build</p>
                </div>
              </div>

              <div className="timeline-item clearfix">
                <div className="left-part">
                  <h5 className="item-period">2018 - 2020</h5>
                  <span className="item-company">Promod</span>
                </div>
                <div className="divider"></div>
                <div className="right-part">
                  <h4 className="item-title">
                    Product Owner & Architect & Lead Dev
                  </h4>
                  <p>
                    Architecte & Product Owner du projet rattrapage Dette
                    Technique et Renouvellement technologie front magasin
                    <br />
                    Lead Dev / Scrum Master de l’équipe agile omnicanal de 6
                    personnes responsable des applications web et mobile.
                  </p>
                </div>
              </div>

              <div className="timeline-item clearfix">
                <div className="left-part">
                  <h5 className="item-period">2017 - 2018</h5>
                  <span className="item-company">IBM Service</span>
                </div>
                <div className="divider"></div>
                <div className="right-part">
                  <h4 className="item-title">Team Leader</h4>
                  <p>
                    Team Lead sur le projet de refonte du site grand public
                    Crédit Agricole
                  </p>
                </div>
              </div>

              <div className="timeline-item clearfix">
                <div className="left-part">
                  <h5 className="item-period">2017</h5>
                  <span className="item-company">Renault Digital</span>
                </div>
                <div className="divider"></div>
                <div className="right-part">
                  <h4 className="item-title">Lead Dev Backend</h4>
                  <p>Mise en place du socle technique Backend</p>
                </div>
              </div>

              <div className="timeline-item clearfix">
                <div className="left-part">
                  <h5 className="item-period">2016-2017</h5>
                  <span className="item-company">Bpifrance</span>
                </div>
                <div className="divider"></div>
                <div className="right-part">
                  <h4 className="item-title">Lead Architect</h4>
                  <p>
                    Pilotage d’une équipe de 3 architectes techniques
                    responsable de la mise en place du socle technique dans le
                    cadre du projet stratégique de transfert des garanties
                    publiques de Coface vers Bpifrance.
                  </p>
                </div>
              </div>

              <div className="timeline-item clearfix">
                <div className="left-part">
                  <h5 className="item-period">2015-2016</h5>
                  <span className="item-company">Sopra Steria</span>
                </div>
                <div className="divider"></div>
                <div className="right-part">
                  <h4 className="item-title">Lead Tech</h4>
                  <p>
                    Mise en place du socle technique pour un nouveau projet
                    SNCF. Lead technique d&apos;une équipe de 7 personnes.
                  </p>
                </div>
              </div>

              <div className="timeline-item clearfix">
                <div className="left-part">
                  <h5 className="item-period">2010-2015</h5>
                  <span className="item-company">Coface</span>
                </div>
                <div className="divider"></div>
                <div className="right-part">
                  <h4 className="item-title">Team Leader</h4>
                  <p>
                    Pilotage, conception et développement sur le périmètre LCT
                    (Liaison Change Trésorerie) des applications web permettant
                    à la direction financière de suivre, analyser et contrôler
                    les positions des traders sur le forex. Mise en place
                    d&apos;une TMA sur le projet.
                  </p>
                </div>
              </div>

              <div className="timeline-item clearfix">
                <div className="left-part">
                  <h5 className="item-period">2007-2010</h5>
                  <span className="item-company">Franfinance</span>
                </div>
                <div className="divider"></div>
                <div className="right-part">
                  <h4 className="item-title">Senior Software Engineer</h4>
                  <p>
                    Conception et développement sur l’application web extranet
                    Flashlease permettant aux apporteurs de Franfinance de
                    saisir des demandes de financement pour les entreprises
                    (location, crédit-bail,…)
                  </p>
                </div>
              </div>
              <div className="timeline-item clearfix">
                <div className="left-part">
                  <h5 className="item-period">2004-2007</h5>
                  <span className="item-company">Renault</span>
                </div>
                <div className="divider"></div>
                <div className="right-part">
                  <h4 className="item-title">Software Engineer</h4>
                  <p>
                    Encadrement, conception et développement sur l’application
                    web permettant la consultation des référentiels produits,
                    marchés, usines et la gestion des budgets provisoires et
                    définitifs.
                  </p>
                </div>
              </div>
            </div>
            <div className="white-space-50"></div>

            <div className="block-title">
              <h3>Education</h3>
            </div>

            <div className="timeline timeline-second-style clearfix">
              <div className="timeline-item clearfix">
                <div className="left-part">
                  <h5 className="item-period">2001-2004</h5>
                  <span className="item-company">ENSEEIHT</span>
                </div>
                <div className="divider"></div>
                <div className="right-part">
                  <h4 className="item-title">
                    Ingénieur Informatique et Mathématiques Appliquées
                  </h4>
                  <p>Président du club sport automobile Turbo7 (2002)</p>
                </div>
              </div>

              <div className="timeline-item clearfix">
                <div className="left-part">
                  <h5 className="item-period">1998-2001</h5>
                  <span className="item-company">Lycée Chaptal</span>
                </div>
                <div className="divider"></div>
                <div className="right-part">
                  <h4 className="item-title">
                    Classes préparatoires aux Grands Ecoles
                  </h4>
                  <p>MPSI, PSI</p>
                </div>
              </div>

              <div className="timeline-item clearfix">
                <div className="left-part">
                  <h5 className="item-period">1998</h5>
                  <span className="item-company">Lycée Condorcet (Oise)</span>
                </div>
                <div className="divider"></div>
                <div className="right-part">
                  <h4 className="item-title">BAC S Mention Bien</h4>
                </div>
              </div>
            </div>
          </div>

          <div className="col-xs-12 col-sm-5">
            <div className="block-title">
              <h3>
                Design <span>Skills</span>
              </h3>
            </div>

            <div className="skills-info skills-second-style">
              <div className="skill clearfix">
                <h4>Architecture</h4>
                <div className="skill-value">95%</div>
              </div>
              <div className="skill-container skill-1">
                <div className="skill-percentage"></div>
              </div>

              <div className="skill clearfix">
                <h4>Sécurité</h4>
                <div className="skill-value">65%</div>
              </div>
              <div className="skill-container skill-2">
                <div className="skill-percentage"></div>
              </div>

              <div className="skill clearfix">
                <h4>Conception technique</h4>
                <div className="skill-value">80%</div>
              </div>
              <div className="skill-container skill-3">
                <div className="skill-percentage"></div>
              </div>

              <div className="skill clearfix">
                <h4>Graphic Design</h4>
                <div className="skill-value">90%</div>
              </div>
              <div className="skill-container skill-4">
                <div className="skill-percentage"></div>
              </div>
            </div>

            <div className="white-space-10"></div>

            <div className="block-title">
              <h3>
                Coding <span>Skills</span>
              </h3>
            </div>

            <div className="skills-info skills-second-style">
              <div className="skill clearfix">
                <h4>Java</h4>
                <div className="skill-value">90%</div>
              </div>
              <div className="skill-container skill-5">
                <div className="skill-percentage"></div>
              </div>
              <div className="skill clearfix">
                <h4>Javascript</h4>
                <div className="skill-value">80%</div>
              </div>
              <div className="skill-container skill-6">
                <div className="skill-percentage"></div>
              </div>
              <div className="skill clearfix">
                <h4>HTML/CSS</h4>
                <div className="skill-value">80%</div>
              </div>
              <div className="skill-container skill-7">
                <div className="skill-percentage"></div>
              </div>

              <div className="skill clearfix">
                <h4>Typescript</h4>
                <div className="skill-value">70%</div>
              </div>
              <div className="skill-container skill-8">
                <div className="skill-percentage"></div>
              </div>

              <div className="skill clearfix">
                <h4>Python</h4>
                <div className="skill-value">50%</div>
              </div>
              <div className="skill-container skill-8">
                <div className="skill-percentage"></div>
              </div>

              <div className="skill clearfix">
                <h4>Dart</h4>
                <div className="skill-value">40%</div>
              </div>
              <div className="skill-container skill-8">
                <div className="skill-percentage"></div>
              </div>
            </div>

            <div className="white-space-10"></div>

            <div className="block-title">
              <h3>Knowledges</h3>
            </div>

            <ul className="knowledges">
              <li>HTML5</li>
              <li>CSS3</li>
              <li>Spring Boot</li>
              <li>Angular</li>
              <li>Vuejs</li>
              <li>Nuxt</li>
              <li>React</li>
              <li>Next</li>
              <li>Flutter</li>
              <li>Git</li>
              <li>SVN</li>
              <li>SQL</li>
              <li>Hibernate</li>
              <li>Liquibase</li>
              <li>NoSQL</li>
              <li>Maven</li>
              <li>Gradle</li>
              <li>Groovy</li>
              <li>Jenkins</li>
              <li>Docker</li>
              <li>Kubernetes</li>
              <li>Helm</li>
              <li>Fluxcd</li>
              <li>Artifactory</li>
              <li>Ansible</li>
              <li>Terraform</li>
              <li>Firebase</li>
              <li>AWS</li>
              <li>Google Cloud</li>
              <li>Microsoft Azure</li>
              <li>Domain Driven Design</li>
            </ul>
          </div>
        </div>

        <div className="white-space-50"></div>

        <div className="row">
          <div className="col-xs-12 col-sm-12">
            <div className="block-title">
              <h3>Certificates</h3>
            </div>
          </div>
        </div>

        <div className="row">
          <div className="col-xs-12 col-sm-6">
            <div className="certificate-item clearfix">
              <div className="certi-logo">
                <img
                  src="img/resume/cert_mark_SA_badge_large_300px.png"
                  alt="certification SAFe Architect"
                />
              </div>

              <div className="certi-content">
                <div className="certi-title">
                  <h4>Certified SAFe® 5 Architect</h4>
                </div>
                <div className="certi-date">
                  <span>21 Mars 2021</span>
                </div>
                <div className="certi-company">
                  <span>Scaled Agile Inc</span>
                </div>
              </div>
            </div>
          </div>

          <div className="col-xs-12 col-sm-6">
            <div className="certificate-item clearfix">
              <div className="certi-logo">
                <img src="img/resume/LF_logobadge.png" alt="logo" />
              </div>

              <div className="certi-content">
                <div className="certi-title">
                  <h4>LFS458: Kubernetes Administration</h4>
                </div>
                <div className="certi-date">
                  <span>18 Mars 2022</span>
                </div>
                <div className="certi-company">
                  <span>The Linux Foundation</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.section>
  );
}
