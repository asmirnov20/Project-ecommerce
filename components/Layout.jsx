import Head from 'next/head'
import Footer from './Footer/Footer'
import Navbar from './Navbar/Navbar'

const Layout = ({ children }) => {
    return (
        <div className='layout'>
            <Head>
                <title> Andrey Store</title>
            </Head>
            <header>
                <Navbar />
            </header>
            <main className='main-container'>
                {children}
            </main>
            <footer>
                <Footer />
            </footer>
        </div>
    )
}

export default Layout