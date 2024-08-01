// src/components/MovieSearch.jsx
import React, { useState } from 'react';
import { TextField, Button, Box } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

function MovieSearch({ onSearch }) {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = () => {
    onSearch(searchTerm);
  };

  return (
    <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
      <TextField
        variant="outlined"
        size="small"
        placeholder="Enter movie name"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
        sx={{ flexGrow: 1, mr: 1 }}
      />
      <Button
        variant="contained"
        color="primary"
        onClick={handleSearch}
        startIcon={<SearchIcon />}
      >
        Find
      </Button>
    </Box>
  );
}

export default MovieSearch;