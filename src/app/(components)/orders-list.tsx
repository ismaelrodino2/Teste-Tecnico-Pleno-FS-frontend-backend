import { Order } from "@prisma/client";
import React from "react";

type Props = {
  orders: Order[];
  incomingOrders: Order[];
};

export function OrdersList(props: Props) {
  const allOrders = [...props.orders, ...props.incomingOrders];

  return (
    <div >
      <h1 className="text-2xl font-bold mb-4">Adm</h1>

      <h2 className="text-xl font-bold mb-2">Pedidos:</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {allOrders.map((order) => (
          <div key={order.id} className="bg-paleBlue p-4 rounded-md shadow-md">
            <h3 className="text-lg font-semibold mb-2">{order.clientName}</h3>
            <p className="mb-2 text-lowGray">{`Endereço: ${order.address}`}</p>
            <p className="text-lowGray">{`Itens: ${order.items.join(", ")}`}</p>
          </div>
        ))}
      </div>


    </div>
  );
}
