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

import React, { forwardRef, ElementType } from "react";

// Custom styles for MKBox
import MKBoxRoot from "./MKBoxRoot";

type VariantType = "contained" | "gradient";
type ColoredShadowType = "primary" | "secondary" | "info" | "success" | "warning" | "error" | "light" | "dark" | "none";

interface MKBoxProps {
  variant?: VariantType;
  bgColor?: string;
  color?: string;
  opacity?: number;
  borderRadius?: string;
  shadow?: string;
  coloredShadow?: ColoredShadowType;
  component?: ElementType;
  [key: string]: any;
}

const MKBox = forwardRef<HTMLDivElement, MKBoxProps>(
  (
    {
      variant = "contained",
      bgColor = "transparent",
      color = "dark",
      opacity = 1,
      borderRadius = "none",
      shadow = "none",
      coloredShadow = "none",
      ...rest
    },
    ref
  ) => {
    const Root = MKBoxRoot as any;
    return (
      <Root
        {...rest}
        ref={ref}
        ownerState={{ variant, bgColor, color, opacity, borderRadius, shadow, coloredShadow }}
      />
    );
  }
);

export default MKBox;
