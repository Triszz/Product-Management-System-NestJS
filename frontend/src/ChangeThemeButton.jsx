import { useContext } from "react";
import ThemeContext from "./ThemeContext";
function ChangeThemeButton() {
  const { theme, setTheme } = useContext(ThemeContext);
  const handleClick = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };
  return (
    <button
      className={`change-theme-button absolute top-10 left-10 hover:cursor-pointer p-2 rounded ${
        theme === "light" ? "bg-gray-700 text-gray-400" : "bg-white text-black"
      }`}
      onClick={handleClick}
    >
      Change theme
    </button>
  );
}
export default ChangeThemeButton;
