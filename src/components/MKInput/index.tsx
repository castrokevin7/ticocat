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

import React, { forwardRef } from "react";

// Custom styles for MKInput
import MKInputRoot from "./MKInputRoot";

interface MKInputProps {
  error?: boolean;
  success?: boolean;
  disabled?: boolean;
  [key: string]: any;
}

const MKInput = forwardRef<HTMLDivElement, MKInputProps>(
  ({ error = false, success = false, disabled = false, ...rest }, ref) => {
    const Root = MKInputRoot as any;
    return <Root {...rest} ref={ref} ownerState={{ error, success, disabled }} />;
  }
);

export default MKInput;
