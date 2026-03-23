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
import Card from "@mui/material/Card";

// Otis Kit PRO components
import MKBox from "../../../MKBox";
import MKButton from "../../../MKButton";
import MKTypography from "../../../MKTypography";

type ColorType = "primary" | "secondary" | "info" | "success" | "warning" | "error" | "dark" | "light";

interface ActionType {
  type: "external" | "internal";
  route: string;
  label: string;
}

interface ColoredBackgroundCardProps {
  color?: ColorType;
  image: string;
  label?: string;
  title: string;
  description: ReactNode;
  action: ActionType;
}

function ColoredBackgroundCard({
  color = "info",
  image,
  label = "",
  title,
  description,
  action,
}: ColoredBackgroundCardProps) {
  return (
    <Card
      sx={({
        palette: { gradients },
        functions: { rgba, linearGradient },
        borders: { borderRadius },
      }: any) => ({
        backgroundImage: `${linearGradient(
          rgba(gradients[color] ? gradients[color].main : gradients.info.main, 0.9),
          rgba(gradients[color] ? gradients[color].state : gradients.info.state, 0.9)
        )}, url(${image})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        borderRadius: borderRadius.xl,
        height: "100%",
        display: "grid",
        placeItems: "center",
      })}
    >
      <MKBox textAlign="center" p={3} my={12}>
        {label && (
          <MKTypography
            display="block"
            variant="caption"
            color={color === "light" ? "text" : "white"}
            textTransform="uppercase"
            opacity={0.8}
            fontWeight="bold"
            mb={2}
          >
            {label}
          </MKTypography>
        )}
        <MKTypography variant="h4" color={color === "light" ? "dark" : "white"}>
          {title}
        </MKTypography>
        <MKTypography
          variant="body2"
          color={color === "light" ? "text" : "white"}
          opacity={0.8}
          mb={3}
        >
          {description}
        </MKTypography>
        {action.type === "internal" ? (
          <MKButton
            component={Link}
            to={action.route}
            variant={color === "light" ? "gradient" : "contained"}
            color={color === "light" ? "dark" : "white"}
            size="small"
          >
            {action.label}
          </MKButton>
        ) : (
          <MKButton
            component="a"
            href={action.route}
            target="_blank"
            rel="noreferrer"
            variant={color === "light" ? "gradient" : "contained"}
            color={color === "light" ? "dark" : "white"}
            size="small"
          >
            {action.label}
          </MKButton>
        )}
      </MKBox>
    </Card>
  );
}

export default ColoredBackgroundCard;
