// Otis Kit PRO examples
import DefaultNavbar from "examples/Navbars/DefaultNavbar";

import routes from "routes";

function Navbar() {
  return (
    <DefaultNavbar
      routes={routes}
      center
      sticky
      brand={null}
    />
  );
}

export default Navbar;