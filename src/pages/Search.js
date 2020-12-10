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

//------ Styles ------
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
    // ::::::: USE STATES :::::::
    // tags[] seleccionados, se usarán como filtro en la BD
    const [tags, setTags] = React.useState([]);
    // todos los tags menos los seleccionados
    const [suggestedTags, setSuggestedTags] = React.useState([]);
    // juegos[] devueltos por la BD
    const [games, setGames] = React.useState([]);
    // estado del spinner de carga
    const [open, setOpen] = React.useState(false);
    // usado para pintar la los filtros en pantalla, es un game que usa el componente ChipsContainer
    const [filterGame, setFilterGame] = React.useState({});

    // styles
    const classes = useStyles();

    // ::::::: USE STATES :::::::
    /*  Se ejecuta solo la primera vez, pinta en pantalla un array de juegos,
        ya sea desde el localStorage o si no, desde una llamaba al back.
        También carga el array de Tags y gestiona el spinner*/
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
    /*  state que se activa cada vez que cambia la variable tags:
            Repinta el nuevo fitro de busqueda (filterGame), y hace 
            la petición a la BD con los nuevos tags, además usa el spinner*/
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
                    localStorage.setItem('games', JSON.stringify(games));
                })
                .catch((err) => console.log(err))
                .finally(() => setOpen((o) => (o = false)));
        }
    }, [tags]);

    // ::::::: PRIVATE METHODS :::::::
    // evento que le pasamos a ChipContainer para deletear tags
    const deleteTag = (chip) => () => {
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
                            ChipProps={{style: {display: 'none'}}}
                            value={tags}
                            multiple
                            filterSelectedOptions={true}
                            options={suggestedTags.sort((a, b) =>
                                a.type > b.type ? -1 : b.type > a.type ? 1 : 0
                            )}
                            getOptionLabel={(option) => option.name}
                            groupBy={(option) => option.type}
                            renderInput={(params) => (
                                <TextField
                                    {...params}
                                    variant="standard"
                                    label="Tags Searcher"
                                    placeholder="Select a Tag!"
                                />
                            )}
                            onHighlightChange={(ev, op) => {
                                if (ev) ev.target.value = op.name;
                            }}
                            onChange={(ev, value) => {
                                setTags(value);
                            }}
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
