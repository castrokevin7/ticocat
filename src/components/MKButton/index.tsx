/**
=========================================================
* Otis Kit PRO React - v1.0.0
=========================================================

* Product Page: https://www.creative-tim.com/product/soft-ui-dashboard-pro-react
* Copyright 2021 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

import React, { forwardRef, ReactNode, ElementType } from "react";

// Custom styles for MKButton
import MKButtonRoot from "./MKButtonRoot";

type SizeType = "small" | "medium" | "large";
type VariantType = "text" | "contained" | "outlined" | "gradient";
type ColorType = "default" | "white" | "primary" | "secondary" | "info" | "success" | "warning" | "error" | "light" | "dark";

interface MKButtonProps {
  size?: SizeType;
  variant?: VariantType;
  color?: ColorType;
  circular?: boolean;
  iconOnly?: boolean;
  children: ReactNode;
  component?: ElementType;
  [key: string]: any;
}

const MKButton = forwardRef<HTMLButtonElement, MKButtonProps>(
  (
    {
      color = "white",
      variant = "contained",
      size = "medium",
      circular = false,
      iconOnly = false,
      children,
      ...rest
    },
    ref
  ) => {
    const Root = MKButtonRoot as any;
    return (
      <Root
        {...rest}
        ref={ref}
        color="primary"
        variant={variant === "gradient" ? "contained" : variant}
        size={size}
        ownerState={{ color, variant, size, circular, iconOnly }}
      >
        {children}
      </Root>
    );
  }
);

export default MKButton;
