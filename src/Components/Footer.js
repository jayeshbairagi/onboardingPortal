import * as React from 'react';
import { Box, Typography, Link } from '@mui/material';

export default function Footer() {
  return (
    <Box sx={{ flexGrow: 1, backgroundColor: "rgb(1,1,1,0.2)", p: 1 }} >
      <Typography variant="body2" color="text.secondary" align="center">
        {'Copyright © '}
        <Link color="inherit" href="https://www.wolterskluwer.com/">
          Wolters Kluwer
        </Link>{' '}
        {new Date().getFullYear()}
        {'.'}
      </Typography>
    </Box>
  );
}
