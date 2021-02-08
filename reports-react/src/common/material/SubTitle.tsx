import * as React from 'react'
import Typography from '@material-ui/core/Typography';

export const SubTitle: React.FC<{title: string}> = ({title}) => {
  return (
    <Typography variant="h6" component="h4" gutterBottom>
      {title}
    </Typography>
  )
}