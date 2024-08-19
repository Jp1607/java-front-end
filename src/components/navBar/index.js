import { Nav, NavLink, NavMenu } from "./navBarElements";
 
const NavBar = () => {
    return (
        <>
            <Nav>
                <NavMenu>
                    <NavLink to="/login" activeStyle>
                        LOGIN
                    </NavLink>
                    <NavLink to="/createProds" activeStyle>
                        Contact Us
                    </NavLink>
                    <NavLink to="/editProds" activeStyle>
                        Blogs
                    </NavLink>
                    <NavLink to="/deleteProds" activeStyle>
                        Sign Up
                    </NavLink>
                </NavMenu>
            </Nav>
        </>
    );
};
export default NavBar;