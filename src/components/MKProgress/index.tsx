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

// Otis Kit PRO components
import MKTypography from "../MKTypography";

// Custom styles for MKProgress
import MKProgressRoot from "./MKProgressRoot";

type VariantType = "contained" | "gradient";
type ColorType = "primary" | "secondary" | "info" | "success" | "warning" | "error" | "light" | "dark";

interface MKProgressProps {
  variant?: VariantType;
  color?: ColorType;
  value?: number;
  label?: boolean;
  [key: string]: any;
}

const MKProgress = forwardRef<HTMLDivElement, MKProgressProps>(
  ({ variant = "contained", color = "info", value = 0, label = false, ...rest }, ref) => {
    const Root = MKProgressRoot as any;
    return (
      <>
        {label && (
          <MKTypography variant="button" fontWeight="medium" color="text">
            {value}%
          </MKTypography>
        )}
        <Root
          {...rest}
          ref={ref}
          variant="determinate"
          value={value}
          ownerState={{ color, value, variant }}
        />
      </>
    );
  }
);

export default MKProgress;
