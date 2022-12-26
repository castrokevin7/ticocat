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

import Translator from 'utils/Translator';

function TicoCatTeamMemberCard({ 
  image, 
  name, 
  position, 
  from,
  arrivalTime,
  occupation,
  reasonOfParticipation,
  contributions 
}) {
  return (
    <Card sx={{ mt: 3 }}>
      <Grid container>
        <Grid item xs={12} md={6} lg={4} sx={{ mt: -6 }}>
          <MKBox width="100%" pt={2} pb={1} px={2}>
            <MKBox
              component="img"
              src={image}
              alt={name}
              width="100%"
              borderRadius="md"
              shadow="lg"
            />
          </MKBox>
        </Grid>
        <Grid item xs={12} md={6} lg={8} sx={{ my: "auto" }}>
          <MKBox pt={{ xs: 1, lg: 2.5 }} pb={2.5} pr={4} pl={{ xs: 4, lg: 1 }} lineHeight={1}>
            <MKTypography variant="h5">{name}</MKTypography>
            <MKTypography variant="h6" color={position.color} mb={1}>
              {Translator.instance.translate(position.label)}
            </MKTypography>
            <MKTypography variant="body1" color="text">
              📍 {Translator.instance.translate("team_from_prefix")}: {from}.
            </MKTypography>
            <MKTypography variant="body1" color="text">
              ⏱️ {Translator.instance.translate("team_arrival_prefix")}: {arrivalTime}.
            </MKTypography>
            <MKTypography variant="body1" color="text">
              👩🏼‍💻 {Translator.instance.translate("team_occupation_prefix")}: {occupation}.
            </MKTypography>
            <MKTypography variant="body1" color="text">
              💡 {Translator.instance.translate("team_contributions_prefix")}: {contributions}.
            </MKTypography>
            <MKTypography variant="body1" color="text">
              🎟️ {Translator.instance.translate("team_reasons_prefix")}: "{reasonOfParticipation}."
            </MKTypography>
          </MKBox>
        </Grid>
      </Grid>
    </Card>
  );
}

// Typechecking props for the TicoCatTeamMemberCard
TicoCatTeamMemberCard.propTypes = {
  image: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  position: PropTypes.shape({
    color: PropTypes.oneOf([
      "primary",
      "secondary",
      "info",
      "success",
      "warning",
      "error",
      "dark",
      "light",
    ]),
    label: PropTypes.string.isRequired,
  }).isRequired,
  from: PropTypes.string.isRequired,
  arrivalTime: PropTypes.string.isRequired,
  occupation: PropTypes.string.isRequired,
  reasonOfParticipation: PropTypes.string.isRequired,
  contributions: PropTypes.string.isRequired,
};

export default TicoCatTeamMemberCard;
