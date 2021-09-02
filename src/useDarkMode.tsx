import React from 'react'

export function useDarkMode() {
  const preferDarkQuery = '(prefers-color-scheme: dark)';

  const [mode, setMode] = React.useState(
    () =>
      window.localStorage.getItem('colorMode') ||
      (window.matchMedia(preferDarkQuery).matches ? 'dark' : 'light'),
  );

  React.useEffect(() => {
    debugger;
    const mediaQuery = window.matchMedia(preferDarkQuery)
    const handleChange = () => setMode(mediaQuery.matches ? 'dark' : 'light')
    mediaQuery.addEventListener('change', handleChange)
    return () => mediaQuery.removeEventListener('change', handleChange)
  }, []);

  React.useEffect(() => {
    window.localStorage.setItem('colorMode', mode)
  }, [mode]);

  return [mode, setMode] as const;
}