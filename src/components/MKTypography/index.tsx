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

import React, { forwardRef, ReactNode, ElementType } from "react";

// Custom styles for MKTypography
import MKTypographyRoot from "./MKTypographyRoot";

type ColorType = "inherit" | "primary" | "secondary" | "info" | "success" | "warning" | "error" | "light" | "dark" | "text" | "white";
type FontWeightType = false | "light" | "regular" | "medium" | "bold";
type TextTransformType = "none" | "capitalize" | "uppercase" | "lowercase";
type VerticalAlignType = "unset" | "baseline" | "sub" | "super" | "text-top" | "text-bottom" | "middle" | "top" | "bottom";

interface MKTypographyProps {
  color?: ColorType;
  fontWeight?: FontWeightType;
  textTransform?: TextTransformType;
  verticalAlign?: VerticalAlignType;
  textGradient?: boolean;
  opacity?: number;
  children: ReactNode;
  component?: ElementType;
  [key: string]: any;
}

const MKTypography = forwardRef<HTMLElement, MKTypographyProps>(
  (
    {
      color = "dark",
      fontWeight = false,
      textTransform = "none",
      verticalAlign = "unset",
      textGradient = false,
      opacity = 1,
      children,
      ...rest
    },
    ref
  ) => {
    const Root = MKTypographyRoot as any;
    return (
      <Root
        {...rest}
        ref={ref}
        ownerState={{
          color,
          textTransform,
          verticalAlign,
          fontWeight,
          opacity,
          textGradient,
        }}
      >
        {children}
      </Root>
    );
  }
);

export default MKTypography;
