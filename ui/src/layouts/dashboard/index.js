import React, { useEffect, useState } from "react";

// @mui material components
import Grid from "@mui/material/Grid";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import Slider from "@mui/material/Slider";
// import { Line } from 'react-chartjs-2';

// Material Dashboard 2 React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import ReportsBarChart from "examples/Charts/BarCharts/ReportsBarChart";
import ReportsLineChart from "examples/Charts/LineCharts/ReportsLineChart";
import ComplexStatisticsCard from "examples/Cards/StatisticsCards/ComplexStatisticsCard";

// Data
import reportsBarChartData from "layouts/dashboard/data/reportsBarChartData";
import reportsLineChartData from "layouts/dashboard/data/reportsLineChartData";

// Dashboard components
import Projects from "layouts/dashboard/components/Projects";
import OrdersOverview from "layouts/dashboard/components/OrdersOverview";
import { Typography } from "@mui/material";

function Dashboard() {
  const { sales, tasks } = reportsLineChartData;

  const [chartData, setChartData] = useState(null);
  const [newChartData, setNewChartData] = useState();
  const [numberOfDays, setNumberOfDays] = useState(30);
  const [trips, setTrips] = useState(0);
  const [tripsChange, setTripsChange] = useState(0);
  const [milesDriven, setMilesDriven] = useState(0);
  const [milesDrivenChange, setMilesDrivenChange] = useState(0);
  const [efficiency, setEfficiency] = useState(0);
  const [points, setPoints] = useState(0);

  function valuetext(value) {
    return `${value} days`;
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          process.env.REACT_APP_BACKEND_URL + "get_data/" + numberOfDays
        );
        const jsonData = await response.json();

        // Extract chart datasets for all available parameters
        const datasets = extractChartDatasets(jsonData);
        const parameters = [
          "ENGINE_COOLANT_TEMP",
          "ENGINE_LOAD",
          "ENGINE_RPM",
          "AIR_INTAKE_TEMP",
          "SPEED",
          "THROTTLE_POS",
          "EFFICIENCY",
          // Add more parameters as needed
        ];
        const transformedData = {};
        for (let i = 0; i < parameters.length; i++) {
          Object.keys(datasets).forEach((param) => {
            // console.log("param",param);
            const label = param;
            const data = datasets[param].data;
            // console.log("data",data);
            const labels = datasets[param].data.map(
              (_, index) => `Day-#${index + 1}`
            );
            const dataset = {
              label: label,
              data: data,
            };
            transformedData[label] = {
              labels: labels,
              datasets: dataset,
            };
          });
        }
        setNewChartData(transformedData);
        // Set the chart data state
        setChartData(datasets);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [numberOfDays]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          process.env.REACT_APP_BACKEND_URL + "trips"
        );
        const jsonData = await response.json();
        // console.log("jsonData",jsonData);
        setTrips(jsonData[0].TRIPS);
        setTripsChange(jsonData[0].LASTMONTHPERTRIPS);

        const response2 = await fetch(
          process.env.REACT_APP_BACKEND_URL + "miles"
        );
        const jsonData2 = await response2.json();
        // console.log("jsonData2",jsonData2);
        setMilesDriven(jsonData2[0].TODAYMILES);
        setMilesDrivenChange(jsonData2[0].LASTMONTHMILES);

        // const response3 = await fetch(process.env.REACT_APP_BACKEND_URL+'revenue');
        // const jsonData3 = await response3.json();
        // // console.log("jsonData3",jsonData3);
        // setRevenue(jsonData3[0].REVENUE);
        // setRevenueChange(jsonData3[0].LASTMONTHPERREVENUE);

        const response4 = await fetch(
          process.env.REACT_APP_BACKEND_URL + "efficiency"
        );
        const jsonData4 = await response4.json();
        // console.log("jsonData4",jsonData4);
        setPoints(jsonData4[0].CARBONPOINTS);
        setEfficiency(parseFloat(jsonData4[0].MEANEFFICIENCY).toPrecision(2));
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  const extractChartDatasets = (jsonData) => {
    const parameters = [
      "ENGINE_COOLANT_TEMP",
      "ENGINE_LOAD",
      "ENGINE_RPM",
      "AIR_INTAKE_TEMP",
      "SPEED",
      "THROTTLE_POS",
      "EFFICIENCY",
    ];

    const datasets = {};
    let i = 0;
    parameters.forEach((param) => {
      datasets[param] = {
        label: param,
        data: jsonData.map((data) => {
          // i++;
          // if(i%80==0)
          return data[param];
        }),
        fill: true,
        borderColor: getRandomColor(), // Generate a random color for each chart
        tension: 0.4,
      };
    });
    console.log("parameters", datasets);
    return datasets;
  };

  const getRandomColor = () => {
    const r = Math.floor(Math.random() * 256);
    const g = Math.floor(Math.random() * 256);
    const b = Math.floor(Math.random() * 256);
    return `rgb(${r}, ${g}, ${b})`;
  };

  return (
    <DashboardLayout>
      <DashboardNavbar />
      {chartData && newChartData && (
        <MDBox py={3}>
          <Grid container spacing={1}>
            <Grid item xs={12} md={6} lg={3}>
              <MDBox mb={1.5}>
                <ComplexStatisticsCard
                  color="dark"
                  icon="drive_eta"
                  title="Trips"
                  count={trips}
                  percentage={{
                    color: "error",
                    amount: `-${tripsChange}%`,
                    label: "than last month",
                  }}
                />
              </MDBox>
            </Grid>
            <Grid item xs={12} md={6} lg={3}>
              <MDBox mb={1.5}>
                <ComplexStatisticsCard
                  icon="leaderboard"
                  title="Month's Miles Driven"
                  count={`${milesDriven} miles`}
                  percentage={{
                    color: "success",
                    amount: `+${milesDrivenChange}%`,
                    label: "than last month",
                  }}
                />
              </MDBox>
            </Grid>
            <Grid item xs={12} md={6} lg={3}>
              <MDBox mb={1.5}>
                <ComplexStatisticsCard
                  color="success"
                  icon="local_gas_station"
                  title="Efficiency"
                  count={`${efficiency}%`}
                  percentage={{
                    color: "success",
                    amount: `+0.9%`,
                    label: "than last month",
                  }}
                />
              </MDBox>
            </Grid>
            <Grid item xs={12} md={6} lg={3}>
              <MDBox mb={1.5}>
                <ComplexStatisticsCard
                  color="warning"
                  icon="token"
                  title="Carbon Points"
                  count={points}
                  percentage={{
                    color: "warning",
                    amount: `-0.2%`,
                    label: "than last month",
                  }}
                />
              </MDBox>
            </Grid>
          </Grid>

          <MDBox mt={1.5}>
            <Grid container spacing={3}>
              <Grid item xs={12} md={3} lg={3}>
                <Typography variant="h4">Days: {numberOfDays}</Typography>
              </Grid>
              <Grid item xs={12} md={9} lg={9}>
                <Slider
                  defaultValue={30}
                  getAriaValueText={valuetext}
                  aria-labelledby="discrete-slider"
                  valueLabelDisplay="auto"
                  step={1}
                  marks
                  min={1}
                  max={365}
                  onChange={(e, value) => setNumberOfDays(value)}
                  sx={{ width: 400, margin: "auto" }}
                />
              </Grid>
            </Grid>
          </MDBox>
          <MDBox mt={4.5}>
            <Grid container spacing={2}>
              <Grid item xs={12} md={12} lg={12}>
                <MDBox mb={3}>
                  <ReportsLineChart
                    color="dark"
                    title="Efficiency"
                    description="Efficiency stats for last month."
                    date="updated 1hr ago"
                    chart={newChartData["EFFICIENCY"]}
                  />
                </MDBox>
              </Grid>
              <Grid item xs={12} md={6} lg={6}>
                <MDBox mb={3}>
                  <ReportsLineChart
                    color="info"
                    title="Speed (in mph)"
                    description="Speed stats for last month."
                    date="updated 2hr ago"
                    chart={newChartData["SPEED"]}
                  />
                </MDBox>
              </Grid>
              <Grid item xs={12} md={6} lg={6}>
                <MDBox mb={3}>
                  <ReportsLineChart
                    color="warning"
                    title="RPM"
                    description={
                      <>
                        (<strong>+15%</strong>) increase in RPM stats.
                      </>
                    }
                    date="updated 4 min ago"
                    chart={newChartData["ENGINE_RPM"]}
                  />
                </MDBox>
              </Grid>
              <Grid item xs={12} md={6} lg={6}>
                <MDBox mb={3}>
                  <ReportsLineChart
                    color="primary"
                    title="Air Intake Temperature (F)"
                    description="Air Intake Temp. from last month."
                    date="just updated"
                    chart={newChartData["AIR_INTAKE_TEMP"]}
                  />
                </MDBox>
              </Grid>
              <Grid item xs={12} md={6} lg={6}>
                <MDBox mb={3}>
                  <ReportsLineChart
                    color="dark"
                    title="Engine Coolant Temperature (F)"
                    description="Engine Coolant Temp in Fahrenheit."
                    date="updated 5 mins ago"
                    chart={newChartData["ENGINE_COOLANT_TEMP"]}
                  />
                </MDBox>
              </Grid>
              <Grid item xs={12} md={6} lg={6}>
                <MDBox mb={3}>
                  <ReportsLineChart
                    color="success"
                    title="Engine Load (%)"
                    description="Engine Load stats for last month."
                    date="updated 2 hrs ago"
                    chart={newChartData["ENGINE_LOAD"]}
                  />
                </MDBox>
              </Grid>
              <Grid item xs={12} md={6} lg={6}>
                <MDBox mb={3}>
                  <ReportsLineChart
                    color="info"
                    title="Throttle Position"
                    description="Throttle Position stats for last month."
                    date="updated just now"
                    chart={newChartData["THROTTLE_POS"]}
                  />
                </MDBox>
              </Grid>
            </Grid>
          </MDBox>
          {/* <MDBox>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6} lg={8}>
              <Projects />
            </Grid>
            <Grid item xs={12} md={6} lg={4}>
              <OrdersOverview />
            </Grid>
          </Grid>
        </MDBox> */}
        </MDBox>
      )}
      {/* {chartData ? (
        Object.keys(chartData).map((param, index) => (
          <div key={index} style={{ marginBottom: '20px' }}>
            <Line
              data={{
                labels: chartData[param].data.map((_, i) => `${parseInt(Math.round((i)/75))+1}`),
                datasets: [chartData[param]]
              }}
              options={{
                responsive: true,
                plugins: {
                  legend: {
                    position: 'top',
                  },
                  // line

                  title: {
                    display: true,
                    text: `${param} Over Time`
                  },
                  elements: {
                    line: {
                      tension: 0.4 // Adjust the tension for a smoother curve
                    }
                  },
                }
              }}
            />
          </div>
        ))
      ) : (
        <p>Loading charts...</p>
      )} */}
      {/* <Footer /> */}
    </DashboardLayout>
  );
}

export default Dashboard;
