import { useState } from "react";
import { useAuth } from "../Components/AuthProvider.jsx";
import NavBar from "../Components/NavBar.jsx";
import './styles.css';
import { useNavigate } from "react-router-dom";

const Login = () => {

  const [input, setInput] = useState({
    username: "",
    password: "",
  });

  const [mensaje, setMesaje] = useState("");

  const navigate = useNavigate();
  const auth = useAuth();

  const handleSumbitEvent = (e) => {
    e.preventDefault();
    console.log(input.username+', '+input.password)
    if (input.username !== "" && input.password !== "") {
      try {
        auth.login(input.username, input.password);
      } catch (error) {
        setMesaje(error.message);
      }
      return;
    }
    alert("El usuario y la contraseña deben ser obligatorios");
  }

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

  const handleInput = (e) => {
    const { name, value } = e.target;
    setInput((prev) => (
      {
        ...prev,
        [name]: value,
      }
    ))
  };

  return (
    <div>
      <header>
        <NavBar />
      </header>
      <div className='login_contenedorPrincipal'>
        <div className='login_contenedorImagen'>*
          <img src="src\assets\Logo-1.png" alt="Logo" />
          <span>PostCardShare</span>
        </div>
        <div className='login_contenedorFormulario'>
          <form onSubmit={handleSumbitEvent}>
            <div>
              <span className='login-span'>Correo electronico o Nombre de Usuario</span><br />

              <input
                className='login-input'
                type="text"
                id="user-name"
                name='username'
                aria-describedby='user-name'
                aria-invalid="false"
                onChange={handleInput}
              /><br />

              <span className='login-span'>Contraseña</span><br />

              <input
                className='login-input'
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
                src={status === "view" ? "src/assets/Login/view.png" : "src/assets/Login/hide.png"}
                alt=""
                onClick={verContraseña}
              />

              <span className="spamMessage">{mensaje}</span>
              <button className='login_boton' type='submit' style={{ marginTop: '5%' }}> Iniciar Sesión</button>
              <br /><span className="singuplink" onClick={() => navigate('/singup')}>Registrarse</span>
            </div>
          </form>
        </div>
      </div >
    </div>
  );
}

export default Login;
