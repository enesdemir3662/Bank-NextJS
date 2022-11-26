import React, { useState, useEffect } from "react";
import ModalExample from "../components/ModalExample";
import { Button } from "reactstrap";
import { v4 as uuidv4 } from "uuid";
import BankCard from "../components/BankCard";
import axios from "axios";

function banks() {
  const [bankAddModal, setBankAddModal] = useState(false);
  const [banks, setBanks] = useState([]);
  const divRef = React.useRef();
  useEffect(() => {
    tokenControl();
  }, []);

  const tokenControl = () => {
    axios
      .get("http://localhost/api/banks", {
        headers: {
          Authorization: JSON.parse(localStorage.getItem("token")),
        },
      })
      .then((response) => {
        setBanks(response.data.data);
      })
      .catch((error) => {
        localStorage.removeItem("token");
        console.log(error);
      });
  };

  const bankAdd = () => {
    setBankAddModal(true);
  };

  return (
    <div>
      <div className="center" ref={divRef}>
        <Button onClick={() => bankAdd()}>Banka Ekle</Button>
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
