import React, { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Group } from "../../../api/entities/group";
import { GETGroup, PUTGroup, POSTGroup } from "../../../api/requests/groupRequests";
import ButtonComponent from "../../../components/buttons/Button";
import LinkButton from "../../../components/buttons/LinkButton";
import InputComponent from "../../../components/inputs/InputComponent";

const MandatoryFields: Array<{ key: keyof Group, description: string }> = [
    { key: 'description', description: 'Nome do grupo' },
];

const CreateGroups = () => {

    const { id } = useParams();
    const [willEdit, setWillEdit] = React.useState<Boolean>(false);
    const [emptyParams, setEmptyParams] = React.useState<number>(0);
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

    useEffect(() => {

        if (id !== undefined) {

            const getGroupBYId = async () => {

                const groupById = await GETGroup(parseInt(id))

                if (groupById) {

                    setGroup(groupById as Group);
                    setWillEdit(true);
                }
            }

            getGroupBYId()
        }
    }, []);

    const navigate = useNavigate()

    function HandleSubmit(event: React.FormEvent): void {

        event.preventDefault();

        if (willEdit === true) {

            PUTGroup(group).then((response: string) => console.log('sucesso!', response)).catch((e) => console.log(e));

        } else {

            // if (verifyEmpty(group) === false) {
            POSTGroup(group).then((response: string) =>
                console.log('sucesso!', response)).catch((e) =>
                    console.log(e));
            // } else if (verifyEmpty(group) === true) {
            //     window.alert('Você deve preencher todos os campos ')
            // }
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

            <InputComponent
                label="GRUPO: "
                id="inputDesc"
                type="text"
                value={group ? group.description : ""}
                action={(event: React.ChangeEvent<HTMLInputElement>) =>
                    handleChange('description', event.target.value.toString())} />

            <ButtonComponent
                label="CRIAR"
                type="submit"
                action={HandleSubmit} />

            <LinkButton
                dest="/listGroups"
                label="CANCELAR"
                style="button" />
        </form>
    )
}

export default CreateGroups;

