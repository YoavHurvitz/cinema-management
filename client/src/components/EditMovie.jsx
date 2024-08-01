// src/components/EditMovie.jsx
import React, { useState, useEffect } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, TextField, Button } from '@mui/material';

function EditMovie({ movie, open, handleClose, updateMovie }) {
  const [editedMovie, setEditedMovie] = useState({
    name: '',
    yearPremiered: '',
    genres: [],
    imageUrl: ''
  });

  useEffect(() => {
    if (movie) {
      setEditedMovie(movie);
    }
  }, [movie]);

  const handleChange = (e) => {
    setEditedMovie({ ...editedMovie, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    updateMovie(editedMovie);
    handleClose();
  };

  if (!movie) {
    return null;
  }

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Edit Movie</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          name="name"
          label="Movie Name"
          type="text"
          fullWidth
          variant="standard"
          value={editedMovie.name}
          onChange={handleChange}
        />
        <TextField
          margin="dense"
          name="yearPremiered"
          label="Year Premiered"
          type="number"
          fullWidth
          variant="standard"
          value={editedMovie.yearPremiered}
          onChange={handleChange}
        />
        <TextField
          margin="dense"
          name="genres"
          label="Genres (comma-separated)"
          type="text"
          fullWidth
          variant="standard"
          value={editedMovie.genres.join(', ')}
          onChange={(e) => setEditedMovie({...editedMovie, genres: e.target.value.split(', ')})}
        />
        <TextField
          margin="dense"
          name="imageUrl"
          label="Image URL"
          type="text"
          fullWidth
          variant="standard"
          value={editedMovie.imageUrl}
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

export default EditMovie;