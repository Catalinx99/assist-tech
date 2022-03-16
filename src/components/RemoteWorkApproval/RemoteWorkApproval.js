import React from 'react'
import { useEffect, useState } from "react";
import serviceApi from "../services"
import { DataGrid } from '@mui/x-data-grid';
import "../UsersManagementPage/UsersManagement.css"
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';
import DeleteIcon from '@mui/icons-material/Delete';

const RemoteWorkApproval = () => {

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };


  const services = new serviceApi();
  const [requestsRemote, setRequestsRemote] = useState([]);
  // const localStorageData = JSON.parse(localStorage.getItem('user'));
  // const [selectedUsers, setSelectedUsers] = useState({});


  const handleDeclineClick = (data) => {
    const body = {
      ...data,
      pendingStatus: false,
      rejectedStatus: true,
    }
    services.put(`requestsRemote/${data.id}`, body).then(() => {
      const newRequests = [...requestsRemote];
      const index = requestsRemote.findIndex((request) => request.id === data.id);
      newRequests.splice(index, 1);
      setRequestsRemote(newRequests);
    })
  }

  const handleAcceptClick = (data) => {
    const body = {
      ...data,
      pendingStatus: false,
      approvedStatus: true
    }
    services.put(`requestsRemote/${data.id}`, body).then(() => {
      const newRequests = [...requestsRemote];
      const index = requestsRemote.findIndex((request) => request.id === data.id);
      newRequests.splice(index, 1);
      setRequestsRemote(newRequests);
    })
  }

  const columns = [
    { field: 'name', headerName: 'User name', width: 280, headerAlign: 'center', align: 'center' },
    { field: 'percentage', headerName: 'Percentage', width: 260, headerAlign: 'center', align: 'center' },
    { field: 'reason', headerName: 'Reason', width: 260, headerAlign: 'center', align: 'center' },
    {
      field: "Accept",
      renderCell: (cellValues) => {
        return (
          <Button
            variant="outlined"
            color="inherit"
            className="button accept"
            onClick={(event) => handleAcceptClick(cellValues.row)}
          >
            Accept
          </Button >
        );
      },
      width: 180, disableColumnMenu: true, sortable: false, headerAlign: 'center', align: 'center'
    },
    {
      field: "Decline",
      renderCell: (cellValues) => {
        return (
          <>
            <Button
              variant="outlined"
              color="inherit"
              className="button decline"
              endIcon={<DeleteIcon />}
              onClick={() => handleClickOpen(cellValues.row)}
            >
              Delete
            </Button>
            <Dialog open={open} onClose={handleClose} >
              <DialogTitle>Do you want to decline this request?</DialogTitle>
              <DialogContent >
                <DialogContentText>
                  Reason :
                </DialogContentText>
                <TextField
                  autoFocus
                  margin="dense"
                  label="Reason"
                  type="text"
                  fullWidth
                />
              </DialogContent>
              <DialogActions>
                <Button onClick={() => {
                  handleClose()
                  handleDeclineClick()
                  console.log('handleDeclineClick', handleDeclineClick)
                }}
                >
                  Send
                </Button>
              </DialogActions>
            </Dialog>

          </>

        );
      },
      width: 180, disableColumnMenu: true, sortable: false, headerAlign: 'center', align: 'center'
    }

  ]



  const getRequestsRemote = () => {
    // services.get(`requestsRemote?userId=${localStorageData.id}`).then((data) => {
    //   getRequestsRemote(data);
    // })
    services.get('requestsRemote').then((data) => {
      const filteredData = data.filter((item) => item.pendingStatus === true)
      setRequestsRemote(filteredData);
    });
  }

  useEffect(() => {
    getRequestsRemote();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className='appContainer'>
      <h2> Remote Work Approval </h2>
      <div style={{ width: '80%', display: 'flex', alignSelf: 'center' }}>
        <DataGrid rows={requestsRemote} columns={columns} autoHeight />
      </div>
    </div>
  )
}

export default RemoteWorkApproval
