import * as React from 'react';
import Modal from '@mui/material/Modal';
import "./Modal.css";

const GenericModal = (props) => {
  return (
    <>
      <Modal
        open={props.open}
        onClose={() => props.onClose()}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <div className='modal'>
          <h3 id="modal-modal-title" variant="h6" component="h2">
            {props.title}
          </h3>
          <div className='modalChildren' id="modal-modal-description">
            {props.children}
          </div>
        </div>
      </Modal>
    </>
  );
}
export default GenericModal;