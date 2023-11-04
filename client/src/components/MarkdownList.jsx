import React, { useState } from 'react';
import axios from 'axios';
import ReactMarkdown from 'react-markdown';
import './MarkdownList.css';
import { FaSave, FaTimes, FaEdit, FaTrash } from 'react-icons/fa';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function MarkdownList({ markdownList, setMarkdownList }) {
  const [editedMarkdown, setEditedMarkdown] = useState('');
  const [editingId, setEditingId] = useState(null);

  const handleEdit = (id, content) => {
    setEditingId(id);
    setEditedMarkdown(content);
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    setEditedMarkdown('');
  };

  const handleSaveEdit = (id) => {
    axios
      .put(`https://markdown-connecting.onrender.com/api/markdown/update-markdown/${id}`, { content: editedMarkdown })
      .then(() => {
        // Update the local state with the edited content
        setMarkdownList((prevList) =>
          prevList.map((markdown) =>
            markdown._id === id ? { ...markdown, content: editedMarkdown } : markdown
          )
        );
        setEditingId(null);
        setEditedMarkdown('');
        // Show a success toast
        toast.success('Markdown content saved successfully', {
          position: toast.POSITION.BOTTOM_CENTER,
        });
      })
      .catch((error) => {
        console.error('Error updating Markdown:', error);
      });
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this Markdown content?')) {
      axios
        .delete(`https://markdown-connecting.onrender.com/api/markdown/delete-markdown/${id}`)
        .then(() => {
          // Remove the deleted content from the local state
          setMarkdownList((prevList) => prevList.filter((markdown) => markdown._id !== id));
        })
        .catch((error) => {
          console.error('Error deleting Markdown:', error);
        });
    }
  };

  return (
    <div>
      <br />
      <h2 className="mb-4" style={{ textTransform: 'uppercase', color: 'red' }}>
        Markdown List..
      </h2>
      <hr />
      <div>
        {markdownList.map((markdown) => (
          <div key={markdown._id} className="card mb-3">
            <div className="card-body">
              {editingId === markdown._id ? (
                <div>
                  <textarea
                    rows="5"
                    className="form-control mb-3"
                    value={editedMarkdown}
                    onChange={(e) => setEditedMarkdown(e.target.value)}
                  />
                  <button
                    className="btn btn-primary me-2"
                    onClick={() => handleSaveEdit(markdown._id)}
                  >
                    <FaSave /> Save
                  </button>
                  <button className="btn btn-secondary" onClick={handleCancelEdit}>
                    <FaTimes /> Cancel
                  </button>
                </div>
              ) : (
                <div>
                  <ReactMarkdown>{markdown.content}</ReactMarkdown>
                  <div className="mt-3">
                    <button
                      className="btn btn-primary me-4"
                      onClick={() => handleEdit(markdown._id, markdown.content)}
                    >
                      <FaEdit />
                    </button>
                    <button
                      className="btn btn-secondary"
                      onClick={() => handleDelete(markdown._id)}
                    >
                      <FaTrash />
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
      <ToastContainer />
    </div>
  );
}

export default MarkdownList;
