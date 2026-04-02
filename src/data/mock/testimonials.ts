export type Testimonial = {
  id: string;
  propertyId: string;
  guestName: string;
  content: string;
  rating: number;
};

export const testimonials: Testimonial[] = [
  {
    id: "tm-1",
    propertyId: "prop-casa",
    guestName: "Hải & Linh · Đà Nẵng",
    content:
      "CasaBlanca đúng vibe Địa Trung Hải mini giữa Măng Đen. Phòng ban công 201 sáng cả ngày, sạch và yên. Chủ nhà rep Zalo nhanh, giá hợp túi so với villa tương đương.",
    rating: 5,
  },
  {
    id: "tm-2",
    propertyId: "prop-sala",
    guestName: "Chị Minh Anh · TP.HCM",
    content:
      "Gia đình mình book family 201 ở Sala: các bé thích hồ bơi, tối nấu lẩu ở bếp rộng. Cách chợ gần, sáng đi chợ mua đồ tươi rất tiện.",
    rating: 5,
  },
  {
    id: "tm-3",
    propertyId: "prop-casa",
    guestName: "Anh Tuấn · freelance",
    content:
      "Ở phòng master 203 một tuần để làm việc nhẹ. Wifi ổn, không gian tĩnh, sáng ra ban công là thấy thông. Sẽ giới thiệu bạn bè.",
    rating: 5,
  },
  {
    id: "tm-4",
    propertyId: "prop-sala",
    guestName: "Nhóm bạn 5 người · Pleiku",
    content:
      "Ghép phòng đôi deluxe và thêm một phòng family cho đủ chỗ. Villa rộng, BBQ ngoài sân vui buổi tối. Cảm ơn team đã hướng dẫn lịch săn mây.",
    rating: 4,
  },
];
