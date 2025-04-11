import Login from "./pages/Login";
import Home from "./pages/Home";
import Layout from "./layouts/Layout";
import { BrowserRouter,Routes,Route } from "react-router-dom";
import AuthProvider from "./contexts/useAuth";
import ProtectedRoute from "./Components/ProtectedRoute";

import Register from "./pages/Register";
import ChangePassword from "./pages/ChangePassword";
import Following from "./pages/Following";
import Saved from "./pages/Saved";
import Profile from "./pages/Profile";
import Suggestion from "./pages/Suggestion";
import ProfileOtherUser from "./pages/ProfileOtherUser";
import Chat from "./pages/Chat";
import Allchats from "./pages/AllChats";
export default function App() {

    return (
        <div>
            
            <BrowserRouter>
                <AuthProvider>
                    <Routes>
                        <Route path={'/'} element={<Layout/>}>
                            <Route index element={<ProtectedRoute><Home/></ProtectedRoute>}/>
                            <Route path={'/following'} element={<ProtectedRoute><Following/></ProtectedRoute>}/>
                            <Route path={'/posts/saved'} element={<ProtectedRoute><Saved/></ProtectedRoute>}/>
                            <Route path={'/profile'} element={<ProtectedRoute><Profile/></ProtectedRoute>}/>
                            <Route path={'/profileuser/:user_id'} element={<ProtectedRoute><ProfileOtherUser/></ProtectedRoute>}/>
                            <Route path={'/suggestion'} element={<ProtectedRoute><Suggestion/></ProtectedRoute>}/>
                            <Route path={'/chats'} element={<ProtectedRoute><Allchats/></ProtectedRoute>}/>

                            <Route path={"/chats/:user_id"} element={<ProtectedRoute><Chat/></ProtectedRoute>}/>
                        </Route>
                        <Route path={'/changepassword'} element={<ProtectedRoute><ChangePassword/></ProtectedRoute>}/>
                        <Route path={'/login'} element={<Login/>}/>
                        <Route path={'/register'} element={<Register/>}/>
                        
                    </Routes>
                </AuthProvider>

            
            </BrowserRouter>
            
        </div>
)}

