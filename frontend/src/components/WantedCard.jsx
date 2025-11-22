import React from 'react';
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

const WantedCard = ({ person, onViewDetails }) => {
  return (
    <Card
      sx={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        borderRadius: 3,
        overflow: 'hidden',
        boxShadow: 4,
        transition: 'transform 0.2s ease-in-out',
        '&:hover': { transform: 'scale(1.01)' },
      }}
    >
      <Box sx={{ position: 'relative' }}>
        <CardMedia
          component="img"
          height="220"
          image={person.image || 'https://placehold.co/300x400?text=Foto+Indisponível'}
          alt={person.title}
          sx={{ objectFit: 'cover' }}
        />
        {person.warning_message && (
          <Chip
            icon={<Warning />}
            label="PERIGOSO"
            color="error"
            size="small"
            sx={{
              position: 'absolute',
              top: 10,
              left: 10,
              fontWeight: 'bold',
              fontSize: '0.7rem',
              height: 24,
              boxShadow: 1,
            }}
          />
        )}
       
      </Box>

      <CardContent sx={{ flexGrow: 1, px: 2, py: 1.5 }}>
        <Typography variant="h6" component="h3" sx={{ fontWeight: 700, fontSize: '1rem', mb: 1 }}>
          {person.title}
        </Typography>

        {person.subjects && (
          <Box sx={{ mb: 1 }}>
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
              {person.subjects.map((subject, idx) => (
                <Chip
                  key={idx}
                  label={subject}
                  color="error"
                  variant="outlined"
                  size="small"
                  sx={{ fontSize: '0.65rem', height: 22 }}
                />
              ))}
            </Box>
          </Box>
        )}

        <Grid container spacing={1} sx={{ mb: 1 }}>
          {person.sex && (
            <Grid item xs={6}>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Person sx={{ fontSize: 16, mr: 0.5, color: 'text.secondary' }} />
                <Typography variant="body2" color="text.secondary">{person.sex}</Typography>
              </Box>
            </Grid>
          )}
          {person.age_range && (
            <Grid item xs={6}>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <CalendarToday sx={{ fontSize: 16, mr: 0.5, color: 'text.secondary' }} />
                <Typography variant="body2" color="text.secondary">{person.age_range}</Typography>
              </Box>
            </Grid>
          )}
          {person.race && (
            <Grid item xs={12}>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <LocationOn sx={{ fontSize: 16, mr: 0.5, color: 'text.secondary' }} />
                <Typography variant="body2" color="text.secondary">{person.race}</Typography>
              </Box>
            </Grid>
          )}
        </Grid>

        {person.reward_text && (
          <Alert severity="warning" sx={{ mb: 1, py: 0.5 }}>
            💰 {person.reward_text}
          </Alert>
        )}
      </CardContent>

      <CardActions sx={{ px: 2, pb: 2 }}>
        <Button
          onClick={onViewDetails}
          variant="contained"
          fullWidth
          startIcon={<Visibility />}
          sx={{
            borderRadius: 2,
            py: 1,
            fontSize: '0.8rem',
            fontWeight: 600,
            backgroundColor: '#1e3a8a',
            '&:hover': { backgroundColor: '#3b82f6' },
          }}
        >
          Ver Detalhes
        </Button>
      </CardActions>
    </Card>
  );
};

export default WantedCard;