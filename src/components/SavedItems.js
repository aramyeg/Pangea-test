import React, {useState} from "react";
import {
  Avatar,
  Button,
  TableBody,
  TableCell,
  TableRow,
  Table
} from "@material-ui/core";
import {removeUser} from "../localStorage";

export default function SavedItems(){


  const [allSerializedUsers, setSerializedUsers] = useState({ ...localStorage });
  const Ids = Object.keys(allSerializedUsers);

  function handleDelete(user) {
    removeUser(user.id)
    setSerializedUsers({...localStorage})
  }

  const savedUsers = Ids.length? Ids.map((id) => {
    const user = JSON.parse(allSerializedUsers[id]);
    return(
      <TableRow key={id}>
        <TableCell style={{ width: 50 }} component="th" scope="row">
          <Avatar variant="square" alt="Remy Sharp" src={user.avatar_url} />
        </TableCell>
        <TableCell align="right">
          {user.login}
        </TableCell>
        <TableCell style={{ width: 160 }} align="right">
          {user.id}
        </TableCell>
        <TableCell align="right">
          <Button onClick={()=>handleDelete(user)} variant="contained">
            Delete
          </Button>
        </TableCell>
      </TableRow>
    )
  }): null;

  return(
    <Table style={{marginTop: 150}}>
      <TableBody>
        {savedUsers}
      </TableBody>
    </Table>
  )
}