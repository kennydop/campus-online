import Feed from "../components/Feed";
import Sidebar from "../components/Sidebar";
import Stories from "../components/Stories";
import Layout from "../components/Layout";

function campusonline() {

    return (
            <div className='flex flex-grow w-screen justify-center lg:justify-start overflow-y-scroll'>
                <Sidebar />
                <div>
                <Stories />
                <Feed />
                </div>
            </div>
    )
}

campusonline.getLayout = function getLayout(page) {
    return (
        <Layout>
            {page}
        </Layout>
    )
}
export default campusonline
