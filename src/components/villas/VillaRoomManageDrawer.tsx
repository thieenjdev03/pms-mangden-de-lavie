"use client";

import { DeleteOutlined, EditOutlined, PlusOutlined } from "@ant-design/icons";
import {
  Button,
  Drawer,
  Form,
  Input,
  Modal,
  Popconfirm,
  Select,
  Space,
  Table,
  Tabs,
  message,
} from "antd";
import type { ColumnsType } from "antd/es/table";
import { useCallback, useEffect, useMemo, useState } from "react";
import type { RoomType, RoomUnitWithDetails, RoomWithVillaName, Villa } from "@/lib/data";

type VillaRoomManageDrawerProps = {
  open: boolean;
  villa: Villa | null;
  allRooms: RoomWithVillaName[];
  onClose: () => void;
  onSaved: () => void;
};

type RtForm = { name: string };
type RuForm = {
  roomTypeId: string;
  roomCode: string;
  floor?: string;
  displayName?: string;
  status: "available" | "occupied" | "maintenance";
};

export default function VillaRoomManageDrawer({
  open,
  villa,
  allRooms,
  onClose,
  onSaved,
}: VillaRoomManageDrawerProps) {
  const [roomTypes, setRoomTypes] = useState<RoomType[]>([]);
  const [rtModalOpen, setRtModalOpen] = useState(false);
  const [editingRt, setEditingRt] = useState<RoomType | null>(null);
  const [rtForm] = Form.useForm<RtForm>();

  const [ruModalOpen, setRuModalOpen] = useState(false);
  const [editingRu, setEditingRu] = useState<RoomWithVillaName | null>(null);
  const [ruForm] = Form.useForm<RuForm>();

  const villaRooms = useMemo(
    () => (villa ? allRooms.filter((r) => r.villaId === villa.id) : []),
    [allRooms, villa],
  );

  const loadRoomTypes = useCallback(() => {
    if (!villa) return;
    void fetch(`/api/room-types?villaId=${encodeURIComponent(villa.id)}`)
      .then((res) => res.json())
      .then((data: RoomType[]) => setRoomTypes(data));
  }, [villa]);

  useEffect(() => {
    if (open && villa) {
      loadRoomTypes();
    }
  }, [open, villa, loadRoomTypes]);

  const refreshAll = () => {
    loadRoomTypes();
    onSaved();
  };

  const openCreateRt = () => {
    setEditingRt(null);
    rtForm.resetFields();
    setRtModalOpen(true);
  };

  const openEditRt = (rt: RoomType) => {
    setEditingRt(rt);
    rtForm.setFieldsValue({ name: rt.name });
    setRtModalOpen(true);
  };

  const submitRt = async () => {
    if (!villa) return;
    try {
      const v = await rtForm.validateFields();
      if (editingRt) {
        const res = await fetch(`/api/room-types/${editingRt.id}`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ name: v.name }),
        });
        const json = (await res.json()) as { error?: string };
        if (!res.ok) throw new Error(json.error ?? "failed");
        message.success("Đã cập nhật loại phòng");
      } else {
        const res = await fetch("/api/room-types", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ villaId: villa.id, name: v.name }),
        });
        const json = (await res.json()) as { error?: string };
        if (!res.ok) throw new Error(json.error ?? "failed");
        message.success("Đã thêm loại phòng");
      }
      setRtModalOpen(false);
      refreshAll();
    } catch (e) {
      if (e && typeof e === "object" && "errorFields" in e) return;
      message.error("Không thể lưu loại phòng");
    }
  };

  const deleteRt = async (rt: RoomType) => {
    const res = await fetch(`/api/room-types/${rt.id}`, { method: "DELETE" });
    const json = (await res.json()) as { error?: string };
    if (!res.ok) {
      message.error(
        json.error === "room type has room units"
          ? "Không xóa được: còn phòng gắn loại này."
          : "Không thể xóa loại phòng",
      );
      return;
    }
    message.success("Đã xóa loại phòng");
    refreshAll();
  };

  const openCreateRu = () => {
    setEditingRu(null);
    ruForm.resetFields();
    ruForm.setFieldsValue({ status: "available" });
    setRuModalOpen(true);
  };

  const openEditRu = (ru: RoomWithVillaName) => {
    setEditingRu(ru);
    ruForm.setFieldsValue({
      roomTypeId: ru.roomTypeId,
      roomCode: ru.roomCode,
      floor: ru.floor,
      displayName: ru.displayName,
      status: (ru.status ?? "available") as RuForm["status"],
    });
    setRuModalOpen(true);
  };

  const submitRu = async () => {
    if (!villa) return;
    try {
      const v = await ruForm.validateFields();
      if (editingRu) {
        const res = await fetch(`/api/rooms/${editingRu.id}`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            villaId: villa.id,
            roomTypeId: v.roomTypeId,
            roomCode: v.roomCode,
            floor: v.floor,
            displayName: v.displayName,
            status: v.status,
          }),
        });
        const json = (await res.json()) as { error?: string };
        if (!res.ok) {
          message.error(
            json.error === "roomCode already exists in this villa"
              ? "Mã phòng đã tồn tại trong villa này."
              : "Không thể cập nhật phòng",
          );
          return;
        }
        message.success("Đã cập nhật phòng");
      } else {
        const res = await fetch("/api/rooms", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            villaId: villa.id,
            roomTypeId: v.roomTypeId,
            roomCode: v.roomCode,
            floor: v.floor,
            displayName: v.displayName,
            status: v.status,
          }),
        });
        const json = (await res.json()) as { error?: string };
        if (!res.ok) {
          message.error(
            json.error === "roomCode already exists in this villa"
              ? "Mã phòng đã tồn tại trong villa này."
              : "Không thể thêm phòng",
          );
          return;
        }
        message.success("Đã thêm phòng");
      }
      setRuModalOpen(false);
      refreshAll();
    } catch (e) {
      if (e && typeof e === "object" && "errorFields" in e) return;
      message.error("Không thể lưu phòng");
    }
  };

  const deleteRu = async (ru: RoomUnitWithDetails) => {
    const res = await fetch(`/api/rooms/${ru.id}`, { method: "DELETE" });
    const json = (await res.json()) as { error?: string };
    if (!res.ok) {
      message.error(
        json.error === "room has bookings"
          ? "Không xóa được: phòng đang có booking."
          : "Không thể xóa phòng",
      );
      return;
    }
    message.success("Đã xóa phòng");
    refreshAll();
  };

  const rtColumns: ColumnsType<RoomType> = [
    { title: "Tên loại phòng", dataIndex: "name", key: "name" },
    {
      title: "Thao tác",
      key: "a",
      width: 140,
      render: (_, record) => (
        <Space size="small">
          <Button type="link" size="small" icon={<EditOutlined />} onClick={() => openEditRt(record)}>
            Sửa
          </Button>
          <Popconfirm
            title="Xóa loại phòng?"
            description="Chỉ xóa được khi không còn phòng vật lý gắn loại này."
            onConfirm={() => void deleteRt(record)}
          >
            <Button type="link" size="small" danger icon={<DeleteOutlined />}>
              Xóa
            </Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  const ruColumns: ColumnsType<RoomWithVillaName> = [
    { title: "Mã phòng", dataIndex: "roomCode", key: "roomCode", width: 100 },
    { title: "Loại phòng", dataIndex: "roomTypeName", key: "roomTypeName", width: 160 },
    {
      title: "Tầng / block",
      dataIndex: "floor",
      key: "floor",
      width: 120,
      render: (f: string | undefined) => f ?? "—",
    },
    {
      title: "Trạng thái",
      dataIndex: "status",
      key: "status",
      width: 120,
      render: (s: string | undefined) => {
        const map: Record<string, string> = {
          available: "Trống",
          occupied: "Đang thuê",
          maintenance: "Bảo trì",
        };
        return map[s ?? "available"] ?? s;
      },
    },
    {
      title: "Thao tác",
      key: "act",
      width: 140,
      render: (_, record) => (
        <Space size="small">
          <Button type="link" size="small" icon={<EditOutlined />} onClick={() => openEditRu(record)}>
            Sửa
          </Button>
          <Popconfirm title="Xóa phòng?" onConfirm={() => void deleteRu(record)}>
            <Button type="link" size="small" danger icon={<DeleteOutlined />}>
              Xóa
            </Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <>
      <Drawer
        title={villa ? `Loại phòng & phòng — ${villa.name}` : ""}
        placement="right"
        width={Math.min(720, typeof window !== "undefined" ? window.innerWidth - 24 : 720)}
        open={open && !!villa}
        onClose={onClose}
        destroyOnClose
      >
        {villa ? (
          <Tabs
            items={[
              {
                key: "types",
                label: `Loại phòng (${roomTypes.length})`,
                children: (
                  <div>
                    <Button type="primary" icon={<PlusOutlined />} onClick={openCreateRt} className="mb-4">
                      Thêm loại phòng
                    </Button>
                    <Table<RoomType>
                      rowKey="id"
                      size="small"
                      columns={rtColumns}
                      dataSource={roomTypes}
                      pagination={false}
                    />
                    <p className="mt-4 text-xs text-neutral-500">
                      Mã phòng (room code) chỉ cần duy nhất trong từng villa — hai villa khác nhau có thể
                      cùng mã &quot;101&quot;.
                    </p>
                  </div>
                ),
              },
              {
                key: "units",
                label: `Phòng (${villaRooms.length})`,
                children: (
                  <div>
                    <Button
                      type="primary"
                      icon={<PlusOutlined />}
                      onClick={openCreateRu}
                      disabled={roomTypes.length === 0}
                      className="mb-4"
                    >
                      Thêm phòng
                    </Button>
                    {roomTypes.length === 0 ? (
                      <p className="text-sm text-neutral-500">Thêm ít nhất một loại phòng trước.</p>
                    ) : (
                      <Table<RoomWithVillaName>
                        rowKey="id"
                        size="small"
                        columns={ruColumns}
                        dataSource={villaRooms}
                        pagination={false}
                        scroll={{ x: 520 }}
                      />
                    )}
                  </div>
                ),
              },
            ]}
          />
        ) : null}
      </Drawer>

      <Modal
        title={editingRt ? "Sửa loại phòng" : "Thêm loại phòng"}
        open={rtModalOpen}
        onCancel={() => setRtModalOpen(false)}
        onOk={() => void submitRt()}
        destroyOnClose
      >
        <Form form={rtForm} layout="vertical">
          <Form.Item name="name" label="Tên loại phòng" rules={[{ required: true, message: "Bắt buộc" }]}>
            <Input placeholder="Ví dụ: Deluxe đôi, Gia đình 2PN" />
          </Form.Item>
        </Form>
      </Modal>

      <Modal
        title={editingRu ? "Sửa phòng" : "Thêm phòng"}
        open={ruModalOpen}
        onCancel={() => setRuModalOpen(false)}
        onOk={() => void submitRu()}
        destroyOnClose
        width={480}
      >
        <Form form={ruForm} layout="vertical">
          <Form.Item
            name="roomTypeId"
            label="Loại phòng"
            rules={[{ required: true, message: "Chọn loại phòng" }]}
          >
            <Select
              placeholder="Chọn loại"
              options={roomTypes.map((t) => ({ value: t.id, label: t.name }))}
            />
          </Form.Item>
          <Form.Item
            name="roomCode"
            label="Mã phòng"
            rules={[{ required: true, message: "Nhập mã phòng" }]}
            extra="Duy nhất trong villa này (có thể trùng mã ở villa khác)."
          >
            <Input placeholder="101, B1, H05…" />
          </Form.Item>
          <Form.Item name="floor" label="Tầng / block (tuỳ chọn)">
            <Input placeholder="2, Gác, Nhà chính…" />
          </Form.Item>
          <Form.Item name="displayName" label="Tên hiển thị (tuỳ chọn)">
            <Input placeholder="Ghi đè nhãn trên lịch / đặt phòng" />
          </Form.Item>
          <Form.Item name="status" label="Trạng thái">
            <Select
              options={[
                { value: "available", label: "Trống" },
                { value: "occupied", label: "Đang thuê" },
                { value: "maintenance", label: "Bảo trì" },
              ]}
            />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
}
