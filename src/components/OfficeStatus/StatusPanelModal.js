import React from 'react'
import { useEffect, useState } from "react";
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import { Button } from '@mui/material';

const StatusPanelModal = ({
  officeSelected,
  onClose,
  handleOffices
}) => {
  const [addFormData, setAddFormData] = useState({
    officeName: officeSelected.officeName,
    buildingName: officeSelected.buildingName,
    floorNumber: officeSelected.floorNumber,
    officeAdministrator: officeSelected.officeAdministrator,
    membersList: officeSelected.membersList,
    deskCount: officeSelected.deskCount,
    usableDesksCount: officeSelected.usableDesksCount,
    occupiedDesksCount: officeSelected.occupiedDesksCount,
  });
  const handleAddFormChange = (event) => {
    event.preventDefault();
    const fieldName = event.target.name || event.target.getAttribute('name');
    const fieldValue = event.target.value;

    const newFormData = { ...addFormData };
    newFormData[fieldName] = fieldValue;

    setAddFormData(newFormData);
  };
  return (
    <>
      <form className="">
        <TextField
          id="officeName"
          className='text-field-input'
          label="Office Name"
          variant="outlined"
          type="text"
          name="officeName"
          required
          placeholder="Enter Office Name"
          value={addFormData.officeName}
          onChange={handleAddFormChange}
          fullWidth
        />
        <TextField
          id="buildingName"
          className='text-field-input'
          label="Building Name"
          variant="outlined"
          type="text"
          name="buildingName"
          required
          placeholder="Enter building name "
          value={addFormData.buildingName}
          onChange={handleAddFormChange}
          fullWidth
        />
        <TextField
          id="floorNumber"
          className='text-field-input'
          label="Floor number"
          variant="outlined"
          type="number"
          name="floorNumber"
          required
          placeholder="Enter floor number "
          value={addFormData.floorNumber}
          onChange={handleAddFormChange}
          fullWidth
        />
        <TextField
          id="officeAdministrator"
          className='text-field-input'
          label="Office Administrator"
          variant="outlined"
          type="text"
          name="officeAdministrator"
          required
          placeholder="Enter office Administrator "
          value={addFormData.officeAdministrator}
          onChange={handleAddFormChange}
          fullWidth
        />
        <TextField
          id="membersList"
          className='text-field-input'
          label="Members"
          variant="outlined"
          type="text"
          name="membersList"
          required
          placeholder="Enter member "
          value={addFormData.membersList}
          onChange={handleAddFormChange}
          fullWidth
        />
        <TextField
          id="deskCount"
          className='text-field-input'
          label="Desk count"
          variant="outlined"
          type="number"
          name="deskCount"
          required
          placeholder="Enter desk count "
          value={addFormData.deskCount}
          onChange={handleAddFormChange}
          fullWidth
        />
        <TextField
          id="usableDesksCount"
          className='text-field-input'
          label="Usable desks"
          variant="outlined"
          type="text"
          name="usableDesksCount"
          required
          placeholder="Enter last name "
          value={addFormData.usableDesksCount}
          onChange={handleAddFormChange}
          fullWidth
        />
        <TextField
          id="occupiedDesksCount"
          className='text-field-input'
          label="Occupied desks count"
          variant="outlined"
          type="number"
          name="occupiedDesksCount"
          required
          placeholder="Enter ocupied desks count "
          value={addFormData.occupiedDesksCount}
          onChange={handleAddFormChange}
          fullWidth
        />

      </form>
      <div className='modalButtonsWrapper'>
        <Button
          variant="outlined"
          color="inherit"
          type='button'
          onClick={onClose}
          className="button modalButton"
        >
          Cancel
        </Button>

        <Button
          variant="contained"
          color="success"
          type="submit"
          className="modalButton"
          onClick={() => handleOffices(addFormData, 'update')}
        >
          Update
        </Button>

      </div>
    </>
  )
}

export default StatusPanelModal;
