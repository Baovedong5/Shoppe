import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useMutation } from "@tanstack/react-query";
import { omit } from "lodash";

import Input from "src/components/Input";
import { Schema, schema } from "src/utils/rules";
import { registerAccount } from "src/apis/auth.api";
import { isAxiosUnprocessableEntityError } from "src/utils/utils";
import { ResponseApi } from "src/types/utils.type";

type IFormData = Schema;

const Register = () => {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<IFormData>({
    resolver: yupResolver(schema),
  });

  const registerMutation = useMutation({
    mutationFn: (body: Omit<IFormData, "confirm_password">) => {
      return registerAccount(body);
    },
  });

  const onSubmit = handleSubmit((data) => {
    const body = omit(data, ["confirm_password"]);

    registerMutation.mutate(body, {
      onSuccess(data) {
        console.log(data);
      },
      onError(error) {
        if (
          isAxiosUnprocessableEntityError<
            ResponseApi<Omit<IFormData, "confirm_password">>
          >(error)
        ) {
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
              <div className="text-2xl">Đăng ký</div>
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
              <Input
                name="confirm_password"
                register={register}
                type="password"
                className="mt-2"
                errorMessage={errors.confirm_password?.message}
                placeholder="Confirm Password"
                autoComplte="on"
              />
              <div className="mt-2">
                <button className="w-full text-center py-4 px-2 uppercase bg-red-500 text-white text-sm hover:bg-red-600">
                  Đăng ký
                </button>
              </div>
              <div className="flex items-center justify-center mt-8">
                <span className="text-gray-400">Bạn đã có tài khoản?</span>
                <Link to="/login" className="text-red-400 ml-2">
                  Đăng nhập
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
