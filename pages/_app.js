import "../styles/App.css";
// import "../styles/globals.css";
import Router from "next/router";
import { Toaster } from "react-hot-toast";
import { useState, React, useEffect } from "react";
import Layout from "../components/Layout";

function app({ Component, pageProps }) {
  return (
    <Layout>
      <Toaster position="top-center" reverseOrder={false} />
      <Component {...pageProps} />
    </Layout>
  );
}

export default app;


