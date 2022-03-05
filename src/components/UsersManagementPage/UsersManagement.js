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
      fullName: addFormData.fullName,
      address: addFormData.address,
      phoneNumber: addFormData.phoneNumber,
      email: addFormData.email,
    };

    services.post('users', newContact).then(() => {
      const newContacts = [...contacts, newContact];
      setContacts(newContacts);
    });

  };

  const handleEditFormSubmit = (event) => {
    event.preventDefault();

    const editedContact = {
      fullName: editFormData.fullName,
      address: editFormData.address,
      phoneNumber: editFormData.phoneNumber,
      email: editFormData.email
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
      <form onSubmit={handleEditFormSubmit} className="form">
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
    </div>
  )
}

export default UsersManagement
