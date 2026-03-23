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

// @mui material components
import Typography from "@mui/material/Typography";
import { styled } from "@mui/material/styles";

interface OwnerState {
  color: string;
  textTransform: string;
  verticalAlign: string;
  fontWeight: string | false;
  opacity: number;
  textGradient: boolean;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const MKTypographyRoot = (styled as any)(Typography, {
  shouldForwardProp: (prop: string) => prop !== "ownerState",
})(({ theme, ownerState }: { theme: any; ownerState: OwnerState }) => {
  const { palette, typography, functions } = theme as any;
  const { color, textTransform, verticalAlign, fontWeight, opacity, textGradient } = ownerState;

  const { gradients, transparent } = palette;
  const { fontWeightLight, fontWeightRegular, fontWeightMedium, fontWeightBold } = typography;
  const { linearGradient } = functions;

  // fontWeight styles
  const fontWeights: Record<string, number> = {
    light: fontWeightLight,
    regular: fontWeightRegular,
    medium: fontWeightMedium,
    bold: fontWeightBold,
  };

  // styles for the typography with textGradient={true}
  const gradientStyles = () => ({
    backgroundImage:
      color !== "inherit" && color !== "text" && color !== "white" && gradients[color]
        ? linearGradient(gradients[color].main, gradients[color].state)
        : linearGradient(gradients.dark.main, gradients.dark.state),
    display: "inline-block",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: transparent.main,
    position: "relative" as const,
    zIndex: 1,
  });

  // color value
  const colorValue = color === "inherit" || !palette[color] ? "inherit" : palette[color].main;

  return {
    opacity,
    textTransform,
    verticalAlign,
    textDecoration: "none",
    color: colorValue,
    letterSpacing: "-0.125px",
    fontWeight: fontWeight && fontWeights[fontWeight] ? fontWeights[fontWeight] : undefined,
    ...(textGradient && gradientStyles()),
  };
});

export default MKTypographyRoot;
