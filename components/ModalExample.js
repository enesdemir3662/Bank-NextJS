import React, { useState, useEffect } from "react";
import toast from "react-hot-toast";
import axios from "../config/axios";
import { TextField, Button, Modal, Stack, Box } from "@mui/material";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

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
      <Modal
        open={bankAddModal}
        toggle={toggle}
        aria-labelledby="parent-modal-title"
        aria-describedby="parent-modal-description"
      >
        <Box sx={{ ...style, width: 500 }}>
          <h2 id="parent-modal-title">Banka Ekle</h2>
          <br />
          <TextField
            label="Banka Adı"
            id="outlined-size-small"
            size="small"
            type="text"
            onChange={(e) => setTextModal({ bankName: e.target.value })}
          />
          <Stack spacing={2} direction="row" sx={{ mt: 5 }}>
            <Button color="secondary" onClick={toggle} variant="contained">
              Kapat
            </Button>
            <Button
              color="primary"
              onClick={() => saveModal()}
              variant="contained"
            >
              Ekle
            </Button>
          </Stack>
        </Box>
      </Modal>
    </div>
  );
}

export default ModelExample;
