// src/components/WantedCard.jsx
import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import {
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Typography,
  Chip,
  Button,
  Box,
  Grid,
  Alert,
} from '@mui/material';
import {
  Person,
  CalendarToday,
  LocationOn,
  Visibility,
  Warning,
} from '@mui/icons-material';

const WantedCard = ({ person }) => {
  return (
    <Card 
      sx={{ 
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        position: 'relative',
        borderRadius: 2,
        overflow: 'hidden',
      }}
    >
      {/* Imagem */}
      <Box sx={{ position: 'relative' }}>
        <CardMedia
          component="img"
          height="240"
          image={person.images?.[0]?.original || "https://via.placeholder.com/300x400?text=Foto+Indisponível"}
          alt={person.title}
          sx={{ objectFit: 'cover' }}
        />
        
        {/* Badge de perigo */}
        {person.warning_message && (
          <Chip
            icon={<Warning />}
            label="PERIGOSO"
            color="error"
            size="small"
            sx={{
              position: 'absolute',
              top: 8,
              left: 8,
              fontWeight: 'bold',
              fontSize: '0.75rem',
            }}
          />
        )}
        
        {/* ID Badge */}
        <Chip
          label={`ID: ${person.uid}`}
          size="small"
          sx={{
            position: 'absolute',
            top: 8,
            right: 8,
            backgroundColor: 'rgba(0,0,0,0.7)',
            color: 'white',
            fontSize: '0.7rem',
          }}
        />
      </Box>

      {/* Conteúdo */}
      <CardContent sx={{ flexGrow: 1, pb: 1 }}>
        <Typography 
          variant="h6" 
          component="h3" 
          gutterBottom
          sx={{ 
            fontWeight: 600,
            lineHeight: 1.2,
            mb: 2,
          }}
        >
          {person.title}
        </Typography>

        {/* Crimes */}
        {person.subjects && (
          <Box sx={{ mb: 2 }}>
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
              {person.subjects.map((subject, idx) => (
                <Chip
                  key={idx}
                  label={subject}
                  color="error"
                  variant="outlined"
                  size="small"
                  sx={{ fontSize: '0.7rem' }}
                />
              ))}
            </Box>
          </Box>
        )}

        {/* Informações básicas */}
        <Grid container spacing={1} sx={{ mb: 2 }}>
          {person.sex && (
            <Grid item xs={6}>
              <Box sx={{ display: 'flex', alignItems: 'center', fontSize: '0.875rem' }}>
                <Person sx={{ fontSize: 16, mr: 0.5, color: 'text.secondary' }} />
                <Typography variant="body2" color="text.secondary">
                  {person.sex}
                </Typography>
              </Box>
            </Grid>
          )}
          {person.age_range && (
            <Grid item xs={6}>
              <Box sx={{ display: 'flex', alignItems: 'center', fontSize: '0.875rem' }}>
                <CalendarToday sx={{ fontSize: 16, mr: 0.5, color: 'text.secondary' }} />
                <Typography variant="body2" color="text.secondary">
                  {person.age_range}
                </Typography>
              </Box>
            </Grid>
          )}
          {person.race && (
            <Grid item xs={12}>
              <Box sx={{ display: 'flex', alignItems: 'center', fontSize: '0.875rem' }}>
                <LocationOn sx={{ fontSize: 16, mr: 0.5, color: 'text.secondary' }} />
                <Typography variant="body2" color="text.secondary">
                  {person.race}
                </Typography>
              </Box>
            </Grid>
          )}
        </Grid>

        {/* Recompensa */}
        {person.reward_text && (
          <Alert 
            severity="warning" 
            sx={{ 
              mb: 2, 
              py: 0.5,
              '& .MuiAlert-message': {
                fontSize: '0.875rem',
                fontWeight: 600,
              }
            }}
          >
            💰 {person.reward_text}
          </Alert>
        )}
      </CardContent>

      {/* Ações */}
      <CardActions sx={{ p: 2, pt: 0 }}>
        <Button
          component={RouterLink}
          to={`/person/${person.uid}`}
          variant="contained"
          fullWidth
          startIcon={<Visibility />}
          sx={{
            borderRadius: 2,
            py: 1,
            fontWeight: 600,
            boxShadow: 2,
            '&:hover': {
              boxShadow: 4,
            },
          }}
        >
          Ver Detalhes
        </Button>
      </CardActions>
    </Card>
  );
};

export default WantedCard;