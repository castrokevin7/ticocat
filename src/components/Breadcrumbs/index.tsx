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

import React from 'react';

// react-router-dom components
import { Link } from "react-router-dom";

// @mui material components
import MuiBreadcrumbs from "@mui/material/Breadcrumbs";

// Otis Kit PRO components
import MKBox from "../MKBox";
import MKTypography from "../MKTypography";

interface RouteItem {
  label: string;
  route?: string;
}

interface BreadcrumbsProps {
  routes: RouteItem[];
}

function Breadcrumbs({ routes, ...rest }: BreadcrumbsProps) {
  return (
    <MKBox bgColor="light" borderRadius="md" py={1} px={2} width="100%">
      <MuiBreadcrumbs {...rest}>
        {routes.map(({ label, route }) =>
          route ? (
            <MKTypography
              key={label}
              component={Link}
              to={route}
              variant="button"
              color="text"
              fontWeight="regular"
              opacity={0.8}
              sx={{
                "&:hover, &:focus": {
                  color: ({ palette: { info } }: any) => info.main,
                },
              }}
            >
              {label}
            </MKTypography>
          ) : (
            <MKTypography key={label} variant="button" fontWeight="regular">
              {label}
            </MKTypography>
          )
        )}
      </MuiBreadcrumbs>
    </MKBox>
  );
}

export default Breadcrumbs;
