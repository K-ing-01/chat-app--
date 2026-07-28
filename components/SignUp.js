import InputComp from "./Input";
import Link from "next/link";

export default function SignUp() {
    return <>
        <div className={`flex-1 justify-center flex-col items-center content-center`}>
            <h1 className={`text-4xl font-semibold`}>Welcome to Pegasus....</h1>
            <h2 className={`text-xl font-semibold text-zinc-800 mt-4 ml-4 `}>Create your account today.... 😉</h2>
            <InputComp type="text" placeholder={"Full Name"}/>
            <InputComp type="text" placeholder={"@username"}/>
            <InputComp type="text" placeholder={"Mobile Number"}/>
            <InputComp type="text" placeholder={"Email"}/>
            <InputComp type="password" placeholder={"Password"}/>
            <br/>
            <div className={` w-1/2 flex justify-between`}>
                <button
                    className={`pr-6 pl-6 pt-2 pb-2 bg-violet-600 rounded-3xl mt-6 ml-8 font-semibold hover:cursor-pointer text-zinc-300 `}>Login
                </button>
                <button
                    className={`pr-6 pl-6 pt-2 pb-2 bg bg-zinc-950 text-zinc-800 rounded-3xl mt-6 ml-12 font-semibold hover:cursor-pointer  `}>Forgot
                    Password ?
                </button>
            </div>
        </div>
    </>
}