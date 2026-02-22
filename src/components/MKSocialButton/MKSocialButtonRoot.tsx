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
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";

interface OwnerState {
  color: string;
  size: string;
  iconOnly: boolean;
  circular: boolean;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const MKSocialButtonRoot: any = styled(Button, {
  shouldForwardProp: (prop: string) => prop !== "ownerState",
} as any)(({ theme, ownerState }: { theme: any; ownerState: OwnerState }) => {
  const { palette, functions } = theme as any;
  const { color, size, iconOnly, circular } = ownerState;

  const { white, socialMediaColors } = palette;
  const { pxToRem } = functions;

  // backgroundColor value
  const backgroundColorValue = socialMediaColors[color]
    ? socialMediaColors[color].main
    : socialMediaColors.facebook.main;

  const focusedBackgroundColorValue = socialMediaColors[color]
    ? socialMediaColors[color].dark
    : socialMediaColors.facebook.dark;

  // styles for the button with circular={true}
  const circularStyles = () => ({
    borderRadius: "50%",
  });

  // styles for the button with iconOnly={true}
  const iconOnlyStyles = () => {
    // width, height, minWidth and minHeight values
    let sizeValue = pxToRem(38);

    if (size === "small") {
      sizeValue = pxToRem(25.4);
    } else if (size === "large") {
      sizeValue = pxToRem(52);
    }

    // padding value
    let paddingValue = `${pxToRem(11)} ${pxToRem(11)} ${pxToRem(10)}`;

    if (size === "small") {
      paddingValue = pxToRem(4.5);
    } else if (size === "large") {
      paddingValue = pxToRem(16);
    }

    return {
      width: sizeValue,
      minWidth: sizeValue,
      height: sizeValue,
      minHeight: sizeValue,
      padding: paddingValue,
    };
  };

  return {
    backgroundColor: backgroundColorValue,
    color: white.main,
    boxShadow: "none",

    "&:hover": {
      backgroundColor: focusedBackgroundColorValue,
      boxShadow: "none",
    },

    "&:focus:not(:hover)": {
      backgroundColor: socialMediaColors[color]
        ? socialMediaColors[color].dark
        : socialMediaColors.facebook.dark,
      boxShadow: "none",
    },

    "&:disabled": {
      backgroundColor: backgroundColorValue,
      color: white.main,
    },

    ...(circular && circularStyles()),
    ...(iconOnly && iconOnlyStyles()),
  };
});

export default MKSocialButtonRoot;
