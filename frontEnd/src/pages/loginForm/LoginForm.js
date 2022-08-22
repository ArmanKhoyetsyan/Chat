import * as React from 'react';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import { Button, TextField } from '@mui/material';
import './LoginForm.css';
import { loginBtClick } from '../../service/app.service';
import { useNavigate } from 'react-router-dom';

export default function InputAdornments() {
  const navigate = useNavigate()

  const [values, setValues] = React.useState({
    userName: '',
    password: '',
  });

  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };


  return (


    <div className='loginForm'>
      <div className='mailInput'>
        <TextField
          id="outlined-basic"
          onChange={handleChange('userName')}
          label="Email"
          value={values.userName}
          variant="outlined" />
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
      <Button variant="contained" onClick={async () => {
        const res = await loginBtClick(values)
        if (res.status === 200) {
          navigate('/chat')
        } else {
          setValues({
            userName: '',
            password: '',
          })
        }
      }}>LogIn</Button>

    </div>
  );
}
