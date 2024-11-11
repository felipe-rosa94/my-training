import {useState} from 'react'
import {isMobile} from 'react-lf-tools'

import {
    Box,
    Button,
    Checkbox,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    FormControlLabel
} from '@mui/material'
import {CloseRounded as CloseIcon} from '@mui/icons-material'
import {getLocal, setLocal} from '../../hooks/useStorage/useStorage.jsx'

import './dialogs.scss'

export const DialogView = ({open, onClose: handleClose, onClick: handleClickConfirmation, dataView, keyView}) => {

    const [data, setData] = useState(dataView)

    const handleChange = (event, e) => {
        e.checked = event.target.checked
        const arr = getLocal(keyView, [])
        const index = arr.findIndex((st) => st.id === data.id)
        const indexData = arr[index].data.findIndex((ste) => ste.id === e.id)
        arr[index].data[indexData] = e
        setData(arr[index])
        setLocal(keyView, arr)
    }

    return (
        <Dialog
            open={open}
            onClose={handleClose}
            fullScreen={isMobile()}
            PaperProps={{
                style: isMobile() ? {borderRadius: 0, padding: 0} : {width: 500}
            }}>
            <DialogTitle color={'secondary'} className={'title'}>
                <CloseIcon onClick={handleClose}/>
                {data.name}
            </DialogTitle>
            <DialogContent className={'content-view-training'}>
                {data.data.map((exercise, i) => (
                    <Box key={i}>
                        <FormControlLabel
                            onChange={(event) => handleChange(event, exercise)}
                            checked={exercise.checked}
                            sx={{
                                '& .MuiFormControlLabel-label': {color: '#ffffff'}
                            }}
                            control={<Checkbox
                                sx={{
                                    '&.Mui-typography': {color: '#ffffff'},
                                    color: 'secondary.main',
                                    '&.Mui-checked': {color: 'secondary.main'}
                                }}/>}
                            label={exercise.name}
                        />
                    </Box>
                ))}
            </DialogContent>
            <Box className={'box-button-dialog'}>
                <Button
                    className={'button'}
                    variant={'contained'}
                    color={'secondary'}
                    onClick={() => handleClickConfirmation(data.id)}>
                    Concluir
                </Button>
            </Box>
        </Dialog>
    )
}

export const DialogConfirmation = ({open, onClick: handleClick, onClose: handleClose, title, message, data, type}) => {
    return <Dialog open={open}>
        <DialogTitle>
            {title}
        </DialogTitle>
        <DialogContent>
            <DialogContentText>
                {message}
            </DialogContentText>
        </DialogContent>
        <DialogActions>
            <Button
                color={'secondary'}
                onClick={handleClose}>
                Não
            </Button>
            <Button
                variant={'contained'}
                color={'secondary'}
                onClick={() => handleClick(data, type)}>
                Sim
            </Button>
        </DialogActions>
    </Dialog>
}
