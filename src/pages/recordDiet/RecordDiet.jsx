import {useState} from 'react'
import {useLocation, useNavigate} from 'react-router-dom'
import {randomLetters, randomNumber} from 'react-lf-tools'

import {AppBar, Box, Button, IconButton, TextField, Toolbar, Typography} from '@mui/material'
import {ArrowBackRounded as ArrowIcon, DeleteRounded as DeleteIcon} from '@mui/icons-material'
import {DialogConfirmation} from '../../components/dialogs/Dialogs.jsx'
import Toast from '../../components/toast/Toast.jsx'

import {getLocal, setLocal} from '../../hooks/useStorage/useStorage.jsx'

import './recordDiet.scss'

const RecordDiet = () => {
    const navigate = useNavigate()
    const location = useLocation()
    const dataDiet = !!location.state ? location.state : {
        id: '',
        name: '',
        data: [],
        textData: ''
    }

    const [data, setData] = useState(dataDiet)

    const [toast, setToast] = useState({
        open: false,
        message: ''
    })

    const [confirmation, setConfirmation] = useState({
        open: false,
        title: '',
        message: '',
        data: '',
        type: ''
    })

    const handleCloseToast = () => setToast({open: false})

    const handleInput = (e) => setData({...data, [e.target.name]: e.target.value})

    const handleClickConfirm = () => {
        if (!data.name) return setToast({open: true, message: 'Coloque um nome para refeição!'})
        if (!data.textData) return setToast({open: true, message: 'Adicione refeições a dieta!'})

        const savedDiet = getLocal('savedDiet', [])

        const diets = []
        data.textData.split('\n').forEach(e => {
            diets.push({
                id: randomLetters() + randomNumber(),
                checked: false,
                name: e
            })
        })

        const t = {
            id: (!!data.id) ? data.id : new Date().getTime(),
            name: data.name,
            data: diets,
            textData: data.textData
        }

        if (!data.id) {
            savedDiet.push(t)
        } else {
            const index = savedDiet.findIndex((st) => (st.id === data.id))
            savedDiet[index] = t
        }

        setLocal('savedDiet', savedDiet)
        navigate(-1)
    }

    const handleClickConfirmation = () => setConfirmation({
        open: true,
        title: 'Deletar refeição',
        message: 'Deseja deletar a refeição?',
        data: data.id,
        type: 'delete diet'
    })

    const clickConfirmation = (data, type) => {
        if (type === 'delete diet') {
            deleteDiet(data)
        }
    }

    const deleteDiet = () => {
        const savedDiet = getLocal('savedDiet', [])
        const index = savedDiet.findIndex((st) => (st.id === data.id))
        savedDiet.splice(index, 1)
        setLocal('savedDiet', savedDiet)
        navigate(-1)
    }

    const handleCloseConfirmation = () => setConfirmation({...confirmation, open: false})

    return <Box className={'record-diet'}>
        <AppBar position={'static'} className={'app-bar-home'}>
            <Toolbar>
                <IconButton sx={{mr: 2}} onClick={() => navigate(-1)}>
                    <ArrowIcon color={'secondary'}/>
                </IconButton>
                <Typography variant={'h6'} sx={{flexGrow: 1}}>
                    Registrar dieta
                </Typography>
                {(!!data.id) && <IconButton sx={{mr: 2}} onClick={handleClickConfirmation}>
                    <DeleteIcon color={'secondary'}/>
                </IconButton>}
            </Toolbar>
        </AppBar>
        <Box className={'container'}>
            <Box className={'data'}>
                <TextField
                    value={data.name}
                    name={'name'}
                    slotProps={{inputLabel: {shrink: true}}}
                    fullWidth={true}
                    color={'secondary'}
                    size={'small'}
                    placeholder={'Refeição'}
                    label={'Refeição'}
                    margin={'dense'}
                    autoFocus={true}
                    onChange={handleInput}
                />
                <TextField
                    value={data.textData}
                    name={'textData'}
                    slotProps={{inputLabel: {shrink: true}}}
                    fullWidth={true}
                    color={'secondary'}
                    size={'small'}
                    placeholder={'Adicione a refeição e de um "Enter"'}
                    label={'Exercício'}
                    margin={'dense'}
                    multiline={true}
                    onChange={handleInput}
                />
            </Box>
            <Box className={'box-button'}>
                <Button
                    className={'button'}
                    variant={'contained'}
                    color={'secondary'}
                    onClick={handleClickConfirm}>
                    Confirmar
                </Button>
            </Box>
        </Box>
        <Box>
            <Toast
                open={toast.open}
                message={toast.message}
                onClose={handleCloseToast}
            />
            <DialogConfirmation
                open={confirmation.open}
                title={confirmation.title}
                message={confirmation.message}
                data={confirmation.data}
                type={confirmation.type}
                onClick={clickConfirmation}
                onClose={handleCloseConfirmation}
            />
        </Box>
    </Box>
}

export default RecordDiet
