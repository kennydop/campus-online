import { useContext, useState, createContext, useEffect } from "react"

const TabActive = createContext(["home"])

export function useActiveTab(){
  return useContext(TabActive)
}

export function ActiveTab({children}){
  const [tabActive, _setTabActive] = useState(['home'])

  function setTabActive(to, replace){
    if(to === "go back"){
      const newTabs = tabActive; 
      newTabs.pop();
      _setTabActive([...newTabs])
    }else if(replace){
      if(tabActive[tabActive.length-1]===to)return;
      var tabs = tabActive;
      tabs[tabs.length-1]=to
      _setTabActive([...tabs])
    }else{
      if(tabActive[tabActive.length-1]===to)return; 
      const newTabs = tabActive; 
      _setTabActive([...newTabs, to])
    }
  }

  const value = {
    tabActive,
    setTabActive,
  }

  return(
    <TabActive.Provider value={value}>
        {children}
    </TabActive.Provider>
  )
}