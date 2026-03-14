import { Package, PlusCircle } from "lucide-react";
import { NavLink } from "react-router-dom";

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
  return (
    <nav className="fixed inset-x-0 bottom-5 z-50 flex justify-center px-4">
      <div className="flex w-full max-w-sm items-center justify-between rounded-full border border-white/70 bg-slate-900/95 p-2 shadow-2xl backdrop-blur">
        {navItems.map(({ to, label, icon: Icon }) => (
          <NavLink
            key={to}
            to={to}
            className={({ isActive }) =>
              [
                "flex flex-1 items-center justify-center gap-2 rounded-full px-4 py-3 text-sm font-semibold transition",
                isActive
                  ? "bg-white text-slate-900"
                  : "text-slate-300 hover:bg-white/10 hover:text-white",
              ].join(" ")
            }
          >
            <Icon className="h-4 w-4" />
            <span>{label}</span>
          </NavLink>
        ))}
      </div>
    </nav>
  );
};
