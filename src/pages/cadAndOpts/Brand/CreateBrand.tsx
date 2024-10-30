import React, { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Brand } from "../../../api/entities/brand";
import { GETBrand, PUTBrand, POSTBrand } from "../../../api/requests/brandRequests";
import ButtonComponent from "../../../components/buttons/Button";
import LinkButton from "../../../components/buttons/LinkButton";
import InputComponent from "../../../components/inputs/InputComponent";
import ActionsModal from "../../../components/modals/ActionsModal";

const MandatoryFields: Array<{ key: keyof Brand, description: string }> = [
    { key: 'description', description: 'Nome da marca' },
];

const CreateBrands = () => {

    const { id } = useParams();
    const { viewId } = useParams();
    const [readOnly, setReadOnly] = React.useState<boolean>(false)
    const [willEdit, setWillEdit] = React.useState<Boolean>(false);
    const [open, setOpen] = React.useState<boolean>(false);
    const [fieldsError, setFieldsError] = React.useState<string[]>([])
    const [brand, setBrand] = React.useState<Brand>(
        {
            description: '',
            active: false,
            killed: 0
        }
    )

    const verifyEmpty = (brand: Brand): { ret: boolean, fields: string[] } => {
        let ret: boolean = true;
        const FIELDS: string[] = [];
        for (let index = 0; index < MandatoryFields.length; index++) {
            const BRAND = brand[MandatoryFields[index].key];
            if (BRAND === undefined || BRAND === '' || BRAND === null) {
                ret = false;
                FIELDS.push(MandatoryFields[index].description);
            }
        }
        return { ret, fields: FIELDS };
    }

    const requestGetBrand = (id: number) => {

        GETBrand(id).then((response: Brand) => setBrand(response)).catch(() => { })
    }

    useEffect(() => {

        if (id) {
            setWillEdit(true)
            requestGetBrand(parseInt(id))
        }

        if (viewId) {
            setReadOnly(true);
            requestGetBrand(parseInt(viewId));
        }
    }, []);

    const navigate = useNavigate()

    function HandleSubmit(event: React.FormEvent): void {

        event.preventDefault();

        if (willEdit === true) {
            const RET = verifyEmpty(brand);
            if (RET.ret) {
                PUTBrand(brand).then((response: string) => console.log('sucesso!', response)).catch((e) => console.log(e));
                navigate('/listBrands')
            }
            else {
                setFieldsError(RET.fields);
                setOpen(true)
            }
        } else {
            const RET = verifyEmpty(brand);
            if (RET.ret) {

                POSTBrand(brand).then((response: string) =>
                    console.log('sucesso!', response, brand)).catch((e) =>
                        console.log(e));
                navigate('/listBrands')
            }
            else {
                setFieldsError(RET.fields);
                setOpen(true)
            }
        }

        navigate('/listBrands')
    }

    const handleChange = <T extends keyof Brand>(key: T, newValue: Brand[T]): void => {

        if (newValue !== undefined || newValue !== null) {

            setBrand((previous: Brand) => ({

                ...previous,
                [key]: newValue
            }));
        } else {

            setBrand((previous: Brand) => ({

                ...previous,
                [key]: null
            }));
        }
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
                label="MARCA: "
                id="inputDesc"
                type="text"
                value={brand ? brand.description : ""}
                readonly={readOnly}
                action={(event: React.ChangeEvent<HTMLInputElement>) =>
                    handleChange('description', event.target.value.toString())} />

            {!viewId &&
                <ButtonComponent
                    label={willEdit ? "ALTERAR" : "CRIAR"}
                    type="submit"
                    action={HandleSubmit} />
            }

            <LinkButton
                dest="/listBrands"
                label="CANCELAR"
                style="button" />
        </form>
    )
}

export default CreateBrands;

