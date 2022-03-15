import * as React from 'react';
import { useEffect, useState } from "react";
import TextField from '@mui/material/TextField';
// import InputLabel from '@mui/material/InputLabel';
import { Button } from '@mui/material';

const AddEditBuildingModal = ({
  getBuildings,
  onClose,
  handleBuilding,
  selectedBuildings,

}) => {
  const [addFormData, setAddFormData] = useState({
    name: selectedBuildings.name || '',
    floorsCount: selectedBuildings.floorsCount || '',
    address: selectedBuildings.address || '',
  });

  const handleAddFormChange = (event) => {
    event.preventDefault();
    const fieldName = event.target.name || event.target.getAttribute('name');
    const fieldValue = event.target.value;

    const newFormData = { ...addFormData };
    newFormData[fieldName] = fieldValue;

    setAddFormData(newFormData);
  };

  useEffect(() => {
    getBuildings();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <form className="">
        <TextField
          id="name"
          className='text-field-input'
          label="Building Name"
          variant="outlined"
          type="text"
          name="name"
          required
          placeholder="Enter building name "
          value={addFormData.name}
          onChange={handleAddFormChange}
          fullWidth
        />


        <TextField
          id="floorsCount"
          className='text-field-input'
          label="Floors Count"
          variant="outlined"
          type="number"
          name="floorsCount"
          required
          placeholder="Enter floors count "
          value={addFormData.floorsCount}
          onChange={handleAddFormChange}
          fullWidth
        />


        <TextField
          id="address"
          className='text-field-input'
          label="Address"
          variant="outlined"
          type="text"
          name="address"
          required
          placeholder="Enter address "
          value={addFormData.address}
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

        {selectedBuildings && Object.keys(selectedBuildings).length === 0 ? (
          <Button
            variant="contained"
            color="success"
            type="submit"
            className="modalButton"
            onClick={() => handleBuilding(addFormData, 'create')}
          >
            Create
          </Button>
        ) : (

          <Button
            variant="contained"
            color="success"
            type="submit"
            className="modalButton"
            onClick={() => handleBuilding(addFormData, 'update')}
          >
            Update
          </Button>
        )}

      </div>
    </>

  )
}

export default AddEditBuildingModal;
