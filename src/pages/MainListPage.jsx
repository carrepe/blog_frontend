import { useEffect, useState } from 'react';
import PostCard from '../components/PostCard';

import { url } from '../store/ref';

const MainListPage = () => {
  const [postList, setPostList] = useState([]);

  useEffect(() => {
    fetch(`${url}/postList`)
      .then((res) => res.json())
      .then((data) => setPostList(data));
  }, []);

  return (
    <main className="mw mainList">
      <h2>블로그 리스트 & 메인페이지</h2>
      <div className="postsCon">
        {postList.length === 0 && (
          <p style={{ padding: '100px 0', textAlign: 'center' }}>
            등록된 글이 없어요~ 새글의 주인이 되어주세욤~
          </p>
        )}
        {postList.map((post) => (
          <PostCard key={post._id} post={post} />
        ))}
      </div>
    </main>
  );
};

export default MainListPage;
