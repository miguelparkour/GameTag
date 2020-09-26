import React from 'react'
import NavBar from 'components/NavBar'
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  container: {
      backgroundColor: theme.palette.primary.main,
  },
  miguel: {      
      fontSize: 54,
    }
}));

export default function Home() {
    
    const classes = useStyles();


    return (
        <div>
            <NavBar />
            {/* <h1 className={classes.container}> Soy Home</h1>
            <h1 className={classes.miguel}> Soy Home</h1>  
            <Button variant="contained" color="secondary" className={classes.miguel}>
                Primary
            </Button>
            <Typography variant="h1">Hola mundoooo!!!</Typography> */}
        </div>
    )
}
