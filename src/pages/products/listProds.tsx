import getProducts, { Product, User } from "../../api/requests/GET";
import ActionsModal from "../../components/modals/ActionsModal";
import LinkButton from "../../components/buttons/LinkButton";
import DeleteProds from "../../api/requests/DeleteProducts";
import TableRender from "../../components/tableRender";
import {  useNavigate } from "react-router-dom";
import React, { useEffect } from "react";
import { useState } from "react";
import '../css/table.css';

const ProductListRender: React.FC = () => {

    const navigate = useNavigate();
    const [open, setOpen] = React.useState<boolean>(false);
    const [openDelete, setOpenDelete] = React.useState<boolean>(false);
    const [products, setProducts] = useState<Product[]>([])
    const [product, setProduct] = useState<Product>({
        name: '',
        description: "",
        barCode: 0,
        active: false
    })

    const fetchData = async () => {

        await getProducts("/product").then((response: Product[] | User[]) => {

            setProducts(response as Product[])
        }).catch(() => { })
    }

    useEffect(() => {

        fetchData()
    }, [])

    const handleTableClick = (param: Product) => {

        setProduct(param as Product);
    }

    const handleEditAction = (): void => {

        if (product.id !== undefined && product.id > 0) {

            navigate(`/editProd/${product.id}`);
        }
    }

    const handleDeleteProduct = (): void => {

        setOpen(false)
        setOpenDelete(true)

    }

    const handleDeleteClick = (): void => {

        try {
            DeleteProds(product).
                then(() => (
                    fetchData().
                        then(() => (
                            setOpenDelete(false),
                            setOpen(false))).catch(() => (null))
                )).catch(() => (null))
        } catch (e) {
            console.log("Erro: ", e)
        }
    }

    return (
        <>

            <ActionsModal
                isOpen={openDelete}
                onClose={() => { setOpenDelete(false); setOpen(true) }}
                title="ATENÇÃO!"
                eventButtons={[
                    { label: 'DELETAR', cb: handleDeleteClick }
                ]}
            >
                
                <p>
                    Você tem certeza de que deseja deletar este produto?
                </p>

            </ActionsModal>

            <ActionsModal

                isOpen={open}
                onClose={() => setOpen(false)}
                eventButtons={[
                    { label: 'DELETAR PRODUTO', cb: handleDeleteProduct },
                    { label: 'EDITAR', cb: handleEditAction }
                ]}
                title={"OPÇÕES "} />

            <div className="default-page">
                <div className="default-content">

                    <LinkButton
                        dest="/createProd"
                        label="CRIAR PRODUTO"
                        style="button"
                        
                    />

                    <TableRender<Product>

                        headers={[
                            { gridType: 'FLEX', attributeName: 'id', width: 1, label: 'Identificador' },
                            { gridType: 'FLEX', attributeName: 'name', width: 1, label: 'Produto' },
                            { gridType: 'FLEX', attributeName: 'description', width: 1, label: 'Descrição' },
                            { gridType: 'FLEX', attributeName: 'barCode', width: 1, label: 'Código de barras' },
                            { gridType: 'FLEX', attributeName: 'active', width: 1, label: 'Estado' }
                        ]}
                        values={products}
                        selectedRow={product}
                        onTableClick={handleTableClick}
                        onClickActions={() => setOpen(true)}
                    />
                </div>
            </div>
        </>
    )
}
export default ProductListRender;