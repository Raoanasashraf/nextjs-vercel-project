import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
    try {
        const { order } = await request.json();

        // In a production environment, you would use an email service like:
        // - Resend (https://resend.com)
        // - SendGrid
        // - Nodemailer with SMTP

        // For now, we'll log the email content and return success
        // This allows the app to function without actual email setup

        const emailContent = {
            to: process.env.NEXT_PUBLIC_ADMIN_EMAIL || 'admin@example.com',
            subject: `New Order Received: ${order.orderNumber}`,
            html: `
                <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
                    <h2 style="color: #088178;">New Order Received!</h2>
                    
                    <div style="background: #f9f9f9; padding: 20px; border-radius: 8px; margin: 20px 0;">
                        <h3>Order Details</h3>
                        <p><strong>Order Number:</strong> ${order.orderNumber}</p>
                        <p><strong>Order ID:</strong> ${order.id}</p>
                        <p><strong>Total Amount:</strong> Rs ${order.total.toFixed(2)}</p>
                        <p><strong>Status:</strong> ${order.status}</p>
                        <p><strong>Order Date:</strong> ${new Date(order.createdAt).toLocaleString()}</p>
                    </div>

                    <div style="background: #f0f8f7; padding: 20px; border-radius: 8px; margin: 20px 0;">
                        <h3>Customer Information</h3>
                        <p><strong>Name:</strong> ${order.customerInfo.name}</p>
                        <p><strong>Email:</strong> ${order.customerInfo.email}</p>
                        <p><strong>Phone:</strong> ${order.customerInfo.phone}</p>
                    </div>

                    <div style="background: #fff9f0; padding: 20px; border-radius: 8px; margin: 20px 0;">
                        <h3>Delivery Address</h3>
                        <p>${order.customerInfo.address}</p>
                        <p>${order.customerInfo.city}, ${order.customerInfo.postalCode}</p>
                    </div>

                    <div style="margin: 20px 0;">
                        <h3>Order Items</h3>
                        ${order.items.map((item: any) => `
                            <div style="display: flex; gap: 15px; margin-bottom: 15px; padding: 15px; background: #f9f9f9; border-radius: 6px;">
                                <div>
                                    <p style="margin: 0; font-weight: bold;">${item.name}</p>
                                    <p style="margin: 5px 0; color: #666;">Brand: ${item.brand}</p>
                                    <p style="margin: 5px 0; color: #666;">Quantity: ${item.quantity}</p>
                                    <p style="margin: 5px 0; color: #088178; font-weight: bold;">Rs ${parseFloat(item.price) * item.quantity}</p>
                                </div>
                            </div>
                        `).join('')}
                    </div>

                    ${order.customerInfo.notes ? `
                        <div style="background: #fffef0; padding: 20px; border-radius: 8px; margin: 20px 0;">
                            <h3>Order Notes</h3>
                            <p>${order.customerInfo.notes}</p>
                        </div>
                    ` : ''}

                    <div style="text-align: center; margin-top: 30px; padding-top: 20px; border-top: 2px solid #e0e0e0;">
                        <p style="color: #666;">This is an automated notification from your e-commerce system.</p>
                    </div>
                </div>
            `
        };

        console.log('===== EMAIL NOTIFICATION =====');
        console.log('To:', emailContent.to);
        console.log('Subject:', emailContent.subject);
        console.log('Order Number:', order.orderNumber);
        console.log('Customer:', order.customerInfo.name);
        console.log('Contact:', order.customerInfo.phone);
        console.log('Delivery Address:', `${order.customerInfo.address}, ${order.customerInfo.city}`);
        console.log('Total Items:', order.items.length);
        console.log('Total Amount:', `Rs ${order.total.toFixed(2)}`);
        console.log('=============================');

        // TODO: Uncomment and configure when email service is set up
        // Example with Resend:
        /*
        const resend = new Resend(process.env.RESEND_API_KEY);
        await resend.emails.send({
            from: 'orders@yourdomain.com',
            to: process.env.ADMIN_EMAIL,
            subject: emailContent.subject,
            html: emailContent.html
        });
        */

        return NextResponse.json({
            success: true,
            message: 'Email notification logged (configure email service to send actual emails)'
        });

    } catch (error) {
        console.error('Error sending email notification:', error);
        return NextResponse.json(
            { success: false, error: 'Failed to send email notification' },
            { status: 500 }
        );
    }
}
