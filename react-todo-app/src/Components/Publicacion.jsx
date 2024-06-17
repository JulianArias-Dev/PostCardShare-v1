import { useNavigate } from "react-router-dom";
import '../Pages/Dashboard.css'
import Reportar from "./Reportar";

const Publicacion = ({ like, dislike }) => {

    const navigate = useNavigate();

    return (
        <div className="publicacion">
            <img className="photo" src="src\assets\Publications\postcard.png" alt="imagen" />
            <div>
                <div>
                    <label onClick={() => navigate('/Perfil')} >Usuario</label>
                    <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                        <Reportar />
                    </div>
                </div>
                <img className="star" src="src\assets\Publications\filledstar.png" alt="" />
                <img className="star" src="src\assets\Publications\filledstar.png" alt="" />
                <img className="star" src="src\assets\Publications\filledstar.png" alt="" />
                <img className="star" src="src\assets\Publications\filledstar.png" alt="" />
                <img className="star" src="src\assets\Publications\emptystar.png" alt="" />
                <p>#ciudad #lugar #clima</p>
                <p>Esta fue mi experiencia al visitar lugar en ciudad...</p>
                <span>{like}</span>
                <img className="like" src="src\assets\Publications\like.png" alt="" />
                <span>{dislike}</span>
                <img className="like" src="src\assets\Publications\dislike.png" alt="" />
            </div>
        </div>
    );
}

export default Publicacion;
