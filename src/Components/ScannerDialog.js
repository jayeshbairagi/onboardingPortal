import * as React from 'react';
// import Scanner from "react-webcam-qr-scanner";
import QRReader from "react-qr-scanner";
import { Dialog, DialogTitle, DialogContent, Typography, Box } from '@mui/material';

export default function ScannerDialog(props) {

  const handleScan = (result) => {
    console.log("Result", result);
    if (result && result.text) {
      props.setData(result.text);
      props.handleClose();
    }
  }

  return (
    <Dialog style={{ textAlign: "center" }} open={props.open} onClose={props.handleClose} maxWidth='md' fullWidth={true}>
      <DialogTitle color='primary'>Share your DID</DialogTitle>
      <DialogContent >
        {/* {kycForm && QRData
          ?
          <Box>
            <Typography>
              Get your Wolters Kluwer KYC Credentials by scanning the QR code
            </Typography>
            <br />
            <img src={`data:image/svg+xml;base64,${QRData}`} alt="" />
          </Box>
          :
          <Box>
            {kycForm ?
              <FormControl fullWidth>
                <TextField label="Name" variant="standard" onChange={(e) => setClientData({ ...clientData, name: e.target.value })} required />
                <TextField label="TIN/SSN" variant="standard" onChange={(e) => setClientData({ ...clientData, tin: e.target.value })} required />
                <TextField label="Address Line 1" variant="standard" onChange={(e) => setClientData({ ...clientData, addressLine1: e.target.value })} required />
                <TextField label="Address Line 2" variant="standard" onChange={(e) => setClientData({ ...clientData, addressLine2: e.target.value })} />
                <TextField label="City" variant="standard" onChange={(e) => setClientData({ ...clientData, city: e.target.value })} required />
                <TextField label="Country" variant="standard" onChange={(e) => setClientData({ ...clientData, country: e.target.value })} required />
                <TextField label="Zipcode" variant="standard" onChange={(e) => setClientData({ ...clientData, zipcode: e.target.value })} required />
              </FormControl>
              : */}
        {/* <Box>
                {clientDID ? */}
        {/* <Box>
                    <Typography variant='h6'>
                      Scanned DID:
                    </Typography>
                    <Typography>{clientDID}</Typography>
                  </Box>
                  : */}
        <Box>
          <Typography>
            Scan your DID after clicking share button on Your Mobile Wallet.
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
        {/* }
              </Box>
            }
          </Box>
        } */}
      </DialogContent>
    </Dialog >
  );
}
