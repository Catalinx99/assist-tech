import * as React from 'react';
import { useEffect, useState } from "react";
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import { Button } from '@mui/material';



const AddEditUserModal = ({
  getUsers,
  onClose,
  handleUser,
  selectedUsers,
}) => {
  const [addFormData, setAddFormData] = useState({
    firstName: selectedUsers.firstName || '',
    lastName: selectedUsers.lastName || '',
    email: selectedUsers.email || '',
    password: selectedUsers.password || '',
    role: selectedUsers.role || '',
    gender: selectedUsers.gender || '',
    birthDate: selectedUsers.birthDate || '',
    nationality: selectedUsers.nationality || '',
    // status: selectedUsers.status || 'true',
    status: (selectedUsers?.status === true || selectedUsers?.status === false) ? selectedUsers.status : true,
    officeId: selectedUsers.officeId || '',
    buildingId: selectedUsers.buildingId || '',
    buildingName: selectedUsers.buildingName || '',
    workRemote: selectedUsers.workRemote || '',
    percentageOfWorkRemote: selectedUsers.percentageOfWorkRemote || '',
    officeName: selectedUsers.officeName || '',
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
          id="firstName"
          className='text-field-input'
          label="First Name"
          variant="outlined"
          type="text"
          name="firstName"
          required
          placeholder="Enter First Name"
          value={addFormData.firstName}
          onChange={handleAddFormChange}
          fullWidth
        />

        <TextField
          id="lastName"
          className='text-field-input'
          label="Last Name"
          variant="outlined"
          type="text"
          name="lastName"
          required
          placeholder="Enter last name "
          value={addFormData.lastName}
          onChange={handleAddFormChange}
          fullWidth
        />


        <TextField
          id="email"
          className='text-field-input'
          label="Email"
          variant="outlined"
          type="email"
          name="email"
          required
          placeholder="Enter Email "
          value={addFormData.email}
          onChange={handleAddFormChange}
          fullWidth
        />
        <TextField
          id="password"
          className='text-field-input'
          label="Password"
          variant="outlined"
          type="password"
          name="password"
          required
          placeholder="Enter password"
          value={addFormData.password}
          onChange={handleAddFormChange}
          fullWidth
        />

        <FormControl fullWidth>
          <InputLabel id="role">Select role</InputLabel>
          <Select
            labelId="role"
            className='text-field-input'
            name="role"
            label="Select role"
            value={addFormData.role}
            onChange={handleAddFormChange}
            fullWidth
          >
            {selectedUsers && Object.keys(selectedUsers).length === 0 && (<MenuItem key={"index_disabled"} value="" disabled>
              Select Role
            </MenuItem>
            )}

            <MenuItem value="user">
              User
            </MenuItem>
            <MenuItem value="administrator">
              Administrator
            </MenuItem>
            <MenuItem value="office_administrator">
              Office Administrator
            </MenuItem>
          </Select>
        </FormControl>

        <FormControl fullWidth>
          <InputLabel id="gender">Select gender</InputLabel>
          <Select
            labelId="gender"
            className='text-field-input'
            name="gender"
            label="Select gender"
            value={addFormData.gender}
            onChange={handleAddFormChange}
            fullWidth
          >
            {selectedUsers && Object.keys(selectedUsers).length === 0 && (<MenuItem key={"index_disabled"} value="" disabled>
              Select gender
            </MenuItem>
            )}

            <MenuItem value="male">
              Male
            </MenuItem>
            <MenuItem value="female">
              Female
            </MenuItem>
          </Select>
        </FormControl>

        <TextField
          id="birthDate"
          className='text-field-input'
          label={`${addFormData.birthDate ? 'Birth Date' : ''}`}
          variant="outlined"
          type="Date"
          name="birthDate"
          required
          placeholder="Enter Birth Date"
          value={addFormData.birthDate}
          onChange={handleAddFormChange}
          fullWidth />

        <FormControl fullWidth>
          <InputLabel id="status">Select status</InputLabel>
          <Select
            labelId="status"
            className='text-field-input'
            name="status"
            label="Select status"
            value={addFormData.status}
            onChange={handleAddFormChange}
            fullWidth
          >
            <MenuItem value={true}>
              Enable
            </MenuItem>
            <MenuItem value={false}>
              Disable
            </MenuItem>
          </Select>
        </FormControl>

        <TextField
          id="nationality"
          className='text-field-input'
          label="Nationality"
          variant="outlined"
          type="text"
          name="nationality"
          required
          placeholder="Enter nationality"
          value={addFormData.nationality}
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

        {selectedUsers && Object.keys(selectedUsers).length === 0 ? (
          <Button
            variant="contained"
            color="success"
            type="submit"
            className="modalButton"
            onClick={() => handleUser(addFormData, 'create')}
          >
            Create
          </Button>
        ) : (

          <Button
            variant="contained"
            color="success"
            type="submit"
            className="modalButton"
            onClick={() => handleUser(addFormData, 'update')}
          >
            Update
          </Button>
        )}

      </div>
    </>

  )
}

export default AddEditUserModal;
