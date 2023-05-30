import { Container } from "./styles";
import { Card } from "../../components/Card";
import { DragDrop } from "../../components/DragDrop";
import {Button} from "../../components/Button"
import { DataTable }  from "../../components/DataTable";
import { api } from "../../services/api.js"

import { useState } from "react";
import {read, utils} from "xlsx";

export function Home() {
    
    const [pricingFile, setPricingFile] = useState(null);
    const [products,setProducts] = useState([]);

    
    const [onValidate, setOnValidate] = useState(false);
    const [dropped, setDropped] = useState(false);


    const [sumErrors,setSumErrors] = useState(1);
    
    function handleViewFile(file) {
        
        const reader =  new FileReader();
        reader.onload = event => {
            const wb = read(event.target.result);
            const sheets = wb.SheetNames;
            if(sheets.length){
                const rows = utils.sheet_to_json(wb.Sheets[sheets[0]]);
                setProducts(rows);
                setDropped(true);
            };
        };
        reader.readAsArrayBuffer(file)
    };

    function handleAddedFile(file) {
        setPricingFile(file)
        handleViewFile(file)
    }

    async function handleOnClickValidate() {
         
        try {
            if(pricingFile) {
                const fileUploadForm = new FormData();
  
                fileUploadForm.append('pricingFile',pricingFile);
        
                const response = await api.patch('/product/',fileUploadForm);
                
                const totalErrors = response.data.products.reduce(
                    (accumulator, product) => {
                        return accumulator + product.error_log.length;
                    },
                    0
                );

                setSumErrors(totalErrors);
                setProducts(response.data.products);
                setOnValidate(true);
            }
            
        } catch (error) {
            setOnValidate(false)
            return alert('Ocorreu um erro ao tentar validar arquivo.');
        }
                   
    }
    async function handleOnClickUpdate() {
        try {

            if(pricingFile) {
                const fileUploadForm = new FormData();
  
                fileUploadForm.append('pricingFile',pricingFile);
        
                const response = await api.patch('/product/',fileUploadForm);
                
                console.log("Produtos atualizados com sucesso.");

                setSumErrors(1)
                setProductsValidated([]);
            }
            
        } catch (error) {
            return alert('Ocorreu um erro ao tentar validar arquivo.');
        }
    }
    function hasErrors() {
        return sumErrors > 0
    }

    return (
        <Container>
            <Card>
                <DragDrop onFileChange = {file => handleAddedFile(file)}/>
                <div className="col-2">
                    <Button title="Validar" onClick={handleOnClickValidate} disabled={!hasErrors()}/>
                    <Button title="Atualizar" onClick={handleOnClickUpdate} disabled={hasErrors()}/>
                </div>
            </Card> 

            {
                //dropped caso queira mostrar a pré visualização
                onValidate && 
                <Card className="tableView">        
                    <DataTable data={products} onValidate={onValidate}/>
                </Card>
            } 
        </Container>
    );
}