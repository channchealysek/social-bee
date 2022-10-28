import React, { useContext } from "react";
import { AuthContext } from "../../utils/auth";

export default function UserStores() {
  const { user } = useContext(AuthContext);
  if (!user) window.location.assign("/");
  return (
    <h1>
      This will view online store page for user if they paid for subcription...{" "}
      <br /> Soon...
    </h1>
  );
}
