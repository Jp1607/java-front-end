import React from "react";
import { Link } from "react-router-dom"


// type TableWithReactApiProps<T> = {
//     rows: T[];
//     selectedRow?: T | null;
//     onTableClick?: (param: T) => string;
// }


 const ListProds = () => {
    return(<h1>asdsada</h1>)


//     return (
       
//         <table

//                     style={{
//                     }}>
        
//                     <thead>
//                         {rows !== undefined && rows !== null && Array.isArray(rows) && rows.length > 0 && typeof rows[0] === 'object' && rows[0] !== null &&
//                             <tr
//                                 style={{ backgroundColor: '#f4f4f4' }}>
        
//                                 {Object.keys(rows[0]).map((key, idx: number) => (
//                                     <th
        
//                                         style={{
//                                             border: "1px solid",
//                                             padding: '12px 15px',
//                                             textAlign: 'left',
//                                             fontWeight: 'bold',
//                                             backgroundColor: '#e0e0e0',
//                                             textTransform: 'uppercase'
//                                         }}
        
//                                         key={`table-heade-row-cell-${key}-${idx.toString}`}>{key}</th>
//                                 ))}
//                             </tr>
//                         }
//                     </thead>
        
//                     <tbody>
        
//                         {rows.map((r: T, index: number) => (
//                             < tr
        
//                                 key={`table-row-${index}`}
        
//                                 onClick={(event: React.MouseEvent<HTMLTableRowElement, MouseEvent>) => handleTableClick(event, r)
//                                 }
        
//                                 onMouseEnter={() => handleMouseEnter(index)}
//                                 onMouseLeave={handleMouseLeave}
        
//                                 style={{
//                                     border: "1px solid",
//                                     backgroundColor: selectedRow === index ? 'rgb(0, 191, 255)' : indexRow === index ? 'rgb(0, 191, 255)' : 'transparent',
//                                 }}>
        
//                                 {
//                                     typeof r === 'object' && r !== null ? (
//                                         Object.entries(r).map(([key, value], idx: number) => (
//                                             <td
//                                                 style={{
//                                                     border: "1px solid",
//                                                     padding: '10px',
//                                                     // borderBottom: '1px solid #ddd',
//                                                     textAlign: 'left'
//                                                 }}
//                                                 key={`table-row-cell-${key}-${idx}`}>{handleValue(value)}</td>
//                                         ))) : (null)
//                                 }
//                             </tr>
//                         ))}
//                     </tbody>
//                 </table >

//     )
// }

// // const TableWithReactApi = <T,>({ rows, selectedRow, onTableClick }: TableWithReactApiProps<T>): JSX.Element => {
// //     const handleTableClick = (event: React.MouseEvent<HTMLTableRowElement, MouseEvent>, row: T): void => {
// //         event.preventDefault();
// //         if (onTableClick !== undefined && onTableClick !== null) {
// //             onTableClick(row);
// //         }
// //     }

// //     const [indexRow, setIndexRow] = React.useState<number>(-1);

// //     const handleMouseEnter = (index: number): void => {
// //         setIndexRow(index);
// //     }

// //     const handleMouseLeave = () => {
// //         setIndexRow(-1);
// //     }

// //     const tableStyle = {
// //         backgroundColor: indexRow ? 'lightblue' : 'rgb(0, 191, 255)',
// //         color: "blue", width: '100%',
// //         borderCollapse: "collapse"
// //     }

// //     const handleValue = <K extends keyof T>(value: T[K]): any  => {

// //         switch (typeof value) {
// //             case 'boolean':
// //                 return value ? 'ATIVO' : 'DESATIVO';
// //         }
// //         return value;
// //     }

// //     return (
// //        
// //     )
 }


 export default ListProds;