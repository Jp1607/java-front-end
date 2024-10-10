import Collapsible from "react-collapsible"
import LinkButton from "./LinkButton"
import "../css/button.css"
import ButtonComponent from "./Button"
import React from "react"

const DropDown = () => {

const [symbol, setSymbol] = React.useState<string>("+")

const handleSymbol = () => {
   symbol == "+" ? setSymbol("-") : setSymbol("+")
}
    return (

        <Collapsible
            trigger={<ButtonComponent
                label={`Cadastros e Opções ${symbol}`}
                type="button"
                action={() => { }} />}
                onTriggerOpening={handleSymbol}
                onTriggerClosing={handleSymbol}
            triggerClassName="collapsible-trigger"
            triggerOpenedClassName="collapsible-trigger-open">
            <LinkButton
                dest="/listBrands"
                label="Marcas" />
            <LinkButton
                dest="/listGroups"
                label="Grupos" />
            <LinkButton
                dest="/listTypes"
                label="Tipos" />
            <LinkButton
                dest="/listMUs"
                label="Unidades de Medida" />

        </Collapsible>
    )
}

export default DropDown