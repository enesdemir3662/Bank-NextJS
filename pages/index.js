import Router from "next/router";
import { useState, React, useEffect } from "react";
import axios from "axios";
import { useForm, Controller } from "react-hook-form";
import { Button, TextField } from "@mui/material";
import { toast } from "react-hot-toast";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

const schema = yup.object().shape({
  username: yup
    .string("Geçersiz Değer Girdin")
    .required("Lütfen zorunlu alanları doldurunuz"),
  password: yup
    .string("Geçersiz Değer Girdin")
    .required("Lütfen zorunlu alanları doldurunuz"),
});

export default function index() {
  useEffect(() => {
    if (typeof window !== "undefined") {
      const token = localStorage.getItem("token");

      if (!token) {
        return;
      } else {
        Router.push("/banks");
      }
    }
  }, []);

  const [defaultValues, setDefaultValues] = useState({
    username: "enes.demir",
    password: "gTyj5S37Jk@",
  });

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues,
  });

  const onSubmit = (data) => {
    axios
      .post("http://localhost/api/login", {
        username: data.username,
        password: data.password,
      })
      .then((response) => {
        if (response.data.status !== "error") {
          localStorage.setItem("token", JSON.stringify(response.data.data));
          Router.push("/banks");
        }
      })
      .catch((error) => {
        console.log(error);
        toast.error("Başarısız!");
      });
  };

  return (
    <div className="container container-2">
      <div
        className="magic-form"
        style={{ display: "flex", alignItems: "center" }}
      >
        <br />
        <br />
        <form className="magic-form" onSubmit={handleSubmit(onSubmit)}>
          <Controller
            name="username"
            control={control}
            render={({ field: { onChange, value, ref } }) => (
              <TextField
                label="Kullanıcı adı"
                id="outlined-size-small"
                value={value}
                size="small"
                type="text"
                onChange={onChange}
              />
            )}
          />
          {errors.username && (
            <div className="input-feedback">
              <p>{errors.username.message}</p>
            </div>
          )}
          <br />
          <Controller
            name="password"
            control={control}
            render={({ field: { onChange, value, ref } }) => (
              <TextField
                label="Şifre"
                id="outlined-size-small"
                value={value}
                size="small"
                type="password"
                onChange={onChange}
              />
            )}
          />
          {errors.password && (
            <div className="input-feedback">
              <p>{errors.password.message}</p>
            </div>
          )}
          <br />
          <Button
            type="submit"
            className="button"
            variant="contained"
            style={{
              backgroundColor: "#185a9d",
              boxShadow: "0px 2px 2px rgba(0, 0, 0, 0.15)",
            }}
          >
            Gönder
          </Button>
        </form>
      </div>
    </div>
  );
}
