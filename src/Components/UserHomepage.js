import * as React from 'react';
import {
  useParams,
  useLocation,
} from "react-router-dom";
import { QRCodeSVG } from 'qrcode.react';
import { Box, Button, FormControl, TextField, Typography, Grid, IconButton, FormHelperText, LinearProgress } from '@mui/material';
import { QrCodeScannerOutlined } from '@mui/icons-material';
import { updateDID } from '../utils/clientService';
import { updateClientDID } from '../utils/credentialService';
import { createCredential, verifyCredential, getCredentialQR } from '../dock/helpers/dock-credentials';
import ScannerDialog from './ScannerDialog';

const KYCDID = 'did:dock:5GdGmkFBgAPsDe5cUFxZWL6SgsMVjkrnn4dQxaWBVWQLbKF4';
const userSchemaUri = "blob:dock:5CqcfhiaTUkPAfq3wDp9ZWyH2s2kZi6Bsn9h2BSHsHMkBAKS";
const documentSchemaUri = 'blob:dock:5HA75evSQA3e53SpzC6qvVFpwBhQdNWzpB2EyeNoHVKVvt9k';

export default function UserHomepage() {

  const useQuery = () => {
    return new URLSearchParams(useLocation().search);
  }

  const { userId } = useParams();
  const query = useQuery();
  const documentName = query.get('document');
  const documentDID = query.get('did');
  const documentAccess = query.get('access');
  const [userDID, setUserDID] = React.useState();
  const [QRData, setQRData] = React.useState();
  const [openScanner, setOpenScanner] = React.useState(false);
  const [isFormSubmit, setIsFormSubmit] = React.useState(false);
  const [errorMsg, setErrorMsg] = React.useState();
  const [isLoading, setIsLoading] = React.useState(false);

  const saveUserDID = async () => {
    setIsFormSubmit(true);
    setErrorMsg();
    if (userDID && userDID.startsWith('did:')) {
      setIsLoading(true);
      if (documentDID && documentAccess) {
        try {
          const credential = await updateClientDID(userId, userDID);
          console.log("Credential", credential);
          const credentialBody = {
            type: ['VerifiableCredential', 'DocumentCredential'],
            subject: {
              name: documentName,
              documentDID: documentDID,
              accessRights: documentAccess,
            },
            issuanceDate: (new Date().toISOString()),
            expirationDate: (new Date(new Date().setFullYear(new Date().getFullYear() + 1)).toISOString()),
            issuer: {
              id: documentDID,
            },
            schema: documentSchemaUri,
          };

          const signedCredential = await createCredential(credentialBody, 'secret');

          const documentVC = await verifyCredential(signedCredential);
          if (documentVC.verified) {
            console.log('SignedCreds:::', signedCredential.id);
            const idArray = signedCredential.id.split('/');
            const credentialURL = `https://creds-testnet.dock.io/qr.svg?d=https%3A%2F%2Fcreds-testnet.dock.io%2F${idArray[idArray.length - 1]}%3Fp%3Dc2VjcmV0`;
            const result = await getCredentialQR(credentialURL);
            const base64data = btoa(unescape(encodeURIComponent(result.data)));
            setIsLoading(false);
            setQRData(base64data);
          } else {
            setIsLoading(false);
            setErrorMsg('Unable to issue credentials. Please try again');
          }
        } catch (e) {
          setIsLoading(false);
          setErrorMsg('Unable to issue credentials. Please try again');
        }
      } else {
        try {
          const user = await updateDID(userId, userDID);

          const credentialBody = {
            type: ['VerifiableCredential', 'TaxAdvisorClientCredential'],
            subject: {
              id: userDID,
              name: user.name,
              email: user.email,
              clientName: user.wkClientName,
              clientDID: user.wkClientDID,
            },
            issuanceDate: (new Date().toISOString()),
            expirationDate: (new Date(new Date().setFullYear(new Date().getFullYear() + 1)).toISOString()),
            issuer: {
              id: KYCDID,
            },
            schema: userSchemaUri,
          };

          const signedCredential = await createCredential(credentialBody, 'secret');

          const userVC = await verifyCredential(signedCredential);
          if (userVC.verified) {
            console.log('SignedCreds:::', signedCredential.id);
            const idArray = signedCredential.id.split('/');
            const credentialURL = `https://creds-testnet.dock.io/qr.svg?d=https%3A%2F%2Fcreds-testnet.dock.io%2F${idArray[idArray.length - 1]}%3Fp%3Dc2VjcmV0`;
            const result = await getCredentialQR(credentialURL);
            const base64data = btoa(unescape(encodeURIComponent(result.data)));
            setIsLoading(false);
            setQRData(base64data);
          } else {
            setIsLoading(false);
            setErrorMsg('Unable to issue credentials. Please try again');
          }
        } catch (e) {
          setIsLoading(false);
          setErrorMsg('Unable to issue credentials. Please try again');
        }
      }
    }
  }

  const scanQR = () => {
    setOpenScanner(true);
  }

  const handleScanQRClose = () => {
    setOpenScanner(false);
  }

  const setUserDIDviaScan = (did) => {
    setUserDID(did);
    handleScanQRClose();
  }

  return (
    <Box style={{ textAlign: "center" }} >
      {/* <Typography variant='h4' marginTop="2%" color="secondary" marginBottom="3%">Achieving True Credential Portability with Strong Authentication</Typography> */}
      <Grid container spacing={2} marginTop="2%">
        <Grid item xs={6} alignSelf="center" marginBottom="7%">
          <Typography variant='h5' marginBottom={"20px"} color="primary">Wallet Setup</Typography>
          <Typography variant='h6'>To acquire your secure credential wallet, scan the QR code:</Typography>
          <br />
          <QRCodeSVG style={{ height: "300px", width: "300px" }} value={'https://www.dock.io/dock-wallet-app'} />
          <Box textAlign={"left"} marginLeft="21%" marginBottom="5%" sx={{ width: "60%" }}>
            <Typography variant="h6"><b>STEP 1:</b> Open the dock wallet Mobile App.</Typography>
            <Typography variant="h6"><b>STEP 2:</b> Select the Create a New Wallet option.</Typography>
            <Typography variant="h6"><b>STEP 3:</b> Set up your wallet's passcode.</Typography>
            <Typography variant="h6"><b>STEP 4:</b> Enable biometric authentication for extra layer of security (Optional).</Typography>
            <Typography variant="h6"><b>STEP 5:</b> Activate Testnet for demo.</Typography>
            <Typography marginLeft="20px" variant="subtitle2">* Activating Test-Net for Demo, select the settings option in the Dock wallet app, then click the build number for ten times.</Typography>
            <Typography marginLeft="20px" variant="subtitle2">* When the Dev-settings button appears, open them and select the Switch network option.</Typography>
            <Typography marginLeft="20px" variant="subtitle2">* Pick Dock "PoS Testnet" from the drop-down menu.</Typography>
          </Box>
        </Grid>
        <Grid item xs={6} alignSelf="center" marginBottom="10%">
          {QRData ?
            <Box>
              <Typography variant='h5' marginBottom={"30px"} color="primary">{documentName ? "Document Credential" : "Client Credential"}</Typography>
              <Typography>
                {`Get your Wolters Kluwer Vault ${documentName ? "Document" : "Client"} Credentials by scanning the QR code`}
              </Typography>
              <br />
              <img src={`data:image/svg+xml;base64,${QRData}`} alt="" />
            </Box>
            :
            <Box margin={"20%"} width={"50%"}>
              <Typography variant='h5' marginBottom={"30px"} color="primary">User Registration</Typography>
              <Typography variant='h6'>Provide your dock DID:</Typography>
              <br />
              <FormControl fullWidth>
                <div>
                  <TextField placeholder="Enter your DID" style={{ width: "90%" }} variant="standard" value={userDID} aria-describedby="did-error" onChange={(e) => setUserDID(e.target.value)} required />
                  <IconButton onClick={scanQR}>
                    <QrCodeScannerOutlined />
                  </IconButton>
                </div>
                {isFormSubmit && !userDID && <FormHelperText style={{ color: "darkred" }} id="did-error">DID is required</FormHelperText>}
                {isFormSubmit && userDID && !userDID.startsWith('did:') && <FormHelperText style={{ color: "darkred" }} id="did-error">Invalid DID</FormHelperText>}
                <Typography marginTop={"9px"} color={"error"} variant="body1">{errorMsg}</Typography>
                {isLoading && <LinearProgress style={{ marginTop: "10px" }} />}
                <br />
                <Box>
                  {/* <Button variant="contained" onClick={scanQR} style = {{marginRight:"20px"}}>Scan QR to Input DID</Button> */}
                  <Button variant="contained" onClick={saveUserDID}>Submit</Button>
                </Box>
              </FormControl>
            </Box>
          }
        </Grid>
      </Grid>
      <ScannerDialog open={openScanner} handleClose={handleScanQRClose} setData={setUserDIDviaScan} />
    </Box>
  );
}
