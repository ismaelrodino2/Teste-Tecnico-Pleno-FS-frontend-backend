"use client";
import { pusherClient } from "@/lib/pusher";
import { Notification, User } from "@prisma/client";
import { FC, useEffect, useState } from "react";
import { Button, notification } from "antd";
import axios from "axios";
import { useRouter } from "next/navigation";
import Pusher from "pusher-js";

interface Props {
  initialNotifications: any;
  users: User[];
}

export const Notifications = (props: Props) => {
  const [loading, setLoading] = useState("");
  const router = useRouter();
  const [incomingNotifications, setIncomingNotifications] = useState<
    Notification[]
  >([]);

  useEffect(() => {
    const pusher = new Pusher(
      process.env.NEXT_PUBLIC_PUSHER_APP_KEY! as string,
      {
        cluster: "sa1",
      }
    );
    pusher.subscribe("dashboard");

    pusher.bind("incoming-notification", (notification: any) =>
      setIncomingNotifications((prev) => [...prev, notification])
    );

    return () => {
      pusher.unsubscribe("dashboard");
    };
  }, []);

  async function handleConfirmArrive(notificationId: string) {
    setLoading(notificationId);
    try {
      await axios.put("/api/notification", {
        id: notificationId,
        confirmation: true,
      });
      router.push(`/register-orders/${notificationId}`);
    } catch (err) {
      console.error(err);
      notification.error({ message: "Erro ao confirmar a notificação" });
    } finally {
      setLoading("");
    }
  }
  const allNotifications = [...props.initialNotifications, ...incomingNotifications];

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Confirmação de Chegada</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
        {allNotifications.map((notification) => (
          <div key={notification.id}>
            <Button
              loading={loading === notification.id}
              disabled={notification.confirmation}
              onClick={() => handleConfirmArrive(notification.id)}
            >
              Confirmar Chegada
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
};
