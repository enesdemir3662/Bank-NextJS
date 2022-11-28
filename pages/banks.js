import React, { useState, useEffect } from "react";
import ModalExample from "../components/ModalExample";
import Button from "@mui/material/Button";
import BankCard from "../components/BankCard";
import axios from "../config/axios";

function banks() {
  const [bankAddModal, setBankAddModal] = useState(false);
  const [banks, setBanks] = useState([]);
  const divRef = React.useRef();
  useEffect(() => {
    getBanks();
  }, []);

  //get all banks and token control
  const getBanks = () => {
    axios.get("banks").then((res) => {
      setBanks(res.data.data);
    });
  };

  const bankAdd = () => {
    setBankAddModal(true);
  };

  return (
    <div>
      <div className="center" ref={divRef}>
        <Button onClick={() => bankAdd()} variant="contained">
          Banka Ekle
        </Button>
      </div>
      {bankAddModal && (
        <ModalExample
          setBankAddModal={setBankAddModal}
          bankAddModal={bankAddModal}
          setBanks={setBanks}
        />
      )}
      <br />
      {banks.map((bank, index) => {
        return (
          <BankCard
            bank={bank}
            index={index}
            key={index}
            setBanks={setBanks}
            refPosition={divRef.current.offsetTop}
          />
        );
      })}

      {banks.length === 0 ? (
        <div className="center">
          <p style={{ color: "red" }}>Hiç banka bulunamadı</p>
        </div>
      ) : (
        ""
      )}
    </div>
  );
}
export default banks;
