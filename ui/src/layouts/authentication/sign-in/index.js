import { useState, useEffect } from "react";

// react-router-dom components
import { Link } from "react-router-dom";

// @mui material components
import Card from "@mui/material/Card";
import Switch from "@mui/material/Switch";
import Grid from "@mui/material/Grid";
import MuiLink from "@mui/material/Link";

// @mui icons
import FacebookIcon from "@mui/icons-material/Facebook";
import GitHubIcon from "@mui/icons-material/GitHub";
import GoogleIcon from "@mui/icons-material/Google";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDInput from "components/MDInput";
import MDButton from "components/MDButton";
import { useNavigate } from "react-router-dom";

import { useAuth } from "context/AuthProvider";

// Authentication layout components
import BasicLayout from "layouts/authentication/components/BasicLayout";

// Images
import bgImage from "assets/images/bg-sign-in-basic.jpeg";
import image from "assets/images/1713680.webp";

function Basic() {
  const [rememberMe, setRememberMe] = useState(false);

  const { signUpWithGoogle, currentUser } = useAuth();
  console.log(currentUser);
  const navigate = useNavigate();
  useEffect(() => {
    if (currentUser) {
      console.log("User is logged in");
      navigate("/dashboard");
    }
  }, [currentUser]);

  const handleSetRememberMe = () => setRememberMe(!rememberMe);

  return (
    <BasicLayout>
      <img src={image} style={{ marginLeft: "80px" }} />
      <MDTypography
        variant="h2"
        fontWeight="medium"
        textAlign="center"
        mt={2}
        mb={5}
      >
        Welcome to EcoConvoy
      </MDTypography>
      <Card>
        <MDBox
          variant="gradient"
          bgColor="info"
          borderRadius="lg"
          coloredShadow="info"
          // mx={2}
          // mt={1}
          p={2}
          // mb={1}
          textAlign="center"
        >
          <MDTypography variant="h4" fontWeight="medium" color="white" mt={1}>
            Sign in
          </MDTypography>
          <Grid
            container
            spacing={3}
            justifyContent="center"
            sx={{ mt: 1, mb: 2 }}
          >
            {/* <Grid item xs={2}>
              <MDTypography component={MuiLink} href="#" variant="body1" color="white">
                <FacebookIcon color="inherit" />
              </MDTypography>
            </Grid> */}
            {/* <Grid item xs={2}>
              <MDTypography component={MuiLink} href="#" variant="body1" color="white">
                <GitHubIcon color="inherit" />
              </MDTypography>
            </Grid> */}
            <Grid item xs={2}>
              <MDTypography
                component={MuiLink}
                href="#"
                variant="body1"
                color="white"
              >
                <GoogleIcon color="inherit" onClick={signUpWithGoogle} />
              </MDTypography>
            </Grid>
          </Grid>
        </MDBox>
      </Card>
    </BasicLayout>
  );
}

export default Basic;
