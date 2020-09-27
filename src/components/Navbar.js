import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import SportsEsportsIcon from '@material-ui/icons/SportsEsports';
import {makeStyles} from '@material-ui/core/styles';
import {useHistory} from 'react-router-dom';

const useStyles = makeStyles(() => {});

export default function NavBar() {
    const classes = useStyles();
    const history = useHistory();

    return (
        <AppBar position="static">
            <Toolbar>
                <IconButton
                    edge="start"
                    className={classes.menuButton}
                    color="inherit"
                    aria-label="menu"
                    onClick={() => {
                        history.push('/');
                    }}
                >
                    <SportsEsportsIcon />
                </IconButton>
                <Typography variant="h6" className={classes.title}>
                    Game Tags
                </Typography>
                <Button
                    color="inherit"
                    onClick={() => {
                        history.push('/Login/');
                    }}
                >
                    Login
                </Button>
            </Toolbar>
        </AppBar>
    );
}
