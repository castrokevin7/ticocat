// @mui material components
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";

// Otis Kit PRO components
import MKBox from "components/MKBox";
import MKTypography from "components/MKTypography";

// Coworking page component
import FilledInfoCard from "examples/Cards/InfoCards/FilledInfoCard";

import Translator from 'utils/Translator';

function About() {
  return (
    <MKBox id="acerca" component="section" py={6} pt={12}>
      <Container>
        <Grid container display="flex" alignItems="center">
          <Grid container mb={2}>
            <MKTypography variant="h3" my={1} mb={2}>
              {Translator.instance.translate("about_context_title")}
            </MKTypography>
            <MKTypography variant="body1" color="text" mb={2}>
              {Translator.instance.translate("about_context_description")}
            </MKTypography>
          </Grid>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <FilledInfoCard
                variant="gradient"
                color="info"
                icon="notes_rounded"
                title={Translator.instance.translate("about_vision_title")}
                description={Translator.instance.translate("about_vision_description")}
              />
            </Grid>
            <Grid item xs={12}>
              <FilledInfoCard
                variant="gradient"
                color="info"
                icon="notes_rounded"
                title={Translator.instance.translate("about_mission_title")}
                description={Translator.instance.translate("about_mission_description")}
              />
            </Grid>
          </Grid>
        </Grid>
      </Container>
    </MKBox>
  );
}

export default About;