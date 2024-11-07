import {useState} from 'react'
import {useNavigate} from 'react-router-dom'

import {
    AppBar,
    Box,
    Button,
    FormControl,
    FormControlLabel,
    FormLabel, IconButton,
    Radio,
    RadioGroup,
    TextField,
    Toolbar, Typography
} from '@mui/material'
import {ArrowBackRounded as ArrowIcon} from '@mui/icons-material'
import {getLocal, setLocal} from '../../hooks/useStorage/useStorage.jsx'

import Toast from '../../components/toast/Toast.jsx'

import './profile.scss'

const Profile = () => {
    const navigate = useNavigate()
    const dataProfile = getLocal('profile', {
        name: '',
        birthDate: '',
        height: '',
        weight: '',
        sex: 'man'
    })
    const [profile, setProfile] = useState(dataProfile)
    const [toast, setToast] = useState({
        open: false,
        message: ''
    })

    const handleCloseToast = () => setToast({open: false})
    const handleInput = e => setProfile({...profile, [e.target.name]: e.target.value})
    const handleClickConfirm = () => {
        if (!profile.name)
            return setToast({open: true, message: 'Nome inválido!'})
        if (!profile.birthDate)
            return setToast({open: true, message: 'Data de nascimento inválida!'})
        if (!profile.height)
            return setToast({open: true, message: 'Altura inválida!'})
        if (!profile.weight)
            return setToast({open: true, message: 'Altura inválida!'})
        setLocal('profile', profile)
        navigate(-1)
    }

    return <Box className={'profile'}>
        <AppBar position={'sticky'}>
            <Toolbar>
                <IconButton
                    size={'small'}
                    sx={{mr: 2}}
                    onClick={() => navigate(-1)}>
                    <ArrowIcon
                        color={'secondary'}
                        className={'fitness-icon'}
                    />
                </IconButton>
                <Typography variant="h6" component="div" sx={{flexGrow: 1}}>
                    Perfil
                </Typography>
            </Toolbar>
        </AppBar>
        <Box className={'container'}>
            <TextField
                value={profile.name}
                name={'name'}
                slotProps={{inputLabel: {shrink: true}}}
                fullWidth={true}
                color={'secondary'}
                size={'small'}
                placeholder={'Nome'}
                label={'Nome'}
                margin={'dense'}
                autoFocus={true}
                onChange={handleInput}
            />
            <TextField
                value={profile.birthDate}
                name={'birthDate'}
                slotProps={{inputLabel: {shrink: true}}}
                fullWidth={true}
                color={'secondary'}
                size={'small'}
                placeholder={'Data de nascimento'}
                label={'Data de nascimento'}
                margin={'dense'}
                type={'date'}
                onChange={handleInput}
            />
            <TextField
                value={profile.height}
                name={'height'}
                slotProps={{inputLabel: {shrink: true}}}
                fullWidth={true}
                color={'secondary'}
                size={'small'}
                placeholder={'cm'}
                label={'Altura'}
                margin={'dense'}
                type={'number'}
                onChange={handleInput}
            />
            <TextField
                value={profile.weight}
                name={'weight'}
                slotProps={{inputLabel: {shrink: true}}}
                fullWidth={true}
                color={'secondary'}
                size={'small'}
                placeholder={'kg'}
                label={'Peso'}
                margin={'dense'}
                type={'number'}
                onChange={handleInput}
            />
            <Box>
                <FormControl className={'form-control-sex'}>
                    <FormLabel className={'title'}>
                        Sexo
                    </FormLabel>
                    <RadioGroup
                        className={'radio-group'}
                        defaultValue={'man'}
                        value={profile.sex}
                        onChange={handleInput}>
                        <FormControlLabel
                            name={'sex'}
                            label={'Homem'}
                            value={'man'}
                            control={<Radio
                                sx={{
                                    color: 'secondary.main',
                                    '&.Mui-checked': {
                                        color: 'secondary.main'
                                    }
                                }}/>
                            }/>
                        <FormControlLabel
                            name={'sex'}
                            label={'Mulher'}
                            value={'woman'}
                            control={<Radio
                                sx={{
                                    color: 'secondary.main',
                                    '&.Mui-checked': {
                                        color: 'secondary.main'
                                    }
                                }}/>
                            }/>
                    </RadioGroup>
                </FormControl>
            </Box>
            <Box p={1}/>
            <Button
                fullWidth={true}
                variant={'contained'}
                color={'secondary'}
                onClick={handleClickConfirm}>
                Confirmar
            </Button>
        </Box>
        <Box>
            <Toast
                open={toast.open}
                message={toast.message}
                onClose={handleCloseToast}
            />
        </Box>
    </Box>
}

export default Profile
