import React, {useState} from 'react';
import {UserSearch} from './components/UserSearch';
import SavedItems from './components/SavedItems';
import { CircularProgress, FormControlLabel, Switch} from '@material-ui/core';
import TablePagination from './components/TablePagination';

import './App.css';
import {useSelector} from "react-redux";

function PangeaApp() {

  const totalUsers = useSelector(state => state.users.total_count);
  const loading = useSelector(state => state.users.loader);
  const [switchPos, setSwitchPos] = useState(false);

  function toggleChecked(){
    setSwitchPos(!switchPos);
  }

  return (
    <div className='pangea-app'>
      <FormControlLabel className='storage-switch'
        value="top"
        control={<Switch color="primary"
                         checked={switchPos}
                         onChange={toggleChecked}/>}
        label="Show Storage"
        labelPlacement="top"
      />


      {switchPos && <SavedItems className='saved-items'/>}
      {!switchPos && <UserSearch/>}
      {!switchPos && !loading && totalUsers && <TablePagination />}
      {!switchPos && loading && <CircularProgress style={{marginTop: 150}}/>}
    </div>
  );
}

export default PangeaApp;
