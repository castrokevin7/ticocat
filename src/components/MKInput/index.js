/**
=========================================================
* Otis Kit PRO - v2.0.1
=========================================================

* Product Page: https://material-ui.com/store/items/otis-kit-pro-material-kit-react/
* Copyright 2022 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

import { forwardRef } from "react";

// prop-types is a library for typechecking of props
import PropTypes from "prop-types";

// Custom styles for MKInput
import MKInputRoot from "components/MKInput/MKInputRoot";

const MKInput = forwardRef(({ error, success, disabled, ...rest }, ref) => (
  <MKInputRoot {...rest} ref={ref} ownerState={{ error, success, disabled }} />
));

// Setting default values for the props of MKInput
MKInput.defaultProps = {
  error: false,
  success: false,
  disabled: false,
};

// Typechecking props for the MKInput
MKInput.propTypes = {
  error: PropTypes.bool,
  success: PropTypes.bool,
  disabled: PropTypes.bool,
};

export default MKInput;
