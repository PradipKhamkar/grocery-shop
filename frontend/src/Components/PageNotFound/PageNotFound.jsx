import React from "react";
import Footer from "../Footer/Footer";
import Header from "../Header/Header";
import NotFoundCart from "../NotFoundCart/NotFoundCart";

const PageNotFound = () => {
  return (
    <>
      <Header />
      <NotFoundCart msg={"404 Page Not Found"} />;
      <Footer />
    </>
  );
};

export default PageNotFound;
