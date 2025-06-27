import { useState } from 'react';
import { Box, Typography, Button } from '@mui/material';
import UrlForm from '../components/UrlForm';
import UrlList from '../components/UrlList';
import { generateShortCode } from '../utils/helpers';
import logger from '../utils/logger';

export default function ShortenerPage() {
  const [urls, setUrls] = useState([]);
  const [forms, setForms] = useState([1]);

  const handleShorten = (urlData) => {
    const shortCode = urlData.customCode || generateShortCode();
    const expiryDate = new Date();
    expiryDate.setMinutes(expiryDate.getMinutes() + urlData.validity);

    const newUrl = {
      id: Date.now(),
      originalUrl: urlData.originalUrl,
      shortCode,
      shortUrl: `${window.location.origin}/${shortCode}`,
      createdAt: new Date(),
      expiryDate,
      clicks: []
    };

    const updatedUrls = [...urls, newUrl];
    setUrls(updatedUrls);
    localStorage.setItem('shortenedUrls', JSON.stringify(updatedUrls));
    logger.log('URL shortened', newUrl);
  };

  const addForm = () => {
    if (forms.length < 5) {
      setForms([...forms, forms.length + 1]);
    }
  };

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        URL Shortener
      </Typography>
      
      {forms.map((_, index) => (
        <UrlForm key={index} onShorten={handleShorten} />
      ))}

      {forms.length < 5 && (
        <Button variant="outlined" onClick={addForm} sx={{ mb: 4 }}>
          Add Another URL
        </Button>
      )}

      {urls.length > 0 && <UrlList urls={urls} />}
    </Box>
  );
}