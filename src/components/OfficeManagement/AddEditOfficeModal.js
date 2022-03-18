import * as React from 'react';
import { useEffect, useState } from "react";
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import { Button } from '@mui/material';


const AddOfficeModal = ({
  getBuildings,
  buildingData,
  onClose,
  handleOffice,
  selectedOffices,
}) => {
  const [addFormData, setAddFormData] = useState({
    officeName: selectedOffices.officeName || '',
    floorNumber: selectedOffices.floorNumber || '',
    deskCount: selectedOffices.deskCount || '',
    buildingId: selectedOffices.buildingId || '',
    buildingName: selectedOffices.buildingName || '',
    officeAdministrator: selectedOffices.officeAdministrator || '',
    membersList: selectedOffices.membersList || [],
    usableDesksCount: selectedOffices.usableDesksCount || '',
    occupiedDesksCount: selectedOffices.occupiedDesksCount || []
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
          id="officeId"
          className='text-field-input'
          label="Office name"
          variant="outlined"
          type="text"
          name="officeName"
          required
          placeholder="Enter an office name "
          value={addFormData.officeName}
          onChange={handleAddFormChange}
          fullWidth
        />
        <FormControl fullWidth>
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
        )}


        <TextField
          id="deskCountId"
          className='text-field-input'
          label="Desk Count"
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
          id="usableDesksId"
          className='text-field-input'
          label="Usable Desks"
          variant="outlined"
          type="number"
          name="usableDesksCount"
          required
          placeholder="Enter usable desks "
          value={addFormData.usableDesksCount}
          onChange={handleAddFormChange}
          fullWidth
        />
        <TextField
          id="officeAdministratorId"
          className='text-field-input'
          label="Office Administrator"
          variant="outlined"
          type="text"
          name="officeAdministrator"
          required
          placeholder="Enter office administrator"
          value={addFormData.officeAdministrator}
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

        {selectedOffices && Object.keys(selectedOffices).length === 0 ? (
          <Button
            variant="contained"
            color="success"
            type="submit"
            className="modalButton"
            onClick={() => handleOffice(addFormData, 'create')}
          >
            Create
          </Button>
        ) : (

          <Button
            variant="contained"
            color="success"
            type="submit"
            className="modalButton"
            onClick={() => handleOffice(addFormData, 'update')}
          >
            Update
          </Button>
        )}

      </div>
    </>

  )
}

export default AddOfficeModal;
