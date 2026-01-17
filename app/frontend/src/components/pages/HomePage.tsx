import { useState } from "react";
import { type Lobby } from "../util/types";

function generateCode() {
    return Math.random().toString(36).substring(2, 8).toUpperCase();
}

export default function HomePage({
    onJoin,
}: {
    onJoin: (lobby: Lobby) => void;
}) {
    const [groupName, setGroupName] = useState("");
    const [joinCode, setJoinCode] = useState("");

    return (
    <div className="max-w-xl mx-auto bg-white rounded-xl shadow p-6">
        <h1 className="text-2xl font-semibold mb-2">
            Group Availability Board
        </h1>
        <p className="text-gray-500 mb-6">
            Create or join a group using an invite code
        </p>

        {/* Create lobby */}
        <div className="border rounded p-4 mb-4">
            <h2 className="font-semibold mb-2">Create Group</h2>
            <input
            placeholder="Group name"
            className="border w-full mb-2 px-2 py-1"
            value={groupName}
            onChange={e => setGroupName(e.target.value)} />

            <button
                className="bg-black text-white px-3 py-1 rounded w-full"
                onClick={() =>
                onJoin({
                    name: groupName || "My Group",
                    code: generateCode(),
                })}>
                    Create Group
            </button>
        </div>

        {/* Join lobby */}
        <div className="border rounded p-4">
            <h2 className="font-semibold mb-2">Join Group</h2>
            <input
                placeholder="Invite code"
                className="border w-full mb-2 px-2 py-1 uppercase"
                value={joinCode}
                onChange={e => setJoinCode(e.target.value)} />
            <button
                className="bg-gray-800 text-white px-3 py-1 rounded w-full"
                onClick={() =>
                onJoin({
                    name: "Joined Group",
                    code: joinCode.toUpperCase(),
                })}>
                    Join Group
            </button>
        </div>
    </div>
    );
}
