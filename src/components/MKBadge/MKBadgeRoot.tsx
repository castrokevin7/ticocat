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

import { ReactNode } from "react";

// @mui material components
import Badge from "@mui/material/Badge";
import { styled } from "@mui/material/styles";

interface OwnerState {
  color: string;
  variant: string;
  size: string;
  circular: boolean;
  indicator: boolean;
  border: boolean;
  container: boolean;
  children: ReactNode;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const MKBadgeRoot: any = styled(Badge, {
  shouldForwardProp: (prop: string) => prop !== "ownerState",
} as any)(({ theme, ownerState }: { theme: any; ownerState: OwnerState }) => {
  const { palette, typography, borders, functions } = theme as any;
  const { color, circular, border, size, indicator, variant, container, children } = ownerState;

  const { white, dark, gradients, badgeColors } = palette;
  const { size: fontSize, fontWeightBold } = typography;
  const { borderRadius, borderWidth } = borders;
  const { pxToRem, linearGradient } = functions;

  // padding values
  const paddings: Record<string, string> = {
    xs: "0.45em 0.775em",
    sm: "0.55em 0.9em",
    md: "0.65em 1em",
    lg: "0.85em 1.375em",
  };

  // fontSize value
  const fontSizeValue = size === "xs" ? fontSize.xxs : fontSize.xs;

  // border value
  const borderValue = border ? `${borderWidth[3]} solid ${white.main}` : "none";

  // borderRadius value
  const borderRadiusValue = circular ? borderRadius.section : borderRadius.lg;

  // styles for the badge with indicator={true}
  const indicatorStyles = (sizeProp: string) => {
    let widthValue = pxToRem(20);
    let heightValue = pxToRem(20);

    if (sizeProp === "medium") {
      widthValue = pxToRem(24);
      heightValue = pxToRem(24);
    } else if (sizeProp === "large") {
      widthValue = pxToRem(32);
      heightValue = pxToRem(32);
    }

    return {
      width: widthValue,
      height: heightValue,
      display: "grid",
      placeItems: "center",
      textAlign: "center" as const,
      borderRadius: "50%",
      padding: 0,
      border: borderValue,
    };
  };

  // styles for the badge with variant="gradient"
  const gradientStyles = (colorProp: string) => {
    const backgroundValue = gradients[colorProp]
      ? linearGradient(gradients[colorProp].main, gradients[colorProp].state)
      : linearGradient(gradients.info.main, gradients.info.state);
    const colorValue = colorProp === "light" ? dark.main : white.main;

    return {
      background: backgroundValue,
      color: colorValue,
    };
  };

  // styles for the badge with variant="contained"
  const containedStyles = (colorProp: string) => {
    let backgroundValue = badgeColors[colorProp]
      ? badgeColors[colorProp].background
      : badgeColors.info.background;
    let colorValue = badgeColors[colorProp] ? badgeColors[colorProp].text : badgeColors.info.text;

    if (colorProp === "light") {
      colorValue = dark.main;
    } else if (colorProp === "white") {
      backgroundValue = white.main;
      colorValue = dark.main;
    }

    return {
      background: backgroundValue,
      color: colorValue,
    };
  };

  // styles for the badge with no children and container={false}
  const standAloneStyles = () => ({
    position: "static" as const,
    marginLeft: pxToRem(8),
    transform: "none",
    fontSize: pxToRem(9),
  });

  // styles for the badge with container={true}
  const containerStyles = () => ({
    position: "relative" as const,
    transform: "none",
  });

  return {
    "& .MuiBadge-badge": {
      height: "auto",
      padding: paddings[size] || paddings.xs,
      fontSize: fontSizeValue,
      fontWeight: fontWeightBold,
      textTransform: "uppercase",
      lineHeight: 1,
      textAlign: "center",
      whiteSpace: "nowrap",
      verticalAlign: "baseline",
      border: borderValue,
      borderRadius: borderRadiusValue,
      ...(indicator && indicatorStyles(size)),
      ...(variant === "gradient" && gradientStyles(color)),
      ...(variant === "contained" && containedStyles(color)),
      ...(!children && !container && standAloneStyles()),
      ...(container && containerStyles()),
    },
  };
});

export default MKBadgeRoot;
