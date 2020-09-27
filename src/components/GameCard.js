import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Chip from '@material-ui/core/Chip';

const useStyles = makeStyles({
    root: {
        margin: 20,
        backgroundColor: 'white'
    },
    media: {
        maxWidth: 300,
        height: 200,
        display: 'inline-block'
    },
    textCard: {
        display: 'inline-block'
    }
});

export default function GameCard({ game }) {

    const classes = useStyles();

    const handleDelete = (elem) => {
        console.log('deleteando chip',elem)
    }

    return (
        <div className={classes.root}>
            <img className={classes.media} src='https://media.rawg.io/media/stories-previews/faf/faf0bb37b806db65f1c76395c8f36c7c.jpg' alt='imagen' />
            <div className={classes.textCard}>
                <Typography>
                    {game.title}
                </Typography>
                {
                    game.tags.map(elem =>
                        <Chip
                            key={elem}
                            label={elem}
                            onDelete={()=>console.log('deleteando chip',elem)} // no me deja sacarlo fuera
                        />
                )}
            </div>
        </div>
    );
}
