"use client";

import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import AuthModalInputs from "./AuthModalInputs";
import useAuth from "../hooks/useAuth";
import { AuthenticationContext } from "../context/AuthContext";
import { Alert } from "@mui/material";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  color: "black",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export default function AuthModal({ isSiginin }) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const { signin, signup } = useAuth();
  const { data, error, loading } = React.useContext(AuthenticationContext);
  const [inputs, setInputs] = React.useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    city: "",
    password: "",
  });

  const handelChangeInput = (e) => {
    setInputs({
      ...inputs,
      [e.target.name]: e.target.value,
    });
  };

  const [disabled, setDisable] = React.useState(true);

  React.useEffect(() => {
    if (isSiginin) {
      inputs.email && inputs.password ? setDisable(false) : setDisable(true);
    }
    if (!isSiginin) {
      inputs.firstName &&
      inputs.email &&
      inputs.phone &&
      inputs.city &&
      inputs.password
        ? setDisable(false)
        : setDisable(true);
    }
  }, [inputs]);

  const handelSign = async () => {
    if (isSiginin) {
      signin({ email: inputs.email, password: inputs.password }, handleClose);
      setInputs({
        email: "",
        password: "",
      });
    }
    if (!isSiginin) {
      signup(
        {
          firstName: inputs.firstName,
          lastName: inputs.lastName,
          email: inputs.email,
          phone: inputs.phone,
          city: inputs.city,
          password: inputs.password,
        },
        handleClose
      );
    }
  };

  return (
    <div>
      <Button
        onClick={handleOpen}
        className={`${
          isSiginin ? "bg-blue-300 text-white" : "text-black"
        } border p-1 px-4 rounded mr-3`}
      >
        {isSiginin ? "Sign in" : "sign up"}
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <h1 className="text-orange-500 text-center">
            Welcome {data?.name} {data?.last}
          </h1>

          {loading ? (
            <div>Loading...</div>
          ) : (
            <div className="p-2 h-[600px]">
              {error && (
                <Alert className="mb-2" severity="warning">
                  {error.response.data}
                </Alert>
              )}
              <div className="uppercase font-bold text-center pb-2 border-b">
                <p className="text-sm">
                  {isSiginin ? <p>Sign In</p> : <p>Create Account</p>}
                </p>
              </div>
              <div className="m-auto">
                <h2 className="text-2xl font-light text-center">
                  {isSiginin ? (
                    <p>Login Your Account</p>
                  ) : (
                    <p>Create Your OpenTable Account</p>
                  )}
                </h2>
                <AuthModalInputs
                  inputs={inputs}
                  handelChangeInput={handelChangeInput}
                  isSiginin={isSiginin}
                />
                <button
                  onClick={handelSign}
                  disabled={disabled}
                  className="uppercase bg-red-600 w-full text-white p-3 rounded text-sm mb-5 disabled:bg-gray-400"
                >
                  {isSiginin ? <p>Sign In</p> : <p>Create Account</p>}
                </button>
              </div>
            </div>
          )}
        </Box>
      </Modal>
    </div>
  );
}
