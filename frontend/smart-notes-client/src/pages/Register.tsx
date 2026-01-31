import { useState } from "react";
import { register } from "../api/authApi";
import { Link, useNavigate } from "react-router-dom";

export default function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const submit = async () => {
    try {
      await register(email, password);
      navigate("/login");
    } catch (err: any) {
      setError(err.response?.data || "Registration failed");
    }
  };

  return (
    <div className="h-screen w-screen flex items-center justify-center bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-500 px-4">
      <div className="bg-white/10 backdrop-blur-md border border-white/20 p-8 rounded-xl shadow-lg w-full max-w-md mt-12">
        <h1 className="text-3xl font-extrabold mb-4 text-white/95 text-center p-2">Create your account</h1>
        <input
          className="w-full mb-3 p-3 bg-white bg-opacity-90 rounded focus:outline-none focus:ring-2 focus:ring-white/60 placeholder-gray-600"
          placeholder="Email"
          value={email}
          onChange={e => setEmail(e.target.value)}
        />

        <input
          type="password"
          className="w-full mb-3 p-3 bg-white bg-opacity-90 rounded focus:outline-none focus:ring-2 focus:ring-white/60 placeholder-gray-600"
          placeholder="Password"
          value={password}
          onChange={e => setPassword(e.target.value)}
        />

        <p className="text-red-400 text-sm mb-2 text-center">{error}</p>
        <button
          onClick={submit}
          className="w-full bg-gradient-to-r from-green-400 to-emerald-500 text-white py-2 rounded-md hover:opacity-95"
        >
          Create Account
        </button>


        <p className="text-sm text-center mt-4 text-white/90">
          Already have an account? {" "}
          <Link to="/login" className="underline transform transition duration-150 ease-in-out active:scale-95 active:opacity-80 hover:opacity-95 focus:outline-none focus:ring-2 focus:ring-white/30">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}
