import './css/my_reset.css';
import './css/App.css';

import Header from './components/Header';
import MainListPage from './pages/MainListPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import CreatePage from './pages/CreatePage';
import DetailPage from './pages/DetailPage';
import EditPage from './pages/EditPage';
import MyPage from './pages/MyPage';
import EditMyInfoPage from './pages/EditMyInfoPage';

import { Route, Routes } from 'react-router-dom';

function App() {
  return (
    <div className="wrap">
      <Header />
      <Routes>
        <Route path="/" element={<MainListPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/create" element={<CreatePage />} />
        <Route path="/detail/:postId" element={<DetailPage />} />
        <Route path="/edit/:postId" element={<EditPage />} />
        <Route path="/mypage" element={<MyPage />} />
        <Route path="/editMyInfo" element={<EditMyInfoPage />} />
        <Route path="*" element={<>잘못된 경로입니다</>} />
      </Routes>
    </div>
  );
}

export default App;
