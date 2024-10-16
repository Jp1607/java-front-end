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
import Active from "../../api/services/activeInterface";
import { rejects } from "assert";

const MandatoryFields: Array<{ key: keyof Product, description: string }> = [
    { key: 'name', description: 'Nome do produto' },
    { key: 'barCode', description: 'Código de barras' },
    { key: 'active', description: 'Ativo' }
];

const CreateProds = () => {

    const navigate = useNavigate();

    const { id } = useParams();
    const { viewId } = useParams();
    const [willEdit, setWillEdit] = React.useState<Boolean>(false);
    const [open, setOpen] = React.useState<boolean>(false);
    const [product, setProduct] = React.useState<Product>({
        active: true,
        barCode: '',
        brand: null,
        description: '',
        group: null,
        mu: null,
        name: '',
        type: null,
    })
    const [brands, setBrands] = React.useState<Brand[]>([])
    const [groups, setGroups] = React.useState<Group[]>([])
    const [types, setTypes] = React.useState<Type[]>([])
    const [MUs, setMUs] = React.useState<MU[]>([]);
    const [fieldsError, setFieldsError] = React.useState<string[]>([]);
    const [readOnly, setReadOnly] = React.useState<boolean>(false);

    const verifyEmpty = (product: Product): { ret: boolean, fields: string[] } => {
        let ret: boolean = true;
        const FIELDS: string[] = [];
        for (let index = 0; index < MandatoryFields.length; index++) {
            const PRODUCT_FIELD = product[MandatoryFields[index].key];
            if (PRODUCT_FIELD === undefined || PRODUCT_FIELD === '' || PRODUCT_FIELD === null) {
                ret = false;
                FIELDS.push(MandatoryFields[index].description);
            }
        }
        return { ret, fields: FIELDS };
    }

    const requestGetProd = (id: number) => {

        GETProductById(id).then((response: Product) => setProduct(response)).catch(() => { })
    }

    useEffect(() => {


        if (id) {
            setWillEdit(true)
            requestGetProd(parseInt(id))
        }

        if (viewId) {
            setReadOnly(true);
            requestGetProd(parseInt(viewId));
        }

        GETBrands().then((response: Brand[]) => (setBrands(response)))
        GETGroups().then((response: Group[]) => (setGroups(response)))
        GETTypes().then((response: Type[]) => (setTypes(response)))
        GETMUs().then((response: MU[]) => (setMUs(response)))
    }, []);

    function HandleSubmit(event: React.FormEvent): void {

        event.preventDefault();

        if (willEdit === true) {
            const RET = verifyEmpty(product);
            if (RET.ret) {

                PUTProduct(product).then(() => {
                    navigate('/listProds')
                }, (reason) =>
                    console.log(reason))

            }
            else {
                setFieldsError(RET.fields);
                setOpen(true)
            }
        } else {
            const RET = verifyEmpty(product);
            if (RET.ret) {

                POSTProduct(product).then(() => { navigate('/listProds') }).catch((e) => window.alert(e));

            }
            else {
                setFieldsError(RET.fields);
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
                onClose={() => { setOpen(false); setFieldsError([]); }}
                title="ATENÇÃO"
            >
                <p>
                    Há alguns campos obrigatórios não preenchidos!
                    <br />
                    {fieldsError.map((f: string) => (<>{`-Campo: ${f}.`}<br /></>))}
                </p>
            </ActionsModal>

            <InputComponent
                label="NOME:"
                id="inputName"
                placeHolder="Nome do produto"
                type="text"
                value={product ? product.name : ""}
                readonly={readOnly}
                action={(event: React.ChangeEvent<HTMLInputElement>) =>
                    handleChange('name', event.target.value.toString())} />

            <InputComponent
                label="DESCRIÇÃO: "
                id="inputDesc"
                placeHolder="Descrição do produto"
                type="text"
                value={product ? product.description : ""}
                readonly={readOnly}
                action={(event: React.ChangeEvent<HTMLInputElement>) =>
                    handleChange('description', event.target.value.toString())} />


            <InputComponent
                label="CÓDIGO DE BARRAS: "
                id="inputBarCode"
                placeHolder="0123456789012"
                type="number"
                value={product && product.barCode ? product.barCode : ""}
                readonly={readOnly}
                action={(event: React.ChangeEvent<HTMLInputElement>) =>
                    handleChange('barCode', event.target.value.toString())} />


            <InputSelect<Brand>
                id="brand-input"
                label="MARCA"
                onValueChange={(value: Brand) => handleChange('brand', value)}
                idKey="id"
                labelKey="description"
                readonly={readOnly}
                value={readOnly ? product.brand : product !== null ? product.brand : null}
                options={brands} />

            <InputSelect<Group>
                id="group-input"
                label="GRUPO"
                onValueChange={(value: Group) => handleChange('group', value)}
                idKey="id"
                labelKey="description"
                readonly={readOnly}
                value={readOnly ? product.group : product !== null ? product.group : null}
                options={groups} />

            <InputSelect<Type>
                id="type-input"
                label="TIPO"
                onValueChange={(value: Type) => handleChange('type', value)}
                idKey="id"
                labelKey="description"
                readonly={readOnly}
                value={readOnly ? product.type : product !== null ? product.type : null}
                options={types} />

            <InputSelect<MU>
                id="mu-input"
                label="UNIDADES DE MEDIDA"
                onValueChange={(value: MU) => handleChange('mu', value)}
                idKey="id"
                labelKey="description"
                readonly={readOnly}
                value={readOnly ? product.mu : product !== null ? product.mu : null}
                options={MUs} />

            <InputSelect<Active>
                id="active-input"
                label="ATIVO"
                onValueChange={(value: Active) => handleChange('active', value.value)}
                idKey="value"
                labelKey="description"
                readonly={readOnly}
                value={readOnly ? product.active ? { description: "Exibir", value: true } :
                    { description: "Não exibir", value: false }
                    :
                    product !== null ? product.active ? { description: "Exibir", value: true } :
                        { description: "Não exibir", value: false }
                        : null}
                options={[
                    { description: "Exibir", value: true },
                    { description: "Não exibir", value: false }
                ]} />

            {!viewId &&
                <ButtonComponent
                    label={willEdit ? "ALTERAR" : "CRIAR"}
                    type="submit"
                    action={HandleSubmit} />
            }

            <LinkButton
                dest="/listProds"
                label={viewId ? "VOLTAR" : "CANCELAR"}
                style="button" />
        </form>
    )
}

export default CreateProds;

