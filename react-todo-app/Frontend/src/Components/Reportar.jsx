import { useRef } from "react";
import './Reportar.css'
const Reportar = () => {
    const dialogRef = useRef(null);


    const showDialog = () => {
        if (dialogRef.current) {
            dialogRef.current.showModal();
        } else {
            console.error('Dialog reference is null');
        }
    };
    const closeDialog = () => {
        if (dialogRef.current) {
            dialogRef.current.close();
        } else {
            console.error('Dialog reference is null');
        }
    };

    
    const autoResize = (e) => {
        e.target.style.height = 'auto'; // Resetea la altura
        e.target.style.height = e.target.scrollHeight + 'px'; // Establece la altura basada en el scrollHeight
    };
    
    return (
        <>
            <img className="dots" src="../src/assets/more.png" alt="Opciones" onClick={showDialog}/>
            <dialog className="diaglogReport" ref={dialogRef}>
                <div className="dialog-header">¿Por qué quieres reportar esta publicación?</div>
                <div className="dialog-body">
                    <form className="reportForm" id="reportForm">
                        <div>
                            <input type="checkbox" id="opcion1" name="reporte" value="opcion1" />
                            <label htmlFor="opcion1">Desnudos o actividad sexual</label>
                        </div>
                        <div>
                            <input type="checkbox" id="opcion2" name="reporte" value="opcion2" />
                            <label htmlFor="opcion2">Lenguaje o simbolos que incitan al odio</label>
                        </div>
                        <div>
                            <input type="checkbox" id="opcion1" name="reporte" value="opcion1" />
                            <label htmlFor="opcion1">Violencia </label>
                        </div>
                        <div>
                            <input type="checkbox" id="opcion2" name="reporte" value="opcion2" />
                            <label htmlFor="opcion2">Venta de articulos ilegales</label>
                        </div>
                        <div>
                            <input type="checkbox" id="opcion1" name="reporte" value="opcion1" />
                            <label htmlFor="opcion1">Bullying o acoso </label>
                        </div>
                        <div>
                            <input type="checkbox" id="opcion1" name="reporte" value="opcion1" />
                            <label htmlFor="opcion1">Infraccion de la propiedad intelectual</label>
                        </div>
                        <div>
                            <label htmlFor="infoAdicional">Información adicional:</label><br />
                            <textarea id="infoAdicional" onChange={autoResize} name="infoAdicional" rows="4" cols="50"></textarea>
                        </div>
                    </form>
                </div>
                <div className="dialog-footer">
                    <button className="button cancel" onClick={closeDialog} id="cancelButton">Cancelar</button>
                    <button className="button" onClick={closeDialog} id="submitButton">Enviar</button>
                </div>
            </dialog>
        </>
    );
};

export default Reportar;