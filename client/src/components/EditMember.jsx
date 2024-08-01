
import React, { useState, useEffect } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, TextField, Button } from '@mui/material';

function EditMember({ member, open, handleClose, updateMember }) {
  const [editedMember, setEditedMember] = useState({
    name: '',
    email: '',
    city: ''
  });

  useEffect(() => {
    if (member) {
      setEditedMember(member);
    }
  }, [member]);

  const handleChange = (e) => {
    setEditedMember({ ...editedMember, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    updateMember({...editedMember, _id: member._id});
    handleClose();
  };
  if (!member) {
    return null;
  }

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Edit Member</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          name="name"
          label="Name"
          type="text"
          fullWidth
          variant="standard"
          value={editedMember.name}
          onChange={handleChange}
        />
        <TextField
          margin="dense"
          name="email"
          label="Email"
          type="email"
          fullWidth
          variant="standard"
          value={editedMember.email}
          onChange={handleChange}
        />
        <TextField
          margin="dense"
          name="city"
          label="City"
          type="text"
          fullWidth
          variant="standard"
          value={editedMember.city}
          onChange={handleChange}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button onClick={handleSubmit}>Save</Button>
      </DialogActions>
    </Dialog>
  );
}

export default EditMember;