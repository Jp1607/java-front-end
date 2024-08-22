import React from "react"
import { Link, useNavigate, useParams } from "react-router-dom"
import getProducts, { Product } from "../api/TableFetch";
import PostNewProduct from "../api/PostNewProduct";
import DefaultFetch from "../api/DefaultFetch";

// export const EditProds = () => {
//     return(
//         <h1>fafaffa</h1>
//     )

// }
const CreateProds = (id?: number) => {
    //const { id } = useParams<{ id?: number }>();
    const [product, setProduct] = React.useState<Product>( 
        {    
        name: '',
        description: '',
        barCode: 0,
        active: false
    }
)

    if(id == null){
        setProduct(
        {
            
            name: '',
            description: '',
            barCode: 0,
            active: false
        }
    
    );
}else {
   getProducts(id)
    
   
}

   
    
    const navigate = useNavigate()
    const HandleCancel = (): void => {
        navigate(-1);
    }

    function HandleSubmit(event: React.FormEvent<HTMLFormElement>): void  {
        console.log('chegou no submit')
        event.preventDefault();
        PostNewProduct(product);
        console.log('chegou no submit 2')
        
        navigate('/listProds')
        console.log('chegou no submit 3', localStorage.getItem('token'))
        console.log(product)
    }

    const handleChange = <T extends keyof Product>(key: T, newValue: Product[T]): void => {
        console.log('estou alterando o valor do atributo', key, 'com o seguinte valor', newValue);
        setProduct((previous: Product) => ({
          ...previous,
          [key]: newValue
        }));
    }

   return (
   <form onSubmit={HandleSubmit}>

    <label htmlFor="prodName">NOME:</label>
    <input
        id="prodName"
        type="text"
        //value={product !== null ? product.name : ''}
        onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
            handleChange('name', event.target.value.toString())}
    />

    <label htmlFor="prodDesc">DESCRIÇÃO:</label>
    <input
        id="prodDesc"
        type="text"
       // value={product !== null ? product.description : ''}
        onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
            handleChange('description', event.target.value.toString())}
    />

    <label htmlFor="prodBarCode">CÓDIGO DE BARRAS:</label>
    <input
        id="prodBarCode"
        type="number"
        //value={product !== null ? product.barCode : ''}
        onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
            handleChange('barCode', parseInt(event.target.value.toString()))}
    />

    <label htmlFor="prodActive">ATIVO:</label>
    <select
        id="prodActive"
      //  value={product !== null ? product.active.valueOf.toString() : 'false'}
        onChange={(event: React.ChangeEvent<HTMLSelectElement>) =>
            handleChange('active', event.target.value.toString() === 'true'? true : false)}
    >
        <option value = 'true'>ATIVO</option>
        <option value = 'false'>NÃO ATIVO</option>
    </select>
<Link to = {'/listProds'}><input
        id="submit"
        type="submit"
    /></Link>
    

    <button onClick={HandleCancel}>
        Cancelar
    </button>
</form>
   )
}


export default CreateProds;

