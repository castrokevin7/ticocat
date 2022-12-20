import { useParams } from 'react-router';

// @mui material components
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";

// Otis Kit PRO components
import MKBox from "components/MKBox";
import MKBadge from "components/MKBadge";
import MKTypography from "components/MKTypography";

import DefaultNavbar from "examples/Navbars/DefaultNavbar";

// Images
import bg1 from "assets/images/bg.jpg";
import bg2 from "assets/images/examples/content-1.jpg";
import bg3 from "assets/images/examples/content-2.jpg";
import bg4 from "assets/images/examples/content-3.jpg";
import bg5 from "assets/images/examples/content-4.jpg";
import bg6 from "assets/images/examples/content-5.jpg";

function EventPage() {
  const { id } = useParams();

  return (
    <>
        <DefaultNavbar
            routes={[]}
            center
            sticky
            brand="asoticocat"
            action={{
                route: "/eventos",
                color: "info",
                icon: "arrow_circle_left_rounded",
                variant: "text",
                size: "large"
            }}
        />
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
                    <Grid
                    container
                    item
                    xs={8}
                    flexDirection="column"
                    alignItems="center"
                    mx="auto"
                    textAlign="center"
                    mb={6}
                    >
                    <MKBadge
                        badgeContent="co-working"
                        variant="contained"
                        color="info"
                        container
                        sx={{ mb: 1 }}
                    />
                    <MKTypography variant="h2" mb={1}>
                        Event {id}
                    </MKTypography>
                    <MKTypography variant="body2" color="text">
                        If you can&apos;t decide, the answer is no. If two equally difficult paths, choose the
                        one more painful in the short term (pain avoidance is creating an illusion of equality).
                    </MKTypography>
                    </Grid>
                    <Grid container spacing={3} minHeight="40vh">
                    <Grid item xs={5} sm={4}>
                        <MKBox
                        width="100%"
                        height="100%"
                        borderRadius="lg"
                        shadow="md"
                        sx={{
                            backgroundImage: `url(${bg1})`,
                            backgroundSize: "cover",
                        }}
                        />
                    </Grid>
                    <Grid item xs={7} sm={3}>
                        <MKBox
                        width="100%"
                        height="100%"
                        borderRadius="lg"
                        shadow="md"
                        sx={{
                            backgroundImage: `url(${bg2})`,
                            backgroundSize: "cover",
                        }}
                        />
                    </Grid>
                    <Grid item xs={12} sm={5}>
                        <MKBox
                        width="100%"
                        height="100%"
                        borderRadius="lg"
                        shadow="md"
                        sx={{
                            backgroundImage: `url(${bg3})`,
                            backgroundSize: "cover",
                        }}
                        />
                    </Grid>
                    <Grid item xs={7} sm={3}>
                        <MKBox
                        width="100%"
                        height="100%"
                        borderRadius="lg"
                        shadow="md"
                        sx={{
                            backgroundImage: `url(${bg4})`,
                            backgroundSize: "cover",
                        }}
                        />
                    </Grid>
                    <Grid item xs={5}>
                        <MKBox
                        width="100%"
                        height="100%"
                        borderRadius="lg"
                        shadow="md"
                        sx={{
                            backgroundImage: `url(${bg5})`,
                            backgroundSize: "cover",
                        }}
                        />
                    </Grid>
                    <Grid item xs={12} sm={4}>
                        <MKBox
                        width="100%"
                        height="100%"
                        borderRadius="lg"
                        shadow="md"
                        sx={{
                            backgroundImage: `url(${bg6})`,
                            backgroundSize: "cover",
                        }}
                        />
                    </Grid>
                    </Grid>
                </Container>
            </MKBox>
        </Card>
    </>
  );
}

export default EventPage;