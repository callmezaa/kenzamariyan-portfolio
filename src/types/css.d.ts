import type { MotionValue } from "framer-motion";

declare module "react" {
  interface CSSProperties {
    [key: `--${string}`]:
      | string
      | number
      | MotionValue<string>
      | MotionValue<number>
      | undefined;
  }
}
