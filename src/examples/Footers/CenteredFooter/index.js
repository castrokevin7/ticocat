/**
=========================================================
* Otis Kit PRO - v2.0.1
=========================================================

* Product Page: https://material-ui.com/store/items/otis-kit-pro-material-kit-react/
* Copyright 2022 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

// prop-types is a library for typechecking of props
import PropTypes from "prop-types";

// @mui material components
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";

// @mui icons
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import InstagramIcon from "@mui/icons-material/Instagram";
import PinterestIcon from "@mui/icons-material/Pinterest";
import GitHubIcon from "@mui/icons-material/GitHub";

// Otis Kit PRO components
import MKBox from "components/MKBox";
import MKTypography from "components/MKTypography";

function CenteredFooter({ company, links, socials, light }) {
  const { href, name } = company;

  const year = new Date().getFullYear();

  const renderLinks = links.map((link, key) => {
    const elementKey = `${link.name}-${key}`;

    return (
      <MKTypography
        key={elementKey}
        component={Link}
        href={link.href}
        variant="body2"
        color={light ? "white" : "secondary"}
        fontWeight="regular"
      >
        {link.name}
      </MKTypography>
    );
  });

  const renderSocials = socials.map((social, key) => {
    const elementKey = `${social.link}-${key}`;

    return (
      <MKTypography
        key={elementKey}
        component={Link}
        href={social.link}
        variant="body2"
        color={light ? "white" : "secondary"}
        fontWeight="regular"
      >
        {social.icon}
      </MKTypography>
    );
  });

  return (
    <MKBox component="footer" py={6}>
      <Grid container justifyContent="center">
        <Grid item xs={10} lg={8}>
          <Stack
            direction="row"
            flexWrap="wrap"
            justifyContent="center"
            spacing={{ xs: 2, lg: 3, xl: 6 }}
            mb={3}
          >
            {renderLinks}
          </Stack>
        </Grid>
        <Grid item xs={12} lg={8}>
          <Stack display="flex" direction="row" justifyContent="center" spacing={3} mt={1} mb={3}>
            {renderSocials}
          </Stack>
        </Grid>
        <Grid item xs={12} lg={8} sx={{ textAlign: "center" }}>
          <MKTypography variant="body2" color={light ? "white" : "secondary"}>
            Copyright &copy; {year} Material by{" "}
            <MKTypography
              component={Link}
              href={href}
              target="_blank"
              rel="noreferrer"
              variant="body2"
              color={light ? "white" : "secondary"}
            >
              {name}
            </MKTypography>
            .
          </MKTypography>
        </Grid>
      </Grid>
    </MKBox>
  );
}

// Setting default values for the props of CenteredFooter
CenteredFooter.defaultProps = {
  company: {
    href: "https://material-ui.com/store/items/otis-kit-pro-material-kit-react/",
    name: "Creative Tim",
  },
  links: [
    {
      href: "https://material-ui.com/store/items/otis-kit-pro-material-kit-react/",
      name: "Company",
    },
    {
      href: "https://material-ui.com/store/items/otis-kit-pro-material-kit-react/",
      name: "About Us",
    },
    { href: "https://material-ui.com/store/items/otis-kit-pro-material-kit-react/", name: "Team" },
    {
      href: "https://material-ui.com/store/items/otis-kit-pro-material-kit-react/",
      name: "Products",
    },
    { href: "https://material-ui.com/store/items/otis-kit-pro-material-kit-react/", name: "Blog" },
    {
      href: "https://material-ui.com/store/items/otis-kit-pro-material-kit-react/",
      name: "License",
    },
  ],
  socials: [
    {
      icon: <FacebookIcon fontSize="small" />,
      link: "https://material-ui.com/store/items/otis-kit-pro-material-kit-react/",
    },
    {
      icon: <TwitterIcon fontSize="small" />,
      link: "https://material-ui.com/store/items/otis-kit-pro-material-kit-react/",
    },
    {
      icon: <InstagramIcon fontSize="small" />,
      link: "https://material-ui.com/store/items/otis-kit-pro-material-kit-react/",
    },
    {
      icon: <PinterestIcon fontSize="small" />,
      link: "https://material-ui.com/store/items/otis-kit-pro-material-kit-react/",
    },
    {
      icon: <GitHubIcon fontSize="small" />,
      link: "https://material-ui.com/store/items/otis-kit-pro-material-kit-react/",
    },
  ],
  light: false,
};

// Typechecking props for the CenteredFooter
CenteredFooter.propTypes = {
  company: PropTypes.instanceOf(Object),
  links: PropTypes.instanceOf(Array),
  socials: PropTypes.instanceOf(Array),
  light: PropTypes.bool,
};

export default CenteredFooter;
