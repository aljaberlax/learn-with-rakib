import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";

export default function AuthPage() {
  const { pathname } = useLocation();
  const isSignup = pathname === "/signup";
  const [message, setMessage] = useState("");

  useEffect(() => setMessage(""), [pathname]);

  function handleSubmit(event) {
    event.preventDefault();
    setMessage(
      isSignup
        ? "Account creation is not connected yet."
        : "Sign-in is not connected yet.",
    );
  }

  return (
    <main className="auth-page">
      <section className="auth-panel" aria-labelledby="auth-title">
        <Link to="/" className="auth-brand">
          learn with Rakib
        </Link>
        <p className="auth-eyebrow">YOUR NETWORKING CLASSROOM</p>
        <h1 id="auth-title">
          {isSignup ? "Create your account" : "Welcome back"}
        </h1>
        <p className="auth-description">
          {isSignup
            ? "Join a course and build your networking skills one lesson at a time."
            : "Log in to continue learning with Rakib."}
        </p>

        <form className="auth-form" onSubmit={handleSubmit}>
          {isSignup && (
            <label>
              Full name
              <input
                autoComplete="name"
                name="name"
                placeholder="Your name"
                required
              />
            </label>
          )}
          <label>
            Email address
            <input
              autoComplete="email"
              name="email"
              placeholder="you@example.com"
              required
              type="email"
            />
          </label>
          <label>
            Password
            <input
              autoComplete={isSignup ? "new-password" : "current-password"}
              minLength={8}
              name="password"
              placeholder="At least 8 characters"
              required
              type="password"
            />
          </label>
          {isSignup && (
            <label className="auth-checkbox">
              <input required type="checkbox" />
              <span>I agree to the terms and privacy policy.</span>
            </label>
          )}
          <button className="btn auth-submit" type="submit">
            {isSignup ? "Create account" : "Log in"}
          </button>
          {message && (
            <p className="auth-message" role="status">
              {message}
            </p>
          )}
        </form>

        <p className="auth-switch">
          {isSignup ? "Already have an account?" : "New to learn with Rakib?"}{" "}
          <Link to={isSignup ? "/login" : "/signup"}>
            {isSignup ? "Log in" : "Sign up"}
          </Link>
        </p>
      </section>
    </main>
  );
}
