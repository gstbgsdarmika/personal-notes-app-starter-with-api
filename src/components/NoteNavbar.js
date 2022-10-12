import React from "react";
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { FiLogOut} from 'react-icons/fi';
import {SiGoogletranslate} from "react-icons/si";
import { LocaleConsumer } from '../contexts/LocaleContext';
import ToggleTheme from './ToggleTheme';

function NoteNavbar({logout, name}){
    return (
    <LocaleConsumer> 
        {
            ({locale,toggleLocale}) => {
                return (
                    <nav className="navigation">
                        <ul>
                            <li><Link to="/archived">{locale === 'id' ? 'Terarsip' : 'Archived'}</Link></li>
                            <li><button onClick={toggleLocale}><SiGoogletranslate/></button></li>
                            <li><ToggleTheme></ToggleTheme></li>
                            <li><button onClick={logout}>{name} <FiLogOut /></button></li>
                        </ul>
                    </nav>
                )
            }
        }
    </LocaleConsumer>
    );
}

NoteNavbar.propTypes = {
    logout: PropTypes.func.isRequired,  
    name: PropTypes.string.isRequired,
};

export default NoteNavbar;