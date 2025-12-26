"use client";
import Link from "next/link";
import { gql } from "@apollo/client";
import { useMutation } from "@apollo/client/react";
import { useEffect } from "react";

const LOGIN_MUTATION = gql`
  mutation login($email: String!, $password: String!) {
    signin(email: $email, password: $password) {
      message
      success
      token
    }
  }
`;

const LoginComponent = () => {
  const [login, { data, loading, error }] = useMutation(LOGIN_MUTATION);

  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const data = {
      email: formData.get("email"),
      password: formData.get("password"),
    };

    login({
      variables: {
        email: data.email,
        password: data.password,
      },
    });
  };

  useEffect(() => {
    if (data) {
      // Handle successful registration, e.g., redirect or show a message
      const { token, success, message } = data.signin;
      if (success) {
        window.alert("Login successful!");
        localStorage.setItem("authToken", token);
      } else {
        console.log("Login failed:", message);
        window.alert("Login failed: " + message);
      }
    }
  }, [data]);

  return (
    <div className="min-h-dvh bg-background text-foreground">
      <div className="mx-auto flex min-h-dvh w-full max-w-md items-center px-4 py-10">
        <div className="w-full rounded-xl border border-foreground/15 bg-background p-6">
          <div className="mb-6">
            <h1 className="text-xl font-semibold tracking-tight">Login</h1>
            <p className="mt-1 text-sm opacity-80">Welcome back.</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-1.5">
              <label htmlFor="email" className="text-sm font-medium">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                required
                autoComplete="email"
                className="h-10 w-full rounded-md border border-foreground/15 bg-background px-3 text-sm outline-none focus-visible:border-foreground/30 focus-visible:ring-2 focus-visible:ring-foreground/20"
              />
            </div>

            <div className="space-y-1.5">
              <label htmlFor="password" className="text-sm font-medium">
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                required
                autoComplete="current-password"
                className="h-10 w-full rounded-md border border-foreground/15 bg-background px-3 text-sm outline-none focus-visible:border-foreground/30 focus-visible:ring-2 focus-visible:ring-foreground/20"
              />
            </div>

            <button
              type="submit"
              className="inline-flex h-10 w-full items-center justify-center rounded-md bg-foreground px-4 text-sm font-medium text-background outline-none focus-visible:ring-2 focus-visible:ring-foreground/30"
            >
              Login
            </button>
          </form>

          <p className="mt-6 text-sm opacity-80">
            Don&apos;t have an account?{" "}
            <Link
              href="/auth/register"
              className="underline underline-offset-4"
            >
              Register
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginComponent;
