import * as React from 'react';

import { useEffect, useState } from "react";
import Button from '@mui/material/Button';

import serviceApi from "../services"
import "../UsersManagementPage/UsersManagement.css"
import GenericModal from '../../Common/modal/Modal';
import AddEditOfficeModal from './AddEditOfficeModal';
import { DataGrid } from '@mui/x-data-grid';


const OfficeManagement = () => {
  const [open, setOpen] = React.useState(false);

  const services = new serviceApi();
  const [offices, setOffices] = useState([]);
  const [buildingData, setBuildingData] = useState([]);
  const [selectedOffices, setSelectedOffices] = useState({});

  const columns = [
    { field: 'id', headerName: 'ID', width: 50 },
    { field: 'officeName', headerName: 'Office Name', width: 300 },
    { field: 'buildingName', headerName: 'Building Name', width: 300 },
    { field: 'floorNumber', headerName: 'Floor', width: 80 },
    { field: 'deskCount', headerName: 'Total Desks count', width: 150 },
    { field: 'usableDesksCount', headerName: 'Usable Desks count', width: 150 },
    { field: 'officeAdministrator', headerName: 'Office Administrator', width: 300 },

    {
      field: "Actions",
      renderCell: (cellValues) => {
        return (
          <Button
            variant="outlined"
            color="primary"
            onClick={(event) => {
              setSelectedOffices(cellValues.row)
              setOpen(true);
            }}
          >
            Edit
          </Button>
        );
      },
      with: 80
    }
  ];

  const getOffices = () => {
    services.get('offices').then((data) => {
      setOffices(data);
    })
  }
  const getBuildings = () => {
    services.get('buildings').then((data) => {
      setBuildingData(data);
    })
  }
  useEffect(() => {
    getOffices();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleOffice = (data, type) => {
    const newFormattedOffice = {
      officeName: data.officeName,
      floorNumber: Number(data.floorNumber),
      deskCount: Number(data.deskCount),
      buildingId: Number(data.buildingId),
      buildingName: buildingData.filter(item => Number(item.id) === Number(data.buildingId))[0].name,
      usableDesks: Number(data.usableDesks),
      officeAdministrator: data.officeAdministrator,
      membersList: data.membersList,
      usableDesksCount: Number(data.usableDesksCount),
      occupiedDesksCount: Number(data.occupiedDesksCount),
    }
    if (type === 'create') {
      services.post('offices', newFormattedOffice).then(() => {
        getOffices();
        setOpen(false);
      });
    }
    if (type === 'update') {
      services.put(`offices/${selectedOffices.id}`, newFormattedOffice).then(() => {
        const newOffices = [...offices];
        const index = offices.findIndex((office) => office.id === selectedOffices.id);
        newOffices[index] = { id: selectedOffices.id, ...newFormattedOffice };
        setOffices(newOffices);
        setOpen(false);
      })
    }
  }

  return (
    <div className='appContainer'>
      <div>
        <h2> Office Management </h2>
        <Button
          onClick={() => {
            setSelectedOffices({});
            setOpen(true);
          }}
          variant="contained"
          color="primary"
        >
          New office
        </Button>
        <div style={{ height: 400, width: '100%' }}>
          <DataGrid rows={offices} columns={columns} />
        </div>
        <GenericModal
          open={open}
          onClose={() => setOpen(false)}
          title={`${Object.keys(selectedOffices).length > 0 ? 'Edit office' : 'Create new office'}`}>
          <AddEditOfficeModal
            getBuildings={getBuildings}
            buildingData={buildingData}
            onClose={() => setOpen(false)}
            handleOffice={handleOffice}
            selectedOffices={selectedOffices}
          />
        </GenericModal>
      </div>
    </div >
  )
}
export default OfficeManagement
