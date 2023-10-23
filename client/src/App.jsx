import React, { useState, useEffect } from "react";
import Split from "react-split";
import { nanoid } from "nanoid";
import ReactMde from "react-mde";
import Showdown from "showdown";
import './App.css';

export default function App() {
  const [notes, setNotes] = useState(() => JSON.parse(localStorage.getItem("notes")) || []);
  const [currentNoteId, setCurrentNoteId] = useState(notes.length > 0 ? notes[0].id : "");

  useEffect(() => {
    localStorage.setItem("notes", JSON.stringify(notes));
  }, [notes]);

  const createNewNote = () => {
    const newNote = {
      id: nanoid(),
      body: "# Type your markdown note's title here"
    };
    setNotes(prevNotes => [newNote, ...prevNotes]);
    setCurrentNoteId(newNote.id);
  };

  const updateNote = (text) => {
    setNotes(oldNotes => oldNotes.map(oldNote => {
      return oldNote.id === currentNoteId
        ? { ...oldNote, body: text }
        : oldNote;
    }));
  };

  const findCurrentNote = () => {
    return notes.find(note => note.id === currentNoteId) || (notes.length > 0 ? notes[0] : null);
  };

  const converter = new Showdown.Converter({
    tables: true,
    simplifiedAutoLink: true,
    strikethrough: true,
    tasklists: true,
  });

  const selectedTab = "write"; // Assuming you want to default to the "write" tab

  return (
    <main>
      {notes.length > 0 ? (
        <Split sizes={[30, 70]} direction="horizontal" className="split">
          <Sidebar
            notes={notes}
            currentNote={findCurrentNote()}
            setCurrentNoteId={setCurrentNoteId}
            newNote={createNewNote}
          />
          <section className="pane editor">
            <ReactMde
              value={findCurrentNote().body}
              onChange={updateNote}
              selectedTab={selectedTab}
              generateMarkdownPreview={(markdown) => Promise.resolve(converter.makeHtml(markdown))}
              minEditorHeight={80}
              heightUnits="vh"
            />
          </section>
        </Split>
      ) : (
        <div className="no-notes">
          <h1>You have no notes</h1>
          <button className="first-note" onClick={createNewNote}>Create one now</button>
        </div>
      )}
    </main>
  );
}

function Sidebar({ notes, currentNote, setCurrentNoteId, newNote }) {
  return (
    <section className="pane sidebar">
      <div className="sidebar--header">
        <h3>Notes</h3>
        <button className="new-note" onClick={newNote}>+</button>
      </div>
      {notes.map(note => (
        <div key={note.id} className={`title ${note.id === currentNote.id ? "selected-note" : ""}`}>
          <h4 className="text-snippet">{note.body.split("\n")[0]}</h4>
        </div>
      ))}
    </section>
  );
}
