import Image from "next/image"
import { Button } from '../../../components/ui/button'
import WorkspaceHistory from './WorkspaceHistory'
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarHeader,
    useSidebar,
  } from "../../../components/ui/sidebar"

 
import { LogOut, MessageCircleCode, SettingsIcon} from "lucide-react"
import { useContext } from "react"
import { UserContext } from "../../context/UserContext"
import { useRouter } from "next/navigation"

   
  export function AppSidebar() {

    const {user,setUser}=useContext(UserContext)
    const {toggleSideBar} =useSidebar()
    const router =useRouter()
    const handleLogoClick = () => {
      router.push("/");
    };
    return (
      <Sidebar>
        
        <SidebarHeader className='p-3' />
        <Image  src={'/logo.png'} width={30} height={30} alt="logo" className="m-3 cursor-pointer" onClick={handleLogoClick}/>
        <SidebarContent className='p-5'>
          <Button>  <MessageCircleCode/> Start new chat</Button>

          <WorkspaceHistory/>
          <SidebarGroup />
          
        </SidebarContent>
        <SidebarFooter>
         <div className="bg-gray-900 flex flex-col"> 
          <div className="flex p-2 text-md gap-2 cursor-pointer"><SettingsIcon/>  Settings</div>
          <div className="flex p-2 text-md gap-2 cursor-pointer"><LogOut/>  SignOut</div>
          <div className="flex p-2 text-md gap-2 cursor-pointer">{user &&<Image className="rounded-full cursor-pointer" onClick={toggleSideBar} src={user?.image} alt="user" width={30} height={30} />} <h2 className="font-semibold text-white">{user?.name}</h2></div>

         </div>
        </SidebarFooter>
      </Sidebar>
    )
  }