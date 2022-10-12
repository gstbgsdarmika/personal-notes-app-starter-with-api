import React from "react";
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import {showFormattedDate } from "../utils/index";
import LocaleContext from "../contexts/LocaleContext";

function NoteItem ({id, title, createdAt, body}){
    const { locale } = React.useContext(LocaleContext);
    return (
        <article className="note-item">
            <h3 className="note-item__title"><Link to={`/notes/${id}`}>{title}</Link></h3>
            <p className="note-item__createdAt">{showFormattedDate(createdAt,locale)}</p>
            <p className="note-item__body">{body}</p>
        </article>
    );  
}

NoteItem.propTypess = {
    id:PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    createdAt: PropTypes.string.isRequired,
    body: PropTypes.string.isRequired,
}

export default NoteItem;