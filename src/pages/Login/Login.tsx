import { yupResolver } from "@hookform/resolvers/yup";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";

import { loginAccount } from "src/apis/auth.api";
import Input from "src/components/Input";
import { ResponseApi } from "src/types/utils.type";
import { Schema, schema } from "src/utils/rules";
import { isAxiosUnprocessableEntityError } from "src/utils/utils";

type IFormData = Omit<Schema, "confirm_password">;

const loginSchema = schema.pick(["email", "password"]);

const Login = () => {
  const {
    register,
    setError,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormData>({
    resolver: yupResolver(loginSchema),
  });

  const loginMutation = useMutation({
    mutationFn: (body: IFormData) => {
      return loginAccount(body);
    },
  });

  const onSubmit = handleSubmit((data) => {
    loginMutation.mutate(data, {
      onSuccess(data) {
        console.log(data);
      },
      onError(error) {
        if (isAxiosUnprocessableEntityError<ResponseApi<IFormData>>(error)) {
          const formError = error.response?.data.data;
          if (formError?.email) {
            setError("email", {
              message: formError.email,
              type: "Server",
            });
          }
          if (formError?.password) {
            setError("password", {
              message: formError.password,
              type: "Server",
            });
          }
        }
      },
    });
  });

  return (
    <div className="bg-orange">
      <div className="container">
        <div className="grid grid-cols-1 lg:grid-cols-5 py-12 lg:py-32 lg:pr-10">
          <div className="lg:col-span-2 lg:col-start-4">
            <form
              className="p-10 rounded bg-white shadow-sm"
              onSubmit={onSubmit}
              noValidate
            >
              <div className="text-2xl">Đăng nhập</div>
              <Input
                name="email"
                register={register}
                type="email"
                className="mt-8"
                errorMessage={errors.email?.message}
                placeholder="Email"
              />
              <Input
                name="password"
                register={register}
                type="password"
                className="mt-2"
                errorMessage={errors.password?.message}
                placeholder="Password"
                autoComplte="on"
              />
              <div className="mt-2">
                <button className="w-full text-center py-4 px-2 uppercase bg-red-500 text-white text-sm hover:bg-red-600">
                  Đăng nhập
                </button>
              </div>
              <div className="flex items-center justify-center mt-8">
                <span className="text-gray-400">Bạn chưa có tài khoản?</span>
                <Link to="/register" className="text-red-400 ml-2">
                  Đăng ký
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
