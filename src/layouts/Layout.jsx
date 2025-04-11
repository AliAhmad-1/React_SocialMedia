import { Outlet } from "react-router-dom";
import Sidebar from "../Components/Sidebar";
import RightSection from "../Components/RightSection";

export default function Layout() {
  return (
    
    <div className={'base-container'}>
      <Sidebar/>
      <Outlet/>
      <RightSection/>
    </div>  
)
}
