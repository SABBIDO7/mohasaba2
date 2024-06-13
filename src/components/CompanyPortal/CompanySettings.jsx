import React, { useEffect, useState } from "react";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { format } from "date-fns";
import axios from "axios";
import Box from "@mui/material/Box";
import Autocomplete from "@mui/material/Autocomplete";
import DeleteIcon from "@mui/icons-material/Delete";
import IconButton from "@mui/material/IconButton";
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TextField,
  Button,
  List,
  ListItem,
  ListItemText,
  useMediaQuery,
} from "@mui/material";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import countries from "./countries";
import {
  getCompanySettingsData,
  UpdateCompanySettings,
} from "../BackendEndPoints/Endpoint1";
import CustomSnackbar from "../Snackbar/CustomSnackbar"; // Import the new Snackbar component

const CompanySettings = () => {
  const isSmallScreen = useMediaQuery("(max-width:768px)");

  const [groupTypes, setGroupTypes] = useState([
    { id: "SetG", name: "SetG" },
    { id: "Category", name: "Category" },
    { id: "Unit", name: "Unit" },
    { id: "Brand", name: "Brand" },
    { id: "Origin", name: "Origin" },
    { id: "Supplier", name: "Supplier" },
    { id: "Sizeg", name: "Sizeg" },
    { id: "Color", name: "Color" },
    { id: "Family", name: "Family" },
    { id: "Groupg", name: "Groupg" },
  ]);
  const [companyCodes, setCompanyCodes] = useState(countries);
  const [selectedGroupType, setSelectedGroupType] = useState("");
  const [selectedPrintType, setSelectedPrintType] = useState("");

  const [selectedCompanyCode, setSelectedCompanyCode] = useState("");
  const [holidays, setHolidays] = useState([]);
  const [newHoliday, setNewHoliday] = useState({ date: null, name: "" });
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("warning");
  const [selectedCountry, setSelectedCountry] = useState(null);
  useEffect(() => {
    getCompanySettingsData().then((response) => {
      if (response.status == "success") {
        setSelectedCountry(response.CompanyCode);
        setHolidays(JSON.parse(response.Holidays)); // Parse the Holidays data
        setSelectedPrintType(response.PrintFormat);
        setSelectedGroupType(response.GroupType);
      }
    });
  }, []);
  const handleAddHoliday = () => {
    if (newHoliday.date && newHoliday.name) {
      const formattedDate = format(newHoliday.date, "dd/MM/yyyy");
      // Check if the date already exists
      if (holidays.find((holiday) => holiday.date === formattedDate)) {
        // Show a snackbar if the date already exists
        // Show a snackbar if the date already exists
        setSnackbarMessage("This Holiday already exists!");
        setSnackbarSeverity("warning");
        setSnackbarOpen(true);
      } else {
        setHolidays([...holidays, { ...newHoliday, date: formattedDate }]);
        setNewHoliday({ date: null, name: "" });
      }
    }
  };
  const handleDeleteHoliday = (index) => {
    const updatedHolidays = holidays.filter((_, i) => i !== index);
    setHolidays(updatedHolidays);
  };

  const handleSaveSettings = () => {
    const settings = {
      compname: localStorage.getItem("compname"),
      groupType: selectedGroupType,
      companyCode: selectedCountry,
      printFormat: selectedPrintType,

      holidays: JSON.stringify(holidays),
    };

    UpdateCompanySettings(settings).then((response) => {
      if (response.status == "success") {
        // Show a snackbar if the date already exists
        setSnackbarMessage("Settings Update Successfully");
        setSnackbarSeverity("warning");
        setSnackbarOpen(true);
      }
    });
  };
  const handleCountryChange = (event, newValue) => {
    let code = newValue.phone;
    setSelectedCountry(code);
  };

  const handleSnackbarClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setSnackbarOpen(false);
  };

  return (
    <div>
      <div className="p-6 flex md:flex-row  flex-col justify-between">
        <div className="flex flex-col w-[100%] md:w-[50%] items-start justify-between">
          <div className="w-[100%]">
            <div className="mb-4">
              <FormControl
                sx={{
                  width: isSmallScreen ? "100%" : "90%",
                  minWidth: 200,
                }}
              >
                <InputLabel id="demo-simple-select-label">
                  Group Type
                </InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={selectedGroupType}
                  label="Group Type"
                  onChange={(e) => setSelectedGroupType(e.target.value)}
                >
                  <MenuItem value="">
                    <em>None</em>
                  </MenuItem>
                  {groupTypes.map((type) => (
                    <MenuItem key={type.id} value={type.id}>
                      {type.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </div>

            <div className="mb-4">
              <Autocomplete
                id="country-select-demo"
                sx={{
                  width: isSmallScreen ? "100%" : "90%",
                  minWidth: 200,
                }}
                options={countries}
                autoHighlight
                //getOptionLabel={(option) => option}
                onChange={handleCountryChange}
                value={selectedCountry}
                renderOption={(props, option) => (
                  <Box
                    component="li"
                    sx={{ "& > img": { mr: 2, flexShrink: 0 } }}
                    {...props}
                  >
                    <img
                      loading="lazy"
                      width="20"
                      srcSet={`https://flagcdn.com/w40/${option.code.toLowerCase()}.png 2x`}
                      src={`https://flagcdn.com/w20/${option.code.toLowerCase()}.png`}
                      alt=""
                    />
                    {option.label} ({option.code}) {option.phone}
                  </Box>
                )}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Choose a country"
                    inputProps={{
                      ...params.inputProps,
                      autoComplete: "new-password", // disable autocomplete and autofill
                    }}
                  />
                )}
              />
            </div>

            <div className="mb-4">
              <FormControl
                sx={{
                  width: isSmallScreen ? "100%" : "90%",
                  minWidth: 200,
                }}
              >
                <InputLabel id="demo-simple-select-label">
                  Print Type
                </InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={selectedPrintType}
                  label="Print Type"
                  onChange={(e) => setSelectedPrintType(e.target.value)}
                >
                  <MenuItem key={"1"} value={"1"}>
                    5cm
                  </MenuItem>
                  <MenuItem key={"2"} value={"2"}>
                    A4
                  </MenuItem>
                </Select>
              </FormControl>
            </div>
          </div>
        </div>
        <div className="mb-4 flex flex-col w-[100%] md:w-[50%] items-start md:items-end">
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DatePicker
              label="Holiday Date"
              value={newHoliday.date}
              onChange={(date) => setNewHoliday({ ...newHoliday, date })}
              renderInput={(params) => <TextField {...params} fullWidth />}
              sx={{
                width: isSmallScreen ? "100%" : "90%",
                minWidth: 200,
              }}
              format="dd/MM/yyyy"
            />
          </LocalizationProvider>
          <TextField
            className="mt-4"
            label="Holiday Name"
            sx={{
              width: isSmallScreen ? "100%" : "90%",
              minWidth: 200,
            }}
            value={newHoliday.name}
            onChange={(e) =>
              setNewHoliday({ ...newHoliday, name: e.target.value })
            }
          />
          <Button
            className="mt-4"
            variant="contained"
            color="primary"
            sx={{
              width: isSmallScreen ? "100%" : "90%",
              minWidth: 200,
            }}
            onClick={handleAddHoliday}
          >
            Add Holiday
          </Button>

          <div className="mt-4 md:p-3   bg-white rounded-lg shadow-md w-[100%] md:w-[90%]  border border-black-[5px]">
            <h3 className="text-2xl font-bold text-gray-800 mb-2">
              Holidays List:
            </h3>
            <div className="flex flex-row">
              <div className="space-y-2 h-32 overflow-y-auto w-[100%]">
                {holidays.map((holiday, index) => (
                  <div className="flex flex-row items-center">
                    <div className="w-[10%]">
                      <IconButton
                        aria-label="delete"
                        onClick={() => handleDeleteHoliday(index)}
                        size="small"
                      >
                        <DeleteIcon />
                      </IconButton>
                    </div>
                    <div className="w-[90%]">
                      <li
                        key={index}
                        className="p-2 bg-gray-100 rounded-lg shadow-sm flex justify-between items-center hover:bg-gray-200 transition duration-200"
                      >
                        <span className="text-lg font-medium text-gray-700">
                          {holiday.date}
                        </span>
                        <span className="text-lg text-gray-500">
                          {holiday.name}
                        </span>
                      </li>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="w-[100%] md:w-[90%]">
        <Button
          variant="contained"
          color="primary"
          onClick={handleSaveSettings}
          sx={{ width: "100%", minWidth: 200, maxWidth: 500 }}
        >
          Save Settings
        </Button>
      </div>
      <CustomSnackbar
        open={snackbarOpen}
        onClose={handleSnackbarClose}
        severity={snackbarSeverity}
        message={snackbarMessage}
      />
    </div>
  );
};

export default CompanySettings;
