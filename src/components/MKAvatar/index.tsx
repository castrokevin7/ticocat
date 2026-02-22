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

// Custom styles for MKAvatar
import MKAvatarRoot from "./MKAvatarRoot";

type BgColorType = "transparent" | "primary" | "secondary" | "info" | "success" | "warning" | "error" | "light" | "dark";
type SizeType = "xs" | "sm" | "md" | "lg" | "xl" | "xxl";
type ShadowType = "none" | "xs" | "sm" | "md" | "lg" | "xl" | "xxl" | "inset";

interface MKAvatarProps {
  bgColor?: BgColorType;
  size?: SizeType;
  shadow?: ShadowType;
  [key: string]: any;
}

const MKAvatar = forwardRef<HTMLDivElement, MKAvatarProps>(
  ({ bgColor = "transparent", size = "md", shadow = "none", ...rest }, ref) => {
    const Root = MKAvatarRoot as any;
    return <Root ref={ref} ownerState={{ shadow, bgColor, size }} {...rest} />;
  }
);

export default MKAvatar;
