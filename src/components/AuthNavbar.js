import React from "react";
import {SiGoogletranslate} from "react-icons/si";
import { LocaleConsumer } from '../contexts/LocaleContext';
import ToggleTheme from './ToggleTheme';

function AuthNavbar (){
    return (
        <LocaleConsumer>
            {
                ({toggleLocale}) => {
                    return (
                        <nav className="navigation">
                            <ul>
                                <li><button onClick={toggleLocale}><SiGoogletranslate/></button></li>
                                <li><ToggleTheme></ToggleTheme></li>
                            </ul>
                        </nav>
                    )
                }
            }
        </LocaleConsumer>
    )
}

export default AuthNavbar;