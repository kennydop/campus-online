import { useContext, useState, createContext } from "react"

const TabActive = createContext("home")

export function useActiveTab(){
    return useContext(TabActive)
}

export function ActiveTab({children}){
    const [tabActive, set_TabActive] = useState('home')
    const [prevTab, set_PrevTab] = useState()
    const [prevPrevTab, set_PrevPrevTab] = useState()

    function setTabActive(tab){
        set_TabActive(tab)
    }
    function setPrevTab(tab){
        set_PrevTab(tab)
    }
    function setPrevPrevTab(tab){
        set_PrevPrevTab(tab)
    }

    const value = {
        tabActive,
        prevTab,
        prevPrevTab,
        setTabActive,
        setPrevTab,
        setPrevPrevTab,
    }

    return(
        <TabActive.Provider value={value}>
            {children}
        </TabActive.Provider>
    )
}