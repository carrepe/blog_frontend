import { useState } from 'react';
import style from '../css/CreatePage.module.css';
import Editor from './Editor';
import { url } from '../store/ref';
import { useNavigate } from 'react-router-dom';

const CreatePage = () => {
  const [title, setTitle] = useState('');
  const [summary, setSummary] = useState('');
  const [files, setFiles] = useState('');
  const [content, setContent] = useState('');
  const [message1, setMessage1] = useState('');
  const [message2, setMessage2] = useState('');
  const [message3, setMessage3] = useState('');
  const navigate = useNavigate();

  const createNewPost = async (e) => {
    e.preventDefault();
    if (title === '') {
      setMessage1('제목을 입력해 주세요');
      document.getElementById('title').focus();
      return;
    } else {
      setMessage1('');
    }
    if (summary === '') {
      setMessage2('요약내용을 입력해주세요');
      document.getElementById('summary').focus();
      return;
    } else {
      setMessage2('');
    }
    if (files === '') {
      setMessage3('썸네일 이미지가 필요해요');
      document.getElementById('files').focus();
      return;
    } else {
      setMessage3('');
    }

    const data = new FormData();
    data.set('title', title);
    data.set('summary', summary);
    data.append('content', content);
    data.append('files', files[0]);

    const response = await fetch(`${url}/postWrite`, {
      method: 'POST',
      body: data,
      credentials: 'include',
    });
    if (response.ok) {
      navigate('/');
    }
  };

  return (
    <main className="mw">
      <h2>새글 등록 </h2>
      <form className={style.writeCon} onSubmit={createNewPost}>
        <label htmlFor="title">제목</label>
        <input
          type="text"
          name="title"
          id="title"
          placeholder="제목을 입력해주세요"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <p>&nbsp;{message1}</p>

        <label htmlFor="summary">요약내용</label>
        <input
          type="text"
          name="summary"
          id="summary"
          placeholder="요약내용을 입력해 주세요"
          value={summary}
          onChange={(e) => setSummary(e.target.value)}
        />
        <p>&nbsp;{message2}</p>

        <label htmlFor="files">첨부파일</label>
        <input
          type="file"
          name="files"
          id="files"
          onChange={(e) => setFiles(e.target.files)}
        />
        <p>&nbsp;{message3}</p>

        <label>내용</label>
        <Editor content={content} setContent={setContent} />
        <button>포스트 등록</button>
      </form>
    </main>
  );
};
export default CreatePage;
