import React from "react";

// @mui icons
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import EmailIcon from "@mui/icons-material/Email";

// Otis Kit PRO examples
import CenteredFooter from "../../components/Footers/CenteredFooter";


import { getLang } from '../../utils/Translator';


function Footer() {
  const company = {
    href: "https://www.asoticocat.com/",
    name: "TICOCAT",
  };
  const links = [
    { href: `/${getLang()}/social/configuracion`, name: "Configuración" },
    { href: `/${getLang()}/social/perfil`, name: "Mi Perfil" },
    { href: `/${getLang()}/social/comunidad`, name: "Comunidad" },
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
