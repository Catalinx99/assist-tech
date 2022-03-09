/* eslint-disable eqeqeq */
import React from 'react'
import "./UsersManagement.css"

const ReadOnlyRow = ({ contact, handleEditClick }) => {
  return (
    <tr className={contact.status === "false" ? 'deactivated' : ''}>
      <td className='contactField'> {contact.firstName} </td>
      <td className='contactField'> {contact.lastName} </td>
      <td className='contactField'> {contact.email} </td>
      <td className='contactField hidetext'> {contact.password} </td>
      <td className='contactField'> {contact.role} </td>
      <td className='contactField'> {contact.gender} </td>
      <td className='contactField'> {contact.birthDate} </td>
      <td className='contactField'> {contact.nationality} </td>
      <td className='contactField'> {contact.status} </td>
      <td>
        <button type='button' onClick={(event) => handleEditClick(event, contact)}>
          Edit
        </button>
      </td>
    </tr >
  );
};

export default ReadOnlyRow
