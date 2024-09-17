// import React from "react";
// import { ReactElement } from "react";
// import { useNavigate } from "react-router-dom";
// import { useAuthContext } from "../api/context/AuthContext";

// type buttonProps = {
//     action: string;
//     children: string | JSX.Element | ReactElement
// }

// const ReturnButton: React.FC<buttonProps> = ({ action, children }): JSX.Element => {

//     const navigate = useNavigate();
//     const auth = useAuthContext();

//     const handleClick = () => {
//         if (action = 'login') {
//             localStorage.clear();
//             auth.setAuthenticated(false);
//         } else if (action = 'return') {
//             navigate(-1)
//         } else if (act   ion = 'menu') {
//             navigate("/")
//         }
//     }

//     return (


//         <button className="content-abled-button" onClick={handleClick}> {children} </button>

//     )

// }

// export default ReturnButton;
export {};