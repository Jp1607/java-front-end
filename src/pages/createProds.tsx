import React, { useEffect } from "react"
import { Link, useNavigate, useParams } from "react-router-dom"
import getProducts, { Product } from "../api/TableFetch";
import PostNewProduct from "../api/PostNewProduct";
import EditProduct from "../api/EditProd";
import CancelButton from "../components/CancelMethod";

const CreateProds = () => {

    const { id } = useParams();
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

    const verifyEmpty = (product: Product): boolean => {

        const prodParamsArray = Object.entries(product)

        prodParamsArray.forEach(([key, value]) => {

            if (value == null || value == undefined || value == "") {

                return true
            }
        })
        return false
    }

    useEffect(() => {

        const fetchData = async () => {

            await getProducts().then((response: Product[]) => {
                setProducts(response)
            }).catch(() => { })
        }

        fetchData()
    }, [])

    useEffect(() => {

        if (id && products.length > 0) {

            const prodById = products.find(prod => prod.id === parseInt(id));

            if (prodById) {

                setProduct(prodById);
                setWillEdit(true);
            }
        }

    }, [id, products]);

    const navigate = useNavigate()

    function HandleSubmit(event: React.FormEvent<HTMLFormElement>): void {

        event.preventDefault();

        if (willEdit === true) {
            EditProduct(product).then((response: string) => console.log('sucesso!', response)).catch((e) => console.log(e));
        } else {
            if (verifyEmpty(product) === true) {
                window.alert('Preencha todos os campos! ')
            }
        }
        else if (verifyEmpty(product) === false) {
    PostNewProduct(product).then((response: string) => console.log('sucesso!', response)).catch((e) => console.log(e));

}

        // navigate('/listProds')
        // window.location.reload();
    }

const handleChange = <T extends keyof Product>(key: T, newValue: Product[T]): void => {
    if (newValue !== undefined || newValue !== null) {
        setProduct((previous: Product) => ({
            ...previous,
            [key]: newValue
        }));
    } else {
        setProduct((previous: Product) => ({
            ...previous,
            [key]: null
        }));
    }
}

return (
    <form onSubmit={HandleSubmit}>

        <h1>{id}</h1>

        <label htmlFor="prodName">NOME:</label>
        <input
            id="prodName"
            type="text"
            value={product !== undefined ? product.name : undefined}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                handleChange('name', event.target.value.toString())}
        />

        <label htmlFor="prodDesc">DESCRIÇÃO:</label>
        <input
            id="prodDesc"
            type="text"
            value={product !== undefined ? product.description : undefined}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                handleChange('description', event.target.value.toString())}
        />

        <label htmlFor="prodBarCode">CÓDIGO DE BARRAS:</label>
        <input
            id="prodBarCode"
            type="number"
            value={product !== undefined ? product.barCode : undefined}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                handleChange('barCode', parseInt(event.target.value.toString()))}
        />

        <label htmlFor="prodActive">ATIVO:</label>
        <select
            id="prodActive"
            // value={product !== undefined ? "True" : 'False'}
            onChange={(event: React.ChangeEvent<HTMLSelectElement>) =>
                handleChange('active', event.target.value.toString() === 'true' ? true : false)}
        >
            <option value='true'>ATIVO</option>
            <option value='false'>NÃO ATIVO</option>
        </select>

        <input type="submit" value="ENVIAR" className="content-abled-button" />

        <CancelButton />
    </form>
)
}

export default CreateProds;

