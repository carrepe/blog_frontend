import { useNavigate, useParams } from 'react-router-dom';
import style from '../css/DetailPage.module.css';
import { url } from '../store/ref';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import CommentsArea from '../components/CommentsArea';

const DetailPage = () => {
  const user = useSelector((state) => state.user.user);
  const userName = user?.username;
  const navigate = useNavigate();

  const { postId } = useParams();
  const [postInfo, setPostInfo] = useState();

  useEffect(() => {
    fetch(`${url}/postDetail/${postId}`) //
      .then((res) => res.json()) //
      .then((data) => setPostInfo(data));
  }, [postId]);

  const date = new Date(postInfo?.createdAt);
  const day = date.toLocaleDateString();
  const time = date.toLocaleTimeString([], {
    hour: '2-digit',
    minute: '2-digit',
  });

  const editPost = () => {
    navigate(`/edit/${postId}`);
  };

  const deletePost = () => {
    fetch(`${url}/deletePost/${postId}`, {
      method: 'DELETE',
    })
      .then((res) => res.json())
      .then((res) => {
        if (res.message === 'ok') {
          navigate('/');
        }
      });
  };

  return (
    <main className={`mw ${style.detail}`}>
      <h2>상세페이지</h2>
      <section>
        <div className={style.detailimg}>
          <img src={`${url}/${postInfo?.cover}`} alt={postInfo?.title} />
          <h3>{postInfo?.title}</h3>
        </div>
        <div className={style.info}>
          <p>작성자: {postInfo?.author}</p>
          <p>
            작성일: {day} / {time}
          </p>
        </div>
        <div className={style.summary}>{postInfo?.summary}</div>
        <div
          className={style.desc}
          dangerouslySetInnerHTML={{ __html: postInfo?.content }}
        />
      </section>
      <hr />
      <section className={style.btns}>
        {userName === postInfo?.author && (
          <>
            <button onClick={editPost}>수정</button>
            <button onClick={deletePost}>삭제</button>
          </>
        )}

        <button
          onClick={() => {
            navigate('/');
          }}
        >
          목록으로
        </button>
      </section>
      <hr />
      <CommentsArea userName={userName} postId={postId} />
    </main>
  );
};

export default DetailPage;
