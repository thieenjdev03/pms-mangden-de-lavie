"use client";

import { Button, Typography } from "antd";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { loginAsAdmin } from "@/lib/auth";

const { Title, Text } = Typography;

export default function LoginPage() {
  const router = useRouter();

  const handleLogin = () => {
    loginAsAdmin();
    router.push("/dashboard");
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-8 bg-neutral-100 px-4">
      <div className="w-full max-w-sm rounded-xl border border-neutral-200 bg-white p-8 shadow-sm">
        <Title level={4} style={{ marginTop: 0 }}>
          Đăng nhập (demo)
        </Title>
        <Text type="secondary" className="mb-6 block text-sm">
          Mock auth — chỉ dùng giai đoạn chưa có backend.
        </Text>
        <Button type="primary" block size="large" onClick={handleLogin}>
          Login as Admin
        </Button>
        <Link href="/" className="mt-4 block text-center text-sm text-neutral-500 hover:text-neutral-800">
          Về trang chủ
        </Link>
      </div>
    </main>
  );
}
