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

import React from 'react';

// @mui material components
import Card from "@mui/material/Card";

// Otis Kit PRO components
import MKBox from "../../../MKBox";
import MKTypography from "../../../MKTypography";

import getFormattedDate from "../../../../utils/FormatDate";

interface SimpleBackgroundCardProps {
  image: string;
  title: string;
  date?: string | null;
  description?: string;
}

function SimpleBackgroundCard({ image, title, date, description }: SimpleBackgroundCardProps) {

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
        height: "100%",
        display: "flex",
        justifyContent: "center",
      })}
    >
      <MKBox pt={32} pb={3} px={3}>
        <MKTypography variant="h3" color="white">
          {title}
        </MKTypography>
        {
          date &&
          <MKTypography variant="h4" color="white" mb={2}>
            {getFormattedDate(date)}
          </MKTypography>
        }
        <MKTypography variant="body2" color="white" mb={2}>
          {description}
        </MKTypography>
      </MKBox>
    </Card>
  );
}

export default SimpleBackgroundCard;
