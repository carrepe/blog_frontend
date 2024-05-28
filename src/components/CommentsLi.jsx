import { useState } from 'react';
import style from '../css/CommentsLi.module.css';
import { url } from '../store/ref';

const CommentsLi = ({
  comment,
  userName,
  editingCommentId,
  setEditingCommentId,
  fetchComments,
}) => {
  const [updateComment, setUpdateComment] = useState('');
  const day = new Date(comment.updatedAt);
  const date = day.toLocaleDateString();

  const editComment = (e) => {
    setEditingCommentId(e.target.parentNode.parentNode.dataset.id);
    setUpdateComment(e.target.parentNode.querySelector('p').textContent);
  };

  const deleteComment = async () => {
    const response = await fetch(`${url}/deleteComment/${comment._id}`, {
      method: 'DELETE',
    });
    if (response.ok) {
      setEditingCommentId(null);
      fetchComments();
    }
  };

  const editCommentUpdate = async () => {
    const response = await fetch(`${url}/editCommentUpdate/${comment._id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        content: updateComment,
      }),
    });
    if (response.ok) {
      setEditingCommentId(null);
      fetchComments();
    }
  };

  const cancleCommentUpdate = () => {
    setEditingCommentId(null);
  };

  return (
    <li data-id={comment._id}>
      {editingCommentId === comment._id ? (
        <div className={style.editCon}>
          <textarea
            name="content"
            id={comment._id}
            value={updateComment}
            onChange={(e) => {
              setUpdateComment(e.target.value);
            }}
          ></textarea>
          <button onClick={editCommentUpdate}>수정진짜완료</button>
          <button onClick={cancleCommentUpdate}>취소</button>
        </div>
      ) : (
        <div className={style.list}>
          <p className={style.content}>{comment.content}</p>
          <p className={style.author}>{comment.author}</p>
          <p className={style.date}>{date}</p>
          {userName === comment.author ? (
            <>
              <button onClick={editComment}>수정</button>
              <button onClick={deleteComment}>삭제</button>
            </>
          ) : (
            <>
              <button disabled>수정</button>
              <button disabled>삭제</button>
            </>
          )}
        </div>
      )}
    </li>
  );
};

export default CommentsLi;
