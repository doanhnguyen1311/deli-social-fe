import { Outlet } from "react-router-dom"
import MessengerSidebar from "../component_helper/Messenger"
import Header from "../component_helper/Header"
import MiniSidebar from "../component_helper/MiniSidebar"
import RecentActivity from "../component_helper/Activity"
import GroupHeader from "../component_helper/GroupHeader"
import GroupInfo from "../component_helper/GroupInfo"

const GroupLayout = () => {
    return (
        <div className='main-layout h-100vh'>
            <div className="d-flex h-100">
                <MiniSidebar />
                <div className="bg-white h-100vh w-100 hide-scrollbar" style={{overflowY: 'auto'}}>
                    <Header />
                    <div>
                        <GroupHeader />
                        <div className="d-flex" style={{width: '1140px', margin: 'auto'}}>
                            <GroupInfo />
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

export { GroupLayout }