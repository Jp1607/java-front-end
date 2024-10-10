import React, { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { MU } from "../../../api/entities/MU";
import { GETMU, PUTMu, POSTMU } from "../../../api/requests/MURequests";
import ButtonComponent from "../../../components/buttons/Button";
import LinkButton from "../../../components/buttons/LinkButton";
import InputComponent from "../../../components/inputs/InputComponent";

const CreateMUs = () => {

    const { id } = useParams();
    const [willEdit, setWillEdit] = React.useState<Boolean>(false);
    const [emptyParams, setEmptyParams] = React.useState<number>(0);
    const [mu, setMU] = React.useState<MU>(
        {
            description: '',
            active: false
        }
    )

    // const verifyEmpty = (mu: MU): boolean => {

    //     const prodParamsArray = Object.entries(mu)
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

            const getMUBYId = async () => {

                const muById = await GETMU(parseInt(id))

                if (muById) {

                    setMU(muById as MU);
                    setWillEdit(true);
                }
            }

            getMUBYId()
        }
    }, []);

    const navigate = useNavigate()

    function HandleSubmit(event: React.FormEvent): void {

        event.preventDefault();

        if (willEdit === true) {

            PUTMu(mu).then((response: string) => console.log('sucesso!', response)).catch((e: any) => console.log(e));

        } else {

            // if (verifyEmpty(mu) === false) {
            POSTMU(mu).then((response: string) =>
                console.log('sucesso!', response)).catch((e) =>
                    console.log(e));
            // } else if (verifyEmpty(mu) === true) {
            //     window.alert('Você deve preencher todos os campos ')
            // }
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

            <InputComponent
                label="UNIDADE DE MEDIDA: "
                id="inputDesc"
                type="text"
                value={mu ? mu.description : ""}
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

