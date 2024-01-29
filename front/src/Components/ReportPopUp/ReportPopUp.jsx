import React, { useState } from 'react'
import { Block } from '@mui/icons-material'
import {
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    Button,
    Radio,
    RadioGroup,
    FormControlLabel,
    FormControl,
    FormLabel,
} from '@mui/material'
import './ReportPopUp.css'
import ApiService from '../../Services/api.service'

function ReportPopup({ user, setUnlike, transition = () => {} }) {
    const [open, setOpen] = useState(false)
    const [reason, setReason] = useState('fake_profile')

    const handleClickOpen = () => {
        setOpen(true)
    }

    const handleClose = () => {
        setOpen(false)
    }

    const handleConfirm = () => {
        // Handle the confirmation action, for example, by sending data to the server
        console.log(reason) // This would be replaced by an actual function call
        setOpen(false)
        ApiService.post('/report', { blockedLogin: user.login })
            .then(() => {
                transition('disliked')
                setUnlike(user.login)
            })
            .catch((error) => {
                console.log(error)
            })
    }

    return (
        <div>
            <Block
                id="block-icon"
                onClick={handleClickOpen}
                style={{ cursor: 'pointer' }}
            />
            <Dialog open={open} onClose={handleClose} color="dark">
                <DialogTitle>
                    Report and block <b>{user.name}</b>
                </DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Warning: This action is not reversible.
                    </DialogContentText>
                    <FormControl component="fieldset">
                        <FormLabel component="legend">Reason:</FormLabel>
                        <RadioGroup
                            aria-label="reason"
                            name="report-reason"
                            value={reason}
                            onChange={(event) => setReason(event.target.value)}
                        >
                            <FormControlLabel
                                value="fake_profile"
                                control={<Radio />}
                                label="Fake profile"
                            />
                            <FormControlLabel
                                value="other"
                                control={<Radio />}
                                label="Other"
                            />
                        </RadioGroup>
                    </FormControl>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={handleConfirm} color="primary">
                        Confirm
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    )
}

export default ReportPopup
