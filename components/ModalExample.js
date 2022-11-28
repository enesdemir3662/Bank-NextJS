import React, { useState, useEffect } from "react";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import toast from "react-hot-toast";
import axios from "../config/axios";

function ModelExample({ bankAddModal, setBankAddModal, setBanks }) {
  const [textModal, setTextModal] = useState({
    bankName: "",
  });

  const toggle = () => {
    setBankAddModal(false);
    setTextModal({
      bankName: "",
    });
  };

  //get all banks and token control
  const getBanks = () => {
    axios.get("banks").then((res) => {
      setBanks(res.data.data);
    });
  };

  const addBank = () => {
    axios
      .post("banks", {
        bank_name: textModal.bankName,
      })
      .then((res) => {
        toast.success("Başarıyla kaydedildi!");
        getBanks();
      });
    toggle();
  };

  const saveModal = () => {
    if (textModal.bankName === "") {
      toast.error("Gerekli bilgileri doldurun!");
    } else {
      addBank();
    }
  };
  return (
    <div>
      <Modal isOpen={bankAddModal} toggle={toggle}>
        <ModalHeader toggle={toggle}>Banka Ekle</ModalHeader>
        <ModalBody>
          <br />
          <input
            type="text"
            placeholder="Banka Adı"
            onChange={(e) => setTextModal({ bankName: e.target.value })}
            className={"form-control"}
          />
        </ModalBody>
        <ModalFooter>
          <Button color="secondary" onClick={toggle}>
            Kapat
          </Button>
          <Button color="primary" onClick={() => saveModal()}>
            Ekle
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  );
}

export default ModelExample;
