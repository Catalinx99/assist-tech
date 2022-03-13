/* eslint-disable eqeqeq */
import "../UsersManagementPage/UsersManagement.css";

const ReadOnlyRowBM = ({
  building,
  handleEditClick,
  handleDeleteClick,
  offices
}) => {
  const filteredOffices = offices.filter((office) => {
    return office.buildingId === building.id
  })
  const officeIsEmpty = filteredOffices.filter((item) => {
    return item.occupiedDesksCount !== 0
  })
  return (
    <tr>
      <td className='buildingField'> {building.name} </td>
      <td className='buildingField'> {building.floorsCount} </td>
      <td className='buildingField'> {building.address} </td>
      <td>
        <button
          type='button'
          onClick={(event) => handleEditClick(event, building)}
          className="button"
        >
          Edit
        </button>
        <button
          type='button'
          onClick={() => officeIsEmpty.length === 0 && handleDeleteClick(building.id)}
          className="button"
          disabled={officeIsEmpty.length > 0}
        >
          Delete
        </button>
      </td>
    </tr >
  );
};

export default ReadOnlyRowBM
