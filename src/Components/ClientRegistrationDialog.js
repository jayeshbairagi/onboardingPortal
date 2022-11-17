import * as React from 'react';
// import Scanner from "react-webcam-qr-scanner";
import QRReader from "react-qr-scanner";
import { FormControl, TextField, Dialog, DialogTitle, Button, DialogContent, DialogActions, Typography, Box, FormHelperText, LinearProgress } from '@mui/material';
import { createCredential, verifyCredential, getCredentialQR } from '../dock/helpers/dock-credentials';

const KYCDID = 'did:dock:5GdGmkFBgAPsDe5cUFxZWL6SgsMVjkrnn4dQxaWBVWQLbKF4';
const clientSchemaUri = "blob:dock:5DMbFYTTF5JEdkvv7SgMXH7ywS4Qx52Z63bGokd6CFYHtVhb";

export default function ClientRegistrationDialog(props) {
  const [clientData, setClientData] = React.useState({});
  const [clientDID, setClientDID] = React.useState();
  const [kycForm, setKYCForm] = React.useState(false);
  const [QRData, setQRData] = React.useState();
  const [errorMsg, setErrorMsg] = React.useState();
  const [isFormSubmit, setIsFormSubmit] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);

  const handleClose = () => {
    setErrorMsg();
    setIsLoading(false);
    setIsFormSubmit(false);
    setClientData({});
    setClientDID();
    setQRData();
    setKYCForm(false);
    props.handleClose();
  }

  const loadKYCForm = async () => {
    setKYCForm(true);
  }

  const registerClient = async () => {
    setIsFormSubmit(true);
    if (clientData && clientData.name && clientData.tin) {
      setIsLoading(true);
      try {
        const credentialBody = {
          type: ['VerifiableCredential', 'WoltersKluwerClientCredential'],
          subject: {
            id: clientDID,
            name: clientData.name,
            tin: clientData.tin,
            permissions: 'all',
            product: 'Vault',
            users: '100',
          },
          issuanceDate: (new Date().toISOString()),
          expirationDate: (new Date(new Date().setFullYear(new Date().getFullYear() + 1)).toISOString()),
          issuer: {
            id: KYCDID,
          },
          schema: clientSchemaUri,
        };

        const signedCredential = await createCredential(credentialBody, 'secret');

        const clientVC = await verifyCredential(signedCredential);
        if (clientVC.verified) {
          console.log('SignedCreds:::', signedCredential.id);
          const idArray = signedCredential.id.split('/');
          const credentialURL = `https://creds-testnet.dock.io/qr.svg?d=https%3A%2F%2Fcreds-testnet.dock.io%2F${idArray[idArray.length - 1]}%3Fp%3Dc2VjcmV0`;
          const result = await getCredentialQR(credentialURL);
          const base64data = btoa(unescape(encodeURIComponent(result.data)));
          setIsLoading(false);
          setQRData(base64data);
        } else {
          setIsLoading(false);
          setErrorMsg('Unable to issue credential. Please try again');
        }
      } catch (e) {
        setIsLoading(false);
        setErrorMsg('Unable to issue credential. Please try again');
      }
    }
  }

  const handleScan = (result) => {
    console.log("Result", result);
    if (result && result.text) {
      setClientDID(result.text);
    }
  }

  // const handleDecode = (result) => {
  //   setClientDID(result.data);
  // }

  // const handleScannerLoad = (mode) => {
  //   console.log("Mode", mode);
  // }

  return (
    <Dialog style={{ textAlign: "center" }} open={props.open} onClose={handleClose} maxWidth='md' fullWidth={true}>
      <DialogTitle color='primary'>Wolters Kluwer Client Onboarding</DialogTitle>
      <DialogContent >
        {kycForm && QRData
          ?
          <Box>
            <Typography>
              Get your Wolters Kluwer Onboarding Credentials by scanning the QR code
            </Typography>
            <br />
            <img src={`data:image/svg+xml;base64,${QRData}`} alt="" />
          </Box>
          :
          <Box>
            {kycForm ?
              <FormControl fullWidth>
                <TextField label="Client Name" variant="standard" onChange={(e) => setClientData({ ...clientData, name: e.target.value })} aria-describedby="client-name-error" required />
                {isFormSubmit && !clientData?.name && <FormHelperText style={{ color: "darkred" }} id="client-name-error">Client Name is required</FormHelperText>}
                <TextField label="TIN/ClientID" variant="standard" onChange={(e) => setClientData({ ...clientData, tin: e.target.value })} aria-describedby="client-tin-error" required />
                {isFormSubmit && !clientData?.tin && <FormHelperText style={{ color: "darkred" }} id="component-error-text">Tin/ClientID is required</FormHelperText>}
                <TextField label="Address Line 1" variant="standard" onChange={(e) => setClientData({ ...clientData, addressLine1: e.target.value })} />
                <TextField label="Address Line 2" variant="standard" onChange={(e) => setClientData({ ...clientData, addressLine2: e.target.value })} />
                <TextField label="City" variant="standard" onChange={(e) => setClientData({ ...clientData, city: e.target.value })} />
                <TextField label="Country" variant="standard" onChange={(e) => setClientData({ ...clientData, country: e.target.value })} />
                <TextField label="Zipcode" variant="standard" onChange={(e) => setClientData({ ...clientData, zipcode: e.target.value })} />
                {isLoading && <LinearProgress style={{ marginTop: "10px" }} />}
              </FormControl>
              :
              <Box>
                {clientDID ?
                  <Box>
                    <Typography variant='h6'>
                      Scanned DID:
                    </Typography>
                    <Typography>{clientDID}</Typography>
                  </Box>
                  :
                  <Box>
                    <Typography>
                      Scan your DID QR code after clicking share button on Your Mobile Wallet.
                    </Typography>
                    <QRReader delay={100} style={{ height: 600, width: 800 }} onScan={handleScan} onError={(e) => console.log(e)} />
                    {/* <Scanner
                      className="some-classname"
                      onDecode={handleDecode}
                      onScannerLoad={handleScannerLoad}
                      constraints={{
                        audio: false,
                        video: {
                          facingMode: "environment"
                        }
                      }}
                      captureSize={{ width: 1280, height: 720 }}
                    /> */}
                  </Box>
                }
              </Box>
            }
          </Box>
        }
        <Typography marginTop={"9px"} color={"error"} variant="body1">{errorMsg}</Typography>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        {kycForm ? <Box>{QRData ? <Button onClick={handleClose}>OK</Button> : <Button onClick={registerClient}>Get Your Credential</Button>}</Box> : <Button disabled={!clientDID} onClick={loadKYCForm}>Next</Button>}
      </DialogActions>
    </Dialog >
  );
}
