import { Outlet } from "react-router-dom"
import MessengerSidebar from "../component_helper/Messenger"
import Header from "../component_helper/Header"
import MiniSidebar from "../component_helper/MiniSidebar"
import SubHeader from "../component_helper/SubHeader"
import MyPhoto from "../component_helper/MyPhoto"
import RecentActivity from "../component_helper/Activity"

const AuthLayout = () => {
    return (
        <div className='main-layout h-100vh'>
            <div className="d-flex h-100">
                <MiniSidebar />
                <div className="bg-white h-100vh w-100 hide-scrollbar" style={{overflowY: 'auto'}}>
                    <Header />
                    <div>
                        <SubHeader />
                        <div className="d-flex" style={{width: '1140px', margin: 'auto'}}>
                            <MyPhoto />
                            <Outlet />
                            <RecentActivity />
                        </div>
                    </div>
                </div>
                <MessengerSidebar />
            </div>
        </div>
    )
}

export { AuthLayout }