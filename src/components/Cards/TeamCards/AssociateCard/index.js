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
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";

// Otis Kit PRO components
import MKBox from "components/MKBox";
import MKTypography from "components/MKTypography";

import './AssociateCard.css'

function AssociateCard({ image, name, username, customName, bio }) {
  return (
    <Card sx={{
      mt: '15px',
      minHeight: { lg: '175px' },
      maxHeight: { lg: '175px' },
    }}>
      <Grid container>
        <Grid item xs={12} md={6} lg={4} sx={{ mt: -6 }}>
          <MKBox width="100%" pt={2} pb={1} px={2}>
            <div
              id="associate-profile-picture"
              style={{ backgroundImage: `url(${image})` }}
            />
          </MKBox>
        </Grid>
        <Grid item xs={12} md={6} lg={8} sx={{ my: "auto" }}>
          <MKBox pt={{ xs: 1, lg: 2.5 }} pb={2.5} pr={4} pl={{ xs: 4, lg: 1 }} lineHeight={1}>
            <MKTypography variant="h4">{customName || name}</MKTypography>
            {username && (
              <MKTypography variant="h5" color="text">
                @{username}
              </MKTypography>
            )}
            {bio && (
              <MKTypography mt={1} variant="body2" color="text">
                <quote>"{bio.substring(0, 64).trim()}..."</quote>
              </MKTypography>
            )}
          </MKBox>
        </Grid>
      </Grid>
    </Card>
  );
}

// Typechecking props for the AssociateCard
AssociateCard.propTypes = {
  image: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  username: PropTypes.string,
  customName: PropTypes.string,
  bio: PropTypes.string,
};

export default AssociateCard;
