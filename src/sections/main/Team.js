// @mui material components
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Icon from "@mui/material/Icon";

// Otis Kit PRO components
import MKBox from "components/MKBox";
import MKTypography from "components/MKTypography";

import TicoCatTeamMemberCard from "examples/Cards/TeamCards/TicoCatTeamMemberCard";

// Images
import jordiPhoto from "assets/images/team/jordi.jpg";
import belenyPhoto from "assets/images/team/beleny.jpg";
import kevinPhoto from "assets/images/team/kevin.jpg";
import nathaliePhoto from "assets/images/team/nathalie.jpg";
import michaelPhoto from "assets/images/team/michael.jpg";
import erickPhoto from "assets/images/team/erick.jpg";

import Translator from 'utils/Translator';

function Team() {

  return (
    <MKBox sx={{
      backgroundColor: ({ palette: { bgcolor1 }, functions: { rgba } }) => rgba(bgcolor1.main, 0.4),
    }} id="equipo" component="section" py={6} pt={12} pb={12}>
      <Container sx={{ mt: '10px' }}>
        <Grid
          container
          item
          flexDirection="column"
          justifyContent="center"
          alignItems="center"
          xs={12}
          sx={{ mx: "auto", textAlign: "center" }}
        >
          <MKBox
            width="3rem"
            height="3rem"
            borderRadius="lg"
            shadow="md"
            variant="gradient"
            bgColor="info"
            color="white"
            display="flex"
            alignItems="center"
            justifyContent="center"
          >
            <Icon fontSize="small" sx={{ opacity: 0.8 }}>
              supervisor_account
            </Icon>
          </MKBox>
          <MKTypography variant="h3" mt={3}>
            {Translator.instance.translate("team_title")}
          </MKTypography>
          <MKTypography variant="body1" color="text" mt={1}>
            {Translator.instance.translate("team_description")}
          </MKTypography>
        </Grid>
        <Grid container spacing={5} mt={6}>
          <Grid item xs={12} lg={12}>
            <MKBox mb={1}>
              <TicoCatTeamMemberCard
                image={jordiPhoto}
                name="Jordi Parés"
                position={{ color: "dark", label: "team_president_position" }}
                from="Guadalupe⁣, San José"
                arrivalTime={Translator.instance.translate("team_president_arrival")}
                occupation={Translator.instance.translate("team_president_occupation")}
                contributions={Translator.instance.translate("team_president_contributions")}
                reasonOfParticipation={Translator.instance.translate("team_president_reasons")}
              />
            </MKBox>
          </Grid>
          <Grid item xs={12} lg={12}>
            <MKBox mb={1}>
              <TicoCatTeamMemberCard
                image={belenyPhoto}
                name="Beleny Chaves"
                position={{ color: "dark", label: "team_vicepresident_position" }}
                from="La Guácima, Alajuela"
                arrivalTime={Translator.instance.translate("team_vicepresident_arrival")}
                occupation={Translator.instance.translate("team_vicepresident_occupation")}
                contributions={Translator.instance.translate("team_vicepresident_contributions")}
                reasonOfParticipation={Translator.instance.translate("team_vicepresident_reasons")}
              />
            </MKBox>
          </Grid>
          <Grid item xs={12} lg={12}>
            <MKBox mb={1}>
              <TicoCatTeamMemberCard
                image={kevinPhoto}
                name="Kevin Castro"
                position={{ color: "dark", label: "team_secretary_position" }}
                from="Cariari, Pococí, Limón"
                arrivalTime={Translator.instance.translate("team_secretary_arrival")}
                occupation={Translator.instance.translate("team_secretary_occupation")}
                contributions={Translator.instance.translate("team_secretary_contributions")}
                reasonOfParticipation={Translator.instance.translate("team_secretary_reasons")}
              />
            </MKBox>
          </Grid>
          <Grid item xs={12} lg={12}>
            <MKBox mb={1}>
              <TicoCatTeamMemberCard
                image={nathaliePhoto}
                name="Nathalie Horvilleur"
                position={{ color: "dark", label: "team_treasurer_position" }}
                from="Curridabat, San José⁣"
                arrivalTime={Translator.instance.translate("team_treasury_arrival")}
                occupation={Translator.instance.translate("team_treasury_occupation")}
                contributions={Translator.instance.translate("team_treasury_contributions")}
                reasonOfParticipation={Translator.instance.translate("team_treasury_reasons")}
              />
            </MKBox>
          </Grid>
          <Grid item xs={12} lg={12}>
            <MKBox mb={1}>
              <TicoCatTeamMemberCard
                image={michaelPhoto}
                name="Michael Salazar"
                position={{ color: "dark", label: "team_vocal_position" }}
                from="Puntarenas / Los Angeles, California"
                arrivalTime={Translator.instance.translate("team_vocal_one_arrival")}
                occupation={Translator.instance.translate("team_vocal_one_occupation")}
                contributions={Translator.instance.translate("team_vocal_one_contributions")}
                reasonOfParticipation={Translator.instance.translate("team_vocal_one_reasons")}
              />
            </MKBox>
          </Grid>
          <Grid item xs={12} lg={12}>
            <MKBox mb={1}>
              <TicoCatTeamMemberCard
                image={erickPhoto}
                name="Erik Sandoval"
                position={{ color: "dark", label: "team_vocal_position" }}
                from="Paraíso, Cartago"
                arrivalTime={Translator.instance.translate("team_vocal_two_arrival")}
                occupation={Translator.instance.translate("team_vocal_two_occupation")}
                contributions={Translator.instance.translate("team_vocal_two_contributions")}
                reasonOfParticipation={Translator.instance.translate("team_vocal_two_reasons")}
              />
            </MKBox>
          </Grid>
        </Grid>
      </Container>
    </MKBox>
  );
}

export default Team;