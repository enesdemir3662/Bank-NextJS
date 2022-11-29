import React, { useState, useEffect } from "react";
import axios from "../config/axios";
import Interests from "./Interests";

//Material UI import
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import AddIcon from "@mui/icons-material/Add";
import { height } from "@mui/system";
import { styled } from "@mui/material/styles";
import {
  Grid,
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Paper,
  Box,
  Button,
  Typography,
} from "@mui/material";
import Router, { useRouter } from "next/router";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

function BankCard({ bank, index, setBanks, refPosition }) {
  const router = useRouter();
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
    if (divRef.current !== null) {
      myFunction();
    }
  };

  const myFunction = () => {
    // console.log(
    //   open !== "",
    //   refPosition < divRef.current.offsetTop,
    //   refPosition,
    //   divRef.current.offsetTop,
    //   divRef.current.offsetTop < window.pageYOffset,
    //   divRef.current.offsetTop > window.pageYOffset
    // );
    if (open !== "" && refPosition < divRef.current.offsetTop) {
      if (divRef.current.offsetTop < window.pageYOffset) {
        setClassName_("sticky");
      } else if (divRef.current.offsetTop > window.pageYOffset) {
        setClassName_("");
      }
    }
  };
  return (
    <Accordion open={open} onClick={() => toggle(index.toString())}>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="panel1a-content"
        id="panel1a-header"
      >
        <Typography className={className_}>
          <Box
            style={{
              backgroundColor: open !== "" ? "#e9e9e9" : "white",
              height: "40px",
            }}
          >
            {bank.bank_name}
            {open !== "" ? <hr /> : ""}
          </Box>
        </Typography>
      </AccordionSummary>
      <AccordionDetails>
        <Typography>
          <div className="center" ref={divRef}>
            <Button
              color="error"
              sx={{ ml: 5, height: 40 }}
              variant="contained"
              onClick={() => deleteBank()}
            >
              sil
            </Button>
          </div>
          <Box sx={{ flexGrow: 1, height: 80, mt: 5 }}>
            <Grid container>
              <Grid item xs={3}>
                <Item sx={{ width: "90%", height: 30 }}>Tür</Item>
              </Grid>
              <Grid item xs={3}>
                <Item sx={{ width: "90%", height: 30 }}>Vade</Item>
              </Grid>
              <Grid item xs={3}>
                <Item sx={{ width: "90%", height: 30 }}>Aylık Faiz</Item>
              </Grid>
              <Grid item xs={3}>
                <Item sx={{ width: "90%", height: 30 }}>
                  <Button
                    color="secondary"
                    variant="contained"
                    onClick={() => interestsAdd()}
                  >
                    <AddIcon />
                  </Button>
                </Item>
              </Grid>
            </Grid>
          </Box>
          {interestCount.map((val, ind) => {
            return (
              <Grid container key={ind}>
                <Interests
                  val={val}
                  ind={ind}
                  bank={bank}
                  setInterestCount={setInterestCount}
                  interestCount={interestCount}
                  setBanks={setBanks}
                />
              </Grid>
            );
          })}
        </Typography>
      </AccordionDetails>
    </Accordion>
  );
}
export default BankCard;
