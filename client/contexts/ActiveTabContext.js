import { useContext, useState, createContext, useEffect } from "react"

const TabActive = createContext("home")

export function useActiveTab(){
    return useContext(TabActive)
}

export function ActiveTab({children}){
    const ssat = typeof window !== 'undefined' && sessionStorage.getItem('activeTab')
    const sspt = typeof window !== 'undefined' && sessionStorage.getItem('prevTab')
    const ssppt = typeof window !== 'undefined' && sessionStorage.getItem('prevPrevTab')
    const [tabActive, set_TabActive] = useState(ssat !== null ? ssat : 'home')
    const [prevTab, set_PrevTab] = useState(sspt !== null  ? sspt : 'home')
    const [prevPrevTab, set_PrevPrevTab] = useState(ssppt !== null  ? ssppt : 'home')

    function setTabActive(tab){
        set_TabActive(tab)
    }
    function setPrevTab(tab){
        set_PrevTab(tab)
    }
    function setPrevPrevTab(tab){
        set_PrevPrevTab(tab)
    }

    useEffect(() => {
        sessionStorage.setItem('activeTab', tabActive === null || tabActive === 'undefined' ?'home':tabActive)
        sessionStorage.setItem('prevTab',  tabActive === null || tabActive === 'undefined' ?'home':prevTab)
        sessionStorage.setItem('prevPrevTab',  tabActive === null || tabActive === 'undefined' ?'home':prevPrevTab)
    })

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