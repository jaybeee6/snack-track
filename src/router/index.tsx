import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { MyPantryScreen, AuthScreen, AddProductScreen } from "../screens";
import { useAuthStore } from "../store";

function AuthBootGate({ children }: { children: React.ReactNode }) {
  const initialized = useAuthStore((state) => state.initialized);

  if (!initialized) {
    return (
      <div className="grid min-h-screen place-items-center bg-slate-50 text-slate-700">
        <p className="text-sm font-medium">Checking your session...</p>
      </div>
    );
  }

  return <>{children}</>;
}

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const user = useAuthStore((state) => state.user);

  if (!user) {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
}

function PublicOnlyRoute({ children }: { children: React.ReactNode }) {
  const user = useAuthStore((state) => state.user);

  if (user) {
    return <Navigate to="/myPantry" replace />;
  }

  return <>{children}</>;
}

export default function Router() {
  return (
    <BrowserRouter>
      <AuthBootGate>
        <Routes>
          <Route
            path="/"
            element={
              <PublicOnlyRoute>
                <AuthScreen />
              </PublicOnlyRoute>
            }
          />
          <Route
            path="/myPantry"
            element={
              <ProtectedRoute>
                <MyPantryScreen />
              </ProtectedRoute>
            }
          />
          <Route
            path="/addProduct"
            element={
              <ProtectedRoute>
                <AddProductScreen />
              </ProtectedRoute>
            }
          />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </AuthBootGate>
    </BrowserRouter>
  );
}
