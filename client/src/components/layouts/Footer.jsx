const footerSections = [
  {
    title: "MOVIES & EVENTS",
    links: ["Trending Movies", "Latest Plays", "Music Concerts", "Live Shows"],
  },
  {
    title: "SPORTS & LIVE",
    links: [
      "Cricket Matches",
      "Football Games",
      "Race Events",
      "Stand-up Comedy",
    ],
  },
  {
    title: "COMPANY",
    links: ["About Us", "Careers", "Press", "Partners"],
  },
  {
    title: "LEGAL & SUPPORT",
    links: ["Privacy Policy", "Terms of Service", "Help Center", "Contact Us"],
  },
];

export default function Footer() {
  return (
    <footer className="bg-card pt-16 pb-8 px-6 md:px-12 lg:px-24 font-sans border-t border-border">
      {/* Top Main Section */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-10">
        {/* Brand Column */}
        <div className="lg:col-span-1">
          {/* Logo */}
          <img
            src="/images/logo.png"
            alt="logo"
            className="mb-4 w-60 lg:w-auto"
          />
          <p className="text-text-secondary text-base pr-4">
            Your fast ticket to movies & events.
          </p>
        </div>

        {/* Links Columns */}
        {footerSections.map((section, index) => (
          <div key={index}>
            <h3 className="text-text-primary font-semibold text-sm tracking-wider uppercase mb-6">
              {section.title}
            </h3>
            <ul className="space-y-4">
              {section.links.map((link, linkIndex) => (
                <li key={linkIndex}>
                  <a
                    href={`#${link.toLowerCase().replace(/\s+/g, "-")}`}
                    className="text-text-secondary hover:text-primary-500 transition-colors duration-200 text-sm"
                  >
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* Bottom Section: Socials & Copyright */}
      <div className="max-w-7xl mx-auto mt-16 pt-8 border-t border-border flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Social Icons */}
        <div className="flex space-x-6">
          {/* Facebook */}
          <a
            href="#facebook"
            aria-label="Facebook"
            className="text-text-secondary hover:text-primary-500 transition-colors"
          >
            <img src="/svg/facebook.svg" alt="LinkedIn" className="h-8" />
          </a>
          {/* Twitter / X */}
          <a
            href="#X"
            aria-label="X"
            className="text-text-secondary hover:text-primary-500 transition-colors"
          >
            <img src="/svg/x.svg" alt="LinkedIn" className="h-8" />
          </a>
          {/* Instagram */}
          <a
            href="#instagram"
            aria-label="Instagram"
            className="text-text-secondary hover:text-primary-500 transition-colors"
          >
            <img src="/svg/instagram.svg" alt="LinkedIn" className="h-8" />
          </a>
          {/* LinkedIn */}
          <a
            href="#linkedin"
            aria-label="LinkedIn"
            className="text-text-secondary hover:text-primary-500 transition-colors"
          >
            <img src="/svg/linkedin.svg" alt="LinkedIn" className="h-8" />
          </a>
        </div>

        {/* Copyright */}
        <p className="text-sm text-text-secondary mt-4 md:mt-0">
          © 2026 BookShowFast. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
