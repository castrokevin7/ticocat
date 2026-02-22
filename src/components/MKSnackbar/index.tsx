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

import React, { ReactNode } from "react";

// @mui material components
import Snackbar from "@mui/material/Snackbar";
import IconButton from "@mui/material/IconButton";
import Icon from "@mui/material/Icon";
import Divider from "@mui/material/Divider";
import Fade from "@mui/material/Fade";

// Otis Kit PRO components
import MKBox from "../MKBox";
import MKTypography from "../MKTypography";

// Custom styles for the MKSnackbar
import MKSnackbarIconRootBase from "./MKSnackbarIconRoot";

const MKSnackbarIconRoot = MKSnackbarIconRootBase as any;

type ColorType = "primary" | "secondary" | "info" | "success" | "warning" | "error" | "dark" | "light";

interface MKSnackbarProps {
  color?: ColorType;
  icon: ReactNode;
  title: string;
  dateTime: string;
  content: ReactNode;
  close: () => void;
  bgWhite?: boolean;
  [key: string]: any;
}

function MKSnackbar({
  color = "info",
  icon,
  title,
  dateTime,
  content,
  close,
  bgWhite = false,
  ...rest
}: MKSnackbarProps) {
  let titleColor: ColorType | "dark" | "white";
  let dateTimeColor: string;
  let dividerColor: boolean;

  if (bgWhite) {
    titleColor = color;
    dateTimeColor = "dark";
    dividerColor = false;
  } else if (color === "light") {
    titleColor = "dark";
    dateTimeColor = "text";
    dividerColor = false;
  } else {
    titleColor = "white";
    dateTimeColor = "white";
    dividerColor = true;
  }

  return (
    <Snackbar
      TransitionComponent={Fade}
      autoHideDuration={5000}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "right",
      }}
      {...rest}
      action={
        <IconButton size="small" aria-label="close" color="inherit" onClick={close}>
          <Icon fontSize="small">close</Icon>
        </IconButton>
      }
    >
      <MKBox
        variant={bgWhite ? "contained" : "gradient"}
        bgColor={bgWhite ? "white" : color}
        minWidth="21.875rem"
        maxWidth="100%"
        shadow="md"
        borderRadius="md"
        p={1}
        sx={{
          backgroundColor: ({ palette }: any) => palette[color] || palette.white.main,
        }}
      >
        <MKBox
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          color="dark"
          p={1.5}
        >
          <MKBox display="flex" alignItems="center" lineHeight={0}>
            <MKSnackbarIconRoot fontSize="small" ownerState={{ color, bgWhite }}>
              {icon}
            </MKSnackbarIconRoot>
            <MKTypography
              variant="button"
              fontWeight="medium"
              color={titleColor}
              textGradient={bgWhite}
            >
              {title}
            </MKTypography>
          </MKBox>
          <MKBox display="flex" alignItems="center" lineHeight={0}>
            <MKTypography variant="caption" color={dateTimeColor}>
              {dateTime}
            </MKTypography>
            <Icon
              sx={{
                color: ({ palette: { dark, white } }: any) =>
                  bgWhite || color === "light" ? dark.main : white.main,
                fontWeight: ({ typography: { fontWeightBold } }: any) => fontWeightBold,
                cursor: "pointer",
                marginLeft: 2,
                transform: "translateY(-1px)",
              }}
              onClick={close}
            >
              close
            </Icon>
          </MKBox>
        </MKBox>
        <Divider sx={{ margin: 0 }} light={dividerColor} />
        <MKBox
          p={1.5}
          sx={{
            fontSize: ({ typography: { size } }: any) => size.sm,
            color: ({ palette: { white, text } }: any) =>
              bgWhite || color === "light" ? text.main : white.main,
          }}
        >
          {content}
        </MKBox>
      </MKBox>
    </Snackbar>
  );
}

export default MKSnackbar;
