import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Autocomplete from '@material-ui/lab/Autocomplete';
import TextField from '@material-ui/core/TextField';
import {Grid, Typography} from '@material-ui/core';
import {firstCall, getGames} from 'services/apiCalls';
import GameCard from 'components/GameCard';
import NavBar from 'components/Navbar';

const useStyles = makeStyles((theme) => ({
    container: {
        //backgroundColor: '#6078a8',
        backgroundColor: '#577',
        minHeight: 1000,
    },
    searcher: {
        margin: '40px auto',
        width: '80%',
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
        console.log('apicall');
        firstCall().then((resp) => {
            setSuggestedTags(JSON.parse(resp.tags));
            setGames(JSON.parse(resp.games));
        });
    }, []);

    React.useEffect(() => {
        if (tags.length > 0) {
            getGames(tags).then((games) => {
                setGames(games);
                console.log('games', games);
            });
        }
    }, [tags]);

    return (
        <>
            <NavBar />

            <div className={classes.container}>
                <Grid container spacing={0}>
                    <Grid item md={3} sm={5} xs={12}>
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
                            getOptionLabel={(option) => option.name}
                            filterSelectedOptions={true}
                            value={tags}
                            renderInput={(params) => (
                                <TextField
                                    {...params}
                                    variant="standard"
                                    label="Tags Searcher"
                                    placeholder="Tag"
                                />
                            )}
                        />
                    </Grid>
                    <Grid item md={9} sm={7} xs={12}>
                        <GameCard games={games} />
                    </Grid>
                </Grid>
            </div>
        </>
    );
}
/*

            <div className={classes.container}>
            </div>
*/
