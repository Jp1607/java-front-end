import ButtonsBar from "../../components/ButtonsBar"
import InputComponent from "../../components/inputs/InputComponent"
import TableRender from "../../components/tableRender"

const CadBrand = () => {

    return (

        <div>

        <ButtonsBar/>
        
        <div>

            <InputComponent
            id = "BrandId"
            label = "Código: "
            type = "number"
            action = {() => {}}/>

            <InputComponent
            id = "BrandName"
            label = "Marca: "
            type = "text"
            action = {() => {}}/>
            
        </div>

        <TableRender
        headers={[
            {attributeName: "id", label: "CÓDIGO", gridType: "FLEX", width: "1"}
        ]}/>

        </div>
    )
}