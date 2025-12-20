"use client";

export default function Newsletter() {
    return (
        <section id="newsletter" className="section-p1 section-m1">
            <div className="newstext">
                <h4
                    style={{
                        paddingTop: "20px",
                        paddingLeft: "20px",
                        color: "whitesmoke",
                        fontSize: "22px",
                        fontWeight: 700,
                    }}
                >
                    Sign Up For Newsletter
                </h4>
                <p
                    style={{
                        paddingLeft: "20px",
                        color: "whitesmoke",
                        fontSize: "14px",
                        fontWeight: 700,
                    }}
                >
                    Get E-mail updates about our latest shop and{" "}
                    <span style={{ color: "gold" }}>social offers</span>
                </p>
            </div>
            <div className="form">
                <input type="text" placeholder=" your email address" />
                <button id="signup" className="normal">
                    sign up{" "}
                </button>
            </div>
        </section>
    );
}
