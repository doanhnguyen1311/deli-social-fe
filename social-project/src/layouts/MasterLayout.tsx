import { Outlet } from "react-router-dom"
import Sidebar from "../component_helper/Sidebar"
import MessengerSidebar from "../component_helper/Messenger"
import Header from "../component_helper/Header"
import RightSidebar from "../component_helper/RightSidebar"
import { useRef } from "react"

const MasterLayout = () => {
    const scrollContainerRef = useRef<HTMLDivElement | null>(null);

    return (
        <div className='main-layout h-100vh'>
            <div className="d-flex h-100">
                <Sidebar/>
                <div
                  ref={scrollContainerRef}
                  className="bg-white h-100vh w-100 hide-scrollbar overflow-y-auto" // 👈 thêm overflow
                >
                    <div className="d-flex">
                        <div className="bg-gray d-flex flex-column gap-16px flex-1 py-16 px-16">
                            {/* Truyền ref xuống Header */}
                            <Header scrollContainer={scrollContainerRef} />
                            <Outlet />
                        </div>
                        <RightSidebar />
                    </div>
                </div>
            </div>
        </div>
    )
}

export { MasterLayout }
