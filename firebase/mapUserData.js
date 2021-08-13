export const mapUserData = (user) => {
    const { uid, email, xa, displayName, photoUrl } = user
    console.log('mapped user data:', uid, ' email: ', email, ' name: ', displayName)
    return {
        id: uid,
        email: email,
        token: xa,
        name: displayName,
        photoUrl: photoUrl
    }
}