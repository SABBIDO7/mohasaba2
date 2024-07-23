import React, { useState, useEffect } from "react";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { MobileTimePicker } from "@mui/x-date-pickers/MobileTimePicker";
import {
  format,
  parse,
  isSameDay,
  eachDayOfInterval,
  differenceInDays,
} from "date-fns"; // Import date-fns format function
import { getCompanySettingsData } from "../BackendEndPoints/Endpoint1";
import CustomSnackbar from "../Snackbar/CustomSnackbar"; // Import the new Snackbar component

const DeliveryDatePicker = (props) => {
  const [deliveryDate, setDeliveryDate] = useState(null);
  const listOffs = [];
  const [flagStartCalc, setFlagStartCal] = useState(true);
  const [holidays, setHolidays] = useState([]);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState();
  // Define holidays as an array of Date strings
  // const holidays = [
  //   {
  //     name: "Adha",
  //     date: "13/06/2024",
  //   },
  //   {
  //     name: "Adha",
  //     date: "14/06/2024",
  //   },
  //   {
  //     name: "Adha",
  //     date: "15/06/2024",
  //   },
  //   // Add more holidays as needed
  // ];

  // // Function to convert string to Date object
  // const convertToDate = (dateString) => {
  //   return new Date(dateString);
  // };

  // const calculateDeliveryEdit = (oldDate, newChoosenDate) => {
  //   console.log("old date", oldDate);
  //   console.log(newChoosenDate);
  //   const offs = [];
  //   const startDate = convertToDate(oldDate);
  //   const endDate = new Date(newChoosenDate);
  //   // Get all dates between the start and end date
  //   const interval = eachDayOfInterval({
  //     start: startDate,
  //     end: endDate,
  //   });

  //   interval.forEach((date) => {
  //     // Check for weekends (Sunday)
  //     if (date.getDay() === 0) {
  //       offs.push({
  //         name: "Sunday",
  //         date: format(date, "dd/MM/yyyy"),
  //       });
  //     }

  //     // Check for holidays
  //     const isHoliday = holidays.some((holiday) =>
  //       isSameDay(parse(holiday.date, "dd/MM/yyyy", new Date()), date)
  //     );
  //     if (isHoliday) {
  //       const holidayName = holidays.find((holiday) =>
  //         isSameDay(parse(holiday.date, "dd/MM/yyyy", new Date()), date)
  //       ).name;
  //       offs.push({
  //         name: holidayName,
  //         date: format(date, "dd/MM/yyyy"),
  //       });
  //     }
  //   });

  //   props.setListOffs(offs);
  // }; //behsob l old date betwen l new date choosen mnsuf l offs bayneton
  const handleSnackbarClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setSnackbarOpen(false);
  };
  const checkIfOffDayChoosen = (day) => {
    // Check if it's a Sunday
    if (day.getDay() === 0) {
      setSnackbarMessage("The chosen date is a Sunday!");
      setSnackbarSeverity("warning");
      setSnackbarOpen(true);
      return;
    }
    // Skip holidays
    const isHoliday = holidays.some((holiday) =>
      isSameDay(parse(holiday.date, "dd/MM/yyyy", new Date()), day)
    );
    if (isHoliday) {
      const holidayName = holidays.find((holiday) =>
        isSameDay(parse(holiday.date, "dd/MM/yyyy", new Date()), day)
      ).name;
      setSnackbarMessage(`The Choosen Date is ${holidayName}'s Holiday!`);
      setSnackbarSeverity("warning");
      setSnackbarOpen(true);
    }
  };

  const CalculateDeliveryWorkingDays = (
    holidays,
    calculatedDeliveryDate,
    deliveryDays,
    oldInvoice
  ) => {
    let daysAdded = 0;

    while (daysAdded < deliveryDays) {
      calculatedDeliveryDate.setDate(calculatedDeliveryDate.getDate() + 1);

      // alert(calculatedDeliveryDate);
      // Skip Sundays
      if (calculatedDeliveryDate.getDay() === 0) {
        listOffs.push({
          name: "Sunday",
          date: format(calculatedDeliveryDate, "dd/MM/yyyy"),
        });
        continue;
      }
      // Skip holidays
      const isHoliday = holidays.some((holiday) =>
        isSameDay(
          parse(holiday.date, "dd/MM/yyyy", new Date()),
          calculatedDeliveryDate
        )
      );
      if (isHoliday) {
        const holidayName = holidays.find((holiday) =>
          isSameDay(
            parse(holiday.date, "dd/MM/yyyy", new Date()),
            calculatedDeliveryDate
          )
        ).name;
        listOffs.push({
          name: holidayName,
          date: format(calculatedDeliveryDate, "dd/MM/yyyy"),
        });
      } else if (!isHoliday) {
        daysAdded++;
      }
    }
    props.setListOffs(listOffs);
    setDeliveryDate(calculatedDeliveryDate);
    setFlagStartCal(false);
    props.setClient({
      ...props.Client,
      deliveryDays: format(calculatedDeliveryDate, "dd/MM/yyyy"),
    });
  };
  useEffect(() => {
    getCompanySettingsData().then((response) => {
      if (response.status == "success") {
        setHolidays(JSON.parse(response.Holidays));
      }
    });
  }, []);
  useEffect(() => {
    if (flagStartCalc) {
      if (props.Client["deliveryDays"]) {
        let deliveryDays;
        let calculatedDeliveryDate;
        if (!props.oldInvoice) {
          if (!isNaN(props.Client["deliveryDays"])) {
            deliveryDays = parseInt(props.Client["deliveryDays"], 10);

            if (!isNaN(deliveryDays)) {
              console.log("is int");
              const currentDate = new Date();
              calculatedDeliveryDate = new Date(currentDate);
              getCompanySettingsData().then((response) => {
                if (response.status == "success") {
                  setHolidays(JSON.parse(response.Holidays));
                  CalculateDeliveryWorkingDays(
                    JSON.parse(response.Holidays),
                    calculatedDeliveryDate,
                    deliveryDays,
                    props.oldInvoice
                  );
                }
              });
            }
          } else {
            const storedDeliveryDate = parse(
              props.Client["deliveryDays"],
              "dd/MM/yyyy",
              new Date()
            );
            setDeliveryDate(storedDeliveryDate);
          }
        } else if (props.oldInvoice) {
          const storedDeliveryDate = parse(
            props.Client["deliveryDays"],
            "dd/MM/yyyy",
            new Date()
          );
          setDeliveryDate(storedDeliveryDate);
        }
      }
    }
  }, [props.Client["deliveryDays"]]);

  return (
    <>
      <div className="flex flex-row  rounded p-0.5">
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <DatePicker
            value={deliveryDate}
            onChange={(date) => {
              // if (isNaN(Date.parse(props.Client["deliveryDays"]))) {
              //   calculateDeliveryEdit(props.Client["deliveryDays"], date);
              // }

              checkIfOffDayChoosen(date);
              setDeliveryDate(date);
              props.setClient({
                ...props.Client,
                deliveryDays: format(date, "dd/MM/yyyy"),
              });
              props.setpropertiesAreEqual(false);
              props.setListOffs([]);
            }}
            format="dd/MM/yyyy"
            className="text-md font-semibold block rounded-md w-[fit] h-[fit]"
            minDate={new Date()} // Add this line
          />
        </LocalizationProvider>
      </div>
      <CustomSnackbar
        open={snackbarOpen}
        onClose={handleSnackbarClose}
        severity={snackbarSeverity}
        message={snackbarMessage}
      />
    </>
  );
};

export default DeliveryDatePicker;
