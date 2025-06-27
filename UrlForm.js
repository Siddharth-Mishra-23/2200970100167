import { useState } from 'react';
import { TextField, Button, Grid, Box } from '@mui/material';
import { validateUrl } from '../utils/helpers';

export default function UrlForm({ onShorten }) {
  const [url, setUrl] = useState('');
  const [customCode, setCustomCode] = useState('');
  const [validity, setValidity] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!validateUrl(url)) {
      setError('Please enter a valid URL (include http:// or https://)');
      return;
    }

    onShorten({
      originalUrl: url,
      customCode: customCode || null,
      validity: validity ? parseInt(validity) : 30
    });
    
    setUrl('');
    setCustomCode('');
    setValidity('');
    setError('');
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ mb: 4 }}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Original URL"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="https://example.com"
            error={!!error}
            helperText={error}
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            fullWidth
            label="Custom Code (optional)"
            value={customCode}
            onChange={(e) => setCustomCode(e.target.value)}
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            fullWidth
            label="Validity in minutes (default: 30)"
            type="number"
            value={validity}
            onChange={(e) => setValidity(e.target.value)}
          />
        </Grid>
        <Grid item xs={12}>
          <Button type="submit" variant="contained" fullWidth>
            Shorten URL
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
}