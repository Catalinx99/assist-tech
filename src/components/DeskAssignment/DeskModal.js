import * as React from 'react';
import { useEffect, useState } from "react";
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import { Button } from '@mui/material';


const DeskModal = ({
  getUsers,
  officeData,
  onClose,
  handleDesk,
  selectedDesks,
}) => {
  const [addFormData, setAddFormData] = useState({
    firstName: selectedDesks.firstName,
    lastName: selectedDesks.lastName,
    officeId: selectedDesks.officeId,
    officeName: selectedDesks.officeName,
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
    getUsers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <form className="">
        <TextField
          id="userId"
          className='text-field-input'
          label="First Name"
          variant="outlined"
          type="text"
          name="firstName"
          required
          placeholder="Enter first name "
          value={addFormData.firstName}
          onChange={handleAddFormChange}
          fullWidth
        />

        <TextField
          id="userId"
          className='text-field-input'
          label="Last name"
          variant="outlined"
          type="text"
          name="lastName"
          required
          placeholder="Enter Last name "
          value={addFormData.lastName}
          onChange={handleAddFormChange}
          fullWidth
        />
        <TextField
          id="officeIf"
          className='text-field-input'
          label="Office name"
          variant="outlined"
          type="text"
          name="officeName"
          required
          placeholder="Enter Office name"
          value={addFormData.officeName}
          onChange={handleAddFormChange}
          fullWidth
        />

        {/* <FormControl fullWidth>
          <InputLabel id='officeId'>Select office</InputLabel>
          <Select
            labelId='officeId'
            className='text-field-input'
            name='officeId'
            label="Select office"
            value={addFormData.officeId}
            onChange={handleAddFormChange}
            fullWidth
          >
            {selectedDesks && Object.keys(selectedDesks).length === 0 && (<MenuItem key={"index_disabled"} value="" disabled>
              Select building
            </MenuItem>
            )}
            {
              officeData.map((item, index) =>
                <MenuItem key={index} value={item.id}>
                  {item.name}
                </MenuItem>
              )
            }
          </Select>
        </FormControl> */}

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
          onClick={() => handleDesk(addFormData, 'update')}
        >
          Update
        </Button>

      </div>
    </>

  )
}

export default DeskModal;
