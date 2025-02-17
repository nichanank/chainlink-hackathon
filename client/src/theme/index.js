import React, { useEffect } from 'react'
import { ThemeProvider as StyledComponentsThemeProvider, createGlobalStyle, css } from 'styled-components'
import { useDarkModeManager } from '../contexts/LocalStorage'
import { checkSupportedTheme, getQueryParam } from '../utils'

export * from './components'

const MEDIA_WIDTHS = {
  upToSmall: 600,
  upToMedium: 960,
  upToLarge: 1280
}

export default function ThemeProvider({ children }) {
  const [darkMode, toggleDarkMode] = useDarkModeManager()
  const themeURL = checkSupportedTheme(getQueryParam(window.location, 'theme'))
  const themeToRender = themeURL
    ? themeURL.toUpperCase() === 'DARK'
      ? true
      : themeURL.toUpperCase() === 'LIGHT'
      ? false
      : darkMode
    : darkMode
  useEffect(() => {
    toggleDarkMode(themeToRender)
  }, [toggleDarkMode, themeToRender])
  return <StyledComponentsThemeProvider theme={theme('DARK')}>{children}</StyledComponentsThemeProvider>
}

const mediaWidthTemplates = Object.keys(MEDIA_WIDTHS).reduce((accumulator, size) => {
  accumulator[size] = (...args) => css`
    @media (max-width: ${MEDIA_WIDTHS[size]}px) {
      ${css(...args)}
    }
  `
  return accumulator
}, {})

const flexColumnNoWrap = css`
  display: flex;
  flex-flow: column nowrap;
`

const flexRowNoWrap = css`
  display: flex;
  flex-flow: row nowrap;
`

const white = '#FFFFFF'
const black = '#000000'

const theme = darkMode => ({
  white,
  black,
  textColor: '#0A1019',

  // for setting css on <html>
  backgroundColor: '#93d7ff',

  inputBackground: '#f7f7f7',
  placeholderGray: darkMode ? '#5F5F5F' : '#E1E1E1',
  shadowColor: darkMode ? '#000' : '#2F80ED',

  // grays
  concreteGray: darkMode ? '#292C2F' : '#FAFAFA',
  mercuryGray: darkMode ? '#333333' : '#E1E1E1',
  silverGray: darkMode ? '#737373' : '#C4C4C4',
  chaliceGray: darkMode ? '#7B7B7B' : '#AEAEAE',
  doveGray: darkMode ? '#C4C4C4' : '#737373',
  mineshaftGray: darkMode ? '#E1E1E1' : '#2B2B2B',
  buttonOutlineGrey: darkMode ? '#FAFAFA' : '#F2F2F2',
  tokenRowHover: darkMode ? '#404040' : '#F2F2F2',
  //blacks
  charcoalBlack: darkMode ? '#F2F2F2' : '#404040',
  // blues
  zumthorBlue: darkMode ? '#ADD8E6' : '#EBF4FF',
  malibuBlue: darkMode ? '#E67AEF' : '#5CA2FF',
  royalBlue: darkMode ? '#0A1019' : '#2F80ED',
  loadingBlue: darkMode ? '#e4f0ff' : '#e4f0ff',

  lastOfOursBlue: darkMode ? '#0A1019' : '#ADD8E6',

  // purples
  wisteriaPurple: '#DC6BE5',
  // reds
  salmonRed: '#FF6871',
  // orange
  pizazzOrange: '#FF8F05',
  // yellows
  warningYellow: '#FFE270',
  // pink
  uniswapPink: '#DC6BE5',
  connectedGreen: '#27AE60',

  darkMint: '#67ce81',

  //specific
  textHover: darkMode ? theme.lastOfOursLightBlue : theme.doveGray,

  // media queries
  mediaWidth: mediaWidthTemplates,
  // css snippets
  flexColumnNoWrap,
  flexRowNoWrap
})

export const GlobalStyle = createGlobalStyle`
  @import url('https://rsms.me/inter/inter.css');
  html { font-family: 'Inter', sans-serif; }
  @supports (font-variation-settings: normal) {
    html { font-family: 'Inter var', sans-serif; }
  }
  
  html,
  body {
    margin: 0;
    padding: 0;
    width: 100%;
    height: 100%;
    overflow: hidden;    
  }
  body > div {
    height: 100%;
    overflow: scroll;
    -webkit-overflow-scrolling: touch;
}
  html {
    font-size: 16px;
    font-variant: none;
    color: ${({ theme }) => theme.textColor};
    background-color: ${({ theme }) => theme.backgroundColor};
    transition: color 150ms ease-out, background-color 150ms ease-out;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
  }
`