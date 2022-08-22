import * as React from 'react';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import { Button, TextField } from '@mui/material';
import './LoginForm.css';
import { loginBtClick } from '../../service/app.service';

export default function InputAdornments() {
  const [values, setValues] = React.useState({
    email: '',
    password: '',
  });

  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };


  return (


    <div className='loginForm'>
      <div className='mailInput'>
        <TextField id="outlined-basic" label="Email" variant="outlined" />
      </div>
      <div className='pasInput'>
        <FormControl sx={{ m: 1, width: '235px' }} variant="outlined">
          <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
          <OutlinedInput
            id="outlined-adornment-password"
            type={values.showPassword ? 'text' : 'password'}
            value={values.password}
            onChange={handleChange('password')}
            label="Password"
          />
        </FormControl>
      </div>
      <Button variant="contained" onClick={loginBtClick}>LogIn</Button>

    </div>
  );
}