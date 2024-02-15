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
        { value: "=", label: "=" },
        { value: ">", label: ">" },
        { value: "<", label: "<" },
        { value: "<", label: "<=" },
        { value: ">=", label: ">=" },
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

    const [vLimit, setvLimit] = useState(100);
    const filterItems = [
        {
            pl: "Any",
            vVar: vAny,
            sVar: sAny,
            vFun: setvAny,
            sFun: setsAny,
            FOStart: 0,
            FOEnd: 6,
            dv: "Contains",
        },
        {
            pl: "Item Number",
            vVar: vItemNumber,
            sVar: sItemNumber,
            vFun: setvItemNumber,
            sFun: setsItemNumber,
            FOStart: 0,
            FOEnd: 4,
            dv: "Start",
        },
        {
            pl: "Item Name",
            vVar: vName,
            sVar: sName,
            vFun: setvName,
            sFun: setsName,
            FOStart: 0,
            FOEnd: 3,
            dv: "Contains",
        },
        {
            pl: "Quantity",
            vVar: vQuantity,
            sVar: sQuantity,
            vFun: setvQuantity,
            sFun: setsQuantity,
            FOStart: 2,
            FOEnd: 8,
            dv: ">",
        },
        {
            pl: "Original Number",
            vVar: vOriginalNumber,
            sVar: sOriginalNumber,
            vFun: setvOriginalNumber,
            sFun: setsOriginalNumber,
            FOStart: 0,
            FOEnd: 4,
            dv: "Start",
        },
        {
            pl: "Set",
            vVar: vSet,
            sVar: sSet,
            vFun: setvSet,
            sFun: setsSet,
            FOStart: 0,
            FOEnd: 4,
            dv: "=",
        },
        {
            pl: "Category",
            vVar: vCat,
            sVar: sCat,
            vFun: setvCat,
            sFun: setsCat,
            FOStart: 0,
            FOEnd: 4,
            dv: "=",
        },
        {
            pl: "Unit",
            vVar: vUnit,
            sVar: sUnit,
            vFun: setvUnit,
            sFun: setsUnit,
            FOStart: 0,
            FOEnd: 4,
            dv: "=",
        },
        {
            pl: "Brand",
            vVar: vBrand,
            sVar: sBrand,
            vFun: setvBrand,
            sFun: setsBrand,
            FOStart: 0,
            FOEnd: 4,
            dv: "=",
        },
        {
            pl: "Origin",
            vVar: vOrigin,
            sVar: sOrigin,
            vFun: setvOrigin,
            sFun: setsOrigin,
            FOStart: 0,
            FOEnd: 4,
            dv: "=",
        },
        {
            pl: "Suplier",
            vVar: vSuplier,
            sVar: sSuplier,
            vFun: setvSuplier,
            sFun: setsSuplier,
            FOStart: 0,
            FOEnd: 4,
            dv: "=",
        },
        {
            pl: "Size",
            vVar: vSize,
            sVar: sSize,
            vFun: setvSize,
            sFun: setsSize,
            FOStart: 0,
            FOEnd: 4,
            dv: "=",
        },
        {
            pl: "Color",
            vVar: vColor,
            sVar: sColor,
            vFun: setvColor,
            sFun: setsColor,
            FOStart: 0,
            FOEnd: 4,
            dv: "=",
        },
        {
            pl: "Family",
            vVar: vFamily,
            sVar: sFamily,
            vFun: setvFamily,
            sFun: setsFamily,
            FOStart: 0,
            FOEnd: 4,
            dv: "=",
        },
        {
            pl: "Group",
            vVar: vGroup,
            sVar: sGroup,
            vFun: setvGroup,
            sFun: setsGroup,
            FOStart: 0,
            FOEnd: 4,
            dv: "=",
        },
    ];

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
        setsSet("=");
        setsCat("=");
        setsUnit("=");
        setsBrand("=");
        setsOrigin("=");
        setsSuplier("=");
        setsSize("=");
        setsColor("=");
        setsFamily("=");
        setsGroup("=");
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
                        <img src={FilterIcon} className="h-[1rem]" alt="." />
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
                                            {props.vBranches.map((br) => { //honb
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
                            <div className="flex flex-row w-[100%] justify-center px-2 py-1 align-middle">
                                <div className="w-[95%] max-w-[50rem] flex flex-row items-center align-middle justify-center">
                                    <div className=" font-semibold text-lg">Limit:</div>
                                    <Select
                                        className="basic-single w-[50%] mx-1"
                                        classNamePrefix="select"
                                        isSearchable={false}
                                        isClearable={false}
                                        name="color"
                                        defaultValue={{ value: 100, label: 100 }}
                                        value={{ value: vLimit, label: vLimit }}
                                        options={[
                                            { value: 100, label: 100 },
                                            { value: 200, label: 200 },
                                            { value: 400, label: 400 },
                                            { value: 1000, label: 1000 },
                                            { value: 2000, label: 2000 },
                                            { value: "All", label: "All" },
                                        ]}
                                        onChange={(e) => {

                                            setvLimit(e.value);
                                        }}
                                    />
                                </div>
                            </div>
                        </>

                        {filterItems.map((fi) => {
                            return (
                                <>
                                    <div className="flex flex-row w-[100%] justify-center p-2 align-middle">
                                        <div className="w-[95%] max-w-[50rem] flex flex-row items-center">
                                            <Select
                                                className="basic-single w-[50%] mx-1"
                                                classNamePrefix="select"
                                                isSearchable={false}
                                                isClearable={false}
                                                name="color"
                                                value={{ value: fi["sVar"], label: fi["sVar"] }}
                                                defaultValue={{
                                                    value: fi["sVar"],
                                                    label: fi["sVar"],
                                                }}
                                                options={filtersOptions.slice(
                                                    fi["FOStart"],
                                                    fi["FOEnd"]
                                                )}
                                                onChange={(e) => {
                                                    fi.sFun(e.value);
                                                }}
                                            />
                                            <input
                                                type={"text"}
                                                className="block rounded-md w-[50%] h-[2.3rem] border-gray-400 mx-1 px-2 border-[1px] focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                                placeholder={fi.pl}
                                                value={fi.vVar}
                                                onChange={(e) => {
                                                    fi.vFun(e.target.value);
                                                }}
                                            />
                                            <img
                                                src={resetimg} 
                                                alt="."
                                                className="ml-2 h-[1rem]"
                                                onClick={() => {
                                                    fi.vFun("");
                                                    fi.sFun(fi.dv);
                                                }}
                                            />
                                        </div>
                                    </div>
                                </>
                            );
                        })}
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
            ffilters,vLimit
        );
    }
}
