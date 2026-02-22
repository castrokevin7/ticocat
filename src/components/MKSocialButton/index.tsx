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

// Custom styles for MKSocialButton
import MKSocialButtonRoot from "./MKSocialButtonRoot";

type SizeType = "small" | "medium" | "large";
type ColorType = "facebook" | "twitter" | "instagram" | "linkedin" | "pinterest" | "youtube" | "github" | "vimeo" | "slack" | "dribbble" | "reddit" | "tumblr";

interface MKSocialButtonProps {
  size?: SizeType;
  color?: ColorType;
  iconOnly?: boolean;
  circular?: boolean;
  children: ReactNode;
  [key: string]: any;
}

const MKSocialButton = forwardRef<HTMLButtonElement, MKSocialButtonProps>(
  (
    {
      color = "facebook",
      size = "medium",
      iconOnly = false,
      circular = false,
      children,
      ...rest
    },
    ref
  ) => {
    const Root = MKSocialButtonRoot as any;
    return (
      <Root
        {...rest}
        ref={ref}
        variant="contained"
        color="primary"
        size={size}
        ownerState={{ color, size, iconOnly, circular }}
      >
        {children}
      </Root>
    );
  }
);

export default MKSocialButton;
