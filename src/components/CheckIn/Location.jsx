import React, { useEffect, useState } from "react";

export default function Location() {
  const [location, setLocation] = useState({
    latitude: null,
    longitude: null,
  });

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        setLocation({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        });
      });
    } else {
      console.log("Geolocation is not supported by this browser.");
    }
  }, []);

  return (
    <div>
      {location.latitude && <p>Latitude: {location.latitude}</p>}
      {location.longitude && <p>Longitude: {location.longitude}</p>}
    </div>
  );
}
