import React from "react";
// @ts-ignore
import { Bar } from "@aragon/ui";
import ConnectButton from "./ConnectButton";
import logo from "../assets/logo.png";

export default function NavBar() {
  return (
    <Bar
      primary={<img style={{ width: 30 }} src={logo} alt="logo" />}
      secondary={<ConnectButton />}
    />
  );
}
