import * as React from 'react';
import { useEffect, useState } from "react";

const AddOfficeModal = ({
  getBuildings,
  buildingData,
  handleAddFormSubmit,
  onClose,
  createOffice
}) => {

  const [addFormData, setAddFormData] = useState({
    officeName: '',
    floorNumber: null,
    deskCount: null,
    buildingId: null,
    buildingName: '',
  });

  const handleAddFormChange = (event) => {
    event.preventDefault();

    const fieldName = event.target.getAttribute('name');
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
      <form onSubmit={handleAddFormSubmit} className="">
        <input
          type="text"
          name="officeName"
          required="required"
          placeholder="Enter an office name "
          onChange={handleAddFormChange}
        />
        <br />
        <select name="buildingId" onChange={handleAddFormChange}>
          <option key={"index_disabled"} selected="true" value="" disabled>Select building</option>
          {
            buildingData.map((item, index) =>
              <option key={index} value={item.id}>{item.name}</option>
            )
          }</select>
        <br />
        {addFormData.buildingId !== null && (
          <select name="floorNumber" onChange={handleAddFormChange}>{
            // eslint-disable-next-line array-callback-return
            buildingData.map((item, index) => {
              if (Number(item.id) === Number(addFormData.buildingId)) {
                let optionList = [];
                for (let i = 0; i < item.floorsCount; i++) {
                  optionList.push(<option key={index + '_' + i} value={i + 1}>{i + 1}</option>);
                }
                return optionList;
              }
            }
            )
          }</select>
        )}
        <br />
        <input
          type="number"
          name="deskCount"
          required="required"
          placeholder="Enter a desk "
          onChange={handleAddFormChange}
        />
      </form>
      <button type='button' onClick={onClose} className="button">Cancel</button>
      <button type="submit" className="button" onClick={() => createOffice(addFormData)}> Create </button>
    </>

  )
}

export default AddOfficeModal;
