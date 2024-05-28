import { useNavigate } from 'react-router-dom';
import style from '../css/PostCard.module.css';
import { url } from '../store/ref';

const PostCard = ({ post }) => {
  const navigate = useNavigate();
  const date = new Date(post.createdAt);
  const day = date.toLocaleDateString();
  const time = date.toLocaleTimeString([], {
    hour: '2-digit',
    minute: '2-digit',
  });

  return (
    <article
      className={style.post}
      onClick={() => {
        navigate(`/detail/${post._id}`);
      }}
    >
      <div className={style.postImg}>
        <img src={`${url}/${post.cover}`} alt="샘플이미지" />
      </div>
      <div className={style.info}>
        <h3>{post.title}</h3>
        <p>{post.summary}</p>
        <p>
          <span>{post.author}</span> / <span>{day}</span> <span>{time}</span>
        </p>
      </div>
    </article>
  );
};
export default PostCard;
