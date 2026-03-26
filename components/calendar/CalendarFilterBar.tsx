"use client";

import { Col, Row, Segmented, Select, Space, Typography } from "antd";
import type {
  CalendarOccupancyFilter,
  CalendarProperty,
  CalendarViewMode,
} from "@/lib/calendarFilters";
import {
  CALENDAR_AREA_OPTIONS,
  CALENDAR_PROPERTIES,
  CALENDAR_VIEW_OPTIONS,
} from "@/lib/calendarFilters";
import { colors } from "@/lib/theme";

const { Text } = Typography;

type CalendarFilterBarProps = {
  selectedProperties: CalendarProperty[];
  onPropertiesChange: (value: CalendarProperty[]) => void;
  occupancyFilter: CalendarOccupancyFilter;
  onOccupancyFilterChange: (value: CalendarOccupancyFilter) => void;
  calendarView: CalendarViewMode;
  onCalendarViewChange: (value: CalendarViewMode) => void;
};

export default function CalendarFilterBar({
  selectedProperties,
  onPropertiesChange,
  occupancyFilter,
  onOccupancyFilterChange,
  calendarView,
  onCalendarViewChange,
}: CalendarFilterBarProps) {
  return (
    <div
      style={{
        marginBottom: 20,
        paddingBottom: 20,
        borderBottom: `1px solid ${colors.border}`,
      }}
    >
      <Row gutter={[16, 16]} align="middle">
        <Col xs={24} lg={9}>
          <Space direction="vertical" size={6} style={{ width: "100%" }}>
            <Text strong style={{ fontSize: 13, color: colors.textSecondary }}>
              Trạng thái
            </Text>
            <Segmented<CalendarOccupancyFilter>
              block
              value={occupancyFilter}
              onChange={onOccupancyFilterChange}
              options={[
                { label: "Tất cả", value: "all" },
                { label: "Đang thuê", value: "occupied" },
                { label: "Trống", value: "vacant" },
              ]}
            />
          </Space>
        </Col>
        <Col xs={24} lg={7}>
          <Space direction="vertical" size={6} style={{ width: "100%" }}>
            <Text strong style={{ fontSize: 13, color: colors.textSecondary }}>
              Chế độ xem
            </Text>
            <Segmented<CalendarViewMode>
              block
              value={calendarView}
              onChange={onCalendarViewChange}
              options={CALENDAR_VIEW_OPTIONS.map((o) => ({ label: o.label, value: o.value }))}
            />
          </Space>
        </Col>
        <Col xs={24} lg={8}>
          <Space direction="vertical" size={6} style={{ width: "100%" }}>
            <Text strong style={{ fontSize: 13, color: colors.textSecondary }}>
              Khu vực
            </Text>
            <Select<CalendarProperty[]>
              mode="multiple"
              allowClear
              placeholder="Villa Ocean, Hillside, Homestay…"
              value={selectedProperties}
              onChange={(v) => {
                if (v.length === 0) {
                  onPropertiesChange([...CALENDAR_PROPERTIES]);
                  return;
                }
                onPropertiesChange(v);
              }}
              style={{ width: "100%" }}
              maxTagCount="responsive"
              options={CALENDAR_AREA_OPTIONS.map((o) => ({ value: o.value, label: o.label }))}
            />
          </Space>
        </Col>
      </Row>
    </div>
  );
}
