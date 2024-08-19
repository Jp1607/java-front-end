import React from "react"

type editProds = {
}

const CadProds = <T,>(rows: T[]) => {

    return (
        <table>
            <thead>
                <tr>
                    <th>
                        NOME
                    </th>
                    <th>
                        DESCRIÇÃO
                    </th>
                    <th>
                        CÓDIGO DE BARRAS
                    </th>
                    <th>
                        ESTADO
                    </th>
                </tr>
            </thead>

            <tbody>
                {rows.map((r: T, index: number) => (
                    < tr
                        key={`table-row-${index}`}
                    >
                        {
                            typeof r === 'object' && r !== null ? (
                                Object.entries(r).map(([key, value], idx: number) => (
                                    <td>

                                    </td>
                                ))) : (null)
                        }
                    </tr>
                ))}

            </tbody>

        </table>

    )
}

export default CadProds;