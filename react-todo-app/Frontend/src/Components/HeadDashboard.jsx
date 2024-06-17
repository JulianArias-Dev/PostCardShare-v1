import { useNavigate } from "react-router-dom";
import { useAuth } from "./AuthProvider";

const HeadDashboard = () => {
  const { user, logout } = useAuth(); // Extrae logout correctamente
  const navigate = useNavigate();

  return (
    <>
      <header className='dash_header'>
        <nav className='dash_nav'>
          <div className="new_name">
            <img className="imagenperfil" src="src/assets/user (1).png" alt="perfil" onClick={() => navigate('/Perfil')} />
            <label onClick={() => navigate('/Perfil')}>{user?.name}</label> {/* Usa optional chaining por si user es null */}
            
            <div className='searchBox'>
              <input
                type="text"
                name=""
                id="searchBox"
                placeholder="Buscar en PostCardShare"
              />
              <img 
                src="src/assets/search.png" 
                alt="Buscar" 
                className='lupa'
              />
            </div>

            <ul className='log-out'>
              <img src='src/assets/logout (1).png' alt='LogOut' onClick={logout}></img> {/* Llama a logout directamente */}
            </ul>
          </div>
        </nav>
      </header>
    </>
  );
}

export default HeadDashboard;
