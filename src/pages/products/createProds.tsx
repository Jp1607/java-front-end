import InputSelect from "../../components/inputs/selectInput";
import ButtonComponent from "../../components/buttons/Button";
import LinkButton from "../../components/buttons/LinkButton";
import InputComponent from "../../components/inputs/InputComponent";
import { useNavigate, useParams } from "react-router-dom";
import React, { useEffect } from "react";
import '../css/createForm.css';
import { Product } from "../../api/entities/product";
import { GETProductById, POSTProduct, PUTProduct } from "../../api/requests/productRequests";

const CreateProds = () => {

    const { id } = useParams();
    const [willEdit, setWillEdit] = React.useState<Boolean>(false);
    const [emptyParams, setEmptyParams] = React.useState<number>(0);
    const [product, setProduct] = React.useState<Product>(
        {
            name: '',
            description: '',
            barCode: null,
            active: false
        }
    )

    // const verifyEmpty = (product: Product): boolean => {

    //     const prodParamsArray = Object.entries(product)
    //     prodParamsArray.forEach(([key, value]) => {

    //         if (value === null || value === undefined || value === "") {
    //             console.log(value)
    //             setEmptyParams((emptyParams) => (emptyParams + 1));

    //             console.log(emptyParams)
    //         }
    //     })

    //     if (emptyParams > 0) {
    //         return true;
    //     } else {
    //         return false
    //     }
    //     console.log(emptyParams)
    // }

    useEffect(() => {

        console.log(id)
        if (id !== undefined) {

            const requestGetProd = async () => {

                const prodById = await GETProductById(parseInt(id))

                if (prodById) {

                    setProduct(prodById as Product);
                    setWillEdit(true);
                }
            }

            requestGetProd()
        }
    }, []);

    const navigate = useNavigate()

    function HandleSubmit(event: React.FormEvent): void {

        event.preventDefault();

        if (willEdit === true) {

            PUTProduct(product).then((response: string) => console.log('sucesso!', response)).catch((e) => console.log(e));

        } else {

            // if (verifyEmpty(product) === false) {
            POSTProduct(product).then((response: string) =>
                console.log('sucesso!', response)).catch((e) =>
                    console.log(e));
            // } else if (verifyEmpty(product) === true) {
            //     window.alert('Você deve preencher todos os campos ')
            // }
        }

        navigate('/listProds')
        window.location.reload();
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

        <form onSubmit={HandleSubmit} id="create-form">

            <InputComponent
                label="NOME:"
                id="inputName"
                placeHolder="Nome do produto"
                type="text"
                value={product ? product.name : ""}
                action={(event: React.ChangeEvent<HTMLInputElement>) =>
                    handleChange('name', event.target.value.toString())} />

            <InputComponent
                label="DESCRIÇÃO: "
                id="inputDesc"
                placeHolder="Descrição do produto"
                type="text"
                value={product ? product.description : ""}
                action={(event: React.ChangeEvent<HTMLInputElement>) =>
                    handleChange('description', event.target.value.toString())} />

            <InputComponent
                label="CÓDIGO DE BARRAS: "
                id="inputBarCode"
                placeHolder="0123456789012"
                type="number"

                value={product ? product.barCode : ""}
                action={(event: React.ChangeEvent<HTMLInputElement>) =>
                    handleChange('barCode', parseInt(event.target.value.toString()))} />


            <InputSelect
                id="selectActive"
                label="ATIVO: "
                options={[
                    "ATIVO",
                    "NÃO ATIVO"
                ]}
                action={(event: React.ChangeEvent<HTMLSelectElement>) =>
                    handleChange('active', event.target.value.toString() === 'true' ? true : false)}
            />

            <ButtonComponent
                label="CRIAR"
                type="submit"
                action={HandleSubmit} />

            <LinkButton
                dest="/listProds"
                label="CANCELAR"
                style="button" />
        </form>
    )
}

export default CreateProds;

