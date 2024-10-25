import { useParams } from "react-router-dom"
import InputComponent from "../../components/inputs/InputComponent"
import React, { useEffect } from "react";
import { StorageCenter } from "../../api/entities/storage";
import { getStorage, getStorages } from "../../api/requests/storageRequests";
import Active from "../../api/services/activeInterface";
import InputSelect from "../../components/inputs/selectInput";
import LinkButton from "../../components/buttons/LinkButton";
import ButtonComponent from "../../components/buttons/Button";


const createStorage = () => {

    const { editID } = useParams();
    const { viewID } = useParams();
    const [willEdit, setWillEdit] = React.useState<boolean>(false);
    const [readOnly, setReadOnly] = React.useState<boolean>(false);
    const [storage, setStorage] = React.useState<StorageCenter>({
        name: '',
        active: null,
        excluded: null
    });

    useEffect(() => {
        if (editID) {
            getStorage(storage.id).then((response: StorageCenter) => setStorage(response)).catch(() => { });
        } else if (viewID) {
            getStorage(storage.id).then((response: StorageCenter) => {
                setStorage(response);
                setReadOnly(true)
            }).catch(() => { });
        }
    }, [])

    const handleChange = <T extends keyof StorageCenter>(key: T, newValue: StorageCenter[T]) => {
        const COPY_STORAGE: StorageCenter = Object.assign({}, storage);
        COPY_STORAGE[key] = newValue;
        setStorage(COPY_STORAGE);
    }

    const handleSubmit = () => {
        if (willEdit) {

        } else {

        }
    }

    return (
        <div>

            <form onSubmit={handleSubmit} id="create-form">
                <InputComponent
                    id="create-name"
                    label="Nome:"
                    type="text"
                    action={(event: React.ChangeEvent<HTMLInputElement>) =>
                        handleChange('name', event.target.value.toString())}
                    value={storage ? storage.name : ''}
                    readonly={readOnly}
                />

                <InputSelect<Active>
                    id="active-input"
                    label="ATIVO"
                    onValueChange={(value: Active) => handleChange('active', value.value)}
                    idKey="value"
                    labelKey="description"
                    readonly={readOnly}
                    value={readOnly ? storage.active ? { description: "Exibir", value: true } :
                        { description: "Não exibir", value: false }
                        :
                        storage !== null ? storage.active ? { description: "Exibir", value: true } :
                            { description: "Não exibir", value: false }
                            : null}
                    options={[
                        { description: "Exibir", value: true },
                        { description: "Não exibir", value: false }
                    ]} />

                {!viewID &&
                    <ButtonComponent
                        label={willEdit ? "ALTERAR" : "CRIAR"}
                        type="submit"
                        action={handleSubmit} />
                }

                <LinkButton
                    dest="/listStorages"
                    label={viewID ? "VOLTAR" : "CANCELAR"}
                    style="button" />
            </form>
        </div>
    )
}

export default createStorage;