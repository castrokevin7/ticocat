import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";
import MKBox from "components/MKBox";
import MKTypography from "components/MKTypography";
import Translator from 'utils/Translator';
import { getInterestTranslationKey } from "../../utils";
import Chip from "@mui/material/Chip";
import Link from "@mui/material/Link";
import InstagramIcon from '@mui/icons-material/Instagram';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import FacebookIcon from '@mui/icons-material/Facebook';
import './AssociateCard.css'

const MAX_INTERESTS = 3;
const MAX_BIO = 100;

function AssociateCard({ associate }) {
  const getInterestsSection = () => {
    if (!associate.interests || associate.interests.length === 0) {
      return;
    }

    let interestsToShow = associate.interests.slice(0, MAX_INTERESTS);
    if (associate.interests.length > MAX_INTERESTS) {
      interestsToShow.push('...');
    }

    return (
      <MKBox mt={1}>
        {interestsToShow.map(interest => (
          <Chip
            sx={{ margin: '2px' }}
            label={Translator.instance.translate(getInterestTranslationKey(interest))}
          />
        ))}
      </MKBox>
    );
  }

  const getSocialMedia = () => {
    return (
      <MKBox display="flex" flexWrap="wrap" gap={0.1} mr={2}>
        {associate.instagram_username && (
          <MKTypography
            component={Link}
            href={`https://www.instagram.com/${associate.instagram_username}`}
            target="_blank"
            variant="body1"
          >
            <MKBox component="i">
              <InstagramIcon fontSize="small" />
            </MKBox>
          </MKTypography>
        )}
        {associate.linkedin_username && (
          <MKTypography
            component={Link}
            href={`https://www.linkedin.com/in/${associate.linkedin_username}`}
            target="_blank"
            variant="body1"
          >
            <MKBox component="i">
              <LinkedInIcon fontSize="small" />
            </MKBox>
          </MKTypography>
        )}
        {associate.facebook_username && (
          <MKTypography
            component={Link}
            href={`https://www.facebook.com/${associate.facebook_username}`}
            target="_blank"
            variant="body1"
          >
            <MKBox component="i">
              <FacebookIcon fontSize="small" />
            </MKBox>
          </MKTypography>
        )}
      </MKBox>
    );
  }

  return (
    <Card sx={{ mt: 5 }}>
      <MKBox container display="flex" alignItems="center" justifyContent="space-between">
        <Grid sx={{ mt: -6 }}>
          <MKBox width="100%" pt={2} pb={1} px={2}>
            <div
              id="associate-profile-picture"
              style={{ backgroundImage: `url(${associate.profile_picture})` }}
            />
          </MKBox>
        </Grid>
        {getSocialMedia()}
      </MKBox>
      <MKBox p={2}>
        <MKBox>
          <MKTypography variant="h5">{associate.custom_name || associate.name}</MKTypography>
          {associate.username && (
            <MKTypography variant="body2" color="text">
              @{associate.username}
            </MKTypography>
          )}          
          {associate.bio && (
            <MKTypography mt={1} variant="body2" color="text">
              {associate.bio.substring(0, MAX_BIO)} {associate.bio.length > MAX_BIO && '...'}
            </MKTypography>
          )}
        </MKBox>
        {getInterestsSection()}
      </MKBox>
    </Card>
  );
}


export default AssociateCard;
