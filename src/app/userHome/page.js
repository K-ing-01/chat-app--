"use client";
import Shinchan from "../../.././public/shinchan.jpg";
import {useEffect, useState} from "react";
import {Cloudy, Snowflake} from "lucide-react";
import Image from "next/image";
import NoteCard from "../../../components/NoteCard";

export default function UserHome() {
    const [parts, setParts] = useState({
        weekday: "",
        day: "",
        month: "",
        year: "",
        time: "",
    });

    useEffect(() => {
        const updateTime = () => {
            const now = new Date();

            const weekday = new Intl.DateTimeFormat("en-IN", {
                timeZone: "Asia/Kolkata",
                weekday: "long",
            }).format(now);

            const day = new Intl.DateTimeFormat("en-IN", {
                timeZone: "Asia/Kolkata",
                day: "2-digit",
            }).format(now);

            const month = new Intl.DateTimeFormat("en-IN", {
                timeZone: "Asia/Kolkata",
                month: "long",
            }).format(now);

            const year = new Intl.DateTimeFormat("en-IN", {
                timeZone: "Asia/Kolkata",
                year: "numeric",
            }).format(now);

            const time = new Intl.DateTimeFormat("en-IN", {
                timeZone: "Asia/Kolkata",
                hour: "2-digit",
                minute: "2-digit",
                second: "2-digit",
                hour12: true,
            }).format(now);

            setParts({weekday, day, month, year, time});
        };

        updateTime();
        const interval = setInterval(updateTime, 1000);
        return () => clearInterval(interval);
    }, []);

    // Sample notes — swap these for real data whenever you wire it up
    const notes = [
        {
            id: "n1",
            title: "Ideas",
            date: parts.day + " " + parts.month,
            description: "Refactor the axios interceptor\nCheck CORS on Railway"
        },
        {
            id: "n2",
            title: "Reminder",
            date: parts.day + " " + parts.month,
            description: "Buy groceries\nCall mom tonight"
        },
        {
            id: "n3",
            title: "TODO",
            date: parts.day + " " + parts.month,
            description: "Fix logout double-call bug\nShip auth flow"
        },
        {id: "n4", title: "Morning", date: parts.day + " " + parts.month, description: "Coffee first\nCode second"},
        {
            id: "n5",
            title: "TODO",
            date: parts.day + " " + parts.month,
            description: "Fix logout double-call bug\nShip auth flow"
        },
        {
            id: "n6",
            title: "Morning",
            date: parts.day + " " + parts.month,
            description: "Coffee first\nCode second"
        }, {id: "n7", title: "Morning", date: parts.day + " " + parts.month, description: "Coffee first\nCode second"},
        {id: "n8", title: "Morning", date: parts.day + " " + parts.month, description: "Coffee first\nCode second"},
        {id: "n9", title: "Morning", date: parts.day + " " + parts.month, description: "Coffee first\nCode second"},
        {id: "n10", title: "Morning", date: parts.day + " " + parts.month, description: "Coffee first\nCode second"},
        {id: "n11", title: "Morning", date: parts.day + " " + parts.month, description: "Coffee first\nCode second"},
        {id: "n12", title: "Morning", date: parts.day + " " + parts.month, description: "Coffee first\nCode second"},
        {id: "n13", title: "Morning", date: parts.day + " " + parts.month, description: "Coffee first\nCode second"},
        {id: "n14", title: "Morning", date: parts.day + " " + parts.month, description: "Coffee first\nCode second"},
        {id: "n15", title: "Morning", date: parts.day + " " + parts.month, description: "Coffee first\nCode second"},
        {id: "n16", title: "Morning", date: parts.day + " " + parts.month, description: "Coffee first\nCode second"},
    ];

    return (

        <div className="flex h-[calc(100vh-70px)] gap-5 p-5 bg-zinc-950">

            {/* LEFT PANEL */}
            <div className="w-[340px] flex flex-col gap-5">

                {/* DATE */}
                <div className="rounded-3xl bg-zinc-900 border border-zinc-800 p-6 shadow-lg">
                    <h1 className="text-5xl font-bold text-white">
                        {parts.day}
                    </h1>

                    <p className="text-xl text-zinc-300 mt-1">
                        {parts.month} {parts.year}
                    </p>

                    <p className="mt-3 text-zinc-500 font-medium">
                        {parts.weekday}
                    </p>

                    <h2 className="mt-6 text-3xl font-semibold text-blue-400">
                        {parts.time}
                    </h2>
                </div>

                {/* REMINDER */}
                <div className="rounded-3xl bg-zinc-900 border border-zinc-800 p-5">
                    <h2 className="font-semibold text-lg mb-3">
                        Today's Reminder
                    </h2>

                    <p className="text-zinc-400">
                        You have to go...
                    </p>
                </div>

                {/* PROFILE */}
                <div className="rounded-3xl bg-zinc-900 border border-zinc-800 p-5 flex flex-col items-center">

                    <Image
                        src={Shinchan}
                        alt=""
                        width={220}
                        height={220}
                        className="rounded-3xl object-cover"
                    />

                    <h1 className="text-2xl font-bold mt-5">
                        Welcome, Sagar
                    </h1>

                    <div className="mt-4 flex items-center gap-3">

                        <Snowflake className="text-sky-400"/>

                        <span className="text-xl font-semibold">
                        36°C
                    </span>

                        <Cloudy className="text-zinc-400"/>

                    </div>
                </div>

            </div>

            {/* NOTES */}
            <div className="flex-1 rounded-3xl bg-zinc-900 border border-zinc-800 p-6">

                <div className="flex justify-between items-center mb-6">

                    <h1 className="text-3xl font-bold">
                        My Notes
                    </h1>

                    <button className="bg-blue-600 hover:bg-blue-500 transition px-5 py-2 rounded-xl">
                        + New Note
                    </button>

                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">

                    {notes.map((n) => (
                        <NoteCard
                            key={n.id}
                            seed={n.id}
                            title={n.title}
                            date={n.date}
                            description={n.description}
                        />
                    ))}

                </div>

            </div>

        </div>

    );
}