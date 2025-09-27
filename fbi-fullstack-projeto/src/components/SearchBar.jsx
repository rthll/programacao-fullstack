import React from 'react';
import {
  TextField,
  InputAdornment,
  IconButton,
  Paper,
} from '@mui/material';
import { Search, Clear } from '@mui/icons-material';

const SearchBar = ({ searchTerm, onSearchChange, onClear }) => {
  return (
    <Paper 
      elevation={2}
      sx={{ 
        p: 1,
        borderRadius: 3,
        mb: 3,
      }}
    >
      <TextField
        fullWidth
        variant="outlined"
        placeholder="Buscar por nome, crime ou características..."
        value={searchTerm}
        onChange={(e) => onSearchChange(e.target.value)}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <Search color="action" />
            </InputAdornment>
          ),
          endAdornment: searchTerm && (
            <InputAdornment position="end">
              <IconButton
                onClick={onClear}
                size="small"
                sx={{ 
                  color: 'text.secondary',
                  '&:hover': {
                    color: 'text.primary',
                  },
                }}
              >
                <Clear />
              </IconButton>
            </InputAdornment>
          ),
          sx: {
            '& .MuiOutlinedInput-notchedOutline': {
              border: 'none',
            },
            '&:hover .MuiOutlinedInput-notchedOutline': {
              border: 'none',
            },
            '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
              border: '2px solid',
              borderColor: 'primary.main',
            },
          },
        }}
        sx={{
          '& .MuiInputBase-root': {
            borderRadius: 2,
          },
        }}
      />
    </Paper>
  );
};

export default SearchBar;