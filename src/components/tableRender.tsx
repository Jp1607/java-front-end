import React from "react";
import { Product, User } from "../api/GET";
import DeleteProds from "../api/DeleteProducts";
import { Link, useLocation } from "react-router-dom";
import Modal from "./modal";
import '../css/delete-pop-up.css';

type EventButtons = {
    label: string;
    cb: (event?: React.MouseEvent<HTMLButtonElement, MouseEvent>, param?: any) => void;
}

type Headers<T> = {
    attributeName: keyof T;
    label: string;
    gridType: "PX" | "FLEX";
    width: string | number;
}

type tableRender<T> = {
    values: T[];
    selectedRow?: T | null;
    headers?: Headers<T>[];
    onTableClick?: (param: T) => void;
    eventButtons?: EventButtons[];
}

const TableRender = <T,>({ values, selectedRow, onTableClick, eventButtons, headers }: tableRender<T>): JSX.Element => {


    const path = useLocation().pathname;
    const [indexRow, setIndexRow] = React.useState<number>(-1);
    const [showState, setShowState] = React.useState<boolean>(false);

    const handleTableClick = (event: React.MouseEvent<HTMLTableRowElement, MouseEvent>, row: T, index: number): void => {
        if (onTableClick !== undefined && onTableClick !== null) {

            onTableClick(row);

        }
    }

    const handleMouseEnter = (index: number): void => {
        setIndexRow(index);
    }

    const handleMouseLeave = () => {
        setIndexRow(-1);
    }

    const handleClose = () => {
        setShowState(false)
    }

    const handleOpen = () => {
        setShowState(true)
    }

    const handleValue = (value: any): string => {
        if (value === true) {
            return "ATIVO"
        } else if (value === false) {

            return "NÃO ATIVO"
        } else if (value == undefined || value == "") {

            return "INDEFINIDO"
        }
        return (value)
    }


    return (

        <div>
            <Modal isOpen={showState}>
                <div className="pop-up">
                    <div className="pop-up-header">

                        <h1
                            className="pop-up-head">
                            ACTIONS
                        </h1>
                    </div>

                    <div className="pop-up-body">
                        <p className="pop-up-content" >
                            {/* Você tem certeza de que deseja excluir este {path == "/product" ? "produto" : "usuário"}? */}
                        </p>
                    </div>

                    <div
                        className="pop-up-footer">

                        {
                            eventButtons !== undefined && eventButtons.map((b: EventButtons) => (
                                <button className="content-abled-button" onClick={b.cb}>{b.label}</button>
                            ))
                        }
                        <button className={'content-abled-button'} onClick={handleClose}> CANCELAR</button>
                    </div>
                </div>
            </Modal>


            <table className="content-table" id="table">
                <thead>
                    <tr>
                        {
                            headers !== undefined ?
                                (
                                    headers.map((h: Headers<T>) => (
                                        <th style={h.gridType === 'FLEX' ? { flex: h.width } : { width: h.width }}>
                                            {h.label}
                                        </th>
                                    ))
                                )
                                :
                                ((values && values.length > 0 && typeof values[0] === "object" && values[0]) ?
                                    (
                                        Object.keys(values[0]).map((key: any, idx: number) => (

                                            <th style={{ textTransform: "capitalize" }}
                                                key={`${key}`}>
                                                {key}
                                            </th>
                                        ))
                                    ) : (null)
                                )
                        }
                        {eventButtons !== undefined &&
                            <th> Actions </th>
                        }
                    </tr>
                </thead>

                <tbody>
                    {
                        values.map((r: T, index: number) => (
                            <tr
                                onClick={(event: React.MouseEvent<HTMLTableRowElement, MouseEvent>) => handleTableClick(event, r, index)}
                                key={`table-row-${index}`}
                                style={{height: "50px"}}
                                onMouseEnter={() => handleMouseEnter(index)}
                                onMouseLeave={handleMouseLeave}

                                className={
                                    index === selectedRow ?
                                        'selected-row' :
                                        index === indexRow ?
                                            'hovered-row' :
                                            index % 2 === 0 ?
                                                'even-row' :
                                                'odd-row'
                                }>

                                {
                                    typeof r === 'object' && r !== null ?
                                        Object.entries(r).map(([key, value], idx: number) => (
                                            headers !== undefined ?
                                                (headers.find((h: Headers<T>) => h.attributeName === key) !== undefined ? (
                                                    <td
                                                        key={`table-row-cell-${idx}`}>
                                                        {handleValue(value)}
                                                    </td>
                                                ) : (null))
                                                :
                                                (<td
                                                    key={`table-row-cell-${idx}`}>
                                                    {handleValue(value)}
                                                </td>)

                                        )) : null
                                }
                                {eventButtons !== undefined &&
                                    <td width="200px">
                                        {
                                            indexRow === index &&
                                            <div style={{ display: 'flex' }}>

                                                <button
                                                    onClick={handleOpen}
                                                    className="content-abled-button-list"
                                                    value="Open actions"
                                                >
                                                    Actions
                                                </button>
                                            </div>
                                        }
                                    </td>
                                }
                            </tr>
                        ))
                    }
                </tbody>
            </table>
        </div>
    )
}

export default TableRender;