import '../components/css/modal.css';
import React from "react";
import ButtonComponent from './buttons/Button';

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

    const handleTableClick = (row: T): void => {

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
                            onClickActions !== undefined &&
                            <th>
                                OPÇÕES
                            </th>
                        }
                    </tr>

                </thead>

                <tbody>
                    {
                        values.map((r: T, index: number) => (

                            <tr
                                onClick={() => handleTableClick(r)}
                                onMouseOver = {() => handleTableClick(r)}
                                key={`table-row-${index}`}
                                style={{ height: "50px" }}
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

                                {onClickActions !== undefined &&
                                    <td width="200px">

                                        {
                                            indexRow === index &&
                                            <div style={{ display: 'flex' }}>

                                                <ButtonComponent
                                                    label= {actionsLabel ? actionsLabel : "AÇÕES"}
                                                    type='button'
                                                    action={onClickActions} />

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