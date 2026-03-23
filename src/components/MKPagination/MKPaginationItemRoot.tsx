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
import { styled } from "@mui/material/styles";

// Otis Kit PRO components
import MKButton from "../MKButton";

interface OwnerState {
  variant: string;
  paginationSize: string | null;
  active: boolean;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const MKPaginationItemRoot: any = styled(MKButton, {
  shouldForwardProp: (prop: string) => prop !== "ownerState",
} as any)(({ theme, ownerState }: { theme: any; ownerState: OwnerState }) => {
  const { borders, functions, typography, palette } = theme as any;
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { variant: _variant, paginationSize, active } = ownerState;

  const { borderColor } = borders;
  const { pxToRem } = functions;
  const { fontWeightRegular, size: fontSize } = typography;
  const { light } = palette;

  // width, height, minWidth and minHeight values
  let sizeValue = pxToRem(36);

  if (paginationSize === "small") {
    sizeValue = pxToRem(30);
  } else if (paginationSize === "large") {
    sizeValue = pxToRem(46);
  }

  return {
    borderColor,
    margin: `0 ${pxToRem(2)}`,
    pointerEvents: active ? "none" : "auto",
    fontWeight: fontWeightRegular,
    fontSize: fontSize.sm,
    width: sizeValue,
    minWidth: sizeValue,
    height: sizeValue,
    minHeight: sizeValue,

    "&:hover, &:focus, &:active": {
      transform: "none",
      boxShadow: "none !important",
      opacity: "1 !important",
    },

    "&:hover": {
      backgroundColor: light.main,
      borderColor,
    },
  };
});

export default MKPaginationItemRoot;
