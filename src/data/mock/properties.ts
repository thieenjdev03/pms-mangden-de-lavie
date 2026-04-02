import type { Property } from "@/types/accommodation";

/** Măng Đen De Lavie — hai villa đang vận hành (mock marketing). */
export const properties: Property[] = [
  {
    id: "prop-casa",
    name: "CasaBlanca Villa",
    slug: "casablanca-villa",
    type: "villa",
    shortDescription:
      "Villa phong cách Địa Trung Hải nhẹ nhàng giữa Măng Đen — ban công đón gió thông, phù hợp couple và nhóm nhỏ muốn kỳ nghỉ ấm, nhiều ánh sáng.",
    fullDescription:
      "CasaBlanca Villa được bố trí theo tầng: tầng dưới có phòng hiên rộng tiện ngồi trà chiều; các tầng trên là phòng ban công nhìn vườn và rừng thông xa xa. Nội thất tối giản, drap và nệm chọn loại êm cho khí hậu cao nguyên. Cách trung tâm chợ và quán ăn địa phương chỉ vài phút — thuận tiện vừa nghỉ dưỡng vừa khám phá Măng Đen.",
    address: "Đường vào Đồi Thông, Măng Đen, Kon Tum",
    mapLabel: "CasaBlanca Villa — khu Đồi Thông",
    coverImage: "/images/properties/casablanca/cover.jpg",
    gallery: [
      "/images/properties/casablanca/cover.jpg",
      "/images/properties/casablanca/gallery-1.jpg",
      "/images/properties/casablanca/gallery-2.jpg",
      "/images/properties/casablanca/room-garden-1.jpg",
      "/images/properties/casablanca/room-master-1.jpg",
    ],
    generalAmenities: [
      "Ban công / hiên ngồi chill",
      "Bếp nhỏ (tủ lạnh, bếp từ)",
      "Smart TV & wifi ổn định",
      "Máy sấy tóc, drap hotel",
      "Chỗ đậu xe trong khuôn viên",
    ],
    contact: {
      phone: "+84356279677",
      phoneDisplay: "035.627.9677",
      zaloUrl: "https://zalo.me/0356279677",
      facebookUrl: "https://www.facebook.com/Mangdendalavie/",
    },
    featuredTags: ["Couple", "Chụp ảnh", "View thông", "Yên tĩnh"],
    propertyHighlights: [
      "Kiến trúc sáng, ban công nhiều cây xanh",
      "Năm phòng với ba hạng khác nhau",
      "Gần cafe view đồi và chợ Măng Đen",
    ],
    checkInTime: "14:00",
    checkOutTime: "11:00",
    marketingPriceFrom: 720_000,
  },
  {
    id: "prop-sala",
    name: "Sala Villa",
    slug: "sala-villa",
    type: "villa",
    shortDescription:
      "Biệt thự rộng có hồ bơi và vườn riêng — điểm dừng chân cho gia đình và nhóm bạn cần không gian chung để sum họp giữa không khí lành của cao nguyên.",
    fullDescription:
      "Sala Villa thiết kế cho kỳ nghỉ dài ngày: bếp đầy đủ, khu BBQ ngoài trời, phòng khách ấm và khu tắm nắng sau nhà. Các phòng được đánh mã rõ ràng trên hai tầng — từ phòng đôi view vườn đến căn family rộng rãi. Cách chợ Măng Đen chỉ vài phút lái xe nhưng vẫn giữ cảm giác riêng tư trong tán thông.",
    address: "Khu nghỉ dưỡng Sala, thôn Đắk Long, Măng Đen, Kon Tum",
    mapLabel: "Sala Villa — gần chợ Măng Đen, view thông",
    coverImage: "/images/properties/sala/cover.jpg",
    gallery: [
      "/images/properties/sala/cover.jpg",
      "/images/properties/sala/gallery-1.jpg",
      "/images/properties/sala/gallery-2.jpg",
      "/images/properties/sala/room-double-1.jpg",
      "/images/properties/sala/room-family-1.jpg",
      "/images/properties/sala/room-grand-1.jpg",
    ],
    generalAmenities: [
      "Hồ bơi riêng",
      "BBQ & sân cỏ",
      "Bếp đầy đủ dụng cụ",
      "Wifi fiber",
      "Chỗ đậu xe trong khuôn viên",
      "Máy giặt & khu phơi",
    ],
    contact: {
      phone: "+84356279677",
      phoneDisplay: "035.627.9677",
      zaloUrl: "https://zalo.me/0356279677",
      facebookUrl: "https://www.facebook.com/Mangdendalavie/",
      messengerUrl: "https://m.me/Mangdendalavie",
      email: "hello@mangdendelavie.vn",
    },
    featuredTags: ["Villa riêng", "Hồ bơi", "Gia đình", "Gần chợ"],
    propertyHighlights: [
      "Hồ bơi & sân vườn riêng",
      "Phòng family cho nhóm 4–6 người",
      "Sáu phòng với ba loại trải nghiệm",
    ],
    checkInTime: "14:00",
    checkOutTime: "11:00",
    marketingPriceFrom: 920_000,
  },
];
