import style from '../css/CommentsArea.module.css';
import CommentsLi from './CommentsLi';
import { url } from '../store/ref';
import { useCallback, useEffect, useState } from 'react';

const CommentsArea = ({ userName, postId }) => {
  const [comments, setComments] = useState();
  const [editingCommentId, setEditingCommentId] = useState(null);

  const fetchComments = useCallback(async () => {
    fetch(`${url}/commentList/${postId}`) //
      .then((res) => res.json()) //
      .then((data) => setComments(data));
  }, [postId]);

  const commentAdd = useCallback(async () => {
    const content = document.getElementById('content').value;
    const data = new FormData();
    data.set('postId', postId);
    data.set('content', content);

    const response = await fetch(`${url}/commentAdd`, {
      method: 'POST',
      body: data,
      credentials: 'include',
    });
    console.log(response);
    if (response.ok) {
      await fetchComments();
      document.getElementById('content').value = '';
      document.getElementById('content').focus();
    }
  }, [postId, fetchComments]);

  useEffect(() => {
    fetchComments();
  }, [fetchComments, commentAdd]);

  return (
    <section className={style.commentsArea}>
      <h3>댓글영역</h3>
      {userName ? (
        <div>
          <textarea name="content" id="content"></textarea>
          <button onClick={commentAdd}>댓글입력</button>
        </div>
      ) : (
        <p>로그인 하면 댓글을 등록할 수 있습니다.</p>
      )}

      <hr />
      <ul>
        {comments?.map((comment) => {
          return (
            <CommentsLi
              key={comment._id}
              comment={comment}
              userName={userName}
              editingCommentId={editingCommentId}
              setEditingCommentId={setEditingCommentId}
              fetchComments={fetchComments}
            />
          );
        })}
      </ul>
    </section>
  );
};

export default CommentsArea;
