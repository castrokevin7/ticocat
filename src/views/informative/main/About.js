// @mui material components
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";

// Otis Kit PRO components
import MKBox from "components/MKBox";
import MKTypography from "components/MKTypography";

// Coworking page component
import FilledInfoCard from "components/Cards/InfoCards/FilledInfoCard";

import Translator from 'utils/Translator';

import { Storage } from 'aws-amplify';

import { useEffect, useState } from 'react';

function About() {
  const [statutesUrl, setStatutesUrl] = useState(null);

  useEffect(() => {
    getStatutesUrl().then(url => setStatutesUrl(url));
  }, []);

  const getStatutesUrl = async () => {
    const url = await Storage.get('Estatutos.pdf', { expires: 60 });
    return url;
  }

  return (
    <MKBox sx={{
      backgroundColor: ({ palette: { bgcolor1 }, functions: { rgba } }) => rgba(bgcolor1.main, 0.4),
      borderTopRightRadius: '0.75rem',
      borderTopLeftRadius: '0.75rem',
    }} id="acerca" component="section" py={6} pt={12} pb={12}>
      <Container sx={{ mt: '10px' }}>
        <Grid container display="flex" alignItems="center">
          <Grid container mb={2}>
            <MKTypography variant="h3" my={1} mb={2}>
              {Translator.instance.translate("about_context_title")}
            </MKTypography>
            <iframe
              style={{ borderRadius: "12px", marginBottom: "20px" }}
              src="https://open.spotify.com/embed/episode/6FzLsELhfLPm4CGWDzoyjf?utm_source=generator&theme=0"
              width="100%"
              height="152"
              frameBorder="0"
              allowFullScreen=""
              allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
              loading="lazy" />
            <MKTypography variant="body1" color="text" mb={2}>
              {Translator.instance.translate("about_context_description")}
            </MKTypography>
            <MKTypography variant="body1" color="text" mb={2}>
              {Translator.instance.translate("about_context_description_follow")}
            </MKTypography>
            <MKTypography variant="body1" color="text" mb={2}>
              {Translator.instance.translate("about_context_registrarion_information")}
              {' '}
              <MKTypography
                component="a"
                target="_blank"
                href="https://justicia.gencat.cat/ca/serveis/guia_d_entitats?idEntitat=106901#"
                variant="body1"
                color="info"
                fontWeight="regular"
              >
                {Translator.instance.translate("benefits_page_benefits_verification_link")}
              </MKTypography>
              .
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
            <Grid item xs={12}>
              <a style={{ float: 'right', marginTop: '10px' }} href={statutesUrl} target="_blank" rel="noreferrer">{Translator.instance.translate("about_download_statutes")}</a>
            </Grid>
          </Grid>
        </Grid>
      </Container>
    </MKBox>
  );
}

export default About;