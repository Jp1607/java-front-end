import React from "react"
import Collapsible from "react-collapsible"
import ButtonComponent from "../buttons/Button"
import LinkButton from "../buttons/LinkButton"

const StockActionsDropDown = () => {

    const [symbol, setSymbol] = React.useState<string>("+")
    
    const handleSymbol = () => {
       symbol == "+" ? setSymbol("-") : setSymbol("+")
    }
        return (
    
            <Collapsible
                trigger={<ButtonComponent
                    label={`Ações de fluxo ${symbol}`}
                    type="button"
                    action={() => { }} />}
                    onTriggerOpening={handleSymbol}
                    onTriggerClosing={handleSymbol}
                triggerClassName="collapsible-trigger"
                triggerOpenedClassName="collapsible-trigger-open">
                <LinkButton
                    dest="/sellItem"
                    label="Venda" />
                <LinkButton
                    dest="/buy"
                    label="Compra" />
    
            </Collapsible>
        )
    }
    
    export default StockActionsDropDown;