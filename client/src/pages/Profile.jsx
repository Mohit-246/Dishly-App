import React, { useContext } from "react";
import { AuthContext } from "../context/AuthContext.jsx";

export default function Profile() {
  const { user } = useContext(AuthContext);
  return (
    <>
      <div>
        <div>
          <h2>{user.name}</h2>
        </div>
      </div>
    </>
  );
}
