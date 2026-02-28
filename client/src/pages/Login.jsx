import { useState } from "react";
import useAuth from "../hooks/UseAuth";

export default function Login() {
  const { login } = useAuth();
  const [credentials, setCredentails] = useState({
    email: "",
    password: "",
  });

  const handleLogin = async (e) => {
    e.preventDefault();
    login(credentials);
  };

  const handleInputChange = (e) => {
    setCredentails({ ...credentials, [e.target.name]: e.target.value });
  };

  return (
    <div>
      Login
      <form onSubmit={handleLogin}>
        <input
          type="text"
          value={credentials.email}
          name="email"
          placeholder="Enter the email..."
          onChange={handleInputChange}
        />
        <input
          type="password"
          value={credentials.password}
          name="password"
          placeholder="*****"
          onChange={handleInputChange}
        />

        <button type="submit">Login</button>
      </form>
    </div>
  );
}
