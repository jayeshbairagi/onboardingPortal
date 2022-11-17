import * as React from 'react';
import { AppBar, Box, Toolbar, Typography, Button } from '@mui/material';
import { createDID } from '../dock/helpers/dock-did';
// import JSONDialog from './JSONDialog';

export default function Header() {

  return (
    <div>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static" >
          <Toolbar>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              Wolters Kluwer Onboarding
            </Typography>
          </Toolbar>
        </AppBar>
      </Box>
    </div>
  );
}
