import React from "react";
import { Product } from "../api/TableFetch";
// import { Modal, ModalHeader, ModalTitle, ModalBody, ModalDialog, ModalFooter, Alert } from "react-bootstrap";
import DeleteProds from "../api/DeleteProducts";
import { Link } from "react-router-dom";
import Modal from "./modal";

type tableRender<T> = {
    products: Product[],
    selectedRow?: T | null,
    onTableClick?: (param: Product) => void
}

const TableRender = <T,>({ products, selectedRow, onTableClick }: tableRender<T>): JSX.Element => {

    const [show, setShow] = React.useState<boolean>(false);
    const [indexRow, setIndexRow] = React.useState<number>(-1);
    const [product, setProduct] = React.useState<Product>(null);
    const [showState, setShowState] = React.useState<boolean>(false);
    const [indexProduct, setIndexProduct] = React.useState<number>(null);

    const handleTableClick = (event: React.MouseEvent<HTMLTableRowElement, MouseEvent>, row: Product, index: number): void => {

        setIndexProduct(index);
        event.preventDefault();
        setProduct(row);

        if (onTableClick !== undefined && onTableClick !== null) {

            onTableClick(row);
            setProduct(row)
        }
    }

    const handleMouseEnter = (index: number): void => {

        setIndexRow(index);
    }

    const handleMouseLeave = () => {

        setIndexRow(-1);
    }

    const handleDelete = () => {

        DeleteProds(product).then((response: string) => { console.log(response) }).catch((e) => console.log('Error ao deletar produto', e));
        window.location.reload();
        setShowState(false)
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
            }else if (value === false) {

                return "NÃO ATIVO"
            } else if (value == undefined || value == "") {

                return "INDEFINIDO"
            }
            return (value)
    }

    return (

        <div>
            <div
                className="pop-up-container">
                <Modal isOpen={showState}>
                    <div>

                        <h1
                            className="pop-up-header">
                            Atenção!
                        </h1>
                        <p
                            className="pop-up-body">
                            Você tem certeza de que deseja excluir este produto?
                        </p>

                        <div
                            className="pop-up-footer">
                            <button onClick={handleDelete}> EXCLUIR</button>
                            <button onClick={handleClose}> CANCELAR</button>
                        </div>
                    </div>
                </Modal>
            </div>

            <table className="content-table">

                <thead>

                    <tr>

                        <th> ID </th>
                        <th> NOME </th>
                        <th> DESCRIÇÃO </th>
                        <th> CÓDIGO DE BARRAS </th>
                        <th> ATIVO </th>
                        <th> </th>
                    </tr>
                </thead>

                <tbody>

                    {
                        products.map((r: Product, index: number) => (

                            <tr
                                onClick={(event: React.MouseEvent<HTMLTableRowElement, MouseEvent>) => handleTableClick(event, r, index)}

                                key={`table-row-${index}`}

                                onMouseEnter={() => handleMouseEnter(index)}
                                onMouseLeave={handleMouseLeave}

                                className={

                                    index === selectedRow
                                        ? 'selected-row'
                                        : index === indexRow
                                            ? 'hovered-row'
                                            : index % 2 === 0
                                                ? 'even-row'
                                                : 'odd-row'
                                }
                            >
                                {
                                    typeof r === 'object' && r !== null ?
                                        Object.entries(r).map(([key, value], idx: number) => (

                                            <td
                                                key={`table-row-cell-${idx}`}
                                            >
                                                {handleValue(value)}
                                            </td>
                                        )) : null
                                }

                                <td>

                                    <Link to={indexProduct === index ? `/editProd/${product.id}?` : '#'}>

                                        <button

                                            disabled={indexProduct !== index}
                                            className={indexProduct === index ? 'content-abled-button' : "content-disabled-button"}>

                                            EDITAR PRODUTO
                                        </button>
                                    </Link>

                                    <button

                                        disabled={indexProduct !== index}
                                        onClick={handleOpen}
                                        className={indexProduct === index ? 'content-abled-button' : "content-disabled-button"}>

                                        DELETAR PRODUTO
                                    </button>
                                </td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
        </div>
    )
}

export default TableRender;