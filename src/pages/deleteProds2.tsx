import React, { useState } from "react";
import { Product } from "../api/TableFetch";
import DeleteProds from "../api/DeleteProducts";
import { useNavigate } from "react-router-dom";
import { Alert, Button, Modal, ModalBody, ModalDialog, ModalFooter, ModalHeader, ModalTitle } from "react-bootstrap";

const DeleteProduct2 = (show: boolean, product: Product) => {

    console.log('2')

    //const [product, setProduct] = React.useState<Product>(null)
     const [showState, setShowState] = React.useState(show)


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


    //     const navigate = useNavigate();

    //     return (
    //         <Alert show={showState}>
    //             <Alert.Heading>Atenção!</Alert.Heading>
    //             <div>
    //                 <button onClick={delProds}>DELETAR</button>
    //                 <button onClick={() => setShowState(false)}>CANCELAR</button>

    //             </div>
    //         </Alert>
    //     )

    // }

    //   return (
    //     <>
    //       {[
    //         'primary',
    //         'secondary',
    //         'success',
    //         'danger',
    //         'warning',
    //         'info',
    //         'light',
    //         'dark',
    //       ].map((variant) => (
    //         <Alert key={variant} variant={variant}>
    //           This is a {variant} alert with{' '}
    //           <Alert.Link href="#">an example link</Alert.Link>. Give it a click if
    //           you like.
    //         </Alert>
    //       ))}
    //     </>
    //   );

    return (
        <Modal 
        show={showState} 
        backdrop="static"
        keyboard={false}>

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
    );
}

export default DeleteProduct2;