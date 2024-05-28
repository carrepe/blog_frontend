import React, { useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { setUserAllInto } from '../store/userStore';
import { url } from '../store/ref';

const Header = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const user = useSelector((state) => state.user.user);
  const username = useMemo(() => (user ? user.username : null), [user]);

  useEffect(() => {
    const fetchProfile = async () => {
      const response = await fetch(`${url}/profile`, {
        credentials: 'include',
      });
      if (response.ok) {
        const userInfo = await response.json();
        dispatch(setUserAllInto(userInfo));
      }
    };
    fetchProfile();
  }, [dispatch, location.pathname]);

  //로그아웃 기능
  const logout = (e) => {
    e.preventDefault();
    fetch(`${url}/logout`, {
      method: 'POST',
      credentials: 'include',
    });
    dispatch(setUserAllInto(null));
    navigate('/');
  };
  return (
    <header className="mw hd">
      <h1>
        <Link to="/">로고</Link>
      </h1>
      {username ? (
        <nav>
          <Link to="/mypage">{username}님 입장</Link>
          <Link to="/" onClick={logout}>
            로그아웃
          </Link>
          <Link to="/create">포스트작성</Link>
        </nav>
      ) : (
        <nav>
          <Link to="/login">로그인</Link>
          <Link to="/register">회원가입</Link>
        </nav>
      )}
    </header>
  );
};

export default React.memo(Header);
