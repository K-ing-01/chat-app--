import Image from "next/image";
import Shinchan from "../../../../public/shinchan.jpg";
import {Dancing_Script, Manrope, JetBrains_Mono} from "next/font/google";
import {Phone, Video, Send, Paperclip, Search} from "lucide-react";

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

export default function Chat() {
    return (
        <div
            className={`${manrope.variable} ${mono.variable} font-sans flex w-full h-screen bg-[#F0EFF7] text-[#221F2E] p-4 gap-4`}
        >
            {/* Sidebar */}
            <div
                className="w-[340px] shrink-0 rounded-[32px] bg-[#F5F4FA] shadow-[0_1px_0_rgba(255,255,255,0.8)_inset,0_10px_30px_-8px_rgba(91,95,239,0.12)] flex flex-col overflow-hidden">
                <div className="px-6 pt-8 pb-5">
                    <h1 className="text-2xl font-bold tracking-tight">Messages</h1>
                    <p className="font-mono text-[11px] uppercase tracking-wider text-[#9490A3] mt-1">
                        2 conversations
                    </p>
                </div>

                <div className="px-6 pb-4">
                    <div className="relative">
                        <Search
                            size={16}
                            className="absolute left-4 top-1/2 -translate-y-1/2 text-[#9490A3]"
                        />
                        <input
                            placeholder="Search"
                            className="w-full bg-white py-3 pl-10 pr-4 text-sm rounded-2xl outline-none placeholder:text-[#9490A3] shadow-[0_1px_2px_rgba(34,31,46,0.05),0_6px_16px_-6px_rgba(34,31,46,0.08)] focus:shadow-[0_0_0_2px_#5B5FEF] transition-shadow"
                        />
                    </div>
                </div>

                <div className="flex-1 overflow-y-auto px-4 pb-4 space-y-2">
                    {/* Active conversation — lifted card */}
                    <div
                        className="flex items-center gap-3 px-4 py-3.5 rounded-3xl bg-white shadow-[0_1px_1px_rgba(34,31,46,0.04),0_10px_20px_-8px_rgba(91,95,239,0.25)] border border-[#5B5FEF]/10">
                        <Image
                            src={Shinchan}
                            alt=""
                            height={46}
                            width={46}
                            className="rounded-2xl shadow-[0_2px_6px_rgba(34,31,46,0.15)]"
                        />
                        <div className="min-w-0 flex-1">
                            <p className="text-sm font-semibold truncate">Sagar Khatri</p>
                            <p className="text-xs text-[#9490A3] truncate">
                                Yeah, sounds good — what time?
                            </p>
                        </div>
                        <span className="font-mono text-[10px] text-[#9490A3] shrink-0">
              2m
            </span>
                    </div>

                    <div
                        className="flex items-center gap-3 px-4 py-3.5 rounded-3xl hover:bg-white hover:shadow-[0_1px_1px_rgba(34,31,46,0.04),0_10px_20px_-8px_rgba(34,31,46,0.1)] transition-all cursor-pointer">
                        <Image
                            src={Shinchan}
                            alt=""
                            height={46}
                            width={46}
                            className="rounded-2xl opacity-80"
                        />
                        <div className="min-w-0 flex-1">
                            <p className="text-sm font-semibold truncate">Priya Menon</p>
                            <p className="text-xs text-[#9490A3] truncate">
                                Sent the files, check inbox
                            </p>
                        </div>
                        <span className="font-mono text-[10px] text-[#9490A3] shrink-0">
              1h
            </span>
                    </div>
                </div>
            </div>

            {/* Main chat panel */}
            <div
                className="flex-1 flex flex-col rounded-[32px] bg-[#F5F4FA] shadow-[0_1px_0_rgba(255,255,255,0.8)_inset,0_10px_30px_-8px_rgba(91,95,239,0.12)] overflow-hidden">
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
                            <h2
                                className={`text-2xl leading-none ${dancingScript.className}`}
                            >
                                Sagar Khatri
                            </h2>
                            <p className="font-mono text-[10px] uppercase tracking-wider text-[#9490A3] mt-1">
                                Active now
                            </p>
                        </div>
                    </div>

                    <div className="flex gap-2">
                        <button
                            className="h-11 w-11 rounded-2xl bg-white shadow-[0_1px_1px_rgba(34,31,46,0.04),0_6px_16px_-6px_rgba(34,31,46,0.12)] hover:shadow-[0_1px_1px_rgba(34,31,46,0.04),0_8px_20px_-6px_rgba(91,95,239,0.3)] active:shadow-[0_1px_2px_rgba(34,31,46,0.15)_inset] transition-shadow flex items-center justify-center">
                            <Phone size={16} strokeWidth={2}/>
                        </button>
                        <button
                            className="h-11 w-11 rounded-2xl bg-white shadow-[0_1px_1px_rgba(34,31,46,0.04),0_6px_16px_-6px_rgba(34,31,46,0.12)] hover:shadow-[0_1px_1px_rgba(34,31,46,0.04),0_8px_20px_-6px_rgba(91,95,239,0.3)] active:shadow-[0_1px_2px_rgba(34,31,46,0.15)_inset] transition-shadow flex items-center justify-center">
                            <Video size={16} strokeWidth={2}/>
                        </button>
                    </div>
                </div>

                {/* Message body */}
                <div
                    className="flex-1 overflow-y-auto px-8 py-6 space-y-3 bg-white/40 mx-4 rounded-[28px] shadow-[0_2px_8px_rgba(34,31,46,0.05)_inset]">
                    <p className="text-center font-mono text-[10px] uppercase tracking-wider text-[#9490A3] pt-2">
                        Today
                    </p>

                    {/* Incoming — sharp top-left corner, lifted */}
                    <div
                        className="max-w-sm bg-white text-sm px-5 py-3 rounded-[22px] rounded-tl-lg shadow-[0_1px_1px_rgba(34,31,46,0.04),0_8px_16px_-8px_rgba(34,31,46,0.15)]">
                        Hey! Are we still on for later?
                    </div>

                    {/* Outgoing — sharp top-right corner, gradient + glow */}
                    <div
                        className="max-w-sm bg-gradient-to-br from-[#6C6FF5] to-[#5257E5] text-white text-sm px-5 py-3 rounded-[22px] rounded-tr-lg ml-auto shadow-[0_1px_1px_rgba(255,255,255,0.15)_inset,0_10px_20px_-8px_rgba(91,95,239,0.5)]">
                        Yeah, sounds good — what time?
                    </div>
                </div>

                {/* Input footer */}
                <div className="flex items-center gap-3 px-8 py-5">
                    <button className="text-[#9490A3] hover:text-[#221F2E] transition-colors">
                        <Paperclip size={20}/>
                    </button>
                    <input
                        placeholder="Type a message..."
                        className="flex-1 bg-white text-sm rounded-full px-5 py-3.5 outline-none placeholder:text-[#9490A3] shadow-[0_1px_1px_rgba(34,31,46,0.04),0_8px_16px_-8px_rgba(34,31,46,0.1)_inset] focus:shadow-[0_0_0_2px_#5B5FEF] transition-shadow"
                    />
                    <button
                        className="h-12 w-12 rounded-2xl bg-gradient-to-br from-[#6C6FF5] to-[#5257E5] hover:shadow-[0_10px_20px_-6px_rgba(91,95,239,0.5)] active:shadow-[0_1px_2px_rgba(255,255,255,0.2)_inset] transition-shadow flex items-center justify-center shrink-0">
                        <Send size={16} className="text-white"/>
                    </button>
                </div>
            </div>
        </div>
    );
}