import React, { useEffect } from "react"
import { Link, useNavigate, useParams } from "react-router-dom"
import getProducts, { Product } from "../api/TableFetch";
import PostNewProduct from "../api/PostNewProduct";
import EditProduct from "../api/EditProd";

const CreateProds = () => {
    const { id } = useParams();
   

    const [idState, setIdState] = React.useState<Number>(0)
    const [willEdit, setWillEdit] = React.useState<Boolean>(false)
    const [products, setProducts] = React.useState<Product[]>([])
    const [product, setProduct] = React.useState<Product>(
        {
            name: '',
            description: '',
            barCode: 0,
            active: false
        }
    )

    useEffect(() => {

        const fetchData = async () => {

            await getProducts().then((response: Product[]) => {
                setProducts(response)
            }).catch(() => { })
        }

        fetchData()
        
        if(id !== undefined){
            
           setIdState(parseInt(id))
           
            const getProductById = () => {
                const prodById = products.find(obj => obj.id === idState)
                setProduct(prodById as Product)
            }
    
            setWillEdit(true)
            console.log('O id é: ',id)
            getProductById();
    }
    }, [])

   


    

    const navigate = useNavigate()
    const HandleCancel = (): void => {
        navigate(-1);
    }

    function HandleSubmit(event: React.FormEvent<HTMLFormElement>): void {

        console.log(id)

        event.preventDefault();

        console.log('socorro')
        console.log('chegou no submit')

        if (willEdit === true) {
            console.log('vai dar put')
            EditProduct(product).then((response: string) => console.log('sucesso!', response)).catch((e) => console.log(e));
        } else {
            console.log('vai dar post')
            PostNewProduct(product).then((response: string) => console.log('sucesso!', response)).catch((e) => console.log(e));
        }

        console.log('chegou no submit 2')

        navigate('/listProds')

        console.log(product)
        console.log('chegou no submit 3', localStorage.getItem('token'))
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

            <h1>{id}</h1>

            <label htmlFor="prodName">NOME:</label>
            <input
                id="prodName"
                type="text"
                // value={product !== null ? product.name : ''}
                onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                    handleChange('name', event.target.value.toString())}
            />

            <label htmlFor="prodDesc">DESCRIÇÃO:</label>
            <input
                id="prodDesc"
                type="text"
                //value={product !== null ? product.description : ''}
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
                // value={product !== null ? product.active.valueOf.toString() : 'false'}
                onChange={(event: React.ChangeEvent<HTMLSelectElement>) =>
                    handleChange('active', event.target.value.toString() === 'true' ? true : false)}
            >
                <option value='true'>ATIVO</option>
                <option value='false'>NÃO ATIVO</option>
            </select>
            {/* <Link
                to={'/listProds'}><input
                    id="submit"
                    type="submit"

                />
            </Link> */}
            <input type="submit" value="enviar" />
            <button onClick={HandleCancel}>
                Cancelar
            </button>
        </form>
    )
}


export default CreateProds;

