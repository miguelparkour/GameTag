import React from 'react'
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';

// services
import { getGames } from "services/apiCalls"

export default function Searchbar() {

    var [names, setNames] = React.useState([])
    var [dropdown, setDropdown] = React.useState()


    React.useEffect(() => {
        console.log( names )
        getGames(names)
            .then((res) => {
                console.log(`respuesta: ${res.results}`)
                setDropdown(res.results)
            })
    }, [names])

    const handleInput = (ev,inputValue) => {
        console.log(inputValue)
        if(inputValue.le){
            setNames(inputValue)
        }
    }

    console.log(dropdown)

    return (
        <Autocomplete
          onInputChange={handleInput}
          id="combo-box-demo"
          options={dropdown||[]}
          getOptionLabel={(option) => option.name}
          style={{ width: 'auto' }}
          renderInput={(params) => <TextField {...params} label="Búsqueda de videojuegos" variant="outlined" />}
        />
      );
    
}

/* import { Link, useHistory } from 'react-router-dom'
import { getGames } from "services/apiCalls"
import Autocomplete from '@material-ui/lab/Autocomplete';
import TextField from '@material-ui/core/TextField';

export default function Searchbar() {

    var [names, setNames] = React.useState([])
    var [display, setDisplay] = React.useState('none')
    var [dropdown, setDropdown] = React.useState()
    var history = useHistory();
    var delayTimer;


    React.useEffect(() => {
        getGames(names)
            .then((res) => {
                setDropdown(res.results)
            })
    }, [names])


    const handleInput = (ev) => {
        const textSearch = ev.target.value;
        textSearch ? setDisplay('block') : setDisplay('none')
        clearTimeout(delayTimer);
        delayTimer = setTimeout(() => {
            if (textSearch)
                setNames(textSearch)
        }, 500)
    }
    const handleSubmit = (ev) => {
        ev.preventDefault()
        setDisplay('none')
        history.push('/Search/' + ev.target.search.value)
    }
    const style = {
        display: display,
        width: '80%',
        top: 'auto',
        left: 'auto'
    }
    return (
        <>
            <Autocomplete
                id="combo-box-demo"
                options={dropdown||[]}
                getOptionLabel={(option) => option.title}
                style={{ width: 300 }}
                renderInput={(params) => <TextField {...params} label="Combo box" variant="outlined" />}
            />
        </>

    )
}
 */