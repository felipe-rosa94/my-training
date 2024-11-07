import {createTheme} from '@mui/material/styles'
import {primaryColor, secundaryColor, bodyColor} from './metrics.module.scss'

const ThemeMui = createTheme({
    palette: {
        primary: {
            main: primaryColor,
        },
        secondary: {
            main: secundaryColor
        }
    },
    components: {
        MuiTabs: {
            styleOverrides: {
                root: {
                    justifyContent: 'center', // Centraliza as abas
                },
                indicator: {
                    backgroundColor: secundaryColor, // Cor do indicador
                },
                textColorPrimary: {
                    color: secundaryColor, // Cor do texto ativo
                },
                textColorSecondary: {
                    color: secundaryColor, // Cor do texto inativo
                },
            },
        },
        MuiAppBar: {
            styleOverrides: {
                root: {
                    backgroundColor: bodyColor, // Cor de fundo da AppBar
                },
            },
        },
        MuiDialog: {
            styleOverrides: {
                paper: {
                    backgroundColor: bodyColor,
                    borderRadius: 30,
                    padding: 20
                }
            },
        },
        MuiDialogTitle: {
            styleOverrides: {
                root: {
                    fontFamily: "'Nunito', sans-serif"
                },
            },
        },
        MuiFormLabel: {
            styleOverrides: {
                root: {
                    fontFamily: "'Nunito', sans-serif"
                },
            },
        },
        // MuiDialogContent: {
        //     styleOverrides: {
        //         root: {
        //             padding: 10
        //         },
        //     },
        // },
        MuiDialogContentText: {
            styleOverrides: {
                root: {
                    color: '#ffffff'
                },
            },
        },
        MuiButton: {
            styleOverrides: {
                root: {
                    borderRadius: 10,
                    fontFamily: "'Nunito', sans-serif"
                },
            },
        },
        // MuiDrawer: {
        //     styleOverrides: {
        //         paper: {
        //             backgroundColor: bodyColor
        //         },
        //     },
        // },
        MuiTextField: {
            styleOverrides: {
                root: {
                    borderRadius: 50,
                    fontFamily: "'Nunito', sans-serif"
                },
            },
        },
        MuiOutlinedInput: {
            styleOverrides: {
                root: {
                    color: primaryColor,
                    borderRadius: 10,
                    fontFamily: "'Nunito', sans-serif"
                },
            },
        },
        MuiTypography: {
            styleOverrides: {
                root: {
                    color: secundaryColor,
                    fontFamily: "'Nunito', sans-serif"
                },
            },
        },
        MuiListItemText: {
            styleOverrides: {
                root: {
                    color: '#242424',
                    fontFamily: "'Nunito', sans-serif",  // Definindo a fonte
                },
            },
        },
        MuiToolbar: {
            styleOverrides: {
                root: {
                    backgroundColor: bodyColor
                },
            },
        },
        MuiInputLabel: {
            styleOverrides: {
                root: {
                    fontFamily: "'Nunito', sans-serif"
                },
            },
        },
        MuiTab: {
            styleOverrides: {
                root: {
                    fontFamily: "'Nunito', sans-serif"
                },
            },
        }
    },
});

export default ThemeMui
