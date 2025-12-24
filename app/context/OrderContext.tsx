"use client";

import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { Product } from '@/data/products';

export interface OrderItem {
    id: number;
    name: string;
    brand: string;
    price: string;
    imageUrl: string;
    quantity: number;
}

export interface CustomerInfo {
    name: string;
    email: string;
    phone: string;
    address: string;
    city: string;
    postalCode: string;
    notes?: string;
}

export interface Order {
    id: string;
    orderNumber: string;
    items: OrderItem[];
    customerInfo: CustomerInfo;
    total: number;
    status: 'Pending' | 'Processing' | 'Shipped' | 'Delivered';
    createdAt: string;
}

interface OrderContextType {
    orders: Order[];
    addOrder: (order: Omit<Order, 'id' | 'orderNumber' | 'createdAt' | 'status'>) => Promise<string>;
    updateOrderStatus: (orderId: string, status: Order['status']) => void;
    getOrderById: (orderId: string) => Order | undefined;
}

const OrderContext = createContext<OrderContextType | undefined>(undefined);

export const OrderProvider = ({ children }: { children: ReactNode }) => {
    const [orders, setOrders] = useState<Order[]>([]);

    // Load orders from localStorage on mount
    useEffect(() => {
        const savedOrders = localStorage.getItem('orders');
        if (savedOrders) {
            setOrders(JSON.parse(savedOrders));
        }
    }, []);

    // Save orders to localStorage whenever they change
    useEffect(() => {
        if (orders.length > 0) {
            localStorage.setItem('orders', JSON.stringify(orders));
        }
    }, [orders]);

    const addOrder = async (orderData: Omit<Order, 'id' | 'orderNumber' | 'createdAt' | 'status'>): Promise<string> => {
        const orderId = `order_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
        const orderNumber = `ORD-${Date.now().toString().slice(-8)}`;
        const createdAt = new Date().toISOString();

        const newOrder: Order = {
            ...orderData,
            id: orderId,
            orderNumber,
            status: 'Pending',
            createdAt
        };

        setOrders((prevOrders) => [...prevOrders, newOrder]);

        // Send email notification to admin
        try {
            await fetch('/api/send-email', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    order: newOrder
                })
            });
        } catch (error) {
            console.error('Failed to send email notification:', error);
        }

        return orderId;
    };

    const updateOrderStatus = (orderId: string, status: Order['status']) => {
        setOrders((prevOrders) =>
            prevOrders.map((order) =>
                order.id === orderId ? { ...order, status } : order
            )
        );
    };

    const getOrderById = (orderId: string) => {
        return orders.find((order) => order.id === orderId);
    };

    return (
        <OrderContext.Provider value={{ orders, addOrder, updateOrderStatus, getOrderById }}>
            {children}
        </OrderContext.Provider>
    );
};

export const useOrder = () => {
    const context = useContext(OrderContext);
    if (context === undefined) {
        throw new Error('useOrder must be used within an OrderProvider');
    }
    return context;
};
