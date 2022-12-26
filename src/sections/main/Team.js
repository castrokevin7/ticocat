// @mui material components
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Icon from "@mui/material/Icon";

// Otis Kit PRO components
import MKBox from "components/MKBox";
import MKTypography from "components/MKTypography";

import TicoCatTeamMemberCard from "examples/Cards/TeamCards/TicoCatTeamMemberCard";

// Images
import jordiPhoto from "assets/images/team/jordi.png";
import gloPhoto from "assets/images/team/glo.png";
import kevinPhoto from "assets/images/team/kevin.png";
import raquePhoto from "assets/images/team/raque.png";
import alePhoto from "assets/images/team/ale.png";

import Translator from 'utils/Translator';

function Team() {

  return (
    <MKBox id="equipo" component="section" py={6} pt={10}>
      <Container>
        <Grid container item flexDirection="column" xs={12} lg={7} mb={6}>
          <MKBox
            display="flex"
            alignItems="center"
            justifyContent="center"
            width="3rem"
            height="3rem"
            variant="gradient"
            bgColor="info"
            color="white"
            shadow="md"
            borderRadius="lg"
            mb={2}
          >
            <Icon>supervisor_account</Icon>
          </MKBox>
          <MKTypography variant="h3" mb={1}>
              {Translator.instance.translate("team_title")}
          </MKTypography>
          <MKTypography variant="body1" color="text">
            {Translator.instance.translate("team_description")}.
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
                arrivalTime={Translator.instance.translate("team_jordi_arribada")}
                occupation={Translator.instance.translate("team_jordi_occupation")}
                contributions={Translator.instance.translate("team_jordi_contributions")}
                reasonOfParticipation={Translator.instance.translate("team_jordi_reasons")}
              />
            </MKBox>
          </Grid>
          <Grid item xs={12} lg={12}>
            <MKBox mb={1}>
              <TicoCatTeamMemberCard
                image={gloPhoto}
                name="Gloriana Sánchez"
                position={{ color: "dark", label: "team_vicepresident_position" }}
                from="San Pablo, Heredia"
                arrivalTime={Translator.instance.translate("team_glo_arribada")}
                occupation={Translator.instance.translate("team_glo_occupation")}
                contributions={Translator.instance.translate("team_glo_contributions")}
                reasonOfParticipation={Translator.instance.translate("team_glo_reasons")}
              />
            </MKBox>
          </Grid>
          <Grid item xs={12} lg={12}>
            <MKBox mb={1}>
              <TicoCatTeamMemberCard
                image={kevinPhoto}
                name="Kevin Castro"
                position={{ color: "dark", label: "team_secretary_position" }}
                from="Pococí, Limón"
                arrivalTime={Translator.instance.translate("team_kevin_arribada")}
                occupation={Translator.instance.translate("team_kevin_occupation")}
                contributions={Translator.instance.translate("team_kevin_contributions")}
                reasonOfParticipation={Translator.instance.translate("team_kevin_reasons")}
              />
            </MKBox>
          </Grid>
          <Grid item xs={12} lg={12}>
            <MKBox mb={1}>
              <TicoCatTeamMemberCard
                image={raquePhoto}
                name="Raquel Sáenz"
                position={{ color: "dark", label: "team_treasurer_position" }}
                from="Curridabat, San José⁣"
                arrivalTime={Translator.instance.translate("team_raque_arribada")}
                occupation={Translator.instance.translate("team_raque_occupation")}
                contributions={Translator.instance.translate("team_raque_contributions")}
                reasonOfParticipation={Translator.instance.translate("team_raque_reasons")}
              />
            </MKBox>
          </Grid>
          <Grid item xs={12} lg={12}>
            <MKBox mb={1}>
              <TicoCatTeamMemberCard
                image={alePhoto}
                name="Alejandra Sandino"
                position={{ color: "dark", label: "team_vocal_position" }}
                from="Moravia, San José⁣"
                arrivalTime={Translator.instance.translate("team_ale_arribada")}
                occupation={Translator.instance.translate("team_ale_occupation")}
                contributions={Translator.instance.translate("team_ale_contributions")}
                reasonOfParticipation={Translator.instance.translate("team_ale_reasons")}
              />
            </MKBox>
          </Grid>
        </Grid>
      </Container>
    </MKBox>
  );
}

export default Team;