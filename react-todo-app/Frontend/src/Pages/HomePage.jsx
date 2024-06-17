import './styles.css';
import NavBar from '../Components/NavBar.jsx';

const HomePage = () => {
  return (
    <>
    <header>
      <NavBar />
    </header>
      <div className='homepage'>
        <div className="content">
          <div className="text">
            <h2>Explora Colombia: Tu guía de viajes local</h2>
            <br />
            <span>Descubre los secretos mejor guardados, consejos expertos y reseñas auténticas</span>
            <hr />
            <nav className='images'>
              <img src="src/assets/Samples/quindio-3977049_640.jpg" alt="Imagen 3" />
              <img src="src/assets/Samples/colombia-4936995_640.jpg" alt="Imagen 2" />
              <img src="src/assets/Samples/cartagena-4910430_1280.jpg" alt="Imagen 1" />
              <img src="src/assets/Samples/river-1405645_640.jpg" alt="Imagen 4" />
              <img src="src/assets/Samples/colombia-2722841_640.jpg" alt="Imagen 5" />
            </nav>
          </div>
        </div>
        <footer>
          <img className='colombiaft' src="src\assets\Flag_of_Colombia.svg.webp" alt="bandera de colombia" />
        </footer>
      </div>
    </>

  )
}


export default HomePage;
