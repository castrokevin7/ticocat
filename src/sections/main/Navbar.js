// Otis Kit PRO examples
import DefaultNavbar from "examples/Navbars/DefaultNavbar";

import routes from "routes";

function getAction() {
  let domain = window.location.hostname;
  if (domain === "www.asoticocat.com") {
      return {
        route: "https://cat.asoticocat.com",
        label: "CAT",
        color: "info",
        icon: "translate_rounded",
        variant: "outlined",
        size: "small"
      }
  }
  return {
    route: "https://www.asoticocat.com",
    label: "ESP",
    color: "info",
    icon: "translate_rounded",
    variant: "outlined",
    size: "small"
  }
}

function Navbar() {
  return (
    <DefaultNavbar
      routes={routes}
      center
      sticky
      brand="asoticocat"
      action={getAction()}
    />
  );
}

export default Navbar;