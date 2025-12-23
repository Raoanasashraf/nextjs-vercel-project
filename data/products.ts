export interface Product {
    id: number;
    name: string;
    brand: string;
    price: string;
    imageUrl: string;
    rating: number;
    category: 'stove' | 'gas';
}

export const products: Product[] = [
    {
        id: 1,
        name: "Triple Auto Stove",
        brand: "Kenwood",
        price: "11000",
        imageUrl: "/image/kenwoodAutoGlassTriple.jpg",
        rating: 5,
        category: "stove"
    },
    {
        id: 2,
        name: "Triple Auto Stove",
        brand: "Kenwood",
        price: "8500",
        imageUrl: "/image/kenwoodTripleAuto.jpg",
        rating: 5,
        category: "stove"
    },
    {
        id: 3,
        name: "Triple Auto Stove",
        brand: "Royal King",
        price: "12000",
        imageUrl: "/image/royalKingGlassTriple.jpg",
        rating: 5,
        category: "stove"
    },
    {
        id: 4,
        name: "Triple Auto Stove",
        brand: "Sanyo",
        price: "13000",
        imageUrl: "/image/sanyoDoubleAutoGlass.jpg",
        rating: 5,
        category: "stove"
    },
    {
        id: 5,
        name: "Triple Auto Stove",
        brand: "Sanyo",
        price: "8500",
        imageUrl: "/image/sanyoAutoSteelTriple.jpg",
        rating: 5,
        category: "stove"
    },
    {
        id: 6,
        name: "Double Auto Stove",
        brand: "Abdul Baqi",
        price: "7000",
        imageUrl: "/image/doubleAbdulBaqiAuto.jpg",
        rating: 5,
        category: "stove"
    },
    {
        id: 7,
        name: "Double Auto Stove",
        brand: "Focus",
        price: "6500",
        imageUrl: "/image/FocusAuto.jpg",
        rating: 5,
        category: "stove"
    },
    {
        id: 8,
        name: "Double Auto Stove",
        brand: "Sanyo",
        price: "8000",
        imageUrl: "/image/doubleAutoSanyoGlass.jpg",
        rating: 5,
        category: "stove"
    }
];

export const gases: Product[] = [
    {
        id: 9,
        name: "11.5Kg Gas Refill Cylinder",
        brand: "Fon",
        price: "3300",
        imageUrl: "/image/foncylinder.jpeg",
        rating: 0,
        category: "gas"
    },
    {
        id: 10,
        name: "45Kg Gas Refill Cylinder",
        brand: "Fon",
        price: "12000",
        imageUrl: "/image/commercial.png",
        rating: 0,
        category: "gas"
    },
    {
        id: 11,
        name: "6.35 Oxygen Refill Cylinder",
        brand: "MCL",
        price: "2200",
        imageUrl: "/image/mcl6.35.jpeg",
        rating: 0,
        category: "gas"
    },
    {
        id: 12,
        name: "9.90 Oxygen Gas Refill Cylinder",
        brand: "MCL",
        price: "2700",
        imageUrl: "/image/mcl9.90.jpeg",
        rating: 0,
        category: "gas"
    }
];
