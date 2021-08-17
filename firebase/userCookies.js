import cookies from 'js-cookie'

export const getUserFromCookie = () => {
    const cookie = cookies.get('auth')
    if (!cookie) {
        return
    }
    return JSON.parse(cookie)
}

export const setUserCookie = (user) => {
    cookies.set('auth', JSON.stringify(user), {
        // firebase id tokens expire in one hour
        // set cookie expiry to match
        expires: 1 / 24,
    })
}

export const getUserInfoFromCookie = () => {
    const cookie = cookies.get('userInfo')
    if (!cookie) {
        return
    }
    return JSON.parse(cookie)
}

export const setUserInfoCookie = (userInfo) => {
    cookies.set('userInfo', JSON.stringify(userInfo)),
    {expires: new Date (9999, 1, 1).toUTCString()}
}

export const removeUserCookie = () => cookies.remove('auth')
export const removeUserInfoCookie = () => cookies.remove('userInfo')