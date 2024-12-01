import MKBox from "components/MKBox";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import MKTypography from "components/MKTypography";
import Translator from 'utils/Translator';
import bgImage from "assets/images/closure-bg.png";

function Closure() {
    return (
        <MKBox sx={{
            backgroundColor: ({ palette: { bgcolor1 }, functions: { rgba } }) => rgba(bgcolor1.main, 0.4),
        }} component="section" py={6} pt={12} pb={12}>
            <Container>
                <MKBox
                    display="flex"
                    justifyContent="space-between"
                    alignItems="center"
                    borderRadius="xl"
                    p={6}
                    sx={{
                        backgroundImage:
                            `url(${bgImage})`,
                    }}
                >
                    <Grid container>
                        <Grid item xs={12} textAlign="center">
                            <MKTypography variant="h5" color="white" fontWeight="bold">
                                {Translator.instance.translate("closure_invitation")}
                            </MKTypography>
                        </Grid>
                    </Grid>
                </MKBox>
            </Container>
        </MKBox>
    );
}

export default Closure;
