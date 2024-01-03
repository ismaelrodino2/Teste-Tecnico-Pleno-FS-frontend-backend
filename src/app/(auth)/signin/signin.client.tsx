"use client";
import Link from "next/link";
import { Button, Checkbox, Form, Input, notification } from "antd";
import { useContext, useState } from "react";
import { SignInFormSchema } from "@/types/schemas";
import { AuthContext } from "@/contexts/AuthContext";
import { useRouter } from "next/navigation";

const SignInScreen = () => {
  const [loading, setLoading] = useState(false);
  const { login } = useContext(AuthContext);
  const router = useRouter();

  const onFinish = async (values: SignInFormSchema) => {
    try {
      setLoading(true);

      // Perform your login logic here
      const { email, password } = values;
      // Call the login function from the context
      await login(email, password);
      notification.success({ message: "Logado com sucesso" });
      router.push("/dashboard");
    } catch (error) {
      notification.error({ message: "Erro ao logar" });
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Form
        name="basic"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        style={{ maxWidth: 600 }}
        initialValues={{ remember: true }}
        onFinish={onFinish}
        autoComplete="off"
      >
        <Form.Item<SignInFormSchema>
          label="email"
          name="email"
          rules={[{ required: true, message: "Please input your email!" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item<SignInFormSchema>
          label="Password"
          name="password"
          rules={[{ required: true, message: "Please input your password!" }]}
        >
          <Input type="password" />
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button type="primary" htmlType="submit" loading={loading}>
            Login
          </Button>
        </Form.Item>
      </Form>
      <div className="inline-flex items-center justify-center w-full">
        <hr className="w-full h-px my-6 bg-lightGray border-0 " />
        <span className="absolute px-3 font-semibold text-sm text-mediumgGray -translate-x-1/2 bg-white left-1/2  ">
          {"auth.or"}
        </span>
      </div>

      <p className="text-center text-sm text-gray mt-2 pt-6">
        {"auth.signIn.ifYouDontHave"}
        <Link
          className="text-primaryBlue font-medium hover:underline"
          href="/signup"
        >
          {"auth.signup.signUp"}
        </Link>
      </p>
    </div>
  );
};

export default SignInScreen;
