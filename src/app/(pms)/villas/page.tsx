"use client";

import { ConfigProvider } from "antd";
import viVN from "antd/locale/vi_VN";
import VillaPage from "@/components/villas/VillaPage";

export default function VillasRoutePage() {
  return (
    <ConfigProvider locale={viVN}>
      <VillaPage />
    </ConfigProvider>
  );
}
