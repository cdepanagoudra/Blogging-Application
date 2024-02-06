import logo from "./logo.svg";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Button } from "reactstrap";
import Base from "./components/Base";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Pages/Home";
import Login from "./Pages/Login";
import Signup from "./Pages/Signup";
import About from "./Pages/About";
import Services from "./Pages/Services";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Userdashboard from "./Pages/user-routes/userdashboard";
import Privateroute from "./components/Privateroute";
import ProfileInfo from "./Pages/user-routes/ProfileInfo";
import PostPage from "./Pages/PostPage";
import UserProvider from "./context/UserProvider";
import Categories from "./Pages/Categories";
import UpdateBlog from "./Pages/UpdateBlog";
function App() {
  return (
    <UserProvider>
      
        <BrowserRouter>
          <ToastContainer position="top-center" />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            {/* <Route path="/about" element={<About />} /> */}
            <Route path="/services" element={<Services />} />
            <Route path="/post/:id" element={<PostPage />} />
            <Route path="/categories/:id" element={<Categories />} />

            <Route path="/user" element={<Privateroute />}>
              <Route path="dashboard" element={<Userdashboard />}></Route>
              <Route path="profile-info/:userId" element={<ProfileInfo />}></Route>
              <Route path="update-blog/:blogId" element={<UpdateBlog />}></Route>
            </Route>
          </Routes>
        </BrowserRouter>
     
    </UserProvider>
  );
}

export default App;
