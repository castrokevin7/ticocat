// @mui material components
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Icon from "@mui/material/Icon";

// Otis Kit PRO components
import MKBox from "components/MKBox";
import MKTypography from "components/MKTypography";

import TicoCatTeamMemberCard from "examples/Cards/TeamCards/TicoCatTeamMemberCard";

// Images
import jordiPhoto from "assets/images/team/jordi.png";
import gloPhoto from "assets/images/team/glo.png";
import kevinPhoto from "assets/images/team/kevin.png";
import raquePhoto from "assets/images/team/raque.png";
import alePhoto from "assets/images/team/ale.png";

import Translator from 'utils/Translator';

function Team() {

  return (
    <MKBox id="equipo" component="section" py={6} pt={10}>
      <Container>
        <Grid container item flexDirection="column" xs={12} lg={7} mb={6}>
          <MKBox
            display="flex"
            alignItems="center"
            justifyContent="center"
            width="3rem"
            height="3rem"
            variant="gradient"
            bgColor="info"
            color="white"
            shadow="md"
            borderRadius="lg"
            mb={2}
          >
            <Icon>supervisor_account</Icon>
          </MKBox>
          <MKTypography variant="h3" mb={1}>
              {Translator.instance.translate("team_title")}
          </MKTypography>
          <MKTypography variant="body2" color="text">
            {Translator.instance.translate("team_description")}.
          </MKTypography>
        </Grid>
        <Grid container spacing={5} mt={6}>
          <Grid item xs={12} lg={12}>
            <MKBox mb={1}>
              <TicoCatTeamMemberCard
                image={jordiPhoto}
                name="Jordi Parés"
                position={{ color: "dark", label: "team_president_position" }}
                from="Guadalupe⁣, San José"
                arrivalTime="Octubre, 2013"
                occupation="Cinematografía y Música"
                contributions="Creatividad, entusiasmo y... Comida!"
                reasonOfParticipation="Después de, por casualidad, haber heredado el grupo de Facebook de #ticos en #Barcelona, me topé con gente maravillosa que tenía la misma inquietud que yo: hacer comunidad con los ticos y ayudarnos entre nosotros. Unos añitos después, seguimos uniendo fuerzas para lograrlo"
              />
            </MKBox>
          </Grid>
          <Grid item xs={12} lg={12}>
            <MKBox mb={1}>
              <TicoCatTeamMemberCard
                image={gloPhoto}
                name="Gloriana Sánchez"
                position={{ color: "dark", label: "team_vicepresident_position" }}
                from="San Pablo, Heredia"
                arrivalTime="Septiembre, 2019"
                occupation="Gestora Cultural"
                contributions="Gestión de proyectos culturales, financiamiento"
                reasonOfParticipation="Llegué para estudiar, quedarme un tiempo corto y conocer otras #culturas. Pronto ya estaba buscando productos que me hicieran sentir un poco más cerca de casa. Estar lejos es una oportunidad de crecimiento que te transforma la vida. Pero siempre queda un pliegue en el corazón que recuerda lo que se deja atrás.
                Cuando supe de la #asociación, y que estaban armando nuevo equipo, decidí participar. Quería apoyar con actividades que nos hicieran sentir que somos varios y que no estamos solos. Pero también mostrar a nuestros nuevos vecinos lo que significa ser #tico y compartir toda esa riqueza cultural que portamos a donde sea que vayamos"
              />
            </MKBox>
          </Grid>
          <Grid item xs={12} lg={12}>
            <MKBox mb={1}>
              <TicoCatTeamMemberCard
                image={kevinPhoto}
                name="Kevin Castro"
                position={{ color: "dark", label: "team_secretary_position" }}
                from="Pococí, Limón"
                arrivalTime="Julio, 2021"
                occupation="Ing. En Computación"
                contributions="Secretariado, eventos y desarrollo web"
                reasonOfParticipation="Como manera de agradecimiento por estar aquí me interesa ayudar a la #comunidad. Además cuando comparto con #ticos soy feliz y me teletransporto por un momento a nuestra #patria que quiero y extraño tanto"
              />
            </MKBox>
          </Grid>
          <Grid item xs={12} lg={12}>
            <MKBox mb={1}>
              <TicoCatTeamMemberCard
                image={raquePhoto}
                name="Raquel Sáenz"
                position={{ color: "dark", label: "team_treasurer_position" }}
                from="Curridabat, San José⁣"
                arrivalTime="Septiembre, 2016⁣"
                occupation="Analista de Datos"
                contributions="Finanzas y eventos"
                reasonOfParticipation="Cuando llegue a BCN no conocía nadie y me hacía falta ese sabor tico, luego de 1 año y medio que conocí otros #ticos, además de disfrutar a lo tico, nos ayudábamos para hacer desde #trámites hasta el gallo pinto! Y cuando me hicieron la propuesta de formar la ASO, no dude en decir que si! Poder ayudar a otros ticos y unirnos en comunidad es una linda forma de mostrar al mundo lo que es ser #PURAVIDA⁣"
              />
            </MKBox>
          </Grid>
          <Grid item xs={12} lg={12}>
            <MKBox mb={1}>
              <TicoCatTeamMemberCard
                image={alePhoto}
                name="Alejandra Sandino"
                position={{ color: "dark", label: "team_vocal_position" }}
                from="Moravia, San José⁣"
                arrivalTime="Febrero, 2017⁣"
                occupation="UX Designer⁣"
                contributions="Comunicación, patriotismo, iniciativa y diseño"
                reasonOfParticipation="Recuerdo que antes de venirme a Barcelona, tenía muchas preguntas y necesitaba de alguien que me ayudara a contestarlas. En aquel momento tuve un angel que no dudo en responderlas. Cuando llegue me propuse a ser ese ángel para alguien más y desde entonces he estado trabajando para la comunidad aportando mi granito de arena. Para que otros tengan la misma posibilidad de cumplir el sueño de estudiar o vivir en Barcelona"
              />
            </MKBox>
          </Grid>
        </Grid>
      </Container>
    </MKBox>
  );
}

export default Team;