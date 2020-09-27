import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import NavBar from 'components/Navbar';
import Button from '@material-ui/core/Button';
import {useHistory} from 'react-router-dom';

const useStyles = makeStyles(() => {});

export default function Login() {
    const classes = useStyles();

    const history = useHistory();

    const [values, setValues] = React.useState({
        password: '',
        email: '',
    });

    const handleChange = (event) => {
        setValues({
            ...values,
            [event.target.name]: event.target.value,
        });
    };

    const handleSubmit = () => {
        console.log(values);
    };

    return (
        <>
            <div>
                <NavBar />
                <form className={classes.root} noValidate autoComplete="off">
                    <TextField
                        id="standard-basic"
                        label="Correo Electrónico"
                        name="email"
                        type="text"
                        value={values.email}
                        onChange={handleChange}
                    />
                    <TextField
                        id="standard-adornment-password"
                        label="Contraeña"
                        name="password"
                        type="password"
                        value={values.password}
                        onChange={handleChange}
                    />

                    <Button variant="contained" color="primary" onClick={handleSubmit}>
                        Loguearse
                    </Button>
                </form>
            </div>
            <div>
                <Button variant="contained" color="primary" onClick={() => history.push('/SignUp/')}>
                    sign up
                </Button>
            </div>
        </>
    );
}
