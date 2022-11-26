import React, { useState, useContext, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import toast from "react-hot-toast";
import axios from "../config/axios";
import {
  Button,
  Table,
  Accordion,
  AccordionBody,
  AccordionHeader,
  AccordionItem,
} from "reactstrap";
import Interests from "./Interests";
import AddIcon from "@mui/icons-material/Add";
function BankCard({ bank, index, setBanks, refPosition }) {
  const divRef = React.useRef();

  const [className_, setClassName_] = useState("");

  const [interestCount, setInterestCount] = useState(
    bank.interests === null ? [] : bank.interests
  );

  useEffect(() => {
    setInterestCount(bank.interests === null ? [] : bank.interests);
  }, [bank]);

  const [open, setOpen] = useState("");

  const toggle = (id) => {
    if (open === id) {
      setOpen("");
      setClassName_("");
    } else {
      setOpen(id);
    }
  };

  //get all banks and token control
  const getBanks = () => {
    axios.get("banks").then((res) => {
      setBanks(response.data.data);
    });
  };
  const deleteBank = () => {
    axios
      .delete("banks", {
        data: {
          id: bank.id,
        },
      })
      .then((res) => {
        getBanks();
      });
  };

  const interestsAdd = () => {
    setInterestCount((pref) => [
      ...pref,
      {
        id: null,
        bank_id: bank.bank_id,
        interest: "",
        time_option: 0,
        credit_type: 0,
      },
    ]);
  };
  window.onscroll = function () {
    myFunction();
  };

  const myFunction = () => {
    if (open === index.toString() && refPosition < divRef.current.offsetTop) {
      if (divRef.current.offsetTop < window.pageYOffset) {
        setClassName_("sticky");
      } else if (divRef.current.offsetTop > window.pageYOffset) {
        setClassName_("");
      }
    }
  };
  return (
    <Accordion flush open={open} toggle={toggle}>
      <AccordionItem>
        <AccordionHeader targetId={index.toString()} className={className_}>
          {bank.bank_name}
        </AccordionHeader>
        <AccordionBody accordionId={index.toString()}>
          <div className="d-flex justify-content-center" ref={divRef}>
            <p>proxolab Bank</p>
            <Button
              color="danger"
              className="ms-5"
              onClick={() => deleteBank()}
            >
              sil
            </Button>
          </div>
          <Table hover>
            <div></div>
            <thead>
              <tr>
                <th>#</th>
                <th>Tür</th>
                <th>Vade</th>
                <th>Aylık Faiz</th>
                <th>
                  <Button color="secondary" onClick={() => interestsAdd()}>
                    <AddIcon />
                  </Button>
                </th>
              </tr>
            </thead>
            <tbody>
              {interestCount.map((val, ind) => {
                return (
                  <Interests
                    val={val}
                    ind={ind}
                    bank={bank}
                    key={ind}
                    setInterestCount={setInterestCount}
                    interestCount={interestCount}
                    setBanks={setBanks}
                  />
                );
              })}
            </tbody>
            <div></div>
          </Table>
        </AccordionBody>
      </AccordionItem>
    </Accordion>
  );
}
export default BankCard;
