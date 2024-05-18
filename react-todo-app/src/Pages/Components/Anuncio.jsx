import { Link } from "react-router-dom";

const Anuncio = ({imagen}) => {
    return (
        <>
        <div
            style={{ height: '45%', width: '99%', padding:'1% 3%'}}
          >
            <Link to="/Website">
              <img
                src={imagen} alt="Anuncio"
                style={{ height: '98%', width: '95%', borderRadius: '3px' }} />
            </Link>
          </div>
        </>
    );
}

export default Anuncio;