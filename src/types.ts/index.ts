export * from "./proposal";

declare global {
  interface Window {
    ethereum: any;
  }
}
