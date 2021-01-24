import React from 'react';
import clsx from 'clsx';
import {useTheme} from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Box from '@material-ui/core/Box';

import SettingsIcon from '@material-ui/icons/Settings';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import PersonIcon from '@material-ui/icons/Person';
import MenuIcon from '@material-ui/icons/Menu';
import GraphIcon from '@material-ui/icons/ShowChart';

import {useHistory} from 'react-router-dom'

import {useStyles} from './theme'

export const NavBar: React.FC = ({children}) => {
  const classes = useStyles();
  const theme = useTheme();
  const history = useHistory();
  const [open, setOpen] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const handleSettingsOpen = () => {
    console.log('open')
  };

  const handleClick = (name: string = '') => () => {
    // event.preventDefault();
    console.log('Going to:', name)
    history.push(`/${name.replace(' ', '')}`)
  }

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar
        position="fixed"
        className={clsx(classes.appBar, {
          [classes.appBarShift]: open,
        })}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            className={clsx(classes.menuButton, open && classes.hide)}
          >
            <MenuIcon />
          </IconButton>

          {/* whatever is on the left side */}
          <Box display='flex' flexGrow={1}>
            <Typography variant="h6" noWrap>
              Advanced Dynamic and Machine-trained -{'>'} Pullup System
  					</Typography>
          </Box>

          {/* whatever is on the right side */}
          <IconButton onClick={handleSettingsOpen}>
            <SettingsIcon color="inherit" />
          </IconButton>
        </Toolbar>
      </AppBar>
      <Drawer
        className={classes.drawer}
        variant="persistent"
        anchor="left"
        open={open}
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <div className={classes.drawerHeader}>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
          </IconButton>
        </div>
        <Divider />
        <List>
          {['User Management', 'Users', 'Graphs'].map((text) => (
            <ListItem button key={text} onClick={handleClick(text)}>
              {text === 'User Management' &&
                <ListItemIcon><PersonIcon /></ListItemIcon>
              }
              {text === 'Users' &&
                <ListItemIcon><PersonIcon /></ListItemIcon>
              }
              {text === 'Graphs' &&
                <ListItemIcon><GraphIcon /></ListItemIcon>
              }

              <ListItemText primary={text} />
            </ListItem>
          ))}
        </List>
        <Divider />
        <List>
          {['Settings'].map((text) => (
            <ListItem button key={text} onClick={handleClick(text)}>
              <ListItemIcon><SettingsIcon /></ListItemIcon>
              <ListItemText primary={text} />
            </ListItem>
          ))}
        </List>
      </Drawer>

      <main
        className={clsx(classes.content, {
          [classes.contentShift]: open,
        })}
      >
        <div className={classes.drawerHeader} />
        {children}
      </main>
    </div>
  );
}
