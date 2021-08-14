import Header from "../components/Header";
import {useUser} from "../firebase/useUser";

function campusonline() {
    const {userInfo} = useUser()

    return (
        <div>
            <Header />
        </div>
    )
}

export default campusonline
