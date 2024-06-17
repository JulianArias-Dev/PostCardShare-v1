import Publicacion from "../Components/Publicacion.jsx";
import HeadDashboard from '../Components/HeadDashboard.jsx';

const Profile = () => {
    
    return (
        <>
            <HeadDashboard />        
            <div className="profile">
                <div className="userabout">
                    <img src="src\assets\user (1).png" alt="imagen" />
                    <div>
                        <h1>Nombre de Usuario</h1>
                        <span>Descripcion del usurio</span><br />
                        <span>Ciudad Origen</span><br />
                        <span>Edad</span>
                    </div>
                </div>
                <h3>Publicaciones</h3>
                <div className="publicaciones">
                    <Publicacion like={100} dislike={12} />
                    <Publicacion like={340} dislike={45} />
                    <Publicacion like={867} dislike={57} />
                </div>
            </div>

            <footer className='dash_footer'>
                <p>Derechos de autor &copy; 2024. Todos los derechos reservados.</p>
            </footer>
        </>
    );
}

export default Profile;