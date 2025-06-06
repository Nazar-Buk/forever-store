import { useEffect, useState, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
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
  const [isShowPassword, setIsShowPassword] = useState(false);

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
          const hasSpecialChar = /[@$!%*?&#№]/.test(value);

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
                  type={isShowPassword ? "text" : "password"}
                  placeholder="Password"
                  id="password"
                  {...register("password")}
                />
                <div
                  onClick={() => setIsShowPassword((prev) => !prev)}
                  className="eye-password"
                >
                  {isShowPassword ? (
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M1 12C1 12 5 4 12 4C19 4 23 12 23 12"
                        stroke="#000000"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M1 12C1 12 5 20 12 20C19 20 23 12 23 12"
                        stroke="#000000"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <circle
                        cx="12"
                        cy="12"
                        r="3"
                        stroke="#000000"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  ) : (
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M2 2L22 22"
                        stroke="#000000"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M6.71277 6.7226C3.66479 8.79527 2 12 2 12C2 12 5.63636 19 12 19C14.0503 19 15.8174 18.2734 17.2711 17.2884M11 5.05822C11.3254 5.02013 11.6588 5 12 5C18.3636 5 22 12 22 12C22 12 21.3082 13.3317 20 14.8335"
                        stroke="#000000"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M14 14.2362C13.4692 14.7112 12.7684 15.0001 12 15.0001C10.3431 15.0001 9 13.657 9 12.0001C9 11.1764 9.33193 10.4303 9.86932 9.88818"
                        stroke="#000000"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  )}
                </div>
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
            <Link to="/">Go Shopping</Link>
          </div>
        </div>
      </div>
      {/* <Newsletter /> */}
    </section>
  );
};

export default Login;
