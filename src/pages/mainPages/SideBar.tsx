import React from "react";
import LinkButton from "../../components/buttons/LinkButton"
import OpenSb from "../../components/buttons/OpenSB"
import "../css/sideBar.css"
import DropDown from "../../components/buttons/DropDown";

const SideBar = () => {

    const sideBar = React.useRef<HTMLDivElement>(null);
    const [open, setOpen] = React.useState<boolean>(true);

    const handleClickSideBar = () => {

        setOpen(!open)
    }

    return (

        <div id="side-bar">

            <div className="bar-container"
                ref={sideBar}
                id={`bar-container-${open.toString()}`}>

                <LinkButton
                    dest="/listProds"
                    label="LISTA DE PRODUTOS" />

                <LinkButton
                    dest="/listUsers"
                    label="LISTA DE USUÁRIOS" />

                <DropDown />

                {/* <LinkButton
                        dest="/createUser"
                        label="CRIAR USUÁRIO"/> */}
            </div>

            <div
                id="open-side-button-container">

                <OpenSb
                    open={open}
                    onCloseClick={handleClickSideBar}
                    anexedBar="side-bar" />
            </div>
        </div>
    )
}

export default SideBar;