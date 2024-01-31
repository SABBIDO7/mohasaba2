import Select from "react-select";
import React, { useState, useEffect } from "react";
import uuid from "react-uuid";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import FilterIcon from "../../media/FilterIcon.png";
import backimg from "../../media/d.png";
import Form from "react-bootstrap/Form";
import resetimg from "../../media/R.png";

export default function StockFilter(props) {
    const filtersOptions = [
        { value: "Start", label: "Start" },
        { value: "Contains", label: "Contains" },
        { value: "Not Equal", label: "Not Equal" },
        { value: ">", label: ">" },
        { value: "<", label: "<" },
        { value: "=", label: "=" },
    ];

    const [bBranch, setbBranch] = useState(props.filter.branch);
    const [sBranch, setsBranch] = useState(props.filter.selectedBranch);

    const [vAny, setvAny] = useState(props.filter.vAny);
    const [vItemNumber, setvItemNumber] = useState(props.filter.vItemNumber);
    const [vName, setvName] = useState(props.filter.vName);
    const [vQuantity, setvQuantity] = useState(props.filter.vQuantity);
    const [vOriginalNumber, setvOriginalNumber] = useState(props.filter.vOriginalNumber);
    const [vSet, setvSet] = useState(props.filter.vSet);
    const [vCat, setvCat] = useState(props.filter.vCat);
    const [vUnit, setvUnit] = useState(props.filter.vUnit);
    const [vBrand, setvBrand] = useState(props.filter.vBrand);
    const [vOrigin, setvOrigin] = useState(props.filter.vOrigin);
    const [vSuplier, setvSuplier] = useState(props.filter.vSuplier);
    const [vSize, setvSize] = useState(props.filter.vSize);
    const [vColor, setvColor] = useState(props.filter.vColor);
    const [vFamily, setvFamily] = useState(props.filter.vFamily);
    const [vGroup, setvGroup] = useState(props.filter.vGroup);

    const [sAny, setsAny] = useState(props.filter.sAny);
    const [sItemNumber, setsItemNumber] = useState(props.filter.sItemNumber);
    const [sName, setsName] = useState(props.filter.sName);
    const [sQuantity, setsQuantity] = useState(props.filter.sQuantity);
    const [sOriginalNumber, setsOriginalNumber] = useState(props.filter.sOriginalNumber);
    const [sSet, setsSet] = useState(props.filter.sSet);
    const [sCat, setsCat] = useState(props.filter.sCat);
    const [sUnit, setsUnit] = useState(props.filter.sUnit);
    const [sBrand, setsBrand] = useState(props.filter.sBrand);
    const [sOrigin, setsOrigin] = useState(props.filter.sOrigin);
    const [sSuplier, setsSuplier] = useState(props.filter.sSuplier);
    const [sSize, setsSize] = useState(props.filter.sSize);
    const [sColor, setsColor] = useState(props.filter.sColor);
    const [sFamily, setsFamily] = useState(props.filter.sFamily);
    const [sGroup, setsGroup] = useState(props.filter.sGroup);

    function clearFilters() {
        setbBranch(false);
        setsBranch("Any");

        setvAny("");
        setvItemNumber("");
        setvName("");
        setvQuantity("");
        setvOriginalNumber("");
        setvSet("");
        setvCat("");
        setvUnit("");
        setvBrand("");
        setvOrigin("");
        setvSuplier("");
        setvSize("");
        setvColor("");
        setvFamily("");
        setvGroup("");

        setsAny("Start");
        setsItemNumber("Start");
        setsName("Start");
        setsQuantity(">");
        setsOriginalNumber("Start");
        setsSet("Start");
        setsCat("Start");
        setsUnit("Start");
        setsBrand("Start");
        setsOrigin("Start");
        setsSuplier("Start");
        setsSize("Start");
        setsColor("Start");
        setsFamily("Start");
        setsGroup("Start");
    }
    function bBranchHandler() {
        setbBranch(!bBranch);
    }

    return (
        <Modal
            show={props.showFilter}
            onHide={() => props.setShowFilter(false)}
            dialogClassName="modal-90w"
            aria-labelledby="example-custom-modal-styling-title"
            fullscreen>
            <Modal.Header>
                <Modal.Title id="example-custom-modal-styling-title">
                    <div className="flex flex-row items-center w-full justify-evenly ">
                        <img src={FilterIcon} className="h-[1rem]" />
                        <div className="ml-1">Inventory Filters</div>
                    </div>
                </Modal.Title>
                <Button id="done-btn" className="mx-2" onClick={setFilters}>
                    Search
                </Button>
                <img
                    src={backimg}
                    className="h-[2rem]"
                    onClick={() => {
                        props.setShowFilter(false);
                    }}
                />
            </Modal.Header>
            <Modal.Body>
                <div className=" bg-neutral-300 rounded-2xl w-[100%] h-[85vh] overflow-y-scroll flex flex-col max-w-xl mx-auto">
                    <div className=" border-b-2 p-2 flex flex-row justify-between max-h-[3.7rem]">
                        <Button
                            onClick={(e) => {
                                bBranchHandler();
                            }}
                            variant={bBranch ? "outline-primary" : "primary"}
                            className="mx-2 select-none">
                            Branch
                        </Button>
                        {bBranch ? (
                            <>
                                <div className="flex flex-row w-[100%] justify-center  align-middle">
                                    <div className="w-[88%] max-w-[50rem] flex flex-row">
                                        <Form.Select
                                            aria-label="Default select example"
                                            onChange={(e) => {
                                                setsBranch(e.target.value);
                                            }}
                                            defaultValue={sBranch}>
                                            {props.vBranches.map((br) => {
                                                return (
                                                    <option value={br["key"]}>
                                                        {br["key"]}
                                                        {br["split"]}
                                                        {br["val"]}
                                                    </option>
                                                );
                                            })}
                                        </Form.Select>
                                    </div>
                                </div>
                            </>
                        ) : null}

                        <Button
                            onClick={() => {
                                clearFilters();
                            }}
                            variant="light"
                            className="mx-2 select-none ">
                            Clear
                        </Button>
                    </div>
                    <div className="flex flex-col w-[100%]">
                        <>
                            <div className="flex flex-row w-[100%] justify-center p-2 align-middle">
                                <div className="w-[95%] max-w-[50rem] flex flex-row items-center">
                                    <Select
                                        className="basic-single w-[50%] mx-1"
                                        classNamePrefix="select"
                                        isSearchable={false}
                                        isClearable={false}
                                        name="color"
                                        value={{ value: sAny, label: sAny }}
                                        defaultValue={{ sAny: sAny, sAny: sAny }}
                                        options={filtersOptions}
                                        onChange={(e) => {
                                            setsAny(e.value);
                                        }}
                                    />
                                    <input
                                        type={"text"}
                                        className="block rounded-md w-[50%] h-[2.3rem] border-gray-400 mx-1 px-2 border-[1px] focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                        placeholder={"Any"}
                                        value={vAny}
                                        onChange={(e) => {
                                            setvAny(e.target.value);
                                        }}
                                    />
                                    <img src={resetimg} className="ml-1 h-[1rem]"/>
                                </div>
                            </div>
                        </>
                        <>
                            <div className="flex flex-row w-[100%] justify-center p-2 align-middle">
                                <div className="w-[90%] max-w-[50rem] flex flex-row">
                                    <Select
                                        className="basic-single w-[50%] mx-1"
                                        classNamePrefix="select"
                                        isSearchable={false}
                                        isClearable={false}
                                        name="color"
                                        value={{ value: sItemNumber, label: sItemNumber }}
                                        defaultValue={{ value: sItemNumber, label: sItemNumber }}
                                        options={filtersOptions.slice(0, 3)}
                                        onChange={(e) => {
                                            setsItemNumber(e.value);
                                        }}
                                    />
                                    <input
                                        type={"text"}
                                        className="block rounded-md w-[50%] h-[2.3rem] border-gray-400 mx-1 px-2 border-[1px] focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                        placeholder={"Item Number"}
                                        value={vItemNumber}
                                        onChange={(e) => {
                                            setvItemNumber(e.target.value);
                                        }}
                                    />
                                </div>
                            </div>
                        </>
                        <>
                            <div className="flex flex-row w-[100%] justify-center p-2 align-middle">
                                <div className="w-[90%] max-w-[50rem] flex flex-row">
                                    <Select
                                        className="basic-single w-[50%] mx-1"
                                        classNamePrefix="select"
                                        isSearchable={false}
                                        isClearable={false}
                                        name="color"
                                        value={{ value: sName, label: sName }}
                                        defaultValue={{ sName: sName, sName: sName }}
                                        options={filtersOptions.slice(0, 3)}
                                        onChange={(e) => {
                                            setsName(e.value);
                                        }}
                                    />
                                    <input
                                        type={"text"}
                                        className="block rounded-md w-[50%] h-[2.3rem] border-gray-400 mx-1 px-2 border-[1px] focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                        placeholder={"Item Name"}
                                        value={vName}
                                        onChange={(e) => {
                                            setvName(e.target.value);
                                        }}
                                    />
                                </div>
                            </div>
                        </>
                        <>
                            <div className="flex flex-row w-[100%] justify-center p-2 align-middle">
                                <div className="w-[90%] max-w-[50rem] flex flex-row">
                                    <Select
                                        className="basic-single w-[50%] mx-1"
                                        classNamePrefix="select"
                                        isSearchable={false}
                                        isClearable={false}
                                        name="color"
                                        value={{ value: sQuantity, label: sQuantity }}
                                        defaultValue={{ value: sQuantity, label: sQuantity }}
                                        options={filtersOptions}
                                        onChange={(e) => {
                                            setsQuantity(e.value);
                                        }}
                                    />
                                    <input
                                        type={"text"}
                                        className="block rounded-md w-[50%] h-[2.3rem] border-gray-400 mx-1 px-2 border-[1px] focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                        placeholder={"Quantity"}
                                        value={vQuantity}
                                        onChange={(e) => {
                                            setvQuantity(e.target.value);
                                        }}
                                    />
                                </div>
                            </div>
                        </>
                        <>
                            <div className="flex flex-row w-[100%] justify-center p-2 align-middle">
                                <div className="w-[90%] max-w-[50rem] flex flex-row">
                                    <Select
                                        className="basic-single w-[50%] mx-1"
                                        classNamePrefix="select"
                                        isSearchable={false}
                                        isClearable={false}
                                        name="color"
                                        value={{ value: sOriginalNumber, label: sOriginalNumber }}
                                        defaultValue={{
                                            value: sOriginalNumber,
                                            label: sOriginalNumber,
                                        }}
                                        options={filtersOptions.slice(0, 3)}
                                        onChange={(e) => {
                                            setsOriginalNumber(e.value);
                                        }}
                                    />
                                    <input
                                        type={"text"}
                                        className="block rounded-md w-[50%] h-[2.3rem] border-gray-400 mx-1 px-2 border-[1px] focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                        placeholder={"Original Number"}
                                        value={vOriginalNumber}
                                        onChange={(e) => {
                                            setvOriginalNumber(e.target.value);
                                        }}
                                    />
                                </div>
                            </div>
                        </>
                        <>
                            <div className="flex flex-row w-[100%] justify-center p-2 align-middle">
                                <div className="w-[90%] max-w-[50rem] flex flex-row">
                                    <Select
                                        className="basic-single w-[50%] mx-1"
                                        classNamePrefix="select"
                                        isSearchable={false}
                                        isClearable={false}
                                        name="color"
                                        value={{ value: sSet, label: sSet }}
                                        defaultValue={{ value: sSet, label: sSet }}
                                        options={filtersOptions.slice(0, 3)}
                                        onChange={(e) => {
                                            setsSet(e.value);
                                        }}
                                    />
                                    <input
                                        type={"text"}
                                        className="block rounded-md w-[50%] h-[2.3rem] border-gray-400 mx-1 px-2 border-[1px] focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                        placeholder={"Set"}
                                        value={vSet}
                                        onChange={(e) => {
                                            setvSet(e.target.value);
                                        }}
                                    />
                                </div>
                            </div>
                        </>
                        <>
                            <div className="flex flex-row w-[100%] justify-center p-2 align-middle">
                                <div className="w-[90%] max-w-[50rem] flex flex-row">
                                    <Select
                                        className="basic-single w-[50%] mx-1"
                                        classNamePrefix="select"
                                        isSearchable={false}
                                        isClearable={false}
                                        name="color"
                                        value={{ value: sCat, label: sCat }}
                                        defaultValue={{ value: sCat, label: sCat }}
                                        options={filtersOptions.slice(0, 3)}
                                        onChange={(e) => {
                                            setsCat(e.value);
                                        }}
                                    />
                                    <input
                                        type={"text"}
                                        className="block rounded-md w-[50%] h-[2.3rem] border-gray-400 mx-1 px-2 border-[1px] focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                        placeholder={"Category"}
                                        value={vCat}
                                        onChange={(e) => {
                                            setvCat(e.target.value);
                                        }}
                                    />
                                </div>
                            </div>
                        </>
                        <>
                            <div className="flex flex-row w-[100%] justify-center p-2 align-middle">
                                <div className="w-[90%] max-w-[50rem] flex flex-row">
                                    <Select
                                        className="basic-single w-[50%] mx-1"
                                        classNamePrefix="select"
                                        isSearchable={false}
                                        isClearable={false}
                                        name="color"
                                        value={{ value: sUnit, label: sUnit }}
                                        defaultValue={{ sUnit: sSet, sUnit: sSet }}
                                        options={filtersOptions.slice(0, 3)}
                                        onChange={(e) => {
                                            setsUnit(e.value);
                                        }}
                                    />
                                    <input
                                        type={"text"}
                                        className="block rounded-md w-[50%] h-[2.3rem] border-gray-400 mx-1 px-2 border-[1px] focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                        placeholder={"Unit"}
                                        value={vUnit}
                                        onChange={(e) => {
                                            setvUnit(e.target.value);
                                        }}
                                    />
                                </div>
                            </div>
                        </>
                        <>
                            <div className="flex flex-row w-[100%] justify-center p-2 align-middle">
                                <div className="w-[90%] max-w-[50rem] flex flex-row">
                                    <Select
                                        className="basic-single w-[50%] mx-1"
                                        classNamePrefix="select"
                                        isSearchable={false}
                                        isClearable={false}
                                        name="color"
                                        value={{ value: sBrand, label: sBrand }}
                                        defaultValue={{ value: sBrand, label: sBrand }}
                                        options={filtersOptions.slice(0, 3)}
                                        onChange={(e) => {
                                            setsBrand(e.value);
                                        }}
                                    />
                                    <input
                                        type={"text"}
                                        className="block rounded-md w-[50%] h-[2.3rem] border-gray-400 mx-1 px-2 border-[1px] focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                        placeholder={"Brand"}
                                        value={vBrand}
                                        onChange={(e) => {
                                            setvBrand(e.target.value);
                                        }}
                                    />
                                </div>
                            </div>
                        </>
                        <>
                            <div className="flex flex-row w-[100%] justify-center p-2 align-middle">
                                <div className="w-[90%] max-w-[50rem] flex flex-row">
                                    <Select
                                        className="basic-single w-[50%] mx-1"
                                        classNamePrefix="select"
                                        isSearchable={false}
                                        isClearable={false}
                                        name="color"
                                        value={{ value: sOrigin, label: sOrigin }}
                                        defaultValue={{ value: sOrigin, label: sOrigin }}
                                        options={filtersOptions.slice(0, 3)}
                                        onChange={(e) => {
                                            setsOrigin(e.value);
                                        }}
                                    />
                                    <input
                                        type={"text"}
                                        className="block rounded-md w-[50%] h-[2.3rem] border-gray-400 mx-1 px-2 border-[1px] focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                        placeholder={"Origin"}
                                        value={vOrigin}
                                        onChange={(e) => {
                                            setvOrigin(e.target.value);
                                        }}
                                    />
                                </div>
                            </div>
                        </>
                        <>
                            <div className="flex flex-row w-[100%] justify-center p-2 align-middle">
                                <div className="w-[90%] max-w-[50rem] flex flex-row">
                                    <Select
                                        className="basic-single w-[50%] mx-1"
                                        classNamePrefix="select"
                                        isSearchable={false}
                                        isClearable={false}
                                        name="color"
                                        value={{ value: sSuplier, label: sSuplier }}
                                        defaultValue={{ value: sSuplier, label: sSuplier }}
                                        options={filtersOptions.slice(0, 3)}
                                        onChange={(e) => {
                                            setsSuplier(e.value);
                                        }}
                                    />
                                    <input
                                        type={"text"}
                                        className="block rounded-md w-[50%] h-[2.3rem] border-gray-400 mx-1 px-2 border-[1px] focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                        placeholder={"Suplier"}
                                        value={vSuplier}
                                        onChange={(e) => {
                                            setvSuplier(e.target.value);
                                        }}
                                    />
                                </div>
                            </div>
                        </>
                        <>
                            <div className="flex flex-row w-[100%] justify-center p-2 align-middle">
                                <div className="w-[90%] max-w-[50rem] flex flex-row">
                                    <Select
                                        className="basic-single w-[50%] mx-1"
                                        classNamePrefix="select"
                                        isSearchable={false}
                                        isClearable={false}
                                        name="color"
                                        value={{ value: sSize, label: sSize }}
                                        defaultValue={{ value: sSize, label: sSize }}
                                        options={filtersOptions.slice(0, 3)}
                                        onChange={(e) => {
                                            setsSize(e.value);
                                        }}
                                    />
                                    <input
                                        type={"text"}
                                        className="block rounded-md w-[50%] h-[2.3rem] border-gray-400 mx-1 px-2 border-[1px] focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                        placeholder={"Size"}
                                        value={vSize}
                                        onChange={(e) => {
                                            setvSize(e.target.value);
                                        }}
                                    />
                                </div>
                            </div>
                        </>
                        <>
                            <div className="flex flex-row w-[100%] justify-center p-2 align-middle">
                                <div className="w-[90%] max-w-[50rem] flex flex-row">
                                    <Select
                                        className="basic-single w-[50%] mx-1"
                                        classNamePrefix="select"
                                        isSearchable={false}
                                        isClearable={false}
                                        name="color"
                                        value={{ value: sColor, label: sColor }}
                                        defaultValue={{ value: sColor, label: sColor }}
                                        options={filtersOptions.slice(0, 3)}
                                        onChange={(e) => {
                                            setsColor(e.value);
                                        }}
                                    />
                                    <input
                                        type={"text"}
                                        className="block rounded-md w-[50%] h-[2.3rem] border-gray-400 mx-1 px-2 border-[1px] focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                        placeholder={"Color"}
                                        value={vColor}
                                        onChange={(e) => {
                                            setvColor(e.target.value);
                                        }}
                                    />
                                </div>
                            </div>
                        </>
                        <>
                            <div className="flex flex-row w-[100%] justify-center p-2 align-middle">
                                <div className="w-[90%] max-w-[50rem] flex flex-row">
                                    <Select
                                        className="basic-single w-[50%] mx-1"
                                        classNamePrefix="select"
                                        isSearchable={false}
                                        isClearable={false}
                                        name="color"
                                        value={{ value: sFamily, label: sFamily }}
                                        defaultValue={{ value: sFamily, label: sFamily }}
                                        options={filtersOptions.slice(0, 3)}
                                        onChange={(e) => {
                                            setsFamily(e.value);
                                        }}
                                    />
                                    <input
                                        type={"text"}
                                        className="block rounded-md w-[50%] h-[2.3rem] border-gray-400 mx-1 px-2 border-[1px] focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                        placeholder={"Family"}
                                        value={vFamily}
                                        onChange={(e) => {
                                            setvFamily(e.target.value);
                                        }}
                                    />
                                </div>
                            </div>
                        </>
                        <>
                            <div className="flex flex-row w-[100%] justify-center p-2 align-middle">
                                <div className="w-[90%] max-w-[50rem] flex flex-row">
                                    <Select
                                        className="basic-single w-[50%] mx-1"
                                        classNamePrefix="select"
                                        isSearchable={false}
                                        isClearable={false}
                                        name="color"
                                        value={{ value: sGroup, label: sGroup }}
                                        defaultValue={{ value: sGroup, label: sGroup }}
                                        options={filtersOptions.slice(0, 3)}
                                        onChange={(e) => {
                                            setsGroup(e.value);
                                        }}
                                    />
                                    <input
                                        type={"text"}
                                        className="block rounded-md w-[50%] h-[2.3rem] border-gray-400 mx-1 px-2 border-[1px] focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                        placeholder={"Group"}
                                        value={vGroup}
                                        onChange={(e) => {
                                            setvGroup(e.target.value);
                                        }}
                                    />
                                </div>
                            </div>
                        </>
                    </div>
                </div>
            </Modal.Body>
        </Modal>
    );
    function setFilters() {
        let ffilters = [
            {
                name: "itemno",
                value: vItemNumber,
                type: sItemNumber,
            },
            {
                name: "itemname",
                value: vName,
                type: sName,
            },
            {
                name: "qty",
                value: vQuantity,
                type: sQuantity,
            },
            {
                name: "mainno",
                value: vOriginalNumber,
                type: sOriginalNumber,
            },
            {
                name: "setg",
                value: vSet,
                type: sSet,
            },
            {
                name: "Category",
                value: vCat,
                type: sCat,
            },
            {
                name: "unit",
                value: vUnit,
                type: sUnit,
            },
            {
                name: "brand",
                value: vBrand,
                type: sBrand,
            },
            {
                name: "origin",
                value: vOrigin,
                type: sOrigin,
            },
            {
                name: "supplier",
                value: vSuplier,
                type: sSuplier,
            },
            {
                name: "sizeg",
                value: vSize,
                type: sSize,
            },
            {
                name: "color",
                value: vColor,
                type: sColor,
            },
            {
                name: "family",
                value: vFamily,
                type: sFamily,
            },
            {
                name: "groupg",
                value: vGroup,
                type: sGroup,
            },
        ];
        props.getData(
            {
                branch: bBranch,
                selectedBranch: sBranch,
                vAny: vAny,
                vItemNumber: vItemNumber,
                vName: vName,
                vQuantity: vQuantity,
                vOriginalNumber: vOriginalNumber,
                vSet: vSet,
                vCat: vCat,
                vUnit: vUnit,
                vBrand: vBrand,
                vOrigin: vOrigin,
                vSuplier: vSuplier,
                vSize: vSize,
                vColor: vColor,
                vFamily: vFamily,
                vGroup: vGroup,
                sAny: sAny,
                sItemNumber: sItemNumber,
                sName: sName,
                sQuantity: sQuantity,
                sOriginalNumber: sOriginalNumber,
                sSet: sSet,
                sCat: sCat,
                sUnit: sUnit,
                sBrand: sBrand,
                sOrigin: sOrigin,
                sSuplier: sSuplier,
                sSize: sSize,
                sColor: sColor,
                sFamily: sFamily,
                sGroup: sGroup,
            },
            ffilters
        );
    }
}
