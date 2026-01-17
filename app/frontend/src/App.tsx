import { useState } from "react";
import HomePage from "./components/pages/HomePage";
import CalendarPage from "./components/pages/CalendarPage";
import type { Lobby } from "./components/util/types";


export default function App() {
  const [lobby, setLobby] = useState<Lobby | null>(null);

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      {!lobby ? (
        <HomePage onJoin={setLobby} />
      ) : (
        <CalendarPage lobby={lobby} onLeave={() => setLobby(null)} />
      )}
    </div>
  );
}
