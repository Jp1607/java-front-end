import InputSelect from "../../components/inputs/selectInput";
import ButtonComponent from "../../components/buttons/Button";
import LinkButton from "../../components/buttons/LinkButton";
import InputComponent from "../../components/inputs/InputComponent";
import { useNavigate, useParams } from "react-router-dom";
import React, { useEffect } from "react";
import '../css/createForm.css';
import { Product } from "../../api/entities/product";
import { GETProductById, POSTProduct, PUTProduct } from "../../api/requests/productRequests";
import { GETBrands } from "../../api/requests/brandRequests";
import { Brand } from "../../api/entities/brand";
import { Group } from "../../api/entities/group";
import { Type } from "../../api/entities/type";
import { MU } from "../../api/entities/MU";
import { GETGroups } from "../../api/requests/groupRequests";
import { GETMUs } from "../../api/requests/MURequests";
import { GETTypes } from "../../api/requests/typeRequests";
import { ProductDTO } from "../../api/entities/productDTO";
import { verify } from "crypto";
import ActionsModal from "../../components/modals/ActionsModal";

const CreateProds = () => {

    const navigate = useNavigate();

    const { id } = useParams();
    const [willEdit, setWillEdit] = React.useState<Boolean>(false);
    const [emptyParams, setEmptyParams] = React.useState<number>(0);
    const [open, setOpen] = React.useState<boolean>(false);
    const [product, setProduct] = React.useState<Product>({
        active: true,
        barCode: 0,
        brand: null,
        description: '',
        group: null,
        mu: null,
        name: '',
        type: null,
    })
    // const [productDTO, setProductDTO] = React.useState<ProductDTO>(null)
    const [brands, setBrands] = React.useState<Brand[]>([])
    const [groups, setGroups] = React.useState<Group[]>([])
    const [types, setTypes] = React.useState<Type[]>([])
    const [MUs, setMUs] = React.useState<MU[]>([])

    const verifyEmpty = (product: Product): boolean => {

        const prodParamsArray = Object.entries(product)
        prodParamsArray.forEach(([key, value]) => {

            if (value === "" || !value) {
                setEmptyParams((emptyParams) => (emptyParams + 1));
            }
        })

        if (emptyParams > 0) {
            return true;
        } else {
            return false
        }
    }

    useEffect(() => {

        console.log(id)
        if (id !== undefined) {

            const requestGetProd = async () => {


                const prodById = await GETProductById(parseInt(id))

                if (prodById) {

                    setProduct(prodById);
                    console.log(prodById)
                    console.log(product)
                    setWillEdit(true);
                }
            }

            requestGetProd()
        }

        GETBrands().then((response: Brand[]) => (setBrands(response)))
        GETGroups().then((response: Group[]) => (setGroups(response)))
        GETTypes().then((response: Type[]) => (setTypes(response)))
        GETMUs().then((response: MU[]) => (setMUs(response)))
    }, []);

    function HandleSubmit(event: React.FormEvent): void {

        event.preventDefault();

        if (willEdit === true) {
            if (verifyEmpty(product)) {
                PUTProduct(product).then((response: string) => console.log('sucesso!', response)).catch((e) => console.log(e));
                navigate('/listProds')
            }
            else {

                setEmptyParams(0)
                setOpen(true)
            }
        } else {

            if (verifyEmpty(product)) {

                POSTProduct(product).then((response: string) =>
                    console.log('sucesso!', response, product)).catch((e) =>
                        console.log(e));
                navigate('/listProds')
            }
            else {

                setEmptyParams(0)
                setOpen(true)
            }
        }
    }

    const handleChange = <T extends keyof Product>(key: T, newValue: Product[T]): void => {
        console.log("Saída 1: ", key, newValue)
        const COPY_PRODUCT: Product = Object.assign({}, product);
        COPY_PRODUCT[key] = newValue;
        setProduct(COPY_PRODUCT);
    }

    return (

        <form onSubmit={HandleSubmit} id="create-form">

            <ActionsModal
                isOpen={open}
                onClose={() => setOpen(false)}
                title="ATENÇÃO"
            >
                <p>
                    Há alguns campos obrigatórios não preenchidos
                </p>
            </ActionsModal>

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

            <InputSelect<Brand>
                id="brand-input"
                label="MARCA"
                onValueChange={(value: Brand) => handleChange('brand', value)}
                idKey="id"
                labelKey="description"
                value={product !== null ? product.brand : null}
                options={brands} />


            <InputSelect<Group>
                id="group-input"
                label="GRUPO"
                onValueChange={(value: Group) => handleChange('group', value)}
                idKey="id"
                labelKey="description"
                value={product !== null ? product.group : null}
                options={groups} />

            <InputSelect<Type>
                id="type-input"
                label="TIPO"
                onValueChange={(value: Type) => handleChange('type', value)}
                idKey="id"
                labelKey="description"
                value={product !== null ? product.type : null}
                options={types} />

            <InputSelect<MU>
                id="mu-input"
                label="UNIDADES DE MEDIDA"
                onValueChange={(value: MU) => handleChange('mu', value)}
                idKey="id"
                labelKey="description"
                value={product !== null ? product.mu : null}
                options={MUs} />


            <ButtonComponent
                label={willEdit ? "ALTERAR" : "CRIAR"}
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

