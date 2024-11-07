import moment from 'moment'
import {Box, FormLabel, LinearProgress, Tooltip, Typography} from '@mui/material'
import {getLocal} from '../../hooks/useStorage/useStorage.jsx'

import './imc-tmb.scss'

const getIMCColor = (imc) => {
    if (imc < 16.0) return '#9c27b0'
    if (imc >= 16.0 && imc < 17.0) return '#673ab7'
    if (imc >= 17.0 && imc < 18.5) return '#2196f3'
    if (imc >= 18.5 && imc < 25.0) return '#4caf50'
    if (imc >= 25.0 && imc < 30.0) return '#ffeb3b'
    if (imc >= 30.0 && imc < 35.0) return '#ff9800'
    if (imc >= 35.0 && imc < 40.0) return '#ff5722'
    return '#f44336'
}

const getIMCTitle = (imc) => {
    if (imc < 16.0) return 'Abaixo do peso severo'
    if (imc >= 16.0 && imc < 17.0) return 'Abaixo do peso moderado'
    if (imc >= 17.0 && imc < 18.5) return 'Abaixo do peso leve'
    if (imc >= 18.5 && imc < 25.0) return 'Peso normal (ideal)'
    if (imc >= 25.0 && imc < 30.0) return 'Sobrepeso'
    if (imc >= 30.0 && imc < 35.0) return 'Obesidade grau I'
    if (imc >= 35.0 && imc < 40.0) return 'Obesidade grau II'
    return 'Obesidade grau III'
}

const calculateAge = (birthDate) => {
    const today = moment()
    const birth = moment(birthDate)
    const age = today.diff(birth, 'years')
    return age
}

const IMCTBM = () => {
    const profile = getLocal('profile')
    const heightCm = parseInt(profile.height)
    const heightM = (parseInt(profile.height) / 100)
    const weight = parseInt(profile.weight)
    const imc = (weight / (heightM * heightM))
    const imcLimitado = Math.min(imc, 40)
    const progressValue = (imcLimitado / 40) * 100
    const age = calculateAge(profile.birthDate)
    const tbm = (profile.sex === 'man')
        ? (88.36 + (13.4 * weight) + (4.8 * heightCm) - (5.7 * age))
        : (447.6 + (9.2 * weight) + (3.1 * heightCm) - (4.3 * age))
    return <Box className={'imc-tmb'}>
        <Box className={'imc'}>
            <Typography variant={'h6'}>
                IMC
            </Typography>
            <FormLabel className={'label'}>
                {imc.toFixed(1)}
            </FormLabel>
            <Box width={'100%'} mt={2}>
                <Tooltip title={getIMCTitle(imc)}>
                    <LinearProgress
                        variant="determinate"
                        value={progressValue}
                        sx={{
                            height: 10,
                            borderRadius: 10,
                            backgroundColor: '#e0e0e0',
                            '& .MuiLinearProgress-bar': {
                                backgroundColor: getIMCColor(imc)
                            }
                        }}
                    />
                </Tooltip>
            </Box>
        </Box>
        <Box className={'tmb'}>
            <Typography variant={'h6'}>
                TBM
            </Typography>
            <FormLabel className={'label'}>
                {tbm.toFixed(1)}
            </FormLabel>
        </Box>
    </Box>
}

export default IMCTBM
