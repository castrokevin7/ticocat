// @mui material components
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";

// Otis Kit PRO components
import MKBox from "components/MKBox";
import MKTypography from "components/MKTypography";

// Coworking page component
import FilledInfoCard from "examples/Cards/InfoCards/FilledInfoCard";

function About() {
  return (
    <MKBox id="acerca" component="section" py={6} pt={12}>
      <Container>
        <Grid container alignItems="center">
          <Grid item xs={12} lg={5}>
            <MKTypography variant="h3" my={1}>
                Contexto
            </MKTypography>
            <MKTypography variant="body2" color="text" mb={2}>
                TICO-CAT es una asociación sin ánimos de lucro, creada en diciembre de 2019, 
                como respuesta a una necesidad detectada de falta de espacios y actividades para la vinculación 
                de los y las costarricenses residentes en Cataluña, así como el contacto con su cultura y la promoción 
                de esta dentro de la sociedad Catalana. 
            </MKTypography>
          </Grid>
          <Grid item xs={12} lg={6} sx={{ ml: { xs: -2, lg: "auto" }, mt: { xs: 6, lg: 0 } }}>
            <Stack>
                <FilledInfoCard
                    variant="gradient"
                    color="info"
                    icon="notes_rounded"
                    title="Visión"
                    description="Ser el principal punto de contacto entre Costa Rica y la comunidad de costarricenses en Cataluña a través de actividades culturales, sociales y de desarrollo económico."
                />
                <br />
                <FilledInfoCard
                    variant="gradient"
                    color="info"
                    icon="notes_rounded"
                    title="Misión"
                    description="Promover el acercamiento de costarricenses que residen en Cataluña para salvaguardar nuestro legado cultural y el “pura vida” que nos caracteriza."
                />
            </Stack>
          </Grid>
        </Grid>
      </Container>
    </MKBox>
  );
}

export default About;