import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Chip from '@material-ui/core/Chip';

const useStyles = makeStyles((theme) => ({
    detail: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'flex-start',
    },
    item: {
        height: 'max-content',
        minWidth: 100,
        maxWidth: 300,
        margin: 20,
        paddingLeft: 10,
        borderLeft: 'inset',
    },
    chip: {
        backgroundColor: theme.palette.primary.main,
        color: theme.palette.primary.contrastText,
        border: '1px solid',
        borderColor: theme.palette.primary.contrastText,
        margin: 5,
    },
    deleteIcon: {
        color: 'darkgrey',
        '&:hover': {
            color: 'dimgrey',
        },
    },
}));

const Block = function ({classes, title, list, isFilter, onDeleteTag}) {
    if (Array.isArray(list) && list.length > 0) {
        return (
            <div className={classes.item}>
                <Typography variant="subtitle1">{title + ':'}</Typography>
                {list.map((elem) => {
                    if (isFilter) {
                        return (
                            <Chip
                                key={elem}
                                className={classes.chip}
                                label={elem}
                                onDelete={onDeleteTag(elem)}
                                size="medium"
                                color="primary"
                                variant="outlined"
                                classes={{deleteIconOutlinedColorPrimary: classes.deleteIcon}}
                            />
                        );
                    } else {
                        return (
                            <Chip
                                key={elem}
                                className={classes.chip}
                                label={elem}
                                size="small"
                                color="primary"
                                variant="outlined"
                            />
                        );
                    }
                })}
            </div>
        );
    } else {
        return <></>;
    }
};

export default function ChipsContainer({game, isFilter = false, onDeleteTag}) {
    const classes = useStyles();
    if (game && Object.keys(game).length > 0) {
        return (
            <>
                <div className={classes.detail}>
                    <Block
                        classes={classes}
                        title="platforms"
                        list={game.platforms}
                        isFilter={isFilter}
                        onDeleteTag={onDeleteTag}
                    />
                    <Block
                        classes={classes}
                        title="engines"
                        list={game.game_engines}
                        isFilter={isFilter}
                        onDeleteTag={onDeleteTag}
                    />
                    <Block
                        classes={classes}
                        title="modes"
                        list={game.game_modes}
                        isFilter={isFilter}
                        onDeleteTag={onDeleteTag}
                    />
                    <Block
                        classes={classes}
                        title="genres"
                        list={game.genres}
                        isFilter={isFilter}
                        onDeleteTag={onDeleteTag}
                    />
                    <Block
                        classes={classes}
                        title="companies"
                        list={game.involved_companies}
                        isFilter={isFilter}
                        onDeleteTag={onDeleteTag}
                    />
                    <Block
                        classes={classes}
                        title="perspectives"
                        list={game.player_perspectives}
                        isFilter={isFilter}
                        onDeleteTag={onDeleteTag}
                    />
                    <Block
                        classes={classes}
                        title="themes"
                        list={game.themes}
                        isFilter={isFilter}
                        onDeleteTag={onDeleteTag}
                    />
                    {isFilter ? (
                        <>
                            <Block
                                classes={classes}
                                title="Collections"
                                list={game.collection}
                                isFilter={isFilter}
                                onDeleteTag={onDeleteTag}
                            />
                        </>
                    ) : (
                        <></>
                    )}
                </div>
            </>
        );
    } else if (isFilter) {
        return (
            <div className={classes.item}>
                <Typography variant="subtitle1">Empty Filters</Typography>
            </div>
        );
    } else {
        return <></>;
    }
}
