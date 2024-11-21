import GitHubIcon from "@mui/icons-material/GitHub";

const Footer = () => {
  return (
    <footer className="footer p-6 bg-neutral text-neutral-content rounded-md flex flex-col">
      {/* <h3 className="font-bold text-lg">Cookle AI</h3> */}
      <a
        href="https://github.com/Kurler3"
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center gap-2 text-primary hover:text-accent transition hover:scale-[1.05]"
      >
        <GitHubIcon fontSize="large" /> {/* GitHub Icon */}
        <span className="text-sm md:text-base font-bold">Visit me on GitHub</span>
      </a>
    </footer>
  );
};

export default Footer;
