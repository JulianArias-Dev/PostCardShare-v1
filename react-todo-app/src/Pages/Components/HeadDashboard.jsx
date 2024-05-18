import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "./AuthProvider";

const HeadDashboard = () => {
    const auth = useAuth();
    const navigate = useNavigate();
    return (
        <>
        <header className='dash_header'>
                <nav className='dash_nav'>
                    <div className="new_name">
                        <img src="src\assets\user (1).png" alt="perfil" onClick={() => navigate('/Perfil')} />
                        <ul>
                            <li><Link to='/Perfil'>Perfil</Link></li>
                        </ul>

                        <div className='searchBox'>
                            <input
                                type="text"
                                name=""
                                id="searchBox"
                                value="Buscar en PostCardShare"
                            />
                            <img 
                                src="src\assets\search.png" 
                                alt="Buscar" 
                                className='lupa'/>
                        </div>

                        <ul className='logout'>
                            <img src='src\assets\logout (1).png' alt='LogOut' onClick={() => auth.logOutAction()}></img>
                        </ul>
                    </div>
                </nav>
            </header>
        </>
    );
}

export default HeadDashboard;