import React from 'react'
import "./UsersManagement.css";

const EditableRow = ({ editFormData, handleEditFormChange, handleCancelClick }) => {
  return (
    <tr className='inputs'>
      <td>
        <input
          type="text"
          required="required"
          placeholder='Enter first-name'
          name='firstName'
          value={editFormData.firstName}
          onChange={handleEditFormChange} />
      </td>
      <td>
        <input
          type="text"
          required="required"
          placeholder='Enter a last-name'
          name='lastName'
          value={editFormData.lastName}
          onChange={handleEditFormChange} />
      </td>
      <td>
        <input
          type="email"
          required="required"
          placeholder='Enter an email'
          name='email'
          value={editFormData.email}
          onChange={handleEditFormChange} />
      </td>
      <td>
        <input
          type="password"
          required="required"
          placeholder='Enter a password'
          name='password'
          value={editFormData.password}
          onChange={handleEditFormChange} />
      </td>
      <td>
        <input
          type="text"
          required="required"
          placeholder='Enter an role'
          name='role'
          value={editFormData.role}
          onChange={handleEditFormChange} />
      </td>
      <td>
        <input
          type="text"
          required="required"
          placeholder='Enter a gender'
          name='gender'
          value={editFormData.gender}
          onChange={handleEditFormChange} />
      </td>
      <td>
        <input
          type="date"
          required="required"
          placeholder='Enter a birth-date'
          name='birthDate'
          value={editFormData.birthDate}
          onChange={handleEditFormChange} />
      </td>
      <td>
        <input
          type="text"
          required="required"
          placeholder='Enter a nationality'
          name='nationality'
          value={editFormData.nationality}
          onChange={handleEditFormChange} />
      </td>
      <td>
        <input
          type="text"
          required="required"
          placeholder='Enter a status'
          name='status'
          value={editFormData.status}
          onChange={handleEditFormChange} />
      </td>
      <td>
        <button type='submit' className="button"> Save </button>
        <button type='button' onClick={handleCancelClick} className="button">
          Cancel </button>
      </td>
    </tr >
  )
}

export default EditableRow
