import React from 'react'

const preferDarkQuery = '(prefers-color-scheme: dark)'

function darkModeReducer(state: any, action: any) {
  switch (action.type) {
    case 'MEDIA_CHANGE': {
      return { ...state, mode: action.mode }
    }
    case 'SET_MODE': {
      // make sure to spread that state just in case!
      return { ...state, mode: action.mode }
    }
    default: {
      // helps us avoid typos!
      throw new Error(`Unhandled action type: ${action.type}`)
    }
  }
}

// use the init function to lazily initialize state so we don't read into
// localstorage or call matchMedia every render
function init() {
  return {
    mode:
      window.localStorage.getItem('colorMode') ||
      (window.matchMedia(preferDarkQuery).matches ? 'dark' : 'light'),
  }
}

export function useDarkMode() {
  // const preferDarkQuery = '(prefers-color-scheme: dark)';

  // const [mode, setMode] = React.useState(
  //   () =>
  //     window.localStorage.getItem('colorMode') ||
  //     (window.matchMedia(preferDarkQuery).matches ? 'dark' : 'light'),
  // );

  const [state, dispatch] = React.useReducer(
    darkModeReducer,
    { mode: 'light' },
    init,
  )
  const { mode } = state



  React.useEffect(() => {
    const mediaQuery = window.matchMedia(preferDarkQuery)

    // const handleChange = () => setMode(mediaQuery.matches ? 'dark' : 'light')
    // mediaQuery.addEventListener('change', handleChange)

    const handleChange = () =>
      dispatch({
        type: 'MEDIA_CHANGE',
        mode: mediaQuery.matches ? 'dark' : 'light',
      })

    mediaQuery.addEventListener('change', handleChange)

    return () => mediaQuery.removeEventListener('change', handleChange)
  }, []);

  React.useEffect(() => {
    window.localStorage.setItem('colorMode', mode)
  }, [mode]);

  // We like the API the way it is, so instead of returning the state object
  // and the dispatch function, we'll return the `mode` property and we'll
  // create a setMode helper (which we have to memoize in case someone wants
  // to use it in a dependency list):
  const setMode = React.useCallback(
    newMode => dispatch({ type: 'SET_MODE', mode: newMode }),
    [],
  )

  return [mode, setMode] as const;
}