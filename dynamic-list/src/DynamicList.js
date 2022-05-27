/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */

import { useEffect, useState } from "react";
import {
  Button,
  Card,
  Grid,
  Input,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Stack,
  Snackbar,
  Slide,
} from "@mui/material";

import DeleteIcon from '@mui/icons-material/Delete';

export default function DynamicList() {
  const [content, setContent] = useState([]);

  const [rows, setRows] = useState([
    {
      id: 1,
      item: "",
    }
  ]);

  const generateRow = () => {
    return {
      id: rows.length + 1,
      item: "",
    }
  }

  const handleAddRow = () => {
    if (rows[rows.length - 1].item !== "") {
      setRows((prevRows) => [...prevRows, generateRow()]);
    }
  }

  const handleDeleteRow = (event, id) => {
    setRows(rows => {
      rows[id - 1].item = "";
      for (let i = id - 1; i < rows.length; i++) {
        rows[i].id--;
      }
    });

    setRows((prevRows) => {
      return [
        ...rows.slice(0, id - 1),
        ...rows.slice(id),
      ];
    });
  }

  const handleChange = (e, id) => {
    let value = e.target.value;

    if (id === rows.length) {
      if (value !== "") {
        setRows((prevRows) => [...prevRows, generateRow()]);
      }
    } else if (id + 1 === rows.length) {
      if (value === "") {
        handleDeleteRow(e, id+1);
      }
    }
    setRows((prevRows) => {
      return prevRows.map((row, index) =>
        index === id - 1 ? { ...row, size: value} : row,
      );
    });
  }

  const handleSave = () => {
    let arr = [];
    if (rows[rows.length - 1].item === "") {
      arr = rows.slice(0, -1);
    } else {
      arr = rows;
    }

    let items = [];
    for (let i = 0; i < arr.length; i++) {
      items.push(arr[i].item);
    }

    setContent(items);
  }

  const generateTable = () => {
    return (
      <Table>
        <TableBody>
          {rows.map((row) => (
            <TableRow
              key={row.id}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                <Input placeholder={"Add Item"} onChange={(e) => handleChange(e, row.id)} value={row.size}/>
              </TableCell>
              <TableCell component="th" scope="row">
                {
                  row.id === rows.length ? (<></>) : (
                    <IconButton onClick={(e) => handleDeleteRow(e, row.id)}>
                      <DeleteIcon />
                    </IconButton>
                  )
                }
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    );
  }

  const [tableData, setTableData] = useState(generateTable());

  useEffect(() => {
    setTableData(generateTable());
  }, [rows])

  useEffect(() => {
    if (window.sessionStorage.getItem("quickstart_sizes")) {
      let sizes_arr = window.sessionStorage.getItem("quickstart_sizes").split(',');
      sizes_arr.push("")
      let rows_arr = [];
      for (let i = 0; i < sizes_arr.length; i++) {
        rows_arr.push({
          id: i+1,
          size: sizes_arr[i]
        })
      }
      
      setRows(rows_arr);
      setTableData(generateTable())
    }
  }, [])

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

  };

  return (
    <Grid container>
        <Grid item lg={12} justifyContent="center" display="flex">
            <Card>
                <TableContainer>
                    {tableData}
                    <Stack direction={"row"}>
                        {/* <Button onClick={handleAddRow}>
                            Add Size
                        </Button> */}
                        <Button onClick={handleSave}>
                            Save
                        </Button>
                    </Stack>
                </TableContainer>
            </Card>
        </Grid>
    </Grid>
  );
}