import "bootstrap/dist/css/bootstrap.min.css";
import React, { useState, useEffect } from "react";
import { Nav, NavItem, NavLink } from "reactstrap";
import Router, { useRouter } from "next/router";

function Header() {
  const router = useRouter();

  const controlActive = (page, number) => {
    setActive(number);
    Router.push(page);
  };

  useEffect(() => {
    router.pathname === "/banks" ? setActive(2) : setActive(1);
  }, []);
  let [active, setActive] = useState(1);

  const logAut = () => {
    localStorage.removeItem("token");
  };

  return (
    <div>
      <header className="p-3 mb-3 border-bottom">
        <Nav tabs>
          <NavItem>
            <NavLink
              href="#"
              active={active == 1 ? true : false}
              onClick={() => controlActive("/calculator", 1)}
            >
              Hesaplama
            </NavLink>
          </NavItem>

          <NavItem>
            <NavLink
              href="#"
              active={active == 2 ? true : false}
              onClick={() => controlActive("/banks", 2)}
            >
              Banka Ekle
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink href="#" onClick={() => logAut()}>
              Log out
            </NavLink>
          </NavItem>
        </Nav>
      </header>
    </div>
  );
}
export default Header;
