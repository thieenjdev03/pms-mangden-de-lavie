Ok, tao sẽ viết cho mày **plan implement UI frontend-only (chưa có backend)** theo vibe **chill healing + thực tế production mindset**, để sau này gắn backend vào không phải refactor lại nhiều.

---

# 🌿 I. MỤC TIÊU FRONTEND (PHASE 1 – NO BACKEND)

### 🎯 Scope hiện tại

* `/` → Trang **maintenance (landing chill healing)**
* `/dashboard` → Trang admin (fake auth tạm thời)
* Chặn truy cập dashboard nếu không phải admin

👉 Vì chưa có backend ⇒ dùng **mock auth (giả lập authentication)**

---

# 🧠 II. KIẾN TRÚC FRONTEND (NEXTJS)

## 1. Route structure

```bash
/app
  /page.tsx              → Landing (maintenance)
  /dashboard/page.tsx    → Dashboard
  /login/page.tsx        → (optional) fake login
  /components
  /lib
    auth.ts              → xử lý auth
```

---

# 🔐 III. AUTH MOCK (QUAN TRỌNG)

👉 Tạm thời dùng:

* `localStorage` hoặc `cookie`
* Lưu `role = admin | user`

---

## 📁 `/lib/auth.ts`

```ts
export const getUser = () => {
  if (typeof window === 'undefined') return null

  const user = localStorage.getItem('user')
  return user ? JSON.parse(user) : null
}

export const isAdmin = () => {
  const user = getUser()
  return user?.role === 'admin'
}

export const loginAsAdmin = () => {
  localStorage.setItem('user', JSON.stringify({ role: 'admin' }))
}

export const logout = () => {
  localStorage.removeItem('user')
}
```

👉 Giải thích:

* `mock auth` = giả lập login
* Sau này thay bằng JWT từ backend

---

# 🚧 IV. PROTECTED ROUTE (CLIENT SIDE)

## 📁 `/app/dashboard/page.tsx`

```tsx
'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { isAdmin } from '@/lib/auth'

export default function Dashboard() {
  const router = useRouter()

  useEffect(() => {
    if (!isAdmin()) {
      router.push('/')
    }
  }, [])

  return (
    <div className="p-6">
      <h1>Dashboard</h1>
    </div>
  )
}
```

👉 Giải thích:

* `useEffect` check sau khi render
* nếu không phải admin → redirect

⚠️ Nhược điểm:

* có thể flash UI 1 chút (vì client check)
  👉 acceptable ở phase 1

---

# 🌿 V. LANDING PAGE (CHILL HEALING UI)

## 📁 `/app/page.tsx`

```tsx
export default function Home() {
  return (
    <main className="h-screen flex items-center justify-center bg-[url('/bg.jpg')] bg-cover bg-center">
      <div className="backdrop-blur-md bg-black/40 p-10 rounded-2xl text-white text-center max-w-lg">
        
        <h1 className="text-3xl font-semibold mb-4">
          🌿 Măng Đen De Lavie
        </h1>

        <p className="text-lg mb-3">
          Website đang “ủ mầm” một điều gì đó thật xinh...
        </p>

        <p className="text-sm opacity-80 mb-6">
          Hẹn bạn quay lại sau một chút để trải nghiệm
          hành trình nghỉ dưỡng trọn vẹn hơn ✨
        </p>

        <button className="px-5 py-2 bg-white text-black rounded-full">
          Liên hệ đặt phòng
        </button>

      </div>
    </main>
  )
}
```

---

# 🎨 VI. UI/UX CHILL HEALING (QUAN TRỌNG)

## 1. Visual direction

* Background:

  * rừng thông 🌲
  * sương mù nhẹ
  * villa ánh đèn vàng

* Effect:

  * `backdrop-blur` (glass effect – hiệu ứng kính mờ)
  * gradient tối nhẹ

---

## 2. Typography

* Font:

  * serif nhẹ (sang)
  * hoặc sans mềm (healing)

---

## 3. Animation (optional nhưng nên có)

👉 dùng:

* `framer-motion`

```tsx
<motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
>
```

👉 giúp:

* UI “có hồn” hơn
* tăng cảm giác chill

---

# 😎 VII. FAKE LOGIN (TEST ADMIN)

👉 tạo page `/login` nhanh

```tsx
'use client'

import { loginAsAdmin } from '@/lib/auth'
import { useRouter } from 'next/navigation'

export default function Login() {
  const router = useRouter()

  const handleLogin = () => {
    loginAsAdmin()
    router.push('/dashboard')
  }

  return (
    <button onClick={handleLogin}>
      Login as Admin
    </button>
  )
}
```

---

# 🔄 VIII. FLOW HOẠT ĐỘNG

```text
User → "/dashboard"
   ↓
Check localStorage
   ↓
[Không phải admin] → redirect "/"
[Admin] → show dashboard
```

---

# ⚠️ IX. CẢNH BÁO (RẤT QUAN TRỌNG)

👉 Vì mày là dev nên tao nói thẳng:

### ❌ Cái này KHÔNG secure

* user có thể tự sửa localStorage

👉 Nhưng:

* OK cho demo / phase đầu

---

# 🚀 X. DESIGN CHO TƯƠNG LAI (ĐỪNG CODE NGU 😄)

## Sau này khi có backend:

### Thay:

* localStorage → JWT cookie

### Giữ nguyên:

* cấu trúc route
* logic redirect

👉 => không phải rewrite

---

# 💡 XI. NÂNG CẤP NHANH (RECOMMEND)

* Thêm:

  * nút Zalo / phone
  * loading spinner
  * countdown “coming soon”

---

# ✨ XII. CONTENT NHÍ NHẢNH (FINAL)

👉 dùng luôn:

```text
🌿 Măng Đen De Lavie đang bận… chill một chút!

Tụi mình đang chuẩn bị một không gian thật xinh
để bạn có thể dễ dàng chọn căn villa phù hợp nhất ✨

⏳ Hẹn bạn quay lại sau nhé!

Trong lúc chờ…
biết đâu bạn đang cần một chuyến đi để “heal” lại chính mình 🌲💛
