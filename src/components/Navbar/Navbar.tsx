import "./Navbar.scss";
import Github from "../../assets/github.svg";
import Linkedin from "../../assets/linkedin.svg";
import Sidebar from "../SIdebar/Sidebar";
import Resume from "../../Resume/Resume.pdf";
const Navbar = () => {
  const handleDownload = () => {
    const downloadLink = document.createElement("a");

    downloadLink.download = "Resume.pdf";
    downloadLink.href = Resume;

    document.body.appendChild(downloadLink);
    downloadLink.click();

    document.body.removeChild(downloadLink);
  };
  return (
    <div className="navbar">
      <div className="wrapper">
        <Sidebar />
        <div className="Socials">
          <button onClick={handleDownload}>Download CV</button>
          <a
            href="https://github.com/Yaseenyk"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img src={Github} alt="Github" />
          </a>

          <a
            href="https://www.linkedin.com/in/yaseen-yk/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img src={Linkedin} alt="Linkedin" />
          </a>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
