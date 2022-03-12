import * as React from 'react';

import { useEffect, useState } from "react";
import Button from '@mui/material/Button';

import serviceApi from "../services"
import "../UsersManagementPage/UsersManagement.css"
import EditableRowOM from "./EditableRowOM";
import ReadOnlyRowOM from "./ReadOnlyRowOM";
import GenericModal from '../../Common/modal/Modal';
import AddOfficeModal from './AddOfficeModal';

const OfficeManagement = () => {
  const [open, setOpen] = React.useState(false);

  const services = new serviceApi();
  const [offices, setOffices] = useState([]);
  const [buildingData, setBuildingData] = useState([]);

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

  const [addFormData, setAddFormData] = useState({
    officeName: '',
    floorNumber: '',
    deskCount: ''
  });

  const [editFormData, setEditFormData] = useState({
    officeName: '',
    floorNumber: '',
    deskCount: ''
  })

  const [editOfficeId, setEditOfficeId] = useState(null);



  const handleAddFormChange = (event) => {
    event.preventDefault();

    const fieldName = event.target.getAttribute('name');
    const fieldValue = event.target.value;

    const newFormData = { ...addFormData };
    newFormData[fieldName] = fieldValue;

    setAddFormData(newFormData);
  };

  const handleEditFormChange = (event) => {
    event.preventDefault();

    const fieldName = event.target.getAttribute("name");
    const fieldValue = event.target.value;

    const newFormData = { ...editFormData }
    newFormData[fieldName] = fieldValue;
    setEditFormData(newFormData);

  }

  const createOffice = (data) => {
    const newFormattedOffice = {
      officeName: data.officeName,
      floorNumber: Number(data.floorNumber),
      deskCount: Number(data.deskCount),
      buildingId: Number(data.buildingId),
      buildingName: buildingData.filter(item => Number(item.id) === Number(data.buildingId))[0].name
    }
    services.post('offices', newFormattedOffice).then(() => {
      const updatedOffices = [...offices, newFormattedOffice];
      setOffices(updatedOffices);
      setOpen(false);
    });
  }

  const handleEditFormSubmit = (event) => {
    event.preventDefault();

    const editedOffice = {
      officeName: editFormData.officeName,
      floorNumber: editFormData.floorNumber,
      deskCount: editFormData.deskCount
    }
    // services.put(`offices/${editOfficeId}`, editedOffice).then(() => {
    //   const newOffices = [...offices];

    //   const index = offices.findIndex((office) => office.id === editOfficeId);
    //   newOffices[index] = editedOffice;
    //   setOffices(newOffices);
    // })
  }

  const handleEditClick = (event, office) => {
    event.preventDefault();
    setEditOfficeId(office.id);

    const formValues = {
      officeName: office.officeName,
      floorNumber: office.floorNumber,
      deskCount: office.deskCount
    }
    setEditFormData(formValues);
  }

  const handleCancelClick = () => {
    setEditOfficeId(null);
  }

  const handleDeleteClick = (officeId) => {
    const newOffices = [...offices];


    const index = offices.findIndex((office) => office.id === officeId);
    newOffices.splice(index, 1);

    setOffices(newOffices)
  }


  return (
    <div className='appContainer'>
      <form onSubmit={handleEditFormSubmit}>
        <h2> Office Management </h2>
        <Button onClick={() => setOpen(true)}>New office</Button>
        <GenericModal
          open={open}
          onClose={() => setOpen(false)}
          title={`${'Add new office'}`}>
          <AddOfficeModal
            getBuildings={getBuildings}
            buildingData={buildingData}
            handleAddFormChange={handleAddFormChange}
            onClose={() => setOpen(false)}
            createOffice={createOffice}
          />
        </GenericModal>
        <table>
          <thead>
            <tr>
              <th> Office name </th>
              <th> Building </th>
              <th> Floor Number </th>
              <th> Total Desks count </th>
              <th> Actions </th>
            </tr>
          </thead>
          <tbody>
            {offices.map((office, index) =>
              <>
                {editOfficeId === office.id ? (
                  <EditableRowOM
                    editFormData={editFormData}
                    handleEditFormChange={handleEditFormChange}
                    handleCancelClick={handleCancelClick} />
                ) : (
                  <ReadOnlyRowOM
                    office={office}
                    handleEditClick={handleEditClick}
                    handleDeleteClick={handleDeleteClick}
                  />
                )}
              </>
            )}
          </tbody>
        </table>
      </form>
    </div >
  )
}
export default OfficeManagement
