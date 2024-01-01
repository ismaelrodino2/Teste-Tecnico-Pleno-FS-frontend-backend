import { Button, Form, Modal, Select, notification } from "antd";
import { NotificationFormSchema } from "@/types/schemas";
import { useState } from "react";
import axios from "axios";
import { useGetSessionClientSide } from "@/contexts/AuthContext";
import { User } from "@prisma/client";

const { Option } = Select;

type Props = {
  setIsModalOpen: (value: boolean) => void;
  isModalOpen: boolean;
  adms: User[];
};

export function WorkerModal(props: Props) {
  const [loading, setLoading] = useState(false);

  console.log("adas", props.adms);

  const session = useGetSessionClientSide();
  async function onFinish(values: NotificationFormSchema) {
    try {
      const aa = await axios.post("/api/notification", {
        workerId: session?.id,
        admId: values.admId,
      });
      console.log('123123', aa)
      setLoading(true);
      notification.error({ message: "Estabelecimento notificado" });
    } catch (err) {
      console.error(err);
      notification.error({ message: "Erro ao notificar o estabelecimento" });
    } finally {
      setLoading(false);
    }
  }

  const showModal = () => {
    props.setIsModalOpen(true);
  };

  const handleOk = () => {
    props.setIsModalOpen(false);
  };

  const handleCancel = () => {
    props.setIsModalOpen(false);
  };
  return (
    <>
      <Modal
        title="Basic Modal"
        open={props.isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Form
          name="basic"
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          style={{ maxWidth: 600 }}
          initialValues={{ remember: true }}
          onFinish={onFinish}
          autoComplete="off"
        >
          <Form.Item<NotificationFormSchema>
            name="admId"
            label="Estabelecimento"
            rules={[
              {
                required: true,
                message: "Por favor selecione o estabelecimento!",
              },
            ]}
          >
            <Select placeholder="Selecione o estabelecimento">
              {props.adms.map((adms) => {
                return (
                  <Option key={adms.id} value={adms.id}>
                    {adms.email}
                  </Option>
                );
              })}
            </Select>
          </Form.Item>

          <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
            <Button type="primary" htmlType="submit" loading={loading}>
              Notificar chegada
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
}
