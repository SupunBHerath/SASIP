import React, { useState } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import '../../../../../public/logoback.png';
import './Card.css'
function Card({ details }) {
  const [openSubscribe, setOpenSubscribe] = useState(false);
  const [openImage, setOpenImage] = useState(false);
  const [email, setEmail] = useState('');
  const [showConfirm, setShowConfirm] = useState(false);

  const handleSubscribeClick = () => {
    setOpenSubscribe(true);
  };

  const handleSubscribeClose = () => {
    setOpenSubscribe(false);
  };

  const handleSubscribeSubmit = () => {
    // Simulate a successful submission
    setOpenSubscribe(false);
    setShowConfirm(true);
    setTimeout(() => setShowConfirm(false), 2000); // Show confirmation for 2 seconds
  };

  const handleImageClick = () => {
    setOpenImage(true);
  };

  const handleImageClose = () => {
    setOpenImage(false);
  };

  return (
    <div>
      <figure className="snip1369 green">
        <img
          src='../../../../../public/logoback.png'
          style={{ height: "400px", width: "auto", position: 'relative', top: 100 }}
          alt="pr-sample15"
        />
        <div className="image" onClick={handleImageClick}>
          <img src={details.imageUrl} alt="pr-sample15" />
        </div>
        <figcaption>
          <h3>{details.title}</h3>
          <p>{details.desc}</p>
        </figcaption>
        <span
          className='read-more'
          onClick={handleSubscribeClick}
          style={{ cursor: 'pointer' }}
        >
          {details.isBtnVisible && (
            <>
              SUBSCRIBE <i className="ion-android-arrow-forward"></i>
            </>
          )}
       
        </span>
      </figure>

      {/* Subscribe Dialog */}
      <Dialog open={openSubscribe} onClose={handleSubscribeClose}>
        <DialogTitle>Subscribe</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Please enter your email address to subscribe.
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="email"
            label="Email Address"
            type="email"
            fullWidth
            variant="standard"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleSubscribeClose}>Cancel</Button>
          <Button onClick={handleSubscribeSubmit}>Submit</Button>
        </DialogActions>
      </Dialog>

      {/* Image Dialog */}
      <Dialog
        open={openImage}
        onClose={handleImageClose}
        maxWidth="md"
        fullWidth
        PaperProps={{ style: { maxWidth: '80%', width: 'auto' } }}
      >
        <DialogTitle>{details.title}</DialogTitle>
        <DialogContent>
          <img src={details.imageUrl} alt="Full" style={{ width: '100%', height: 'auto' }} />
          <DialogContentText>
            {details.desc}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleImageClose}>Close</Button>
        </DialogActions>
      </Dialog>

      {/* Confirmation Animation */}
      {showConfirm && (
        <div style={{
          position: 'fixed',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          background: '#4caf50',
          color: 'white',
          padding: '20px',
          borderRadius: '5px',
          zIndex: 1000,
          animation: 'fadeOut 2s forwards'
        }}>
          Subscription successful!
        </div>
      )}
    </div>
  );
}

export default Card;
