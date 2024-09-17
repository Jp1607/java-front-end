import React from "react";
import { Product, User } from "../api/TableFetch";
import DeleteProds from "../api/DeleteProducts";
import { Link, useLocation } from "react-router-dom";
import Modal from "./modal";
import '../css/delete-pop-up.css';

type tableRender<T> = {

    values: Product[] | User[],
    selectedRow?: T | null,
    onTableClick?: (param: Product | User) => void
}

const TableRender = <T,>({ values, selectedRow, onTableClick }: tableRender<T>): JSX.Element => {


    const path = useLocation().pathname;
    const [indexRow, setIndexRow] = React.useState<number>(-1);
    const [product, setProduct] = React.useState<Product>(null);
    const [user, setUser] = React.useState<User>(null);
    const [showState, setShowState] = React.useState<boolean>(false);
    const [indexValue, setIndexValue] = React.useState<number>(null);

    const handleTableClick = (event: React.MouseEvent<HTMLTableRowElement, MouseEvent>, row: Product | User, index: number): void => {

        setIndexValue(index);
        event.preventDefault();
        if (row as Product) {
            setProduct(row as Product);
        } else {
            setUser(row as User)
        }

        if (onTableClick !== undefined && onTableClick !== null) {

            onTableClick(row);

            if (row as Product) {
                setProduct(row as Product);
            } else {
                setUser(row as User)
            }
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
                            Atenção!
                        </h1>
                    </div>

                    <div className="pop-up-body">

                        <p className="pop-up-content" >
                            Você tem certeza de que deseja excluir este produto?
                        </p>
                    </div>

                    <div
                        className="pop-up-footer">
                        <button className={'content-abled-button'} onClick={handleDelete}> EXCLUIR</button>
                        <button className={'content-abled-button'} onClick={handleClose}> CANCELAR</button>
                    </div>
                </div>
            </Modal>


            <table className="content-table" id="table">
                <thead>
                    {/* <tr>
                        <th> ID </th>
                        <th> NOME </th>
                        <th> DESCRIÇÃO </th>
                        <th> CÓDIGO DE BARRAS </th>
                        <th> ATIVO </th>
                        <th> </th>
                    </tr> */}
                {
                    
                    (path == "/listProds") ? (

                        <tr>
                        <th> ID </th>
                        <th> NOME </th>
                        <th> DESCRIÇÃO </th>
                        <th> CÓDIGO DE BARRAS </th>
                        <th> ATIVO </th>
                        <th> </th>
                    </tr> 
                      

                   ) : (
                    <tr>
                    <th> ID </th>
                    <th> NOME </th>
                    <th> ATIVO </th>
                    <th> </th>
                    </tr>
                   )
                   
                    
                }

                </thead>

                <tbody>
                    {
                        values.map((r: Product | User, index: number) => (

                           
                            <tr
                                onClick={(event: React.MouseEvent<HTMLTableRowElement, MouseEvent>) =>
                                    handleTableClick(event, r, index)}

                                key={`table-row-${index}`}

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

                                            <td
                                                key={`table-row-cell-${idx}`}>
                                                {handleValue(value)}
                                            </td>

                                        )) : null
                                }

                                <td>
                                    <Link to={indexValue === index ? `/editProd/${product.id}?` : '#'}>

                                        <button
                                            disabled={indexValue !== index}
                                            className={indexValue === index ?
                                                'content-abled-button-list' :
                                                "content-disabled-button-list"}>
                                            EDITAR PRODUTO
                                        </button>
                                    </Link>

                                    <button

                                        disabled={indexValue !== index}
                                        onClick={handleOpen}
                                        className={indexValue === index ?
                                            'content-abled-button-list' :
                                            "content-disabled-button-list"}>
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