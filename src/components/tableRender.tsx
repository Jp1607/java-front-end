import React from "react";
import { Product } from "../api/TableFetch";
import { Modal, ModalHeader, ModalTitle, ModalBody, ModalDialog, ModalFooter, Alert } from "react-bootstrap";
import DeleteProds from "../api/DeleteProducts";
import { Link } from "react-router-dom";

type tableRender<T> = {
    products: Product[],
    selectedRow?: T | null,
    onTableClick?: (param: Product) => void
}

const TableRender = <T,>({ products, selectedRow, onTableClick }: tableRender<T>): JSX.Element => {

    const [show, setShow] = React.useState<boolean>(false);
    const [indexRow, setIndexRow] = React.useState<number>(-1);
    const [product, setProduct] = React.useState<Product>(null);
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

    const handleConfirmation = () => {
        setShow(true)
    }

    const handleDelete = () => {

        DeleteProds(product).then((response: string) => { console.log(response) }).catch((e) => console.log('Error ao deletar produto', e));
        setShow(false)
        window.location.reload()
    }

    const handleClose = () => {

        setShow(false)
    }

    return (

        <div>

            <Modal

                show={show}
                backdrop="static"
                keyboard={false}
                style={{

                    alignContent: "center",
                    alignItems: "center",
                    alignSelf: "center",
                    zIndex: 999,
                    border: 'solid, 1px'
                }}>

                <ModalHeader closeButton>

                    <ModalTitle> Atenção! </ModalTitle>
                </ModalHeader>

                <ModalBody>

                    <ModalDialog>

                        <p> Você tem certeza de que deseja deletar este produto? </p>
                    </ModalDialog>
                </ModalBody>

                <ModalFooter>

                    <button onClick={handleDelete}>DELETAR</button>
                    <button onClick={handleClose}>CANCELAR</button>
                </ModalFooter>
            </Modal>

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
                                                {value as any}
                                            </td>
                                        )) : null
                                }

                                <td>

                                    <Link to={indexProduct === index ? `/editProd/${product.id}?` : '#'}>

                                        <button

                                            style={{
                                            }}
                                            disabled={indexProduct === index}
                                            className={indexProduct === index ? 'content-abled-button' : "content-disabled-button"}>

                                            EDITAR PRODUTO
                                        </button>
                                    </Link>

                                    <button

                                        disabled={indexProduct === index}
                                        onClick={handleConfirmation}
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