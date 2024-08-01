// src/components/AddMovie.jsx
import React, { useState } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, TextField, Button, Chip, Box } from '@mui/material';

function AddMovie({ open, handleClose, addMovie }) {
  const [newMovie, setNewMovie] = useState({
    name: '',
    yearPremiered: '',
    genres: [],
    imageUrl: ''
  });
  const [genreInput, setGenreInput] = useState('');

  const handleChange = (e) => {
    setNewMovie({ ...newMovie, [e.target.name]: e.target.value });
  };

  const handleAddGenre = () => {
    if (genreInput && !newMovie.genres.includes(genreInput)) {
      setNewMovie({ ...newMovie, genres: [...newMovie.genres, genreInput] });
      setGenreInput('');
    }
  };

  const handleRemoveGenre = (genreToRemove) => {
    setNewMovie({
      ...newMovie,
      genres: newMovie.genres.filter(genre => genre !== genreToRemove)
    });
  };

  const handleSubmit = () => {
    addMovie(newMovie);
    handleClose();
  };

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
      <DialogTitle>Add New Movie</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          name="name"
          label="Movie Name"
          type="text"
          fullWidth
          variant="outlined"
          value={newMovie.name}
          onChange={handleChange}
        />
        <TextField
          margin="dense"
          name="yearPremiered"
          label="Year Premiered"
          type="number"
          fullWidth
          variant="outlined"
          value={newMovie.yearPremiered}
          onChange={handleChange}
        />
        <TextField
          margin="dense"
          name="imageUrl"
          label="Image URL"
          type="text"
          fullWidth
          variant="outlined"
          value={newMovie.imageUrl}
          onChange={handleChange}
        />
        <Box sx={{ mt: 2, mb: 1 }}>
          <TextField
            label="Add Genre"
            variant="outlined"
            size="small"
            value={genreInput}
            onChange={(e) => setGenreInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleAddGenre()}
          />
          <Button onClick={handleAddGenre} variant="contained" sx={{ ml: 1 }}>
            Add
          </Button>
        </Box>
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
          {newMovie.genres.map((genre, index) => (
            <Chip
              key={index}
              label={genre}
              onDelete={() => handleRemoveGenre(genre)}
            />
          ))}
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button onClick={handleSubmit} variant="contained">Add Movie</Button>
      </DialogActions>
    </Dialog>
  );
}

export default AddMovie;