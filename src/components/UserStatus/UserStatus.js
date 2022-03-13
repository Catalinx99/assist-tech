import React from 'react';
import { useEffect, useState } from "react";
import serviceApi from '../services';
import { userRoleLabel } from '../../Common/components/constants';

const UserStatus = () => {
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
  const [usersList, setUsersList] = useState([]);

  const getUsersList = () => {
    services.get('users').then((data) => {
      setUsersList(data);
    });
  }
  useEffect(() => {
    getUsersList();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div className="appContainer">
      <h2>User Status</h2>
      <table>
        <thead>
          <tr>
            <th>First name</th>
            <th>Last name</th>
            <th>Building name</th>
            <th>Office name</th>
            <th>Work remote</th>
            <th>Percentage of work remote</th>
            {loggedUser.role === userRoleLabel.adminType ? (
              <>
                <th>Gender</th>
                <th>Nationality</th>
                <th>Birth date</th>
              </>
            ) : null}
          </tr>
        </thead>
        <tbody>
          {usersList.map((user, index) => (
            <tr key={index}>
              <td>{user.firstName}</td>
              <td>{user.lastName}</td>
              <td>{user.buildingName}</td>
              <td>{user.officeName}</td>
              <td>{user.workRemote}</td>
              <td>
                {user.workRemote === "partially remote" ?
                  user.percentageOfWorkRemote : "-"
                }
              </td>
              {loggedUser.role === userRoleLabel.adminType ? (
                <>
                  <td>{user.gender}</td>
                  <td>{user.nationality}</td>
                  <td>{user.birthDate}</td>
                </>
              ) : null}

            </tr>
          ))}
        </tbody>

      </table>
    </div>
  )
}

export default UserStatus
