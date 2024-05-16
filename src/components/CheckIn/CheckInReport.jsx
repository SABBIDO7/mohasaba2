import Modals from "../Modals/Modals";
import { useNavigate } from "react-router-dom";
import backbutton from "../../media/backbutton.png";
import {
  checkInEndPoint,
  handleCheckInSearch,
  Notify,
} from "../BackendEndPoints/Endpoint1";
import * as React from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { TextField } from "@mui/material";
import Autocomplete from "@mui/material/Autocomplete";
import { MobileTimePicker } from "@mui/x-date-pickers/MobileTimePicker";
import { DemoContainer, DemoItem } from "@mui/x-date-pickers/internals/demo";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import {
  getTimeEndPoint,
  CheckInDashboardFiltering,
  getUsers,
} from "../BackendEndPoints/Endpoint1";

const columns = [
  {
    id: "User",
    label: "User",
    minWidth: 150,
    align: "left",
  },
  {
    id: "LocationUrl",
    label: "Location",
    minWidth: 100,
    align: "center",
    //format: (value) => value.toFixed(2),
  },
  {
    id: "RefNo",
    label: "CHK No",
    minWidth: 100,
    align: "center",
    // format: (value) => value.toFixed(2),
  },

  {
    id: "AccName",
    label: "AccName",
    minWidth: 170,
    align: "left",
    // format: (value) => value.toFixed(2),
  },
  {
    id: "DateI",
    label: "CHK Date",
    minWidth: 100,
    align: "center",
    //format: (value) => value.toFixed(2),
  },
  {
    id: "TimeI",
    label: "CHK Time",
    minWidth: 100,
    align: "center",
    //format: (value) => value.toFixed(2),
  },
  {
    id: "Notes",
    label: "Notes",
    minWidth: 170,
    align: "left",
    //format: (value) => value.toFixed(2),
  },
  {
    id: "AccNo",
    label: "Acc Id",
    minWidth: 100,
    align: "center",
    //format: (value) => value.toFixed(2),
  },
];

export default function CheckInReport(props) {
  const navigate = useNavigate();

  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(20);
  const [vInput, setvInput] = React.useState("");
  const [fromDate, setFromDate] = React.useState(null);
  const [toDate, setToDate] = React.useState(null);
  const [userValue, setUserValue] = React.useState(null);
  const [inputUserValue, setInputUserValue] = React.useState("");
  const [fromTime, setFromTime] = React.useState(null);
  const [toTime, setToTime] = React.useState(null);
  const [filteredRows, setFilteredRows] = React.useState([]);
  const [users, setUsers] = React.useState([]);
  const [limit, setLimit] = React.useState("20");

  const handleChange = (event) => {
    setLimit(event.target.value);
  };
  const handleClearFilters = () => {
    resetFilters();
  };

  const resetFilters = () => {
    setvInput("");
    setFromDate(null);
    setToDate(null);
    setUserValue("");
    setInputUserValue("");
    setFromTime(null);
    setToTime(null);
    getData();
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };
  const getData = () => {
    let toDateFormatted = null;
    let fromDateFormatted = null;
    let toTimeFormatted = null;
    let fromTimeFormatted = null;
    if (fromDate != null) {
      fromDateFormatted = fromDate.toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
      });
    }
    if (toDate != null) {
      toDateFormatted = toDate.toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
      });
    }
    if (fromTime != null) {
      const hours = ("0" + fromTime.getHours()).slice(-2);
      const minutes = ("0" + fromTime.getMinutes()).slice(-2);

      // Construct time in Thh:mm:00 format
      fromTimeFormatted = `T${hours}:${minutes}:00`;
      console.log(fromTimeFormatted);
    }
    if (toTime != null) {
      const hours = ("0" + toTime.getHours()).slice(-2);
      const minutes = ("0" + toTime.getMinutes()).slice(-2);

      // Construct time in Thh:mm:00 format
      toTimeFormatted = `T${hours}:${minutes}:00`;
      console.log(toTimeFormatted);
    }
    console.log("timee", fromTime);
    let data = {
      search: vInput,
      fromDate: fromDate != null ? fromDateFormatted : fromDate,
      toDate: toDate != null ? toDateFormatted : toDate,
      fromTime: fromTime != null ? fromTimeFormatted : fromTime,
      toTime: toTime != null ? toTimeFormatted : toTime,

      user: inputUserValue,
      limit: limit,
      compname: localStorage.getItem("compname"),
      username: localStorage.getItem("username"),
    };
    console.log(data);
    CheckInDashboardFiltering(data).then((response) => {
      if (response && response.status == "success") {
        setFilteredRows(response.result);
        console.log(response.result);
      }
    });
  };
  const getUsersData = () => {
    getUsers().then((response) => {
      if (response && response.status == "success") {
        setUsers(response.result);
        console.log(response.result);
      }
    });
  };

  React.useEffect(() => {
    getData();
    getUsersData();
  }, []);

  React.useEffect(() => {
    getData();
  }, [vInput, fromDate, toDate, userValue, fromTime, toTime, limit]);

  return (
    <div className="h-[100%]">
      <div className="flex  h-[25%]  filtercontairDashboard">
        <div className="fromTo">
          <div
            className="flex  flex-row justify-between md-custom:w-[60%] searchCheckInDashboard"
            style={{ width: "65%" }}
          >
            <button
              className="transparent-button"
              onClick={() => navigate("/CheckIn")}
            >
              <ArrowBackIcon />
            </button>
            <input
              type="text"
              className="h-[100%]    md-custom:w-[fit] md-custom:h-[fit]  text-lg font-semibold block rounded-md w-full md-custom:w-auto border border-secondd bg-white px-4 py-2 focus:outline-none focus:border-secondd focus:ring-1 focus:ring-secondd"
              placeholder="Search"
              value={vInput}
              onChange={(e) => setvInput(e.target.value)}
              id="tf"
            />
          </div>
          <button
            onClick={handleClearFilters}
            className="w-full h-[45%]    md:w-[fit] md:h-[fit]   px-4 py-2 bg-red-500 text-BgTextColor rounded-md shadow-md hover:bg-red-600 focus:outline-none focus:ring focus:ring-red-400 clearCheckInDashboard"
          >
            Clear
          </button>
        </div>
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <div className="fromTo">
            <DatePicker
              label="From Date"
              value={fromDate}
              onChange={(newValue) => setFromDate(newValue)}
              format="dd/MM/yyyy"
              sx={{ "& input": { padding: "14px", fontSize: "14px" } }} // Custom styles for input
              slotProps={{ textField: { fullWidth: true } }} // Use textField slotProps
            />
            <DatePicker
              label="To Date"
              value={toDate}
              onChange={(newValue) => setToDate(newValue)}
              format="dd/MM/yyyy"
              sx={{
                "& input": { padding: "14px", fontSize: "14px" },
              }} // Custom styles for input
              slotProps={{ textField: { fullWidth: true } }} // Use textField slotProps
            />
          </div>
        </LocalizationProvider>
        <div className="fromTo">
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DemoContainer
              sx={{
                height: "fit",
                padding: 0,
                margin: 0,
                "@media (max-width: 1000px)": {
                  width: "50%",
                },
              }}
              components={["MobileTimePicker"]}
            >
              <DemoItem>
                <MobileTimePicker
                  label="From Time"
                  value={fromTime}
                  ampm={false} // Set ampm prop to false
                  onChange={(newTime) => setFromTime(newTime)}
                  sx={{
                    "& input": {
                      padding: "14px",
                      fontSize: "14px",
                    },
                  }} // Custom styles for input
                  slotProps={{ textField: { fullWidth: true } }} // Use textField slotProps
                />
              </DemoItem>
            </DemoContainer>
          </LocalizationProvider>
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DemoContainer
              sx={{
                height: "fit",
                padding: 0,
                margin: 0,
                "@media (max-width: 1000px)": {
                  width: "50%",
                },
              }}
              components={["MobileTimePicker"]}
            >
              <DemoItem>
                <MobileTimePicker
                  label="To Time"
                  value={toTime}
                  ampm={false} // Set ampm prop to false
                  onChange={(newTime) => setToTime(newTime)}
                  sx={{ "& input": { padding: "14px", fontSize: "14px" } }} // Custom styles for input
                  slotProps={{ textField: { fullWidth: true } }} // Use textField slotProps
                />
              </DemoItem>
            </DemoContainer>
          </LocalizationProvider>
        </div>
        <div className="fromTo">
          <Autocomplete
            value={userValue}
            onChange={(event, newValue) => setUserValue(newValue)}
            inputValue={inputUserValue}
            onInputChange={(event, newInputValue) =>
              setInputUserValue(newInputValue)
            }
            id="controllable-states-demo"
            options={users}
            className=" w-full md-custom:w-[200px]"
            renderInput={(params) => (
              <TextField
                {...params}
                label="Select User"
                sx={{
                  "& input": { padding: "14px", fontSize: "14px" },
                }} // Custom styles for input
              />
            )}
          />
          <FormControl sx={{ minWidth: 80 }}>
            <InputLabel id="demo-simple-select-autowidth-label">
              Limit
            </InputLabel>
            <Select
              labelId="demo-simple-select-autowidth-label"
              id="demo-simple-select-autowidth"
              value={limit}
              sx={{ "& input": { padding: "14px", fontSize: "14px" } }} // Custom styles for input
              onChange={handleChange}
              autoWidth
              label="Limit"
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>

              <MenuItem value={"20"}>20</MenuItem>

              <MenuItem value={"50"}>50</MenuItem>
              <MenuItem value={"75"}>75</MenuItem>
              <MenuItem value={"100"}>100</MenuItem>

              <MenuItem value={"200"}>200</MenuItem>
              <MenuItem value={"5000"}>500</MenuItem>
              <MenuItem value={"1000"}>1K</MenuItem>
              <MenuItem value={"2000"}>2K</MenuItem>
              <MenuItem value={"All"}>All</MenuItem>
            </Select>
          </FormControl>
        </div>
      </div>
      {/* <button
        id="toggleButton"
        class="md:hidden bg-blue-500 text-white px-4 py-2 rounded-md shadow-md hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-400"
      >
        Toggle Filters
      </button> */}
      <Paper
        sx={{
          width: "calc(100% - 32px)",
          height: "auto",
          overflow: "hidden",
          margin: "auto",
          "@media (max-width: 1000px)": {
            width: "calc(100% - 24px)",
          },
        }}
      >
        <TableContainer
          sx={{
            "@media (max-width: 1000px)": { maxHeight: "50vh" }, // Adjust height for screens smaller than 1000px
            maxHeight: "75%", // Default height
          }}
          className="tableContainerDashboard"
        >
          <Table stickyHeader aria-label="sticky table">
            <TableHead sx={{}}>
              <TableRow>
                {columns.map((column) => (
                  <TableCell
                    key={column.id}
                    align={column.align}
                    style={{
                      minWidth: column.minWidth,
                    }}
                    className="tableMuiHeader"
                  >
                    {column.label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredRows &&
                filteredRows
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row) => {
                    return (
                      <TableRow
                        hover
                        role="checkbox"
                        tabIndex={-1}
                        key={row.RefNo}
                      >
                        {columns.map((column) => {
                          const id = column.id;
                          const value = row[0][id];

                          return (
                            <TableCell
                              key={column.id}
                              align={column.align}
                              // sx={{ borderRight: "0.15px solid" }}
                            >
                              {/* {column.format && typeof value === "number"
                                ? column.format(value)
                                : value} */}
                              {column.id == "LocationUrl" ? (
                                <a
                                  href={`https://www.google.com/maps/?q=${value}`}
                                  target="_blank"
                                >
                                  Location
                                </a>
                              ) : (
                                value
                              )}
                            </TableCell>
                          );
                        })}
                      </TableRow>
                    );
                  })}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[10, 20, 30, 40, 50, 100, 150, 200]}
          component="div"
          count={filteredRows && filteredRows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </div>
  );
}
