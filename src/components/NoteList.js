import React from "react";
import PropTypes from 'prop-types';
import NoteItem from "./NoteItem";
import LocaleContext from "../contexts/LocaleContext";

function NoteList({notes}) {
    const { locale } = React.useContext(LocaleContext);
    if (notes.length){
        return (
            <section className="notes-list">
                {
                    notes.map((note) => (
                        <NoteItem key={note.id} id={note.id} {...note}/>
                    ))
                }
            </section>
        );
    } else {
        if (locale === "id") {
            return <div className="notes-list__empty-message">Tidak ada catatan</div>
        }
        return <div className="notes-list__empty-message">No note found</div> 
    }
}

NoteList.propTypes = {
    notes: PropTypes.arrayOf(PropTypes.object).isRequired,
}

export default NoteList;