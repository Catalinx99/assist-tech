import * as React from 'react';
import { useEffect, useState } from "react";
import serviceApi from '../services';
import { userRoleLabel } from '../../Common/components/constants';
import { DataGrid } from '@mui/x-data-grid';

const UserStatus = () => {
  const services = new serviceApi();
  const [loggedUser, setLoggedUser] = useState(JSON.parse(localStorage.getItem('user')));
  const [usersList, setUsersList] = useState([]);

  const getUsersList = () => {
    services.get('users').then((data) => {
      const copyOfData = JSON.parse(JSON.stringify(data));
      copyOfData.map((item) => {
        if (item.workRemote !== 'partially remote') {
          item.percentageOfWorkRemote = '-'
        }
        return item
      })
      setUsersList(copyOfData);
    });
  }
  const columns = [
    { field: 'firstName', headerName: 'First Name', width: 150, headerAlign: 'center', align: 'center' },
    { field: 'lastName', headerName: 'Last Name', width: 150, headerAlign: 'center', align: 'center' },
    { field: 'buildingName', headerName: 'Building name', width: 200, headerAlign: 'center', align: 'center' },
    { field: 'officeName', headerName: 'Office name', width: 200, headerAlign: 'center', align: 'center' },
    { field: 'workRemote', headerName: 'Work remote', width: 150, headerAlign: 'center', align: 'center' },
    {
      field: 'percentageOfWorkRemote',
      headerName: 'Percentage of work remote',
      width: 250, headerAlign: 'center', align: 'center'
    },
    {
      field: 'gender',
      headerName: 'Gender',
      width: 150, headerAlign: 'center',
      hide: loggedUser.role !== userRoleLabel.adminType
    },
    { field: 'nationality', headerName: 'Nationality', width: 150, headerAlign: 'center', align: 'center', hide: loggedUser.role !== userRoleLabel.adminType },
    { field: 'birthDate', headerName: 'Birth date', width: 150, headerAlign: 'center', align: 'center', hide: loggedUser.role !== userRoleLabel.adminType },
  ];
  useEffect(() => {
    getUsersList();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div className="appContainer">
      <h2>User Status</h2>
      <div style={{ width: '100%' }}>
        <DataGrid rows={usersList} columns={columns} autoHeight />
      </div>

    </div>
  )
}

export default UserStatus
