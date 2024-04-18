import React, { useState, useEffect } from "react";
import BluetoothSerial from "react-native-bluetooth-serial";

const PrinterComponent = () => {
  const [devices, setDevices] = useState([]);
  const [selectedDevice, setSelectedDevice] = useState(null);

  useEffect(() => {
    // Discover nearby Bluetooth devices
    BluetoothSerial.list().then((devices) => {
      setDevices(devices);
    });
  }, []);

  const connectToDevice = (device) => {
    // Connect to the selected Bluetooth device
    BluetoothSerial.connect(device.id)
      .then(() => {
        setSelectedDevice(device);
      })
      .catch((error) => {
        console.error("Failed to connect:", error);
      });
  };

  const printPDF = () => {
    // Send print commands to the printer (PDF printing logic)
    // This part depends on the specific printer model and its supported commands
    // You may need to use a library or implement the command generation yourself
  };

  return (
    <div>
      <h1>Bluetooth Printer</h1>
      <ul>
        {devices.map((device) => (
          <li key={device.id}>
            {device.name} - {device.id}
            <button onClick={() => connectToDevice(device)}>Connect</button>
          </li>
        ))}
      </ul>
      {selectedDevice && (
        <div>
          <h2>Connected to: {selectedDevice.name}</h2>
          <button onClick={printPDF}>Print PDF</button>
        </div>
      )}
    </div>
  );
};

export default PrinterComponent;
