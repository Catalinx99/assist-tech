import { useEffect, Fragment, useState } from "react";
import serviceApi from "../services"
import "../UsersManagementPage/UsersManagement.css"
import EditableRowOM from "./EditableRowOM";
import ReadOnlyRowOM from "./ReadOnlyRowOM";

const OfficeManagement = () => {

  const services = new serviceApi();
  const [offices, setOffices] = useState([]);
  const getOffices = () => {
    services.get('offices').then((data) => {
      setOffices(data);
    })
  }
  useEffect(() => {
    getOffices();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const [addFormData, setAddFormData] = useState({
    officeName: '',
    floorsNumber: '',
    deskCount: ''
  });

  const [editFormData, setEditFormData] = useState({
    officeName: '',
    floorsNumber: '',
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

  const handleAddFormSubmit = (event) => {
    event.preventDefault();
    const newOffice = {
      officeName: addFormData.officeName,
      floorsNumber: addFormData.floorsNumber,
      deskCount: addFormData.deskCount
    }
    // const newOffices = [...offices, newOffice]
    // setOffices(newOffices)
    services.post('offices', newOffice).then(() => {
      const newOffices = [...offices, newOffice];
      setOffices(newOffices);
    });
  };

  const handleEditFormSubmit = (event) => {
    event.preventDefault();

    const editedOffice = {
      id: editOfficeId,
      officeName: editFormData.officeName,
      floorsNumber: editFormData.floorsNumber,
      deskCount: editFormData.deskCount
    }
    services.put(`offices/${editOfficeId}`, editedOffice).then(() => {
      const newOffices = [...offices];

      const index = offices.findIndex((office) => office.id === editOfficeId);
      newOffices[index] = editedOffice;
      setOffices(newOffices);
    })
    // const newOffices = [...offices];

    // const index = offices.findIndex((office) => office.id === editOfficeId);
    // newOffices[index] = editedOffice;

    // setOffices(newOffices);
    // setEditOfficeId(null);

  }

  const handleEditClick = (event, office) => {
    event.preventDefault();
    setEditOfficeId(office.id);

    const formValues = {
      officeName: office.officeName,
      floorsNumber: office.floorsNumber,
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
      <h2> Add an office </h2>
      <form onSubmit={handleAddFormSubmit} className="addContact">
        <input
          type="text"
          name="officeName"
          required="required"
          placeholder="Enter an office name "
          onChange={handleAddFormChange}
        />
        <input
          type="number"
          name="floorsNumber"
          required="required"
          placeholder="Enter a floor number "
          onChange={handleAddFormChange}
        />
        <input
          type="number"
          name="deskCount"
          required="required"
          placeholder="Enter a desk "
          onChange={handleAddFormChange}
        />
        <button type="submit" className="button"> Add </button>
      </form>
    </div>
  )
}
export default OfficeManagement
