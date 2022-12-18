// @mui material components
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";

// Otis Kit PRO components
import MKBox from "components/MKBox";
import MKTypography from "components/MKTypography";

// Coworking page component
import FilledInfoCard from "examples/Cards/InfoCards/FilledInfoCard";

import Divider from "@mui/material/Divider";

import Translator from 'utils/Translator';

function About() {
  return (
    <MKBox id="acerca" component="section" py={6} pt={12}>
      <Container>
        <Grid container alignItems="center">
          <Grid item xs={12} lg={5}>
            <MKTypography variant="h3" my={1}>                
                {Translator.instance.translate("about_context_title")}
            </MKTypography>
            <MKTypography variant="body2" color="text" mb={2}>
                {Translator.instance.translate("about_context_description")}
            </MKTypography>
          </Grid>
          <Grid item xs={12} lg={6} sx={{ ml: { lg: "auto" }, mt: { xs: 6, lg: 0 } }}>
            <Stack>
                <FilledInfoCard
                    variant="gradient"
                    color="info"
                    icon="notes_rounded"
                    title={Translator.instance.translate("about_vision_title")}
                    description={Translator.instance.translate("about_vision_description")}
                  />
                <Divider sx={{ my: { xs: 2, sm: 8 }, mx: 12 }} />
                <FilledInfoCard
                    variant="gradient"
                    color="info"
                    icon="notes_rounded"
                    title={Translator.instance.translate("about_mission_title")}
                    description={Translator.instance.translate("about_mission_description")}
                />
            </Stack>
          </Grid>
        </Grid>
      </Container>
    </MKBox>
  );
}

export default About;