import { LogOut, Package, PlusCircle } from "lucide-react";
import React from "react";
import { NavLink } from "react-router-dom";
import { authSignOut } from "../../services";

const navItems = [
  {
    to: "/myPantry",
    label: "My Pantry",
    icon: Package,
  },
  {
    to: "/addProduct",
    label: "Add Product",
    icon: PlusCircle,
  },
];

export const BottomNavigation: React.FC = () => {
  const [isSigningOut, setIsSigningOut] = React.useState(false);

  const handleOnClickSignOut = async () => {
    if (isSigningOut) {
      return;
    }

    setIsSigningOut(true);
    await authSignOut();
    setIsSigningOut(false);
  };

  return (
    <nav className="fixed inset-x-0 bottom-5 z-50 flex justify-center px-4">
      <div className="flex w-full max-w-xs items-center justify-between rounded-full border border-white/70 bg-slate-900/95 p-4 shadow-2xl backdrop-blur">
        {navItems.map(({ to, label, icon: Icon }) => (
          <NavLink
            key={to}
            to={to}
            aria-label={label}
            title={label}
            className={({ isActive }) =>
              [
                "flex h-11 w-11 items-center justify-center rounded-full transition",
                isActive
                  ? "bg-white text-slate-900"
                  : "text-slate-300 hover:bg-white/10 hover:text-white",
              ].join(" ")
            }
          >
            <Icon className="h-5 w-5" />
          </NavLink>
        ))}

        <button
          type="button"
          disabled={isSigningOut}
          onClick={handleOnClickSignOut}
          aria-label="Sign Out"
          title="Sign Out"
          className="flex h-11 w-11 items-center justify-center rounded-full text-rose-200 transition hover:bg-rose-500/20 hover:text-rose-100 disabled:cursor-not-allowed disabled:opacity-60"
        >
          <LogOut className="h-5 w-5" />
        </button>
      </div>
    </nav>
  );
};
