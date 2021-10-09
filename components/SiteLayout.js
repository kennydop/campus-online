import ButtomNavbar from "./ButtomNavbar";
import Header from "./Header";

export default function SiteLayout({children}) {
    return (
        <>
            <Header/>
            <ButtomNavbar/>
            <main>{children}</main>
        </>
    )
}
