You are a senior frontend engineer.

Setup a global theme system for a Next.js (App Router) project using Ant Design.

---

## 🎯 Goal

Apply a consistent design system based on provided color tokens.

Do NOT use random colors.

---

## 🎨 Color System

Primary: #1677FF
Secondary: #5B76B2
Tertiary: #D45500
Neutral background: #F5F5F5

Text primary: #1F1F1F
Text secondary: #8C8C8C
Border: #E5E7EB

---

## 🧱 Step 1: Create theme file

Create file: `lib/theme.ts`

Export:

```ts
export const colors = {
  primary: "#1677FF",
  secondary: "#5B76B2",
  tertiary: "#D45500",
  background: "#F5F5F5",
  textPrimary: "#1F1F1F",
  textSecondary: "#8C8C8C",
  border: "#E5E7EB"
};
```

---

## 🧱 Step 2: Setup Ant Design ConfigProvider

Wrap app with ConfigProvider:

```tsx
<ConfigProvider
  theme={{
    token: {
      colorPrimary: "#1677FF",
      colorBgBase: "#F5F5F5",
      colorText: "#1F1F1F",
      colorTextSecondary: "#8C8C8C",
      colorBorder: "#E5E7EB",
    }
  }}
>
```

---

## 🧱 Step 3: Define Property Colors

Add:

```ts
export const propertyColors = {
  ocean: "#1677FF",
  hillside: "#5B76B2",
  homestay: "#D45500"
};
```

---

## 🧱 Step 4: Apply to Calendar Events

Ensure calendar events use:

* background color based on property
* white text
* rounded corners

---

## 🧱 Step 5: Apply UI Rules

* Background = Neutral (#F5F5F5)
* Card = white
* Border = light gray
* Avoid pure black
* Use spacing and soft shadows

---

## ❗ Important

* Do NOT use random Tailwind colors
* Always use colors from theme.ts
* Keep UI consistent across components

---

## 🧪 Output

* theme.ts
* updated layout.tsx with ConfigProvider
* example usage in calendar event styling
