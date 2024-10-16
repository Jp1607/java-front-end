import React, { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Group } from "../../../api/entities/group";
import { GETGroup, PUTGroup, POSTGroup } from "../../../api/requests/groupRequests";
import ButtonComponent from "../../../components/buttons/Button";
import LinkButton from "../../../components/buttons/LinkButton";
import InputComponent from "../../../components/inputs/InputComponent";
import ActionsModal from "../../../components/modals/ActionsModal";

const MandatoryFields: Array<{ key: keyof Group, description: string }> = [
    { key: 'description', description: 'Nome do grupo' },
];

const CreateGroups = () => {

    const { id } = useParams();
    const { viewId } = useParams();
    const [readOnly, setReadOnly] = React.useState<boolean>(false)
    const [willEdit, setWillEdit] = React.useState<Boolean>(false);
    const [open, setOpen] = React.useState<boolean>(false)
    const [fieldsError, setFieldsError] = React.useState<String[]>([])
    const [group, setGroup] = React.useState<Group>(
        {
            description: '',
            active: false
        }
    )

    const verifyEmpty = (group: Group): { ret: boolean, fields: string[] } => {
        let ret: boolean = true;
        const FIELDS: string[] = [];
        for (let index = 0; index < MandatoryFields.length; index++) {
            const GROUP = group[MandatoryFields[index].key];
            if (GROUP === undefined || GROUP === '' || GROUP === null) {
                ret = false;
                FIELDS.push(MandatoryFields[index].description);
            }
        }
        return { ret, fields: FIELDS };
    }

    const requestGetGroup = (id: number) => {

        GETGroup(id).then((response: Group) => setGroup(response)).catch(() => { })
    }

    useEffect(() => {

        if (id) {
            setWillEdit(true)
            requestGetGroup(parseInt(id))
        }

        if (viewId) {
            setReadOnly(true);
            requestGetGroup(parseInt(viewId));
        }
    }, []);

    const navigate = useNavigate()

    function HandleSubmit(event: React.FormEvent): void {

        event.preventDefault();

        if (willEdit === true) {
            const RET = verifyEmpty(group);
            if (RET.ret) {
                PUTGroup(group).then((response: string) => console.log('sucesso!', response)).catch((e) => console.log(e));
                navigate('/listGroups')
            }
            else {
                setFieldsError(RET.fields);
                setOpen(true)
            }
        } else {
            const RET = verifyEmpty(group);
            if (RET.ret) {

                POSTGroup(group).then((response: string) =>
                    console.log('sucesso!', response, group)).catch((e) =>
                        console.log(e));
                navigate('/listGroups')
            }
            else {
                setFieldsError(RET.fields);
                setOpen(true)
            }
        }

        navigate('/listGroups');
    }

    const handleChange = <T extends keyof Group>(key: T, newValue: Group[T]): void => {

        if (newValue !== undefined || newValue !== null) {

            setGroup((previous: Group) => ({

                ...previous,
                [key]: newValue
            }));
        } else {

            setGroup((previous: Group) => ({

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
                label="GRUPO: "
                id="inputDesc"
                type="text"
                value={group ? group.description : ""}
                readonly={readOnly}
                action={(event: React.ChangeEvent<HTMLInputElement>) =>
                    handleChange('description', event.target.value.toString())} />

            {!viewId &&
                <ButtonComponent
                    label={willEdit ? "ALTERAR" : "CRIAR"}
                    type="submit"
                    action={HandleSubmit} />}

            <LinkButton
                dest="/listGroups"
                label="CANCELAR"
                style="button" />
        </form>
    )
}

export default CreateGroups;

