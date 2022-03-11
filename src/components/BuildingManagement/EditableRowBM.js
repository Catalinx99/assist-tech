import "../UsersManagementPage/UsersManagement.css";

const EditableRowBM = ({ editFormData, handleEditFormChange, handleCancelClick }) => {
  return (
    <tr className='inputs'>
      <td>
        <input
          type="text"
          required="required"
          placeholder="Enter building name"
          name="name"
          value={editFormData.name}
          onChange={handleEditFormChange} />
      </td>
      <td>
        <input
          type="number"
          required="required"
          placeholder="Enter floors counts"
          name="floorsCount"
          value={editFormData.floorsCount}
          onChange={handleEditFormChange} />
      </td>
      <td>
        <input
          type="address"
          required="required"
          placeholder='Enter the address'
          name="address"
          value={editFormData.address}
          onChange={handleEditFormChange} />
      </td>
      <td>
        <button type="submit" className="button"> Save </button>
        <button type="button" onClick={handleCancelClick} className="button">
          Cancel </button>
      </td>
    </tr >
  )
}

export default EditableRowBM
