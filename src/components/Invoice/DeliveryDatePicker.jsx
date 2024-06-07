import React, { useState, useEffect } from "react";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { MobileTimePicker } from "@mui/x-date-pickers/MobileTimePicker";

const DeliveryDatePicker = (props) => {
  const [deliveryDate, setDeliveryDate] = useState(null);
  // Define holidays as an array of Date objects
  const holidays = [
    {
      name: "Adha",
      date: new Date("2024-06-11"),
    },
    {
      name: "Adha",
      date: new Date("2024-06-12"),
    },
    {
      // Example: Wednesday of the Iid Adha holiday
      name: "Adha",
      date: new Date("2024-06-13"),
    }, // Example: Thursday of the Iid Adha holiday

    // Example: Tuesday of the Iid Adha holiday
    // Add more holidays as needed
  ];

  useEffect(() => {
    if (props.Client["deliveryDays"]) {
      const deliveryDays = parseInt(props.Client["deliveryDays"], 10);
      if (!isNaN(deliveryDays)) {
        const currentDate = new Date();
        let calculatedDeliveryDate = new Date(currentDate);
        let daysAdded = 0;

        while (daysAdded < deliveryDays) {
          calculatedDeliveryDate.setDate(calculatedDeliveryDate.getDate() + 1);

          // Skip Sundays
          if (calculatedDeliveryDate.getDay() === 0) {
            continue;
          }

          // Skip holidays
          const isHoliday = holidays.some(
            (holiday) =>
              holiday["date"].getDate() === calculatedDeliveryDate.getDate() &&
              holiday["date"].getMonth() ===
                calculatedDeliveryDate.getMonth() &&
              holiday["date"].getFullYear() ===
                calculatedDeliveryDate.getFullYear()
          );

          if (!isHoliday) {
            daysAdded++;
          }
        }

        setDeliveryDate(calculatedDeliveryDate);
      }
    }
  }, [props.Client["deliveryDays"]]);

  return (
    <div className="flex flex-row ml-[10%] rounded p-0.5">
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <DatePicker
          value={deliveryDate}
          onChange={(date) => setDeliveryDate(date)}
          dateFormat="yyyy/MM/dd"
          className="text-md font-semibold block rounded-md w-[fit] h-[fit]"
        />
      </LocalizationProvider>
    </div>
  );
};

export default DeliveryDatePicker;
