import { useEffect, useState } from 'react';
import style from '../css/CreatePage.module.css';
import Editor from './Editor';
import { url } from '../store/ref';
import { useNavigate, useParams } from 'react-router-dom';

const EditPage = () => {
  const [title, setTitle] = useState('');
  const [summary, setSummary] = useState('');
  const [files, setFiles] = useState('');
  const [content, setContent] = useState('');
  const [cover, setCover] = useState('');

  const [message1, setMessage1] = useState('');
  const [message2, setMessage2] = useState('');

  const navigate = useNavigate();
  const { postId } = useParams();

  useEffect(() => {
    const getPost = async () => {
      const res = await fetch(`${url}/editpage/${postId}`);
      const result = await res.json();
      setTitle(result.title);
      setSummary(result.summary);
      setContent(result.content);
      setCover(result.cover);
    };
    getPost();
  }, [postId]);

  const updatePost = async (e) => {
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

    const data = new FormData();
    data.set('title', title);
    data.set('summary', summary);
    data.append('content', content);
    if (files?.[0]) {
      data.set('files', files?.[0]);
    }

    const response = await fetch(`${url}/editPost/${postId}`, {
      method: 'PUT',
      body: data,
      credentials: 'include',
    });
    const result = await response.json();
    if (result.message === 'ok') {
      navigate(`/detail/${postId}`);
    }
  };

  return (
    <main className="mw">
      <h2>새글 등록 </h2>
      <form className={style.writeCon} onSubmit={updatePost}>
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
        <p className={style.smallImgCon}>
          <img src={`${url}/${cover}`} alt={title} />
        </p>
        <p>&nbsp;</p>

        <label htmlFor="content">내용</label>
        <Editor content={content} setContent={setContent} />
        <button>포스트 수정</button>
      </form>
    </main>
  );
};
export default EditPage;
