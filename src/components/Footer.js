import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Link from '@material-ui/core/Link';
import {Grid, Typography} from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton';
import SportsEsportsIcon from '@material-ui/icons/SportsEsports';
const useStyles = makeStyles((theme) => ({
    root: {
        backgroundColor: theme.palette.primary.main,
        color: theme.palette.primary.contrastText,
        padding: 50,
        paddingTop: 20,
        textAlign: 'center',
    },
}));

export default function Footer() {
    const classes = useStyles();
    return (
        <div className={classes.root}>
            <Grid container spacing={3}>
                <Grid item xs={12} md={6}>
                    <IconButton color="inherit">
                        <SportsEsportsIcon fontSize="default" />
                        <Typography variant="h6"> TagGames</Typography>
                    </IconButton>
                    <Typography variant="overline" display="block">
                        Developed by Miguel Ángel Bermúdez Ramírez
                    </Typography>
                    <Typography variant="overline" display="block">
                        Alcalá de Henares, Madrid (Spain)
                    </Typography>
                </Grid>
                <Grid item xs={12} md={6}>
                    <Typography variant="subtitle2" style={{marginTop: 20}}>
                        Fuentes de datos:
                    </Typography>
                    <Typography variant="button">
                        <Link href="https://rawg.io/" target="blank" color="inherit">
                            RAWG.IO
                        </Link>
                    </Typography>
                    <Typography variant="button">
                        {' - '}
                        <Link href="https://www.igdb.com/discover" target="blank" color="inherit">
                            IGDB
                        </Link>
                        {' - '}
                    </Typography>
                    <Typography variant="button">
                        <Link href="https://steamcommunity.com/" target="blank" color="inherit">
                            Steam
                        </Link>
                    </Typography>
                </Grid>
            </Grid>
        </div>
    );
}
