import React, { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { MU } from "../../../api/entities/MU";
import { GETMU, PUTMu, POSTMU } from "../../../api/requests/MURequests";
import ButtonComponent from "../../../components/buttons/Button";
import LinkButton from "../../../components/buttons/LinkButton";
import InputComponent from "../../../components/inputs/InputComponent";
import ActionsModal from "../../../components/modals/ActionsModal";

const MandatoryFields: Array<{ key: keyof MU, description: string }> = [
    { key: 'description', description: 'Unidade' },
];

const CreateMUs = () => {

    const { id } = useParams();
    const { editId } = useParams();
    const [readOnly, setReadOnly] = React.useState<boolean>(false)
    const [willEdit, setWillEdit] = React.useState<Boolean>(false);
    const [fieldsError, setFieldsError] = React.useState<String[]>([]);
    const [open, setOpen] = React.useState<boolean>(false)
    const [mu, setMU] = React.useState<MU>(
        {
            description: '',
            active: false
        }
    )

    const verifyEmpty = (mu: MU): { ret: boolean, fields: string[] } => {
        let ret: boolean = true;
        const FIELDS: string[] = [];
        for (let index = 0; index < MandatoryFields.length; index++) {
            const MU = mu[MandatoryFields[index].key];
            if (MU === undefined || MU === '' || MU === null) {
                ret = false;
                FIELDS.push(MandatoryFields[index].description);
            }
        }
        return { ret, fields: FIELDS };
    }

    const requestGetMu = (id: number) => {

        GETMU(id).then((response: MU) => setMU(response)).catch(() => { })
    }

    useEffect(() => {

        if (id) {
            setWillEdit(true)
            requestGetMu(parseInt(id))
        }

        if (editId) {
            setReadOnly(true);
            requestGetMu(parseInt(editId));
        }

    }, []);

    const navigate = useNavigate()

    function HandleSubmit(event: React.FormEvent): void {

        event.preventDefault();

        if (willEdit === true) {
            const RET = verifyEmpty(mu);
            if (RET.ret) {
                PUTMu(mu).then((response: string) => console.log('sucesso!', response)).catch((e) => console.log(e));
                navigate('/listMUs')
            }
            else {
                setFieldsError(RET.fields);
                setOpen(true)
            }
        } else {
            const RET = verifyEmpty(mu);
            if (RET.ret) {

                POSTMU(mu).catch(() => { });
                navigate('/listGroups')
            }
            else {
                setFieldsError(RET.fields);
                setOpen(true)
            }
        }

        navigate('/listMUs');
    }

    const handleChange = <T extends keyof MU>(key: T, newValue: MU[T]): void => {

        if (newValue !== undefined || newValue !== null) {

            setMU((previous: MU) => ({

                ...previous,
                [key]: newValue
            }));
        } else {

            setMU((previous: MU) => ({

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
                label="UNIDADE DE MEDIDA: "
                id="inputDesc"
                type="text"
                value={mu ? mu.description : ""}
                readonly={readOnly}
                action={(event: React.ChangeEvent<HTMLInputElement>) =>
                    handleChange('description', event.target.value.toString())} />

            <ButtonComponent
                label="CRIAR"
                type="submit"
                action={HandleSubmit} />

            <LinkButton
                dest="/listMUs"
                label="CANCELAR"
                style="button" />
        </form>
    )
}

export default CreateMUs;

