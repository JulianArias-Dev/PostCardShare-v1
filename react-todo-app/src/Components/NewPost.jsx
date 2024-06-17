import { useRef, useState } from 'react';
import './NewPost.css';

const NewPost = () => {
    const dialogRef = useRef(null);
    const [SelectedFile, setSelectedFile] = useState(null);
    const [preview, setPreview] = useState('../src/assets/image-gallery.png');
    const [textButton, setTextButton] = useState('+');

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        setSelectedFile(file);
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreview(reader.result);
            };
            reader.readAsDataURL(file);
        } else {
            setPreview('https://asset.cloudinary.com/dlx1sufu4/6bed64660b374e4c857131d9584d1796');
        }
    };

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

    const modifyValue = (opcion) => {
        if (opcion === 1) {
            setTextButton('Crear Reseña');
        } else {
            setTextButton('+');
        }
    };

    return (
        <>
            <button onClick={showDialog} onMouseEnter={() => modifyValue(1)} onMouseLeave={() => modifyValue(2)} className='floating-button'>{textButton}</button>

            <dialog className='dialogPost' ref={dialogRef}>
                <h3>Nueva Reseña</h3>
                <div className='container'>
                    <div className='sub'>
                        <div className='imageDiv'>
                            <label htmlFor="fileInput" className="file-link">
                                Seleccionar archivo
                                <input type="file" id="fileInput" onChange={handleFileChange} />
                                <span>Seleccionar archivo</span> {/* Este span ocultará el texto del input */}
                            </label>
                            {preview && (
                                <div>
                                    <img src={preview} alt="Vista previa de la imagen" />
                                </div>
                            )}
                        </div>

                    </div>

                    <form className='formPost' method="dialog">
                        <p>
                            <label>Calificación: </label> <input type="number" name="rating" />
                        </p>
                        <p>
                            <label>Lugar:        </label> <input type="text" name="site" /> 
                        </p>
                        <p>
                            <label>Descripción: </label> <textarea name="content" onChange={autoResize}></textarea>
                        </p>

                        <div className='botones'>
                            <button style={{background:'#005187'}} type="submit">Publicar</button>
                            <button style={{background:'#DE2D18'}} type="button" onClick={closeDialog}>Cancelar</button>
                        </div>
                    </form>
                </div>
            </dialog>
        </>
    );
};

export default NewPost;
