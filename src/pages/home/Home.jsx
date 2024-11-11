import {useEffect, useRef, useState} from 'react'
import {useNavigate} from 'react-router-dom'

import {
    clearLocal,
    clearSession,
    getLocal,
    getSession, removeLocal,
    setLocal,
    setSession
} from '../../hooks/useStorage/useStorage.jsx'

import {
    PersonRounded as PerfilIcon,
    FitnessCenterRounded as FitnessIcon,
    SettingsRounded as SettingsIcon,
    ClearAll as ClearAllIcon,
    DeleteRounded as DeleteIcon,
    UploadRounded as UploadIcon,
    DownloadRounded as DownloadIcon,
    FlashOnRounded as FlashIcon
} from '@mui/icons-material'
import {
    AppBar,
    Box,
    FormLabel,
    IconButton,
    ListItemIcon,
    Menu,
    MenuItem,
    MenuList,
    Tab,
    Tabs,
    Toolbar,
    Typography
} from '@mui/material'

import UserData from '../../components/tabs/UserData.jsx'
import Diet from '../../components/tabs/diet/Diet.jsx'
import Training from '../../components/tabs/traninig/Training.jsx'

import './home.scss'
import {DialogConfirmation} from "../../components/dialogs/Dialogs.jsx";
import {randomLetters, randomNumber} from "react-lf-tools";
import {HomeContext} from "../../context/HomeContext.jsx";

const TabPanel = (props) => {
    const {children, value, index, ...other} = props

    return (
        <div
            role={'tabpanel'}
            hidden={value !== index}
            id={`tabpanel-${index}`}
            aria-labelledby={`tab-${index}`}
            {...other}>
            {value === index && (
                <Box sx={{p: 3}}>
                    <FormLabel>{children}</FormLabel>
                </Box>
            )}
        </div>
    )
}

const Home = () => {
    const navigate = useNavigate()
    const [selectedFile, setSelectedFile] = useState(null)
    const fileInputRef = useRef(null)
    const [contTraining, setContTraining] = useState(getLocal('contTraining', 0))

    const [confirmation, setConfirmation] = useState({
        open: false,
        title: '',
        message: '',
        data: '',
        type: ''
    })
    const [value, setValue] = useState(getSession('tab', 0))
    const [anchorEl, setAnchorEl] = useState(null)
    const open = Boolean(anchorEl)

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget)
    }
    const handleClose = () => {
        setAnchorEl(null)
    }
    const hadleClickDeleteTraining = () => setConfirmation({
        open: true,
        title: 'Deletar treinos',
        message: 'Deseja apagar todos os treinos salvos?',
        data: '',
        type: 'delete training'
    })
    const openFileExplorer = () => {
        fileInputRef.current.value = '';
        fileInputRef.current.click()
        handleClose()
    }
    const handleClickExportTraning = () => {
        const savedTrainings = getLocal('savedTrainings', [])
        let txt = ''
        savedTrainings.forEach((st) => {
            txt += `${st.name.trim()}\n;\n${st.textData.trim()}\n///\n`
        })
        const blob = new Blob([txt], {type: 'text/plain'})
        const url = URL.createObjectURL(blob)
        const link = document.createElement('a')
        link.href = url
        link.download = 'treino.txt'
        document.body.appendChild(link)
        link.click()
        document.body.removeChild(link)
        URL.revokeObjectURL(url)
    }
    const handleFileChange = (event) => {
        const file = event.target.files[0]
        if (file && file.type === 'text/plain') {
            setSelectedFile(file)
            readFileContent(file)
        } else {
            alert('Por favor, selecione um arquivo .txt')
        }
    }
    const readFileContent = (file) => {
        const reader = new FileReader()
        reader.onload = (e) => {
            importTraining(e.target.result)
        }
        reader.readAsText(file)
    }
    const importTraining = value => {
        removeLocal('savedTrainings')
        const savedTrainings = getLocal('savedTrainings', [])
        value.split('///').forEach((v) => {
            if (v !== '') {
                const t = v.split(';')
                const arrData = []
                const txtData = trimNewLines(t[1])
                txtData.split('\n').forEach((e) => arrData.push({
                    id: randomLetters() + randomNumber(),
                    checked: false,
                    name: e
                }))
                const training = {
                    id: new Date().getTime(),
                    name: t[0],
                    data: arrData,
                    textData: txtData
                }
                savedTrainings.push(training)
            }
        })
        setLocal('savedTrainings', savedTrainings)
        window.location.reload()
    }
    const trimNewLines = (str) => {
        return str.replace(/^[\n\r]+|[\n\r]+$/g, '')
    }
    const handleChange = (event, newValue) => {
        setValue(newValue)
        setSession('tab', newValue)
    }
    const checkProfile = () => {
        const profile = getLocal('profile')
        if (!profile) navigate('/profile')
    }
    const handleClickProfile = () => navigate('/profile')
    const handleClickResetData = () => setConfirmation({
        open: true,
        title: 'Redefinir dados',
        message: 'Deseja apagar todos os dados salvos?',
        data: '',
        type: 'reset data'
    })
    const clickConfirmation = (data, type) => {
        if (type === 'reset data') {
            clearLocal()
            clearSession()
            window.location.reload()
        } else if (type === 'delete training') {
            removeLocal('savedTrainings')
            window.location.reload()
        }
    }
    const handleCloseConfirmation = () => setConfirmation({...confirmation, open: false})

    useEffect(() => {
        checkProfile()
    }, [])

    return <Box className={'home'}>
        <AppBar position={'static'} className={'app-bar-home'}>
            <Toolbar>
                <IconButton sx={{mr: 2}}>
                    <FitnessIcon color={'secondary'}/>
                </IconButton>
                <Typography variant={'h6'} sx={{flexGrow: 1}}>
                    My training
                </Typography>
                <IconButton
                    sx={{mr: 2}}
                    onClick={handleClick}>
                    <FlashIcon color={'secondary'}/>
                    <Box className={'cont-training'}>
                        <FormLabel className={'label'}>
                            {contTraining}
                        </FormLabel>
                    </Box>
                </IconButton>
                <IconButton
                    sx={{mr: 2}}
                    onClick={handleClick}>
                    <SettingsIcon color={'secondary'}/>
                </IconButton>
                <Menu
                    anchorEl={anchorEl}
                    open={open}
                    onClose={handleClose}
                    anchorOrigin={{
                        vertical: 'top',
                        horizontal: 'left',
                    }}
                    transformOrigin={{
                        vertical: 'top',
                        horizontal: 'left',
                    }}>
                    <MenuList>
                        <MenuItem onClick={handleClickProfile}>
                            <ListItemIcon>
                                <PerfilIcon fontSize={'small'}/>
                            </ListItemIcon>
                            <FormLabel>
                                Perfil
                            </FormLabel>
                        </MenuItem>
                        <MenuItem onClick={openFileExplorer}>
                            <ListItemIcon>
                                <UploadIcon fontSize={'small'}/>
                            </ListItemIcon>
                            <FormLabel>
                                Importar treino
                            </FormLabel>
                        </MenuItem>
                        <MenuItem onClick={handleClickExportTraning}>
                            <ListItemIcon>
                                <DownloadIcon fontSize={'small'}/>
                            </ListItemIcon>
                            <FormLabel>
                                Exportar treino
                            </FormLabel>
                        </MenuItem>
                        <MenuItem onClick={hadleClickDeleteTraining}>
                            <ListItemIcon>
                                <DeleteIcon fontSize={'small'}/>
                            </ListItemIcon>
                            <FormLabel>
                                Deletar treinos
                            </FormLabel>
                        </MenuItem>
                        <MenuItem onClick={handleClickResetData}>
                            <ListItemIcon>
                                <ClearAllIcon fontSize={'small'}/>
                            </ListItemIcon>
                            <FormLabel>
                                Redefinir dados
                            </FormLabel>
                        </MenuItem>
                    </MenuList>
                </Menu>
            </Toolbar>
            <Box className={'box-tabs'}>
                <Tabs value={value} onChange={handleChange}>
                    <Tab
                        sx={{color: value === 0 ? 'white' : 'gray'}}
                        label={'Treino'}/>
                    <Tab
                        sx={{color: value === 1 ? 'white' : 'gray'}}
                        label={'Dieta'}/>
                    <Tab
                        sx={{color: value === 2 ? 'white' : 'gray'}}
                        label={'Dados'}/>
                </Tabs>
            </Box>
        </AppBar>
        <HomeContext.Provider value={{setContTraining}}>
            <TabPanel value={value} index={0}>
                <Training/>
            </TabPanel>
            <TabPanel value={value} index={1}>
                <Diet/>
            </TabPanel>
            <TabPanel value={value} index={2}>
                <UserData/>
            </TabPanel>
        </HomeContext.Provider>
        <Box className={'box-footer'}>
            <FormLabel className={'label'}>
                {import.meta.env.VITE_VERSION}
            </FormLabel>
        </Box>
        <Box>
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
        <input
            type={'file'}
            accept={'.txt'}
            ref={fileInputRef}
            style={{display: 'none'}}
            onChange={handleFileChange}
        />
    </Box>
}

export default Home
