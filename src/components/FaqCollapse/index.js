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

// prop-types is a library for typechecking of props
import PropTypes from "prop-types";

// @mui material components
import Icon from "@mui/material/Icon";
import Collapse from "@mui/material/Collapse";

// Otis Kit PRO components
import MKBox from "components/MKBox";
import MKTypography from "components/MKTypography";
import { Link } from "react-router-dom";
import { getLang } from 'utils/Translator';

function FaqCollapse({ faqId, title, open, children, ...rest }) {
  return (
    <MKBox mb={2}>
      <MKBox
        {...rest}
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        py={2}
        sx={{
          cursor: "pointer",
          borderBottom: ({ borders: { borderWidth, borderColor } }) =>
            `${borderWidth[1]} solid ${borderColor}`,
        }}
      >
        <MKBox sx={{ overflowX: 'auto' }} display="flex" alignItems="center" color={open ? "dark" : "text"}>
          <Link target="_blank" to={`/${getLang()}/faq/${faqId}`}>
            <Icon sx={{ fontWeight: "bold", marginRight: 1, marginTop: 1 }} fontSize="small">
              open_in_new_rounded
            </Icon>
          </Link>
          <MKTypography variant="h4" color={open ? "dark" : "text"} sx={{ userSelect: "none" }}>
            {title}
          </MKTypography>
        </MKBox>
        <MKBox color={open ? "dark" : "text"}>
          <Icon sx={{ fontWeight: "bold" }} fontSize="small">
            {open ? "remove" : "add"}
          </Icon>
        </MKBox>
      </MKBox>
      <Collapse timeout={400} in={open}>
        <MKBox py={2} lineHeight={1}>
          <MKTypography variant="button" color="text" opacity={0.8} fontWeight="regular">
            {children}
          </MKTypography>
        </MKBox>
      </Collapse>
    </MKBox>
  );
}

// Typechecking props for the FaqCollapse
FaqCollapse.propTypes = {
  faqId: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  open: PropTypes.bool.isRequired,
  children: PropTypes.node.isRequired,
};

export default FaqCollapse;
