import React, { useState } from 'react';
import { Box, Button, FormControl, InputLabel, Select, MenuItem, TextField } from '@mui/material';

function AddSubscription({ movies, onSubscribe, memberId, onClose }) {
  const [selectedMovie, setSelectedMovie] = useState('');
  const [watchDate, setWatchDate] = useState('');

  const handleSubmit = () => {
    if (selectedMovie && watchDate) {
      const formattedDate = new Date(watchDate).toISOString();
      onSubscribe(selectedMovie, formattedDate);
      setSelectedMovie('');
      setWatchDate('');
      if (onClose && typeof onClose === 'function') {
        onClose();  // Only call onClose if it's provided and is a function
      }
    }
  };

  return (
    <Box sx={{ mt: 2 }}>
      <FormControl fullWidth sx={{ mb: 2 }}>
        <InputLabel id="movie-select-label">Select Movie</InputLabel>
        <Select
          labelId="movie-select-label"
          value={selectedMovie}
          label="Select Movie"
          onChange={(e) => setSelectedMovie(e.target.value)}
        >
          {movies.map((movie) => (
            <MenuItem key={movie._id} value={movie._id}>
              {movie.name}
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
        Subscribe
      </Button>
      {onClose && typeof onClose === 'function' && (
        <Button variant="outlined" color="secondary" onClick={onClose} fullWidth sx={{ mt: 1 }}>
          Cancel
        </Button>
      )}
    </Box>
  );
}

export default AddSubscription;