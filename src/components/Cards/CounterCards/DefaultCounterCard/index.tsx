/*
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

// react-countup component
import CountUp from "react-countup";

// Otis Kit PRO components
import MKBox from "../../../MKBox";
import MKTypography from "../../../MKTypography";

import Translator from '../../../../utils/Translator';

type ColorType = "primary" | "secondary" | "info" | "success" | "warning" | "error" | "light" | "dark";

interface DefaultCounterCardProps {
  color?: ColorType;
  count: number | null;
  title?: string;
  description?: string;
}

function DefaultCounterCard({
  color = "info",
  count,
  title = "",
  description = "",
  ...rest
}: DefaultCounterCardProps) {
  return (
    <MKBox mb={4} p={2} textAlign="center" lineHeight={1}>
      {count === null || count === 0 ?
        <MKTypography variant="h3" color="white">
          {Translator.instance.translate("associates_count_zero")}
        </MKTypography>
        :
        <MKTypography variant="h1" color={color} textGradient>
          <CountUp end={count} duration={1} {...rest} />
        </MKTypography>
      }
      {title && (
        <MKTypography variant="h3" mt={count !== null && count !== 0 ? 1 : 0} mb={1} color="white">
          {title}
        </MKTypography>
      )}
      {description && (
        <MKTypography variant="body2" color="white">
          {description}
        </MKTypography>
      )}
    </MKBox>
  );
}

export default DefaultCounterCard;
