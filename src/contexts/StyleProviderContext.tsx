"use client";
import { StyleProvider } from "@ant-design/cssinjs";
import { ConfigProvider } from "antd";

export function StyleProviderCtx({ children }: { children: React.ReactNode }) {
  return (
    <ConfigProvider
      theme={{
        token: {
          // Seed Token
          colorPrimary: "#14ACF2",
        },
      }}
    >
      <StyleProvider hashPriority="high">{children}</StyleProvider>{" "}
    </ConfigProvider>
  );
}
