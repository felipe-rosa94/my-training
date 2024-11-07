import {createRoot} from 'react-dom/client'
import {BrowserRouter, Route, Routes} from 'react-router-dom'

import themeMui from './themeMui.jsx'
import {ThemeProvider} from '@mui/material'

import Home from './pages/home/Home.jsx'
import Profile from './pages/profile/Profile.jsx'
import RecordTraining from './pages/recordTraining/RecordTraining.jsx'
import RecordDiet from './pages/recordDiet/RecordDiet.jsx'

import './index.scss'

createRoot(document.getElementById('root')).render(
    <ThemeProvider theme={themeMui}>
        <BrowserRouter basename={'/my-training'}>
            <Routes>
                <Route path='/' element={<Home/>}/>
                <Route path='/profile' element={<Profile/>}/>
                <Route path='/record-training' element={<RecordTraining/>}/>
                <Route path='/record-diet' element={<RecordDiet/>}/>
            </Routes>
        </BrowserRouter>
    </ThemeProvider>
)
