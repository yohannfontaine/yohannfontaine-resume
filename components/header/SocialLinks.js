export default function SocialLinks() {
  const socialLinks = [
    {
      url: "https://www.linkedin.com/in/yohann-fontaine-a680331b/",
      icon: "fab fa-linkedin-in",
    },
    {
      url: "https://github.com/yohannfontaine",
      icon: "fab fa-github",
    },
    {
      url: "https://www.codingame.com/profile/4ce08406f55cfcda54ff772a3bf44a836486523",
      icon: "fab fa-battle-net",
    },
    {
      url: "https://www.instagram.com/yohannfontaine/",
      icon: "fab fa-instagram",
    },
  ];
  return (
    <div className="social-links">
      <ul>
        {socialLinks.map((link, index) => {
          return (
            <li key={index}>
              <a href={link.url} target="_blank">
                <i className={link.icon}></i>
              </a>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
