import "../UsersManagementPage/UsersManagement.css";

const EditableRowOM = ({ editFormData, handleEditFormChange, handleCancelClick }) => {
  return (
    <tr className='inputs'>
      <td>
        <input
          type="text"
          required="required"
          placeholder='Enter an office name'
          name='officeName'
          value={editFormData.officeName}
          onChange={handleEditFormChange} />
      </td>
      <td>
        <input
          type="number"
          required="required"
          placeholder='Enter a floor number '
          name='floorNumber'
          value={editFormData.floorNumber}
          onChange={handleEditFormChange} />
      </td>
      <td>
        <input
          type="number"
          required="required"
          placeholder='Enter a floor number '
          name='floorNumber'
          value={editFormData.floorNumber}
          onChange={handleEditFormChange} />
      </td>
      <td>
        <input
          type="number"
          required="required"
          placeholder='Enter a desk '
          name='deskCount'
          value={editFormData.deskCount}
          onChange={handleEditFormChange} />
      </td>
      <td>
        <button type="submit" className="button"> Save </button>
        <button type='button' onClick={handleCancelClick} className="button">
          Cancel </button>
      </td>
    </tr >
  )
}

export default EditableRowOM
