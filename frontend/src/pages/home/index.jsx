import { Container } from "./styles";
import { Card } from "../../components/Card";
import { DragDrop } from "../../components/DragDrop";
import {Button} from "../../components/Button"
import { useState } from "react";
import {read, utils} from "xlsx";

export function Home() {
    // const avatarURL =  user.avatar ? `${api.defaults.baseURL}/files/${user.avatar}`;
    
    const [pricingFile, setPricingFile] = useState(null);
    const [products,setProducts] = useState([]);
    
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
        
        
        const filePreview = URL.createObjectURL(file);
        
        setPricingFile(filePreview)

        handleViewFile(file)

        

    }

    function handleValidateFile() {

    }



    return (
        <Container>
            <Card>
                <DragDrop onFileChange = {file => handleAddedFile(file)}/>
                <div className="col-2">
                    <Button title="Validar"/>
                    <Button title="Atualizar"/>
                </div>
            </Card> 

            <Card>
            {
                products.length && 
                products.map((product, index) => {
                    return <p key={index}> {product.product_code}</p>
                })  
            }
            </Card> 
        </Container>
    );
}