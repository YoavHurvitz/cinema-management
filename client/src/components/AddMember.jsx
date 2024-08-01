
import React, { useState } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, TextField, Button } from '@mui/material';

function AddMember({ open, handleClose, addMember }) {
  const [newMember, setNewMember] = useState({
    name: '',
    email: '',
    city: ''
  
  });

  const handleChange = (e) => {
    setNewMember({ ...newMember, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    addMember(newMember);
    handleClose();
    setNewMember({ name: '', email: '', city: '' }); // Reset form
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Add New Member</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          name="name"
          label="Name"
          type="text"
          fullWidth
          variant="standard"
          value={newMember.name}
          onChange={handleChange}
        />
        <TextField
          margin="dense"
          name="email"
          label="Email"
          type="email"
          fullWidth
          variant="standard"
          value={newMember.email}
          onChange={handleChange}
        />
        <TextField
          margin="dense"
          name="city"
          label="City"
          type="text"
          fullWidth
          variant="standard"
          value={newMember.city}
          onChange={handleChange}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button onClick={handleSubmit}>Add Member</Button>
      </DialogActions>
    </Dialog>
  );
}

export default AddMember;