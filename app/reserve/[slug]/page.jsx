import React from "react";
import Header from "./components/Header";
import Form from "./components/Form";

function Reserve() {
  return (
    <>
      {/* NAVBAR END */}
      <div className="border-t h-screen">
        <div className="py-9 w-3/5 m-auto">
          {/* HEADER */}
          <Header />
          {/* HEADER */} {/* FORM */}
          <Form />
        </div>
      </div>
    </>
  );
}

export default Reserve;
