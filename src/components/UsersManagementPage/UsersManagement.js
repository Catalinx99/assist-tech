import * as React from 'react';
import "./UsersManagement.css";
import { useState, useEffect } from "react";
import serviceApi from '../services';
import GenericModal from '../../Common/modal/Modal';
import { DataGrid } from '@mui/x-data-grid';
import Button from '@mui/material/Button';
import AddEditUserModal from './AddEditUserModal';
import DeleteIcon from '@mui/icons-material/Delete';
import Switch from '@mui/material/Switch';



const UsersManagement = () => {
  const [open, setOpen] = React.useState(false);

  const services = new serviceApi();
  const [users, setUsers] = useState([]);
  const [selectedUsers, setSelectedUsers] = useState({});

  const handleDeleteClick = (userId) => {
    services.delete('users', userId).then(() => {
      const newUsers = [...users];

      const index = users.findIndex((user) => user.id === userId);
      newUsers.splice(index, 1);
      setUsers(newUsers);
    })
  }

  const columns = [
    { field: 'firstName', headerName: 'First Name', width: 180, headerAlign: 'center', align: 'center' },
    { field: 'lastName', headerName: 'Last Name', width: 180, headerAlign: 'center', align: 'center' },
    { field: 'email', headerName: 'E-mail Address', width: 180, headerAlign: 'center', align: 'center' },
    { field: 'role', headerName: 'Role', width: 180, headerAlign: 'center', align: 'center' },
    { field: 'gender', headerName: 'Gender', width: 150, headerAlign: 'center', align: 'center' },
    { field: 'birthDate', headerName: 'Birth Date', width: 180, headerAlign: 'center', align: 'center' },
    { field: 'nationality', headerName: 'Nationality', width: 180, headerAlign: 'center', align: 'center' },
    {
      field: 'status', headerName: 'Status', renderCell: (cellValues) => {
        return (
          <Switch disabled defaultChecked={cellValues.row.status} />
        );
      }, width: 100, headerAlign: 'center', align: 'center'
    },
    {
      field: "Edit",
      renderCell: (cellValues) => {
        return (
          <Button
            variant="outlined"
            color="inherit"
            className="button"
            onClick={(event) => {
              setSelectedUsers(cellValues.row)
              setOpen(true);
            }}
          >
            Edit
          </Button>
        );
      },
      width: 100, disableColumnMenu: true, sortable: false, headerAlign: 'center', align: 'center'
    },
    {
      field: "Delete",
      renderCell: (cellValues) => {
        return (
          <Button
            variant="outlined"
            color="inherit"
            className="button"
            endIcon={<DeleteIcon />}
            onClick={() => handleDeleteClick(cellValues.row.id)}
          >
            Delete
          </Button>
        );
      },
      with: 100, disableColumnMenu: true, sortable: false, headerAlign: 'center', align: 'center'
    }
  ];
  const getUsers = () => {
    services.get('users').then((data) => {
      setUsers(data);
    });
  }

  useEffect(() => {
    getUsers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleUser = (data, type) => {
    const newFormattedUser = {
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      password: data.password,
      role: data.role,
      gender: data.gender,
      birthDate: Date(data.birthDate),
      nationality: data.nationality,
      status: Boolean(data.status),
      officeId: Number(data.officeId),
      officeName: data.officeName,
      buildingId: Number(data.buildingId),
      buildingName: data.buildingName,
      workRemote: data.workRemote,
      percentageOfWorkRemote: Number(data.percentageOfWorkRemote),
    }
    if (type === 'create') {
      services.post('users', newFormattedUser).then(() => {
        getUsers();
        setOpen(false);
      });
    }
    if (type === 'update') {
      services.put(`users/${selectedUsers.id}`, newFormattedUser).then(() => {
        const newUsers = [...users];
        const index = users.findIndex((user) => user.id === selectedUsers.id);
        newUsers[index] = { id: selectedUsers.id, ...newFormattedUser };
        setUsers(newUsers);
        setOpen(false);
      })
    }
  }


  return (
    <div className='appContainer'>
      <div>
        <h2> Users Management </h2>
        <div className="rightFormButton">
          <Button
            onClick={() => {
              setSelectedUsers({});
              setOpen(true);
            }}
            variant="contained"
            color="inherit"
          >
            New user
          </Button>
        </div>
        <div style={{ width: '100%' }}>
          <DataGrid rows={users} columns={columns} autoHeight />
        </div>
        <GenericModal
          open={open}
          onClose={() => setOpen(false)}
          title={`${Object.keys(selectedUsers).length > 0 ? 'Edit user'
            : 'Create new user'}`}>
          <AddEditUserModal
            getUsers={getUsers}
            onClose={() => setOpen(false)}
            handleUser={handleUser}
            selectedUsers={selectedUsers}
          />
        </GenericModal>
      </div>
    </div >
  )
}

export default UsersManagement
