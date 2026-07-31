import Image from "next/image";
import Shinchan from "../public/shinchan.jpg";
import {Bell, LucidePhoneCall} from "lucide-react";
import {Dancing_Script} from "next/font/google";

const dancingScript = Dancing_Script({
    subsets: ["latin"],
    weight: ["400", "700"],
    variable: "--font-signature",
});

export function ChatCard() {
    return (
        <div
            className="w-full h-34 flex flex-col justify-between items-start rounded-4xl bg-sky-300/20 bg-[url('/bg.jpg')] bg-center opacity-60 p-4 scale-95">
            <div className="flex w-full items-center justify-between">
                <div className={`flex justify-center text-center items-center space-x-3`}>
                    <Image
                        src={Shinchan}
                        alt=""
                        height={50}
                        width={50}
                        className="rounded-full"
                    />
                    <h1 className={`text-xl ${dancingScript.className}`}>Sagar Khatri</h1>
                </div>
                <div className="bg-zinc-800 rounded-full h-10 w-10 flex items-center justify-center">
                    <Bell size={18}/>
                </div>
            </div>
            <div className={`flex justify-between w-full text-sm`}>
                <p className="text-sm  text-center font-semibold bg-zinc-800 rounded-3xl px-4 py-2 truncate max-w-[200px]">
                    Wanna meet.wqycgeuqcbyeicqievcytqwvxwytv.?
                </p>
                <div className={`bg-zinc-800 rounded-full h-10 w-20 flex items-center justify-center`}>
                    <LucidePhoneCall/>
                </div>

            </div>
        </div>
    );
}