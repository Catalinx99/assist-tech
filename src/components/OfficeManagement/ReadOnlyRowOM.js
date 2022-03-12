import "../UsersManagementPage/UsersManagement.css"

const ReadOnlyRowOM = ({ office, handleEditClick, handleDeleteClick }) => {
  return (
    <tr>
      <td className='officeField'> {office.officeName} </td>
      <td className='officeField'> {office.buildingName} </td>
      <td className='officeField'> {office.floorNumber} </td>
      <td className='officeField'> {office.deskCount} </td>
      <td>
        <button type='button' onClick={(event) => handleEditClick(event, office)} className="button">
          Edit
        </button>
        <button type="button" className="button" onClick={() => handleDeleteClick(office.id)}> Delete </button>
      </td>
    </tr >
  )
}

export default ReadOnlyRowOM
