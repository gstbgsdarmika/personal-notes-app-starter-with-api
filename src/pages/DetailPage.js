import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import NoteDetail from "../components/NoteDetail";
import NoteItemButton from "../components/NoteItemButton";
import PageNotFound from "./PageNotFound";
import {getSingleNote, deleteNote, archiveNote, unarchiveNote} from "../utils/api";

function DetailPageWrapper(){
    const { id } = useParams();
    const navigate = useNavigate();
    const [note, setNote] = React.useState([]);

    React.useEffect(() => {
        getSingleNote(id).then(({data}) =>{
            setNote(data);
        })
    }, [id]);

    function onDeleteHandler() {
        deleteNote(note.id);
        navigate("/");
    }

    function onArchivedHandler(){
        archiveNote(note.id);
        navigate("/");
    }

    function onUnArchivedHandler(){
        unarchiveNote(note.id);
        navigate("/");
    }

    if(note){
        return(
            <section className="detail-page">
                <NoteDetail title={note.title} createdAt={note.createdAt} body={note.body}/>
                <div className="detail-page__action">
                    <NoteItemButton isArchive={note.archived} onDelete={onDeleteHandler} onArchive={onArchivedHandler} onUnArchive={onUnArchivedHandler} />
                </div>
            </section>  
        )
    } else {
        return <PageNotFound />
    }
}

export default DetailPageWrapper;