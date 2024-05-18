import { useState } from "react";
import { useAuth } from "./Components/AuthProvider.jsx";
import NavBar from "./Components/NavBar.jsx";
import './singup.css';

const Register = () => {

    
    const [input, setInput] = useState({
        username: "",
        password: "",
    });
    
    //const [mensaje, setMesaje] = useState("");
    //*/

    const auth = useAuth();

    const handleSumbitEvent = (e) => {
        e.preventDefault();
        if (input.username !== "" && input.password !== "") {
            try {
                auth.loginAction(input);
            } catch (error) {
                setMesaje(error.message);
            }
            return;
        }
        alert("El usuario y la contraseña deben ser obligatorios");
    }

    const handleInput = (e) => {
        const { name, value } = e.target;
        setInput((prev) => (
            {
                ...prev,
                [name]: value,
            }
        ))
    };
    //*/

    const [status, setStatus] = useState("view");

    const verContraseña = () => {
        const passwordField = document.getElementById("password");
        const button = document.getElementById("btnVerContraseña");

        if (status === "view") {
            passwordField.type = "text";
            button.src = "src/assets/hide.png";
            setStatus("hide");
        } else {
            passwordField.type = "password";
            button.src = "src/assets/view.png";
            setStatus("view");
        }
    };

    return (
        <div>
            <header>
                <NavBar />
            </header>
            <div className='contenedorPrincipal'>
                <div className='contenedorImagen'>
                    <img src="src\assets\Logo-1.png" alt="Logo" />
                    <span>PostCardShare</span>
                </div>
                <div className='contenedorFormulario'>
                    <form onSubmit={handleSumbitEvent}>
                        <div>
                            <span>Nombres</span><br />
                            <input
                                type="text"
                            ></input>
                            <span>Apellidos</span><br />
                            <input
                                type="text"
                            ></input>
                            <span>Correo Electrónico</span><br />
                            <input
                                type="text"
                            ></input>
                            <span>Telefono</span><br />
                            <input
                                type="text"
                            ></input>
                            <span>Ciudad</span><br />
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
                                onChange={handleInput}
                            /><br />

                            <span>Contraseña</span><br />
                            <input
                                type="password"
                                id="password"
                                name="password"
                                aria-describedby="user-password"
                                aria-invalid="false"
                                onChange={handleInput}
                            />
                            <img
                                className="eye"
                                id="btnVerContraseña"
                                src={status === "view" ? "src/assets/view.png" : "src/assets/hide.png"}
                                alt=""
                                onClick={verContraseña}
                            />

                            <span className="spamMessage"></span>
                            <button className='boton' type='submit'> Registrarse</button>

                        </div>
                    </form>
                </div>
            </div >
        </div>
    );
}

export default Register;
