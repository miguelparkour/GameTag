import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import NavBar from 'components/Navbar';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles(() => {});

export default function SignUp() {
    const classes = useStyles();
    const [values, setValues] = React.useState({
        password: '',
        email: '',
        confirmPassword: '',
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
                    id="password"
                    label="Contraseña"
                    name="password"
                    type="password"
                    value={values.password}
                    onChange={handleChange}
                />
                <TextField
                    id="confirmPassword"
                    label="Confirmar Contraseña"
                    name="confirmPassword"
                    type="password"
                    value={values.confirmPassword}
                    onChange={handleChange}
                />

                <Button variant="contained" color="primary" onClick={handleSubmit}>
                    registrarse
                </Button>
            </form>
        </div>
    );
}
