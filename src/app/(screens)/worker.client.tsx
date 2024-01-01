"use client";
import { useEffect, useState } from "react";
import { WorkerModal } from "../(components)/worker-modal";
import { Button } from "antd";
import { Order, User } from "@prisma/client";
import { pusherClient } from "@/lib/pusher";

type Props = {
  adms: User[];
  orders: Order[];
};

export default function WorkerScreen(props: Props) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [incomingOrders, setIncomingOrders] = useState<Notification[]>([]);

  useEffect(() => {
    pusherClient.subscribe("dashboard"); //same room Id -> route '/'

    pusherClient.bind("incoming-order", (text: Notification) => {
      setIncomingOrders((prev) => [...prev, text]);
    });

    return () => {
      pusherClient.unsubscribe("dashboard");
    };
  }, []);
  return (
    <div>
      <h1>Adm</h1>

      <h2>Pedidos:</h2>
      {JSON.stringify(props.orders)}
      {JSON.stringify(incomingOrders)}

      <Button type="primary" onClick={() => setIsModalOpen(true)}>
        Notificar estabelecimento
      </Button>
      <WorkerModal
        adms={props.adms}
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
      />
    </div>
  );
}
