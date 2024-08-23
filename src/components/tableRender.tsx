import React from "react";
import { Product } from "../api/TableFetch";


type  tableRender<T> = {
    products: Product[],
    selectedRow?: T | null,
    onTableClick?: (param: Product) => void
}

const TableRender = <T,>({products, selectedRow, onTableClick}: tableRender<T>): JSX.Element => {
    const handleTableClick = (event: React.MouseEvent<HTMLTableRowElement, MouseEvent>, row: Product): void => {
        event.preventDefault();
        if (onTableClick !== undefined && onTableClick !== null) {
            onTableClick(row);
        }
    }
    const [indexRow, setIndexRow] = React.useState<number>(-1);
    
    const handleMouseEnter = (index: number): void => {
        setIndexRow(index);
    }

    const handleMouseLeave = () => {
        setIndexRow(-1);
    }
    
return(
<table>
                <thead>
                    <tr>
                        <th> ID </th>
                        <th> NOME </th>
                        <th> DESCRIÇÃO </th>
                        <th> CÓDIGO DE BARRAS </th>
                        <th> ATIVO </th>
                    </tr>
                </thead>

                <tbody>
                    {
                        products.map((r: Product, index: number) => (
                            <tr
                            onClick={(event: React.MouseEvent<HTMLTableRowElement, MouseEvent>) => handleTableClick(event, r)}
                            key={`table-row-${index}`}

                                onMouseEnter={() => handleMouseEnter(index)}
                                onMouseLeave={handleMouseLeave}

                                style={{
                                    border: "1px solid",
                                    backgroundColor: selectedRow === index ? 'rgb(0, 191, 255)' : indexRow === index ? 'rgb(0, 191, 255)' : 'transparent',
                                }}
                            >
                                {
                                    typeof r === 'object' && r !== null ?
                                        Object.entries(r).map(([key, value], idx: number) => (
                                            <td
                                                key={`table-row-cell-${idx}`}
                                            >
                                                {value as any}

                                            </td>
                                        )) : null
                                }
                            </tr>
                        ))
                    }
                </tbody>
            </table>
)
}

export default TableRender;