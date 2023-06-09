import React, { useState } from "react";
import axios from "axios";
import "./LoginForm.css";
import { useNavigate } from 'react-router-dom';

function LoginForm(props) {
  const [credentials, setCredentials] = useState({ username: "", password: "" });
  const navigate = useNavigate();

  function handleChange(event) {
    setCredentials({ ...credentials, [event.target.name]: event.target.value });
  }

  async function handleSubmit(event) {
    event.preventDefault();
  
    console.log('Credentials:', credentials);
  
    try {
      const url = 'http://localhost:3400/auth/login';
      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
      };
  
      const response = await axios.post(url, credentials, config);
      
      if (response && response.data) {
        console.log('Login response:', response.data);
        // console.log('Access token:', accessToken); // definir 'accessToken'

        console.log(response.data.token);

        console.log(response.data.userExist.username);

        //Seleccion de usuario
        if (response.data.userExist != null) {
          localStorage.setItem('name_user', response.data.userExist.name)
          localStorage.setItem('token', response.data.token)
          navigate('/home-admin');
        }
        else {
          console.error('El rol del usuario no es válido');
        }
        
      } else {
        console.error('La respuesta no contiene datos');
      }
    } catch (error) {
      if (error.response && error.response.data) {
        console.error('Error logging in:', error.response.data);
      } else {
        console.error('Error en la solicitud:', error);
      }
    }
  }

  return (
    <div id="fondo">
      <div className="auth-form-container">
        <div id="logo"></div>
        <h2>Inicio Sesión</h2>
        <form className="login-form" onSubmit={handleSubmit}>
          <label htmlFor="username">Usuario</label>
          <input value={credentials.username} onChange={handleChange} type="text" placeholder="Ingresa tu Usuario" id="username" name="username" />
          <label htmlFor="password">Contraseña</label>
          <input value={credentials.password} onChange={handleChange} type="password" placeholder="********" id="password" name="password" />
          <button className="button" type="submit">Iniciar Sesión</button>
        </form>
        <button className="link-btn" onClick={() => props.onFormSwitch('register')}>Olvido su Contraseña? Click Aquí.</button>
      </div>
      <div>
        
      </div>
    </div>
  );
}

export default LoginForm;
