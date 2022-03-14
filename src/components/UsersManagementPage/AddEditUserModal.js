import * as React from 'react';
import { useEffect, useState } from "react";
import TextField from '@mui/material/TextField';
// import MenuItem from '@mui/material/MenuItem';
// import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
// import FormControl from '@mui/material/FormControl';
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
        {/* <FormControl fullWidth>
          <InputLabel id="buildingId">Select building</InputLabel>
          <Select
            labelId="buildingId"
            className='text-field-input'
            name="buildingId"
            label="Select building"
            value={addFormData.buildingId}
            onChange={handleAddFormChange}
            fullWidth
          >
            {selectedOffices && Object.keys(selectedOffices).length === 0 && (<MenuItem key={"index_disabled"} value="" disabled>
              Select building
            </MenuItem>
            )}

            {
              buildingData.map((item, index) =>
                <MenuItem key={index} value={item.id}>
                  {item.name}
                </MenuItem>
              )
            }
          </Select>
        </FormControl>

        {addFormData.buildingId !== '' && (

          <FormControl fullWidth>
            <InputLabel id="floorId">Select floor</InputLabel>
            <Select
              labelId="floorId"
              id="floorNumber"
              label="Select floor"
              name="floorNumber"
              className='text-field-input'
              onChange={handleAddFormChange}
              value={addFormData.floorNumber}
            >{
                // eslint-disable-next-line array-callback-return
                buildingData.map((item, index) => {
                  if (Number(item.id) === Number(addFormData.buildingId)) {
                    let optionList = [];
                    for (let i = 0; i < item.floorsCount; i++) {
                      optionList.push(<MenuItem key={index + '_' + i} value={i + 1}>{i + 1}</MenuItem>);
                    }
                    return optionList;
                  }
                }
                )
              }
            </Select>
          </FormControl>
        )} */}


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
        <TextField
          id="role"
          className='text-field-input'
          label="Role"
          variant="outlined"
          type="text"
          name="role"
          required
          placeholder="Enter role"
          value={addFormData.role}
          onChange={handleAddFormChange}
          fullWidth
        />
        <TextField
          id="gender"
          className='text-field-input'
          label="Gender"
          variant="outlined"
          type="text"
          name="gender"
          required
          placeholder="Enter gender"
          value={addFormData.gender}
          onChange={handleAddFormChange}
          fullWidth
        />
        <TextField
          id="birthDate"
          className='text-field-input'
          label="Birth Date"
          variant="outlined"
          type="Date"
          name="birthDate"
          required
          placeholder="Enter Birth Date"
          value={addFormData.birthDate}
          onChange={handleAddFormChange}
          fullWidth
        />
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
