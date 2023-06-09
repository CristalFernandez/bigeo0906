import React, { useState } from "react";

export const Registro = (props) => {
    const [email, setEmail] = useState('');
    const [pass, setPass] = useState('');
    const [name, setName] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(email);
    }

    return (
        <div className="auth-form-container">
            <h2>Recuperar Constraseña</h2>
        <form className="recuperate-form" onSubmit={handleSubmit}>
            <label htmlFor="email">Ingresa el correo para enviar un código de verificación</label>
            <input value={email} onChange={(e) => setEmail(e.target.value)}type="email" placeholder="tucorreo@correo.com" id="email" name="email" />
            
            <button type="submit">Enviar Código</button>
        </form>
        <button className="link-btn" onClick={() => props.onFormSwitch('login')}>Ya tienes una cuenta? Inicia Aqui.</button>
    </div>
    )
}