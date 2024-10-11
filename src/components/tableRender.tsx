import '../components/css/modal.css';
import './css/table.css'
import React from "react";

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
    actionsLabel?: string;
    onTableClick?: (param: T) => void;
    onClickActions?: () => void;
}

const TableRender = <T,>({ values, selectedRow, headers, actionsLabel, onTableClick, onClickActions }: tableRender<T>): JSX.Element => {

    const [indexRow, setIndexRow] = React.useState<number>(-1);
    let controlIndex = -1

    const handleTableClick = (row: T, index?: number): void => {

        if (onTableClick !== undefined && onTableClick !== null) {

            onTableClick(row);
            console.log(row)
        }

        setIndexRow(index)
    }

    const handleValue = (value: any): string => {

        if (value === true) {

            return "ATIVO"
        } else if (value === false) {

            return "NÃO ATIVO"
        } else if (value == undefined || value == "") {

            return ""
        }

        return (value)
    }

    return (

        <div>
            <table className="content-table" id="table">
                <thead>

                    <tr>
                        {
                            headers !== undefined ?

                                (headers.map((h: Headers<T>) => (
                                    <th style={h.gridType === 'FLEX' ?
                                        { flex: h.width } :
                                        { width: h.width }}>

                                        {h.label}

                                    </th>
                                ))) :

                                ((values && values.length > 0 && typeof values[0] === "object" && values[0]) ?

                                    (Object.keys(values[0]).map((key: any, idx: number) => (
                                        <th style={{ textTransform: "capitalize" }}
                                            key={`${key}`}>

                                            {key}

                                        </th>
                                    ))) :

                                    (null)
                                )
                        }
                        {
                            // onClickActions !== undefined &&
                            // <th>
                            //     OPÇÕES
                            // </th>
                        }
                    </tr>

                </thead>

                <tbody>
                    {
                        values.map((r: T, index: number) => {


                                return (

                                    <tr
                                        onClick={() => handleTableClick(r, index)}
                                        // onMouseOver = {() => handleTableClick(r)}
                                        key={`table-row-${index}`}
                                        style={{ height: "50px" }}
                                        // onMouseEnter={() => handleMouseEnter(index)}
                                        // onMouseLeave={handleMouseLeave}
                                        className={
                                            index === indexRow ?
                                                'selected-row' :
                                                index % 2 === 0 ?
                                                    'even-row' :
                                                    'odd-row'
                                        }>

                                        {
                                            typeof r === 'object' && r !== null ?

                                                Object.entries(r).map(([key, value], idx: number) => (
                                                    headers !== undefined ?

                                                        (headers.find((h: Headers<T>) => h.attributeName === key) !== undefined ?

                                                            (<td
                                                                key={`table-row-cell-${idx}`}>
                                                                {handleValue(value)}
                                                            </td>) : (null)) :

                                                        (<td
                                                            key={`table-row-cell-${idx}`}>
                                                            {handleValue(value)}
                                                        </td>)
                                                )) : null
                                        }
                                    </tr>
                                )})}
                </tbody>
            </table>
        </div>
    )
}

export default TableRender;