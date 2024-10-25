import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { StockFlow } from "../api/entities/stockFlow";
import { StockFlowDTO } from "../api/entities/stockFlowDTO";
import { getStockFlows } from "../api/requests/stockFlowRequests";
import Active from "../api/services/activeInterface";
import ButtonsBar from "../components/ButtonsBar";
import InputComponent from "../components/inputs/InputComponent";
import InputSelect from "../components/inputs/selectInput";
import ActionsModal from "../components/modals/ActionsModal";
import TableRender from "../components/tableRender";

const listStockFlow = () => {

    const navigate = useNavigate();
    const [stockFlows, setStockFlows] = React.useState<StockFlow[]>([]);
    const [stockFlow, setStockFlow] = React.useState<StockFlow>({
        prodId: 0,
        storageId: 0,
        qnt: 0,
        type: null,
        date: null
    });
    const [stockFlowDTO, setStockFlowDTO] = React.useState<StockFlowDTO>({
        type: '',
        storageId: 0,
        date1: '',
        date2: ''
    })

    const fetchStockFlows = async () => {
        await getStockFlows().then((response: StockFlow[]) => setStockFlows(response)).catch(() => { })
    }

    useEffect(() => {
        fetchStockFlows();
    }, [])

    const handleView = () => {
        if (stockFlow.id) {
            navigate(`/viewStockFlow/${stockFlow.id}`);
        } else {
            window.alert("Selecione uma movimentação válida para visualização!")
        }
    }

    const handleChange = <T extends keyof StockFlowDTO>(key: T, newValue: StockFlowDTO[T]) => {
        const COPY_STORAGE: StockFlowDTO = Object.assign({}, stockFlowDTO);
        COPY_STORAGE[key] = newValue;
        setStockFlowDTO(COPY_STORAGE);
    }

    const handleSubmit = () => {
        getStockFlows(stockFlowDTO.type, stockFlowDTO.date1, stockFlowDTO.date2, stockFlowDTO.storageId);
    }

    const handleTableClick = (param: StockFlow) => {
        setStockFlow(param);
    }
    return (

        <div>
            <div onSubmit={handleSubmit} id="search-filters-container">

                <InputComponent
                    className="search-filter"
                    id="search-type"
                    label="Direção:"
                    type="text"
                    action={(e: React.ChangeEvent<HTMLInputElement>) =>
                        handleChange("type", e.target.value.toString())}
                />

                <InputComponent
                    className="search-filter"
                    id="search-initial-date"
                    label="Data inicial:"
                    type="text"
                    action={(e: React.ChangeEvent<HTMLInputElement>) =>
                        handleChange("date1", e.target.value.toString())}
                />

                <InputComponent
                    className="search-filter"
                    id="search-final-date"
                    label="Data final:"
                    type="text"
                    action={(e: React.ChangeEvent<HTMLInputElement>) =>
                        handleChange("date2", e.target.value.toString())}
                />

                <InputComponent
                    className="search-filter"
                    id="search-storage"
                    label="Centro de armazenamento:"
                    type="number"
                    placeHolder="ID"
                    action={(e: React.ChangeEvent<HTMLInputElement>) =>
                        handleChange("storageId", parseInt(e.target.value))}
                />

                <InputComponent
                    className="search-filter"
                    id="search-name"
                    label="Name:"
                    type="text"
                    action={(e: React.ChangeEvent<HTMLInputElement>) =>
                        handleChange("date2", e.target.value.toString())}
                />

                <InputComponent
                    className="search-filter"
                    id="search-name"
                    label="Name:"
                    type="text"
                    action={(e: React.ChangeEvent<HTMLInputElement>) =>
                        handleChange("date1", e.target.value.toString())}
                />

            </div>
            <ButtonsBar
                reloadAction={fetchStockFlows}
                viewAction={handleView}
            />
            <TableRender<StockFlow>
                values={stockFlows}
                headers={[
                    { gridType: 'FLEX', attributeName: 'id', width: 1, label: 'Código' },
                    { gridType: 'FLEX', attributeName: 'prodId', width: 1, label: 'ID Produto' },
                    { gridType: 'FLEX', attributeName: 'storageId', width: 1, label: 'ID Centro de armazenamento' },
                    { gridType: 'FLEX', attributeName: 'qnt', width: 1, label: 'Quantidade' },
                    { gridType: 'FLEX', attributeName: 'type', width: 1, label: 'Tipo' },
                    { gridType: 'FLEX', attributeName: 'date', width: 1, label: 'Data' }
                ]}
                onTableClick={handleTableClick}
            />
        </div>
    )
}

export default listStockFlow;