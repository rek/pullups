import * as React from 'react'
import {ThemeProvider} from '@material-ui/core/styles';
import {useTheme} from '@material-ui/core/styles';

const customTheme = {
  background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
};

export const Wrapper: React.FC = ({children}) => {
  const theme = useTheme()

  return (
    <ThemeProvider theme={{...customTheme, ...theme}}>{children}</ThemeProvider>
  )
}