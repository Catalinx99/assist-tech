import React from 'react'
import { useEffect, useState } from "react";
import serviceApi from "../services"
import './RequestToWorkRemote.css'
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Slider from '@mui/material/Slider';
import TextareaAutosize from '@mui/material/TextareaAutosize';
import { Button } from '@mui/material';



const RequestToWorkRemote = () => {
  const services = new serviceApi();
  const [requests, setRequests] = useState([]);


  // const localUserData = localStorage.getItem('user');
  const loggedUserId = 1; // this will be from localUserData.id


  const [requestsForm, setRequestsForm] = useState({
    percentage: '',
    reason: '',
    pendingStatus: true,
    approvedStatus: false,
    rejectedStatus: false,
    userId: loggedUserId,
  });


  const getRequests = () => {
    // /userId from logged user -> localStorage
    services.get(`requestsRemote?userId=${loggedUserId}`).then((data) => {
      setRequests(data);
    })
  }
  const createRequest = (data) => {
    services.post(`requestsRemote`, data).then((res) => {
      getRequests();
    })
  }

  const handleChange = (event) => {
    event.preventDefault();
    const fieldName = event.target.name;
    const fieldValue = event.target.value;

    const newFormData = { ...requestsForm };
    newFormData[fieldName] = fieldValue;

    setRequestsForm(newFormData);
  };

  const percentageValue = (value) => {
    return `${value}%`;
  }
  useEffect(() => {
    getRequests();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <div className='appContainer'>
      <h2> Request work remote </h2>
      {requests && requests.length > 0 ? (
        <div className="cardWrapper">
          <Card sx={{ minWidth: 275, maxWidth: 700 }}>
            <CardContent>
              <Typography sx={{ fontSize: 20 }} color="text.secondary" gutterBottom>
                Request informations
              </Typography>{
                requests.map(item => (
                  <div key={item.id}>
                    <Typography sx={{ mb: 1.5, fontSize: 17 }} color="text.secondary">
                      Remote work time: {item.percentage} %
                    </Typography>
                    <Typography sx={{ mb: 1.5, fontSize: 17 }} color="text.secondary">
                      Reason: {item.reason}
                    </Typography>
                    <Typography sx={{ mb: 1.5, fontSize: 17 }} color="text.secondary">
                      Status: {item.pendingStatus === true && (
                        <span className='pending'>Pending</span>
                      )}
                      {item.approvedStatus === true && (
                        <span className='approved'>Approved</span>
                      )}
                      {item.rejectedStatus === true && (
                        <span className='rejected'>Rejected</span>
                      )}
                    </Typography>
                  </div>
                ))
              }
            </CardContent>
          </Card>
        </div>
      ) : (
        <div className="cardWrapper">
          <Card sx={{ minWidth: 275, maxWidth: 700 }}>
            <CardContent>
              <Typography sx={{ fontSize: 20 }} color="text.secondary" gutterBottom>
                Request informations
              </Typography>
              <p>Work time</p>
              <Slider
                name="percentage"
                aria-label="Percentage"
                defaultValue={0}
                getAriaValueText={percentageValue}
                valueLabelDisplay="auto"
                step={10}
                marks
                min={10}
                max={100}
                onChange={handleChange}
              />
              <TextareaAutosize
                name="reason"
                aria-label="Reason"
                minRows={3}
                placeholder="Please tell us the reason"
                style={{ width: 650 }}
                onChange={handleChange}
              />
              <br />
              <div className='modalButtonsWrapper'>
                <Button
                  variant="contained"
                  color="success"
                  type="submit"
                  className="modalButton"
                  onClick={() => createRequest(requestsForm)}
                >
                  Create
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  )
}

export default RequestToWorkRemote
