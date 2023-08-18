import axios from "axios";
import { AuthenticationContext } from "@/app/context/AuthContext";
import { useContext } from "react";
import { deleteCookie } from "cookies-next";

export default function useAuth() {
  const { setAuthState } = useContext(AuthenticationContext);
  const signin = async ({ email, password }, handleClose) => {
    setAuthState({
      data: null,
      error: null,
      loading: true,
    });
    try {
      const response = await axios.post(
        "http://localhost:3000/api/auth/signin",
        {
          email,
          password,
        }
      );
      setAuthState({
        data: response.data,
        error: null,
        loading: false,
      });
      response.data && handleClose();
    } catch (error) {
      setAuthState({
        data: null,
        error: error,
        loading: false,
      });
    }
  };
  const signup = async (
    { firstName, lastName, email, phone, city, password },
    handleClose
  ) => {
    setAuthState({
      data: null,
      error: null,
      loading: true,
    });
    try {
      const response = await axios.post(
        "http://localhost:3000/api/auth/signup",
        {
          firstName,
          lastName,
          email,
          phone,
          city,
          password,
        }
      );
      setAuthState({
        data: response.data,
        error: null,
        loading: false,
      });
      response.data && handleClose();
    } catch (error) {
      setAuthState({
        data: null,
        error: error,
        loading: false,
      });
    }
  };
  const signout = async () => {
    deleteCookie("jwt");
    setAuthState({
      data: null,
      error: null,
      loading: false,
    });
  };
  return {
    signin,
    signup,
    signout,
  };
}
