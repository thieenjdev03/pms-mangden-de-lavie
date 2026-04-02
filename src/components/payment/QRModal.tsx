"use client";

import { CopyOutlined } from "@ant-design/icons";
import { Button, Modal, Space, Typography, message } from "antd";
import { getQR } from "@/lib/vietqr";

const { Text, Paragraph } = Typography;

type QRModalProps = {
  open: boolean;
  onClose: () => void;
  amount: number;
  transferContent: string;
  vietnamese?: boolean;
};

const copyVi = {
  title: "Thanh toán QR",
  amount: "Số tiền: ",
  content: "Nội dung chuyển khoản: ",
  copy: "Sao chép nội dung CK",
  copyOk: "Đã sao chép nội dung",
  copyFail: "Không thể sao chép",
};

const copyEn = {
  title: "QR payment",
  amount: "Amount: ",
  content: "Transfer content: ",
  copy: "Copy transfer content",
  copyOk: "Transfer content copied",
  copyFail: "Could not copy",
};

export default function QRModal({
  open,
  onClose,
  amount,
  transferContent,
  vietnamese = true,
}: QRModalProps) {
  const t = vietnamese ? copyVi : copyEn;
  const src = getQR(amount, transferContent);

  const copyContent = async () => {
    try {
      await navigator.clipboard.writeText(transferContent);
      message.success(t.copyOk);
    } catch {
      message.error(t.copyFail);
    }
  };

  return (
    <Modal
      title={t.title}
      open={open}
      onCancel={onClose}
      footer={null}
      centered
      width="min(360px, calc(100vw - 24px))"
      styles={{
        body: {
          maxHeight: "min(85vh, calc(100dvh - 120px))",
          overflowY: "auto",
        },
      }}
    >
      <Space direction="vertical" size="middle" style={{ width: "100%" }}>
        <Paragraph style={{ marginBottom: 0 }}>
          <Text type="secondary">{t.amount}</Text>
          <Text strong>
            {new Intl.NumberFormat("vi-VN", { maximumFractionDigits: 0 }).format(amount)} ₫
          </Text>
        </Paragraph>
        <Paragraph style={{ marginBottom: 0 }}>
          <Text type="secondary">{t.content}</Text>
          <Text code>{transferContent}</Text>
        </Paragraph>
        <Button icon={<CopyOutlined />} onClick={copyContent} block>
          {t.copy}
        </Button>
        <div style={{ position: "relative", width: 240, height: 240, margin: "0 auto" }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={src}
            alt="VietQR"
            width={240}
            height={240}
            style={{ borderRadius: 8, border: "1px solid #f0f0f0" }}
          />
        </div>
      </Space>
    </Modal>
  );
}
