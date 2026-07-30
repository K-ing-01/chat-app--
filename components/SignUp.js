"use client";

import InputComp from "./Input";
import {useState} from "react";
import {authService} from "./apis/auth/authService";

export default function SignUp({onSuccess}) {
    const [isLoading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        fullName: "",
        username: "",
        mobileNumber: "",
        email: "",
        password: "",
    });
    const [error, setError] = useState("");

    const handleChange = (e) => {
        setFormData((prevState) => ({...prevState, [e.target.name]: e.target.value}));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setLoading(true);

        try {
            await authService.register(formData);
            onSuccess?.(); // switch back to Login view instead of routing to a non-existent page
        } catch (err) {
            setError(err.message || "Signup failed. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="flex-1 justify-center flex-col items-center content-center">
            <h1 className="text-4xl font-semibold">Welcome to Pegasus....</h1>
            <h2 className="text-xl font-semibold text-zinc-800 mt-4 ml-4">
                Create your account today.... 😉
            </h2>

            {error && <p className="text-red-500 text-sm mt-2 ml-8">{error}</p>}

            <InputComp type="text" name="fullName" placeholder="Full Name" value={formData.fullName}
                       onChange={handleChange}/>
            <InputComp type="text" name="username" placeholder="@username" value={formData.username}
                       onChange={handleChange}/>
            <InputComp type="text" name="mobileNumber" placeholder="Mobile Number" value={formData.mobileNumber}
                       onChange={handleChange}/>
            <InputComp type="text" name="email" placeholder="Email" value={formData.email} onChange={handleChange}/>
            <InputComp type="password" name="password" placeholder="Password" value={formData.password}
                       onChange={handleChange}/>
            <br/>

            <div className="w-1/2 flex justify-between">
                <button
                    type="submit"
                    disabled={isLoading}
                    className="pr-6 pl-6 pt-2 pb-2 bg-violet-600 rounded-3xl mt-6 ml-8 font-semibold hover:cursor-pointer text-zinc-300 disabled:opacity-60 disabled:cursor-not-allowed"
                >
                    {isLoading ? "Creating account..." : "Sign Up"}
                </button>
            </div>
        </form>
    );
}