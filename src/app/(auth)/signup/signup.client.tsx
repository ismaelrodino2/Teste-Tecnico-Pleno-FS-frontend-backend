"use client";
import Link from "next/link";

import { Button, Form, Input, Select, notification } from "antd";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { SignUpFormSchemaSubmit } from "@/types/schemas";
import { supabase } from "@/lib/supabase";
const { Option } = Select;

export function SignUpScreen() {
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const onFinish = async (values: SignUpFormSchemaSubmit) => {
    const { email, password } = values;
    try {
      setLoading(true);
      const { data } = await supabase.auth.signUp({ email, password });

      await fetch("/api/user", {
        method: "POST",
        headers: {
          "Content-Type": "application-json",
        },
        body: JSON.stringify({
          id: data.user?.id,
          email: values.email,
          accountType: values.accountType,
        }),
      });
      notification.success({ message: "Cadastrado com sucesso" });

      router.push("/signin");
    } catch (err) {
      notification.error({
        message: "Falha ao registrar",
      });
      console.error(err);
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
        <Form.Item<SignUpFormSchemaSubmit>
          label="Email"
          name="email"
          rules={[{ required: true, message: "Please input your email!" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item<SignUpFormSchemaSubmit>
          label="Password"
          name="password"
          rules={[{ required: true, message: "Please input your password!" }]}
        >
          <Input type="password" />
        </Form.Item>

        <Form.Item<SignUpFormSchemaSubmit>
          label="Confirm"
          name="confirmPassword"
          rules={[{ required: true, message: "Please input your password!" }]}
        >
          <Input type="password" />
        </Form.Item>

        <Form.Item<SignUpFormSchemaSubmit>
          name="accountType"
          label="role"
          rules={[
            { required: true, message: "Por favor selecione o tipo da conta!" },
          ]}
        >
          <Select placeholder="select your role">
            <Option value="adm">Admnistrador</Option>
            <Option value="worker">Trabalhador</Option>
          </Select>
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button type="primary" htmlType="submit" loading={loading}>
            Submit
          </Button>
        </Form.Item>
      </Form>
      <div className="inline-flex items-center justify-center w-full">
        <hr className="w-full h-px my-6 bg-lightGray border-0 " />
        <span className="absolute px-3 font-semibold text-sm text-mediumgGray -translate-x-1/2 bg-white left-1/2  ">
          ou
        </span>
      </div>

      <p className="text-center text-sm text-gray-600 mt-8">
        Já possui uma conta?
        <Link
          className="text-lightBlue hover:underline font-medium pl-1"
          href="/signin"
        >
          Faça login agora
        </Link>
      </p>
    </div>
  );
}
