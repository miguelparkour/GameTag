import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Autocomplete from '@material-ui/lab/Autocomplete';
import TextField from '@material-ui/core/TextField';

import {getSuggestedTags, getGames} from 'services/apiCalls';
import GameCard from 'components/GameCard';
import NavBar from 'components/Navbar';

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

    const handleTagChild = (tag) => {
        setTags([tag]);
    };

    return (
        <div className={classes.container}>
            <NavBar />
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
                value={tags}
                renderInput={(params) => (
                    <TextField {...params} variant="standard" label="Tags Searcher" placeholder="Tag" />
                )}
            />

            <div className={classes.cardContainer}>
                {games.map((elem) => (
                    <GameCard game={elem} key={elem._id} handle={handleTagChild} />
                ))}
            </div>
        </div>
    );
}
