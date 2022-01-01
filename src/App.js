import React from "react";
import { UserProvider, useUser } from "./context/user-context";
import UserSettings from "./screens/user-profile";

function UserDataDisplay() {
  const [{ user }] = useUser();
  return <pre>{JSON.stringify(user, null, 2)}</pre>;
}

function App() {
  return (
    <div
      style={{
        minHeight: 350,
        width: 300,
        backgroundColor: "#ddd",
        borderRadius: 4,
        padding: 10,
      }}
    >
      <UserProvider>
        <UserSettings />
        <UserDataDisplay />
      </UserProvider>
    </div>
  );
}

export default App;
