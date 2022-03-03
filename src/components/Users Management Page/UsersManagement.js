import "./UsersManagement.css"

import data from "./MockData.json";
import { useState, Fragment } from "react";
import { nanoid } from 'nanoid';
import ReadOnlyRow from "./ReadOnlyRow";
import EditableRow from "./EditableRow";


const UsersManagement = () => {
  const [contacts, setContacts] = useState(data);
  const [addFormData, setAddFormData] = useState({
    fullName: '',
    address: '',
    phoneNumber: '',
    email: ''
  })

  const [editFormData, setEditFormData] = useState({
    fullName: '',
    address: '',
    phoneNumber: '',
    email: ''
  })


  const [editContactId, setEditContactId] = useState(null);

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
    const newContact = {
      id: nanoid(),
      fullName: addFormData.fullName,
      address: addFormData.address,
      phoneNumber: addFormData.phoneNumber,
      email: addFormData.email,
    };

    const newContacts = [...contacts, newContact];
    setContacts(newContacts);
  };

  const handleEditFormSubmit = (event) => {
    event.preventDefault();

    const editedContact = {
      id: editContactId,
      fullName: editFormData.fullName,
      address: editFormData.address,
      phoneNumber: editFormData.phoneNumber,
      email: editFormData.email
    }
    const newContacts = [...contacts];

    const index = contacts.findIndex((contact) => contact.id === editContactId);
    newContacts[index] = editedContact;

    setContacts(newContacts);
    setEditContactId(null);
  }

  const handleEditClick = (event, contact) => {
    event.preventDefault();
    setEditContactId(contact.id);

    const formValues = {
      fullName: contact.fullName,
      address: contact.address,
      phoneNumber: contact.phoneNumber,
      email: contact.email,
    }
    setEditFormData(formValues);
  }

  const handleCancelClick = () => {
    setEditContactId(null);
  }
  return (
    <div className="appContainer">
      <h2>Users Management</h2>
      <form onSubmit={handleEditFormSubmit}>
        <table>
          <thead>
            <tr>
              <th> Name </th>
              <th> Address </th>
              <th> Phone Number </th>
              <th> Email </th>
              <th> Actions </th>
            </tr>
          </thead>
          <tbody>
            {contacts.map((contact) => (
              <Fragment>
                {editContactId === contact.id ?
                  (<EditableRow editFormData={editFormData}
                    handleEditFormChange={handleEditFormChange}
                    handleCancelClick={handleCancelClick} />) :
                  (<ReadOnlyRow contact={contact}
                    handleEditClick={handleEditClick} />)}
              </Fragment>
            ))}
          </tbody>
        </table>
      </form>
      <h2>Add a contact</h2>
      <form onSubmit={handleAddFormSubmit} className="addContact">
        <input
          type="text"
          name="fullName"
          required="required"
          placeholder="Enter a name"
          onChange={handleAddFormChange}
        />
        <input
          type="text"
          name="address"
          required="required"
          placeholder="Enter an address"
          onChange={handleAddFormChange}
        />
        <input
          type="text"
          name="phoneNumber"
          required="required"
          placeholder="Enter a phone number"
          onChange={handleAddFormChange}
        />
        <input
          type="email"
          name="email"
          required="required"
          placeholder="Enter an email"
          onChange={handleAddFormChange}
        />
        <button type="submit">Add</button>
      </form>


const UsersManagement = () => {
  return (
    <div className="users">
      <h2 className="titlu"> Users Management </h2>
      <ul className='card'>
        <div className="carduri">
          <h3> Employee </h3>
          <p> First Name </p>
          <p> Last Name </p>
          <p> E-mail address </p>
          <p> Password </p>
          <p>  Role (one of: Administrator / Office Administrator / Employee) </p>
          <p> Gender (one of: Male / Female / Other)  </p>
          <p>  Birth date – optional </p>
          <p>  Nationality – optional </p>
          <button className="butonCard">Edit</button>
          <button className="butonCard">Deactivate</button>
          <button className="butonCard">Reactivate</button>
        </div>
      </ul>

    </div>
  )
}

export default UsersManagement
