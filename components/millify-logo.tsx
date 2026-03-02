import { SpinningWindmill } from "@/components/windmill";

/** Windmill icon only — for terminal header and other compact spots */
export function MillifyLogoIcon({ size = 1.5 }: { size?: number }) {
  return <SpinningWindmill size={size} />;
}

export function MillifyLogo() {
  return (
    <div className="flex items-baseline gap-0.5">
      <SpinningWindmill size={1.5} />
      <span
        style={{
          fontFamily: 'var(--font-plus-jakarta), "Plus Jakarta Sans", sans-serif',
          fontWeight: 700,
          fontSize: "2rem",
          letterSpacing: "-0.02em",
          color: "var(--accent-champagne)",
        }}
      >
        millify.dev
      </span>
    </div>
  );
}
