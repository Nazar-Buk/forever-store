import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import Title from "../components/Title";
import Newsletter from "../components/Newsletter";

const Login = () => {
  const [currentState, setCurrentState] = useState("Login"); // Sign Up  // Login

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
      .min(8, "Use 8 or more characters!")
      .required("This field is required!"),
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

  const { register, handleSubmit, control, formState } = form;
  const { errors, isDirty, isValid, isSubmitting } = formState;

  const onSubmit = (data) => {
    console.log(data, "data from login");
  };

  // назнаю и це потрібно для валідації, працює і без неї
  useEffect(() => {
    schema
      .validate({ name: "" })
      .catch((err) => console.log(err.errors, " useEffect"));
  }, [currentState]);

  return (
    <section className="login-page">
      <div className="login__container">
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
                    onClick={() => setCurrentState("Sing in")}
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
                {currentState === "Login" ? "Sign in" : "Create"}
              </button>
            </form>
          </div>
          <Newsletter />
        </div>
      </div>
    </section>
  );
};

export default Login;
