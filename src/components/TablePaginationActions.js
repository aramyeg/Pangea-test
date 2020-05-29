import {makeStyles} from "@material-ui/core/styles";
import {IconButton, TextField} from "@material-ui/core";
import FirstPageIcon from '@material-ui/icons/FirstPage';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import LastPageIcon from '@material-ui/icons/LastPage';

import React from "react";
import {useDispatch, useSelector} from "react-redux";
import {userSearchActions} from "../actions";

const useStyles = makeStyles((theme) => ({
  root: {
    flexShrink: 0,
    marginLeft: theme.spacing(20),
  },
  numberPicker: {
    width: 50
  }
}));

export default function TablePaginationActions(props) {
  const { count, page, rowsPerPage, onChangePage } = props;
  const classes = useStyles();
  const [userQuery, users] = useSelector(state => [state.users.userQuery, state.users.usersList]);
  const dispatch = useDispatch();
  const lastPage = Math.ceil(count / rowsPerPage) - 1;

  const handleFirstPageButtonClick = (event) => {
    onChangePage(event, 0);
  };

  const handleBackButtonClick = (event) => {
    if(!users[page-1]){
      dispatch(
        userSearchActions.loadMoreData({name: userQuery.name, page: page - 1}),
      )
    }
    onChangePage(event, page - 1);
  };

  const handleNextButtonClick = (event) => {
    if(!users[page+1]){
      dispatch(
        userSearchActions.loadMoreData({name: userQuery.name, page: page + 1}),
      )
    }
    onChangePage(event, page + 1);
  };

  const handleLastPageButtonClick = (event) => {
    if(!users[lastPage]){
      dispatch(
        userSearchActions.loadMoreData({name: userQuery.name, page: lastPage}),
      )
    }
    onChangePage(event, Math.max(0, lastPage));
  };

  const handleNumberEnter = (event) =>{
    if(event.keyCode === 13){
      if(!isNaN(event.target.value)){
        let pageNumber = parseInt(event.target.value)
        if(pageNumber <= lastPage){
          dispatch(
            userSearchActions.loadMoreData({name: userQuery.name, page: pageNumber}),
          );
          onChangePage(event, Math.max(0, pageNumber));
        }
      }
    }
  }

  return (
    <div className={classes.root}>
      <IconButton
        onClick={handleFirstPageButtonClick}
        disabled={page === 0}
        aria-label="first page"
      >
        <FirstPageIcon />
      </IconButton>
      <IconButton onClick={handleBackButtonClick} disabled={page === 0} aria-label="previous page">
        <KeyboardArrowLeft />
      </IconButton>
      <TextField className={classes.numberPicker}
                 type='number'
                 onKeyUp={handleNumberEnter}
      />
      <IconButton
        onClick={handleNextButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="next page"
      >
        <KeyboardArrowRight />
      </IconButton>
      <IconButton
        onClick={handleLastPageButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="last page"
      >
        <LastPageIcon />
      </IconButton>
    </div>
  );
}
