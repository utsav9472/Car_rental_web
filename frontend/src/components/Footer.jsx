import React from 'react'
import { footerStyles as styles } from '../assets/dummyStyles'
import logo from '../assets/logocar.png'
import { FaEnvelope, FaFacebookF, FaInstagram, FaLinkedinIn, FaMapMarkedAlt, FaPhone, FaTwitter, FaYoutube } from 'react-icons/fa'
import { Link } from "react-router-dom";
import { GiCarKey } from "react-icons/gi";

const Footer = () => {
  return (
    <footer className={styles.container}>
        <div className={styles.topElements}>
            <div className={styles.circle1}/>
            <div className={styles.circle2}/>
            <div className={styles.roadLine}/>
        </div>
        <div className={styles.innerContainer}>
            <div className={styles.grid}>
                <div className={styles.brandSection}>
                    <Link to='/' className="flex items-center">
                    <div className={styles.logoContainer}>
                        <img src={logo} alt="logo" className="h-[1em] w-auto block"
                        style={{
                            display:"block",
                            objectFit:"contain",
                        }}/>
                        <span className={styles.logoText}>Patel'sCar</span>
                        </div>
                        </Link>
                        <p className={styles.description}>
                            premium car rental service with latest models and exceptional customer service. Drive your dream car today!
                        </p>
                        <div className={styles.socialIcons}>{
                            [FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn, FaYoutube].map((Icon,i)=>(
                                <a href="#" key={i} className={styles.socialIcon}>
                                    <Icon />
                                </a>
                            ))}
                </div>
                </div>
                {/* {Qick link} */}

                <div>
                    <h3 className={styles.sectionTitle}>Quick Links
                        < span className={styles.underline}/>
                    </h3>
                    <ul className={styles.linkList}>
                        {["Home","Cars","Contact us"].map((link,i) => (
                            <li key={i}>
                                <a 
                                href={
                                link === "Home"
                                 ? "/"
                                : link === "Contact us" 
                                 ? "/contact " 
                                 :"cars"}
                               className={styles.linkItem} 
                                >
                                <span className={styles.bullet}
                                ></span>
                                {link}
                                </a>
                            </li>
                        ))}
                    </ul>
                </div>

                {/* { CONTACT} */}

                <div>
                    <h3 className={styles.sectionTitle}>Contact us
                        <span className={styles.underline}/> 
                    </h3>
                    <ul className={styles.contactList}>
                        <li className={styles.contactItem}>
                            <FaMapMarkedAlt className={styles.contactIcon}/>
                            <span>123 SVMIT</span>
                        </li>

                         <li className={styles.contactItem}>
                            <FaPhone className={styles.contactIcon}/>
                            <span>+91 1234567890</span>
                        </li>

                         <li className={styles.contactItem}>
                            <FaEnvelope className={styles.contactIcon}/>
                            <span>info@gmail.com</span>
                        </li>
                    </ul>
                    {/* {wrokinghours} */}
                </div>
                {/* {newsletter} */}

                <div>
                    <h3 className={styles.sectionTitle}>Newsletter
                        <span className={styles.underline}></span>
                    </h3>
                    <p className={styles.newsletterText}>
                        Subscribe for special offers and update
                    </p>
                    <form className="spec-y-3">
                        <input type="email" placeholder="Your Email Address" className={styles.input}

                        />
                        <button type="submit" className={styles.subscribeButton}>
                            <GiCarKey className=" mr-2 text-lg sm-text-xl" />
                            Subsscribe Now
                        </button>
                    </form>
                </div>
            </div> 
            {/* {Bottom copyright}  */}

            <div className={styles.copyright}>
                <p>&copy;{new Date().getFullYear()} Patel'sCar. All rights reserved.</p>
                <p className="mt-3 md:mt-0">
                    Designed by <a href="https://exoticinfotech.com/" target="_blank"
                    rel="noopener noreferrer"
                    className={styles.designerLink} >
                        Exotic infotech
                        </a>              
                     </p>
            </div>
        </div>
    </footer>
  )
}

export default Footer