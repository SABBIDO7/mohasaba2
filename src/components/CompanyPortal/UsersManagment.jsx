// UserPermissions.js
import React, { useEffect, useState, useRef } from "react";
import {
  Container,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Checkbox,
  FormControlLabel,
  FormGroup,
  Paper,
} from "@mui/material";

import {
  getUsersAccessManagement,
  UpdateUsersPermissions,
} from "../BackendEndPoints/Endpoint1";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Modals from "../Modals/Modals";

const UsersManagement = () => {
  const [users, setUsers] = useState([]);
  const [permissionsName, setPermissionsName] = useState([]);
  const [changedUsernames, setChangedUsernames] = useState([]);
  const [branches, setBranches] = useState([]);
  const [salePrices, setSalePrices] = useState([]);
  const modalsChildRef = useRef();

  useEffect(() => {
    getUsersAccessManagement().then((response) => {
      if (response && response.status == "success") {
        setPermissionsName(response.permissionsName);
        setBranches(response.branches);
        setSalePrices(response.salePrices);
        setUsers(response.users);
        console.log(response.users);
      } else {
      }
    });
  }, []);

  const handleChange = (username, permissionName, access) => {
    setUsers((prevUsers) =>
      prevUsers.map((user) =>
        user.name === username
          ? {
              ...user,
              permissions: user.permissions.map((perm) =>
                perm.name === permissionName ? { ...perm, access } : perm
              ),
            }
          : user
      )
    );
    setChangedUsernames((prevChanged) =>
      prevChanged.includes(username) ? prevChanged : [...prevChanged, username]
    );
  };

  return (
    <>
      <Paper
        sx={{
          width: "calc(100% - 32px)",
          overflow: "hidden",

          margin: "auto",
          "@media (max-width: 1000px)": {
            width: "calc(100% - 24px)",
          },
        }}
      >
        <TableContainer
          sx={{
            "@media (max-width: 1000px)": { maxHeight: "90vh" }, // Adjust height for screens smaller than 1000px
            maxHeight: "90vh", // Default height
          }}
          className="tableContainerDashboard"
        >
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                <TableCell
                  key={"UserName"}
                  sx={{
                    textAlign: "center",
                    border: "2px solid rgba(224, 224, 224, 1)", // Add border style
                  }}
                >
                  User Name
                </TableCell>
                {permissionsName.map((permission) => (
                  <TableCell
                    key={permission}
                    sx={{
                      textAlign: "center",
                      border: "2px solid rgba(224, 224, 224, 1)", // Add border style
                    }}
                  >
                    {permission}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {users.map((user) => {
                return (
                  <TableRow key={user.name} sx={{ textAlign: "center" }}>
                    <TableCell
                      key={user.name}
                      sx={{
                        textAlign: "center",
                        border: "2px solid rgba(224, 224, 224, 1)", // Add border style
                      }}
                    >
                      {user.name}
                    </TableCell>
                    {user.permissions.map((permission, index) => {
                      const userPermission = user.permissions.find((perm) => {
                        console.log(
                          "perm.name",
                          perm.name,
                          "permission",
                          permission.name
                        );
                        return perm.name === permission.name;
                      });

                      return (
                        <TableCell
                          key={index}
                          sx={{
                            textAlign: "center",
                            border: "2px solid rgba(224, 224, 224, 1)", // Add border style
                          }}
                        >
                          {permission.name !== "Sbranch" &&
                          permission.name !== "Abranch" &&
                          permission.name !== "SalePrice" ? (
                            <FormControl sx={{ minWidth: 80 }}>
                              <InputLabel
                                key={permission.name}
                                id="demo-simple-select-autowidth-label"
                              >
                                Access
                              </InputLabel>
                              <Select
                                labelId="demo-simple-select-autowidth-label"
                                id="demo-simple-select-autowidth"
                                value={userPermission?.access || ""}
                                sx={{
                                  "& input": {
                                    padding: "4px",
                                    fontSize: "6px",
                                  },
                                }} // Custom styles for input
                                onChange={(e) => {
                                  handleChange(
                                    user.name,
                                    permission.name,
                                    e.target.value
                                  );
                                }}
                                autoWidth
                                label="Access"
                              >
                                <MenuItem key={`${index}-Y`} value={"Y"}>
                                  Yes
                                </MenuItem>
                                <MenuItem key={`${index}-N`} value={"N"}>
                                  No
                                </MenuItem>
                              </Select>
                            </FormControl>
                          ) : (
                            <FormControl sx={{ minWidth: 80 }}>
                              <InputLabel id="demo-simple-select-autowidth-label">
                                Access
                              </InputLabel>
                              <Select
                                labelId="demo-simple-select-autowidth-label"
                                id="demo-simple-select-autowidth"
                                value={userPermission?.access || ""}
                                sx={{
                                  "& input": {
                                    padding: "4px",
                                    fontSize: "6px",
                                  },
                                }} // Custom styles for input
                                onChange={(e) => {
                                  handleChange(
                                    user.name,
                                    permission.name,
                                    e.target.value
                                  );
                                }}
                                autoWidth
                                label="Access"
                              >
                                {permission.name == "Abranch" ||
                                permission.name == "Sbranch"
                                  ? branches.map((branch, index) => (
                                      <MenuItem key={index} value={branch}>
                                        {branch}
                                      </MenuItem>
                                    ))
                                  : salePrices.map((salePrice, index) => (
                                      <MenuItem key={index} value={salePrice}>
                                        {salePrice}
                                      </MenuItem>
                                    ))}
                              </Select>
                            </FormControl>
                          )}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
      <div className="flex justify-center items-center w-[30%] h-[8vh] ">
        <button
          className="bg-secondd text-BgTextColor w-full h-[70%] rounded-md hover:bg-secondd focus:outline-none focus:bg-secondd group hover:bg-black hover:shadow-md"
          onClick={() => {
            UpdateUsersPermissions(users, changedUsernames).then((response) => {
              if (response && response.status == "Error") {
                modalsChildRef.current.setInfoModal({
                  show: true,
                  message: <div>{JSON.stringify(response.message)}</div>,
                  flag: 1,
                  title: "Error",
                });
              }
            });
          }}
        >
          Save
        </button>
      </div>
      <Modals ref={modalsChildRef} />
    </>
  );
};

export default UsersManagement;
