import MKBox from "components/MKBox";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import MKTypography from "components/MKTypography";
import Translator from 'utils/Translator';

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
                            "url(https://images.unsplash.com/photo-1533563906091-fdfdffc3e3c4?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1950&q=80)",
                    }}
                >
                    <Grid container>
                        <Grid xs={12} textAlign="center">
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
