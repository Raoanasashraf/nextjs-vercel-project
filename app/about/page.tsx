import Feature from "@/app/components/Feature";
import Newsletter from "@/app/components/Newsletter";
import Image from "next/image";

export default function About() {
    return (
        <>
            <section id="page-header" className="about-header">
                <h2>#knowUs</h2>
                <p>Lorem ipsum dolor sit amet, consectetur</p>
            </section>

            <section id="about-head" className="section-p1">
                <Image
                    src="/image/IMG_1983.JPG"
                    alt="About us"
                    width={600}
                    height={400}
                    style={{ width: "100%", height: "auto", maxWidth: "600px" }}
                />
                <div>
                    <h2 style={{ fontWeight: 700 }}>Who we are?</h2>
                    <p>
                        Established in 1998, our gas shop has been a trusted name in
                        providing safe, reliable, and efficient gas solutions for over 25
                        years. From household LPG cylinder supply to commercial gas
                        installations, we have built our reputation on honest service,
                        timely delivery, and customer satisfaction. Over the decades, we’ve
                        proudly served thousands of homes and businesses with a commitment
                        to safety, affordability, and quality. Whether you need a new gas
                        connection, a refill, or gas appliances like stoves or regulators,
                        our experienced team is here to help — combining traditional values
                        with modern service.
                    </p>
                    <br />
                    {/* @ts-ignore */}
                    <marquee bgcolor="#ccc" loop="-1" scrollamount="5" width="100%">
                        {" "}
                        Welcome to Ashraf Gas Trader , Serving Since 1998 | Fast LPG
                        Cylinder Delivery | Authorized Gas Stove & Regulator Dealer | Call
                        Now: 0306-1445880 🔥
                        {/* @ts-ignore */}
                    </marquee>
                </div>
            </section>

            <Feature />
            <Newsletter />
        </>
    );
}
