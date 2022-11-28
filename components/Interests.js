import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import toast from "react-hot-toast";
import axios from "../config/axios";
import Form from "react-bootstrap/Form";
import Button from "@mui/material/Button";

import DeleteIcon from "@mui/icons-material/Delete";
function Interests({
  ind,
  val,
  bank,
  setInterestCount,
  interestCount,
  id,
  setBanks,
}) {
  const [textModal, setTextModal] = useState({
    interest: val.interest,
    type: val.credit_type,
    vade: val.time_option,
  });

  const [vade, setVade] = useState(
    textModal.type == 1
      ? [
          { val: "5Yıl", key: "6" },
          { val: "10Yıl", key: "7" },
        ]
      : textModal.type == 2
      ? [
          { val: "12Ay", key: "3" },
          { val: "24Ay", key: "4" },
          { val: "36Ay", key: "5" },
        ]
      : textModal.type == 3
      ? [
          { val: "3Ay", key: "1" },
          { val: "6Ay", key: "2" },
          { val: "12Ay", key: "3" },
        ]
      : []
  );

  //filtering out selected Interest
  const filterInterest = (values, value, keys) => {
    let newVade = [];
    let boolean = false;
    bank.interests = bank.interests === null ? [] : bank.interests;
    let newBanks = bank.interests.filter((x) => {
      keys.map((v) => {
        if (x.time_option == v) {
          boolean = true;
        }
      });
      return x.credit_type == value && boolean;
    });

    newVade = newBanks.length == 0 ? values : [];

    if (newBanks.length != values.length) {
      newVade = values.filter((obj) => {
        boolean = false;
        newBanks.map((x) => {
          if (x.time_option == obj.key) {
            boolean = true;
          }
        });
        return boolean !== true;
      });
    }
    setVade(newVade);

    // console.log("newBanks", newBanks, "newVade", newVade);

    setTextModal((prev) => ({
      ...prev,
      vade: "0",
    }));
  };

  //onchange type
  const typeSelected = (value) => {
    setTextModal((prev) => ({
      ...prev,
      type: value,
    }));
    if (value == "1") {
      filterInterest(
        [
          { val: "5Yıl", key: "6" },
          { val: "10Yıl", key: "7" },
        ],
        value,
        [6, 7]
      );
    } else if (value == "2") {
      filterInterest(
        [
          { val: "12Ay", key: "3" },
          { val: "24Ay", key: "4" },
          { val: "36Ay", key: "5" },
        ],
        value,
        [3, 4, 5]
      );
    } else if (value == "3") {
      filterInterest(
        [
          { val: "3Ay", key: "1" },
          { val: "6Ay", key: "2" },
          { val: "12Ay", key: "3" },
        ],
        value,
        [1, 2, 3]
      );
    }
  };

  //get all banks and token control
  const getBanks = () => {
    axios.get("banks").then((res) => {
      setBanks(res.data.data);
      toast.success("Başarılı!");
    });
  };

  const interestsSave = () => {
    if (
      textModal.interest === "" ||
      textModal.type === "" ||
      textModal.vade === "" ||
      parseInt(textModal.interest) < 0 ||
      textModal.type == "0" ||
      textModal.vade == "0"
    ) {
      toast.error("Boşlukları doldurun!");
    } else {
      if (val.id === null) {
        axios
          .post("interests", {
            bank_id: bank.id,
            interest: parseFloat(textModal.interest),
            credit_type: parseInt(textModal.type),
            time_option: parseInt(textModal.vade),
          })
          .then((res) => {
            val.id = res.data.data.id;
            getBanks();
          });
      } else {
        toast("Düzenleme Yapılamaz!", {
          icon: "✍️",
        });
      }
    }
  };

  const interestDelete = () => {
    if (val.id === null) {
      let newInterestCount = interestCount.filter((value) => {
        return val !== value;
      });
      setInterestCount(newInterestCount);
      toast.success("Başarılı!");
    } else {
      console.log({
        id: val.id,
        bank_id: val.bank_id,
      });
      axios
        .delete("interests", {
          data: {
            id: val.id,
            bank_id: val.bank_id,
          },
        })
        .then((res) => {
          getBanks();
        });
    }
  };
  return (
    <tr>
      <th scope="row">{ind + 1}</th>
      <td>
        <Form.Select
          aria-label="Default select example"
          onChange={(e) => typeSelected(e.target.value)}
          defaultValue={textModal.type}
        >
          <option value="0">Tür Seçin</option>
          <option value="2">Tuketici Kredisi</option>
          <option value="1">Konut Kredisi</option>
          <option value="3">Mevduat Kredisi</option>
        </Form.Select>
      </td>
      <td>
        <Form.Select
          aria-label="Default select example"
          onChange={(e) => {
            setTextModal((prev) => ({
              ...prev,
              vade: e.target.value,
            }));
          }}
          value={textModal.vade}
        >
          <option value="0">Vade Seçin</option>
          {vade.map((value) => {
            return (
              <option value={value.key} key={uuidv4()}>
                {value.val}
              </option>
            );
          })}
        </Form.Select>
      </td>
      <td>
        <input
          type="number"
          defaultValue={parseFloat(textModal.interest)}
          placeholder="Faiz Oranı"
          onChange={(e) =>
            setTextModal((prev) => ({
              ...prev,
              interest: e.target.value,
            }))
          }
          className={"form-control"}
        />
      </td>
      <td>
        <div className="d-flex">
          <Button
            color="success"
            variant="contained"
            onClick={() => interestsSave()}
          >
            Kaydet
          </Button>
          <Button
            color="error"
            className="ms-2"
            variant="contained"
            onClick={() => interestDelete()}
          >
            <DeleteIcon />
          </Button>
        </div>
      </td>
    </tr>
  );
}
export default Interests;
