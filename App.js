import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { CssBaseline, Container } from '@mui/material';
import ShortenerPage from './pages/ShortenerPage';
import StatsPage from './pages/StatsPage';
import Navigation from './components/Navigation';

function App() {
  return (
    <BrowserRouter>
      <CssBaseline />
      <Navigation />
      <Container maxWidth="md" sx={{ mt: 4 }}>
        <Routes>
          <Route path="/" element={<ShortenerPage />} />
          <Route path="/stats" element={<StatsPage />} />
          <Route path="/:shortCode" element={<StatsPage />} />
        </Routes>
      </Container>
    </BrowserRouter>
  );
}

export default App;