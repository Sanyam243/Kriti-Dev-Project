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
import { MessageContext } from "../../context/MessageContext"

   
  export function AppSidebar() {
 const { messages, setMessages } = useContext(MessageContext);
  const { user, setUser } = useContext(UserContext)
    


    const {toggleSideBar} =useSidebar()
    const router =useRouter()
    const handleLogoClick = () => {
      router.push("/");
    };

    const handleSignOut = () => {
      // Clear user from context
      setUser(null);
  
      // Remove user data from localStorage
      localStorage.removeItem("user");
  
      router.push("/"); // or router.push("/login") if you have a specific login page

    };
const pricingClick=()=>{
  router.push("/pricing");  // Navigate to /pricing page
}
    const handleProfileClick = () => {
      router.push("/profile");  // Navigate to /profile page
    };
    return (
      <Sidebar>
        
        <SidebarHeader className='p-3' />
     
          <Image className='rounded-full' src={user?.image||'/logo.png'} alt='User Image' width={40} height={40}  onClick={handleLogoClick}></Image>
        <SidebarContent className='p-5'>
          <Button>  <MessageCircleCode/> Start new chat</Button>
        
          <WorkspaceHistory/>
          <SidebarGroup />
          
        </SidebarContent>
        <SidebarFooter>
          {user?.name?(<div className="bg-gray-900 flex flex-col"> 
          {/* <div className="flex p-2 text-md gap-2 cursor-pointer"  onClick={handleProfileClick}><SettingsIcon /></div> */}
          <div className="flex p-2 text-md gap-2 cursor-pointer" onClick={handleSignOut}><LogOut />  SignOut</div>
          <div className="flex p-2 text-md gap-2 cursor-pointer">{user &&<Image className="rounded-full cursor-pointer" onClick={handleProfileClick} src={user?.image||null} alt="user" width={30} height={30} />} <h2 className="font-semibold text-white" onClick={handleProfileClick}>{user?.name||null}</h2></div>
          <div className="flex p-2 text-md gap-2 cursor-pointer"  onClick={pricingClick}>My Subscription </div>
         </div>):(<div></div>)}
         
        </SidebarFooter>
      </Sidebar>
    )
  }