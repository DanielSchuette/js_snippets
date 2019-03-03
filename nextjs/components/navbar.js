import Link from "next/link";

/* jshint ignore:start */
const Navbar = () => (
    <div>
        <ul>
            <li>
                <Link href="/"><a>Home</a></Link>
            </li>
            <li>
                <Link href="/about"><a>About</a></Link>
            </li>
        </ul>
    </div>
)
/* jshint ignore:end */

export default Navbar;

/* Styling with JSX: */
//<style jsx>{`
//    ul {
//        background: #333;
//        color: #fff;
//        list-style: none;
//        display: flex;
//    }

//    li {
//        font-size: 18px;
//        margin-right: 24px;
//    }

//    li a {
//        color: #ddd;
//        text-decoration: none;
//    }
//`}</style>
