import React from 'react';
// @mui material components
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Icon from "@mui/material/Icon";

// Otis Kit PRO components
import MKBox from "../../../components/MKBox";
import MKTypography from "../../../components/MKTypography";

import TicoCatTeamMemberCard from "./TicoCatTeamMemberCard";

// Images
import presidentPhoto from "assets/images/team/president.jpg";
import secretaryPhoto from "assets/images/team/secretary.jpg";
import vicepresidentPhoto from "assets/images/team/vicepresident.jpg";
import treasurerPhoto from "assets/images/team/treasurer.jpg";
import member1Photo from "assets/images/team/member1.jpg";
import member2Photo from "assets/images/team/member2.jpg";
import member3Photo from "assets/images/team/member3.jpg";
import substitutionPhoto from "assets/images/team/substitution.jpg";


import Translator from '../../../utils/Translator';

function Team() {

  return (
    <MKBox sx={{
      backgroundColor: ({ palette: { bgcolor1 }, functions: { rgba } }: any) => rgba(bgcolor1.main, 0.4),
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
                image={presidentPhoto}
                name="Raquel Saenz"
                position={{ color: "dark", label: "team_president_position" }}
                from="Curridabat, San José"
                nowLiving="Badalona"
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
                image={vicepresidentPhoto}
                name="Jairo Javier Sánchez Mejías"
                position={{ color: "dark", label: "team_vicepresident_position" }}
                from="Alajuela"
                nowLiving="Sant Martí, Barcelona"
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
                image={secretaryPhoto}
                name="Ana Laura Jiménez Ortega"
                position={{ color: "dark", label: "team_secretary_position" }}
                from="San Jose, Costa Rica"
                nowLiving="Gràcia, Barcelona"
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
                image={treasurerPhoto}
                name="Fernando Arturo Morales Calvo"
                position={{ color: "dark", label: "team_treasury_position" }}
                from="Santa Ana"
                nowLiving="Eixample, Barcelona"
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
                image={member1Photo}
                name="Sergio Alberto Ugalde Resenterra"
                position={{ color: "dark", label: "team_vocal_position" }}
                from="Barrio México, San José"
                nowLiving="L'Hospitalet de Llobregat"
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
                image={member2Photo}
                name="Carolina Cordero Alfaro"
                position={{ color: "dark", label: "team_vocal_position" }}
                from="Ciudad Colón"
                nowLiving="Sarriá, Barcelona"
                arrivalTime={Translator.instance.translate("team_vocal_two_arrival")}
                occupation={Translator.instance.translate("team_vocal_two_occupation")}
                contributions={Translator.instance.translate("team_vocal_two_contributions")}
                reasonOfParticipation={Translator.instance.translate("team_vocal_two_reasons")}
              />
            </MKBox>
          </Grid>
          <Grid item xs={12} lg={12}>
            <MKBox mb={1}>
              <TicoCatTeamMemberCard
                image={member3Photo}
                name="Montgomery Miralles Mora"
                position={{ color: "dark", label: "team_vocal_position" }}
                from="Cedros de Montes de Oca"
                nowLiving="Sant Quirze del Vallès"
                arrivalTime={Translator.instance.translate("team_vocal_three_arrival")}
                occupation={Translator.instance.translate("team_vocal_three_occupation")}
                contributions={Translator.instance.translate("team_vocal_three_contributions")}
                reasonOfParticipation={Translator.instance.translate("team_vocal_three_reasons")}
              />
            </MKBox>
          </Grid>
          <Grid item xs={12} lg={12}>
            <MKBox mb={1}>
              <TicoCatTeamMemberCard
                image={substitutionPhoto}
                name="Karla Marlene Mena Aguilar"
                position={{ color: "dark", label: "team_substitution_position" }}
                from="Cartago"
                nowLiving="Gràcia, Barcelona"
                arrivalTime={Translator.instance.translate("team_substitution_arrival")}
                occupation={Translator.instance.translate("team_substitution_occupation")}
                contributions={Translator.instance.translate("team_substitution_contributions")}
                reasonOfParticipation={Translator.instance.translate("team_substitution_reasons")}
              />
            </MKBox>
          </Grid>
        </Grid>
      </Container>
    </MKBox>
  );
}

export default Team;
