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

interface ActionType {
  type: "external" | "internal";
  route: string;
  label: string;
}

interface DefaultBackgroundCardProps {
  image: string;
  label?: string;
  title: string;
  description: ReactNode;
  action: ActionType;
}

function DefaultBackgroundCard({
  image,
  label = "",
  title,
  description,
  action,
}: DefaultBackgroundCardProps) {
  return (
    <Card
      sx={({
        functions: { rgba, linearGradient },
        palette: { black },
        borders: { borderRadius },
      }: any) => ({
        backgroundImage: `${linearGradient(
          rgba(black.main, 0.5),
          rgba(black.main, 0.5)
        )}, url(${image})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        borderRadius: borderRadius.xl,
      })}
    >
      <MKBox textAlign="center" pt={12} pb={3} px={3}>
        {label && (
          <MKTypography variant="body2" color="white" textTransform="uppercase" mb={2}>
            {label}
          </MKTypography>
        )}
        <MKTypography variant="h3" color="white">
          {title}
        </MKTypography>
        <MKTypography variant="body2" color="white" opacity={0.8} mb={2}>
          {description}
        </MKTypography>
        {action.type === "internal" ? (
          <MKButton component={Link} to={action.route} color="white" size="small" sx={{ my: 2 }}>
            {action.label}
          </MKButton>
        ) : (
          <MKButton
            component="a"
            href={action.route}
            target="_blank"
            rel="noreferrer"
            color="white"
            size="small"
            sx={{ my: 2 }}
          >
            {action.label}
          </MKButton>
        )}
      </MKBox>
    </Card>
  );
}

export default DefaultBackgroundCard;
