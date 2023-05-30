import { Container } from "./styles";
import { RiDragDropLine } from 'react-icons/ri';
import { useRef, useState } from "react";

export function DragDrop({onFileChange}) {
    
    const wrapperRef = useRef(null);
    const [filename, setFilename] = useState(null);


    const onDragEnter = () => wrapperRef.current.classList.add('dragover');
    const onDragLeave = () => wrapperRef.current.classList.remove('dragover');
    const onDrop = () => wrapperRef.current.classList.remove('dragover');

    function handleFileDrop(e) {
        const pricingFile = e.target.files[0];
        
        if(pricingFile) {
            if(pricingFile.name.toLowerCase().endsWith('.csv')){
                setFilename(pricingFile);
                onFileChange(pricingFile);
            }else{
                return alert("informe um arquivo válido");
            }

        }
    }

    return (
        <Container
            ref={wrapperRef}
            onDragEnter={onDragEnter}
            onDragLeave={onDragLeave}
            onDrop={onDrop}
        >
            
            <RiDragDropLine size={50}/>
            <p>Clique ou arraste o arquivo até aqui.</p>
            <input 
                type="file" 
                id="csv"
                onChange={e => handleFileDrop(e)}
            />
        </Container>
    );
}