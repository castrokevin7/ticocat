// @mui material components
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Link from "@mui/material/Link";
import Stack from "@mui/material/Stack";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import EmailIcon from "@mui/icons-material/Email";

// Otis Kit PRO components
import MKBox from "components/MKBox";
import MKTypography from "components/MKTypography";

// Images
import bgImage from "assets/images/bg-cr.png";

import Translator from 'utils/Translator';

import logo from "assets/images/logo-asoticocat-white.png";
import MKButton from "components/MKButton";

function Home() {
  return (
    <MKBox id="#" component="header" position="relative">
      <MKBox
        display="flex"
        alignItems="center"
        minHeight="100vh"
        sx={{
          backgroundImage: ({ palette: { gradients }, functions: { linearGradient, rgba } }) => `${linearGradient(rgba(gradients.dark.main, 0.4), rgba(gradients.dark.state, 0.4))}, url(${bgImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <Container>
          <Grid
            container
            item
            xs={12}
            lg={6}
            flexDirection="column"
            justifyContent="center"
            alignItems="center"
            textAlign="center"
            mx="auto"
          >
            <Grid item xs={8} sx={{ mt: -6 }}>
              <MKBox width="100%" pt={2} pb={1} px={2}>
                <MKBox
                  component="img"
                  src={logo}
                  alt={"TICOCAT Logo"}
                  width="100%"
                />
              </MKBox>
            </Grid>
            <MKTypography fontWeight="bold" variant="body1" color="white" mt={1} px={3}>
              {Translator.instance.translate("home_main_title")}
            </MKTypography>
            <MKButton
              component="a"
              href="mailto:asoticocat@gmail.com?Subject=Quiero asociarme"
              target="_blank"
              rel="noreferrer"
              color="white"
              size="small"
              sx={{ my: { xs: 3, sm: 8 } }}
            >
              {Translator.instance.translate("associates_counter_action")}
            </MKButton>
            <MKTypography fontWeight="bold" variant="body1" color="white" mb={3}>
              {Translator.instance.translate("home_text")}:
            </MKTypography>
            <Stack direction="row" spacing={6} mx="auto">
              <MKTypography
                component={Link}
                href="https://www.facebook.com/ticocat"
                target="_blank"
                variant="body1"
              >
                <MKBox component="i" color="white">
                  <FacebookIcon fontSize="small" />
                </MKBox>
              </MKTypography>
              <MKTypography
                component={Link}
                href="https://www.instagram.com/asoticocat/"
                target="_blank"
                variant="body1"
              >
                <MKBox component="i" color="white">
                  <InstagramIcon fontSize="small" />
                </MKBox>
              </MKTypography>
              <MKTypography
                component={Link}
                href="mailto:asoticocat@gmail.com"
                target="_blank"
                variant="body1"
              >
                <MKBox component="i" color="white">
                  <EmailIcon fontSize="small" />
                </MKBox>
              </MKTypography>
            </Stack>
          </Grid>
        </Container>
      </MKBox>
    </MKBox>
  );
}

export default Home;
