import { BrowserRouter, Routes, Route } from "react-router-dom";
import { MyPantryScreen, AuthScreen, AddProductScreen } from "../screens";

export default function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<AuthScreen />} />
        <Route path="/myPantry" element={<MyPantryScreen />} />
        <Route path="/addProduct" element={<AddProductScreen />} />
      </Routes>
    </BrowserRouter>
  );
}
