"use client";
import Bunny from "../../public/bunny.jpg";
import Image from "next/image";

import InputComp from "../../components/Input";
import Login from "../../components/Login";
import SignUp from "../../components/SignUp";
import {useState} from "react";


export default function Home() {
    const [isLoginSelected, setIsLoginSelected] = useState(true);

    return (
        <div className={`flex w-full`}>
            <div className={`flex-1`}><Image src={Bunny} alt="" className={`rounded-4xl p-4 `} height={800}
                                             width={600}/>
            </div>
            <div className={`flex-1 justify-center flex-col items-center content-center`}>

                {isLoginSelected ? <Login/> : <SignUp/>}
                <p className={`text-sm text-zinc-800 font-bold ml-6 mt-8`}>or Doesnt have an account..? Create One
                    here <span onClick={() => setIsLoginSelected(!isLoginSelected)}
                               className={`underline decoration-2 hover:cursor-pointer`}> {isLoginSelected ? "Sign Up" : "Login"}</span>
                </p>

            </div>
        </div>
    );
}
