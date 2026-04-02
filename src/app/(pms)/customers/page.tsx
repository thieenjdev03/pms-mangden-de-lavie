"use client";

import { ConfigProvider } from "antd";
import viVN from "antd/locale/vi_VN";
import CustomerPage from "@/components/customers/CustomerPage";

export default function CustomersRoutePage() {
  return (
    <ConfigProvider locale={viVN}>
      <CustomerPage />
    </ConfigProvider>
  );
}
