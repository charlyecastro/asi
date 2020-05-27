
import Link from 'next/link'

export default function Home() {
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
                    </ul>
                </menu>
            </nav>
        </header>
    )
}
