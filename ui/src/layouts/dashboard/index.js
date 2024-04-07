import React, {useEffect, useState} from "react";

// @mui material components
import Grid from "@mui/material/Grid";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import Button from "@mui/material/Button";
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
  const [btnText, setBtnText] = useState('Show Last Years Data');

  const handleOnClickBtn = () => {
    if (numberOfDays === 30) {
      setNumberOfDays(365);
      setBtnText('Show Last 30 Days Data');
    } else {
      setNumberOfDays(30);
      setBtnText('Show Last Years Data');
    }
  }

  function valuetext(value) {
    return `${value} days`;
  }

  useEffect(() => {

    const fetchData = async () => {
      try {
        // Simulated fetch of your JSON data
        // TODO: FIXME: Replace this with your actual API endpoint
        const response = await fetch('http://127.0.0.1:5000/get_data/'+numberOfDays);
        const jsonData = await response.json();

        // Extract chart datasets for all available parameters
        const datasets = extractChartDatasets(jsonData);
        const parameters = [
          'ENGINE_COOLANT_TEMP',
          'ENGINE_LOAD',
          'ENGINE_RPM',
          'AIR_INTAKE_TEMP',
          'SPEED',
          'THROTTLE_POS',
          'EFFICIENCY'
          // Add more parameters as needed
        ];
        const transformedData = {}
        for(let i=0;i<parameters.length;i++){
          Object.keys(datasets).forEach(param => {
            console.log("param",param);
            const label = param
            const data = datasets[param].data;
            // console.log("data",data);
            const labels = datasets[param].data.map((_, index) => `Day-#${index+1}`);
            const dataset = {
              label: label,
              data: data
            };
            transformedData[label] = {
              labels: labels,
              datasets: dataset
            }
          });
          }
          setNewChartData(transformedData);
        // Set the chart data state
        setChartData(datasets);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [numberOfDays]);

  const extractChartDatasets = (jsonData) => {
    const parameters = [
      'ENGINE_COOLANT_TEMP',
      'ENGINE_LOAD',
      'ENGINE_RPM',
      'AIR_INTAKE_TEMP',
      'SPEED',
      'THROTTLE_POS',
      'EFFICIENCY'
      // Add more parameters as needed
    ];

    const datasets = {};
    let i =0
    // Initialize datasets for each parameter
    parameters.forEach(param => {
      datasets[param] = {
        label: param,
        data: jsonData.map((data => {
          // i++;
          // if(i%80==0)
          return data[param]
        })),
        fill: true,
        borderColor: getRandomColor(), // Generate a random color for each chart
        tension: 0.4
      };
    });
    console.log("parameters",datasets);
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
     {chartData && newChartData &&  <MDBox py={3}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6} lg={3}>
            <MDBox mb={1.5}>
              <ComplexStatisticsCard
                color="dark"
                icon="weekend"
                title="Trips"
                count={281}
                percentage={{
                  color: "success",
                  amount: "+55%",
                  label: "than lask week",
                }}
              />
            </MDBox>
          </Grid>
          <Grid item xs={12} md={6} lg={3}>
            <MDBox mb={1.5}>
              <ComplexStatisticsCard
                icon="leaderboard"
                title="Today's Miles Driven"
                count="2,300"
                percentage={{
                  color: "success",
                  amount: "+3%",
                  label: "than last month",
                }}
              />
            </MDBox>
          </Grid>
          <Grid item xs={12} md={6} lg={3}>
            <MDBox mb={1.5}>
              <ComplexStatisticsCard
                color="success"
                icon="trending_up"
                title="Revenue"
                count="34k"
                percentage={{
                  color: "success",
                  amount: "+1%",
                  label: "than yesterday",
                }}
              />
            </MDBox>
          </Grid>
          <Grid item xs={12} md={6} lg={3}>
            <MDBox mb={1.5}>
              {/* <Button variant="contained" color="primary" onClick={handleOnClickBtn}>{btnText}</Button> */}
              <ComplexStatisticsCard
                color="primary"
                icon="person_add"
                title="Load Delivered"
                count="1000 Tons"
                percentage={{
                  color: "success",
                  amount: "",
                  label: "Just updated",
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
            sx={{ width: 400, margin: 'auto' }}
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
                  chart={newChartData['EFFICIENCY']}
                />
              </MDBox>
            </Grid>
            <Grid item xs={12} md={6} lg={6}>
              <MDBox mb={3}>
                <ReportsLineChart
                  color="info"
                  title="Speed"
                  description="Speed stats for last month."
                  date="updated 2hr ago"
                  chart={newChartData['SPEED']}
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
                  chart={newChartData['ENGINE_RPM']}
                />
              </MDBox>
            </Grid>
            <Grid item xs={12} md={6} lg={6}>
              <MDBox mb={3}>
                <ReportsLineChart
                  color="primary"
                  title="Air Intake Temperature"
                  description="Air Intake Temp. from last month."
                  date="just updated"
                  chart={newChartData['AIR_INTAKE_TEMP']}
                />
              </MDBox>
            </Grid>
            <Grid item xs={12} md={6} lg={6}>
              <MDBox mb={3}>
                <ReportsLineChart
                  color="dark"
                  title="Engine Coolant Temperature"
                  description="Engine Coolant Temp in Fahrenheit."
                  date="updated 5 mins ago"
                  chart={newChartData['ENGINE_COOLANT_TEMP']}
                />
              </MDBox>
            </Grid>
            <Grid item xs={12} md={6} lg={6}>
              <MDBox mb={3}>
                <ReportsLineChart
                  color="success"
                  title="Engine Load"
                  description="Engine Load stats for last month."
                  date="updated 2 hrs ago"
                  chart={newChartData['ENGINE_LOAD']}
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
                  chart={newChartData['THROTTLE_POS']}
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
      </MDBox>}
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
