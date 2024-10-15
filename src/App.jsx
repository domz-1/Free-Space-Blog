import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";
import NavBar from "./pages/NavBar";
import { SignUp } from "./pages/SignUp";
import { Login } from "./pages/Login";
import  Home  from "./pages/Home";
import './App.scss'
import  ProtectedRoutes  from './pages/ProtectedRoutes';
import { CreatePost } from "./pages/CreatePost";
import { EditPage } from './pages/EditPage';




const Layout = () => {
  return (
    <>
      <NavBar />
      <Outlet />
    </>
  );
};

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
        <Route index element={
          <ProtectedRoutes>
          <Home />
          </ProtectedRoutes>
} />
          <Route path="signIn" element={<SignUp />} />
          <Route path="login" element={<Login />} />

          <Route path="create" element={<CreatePost />} />
          <Route path="edit-post/:id" element={<EditPage/>}/>
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;