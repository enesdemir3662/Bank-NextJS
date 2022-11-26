import React, { useState, useContext, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import toast from "react-hot-toast";
import axios from "axios";

import {
  Button,
  Table,
  Accordion,
  AccordionBody,
  AccordionHeader,
  AccordionItem,
} from "reactstrap";

function BankCard({ bank, index, valueNavbar, money, banks, setBanks }) {
  let [bankName, setBankName] = useState([]);
  useEffect(() => {
    let a = banks.filter((element) => {
      return element.id === bank.bank_id;
    });
    setBankName(a[0].bank_name);
  }, []);

  const [open, setOpen] = useState("");
  const toggle = (id) => {
    if (open === id) {
      setOpen("");
    } else {
      setOpen(id);
    }
  };
  //get all banks and token control
  const getBanks = () => {
    axios
      .get("http://localhost/api/banks", {
        headers: {
          Authorization: token,
        },
      })
      .then((response) => {
        setBanks(response.data.data);
      })
      .catch((error) => {
        localStorage.removeItem("token");
      });
  };

  return (
    <div>
      <Accordion flush open={open} toggle={toggle} key={uuidv4()}>
        <AccordionItem>
          <AccordionHeader targetId={index.toString()}>
            <div
              style={{ position: "relative", zIndex: 3, marginTop: "-30PX" }}
            >
              {bankName}
              {valueNavbar === 0 ? (
                <p className="mt-2">
                  Toplam Geri Ödeme :
                  {(
                    ((money * bank.interest) / 100) *
                      (bank.time_option == 6
                        ? 60
                        : bank.time_option == 7
                        ? 120
                        : bank.time_option == 4
                        ? 24
                        : 36) +
                    money
                  ).toFixed(2)}
                  TL
                </p>
              ) : (
                <p className="mt-2">Aylık Faiz Oranı %{bank.interest}</p>
              )}
            </div>
            <div
              className="center mt-5"
              style={{ position: "relative", zIndex: 2 }}
            >
              <p style={{ color: "blue" }}>Detaylı Bilgi İçin Tıklayınız</p>
            </div>
          </AccordionHeader>
          <AccordionBody accordionId={index.toString()}>
            {valueNavbar === 0 ? (
              <div>
                <div className="d-flex center">
                  {bankName}
                  <p className="ms-5">
                    Toplam Geri Ödeme :
                    {(
                      ((money * bank.interest) / 100) *
                        (bank.time_option == 6
                          ? 60
                          : bank.time_option == 7
                          ? 120
                          : bank.time_option == 4
                          ? 24
                          : 36) +
                      money
                    ).toFixed(2)}
                    TL
                  </p>
                </div>
                <p className="center">Hesaba Yatırılacak Tutar : {money}TL</p>
                <p className="center">
                  {bank.credit_type == 2
                    ? "Tüketici Kredisi "
                    : "Konut Kredisi "}
                  -
                  {bank.time_option == 6
                    ? "5 Yıl "
                    : bank.time_option == 7
                    ? "10 Yıl "
                    : bank.time_option == 4
                    ? "24 Ay  "
                    : "36 Ay "}
                  vade - aylık faiz %{bank.interest}
                </p>
                <p className="center">
                  Aylık ödeme {((money * bank.interest) / 100).toFixed(2)}
                  TL
                </p>
              </div>
            ) : (
              <div>
                <div className="d-flex center">
                  {bankName}
                  <p className="ms-5">Aylık Faiz Oranı %{bank.interest}</p>
                </div>
                <p className="center">Mevduat tutarı {money}TL</p>
                <p className="center">
                  {bank.time_option == 1 ? 3 : bank.time_option == 2 ? 5 : 12}{" "}
                  ay vade sonunda alınacak faiz :{" "}
                  {money *
                    (bank.interest / 100) *
                    (bank.time_option == 1
                      ? 3
                      : bank.time_option == 2
                      ? 5
                      : 12)}
                  TL
                </p>
                <p className="center">
                  {bank.time_option == 1 ? 3 : bank.time_option == 2 ? 5 : 12}{" "}
                  ay vade sonunda toplam mevduat :{" "}
                  {money *
                    (bank.interest / 100) *
                    (bank.time_option == 1
                      ? 3
                      : bank.time_option == 2
                      ? 5
                      : 12) +
                    money}
                  TL
                </p>
              </div>
            )}
          </AccordionBody>
        </AccordionItem>
      </Accordion>
    </div>
  );
}
export default BankCard;
