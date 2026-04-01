import ReCAPTCHA from "react-google-recaptcha";
import { Helmet } from "react-helmet-async";
import toast from "react-hot-toast";
import { FcGoogle } from "react-icons/fc";

const Login = () => {

    const handleLogin = (e) => {
        e.preventDefault();
        const email = e.target.email.value;
        const password = e.target.password.value;
    };

    return (
        <>
            <Helmet>
                <title>Bistro Boss | Login</title>
            </Helmet>

            <div className="min-h-screen flex items-center justify-center bg-[#0f0f19] px-4 py-7">
                <div className="w-full max-w-md bg-[#1a1f2e] rounded-2xl p-10 shadow-xl">

                    {/* Header */}
                    <div className="text-center mb-8">
                        <h2 className="text-3xl font-bold text-white uppercase tracking-widest font-serif">
                            Bistro Boss
                        </h2>
                        <p className="text-gray-400 text-sm mt-2 tracking-wider">
                            Sign in to your account
                        </p>
                    </div>

                    {/* Form */}
                    <form onSubmit={handleLogin} className="flex flex-col gap-5">

                        {/* Email */}
                        <div className="flex flex-col gap-1.5">
                            <label className="text-xs text-gray-400 uppercase tracking-widest">
                                Email
                            </label>
                            <input
                                type="email"
                                name="email"
                                placeholder="your@email.com"
                                required
                                autoComplete="email"
                                className="bg-[#0f0f19] text-white text-sm px-4 py-3 rounded-lg border border-white/10 outline-none focus:border-[#BB8506] transition-colors duration-300 placeholder:text-gray-600"
                            />
                        </div>

                        {/* Password */}
                        <div className="flex flex-col gap-1.5">
                            <label className="text-xs text-gray-400 uppercase tracking-widest">
                                Password
                            </label>
                            <input
                                type="password"
                                name="password"
                                placeholder="••••••••"
                                required
                                autoComplete="current-password"
                                className="bg-[#0f0f19] text-white text-sm px-4 py-3 rounded-lg border border-white/10 outline-none focus:border-[#BB8506] transition-colors duration-300 placeholder:text-gray-600"
                            />
                        </div>

                        {/* Forgot password */}
                        <div className="text-right">
                            <a href="#" className="text-xs text-[#BB8506] hover:underline tracking-wider">
                                Forgot password?
                            </a>
                        </div>

                        {/* Submit */}
                        <button
                            type="submit"
                            className="w-full text-sm font-semibold uppercase tracking-widest py-3 rounded-lg transition-colors duration-300 mt-2
                                    bg-[#BB8506] text-white hover:bg-[#a07205]" >
                            Sign In
                        </button>

                    </form>

                    {/* Divider */}
                    <div className="flex items-center gap-4 my-6">
                        <div className="flex-1 h-px bg-white/10" />
                        <span className="text-xs text-gray-500 tracking-wider">or continue with</span>
                        <div className="flex-1 h-px bg-white/10" />
                    </div>

                    {/* Google */}
                    <button className="w-full flex items-center justify-center gap-3 border border-white/10 text-white text-sm py-3 rounded-lg hover:bg-white/5 transition-colors duration-300">
                        <FcGoogle size={25}></FcGoogle>
                        Continue with Google
                    </button>

                    {/* Register link */}
                    <p className="text-center text-xs text-gray-500 mt-6">
                        Don't have an account?{" "}
                        <a href="/register" className="text-[#BB8506] hover:underline">
                            Sign up
                        </a>
                    </p>

                </div>
            </div>
        </>
    );
};

export default Login;