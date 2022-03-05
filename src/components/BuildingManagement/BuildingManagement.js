import { useState } from "react"
import "../UsersManagementPage/UsersManagement.css";
import { buildingItems } from "../../Common/components/constants";

const BuildingManagement = () => {
  const [buildings, setBuidings] = useState();
  return (
    <div className="appContainer">
      <h2>Buildings Management</h2>
      <table>
        <thead>
          <tr>
            <th>Building name</th>
            <th>Floors count</th>
            <th>Building address</th>
          </tr>
        </thead>
        <tbody>
          {buildingItems.map((building, index) =>
            <tr key={index}>
              <td>{building.name}</td>
              <td>{building.floorsCount}</td>
              <td>{building.address}</td>
            </tr>

          )}
        </tbody>
      </table>
    </div>
  )
}

export default BuildingManagement;
