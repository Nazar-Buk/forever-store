import { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import axios from "axios";
import { toast } from "react-toastify";

import Title from "../components/Title";
import Loader from "../components/Loader";
import { ShopContext } from "../context/ShopContext";

const Login = () => {
  const navigate = useNavigate();
  const [currentState, setCurrentState] = useState("Login"); // Sign Up  // Login
  const { backendUrl, isLoading, setIsLoading } = useContext(ShopContext);

  const schema = yup.object({
    name: yup
      .string()
      // не можна тут писати інші валідації бо почне кусатися із .test()
      .test("name", "This field is required!", (value) => {
        // завжди має повертаи true або false !!!!!!
        if (currentState === "Login") {
          // якщо це логін то валідація не потрібна
          return true; // коли true то все ок, валідація успішна, коли false то валідація не пройшла і буде помилка
        }

        if (!value || value.trim() === "" || value.length < 3) {
          return false;
        }

        return true;
      }),
    email: yup
      .string()
      // .email("Email format is incorrect!") до сраки така валідація
      .required("This field is required!")
      .matches(
        /[a-z0-9\._%+!$&*=^|~#%'`?{}/\-]+@([a-z0-9\-]+\.){1,}([a-z]{2,16})/,
        "Email format is incorrect!"
      ),
    password: yup
      .string()
      .required("This field is required!")
      .min(8, "Use 8 or more characters!")
      .test(
        "password-strength",
        "Password must include uppercase, lowercase, number and special character",
        (value) => {
          // Перевіряє, чи є хоча б одна велика літера (A–Z)
          const hasUpperCase = /[A-Z]/.test(value);

          // Перевіряє, чи є хоча б одна мала літера (a–z)
          const hasLowerCase = /[a-z]/.test(value);

          // Перевіряє, чи є хоча б одна цифра (0–9)
          const hasNumber = /[0-9]/.test(value);

          // Перевіряє, чи є хоча б один спеціальний символ із вказаного набору
          // додай решітку
          const hasSpecialChar = /[@$!%*?&]/.test(value);

          // Повертає true тільки якщо всі умови вище виконані
          return hasUpperCase && hasLowerCase && hasNumber && hasSpecialChar;
        }
      ),
  });

  const form = useForm({
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
    resolver: yupResolver(schema),
    mode: "onChange",
  });

  const { register, handleSubmit, control, formState, reset } = form;
  const { errors, isDirty, isValid, isSubmitting } = formState;

  const onSubmit = async (data) => {
    console.log(data, "data from login");

    try {
      setIsLoading(true);

      const response = await axios.post(
        backendUrl +
          `/api/user/${currentState === "Login" ? "login" : "register"}`,
        {
          name: data.name,
          email: data.email,
          password: data.password,
        },
        {
          withCredentials: true, // важливо для роботи з cookie
        }
      );

      if (response.data.success) {
        console.log(response, "response SUCCESS");
        setIsLoading(false);
        toast.success("Successful registration!");
        reset();
        navigate("/");
      } else {
        console.log(response, "response FAILED");
        setIsLoading(false);
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error, "error");
      setIsLoading(false);
      toast.error(error?.response?.data?.message);
    }
  };

  return (
    <section className="login-page">
      <div className="login__container">
        {isLoading && <Loader />}
        <div className="login__body">
          <Title text1="" text2={currentState} />
          <div className="form-box">
            <form onSubmit={handleSubmit(onSubmit)} noValidate>
              {currentState === "Login" ? (
                ""
              ) : (
                <div className="wrap-input">
                  <input
                    className="login__input"
                    type="text"
                    placeholder="Name"
                    id="name"
                    {...register("name")}
                  />
                  <p className="error">{errors.name?.message}</p>
                </div>
              )}

              <div className="wrap-input">
                <input
                  className="login__input"
                  type="email"
                  placeholder="Email"
                  id="email"
                  {...register("email")}
                />
                <p className="error">{errors.email?.message}</p>
              </div>
              <div className="wrap-input">
                <input
                  className="login__input"
                  type="password"
                  placeholder="Password"
                  id="password"
                  {...register("password")}
                />
                <p className="error">{errors.password?.message}</p>
              </div>
              {currentState === "Login" ? (
                <div className="settings-box">
                  <p className="settings__text">Forgot your password?</p>
                  <p
                    onClick={() => setCurrentState("Sing Up")}
                    className="settings__text"
                  >
                    Create account
                  </p>
                </div>
              ) : (
                <div className="settings-box">
                  <p
                    onClick={() => setCurrentState("Login")}
                    className="settings__text"
                    style={{ marginLeft: "auto" }}
                  >
                    Login
                  </p>
                </div>
              )}
              <button type="submit">
                {currentState === "Login" ? "Sign Up" : "Create"}
              </button>
            </form>
          </div>
        </div>
      </div>
      {/* <Newsletter /> */}
    </section>
  );
};

export default Login;
