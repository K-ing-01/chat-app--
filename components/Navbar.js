"use client";

import {Car, HomeIcon, MessageCircleIcon, Network} from "lucide-react";
import {usePathname} from "next/navigation";
import Link from "next/link";

export default function Navbar() {
    const pathName = usePathname();
    const links = [
        {link: "/userHome", label: <HomeIcon/>},
        {link: "/userHome/chats", label: <MessageCircleIcon/>},
        {link: "/userHome/stories", label: <Network/>},
        {link: "/userHome/trips", label: <Car/>},
    ];

    return (
        <nav className="navbar fixed bottom-5 -translate-x-1/2 left-1/2 ">
            <div className="items flex space-x-2 text-zinc-500 bg-zinc-800 pb-2 pt-2 pr-3 pl-3 rounded-3xl">
                {links.map((link) => {
                    const isActive = pathName === link.link;

                    return (
                        <Link
                            href={link.link}
                            key={link.link}
                            className={`home hover:cursor-pointer h-10 w-18 flex items-center justify-center hover:bg-zinc-900 hover:rounded-3xl transition-all duration-400 ${
                                isActive ? "text-white bg-zinc-900 rounded-3xl" : ""
                            }`}
                        >
                            {link.label}
                        </Link>
                    );
                })}
            </div>
        </nav>
    );
}