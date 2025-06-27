import { AppBar, Toolbar, Button } from '@mui/material';
import { Link } from 'react-router-dom';

export default function Navigation() {
  return (
    <AppBar position="static">
      <Toolbar>
        <Button color="inherit" component={Link} to="/">
          Shortener
        </Button>
        <Button color="inherit" component={Link} to="/stats">
          Statistics
        </Button>
      </Toolbar>
    </AppBar>
  );
}