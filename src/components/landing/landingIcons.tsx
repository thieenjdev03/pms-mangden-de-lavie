export function IconAlbum({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden>
      <rect
        x="3"
        y="5"
        width="18"
        height="14"
        rx="2"
        stroke="currentColor"
        strokeWidth="1.5"
      />
      <circle cx="8.5" cy="10" r="1.5" fill="currentColor" />
      <path
        d="M21 15l-5-5-4 4-2-2-5 5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function IconZaloChat({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M12 3C7.03 3 3 6.58 3 11c0 2.13 1.02 4.06 2.68 5.5L3.5 20.5l4.5-1.5A8.94 8.94 0 0012 19c4.97 0 9-3.58 9-8s-4.03-8-9-8z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
      <circle cx="8.5" cy="11" r="1" fill="currentColor" />
      <circle cx="12" cy="11" r="1" fill="currentColor" />
      <circle cx="15.5" cy="11" r="1" fill="currentColor" />
    </svg>
  );
}

export function IconFacebook({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" aria-hidden>
      <path
        fill="currentColor"
        d="M24 12.073C24 5.445 18.627 0 12 0S0 5.445 0 12.073c0 5.989 4.388 10.954 10.125 11.854v-8.385H7.077V9.443h3.048V7.357c0-3.007 1.792-4.652 4.534-4.652 1.314 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.93-1.956 1.888v2.222h3.329l-.532 3.29h-2.797v8.385C19.612 23.027 24 18.062 24 12.073z"
      />
    </svg>
  );
}
