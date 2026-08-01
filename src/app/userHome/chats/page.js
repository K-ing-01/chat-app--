"use client";

import {useState, useRef} from "react";
import Image from "next/image";
import Shinchan from "../../../../public/shinchan.jpg";
import {Dancing_Script, Manrope, JetBrains_Mono} from "next/font/google";
import {Phone, Video, MoreHorizontal, Send, Paperclip, Search, Check, CheckCheck} from "lucide-react";

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

const CONVERSATIONS = [
    {
        id: "sagar",
        name: "Sagar Khatri",
        preview: "Yeah, sounds good — what time?",
        time: "2m",
        online: true,
        unread: 0,
        active: true,
    },
    {
        id: "priya",
        name: "Priya Menon",
        preview: "Sent the files, check inbox",
        time: "1h",
        online: false,
        unread: 3,
        active: false,
    },
    {
        id: "arjun",
        name: "Arjun Rao",
        preview: "Let's do Thursday instead",
        time: "3h",
        online: true,
        unread: 0,
        active: false,
    },
    {
        id: "neha",
        name: "Neha Kapoor",
        preview: "Haha no way 😂",
        time: "1d",
        online: false,
        unread: 1,
        active: false,
    },
];

const MESSAGES = [
    {id: 1, from: "them", text: "Hey! Are we still on for later?", time: "10:41 AM"},
    {id: 2, from: "them", text: "No rush, just checking", time: "10:41 AM"},
    {id: 3, from: "me", text: "Yeah, sounds good", time: "10:44 AM"},
    {id: 4, from: "me", text: "What time works for you?", time: "10:44 AM", status: "seen"},
];


export default function Chat() {
    const [tab, setTab] = useState("all");
    const scrollRef = useRef(null);


    const visibleConversations =
        tab === "unread" ? CONVERSATIONS.filter((c) => c.unread > 0) : CONVERSATIONS;

    // group consecutive messages from the same sender to tighten spacing,
    // and only surface a timestamp at the end of each cluster
    const groups = MESSAGES.reduce((acc, msg, i) => {
        const prev = MESSAGES[i - 1];
        if (prev && prev.from === msg.from) {
            acc[acc.length - 1].push(msg);
        } else {
            acc.push([msg]);
        }
        return acc;
    }, []);

    return (
        <div
            className={`${manrope.variable} ${mono.variable} font-sans relative flex w-full h-screen bg-[#F0EFF7] text-[#221F2E] p-4 gap-4 overflow-hidden`}
        >
            {/* Ambient depth — signature soft blobs, purely decorative */}
            <div
                aria-hidden
                className="pointer-events-none absolute -top-32 -left-24 h-96 w-96 rounded-full bg-[#6C6FF5]/20 blur-[100px]"
            />
            <div
                aria-hidden
                className="pointer-events-none absolute -bottom-40 right-10 h-[28rem] w-[28rem] rounded-full bg-[#FF9D6C]/10 blur-[120px]"
            />

            {/* Sidebar */}
            <div
                className="relative w-[340px] shrink-0 rounded-[32px] bg-[#F5F4FA] shadow-[0_1px_0_rgba(255,255,255,0.8)_inset,0_10px_30px_-8px_rgba(91,95,239,0.12)] flex flex-col overflow-hidden">
                <div className="px-6 pt-8 pb-5">
                    <h1 className="text-2xl font-bold tracking-tight">Messages</h1>
                </div>

                <div className="px-6 pb-4">
                    <div className="relative">
                        <Search
                            size={16}
                            className="absolute left-4 top-1/2 -translate-y-1/2 text-[#9490A3]"
                        />
                        <input
                            placeholder="Search"
                            aria-label="Search conversations"
                            className="w-full bg-white py-3 pl-10 pr-4 text-sm rounded-2xl outline-none placeholder:text-[#9490A3] shadow-[0_1px_2px_rgba(34,31,46,0.05),0_6px_16px_-6px_rgba(34,31,46,0.08)] focus-visible:shadow-[0_0_0_2px_#5B5FEF] transition-shadow"
                        />
                    </div>
                </div>

                {/* Tabs */}
                <div className="px-6 pb-4 flex gap-2">
                    {[
                        {key: "all", label: "All"},
                        {key: "unread", label: "Unread"},
                    ].map((t) => (
                        <button
                            key={t.key}
                            onClick={() => setTab(t.key)}
                            className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-colors focus-visible:outline-2 focus-visible:outline-[#5B5FEF] ${
                                tab === t.key
                                    ? "bg-[#221F2E] text-white"
                                    : "bg-white text-[#9490A3] hover:text-[#221F2E]"
                            }`}
                        >
                            {t.label}
                            {t.key === "unread" && (
                                <span className="ml-1.5 font-mono text-[10px] opacity-70">
                                    {CONVERSATIONS.filter((c) => c.unread > 0).length}
                                </span>
                            )}
                        </button>
                    ))}
                </div>

                <div className="flex-1 overflow-y-auto px-4 pb-4 space-y-2">
                    {visibleConversations.map((c) => (
                        <button
                            key={c.id}
                            className={`w-full flex items-center gap-3 px-4 py-3.5 rounded-3xl text-left transition-all focus-visible:outline-2 focus-visible:outline-[#5B5FEF] ${
                                c.active
                                    ? "bg-white shadow-[0_1px_1px_rgba(34,31,46,0.04),0_10px_20px_-8px_rgba(91,95,239,0.25)] border border-[#5B5FEF]/10"
                                    : "hover:bg-white hover:shadow-[0_1px_1px_rgba(34,31,46,0.04),0_10px_20px_-8px_rgba(34,31,46,0.1)]"
                            }`}
                        >
                            <div className="relative shrink-0">
                                <Image
                                    src={Shinchan}
                                    alt=""
                                    height={46}
                                    width={46}
                                    className={`rounded-2xl shadow-[0_2px_6px_rgba(34,31,46,0.15)] ${
                                        c.active ? "" : "opacity-90"
                                    }`}
                                />
                                {c.online && (
                                    <span
                                        className="absolute -bottom-1 -right-1 h-3 w-3 rounded-full bg-[#4ADE80] ring-[2.5px] ring-[#F5F4FA]"/>
                                )}
                            </div>
                            <div className="min-w-0 flex-1">
                                <p
                                    className={`text-sm truncate ${
                                        c.unread > 0 ? "font-bold" : "font-semibold"
                                    }`}
                                >
                                    {c.name}
                                </p>
                                <p
                                    className={`text-xs truncate ${
                                        c.unread > 0 ? "text-[#221F2E]/70 font-medium" : "text-[#9490A3]"
                                    }`}
                                >
                                    {c.preview}
                                </p>
                            </div>
                            <div className="flex flex-col items-end gap-1.5 shrink-0">
                                <span className="font-mono text-[10px] text-[#9490A3]">{c.time}</span>
                                {c.unread > 0 && (
                                    <span
                                        className="h-5 min-w-5 px-1 rounded-full bg-gradient-to-br from-[#6C6FF5] to-[#5257E5] text-white text-[10px] font-mono font-semibold flex items-center justify-center">
                                        {c.unread}
                                    </span>
                                )}
                            </div>
                        </button>
                    ))}
                </div>
            </div>

            {/* Main chat panel */}
            <div
                className="relative flex-1 flex flex-col rounded-[32px] bg-[#F5F4FA] shadow-[0_1px_0_rgba(255,255,255,0.8)_inset,0_10px_30px_-8px_rgba(91,95,239,0.12)] overflow-hidden">
                {/* Header */}
                <div className="flex items-center justify-between px-8 py-5">
                    <div className="flex items-center gap-3">
                        <div className="relative">
                            <Image
                                src={Shinchan}
                                alt=""
                                height={48}
                                width={48}
                                className="rounded-2xl shadow-[0_2px_6px_rgba(34,31,46,0.15)]"
                            />
                            <span
                                className="absolute -bottom-1 -right-1 h-3.5 w-3.5 rounded-full bg-[#4ADE80] ring-[3px] ring-[#F5F4FA]"/>
                        </div>
                        <div>
                            <h2 className={`text-2xl leading-none ${dancingScript.className}`}>
                                Sagar Khatri
                            </h2>

                        </div>
                    </div>

                    <div className="flex gap-2">
                        {[
                            {icon: Phone, label: "Call"},
                            {icon: Video, label: "Video call"},
                            {icon: MoreHorizontal, label: "More options"},
                        ].map(({icon: Icon, label}) => (
                            <button
                                key={label}
                                aria-label={label}
                                className="h-11 w-11 rounded-2xl bg-white shadow-[0_1px_1px_rgba(34,31,46,0.04),0_6px_16px_-6px_rgba(34,31,46,0.12)] hover:shadow-[0_1px_1px_rgba(34,31,46,0.04),0_8px_20px_-6px_rgba(91,95,239,0.3)] active:shadow-[0_1px_2px_rgba(34,31,46,0.15)_inset] transition-shadow flex items-center justify-center focus-visible:outline-2 focus-visible:outline-[#5B5FEF]"
                            >
                                <Icon size={16} strokeWidth={2}/>
                            </button>
                        ))}
                    </div>
                </div>

                {/* Message body */}
                <div
                    ref={scrollRef}
                    className="flex-1 overflow-y-auto px-8 py-6 space-y-4 bg-white/40 mx-4 rounded-[28px] shadow-[0_2px_8px_rgba(34,31,46,0.05)_inset]"
                >
                    <p className="text-center font-mono text-[10px] uppercase tracking-wider text-[#9490A3] pt-2">
                        Today
                    </p>

                    {groups.map((group, gi) => (
                        <div key={gi} className="space-y-1">
                            {group.map((msg, mi) => {
                                const isMe = msg.from === "me";
                                const isLastInGroup = mi === group.length - 1;
                                return (
                                    <div
                                        key={msg.id}
                                        className={`max-w-sm text-sm px-5 py-3 rounded-[22px] ${
                                            isMe
                                                ? `ml-auto bg-gradient-to-br from-[#6C6FF5] to-[#5257E5] text-white shadow-[0_1px_1px_rgba(255,255,255,0.15)_inset,0_10px_20px_-8px_rgba(91,95,239,0.5)] ${
                                                    isLastInGroup ? "rounded-tr-lg" : ""
                                                }`
                                                : `bg-white shadow-[0_1px_1px_rgba(34,31,46,0.04),0_8px_16px_-8px_rgba(34,31,46,0.15)] ${
                                                    isLastInGroup ? "rounded-tl-lg" : ""
                                                }`
                                        }`}
                                    >
                                        {msg.text}
                                    </div>
                                );
                            })}
                            <div
                                className={`flex items-center gap-1 px-1 ${
                                    group[0].from === "me" ? "justify-end" : "justify-start"
                                }`}
                            >
                                <span className="font-mono text-[10px] text-[#9490A3]">
                                    {group[group.length - 1].time}
                                </span>
                                {group[group.length - 1].status === "seen" && (
                                    <CheckCheck size={12} className="text-[#5B5FEF]"/>
                                )}
                            </div>
                        </div>
                    ))}


                </div>

                {/* Input footer */}
                <div className="flex items-center gap-3 px-8 py-5">
                    <button
                        aria-label="Attach file"
                        className="text-[#9490A3] hover:text-[#221F2E] transition-colors focus-visible:outline-2 focus-visible:outline-[#5B5FEF] rounded-lg"
                    >
                        <Paperclip size={20}/>
                    </button>
                    <input
                        placeholder="Type a message..."
                        aria-label="Type a message"
                        className="flex-1 bg-white text-sm rounded-full px-5 py-3.5 outline-none placeholder:text-[#9490A3] shadow-[0_1px_1px_rgba(34,31,46,0.04),0_8px_16px_-8px_rgba(34,31,46,0.1)_inset] focus-visible:shadow-[0_0_0_2px_#5B5FEF] transition-shadow"
                    />
                    <button
                        aria-label="Send message"
                        className="h-12 w-12 rounded-2xl bg-gradient-to-br from-[#6C6FF5] to-[#5257E5] hover:shadow-[0_10px_20px_-6px_rgba(91,95,239,0.5)] active:shadow-[0_1px_2px_rgba(255,255,255,0.2)_inset] transition-shadow flex items-center justify-center shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#5B5FEF]"
                    >
                        <Send size={16} className="text-white"/>
                    </button>
                </div>
            </div>
        </div>
    );
}