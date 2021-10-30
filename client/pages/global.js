import FeedContent from "../components/FeedContent"
import Stories from "../components/Stories"
import { FeedLayout } from "../Layouts/Layouts"

export default function Global() {
    return (
        <div>
            <Stories/>
            <FeedContent />
        </div>
    )
}

Global.getLayout = function getLayout(page) {
    return (
        <FeedLayout>
            {page}
        </FeedLayout>
    )
}