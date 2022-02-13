import { useContext, useState, createContext, useEffect } from "react"

const TabActive = createContext("home")

export function useActiveTab(){
  return useContext(TabActive)
}

export function ActiveTab({children}){
  const ssat = typeof window !== 'undefined' && sessionStorage.getItem('activeTab')
  const sspt = typeof window !== 'undefined' && sessionStorage.getItem('prevTab')
  const ssppt = typeof window !== 'undefined' && sessionStorage.getItem('prevPrevTab')
  const [tabActive, setTabActive] = useState(ssat !== null ? ssat : 'home')
  const [prevTab, setPrevTab] = useState(sspt !== null  ? sspt : 'home')
  const [prevPrevTab, setPrevPrevTab] = useState(ssppt !== null  ? ssppt : 'home')


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