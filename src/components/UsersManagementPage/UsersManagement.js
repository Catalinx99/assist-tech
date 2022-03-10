import "./UsersManagement.css"
import { useState, Fragment, useEffect } from "react";
import ReadOnlyRow from "./ReadOnlyRow";
import EditableRow from "./EditableRow";
import serviceApi from '../services'


const UsersManagement = () => {
  const services = new serviceApi();
  const [contacts, setContacts] = useState([]);

  const getUsers = () => {
    services.get('users').then((data) => {
      setContacts(data);
    });
  }

  useEffect(() => {
    getUsers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);



  const [addFormData, setAddFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    role: '',
    gender: '',
    birthDate: '',
    nationality: ''
  })

  const [editFormData, setEditFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    role: '',
    gender: '',
    birthDate: '',
    nationality: '',
    status: ''
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
      firstName: addFormData.firstName,
      lastName: addFormData.lastName,
      email: addFormData.email,
      password: addFormData.password,
      role: addFormData.role,
      gender: addFormData.gender,
      birthDate: addFormData.birthDate,
      nationality: addFormData.nationality
    };

    services.post('users', newContact).then(() => {
      const newContacts = [...contacts, newContact];
      setContacts(newContacts);
    });

  };

  const handleEditFormSubmit = (event) => {
    event.preventDefault();

    const editedContact = {
      firstName: editFormData.firstName,
      lastName: editFormData.lastName,
      email: editFormData.email,
      password: editFormData.password,
      role: editFormData.role,
      gender: editFormData.gender,
      birthDate: editFormData.birthDate,
      nationality: editFormData.nationality,
      status: editFormData.status
    }

    services.put(`users/${editContactId}`, editedContact).then(() => {
      const newContacts = [...contacts];

      const index = contacts.findIndex((contact) => contact.id === editContactId);
      newContacts[index] = editedContact;
      setContacts(newContacts);
    })
  }

  const handleEditClick = (event, contact) => {
    event.preventDefault();
    setEditContactId(contact.id);

    const formValues = {
      firstName: contact.firstName,
      lastName: contact.lastName,
      email: contact.email,
      password: contact.password,
      role: contact.role,
      gender: contact.gender,
      birthDate: contact.birthDate,
      nationality: contact.nationality,
      status: contact.status
    }
    setEditFormData(formValues);
  }

  const handleCancelClick = () => {
    setEditContactId(null);
  }
  return (
    <div className="appContainer">
      <h2>Users Management</h2>
      <form onSubmit={handleEditFormSubmit} className="form">
        <table>
          <thead>
            <tr>
              <th> First Name </th>
              <th> Last Name </th>
              <th> Email address </th>
              <th> Password </th>
              <th> Role </th>
              <th> Gender </th>
              <th> Birth date </th>
              <th> Nationality </th>
              <th> Status </th>
              <th> Actions </th>
            </tr>
          </thead>
          <tbody>
            {contacts.map((contact) => (
              <>
                {editContactId === contact.id ?
                  (<EditableRow editFormData={editFormData}
                    handleEditFormChange={handleEditFormChange}
                    handleCancelClick={handleCancelClick} />) :
                  (<ReadOnlyRow contact={contact}
                    handleEditClick={handleEditClick} />)}
              </>
            ))}
          </tbody>
        </table>
      </form>
      <h2>Add a contact</h2>
      <form onSubmit={handleAddFormSubmit} className="addContact">
        <input
          type="text"
          name="firstName"
          required="required"
          placeholder="Enter first-name"
          onChange={handleAddFormChange}
        />
        <input
          type="text"
          name="lastName"
          required="required"
          placeholder="Enter last-name"
          onChange={handleAddFormChange}
        />
        <input
          type="email"
          name="email"
          required="required"
          placeholder="Enter an email"
          onChange={handleAddFormChange}
        />
        <input
          type="password"
          name="password"
          required="required"
          placeholder="Enter a password"
          onChange={handleAddFormChange}
        />
        <input
          type="text"
          name="role"
          required="required"
          placeholder="Enter a role"
          onChange={handleAddFormChange}
        />
        <input
          type="text"
          name="gender"
          required="required"
          placeholder="Enter a gender"
          onChange={handleAddFormChange}
        />
        <input
          type="text"
          name="birthDate"
          required="required"
          placeholder="Enter a birth-date"
          onChange={handleAddFormChange}
        />
        <input
          type="text"
          name="nationality"
          required="required"
          placeholder="Enter a nationality"
          onChange={handleAddFormChange}
        />
        <button type="submit" className="button">Add</button>
      </form>
    </div>
  )
}

export default UsersManagement
