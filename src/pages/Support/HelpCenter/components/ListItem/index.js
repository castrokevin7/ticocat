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

// Otis Kit PRO components
import MKBox from "components/MKBox";
import MKTypography from "components/MKTypography";

function ListItem({ title, children }) {
  return (
    <MKBox p={2}>
      <MKTypography variant="h5" mb={1}>
        {title}
      </MKTypography>
      <MKTypography variant="body2" color="text" mb={2}>
        {children}
      </MKTypography>
    </MKBox>
  );
}

// Typechecking props for the ListItem
ListItem.propTypes = {
  title: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
};

export default ListItem;
