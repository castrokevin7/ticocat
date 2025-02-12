// @mui icons
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import EmailIcon from "@mui/icons-material/Email";

// Otis Kit PRO examples
import CenteredFooter from "components/Footers/CenteredFooter";

import Translator from 'utils/Translator';

function Footer() {
  const company = {
    href: "https://www.asoticocat.com/",
    name: "TICOCAT",
  };
  const links = [
    { href: "#", name: Translator.instance.translate("route_home") },
    { href: "#acerca", name: Translator.instance.translate("route_about") },
    { href: "#equipo", name: Translator.instance.translate("route_team") },
    { href: "#eventos", name: Translator.instance.translate("route_events") },
    { href: "#beneficios", name: Translator.instance.translate("route_benefits") },
    { href: "#faqs", name: Translator.instance.translate("route_faqs") },
    { href: "#socios", name: Translator.instance.translate("route_associates") },
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