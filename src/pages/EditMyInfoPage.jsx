import style from '../css/RegisterPage.module.css';
import { useState, useEffect } from 'react';
import { url } from '../store/ref';
import { useNavigate } from 'react-router-dom';

const EditMyInfoPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [pdcon, setPdcon] = useState('');
  const [email, setEmail] = useState('');
  const [files, setFiles] = useState('');
  const [cover, setCover] = useState('');
  const [message3, setMessage3] = useState('');

  const navigate = useNavigate();

  useEffect(() => {
    fetch(`${url}/myPostList`, {
      credentials: 'include',
    })
      .then((res) => res.json())
      .then((data) => {
        setUsername(data.user[0].username);
        setEmail(data.user[0].email);
        setCover(data.user[0].profile);
      });
  }, []);

  const myInfoUpdate = async (e) => {
    e.preventDefault();

    if (password === '') {
      setPassword('');
      setPdcon('');
    }
    if (password !== pdcon) {
      setMessage3('비밀번호가 같지 않습니다.');
      return;
    } else {
      setMessage3('');
    }

    const formData = new FormData();
    formData.set('username', username);
    formData.set('password', password);
    formData.set('email', email);
    formData.set('profileImg', files[0]);
    formData.set('cover', cover);

    const response = await fetch(`${url}/editMyInfo`, {
      method: 'PUT',
      body: formData,
      credentials: 'include',
    });
    console.log(response);
    if (response.status === 200) {
      navigate('/mypage');
    }
  };

  return (
    <main className={`mw ${style.register}`}>
      <h2>개인정보수정</h2>
      <form onSubmit={myInfoUpdate}>
        <input type="text" placeholder="사용자이름" value={username} disabled />
        <input
          id="password"
          name="password"
          type="password"
          placeholder="패스워드를 입력하지 않으면 기존 패스워드 유지됩니다."
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        />
        <input
          id="password2"
          name="password2"
          type="password"
          placeholder="패스워드확인"
          value={pdcon}
          onChange={(e) => {
            setPdcon(e.target.value);
          }}
        />
        <span>{message3}</span>
        <input
          id="email"
          name="email"
          type="emall"
          placeholder="이메일"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
          }}
        />
        <p className={style.profile}>
          <label htmlFor="profileImg">프로필사진</label>
          <input
            type="file"
            name="files"
            id="profileImg"
            onChange={(e) => setFiles(e.target.files)}
          />
        </p>
        <button>회원정보 수정</button>
      </form>
    </main>
  );
};

export default EditMyInfoPage;
