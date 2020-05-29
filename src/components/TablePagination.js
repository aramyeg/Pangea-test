import React, {useState} from 'react';
import {useSelector} from "react-redux";
import TablePaginationActions from './TablePaginationActions'
import {saveUser, removeUser, getUser} from "../localStorage";
import { makeStyles } from '@material-ui/core/styles';
import {Table,
  TableBody,
  TableCell,
  TableContainer,
  TableFooter,
  TablePagination,
  TableRow,
  Avatar,
  Button,
  Paper
} from '@material-ui/core';


const useStyles = makeStyles({
  tableContainer: {
    marginTop: 50,
    maxWidth: 800,
  },
  table: {
    minWidth: 500,
  },
  tableCell: {
    padding: 5,
  }
});

function ToggleButton(user){
  const [buttonAction, setButtonAction] = useState( user.buttonAction);

  function handleSave(user, buttonAction) {
    switch (buttonAction) {
      case 'Save':
        saveUser(user.user);
        setButtonAction('Delete');
        break;
      case 'Delete':
        removeUser(user.user.id);
        setButtonAction('Save');
        break;
      default:
        return
    }
  }

  return(
    <Button onClick={()=>handleSave(user, buttonAction)} variant="contained">
      {buttonAction}
    </Button>
  )
}

export default function CustomPaginationActionsTable() {
  const classes = useStyles();
  const query = useSelector(state => state.users.userQuery);
  const initPoint = query.page? query.page : 0;
  const [page, setPage] = useState(initPoint);
  const users = useSelector(state => state.users.usersList[page]);
  const totalCount = useSelector(state => state.users.total_count);
  const rowsPerPage = 10;

  function handleChangePage(event, newPage){
    setPage(newPage);
  };


  const tableData = users ? users.map((user) => {

    const buttonAction = localStorage.getItem(user.id)? 'Delete' : 'Save';
    return(
      <TableRow key={user.id}>
        <TableCell style={{ width: 50 }} className={classes.tableCell} component="th" scope="row">
          <Avatar variant="square" alt="Remy Sharp" src={user.avatar_url} />
        </TableCell>
        <TableCell align="center">
          {user.login}
        </TableCell>
        <TableCell style={{ width: 160 }} align="right">
          {user.id}
        </TableCell>
        <TableCell className={classes.tableCell}  align="right">
          <ToggleButton user={user} buttonAction={buttonAction}/>
        </TableCell>
      </TableRow>
    )
  }) : null;

  return (
    <TableContainer className={classes.tableContainer} component={Paper}>
      <Table className={classes.table} aria-label="custom pagination table">
        <TableBody>
          {tableData}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TablePagination
              rowsPerPageOptions={[10]}
              colSpan={4}
              count={totalCount}
              rowsPerPage={rowsPerPage}
              page={page}
              SelectProps={{
                inputProps: { 'aria-label': 'rows per page' },
                native: true,
              }}
              onChangePage={handleChangePage}
              ActionsComponent={TablePaginationActions}
            />
          </TableRow>
        </TableFooter>
      </Table>
    </TableContainer>
  );
}
