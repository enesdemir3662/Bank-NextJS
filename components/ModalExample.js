import React, {  useState, useEffect} from "react";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import toast from "react-hot-toast";
import axios from "axios";

function ModelExample({ bankAddModal, setBankAddModal,setBanks }) {

  const [textModal, setTextModal] = useState({
    bankName: "",
  });

  const toggle = () => {
    setBankAddModal(false);
    setTextModal({
      bankName: "",
    });
  };

  const getBanks = () => {
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
      });
  };

  const addBank = () => {
    axios
      .post(
        "http://localhost/api/banks",
        {
          bank_name: textModal.bankName,
        },
        {
          headers: {
            Authorization: JSON.parse(localStorage.getItem("token")),
          },
        }
      )
      .then((response) => {
        toast.success("Başarıyla kaydedildi!");
      })
      .catch((error) => {
        console.log(error);
        toast.error("Başarısız!");
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
