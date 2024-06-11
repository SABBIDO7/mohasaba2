import React, { useState } from "react";
import {
  Container,
  AppBar,
  Tabs,
  Tab,
  Box,
  Typography,
  Paper,
} from "@mui/material";
import UsersManagement from "../components/CompanyPortal/UsersManagment";
import CompanySettings from "../components/CompanyPortal/CompanySettings";

import { Padding } from "@mui/icons-material";

const CompanyPortal = () => {
  const [selectedTab, setSelectedTab] = useState(0);

  const handleTabChange = (event, newValue) => {
    setSelectedTab(newValue);
  };

  return (
    <Box
      sx={{
        marginTop: "2vh",
        marginBottom: "2vh",
        height: "calc(90vh - 14px)", //14 header
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Container
        maxWidth="2xl"
        sx={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
        }} //paddding li aal jwenib l cart
      >
        <Paper
          elevation={6}
          sx={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
          }}
        >
          <AppBar position="static">
            <Tabs
              value={selectedTab}
              onChange={handleTabChange}
              variant="fullWidth"
              textColor="inherit"
              indicatorColor="secondary"
            >
              <Tab label="Company Settings" />
              <Tab label="User Management" />
              <Tab label="Dashboard" />
            </Tabs>
          </AppBar>
          <TabPanel value={selectedTab} index={0}>
            {localStorage.getItem("CompanySettings") == "Y" && <CompSettings />}
          </TabPanel>
          <TabPanel value={selectedTab} index={1}>
            {localStorage.getItem("UserManagement") == "Y" && (
              <UserManagement />
            )}
          </TabPanel>
          <TabPanel value={selectedTab} index={2}>
            {localStorage.getItem("CompanyDashboard") == "Y" && <Dashboard />}
          </TabPanel>
        </Paper>
      </Container>
    </Box>
  );
};

const TabPanel = (props) => {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {
        value === index && <Box p={2}>{children}</Box> //padding 16 px
      }
    </div>
  );
};

const CompSettings = () => (
  <Box>
    <CompanySettings></CompanySettings>
    {/* Company settings content goes here */}
  </Box>
);

const UserManagement = () => (
  <Box
    key={"UserManagementBox"}
    sx={{
      height: "calc(88vh - (78px))", //14+48 14 header 48 the height of the bar tabs 16 px padding 2vh margin top
      display: "flex",
      flexDirection: "column",
      justifyContent: "space-between", // Align items vertically with space between
      alignItems: "center",
      alignContent: "center",
    }}
  >
    {/* <Typography variant="h5">Users Management</Typography> */}
    {/* User management content goes here */}

    <UsersManagement className="flex h-[100vh]"></UsersManagement>
  </Box>
);

const Dashboard = () => (
  <Box>
    <Typography variant="h5">Dashboard</Typography>

    {/* Dashboard content goes here */}
  </Box>
);

export default CompanyPortal;
