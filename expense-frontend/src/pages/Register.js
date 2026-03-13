import { useState } from "react";

function Register() {

  const [email,setEmail] = useState("");
  const [password,setPassword] = useState("");

  const handleRegister = async () => {

    try{

      const res = await fetch("http://127.0.0.1:8000/users/register",{
        method:"POST",
        headers:{
          "Content-Type":"application/json"
        },
        body:JSON.stringify({
          email,
          password
        })
      });

      const data = await res.json();

      if(res.ok){

        alert("Account created successfully!");
        window.location.href="/login";

      }else{

        alert(data.detail || "Registration failed");

      }

    }catch(error){

      console.error(error);

    }

  };

  return(

    <div className="flex items-center justify-center min-h-screen bg-gray-100">

      <div className="bg-white p-8 rounded shadow w-80">

        <h2 className="text-2xl font-bold mb-4 text-center">
          Register
        </h2>

        <input
        className="border p-2 w-full mb-3"
        placeholder="Email"
        value={email}
        onChange={(e)=>setEmail(e.target.value)}
        />

        <input
        type="password"
        className="border p-2 w-full mb-3"
        placeholder="Password"
        value={password}
        onChange={(e)=>setPassword(e.target.value)}
        />

        <button
        onClick={handleRegister}
        className="bg-green-600 text-white w-full p-2 rounded"
        >
        Register
        </button>

      </div>

    </div>

  );

}

export default Register;