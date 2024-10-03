import React, { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Brand } from "../../../api/entities/brand";
import { GETBrand, PUTBrand, POSTBrand } from "../../../api/requests/brandRequests";
import ButtonComponent from "../../../components/buttons/Button";
import LinkButton from "../../../components/buttons/LinkButton";
import InputComponent from "../../../components/inputs/InputComponent";

const CreateBrands = () => {

    const { id } = useParams();
    const [willEdit, setWillEdit] = React.useState<Boolean>(false);
    const [emptyParams, setEmptyParams] = React.useState<number>(0);
    const [brand, setBrand] = React.useState<Brand>(
        {
            description: '',
            active: false
        }
    )

    // const verifyEmpty = (brand: Brand): boolean => {

    //     const prodParamsArray = Object.entries(brand)
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

            const getBrandBYId = async () => {

                const brandById = await GETBrand(parseInt(id))

                if (brandById) {

                    setBrand(brandById as Brand);
                    setWillEdit(true);
                }
            }

            getBrandBYId()
        }
    }, []);

    const navigate = useNavigate()

    function HandleSubmit(event: React.FormEvent): void {

        event.preventDefault();

        if (willEdit === true) {

            PUTBrand(brand.id).then((response: string) => console.log('sucesso!', response)).catch((e) => console.log(e));

        } else {

            // if (verifyEmpty(brand) === false) {
            POSTBrand(brand).then((response: string) =>
                console.log('sucesso!', response)).catch((e) =>
                    console.log(e));
            // } else if (verifyEmpty(brand) === true) {
            //     window.alert('Você deve preencher todos os campos ')
            // }
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

            <InputComponent
                label="MARCA: "
                id="inputDesc"
                type="text"
                value={brand ? brand.description : ""}
                action={(event: React.ChangeEvent<HTMLInputElement>) =>
                    handleChange('description', event.target.value.toString())} />

            <ButtonComponent
                label="CRIAR"
                type="submit"
                action={HandleSubmit} />

            <LinkButton
                dest="/listMarcas"
                label="CANCELAR"
                style="button" />
        </form>
    )
}

export default CreateBrands;

