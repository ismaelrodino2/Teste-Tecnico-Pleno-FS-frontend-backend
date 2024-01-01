"use client";
import { RegisterOrderFormSchemaSubmit } from "@/types/schemas";
import { Button, Checkbox, Form, Input, notification } from "antd";
import { useState } from "react";
import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";
import axios from "axios";
import { usePathname, useRouter } from "next/navigation";

const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 4 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 20 },
  },
};

const formItemLayoutWithOutLabel = {
  wrapperCol: {
    xs: { span: 24, offset: 0 },
    sm: { span: 20, offset: 4 },
  },
};

export default function RegisterOrders({
  params,
}: {
  params: { notificationId: string };
}) {
  const [loading, setLoading] = useState(false);

  const { notificationId } = params;

  const onFinish = async (values: RegisterOrderFormSchemaSubmit) => {
    console.log(values);
    try {
      setLoading(true);
      await axios.post("/api/order", {
        ...values,
        notificationId,
      });
      notification.success({ message: "Pedido cadastrado!" });
    } catch (error) {
      console.log(error);
      notification.error({ message: "Erro ao cadastrar pedido!" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen flex items-center justify-center">
      <div className="container mx-auto p-4 flex flex-col max-w-[500px] bg-white rounded-md shadow-md">
        <h1 className="text-2xl font-bold mb-4">Cadastre até 3 pedidos</h1>
        <Form
          name="basic"
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          style={{ maxWidth: 600 }}
          initialValues={{ remember: true }}
          onFinish={onFinish}
          autoComplete="off"
        >
          <Form.Item<RegisterOrderFormSchemaSubmit>
            label="Nome do cliente"
            name="clientName"
            rules={[{ required: true, message: "Please input name!" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item<RegisterOrderFormSchemaSubmit>
            label="Endereço"
            name="address"
            rules={[
              { required: true, message: "Por favor, preencha o andereço!" },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.List
            name="items"
            rules={[
              {
                validator: async (_, names) => {
                  if (names.length > 3) {
                    return Promise.reject(new Error("No máximo 3 itens"));
                  }
                },
              },
            ]}
          >
            {(fields, { add, remove }, { errors }) => (
              <>
                {fields.map((field, index) => (
                  <Form.Item
                    {...(index === 0
                      ? formItemLayout
                      : formItemLayoutWithOutLabel)}
                    label={index === 0 ? "Item" : ""}
                    required={false}
                    key={field.key}
                  >
                    <Form.Item
                      {...field}
                      validateTrigger={["onChange", "onBlur"]}
                      rules={[
                        {
                          required: true,
                          whitespace: true,
                          message:
                            "Please input item's name or delete this field.",
                        },
                      ]}
                      noStyle
                    >
                      <Input
                        placeholder="Nome do item"
                        style={{ width: "60%" }}
                      />
                    </Form.Item>
                    {fields.length > 1 ? (
                      <MinusCircleOutlined
                        className="dynamic-delete-button"
                        onClick={() => remove(field.name)}
                      />
                    ) : null}
                  </Form.Item>
                ))}
                <Form.Item>
                  <Button
                    type="dashed"
                    onClick={() => add()}
                    style={{ width: "60%" }}
                    icon={<PlusOutlined />}
                  >
                    Add field
                  </Button>
                  <Button
                    type="dashed"
                    onClick={() => {
                      add("The head item", 0);
                    }}
                    style={{ width: "60%", marginTop: "20px" }}
                    icon={<PlusOutlined />}
                  >
                    Add field at head
                  </Button>
                  <Form.ErrorList errors={errors} />
                </Form.Item>
              </>
            )}
          </Form.List>

          <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
            <Button type="primary" htmlType="submit" loading={loading}>
              Submit
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
}
