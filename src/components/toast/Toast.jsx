import {IconButton, Snackbar} from '@mui/material'
import {CloseRounded as CloseIcon} from '@mui/icons-material'

const Toast = ({open, onClose: handleClose, message}) => <Snackbar
    open={open}
    onClose={handleClose}
    message={message}
    autoHideDuration={2000}
    action={<IconButton
        size={'small'}
        color={'inherit'}
        onClick={handleClose}>
        <CloseIcon fontSize="small"/>
    </IconButton>}
/>

export default Toast
