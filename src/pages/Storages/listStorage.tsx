import React, { useEffect } from "react";
import { StorageCenter } from "../../api/entities/storage";
import TableRender from "../../components/tableRender"
import ButtonsBar from "../../components/ButtonsBar";
import { GETStorages, PUTExcludeStorage, } from "../../api/requests/storageRequests";
import { useNavigate } from "react-router-dom";
import ActionsModal from "../../components/modals/ActionsModal";
import InputComponent from "../../components/inputs/InputComponent";
import InputSelect from "../../components/inputs/selectInput";
import Active from "../../api/services/activeInterface";
import "../css/listPage.css";
import ButtonComponent from "../../components/buttons/Button";

const ListStorage = () => {

    const navigate = useNavigate();
    const [openDeleteModal, setOpenDeleteModal] = React.useState<boolean>(false);
    const [storages, setStorages] = React.useState<StorageCenter[]>([]);
    const [storage, setStorage] = React.useState<StorageCenter>({
        description: '',
        active: null,
        excluded: null
    });

    const fetchStorages = async () => {
        await GETStorages().then((response: StorageCenter[]) => setStorages(response)).catch(() => { })
    }

    useEffect(() => {
        fetchStorages();
    }, [])

    const handleEdit = () => {
        if (storage.id) {
            navigate(`/editStorage/${storage.id}`);
        } else {
            window.alert("Selecione um armazem válido para edição!")
        }
    }

    const handleView = () => {
        if (storage.id) {
            navigate(`/viewStorage/${storage.id}`);
        } else {
            window.alert("Selecione um armazem válido para visualização!")
        }
    }

    const handleChange = <T extends keyof StorageCenter>(key: T, newValue: StorageCenter[T]) => {
        const COPY_STORAGE: StorageCenter = Object.assign({}, storage);
        COPY_STORAGE[key] = newValue;
        setStorage(COPY_STORAGE);
    }

    const handleSubmit = () => {
        GETStorages(storage.id, storage.description, storage.active);
    }

    const handleExclude = (id: number) => {
        PUTExcludeStorage(id).then(() => setOpenDeleteModal(false)).catch(() => { })
    }

    const handleTableClick = (param: StorageCenter) => {
        setStorage(param);
    }
    return (

        <div>
            <ActionsModal
                isOpen={openDeleteModal}
                onClose={() => setOpenDeleteModal(false)}
                title="Atenção!"
                closeLabel="Cancelar"
                eventButtons={[
                    { label: "DELETAR", cb: () => handleExclude(storage.id) }
                ]}
            >
                <p>
                    Você tem certeza de que deseja excluir este armazém? Ele não poderá mais ser recuperado.
                </p>
            </ActionsModal>
            <form onSubmit={handleSubmit} id="search-filters-container">

                <InputComponent
                    classname="search-filter"
                    id="search-id"
                    label="Código:"
                    type="text"
                    action={(e: React.ChangeEvent<HTMLInputElement>) =>
                        handleChange("id", parseInt(e.target.value))}
                />

                <InputComponent
                    classname="search-filter"
                    id="search-name"
                    label="Name:"
                    type="text"
                    action={(e: React.ChangeEvent<HTMLInputElement>) =>
                        handleChange("description", e.target.value.toString())}
                />

                <InputSelect<Active>
                    classname="search-filter"
                    id="search-filter-active"
                    label="Exibir desativados:"
                    idKey="value"
                    labelKey="description"
                    onValueChange={(active: Active) =>
                        handleChange('active', active.value)}
                    options={[
                        { description: "Exibir", value: true },
                        { description: "Não exibir", value: false }
                    ]}
                    value={storage !== null ?
                        storage.active ? { description: "Exibir", value: true } :
                            { description: "Não exibir", value: false } : null} />
            </form>
        
            <ButtonsBar
                createPath="/createStorage"
                reloadAction={fetchStorages}
                excludeAction={() => setOpenDeleteModal(true)}
                editAction={handleEdit}
                editIsPresent={true}
                viewAction={handleView}
            />
            <TableRender
                values={storages}
                headers={[
                    { gridType: 'FLEX', attributeName: 'id', width: 1, label: 'Código' },
                    { gridType: 'FLEX', attributeName: 'description', width: 1, label: 'Nome' },
                ]}
                onTableClick={handleTableClick}
            />
        </div>
    )
}

export default ListStorage;