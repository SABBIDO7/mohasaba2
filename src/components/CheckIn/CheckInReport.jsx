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
import {
  getTimeEndPoint,
  CheckInDashboardFiltering,
} from "../BackendEndPoints/Endpoint1";

const columns = [
  {
    id: "User",
    label: "User",
    minWidth: 170,
    align: "left",
  },
  {
    id: "Location",
    label: "Location",
    minWidth: 170,
    align: "center",
    format: (value) => value.toFixed(2),
  },
  {
    id: "CheckInId",
    label: "CheckIn No",
    minWidth: 170,
    align: "center",
    format: (value) => value.toFixed(2),
  },

  {
    id: "AccountName",
    label: "Account Name",
    minWidth: 170,
    align: "left",
    format: (value) => value.toFixed(2),
  },
  {
    id: "CheckInDate",
    label: "CheckIn Date",
    minWidth: 170,
    align: "center",
    format: (value) => value.toFixed(2),
  },
  {
    id: "CheckInTime",
    label: "CheckIn Time",
    minWidth: 170,
    align: "center",
    format: (value) => value.toFixed(2),
  },
  {
    id: "Notes",
    label: "Notes",
    minWidth: 170,
    align: "center",
    format: (value) => value.toFixed(2),
  },
];

function createData(
  User,
  AccountName,
  CheckInId,

  AddInfo,
  CheckInDate,
  CheckInTime,
  Notes,
  Location
) {
  return {
    User,
    AccountName,
    CheckInId,

    AddInfo,
    CheckInDate,
    CheckInTime,
    Notes,
    Location,
  };
}

const rows = [
  createData(
    "India",
    "IN",
    1324171354,

    "w",
    "15/05/2024",

    "10:21:33",
    "Notes",
    "LocationUrl"
  ), //hh:mm:ss
  createData(
    "China",
    "CN",
    1403500365,

    "w",
    "15/05/2024",
    "10:21:33",
    "Notes",
    "LocationUrl"
  ),
  createData(
    "Italy",
    "IT",
    60483973,

    "w",
    "15/05/2024",
    "10:21:33",
    "Notes",
    "LocationUrl"
  ),
  createData(
    "United States",
    "US",
    327167434,

    "w",
    "15/05/2024",
    "10:21:33",
    "Notes",
    "LocationUrl"
  ),
  createData(
    "Canada",
    "CA",
    37602103,

    "w",
    "15/05/2024",
    "10:21:33",
    "Notes",
    "LocationUrl"
  ),
  createData(
    "Australia",
    "AU",
    25475400,

    "w",
    "15/05/2024",
    "10:21:33",
    "Notes",
    "LocationUrl"
  ),
  createData(
    "Germany",
    "DE",
    83019200,

    "w",
    "15/05/2024",
    "10:21:33",
    "Notes",
    "LocationUrl"
  ),
  createData(
    "Ireland",
    "IE",
    4857000,

    "w",
    "15/05/2024",
    "10:21:33",
    "Notes",
    "LocationUrl"
  ),
  createData(
    "Mexico",
    "MX",
    126577691,

    "w",
    "15/05/2024",
    "10:21:33",
    "Notes",
    "LocationUrl"
  ),
  createData(
    "Japan",
    "JP",
    126317000,

    "w",
    "15/05/2024",
    "10:21:33",
    "Notes",
    "LocationUrl"
  ),
  createData(
    "France",
    "FR",
    67022000,

    "w",
    "15/05/2024",
    "10:21:33",
    "Notes",
    "LocationUrl"
  ),
  createData(
    "United Kingdom",
    "GB",
    67545757,

    "w",
    "01/05/2024",
    "10:21:33",
    "Notes",
    "LocationUrl"
  ),
  createData(
    "Russia",
    "RU",
    146793744,

    "w",
    "05/05/2024",
    "10:21:33",
    "Notes",
    "LocationUrl"
  ),
  createData(
    "Nigeria",
    "NG",
    200962417,

    "w",
    "15/05/2024",
    "10:21:33",
    "Notes",
    "LocationUrl"
  ),
  createData(
    "Brazil",
    "BR",
    210147125,

    "w",
    "15/05/2024",
    "10:21:33",
    "Notes",
    "LocationUrl"
  ),
];

export default function CheckInReport(props) {
  const navigate = useNavigate();

  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(20);
  const [vInput, setvInput] = React.useState("");
  const [fromDate, setFromDate] = React.useState("");
  const [toDate, setToDate] = React.useState("");
  const [userValue, setUserValue] = React.useState(null);
  const [inputUserValue, setInputUserValue] = React.useState("");
  const options = ["Option 1", "Option 2", "Option 3", "Russia"]; // Replace with your options
  const [currentTime, setCurrentTime] = React.useState("");

  const [filteredRows, setFilteredRows] = React.useState(rows);
  const handleClearFilters = () => {
    resetFilters();
  };

  const resetFilters = () => {
    setvInput("");
    setFromDate("");
    setToDate("");
    setUserValue("");
    setInputUserValue("");
    setCurrentTime("");
    getData();
  };
  const applyFilters = () => {
    getData();
    let filteredData = rows.filter((row) => {
      // Filter by search input
      if (
        !vInput ||
        row.User.toLowerCase().includes(vInput.toLowerCase()) ||
        row.AccountName.toLowerCase().includes(vInput.toLowerCase()) ||
        row.Notes.toLowerCase().includes(vInput.toLowerCase()) ||
        row.CheckInId.toString().includes(vInput.toString())
      ) {
        // Filter by date range
        if (
          (!fromDate || new Date(row.CheckInDate) >= fromDate) &&
          (!toDate || new Date(row.CheckInDate) <= toDate)
        ) {
          // Filter by selected user
          if (!userValue || row.User === userValue) {
            return true;
          }
        }
      }
      return false;
    });
    setFilteredRows(filteredData);
  };
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };
  const getData = () => {
    let data = {
      search: vInput,
      fromDate: fromDate,
      toDate: toDate,
      time: currentTime,
      user: inputUserValue,
      compname: localStorage.getItem("compname"),
      username: localStorage.getItem("username"),
    };
    CheckInDashboardFiltering(data);
  };

  React.useEffect(() => {
    getData();
    // let [date, time] = getTimeEndPoint();
    // console.log(time);
    // time = time.substring(1); // Remove the 'T' prefix

    // const currentDate = new Date();
    // currentDate.setHours(time.split(":")[0]);
    // currentDate.setMinutes(time.split(":")[1]);
    // setCurrentTime(currentDate);
    // console.log(currentDate);
  }, []);

  React.useEffect(() => {
    applyFilters();
  }, [vInput, fromDate, toDate, userValue, currentTime]);

  return (
    <div className="h-full">
      <div className="flex flex-col md:flex-row justify-between  w-full px-4 py-2 space-y-2 md:space-y-0 md:space-x-4">
        <div className="flex  flex-row justify-between">
          <button
            className="transparent-button"
            onClick={() => navigate("/CheckIn")}
          >
            <ArrowBackIcon />
          </button>
          <input
            type="text"
            className="text-lg font-semibold block rounded-md w-full md:w-auto border border-secondd bg-white px-4 py-2 focus:outline-none focus:border-secondd focus:ring-1 focus:ring-secondd"
            placeholder="Search Value"
            value={vInput}
            onChange={(e) => setvInput(e.target.value)}
            id="tf"
          />
        </div>
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <div className="flex space-x-2">
            <DatePicker
              label="From Date"
              value={fromDate}
              onChange={(newValue) => setFromDate(newValue)}
              format="dd/MM/yyyy"
              renderInput={(params) => <TextField {...params} />}
            />
            <DatePicker
              label="To Date"
              value={toDate}
              onChange={(newValue) => setToDate(newValue)}
              format="dd/MM/yyyy"
              renderInput={(params) => <TextField {...params} />}
            />
          </div>
        </LocalizationProvider>
        <div>
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DemoContainer
              sx={{ height: "fit", padding: 0, margin: 0 }}
              components={["MobileTimePicker"]}
            >
              <DemoItem>
                <MobileTimePicker
                  // value={currentTime}
                  ampm={false} // Set ampm prop to false
                  onChange={(newTime) => setCurrentTime(newTime)}
                  renderInput={(params) => <TextField {...params} />}
                />
              </DemoItem>
            </DemoContainer>
          </LocalizationProvider>
        </div>
        <Autocomplete
          value={userValue}
          onChange={(event, newValue) => setUserValue(newValue)}
          inputValue={inputUserValue}
          onInputChange={(event, newInputValue) =>
            setInputUserValue(newInputValue)
          }
          id="controllable-states-demo"
          options={options}
          className=" w-full md:w-[300px]"
          renderInput={(params) => (
            <TextField {...params} label="Select User" />
          )}
        />
        <button
          onClick={handleClearFilters}
          className="w-[fit] px-4 py-2 bg-red-500 text-white rounded-md shadow-md hover:bg-red-600 focus:outline-none focus:ring focus:ring-red-400"
        >
          Clear Filters
        </button>
      </div>
      <Paper
        sx={{
          width: "calc(100% - 32px)",
          height: "78%",
          overflow: "hidden",
          margin: "auto",
          "@media (max-width: 768px)": {
            width: "calc(100% - 24px)",
            height: "auto",
          },
        }}
      >
        <TableContainer sx={{ maxHeight: 500 }}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                {columns.map((column) => (
                  <TableCell
                    key={column.id}
                    align={column.align}
                    style={{
                      minWidth: column.minWidth,
                      fontWeight: "bold",
                    }}
                  >
                    {column.label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredRows
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row) => {
                  return (
                    <TableRow
                      hover
                      role="checkbox"
                      tabIndex={-1}
                      key={row.code}
                    >
                      {columns.map((column) => {
                        const value = row[column.id];
                        return (
                          <TableCell key={column.id} align={column.align}>
                            {column.format && typeof value === "number"
                              ? column.format(value)
                              : value}
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
          rowsPerPageOptions={[10, 20, 35, 50, 100]}
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </div>
  );
}
