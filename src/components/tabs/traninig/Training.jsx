import {useContext, useState} from 'react'
import {useNavigate} from 'react-router-dom'
import {getLocal, setLocal} from '../../../hooks/useStorage/useStorage.jsx'

import {Box, Card, CardContent, Fab, IconButton, Typography} from '@mui/material'
import {AddRounded as AddIcon, FitnessCenterRounded as FitnessIcon, EditRounded as EditIcon} from '@mui/icons-material'
import {HomeContext} from '../../../context/HomeContext.jsx'

import {DialogConfirmation, DialogView} from '../../dialogs/Dialogs.jsx'

import '../training-diet.scss'

const Training = () => {

    const {setContTraining} = useContext(HomeContext)
    const navigate = useNavigate()
    const savedTrainings = getLocal('savedTrainings', [])

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
        setView({
            ...view,
            open: true,
            data: data,
            key: 'savedTrainings'
        })
    }
    const handleClickTraining = (e, data) => {
        e.preventDefault()
        navigate('/record-training', {state: data})
    }

    const handleCloseViewTrainig = () => setView({...view, open: false})

    const handleClickConfirmation = data => {
        setConfirmation({
            open: true,
            title: 'Concluir treino',
            message: 'Deseja confirmar a conclusão do treino?',
            data: data,
            type: 'complete training'
        })
        handleCloseViewTrainig()
    }

    const clickConfirmation = (data, type) => {
        if (type === 'complete training') {
            completeTraining(data)
        }
    }

    const completeTraining = id => {
        const savedTrainings = getLocal('savedTrainings', [])
        const index = savedTrainings.findIndex((st) => st.id === id)
        savedTrainings[index].data.forEach((ste) => {
            ste.checked = false
        })
        let contTraining = getLocal('contTraining', 0)
        setLocal('contTraining', ++contTraining)
        setContTraining(contTraining)
        setLocal('savedTrainings', savedTrainings)
        setConfirmation({...confirmation, open: false})
        setView({...view, open: false})
    }

    const handleCloseConfirmation = () => setConfirmation({...confirmation, open: false})

    return <Box className={'training'}>
        <Box className={'container'}>
            {savedTrainings.map((t, i) => <Card
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
                            <IconButton size={'small'} onClick={(e) => handleClickTraining(e, t)}>
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
                onClick={(e) => handleClickTraining(e, null)}>
                <AddIcon/>
            </Fab>
        </Box>
        <Box>
            {(view.open) && <DialogView
                open={view.open}
                dataView={view.data}
                keyView={view.key}
                onClose={handleCloseViewTrainig}
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

export default Training
