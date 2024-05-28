// UserPermissions.js
import React, { useEffect, useState } from "react";
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

import { getUsersAccessManagement } from "../BackendEndPoints/Endpoint1";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

const UsersManagement = () => {
  const [users, setUsers] = useState([]);
  const [permissionsName, setPermissionsName] = useState([]);
  const [changedUsernames, setChangedUsernames] = useState([]);
  const [branches, setBranches] = useState([]);
  const [salePrices, setSalePrices] = useState([]);
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
                console.log("user", user);
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
                    {user.permissions.map((permission) => {
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
                          key={permission}
                          sx={{
                            textAlign: "center",
                            border: "2px solid rgba(224, 224, 224, 1)", // Add border style
                          }}
                        >
                          {permission.name !== "Sbranch" &&
                          permission.name !== "Abranch" ? (
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
                                    permission,
                                    e.target.value
                                  );
                                }}
                                autoWidth
                                label="Access"
                              >
                                <MenuItem value={"Y"}>Yes</MenuItem>
                                <MenuItem value={"N"}>No</MenuItem>
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
                                    permission,
                                    e.target.value
                                  );
                                }}
                                autoWidth
                                label="Access"
                              >
                                {branches.map((branch, index) => (
                                  <MenuItem key={index} value={branch}>
                                    {branch}
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
            console.log(users);
          }}
        >
          Save
        </button>
      </div>
    </>
  );
};

export default UsersManagement;
