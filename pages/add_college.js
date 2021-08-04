function add_college() {
    return (
        <div className = "h-screen flex flex-col items-center justify-center">
            <div className = "bg-gray-100 rounded-full space-between justify-center text-center">
                <label className = "text-gray-500 mx-4"> Select College:
                    <select name="college" required = "required" className = "bg-gray-100 text-gray-500 h-12 outline-none pl-5">
                        <option>Academic City College</option>
                        <option>Ashesi University</option>
                        <option>University of Cape Coast</option>
                    </select>
                </label>
            </div>
            <div className = "mt-6">
             <button type = "button" className = "infobutton"> Next</button>
            </div>
        </div>
    )
}

export default add_college
