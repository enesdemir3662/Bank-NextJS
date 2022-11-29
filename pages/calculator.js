import React, { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import axios from "../config/axios";
import CalculatorCard from "../components/CalculatorCard";
import toast from "react-hot-toast";
//Material UI import
import {
  Box,
  Tabs,
  Tab,
  InputLabel,
  MenuItem,
  FormControl,
  Select,
  Button,
  Table,
  TextField,
  Grid,
  Paper,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import Router, { useRouter } from "next/router";
const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

function LinkTab(props) {
  return (
    <Tab
      component="a"
      onClick={(event) => {
        event.preventDefault();
      }}
      {...props}
    />
  );
}

function Calculation() {
  const router = useRouter();
  const [valueNavbar, setValueNavbar] = React.useState(0);
  const [search, setSearch] = useState([]);
  const [banks, setBanks] = useState([]);
  const [textModal, setTextModal] = useState({
    type: "",
    vade: "",
    money: "",
  });
  useEffect(() => {
    getBanks();
  }, []);
  const [vade, setVade] = useState(
    textModal.type === 1
      ? [
          { val: "5Yıl", key: "6" },
          { val: "10Yıl", key: "7" },
        ]
      : [
          { val: "24Ay", key: "4" },
          { val: "36Ay", key: "5" },
        ]
  );

  //get all banks and token control
  const getBanks = () => {
    axios.get("banks").then((res) => {
      setBanks(res.data.data);
    });
  };

  //nav tab onchange
  const handleChange = (event, newValue) => {
    if (newValue === 0) {
      setVade(
        textModal.type === 1
          ? [
              { val: "5Yıl", key: "6" },
              { val: "10Yıl", key: "7" },
            ]
          : [
              { val: "24Ay", key: "4" },
              { val: "36Ay", key: "5" },
            ]
      );
    } else {
      setVade([
        { val: "3Ay", key: "1" },
        { val: "6Ay", key: "2" },
        { val: "12Ay", key: "3" },
      ]);
    }
    setTextModal({
      type: "",
      vade: "",
      money: "",
    });
    setSearch([]);
    setValueNavbar(newValue);
  };

  //onchange type select
  const typeSelected = (val) => {
    setTextModal((prev) => ({
      ...prev,
      type: val,
    }));
    if (val == "1") {
      setVade([
        { val: "5Yıl", key: "6" },
        { val: "10Yıl", key: "7" },
      ]);
    } else {
      setVade([
        { val: "24Ay", key: "4" },
        { val: "36Ay", key: "5" },
      ]);
    }
  };

  const searchButtonClick = () => {
    if (valueNavbar === 0) {
      if (
        textModal.type === "" ||
        textModal.vade === "" ||
        textModal.money === ""
      ) {
        toast.error("Boşlukları doldurun!");
      } else {
        let newBanks = [];
        let allNewBanks = [];
        banks.map((val) => {
          newBanks = val.interests.filter((obj) => {
            return (
              obj.time_option === parseInt(textModal.vade) &&
              obj.credit_type === parseInt(textModal.type)
            );
          });
          allNewBanks = [...allNewBanks, ...newBanks];
        });
        setSearch(allNewBanks);
      }
    } else {
      if (textModal.vade === "" || textModal.money === "") {
        toast.error("Boşlukları doldurun!");
      } else {
        let newBanks = [];
        let allNewBanks = [];
        banks.map((val) => {
          newBanks = val.interests.filter((obj) => {
            return obj.time_option === parseInt(textModal.vade);
          });
          allNewBanks = [...allNewBanks, ...newBanks];
        });
        setSearch(allNewBanks);
      }
    }
  };

  return (
    <div>
      <Box sx={{ width: "100%" }}>
        <Tabs
          value={valueNavbar}
          onChange={handleChange}
          aria-label="nav tabs example"
        >
          <LinkTab label="Kredi Faizi" />
          <LinkTab label="Mevduat Faizi" />
        </Tabs>
        <div className="center">
          {valueNavbar === 0 ? (
            <p>Uygun Kredi Faizi Bul</p>
          ) : (
            <p>Mevduat Faizi Bul</p>
          )}
        </div>
      </Box>
      <br />
      <Grid container spacing={2}>
        <Grid item xs={3}>
          <Item style={{ height: 55 }}>
            {valueNavbar === 0 ? (
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">
                  Kredi Türü
                </InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  onChange={(e) => typeSelected(e.target.value)}
                  value={textModal.type}
                >
                  <MenuItem value={1}>Konut</MenuItem>
                  <MenuItem value={2}>Tüketici</MenuItem>
                </Select>
              </FormControl>
            ) : (
              ""
            )}
          </Item>
        </Grid>
        <Grid item xs={3}>
          <Item style={{ height: 55 }}>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Vade</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                onChange={(e) =>
                  setTextModal((prev) => ({
                    ...prev,
                    vade: e.target.value,
                  }))
                }
                value={textModal.vade}
              >
                {vade.map((value) => {
                  return (
                    <MenuItem value={value.key} key={uuidv4()}>
                      {value.val}
                    </MenuItem>
                  );
                })}
              </Select>
            </FormControl>
          </Item>
        </Grid>
        <Grid item xs={3}>
          <Item style={{ height: 55 }}>
            <TextField
              label={valueNavbar === 0 ? "Kredi Miktarı" : "Yatırılacak Para"}
              id="outlined-size-small"
              size="small"
              onChange={(e) =>
                setTextModal((prev) => ({
                  ...prev,
                  money: e.target.value,
                }))
              }
              value={textModal.money}
              type={"number"}
            />
          </Item>
        </Grid>
        <Grid item xs={3}>
          <Item style={{ height: 55 }}>
            <Button
              color="success"
              variant="contained"
              onClick={searchButtonClick}
            >
              {" "}
              Bul{" "}
            </Button>
          </Item>
        </Grid>
      </Grid>
      {search.map((bank, index) => {
        return (
          <CalculatorCard
            bank={bank}
            index={index}
            valueNavbar={valueNavbar}
            key={uuidv4()}
            money={parseFloat(textModal.money)}
            banks={banks}
            setBanks={setBanks}
          />
        );
      })}
    </div>
  );
}
export default Calculation;
