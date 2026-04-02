"use client";

import { DeleteOutlined, EditOutlined, PlusOutlined, UnorderedListOutlined } from "@ant-design/icons";
import {
  Button,
  Card,
  Form,
  Grid,
  Input,
  Modal,
  Popconfirm,
  Space,
  Table,
  Typography,
  message,
} from "antd";
import type { ColumnsType } from "antd/es/table";
import { useCallback, useEffect, useMemo, useState } from "react";
import VillaRoomManageDrawer from "@/components/villas/VillaRoomManageDrawer";
import type { RoomType, RoomWithVillaName, Villa } from "@/lib/data";

const { Title, Text } = Typography;

type Row = Villa & { roomCount: number; roomTypeCount: number };

type FormValues = {
  name: string;
  shortLabel?: string;
};

export default function VillaPage() {
  const [villas, setVillas] = useState<Villa[]>([]);
  const [rooms, setRooms] = useState<RoomWithVillaName[]>([]);
  const [roomTypesAll, setRoomTypesAll] = useState<RoomType[]>([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState<Villa | null>(null);
  const [manageVilla, setManageVilla] = useState<Villa | null>(null);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [form] = Form.useForm<FormValues>();
  const screens = Grid.useBreakpoint();
  const isMobile = screens.md === false;

  const load = useCallback(() => {
    void Promise.all([
      fetch("/api/villas"),
      fetch("/api/rooms"),
      fetch("/api/room-types"),
    ]).then(async ([rv, rr, rrt]) => {
      const v = (await rv.json()) as Villa[];
      const r = (await rr.json()) as RoomWithVillaName[];
      const rt = (await rrt.json()) as RoomType[];
      setVillas(v);
      setRooms(r);
      setRoomTypesAll(rt);
    });
  }, []);

  useEffect(() => {
    let cancelled = false;
    void Promise.all([
      fetch("/api/villas"),
      fetch("/api/rooms"),
      fetch("/api/room-types"),
    ]).then(async ([rv, rr, rrt]) => {
      const v = (await rv.json()) as Villa[];
      const r = (await rr.json()) as RoomWithVillaName[];
      const rt = (await rrt.json()) as RoomType[];
      if (!cancelled) {
        setVillas(v);
        setRooms(r);
        setRoomTypesAll(rt);
      }
    });
    return () => {
      cancelled = true;
    };
  }, []);

  const rows: Row[] = useMemo(() => {
    return villas.map((v) => ({
      ...v,
      roomCount: rooms.filter((r) => r.villaId === v.id).length,
      roomTypeCount: roomTypesAll.filter((t) => t.villaId === v.id).length,
    }));
  }, [villas, rooms, roomTypesAll]);

  const openCreate = () => {
    setEditing(null);
    form.resetFields();
    setModalOpen(true);
  };

  const openEdit = (v: Villa) => {
    setEditing(v);
    form.setFieldsValue({
      name: v.name,
      shortLabel: v.shortLabel,
    });
    setModalOpen(true);
  };

  const openManage = (v: Villa) => {
    setManageVilla(v);
    setDrawerOpen(true);
  };

  const submit = async () => {
    try {
      const v = await form.validateFields();
      if (editing) {
        const res = await fetch(`/api/villas/${editing.id}`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            name: v.name,
            shortLabel: v.shortLabel?.trim() ? v.shortLabel.trim() : null,
          }),
        });
        if (!res.ok) throw new Error("failed");
        message.success("Đã cập nhật villa");
      } else {
        const res = await fetch("/api/villas", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            name: v.name,
            shortLabel: v.shortLabel?.trim() ? v.shortLabel.trim() : undefined,
          }),
        });
        if (!res.ok) throw new Error("failed");
        message.success("Đã thêm villa (kèm loại phòng mặc định)");
      }
      setModalOpen(false);
      form.resetFields();
      setEditing(null);
      load();
    } catch (e) {
      if (e && typeof e === "object" && "errorFields" in e) return;
      message.error("Không thể lưu villa");
    }
  };

  const onDelete = async (v: Villa) => {
    const res = await fetch(`/api/villas/${v.id}`, { method: "DELETE" });
    const json = (await res.json()) as { error?: string };
    if (!res.ok) {
      const err = json.error ?? "";
      if (err.includes("rooms")) {
        message.error("Không xóa được: villa còn phòng vật lý. Xóa phòng trước.");
      } else if (err.includes("room types")) {
        message.error("Không xóa được: villa còn loại phòng. Xóa loại phòng trước (sau khi đã xóa hết phòng).");
      } else {
        message.error("Không thể xóa villa");
      }
      return;
    }
    message.success("Đã xóa villa");
    load();
  };

  const columns: ColumnsType<Row> = [
    { title: "Tên villa / khu", dataIndex: "name", key: "name" },
    {
      title: "Nhãn trên lịch",
      dataIndex: "shortLabel",
      key: "shortLabel",
      width: 140,
      render: (s: string | undefined) => s ?? "—",
    },
    {
      title: "Loại phòng",
      dataIndex: "roomTypeCount",
      key: "roomTypeCount",
      width: 100,
      render: (n: number) => <Text type={n === 0 ? "secondary" : undefined}>{n}</Text>,
    },
    {
      title: "Phòng (mã)",
      dataIndex: "roomCount",
      key: "roomCount",
      width: 100,
      render: (n: number) => <Text type={n === 0 ? "secondary" : undefined}>{n}</Text>,
    },
    {
      title: "Thao tác",
      key: "actions",
      width: 280,
      render: (_, record) => (
        <Space size="small" wrap>
          <Button
            type="link"
            size="small"
            icon={<UnorderedListOutlined />}
            onClick={() => openManage(record)}
          >
            Loại phòng và phòng
          </Button>
          <Button type="link" size="small" icon={<EditOutlined />} onClick={() => openEdit(record)}>
            Sửa
          </Button>
          <Popconfirm
            title="Xóa villa?"
            description={
              record.roomCount > 0 || record.roomTypeCount > 0
                ? "Cần xóa hết phòng, rồi loại phòng, trước khi xóa villa."
                : "Thao tác không thể hoàn tác (dữ liệu demo)."
            }
            onConfirm={() => void onDelete(record)}
            okText="Xóa"
            cancelText="Hủy"
          >
            <Button type="link" size="small" danger icon={<DeleteOutlined />}>
              Xóa
            </Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <Card
      bordered={false}
      style={{
        borderRadius: 14,
        boxShadow: "0 1px 2px rgba(0,0,0,0.04), 0 4px 12px rgba(0,0,0,0.06)",
      }}
      styles={{ body: { padding: "clamp(16px, 4vw, 24px)" } }}
    >
      <Space
        direction={isMobile ? "vertical" : "horizontal"}
        style={{ marginBottom: 16, width: "100%", alignItems: isMobile ? "stretch" : "center" }}
        size="middle"
      >
        <Title level={4} style={{ margin: 0 }}>
          Quản lý villa
        </Title>
        <Button type="primary" icon={<PlusOutlined />} onClick={openCreate} block={isMobile}>
          Thêm villa
        </Button>
      </Space>
      <Text type="secondary" style={{ display: "block", marginBottom: 16, fontSize: 13 }}>
        Mỗi villa có <strong>loại phòng</strong> (hạng) riêng và <strong>phòng vật lý</strong> (mã phòng) —
        mã chỉ cần duy nhất trong villa; villa khác có thể dùng lại cùng mã. Đặt phòng vẫn gắn theo id phòng.
      </Text>
      <Table<Row>
        rowKey="id"
        columns={columns}
        dataSource={rows}
        pagination={{ pageSize: 10 }}
        scroll={{ x: 720 }}
      />
      <Modal
        title={editing ? "Sửa villa" : "Thêm villa"}
        open={modalOpen}
        onCancel={() => {
          setModalOpen(false);
          setEditing(null);
          form.resetFields();
        }}
        onOk={() => void submit()}
        okText="Lưu"
        destroyOnClose
        centered
        width="min(440px, calc(100vw - 24px))"
      >
        <Form form={form} layout="vertical" style={{ marginTop: 8 }}>
          <Form.Item
            name="name"
            label="Tên villa / khu"
            rules={[{ required: true, message: "Nhập tên" }]}
          >
            <Input placeholder="Ví dụ: Villa Ocean" />
          </Form.Item>
          <Form.Item name="shortLabel" label="Nhãn ngắn trên lịch (tùy chọn)">
            <Input placeholder="Ví dụ: Ocean A" />
          </Form.Item>
        </Form>
      </Modal>

      <VillaRoomManageDrawer
        open={drawerOpen}
        villa={manageVilla}
        allRooms={rooms}
        onClose={() => {
          setDrawerOpen(false);
          setManageVilla(null);
        }}
        onSaved={load}
      />
    </Card>
  );
}
