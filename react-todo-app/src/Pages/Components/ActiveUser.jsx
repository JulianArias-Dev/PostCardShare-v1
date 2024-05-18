import { useNavigate } from "react-router-dom";

const ActiveUser = () => {
    
    const navigate = useNavigate();

    return (
        <>
        <div className="activeuser">
            <img src="src\assets\user (2).png" alt="user" onClick={() => navigate('/Perfil')}/>
            <h5 onClick={() => navigate('/Perfil')}>Nombre</h5>
        </div>
        </>
    )
}

export default ActiveUser;