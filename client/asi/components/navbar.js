
import Link from 'next/link'

export default function Home() {

    const handleSignInClick = () => {
        // Authenticate using via passport api in the backend
        // Open Twitter login page
        window.open("http://localhost/google", "_self");
      };
    return (
        <header>
            <nav>
                <Link href="/">
                    <a className="nav-link"><h3 id="logo">AS&Igrave; </h3></a>
                </Link>

                <menu>
                    <ul>
                        <li>Feature</li>
                        <li>my cookbook</li>
                        <Link href="/publish">
                            <a className="nav-link">publish</a>
                        </Link>
                        <li > <a className="nav-link" onClick={handleSignInClick}>Sign In </a> </li>

                    </ul>
                </menu>
            </nav>
        </header>
    )
}
