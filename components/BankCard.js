import React, { useState, useEffect } from "react";
import axios from "../config/axios";
import Interests from "./Interests";

//Material UI import
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Button from "@mui/material/Button";
import Table from "@mui/material/Table";
import AddIcon from "@mui/icons-material/Add";
import { height } from "@mui/system";

function BankCard({ bank, index, setBanks, refPosition }) {
  const divRef = React.useRef();
  const divRef2 = React.useRef();

  const [className_, setClassName_] = useState("");

  const [interestCount, setInterestCount] = useState(
    bank.interests === null ? [] : bank.interests
  );

  useEffect(() => {
    setInterestCount(bank.interests === null ? [] : bank.interests);
  }, [bank]);

  const [open, setOpen] = useState("");

  const toggle = (id) => {
    console.log(open, id);
    if (open === id) {
      setOpen("");
      setClassName_("");
    } else {
      setOpen(id);
    }
    console.log(open, id);
  };

  //get all banks and token control
  const getBanks = () => {
    axios.get("banks").then((res) => {
      setBanks(res.data.data);
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
    console.log(
      open !== "",
      refPosition > divRef.current.offsetTop,
      refPosition,
      divRef.current.offsetTop,
      divRef.current.offsetTop < window.pageYOffset,
      divRef.current.offsetTop > window.pageYOffset
    );
    if (open !== "" && refPosition > divRef.current.offsetTop) {
      if (divRef.current.offsetTop < window.pageYOffset) {
        setClassName_("sticky");
        console.log("oldu");
      } else if (divRef.current.offsetTop > window.pageYOffset) {
        setClassName_("");
        console.log("kapandı");
      }
    }
  };
  return (
    <Accordion flush open={open} onClick={() => toggle(index.toString())}>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="panel1a-content"
        id="panel1a-header"
      >
        <Typography className={className_}>
          <div
            style={{
              backgroundColor: open !== "" ? "#e9e9e9" : "white",
              height: "40px",
            }}
          >
            {bank.bank_name}
            {open !== "" ? <hr /> : ""}
          </div>
        </Typography>
      </AccordionSummary>
      <AccordionDetails>
        <Typography>
          <div className="d-flex justify-content-center" ref={divRef}>
            <p>proxolab Bank</p>
            <Button
              color="error"
              className="ms-5"
              variant="contained"
              onClick={() => deleteBank()}
            >
              sil
            </Button>
          </div>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <div></div>
            <thead>
              <tr>
                <th>#</th>
                <th>Tür</th>
                <th>Vade</th>
                <th>Aylık Faiz</th>
                <th>
                  <Button
                    color="secondary"
                    variant="contained"
                    onClick={() => interestsAdd()}
                  >
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
        </Typography>
      </AccordionDetails>
    </Accordion>
  );
}
export default BankCard;
