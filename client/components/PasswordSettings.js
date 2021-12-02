import { useState } from "react"

function PasswordSettings() {
  const [updateLoading, setUpdateLoading] = useState()

  async function changePassword(){
    setUpdateLoading(true)
  }

  return (
    <div className="w-full h-105 bg-white dark:bg-bdark-100 rounded-b-lg md:rounded-r-lg md:rounded-bl-lg flex flex-col justify-center p-3 shadow-md">
      <div className="block md:hidden text-gray-500 dark:text-gray-400 text-lg font-semibold mb-6 mx-auto">Password</div>
      <div className="flex items-center justify-center my-4">
        <form className="flex mx-auto flex-col space-y-5 p-3 wsc md:w-fit-content" autoComplete='on' onSubmit={changePassword}>
        <label>
          <p className="ml-2 text-gray-500 dark:text-gray-400">Current Password</p>
          <input
            minLength="6"
            required={true}
            type="password"
            autoComplete="current-password"
            className="infofield-edit"
            title="password"
          />
          </label>
        <label>
          <p className="ml-2 text-gray-500 dark:text-gray-400">New Password</p>
          <input
            minLength="6"
            required={true}
            type="password"
            autoComplete="new-password"
            className="infofield-edit"
            title="password"
          />
          </label>
          <div className="flex mt-3">
            <button disabled={updateLoading} className="infobutton-edit mx-auto">Confirm</button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default PasswordSettings
