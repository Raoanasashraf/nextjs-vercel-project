import Link from "next/link";
import Image from "next/image";

export default function Footer() {
    return (
        <>
            <footer id="foott" className="section-m1">
                <div className="col">
                    <Image
                        src="/image/logo.png"
                        alt=""
                        width={70}
                        height={70}
                        style={{
                            display: "block",
                            paddingTop: "5px",
                            borderRadius: "25px",
                        }}
                    />
                    <p>
                        <strong style={{ fontSize: "16px" }}>Contact</strong>
                    </p>
                    <p style={{ fontSize: "16px" }}>
                        <strong>Address:</strong>Khangarh chowk Shahjamal T/D Muzaffargarh
                    </p>
                    <p style={{ fontSize: "16px", paddingTop: "0%" }}>
                        <strong>Phone:</strong>03061445880
                    </p>
                    <p style={{ fontSize: "16px", paddingTop: "0%" }}>
                        <strong>Hours:</strong>8:00am to 7:00pm
                    </p>
                </div>
                <div
                    className="col"
                    style={{
                        display: "flex",
                        flexDirection: "column",
                        flexWrap: "wrap",
                        alignItems: "flex-start",
                        marginBottom: "20px",
                    }}
                >
                    <h4
                        style={{ fontSize: "16px", fontWeight: 600, paddingTop: "10px" }}
                    >
                        About
                    </h4>
                    <Link href="/about">About us</Link>
                    <Link href="#">Delivery Information</Link>
                    <Link href="#">Privacy Policy</Link>
                    <Link href="#"> Terms and Conditions</Link>
                    <Link href="/contact">Contact us</Link>
                </div>
                <div
                    className="col"
                    style={{
                        display: "flex",
                        flexDirection: "column",
                        flexWrap: "wrap",
                        alignItems: "flex-start",
                        marginBottom: "20px",
                    }}
                >
                    <h4
                        style={{ fontSize: "16px", fontWeight: 600, paddingTop: "10px" }}
                    >
                        My Account
                    </h4>
                    <Link href="#">Sign in</Link>
                    <Link href="/cart">View Cart</Link>
                    <Link href="#">My Wishlist</Link>
                    <Link href="#"> Track my Order</Link>
                    <Link href="#">Help</Link>
                </div>
            </footer>
            <hr />
            <div className="copywright" style={{ textAlign: "center" }}>
                <p
                    style={{
                        fontSize: "13px",
                        color: "#222",
                        marginBottom: "10px",
                    }}
                >
                    {" "}
                    © Copywright 2025 by solo data. All Rights Reserved
                </p>
            </div>
        </>
    );
}
