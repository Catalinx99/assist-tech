/* eslint-disable eqeqeq */
import "../UsersManagementPage/UsersManagement.css";

const ReadOnlyRowBM = ({ building, handleEditClick, handleDeleteClick }) => {
  return (
    <tr>
      <td className='buildingField'> {building.name} </td>
      <td className='buildingField'> {building.floorsCount} </td>
      <td className='buildingField'> {building.address} </td>
      <td>
        <button type='button' onClick={(event) => handleEditClick(event, building)} className="button">
          Edit
        </button>
        <button type='button' onClick={() => handleDeleteClick(building.id)} className="button">
          Delete
        </button>
      </td>
    </tr >
  );
};

export default ReadOnlyRowBM
