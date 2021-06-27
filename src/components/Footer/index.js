import React from "react";
import "./footer.css";
const Footer = () => {
  return (
    <footer className="Footer">
      <section>
        Designed and built with <span className="Footer__Heart">&hearts;</span>{" "}
        by{" "}
        <a
          href="https://www.linkedin.com/in/prasun-acharjee-3193b497/"
          target="_blank"
          rel="noopener noreferrer"
          className="Footer__Link"
        >
          Prasun
        </a>
        <a
          href="https://www.linkedin.com/in/soumya-banerjee-30a4a5180/"
          target="_blank"
          rel="noopener noreferrer"
          className="Footer__Link"
        >
          Soumya
        </a>
        <a
          href="https://www.linkedin.com/in/sban2009/"
          target="_blank"
          rel="noopener noreferrer"
          className="Footer__Link"
        >
          Spandan
        </a>
        <a
          href="https://www.linkedin.com/in/riddhiman-de-32a233180/"
          target="_blank"
          rel="noopener noreferrer"
          className="Footer__Link"
        >
          Riddhiman
        </a>
        <span style={{ marginRight: 10 }}>&amp;</span>
        <a
          href="https://www.linkedin.com/in/sayan-das-429a471a8/"
          target="_blank"
          rel="noopener noreferrer"
          className="Footer__Link"
        >
          Sayan
        </a>
      </section>

      <section className="Footer__Items">
        <a
          href="https://github.com/Prasun-Acharjee/resume-builder"
          target="_blank"
          rel="noopener noreferrer"
          className="Footer__Link"
        >
          Code
        </a>
      </section>
    </footer>
  );
};
export default Footer;
