import { useState } from 'react';

export default () => {
  const [email, setEmail] = useState('');
  const [password, setpassword] = useState('');

  const onSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <form onSubmit={onSubmit}>
      <h1>Sign Up</h1>
      <div className="mb-3">
        <label className="form-label">Email Address</label>
        <input
          value={email}
          className="form-control"
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div className="mb-3">
        <label className="form-label">Password</label>
        <input
          value={password}
          type="password"
          className="form-control"
          onChange={(e) => setpassword(e.target.value)}
        />
      </div>
      <button className="btn btn-primary">Sign Up</button>
    </form>
  );
};
