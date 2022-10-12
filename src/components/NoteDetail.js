import React from "react";
import PropTypes from "prop-types";
import {showFormattedDate } from "../utils/index";
import LocaleContext from "../contexts/LocaleContext";

function NoteDetail({title, body, createdAt}){
    const { locale } = React.useContext(LocaleContext);
    return(
        <>
            <h3 className="detail-page__title">{title}</h3>
            <p className="detail-page__createdAt">{showFormattedDate(createdAt,locale)}</p>
            <div className="detail-page__body">{body}</div>
        </>
    );
}

NoteDetail.propTypes = {
    title: PropTypes.string.isRequired,
    createdAt: PropTypes.string.isRequired,
    body: PropTypes.string.isRequired,
}

export default NoteDetail;

