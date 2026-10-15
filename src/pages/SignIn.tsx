import { Alert, Button, Input } from "@heroui/react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { getInputProps } from "../utils/helpers";
import { zodResolver } from "@hookform/resolvers/zod";
import { useContext, useState } from "react";
import { authServices } from "../services/authService";
import { signInSchema } from "../schemas/signInSchema";
import type { LoginData } from "../types/loginData";
import { authContext } from "../contexts/authContext";

function getErrorMessage(error: unknown): string {
  const err = error as {
    response?: { data?: string | { message?: string } };
    message?: string;
  };
  const data = err?.response?.data;

  if (typeof data === "string" && data) return data;
  if (data && typeof data === "object" && data.message) return data.message;
  return err?.message || "Something went wrong, please try again";
}

export default function SignIn() {
  const [successMsg, setSuccessMsg] = useState("");
  const [errMsg, setErrMsg] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const { setIsLoggedIn } = useContext(authContext);

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<LoginData>({
    defaultValues: {
      email: "Noran@gmail.com",
      password: "Noran@123",
    },
    resolver: zodResolver(signInSchema),
  });

  async function signIn(values: LoginData) {
    setErrMsg("");
    setSuccessMsg("");
    setIsLoading(true);

    try {
      const data = await authServices.signIn(values);

      localStorage.setItem("token", data.data.token);
      setIsLoggedIn(true);
      setSuccessMsg(data.message);
      navigate("/");
    } catch (error: unknown) {
      setErrMsg(getErrorMessage(error));
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit(signIn)}>
      <div className="grid gap-4">
        <div className="grid gap-3 text-center">
          <h1>Welcome Back</h1>
          <p>Sign in to continue your journey</p>
        </div>

        <Input
          {...register("email")}
          {...getInputProps("email", "Email")}
          isInvalid={!!errors.email?.message}
          errorMessage={errors.email?.message as string}
        />

        <Input
          {...register("password")}
          {...getInputProps("password", "Password")}
          isInvalid={!!errors.password?.message}
          errorMessage={errors.password?.message as string}
        />

        <Button
          isLoading={isLoading}
          color="primary"
          variant="solid"
          type="submit"
        >
          Sign In
        </Button>
        <p>
          U don't have an account? <Link to={"/signup"}>Register now</Link>
        </p>
        {errMsg && (
          <Alert
            hideIcon
            color="danger"
            title={errMsg}
            variant="faded"
            classNames={{ base: "py-0 capitalize text-center" }}
          />
        )}
        {successMsg && (
          <Alert
            hideIcon
            color="success"
            title={successMsg}
            variant="faded"
            classNames={{ base: "py-0 capitalize text-center" }}
          />
        )}
      </div>
    </form>
  );
}