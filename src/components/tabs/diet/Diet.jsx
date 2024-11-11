import React, {useState} from 'react'
import {useNavigate} from 'react-router-dom'
import {Box, Card, CardContent, Fab, IconButton, Typography} from '@mui/material'
import {AddRounded as AddIcon, EditRounded as EditIcon, FitnessCenterRounded as FitnessIcon} from '@mui/icons-material'
import {DialogConfirmation, DialogView} from '../../dialogs/Dialogs.jsx'
import {getLocal, setLocal} from "../../../hooks/useStorage/useStorage.jsx";

import '../training-diet.scss'

const Diet = () => {

    const navigate = useNavigate()
    const savedDiet = getLocal('savedDiet', [])

    const [view, setView] = useState({
        open: false,
        data: {},
        key: ''
    })

    const [confirmation, setConfirmation] = useState({
        open: false,
        title: '',
        message: '',
        data: '',
        type: ''
    })

    const handleClickView = (e, data) => {
        e.preventDefault()
        setView({open: true, data: data, key: 'savedDiet'})
    }

    const handleClickDiet = (e, data) => {
        e.preventDefault()
        navigate('/record-diet', {state: data})
    }

    const handleCloseViewDiet = () => setView({...view, open: false})

    const handleClickConfirmation = data => {
        setConfirmation({
            open: true,
            title: 'Concluir treino',
            message: 'Deseja confirmar a conclusão da refeição?',
            data: data,
            type: 'complete diet'
        })
        handleCloseViewDiet()
    }
    const clickConfirmation = (data, type) => {
        if (type === 'complete diet') {
            completeDiet(data)
        }
    }

    const completeDiet = id => {
        const savedDiet = getLocal('savedDiet', [])
        const index = savedDiet.findIndex((st) => st.id === id)
        savedDiet[index].data.forEach((ste) => {
            ste.checked = false
        })
        setLocal('savedDiet', savedDiet)
        setConfirmation({...confirmation, open: false})
        setView({...view, open: false})
    }

    const handleCloseConfirmation = () => setConfirmation({...confirmation, open: false})

    return <Box className={'training'}>
        <Box className={'container'}>
            {savedDiet.map((t, i) => <Card
                    key={i}
                    className={'card'}
                    onClick={(e) => handleClickView(e, t)}>
                    <CardContent className={'card-content'}>
                        <Box className={'box-content'}>
                            <FitnessIcon className={'icon'}/>
                            <Typography>
                                {t.name}
                            </Typography>
                        </Box>
                        <Box className={'box-content'}>
                            <IconButton size={'small'} onClick={(e) => handleClickDiet(e, t)}>
                                <EditIcon color={'secondary'}/>
                            </IconButton>
                        </Box>
                    </CardContent>
                </Card>
            )}
        </Box>
        <Box>
            <Fab
                className={'fab'}
                size={'small'}
                color={'secondary'}
                onClick={(e) => handleClickDiet(e, null)}>
                <AddIcon/>
            </Fab>
        </Box>
        <Box>
            {(view.open) && <DialogView
                open={view.open}
                dataView={view.data}
                keyView={view.key}
                onClose={handleCloseViewDiet}
                onClick={handleClickConfirmation}
            />}
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

export default Diet
