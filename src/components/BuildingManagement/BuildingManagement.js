import * as React from 'react';
import { useEffect, useState } from "react";
import Button from '@mui/material/Button';
import serviceApi from "../services";
import "../UsersManagementPage/UsersManagement.css";
import GenericModal from '../../Common/modal/Modal';
import { DataGrid } from '@mui/x-data-grid';
import AddEditBuildingModal from './AddEditBuildingModal';
import DeleteIcon from '@mui/icons-material/Delete';


const BuildingManagement = () => {
  const [open, setOpen] = React.useState(false);

  const services = new serviceApi();
  const [buildings, setBuildings] = useState([]);
  const [selectedBuildings, setSelectedBuildings] = useState({});

  const handleDeleteClick = (buildingId) => {
    services.delete('buildings', buildingId).then(() => {
      // eslint-disable-next-line no-unused-vars
      const newBuildings = [...buildings];
    })
  }
  const columns = [
    { field: 'name', headerName: 'Building Name', width: 300, headerAlign: 'center', align: 'center' },
    { field: 'floorsCount', headerName: 'Floors Count', width: 300, headerAlign: 'center', align: 'center' },
    { field: 'address', headerName: 'Address', width: 300, headerAlign: 'center', align: 'center' },
    {
      field: "Edit",
      renderCell: (cellValues) => {
        return (
          <Button
            variant="outlined"
            color="inherit"
            className="button"
            onClick={(event) => {
              setSelectedBuildings(cellValues.row)
              setOpen(true);
            }}
          >
            Edit
          </Button>
        );
      },
      width: 200, sortable: false, disableColumnMenu: true, headerAlign: 'center', align: 'center'
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
            disabled={cellValues.row.officeIsEmpty}
            onClick={() => handleDeleteClick(cellValues.row.id)}
          >
            Delete
          </Button>

        );
      },
      width: 200, sortable: false, disableColumnMenu: true, headerAlign: 'center', align: 'center'
    }
  ];

  const getBuildings = () => {
    services.get('buildings?_embed=offices').then((buildingsData) => {
      const filteredBuildings = buildingsData.map(buildingItem => {
        const officeIsEmpty = buildingItem?.offices.filter((item) => item.occupiedDesksCount !== 0);
        if (officeIsEmpty.length === 0) {
          buildingItem.officeIsEmpty = false;
        } else {
          buildingItem.officeIsEmpty = true;
        }
        return buildingItem
      });
      setBuildings(filteredBuildings);
    });
  }

  useEffect(() => {
    getBuildings();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const handleBuilding = (data, type) => {
    const newFormattedBuilding = {
      name: data.name,
      floorsCount: Number(data.floorsCount),
      address: data.address,
    }
    if (type === 'create') {
      services.post('buildings', newFormattedBuilding).then(() => {
        getBuildings();
        setOpen(false);
      });
    }
    if (type === 'update') {
      services.put(`buildings/${selectedBuildings.id}`, newFormattedBuilding).then(() => {
        const newBuildings = [...buildings];
        const index = buildings.findIndex((building) => building.id === selectedBuildings.id);
        newBuildings[index] = { id: selectedBuildings.id, ...newFormattedBuilding };
        setBuildings(newBuildings);
        setOpen(false);
      })
    }
  }

  return (
    <div className='appContainer'>
      <div>
        <h2> Buildings Management </h2>
        <div className="rightFormButton">
          <Button
            onClick={() => {
              setSelectedBuildings({});
              setOpen(true);
            }}
            variant="contained"
            color="inherit"
          >
            New building
          </Button>
        </div>
        <div style={{ width: '100%' }}>
          <DataGrid rows={buildings} columns={columns} autoHeight />
        </div>
        <GenericModal
          open={open}
          onClose={() => setOpen(false)}
          title={`${Object.keys(selectedBuildings).length > 0 ? 'Edit building' : 'Create new building'}`}>
          <AddEditBuildingModal
            getBuildings={getBuildings}
            onClose={() => setOpen(false)}
            handleBuilding={handleBuilding}
            selectedBuildings={selectedBuildings}
          />
        </GenericModal>
      </div>
    </div >
  )
}

export default BuildingManagement;
