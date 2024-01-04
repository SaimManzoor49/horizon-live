import { create } from "zustand";
 
export enum ChatVariants{
    CHAT="CHAT",
    COMMUNITY="COMMUNITY",
}

interface ChatSidebarProps{
    collapsed:boolean,
    variant:ChatVariants
    onExpand:()=>void,
    onCollapse:()=>void
    onChangeVariant:(variant:ChatVariants)=>void
}

export const useChatSidebar = create<ChatSidebarProps>((set)=>(
    {
        collapsed:false,
        onExpand:()=>set(()=>({collapsed:false})),
        onCollapse:()=>set({collapsed:true}),
        variant:ChatVariants.CHAT,
        onChangeVariant:(variant:ChatVariants)=>set(()=>({variant}))
    }
)) 