import React, { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Type } from "../../../api/entities/type";
import { GETType, PUTType, POSTType, GETTypes } from "../../../api/requests/typeRequests";
import ButtonComponent from "../../../components/buttons/Button";
import LinkButton from "../../../components/buttons/LinkButton";
import InputComponent from "../../../components/inputs/InputComponent";

const CreateTypes = () => {

    const { id } = useParams();
    const [willEdit, setWillEdit] = React.useState<Boolean>(false);
    const [emptyParams, setEmptyParams] = React.useState<number>(0);
    const [types, setTypes] = React.useState<Type[]>([]);
    const [type, setType] = React.useState<Type>(
        {
            description: '',
            active: false
        }
    )

    // const verifyEmpty = (type: Type): boolean => {

    //     const prodParamsArray = Object.entries(type)
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

        if (id !== undefined) {

            const getTypeBYId = async () => {

                const typeById = await GETType(parseInt(id))

                if (typeById) {

                    setType(typeById as Type);
                    setWillEdit(true);
                }
            }

            getTypeBYId()
        }
    }, []);

    const navigate = useNavigate()

    function HandleSubmit(event: React.FormEvent): void {

        event.preventDefault();

        if (willEdit === true) {

            PUTType(type.id).then((response: string) => console.log('sucesso!', response)).catch((e) => console.log(e));

        } else {

            // if (verifyEmpty(type) === false) {
            POSTType(type).then((response: string) => {
                console.log('sucesso!', response)
                // GETTypes().then((response: Type[]) =>
                //     (setTypes(response))).catch(() => { })
            }).catch((e) =>
                console.log(e));
            // } else if (verifyEmpty(type) === true) {
            //     window.alert('Você deve preencher todos os campos ')
            // }
        }

        navigate('/listTypes')
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

            <InputComponent
                label="TIPO: "
                id="inputDesc"
                type="text"
                value={type ? type.description : ""}
                action={(event: React.ChangeEvent<HTMLInputElement>) =>
                    handleChange('description', event.target.value.toString())} />

            <ButtonComponent
                label="CRIAR"
                type="submit"
                action={HandleSubmit} />

            <LinkButton
                dest="/listTypes"
                label="CANCELAR"
                style="button" />
        </form>
    )
}

export default CreateTypes;

