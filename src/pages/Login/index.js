import React, { useContext } from "react";
import { AuthContext } from "../../context";
import "./styles.css";

const Login = () => {
  const authContext = useContext(AuthContext);

  const handleSubmit = (e) => {
    e.preventDefault();
    const username = e.target.username.value;
    authContext.login(
      JSON.stringify(
        JSON.stringify({
          createdAt: new Date(),
          username,
        })
      )
    );
  };

  return (
    <div className={"login-page"}>
      <div className="form">
        <div className="login">
          <div className="login-header">
            <h3>LOGIN</h3>
            <p>Please enter your username</p>
          </div>
        </div>
        <form className="login-form" onSubmit={handleSubmit}>
          <input
            required
            id="username"
            name="username"
            type="text"
            placeholder="username"
          />
          <button>login</button>
        </form>
      </div>
    </div>
  );
};

export default Login;
