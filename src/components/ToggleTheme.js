import { ThemeConsumer } from "../contexts/ThemeContext";
import { FiMoon, FiSun } from "react-icons/fi";

function ToggleTheme() {
    return (
        <ThemeConsumer>
            {({theme, toggleTheme}) => {
                return <button onClick={toggleTheme}>{theme === 'dark' ? <FiSun/> : <FiMoon/> }</button>
            }}
        </ThemeConsumer>
    )
}

export default ToggleTheme;
