'use client'

import * as React from 'react';

import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Rating from '@mui/material/Rating';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Stack from '@mui/material/Stack';
import Slider from '@mui/material/Slider';
import VolumeDown from '@mui/icons-material/VolumeDown';
import VolumeUp from '@mui/icons-material/VolumeUp';
import Pagination from '@mui/material/Pagination';
import Snackbar from '@mui/material/Snackbar';
import CloseIcon from '@mui/icons-material/Close';
import Alert from '@mui/material/Alert';
import CheckIcon from '@mui/icons-material/Check';

export default function page() {
  const [value1, setValue1] = React.useState(2);
  const [value2, setValue2] = React.useState(30);
  const [open, setOpen] = React.useState(false);

  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };

  const action = (
    <React.Fragment>
      <Button color="secondary" size="small" onClick={handleClose}>
        UNDO
      </Button>
      <IconButton
        size="small"
        aria-label="close"
        color="inherit"
        onClick={handleClose}
      >
        <CloseIcon fontSize="small" />
      </IconButton>
    </React.Fragment>
  );
  
  const handleChange = (event, newValue) => {
    setValue2(newValue);
  };

  return (
    <div>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ mr: 2 }}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              Home
            </Typography>

            <Box sx={{ width: 200 }}>
              <Stack spacing={2} direction="row" sx={{ alignItems: 'center', mb: 1 }}>
                <VolumeDown />
                <Slider aria-label="Volume" value={value2} onChange={handleChange} />
                <VolumeUp />
              </Stack>
            </Box>

            <Button color="inherit">Login</Button>
          </Toolbar>
        </AppBar>
      </Box>

      <Alert icon={<CheckIcon fontSize="inherit" />} severity="success">
      Here is a gentle confirmation that your action was successful.
    </Alert>

      <h1>Welcome to My Website!</h1>
      <Button variant="contained">Click Me</Button>
      
      <Button onClick={handleClick}>Open Snackbar</Button>

      <Box sx={{ '& > legend': { mt: 2 } }}>
      <Typography component="legend">Controlled</Typography>
      <Rating
        name="simple-controlled"
        value={value1}
        onChange={(event, newValue) => {
          setValue1(newValue);
        }}
      />
      <Typography component="legend">Uncontrolled</Typography>
      <Rating
        name="simple-uncontrolled"
        onChange={(event, newValue) => {
          console.log(newValue);
        }}
        defaultValue={2}
      />
      <Typography component="legend">Read only</Typography>
      <Rating name="read-only" value={value1} readOnly />
      <Typography component="legend">Disabled</Typography>
      <Rating name="disabled" value={value1} disabled />
      <Typography component="legend">No rating given</Typography>
      <Rating name="no-value" value={null} />
    </Box>

      <Snackbar
        open={open}
        autoHideDuration={6000}
        onClose={handleClose}
        message="Note archived"
        action={action}
      />

      <Stack spacing={2}>
        <Pagination count={10} color="primary" />
      </Stack>

    </div>
  )
}
