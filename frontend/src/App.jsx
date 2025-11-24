import "./App.css";
import ProductManagement from "./ProductManagement";
import ChangeThemeButton from "./ChangeThemeButton";
import ThemeContext from "./ThemeContext";
import { useState } from "react";
function App() {
  const [theme, setTheme] = useState("light");
  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      <div
        className={`p-10
         ${
           theme === "light"
             ? "bg-white text-black"
             : "bg-gray-700 text-gray-400"
         }`}
      >
        <ProductManagement />
        <ChangeThemeButton />
      </div>
    </ThemeContext.Provider>
  );
}

export default App;
