import React from 'react';
import {useHistory} from 'react-router-dom';
import {makeStyles} from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Chip from '@material-ui/core/Chip';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles({
    root: {
        margin: 20,
        backgroundColor: 'white',
    },
    media: {
        maxWidth: 300,
        height: 200,
        display: 'inline-block',
    },
    textCard: {
        display: 'inline-block',
    },
});

export default function GameCard({game, handle}) {
    const classes = useStyles();
    const history = useHistory();

    function handleClick() {
        const path = '/Detail/' + game.title;
        history.push(path);
    }

    return (
        <div className={classes.root}>
            <img
                className={classes.media}
                src="https://media.rawg.io/media/stories-previews/faf/faf0bb37b806db65f1c76395c8f36c7c.jpg"
                alt="imagen"
            />
            <div className={classes.textCard}>
                <Typography>{game.title}</Typography>
                {game.tags.map((elem) => (
                    <Chip key={elem} label={elem} onClick={() => handle(elem)} />
                ))}
            </div>

            <Button onClick={handleClick} variant="contained" color="primary">
                Primary
            </Button>
        </div>
    );
}
