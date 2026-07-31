"use client";
import Shinchan from "../../.././public/shinchan.jpg";
import {useEffect, useState} from "react";
import Image from "next/image";
import {CloudSun, Plus, Bell} from "lucide-react";
import {Dancing_Script, Manrope, JetBrains_Mono} from "next/font/google";
import NoteCard from "../../../components/NoteCard";

const dancingScript = Dancing_Script({
    subsets: ["latin"],
    weight: ["600"],
    variable: "--font-signature",
});

const manrope = Manrope({
    subsets: ["latin"],
    weight: ["400", "500", "600", "700"],
    variable: "--font-body",
});

const mono = JetBrains_Mono({
    subsets: ["latin"],
    weight: ["400", "500"],
    variable: "--font-mono",
});

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
        {id: "n6", title: "Morning", date: parts.day + " " + parts.month, description: "Coffee first\nCode second"},
        {id: "n7", title: "Morning", date: parts.day + " " + parts.month, description: "Coffee first\nCode second"},
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
        <div
            className={`${manrope.variable} ${mono.variable} font-sans flex h-screen w-full bg-[#F0EFF7] text-[#221F2E] p-4 gap-4`}
        >
            {/* LEFT PANEL — no scroll */}
            <div className="w-[320px] shrink-0 flex flex-col gap-4">

                {/* DATE */}
                <div
                    className="rounded-[28px] bg-[#F5F4FA] p-6 shadow-[0_1px_0_rgba(255,255,255,0.8)_inset,0_10px_30px_-8px_rgba(91,95,239,0.12)]">
                    <div className="flex items-baseline justify-between">
                        <h1 className="text-4xl font-bold tracking-tight">{parts.day || "--"}</h1>
                        <span className="font-mono text-[10px] uppercase tracking-wider text-[#9490A3]">
                            {parts.weekday}
                        </span>
                    </div>
                    <p className="text-sm text-[#9490A3] mt-1">{parts.month} {parts.year}</p>

                    <div className="mt-4 pt-4 border-t border-[#221F2E]/[0.06] flex items-center justify-between">
                        <h2 className="font-mono text-xl font-medium text-[#5B5FEF] tabular-nums">
                            {parts.time || "--:--:--"}
                        </h2>
                        <span className="font-mono text-[9px] text-[#9490A3] uppercase tracking-widest">IST</span>
                    </div>
                </div>

                {/* REMINDER */}
                <div
                    className="rounded-[28px] bg-[#F5F4FA] p-6 shadow-[0_1px_0_rgba(255,255,255,0.8)_inset,0_10px_30px_-8px_rgba(91,95,239,0.12)]">
                    <div className="flex items-center gap-2 mb-2">
                        <div
                            className="h-6 w-6 rounded-lg bg-white shadow-[0_1px_1px_rgba(34,31,46,0.04),0_4px_10px_-4px_rgba(91,95,239,0.3)] flex items-center justify-center">
                            <Bell size={12} className="text-[#5B5FEF]"/>
                        </div>
                        <h2 className="font-mono text-[10px] font-medium text-[#9490A3] uppercase tracking-wider">
                            Today's reminder
                        </h2>
                    </div>
                    <p className="text-sm text-[#221F2E]/80 leading-relaxed">You have to go...</p>
                </div>

                {/* PROFILE */}
                <div
                    className="flex-1 min-h-0 rounded-[28px] bg-[#F5F4FA] p-6 shadow-[0_1px_0_rgba(255,255,255,0.8)_inset,0_10px_30px_-8px_rgba(91,95,239,0.12)] flex flex-col items-center justify-center gap-4">

                    <Image
                        src={Shinchan}
                        alt="Profile picture"
                        width={160}
                        height={160}
                        className="rounded-[26px] object-cover shadow-[0_2px_6px_rgba(34,31,46,0.15)]"
                    />

                    <div className="text-center">
                        <p className={`text-2xl leading-none ${dancingScript.className} text-[#5B5FEF]`}>
                            Welcome,
                        </p>
                        <h1 className="text-xl font-bold mt-1">Sagar</h1>
                    </div>

                    <div
                        className="flex items-center gap-2 bg-white rounded-2xl px-4 py-2.5 shadow-[0_1px_1px_rgba(34,31,46,0.04),0_6px_16px_-6px_rgba(34,31,46,0.1)]">
                        <CloudSun size={16} className="text-amber-400"/>
                        <span className="text-sm font-semibold">36°C</span>
                        <span className="font-mono text-[10px] text-[#9490A3] uppercase tracking-wider">Cloudy</span>
                    </div>
                </div>

            </div>

            {/* NOTES */}
            <div
                className="flex-1 flex flex-col rounded-[32px] bg-[#F5F4FA] p-6 shadow-[0_1px_0_rgba(255,255,255,0.8)_inset,0_10px_30px_-8px_rgba(91,95,239,0.12)] min-h-0">

                <div className="flex justify-between items-center mb-5 shrink-0">
                    <div>
                        <h1 className={`text-3xl leading-none ${dancingScript.className}`}>My Notes</h1>
                        <p className="font-mono text-[10px] text-[#9490A3] uppercase tracking-wider mt-2">
                            {notes.length} notes
                        </p>
                    </div>

                    <button
                        className="flex items-center gap-1.5 rounded-2xl bg-gradient-to-br from-[#6C6FF5] to-[#5257E5] px-5 py-3 text-sm font-semibold text-white shadow-[0_1px_1px_rgba(255,255,255,0.15)_inset,0_10px_20px_-8px_rgba(91,95,239,0.5)] hover:shadow-[0_1px_1px_rgba(255,255,255,0.15)_inset,0_12px_24px_-6px_rgba(91,95,239,0.6)] active:shadow-[0_1px_2px_rgba(255,255,255,0.2)_inset] transition-shadow">
                        <Plus size={16}/>
                        New note
                    </button>
                </div>

                <div
                    className="flex-1 min-h-0 overflow-y-auto pr-1 bg-white/40 rounded-[24px] shadow-[0_2px_8px_rgba(34,31,46,0.05)_inset] p-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
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
        </div>
    );
}