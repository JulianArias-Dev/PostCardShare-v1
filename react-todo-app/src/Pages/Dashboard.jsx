import ActiveUser from '../Components/ActiveUser.jsx';
import Publicacion from '../Components/Publicacion.jsx';
import HeadDashboard from '../Components/HeadDashboard.jsx';
import './Dashboard.css';
import Anuncio from '../Components/Anuncio.jsx';
import Anuncio1 from '../assets/Anuncios/Anuncio1.png';
import Anuncio2 from '../assets/Anuncios/Anuncio2.png';


const Dashboard = () => {

  //const anunce = Anuncio1();
  return (
    <div>
      <HeadDashboard />

      <div className="dash_content">
        <div className="dash_left-div">
          <h4>Usuarios Activos</h4>
          <ActiveUser />
          <ActiveUser />
          <ActiveUser />
          <ActiveUser />
          <ActiveUser />
        </div>

        <div className="dash_middle-div">
          <h3>Publicaciones</h3>
          <Publicacion like={getRandomNumber()} dislike={getRandomNumber()} />
          <Publicacion like={getRandomNumber()} dislike={getRandomNumber()} />
          <Publicacion like={getRandomNumber()} dislike={getRandomNumber()} />
          <Publicacion like={getRandomNumber()} dislike={getRandomNumber()} />
          <Publicacion like={getRandomNumber()} dislike={getRandomNumber()} />
          <Publicacion like={getRandomNumber()} dislike={getRandomNumber()} />
          <Publicacion like={getRandomNumber()} dislike={getRandomNumber()} />
          <Publicacion like={getRandomNumber()} dislike={getRandomNumber()} />
          <Publicacion like={getRandomNumber()} dislike={getRandomNumber()} />
        </div>

        <div className="dash_right-div">
          <Anuncio imagen={Anuncio1}/>
          <Anuncio imagen={Anuncio2}/>
        </div>
      </div>

      <footer className='dash_footer'>
        <p>Derechos de autor &copy; 2024. Todos los derechos reservados.</p>
      </footer>
    </div>
  );
}

function getRandomNumber() {
  return Math.floor(Math.random() * 101); // Número aleatorio entre 0 y 100
}

export default Dashboard;
