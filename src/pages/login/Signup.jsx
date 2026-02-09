import { useState } from "react";
import {
  User,
  Phone,
  Mail,
  ArrowRight,
  Lock,
  Eye,
  EyeOff,
  IdCard,
} from "lucide-react";

function Signup() {
  //Show and hide passoword logic
  const [showPassword, setShowPassword] = useState(false);

  //   Logic for radio buttons
  const [selectedRole, setSelectedRole] = useState("");

  return (
    <div className="flex flex-col justify-center items-center min-h-screen p-6">
      <div className="bg-white shadow-xl rounded-2xl w-full max-w-md p-8">
        <div className="text-center mb-10">
          <h1 className="font-bold text-3xl text-slate-900 mb-2">New here?</h1>
          <p className="text-slate-500 text-base">
            Create an account to get started.
          </p>
        </div>

        <div className="space-y-6">
          {/* Full name */}
          <div className="space-y-1">
            <div className="relative">
              <div className="flex items-center border border-slate-300 rounded-xl p-3.5 hover:border-blue-400 focus-within:border-blue-500 focus-within:ring-2 focus-within:ring-blue-200 transition-all duration-200">
                <User className="w-5 h-5 text-blue-500 ml-1" />
                <input
                  type="text"
                  placeholder="Enter your full name"
                  className="flex-1 ml-3 outline-none bg-transparent text-slate-800 placeholder:text-slate-400 text-base"
                />
              </div>
            </div>
          </div>

          {/* Phone number */}
          <div className="space-y-1">
            <div className="relative">
              <div className="flex items-center border border-slate-300 rounded-xl p-3.5 hover:border-blue-400 focus-within:border-blue-500 focus-within:ring-2 focus-within:ring-blue-200 transition-all duration-200">
                <Phone className="w-5 h-5 text-blue-500 ml-1" />
                <input
                  type="text"
                  placeholder="Enter your phone number"
                  className="flex-1 ml-3 outline-none bg-transparent text-slate-800 placeholder:text-slate-400 text-base"
                />
              </div>
            </div>
          </div>

          {/* Email */}
          <div className="space-y-1">
            <div className="relative">
              <div className="flex items-center border border-slate-300 rounded-xl p-3.5 hover:border-blue-400 focus-within:border-blue-500 focus-within:ring-2 focus-within:ring-blue-200 transition-all duration-200">
                <Mail className="w-5 h-5 text-blue-500 ml-1" />
                <input
                  type="text"
                  placeholder="Enter your email"
                  className="flex-1 ml-3 outline-none bg-transparent text-slate-800 placeholder:text-slate-400 text-base"
                />
              </div>
            </div>
          </div>

          {/* ID number */}
          <div className="space-y-1">
            <div className="relative">
              <div className="flex items-center border border-slate-300 rounded-xl p-3.5 hover:border-blue-400 focus-within:border-blue-500 focus-within:ring-2 focus-within:ring-blue-200 transition-all duration-200">
                <IdCard className="w-5 h-5 text-blue-500 ml-1" />
                <input
                  type="text"
                  placeholder="Enter your ID number"
                  className="flex-1 ml-3 outline-none bg-transparent text-slate-800 placeholder:text-slate-400 text-base"
                />
              </div>
            </div>
          </div>

          {/* Roles */}
          <div className="">
            <label className="text-lg font-semibold text-slate-800 mb-4">
              Choose your role:
            </label>

            <div className="flex flex-wrap items-center justify-start gap-6">
              {/* Employer input */}
              <div className="flex items-center">
                <label
                  htmlFor="employer"
                  className="text-slate-700 font-medium cursor-pointer mr-2"
                >
                  Employer
                </label>
                <input
                  type="radio"
                  id="employer"
                  name="role"
                  value="Employer"
                  checked={selectedRole === "Employer"}
                  onChange={(e) => setSelectedRole(e.target.value)}
                  className="w-5 h-5 text-blue-600 bg-white border-2 border-slate-300 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 cursor-pointer"
                />
              </div>

              {/* Ex-Convict Input */}
              <div className="flex items-center">
                <label
                  htmlFor="ex-convict"
                  className="text-slate-700 font-medium cursor-pointer mr-2"
                >
                  Ex-Convict
                </label>
                <input
                  type="radio"
                  id="ex-convict"
                  name="role"
                  value="Ex-convict"
                  checked={selectedRole === "Ex-convict"}
                  onChange={(e) => setSelectedRole(e.target.value)}
                  className="w-5 h-5 text-blue-600 bg-white border-2 border-slate-300 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 cursor-pointer"
                />
              </div>

              {/* Officer input */}
              <div className="flex items-center">
                <label
                  htmlFor="officer"
                  className="text-slate-700 font-medium cursor-pointer mr-2"
                >
                  Officer
                </label>
                <input
                  type="radio"
                  id="officer"
                  name="role"
                  value="Officer"
                  checked={selectedRole === "Officer"}
                  onChange={(e) => setSelectedRole(e.target.value)}
                  className="w-5 h-5 text-blue-600 bg-white border-2 border-slate-300 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 cursor-pointer"
                />
              </div>
            </div>
          </div>

          {/* Password */}
          <div className="space-y-1">
            <div className="relative">
              <div className="flex items-center border border-slate-300 rounded-xl p-3.5 hover:border-blue-400 focus-within:border-blue-500 focus-within:ring-2 focus-within:ring-blue-200 transition-all duration-200">
                <Lock className="w-5 h-5 text-blue-500 ml-1" />
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Create your password"
                  className="flex-1 ml-3 outline-none bg-transparent text-slate-800 placeholder:text-slate-400 text-base"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="p-1.5 hover:bg-slate-100 rounded-lg transition-colors duration-200 ml-2"
                >
                  {showPassword ? (
                    <EyeOff className="w-5 h-5 text-slate-500" />
                  ) : (
                    <Eye className="w-5 h-5 text-slate-500" />
                  )}
                </button>
              </div>
            </div>
          </div>

          {/* Confirm Password */}
          <div className="space-y-1">
            <div className="relative">
              <div className="flex items-center border border-slate-300 rounded-xl p-3.5 hover:border-blue-400 focus-within:border-blue-500 focus-within:ring-2 focus-within:ring-blue-200 transition-all duration-200">
                <Lock className="w-5 h-5 text-blue-500 ml-1" />
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Confirm your password"
                  className="flex-1 ml-3 outline-none bg-transparent text-slate-800 placeholder:text-slate-400 text-base"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="p-1.5 hover:bg-slate-100 rounded-lg transition-colors duration-200 ml-2"
                >
                  {showPassword ? (
                    <EyeOff className="w-5 h-5 text-slate-500" />
                  ) : (
                    <Eye className="w-5 h-5 text-slate-500" />
                  )}
                </button>
              </div>
            </div>
          </div>

          <div className="pt-4">
            <button className="flex justify-center items-center gap-3 bg-blue-600 text-white py-3.5 rounded-xl w-full font-medium hover:bg-blue-700 active:bg-blue-800 transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5">
              Sign Up
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-slate-200 text-center">
          <p className="text-slate-500 text-sm">
            Already have an account?{" "}
            <a
              href="#"
              className="text-blue-600 font-medium hover:text-blue-800 transition-colors duration-200"
            >
              Sign in
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Signup;

