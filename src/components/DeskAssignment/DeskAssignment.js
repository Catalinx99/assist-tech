import React, { useEffect, useState } from 'react'
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import serviceApi from '../services';
import './DeskAssignment.css';
import { userRoleLabel } from '../../Common/components/constants';

const DeskAssignment = () => {
  const services = new serviceApi();
  const [usersList, setUsersList] = useState([]);
  const [officesList, setOfficesList] = useState([]);
  const [loggedUser, setLoggedUser] = useState({
    firstName: "Catalin",
    lastName: "Prisacaru",
    email: "p.catalinv@yahoo.com",
    // role: "user",
    // role: "officeAdministrator",
    role: "Administrator",
    gender: "male",
    status: false,
    id: 1,
    officeId: 2
  });

  const getUsersList = () => {
    services.get('users').then((data) => {
      setUsersList(data);
    })
  }
  const getOfficesList = () => {
    services.get('offices').then((offices) => {
      let shownOffices = null;
      if(loggedUser.role === userRoleLabel.adminType ) {
        shownOffices = offices
      } else {
        shownOffices = offices.filter((office) => {
          return (office.officeAdministrator === loggedUser.firstName + " " + loggedUser.lastName)
        })
      }
      const freeOfficeDesk = shownOffices.filter((office) => {
        return (office.usableDesksCount > office.occupiedDesksCount)
      })

      setOfficesList(freeOfficeDesk);
    })
  }

  useEffect(() => {
    getUsersList();
    getOfficesList();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      <Autocomplete
        id="country-select-demo"
        disableClearable
        sx={{ width: 300 }}
        options={usersList}
        getOptionLabel={(option) => {
          return (`${option.firstName} ${option.lastName}`)
        }}
        renderInput={(params) => (
          <TextField
            {...params}
            label="Search user"
            InputProps={{
              ...params.InputProps,
              type: 'search',
            }}
          />
        )}
      />
      <Autocomplete
        id="country-select-demo"
        disableClearable
        sx={{ width: 300 }}
        options={officesList}
        getOptionLabel={(option) => option.officeName}
        renderInput={(params) => (
          <TextField
            {...params}
            label="Search office"
            InputProps={{
              ...params.InputProps,
              type: 'search',
            }}
          />
        )}
      />
    </div>
  )
}

export default DeskAssignment
