import { useState } from "react"
import data from "../Users Management Page/MockData.json";
import "../Users Management Page/UsersManagement.css";

const BuildingManagement = () => {
  const [buildings, setBuidings] = useState(data);
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
          {buildings.map((building, index) =>
            <tr key={index}>
              <td>{building.fullName}</td>
              <td> {building.phoneNumber} </td>
              <td>{building.address}</td>
            </tr>
          )}
        </tbody>
      </table>

    </div>
  )
}

export default BuildingManagement
