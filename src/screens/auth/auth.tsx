import type React from "react";
import { useAuthScreenHelper } from "./auth.helper";
import { Lock, Mail, User } from "lucide-react";

export const AuthScreen: React.FC = () => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const {
    handleOnSubmitSignIn,
    handleOnSubmitSignUp,
    isSignUp,
    handleOnClickSignUp,
  } = useAuthScreenHelper();

  return (
    <div className="relative min-h-screen overflow-hidden bg-slate-50 px-4 py-8 sm:px-6 lg:px-8">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -left-24 top-0 h-72 w-72 rounded-full bg-emerald-200/40 blur-3xl" />
        <div className="absolute -right-20 bottom-0 h-80 w-80 rounded-full bg-cyan-200/35 blur-3xl" />
      </div>

      <div className="relative mx-auto flex min-h-[calc(100vh-4rem)] w-full max-w-5xl items-center justify-center">
        <div className="grid w-full gap-6 rounded-3xl border border-white/60 bg-white/85 p-4 shadow-xl backdrop-blur sm:p-6 lg:grid-cols-2 lg:gap-8 lg:p-8">
          <section className="rounded-2xl bg-gradient-to-br from-emerald-600 to-cyan-600 p-6 text-white sm:p-8">
            <p className="text-sm uppercase tracking-[0.2em] text-emerald-100">
              Snack Track
            </p>
            <h1 className="mt-4 text-3xl font-semibold leading-tight sm:text-4xl">
              {isSignUp ? "Build your pantry profile" : "Welcome back"}
            </h1>
            <p className="mt-4 max-w-sm text-sm text-emerald-50 sm:text-base">
              Keep all your pantry items in one place, search faster, and avoid
              waste with clear expiration tracking.
            </p>
          </section>

          <section className="rounded-2xl bg-white p-4 sm:p-6">
            <h2 className="text-3xl font-semibold text-slate-800">
              {isSignUp ? "Sign Up" : "Log In"}
            </h2>
            <p className="mt-2 text-sm text-slate-500">
              {isSignUp
                ? "Create your account to get started."
                : "Access your pantry in seconds."}
            </p>

            <form
              className="mt-6 space-y-4"
              onSubmit={isSignUp ? handleOnSubmitSignUp : handleOnSubmitSignIn}
            >
              {isSignUp && (
                <label className="block">
                  <span className="mb-2 flex items-center gap-2 text-sm font-medium text-slate-700">
                    <User className="size-4" />
                    Name
                  </span>
                  <input
                    className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-800 outline-none transition focus:border-emerald-500 focus:bg-white focus:ring-2 focus:ring-emerald-100"
                    placeholder="Enter your name"
                    name="name"
                  />
                </label>
              )}

              <label className="block">
                <span className="mb-2 flex items-center gap-2 text-sm font-medium text-slate-700">
                  <Mail className="size-4" />
                  Email
                </span>
                <input
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-800 outline-none transition focus:border-emerald-500 focus:bg-white focus:ring-2 focus:ring-emerald-100"
                  placeholder="Enter your email"
                  name="email"
                />
              </label>

              <label className="block">
                <span className="mb-2 flex items-center gap-2 text-sm font-medium text-slate-700">
                  <Lock className="size-4" />
                  Password
                </span>
                <input
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-800 outline-none transition focus:border-emerald-500 focus:bg-white focus:ring-2 focus:ring-emerald-100"
                  type="password"
                  placeholder="Enter your password"
                  name="password"
                />
              </label>

              <button
                className="mt-2 w-full rounded-2xl bg-emerald-600 px-4 py-3 text-lg font-semibold text-white transition hover:bg-emerald-500"
                type="submit"
              >
                {isSignUp ? "Sign Up" : "Log In"}
              </button>

              {!isSignUp && (
                <p
                  id="forgot"
                  className="pt-1 text-center text-sm text-slate-400"
                >
                  Forgot password?
                </p>
              )}
            </form>

            <div className="mt-8 border-t border-slate-200 pt-6 text-center">
              <p className="text-sm text-slate-500">
                {isSignUp
                  ? "Already have an account?"
                  : "Dont have an account?"}
              </p>
              <button
                type="button"
                className="mt-2 text-lg font-semibold text-emerald-700 transition hover:text-emerald-600"
                onClick={handleOnClickSignUp}
              >
                {!isSignUp ? "Sign Up" : "Log In"}
              </button>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};
