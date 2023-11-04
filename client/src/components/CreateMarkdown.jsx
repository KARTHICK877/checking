
import React, { useState } from 'react';
import axios from 'axios';
import ReactMarkdown from 'react-markdown';
import { FaSave } from 'react-icons/fa';

function CreateMarkdown({ markdownList, setMarkdownList }) {
  const [newMarkdownContent, setNewMarkdownContent] = useState('');

  const createMarkdown = () => {
    axios.post('https://markdown-connecting.onrender.com/api/markdown/create-markdown', {
        content: newMarkdownContent
      })
      .then((response) => {
        // Update the markdownList with the new data
        setMarkdownList([...markdownList, response.data]);
        setNewMarkdownContent('');
      })
      .catch((error) => {
        console.error('Error creating Markdown:', error);
      });
  };

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-6 bg-light">
          <div className="p-4">
            <h2 style={{color:'red', textTransform:'uppercase'}}>Create New Markdown</h2>
            <br />
            <textarea
            style={{border:' solid green 2px', borderRadius:'30px'}}
              rows="20"
              value={newMarkdownContent}
              onChange={(e) => setNewMarkdownContent(e.target.value)}
              required
              className="form-control"
            />
            <button onClick={createMarkdown} className="btn btn-primary mt-3">
              <FaSave /> Save
            </button>
          </div>
        </div>
        <div className="col-md-6">
          <div className="p-4">
            <h3 style={{color:'GrayText', textTransform:'uppercase'}}>Preview :~</h3>
            <hr />
            <br />
            <div className="preview-container">
              <ReactMarkdown>{newMarkdownContent}</ReactMarkdown>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CreateMarkdown;

