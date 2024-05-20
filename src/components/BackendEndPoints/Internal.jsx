import React from "react";
import "../../index.css"; // Import the CSS file
import * as htmlToImage from "html-to-image";

export async function downloadQrCode(qrValue) {
  console.log(qrValue, "-----=------");
  const qrCodeElement = document.getElementById("qrCodeElement");
  htmlToImage
    .toPng(qrCodeElement)
    .then(function (dataUrl) {
      const link = document.createElement("a");
      link.download = qrValue + "_QrCode.png";
      link.href = dataUrl;
      link.click();
    })
    .catch(function (error) {
      console.error("Error generating QR code image", error);
    });
}
