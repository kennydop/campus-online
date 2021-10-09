import ButtomNavbar from "./ButtomNavbar";
import Header from "./Header";

export default function Layout({children}) {
    return (
        <>
            <Header/>
            <ButtomNavbar/>
            <main>{children}</main>
        </>
    )
}
