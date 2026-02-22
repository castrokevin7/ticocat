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

import React, { forwardRef, ReactNode } from "react";

// Custom styles for the MKBadge
import MKBadgeRoot from "./MKBadgeRoot";

type ColorType = "white" | "primary" | "secondary" | "info" | "success" | "warning" | "error" | "light" | "dark";
type VariantType = "gradient" | "contained";
type SizeType = "xs" | "sm" | "md" | "lg";

interface MKBadgeProps {
  color?: ColorType;
  variant?: VariantType;
  size?: SizeType;
  circular?: boolean;
  indicator?: boolean;
  border?: boolean;
  children?: ReactNode;
  container?: boolean;
  [key: string]: any;
}

const MKBadge = forwardRef<HTMLSpanElement, MKBadgeProps>(
  (
    {
      color = "info",
      variant = "gradient",
      size = "sm",
      circular = false,
      indicator = false,
      border = false,
      children = false,
      container = false,
      ...rest
    },
    ref
  ) => {
    const Root = MKBadgeRoot as any;
    return (
      <Root
        {...rest}
        ownerState={{ color, variant, size, circular, indicator, border, container, children }}
        ref={ref}
        color="default"
      >
        {children}
      </Root>
    );
  }
);

export default MKBadge;
