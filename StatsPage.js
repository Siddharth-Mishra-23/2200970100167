import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography } from '@mui/material';
import logger from '../utils/logger';

export default function StatsPage() {
  const [urls, setUrls] = useState([]);
  const { shortCode } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const storedUrls = JSON.parse(localStorage.getItem('shortenedUrls')) || [];
    setUrls(storedUrls);

    if (shortCode) {
      const urlData = storedUrls.find(url => url.shortCode === shortCode);
      if (urlData) {
        // Record click
        urlData.clicks.push({
          timestamp: new Date(),
          source: document.referrer || 'direct',
          location: navigator.language
        });
        
        localStorage.setItem('shortenedUrls', JSON.stringify(storedUrls));
        logger.log('Redirecting', { shortCode });
        window.location.href = urlData.originalUrl;
      } else {
        navigate('/');
      }
    }
  }, [shortCode, navigate]);

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        URL Statistics
      </Typography>
      
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Short URL</TableCell>
              <TableCell>Original URL</TableCell>
              <TableCell>Created</TableCell>
              <TableCell>Expires</TableCell>
              <TableCell>Clicks</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {urls.map((url) => (
              <TableRow key={url.id}>
                <TableCell>
                  <a href={`/${url.shortCode}`} target="_blank" rel="noopener noreferrer">
                    {url.shortUrl}
                  </a>
                </TableCell>
                <TableCell>{url.originalUrl}</TableCell>
                <TableCell>{new Date(url.createdAt).toLocaleString()}</TableCell>
                <TableCell>{new Date(url.expiryDate).toLocaleString()}</TableCell>
                <TableCell>{url.clicks.length}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}