// Components/NavBar.js
import { Link } from 'react-router-dom';
import './NavBar.css';

const NavBar = () => {

  return (
    <>
      {
        <nav className='navBar_Nav'>
          <div>
            <span>PostCardShare.com</span>
          </div>
          <div className='navBar_Navdiv'>
            <ul>
              <li>
                <Link to="/singin">Iniciar Sesión</Link>
              </li>
              <li>
                <Link to="/singup">Registrarse</Link>
              </li>
            </ul>
          </div>
        </nav>

      }
    </>

  );
};

export default NavBar;





