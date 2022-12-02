import { Core } from "@akrc/nashi";
import { lazyFn } from "./src";

declare global {
  interface Window {
    nashi: Core
    nashiLazy: typeof lazyFn
  }
}