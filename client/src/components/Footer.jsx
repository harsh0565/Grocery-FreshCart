import { Link } from "react-router-dom";
import { assets, footerLinks } from "../assets/assets";

const Footer = () => {
    return (
        <div className="px-6 md:px-16 lg:px-24 xl:px-32 mt-25 bg-primary/10">
            <div className="flex flex-col md:flex-row items-start justify-between gap-10 py-10 border-b border-gray-500/30 text-gray-500">
                <div>
                    <img className="w-34 md:w-32" src={assets.logo} alt="Logo" />
                    <p className="max-w-[410px] mt-6">We deliver excellence straight to your doorstep with reliable, on-time service, ensuring your order arrives safely. Whether near or far, we’re committed to making your shopping experience seamless from start to finish, bringing quality to you wherever you are.</p>
                </div>
                <div className="flex flex-wrap justify-between w-full md:w-[45%] gap-5">
                    {footerLinks.map((section, index) => (
                        <div key={index}>
                            <h3 className="font-semibold text-base text-gray-900 md:mb-5 mb-2">{section.title}</h3>
                            <ul className="text-sm space-y-1">
                                {section.links.map((link, i) => (
                                    <li key={i}>
                                        <Link onClick={() => window.scrollTo(0, 0)} to={link.url} target={section.title === "Follow Us" ? `_blank` : `_self`} className="hover:underline transition">{link.text}</Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>
            </div>
            <p className="py-4 text-center text-sm md:text-base text-gray-500/80">
                Copyright {new Date().getFullYear()} © Harsh Sengar All Right Reserved.
            </p>
        </div>
    );
};

export default Footer;