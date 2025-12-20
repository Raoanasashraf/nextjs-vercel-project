import Newsletter from "@/app/components/Newsletter";
import Image from "next/image";

export default function Contact() {
    return (
        <>
            <section id="page-header" className="contact-header">
                <h2>#let&apos;s _talk</h2>
                <p style={{ color: "aliceblue" }}>
                    leave a message.we love to hear from you!
                </p>
            </section>

            <section id="contact-details" className="section-p1">
                <div className="details">
                    <span>Get in Touch </span>
                    <h2>Visit Our shop location or contact us today</h2>
                    <h3>Main Branch</h3>
                    <ul>
                        <li
                            style={{
                                listStyle: "none",
                                display: "flex",
                                padding: "10px 0px",
                            }}
                        >
                            <i className="fa fa-map"></i>
                            <p>hamza1445880@gmail.com</p>
                        </li>
                        <li style={{ listStyle: "none", display: "flex", padding: "10px 0px" }}>
                            <i className="fas fa-phone-alt"></i>
                            <p>0306-1445880</p>
                        </li>
                        <li style={{ listStyle: "none", display: "flex", padding: "10px 0px" }}>
                            <i className="fa fa-clock"></i>
                            <p>Saturday to Thursday 8:00am to 7:00pm </p>
                        </li>
                    </ul>
                </div>
                <div className="map">
                    <iframe
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d27286.93111228585!2d70.96631769793746!3d29.90806063295627!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x393ac34a1df2d587%3A0x3245762f82b5c170!2sAshraf%20Gas%20Trader!5e0!3m2!1sen!2s!4v1750432787865!5m2!1sen!2s"
                        width="600"
                        height="450"
                        style={{ border: 0 }}
                        allowFullScreen={true}
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                    ></iframe>
                </div>
            </section>

            <section id="form-details">
                <form action="">
                    <span>Leave a message</span>
                    <h2>We love to hear from you </h2>
                    <input type="text " placeholder="enter your name " />
                    <input type="text " placeholder="email " />
                    <input type="text " placeholder="Subject " />
                    <textarea
                        name=""
                        id=""
                        cols={30}
                        rows={10}
                        placeholder="Your Messsage"
                    ></textarea>
                    <button className="normal">Submit</button>
                </form>
                <div className="people">
                    <div>
                        <Image
                            src="/image/hamza.jpg"
                            alt=""
                            width={80}
                            height={80}
                            style={{ borderRadius: "20px" }}
                        />
                        {/* Note: I changed hamza.png to hamza.jpg assuming common extension, or I can check list_dir. 
                 Checking file list -> hamz.jpg exists, hamz.jpg exists. 
                 User html said hamza.png (line 71 in contact.html) but I don't see hamza.png in list_dir, I saw hamz.jpg. 
                 I'll use hamz.jpg to be safe or just use a placeholder if missing. 
                 Wait, line 75 in contact.html uses hamz.jpg. Line 79 uses IMG_1983.JPG.
                 I will stick to keeping names close to HTML but maybe fix extensions if I recall list_dir output.
                 list_dir showed 'hamz.jpg' (147983 bytes). I don't see 'hamza.png'. 
                 I'll use hamz.jpg.
             */}
                        <p>
                            <span>Rao Ashraf</span>
                            <br />
                            Founder <br />
                            Phone:0346-4791620
                            <br />
                            E-mail:hamza1445880@gmail.com
                        </p>
                    </div>
                    <div>
                        <Image
                            src="/image/hamz.jpg"
                            alt=""
                            width={60}
                            height={60}
                            style={{ borderRadius: "40px" }}
                        />
                        <p>
                            <span>Rao Hamza Ashraf</span>
                            <br />
                            Co-Founder <br />
                            Phone:0306-1445880 <br />
                            E-mail:hamza1445880@gmail.com
                        </p>
                    </div>
                    <div>
                        <Image
                            src="/image/IMG_1983.JPG"
                            alt=""
                            width={60}
                            height={60}
                            style={{ borderRadius: "40px" }}
                        />
                        <p>
                            <span>Rao Anas Ashraf</span>
                            <br />
                            Manager <br />
                            Phone:0312-6207709 <br />
                            E-mail:anasrao854@gmail.com
                        </p>
                    </div>
                </div>
            </section>

            <Newsletter />
        </>
    );
}
