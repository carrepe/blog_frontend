import React, { useRef } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

function Editor({ content, setContent }) {
  const quillRef = useRef();

  const modules = {
    toolbar: [
      [{ header: [1, 2, 3, 4, 5, 6, false] }, { font: [] }],
      ['bold', 'italic', 'underline', 'strike', 'blockquote'],
      [
        { list: 'ordered' },
        { list: 'bullet' },
        { indent: '-1' },
        { indent: '+1' },
      ],
      ['link', 'image', 'video'],
      ['clean'],
    ],
  };

  return (
    <div>
      <ReactQuill
        ref={quillRef}
        theme="snow"
        value={content}
        modules={modules}
        onChange={setContent}
      />
    </div>
  );
}
export default Editor;
