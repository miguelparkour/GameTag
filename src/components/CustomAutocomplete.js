/*import React from 'react';
import TextField from '@material-ui/core/TextField';
import {makeStyles} from '@material-ui/core/styles';
import data from 'data';

const useStyles = makeStyles((theme) => ({
    searcher: {
        margin: '40px auto',
        width: '80%',
    },
}));

export default function CustomAutocomplete() {
    const classes = useStyles();

    const handle = function (event) {
        if (event.nativeEvent.inputType !== 'deleteContentBackward') {
            let tags = data.filter((e) => e.name.toLowerCase().startsWith(event.target.value.toLowerCase()));
            if (tags.length > 0) {
                let input = event.target;
                let value = input.value;
                let preValue = value.length;
                let postValue = preValue + tags[0].name.length;
                if (value.length > 0) {
                    input.value += tags[0].name.substring(input.value.length, tags[0].name.length);
                    input.selectionStart = value.length;
                    input.selectionEnd = postValue;
                }
            }
        }
    };

    return (
        <div className={classes.searcher}>
            <TextField onInput={handle} id="standard-basic" label="Standard" placeholder="hola" />
        </div>
    );
}
*/
