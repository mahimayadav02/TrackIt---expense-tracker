import { useState } from "react";
import axios from "axios";

function LoginPage({ setUser, setShowSignup }) {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    try {
      const res = await axios.post("http://localhost:8081/auth/login", {
        email,
        password
      });

      // ✅ FULL USER FROM BACKEND
      const userData = res.data;

      // ❌ NO TOKEN NEEDED FOR NOW
      // localStorage.setItem("token", res.data);

      // ✅ STORE USER
      localStorage.setItem("user", JSON.stringify(userData));
      setUser(userData);

    } catch (err) {
      console.error(err);
      alert("Invalid email or password");
    }
  };

  return (
    <div className="h-screen flex items-center justify-center bg-gradient-to-br from-indigo-100 to-purple-100">

      <div className="bg-white/80 backdrop-blur-lg p-10 rounded-2xl shadow-xl w-96">

        <h2 className="text-2xl font-bold text-center mb-2 text-gray-800">
          Welcome Back 👋
        </h2>

        <p className="text-gray-500 text-center mb-6 text-sm">
          Login to your TrackIt account
        </p>

        <input
          placeholder="Email"
          className="w-full mb-3 px-4 py-2 border rounded-lg outline-none focus:ring-2 focus:ring-indigo-500 transition"
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full mb-4 px-4 py-2 border rounded-lg outline-none focus:ring-2 focus:ring-indigo-500 transition"
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          onClick={handleLogin}
          className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-2 rounded-lg transition duration-200"
        >
          Login
        </button>

        <p
          className="text-sm text-center text-indigo-600 cursor-pointer mt-4 hover:underline"
          onClick={() => setShowSignup(true)}
        >
          Don’t have an account? Sign up
        </p>

      </div>
    </div>
  );
}

export default LoginPage;