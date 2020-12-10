import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Autocomplete from '@material-ui/lab/Autocomplete';
import TextField from '@material-ui/core/TextField';
import {Grid} from '@material-ui/core';
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';
import {firstCall, getGames} from 'services/apiCalls';
import GameCard from 'components/GameCard';
import NavBar from 'components/Navbar';
import ChipsContainer from 'components/ChipsContainer';

const useStyles = makeStyles((theme) => ({
    container: {
        backgroundColor: theme.palette.primary.dark,
        minHeight: 500,
    },
    searcher: {
        margin: '40px auto',
        width: '80%',
    },
    cardContainer: {
        margin: 'auto',
    },
    backdrop: {
        zIndex: theme.zIndex.drawer + 1,
        color: theme.palette.primary.contrastText,
    },
    filter: {
        width: '90%',
        margin: 'auto',
        backgroundColor: theme.palette.primary.main,
        color: theme.palette.primary.contrastText,
        padding: 20,
        overflow: 'auto',
        borderRadius: 16,
    },
}));

export default function Search() {
    const classes = useStyles();
    const [tags, setTags] = React.useState([]);
    const [suggestedTags, setSuggestedTags] = React.useState([]);
    const [open, setOpen] = React.useState(false);
    const [games, setGames] = React.useState([]);
    const [filterGame, setFilterGame] = React.useState({});

    React.useEffect(() => {
        let tags = JSON.parse(localStorage.getItem('tags'));
        let games = JSON.parse(localStorage.getItem('games'));
        if (tags && games) {
            setSuggestedTags(tags);
            setGames(games);
        } else {
            setOpen((o) => (o = !o));
            firstCall()
                .then((resp) => {
                    localStorage.clear();
                    setSuggestedTags(JSON.parse(resp.tags));
                    localStorage.setItem('tags', resp.tags);
                    setGames(JSON.parse(resp.games));
                    localStorage.setItem('games', resp.games);
                })
                .catch((err) => ''(err))
                .finally(() => setOpen((o) => (o = false)));
        }
    }, []);

    React.useEffect(() => {
        if (tags.length > 0) {
            let temp = {};
            tags.forEach((elem) => {
                if (!temp.hasOwnProperty(elem.type)) {
                    temp[elem.type] = [];
                }
                temp[elem.type].push(elem.name);
            });
            setFilterGame(temp);
            setOpen((o) => (o = !o));
            getGames(tags)
                .then((games) => {
                    setGames(games);
                    console.log(games);
                    localStorage.setItem('games', JSON.stringify(games));
                })
                .catch((err) => console.log(err))
                .finally(() => setOpen((o) => (o = false)));
        }
    }, [tags]);

    const deleteTag = (chip) => () => {
        console.log('chip: ', chip);
        setTags(tags.filter((elem) => elem.name !== chip));
        setFilterGame({});
    };
    return (
        <>
            <NavBar />

            <Backdrop className={classes.backdrop} open={open}>
                <CircularProgress color="inherit" />
            </Backdrop>
            <div className={classes.container}>
                <Grid container spacing={0}>
                    <Grid item md={3} sm={5} xs={12}>
                        <Autocomplete
                            className={classes.searcher}
                            onHighlightChange={(ev, op) => {
                                if (ev) ev.target.value = op.name;
                            }}
                            onChange={(ev, value) => {
                                setTags(value);
                            }}
                            multiple
                            options={suggestedTags.sort((a, b) =>
                                a.type > b.type ? -1 : b.type > a.type ? 1 : 0
                            )}
                            getOptionLabel={(option) => option.name}
                            filterSelectedOptions={true}
                            value={tags}
                            groupBy={(option) => option.type}
                            renderInput={(params) => (
                                <TextField
                                    {...params}
                                    variant="standard"
                                    label="Tags Searcher"
                                    placeholder="Tag"
                                />
                            )}
                            ChipProps={{style: {display: 'none'}}}
                        />
                        <div className={classes.filter}>
                            <ChipsContainer game={filterGame} isFilter={true} onDeleteTag={deleteTag} />
                        </div>
                    </Grid>
                    <Grid item md={9} sm={7} xs={12}>
                        <GameCard games={games} />
                    </Grid>
                </Grid>
            </div>
        </>
    );
}
