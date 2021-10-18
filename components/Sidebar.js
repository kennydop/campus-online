import React from "react";
import { ArrowLeftIcon } from "@heroicons/react/outline";

export const Sidebar = ({ width, children }) => {
  const [xPosition, setX] = React.useState(-width);

  const toggleMenu = () => {
    if (xPosition > 0) {
      setX(0);
    } else {
      setX(-width);
    }
  };

  React.useEffect(() => {
    setX(0);
  }, []);
  return (
    <React.Fragment>
      <div
        className="side-bar"
        style={{
          transform: `translatex(-100%)`,
          width: '100%',
          minHeight: '100vw'
        }}
      >
        <div className='shadow-sm dark:shadow-md py-3 flex w-full cursor-default'>
                <ArrowLeftIcon onClick={()=>toggleMenu()} className='cursor-pointer h-6  mx-4 hover:-translate-x-1 transform transition-all duration-200 text-gray-500 dark:text-gray-400'/>
                <div className='self-center text-gray-500 dark:text-gray-400 items-center '>Settings</div>
          </div>
        {/* <button
          onClick={() => toggleMenu()}
          className="toggle-menu"
          style={{
            transform: `translate(${width}px, 20vh)`
          }}
        ></button> */}
        <div className="content">{children}</div>
      </div>
    </React.Fragment>
  );
};
export default Sidebar