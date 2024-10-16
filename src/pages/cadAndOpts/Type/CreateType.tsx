import React, { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Type } from "../../../api/entities/type";
import { GETType, PUTType, POSTType, GETTypes } from "../../../api/requests/typeRequests";
import ButtonComponent from "../../../components/buttons/Button";
import LinkButton from "../../../components/buttons/LinkButton";
import InputComponent from "../../../components/inputs/InputComponent";
import ActionsModal from "../../../components/modals/ActionsModal";

const MandatoryFields: Array<{ key: keyof Type, description: string }> = [
    { key: 'description', description: 'Nome do tipo' },
];

const CreateTypes = () => {

    const { id } = useParams();
    const { viewId } = useParams();
    const [willEdit, setWillEdit] = React.useState<Boolean>(false);
    const [open, setOpen] = React.useState<boolean>(false);
    const [fieldsError, setFieldsError] = React.useState<String[]>([])
    const [readOnly, setReadOnly] = React.useState<boolean>(false)
    const [types, setTypes] = React.useState<Type[]>([]);
    const [type, setType] = React.useState<Type>(
        {
            description: '',
            active: false
        }
    )

    const verifyEmpty = (type: Type): { ret: boolean, fields: string[] } => {
        let ret: boolean = true;
        const FIELDS: string[] = [];
        for (let index = 0; index < MandatoryFields.length; index++) {
            const TYPE = type[MandatoryFields[index].key];
            if (TYPE === undefined || TYPE === '' || TYPE === null) {
                ret = false;
                FIELDS.push(MandatoryFields[index].description);
            }
        }
        return { ret, fields: FIELDS };
    }

    const requestGetType = (id: number) => {

        GETType(id).then((response: Type) => setType(response)).catch(() => { })
    }

    useEffect(() => {

        if (id) {
            setWillEdit(true)
            requestGetType(parseInt(id))
        }

        if (viewId) {
            setReadOnly(true);
            requestGetType(parseInt(viewId));
        }

    }, []);

    const navigate = useNavigate()

    function HandleSubmit(event: React.FormEvent): void {

        event.preventDefault();

        if (willEdit === true) {
            const RET = verifyEmpty(type);
            if (RET.ret) {
                PUTType(type).then((response: string) => console.log('sucesso!', response)).catch((e) => console.log(e));
                navigate('/listTypes')
            }
            else {
                setFieldsError(RET.fields);
                setOpen(true)
            }
        } else {
            const RET = verifyEmpty(type);
            if (RET.ret) {

                POSTType(type).then((response: string) =>
                    console.log('sucesso!', response, type)).catch((e) =>
                        console.log(e));
                navigate('/listGroups')
            }
            else {
                setFieldsError(RET.fields);
                setOpen(true)
            }
        }

        navigate('/listTypes');
    }

    const handleChange = <T extends keyof Type>(key: T, newValue: Type[T]): void => {

        if (newValue !== undefined || newValue !== null) {

            setType((previous: Type) => ({

                ...previous,
                [key]: newValue
            }));
        } else {

            setType((previous: Type) => ({

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
                    {fieldsError.map((f: String) => (<>{`-Campo: ${f}.`}<br /></>))}
                </p>
            </ActionsModal>

            <InputComponent
                label="TIPO: "
                id="inputDesc"
                type="text"
                value={type ? type.description : ""}
                readonly={readOnly}
                action={(event: React.ChangeEvent<HTMLInputElement>) =>
                    handleChange('description', event.target.value.toString())} />

            {!viewId &&
                <ButtonComponent
                    label={willEdit ? "ALTERAR" : "CRIAR"}
                    type="submit"
                    action={HandleSubmit} />}

            <LinkButton
                dest="/listTypes"
                label="CANCELAR"
                style="button" />
        </form>
    )
}

export default CreateTypes;


