import React, { useState } from 'react';
import { Box, Button, FormControl, InputLabel, Select, MenuItem, TextField } from '@mui/material';

function AddMemberSubscription({ members, onSubscribe, movieId, onClose }) {
  const [selectedMember, setSelectedMember] = useState('');
  const [watchDate, setWatchDate] = useState('');

  const handleSubmit = () => {
    if (selectedMember && watchDate) {
      const formattedDate = new Date(watchDate).toISOString();
      onSubscribe(selectedMember, formattedDate);
      setSelectedMember('');
      setWatchDate('');
      if (onClose) {
        onClose();
      }
    }
  };

  return (
    <Box sx={{ mt: 2 }}>
      <FormControl fullWidth sx={{ mb: 2 }}>
        <InputLabel id="member-select-label">Select Member</InputLabel>
        <Select
          labelId="member-select-label"
          value={selectedMember}
          label="Select Member"
          onChange={(e) => setSelectedMember(e.target.value)}
        >
          {members.map((member) => (
            <MenuItem key={member._id} value={member._id}>
              {member.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <TextField
        label="Watch Date"
        type="date"
        value={watchDate}
        onChange={(e) => setWatchDate(e.target.value)}
        fullWidth
        InputLabelProps={{
          shrink: true,
        }}
        sx={{ mb: 2 }}
      />
      <Button variant="contained" color="primary" onClick={handleSubmit} fullWidth>
        Add Subscription
      </Button>
      {onClose && (
        <Button variant="outlined" color="secondary" onClick={onClose} fullWidth sx={{ mt: 1 }}>
          Cancel
        </Button>
      )}
    </Box>
  );
}

export default AddMemberSubscription;