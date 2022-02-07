/* eslint-disable react-hooks/exhaustive-deps */
import { SiteLayout } from "../../Layouts/Layouts"
import axios from 'axios'
import {NotFound} from "../../components/404"
import Post from "../../components/Post"
import ProfileToFollow from "../../components/ProfileToFollow"
import { useEffect, useState } from "react"
import { useActiveTab } from "../../contexts/ActiveTabContext"

function PostPage({_post}) {
  const [author, setAuthor] = useState()
  const { setTabActive } = useActiveTab()
  
  useEffect(() => {
    async function getAuthor(){
      axios.get(process.env.NEXT_PUBLIC_SERVER_BASE_URL+"/api/users/"+_post.authorId).then((res)=>{
        setAuthor(res.data)
      })
    }
    (!_post.isAnonymous && !author) && getAuthor()
    setTabActive('pagepost');
  }, [])

  return (
    _post ?
    <>
    <div className="flex w-full justify-center minus-header bg-white h-full dark:bg-bdark-100 pb-20">
		  <Post _post={_post} page/>
      <div className="hidden md:block md:w-4/12">
        <div className="w-full sticky top-16">
          {author && <ProfileToFollow id={author?._id} username={author?.username} name={author?.name} pic={author?.profilePicture} college={author?.college}/>}
          {_post.isAnonymous && <span className="text-gray-500 dark:text-gray-400 flex items-center justify-center py-8 border-b border-gray-200 dark:border-bdark-200">This was posted anonymously</span>}
        </div>
      </div>
    </div>
    </>
    :
    <NotFound type="post"/>
  )
}

PostPage.getLayout = function getLayout(page) {
  return (
    <SiteLayout>
        {page}
    </SiteLayout>
  )
}

export async function getServerSideProps(context) {
  const _post = await (await axios.get(process.env.NEXT_PUBLIC_SERVER_BASE_URL+"/api/posts/" + context.query.post)).data
  return {
    props: {
      _post,
    },
  }
}

export default PostPage
