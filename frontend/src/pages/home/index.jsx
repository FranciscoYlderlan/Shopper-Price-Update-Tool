import { Container } from "./styles";
import { Card } from "../../components/Card";
import { DragDrop } from "../../components/DragDrop";
import {Button} from "../../components/Button"
import { DataTable }  from "../../components/DataTable";
import { api } from "../../services/api.js"

import { useState } from "react";
import {read, utils} from "xlsx";

export function Home() {
    
    // const avatarURL =  user.avatar ? `${api.defaults.baseURL}/files/${user.avatar}`;
    
    const [pricingFile, setPricingFile] = useState(null);
    const [products,setProducts] = useState([]);
    const [productsValidated,setProductsValidated] = useState([]);
    
    function handleViewFile(file) {
        
        const reader =  new FileReader();
        reader.onload = event => {
            const wb = read(event.target.result);
            const sheets = wb.SheetNames;
            if(sheets.length){
                const rows = utils.sheet_to_json(wb.Sheets[sheets[0]]);
                setProducts(rows);
            };
        };
        reader.readAsArrayBuffer(file)
    };

    function handleAddedFile(file) {
        
        // const filePreview = URL.createObjectURL(file);
        
        setPricingFile(file)

        handleViewFile(file)
    }

    async function handleValidateFile() {
         
        try {

            if(pricingFile) {
                const fileUploadForm = new FormData();
                console.log(pricingFile);
                fileUploadForm.append('pricingFile',pricingFile);
                console.log(fileUploadForm)
                const response = await api.patch('/product/',fileUploadForm);
                console.log(response.data)
                setProductsValidated(response.data.pricingFile);
            }
            
            // localStorage.setItem('@rating-movie:user', JSON.stringify( user ));


            return alert("Perfil de usuário atualizado com sucesso!")
                
        } catch (error) {
                return alert('Ocorreu um erro ao tentar validar arquivo.');
        }
           
        
    }
    



    return (
        <Container>
            <Card>
                <DragDrop onFileChange = {file => handleAddedFile(file)}/>
                <div className="col-2">
                    <Button title="Validar" onClick={handleValidateFile}/>
                    <Button title="Atualizar"/>
                </div>
            </Card> 

            <Card className="tableView">
            {
                products.length && 
                <DataTable data={products}/>
            }
            </Card> 
        </Container>
    );
}