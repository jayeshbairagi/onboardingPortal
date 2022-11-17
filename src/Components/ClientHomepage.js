import * as React from 'react';
import { QRCodeSVG } from 'qrcode.react';
import { Box, Typography, Button, Grid } from '@mui/material';
import ClientRegistrationDialog from './ClientRegistrationDialog';

export default function ClientHomepage() {
  const [openRegisterClientForm, setOpenRegisterClientForm] = React.useState(false);

  const openClientRegistrationForm = () => {
    setOpenRegisterClientForm(true);
  }

  const closeClientRegistrationForm = () => {
    setOpenRegisterClientForm(false);
  }

  return (
    <Box style={{ textAlign: "center" }} sx={{ my: 0, height: 754 }}>
      {/* <Typography variant='h4' marginTop="2%" color="secondary" marginBottom="3%">Achieving True Credential Portability with Strong Authentication</Typography> */}
      <Grid container marginTop="6%" spacing={2}>
        <Grid item xs={6} alignSelf="center" marginBottom="10%">
          <Typography variant='h5' marginBottom={"20px"} color="primary">Install Dock Wallet</Typography>
          <Typography variant='h6'>To acquire your secure credential wallet, scan the QR code:</Typography>
          <br />
          <QRCodeSVG style={{ height: "300px", width: "300px" }} value={'https://www.dock.io/dock-wallet-app'} />
        </Grid>
        <Grid item xs={6} alignSelf="center" marginBottom="5%">
          <Typography variant='h5' marginBottom={"20px"} color="primary">Configure Your Wallet</Typography>
          <Box textAlign={"left"} marginLeft="21%" marginBottom="5%" sx={{ width: "60%" }}>
            <Typography variant="h6"><b>STEP 1:</b> Open the dock wallet Mobile App.</Typography>
            <Typography variant="h6"><b>STEP 2:</b> Select the Create a New Wallet option.(A DID get assign to You)</Typography>
            <Typography variant="h6"><b>STEP 3:</b> Set up your wallet's passcode.</Typography>
            <Typography variant="h6"><b>STEP 4:</b> Enable biometric authentication for extra layer of security (Optional).</Typography>
            <Typography variant="h6"><b>STEP 5:</b> Activate Testnet for demo.</Typography>
            <Typography marginLeft="20px" variant="subtitle2">* Activating Test-Net for Demo, select the settings option in the Dock wallet app, then click the build number for ten times.</Typography>
            <Typography marginLeft="20px" variant="subtitle2">* When the Dev-settings button appears, open them and select the Switch network option.</Typography>
            <Typography marginLeft="20px" variant="subtitle2">* Pick Dock "PoS Testnet" from the drop-down menu.</Typography>
          </Box>
          <Typography variant="h6" color="primary">Already have a wallet? Proceed with the Onboarding</Typography>
          <br />
          <Button variant="contained" onClick={openClientRegistrationForm}>Proceed Onboarding</Button>
        </Grid>
        <ClientRegistrationDialog open={openRegisterClientForm} handleClose={closeClientRegistrationForm} />
      </Grid>
    </Box>
  );
}
