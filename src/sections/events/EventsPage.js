// react-router-dom components
import { Link } from "react-router-dom";

// @mui material components
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";

// Otis Kit PRO components
import MKBox from "components/MKBox";
import MKTypography from "components/MKTypography";

// Otis Kit PRO examples
import SimpleBackgroundCard from "examples/Cards/BackgroundCards/SimpleBackgroundCard";

// Images
import post1 from "assets/images/examples/blog1.jpg";
import post2 from "assets/images/examples/blog2.jpg";
import post3 from "assets/images/examples/blog3.jpg";

import DefaultNavbar from "examples/Navbars/DefaultNavbar";

// Images
import bgImage from "assets/images/bg-coworking.jpeg";

function EventsPage() {
  return (    
    <>
      <DefaultNavbar
          routes={[]}
          center
          sticky
          brand="asoticocat"
          action={{
            route: "/",
            color: "info",
            icon: "arrow_circle_left_rounded",
            variant: "text",
            size: "large"
          }}
      />
      <MKBox component="header" position="relative">
        <MKBox
          display="flex"
          alignItems="center"
          minHeight="100vh"
          sx={{
            backgroundImage: ({ palette: { gradients }, functions: { linearGradient, rgba } }) => `${linearGradient(rgba(gradients.dark.main, 0.5), rgba(gradients.dark.state, 0.5))}, url(${bgImage})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <Container>
            <Grid container item xs={12} md={7} lg={6} flexDirection="column" justifyContent="center">
              <MKTypography
                variant="h1"
                color="white"
                mb={3}
                sx={({ breakpoints, typography: { size } }) => ({
                  [breakpoints.down("md")]: {
                    fontSize: size["3xl"],
                  },
                })}
              >
                Material Kit
              </MKTypography>
              <MKTypography variant="body1" color="white" opacity={0.8} pr={6} mr={6}>
                The time is now for it be okay to be great. People in this world shun people for being
                nice.
              </MKTypography>
            </Grid>
          </Container>
        </MKBox>
      </MKBox>
      <Card
          sx={{
          p: 2,
          mx: { xs: 2, lg: 3 },
          mt: -8,
          mb: 4,
          backgroundColor: ({ palette: { white }, functions: { rgba } }) => rgba(white.main, 0.8),
          backdropFilter: "saturate(200%) blur(30px)",
          boxShadow: ({ boxShadows: { xxl } }) => xxl,
          }}
      >
        <MKBox component="section" py={6}>
          <Container>
            <Grid container item xs={12} lg={6} flexDirection="column">
              <MKTypography variant="h3" mt={3} mb={1}>
                Build something great
              </MKTypography>
              <MKTypography variant="body2" color="text" mb={2}>
                We&apos;re constantly trying to express ourselves and actualize our dreams. If you have
                the opportunity to play this game of life you need to appreciate every moment.
              </MKTypography>
            </Grid>
            <Grid container spacing={3} mt={3}>
              <Grid item xs={12} lg={4}>
                <Link to="/sections/page-sections/blog-posts">
                  <SimpleBackgroundCard
                    image={post1}
                    title="Search and Discovery"
                    description="Website visitors today demand a frictionless user expericence — especially when
                        using search. Because of the hight standards we tend to offer."
                  />
                </Link>
              </Grid>
              <Grid item xs={12} lg={4}>
                <Link to="/sections/page-sections/blog-posts">
                  <SimpleBackgroundCard
                    image={post2}
                    title="Last visits in US"
                    description="Wealth creation is an evolutionarily recent positive-sum game. Status is an old
                        zero-sum game. Those attacking wealth creation are often just seeking status."
                  />
                </Link>
              </Grid>
              <Grid item xs={12} lg={4}>
                <Link to="/sections/page-sections/blog-posts">
                  <SimpleBackgroundCard
                    image={post3}
                    title="Grow in a beautiful area"
                    description="Free people make free choices. Free choices mean you get unequal outcomes. You
                        can have freedom, or you can have equal outcomes. You can't have both."
                  />
                </Link>
              </Grid>
            </Grid>
          </Container>
        </MKBox>
      </Card>
    </>
  );
}

export default EventsPage;