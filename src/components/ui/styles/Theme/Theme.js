import { createContext, useContext } from 'react';
import { palette as defaultPalette } from './palette';

export const ThemeContext = createContext({});

export function useTheme() {
  return useContext(ThemeContext);
}

export default function Theme({
  palette = defaultPalette,
  mode = 'light',
  children,
}) {
  return (
    <ThemeContext.Provider value={palette[mode]}>
      {children}
    </ThemeContext.Provider>
  );
}
