// @mui icons
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import EmailIcon from "@mui/icons-material/Email";

// Otis Kit PRO examples
import CenteredFooter from "examples/Footers/CenteredFooter";

function Footer() {
  const company = {
    href: "https://www.asoticocat.com/",
    name: "Aso TicoCat",
  };
  const links = [
    { href: "/#", name: "Inicio" },
    { href: "/#acerca", name: "Acerca" },
    { href: "/#equipo", name: "Equipo" },
  ];
  const socials = [
    {
      icon: <FacebookIcon fontSize="small" />,
      link: "https://www.facebook.com/ticocat",
    },
    {
      icon: <InstagramIcon fontSize="small" />,
      link: "https://www.instagram.com/asoticocat/",
    },
    {
      icon: <EmailIcon fontSize="small" />,
      link: "mailto:asoticocat@gmail.com",
    },
  ];

  return <CenteredFooter company={company} links={links} socials={socials} />;
}

export default Footer;