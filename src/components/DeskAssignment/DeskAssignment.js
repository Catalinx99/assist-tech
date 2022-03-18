
import * as React from 'react';
import { userRoleLabel } from '../../Common/components/constants';
import { useEffect, useState } from "react";
import Button from '@mui/material/Button';
import serviceApi from "../services";
import "../UsersManagementPage/UsersManagement.css";
import GenericModal from '../../Common/modal/Modal';
import DeskModal from './DeskModal';
import { DataGrid } from '@mui/x-data-grid';

const DeskAssignment = () => {
  const [open, setOpen] = React.useState(false);
  const services = new serviceApi();
  const [loggedUser, setLoggedUser] = useState(JSON.parse(localStorage.getItem('user')));
  const [users, setUsers] = useState([]);
  const [officeData, setOfficeData] = useState([]);
  const [selectedDesks, setSelectedDesks] = useState({});

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
              setSelectedDesks(cellValues.row)
              setOpen(true);
            }}
          >
            Edit
          </Button>
        );
      },
      with: 80, disableColumnMenu: true, sortable: false, headerAlign: 'center', align: 'center'
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

      setOfficeData(freeOfficeDesk);
    })
  }
  useEffect(() => {
    getUsers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleDesk = (data, type) => {
    const newFormattedDesk = {
      firstName: data.firstName,
      lastName: data.lastName,
      officeId: data.officeId,
      officeName: officeData.filter(item => Number(item.id) === Number(data.officeId))[0].name,
    }
    if (type === 'update') {
      services.put(`users/${selectedDesks.id}`, newFormattedDesk).then(() => {
        const newDesks = [...users];
        const index = users.findIndex((user) => user.id === selectedDesks.id);
        newDesks[index] = { id: selectedDesks.id, ...newFormattedDesk };
        setUsers(newDesks);
        setOpen(false);
      })
    }
  }

  return (
    <div className='appContainer'>
      <div>
        <h2>Desk Assignment </h2>
        <div style={{ width: '100%' }}>
          <DataGrid rows={users} columns={columns} autoHeight />
        </div>
        <GenericModal
          open={open}
          onClose={() => setOpen(false)}
          title={`${Object.keys(selectedDesks).length > 0 ? 'Edit office' : 'Create new office'}`}>
          <DeskModal
            getUsers={getUsers}
            officeData={officeData}
            onClose={() => setOpen(false)}
            handleDesk={handleDesk}
            selectedDesks={selectedDesks}
          />
        </GenericModal>
      </div>
    </div >
  )
}
export default DeskAssignment
