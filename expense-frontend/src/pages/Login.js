import { useState } from "react";

function Login() {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {

    try {

      const formData = new URLSearchParams();

      formData.append("username", email);
      formData.append("password", password);

      const res = await fetch("http://127.0.0.1:8000/users/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded"
        },
        body: formData
      });

      const data = await res.json();

      if (res.ok) {

        localStorage.setItem("token", data.access_token);

        window.location.href = "/";

      } else {

        alert(data.detail || "Login failed");

      }

    } catch (error) {

      console.error(error);

      alert("Server error. Backend may not be running.");

    }

  };

  return (

    <div className="flex items-center justify-center min-h-screen bg-gray-100">

      <div className="bg-white p-8 rounded shadow w-80">

        <h2 className="text-2xl font-bold mb-4 text-center">
          Login
        </h2>

        <input
          className="border p-2 w-full mb-3 rounded"
          placeholder="Email"
          value={email}
          onChange={(e)=>setEmail(e.target.value)}
        />

        <input
          type="password"
          className="border p-2 w-full mb-3 rounded"
          placeholder="Password"
          value={password}
          onChange={(e)=>setPassword(e.target.value)}
        />

        <button
          onClick={handleLogin}
          className="bg-blue-600 text-white w-full p-2 rounded"
        >
          Login
        </button>

        <p className="text-center mt-4">
          Don't have an account? 
          <span
          className="text-blue-600 cursor-pointer"
          onClick={()=>window.location.href="/register"}>Register</span>
          </p>

      </div>

    </div>

  );

}

export default Login;