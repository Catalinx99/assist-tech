import { useEffect, useState, Fragment } from "react";
import "../UsersManagementPage/UsersManagement.css";
import serviceApi from "../services";
import ReadOnlyRowBM from "./ReadOnlyRowBM";
import EditableRowBM from "./EditableRowBM";

const BuildingManagement = () => {
  const services = new serviceApi();
  const [buildings, setBuildings] = useState([]);
  const [offices, setOffices] = useState([]);

  const getBuildings = () => {
    services.get('buildings').then((data) => {
      setBuildings(data);
    });
  }

  const getOffices = () => {
    services.get('offices').then((offices) => {
      setOffices(offices);
    })
  }

  useEffect(() => {
    getBuildings();
    getOffices();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const [addFormData, setAddFormData] = useState({
    name: '',
    floorsCount: '',
    address: ''
  })
  const [editFormData, setEditFormData] = useState({
    name: '',
    floorsCount: '',
    address: ''
  })

  const [editBuildingId, setEditBuildingId] = useState(null);

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
    const fieldName = event.target.getAttribute('name');
    const fieldValue = event.target.value;

    const newFormData = { ...editFormData }
    newFormData[fieldName] = fieldValue;

    setEditFormData(newFormData);
  }

  const handleAddFormSubmit = (event) => {
    event.preventDefault();

    const newBuilding = {
      name: addFormData.name,
      floorsCount: addFormData.floorsCount,
      address: addFormData.address
    };

    services.post("buildings", newBuilding).then(() => {
      const newBuildings = [...buildings, newBuilding];
      setBuildings(newBuildings);
    });
  };

  const handleEditFormSubmit = (event) => {
    event.preventDefault();

    const editedBuilding = {
      id: editBuildingId,
      name: editFormData.name,
      floorsCount: editFormData.floorsCount,
      address: editFormData.address
    }

    services.put(`buildings/${editBuildingId}`, editedBuilding).then(() => {
      const newBuildings = [...buildings];

      const index = buildings.findIndex((building) => building.id === editBuildingId);
      newBuildings[index] = editedBuilding;
      setBuildings(newBuildings);
      setEditBuildingId(null);
    })
  }

  const handleEditClick = (event, building) => {
    event.preventDefault();
    setEditBuildingId(building.id);
    const formValues = {
      name: building.name,
      floorsCount: building.floorsCount,
      address: building.address
    }
    setEditFormData(formValues);
  }

  const handleCancelClick = () => {
    setEditBuildingId(null);
  }

  const handleDeleteClick = (buildingId) => {
    services.delete(`buildings/${buildingId}`).then(() => {
      const newBuildings = [...buildings];

      const index = buildings.findIndex((building) => building.id === buildingId);
      newBuildings.splice(index, 1);
      setBuildings(newBuildings);
    })
  }

  return (
    <div className="appContainer">
      <form onSubmit={handleEditFormSubmit}>
        <h2>Buildings Management</h2>
        <table>
          <thead>
            <tr>
              <th>Building name</th>
              <th>Floors count</th>
              <th>Building address</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {buildings.map((building, index) => (
              <Fragment key={index}>
                {editBuildingId === building.id ? (
                  <EditableRowBM
                    editFormData={editFormData}
                    handleEditFormChange={handleEditFormChange}
                    handleCancelClick={handleCancelClick} />
                ) : (
                  <ReadOnlyRowBM
                    offices={offices}
                    building={building}
                    handleEditClick={handleEditClick}
                    handleDeleteClick={handleDeleteClick} />
                )}
              </Fragment>
            ))}
          </tbody>
        </table>
      </form>
      <h2> Add a Building</h2>
      <form onSubmit={handleAddFormSubmit}>
        <input type="text"
          name="name"
          required="required"
          placeholder="Enter building name"
          onChange={handleAddFormChange}
        />
        <input type="number"
          name="floorsCount"
          required="required"
          placeholder="Enter floor count"
          onChange={handleAddFormChange}
        />
        <input type="text"
          name="address"
          required="required"
          placeholder="Enter an address"
          onChange={handleAddFormChange}
        />
        <button type="submit"> Add </button>
      </form>
    </div>
  )
}

export default BuildingManagement;
