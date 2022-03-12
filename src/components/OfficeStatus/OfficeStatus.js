import { useEffect, useState } from "react";
import serviceApi from "../services";
import "./OfficeStatus.css";
import StatusPanel from "./StatusPanel";

const OfficeStatus = () => {
  const services = new serviceApi();
  const [loggedUser, setLoggedUser] = useState({
    firstName: "Catalin",
    lastName: "Prisacaru",
    email: "p.catalinv@yahoo.com",
    // role: "user",
    role: "Administrator",
    gender: "male",
    status: false,
    id: 1,
    officeId: 2
  });
  const [viewStatus, setViewStatus] = useState(false);
  const [officesList, setOfficesList] = useState([]);
  const [selectedOffice, setSelectedOffice] = useState({});

  const getOfficeStatus = () => {
    if (loggedUser.role === 'user') {
      setViewStatus(true);
      services.get(`offices/${loggedUser.officeId}`).then((response) => {
        setSelectedOffice(response);
      });
    } else {
      services.get('offices').then((data) => {
        setOfficesList(data);
      });
    }
  }

  const handleViewStatus = (office) => {
    setSelectedOffice(office);
    setViewStatus(true);
  }

  const goBack = () => {
    setViewStatus(false);
    setSelectedOffice({});
  }

  useEffect(() => {
    getOfficeStatus();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="officeStatus-wrapper">
      {viewStatus ? (
        <StatusPanel
          selectedOffice={selectedOffice}
          goBack={goBack}
          loggedUserRole={loggedUser.role}
        />
      ) : (
        <div className="table-wrapper">
          <table>
            <thead>
              <tr>
                <th> Office name </th>
                <th> Building name</th>
                <th> Floor number</th>
                <th> Office administrator </th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {officesList.map((office, key) => (
                <tr key={key}>
                  <td>{office.officeName}</td>
                  <td>{office.buildingName}</td>
                  <td>{office.floorNumber}</td>
                  <td>{office.officeAdministrator}</td>
                  <td>
                    <button onClick={() => handleViewStatus(office)}>View status</button>
                  </td>
                </tr>
              )
              )}
            </tbody>
          </table>
        </div>
      )}

    </div>
  )
}

export default OfficeStatus
