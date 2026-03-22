import { useState } from "react";
import api from "../api";   // ✅ changed

function SignupPage({ setShowSignup }) {

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignup = async () => {
    try {
      await api.post("/auth/register", {   // ✅ changed
        name,
        email,
        password
      });

      alert("Signup successful, please login");
      setShowSignup(false);

    } catch (err) {
      alert("Signup failed");
    }
  };

  return (
    <div className="h-screen flex items-center justify-center bg-gradient-to-br from-indigo-100 to-purple-100">

      <div className="bg-white/80 backdrop-blur-lg p-10 rounded-2xl shadow-xl w-96">

        <h2 className="text-2xl font-bold text-center mb-2 text-gray-800">
          Create Account ✨
        </h2>

        <p className="text-gray-500 text-center mb-6 text-sm">
          Join TrackIt and manage your expenses
        </p>

        <input
          placeholder="Full Name"
          className="w-full mb-3 px-4 py-2 border rounded-lg outline-none focus:ring-2 focus:ring-indigo-500"
          onChange={(e) => setName(e.target.value)}
        />

        <input
          placeholder="Email"
          className="w-full mb-3 px-4 py-2 border rounded-lg outline-none focus:ring-2 focus:ring-indigo-500"
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full mb-4 px-4 py-2 border rounded-lg outline-none focus:ring-2 focus:ring-indigo-500"
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          onClick={handleSignup}
          className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-2 rounded-lg transition"
        >
          Sign Up
        </button>

        <p
          className="text-sm text-center text-indigo-600 cursor-pointer mt-4 hover:underline"
          onClick={() => setShowSignup(false)}
        >
          Already have an account? Login
        </p>

      </div>
    </div>
  );
}

export default SignupPage;