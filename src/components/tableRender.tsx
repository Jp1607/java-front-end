import '../components/css/modal.css';
import './css/table.css'
import React from "react";

export type Headers<T> = {
    attributeName: keyof T;
    label: string;
    gridType: "PX" | "FLEX";
    width: string | number;
}

type tableRender<T> = {
    values: T[];
    headers?: Headers<T>[];
    onTableClick?: (param: T) => void;
}

const TableRender = <T,>({ values, headers, onTableClick}: tableRender<T>): JSX.Element => {

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
                    </tr>

                </thead>

                <tbody>
                    {
                        values.map((r: T, index: number) => {
                            return (
                                <tr
                                    onClick={() => handleTableClick(r, index)}
                                    key={`table-row-${index}`}
                                    style={{ height: "50px" }}
                                    className={
                                        index === indexRow ?
                                            'selected-row' :
                                            index % 2 === 0 ?
                                                'even-row' :
                                                'odd-row'
                                    }>

                                    {
                                        typeof r === 'object' && r !== null ?
                                            (headers !== undefined ?
                                                (
                                                    <TableRow
                                                        index={index}
                                                        value={r}
                                                        indexRow={indexRow}
                                                        header={headers}
                                                        handleValue={handleValue} />
                                                )
                                                :
                                                (
                                                    Object.entries(r).map(([key, value], idx: number) => (
                                                        <td
                                                            key={`table-row-cell-${idx}`}>
                                                            {handleValue(value)}
                                                        </td>
                                                    ))
                                                ))
                                            :
                                            (null)
                                    }
                                </tr>
                            )
                        })}
                </tbody>
            </table>
        </div>
    )
}

type TableRowProps<T> = {
    header: Headers<T>[];
    index: number;
    indexRow: number;
    value: T;
    handleValue: (value: any) => string;
};

const TableRow = <T,>({ header, index, indexRow, value, handleValue }: TableRowProps<T>): JSX.Element => {

    return (
        <>
            {
                header.map((h: Headers<T>, idx: number) => {
                    return (
                        <td key={`table-row-cell-${idx}`}>
                            {value[h.attributeName] !== undefined ?
                                (handleValue(value[h.attributeName]))
                                :
                                (null)
                            }
                        </td>
                    )
                })
            }
        </>
    )
}

export default TableRender;