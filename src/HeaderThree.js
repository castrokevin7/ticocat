// @mui material components
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Link from "@mui/material/Link";
import Stack from "@mui/material/Stack";

// Otis Kit PRO components
import MKBox from "components/MKBox";
import MKTypography from "components/MKTypography";

// Images
import bgImage from "assets/images/bg-cr.jpg";

function HeaderThree() {
  return (
    <MKBox component="header" position="relative">
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
            <MKTypography
              variant="h1"
              color="white"
              sx={({ breakpoints, typography: { size } }) => ({
                [breakpoints.down("md")]: {
                  fontSize: size["3xl"],
                },
              })}
              mb={3}
            >
              La Aso TicoCat
            </MKTypography>
            <MKTypography variant="body1" color="white" mt={1} mb={{ xs: 3, sm: 8 }} px={3}>
              Asociación Cultural Costarricense Catalana
            </MKTypography>
            <MKTypography variant="h6" color="white" textTransform="uppercase" mb={3}>
              conecta con nosotros en:
            </MKTypography>
            <Stack direction="row" spacing={6} mx="auto">
              <MKTypography
                component={Link}
                href="https://www.facebook.com/ticocat"
                target="_blank"
                variant="body2"
              >
                <MKBox component="i" color="white" className="fa fa-facebook" />
              </MKTypography>
              <MKTypography
                component={Link}
                href="https://www.instagram.com/asoticocat/"
                target="_blank"
                variant="body2"
              >
                <MKBox component="i" color="white" className="fa fa-instagram" />
              </MKTypography>
              <MKTypography
                component={Link}
                href="mailto:asoticocat@gmail.com"
                target="_blank"
                variant="body2"
              >
                <MKBox component="i" color="white" className="fa fa-envelope-o" />
              </MKTypography>
            </Stack>
          </Grid>
        </Container>
      </MKBox>
    </MKBox>
  );
}

export default HeaderThree;