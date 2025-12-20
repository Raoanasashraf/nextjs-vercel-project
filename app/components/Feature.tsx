"use client";
import React from "react";
import Image from "next/image";

export default function Feature() {
    return (
        <section id="features" className="py-5 bg-light">
            <div className="container">
                <div className="row text-center g-4">
                    <div className="col-md-4">
                        <div className="fe-box p-4 border rounded shadow-sm">
                            <Image
                                src="/image/rep.png"
                                alt="Repairing Services"
                                width={100}
                                height={100}
                                className="mb-3"
                            />
                            <h6 style={{ backgroundColor: "burlywood", padding: "5px" }}>
                                Repairing Services
                            </h6>
                            <p>Quick and reliable repairing services.</p>
                        </div>
                    </div>

                    <div className="col-md-4">
                        <div className="fe-box p-4 border rounded shadow-sm">
                            <Image
                                src="/image/customer.png"
                                alt="Customer Support"
                                width={100}
                                height={100}
                                className="mb-3"
                            />
                            <h6 style={{ backgroundColor: "burlywood", padding: "5px" }}>
                                24/7 Customer Support
                            </h6>
                            <p>Always here to help with your gas needs.</p>
                        </div>
                    </div>

                    <div className="col-md-4">
                        <div className="fe-box p-4 border rounded shadow-sm">
                            <Image
                                src="/image/leak.png"
                                alt="Leak Detection"
                                width={100}
                                height={100}
                                className="mb-3"
                            />
                            <h6 style={{ backgroundColor: "burlywood", padding: "5px" }}>
                                Gas Leak Detection
                            </h6>
                            <p>Professional inspections for home and business safety.</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
