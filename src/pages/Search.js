import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Autocomplete from '@material-ui/lab/Autocomplete';
import TextField from '@material-ui/core/TextField';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import SportsEsportsIcon from '@material-ui/icons/SportsEsports';

import {getSuggestedTags, getGames} from 'services/apiCalls';
import GameCard from 'components/GameCard';

const useStyles = makeStyles((theme) => ({
    container: {
        backgroundColor: '#6078a8',
    },
    searcher: {
        width: '80%',
        margin: 'auto',
        marginTop: '20px',
        backgroundColor: '#ffffff',
    },
    cardContainer: {
        margin: 'auto',
    },
}));

export default function Search() {
    const classes = useStyles();
    const [tags, setTags] = React.useState([]);
    const [suggestedTags, setSuggestedTags] = React.useState([]);
    const [search, setSearch] = React.useState('');
    const [games, setGames] = React.useState([]);

    React.useEffect(() => {
        if (search) {
            getSuggestedTags(search).then((resp) => {
                setSuggestedTags(resp);
            });
        } else {
            setSuggestedTags([]);
        }
    }, [search]);
    React.useEffect(() => {
        if (tags.length > 0) {
            getGames(tags).then((games) => {
                setGames(games);
            });
        }
    }, [tags]);

    return (
        <div className={classes.container}>
            <AppBar position="static">
                <Toolbar>
                    <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
                        <SportsEsportsIcon />
                    </IconButton>
                    <Typography variant="h6" className={classes.title}>
                        Game Tags
                    </Typography>
                    <Button color="inherit">Login</Button>
                </Toolbar>
            </AppBar>
            <Autocomplete
                className={classes.searcher}
                onChange={(ev, value) => {
                    setTags(value);
                }} //el manejador al dar enter
                onInputChange={(ev, value) => {
                    setSearch(value);
                }}
                multiple
                id="tags-standard"
                options={suggestedTags}
                filterSelectedOptions={true}
                getOptionLabel={(option) => option.name}
                value={tags}
                renderInput={(params) => (
                    <TextField {...params} variant="standard" label="Tags Searcher" placeholder="Tag" />
                )}
            />

            <div className={classes.cardContainer}>
                {games.map((elem) => (
                    <GameCard game={elem} key={elem.title} />
                ))}
            </div>
        </div>
    );
}
