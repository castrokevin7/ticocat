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

/**
  The linearGradient() function helps you to create a linear gradient color background
 */

function linearGradient(color, colorState, angle = 195) {
  return `linear-gradient(${angle}deg, ${color}, ${colorState})`;
}

export default linearGradient;
