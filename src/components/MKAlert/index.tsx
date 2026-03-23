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

import React, { useState, ReactNode } from "react";

// @mui material components
import Fade from "@mui/material/Fade";

// Otis Kit PRO components
import MKBox from "../MKBox";

// Custom styles for the MKAlert
import MKAlertRootBase from "./MKAlertRoot";
import MKAlertCloseIcon from "./MKAlertCloseIcon";

const MKAlertRoot = MKAlertRootBase as any;

type ColorType = "primary" | "secondary" | "info" | "success" | "warning" | "error" | "light" | "dark";

interface MKAlertProps {
  color?: ColorType;
  dismissible?: boolean;
  children: ReactNode;
  [key: string]: any;
}

function MKAlert({ color = "info", dismissible = false, children, ...rest }: MKAlertProps) {
  const [alertStatus, setAlertStatus] = useState("mount");

  const handleAlertStatus = () => setAlertStatus("fadeOut");

  // The base template for the alert
  const alertTemplate = (mount = true) => (
    <Fade in={mount} timeout={300}>
      <MKAlertRoot ownerState={{ color }} {...rest}>
        <MKBox
          display="flex"
          alignItems="center"
          fontSize="1rem"
          fontWeight="regular"
          color={color === "light" ? "dark" : "white"}
        >
          {children}
        </MKBox>
        {dismissible ? (
          <MKAlertCloseIcon onClick={mount ? handleAlertStatus : undefined}>&times;</MKAlertCloseIcon>
        ) : null}
      </MKAlertRoot>
    </Fade>
  );

  switch (true) {
    case alertStatus === "mount":
      return alertTemplate();
    case alertStatus === "fadeOut":
      setTimeout(() => setAlertStatus("unmount"), 400);
      return alertTemplate(false);
    default:
      alertTemplate();
      break;
  }

  return null;
}

export default MKAlert;
