import React, {useState} from 'react';
import { TextField, IconButton, InputAdornment } from '@material-ui/core';
import SearchIcon from "@material-ui/icons/Search";
import styled from 'styled-components';
import {userSearchActions} from '../actions';
import {useDispatch} from 'react-redux';

const ContainerForm = styled.form`
  {
    margin-top: 100px;
  }
`;

const BigTextField = styled(TextField)`
  && {
    width: 300px;
  }
`;

export const UserSearch = () => {
  const [userSearch, setUserSearch] = useState('');
  const dispatch = useDispatch();

  function handleSubmit(e){
    e.preventDefault();
    dispatch(
      userSearchActions.loadUserData({name: userSearch}),
    )
  }

  const handleChange =(e)=>{
    setUserSearch(e.target.value);
  }

  return(
    <ContainerForm onSubmit={handleSubmit}>
      <BigTextField
        onChange={ e => handleChange(e) }
        value={userSearch}
        label="Search Users"
        InputProps={{
          endAdornment: (
            <InputAdornment>
              <IconButton onClick={handleSubmit}>
                <SearchIcon/>
              </IconButton>
            </InputAdornment>
          )
        }}
      />
    </ContainerForm>
  );
}
