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
        borderRadius: 2,
        overflow: 'hidden',
        boxShadow: 2,
        transform: 'scale(0.9)',
      }}
    >
      <Box sx={{ position: 'relative' }}>
        <CardMedia
          component="img"
          height="100"
          image={person.images?.[0]?.original || 'https://via.placeholder.com/300x400?text=Foto+Indisponível'}
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
              top: 6,
              left: 6,
              fontWeight: 'bold',
              fontSize: '0.65rem',
              height: 22,
            }}
          />
        )}
        <Chip
          label={`ID: ${person.uid}`}
          size="small"
          sx={{
            position: 'absolute',
            top: 6,
            right: 6,
            backgroundColor: 'rgba(0,0,0,0.7)',
            color: 'white',
            fontSize: '0.6rem',
            height: 22,
          }}
        />
      </Box>

      <CardContent sx={{ flexGrow: 1, pb: 1, pt: 1, px: 2 }}>
        <Typography
          variant="subtitle2"
          component="h3"
          sx={{
            fontWeight: 600,
            fontSize: '0.85rem',
            lineHeight: 1.2,
            mb: 1,
          }}
        >
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
                  sx={{ fontSize: '0.6rem', height: 20 }}
                />
              ))}
            </Box>
          </Box>
        )}

        <Grid container spacing={1} sx={{ mb: 1 }}>
          {person.sex && (
            <Grid item xs={6}>
              <Box sx={{ display: 'flex', alignItems: 'center', fontSize: '0.75rem' }}>
                <Person sx={{ fontSize: 13, mr: 0.5, color: 'text.secondary' }} />
                <Typography variant="body2" color="text.secondary">
                  {person.sex}
                </Typography>
              </Box>
            </Grid>
          )}
          {person.age_range && (
            <Grid item xs={6}>
              <Box sx={{ display: 'flex', alignItems: 'center', fontSize: '0.75rem' }}>
                <CalendarToday sx={{ fontSize: 13, mr: 0.5, color: 'text.secondary' }} />
                <Typography variant="body2" color="text.secondary">
                  {person.age_range}
                </Typography>
              </Box>
            </Grid>
          )}
          {person.race && (
            <Grid item xs={12}>
              <Box sx={{ display: 'flex', alignItems: 'center', fontSize: '0.75rem' }}>
                <LocationOn sx={{ fontSize: 13, mr: 0.5, color: 'text.secondary' }} />
                <Typography variant="body2" color="text.secondary">
                  {person.race}
                </Typography>
              </Box>
            </Grid>
          )}
        </Grid>

        {person.reward_text && (
          <Alert
            severity="warning"
            sx={{
              mb: 1,
              py: 0.5,
              '& .MuiAlert-message': {
                fontSize: '0.75rem',
                fontWeight: 600,
              },
            }}
          >
            💰 {person.reward_text}
          </Alert>
        )}
      </CardContent>

      <CardActions sx={{ p: 2, pt: 0 }}>
        <Button
          onClick={onViewDetails}
          variant="contained"
          fullWidth
          startIcon={<Visibility />}
          sx={{
            borderRadius: 2,
            py: 0.5,
            fontSize: '0.75rem',
            fontWeight: 600,
            boxShadow: 1,
            '&:hover': {
              boxShadow: 3,
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