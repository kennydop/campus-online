import Document, { Html, Head, Main, NextScript } from 'next/document'

class MyDocument extends Document{
    static async getInitialProps(ctx){
        const initailProps = await Document.getInitialProps(ctx)
        return {...initailProps}
    }

    render(){
        return(
            <Html>
                <Head/>
                <body>
                    <Main/>
                    <NextScript/>
                    <div id ='modal-root'/>
                </body>
            </Html>
        )
    }
}

export default MyDocument