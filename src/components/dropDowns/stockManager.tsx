import Collapsible from "react-collapsible"
import ButtonComponent from "../buttons/Button"
import LinkButton from "../buttons/LinkButton"
import React from "react"
import StockActionsDropDown from "./stockActions"

const StockManagerDropDown = () => {

    const [symbol, setSymbol] = React.useState<string>("+")

    const handleSymbol = () => {
        symbol == "+" ? setSymbol("-") : setSymbol("+")
    }
    return (

        <Collapsible
            trigger={<ButtonComponent
                label={`Gerenciamento de estoque ${symbol}`}
                type="button"
                action={() => { }} />}
            onTriggerOpening={handleSymbol}
            onTriggerClosing={handleSymbol}
            triggerClassName="collapsible-trigger"
            triggerOpenedClassName="collapsible-trigger-open">
            <LinkButton
                dest="/listStocksFlow"
                label="Fluxo de estoque" />
            <LinkButton
                dest="/listStorages"
                label="Centros de armazenamento" />

            <StockActionsDropDown />
        </Collapsible>
    )
}

export default StockManagerDropDown;