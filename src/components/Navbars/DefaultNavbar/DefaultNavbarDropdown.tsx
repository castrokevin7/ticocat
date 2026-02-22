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

import React, { ReactNode } from 'react';

// react-router-dom components
import { Link } from "react-router-dom";

// @mui material components
import Collapse from "@mui/material/Collapse";
import Icon from "@mui/material/Icon";

// Otis Kit PRO components
import MKBox from "../../MKBox";
import MKTypography from "../../MKTypography";

interface DefaultNavbarDropdownProps {
  name: string;
  icon: ReactNode;
  children?: ReactNode;
  collapseStatus?: boolean;
  light?: boolean;
  href?: string;
  route?: string;
  collapse: boolean;
  target?: string;
  onClick?: () => void;
  onMouseEnter?: (event: React.MouseEvent<HTMLDivElement>) => void;
  onMouseLeave?: () => void;
}

function DefaultNavbarDropdown({
  name,
  icon,
  children,
  collapseStatus = false,
  light = false,
  href = "",
  route = "",
  collapse,
  ...rest
}: DefaultNavbarDropdownProps) {
  const linkComponent = {
    component: "a" as const,
    href,
    target: "_self",
    rel: "noreferrer",
  };

  const routeComponent = {
    component: Link,
    to: route,
  };

  return (
    <>
      <MKBox
        {...rest}
        mx={1}
        p={0}
        display="flex"
        alignItems="baseline"
        color={light ? "white" : "dark"}
        opacity={light ? 1 : 0.7}
        sx={{ cursor: "pointer", userSelect: "none" }}
        {...(route && routeComponent)}
        {...(href && linkComponent)}
      >
        <MKTypography
          variant="body2"
          lineHeight={1}
          color="inherit"
          sx={{ alignSelf: "center", "& *": { verticalAlign: "middle" } }}
        >
          {icon}
        </MKTypography>
        <MKTypography
          variant="body2"
          fontWeight="regular"
          textTransform="capitalize"
          color={light ? "white" : "dark"}
          sx={{ fontWeight: "100%", ml: 1, mr: 0.25 }}
        >
          {name}
        </MKTypography>
        <MKTypography variant="body2" color={light ? "white" : "dark"} ml="auto">
          <Icon sx={{ fontWeight: "normal", verticalAlign: "middle" }}>
            {collapse && "keyboard_arrow_down"}
          </Icon>
        </MKTypography>
      </MKBox>
      {children && (
        <Collapse in={Boolean(collapseStatus)} timeout={400} unmountOnExit>
          {children}
        </Collapse>
      )}
    </>
  );
}

export default DefaultNavbarDropdown;
