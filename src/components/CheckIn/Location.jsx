import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { checkInEndPoint } from "../BackendEndPoints/Endpoint1";
export default function Location() {
  const [location, setLocation] = useState({
    latitude: null,
    longitude: null,
  });
  const navigate = useNavigate();
  useEffect(() => {
    console.log("an abkl useeffect location");
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        console.log("Started");
        setLocation({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        });
        console.log(position.coords.latitude);

        saveLongLat();
      });
    } else {
      console.log("Geolocation is not supported by this browser.");
    }
  }, []);

  const saveLongLat = () => {
    localStorage.setItem("longitude", location.longitude);
    localStorage.setItem("latitude", location.latitude);
    console.log("Started...");
    let result = checkInEndPoint();
    if (result["status"] == "authorized") {
      navigate("/invoice");
    } else {
      console.log(result["message"]);
    }
    //window.location.href = "/invoice";
  };

  return (
    <div>
      {/* {location.latitude && <p>Latitude: {location.latitude}</p>}
      {location.longitude && <p>Longitude: {location.longitude}</p>} */}
    </div>
  );
}
