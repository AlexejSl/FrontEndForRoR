import { BrowserRouter, Route, Routes } from "react-router-dom";
import MainScreen from "./screens/MainScreen";
import PostScreen from "./screens/PostScreen";
import AddPostScreen from "./screens/AddPostScreen";
import Users from "./screens/Users";
import UsersPosts from "./screens/UsersPosts";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<MainScreen />} path="/" />
        <Route element={<PostScreen />} path="/post/:postId" />
        <Route element={<Users />} path="/users" />
        <Route element={<UsersPosts />} path="/users/:name" />
        <Route element={<AddPostScreen />} path="/addPost" />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
