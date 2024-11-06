import '../components/css/modal.css';
import ButtonComponent from './buttons/Button';
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
    productAction?: (param: boolean, row: T) => void
    count?: number
}

const TableRender = <T,>({ values, headers, onTableClick, productAction, count }: tableRender<T>): JSX.Element => {

    const [indexRow, setIndexRow] = React.useState<number>(-1);
    let controlIndex = -1

    const handleTableClick = (row: T, index?: number): void => {

        if (onTableClick !== undefined && onTableClick !== null) {

            onTableClick(row);
            console.log(row)
        }

        setIndexRow(index)
    }

    const handleProductAction = (param: boolean, row: T) => {

        if (productAction) {
            productAction(param, row)
        }
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
                            headers !== undefined && productAction ?

                                (
                                    <>
                                        <th style={{width: "10%"}}></th>
                                        {headers.map(
                                            (h: Headers<T>) => (
                                                (

                                                    (
                                                        <th style={h.gridType === 'FLEX' ?
                                                            { flex: h.width } :
                                                            { width: h.width }}>

                                                            {h.label}

                                                        </th>
                                                    )
                                                )
                                            )
                                        )}
                                    </>
                                )

                                :

                                headers ?
                                    (
                                        headers.map(
                                            (h: Headers<T>) => (
                                                (

                                                    (
                                                        <th style={h.gridType === 'FLEX' ?
                                                            { flex: h.width } :
                                                            { width: h.width }}>

                                                            {h.label}

                                                        </th>
                                                    )
                                                )
                                            )
                                        )
                                    )

                                    :

                                    (
                                        (values && values.length > 0 && typeof values[0] === "object" && values[0]) ?

                                            (Object.keys(values[0]).map((key: any, idx: number) => (
                                                <th style={{ textTransform: "capitalize" }}
                                                    key={`${key}`}>

                                                    {key}

                                                </th>
                                            )
                                            )
                                            ) :

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
                                            (
                                                headers !== undefined && productAction ?
                                                
                                                    (
                                                        <>
                                                            <td style={{display: "flex", flexDirection: "row", justifyContent: "space-between"}}>
                                                                {/* if add, true; if sub, false */}
                                                                <ButtonComponent
                                                                    classname='add-sub-button'
                                                                    type='button'
                                                                    label='-'
                                                                    action={() => productAction(false, r)}

                                                                />
                                                                {count}
                                                                <ButtonComponent
                                                                    classname='add-sub-button'
                                                                    type='button'
                                                                    label='+'
                                                                    action={() => {
                                                                        productAction(true, r)
                                                                    }}

                                                                />
                                                            </td>

                                                            <TableRow
                                                                index={index}
                                                                value={r}
                                                                count={count}
                                                                indexRow={indexRow}
                                                                header={headers}
                                                                handleValue={handleValue}
                                                                prodAction={productAction ? (param: boolean) => handleProductAction(param, r) : null} />
                                                        </>
                                                    )
                                                    :
                                                    headers !== undefined ?
                                                        (
                                                            <TableRow
                                                                index={index}
                                                                value={r}
                                                                count={count}
                                                                indexRow={indexRow}
                                                                header={headers}
                                                                handleValue={handleValue}
                                                                prodAction={productAction ? (param: boolean) => handleProductAction(param, r) : null} />
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
    count: number;
    value: T;
    prodAction: (param: boolean) => void;
    handleValue: (value: any) => string;
};

const TableRow = <T,>({ header, index, indexRow, value, count, handleValue, prodAction }: TableRowProps<T>): JSX.Element => {

    return (
        <>
            {/* {prodAction &&
                <td>
                 
                    <ButtonComponent
                        style='add-sub-button'
                        type='button'
                        label='-'
                        action={() => prodAction(false)}

                    />
                    {count}
                    <ButtonComponent
                        style='add-sub-button'
                        type='button'
                        label='+'
                        action={() => {
                            prodAction(true)
                        }}

                    />
                </td>
            } */}
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