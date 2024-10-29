import { useNavigate, useParams } from "react-router-dom"
import InputComponent from "../../components/inputs/InputComponent"
import React, { useEffect } from "react";
import { StorageCenter } from "../../api/entities/storage";
import { GETStorage, GETStorages, POSTStorage, PUTEditStorage } from "../../api/requests/storageRequests";
import Active from "../../api/services/activeInterface";
import InputSelect from "../../components/inputs/selectInput";
import LinkButton from "../../components/buttons/LinkButton";
import ButtonComponent from "../../components/buttons/Button";
import ActionsModal from "../../components/modals/ActionsModal";

const MandatoryFields: Array<{ key: keyof StorageCenter, description: string }> = [
    { key: 'description', description: 'Nome' },
    { key: 'active', description: 'Ativo' }
];

const CreateStorage = () => {

    const navigate = useNavigate();
    const { editID } = useParams();
    const { viewID } = useParams();
    const [fieldsError, setFieldsError] = React.useState<string[]>(null);
    const [openWarning, setOpenWarning] = React.useState<boolean>(false);
    const [willEdit, setWillEdit] = React.useState<boolean>(false);
    const [readOnly, setReadOnly] = React.useState<boolean>(false);
    const [storage, setStorage] = React.useState<StorageCenter>({
        description: '',
        active: null,
        excluded: null
    });

    useEffect(() => {
        if (editID) {
            GETStorage(storage.id).then((response: StorageCenter) => {
                setWillEdit(true);
                setStorage(response)
            }).catch(() => { });
        } else if (viewID) {
            GETStorage(storage.id).then((response: StorageCenter) => {
                setStorage(response);
                setReadOnly(true)
            }).catch(() => { });
        }
    }, [])

    const verifyEmpty = (storage: StorageCenter): { ret: boolean, fields: string[] } => {
        let ret: boolean = true;
        const FIELDS: string[] = [];
        for (let index = 0; index < MandatoryFields.length; index++) {
            const STORAGE_FIELD = storage[MandatoryFields[index].key];
            if (STORAGE_FIELD === undefined || STORAGE_FIELD === '' || STORAGE_FIELD === null) {
                ret = false;
                FIELDS.push(MandatoryFields[index].description);
            }
        }
        return { ret, fields: FIELDS };
    }


    const handleChange = <T extends keyof StorageCenter>(key: T, newValue: StorageCenter[T]) => {
        const COPY_STORAGE: StorageCenter = Object.assign({}, storage);
        COPY_STORAGE[key] = newValue;
        setStorage(COPY_STORAGE);
    }

    const handleSubmit = () => {
        const ok = verifyEmpty(storage);
        if (ok.ret) {
            if (willEdit) {
                PUTEditStorage(storage).then(() => navigate('/listStorages')).catch(() => { });
            } else {
                POSTStorage(storage).then(() => navigate('/listStorages')).catch(() => { });
            }
        } else {
            setFieldsError(ok.fields);
            setOpenWarning(false);
        }
    }

    return (
        <div>

            <ActionsModal
                isOpen={openWarning}
                onClose={() => setOpenWarning(false)}
                closeLabel={"FECHAR"}
                title={"ATENÇÃO"}
            >
                <p>
                    Alguns campos obrigatórios faltam ser preenchidos!
                    <br />
                    {fieldsError.map((f: string) => (<>{`-Campo: ${f}.`}<br /></>))}
                </p>
            </ActionsModal>
            <form onSubmit={handleSubmit} id="create-form">
                <InputComponent
                    id="create-name"
                    label="Nome:"
                    type="text"
                    action={(event: React.ChangeEvent<HTMLInputElement>) =>
                        handleChange('description', event.target.value.toString())}
                    value={storage ? storage.description : ''}
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

export default CreateStorage;