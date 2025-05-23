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

// prop-types is a library for typechecking of props.
import PropTypes from "prop-types";

// react-countup component
import CountUp from "react-countup";

// Otis Kit PRO components
import MKBox from "components/MKBox";
import MKTypography from "components/MKTypography";

import Translator from 'utils/Translator';

function DefaultCounterCard({ color, count, title, description, ...rest }) {
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
        <MKTypography variant="body3" color="white">
          {description}
        </MKTypography>
      )}
    </MKBox>
  );
}

// Setting default props for the DefaultCounterCard
DefaultCounterCard.defaultProps = {
  color: "info",
  description: "",
  title: "",
};

// Typechecking props for the DefaultCounterCard
DefaultCounterCard.propTypes = {
  color: PropTypes.oneOf([
    "primary",
    "secondary",
    "info",
    "success",
    "warning",
    "error",
    "light",
    "dark",
  ]),
  count: PropTypes.number,
  title: PropTypes.string,
  description: PropTypes.string,
};

export default DefaultCounterCard;
