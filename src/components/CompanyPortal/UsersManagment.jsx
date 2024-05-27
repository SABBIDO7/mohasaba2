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
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

const UsersManagement = () => {
  const [users, setUsers] = useState([]);
  const [permissions, setPermissions] = useState([]);
  const [changedUsernames, setChangedUsernames] = useState([]);

  useEffect(() => {
    setPermissions([
      "Sales",
      "SalesReturn",
      "Order",
      "Purchase",
      "PurchaseReturn",
      "BranchTransfer",

      "SalesUnderZero",
      "ChangeBranch",
      "AccountingPage",
      "InventoryPage",
      "TranscationsPage",
      "CheckInPage",
      "DeleteInvoice",
      "Discount",
      "Price",
      "CallInvoice",
    ]);

    setUsers([
      {
        name: "Alice Smith",
        permissions: [
          { name: "Sales", access: "Y" },
          { name: "SalesReturn", access: "N" },
          { name: "Order", access: "N" },
          { name: "Purchase", access: "Y" },

          { name: "PurchaseReturn", access: "Y" },
          { name: "BranchTransfer", access: "N" },
          { name: "SalesUnderZero", access: "N" },
          { name: "ChangeBranch", access: "Y" },

          { name: "AccountingPage", access: "Y" },
          { name: "InventoryPage", access: "N" },
          { name: "TranscationsPage", access: "N" },
          { name: "CheckInPage", access: "Y" },

          { name: "DeleteInvoice", access: "Y" },
          { name: "Discount", access: "N" },
          { name: "Price", access: "N" },
          { name: "CallInvoice", access: "Y" },
        ],
      },
      {
        name: "Bob Johnson",
        permissions: [
          { name: "Sales", access: "Y" },
          { name: "SalesReturn", access: "N" },
          { name: "Order", access: "N" },
          { name: "Purchase", access: "Y" },

          { name: "PurchaseReturn", access: "Y" },
          { name: "BranchTransfer", access: "N" },
          { name: "SalesUnderZero", access: "N" },
          { name: "ChangeBranch", access: "Y" },

          { name: "AccountingPage", access: "Y" },
          { name: "InventoryPage", access: "N" },
          { name: "TranscationsPage", access: "N" },
          { name: "CheckInPage", access: "Y" },

          { name: "DeleteInvoice", access: "N" },
          { name: "Discount", access: "N" },
          { name: "Price", access: "Y" },
          { name: "CallInvoice", access: "N" },
        ],
      },
      {
        name: "Carol White",
        permissions: [
          { name: "Sales", access: "Y" },
          { name: "SalesReturn", access: "N" },
          { name: "Order", access: "N" },
          { name: "Purchase", access: "Y" },

          { name: "PurchaseReturn", access: "Y" },
          { name: "BranchTransfer", access: "N" },
          { name: "SalesUnderZero", access: "N" },
          { name: "ChangeBranch", access: "Y" },

          { name: "AccountingPage", access: "Y" },
          { name: "InventoryPage", access: "N" },
          { name: "TranscationsPage", access: "N" },
          { name: "CheckInPage", access: "Y" },

          { name: "DeleteInvoice", access: "Y" },
          { name: "Discount", access: "N" },
          { name: "Price", access: "N" },
          { name: "CallInvoice", access: "Y" },
        ],
      },
      {
        name: "James Burley",
        permissions: [
          { name: "Sales", access: "Y" },
          { name: "SalesReturn", access: "N" },
          { name: "Order", access: "N" },
          { name: "Purchase", access: "Y" },

          { name: "PurchaseReturn", access: "Y" },
          { name: "BranchTransfer", access: "N" },
          { name: "SalesUnderZero", access: "N" },
          { name: "ChangeBranch", access: "Y" },

          { name: "AccountingPage", access: "Y" },
          { name: "InventoryPage", access: "N" },
          { name: "TranscationsPage", access: "N" },
          { name: "CheckInPage", access: "Y" },

          { name: "DeleteInvoice", access: "N" },
          { name: "Discount", access: "N" },
          { name: "Price", access: "Y" },
          { name: "CallInvoice", access: "N" },
        ],
      },
      {
        name: "Caroline Black",
        permissions: [
          { name: "Sales", access: "Y" },
          { name: "SalesReturn", access: "N" },
          { name: "Order", access: "N" },
          { name: "Purchase", access: "Y" },

          { name: "PurchaseReturn", access: "Y" },
          { name: "BranchTransfer", access: "N" },
          { name: "SalesUnderZero", access: "N" },
          { name: "ChangeBranch", access: "Y" },

          { name: "AccountingPage", access: "Y" },
          { name: "InventoryPage", access: "N" },
          { name: "TranscationsPage", access: "N" },
          { name: "CheckInPage", access: "Y" },

          { name: "DeleteInvoice", access: "Y" },
          { name: "Discount", access: "N" },
          { name: "Price", access: "N" },
          { name: "CallInvoice", access: "Y" },
        ],
      },
    ]);

    // Fetch users data from the API
    // const fetchData = async () => {
    //   try {
    //     const response = await fetch("/api/users"); // Adjust the API endpoint as needed
    //     const data = await response.json();
    //     // Assuming the API response structure is [{ id, name, permission, access: { yes: boolean, no: boolean } }]
    //     const usersData = data.map((user) => ({
    //       ...user,
    //       permission: user.permission,
    //     }));
    //     setUsers(usersData);
    //   } catch (error) {
    //     console.error("Error fetching users:", error);
    //   }
    // };
    //fetchData();
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
                {permissions.map((permission) => (
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
              {users.map((user) => (
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
                  {permissions.map((permission) => {
                    const userPermission = user.permissions.find(
                      (perm) => perm.name === permission
                    );
                    return (
                      <TableCell
                        key={permission}
                        sx={{
                          textAlign: "center",
                          border: "2px solid rgba(224, 224, 224, 1)", // Add border style
                        }}
                      >
                        <FormControl sx={{ minWidth: 80 }}>
                          <InputLabel id="demo-simple-select-autowidth-label">
                            Access
                          </InputLabel>
                          <Select
                            labelId="demo-simple-select-autowidth-label"
                            id="demo-simple-select-autowidth"
                            value={userPermission?.access}
                            sx={{
                              "& input": { padding: "8px", fontSize: "14px" },
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
                        {/* <FormControlLabel
                          control={
                            <Checkbox
                              checked={userPermission?.access === "Y"}
                              onChange={() =>
                                handleCheckboxChange(user.name, permission, "Y")
                              }
                            />
                          }
                          label="Y"
                        />
                        <FormControlLabel
                          control={
                            <Checkbox
                              checked={userPermission?.access === "N"}
                              onChange={() =>
                                handleCheckboxChange(user.name, permission, "N")
                              }
                            />
                          }
                          label="N"
                        /> */}
                      </TableCell>
                    );
                  })}
                </TableRow>
              ))}
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
