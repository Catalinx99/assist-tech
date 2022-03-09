import { useEffect, useState } from "react"
import "../UsersManagementPage/UsersManagement.css";
import serviceApi from "../services";

const BuildingManagement = () => {
  const service = new serviceApi();
  const [buildings, setBuidings] = useState([]);
  const getBuildings = () => {
    service.get('buildings').then((data) => {
      setBuidings(data);
    })
  }
  useEffect(() => {
    getBuildings();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
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
