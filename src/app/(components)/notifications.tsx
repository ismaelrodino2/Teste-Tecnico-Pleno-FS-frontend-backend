"use client";
import { pusherClient } from "@/lib/pusher";
import { Notification, User } from "@prisma/client";
import { FC, useEffect, useState } from "react";
import { Button, notification } from "antd";
import axios from "axios";
import { useRouter } from "next/navigation";

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
    pusherClient.subscribe("dashboard"); //same room Id -> route '/'

    pusherClient.bind("incoming-notification", (text: Notification) => {
      setIncomingNotifications((prev) => [...prev, text]);
    });

    return () => {
      pusherClient.unsubscribe("dashboard");
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

  return (
    <div>
      {props.initialNotifications.map((notification: Notification) => (
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

      {incomingNotifications.map((notification) => (
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
  );
};
