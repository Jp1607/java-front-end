import React, { useState } from "react";
import { Product } from "../api/TableFetch";
import DeleteProds from "../api/DeleteProducts";
import { useNavigate } from "react-router-dom";
import { Alert, Button, Modal, ModalBody, ModalDialog, ModalFooter, ModalHeader, ModalTitle } from "react-bootstrap";

const DeleteProduct2 = () => {

    console.log('2')

     const [product, setProduct] = React.useState<Product>(null)
     const [showState, setShowState] = React.useState(false)


    const handleDelete = () => {

        console.log('3')

        console.log('produto: ', product);
        DeleteProds(product).then((response: string) => { console.log(response) }).catch((e) => console.log('Error ao deletar produto', e));

        setShowState(false)
    }

    const handleClose = () => {

        console.log('4')
        setShowState(false)
    }
    const handleOpen = () => {

        setShowState(true)
        console.log('4')
    }
   
        {showState && (
            <div
            className = "dialog-overlay">
            <div
            className = "dialog">
                <h1> Atenção! </h1>
                <p> Você tem certeza de que deseja excluir este produto?</p>
                <button onClick = {handleDelete}> EXCLUIR</button>
                <button onClick = {handleClose}> CANCELAR</button>
            </div>
            </div>
        )
    }   
}

export default DeleteProduct2;