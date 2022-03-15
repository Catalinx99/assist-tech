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
    { field: 'firstName', headerName: 'First Name', width: 150, headerAlign: 'center', },
    { field: 'lastName', headerName: 'Last Name', width: 150, headerAlign: 'center' },
    { field: 'buildingName', headerName: 'Building name', width: 200, headerAlign: 'center' },
    { field: 'officeName', headerName: 'Office name', width: 200, headerAlign: 'center' },
    { field: 'workRemote', headerName: 'Work remote', width: 150, headerAlign: 'center' },
    {
      field: 'percentageOfWorkRemote',
      headerName: 'Percentage of work remote',
      width: 250, headerAlign: 'center'
    },
    {
      field: 'gender',
      headerName: 'Gender',
      width: 150, headerAlign: 'center',
      hide: loggedUser.role !== userRoleLabel.adminType
    },
    { field: 'nationality', headerName: 'Nationality', width: 150, headerAlign: 'center', hide: loggedUser.role !== userRoleLabel.adminType },
    { field: 'birthDate', headerName: 'Birth date', width: 150, headerAlign: 'center', hide: loggedUser.role !== userRoleLabel.adminType },
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
      {/* <table>
        <thead>
          <tr>
            <th>First name</th>
            <th>Last name</th>
            <th>Building name</th>
            <th>Office name</th>
            <th>Work remote</th>
            <th>Percentage of work remote</th>
            {loggedUser.role === userRoleLabel.adminType ? (
              <>
                <th>Gender</th>
                <th>Nationality</th>
                <th>Birth date</th>
              </>
            ) : null}
          </tr>
        </thead>
        <tbody>
          {usersList.map((user, index) => (
            <tr key={index}>
              <td>{user.firstName}</td>
              <td>{user.lastName}</td>
              <td>{user.buildingName}</td>
              <td>{user.officeName}</td>
              <td>{user.workRemote}</td>
              <td>
                {user.workRemote === "partially remote" ?
                  user.percentageOfWorkRemote : "-"
                }
              </td>
              {loggedUser.role === userRoleLabel.adminType ? (
                <>
                  <td>{user.gender}</td>
                  <td>{user.nationality}</td>
                  <td>{user.birthDate}</td>
                </>
              ) : null}

            </tr>
          ))}
        </tbody>

      </table> */}
    </div>
  )
}

export default UserStatus
