import React from 'react'
import "./UsersManagement.css"

const ReadOnlyRow = ({ contact, handleEditClick }) => {
  return (
    <tr className={contact.status === false ? 'deactivated' : ''}>
      <td className='contactField'> {contact.fullName} </td>
      <td className='contactField'> {contact.address} </td>
      <td className='contactField'> {contact.phoneNumber} </td>
      <td className='contactField'> {contact.email} </td>
      <td>
        <button type='button' onClick={(event) => handleEditClick(event, contact)}>
          Edit
        </button>
      </td>
    </tr>
  );
};

export default ReadOnlyRow
