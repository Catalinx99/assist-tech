import React, { useState } from 'react';
import { userRoleLabel } from '../../Common/components/constants';
import StatusPanelModal from './StatusPanelModal';
import GenericModal from '../../Common/modal/Modal';
import serviceApi from '../services';


const StatusPanel = ({
  selectedOffice,
  goBack,
  loggedUserRole,

}) => {
  const [open, setOpen] = React.useState(false);
  const [officeSelected, setOfficeSelected] = useState(selectedOffice);
  const services = new serviceApi();


  const handleOffices = (data, type) => {
    const newFormattedOffice = {
      officeName: data.officeName,
      buildingName: data.buildingName,
      floorNumber: Number(data.floorNumber),
      officeAdministrator: data.officeAdministrator,
      membersList: data.membersList,
      deskCount: Number(data.deskCount),
      usableDesksCount: Number(data.usableDesksCount),
      occupiedDesksCount: Number(data.occupiedDesksCount)
    }
    services.put(`offices/${officeSelected.id}`, newFormattedOffice).then(() => {
      setOfficeSelected(newFormattedOffice);
      setOpen(false);
    })
  }

  return (
    <div className="status-wrapper">
      <div className="status-wrapper-row">
        <div>Office Name: </div>
        <div className="status-data">
          {officeSelected.officeName}
        </div>
      </div>
      <div className="status-wrapper-row">
        <div>Building Name: </div>
        <div className="status-data">
          <div>{officeSelected.buildingName}</div>
        </div>
      </div>
      <div className="status-wrapper-row">
        <div>Floor number: </div>
        <div className="status-data">
          <div>{officeSelected.floorNumber}</div>
        </div>
      </div>
      <div className="status-wrapper-row">
        <div>Office administrator: </div>
        <div className="status-data">
          <div>{officeSelected.officeAdministrator}</div>
        </div>
      </div>
      <div className="status-wrapper-row">
        <div>Members: </div>
        <div className="status-data">
          <ul>
            {officeSelected.membersList.map((member, index) => (
              <li key={index}>{member}</li>
            ))}
          </ul>
        </div>
      </div>
      <div className="status-wrapper-row">
        <div>Desks count: </div>
        <div className="status-data">
          <div>{officeSelected.deskCount}</div>
        </div>
      </div>
      <div className="status-wrapper-row">
        <div>Usable desks: </div>
        <div className="status-data">
          <div>{officeSelected.usableDesksCount}</div>
        </div>
      </div>
      <div className="status-wrapper-row">
        <div>Occupied desks: </div>
        <div className="status-data">
          <div>{officeSelected.occupiedDesksCount}</div>
        </div>
      </div>
      <div className="status-wrapper-row">
        <div>Free Desks: </div>
        <div className="status-data">
          <div>{officeSelected.usableDesksCount - officeSelected.occupiedDesksCount}</div>
        </div>
      </div>
      <div className="status-wrapper-row">
        <div>Occupation percentage: </div>
        <div className="status-data">
          <div>{`${Number(officeSelected.occupiedDesksCount / officeSelected.usableDesksCount).toFixed(2)
            }%`}</div>
        </div>
      </div>

      <div className='action-btns'>
        {loggedUserRole === userRoleLabel.adminType ?
          <button
            onClick={(event) => {
              setOpen(true);
            }}
          >
            Edit
          </button> : null
        }
        {loggedUserRole !== userRoleLabel.employeeType ?
          <button className="backbtn" onClick={() => goBack()}>Back</button> : null
        }

        <GenericModal
          open={open}
          onClose={() => setOpen(false)}
          title='Edit office'>
          <StatusPanelModal
            onClose={() => setOpen(false)}
            handleOffices={handleOffices}
            officeSelected={officeSelected}
          />
        </GenericModal>

      </div>
    </div>
  )
}

export default StatusPanel