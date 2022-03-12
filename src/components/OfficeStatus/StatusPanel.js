import React from 'react'

const StatusPanel = ({
  selectedOffice,
  goBack,
  loggedUserRole
}) => {
  return (
    <div className="status-wrapper">
      <div className="status-wrapper-row">
        <div>Office Name: </div>
        <div className="status-data">
          {selectedOffice.officeName}
        </div>
      </div>
      <div className="status-wrapper-row">
        <div>Building Name: </div>
        <div className="status-data">
          <div>{selectedOffice.buildingName}</div>
        </div>
      </div>
      <div className="status-wrapper-row">
        <div>Floor number: </div>
        <div className="status-data">
          <div>{selectedOffice.floorNumber}</div>
        </div>
      </div>
      <div className="status-wrapper-row">
        <div>Office administrator: </div>
        <div className="status-data">
          <div>{selectedOffice.officeAdministrator}</div>
        </div>
      </div>
      <div className="status-wrapper-row">
        <div>Members: </div>
        <div className="status-data">
          <ul>
            {selectedOffice.membersList.map((member, index) => (
              <li key={index}>{member}</li>
            ))}
          </ul>
        </div>
      </div>
      <div className="status-wrapper-row">
        <div>Desks count: </div>
        <div className="status-data">
          <div>{selectedOffice.deskCount}</div>
        </div>
      </div>
      <div className="status-wrapper-row">
        <div>Usable desks: </div>
        <div className="status-data">
          <div>{selectedOffice.usableDesksCount}</div>
        </div>
      </div>
      <div className="status-wrapper-row">
        <div>Occupied desks: </div>
        <div className="status-data">
          <div>{selectedOffice.occupiedDesksCount}</div>
        </div>
      </div>
      <div className="status-wrapper-row">
        <div>Free Desks: </div>
        <div className="status-data">
          <div>{selectedOffice.usableDesksCount - selectedOffice.occupiedDesksCount}</div>
        </div>
      </div>
      <div className="status-wrapper-row">
        <div>Occupation percentage: </div>
        <div className="status-data">
          <div>{`${Number(selectedOffice.occupiedDesksCount / selectedOffice.usableDesksCount).toFixed(2)
            }%`}</div>
        </div>
      </div>


      {loggedUserRole !== 'user' ?
        <button onClick={() => goBack()}>Back</button> : null
      }
    </div>
  )
}

export default StatusPanel