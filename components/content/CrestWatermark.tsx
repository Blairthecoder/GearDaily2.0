export function CrestWatermark({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 200 240"
      fill="none"
      aria-hidden="true"
      className={className}
    >
      <path
        d="M100 8 190 40v70c0 70-52 112-90 122-38-10-90-52-90-122V40L100 8Z"
        stroke="currentColor"
        strokeWidth="3"
      />
      <path d="M100 40v150" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
      <path d="M70 58h60" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
      <path
        d="M55 140c0 22 20 38 45 44 25-6 45-22 45-44"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
      />
    </svg>
  );
}
