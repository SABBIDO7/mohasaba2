import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { checkInEndPoint } from "../BackendEndPoints/Endpoint1";
export default function Location(props) {
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

        saveLongLat(position.coords.latitude, position.coords.longitude);
      });
    } else {
      console.log("Geolocation is not supported by this browser.");
    }
  }, []);

  const saveLongLat = (lat, long) => {
    localStorage.setItem("longitude", long);
    localStorage.setItem("latitude", lat);
    console.log("Started...");
    checkInEndPoint(long, lat).then((response) => {
      console.log("fettt baad");
      console.log(response);
      props.setShowLocation(false);
      if (response.status == "authorized") {
        console.log("fet authorized");
        navigate("/invoice");
      } else {
        console.log("fet msh authorized");
        console.log(response.message);
      }
    });

    //window.location.href = "/invoice";
  };

  return (
    <div>
      {/* {location.latitude && <p>Latitude: {location.latitude}</p>}
      {location.longitude && <p>Longitude: {location.longitude}</p>} */}
    </div>
  );
}
