import React, { FormEvent, useState } from "react";

const SignUp: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(email, password);
  };

  return (
    <form onSubmit={(e) => onSubmit(e)}>
      <h1>Sign up</h1>
      <div className="form-group">
        <label>Email Address</label>
        <input
          type="text"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
          }}
          className="form-control"
        />
      </div>
      <div className="form-group">
        <label>Password</label>
        <input
          type="text"
          className="form-control"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        />
      </div>
      <button className="btn btn-primary">Sign up</button>
    </form>
  );
};

export default SignUp;
