"use client";
import { useEffect, useState } from "react";
import { WorkerModal } from "../(components)/worker-modal";
import { Button } from "antd";
import { Order, User } from "@prisma/client";
import { pusherClient } from "@/lib/pusher";
import Pusher from "pusher-js";
import { OrdersList } from "../(components)/orders-list";

type Props = {
  adms: User[];
  orders: Order[];
};

export default function WorkerScreen(props: Props) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [incomingOrders, setIncomingOrders] = useState<Order[]>([]);

  useEffect(() => {
    const pusher = new Pusher(
      process.env.NEXT_PUBLIC_PUSHER_APP_KEY! as string,
      {
        cluster: "sa1",
      }
    );
    pusher.subscribe("dashboard");

    pusher.bind("incoming-order", (notification: any) =>
      setIncomingOrders((prev) => [...prev, notification])
    );

    return () => {
      pusher.unsubscribe("dashboard");
    };
  }, []);

  return (
    <div className="container mx-auto p-4">
      <h1>Adm</h1>

      <h2>Pedidos:</h2>
      {/* {JSON.stringify(props.orders)}
      {JSON.stringify(incomingOrders)} */}
      <OrdersList orders={props.orders} incomingOrders={incomingOrders} />

      <div className="pt-4 flex justify-center">
        <Button type="primary" onClick={() => setIsModalOpen(true)}>
          Notificar estabelecimento
        </Button>
      </div>
      <WorkerModal
        adms={props.adms}
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
      />
    </div>
  );
}
