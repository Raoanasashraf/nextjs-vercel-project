export interface Product {
    id: number;
    name: string;
    brand: string;
    price: string;
    imageUrl: string;
    rating: number;
    category: 'stove' | 'gas';
    stock?: number;
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
    },
    {
        id: 13,
        name: "Double Auto Stove",
        brand: "National",
        price: "9500",
        imageUrl: "/image/NationalDoubleAutoSteel.jpg",
        rating: 5,
        category: "stove"
    },
    {
        id: 14,
        name: "Single Auto Stove",
        brand: "National",
        price: "5500",
        imageUrl: "/image/nationalSingleAutoYellow.jpg",
        rating: 5,
        category: "stove"
    },
    {
        id: 15,
        name: "Double Taamchini Stove",
        brand: "Gree",
        price: "10500",
        imageUrl: "/image/greeDoubleTaamchini.jpg",
        rating: 5,
        category: "stove"
    },
    {
        id: 16,
        name: "Single Auto Stove",
        brand: "Sanyo",
        price: "6500",
        imageUrl: "/image/sanyoSingleAuto.jpg",
        rating: 5,
        category: "stove"
    },
    {
        id: 17,
        name: "Single Auto Double Burner",
        brand: "Sanyo",
        price: "7500",
        imageUrl: "/image/sanyoSingleAutoDoubleBUrner.jpg",
        rating: 5,
        category: "stove"
    },
    {
        id: 18,
        name: "Taamchini Double Cross Heavy",
        brand: "New Sitara",
        price: "12500",
        imageUrl: "/image/newSitaraTaamDoubleCrossheavy.jpg",
        rating: 5,
        category: "stove"
    },
    {
        id: 19,
        name: "Double Steel Gol Cross",
        brand: "Focus",
        price: "8500",
        imageUrl: "/image/focusDoubleSteelGolCross.jpg",
        rating: 5,
        category: "stove"
    },
    {
        id: 20,
        name: "Single Steel Heavy",
        brand: "Standard",
        price: "5000",
        imageUrl: "/image/singeSteelheavy.jpg",
        rating: 4,
        category: "stove"
    },
    {
        id: 21,
        name: "Long Flame Double Simple",
        brand: "Standard",
        price: "6000",
        imageUrl: "/image/longFlameDoubleSimple.jpg",
        rating: 4,
        category: "stove"
    },
    {
        id: 22,
        name: "Heavy Simple Stove",
        brand: "New Sitara",
        price: "7500",
        imageUrl: "/image/newSitaraHeavysimple.jpg",
        rating: 5,
        category: "stove"
    },
    {
        id: 23,
        name: "Taamchini Choras",
        brand: "New Sitara",
        price: "9000",
        imageUrl: "/image/newSitaraTaamchoras.jpg",
        rating: 5,
        category: "stove"
    },
    {
        id: 24,
        name: "Double Steel Stove",
        brand: "Abdul Baqi",
        price: "6500",
        imageUrl: "/image/DoubleAbdulBaqiSteel.jpg",
        rating: 4,
        category: "stove"
    },
    {
        id: 25,
        name: "Single Steel Gol Cross",
        brand: "Standard",
        price: "4500",
        imageUrl: "/image/SingleSteelGolCross.jpg",
        rating: 4,
        category: "stove"
    },
    {
        id: 26,
        name: "Taamlight Stove",
        brand: "New Sitara",
        price: "8000",
        imageUrl: "/image/NewSitaraTaamlight.jpg",
        rating: 5,
        category: "stove"
    },
    {
        id: 27,
        name: "Double Taamchini",
        brand: "Gree",
        price: "11000",
        imageUrl: "/image/Gree.jpg",
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
    },
    {
        id: 28,
        name: "Domestic Regulator",
        brand: "Standard",
        price: "800",
        imageUrl: "/image/domesticRegulator.jpg",
        rating: 4,
        category: "gas"
    },
    {
        id: 29,
        name: "Mini Regulator",
        brand: "Standard",
        price: "600",
        imageUrl: "/image/miniRegulator.jpg",
        rating: 4,
        category: "gas"
    },
    {
        id: 30,
        name: "SUI Regulator",
        brand: "Premium",
        price: "900",
        imageUrl: "/image/suireguator.jpg",
        rating: 5,
        category: "gas"
    },
    {
        id: 31,
        name: "Assembly Valve",
        brand: "Standard",
        price: "500",
        imageUrl: "/image/assemblyValve.jpg",
        rating: 4,
        category: "gas"
    },
    {
        id: 32,
        name: "Gas Valve",
        brand: "Standard",
        price: "450",
        imageUrl: "/image/valve.jpg",
        rating: 4,
        category: "gas"
    },
    {
        id: 33,
        name: "Domestic Kaak",
        brand: "Standard",
        price: "350",
        imageUrl: "/image/domesticKaak.jpg",
        rating: 4,
        category: "gas"
    },
    {
        id: 34,
        name: "Kaak Heavy",
        brand: "Premium",
        price: "450",
        imageUrl: "/image/kaakheavy.jpg",
        rating: 5,
        category: "gas"
    },
    {
        id: 35,
        name: "Kaak",
        brand: "Standard",
        price: "300",
        imageUrl: "/image/kaak.jpg",
        rating: 4,
        category: "gas"
    },
    {
        id: 36,
        name: "Tikki",
        brand: "Standard",
        price: "250",
        imageUrl: "/image/tikki.jpg",
        rating: 4,
        category: "gas"
    },
    {
        id: 37,
        name: "Stop Tikki",
        brand: "Standard",
        price: "300",
        imageUrl: "/image/stoptikki.jpg",
        rating: 4,
        category: "gas"
    },
    {
        id: 38,
        name: "Choras Plate",
        brand: "Standard",
        price: "400",
        imageUrl: "/image/chorasplate.jpg",
        rating: 4,
        category: "gas"
    },
    {
        id: 39,
        name: "Burner Plate",
        brand: "Standard",
        price: "350",
        imageUrl: "/image/plate.jpg",
        rating: 4,
        category: "gas"
    },
    {
        id: 40,
        name: "Gas Lighter",
        brand: "Standard",
        price: "200",
        imageUrl: "/image/lighter.jpg",
        rating: 4,
        category: "gas"
    },
    {
        id: 41,
        name: "Fawra",
        brand: "Standard",
        price: "150",
        imageUrl: "/image/fawra.jpg",
        rating: 4,
        category: "gas"
    },
    {
        id: 42,
        name: "Angethai 6 No",
        brand: "Premium",
        price: "2500",
        imageUrl: "/image/angethai6No.jpg",
        rating: 5,
        category: "gas"
    }
];
