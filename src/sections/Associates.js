import React, { useState, useEffect } from 'react';
import { DataStore } from '@aws-amplify/datastore';
import { Associate } from 'models';

// @mui material components
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Icon from "@mui/material/Icon";
import Card from "@mui/material/Card";

// Otis Kit PRO components
import MKBox from "components/MKBox";
import MKTypography from "components/MKTypography";
import MKButton from "components/MKButton";

// HelpCenter page components
import ListItem from "pages/Support/HelpCenter/components/ListItem";

import DefaultCounterCard from "examples/Cards/CounterCards/DefaultCounterCard";

// Images
import bgImage1 from "assets/images/examples/comunidad-ticos.png";

function AssociatesCounter() {
    const [count, setCount] = useState(0);

    useEffect(() => {
      async function fetchData() {
        const models = await DataStore.query(Associate);
        setCount(models.length);
      }
      fetchData();
    }, []);

    return (
      <Card
        sx={({
          functions: { rgba, linearGradient },
          palette: { black },
          borders: { borderRadius },
        }) => ({
          backgroundImage: `${linearGradient(
            rgba(black.main, 0.5),
            rgba(black.main, 0.5)
          )}, url(${bgImage1})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          borderRadius: borderRadius.xl,
        })}
      >
        <MKBox textAlign="center" pt={12} pb={3} px={3}>
          <DefaultCounterCard
                count={count}
                title="Socios"
                description={`¿Y vos, te animás?`}
            />

          <MKButton
            component="a"
            href="mailto:asoticocat@gmail.com?Subject=Quiero asociarme"
            target="_blank"
            rel="noreferrer"
            color="white"
            size="small"
            sx={{ my: 2 }}
          >
            Quiero asociarme
          </MKButton>
        </MKBox>
      </Card>
    );
  }

function Associates() {
  return (
    <MKBox id="socios" component="section" py={12}>
      <Container>
        <Grid
          container
          item
          flexDirection="column"
          justifyContent="center"
          alignItems="center"
          xs={10}
          lg={5}
          sx={{ mx: "auto", textAlign: "center" }}
        >
          <MKBox
            width="3rem"
            height="3rem"
            borderRadius="lg"
            shadow="md"
            variant="gradient"
            bgColor="info"
            color="white"
            display="flex"
            alignItems="center"
            justifyContent="center"
          >
            <Icon fontSize="small" sx={{ opacity: 0.8 }}>
                volunteer_activism
            </Icon>
          </MKBox>
          <MKTypography variant="h3" mt={3}>
            Nuestra Comunidad
          </MKTypography>
          <MKTypography variant="body2" color="text">
            Aso TicoCat busca organizar la comunidad de costarricenses residentes en Cataluña.
          </MKTypography>
        </Grid>
        <Grid container spacing={3} alignItems="center" sx={{ mt: 6 }}>
          <Grid item xs={12} md={4} sx={{ ml: "auto" }}>
            <AssociatesCounter />
          </Grid>
          <Grid item xs={12} md={5} sx={{ mr: "auto", ml: { xs: 0, md: 6 } }}>
            <ListItem title="1. Crear una comunidad organizada de costarricenses en Cataluña ">
            </ListItem>
            <ListItem title="2. Fomentar actividades socio-culturales entre sus miembros y la comunidad">
            </ListItem>
            <ListItem title="3. Facilitar la inserción de los costarricense dentro de la Comunidad Catalana">
            </ListItem>
            <ListItem title="4. Promover el acercamiento intercultural">
            </ListItem>
            <ListItem title="5. Mediar la colaboración, apoyo e información entre sus miembros">
            </ListItem>
          </Grid>
        </Grid>
      </Container>
    </MKBox>
  );
}

export default Associates;