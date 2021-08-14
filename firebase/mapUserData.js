export const mapUserData = (user) => {
    const { uid, email, xa, displayName, photoUrl } = user
    return {
        id: uid,
        email: email,
        token: xa,
        name: displayName,
        photoUrl: photoUrl
    }
}
export const mapUserInfo = (userInfo) => {
    const { college, email, photoURL, provider, username } = userInfo
    return {
        college,
        email,
        name: username,
        provider,
        photoUrl: photoURL,
    }
}