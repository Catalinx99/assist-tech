import React, { useEffect, useState } from 'react';
import serviceApi from '../services';
import './DeskAssignment.css';
import { userRoleLabel } from '../../Common/components/constants';
import { DataGrid } from '@mui/x-data-grid';
import Button from '@mui/material/Button';

const DeskAssignment = () => {
  const [open, setOpen] = React.useState(false);
  const services = new serviceApi();
  const [users, setUsers] = useState([]);
  const [offices, setOffices] = useState([]);
  const [deskData, setDeskData] = useState([]);
  const [loggedUser, setLoggedUser] = useState(JSON.parse(localStorage.getItem('user')));

  const columns = [
    { field: 'firstName', headerName: 'First Name', width: 250, headerAlign: 'center', align: 'center' },
    { field: 'lastName', headerName: 'Last Name', width: 250, headerAlign: 'center', align: 'center' },
    { field: 'officeName', headerName: 'Office name', width: 240, headerAlign: 'center', align: 'center', editable: true },
    {
      field: "Actions",
      renderCell: (cellValues) => {
        return (
          <Button
            variant="outlined"
            color="inherit"
            className="button"
            onClick={(event) => {
              setDeskData(cellValues.row)
              setOpen(true);
            }}
          >
            Edit
          </Button>
        );
      },
      with: 100, headerAlign: 'center', disableColumnMenu: true, sortable: false,
    }
  ];

  const getUsers = () => {
    services.get('users').then((data) => {
      setUsers(data);
    })
  }
  const getOffices = () => {
    services.get('offices').then((offices) => {
      let shownOffices = null;
      if (loggedUser.role === userRoleLabel.adminType) {
        shownOffices = offices
      } else {
        shownOffices = offices.filter((office) => {
          return (office.officeAdministrator === loggedUser.firstName + " " + loggedUser.lastName)
        })
      }
      const freeOfficeDesk = shownOffices.filter((office) => {
        return (office.usableDesksCount > office.occupiedDesksCount)
      })

      setOffices(freeOfficeDesk);
    })
  }
  useEffect(() => {
    getUsers();
    getOffices();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const handleDesk = (data, type) => {
    const newFormattedDesk = {
      firstName: data.firstName,
      lastName: data.lastName,
      officeName: data.officeName,
    }
    if (type === 'update') {
      services.put(`users/${deskData.id}`, newFormattedDesk).then(() => {
        const newDesks = [...users];
        const index = users.findIndex((user) => user.id === deskData.id);
        newDesks[index] = { id: deskData.id, ...newFormattedDesk };
        setDeskData(newDesks);
        setOpen(false);
      })
    }
  }
  return (
    <div className="appContainer">
      <h2>User Status</h2>
      <div style={{ width: '60%', display: 'flex', alignSelf: 'center' }}>
        <DataGrid rows={users} columns={columns} autoHeight />
      </div>


    </div>
  )
}

export default DeskAssignment
