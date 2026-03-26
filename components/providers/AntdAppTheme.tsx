"use client";

import { ConfigProvider } from "antd";
import type { ReactNode } from "react";
import { colors } from "@/lib/theme";

type AntdAppThemeProps = {
  children: ReactNode;
};

/** Global Ant Design tokens aligned with lib/theme.ts */
export default function AntdAppTheme({ children }: AntdAppThemeProps) {
  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: colors.primary,
          colorBgBase: colors.background,
          colorText: colors.textPrimary,
          colorTextSecondary: colors.textSecondary,
          colorBorder: colors.border,
        },
      }}
    >
      {children}
    </ConfigProvider>
  );
}
