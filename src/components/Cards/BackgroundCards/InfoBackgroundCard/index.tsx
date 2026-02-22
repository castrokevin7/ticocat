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

// @mui material components
import Card from "@mui/material/Card";
import Icon from "@mui/material/Icon";

// Otis Kit PRO components
import MKBox from "../../../MKBox";
import MKTypography from "../../../MKTypography";

interface InfoBackgroundCardProps {
  image: string;
  icon: ReactNode;
  title: string;
  label?: string;
}

function InfoBackgroundCard({
  image,
  icon,
  title,
  label = "",
}: InfoBackgroundCardProps) {
  return (
    <Card
      sx={({
        functions: { rgba, linearGradient },
        palette: { gradients },
        borders: { borderRadius },
      }: any) => ({
        backgroundImage: `${linearGradient(
          rgba(gradients.dark.main, 0.8),
          rgba(gradients.dark.state, 0.8)
        )}, url(${image})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        borderRadius: borderRadius.xl,
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
      })}
    >
      <MKBox width="100%" p={3}>
        <MKTypography variant="h3" color="white">
          {typeof icon === "string" ? <Icon>{icon}</Icon> : icon}
        </MKTypography>
      </MKBox>
      <MKBox width="100%" pt={1} pb={2} px={3} lineHeight={1}>
        <MKTypography variant="h4" color="white">
          {title}
        </MKTypography>
        {label && (
          <MKTypography
            variant="caption"
            textTransform="uppercase"
            fontWeight="bold"
            color="white"
            opacity={0.7}
          >
            {label}
          </MKTypography>
        )}
      </MKBox>
    </Card>
  );
}

export default InfoBackgroundCard;
