import "bootstrap/dist/css/bootstrap.min.css";
import React, { useState, useEffect } from "react";
import Router, { useRouter } from "next/router";

import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";

function Header(props) {
  const router = useRouter();

  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
    newValue == 0
      ? controlActive("/calculator", 1)
      : newValue == 1
      ? controlActive("/banks", 2)
      : logAut();
  };

  const controlActive = (page, number) => {
    setActive(number);
    Router.push(page);
  };

  useEffect(() => {
    router.pathname === "/banks" ? setValue(1) : setValue(0);
  }, []);
  let [active, setActive] = useState(1);

  const logAut = () => {
    localStorage.removeItem("token");
    Router.push("/");
  };

  return (
    <div>
      <header className="p-3 mb-3 border-bottom">
        <Box
          sx={{ maxWidth: { xs: 320, sm: 480 }, bgcolor: "background.paper" }}
        >
          <Tabs
            value={value}
            onChange={handleChange}
            variant="scrollable"
            scrollButtons
            allowScrollButtonsMobile
            aria-label="scrollable force tabs example"
          >
            <Tab label="Hesaplama" />
            <Tab label="Banka Ekle" />
            <Tab label="Çıkış Yap" />
          </Tabs>
        </Box>
      </header>
    </div>
  );
}
export default Header;
