import { useEffect, useState } from 'react';
import { url } from '../store/ref';
import { useNavigate } from 'react-router-dom';

const MyPage = () => {
  const [myPosts, setMyPosts] = useState([]);
  const [myInfo, setMyInfo] = useState({});
  const navigator = useNavigate();

  useEffect(() => {
    fetch(`${url}/myPostList`, {
      credentials: 'include',
    })
      .then((res) => res.json())
      .then((data) => {
        setMyPosts(data.myPostList);
        setMyInfo(data.user[0]);
      });
  }, []);

  const editMyInfo = () => {
    navigator('/editMyInfo');
  };

  return (
    <main className="mw">
      <h1>MyPage</h1>
      <h2>나의 정보</h2>
      <div>
        <p>아이디: {myInfo?.id} </p>
        <p>이름: {myInfo?.username} </p>
        <p>이메일: {myInfo?.email} </p>
        <p
          style={{
            width: '100px',
            height: '100px',
            borderRadius: '50%',
            overflow: 'hidden',
          }}
        >
          <img
            src={`${url}/${myInfo?.profile}`}
            alt={myInfo?.username}
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          />
        </p>
        <button onClick={editMyInfo}>개인정보수정</button>
      </div>
      <hr />
      <h2>내가 남긴 글목록</h2>
      <ul>
        {myPosts.length === 0 && <li>작성한 글이 없습니다.</li>}
        {myPosts.map((post) => (
          <li key={post._id}>
            <a href={`/detail/${post._id}`}>
              <img width={'50px'} src={`${url}/${post.cover}`} alt="썸네일" />
              {post.title}
            </a>
          </li>
        ))}
      </ul>
    </main>
  );
};

export default MyPage;
