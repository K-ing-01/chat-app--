"use client";

import InputComp from "./Input";
import {useRouter} from "next/navigation";
import {useState} from "react";
import {authService} from "./apis/auth/authService";

export default function Login() {
    const router = useRouter();
    const [formData, setFormData] = useState({email: "", password: ""});
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        setFormData((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setLoading(true);
        try {
            await authService.login(formData);
            router.replace("/userHome");
        } catch (err) {
            setError(err.message || "Login Failed, please try again");
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <h1 className="text-6xl font-semibold">Welcome back....</h1>
            <h2 className="text-xl font-semibold text-zinc-800 mt-4 ml-4">
                Login in you account now 😉
            </h2>

            {error && <p className="text-red-500 text-sm mt-2 ml-8">{error}</p>}

            <InputComp
                type="text"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
            />
            <InputComp
                type="password"
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
            />
            <br/>

            <div className="w-1/2 flex justify-between">
                <button
                    type="submit"
                    disabled={loading}
                    className="pr-6 pl-6 pt-2 pb-2 bg-violet-600 rounded-3xl mt-6 ml-8 font-semibold hover:cursor-pointer text-zinc-300 disabled:opacity-60 disabled:cursor-not-allowed"
                >
                    {loading ? "Logging in..." : "Login"}
                </button>
                <button
                    type="button"
                    className="pr-6 pl-6 pt-2 pb-2 bg bg-zinc-950 text-zinc-800 rounded-3xl mt-6 ml-12 font-semibold hover:cursor-pointer"
                >
                    Forgot Password ?
                </button>
            </div>
        </form>
    );
}
