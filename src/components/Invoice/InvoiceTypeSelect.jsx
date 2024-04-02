import React, { useState } from "react";
import Select from "react-select";
import Button from "react-bootstrap/Button";

export default function InvoiceTypeSelect(props) {
  const [dType, setdType] = useState({ value: "Sales", label: "Sales" });

  const [sInvoice, setSInvoice] = useState("");

  const invoiceOptions = [
    { value: "Sales", label: "Sales" },
    // { value: "Sales Return", label: "Sales Return" },
    // { value: "Order", label: "Order" },
    // { value: "Reciept Voucher", label: "Reciept Voucher" },
  ];

  return (
    <div className="w-[90vw] h-[80vh] m-auto flex flex-row justify-center items-center">
      <div className="mb-5 bg-neutral-200 w-[20rem] h-[15rem] rounded-lg shadow-xl flex flex-col p-2 justify-between">
        <h2 className=" text-center">Invoices Type</h2>
        <Select
          className=" w-[70%] mx-auto"
          classNamePrefix="select"
          isSearchable={false}
          isClearable={false}
          name="color"
          value={dType}
          defaultValue={sInvoice}
          options={invoiceOptions}
          onChange={(e) => {
            setdType(e);
          }}
        />
        <div className="flex flex-row justify-end">
          <Button onClick={() => props.inv(dType.value)}>Select</Button>
        </div>
      </div>
    </div>
  );
}
