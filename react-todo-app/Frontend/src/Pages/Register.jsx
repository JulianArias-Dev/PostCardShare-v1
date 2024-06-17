import { useState } from "react";
import './Register.css';
import { useNavigate } from "react-router-dom";

const Register = () => {


    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const navigate = useNavigate();

    const handleRegister = (e) => {
        e.preventDefault();
        const users = JSON.parse(localStorage.getItem('users')) || [];
        const newUser = { name, username, password };
        users.push(newUser);
        localStorage.setItem('users', JSON.stringify(users));
        console.log('Usuario: ' + newUser.username + ', Contraseña: ' + newUser.password);
        navigate('/singin');
    };



    const [status, setStatus] = useState("view");

    const verContraseña = () => {
        const passwordField = document.getElementById("password");
        const button = document.getElementById("btnVerContraseña");

        if (status === "view") {
            passwordField.type = "text";
            button.src = "src/assets/Login/hide.png";
            setStatus("hide");
        } else {
            passwordField.type = "password";
            button.src = "src/assets/Login/view.png";
            setStatus("view");
        }
    };

    return (
        <div className='contenedorPrincipal'>
            <div className='contenedorImagen'>
                <img src="src\assets\Logo.png" alt="Logo" />
                <span>PostCardShare</span>
            </div>
            <div className='contenedorFormulario'>
                <form onSubmit={handleRegister}>
                    
                        <h3>Registro</h3>
                        <p>Llene los campos para realizar el registro</p>
                        <br /><br /><br />
                        <span>Nombres</span><br />
                        <input
                            type="text" value={name} onChange={(e) => setName(e.target.value)}
                        ></input>
                        <span>Correo Electrónico</span><br />
                        <input
                            type="text"
                        ></input>
                        <span>Telefono</span><br />
                        <input
                            type="text"
                        ></input>
                        <span>Nombre de Usuario</span><br />
                        <input
                            type="text"
                            id="user-name"
                            name='username'
                            aria-describedby='user-name'
                            aria-invalid="false"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        /><br />

                        <span>Contraseña</span><br />
                        <input
                            type="password"
                            id="password"
                            name="password"
                            aria-describedby="user-password"
                            aria-invalid="false"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <img
                            className="eye"
                            id="btnVerContraseña"
                            src={status === "view" ? "src/assets/Login/view.png" : "src/assets/Login/hide.png"}
                            alt=""
                            onClick={verContraseña}
                        />

                        <span className="spamMessage"></span>
                        <button className='boton' type='submit'> Registrarse</button>
                </form>
            </div>
        </div >

    );
}

export default Register;
