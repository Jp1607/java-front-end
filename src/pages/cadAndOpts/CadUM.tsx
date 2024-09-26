import ButtonsBar from "../../components/ButtonsBar"
import InputComponent from "../../components/inputs/InputComponent"
import TableRender from "../../components/tableRender"

const CadUM = () => {

    return (

        <div>

        <ButtonsBar/>
        
        <div>

            <InputComponent
            id = "MUId"
            label = "Código: "
            type = "number"
            action = {() => {}}/>

            <InputComponent
            id = "MU"
            label = "Marca: "
            type = "text"
            action = {() => {}}/>
            
        </div>

        {/* <TableRender
        headers={[
            {attributeName: "id", label: "CÓDIGO", gridType: "FLEX", width: "1"}
        ]}
        /> */}

        </div>
    )
}

export default CadUM;