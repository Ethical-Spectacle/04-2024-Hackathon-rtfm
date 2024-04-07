/* eslint-disable react/prop-types */
/* eslint-disable react/function-component-definition */


// @mui material components
import Icon from "@mui/material/Icon";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDAvatar from "components/MDAvatar";
import MDProgress from "components/MDProgress";

// Images
import Avatar from "assets/images/small-logos/avatar.svg";
import GoldMedal from "assets/images/small-logos/gold-medal.svg";
import SilverMedal from "assets/images/small-logos/silver-medal.svg";
import BronzeMedal from "assets/images/small-logos/bronze-medal.svg";
import LogoAsana from "assets/images/small-logos/logo-asana.svg";

export default function data() {
  const Project = ({ image, name }) => (
    <MDBox display="flex" alignItems="center" lineHeight={1}>
      {(name != "Gary" || name != "Sahu" || name != "Jenny") &&<MDAvatar src={Avatar} name={name} size="sm" variant="rounded" />}
      <MDTypography display="block" fontWeight="medium" ml={1} lineHeight={1}>
        {name}
      </MDTypography>
      {name === "Gary" && (
        <MDAvatar src={GoldMedal} name={name} size="sm" variant="rounded" />
      )}
      {name === "Sahu" && (
        <MDAvatar src={SilverMedal} name={name} size="sm" variant="rounded" />
      )}
      {name === "Jenny" && (
        <MDAvatar src={BronzeMedal} name={name} size="sm" variant="rounded" />
      )}
    </MDBox>
  );

  const Progress = ({ color, value, points }) => (
    <MDBox display="flex" alignItems="center">
      <MDTypography variant="caption" color="text" fontWeight="medium">
        {points} points
      </MDTypography>
      <MDBox ml={0.5} width="9rem">
        <MDProgress variant="gradient" color={color} value={value} />
      </MDBox>
    </MDBox>
  );

  return {
    columns: [
      { Header: "Driver", accessor: "user", width: "30%", align: "left" },
      { Header: "trips", accessor: "trips", align: "center" },
      { Header: "amount saved", accessor: "amount_saved", align: "left" },
      { Header: "carbon points", accessor: "completion", align: "center" },
      // { Header: "action", accessor: "action", align: "center" },
    ],

    rows: [
      {
        user: <Project image={LogoAsana} name="Gary" />,
        trips: (<MDTypography color="text" fontWeight="medium">
        12
      </MDTypography>),
        amount_saved: (
          <MDTypography color="text" fontWeight="medium">
            $833
          </MDTypography>
        ),
        completion: <Progress color="success" value={91} points={987} />,
      },
      {
        user: <Project image={LogoAsana} name="Sahu" />,
        trips: (<MDTypography color="text" fontWeight="medium">
        12
      </MDTypography>),
        amount_saved: (
          <MDTypography color="text" fontWeight="medium">
            $787
          </MDTypography>
        ),
        completion: <Progress color="success" value={89} points={901} />,
      },
      {
        user: <Project image={LogoAsana} name="Jenny" />,
        trips: (<MDTypography color="text" fontWeight="medium">
        12
      </MDTypography>),
        amount_saved: (
          <MDTypography color="text" fontWeight="medium">
            $700
          </MDTypography>
        ),
        completion: <Progress color="info" value={85} points={876} />,
      },
      {
        user: <Project image={LogoAsana} name="Sara" />,
        trips: (<MDTypography color="text" fontWeight="medium">
        11
      </MDTypography>),
        amount_saved: (
          <MDTypography color="text" fontWeight="medium">
            $600
          </MDTypography>
        ),
        completion: <Progress color="info" value={80} points={789} />,
      },
      {
        user: <Project image={LogoAsana} name="John" />,
        trips: (<MDTypography color="text" fontWeight="medium">
        10
      </MDTypography>),
        amount_saved: (
          <MDTypography color="text" fontWeight="medium">
            $500
          </MDTypography>
        ),
        completion: <Progress color="info" value={75} points={701} />,
      },
      {
        user: <Project image={LogoAsana} name="Mike" />,
        trips: (<MDTypography color="text" fontWeight="medium">
        11
      </MDTypography>),
        amount_saved: (
          <MDTypography color="text" fontWeight="medium">
            $400
          </MDTypography>
        ),
        completion: <Progress color="info" value={70} points={678} />,
      },
      {
        user: <Project image={LogoAsana} name="David" />,
        trips: (<MDTypography color="text" fontWeight="medium">
        12
      </MDTypography>),
        amount_saved: (
          <MDTypography color="text" fontWeight="medium">
            $350
          </MDTypography>
        ),
        completion: <Progress color="warning" value={65} points={601} />,
      },
      {
        user: <Project image={LogoAsana} name="Sandra" />,
        trips: (<MDTypography color="text" fontWeight="medium">
        8
      </MDTypography>),
        amount_saved: (
          <MDTypography color="text" fontWeight="medium">
            $320
          </MDTypography>
        ),
        completion: <Progress color="warning" value={60} points={567} />,
      },
      {
        user: <Project image={LogoAsana} name="Laura" />,
        trips: (<MDTypography color="text" fontWeight="medium">
        7
      </MDTypography>),
        amount_saved: (
          <MDTypography color="text" fontWeight="medium">
            $300
          </MDTypography>
        ),
        completion: <Progress color="error" value={44} points={389} />,
      },
    ],
  };
}
