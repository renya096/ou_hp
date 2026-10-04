import type { ComponentProps } from "react";

/**
 * 自社ラインピクトグラム。統一ストローク1.5px、24pxグリッド。
 * 業務固有のモチーフ（誘導棒・コーン・規制看板・イヤホン・モップ）を自作し、既製アイコンセットは使わない。
 */
export type IconName =
  | "cone" | "baton" | "road" | "crowd" | "earpiece" | "broom" | "home" | "grass"
  | "phone" | "line" | "mail" | "arrow" | "check" | "clock" | "pin" | "doc" | "shield-off"
  | "plus" | "menu" | "close" | "external" | "users" | "calendar" | "report" | "wallet" | "car" | "globe";

const paths: Record<IconName, React.ReactNode> = {
  cone: <><path d="M9 4h6l4 15H5L9 4Z" /><path d="M7.5 12h9" /><path d="M3 19h18" /></>,
  baton: <><path d="M6 20 18 8" /><path d="m15 5 4 4" /><path d="M16.5 3.5 20.5 7.5" /><path d="M5 17l2 2" /></>,
  road: <><path d="M4 21 9 3h6l5 18" /><path d="M12 7v2M12 12v2M12 17v2" /></>,
  crowd: <><circle cx="8" cy="8" r="2.5" /><circle cx="16" cy="8" r="2.5" /><path d="M3 20v-2a4 4 0 0 1 4-4h2a4 4 0 0 1 4 4v2" /><path d="M13 14h2a4 4 0 0 1 4 4v2" /></>,
  earpiece: <><path d="M9 11a5 5 0 1 1 7.5 4.3" /><path d="M16.5 15.3 15 21" /><path d="M10 13.5v3.5a1.5 1.5 0 0 1-3 0" /></>,
  broom: <><path d="M14 3 9 12" /><path d="M9 12c-2.5 1.5-4 4-4.5 8h10c0-3.5-1.5-6.5-5.5-8Z" /><path d="M7 16h6" /></>,
  home: <><path d="M4 11 12 4l8 7" /><path d="M6 10v10h12V10" /><path d="M10 20v-5h4v5" /></>,
  grass: <><path d="M3 20c2-4 3-7 3-11 1 3 2 6 2 11" /><path d="M9 20c1-4 2-7 3-10 1 3 2 6 3 10" /><path d="M16 20c0-4 1-7 2-10 1 3 2 6 3 10" /><path d="M2 20h20" /></>,
  phone: <><path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2Z" /></>,
  line: <><path d="M12 4C7 4 3 7.2 3 11.2c0 3.5 3 6.4 7.2 7l-.4 2.8c0 .2.3.4.5.2L14 18.5c3.9-.7 7-3.6 7-7.3C21 7.2 17 4 12 4Z" /><path d="M8 10v3M11 10v3l2-3v3M15.5 10v3h1.5" /></>,
  mail: <><rect x="3" y="5" width="18" height="14" rx="1.5" /><path d="m3 7 9 6 9-6" /></>,
  arrow: <><path d="M5 12h14" /><path d="m13 6 6 6-6 6" /></>,
  check: <><path d="m5 12 4.5 4.5L19 7" /></>,
  clock: <><circle cx="12" cy="12" r="8.5" /><path d="M12 7v5l3.5 2" /></>,
  pin: <><path d="M12 21s-6-5.5-6-11a6 6 0 0 1 12 0c0 5.5-6 11-6 11Z" /><circle cx="12" cy="10" r="2" /></>,
  doc: <><path d="M7 3h7l4 4v14H7Z" /><path d="M14 3v4h4" /><path d="M9.5 12h5M9.5 16h5" /></>,
  "shield-off": <><path d="M12 3 5 6v6c0 4 3 7.5 7 9 4-1.5 7-5 7-9V6l-7-3Z" /><path d="m5 5 14 14" /></>,
  plus: <><path d="M12 5v14M5 12h14" /></>,
  menu: <><path d="M4 7h16M4 12h16M4 17h16" /></>,
  close: <><path d="m6 6 12 12M18 6 6 18" /></>,
  external: <><path d="M14 4h6v6" /><path d="M20 4 10 14" /><path d="M18 13v6H5V6h6" /></>,
  users: <><circle cx="9" cy="8" r="3" /><path d="M3 20a6 6 0 0 1 12 0" /><path d="M16 4.5a3 3 0 0 1 0 6" /><path d="M17.5 14.5A6 6 0 0 1 21 20" /></>,
  calendar: <><rect x="3" y="5" width="18" height="16" rx="1.5" /><path d="M3 10h18M8 3v4M16 3v4" /></>,
  report: <><path d="M5 20V9l7-5 7 5v11" /><path d="M9 20v-6h6v6" /><path d="M12 11.5v.5" /></>,
  wallet: <><rect x="3" y="7" width="18" height="12" rx="1.5" /><path d="M3 10h18" /><path d="M16 14.5h2" /></>,
  car: <><path d="M4 15v-3l2-5h12l2 5v3" /><path d="M3 15h18v3H3Z" /><circle cx="7.5" cy="18" r="1.5" /><circle cx="16.5" cy="18" r="1.5" /></>,
  globe: <><circle cx="12" cy="12" r="8.5" /><path d="M3.5 12h17M12 3.5c3 3 3 14 0 17M12 3.5c-3 3-3 14 0 17" /></>,
};

export function Icon({ name, size = 24, className = "", ...rest }: { name: IconName; size?: number; className?: string } & ComponentProps<"svg">) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className={className} {...rest}>
      {paths[name]}
    </svg>
  );
}
