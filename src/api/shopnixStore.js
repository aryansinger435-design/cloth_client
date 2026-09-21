// Chrononix Haute Horlogerie Store & Catalog Engine
// 100 Handcrafted Luxury Timepieces with Resilient Local-First State Persistence

const STORAGE_KEYS = {
    PRODUCTS: "chrononix_catalog_v100",
    CART: "chrononix_cart_v100",
    WISHLIST: "chrononix_wishlist_v100",
    ORDERS: "chrononix_orders_v100",
    USERS: "chrononix_users_v100",
    CURRENT_USER: "cloth_user",
    CURRENT_TOKEN: "cloth_token",
    COUPONS: "chrononix_applied_coupon"
};

export const INITIAL_PRODUCTS = [
    {
        "_id": "watch-chr-001",
        "name": "Chrononix Royal Sovereign Calibre 88",
        "tagline": "In-house automatic movement with 72h power reserve & exhibition sapphire caseback",
        "description": "Handcrafted in accordance with classical horological traditions, the Chrononix Royal Sovereign Calibre 88 represents the pinnacle of precision watchmaking. Featuring in-house automatic movement with 72h power reserve & exhibition sapphire caseback, this timepiece is encased in 316l surgical grade stainless steel with a double-curved scratch-proof sapphire crystal. Every component is individually regulated and inspected for chronometer-grade accuracy before delivery.",
        "price": 78999,
        "discount_price": 64999,
        "category": "Luxury Automatics",
        "stock": 9,
        "is_featured": true,
        "badge": "COSC Certified",
        "sizes": [
            "41mm",
            "43mm"
        ],
        "colors": [
            "Obsidian Black",
            "Champagne Gold",
            "Imperial Emerald",
            "Midnight Sunburst"
        ],
        "images": [
            {
                "url": "https://images.unsplash.com/photo-1524805444758-089113d48a6d?w=800&auto=format&fit=crop&q=80"
            },
            {
                "url": "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=800&auto=format&fit=crop&q=80"
            }
        ],
        "ratings": {
            "average": 4.8,
            "count": 25
        },
        "specs": {
            "Movement": "Column-Wheel Integrated Chronograph Calibre (28,800 vph)",
            "Case Diameter": "41mm (Lug-to-Lug: 48mm)",
            "Case Material": "316L Surgical Grade Stainless Steel",
            "Crystal": "Dual-Curved Sapphire with Multi-Layer Anti-Reflective Coating",
            "Water Resistance": "100 Meters / 10 ATM",
            "Power Reserve": "72 Hours",
            "Strap": "Handcrafted Italian Full-Grain Alligator-Pattern Leather",
            "Warranty": "5-Year Global Chrononix Horology Warranty"
        }
    },
    {
        "_id": "watch-chr-002",
        "name": "Chrononix Master Grand Date",
        "tagline": "Twin-aperture big date complication with C\u00f4tes de Gen\u00e8ve rotor finishing",
        "description": "Handcrafted in accordance with classical horological traditions, the Chrononix Master Grand Date represents the pinnacle of precision watchmaking. Featuring twin-aperture big date complication with c\u00f4tes de gen\u00e8ve rotor finishing, this timepiece is encased in 316l surgical grade stainless steel with a double-curved scratch-proof sapphire crystal. Every component is individually regulated and inspected for chronometer-grade accuracy before delivery.",
        "price": 89999,
        "discount_price": 74999,
        "category": "Luxury Automatics",
        "stock": 10,
        "is_featured": true,
        "badge": "Bestseller",
        "sizes": [
            "41mm",
            "43mm"
        ],
        "colors": [
            "Obsidian Black",
            "Champagne Gold",
            "Imperial Emerald",
            "Midnight Sunburst"
        ],
        "images": [
            {
                "url": "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=800&auto=format&fit=crop&q=80"
            },
            {
                "url": "https://images.unsplash.com/photo-1524805444758-089113d48a6d?w=800&auto=format&fit=crop&q=80"
            }
        ],
        "ratings": {
            "average": 4.9,
            "count": 32
        },
        "specs": {
            "Movement": "Column-Wheel Integrated Chronograph Calibre (28,800 vph)",
            "Case Diameter": "41mm (Lug-to-Lug: 48mm)",
            "Case Material": "316L Surgical Grade Stainless Steel",
            "Crystal": "Dual-Curved Sapphire with Multi-Layer Anti-Reflective Coating",
            "Water Resistance": "100 Meters / 10 ATM",
            "Power Reserve": "48 Hours",
            "Strap": "Handcrafted Italian Full-Grain Alligator-Pattern Leather",
            "Warranty": "5-Year Global Chrononix Horology Warranty"
        }
    },
    {
        "_id": "watch-chr-003",
        "name": "Chrononix Imperial Obsidian Automatic",
        "tagline": "Pitch-black grand feu enamel dial with 18K solid gold applied indices",
        "description": "Handcrafted in accordance with classical horological traditions, the Chrononix Imperial Obsidian Automatic represents the pinnacle of precision watchmaking. Featuring pitch-black grand feu enamel dial with 18k solid gold applied indices, this timepiece is encased in 316l surgical grade stainless steel with a double-curved scratch-proof sapphire crystal. Every component is individually regulated and inspected for chronometer-grade accuracy before delivery.",
        "price": 94999,
        "discount_price": 81999,
        "category": "Luxury Automatics",
        "stock": 11,
        "is_featured": false,
        "badge": "Limited Edition",
        "sizes": [
            "41mm",
            "43mm"
        ],
        "colors": [
            "Obsidian Black",
            "Champagne Gold",
            "Imperial Emerald",
            "Midnight Sunburst"
        ],
        "images": [
            {
                "url": "https://images.unsplash.com/photo-1533139502658-0198f920d8e8?w=800&auto=format&fit=crop&q=80"
            },
            {
                "url": "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&auto=format&fit=crop&q=80"
            }
        ],
        "ratings": {
            "average": 5.0,
            "count": 39
        },
        "specs": {
            "Movement": "Column-Wheel Integrated Chronograph Calibre (28,800 vph)",
            "Case Diameter": "41mm (Lug-to-Lug: 48mm)",
            "Case Material": "316L Surgical Grade Stainless Steel",
            "Crystal": "Dual-Curved Sapphire with Multi-Layer Anti-Reflective Coating",
            "Water Resistance": "100 Meters / 10 ATM",
            "Power Reserve": "48 Hours",
            "Strap": "Handcrafted Italian Full-Grain Alligator-Pattern Leather",
            "Warranty": "5-Year Global Chrononix Horology Warranty"
        }
    },
    {
        "_id": "watch-chr-004",
        "name": "Chrononix Heritage Geneva 1948",
        "tagline": "Fluted 18K rose gold bezel inspired by vintage Swiss horological golden era",
        "description": "Handcrafted in accordance with classical horological traditions, the Chrononix Heritage Geneva 1948 represents the pinnacle of precision watchmaking. Featuring fluted 18k rose gold bezel inspired by vintage swiss horological golden era, this timepiece is encased in 316l surgical grade stainless steel with a double-curved scratch-proof sapphire crystal. Every component is individually regulated and inspected for chronometer-grade accuracy before delivery.",
        "price": 112000,
        "discount_price": 94999,
        "category": "Luxury Automatics",
        "stock": 12,
        "is_featured": false,
        "badge": "Masterpiece",
        "sizes": [
            "41mm",
            "43mm"
        ],
        "colors": [
            "Obsidian Black",
            "Champagne Gold",
            "Imperial Emerald",
            "Midnight Sunburst"
        ],
        "images": [
            {
                "url": "https://images.unsplash.com/photo-1547996160-71dfabb4e803?w=800&auto=format&fit=crop&q=80"
            },
            {
                "url": "https://images.unsplash.com/photo-1614164185128-e4ec99c436d7?w=800&auto=format&fit=crop&q=80"
            }
        ],
        "ratings": {
            "average": 4.7,
            "count": 46
        },
        "specs": {
            "Movement": "Column-Wheel Integrated Chronograph Calibre (28,800 vph)",
            "Case Diameter": "41mm (Lug-to-Lug: 48mm)",
            "Case Material": "316L Surgical Grade Stainless Steel",
            "Crystal": "Dual-Curved Sapphire with Multi-Layer Anti-Reflective Coating",
            "Water Resistance": "100 Meters / 10 ATM",
            "Power Reserve": "48 Hours",
            "Strap": "Handcrafted Italian Full-Grain Alligator-Pattern Leather",
            "Warranty": "5-Year Global Chrononix Horology Warranty"
        }
    },
    {
        "_id": "watch-chr-005",
        "name": "Chrononix Veloce High-Beat 36000",
        "tagline": "Ultra-frequency 5Hz automatic escapement for butter-smooth second-hand sweep",
        "description": "Handcrafted in accordance with classical horological traditions, the Chrononix Veloce High-Beat 36000 represents the pinnacle of precision watchmaking. Featuring ultra-frequency 5hz automatic escapement for butter-smooth second-hand sweep, this timepiece is encased in 316l surgical grade stainless steel with a double-curved scratch-proof sapphire crystal. Every component is individually regulated and inspected for chronometer-grade accuracy before delivery.",
        "price": 125000,
        "discount_price": 108999,
        "category": "Luxury Automatics",
        "stock": 13,
        "is_featured": false,
        "badge": "High-Beat 5Hz",
        "sizes": [
            "41mm",
            "43mm"
        ],
        "colors": [
            "Obsidian Black",
            "Champagne Gold",
            "Imperial Emerald",
            "Midnight Sunburst"
        ],
        "images": [
            {
                "url": "https://images.unsplash.com/photo-1614164185128-e4ec99c436d7?w=800&auto=format&fit=crop&q=80"
            },
            {
                "url": "https://images.unsplash.com/photo-1547996160-71dfabb4e803?w=800&auto=format&fit=crop&q=80"
            }
        ],
        "ratings": {
            "average": 4.8,
            "count": 53
        },
        "specs": {
            "Movement": "Column-Wheel Integrated Chronograph Calibre (28,800 vph)",
            "Case Diameter": "41mm (Lug-to-Lug: 48mm)",
            "Case Material": "316L Surgical Grade Stainless Steel",
            "Crystal": "Dual-Curved Sapphire with Multi-Layer Anti-Reflective Coating",
            "Water Resistance": "100 Meters / 10 ATM",
            "Power Reserve": "48 Hours",
            "Strap": "Handcrafted Italian Full-Grain Alligator-Pattern Leather",
            "Warranty": "5-Year Global Chrononix Horology Warranty"
        }
    },
    {
        "_id": "watch-chr-006",
        "name": "Chrononix Celestial Reserve 80",
        "tagline": "Double-barrel mainspring providing continuous 80-hour autonomous power reserve",
        "description": "Handcrafted in accordance with classical horological traditions, the Chrononix Celestial Reserve 80 represents the pinnacle of precision watchmaking. Featuring double-barrel mainspring providing continuous 80-hour autonomous power reserve, this timepiece is encased in 316l surgical grade stainless steel with a double-curved scratch-proof sapphire crystal. Every component is individually regulated and inspected for chronometer-grade accuracy before delivery.",
        "price": 85000,
        "discount_price": 69999,
        "category": "Luxury Automatics",
        "stock": 14,
        "is_featured": true,
        "badge": "80H Power Reserve",
        "sizes": [
            "41mm",
            "43mm"
        ],
        "colors": [
            "Obsidian Black",
            "Champagne Gold",
            "Imperial Emerald",
            "Midnight Sunburst"
        ],
        "images": [
            {
                "url": "https://images.unsplash.com/photo-1587836374828-4dbafa94cf0e?w=800&auto=format&fit=crop&q=80"
            },
            {
                "url": "https://images.unsplash.com/photo-1524805444758-089113d48a6d?w=800&auto=format&fit=crop&q=80"
            }
        ],
        "ratings": {
            "average": 4.9,
            "count": 60
        },
        "specs": {
            "Movement": "Column-Wheel Integrated Chronograph Calibre (28,800 vph)",
            "Case Diameter": "41mm (Lug-to-Lug: 48mm)",
            "Case Material": "316L Surgical Grade Stainless Steel",
            "Crystal": "Dual-Curved Sapphire with Multi-Layer Anti-Reflective Coating",
            "Water Resistance": "100 Meters / 10 ATM",
            "Power Reserve": "80 Hours",
            "Strap": "Handcrafted Italian Full-Grain Alligator-Pattern Leather",
            "Warranty": "5-Year Global Chrononix Horology Warranty"
        }
    },
    {
        "_id": "watch-chr-007",
        "name": "Chrononix Monolith Titanium Calibre",
        "tagline": "Grade 5 brushed titanium case weighing only 68 grams with automatic movement",
        "description": "Handcrafted in accordance with classical horological traditions, the Chrononix Monolith Titanium Calibre represents the pinnacle of precision watchmaking. Featuring grade 5 brushed titanium case weighing only 68 grams with automatic movement, this timepiece is encased in aerospace grade 5 titanium with a double-curved scratch-proof sapphire crystal. Every component is individually regulated and inspected for chronometer-grade accuracy before delivery.",
        "price": 99000,
        "discount_price": 84999,
        "category": "Luxury Automatics",
        "stock": 15,
        "is_featured": false,
        "badge": "Grade 5 Titanium",
        "sizes": [
            "41mm",
            "43mm"
        ],
        "colors": [
            "Obsidian Black",
            "Champagne Gold",
            "Imperial Emerald",
            "Midnight Sunburst"
        ],
        "images": [
            {
                "url": "https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=800&auto=format&fit=crop&q=80"
            },
            {
                "url": "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&auto=format&fit=crop&q=80"
            }
        ],
        "ratings": {
            "average": 5.0,
            "count": 67
        },
        "specs": {
            "Movement": "Column-Wheel Integrated Chronograph Calibre (28,800 vph)",
            "Case Diameter": "41mm (Lug-to-Lug: 48mm)",
            "Case Material": "Aerospace Grade 5 Titanium",
            "Crystal": "Dual-Curved Sapphire with Multi-Layer Anti-Reflective Coating",
            "Water Resistance": "100 Meters / 10 ATM",
            "Power Reserve": "48 Hours",
            "Strap": "Grade 5 Titanium Link Bracelet with Micro-Adjustment",
            "Warranty": "5-Year Global Chrononix Horology Warranty"
        }
    },
    {
        "_id": "watch-chr-008",
        "name": "Chrononix Royal Emerald Sunburst",
        "tagline": "Deep imperial green guilloche sunburst dial with Rhodium faceted hands",
        "description": "Handcrafted in accordance with classical horological traditions, the Chrononix Royal Emerald Sunburst represents the pinnacle of precision watchmaking. Featuring deep imperial green guilloche sunburst dial with rhodium faceted hands, this timepiece is encased in 316l surgical grade stainless steel with a double-curved scratch-proof sapphire crystal. Every component is individually regulated and inspected for chronometer-grade accuracy before delivery.",
        "price": 79999,
        "discount_price": 67999,
        "category": "Luxury Automatics",
        "stock": 16,
        "is_featured": false,
        "badge": "Bestseller",
        "sizes": [
            "41mm",
            "43mm"
        ],
        "colors": [
            "Obsidian Black",
            "Champagne Gold",
            "Imperial Emerald",
            "Midnight Sunburst"
        ],
        "images": [
            {
                "url": "https://images.unsplash.com/photo-1619134778706-7015533a6150?w=800&auto=format&fit=crop&q=80"
            },
            {
                "url": "https://images.unsplash.com/photo-1533139502658-0198f920d8e8?w=800&auto=format&fit=crop&q=80"
            }
        ],
        "ratings": {
            "average": 4.7,
            "count": 74
        },
        "specs": {
            "Movement": "Column-Wheel Integrated Chronograph Calibre (28,800 vph)",
            "Case Diameter": "41mm (Lug-to-Lug: 48mm)",
            "Case Material": "316L Surgical Grade Stainless Steel",
            "Crystal": "Dual-Curved Sapphire with Multi-Layer Anti-Reflective Coating",
            "Water Resistance": "100 Meters / 10 ATM",
            "Power Reserve": "48 Hours",
            "Strap": "Handcrafted Italian Full-Grain Alligator-Pattern Leather",
            "Warranty": "5-Year Global Chrononix Horology Warranty"
        }
    },
    {
        "_id": "watch-chr-009",
        "name": "Chrononix Midnight Regatta Automatic",
        "tagline": "Naval yachting countdown inner ring with bidirectional ceramic rotating bezel",
        "description": "Handcrafted in accordance with classical horological traditions, the Chrononix Midnight Regatta Automatic represents the pinnacle of precision watchmaking. Featuring naval yachting countdown inner ring with bidirectional ceramic rotating bezel, this timepiece is encased in 316l surgical grade stainless steel with a double-curved scratch-proof sapphire crystal. Every component is individually regulated and inspected for chronometer-grade accuracy before delivery.",
        "price": 86000,
        "discount_price": 72999,
        "category": "Luxury Automatics",
        "stock": 17,
        "is_featured": false,
        "badge": "Regatta Timer",
        "sizes": [
            "41mm",
            "43mm"
        ],
        "colors": [
            "Obsidian Black",
            "Champagne Gold",
            "Imperial Emerald",
            "Midnight Sunburst"
        ],
        "images": [
            {
                "url": "https://images.unsplash.com/photo-1622434641406-a158123450f9?w=800&auto=format&fit=crop&q=80"
            },
            {
                "url": "https://images.unsplash.com/photo-1619134778706-7015533a6150?w=800&auto=format&fit=crop&q=80"
            }
        ],
        "ratings": {
            "average": 4.8,
            "count": 81
        },
        "specs": {
            "Movement": "Column-Wheel Integrated Chronograph Calibre (28,800 vph)",
            "Case Diameter": "41mm (Lug-to-Lug: 48mm)",
            "Case Material": "316L Surgical Grade Stainless Steel",
            "Crystal": "Dual-Curved Sapphire with Multi-Layer Anti-Reflective Coating",
            "Water Resistance": "100 Meters / 10 ATM",
            "Power Reserve": "48 Hours",
            "Strap": "Handcrafted Italian Full-Grain Alligator-Pattern Leather",
            "Warranty": "5-Year Global Chrononix Horology Warranty"
        }
    },
    {
        "_id": "watch-chr-010",
        "name": "Chrononix Elysium Perpetual Calibre",
        "tagline": "Automatic calibre featuring day, date, month, and 4-year leap cycle indicator",
        "description": "Handcrafted in accordance with classical horological traditions, the Chrononix Elysium Perpetual Calibre represents the pinnacle of precision watchmaking. Featuring automatic calibre featuring day, date, month, and 4-year leap cycle indicator, this timepiece is encased in 316l surgical grade stainless steel with a double-curved scratch-proof sapphire crystal. Every component is individually regulated and inspected for chronometer-grade accuracy before delivery.",
        "price": 145000,
        "discount_price": 129999,
        "category": "Luxury Automatics",
        "stock": 18,
        "is_featured": false,
        "badge": "Perpetual Calibre",
        "sizes": [
            "41mm",
            "43mm"
        ],
        "colors": [
            "Obsidian Black",
            "Champagne Gold",
            "Imperial Emerald",
            "Midnight Sunburst"
        ],
        "images": [
            {
                "url": "https://images.unsplash.com/photo-1612817159949-195b6eb9e31a?w=800&auto=format&fit=crop&q=80"
            },
            {
                "url": "https://images.unsplash.com/photo-1614164185128-e4ec99c436d7?w=800&auto=format&fit=crop&q=80"
            }
        ],
        "ratings": {
            "average": 4.9,
            "count": 88
        },
        "specs": {
            "Movement": "Column-Wheel Integrated Chronograph Calibre (28,800 vph)",
            "Case Diameter": "41mm (Lug-to-Lug: 48mm)",
            "Case Material": "316L Surgical Grade Stainless Steel",
            "Crystal": "Dual-Curved Sapphire with Multi-Layer Anti-Reflective Coating",
            "Water Resistance": "100 Meters / 10 ATM",
            "Power Reserve": "48 Hours",
            "Strap": "Handcrafted Italian Full-Grain Alligator-Pattern Leather",
            "Warranty": "5-Year Global Chrononix Horology Warranty"
        }
    },
    {
        "_id": "watch-chr-011",
        "name": "Chrononix Renaissance Roman Dress",
        "tagline": "Fine porcelain lacquer dial with heat-blued Breguet hands & Roman numerals",
        "description": "Handcrafted in accordance with classical horological traditions, the Chrononix Renaissance Roman Dress represents the pinnacle of precision watchmaking. Featuring fine porcelain lacquer dial with heat-blued breguet hands & roman numerals, this timepiece is encased in 316l surgical grade stainless steel with a double-curved scratch-proof sapphire crystal. Every component is individually regulated and inspected for chronometer-grade accuracy before delivery.",
        "price": 69999,
        "discount_price": 58999,
        "category": "Luxury Automatics",
        "stock": 19,
        "is_featured": true,
        "badge": "Breguet Hands",
        "sizes": [
            "41mm",
            "43mm"
        ],
        "colors": [
            "Obsidian Black",
            "Champagne Gold",
            "Imperial Emerald",
            "Midnight Sunburst"
        ],
        "images": [
            {
                "url": "https://images.unsplash.com/photo-1518131672697-613becd4fab5?w=800&auto=format&fit=crop&q=80"
            },
            {
                "url": "https://images.unsplash.com/photo-1547996160-71dfabb4e803?w=800&auto=format&fit=crop&q=80"
            }
        ],
        "ratings": {
            "average": 5.0,
            "count": 95
        },
        "specs": {
            "Movement": "Column-Wheel Integrated Chronograph Calibre (28,800 vph)",
            "Case Diameter": "41mm (Lug-to-Lug: 48mm)",
            "Case Material": "316L Surgical Grade Stainless Steel",
            "Crystal": "Dual-Curved Sapphire with Multi-Layer Anti-Reflective Coating",
            "Water Resistance": "100 Meters / 10 ATM",
            "Power Reserve": "48 Hours",
            "Strap": "Handcrafted Italian Full-Grain Alligator-Pattern Leather",
            "Warranty": "5-Year Global Chrononix Horology Warranty"
        }
    },
    {
        "_id": "watch-chr-012",
        "name": "Chrononix Astral Platinum Automatic",
        "tagline": "950 Platinum electroplated casing with genuine alligator leather deployment clasp",
        "description": "Handcrafted in accordance with classical horological traditions, the Chrononix Astral Platinum Automatic represents the pinnacle of precision watchmaking. Featuring 950 platinum electroplated casing with genuine alligator leather deployment clasp, this timepiece is encased in 950 platinum finish over 316l steel with a double-curved scratch-proof sapphire crystal. Every component is individually regulated and inspected for chronometer-grade accuracy before delivery.",
        "price": 132000,
        "discount_price": 115000,
        "category": "Luxury Automatics",
        "stock": 20,
        "is_featured": false,
        "badge": "Platinum Finish",
        "sizes": [
            "41mm",
            "43mm"
        ],
        "colors": [
            "Obsidian Black",
            "Champagne Gold",
            "Imperial Emerald",
            "Midnight Sunburst"
        ],
        "images": [
            {
                "url": "https://images.unsplash.com/photo-1600003014755-ba31aa59c4b6?w=800&auto=format&fit=crop&q=80"
            },
            {
                "url": "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=800&auto=format&fit=crop&q=80"
            }
        ],
        "ratings": {
            "average": 4.7,
            "count": 102
        },
        "specs": {
            "Movement": "Column-Wheel Integrated Chronograph Calibre (28,800 vph)",
            "Case Diameter": "41mm (Lug-to-Lug: 48mm)",
            "Case Material": "950 Platinum Finish over 316L Steel",
            "Crystal": "Dual-Curved Sapphire with Multi-Layer Anti-Reflective Coating",
            "Water Resistance": "100 Meters / 10 ATM",
            "Power Reserve": "48 Hours",
            "Strap": "Handcrafted Italian Full-Grain Alligator-Pattern Leather",
            "Warranty": "5-Year Global Chrononix Horology Warranty"
        }
    },
    {
        "_id": "watch-chr-013",
        "name": "Chrononix Zenith Horizon Blue",
        "tagline": "Icy Arctic blue sunray dial with double-domed anti-reflective sapphire crystal",
        "description": "Handcrafted in accordance with classical horological traditions, the Chrononix Zenith Horizon Blue represents the pinnacle of precision watchmaking. Featuring icy arctic blue sunray dial with double-domed anti-reflective sapphire crystal, this timepiece is encased in 316l surgical grade stainless steel with a double-curved scratch-proof sapphire crystal. Every component is individually regulated and inspected for chronometer-grade accuracy before delivery.",
        "price": 74999,
        "discount_price": 62999,
        "category": "Luxury Automatics",
        "stock": 21,
        "is_featured": false,
        "badge": "Arctic Blue",
        "sizes": [
            "41mm",
            "43mm"
        ],
        "colors": [
            "Obsidian Black",
            "Champagne Gold",
            "Imperial Emerald",
            "Midnight Sunburst"
        ],
        "images": [
            {
                "url": "https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=800&auto=format&fit=crop&q=80"
            },
            {
                "url": "https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?w=800&auto=format&fit=crop&q=80"
            }
        ],
        "ratings": {
            "average": 4.8,
            "count": 109
        },
        "specs": {
            "Movement": "Column-Wheel Integrated Chronograph Calibre (28,800 vph)",
            "Case Diameter": "41mm (Lug-to-Lug: 48mm)",
            "Case Material": "316L Surgical Grade Stainless Steel",
            "Crystal": "Dual-Curved Sapphire with Multi-Layer Anti-Reflective Coating",
            "Water Resistance": "100 Meters / 10 ATM",
            "Power Reserve": "48 Hours",
            "Strap": "Handcrafted Italian Full-Grain Alligator-Pattern Leather",
            "Warranty": "5-Year Global Chrononix Horology Warranty"
        }
    },
    {
        "_id": "watch-chr-014",
        "name": "Chrononix Nocturne Dual-Time",
        "tagline": "Independent 24-hour GMT hand calibrated for jetsetters and world travelers",
        "description": "Handcrafted in accordance with classical horological traditions, the Chrononix Nocturne Dual-Time represents the pinnacle of precision watchmaking. Featuring independent 24-hour gmt hand calibrated for jetsetters and world travelers, this timepiece is encased in 316l surgical grade stainless steel with a double-curved scratch-proof sapphire crystal. Every component is individually regulated and inspected for chronometer-grade accuracy before delivery.",
        "price": 88999,
        "discount_price": 75999,
        "category": "Luxury Automatics",
        "stock": 22,
        "is_featured": false,
        "badge": "GMT Dual-Time",
        "sizes": [
            "41mm",
            "43mm"
        ],
        "colors": [
            "Obsidian Black",
            "Champagne Gold",
            "Imperial Emerald",
            "Midnight Sunburst"
        ],
        "images": [
            {
                "url": "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&auto=format&fit=crop&q=80"
            },
            {
                "url": "https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=800&auto=format&fit=crop&q=80"
            }
        ],
        "ratings": {
            "average": 4.9,
            "count": 116
        },
        "specs": {
            "Movement": "Column-Wheel Integrated Chronograph Calibre (28,800 vph)",
            "Case Diameter": "41mm (Lug-to-Lug: 48mm)",
            "Case Material": "316L Surgical Grade Stainless Steel",
            "Crystal": "Dual-Curved Sapphire with Multi-Layer Anti-Reflective Coating",
            "Water Resistance": "100 Meters / 10 ATM",
            "Power Reserve": "48 Hours",
            "Strap": "Handcrafted Italian Full-Grain Alligator-Pattern Leather",
            "Warranty": "5-Year Global Chrononix Horology Warranty"
        }
    },
    {
        "_id": "watch-chr-015",
        "name": "Chrononix Sovereign Gold Jubilee",
        "tagline": "Polished 5-link Jubilee bracelet in two-tone stainless steel and 18K gold PVD",
        "description": "Handcrafted in accordance with classical horological traditions, the Chrononix Sovereign Gold Jubilee represents the pinnacle of precision watchmaking. Featuring polished 5-link jubilee bracelet in two-tone stainless steel and 18k gold pvd, this timepiece is encased in 18k gold pvd over 316l steel with a double-curved scratch-proof sapphire crystal. Every component is individually regulated and inspected for chronometer-grade accuracy before delivery.",
        "price": 92000,
        "discount_price": 79999,
        "category": "Luxury Automatics",
        "stock": 8,
        "is_featured": false,
        "badge": "Jubilee Edition",
        "sizes": [
            "41mm",
            "43mm"
        ],
        "colors": [
            "Obsidian Black",
            "Champagne Gold",
            "Imperial Emerald",
            "Midnight Sunburst"
        ],
        "images": [
            {
                "url": "https://images.unsplash.com/photo-1548169874-53e85f753f1e?w=800&auto=format&fit=crop&q=80"
            },
            {
                "url": "https://images.unsplash.com/photo-1524805444758-089113d48a6d?w=800&auto=format&fit=crop&q=80"
            }
        ],
        "ratings": {
            "average": 5.0,
            "count": 123
        },
        "specs": {
            "Movement": "Column-Wheel Integrated Chronograph Calibre (28,800 vph)",
            "Case Diameter": "41mm (Lug-to-Lug: 48mm)",
            "Case Material": "18K Gold PVD over 316L Steel",
            "Crystal": "Dual-Curved Sapphire with Multi-Layer Anti-Reflective Coating",
            "Water Resistance": "100 Meters / 10 ATM",
            "Power Reserve": "48 Hours",
            "Strap": "Solid 316L Stainless Steel 5-Link Jubilee / Oyster Bracelet",
            "Warranty": "5-Year Global Chrononix Horology Warranty"
        }
    },
    {
        "_id": "watch-chr-016",
        "name": "Chrononix Apex Monza Tachymeter",
        "tagline": "Tri-compax column-wheel chronograph with ceramic tachymeter bezel",
        "description": "Handcrafted in accordance with classical horological traditions, the Chrononix Apex Monza Tachymeter represents the pinnacle of precision watchmaking. Featuring tri-compax column-wheel chronograph with ceramic tachymeter bezel, this timepiece is encased in 316l surgical grade stainless steel with a double-curved scratch-proof sapphire crystal. Every component is individually regulated and inspected for chronometer-grade accuracy before delivery.",
        "price": 95000,
        "discount_price": 82999,
        "category": "Chronographs",
        "stock": 9,
        "is_featured": true,
        "badge": "Column Wheel",
        "sizes": [
            "43mm",
            "41mm"
        ],
        "colors": [
            "Obsidian Black",
            "Champagne Gold",
            "Imperial Emerald",
            "Midnight Sunburst"
        ],
        "images": [
            {
                "url": "https://images.unsplash.com/photo-1524805444758-089113d48a6d?w=800&auto=format&fit=crop&q=80"
            },
            {
                "url": "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=800&auto=format&fit=crop&q=80"
            }
        ],
        "ratings": {
            "average": 4.7,
            "count": 130
        },
        "specs": {
            "Movement": "Column-Wheel Integrated Chronograph Calibre (28,800 vph)",
            "Case Diameter": "43mm (Lug-to-Lug: 48mm)",
            "Case Material": "316L Surgical Grade Stainless Steel",
            "Crystal": "Dual-Curved Sapphire with Multi-Layer Anti-Reflective Coating",
            "Water Resistance": "100 Meters / 10 ATM",
            "Power Reserve": "48 Hours",
            "Strap": "Solid 316L Stainless Steel 5-Link Jubilee / Oyster Bracelet",
            "Warranty": "5-Year Global Chrononix Horology Warranty"
        }
    },
    {
        "_id": "watch-chr-017",
        "name": "Chrononix Grand Prix Flyback",
        "tagline": "Instant one-touch reset and restart flyback racing chronograph",
        "description": "Handcrafted in accordance with classical horological traditions, the Chrononix Grand Prix Flyback represents the pinnacle of precision watchmaking. Featuring instant one-touch reset and restart flyback racing chronograph, this timepiece is encased in 316l surgical grade stainless steel with a double-curved scratch-proof sapphire crystal. Every component is individually regulated and inspected for chronometer-grade accuracy before delivery.",
        "price": 118000,
        "discount_price": 99999,
        "category": "Chronographs",
        "stock": 10,
        "is_featured": false,
        "badge": "Flyback",
        "sizes": [
            "41mm",
            "43mm"
        ],
        "colors": [
            "Obsidian Black",
            "Champagne Gold",
            "Imperial Emerald",
            "Midnight Sunburst"
        ],
        "images": [
            {
                "url": "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=800&auto=format&fit=crop&q=80"
            },
            {
                "url": "https://images.unsplash.com/photo-1524805444758-089113d48a6d?w=800&auto=format&fit=crop&q=80"
            }
        ],
        "ratings": {
            "average": 4.8,
            "count": 137
        },
        "specs": {
            "Movement": "Column-Wheel Integrated Chronograph Calibre (28,800 vph)",
            "Case Diameter": "41mm (Lug-to-Lug: 48mm)",
            "Case Material": "316L Surgical Grade Stainless Steel",
            "Crystal": "Dual-Curved Sapphire with Multi-Layer Anti-Reflective Coating",
            "Water Resistance": "100 Meters / 10 ATM",
            "Power Reserve": "48 Hours",
            "Strap": "Handcrafted Italian Full-Grain Alligator-Pattern Leather",
            "Warranty": "5-Year Global Chrononix Horology Warranty"
        }
    },
    {
        "_id": "watch-chr-018",
        "name": "Chrononix Silverstone Reverse Panda",
        "tagline": "Classic black matte dial with crisp silver-white sub-dials and red accents",
        "description": "Handcrafted in accordance with classical horological traditions, the Chrononix Silverstone Reverse Panda represents the pinnacle of precision watchmaking. Featuring classic black matte dial with crisp silver-white sub-dials and red accents, this timepiece is encased in 316l surgical grade stainless steel with a double-curved scratch-proof sapphire crystal. Every component is individually regulated and inspected for chronometer-grade accuracy before delivery.",
        "price": 76000,
        "discount_price": 64999,
        "category": "Chronographs",
        "stock": 11,
        "is_featured": false,
        "badge": "Reverse Panda",
        "sizes": [
            "41mm",
            "43mm"
        ],
        "colors": [
            "Obsidian Black",
            "Champagne Gold",
            "Imperial Emerald",
            "Midnight Sunburst"
        ],
        "images": [
            {
                "url": "https://images.unsplash.com/photo-1533139502658-0198f920d8e8?w=800&auto=format&fit=crop&q=80"
            },
            {
                "url": "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&auto=format&fit=crop&q=80"
            }
        ],
        "ratings": {
            "average": 4.9,
            "count": 144
        },
        "specs": {
            "Movement": "Column-Wheel Integrated Chronograph Calibre (28,800 vph)",
            "Case Diameter": "41mm (Lug-to-Lug: 48mm)",
            "Case Material": "316L Surgical Grade Stainless Steel",
            "Crystal": "Dual-Curved Sapphire with Multi-Layer Anti-Reflective Coating",
            "Water Resistance": "100 Meters / 10 ATM",
            "Power Reserve": "48 Hours",
            "Strap": "Handcrafted Italian Full-Grain Alligator-Pattern Leather",
            "Warranty": "5-Year Global Chrononix Horology Warranty"
        }
    },
    {
        "_id": "watch-chr-019",
        "name": "Chrononix Le Mans 24H Chronometer",
        "tagline": "24-hour sub-register engineered for continuous endurance racing timing",
        "description": "Handcrafted in accordance with classical horological traditions, the Chrononix Le Mans 24H Chronometer represents the pinnacle of precision watchmaking. Featuring 24-hour sub-register engineered for continuous endurance racing timing, this timepiece is encased in 316l surgical grade stainless steel with a double-curved scratch-proof sapphire crystal. Every component is individually regulated and inspected for chronometer-grade accuracy before delivery.",
        "price": 84000,
        "discount_price": 71999,
        "category": "Chronographs",
        "stock": 12,
        "is_featured": false,
        "badge": "24H Endurance",
        "sizes": [
            "41mm",
            "43mm"
        ],
        "colors": [
            "Obsidian Black",
            "Champagne Gold",
            "Imperial Emerald",
            "Midnight Sunburst"
        ],
        "images": [
            {
                "url": "https://images.unsplash.com/photo-1547996160-71dfabb4e803?w=800&auto=format&fit=crop&q=80"
            },
            {
                "url": "https://images.unsplash.com/photo-1614164185128-e4ec99c436d7?w=800&auto=format&fit=crop&q=80"
            }
        ],
        "ratings": {
            "average": 5.0,
            "count": 151
        },
        "specs": {
            "Movement": "Column-Wheel Integrated Chronograph Calibre (28,800 vph)",
            "Case Diameter": "41mm (Lug-to-Lug: 48mm)",
            "Case Material": "316L Surgical Grade Stainless Steel",
            "Crystal": "Dual-Curved Sapphire with Multi-Layer Anti-Reflective Coating",
            "Water Resistance": "100 Meters / 10 ATM",
            "Power Reserve": "48 Hours",
            "Strap": "Handcrafted Italian Full-Grain Alligator-Pattern Leather",
            "Warranty": "5-Year Global Chrononix Horology Warranty"
        }
    },
    {
        "_id": "watch-chr-020",
        "name": "Chrononix Stratos Carbon Chrono",
        "tagline": "Forged carbon fiber case with lightweight titanium pushers and deployant buckle",
        "description": "Handcrafted in accordance with classical horological traditions, the Chrononix Stratos Carbon Chrono represents the pinnacle of precision watchmaking. Featuring forged carbon fiber case with lightweight titanium pushers and deployant buckle, this timepiece is encased in forged carbon fiber composite with a double-curved scratch-proof sapphire crystal. Every component is individually regulated and inspected for chronometer-grade accuracy before delivery.",
        "price": 135000,
        "discount_price": 119999,
        "category": "Chronographs",
        "stock": 13,
        "is_featured": false,
        "badge": "Forged Carbon",
        "sizes": [
            "41mm",
            "43mm"
        ],
        "colors": [
            "Obsidian Black",
            "Champagne Gold",
            "Imperial Emerald",
            "Midnight Sunburst"
        ],
        "images": [
            {
                "url": "https://images.unsplash.com/photo-1614164185128-e4ec99c436d7?w=800&auto=format&fit=crop&q=80"
            },
            {
                "url": "https://images.unsplash.com/photo-1547996160-71dfabb4e803?w=800&auto=format&fit=crop&q=80"
            }
        ],
        "ratings": {
            "average": 4.7,
            "count": 158
        },
        "specs": {
            "Movement": "Column-Wheel Integrated Chronograph Calibre (28,800 vph)",
            "Case Diameter": "41mm (Lug-to-Lug: 48mm)",
            "Case Material": "Forged Carbon Fiber Composite",
            "Crystal": "Dual-Curved Sapphire with Multi-Layer Anti-Reflective Coating",
            "Water Resistance": "100 Meters / 10 ATM",
            "Power Reserve": "48 Hours",
            "Strap": "Handcrafted Italian Full-Grain Alligator-Pattern Leather",
            "Warranty": "5-Year Global Chrononix Horology Warranty"
        }
    },
    {
        "_id": "watch-chr-021",
        "name": "Chrononix AeroFlight Pilot Chronograph",
        "tagline": "Oversized onion crown with luminous pilot hands for extreme cockpit legibility",
        "description": "Handcrafted in accordance with classical horological traditions, the Chrononix AeroFlight Pilot Chronograph represents the pinnacle of precision watchmaking. Featuring oversized onion crown with luminous pilot hands for extreme cockpit legibility, this timepiece is encased in 316l surgical grade stainless steel with a double-curved scratch-proof sapphire crystal. Every component is individually regulated and inspected for chronometer-grade accuracy before delivery.",
        "price": 79000,
        "discount_price": 66999,
        "category": "Chronographs",
        "stock": 14,
        "is_featured": true,
        "badge": "Pilot Flight",
        "sizes": [
            "43mm",
            "41mm"
        ],
        "colors": [
            "Obsidian Black",
            "Champagne Gold",
            "Imperial Emerald",
            "Midnight Sunburst"
        ],
        "images": [
            {
                "url": "https://images.unsplash.com/photo-1587836374828-4dbafa94cf0e?w=800&auto=format&fit=crop&q=80"
            },
            {
                "url": "https://images.unsplash.com/photo-1524805444758-089113d48a6d?w=800&auto=format&fit=crop&q=80"
            }
        ],
        "ratings": {
            "average": 4.8,
            "count": 165
        },
        "specs": {
            "Movement": "Column-Wheel Integrated Chronograph Calibre (28,800 vph)",
            "Case Diameter": "43mm (Lug-to-Lug: 48mm)",
            "Case Material": "316L Surgical Grade Stainless Steel",
            "Crystal": "Dual-Curved Sapphire with Multi-Layer Anti-Reflective Coating",
            "Water Resistance": "100 Meters / 10 ATM",
            "Power Reserve": "48 Hours",
            "Strap": "Handcrafted Italian Full-Grain Alligator-Pattern Leather",
            "Warranty": "5-Year Global Chrononix Horology Warranty"
        }
    },
    {
        "_id": "watch-chr-022",
        "name": "Chrononix Daytona Gold Tribute",
        "tagline": "Full 18K gold PVD case and bracelet with contrast black ceramic bezel",
        "description": "Handcrafted in accordance with classical horological traditions, the Chrononix Daytona Gold Tribute represents the pinnacle of precision watchmaking. Featuring full 18k gold pvd case and bracelet with contrast black ceramic bezel, this timepiece is encased in 18k gold pvd over 316l steel with a double-curved scratch-proof sapphire crystal. Every component is individually regulated and inspected for chronometer-grade accuracy before delivery.",
        "price": 129000,
        "discount_price": 112000,
        "category": "Chronographs",
        "stock": 15,
        "is_featured": false,
        "badge": "18K Gold PVD",
        "sizes": [
            "41mm",
            "43mm"
        ],
        "colors": [
            "Obsidian Black",
            "Champagne Gold",
            "Imperial Emerald",
            "Midnight Sunburst"
        ],
        "images": [
            {
                "url": "https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=800&auto=format&fit=crop&q=80"
            },
            {
                "url": "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&auto=format&fit=crop&q=80"
            }
        ],
        "ratings": {
            "average": 4.9,
            "count": 172
        },
        "specs": {
            "Movement": "Column-Wheel Integrated Chronograph Calibre (28,800 vph)",
            "Case Diameter": "41mm (Lug-to-Lug: 48mm)",
            "Case Material": "18K Gold PVD over 316L Steel",
            "Crystal": "Dual-Curved Sapphire with Multi-Layer Anti-Reflective Coating",
            "Water Resistance": "100 Meters / 10 ATM",
            "Power Reserve": "48 Hours",
            "Strap": "Handcrafted Italian Full-Grain Alligator-Pattern Leather",
            "Warranty": "5-Year Global Chrononix Horology Warranty"
        }
    },
    {
        "_id": "watch-chr-023",
        "name": "Chrononix N\u00fcrburgring Racing Spec",
        "tagline": "Perforated rally leather strap with bright orange central seconds chronograph hand",
        "description": "Handcrafted in accordance with classical horological traditions, the Chrononix N\u00fcrburgring Racing Spec represents the pinnacle of precision watchmaking. Featuring perforated rally leather strap with bright orange central seconds chronograph hand, this timepiece is encased in 316l surgical grade stainless steel with a double-curved scratch-proof sapphire crystal. Every component is individually regulated and inspected for chronometer-grade accuracy before delivery.",
        "price": 71000,
        "discount_price": 59999,
        "category": "Chronographs",
        "stock": 16,
        "is_featured": false,
        "badge": "Rally Edition",
        "sizes": [
            "43mm",
            "41mm"
        ],
        "colors": [
            "Obsidian Black",
            "Champagne Gold",
            "Imperial Emerald",
            "Midnight Sunburst"
        ],
        "images": [
            {
                "url": "https://images.unsplash.com/photo-1619134778706-7015533a6150?w=800&auto=format&fit=crop&q=80"
            },
            {
                "url": "https://images.unsplash.com/photo-1533139502658-0198f920d8e8?w=800&auto=format&fit=crop&q=80"
            }
        ],
        "ratings": {
            "average": 5.0,
            "count": 179
        },
        "specs": {
            "Movement": "Column-Wheel Integrated Chronograph Calibre (28,800 vph)",
            "Case Diameter": "43mm (Lug-to-Lug: 48mm)",
            "Case Material": "316L Surgical Grade Stainless Steel",
            "Crystal": "Dual-Curved Sapphire with Multi-Layer Anti-Reflective Coating",
            "Water Resistance": "100 Meters / 10 ATM",
            "Power Reserve": "48 Hours",
            "Strap": "Handcrafted Italian Full-Grain Alligator-Pattern Leather",
            "Warranty": "5-Year Global Chrononix Horology Warranty"
        }
    },
    {
        "_id": "watch-chr-024",
        "name": "Chrononix Stealth Dark Knight Chrono",
        "tagline": "DLC diamond-like carbon coated case with stealth grey luminous markers",
        "description": "Handcrafted in accordance with classical horological traditions, the Chrononix Stealth Dark Knight Chrono represents the pinnacle of precision watchmaking. Featuring dlc diamond-like carbon coated case with stealth grey luminous markers, this timepiece is encased in 316l surgical grade stainless steel with a double-curved scratch-proof sapphire crystal. Every component is individually regulated and inspected for chronometer-grade accuracy before delivery.",
        "price": 88000,
        "discount_price": 75999,
        "category": "Chronographs",
        "stock": 17,
        "is_featured": false,
        "badge": "DLC Stealth",
        "sizes": [
            "41mm",
            "43mm"
        ],
        "colors": [
            "Obsidian Black",
            "Champagne Gold",
            "Imperial Emerald",
            "Midnight Sunburst"
        ],
        "images": [
            {
                "url": "https://images.unsplash.com/photo-1622434641406-a158123450f9?w=800&auto=format&fit=crop&q=80"
            },
            {
                "url": "https://images.unsplash.com/photo-1619134778706-7015533a6150?w=800&auto=format&fit=crop&q=80"
            }
        ],
        "ratings": {
            "average": 4.7,
            "count": 186
        },
        "specs": {
            "Movement": "Column-Wheel Integrated Chronograph Calibre (28,800 vph)",
            "Case Diameter": "41mm (Lug-to-Lug: 48mm)",
            "Case Material": "316L Surgical Grade Stainless Steel",
            "Crystal": "Dual-Curved Sapphire with Multi-Layer Anti-Reflective Coating",
            "Water Resistance": "100 Meters / 10 ATM",
            "Power Reserve": "48 Hours",
            "Strap": "Handcrafted Italian Full-Grain Alligator-Pattern Leather",
            "Warranty": "5-Year Global Chrononix Horology Warranty"
        }
    },
    {
        "_id": "watch-chr-025",
        "name": "Chrononix Heritage Bi-Compax 1964",
        "tagline": "Dual horizontal sub-dial vintage military chronograph with box sapphire",
        "description": "Handcrafted in accordance with classical horological traditions, the Chrononix Heritage Bi-Compax 1964 represents the pinnacle of precision watchmaking. Featuring dual horizontal sub-dial vintage military chronograph with box sapphire, this timepiece is encased in 316l surgical grade stainless steel with a double-curved scratch-proof sapphire crystal. Every component is individually regulated and inspected for chronometer-grade accuracy before delivery.",
        "price": 82000,
        "discount_price": 69999,
        "category": "Chronographs",
        "stock": 18,
        "is_featured": false,
        "badge": "Heritage 1964",
        "sizes": [
            "41mm",
            "43mm"
        ],
        "colors": [
            "Obsidian Black",
            "Champagne Gold",
            "Imperial Emerald",
            "Midnight Sunburst"
        ],
        "images": [
            {
                "url": "https://images.unsplash.com/photo-1612817159949-195b6eb9e31a?w=800&auto=format&fit=crop&q=80"
            },
            {
                "url": "https://images.unsplash.com/photo-1614164185128-e4ec99c436d7?w=800&auto=format&fit=crop&q=80"
            }
        ],
        "ratings": {
            "average": 4.8,
            "count": 193
        },
        "specs": {
            "Movement": "Column-Wheel Integrated Chronograph Calibre (28,800 vph)",
            "Case Diameter": "41mm (Lug-to-Lug: 48mm)",
            "Case Material": "316L Surgical Grade Stainless Steel",
            "Crystal": "Dual-Curved Sapphire with Multi-Layer Anti-Reflective Coating",
            "Water Resistance": "100 Meters / 10 ATM",
            "Power Reserve": "48 Hours",
            "Strap": "Handcrafted Italian Full-Grain Alligator-Pattern Leather",
            "Warranty": "5-Year Global Chrononix Horology Warranty"
        }
    },
    {
        "_id": "watch-chr-026",
        "name": "Chrononix Blue Horizon Chrono",
        "tagline": "Deep navy sunburst dial with polished rhodium sub-rings and steel bracelet",
        "description": "Handcrafted in accordance with classical horological traditions, the Chrononix Blue Horizon Chrono represents the pinnacle of precision watchmaking. Featuring deep navy sunburst dial with polished rhodium sub-rings and steel bracelet, this timepiece is encased in 316l surgical grade stainless steel with a double-curved scratch-proof sapphire crystal. Every component is individually regulated and inspected for chronometer-grade accuracy before delivery.",
        "price": 77000,
        "discount_price": 65999,
        "category": "Chronographs",
        "stock": 19,
        "is_featured": true,
        "badge": "Sunburst Blue",
        "sizes": [
            "41mm",
            "43mm"
        ],
        "colors": [
            "Obsidian Black",
            "Champagne Gold",
            "Imperial Emerald",
            "Midnight Sunburst"
        ],
        "images": [
            {
                "url": "https://images.unsplash.com/photo-1518131672697-613becd4fab5?w=800&auto=format&fit=crop&q=80"
            },
            {
                "url": "https://images.unsplash.com/photo-1547996160-71dfabb4e803?w=800&auto=format&fit=crop&q=80"
            }
        ],
        "ratings": {
            "average": 4.9,
            "count": 200
        },
        "specs": {
            "Movement": "Column-Wheel Integrated Chronograph Calibre (28,800 vph)",
            "Case Diameter": "41mm (Lug-to-Lug: 48mm)",
            "Case Material": "316L Surgical Grade Stainless Steel",
            "Crystal": "Dual-Curved Sapphire with Multi-Layer Anti-Reflective Coating",
            "Water Resistance": "100 Meters / 10 ATM",
            "Power Reserve": "48 Hours",
            "Strap": "Handcrafted Italian Full-Grain Alligator-Pattern Leather",
            "Warranty": "5-Year Global Chrononix Horology Warranty"
        }
    },
    {
        "_id": "watch-chr-027",
        "name": "Chrononix Chrono-Diver 200M",
        "tagline": "Screw-down chronograph pushers rated for 200 meters underwater pressure",
        "description": "Handcrafted in accordance with classical horological traditions, the Chrononix Chrono-Diver 200M represents the pinnacle of precision watchmaking. Featuring screw-down chronograph pushers rated for 200 meters underwater pressure, this timepiece is encased in 316l surgical grade stainless steel with a double-curved scratch-proof sapphire crystal. Every component is individually regulated and inspected for chronometer-grade accuracy before delivery.",
        "price": 89000,
        "discount_price": 76999,
        "category": "Chronographs",
        "stock": 20,
        "is_featured": false,
        "badge": "200M Diver Chrono",
        "sizes": [
            "42mm",
            "41mm"
        ],
        "colors": [
            "Obsidian Black",
            "Champagne Gold",
            "Imperial Emerald",
            "Midnight Sunburst"
        ],
        "images": [
            {
                "url": "https://images.unsplash.com/photo-1600003014755-ba31aa59c4b6?w=800&auto=format&fit=crop&q=80"
            },
            {
                "url": "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=800&auto=format&fit=crop&q=80"
            }
        ],
        "ratings": {
            "average": 5.0,
            "count": 207
        },
        "specs": {
            "Movement": "Column-Wheel Integrated Chronograph Calibre (28,800 vph)",
            "Case Diameter": "42mm (Lug-to-Lug: 48mm)",
            "Case Material": "316L Surgical Grade Stainless Steel",
            "Crystal": "Dual-Curved Sapphire with Multi-Layer Anti-Reflective Coating",
            "Water Resistance": "100 Meters / 10 ATM",
            "Power Reserve": "48 Hours",
            "Strap": "Handcrafted Italian Full-Grain Alligator-Pattern Leather",
            "Warranty": "5-Year Global Chrononix Horology Warranty"
        }
    },
    {
        "_id": "watch-chr-028",
        "name": "Chrononix Rattrapante Split-Second",
        "tagline": "Double second-hand split timing mechanism to record simultaneous interval laps",
        "description": "Handcrafted in accordance with classical horological traditions, the Chrononix Rattrapante Split-Second represents the pinnacle of precision watchmaking. Featuring double second-hand split timing mechanism to record simultaneous interval laps, this timepiece is encased in 316l surgical grade stainless steel with a double-curved scratch-proof sapphire crystal. Every component is individually regulated and inspected for chronometer-grade accuracy before delivery.",
        "price": 168000,
        "discount_price": 149999,
        "category": "Chronographs",
        "stock": 21,
        "is_featured": false,
        "badge": "Split-Seconds",
        "sizes": [
            "41mm",
            "43mm"
        ],
        "colors": [
            "Obsidian Black",
            "Champagne Gold",
            "Imperial Emerald",
            "Midnight Sunburst"
        ],
        "images": [
            {
                "url": "https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=800&auto=format&fit=crop&q=80"
            },
            {
                "url": "https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?w=800&auto=format&fit=crop&q=80"
            }
        ],
        "ratings": {
            "average": 4.7,
            "count": 214
        },
        "specs": {
            "Movement": "Column-Wheel Integrated Chronograph Calibre (28,800 vph)",
            "Case Diameter": "41mm (Lug-to-Lug: 48mm)",
            "Case Material": "316L Surgical Grade Stainless Steel",
            "Crystal": "Dual-Curved Sapphire with Multi-Layer Anti-Reflective Coating",
            "Water Resistance": "100 Meters / 10 ATM",
            "Power Reserve": "48 Hours",
            "Strap": "Handcrafted Italian Full-Grain Alligator-Pattern Leather",
            "Warranty": "5-Year Global Chrononix Horology Warranty"
        }
    },
    {
        "_id": "watch-chr-029",
        "name": "Chrononix Vintage Bronze Chronograph",
        "tagline": "CuSn8 marine-grade bronze case that develops a unique custom patina over time",
        "description": "Handcrafted in accordance with classical horological traditions, the Chrononix Vintage Bronze Chronograph represents the pinnacle of precision watchmaking. Featuring cusn8 marine-grade bronze case that develops a unique custom patina over time, this timepiece is encased in cusn8 marine solid bronze with a double-curved scratch-proof sapphire crystal. Every component is individually regulated and inspected for chronometer-grade accuracy before delivery.",
        "price": 85000,
        "discount_price": 72999,
        "category": "Chronographs",
        "stock": 22,
        "is_featured": false,
        "badge": "Marine Bronze",
        "sizes": [
            "41mm",
            "43mm"
        ],
        "colors": [
            "Obsidian Black",
            "Champagne Gold",
            "Imperial Emerald",
            "Midnight Sunburst"
        ],
        "images": [
            {
                "url": "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&auto=format&fit=crop&q=80"
            },
            {
                "url": "https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=800&auto=format&fit=crop&q=80"
            }
        ],
        "ratings": {
            "average": 4.8,
            "count": 221
        },
        "specs": {
            "Movement": "Column-Wheel Integrated Chronograph Calibre (28,800 vph)",
            "Case Diameter": "41mm (Lug-to-Lug: 48mm)",
            "Case Material": "CuSn8 Marine Solid Bronze",
            "Crystal": "Dual-Curved Sapphire with Multi-Layer Anti-Reflective Coating",
            "Water Resistance": "100 Meters / 10 ATM",
            "Power Reserve": "48 Hours",
            "Strap": "Handcrafted Italian Full-Grain Alligator-Pattern Leather",
            "Warranty": "5-Year Global Chrononix Horology Warranty"
        }
    },
    {
        "_id": "watch-chr-030",
        "name": "Chrononix Turbo Titanium Racing",
        "tagline": "Sandblasted aero titanium case with carbon weave dial pattern",
        "description": "Handcrafted in accordance with classical horological traditions, the Chrononix Turbo Titanium Racing represents the pinnacle of precision watchmaking. Featuring sandblasted aero titanium case with carbon weave dial pattern, this timepiece is encased in aerospace grade 5 titanium with a double-curved scratch-proof sapphire crystal. Every component is individually regulated and inspected for chronometer-grade accuracy before delivery.",
        "price": 105000,
        "discount_price": 89999,
        "category": "Chronographs",
        "stock": 8,
        "is_featured": false,
        "badge": "Aero Titanium",
        "sizes": [
            "43mm",
            "41mm"
        ],
        "colors": [
            "Obsidian Black",
            "Champagne Gold",
            "Imperial Emerald",
            "Midnight Sunburst"
        ],
        "images": [
            {
                "url": "https://images.unsplash.com/photo-1548169874-53e85f753f1e?w=800&auto=format&fit=crop&q=80"
            },
            {
                "url": "https://images.unsplash.com/photo-1524805444758-089113d48a6d?w=800&auto=format&fit=crop&q=80"
            }
        ],
        "ratings": {
            "average": 4.9,
            "count": 228
        },
        "specs": {
            "Movement": "Column-Wheel Integrated Chronograph Calibre (28,800 vph)",
            "Case Diameter": "43mm (Lug-to-Lug: 48mm)",
            "Case Material": "Aerospace Grade 5 Titanium",
            "Crystal": "Dual-Curved Sapphire with Multi-Layer Anti-Reflective Coating",
            "Water Resistance": "100 Meters / 10 ATM",
            "Power Reserve": "48 Hours",
            "Strap": "Grade 5 Titanium Link Bracelet with Micro-Adjustment",
            "Warranty": "5-Year Global Chrononix Horology Warranty"
        }
    },
    {
        "_id": "watch-chr-031",
        "name": "Chrononix Grand Royal Flying Tourbillon",
        "tagline": "Single-axis flying tourbillon cage rotating 360 degrees every 60 seconds",
        "description": "Handcrafted in accordance with classical horological traditions, the Chrononix Grand Royal Flying Tourbillon represents the pinnacle of precision watchmaking. Featuring single-axis flying tourbillon cage rotating 360 degrees every 60 seconds, this timepiece is encased in 316l surgical grade stainless steel with a double-curved scratch-proof sapphire crystal. Every component is individually regulated and inspected for chronometer-grade accuracy before delivery.",
        "price": 285000,
        "discount_price": 249999,
        "category": "Tourbillon & Complications",
        "stock": 9,
        "is_featured": true,
        "badge": "Tourbillon",
        "sizes": [
            "42mm",
            "41mm"
        ],
        "colors": [
            "Obsidian Black",
            "Champagne Gold",
            "Imperial Emerald",
            "Midnight Sunburst"
        ],
        "images": [
            {
                "url": "https://images.unsplash.com/photo-1524805444758-089113d48a6d?w=800&auto=format&fit=crop&q=80"
            },
            {
                "url": "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=800&auto=format&fit=crop&q=80"
            }
        ],
        "ratings": {
            "average": 5.0,
            "count": 235
        },
        "specs": {
            "Movement": "Hand-Crafted Flying Tourbillon Calibre (21,600 vph, 33 jewels)",
            "Case Diameter": "42mm (Lug-to-Lug: 48mm)",
            "Case Material": "316L Surgical Grade Stainless Steel",
            "Crystal": "Dual-Curved Sapphire with Multi-Layer Anti-Reflective Coating",
            "Water Resistance": "100 Meters / 10 ATM",
            "Power Reserve": "48 Hours",
            "Strap": "Handcrafted Italian Full-Grain Alligator-Pattern Leather",
            "Warranty": "5-Year Global Chrononix Horology Warranty"
        }
    },
    {
        "_id": "watch-chr-032",
        "name": "Chrononix Celestial Orbit Moonphase",
        "tagline": "Photorealistic laser-etched lunar disc with perpetual moonphase calculation",
        "description": "Handcrafted in accordance with classical horological traditions, the Chrononix Celestial Orbit Moonphase represents the pinnacle of precision watchmaking. Featuring photorealistic laser-etched lunar disc with perpetual moonphase calculation, this timepiece is encased in 316l surgical grade stainless steel with a double-curved scratch-proof sapphire crystal. Every component is individually regulated and inspected for chronometer-grade accuracy before delivery.",
        "price": 165000,
        "discount_price": 139999,
        "category": "Tourbillon & Complications",
        "stock": 10,
        "is_featured": false,
        "badge": "Moonphase",
        "sizes": [
            "41mm",
            "43mm"
        ],
        "colors": [
            "Obsidian Black",
            "Champagne Gold",
            "Imperial Emerald",
            "Midnight Sunburst"
        ],
        "images": [
            {
                "url": "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=800&auto=format&fit=crop&q=80"
            },
            {
                "url": "https://images.unsplash.com/photo-1524805444758-089113d48a6d?w=800&auto=format&fit=crop&q=80"
            }
        ],
        "ratings": {
            "average": 4.7,
            "count": 242
        },
        "specs": {
            "Movement": "Hand-Crafted Flying Tourbillon Calibre (21,600 vph, 33 jewels)",
            "Case Diameter": "41mm (Lug-to-Lug: 48mm)",
            "Case Material": "316L Surgical Grade Stainless Steel",
            "Crystal": "Dual-Curved Sapphire with Multi-Layer Anti-Reflective Coating",
            "Water Resistance": "100 Meters / 10 ATM",
            "Power Reserve": "48 Hours",
            "Strap": "Handcrafted Italian Full-Grain Alligator-Pattern Leather",
            "Warranty": "5-Year Global Chrononix Horology Warranty"
        }
    },
    {
        "_id": "watch-chr-033",
        "name": "Chrononix Gyroscope Multi-Axis Tourbillon",
        "tagline": "Spherical double-axis cage defying gravitational timekeeping errors",
        "description": "Handcrafted in accordance with classical horological traditions, the Chrononix Gyroscope Multi-Axis Tourbillon represents the pinnacle of precision watchmaking. Featuring spherical double-axis cage defying gravitational timekeeping errors, this timepiece is encased in 316l surgical grade stainless steel with a double-curved scratch-proof sapphire crystal. Every component is individually regulated and inspected for chronometer-grade accuracy before delivery.",
        "price": 349000,
        "discount_price": 299999,
        "category": "Tourbillon & Complications",
        "stock": 11,
        "is_featured": false,
        "badge": "Multi-Axis Tourbillon",
        "sizes": [
            "42mm",
            "41mm"
        ],
        "colors": [
            "Obsidian Black",
            "Champagne Gold",
            "Imperial Emerald",
            "Midnight Sunburst"
        ],
        "images": [
            {
                "url": "https://images.unsplash.com/photo-1533139502658-0198f920d8e8?w=800&auto=format&fit=crop&q=80"
            },
            {
                "url": "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&auto=format&fit=crop&q=80"
            }
        ],
        "ratings": {
            "average": 4.8,
            "count": 249
        },
        "specs": {
            "Movement": "Hand-Crafted Flying Tourbillon Calibre (21,600 vph, 33 jewels)",
            "Case Diameter": "42mm (Lug-to-Lug: 48mm)",
            "Case Material": "316L Surgical Grade Stainless Steel",
            "Crystal": "Dual-Curved Sapphire with Multi-Layer Anti-Reflective Coating",
            "Water Resistance": "100 Meters / 10 ATM",
            "Power Reserve": "48 Hours",
            "Strap": "Handcrafted Italian Full-Grain Alligator-Pattern Leather",
            "Warranty": "5-Year Global Chrononix Horology Warranty"
        }
    },
    {
        "_id": "watch-chr-034",
        "name": "Chrononix Perpetual Calendar Astrum",
        "tagline": "Mechanical brain calculating months, dates, and leap years until year 2100",
        "description": "Handcrafted in accordance with classical horological traditions, the Chrononix Perpetual Calendar Astrum represents the pinnacle of precision watchmaking. Featuring mechanical brain calculating months, dates, and leap years until year 2100, this timepiece is encased in 316l surgical grade stainless steel with a double-curved scratch-proof sapphire crystal. Every component is individually regulated and inspected for chronometer-grade accuracy before delivery.",
        "price": 220000,
        "discount_price": 189999,
        "category": "Tourbillon & Complications",
        "stock": 12,
        "is_featured": false,
        "badge": "Perpetual Calendar",
        "sizes": [
            "41mm",
            "43mm"
        ],
        "colors": [
            "Obsidian Black",
            "Champagne Gold",
            "Imperial Emerald",
            "Midnight Sunburst"
        ],
        "images": [
            {
                "url": "https://images.unsplash.com/photo-1547996160-71dfabb4e803?w=800&auto=format&fit=crop&q=80"
            },
            {
                "url": "https://images.unsplash.com/photo-1614164185128-e4ec99c436d7?w=800&auto=format&fit=crop&q=80"
            }
        ],
        "ratings": {
            "average": 4.9,
            "count": 256
        },
        "specs": {
            "Movement": "Hand-Crafted Flying Tourbillon Calibre (21,600 vph, 33 jewels)",
            "Case Diameter": "41mm (Lug-to-Lug: 48mm)",
            "Case Material": "316L Surgical Grade Stainless Steel",
            "Crystal": "Dual-Curved Sapphire with Multi-Layer Anti-Reflective Coating",
            "Water Resistance": "100 Meters / 10 ATM",
            "Power Reserve": "48 Hours",
            "Strap": "Handcrafted Italian Full-Grain Alligator-Pattern Leather",
            "Warranty": "5-Year Global Chrononix Horology Warranty"
        }
    },
    {
        "_id": "watch-chr-035",
        "name": "Chrononix Minute Repeater Carillon",
        "tagline": "Chimes hours, quarter-hours, and minutes on three acoustically tuned gongs",
        "description": "Handcrafted in accordance with classical horological traditions, the Chrononix Minute Repeater Carillon represents the pinnacle of precision watchmaking. Featuring chimes hours, quarter-hours, and minutes on three acoustically tuned gongs, this timepiece is encased in 316l surgical grade stainless steel with a double-curved scratch-proof sapphire crystal. Every component is individually regulated and inspected for chronometer-grade accuracy before delivery.",
        "price": 310000,
        "discount_price": 269999,
        "category": "Tourbillon & Complications",
        "stock": 13,
        "is_featured": false,
        "badge": "Minute Repeater",
        "sizes": [
            "41mm",
            "43mm"
        ],
        "colors": [
            "Obsidian Black",
            "Champagne Gold",
            "Imperial Emerald",
            "Midnight Sunburst"
        ],
        "images": [
            {
                "url": "https://images.unsplash.com/photo-1614164185128-e4ec99c436d7?w=800&auto=format&fit=crop&q=80"
            },
            {
                "url": "https://images.unsplash.com/photo-1547996160-71dfabb4e803?w=800&auto=format&fit=crop&q=80"
            }
        ],
        "ratings": {
            "average": 5.0,
            "count": 263
        },
        "specs": {
            "Movement": "Hand-Crafted Flying Tourbillon Calibre (21,600 vph, 33 jewels)",
            "Case Diameter": "41mm (Lug-to-Lug: 48mm)",
            "Case Material": "316L Surgical Grade Stainless Steel",
            "Crystal": "Dual-Curved Sapphire with Multi-Layer Anti-Reflective Coating",
            "Water Resistance": "100 Meters / 10 ATM",
            "Power Reserve": "48 Hours",
            "Strap": "Handcrafted Italian Full-Grain Alligator-Pattern Leather",
            "Warranty": "5-Year Global Chrononix Horology Warranty"
        }
    },
    {
        "_id": "watch-chr-036",
        "name": "Chrononix Equation of Time Master",
        "tagline": "Displays the solar time deviation alongside mean civil standard time",
        "description": "Handcrafted in accordance with classical horological traditions, the Chrononix Equation of Time Master represents the pinnacle of precision watchmaking. Featuring displays the solar time deviation alongside mean civil standard time, this timepiece is encased in 316l surgical grade stainless steel with a double-curved scratch-proof sapphire crystal. Every component is individually regulated and inspected for chronometer-grade accuracy before delivery.",
        "price": 195000,
        "discount_price": 169999,
        "category": "Tourbillon & Complications",
        "stock": 14,
        "is_featured": true,
        "badge": "Haute Complication",
        "sizes": [
            "41mm",
            "43mm"
        ],
        "colors": [
            "Obsidian Black",
            "Champagne Gold",
            "Imperial Emerald",
            "Midnight Sunburst"
        ],
        "images": [
            {
                "url": "https://images.unsplash.com/photo-1587836374828-4dbafa94cf0e?w=800&auto=format&fit=crop&q=80"
            },
            {
                "url": "https://images.unsplash.com/photo-1524805444758-089113d48a6d?w=800&auto=format&fit=crop&q=80"
            }
        ],
        "ratings": {
            "average": 4.7,
            "count": 20
        },
        "specs": {
            "Movement": "Hand-Crafted Flying Tourbillon Calibre (21,600 vph, 33 jewels)",
            "Case Diameter": "41mm (Lug-to-Lug: 48mm)",
            "Case Material": "316L Surgical Grade Stainless Steel",
            "Crystal": "Dual-Curved Sapphire with Multi-Layer Anti-Reflective Coating",
            "Water Resistance": "100 Meters / 10 ATM",
            "Power Reserve": "48 Hours",
            "Strap": "Handcrafted Italian Full-Grain Alligator-Pattern Leather",
            "Warranty": "5-Year Global Chrononix Horology Warranty"
        }
    },
    {
        "_id": "watch-chr-037",
        "name": "Chrononix Starry Sky Starlight Tourbillon",
        "tagline": "Genuine aventurine mineral dial shimmering like a star-studded midnight cosmos",
        "description": "Handcrafted in accordance with classical horological traditions, the Chrononix Starry Sky Starlight Tourbillon represents the pinnacle of precision watchmaking. Featuring genuine aventurine mineral dial shimmering like a star-studded midnight cosmos, this timepiece is encased in 316l surgical grade stainless steel with a double-curved scratch-proof sapphire crystal. Every component is individually regulated and inspected for chronometer-grade accuracy before delivery.",
        "price": 260000,
        "discount_price": 229999,
        "category": "Tourbillon & Complications",
        "stock": 15,
        "is_featured": false,
        "badge": "Aventurine Dial",
        "sizes": [
            "42mm",
            "41mm"
        ],
        "colors": [
            "Obsidian Black",
            "Champagne Gold",
            "Imperial Emerald",
            "Midnight Sunburst"
        ],
        "images": [
            {
                "url": "https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=800&auto=format&fit=crop&q=80"
            },
            {
                "url": "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&auto=format&fit=crop&q=80"
            }
        ],
        "ratings": {
            "average": 4.8,
            "count": 27
        },
        "specs": {
            "Movement": "Hand-Crafted Flying Tourbillon Calibre (21,600 vph, 33 jewels)",
            "Case Diameter": "42mm (Lug-to-Lug: 48mm)",
            "Case Material": "316L Surgical Grade Stainless Steel",
            "Crystal": "Dual-Curved Sapphire with Multi-Layer Anti-Reflective Coating",
            "Water Resistance": "100 Meters / 10 ATM",
            "Power Reserve": "48 Hours",
            "Strap": "Handcrafted Italian Full-Grain Alligator-Pattern Leather",
            "Warranty": "5-Year Global Chrononix Horology Warranty"
        }
    },
    {
        "_id": "watch-chr-038",
        "name": "Chrononix Double Barrel Tourbillon 120H",
        "tagline": "Twin mainspring barrels powering the flying tourbillon for 120 hours",
        "description": "Handcrafted in accordance with classical horological traditions, the Chrononix Double Barrel Tourbillon 120H represents the pinnacle of precision watchmaking. Featuring twin mainspring barrels powering the flying tourbillon for 120 hours, this timepiece is encased in 316l surgical grade stainless steel with a double-curved scratch-proof sapphire crystal. Every component is individually regulated and inspected for chronometer-grade accuracy before delivery.",
        "price": 295000,
        "discount_price": 259999,
        "category": "Tourbillon & Complications",
        "stock": 16,
        "is_featured": false,
        "badge": "120H Power Reserve",
        "sizes": [
            "42mm",
            "41mm"
        ],
        "colors": [
            "Obsidian Black",
            "Champagne Gold",
            "Imperial Emerald",
            "Midnight Sunburst"
        ],
        "images": [
            {
                "url": "https://images.unsplash.com/photo-1619134778706-7015533a6150?w=800&auto=format&fit=crop&q=80"
            },
            {
                "url": "https://images.unsplash.com/photo-1533139502658-0198f920d8e8?w=800&auto=format&fit=crop&q=80"
            }
        ],
        "ratings": {
            "average": 4.9,
            "count": 34
        },
        "specs": {
            "Movement": "Hand-Crafted Flying Tourbillon Calibre (21,600 vph, 33 jewels)",
            "Case Diameter": "42mm (Lug-to-Lug: 48mm)",
            "Case Material": "316L Surgical Grade Stainless Steel",
            "Crystal": "Dual-Curved Sapphire with Multi-Layer Anti-Reflective Coating",
            "Water Resistance": "100 Meters / 10 ATM",
            "Power Reserve": "120 Hours",
            "Strap": "Handcrafted Italian Full-Grain Alligator-Pattern Leather",
            "Warranty": "5-Year Global Chrononix Horology Warranty"
        }
    },
    {
        "_id": "watch-chr-039",
        "name": "Chrononix WorldTime 24-City Complication",
        "tagline": "Rotating 24-time zone city disc synchronized with central hour hand",
        "description": "Handcrafted in accordance with classical horological traditions, the Chrononix WorldTime 24-City Complication represents the pinnacle of precision watchmaking. Featuring rotating 24-time zone city disc synchronized with central hour hand, this timepiece is encased in 316l surgical grade stainless steel with a double-curved scratch-proof sapphire crystal. Every component is individually regulated and inspected for chronometer-grade accuracy before delivery.",
        "price": 145000,
        "discount_price": 124999,
        "category": "Tourbillon & Complications",
        "stock": 17,
        "is_featured": false,
        "badge": "WorldTime 24",
        "sizes": [
            "41mm",
            "43mm"
        ],
        "colors": [
            "Obsidian Black",
            "Champagne Gold",
            "Imperial Emerald",
            "Midnight Sunburst"
        ],
        "images": [
            {
                "url": "https://images.unsplash.com/photo-1622434641406-a158123450f9?w=800&auto=format&fit=crop&q=80"
            },
            {
                "url": "https://images.unsplash.com/photo-1619134778706-7015533a6150?w=800&auto=format&fit=crop&q=80"
            }
        ],
        "ratings": {
            "average": 5.0,
            "count": 41
        },
        "specs": {
            "Movement": "Hand-Crafted Flying Tourbillon Calibre (21,600 vph, 33 jewels)",
            "Case Diameter": "41mm (Lug-to-Lug: 48mm)",
            "Case Material": "316L Surgical Grade Stainless Steel",
            "Crystal": "Dual-Curved Sapphire with Multi-Layer Anti-Reflective Coating",
            "Water Resistance": "100 Meters / 10 ATM",
            "Power Reserve": "48 Hours",
            "Strap": "Handcrafted Italian Full-Grain Alligator-Pattern Leather",
            "Warranty": "5-Year Global Chrononix Horology Warranty"
        }
    },
    {
        "_id": "watch-chr-040",
        "name": "Chrononix Tourbillon Skeleton Rose Gold",
        "tagline": "18K Rose Gold open-worked bridges showcasing the pulsing tourbillon heart",
        "description": "Handcrafted in accordance with classical horological traditions, the Chrononix Tourbillon Skeleton Rose Gold represents the pinnacle of precision watchmaking. Featuring 18k rose gold open-worked bridges showcasing the pulsing tourbillon heart, this timepiece is encased in 18k gold pvd over 316l steel with a double-curved scratch-proof sapphire crystal. Every component is individually regulated and inspected for chronometer-grade accuracy before delivery.",
        "price": 275000,
        "discount_price": 239999,
        "category": "Tourbillon & Complications",
        "stock": 18,
        "is_featured": false,
        "badge": "Rose Gold Tourbillon",
        "sizes": [
            "42mm",
            "41mm"
        ],
        "colors": [
            "Obsidian Black",
            "Champagne Gold",
            "Imperial Emerald",
            "Midnight Sunburst"
        ],
        "images": [
            {
                "url": "https://images.unsplash.com/photo-1612817159949-195b6eb9e31a?w=800&auto=format&fit=crop&q=80"
            },
            {
                "url": "https://images.unsplash.com/photo-1614164185128-e4ec99c436d7?w=800&auto=format&fit=crop&q=80"
            }
        ],
        "ratings": {
            "average": 4.7,
            "count": 48
        },
        "specs": {
            "Movement": "Hand-Crafted Flying Tourbillon Calibre (21,600 vph, 33 jewels)",
            "Case Diameter": "42mm (Lug-to-Lug: 48mm)",
            "Case Material": "18K Gold PVD over 316L Steel",
            "Crystal": "Dual-Curved Sapphire with Multi-Layer Anti-Reflective Coating",
            "Water Resistance": "100 Meters / 10 ATM",
            "Power Reserve": "48 Hours",
            "Strap": "Handcrafted Italian Full-Grain Alligator-Pattern Leather",
            "Warranty": "5-Year Global Chrononix Horology Warranty"
        }
    },
    {
        "_id": "watch-chr-041",
        "name": "Chrononix Retrograde Jump Hour",
        "tagline": "Instantaneous jumping hour numeral window with retrograde sweeping minute arc",
        "description": "Handcrafted in accordance with classical horological traditions, the Chrononix Retrograde Jump Hour represents the pinnacle of precision watchmaking. Featuring instantaneous jumping hour numeral window with retrograde sweeping minute arc, this timepiece is encased in 316l surgical grade stainless steel with a double-curved scratch-proof sapphire crystal. Every component is individually regulated and inspected for chronometer-grade accuracy before delivery.",
        "price": 155000,
        "discount_price": 134999,
        "category": "Tourbillon & Complications",
        "stock": 19,
        "is_featured": true,
        "badge": "Jump Hour",
        "sizes": [
            "41mm",
            "43mm"
        ],
        "colors": [
            "Obsidian Black",
            "Champagne Gold",
            "Imperial Emerald",
            "Midnight Sunburst"
        ],
        "images": [
            {
                "url": "https://images.unsplash.com/photo-1518131672697-613becd4fab5?w=800&auto=format&fit=crop&q=80"
            },
            {
                "url": "https://images.unsplash.com/photo-1547996160-71dfabb4e803?w=800&auto=format&fit=crop&q=80"
            }
        ],
        "ratings": {
            "average": 4.8,
            "count": 55
        },
        "specs": {
            "Movement": "Hand-Crafted Flying Tourbillon Calibre (21,600 vph, 33 jewels)",
            "Case Diameter": "41mm (Lug-to-Lug: 48mm)",
            "Case Material": "316L Surgical Grade Stainless Steel",
            "Crystal": "Dual-Curved Sapphire with Multi-Layer Anti-Reflective Coating",
            "Water Resistance": "100 Meters / 10 ATM",
            "Power Reserve": "48 Hours",
            "Strap": "Handcrafted Italian Full-Grain Alligator-Pattern Leather",
            "Warranty": "5-Year Global Chrononix Horology Warranty"
        }
    },
    {
        "_id": "watch-chr-042",
        "name": "Chrononix Grand Complication Platinum",
        "tagline": "Combines tourbillon, split-second chronograph, and perpetual calendar",
        "description": "Handcrafted in accordance with classical horological traditions, the Chrononix Grand Complication Platinum represents the pinnacle of precision watchmaking. Featuring combines tourbillon, split-second chronograph, and perpetual calendar, this timepiece is encased in 950 platinum finish over 316l steel with a double-curved scratch-proof sapphire crystal. Every component is individually regulated and inspected for chronometer-grade accuracy before delivery.",
        "price": 380000,
        "discount_price": 329999,
        "category": "Tourbillon & Complications",
        "stock": 20,
        "is_featured": false,
        "badge": "Masterpiece",
        "sizes": [
            "41mm",
            "43mm"
        ],
        "colors": [
            "Obsidian Black",
            "Champagne Gold",
            "Imperial Emerald",
            "Midnight Sunburst"
        ],
        "images": [
            {
                "url": "https://images.unsplash.com/photo-1600003014755-ba31aa59c4b6?w=800&auto=format&fit=crop&q=80"
            },
            {
                "url": "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=800&auto=format&fit=crop&q=80"
            }
        ],
        "ratings": {
            "average": 4.9,
            "count": 62
        },
        "specs": {
            "Movement": "Hand-Crafted Flying Tourbillon Calibre (21,600 vph, 33 jewels)",
            "Case Diameter": "41mm (Lug-to-Lug: 48mm)",
            "Case Material": "950 Platinum Finish over 316L Steel",
            "Crystal": "Dual-Curved Sapphire with Multi-Layer Anti-Reflective Coating",
            "Water Resistance": "100 Meters / 10 ATM",
            "Power Reserve": "48 Hours",
            "Strap": "Handcrafted Italian Full-Grain Alligator-Pattern Leather",
            "Warranty": "5-Year Global Chrononix Horology Warranty"
        }
    },
    {
        "_id": "watch-chr-043",
        "name": "Chrononix Meteorite Dial Tourbillon",
        "tagline": "Authentic sliced Muonionalusta iron-nickel meteorite dial with Widmanst\u00e4tten patterns",
        "description": "Handcrafted in accordance with classical horological traditions, the Chrononix Meteorite Dial Tourbillon represents the pinnacle of precision watchmaking. Featuring authentic sliced muonionalusta iron-nickel meteorite dial with widmanst\u00e4tten patterns, this timepiece is encased in 316l surgical grade stainless steel with a double-curved scratch-proof sapphire crystal. Every component is individually regulated and inspected for chronometer-grade accuracy before delivery.",
        "price": 325000,
        "discount_price": 279999,
        "category": "Tourbillon & Complications",
        "stock": 21,
        "is_featured": false,
        "badge": "Meteorite Dial",
        "sizes": [
            "42mm",
            "41mm"
        ],
        "colors": [
            "Obsidian Black",
            "Champagne Gold",
            "Imperial Emerald",
            "Midnight Sunburst"
        ],
        "images": [
            {
                "url": "https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=800&auto=format&fit=crop&q=80"
            },
            {
                "url": "https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?w=800&auto=format&fit=crop&q=80"
            }
        ],
        "ratings": {
            "average": 5.0,
            "count": 69
        },
        "specs": {
            "Movement": "Hand-Crafted Flying Tourbillon Calibre (21,600 vph, 33 jewels)",
            "Case Diameter": "42mm (Lug-to-Lug: 48mm)",
            "Case Material": "316L Surgical Grade Stainless Steel",
            "Crystal": "Dual-Curved Sapphire with Multi-Layer Anti-Reflective Coating",
            "Water Resistance": "100 Meters / 10 ATM",
            "Power Reserve": "48 Hours",
            "Strap": "Handcrafted Italian Full-Grain Alligator-Pattern Leather",
            "Warranty": "5-Year Global Chrononix Horology Warranty"
        }
    },
    {
        "_id": "watch-chr-044",
        "name": "Chrononix Sun & Moon Retrograde",
        "tagline": "Dual retrograde hand displays with day/night 24-hour sun and moon disc",
        "description": "Handcrafted in accordance with classical horological traditions, the Chrononix Sun & Moon Retrograde represents the pinnacle of precision watchmaking. Featuring dual retrograde hand displays with day/night 24-hour sun and moon disc, this timepiece is encased in 316l surgical grade stainless steel with a double-curved scratch-proof sapphire crystal. Every component is individually regulated and inspected for chronometer-grade accuracy before delivery.",
        "price": 140000,
        "discount_price": 119999,
        "category": "Tourbillon & Complications",
        "stock": 22,
        "is_featured": false,
        "badge": "Retrograde Complication",
        "sizes": [
            "41mm",
            "43mm"
        ],
        "colors": [
            "Obsidian Black",
            "Champagne Gold",
            "Imperial Emerald",
            "Midnight Sunburst"
        ],
        "images": [
            {
                "url": "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&auto=format&fit=crop&q=80"
            },
            {
                "url": "https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=800&auto=format&fit=crop&q=80"
            }
        ],
        "ratings": {
            "average": 4.7,
            "count": 76
        },
        "specs": {
            "Movement": "Hand-Crafted Flying Tourbillon Calibre (21,600 vph, 33 jewels)",
            "Case Diameter": "41mm (Lug-to-Lug: 48mm)",
            "Case Material": "316L Surgical Grade Stainless Steel",
            "Crystal": "Dual-Curved Sapphire with Multi-Layer Anti-Reflective Coating",
            "Water Resistance": "100 Meters / 10 ATM",
            "Power Reserve": "48 Hours",
            "Strap": "Handcrafted Italian Full-Grain Alligator-Pattern Leather",
            "Warranty": "5-Year Global Chrononix Horology Warranty"
        }
    },
    {
        "_id": "watch-chr-045",
        "name": "Chrononix Matrix Openwork Calibre",
        "tagline": "Architectural skeletonized dial showcasing the balance wheel and gear train",
        "description": "Handcrafted in accordance with classical horological traditions, the Chrononix Matrix Openwork Calibre represents the pinnacle of precision watchmaking. Featuring architectural skeletonized dial showcasing the balance wheel and gear train, this timepiece is encased in 316l surgical grade stainless steel with a double-curved scratch-proof sapphire crystal. Every component is individually regulated and inspected for chronometer-grade accuracy before delivery.",
        "price": 92000,
        "discount_price": 78999,
        "category": "Skeleton & Mechanical",
        "stock": 8,
        "is_featured": true,
        "badge": "Openwork Skeleton",
        "sizes": [
            "41mm",
            "43mm"
        ],
        "colors": [
            "Obsidian Black",
            "Champagne Gold",
            "Imperial Emerald",
            "Midnight Sunburst"
        ],
        "images": [
            {
                "url": "https://images.unsplash.com/photo-1548169874-53e85f753f1e?w=800&auto=format&fit=crop&q=80"
            },
            {
                "url": "https://images.unsplash.com/photo-1524805444758-089113d48a6d?w=800&auto=format&fit=crop&q=80"
            }
        ],
        "ratings": {
            "average": 4.8,
            "count": 83
        },
        "specs": {
            "Movement": "Column-Wheel Integrated Chronograph Calibre (28,800 vph)",
            "Case Diameter": "41mm (Lug-to-Lug: 48mm)",
            "Case Material": "316L Surgical Grade Stainless Steel",
            "Crystal": "Dual-Curved Sapphire with Multi-Layer Anti-Reflective Coating",
            "Water Resistance": "100 Meters / 10 ATM",
            "Power Reserve": "48 Hours",
            "Strap": "Handcrafted Italian Full-Grain Alligator-Pattern Leather",
            "Warranty": "5-Year Global Chrononix Horology Warranty"
        }
    },
    {
        "_id": "watch-chr-046",
        "name": "Chrononix Ruthenium Black Skeleton",
        "tagline": "Ruthenium-treated dark anthracite movement bridges with gold gear accents",
        "description": "Handcrafted in accordance with classical horological traditions, the Chrononix Ruthenium Black Skeleton represents the pinnacle of precision watchmaking. Featuring ruthenium-treated dark anthracite movement bridges with gold gear accents, this timepiece is encased in 316l surgical grade stainless steel with a double-curved scratch-proof sapphire crystal. Every component is individually regulated and inspected for chronometer-grade accuracy before delivery.",
        "price": 108000,
        "discount_price": 92999,
        "category": "Skeleton & Mechanical",
        "stock": 9,
        "is_featured": true,
        "badge": "Ruthenium Finish",
        "sizes": [
            "41mm",
            "43mm"
        ],
        "colors": [
            "Obsidian Black",
            "Champagne Gold",
            "Imperial Emerald",
            "Midnight Sunburst"
        ],
        "images": [
            {
                "url": "https://images.unsplash.com/photo-1524805444758-089113d48a6d?w=800&auto=format&fit=crop&q=80"
            },
            {
                "url": "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=800&auto=format&fit=crop&q=80"
            }
        ],
        "ratings": {
            "average": 4.9,
            "count": 90
        },
        "specs": {
            "Movement": "Column-Wheel Integrated Chronograph Calibre (28,800 vph)",
            "Case Diameter": "41mm (Lug-to-Lug: 48mm)",
            "Case Material": "316L Surgical Grade Stainless Steel",
            "Crystal": "Dual-Curved Sapphire with Multi-Layer Anti-Reflective Coating",
            "Water Resistance": "100 Meters / 10 ATM",
            "Power Reserve": "48 Hours",
            "Strap": "Handcrafted Italian Full-Grain Alligator-Pattern Leather",
            "Warranty": "5-Year Global Chrononix Horology Warranty"
        }
    },
    {
        "_id": "watch-chr-047",
        "name": "Chrononix CyberMech Geometric Skeleton",
        "tagline": "Futuristic avant-garde bridges laser-cut from aerospace titanium",
        "description": "Handcrafted in accordance with classical horological traditions, the Chrononix CyberMech Geometric Skeleton represents the pinnacle of precision watchmaking. Featuring futuristic avant-garde bridges laser-cut from aerospace titanium, this timepiece is encased in 316l surgical grade stainless steel with a double-curved scratch-proof sapphire crystal. Every component is individually regulated and inspected for chronometer-grade accuracy before delivery.",
        "price": 115000,
        "discount_price": 97999,
        "category": "Skeleton & Mechanical",
        "stock": 10,
        "is_featured": false,
        "badge": "Titanium Bridges",
        "sizes": [
            "41mm",
            "43mm"
        ],
        "colors": [
            "Obsidian Black",
            "Champagne Gold",
            "Imperial Emerald",
            "Midnight Sunburst"
        ],
        "images": [
            {
                "url": "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=800&auto=format&fit=crop&q=80"
            },
            {
                "url": "https://images.unsplash.com/photo-1524805444758-089113d48a6d?w=800&auto=format&fit=crop&q=80"
            }
        ],
        "ratings": {
            "average": 5.0,
            "count": 97
        },
        "specs": {
            "Movement": "Column-Wheel Integrated Chronograph Calibre (28,800 vph)",
            "Case Diameter": "41mm (Lug-to-Lug: 48mm)",
            "Case Material": "316L Surgical Grade Stainless Steel",
            "Crystal": "Dual-Curved Sapphire with Multi-Layer Anti-Reflective Coating",
            "Water Resistance": "100 Meters / 10 ATM",
            "Power Reserve": "48 Hours",
            "Strap": "Handcrafted Italian Full-Grain Alligator-Pattern Leather",
            "Warranty": "5-Year Global Chrononix Horology Warranty"
        }
    },
    {
        "_id": "watch-chr-048",
        "name": "Chrononix Hand-Wound Purist Calibre",
        "tagline": "Traditional 17-jewel manual-wind mechanism with satisfying tactile winding clicks",
        "description": "Handcrafted in accordance with classical horological traditions, the Chrononix Hand-Wound Purist Calibre represents the pinnacle of precision watchmaking. Featuring traditional 17-jewel manual-wind mechanism with satisfying tactile winding clicks, this timepiece is encased in 316l surgical grade stainless steel with a double-curved scratch-proof sapphire crystal. Every component is individually regulated and inspected for chronometer-grade accuracy before delivery.",
        "price": 65000,
        "discount_price": 54999,
        "category": "Skeleton & Mechanical",
        "stock": 11,
        "is_featured": false,
        "badge": "Manual Wind",
        "sizes": [
            "41mm",
            "43mm"
        ],
        "colors": [
            "Obsidian Black",
            "Champagne Gold",
            "Imperial Emerald",
            "Midnight Sunburst"
        ],
        "images": [
            {
                "url": "https://images.unsplash.com/photo-1533139502658-0198f920d8e8?w=800&auto=format&fit=crop&q=80"
            },
            {
                "url": "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&auto=format&fit=crop&q=80"
            }
        ],
        "ratings": {
            "average": 4.7,
            "count": 104
        },
        "specs": {
            "Movement": "Column-Wheel Integrated Chronograph Calibre (28,800 vph)",
            "Case Diameter": "41mm (Lug-to-Lug: 48mm)",
            "Case Material": "316L Surgical Grade Stainless Steel",
            "Crystal": "Dual-Curved Sapphire with Multi-Layer Anti-Reflective Coating",
            "Water Resistance": "100 Meters / 10 ATM",
            "Power Reserve": "48 Hours",
            "Strap": "Handcrafted Italian Full-Grain Alligator-Pattern Leather",
            "Warranty": "5-Year Global Chrononix Horology Warranty"
        }
    },
    {
        "_id": "watch-chr-049",
        "name": "Chrononix Skeleton Rose Gold Elegance",
        "tagline": "Exposed rose gold balance assembly framed by polished ceramic bezel",
        "description": "Handcrafted in accordance with classical horological traditions, the Chrononix Skeleton Rose Gold Elegance represents the pinnacle of precision watchmaking. Featuring exposed rose gold balance assembly framed by polished ceramic bezel, this timepiece is encased in 18k gold pvd over 316l steel with a double-curved scratch-proof sapphire crystal. Every component is individually regulated and inspected for chronometer-grade accuracy before delivery.",
        "price": 98000,
        "discount_price": 84999,
        "category": "Skeleton & Mechanical",
        "stock": 12,
        "is_featured": false,
        "badge": "Rose Gold Casing",
        "sizes": [
            "41mm",
            "43mm"
        ],
        "colors": [
            "Obsidian Black",
            "Champagne Gold",
            "Imperial Emerald",
            "Midnight Sunburst"
        ],
        "images": [
            {
                "url": "https://images.unsplash.com/photo-1547996160-71dfabb4e803?w=800&auto=format&fit=crop&q=80"
            },
            {
                "url": "https://images.unsplash.com/photo-1614164185128-e4ec99c436d7?w=800&auto=format&fit=crop&q=80"
            }
        ],
        "ratings": {
            "average": 4.8,
            "count": 111
        },
        "specs": {
            "Movement": "Column-Wheel Integrated Chronograph Calibre (28,800 vph)",
            "Case Diameter": "41mm (Lug-to-Lug: 48mm)",
            "Case Material": "18K Gold PVD over 316L Steel",
            "Crystal": "Dual-Curved Sapphire with Multi-Layer Anti-Reflective Coating",
            "Water Resistance": "100 Meters / 10 ATM",
            "Power Reserve": "48 Hours",
            "Strap": "Handcrafted Italian Full-Grain Alligator-Pattern Leather",
            "Warranty": "5-Year Global Chrononix Horology Warranty"
        }
    },
    {
        "_id": "watch-chr-050",
        "name": "Chrononix Monobloc Sapphire Skeleton",
        "tagline": "Completely transparent scratch-resistant sapphire crystal case construction",
        "description": "Handcrafted in accordance with classical horological traditions, the Chrononix Monobloc Sapphire Skeleton represents the pinnacle of precision watchmaking. Featuring completely transparent scratch-resistant sapphire crystal case construction, this timepiece is encased in 316l surgical grade stainless steel with a double-curved scratch-proof sapphire crystal. Every component is individually regulated and inspected for chronometer-grade accuracy before delivery.",
        "price": 195000,
        "discount_price": 169999,
        "category": "Skeleton & Mechanical",
        "stock": 13,
        "is_featured": false,
        "badge": "Sapphire Case",
        "sizes": [
            "41mm",
            "43mm"
        ],
        "colors": [
            "Obsidian Black",
            "Champagne Gold",
            "Imperial Emerald",
            "Midnight Sunburst"
        ],
        "images": [
            {
                "url": "https://images.unsplash.com/photo-1614164185128-e4ec99c436d7?w=800&auto=format&fit=crop&q=80"
            },
            {
                "url": "https://images.unsplash.com/photo-1547996160-71dfabb4e803?w=800&auto=format&fit=crop&q=80"
            }
        ],
        "ratings": {
            "average": 4.9,
            "count": 118
        },
        "specs": {
            "Movement": "Column-Wheel Integrated Chronograph Calibre (28,800 vph)",
            "Case Diameter": "41mm (Lug-to-Lug: 48mm)",
            "Case Material": "316L Surgical Grade Stainless Steel",
            "Crystal": "Dual-Curved Sapphire with Multi-Layer Anti-Reflective Coating",
            "Water Resistance": "100 Meters / 10 ATM",
            "Power Reserve": "48 Hours",
            "Strap": "Handcrafted Italian Full-Grain Alligator-Pattern Leather",
            "Warranty": "5-Year Global Chrononix Horology Warranty"
        }
    },
    {
        "_id": "watch-chr-051",
        "name": "Chrononix Art Deco Open-Heart",
        "tagline": "Symmetrical cutaway at 12 o'clock displaying the oscillating hairspring",
        "description": "Handcrafted in accordance with classical horological traditions, the Chrononix Art Deco Open-Heart represents the pinnacle of precision watchmaking. Featuring symmetrical cutaway at 12 o'clock displaying the oscillating hairspring, this timepiece is encased in 316l surgical grade stainless steel with a double-curved scratch-proof sapphire crystal. Every component is individually regulated and inspected for chronometer-grade accuracy before delivery.",
        "price": 58000,
        "discount_price": 48999,
        "category": "Skeleton & Mechanical",
        "stock": 14,
        "is_featured": true,
        "badge": "Open-Heart",
        "sizes": [
            "41mm",
            "43mm"
        ],
        "colors": [
            "Obsidian Black",
            "Champagne Gold",
            "Imperial Emerald",
            "Midnight Sunburst"
        ],
        "images": [
            {
                "url": "https://images.unsplash.com/photo-1587836374828-4dbafa94cf0e?w=800&auto=format&fit=crop&q=80"
            },
            {
                "url": "https://images.unsplash.com/photo-1524805444758-089113d48a6d?w=800&auto=format&fit=crop&q=80"
            }
        ],
        "ratings": {
            "average": 5.0,
            "count": 125
        },
        "specs": {
            "Movement": "Column-Wheel Integrated Chronograph Calibre (28,800 vph)",
            "Case Diameter": "41mm (Lug-to-Lug: 48mm)",
            "Case Material": "316L Surgical Grade Stainless Steel",
            "Crystal": "Dual-Curved Sapphire with Multi-Layer Anti-Reflective Coating",
            "Water Resistance": "100 Meters / 10 ATM",
            "Power Reserve": "48 Hours",
            "Strap": "Handcrafted Italian Full-Grain Alligator-Pattern Leather",
            "Warranty": "5-Year Global Chrononix Horology Warranty"
        }
    },
    {
        "_id": "watch-chr-052",
        "name": "Chrononix Industrial Forge Skeleton",
        "tagline": "Gunmetal bead-blasted finish with exposed screws and visible mainspring barrel",
        "description": "Handcrafted in accordance with classical horological traditions, the Chrononix Industrial Forge Skeleton represents the pinnacle of precision watchmaking. Featuring gunmetal bead-blasted finish with exposed screws and visible mainspring barrel, this timepiece is encased in 316l surgical grade stainless steel with a double-curved scratch-proof sapphire crystal. Every component is individually regulated and inspected for chronometer-grade accuracy before delivery.",
        "price": 89000,
        "discount_price": 76999,
        "category": "Skeleton & Mechanical",
        "stock": 15,
        "is_featured": false,
        "badge": "Industrial Gunmetal",
        "sizes": [
            "41mm",
            "43mm"
        ],
        "colors": [
            "Obsidian Black",
            "Champagne Gold",
            "Imperial Emerald",
            "Midnight Sunburst"
        ],
        "images": [
            {
                "url": "https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=800&auto=format&fit=crop&q=80"
            },
            {
                "url": "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&auto=format&fit=crop&q=80"
            }
        ],
        "ratings": {
            "average": 4.7,
            "count": 132
        },
        "specs": {
            "Movement": "Column-Wheel Integrated Chronograph Calibre (28,800 vph)",
            "Case Diameter": "41mm (Lug-to-Lug: 48mm)",
            "Case Material": "316L Surgical Grade Stainless Steel",
            "Crystal": "Dual-Curved Sapphire with Multi-Layer Anti-Reflective Coating",
            "Water Resistance": "100 Meters / 10 ATM",
            "Power Reserve": "48 Hours",
            "Strap": "Handcrafted Italian Full-Grain Alligator-Pattern Leather",
            "Warranty": "5-Year Global Chrononix Horology Warranty"
        }
    },
    {
        "_id": "watch-chr-053",
        "name": "Chrononix Damascus Steel Mechanical",
        "tagline": "Forged pattern-welded Damascus steel case with unique swirling ripples",
        "description": "Handcrafted in accordance with classical horological traditions, the Chrononix Damascus Steel Mechanical represents the pinnacle of precision watchmaking. Featuring forged pattern-welded damascus steel case with unique swirling ripples, this timepiece is encased in hand-forged damascus pattern steel with a double-curved scratch-proof sapphire crystal. Every component is individually regulated and inspected for chronometer-grade accuracy before delivery.",
        "price": 128000,
        "discount_price": 109999,
        "category": "Skeleton & Mechanical",
        "stock": 16,
        "is_featured": false,
        "badge": "Damascus Steel",
        "sizes": [
            "41mm",
            "43mm"
        ],
        "colors": [
            "Obsidian Black",
            "Champagne Gold",
            "Imperial Emerald",
            "Midnight Sunburst"
        ],
        "images": [
            {
                "url": "https://images.unsplash.com/photo-1619134778706-7015533a6150?w=800&auto=format&fit=crop&q=80"
            },
            {
                "url": "https://images.unsplash.com/photo-1533139502658-0198f920d8e8?w=800&auto=format&fit=crop&q=80"
            }
        ],
        "ratings": {
            "average": 4.8,
            "count": 139
        },
        "specs": {
            "Movement": "Column-Wheel Integrated Chronograph Calibre (28,800 vph)",
            "Case Diameter": "41mm (Lug-to-Lug: 48mm)",
            "Case Material": "Hand-Forged Damascus Pattern Steel",
            "Crystal": "Dual-Curved Sapphire with Multi-Layer Anti-Reflective Coating",
            "Water Resistance": "100 Meters / 10 ATM",
            "Power Reserve": "48 Hours",
            "Strap": "Solid 316L Stainless Steel 5-Link Jubilee / Oyster Bracelet",
            "Warranty": "5-Year Global Chrononix Horology Warranty"
        }
    },
    {
        "_id": "watch-chr-054",
        "name": "Chrononix Cobalt Blue Skeleton",
        "tagline": "Electrolytic blue anodized movement plates with white gold hands",
        "description": "Handcrafted in accordance with classical horological traditions, the Chrononix Cobalt Blue Skeleton represents the pinnacle of precision watchmaking. Featuring electrolytic blue anodized movement plates with white gold hands, this timepiece is encased in 316l surgical grade stainless steel with a double-curved scratch-proof sapphire crystal. Every component is individually regulated and inspected for chronometer-grade accuracy before delivery.",
        "price": 94000,
        "discount_price": 79999,
        "category": "Skeleton & Mechanical",
        "stock": 17,
        "is_featured": false,
        "badge": "Cobalt Blue",
        "sizes": [
            "41mm",
            "43mm"
        ],
        "colors": [
            "Obsidian Black",
            "Champagne Gold",
            "Imperial Emerald",
            "Midnight Sunburst"
        ],
        "images": [
            {
                "url": "https://images.unsplash.com/photo-1622434641406-a158123450f9?w=800&auto=format&fit=crop&q=80"
            },
            {
                "url": "https://images.unsplash.com/photo-1619134778706-7015533a6150?w=800&auto=format&fit=crop&q=80"
            }
        ],
        "ratings": {
            "average": 4.9,
            "count": 146
        },
        "specs": {
            "Movement": "Column-Wheel Integrated Chronograph Calibre (28,800 vph)",
            "Case Diameter": "41mm (Lug-to-Lug: 48mm)",
            "Case Material": "316L Surgical Grade Stainless Steel",
            "Crystal": "Dual-Curved Sapphire with Multi-Layer Anti-Reflective Coating",
            "Water Resistance": "100 Meters / 10 ATM",
            "Power Reserve": "48 Hours",
            "Strap": "Handcrafted Italian Full-Grain Alligator-Pattern Leather",
            "Warranty": "5-Year Global Chrononix Horology Warranty"
        }
    },
    {
        "_id": "watch-chr-055",
        "name": "Chrononix Vintage Pocket-Watch Reborn",
        "tagline": "Exhibition wrist piece adapted from historic pocket watch manual movements",
        "description": "Handcrafted in accordance with classical horological traditions, the Chrononix Vintage Pocket-Watch Reborn represents the pinnacle of precision watchmaking. Featuring exhibition wrist piece adapted from historic pocket watch manual movements, this timepiece is encased in 316l surgical grade stainless steel with a double-curved scratch-proof sapphire crystal. Every component is individually regulated and inspected for chronometer-grade accuracy before delivery.",
        "price": 72000,
        "discount_price": 61999,
        "category": "Skeleton & Mechanical",
        "stock": 18,
        "is_featured": false,
        "badge": "Vintage Heritage",
        "sizes": [
            "41mm",
            "43mm"
        ],
        "colors": [
            "Obsidian Black",
            "Champagne Gold",
            "Imperial Emerald",
            "Midnight Sunburst"
        ],
        "images": [
            {
                "url": "https://images.unsplash.com/photo-1612817159949-195b6eb9e31a?w=800&auto=format&fit=crop&q=80"
            },
            {
                "url": "https://images.unsplash.com/photo-1614164185128-e4ec99c436d7?w=800&auto=format&fit=crop&q=80"
            }
        ],
        "ratings": {
            "average": 5.0,
            "count": 153
        },
        "specs": {
            "Movement": "Column-Wheel Integrated Chronograph Calibre (28,800 vph)",
            "Case Diameter": "41mm (Lug-to-Lug: 48mm)",
            "Case Material": "316L Surgical Grade Stainless Steel",
            "Crystal": "Dual-Curved Sapphire with Multi-Layer Anti-Reflective Coating",
            "Water Resistance": "100 Meters / 10 ATM",
            "Power Reserve": "48 Hours",
            "Strap": "Handcrafted Italian Full-Grain Alligator-Pattern Leather",
            "Warranty": "5-Year Global Chrononix Horology Warranty"
        }
    },
    {
        "_id": "watch-chr-056",
        "name": "Chrononix Carbon Skeleton Chrono",
        "tagline": "Ultralight carbon skeleton case with visible column-wheel chronograph levers",
        "description": "Handcrafted in accordance with classical horological traditions, the Chrononix Carbon Skeleton Chrono represents the pinnacle of precision watchmaking. Featuring ultralight carbon skeleton case with visible column-wheel chronograph levers, this timepiece is encased in forged carbon fiber composite with a double-curved scratch-proof sapphire crystal. Every component is individually regulated and inspected for chronometer-grade accuracy before delivery.",
        "price": 139000,
        "discount_price": 119999,
        "category": "Skeleton & Mechanical",
        "stock": 19,
        "is_featured": true,
        "badge": "Carbon Openwork",
        "sizes": [
            "41mm",
            "43mm"
        ],
        "colors": [
            "Obsidian Black",
            "Champagne Gold",
            "Imperial Emerald",
            "Midnight Sunburst"
        ],
        "images": [
            {
                "url": "https://images.unsplash.com/photo-1518131672697-613becd4fab5?w=800&auto=format&fit=crop&q=80"
            },
            {
                "url": "https://images.unsplash.com/photo-1547996160-71dfabb4e803?w=800&auto=format&fit=crop&q=80"
            }
        ],
        "ratings": {
            "average": 4.7,
            "count": 160
        },
        "specs": {
            "Movement": "Column-Wheel Integrated Chronograph Calibre (28,800 vph)",
            "Case Diameter": "41mm (Lug-to-Lug: 48mm)",
            "Case Material": "Forged Carbon Fiber Composite",
            "Crystal": "Dual-Curved Sapphire with Multi-Layer Anti-Reflective Coating",
            "Water Resistance": "100 Meters / 10 ATM",
            "Power Reserve": "48 Hours",
            "Strap": "Handcrafted Italian Full-Grain Alligator-Pattern Leather",
            "Warranty": "5-Year Global Chrononix Horology Warranty"
        }
    },
    {
        "_id": "watch-chr-057",
        "name": "Chrononix Royal Guilloche Skeleton",
        "tagline": "Hand-engraved scrollwork on exposed bridges executed by master artisans",
        "description": "Handcrafted in accordance with classical horological traditions, the Chrononix Royal Guilloche Skeleton represents the pinnacle of precision watchmaking. Featuring hand-engraved scrollwork on exposed bridges executed by master artisans, this timepiece is encased in 316l surgical grade stainless steel with a double-curved scratch-proof sapphire crystal. Every component is individually regulated and inspected for chronometer-grade accuracy before delivery.",
        "price": 119000,
        "discount_price": 102000,
        "category": "Skeleton & Mechanical",
        "stock": 20,
        "is_featured": false,
        "badge": "Hand Engraved",
        "sizes": [
            "41mm",
            "43mm"
        ],
        "colors": [
            "Obsidian Black",
            "Champagne Gold",
            "Imperial Emerald",
            "Midnight Sunburst"
        ],
        "images": [
            {
                "url": "https://images.unsplash.com/photo-1600003014755-ba31aa59c4b6?w=800&auto=format&fit=crop&q=80"
            },
            {
                "url": "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=800&auto=format&fit=crop&q=80"
            }
        ],
        "ratings": {
            "average": 4.8,
            "count": 167
        },
        "specs": {
            "Movement": "Column-Wheel Integrated Chronograph Calibre (28,800 vph)",
            "Case Diameter": "41mm (Lug-to-Lug: 48mm)",
            "Case Material": "316L Surgical Grade Stainless Steel",
            "Crystal": "Dual-Curved Sapphire with Multi-Layer Anti-Reflective Coating",
            "Water Resistance": "100 Meters / 10 ATM",
            "Power Reserve": "48 Hours",
            "Strap": "Handcrafted Italian Full-Grain Alligator-Pattern Leather",
            "Warranty": "5-Year Global Chrononix Horology Warranty"
        }
    },
    {
        "_id": "watch-chr-058",
        "name": "Chrononix Eclipse Blackout Mechanical",
        "tagline": "All-black DLC coated manual wind calibre with super-luminova dark dial",
        "description": "Handcrafted in accordance with classical horological traditions, the Chrononix Eclipse Blackout Mechanical represents the pinnacle of precision watchmaking. Featuring all-black dlc coated manual wind calibre with super-luminova dark dial, this timepiece is encased in 316l surgical grade stainless steel with a double-curved scratch-proof sapphire crystal. Every component is individually regulated and inspected for chronometer-grade accuracy before delivery.",
        "price": 86000,
        "discount_price": 73999,
        "category": "Skeleton & Mechanical",
        "stock": 21,
        "is_featured": false,
        "badge": "All-Black DLC",
        "sizes": [
            "41mm",
            "43mm"
        ],
        "colors": [
            "Obsidian Black",
            "Champagne Gold",
            "Imperial Emerald",
            "Midnight Sunburst"
        ],
        "images": [
            {
                "url": "https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=800&auto=format&fit=crop&q=80"
            },
            {
                "url": "https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?w=800&auto=format&fit=crop&q=80"
            }
        ],
        "ratings": {
            "average": 4.9,
            "count": 174
        },
        "specs": {
            "Movement": "Column-Wheel Integrated Chronograph Calibre (28,800 vph)",
            "Case Diameter": "41mm (Lug-to-Lug: 48mm)",
            "Case Material": "316L Surgical Grade Stainless Steel",
            "Crystal": "Dual-Curved Sapphire with Multi-Layer Anti-Reflective Coating",
            "Water Resistance": "100 Meters / 10 ATM",
            "Power Reserve": "48 Hours",
            "Strap": "Handcrafted Italian Full-Grain Alligator-Pattern Leather",
            "Warranty": "5-Year Global Chrononix Horology Warranty"
        }
    },
    {
        "_id": "watch-chr-059",
        "name": "Chrononix Deep Sea Diver 300M",
        "tagline": "Professional ISO 6425 certified dive watch with helium release valve & 300m rating",
        "description": "Handcrafted in accordance with classical horological traditions, the Chrononix Deep Sea Diver 300M represents the pinnacle of precision watchmaking. Featuring professional iso 6425 certified dive watch with helium release valve & 300m rating, this timepiece is encased in 316l surgical grade stainless steel with a double-curved scratch-proof sapphire crystal. Every component is individually regulated and inspected for chronometer-grade accuracy before delivery.",
        "price": 68000,
        "discount_price": 56999,
        "category": "Dive & Sports Heritage",
        "stock": 22,
        "is_featured": true,
        "badge": "300M Diver",
        "sizes": [
            "42mm",
            "41mm"
        ],
        "colors": [
            "Obsidian Black",
            "Champagne Gold",
            "Imperial Emerald",
            "Midnight Sunburst"
        ],
        "images": [
            {
                "url": "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&auto=format&fit=crop&q=80"
            },
            {
                "url": "https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=800&auto=format&fit=crop&q=80"
            }
        ],
        "ratings": {
            "average": 5.0,
            "count": 181
        },
        "specs": {
            "Movement": "Column-Wheel Integrated Chronograph Calibre (28,800 vph)",
            "Case Diameter": "42mm (Lug-to-Lug: 48mm)",
            "Case Material": "316L Surgical Grade Stainless Steel",
            "Crystal": "Dual-Curved Sapphire with Multi-Layer Anti-Reflective Coating",
            "Water Resistance": "300 Meters / 30 ATM (ISO 6425 Certified)",
            "Power Reserve": "48 Hours",
            "Strap": "Handcrafted Italian Full-Grain Alligator-Pattern Leather",
            "Warranty": "5-Year Global Chrononix Horology Warranty"
        }
    },
    {
        "_id": "watch-chr-060",
        "name": "Chrononix Submariner Tribute Black Ceramic",
        "tagline": "Unidirectional 120-click ceramic bezel with intense BGW9 Swiss lume",
        "description": "Handcrafted in accordance with classical horological traditions, the Chrononix Submariner Tribute Black Ceramic represents the pinnacle of precision watchmaking. Featuring unidirectional 120-click ceramic bezel with intense bgw9 swiss lume, this timepiece is encased in high-tech zirconia ceramic with a double-curved scratch-proof sapphire crystal. Every component is individually regulated and inspected for chronometer-grade accuracy before delivery.",
        "price": 74000,
        "discount_price": 62999,
        "category": "Dive & Sports Heritage",
        "stock": 8,
        "is_featured": false,
        "badge": "Ceramic Bezel",
        "sizes": [
            "41mm",
            "43mm"
        ],
        "colors": [
            "Obsidian Black",
            "Champagne Gold",
            "Imperial Emerald",
            "Midnight Sunburst"
        ],
        "images": [
            {
                "url": "https://images.unsplash.com/photo-1548169874-53e85f753f1e?w=800&auto=format&fit=crop&q=80"
            },
            {
                "url": "https://images.unsplash.com/photo-1524805444758-089113d48a6d?w=800&auto=format&fit=crop&q=80"
            }
        ],
        "ratings": {
            "average": 4.7,
            "count": 188
        },
        "specs": {
            "Movement": "Column-Wheel Integrated Chronograph Calibre (28,800 vph)",
            "Case Diameter": "41mm (Lug-to-Lug: 48mm)",
            "Case Material": "High-Tech Zirconia Ceramic",
            "Crystal": "Dual-Curved Sapphire with Multi-Layer Anti-Reflective Coating",
            "Water Resistance": "100 Meters / 10 ATM",
            "Power Reserve": "48 Hours",
            "Strap": "Solid 316L Stainless Steel 5-Link Jubilee / Oyster Bracelet",
            "Warranty": "5-Year Global Chrononix Horology Warranty"
        }
    },
    {
        "_id": "watch-chr-061",
        "name": "Chrononix Ocean Blue Depthmaster",
        "tagline": "Vibrant gradient ocean-to-abyss blue dial with high-grade solid end-link bracelet",
        "description": "Handcrafted in accordance with classical horological traditions, the Chrononix Ocean Blue Depthmaster represents the pinnacle of precision watchmaking. Featuring vibrant gradient ocean-to-abyss blue dial with high-grade solid end-link bracelet, this timepiece is encased in 316l surgical grade stainless steel with a double-curved scratch-proof sapphire crystal. Every component is individually regulated and inspected for chronometer-grade accuracy before delivery.",
        "price": 69000,
        "discount_price": 58999,
        "category": "Dive & Sports Heritage",
        "stock": 9,
        "is_featured": true,
        "badge": "Abyss Blue",
        "sizes": [
            "41mm",
            "43mm"
        ],
        "colors": [
            "Obsidian Black",
            "Champagne Gold",
            "Imperial Emerald",
            "Midnight Sunburst"
        ],
        "images": [
            {
                "url": "https://images.unsplash.com/photo-1524805444758-089113d48a6d?w=800&auto=format&fit=crop&q=80"
            },
            {
                "url": "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=800&auto=format&fit=crop&q=80"
            }
        ],
        "ratings": {
            "average": 4.8,
            "count": 195
        },
        "specs": {
            "Movement": "Column-Wheel Integrated Chronograph Calibre (28,800 vph)",
            "Case Diameter": "41mm (Lug-to-Lug: 48mm)",
            "Case Material": "316L Surgical Grade Stainless Steel",
            "Crystal": "Dual-Curved Sapphire with Multi-Layer Anti-Reflective Coating",
            "Water Resistance": "100 Meters / 10 ATM",
            "Power Reserve": "48 Hours",
            "Strap": "High-Density FKM Waterproof Fluoroelastomer Sports Strap",
            "Warranty": "5-Year Global Chrononix Horology Warranty"
        }
    },
    {
        "_id": "watch-chr-062",
        "name": "Chrononix Sea Turtle Cushion Case",
        "tagline": "Vintage 1970s cushion-shaped 44mm case with recessed crown at 4 o'clock",
        "description": "Handcrafted in accordance with classical horological traditions, the Chrononix Sea Turtle Cushion Case represents the pinnacle of precision watchmaking. Featuring vintage 1970s cushion-shaped 44mm case with recessed crown at 4 o'clock, this timepiece is encased in 316l surgical grade stainless steel with a double-curved scratch-proof sapphire crystal. Every component is individually regulated and inspected for chronometer-grade accuracy before delivery.",
        "price": 62000,
        "discount_price": 51999,
        "category": "Dive & Sports Heritage",
        "stock": 10,
        "is_featured": false,
        "badge": "Cushion Case",
        "sizes": [
            "41mm",
            "43mm"
        ],
        "colors": [
            "Obsidian Black",
            "Champagne Gold",
            "Imperial Emerald",
            "Midnight Sunburst"
        ],
        "images": [
            {
                "url": "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=800&auto=format&fit=crop&q=80"
            },
            {
                "url": "https://images.unsplash.com/photo-1524805444758-089113d48a6d?w=800&auto=format&fit=crop&q=80"
            }
        ],
        "ratings": {
            "average": 4.9,
            "count": 202
        },
        "specs": {
            "Movement": "Column-Wheel Integrated Chronograph Calibre (28,800 vph)",
            "Case Diameter": "41mm (Lug-to-Lug: 48mm)",
            "Case Material": "316L Surgical Grade Stainless Steel",
            "Crystal": "Dual-Curved Sapphire with Multi-Layer Anti-Reflective Coating",
            "Water Resistance": "100 Meters / 10 ATM",
            "Power Reserve": "48 Hours",
            "Strap": "Handcrafted Italian Full-Grain Alligator-Pattern Leather",
            "Warranty": "5-Year Global Chrononix Horology Warranty"
        }
    },
    {
        "_id": "watch-chr-063",
        "name": "Chrononix Emerald Reef Diver 200M",
        "tagline": "Lush emerald green ceramic bezel with gold-accented diver hands and indices",
        "description": "Handcrafted in accordance with classical horological traditions, the Chrononix Emerald Reef Diver 200M represents the pinnacle of precision watchmaking. Featuring lush emerald green ceramic bezel with gold-accented diver hands and indices, this timepiece is encased in 316l surgical grade stainless steel with a double-curved scratch-proof sapphire crystal. Every component is individually regulated and inspected for chronometer-grade accuracy before delivery.",
        "price": 72000,
        "discount_price": 61999,
        "category": "Dive & Sports Heritage",
        "stock": 11,
        "is_featured": false,
        "badge": "Emerald Green",
        "sizes": [
            "42mm",
            "41mm"
        ],
        "colors": [
            "Obsidian Black",
            "Champagne Gold",
            "Imperial Emerald",
            "Midnight Sunburst"
        ],
        "images": [
            {
                "url": "https://images.unsplash.com/photo-1533139502658-0198f920d8e8?w=800&auto=format&fit=crop&q=80"
            },
            {
                "url": "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&auto=format&fit=crop&q=80"
            }
        ],
        "ratings": {
            "average": 5.0,
            "count": 209
        },
        "specs": {
            "Movement": "Column-Wheel Integrated Chronograph Calibre (28,800 vph)",
            "Case Diameter": "42mm (Lug-to-Lug: 48mm)",
            "Case Material": "316L Surgical Grade Stainless Steel",
            "Crystal": "Dual-Curved Sapphire with Multi-Layer Anti-Reflective Coating",
            "Water Resistance": "100 Meters / 10 ATM",
            "Power Reserve": "48 Hours",
            "Strap": "Handcrafted Italian Full-Grain Alligator-Pattern Leather",
            "Warranty": "5-Year Global Chrononix Horology Warranty"
        }
    },
    {
        "_id": "watch-chr-064",
        "name": "Chrononix Bronze Mariner 300M",
        "tagline": "Heavy solid bronze casing paired with waterproof tropical rubber diving strap",
        "description": "Handcrafted in accordance with classical horological traditions, the Chrononix Bronze Mariner 300M represents the pinnacle of precision watchmaking. Featuring heavy solid bronze casing paired with waterproof tropical rubber diving strap, this timepiece is encased in cusn8 marine solid bronze with a double-curved scratch-proof sapphire crystal. Every component is individually regulated and inspected for chronometer-grade accuracy before delivery.",
        "price": 79000,
        "discount_price": 66999,
        "category": "Dive & Sports Heritage",
        "stock": 12,
        "is_featured": false,
        "badge": "Solid Bronze",
        "sizes": [
            "41mm",
            "43mm"
        ],
        "colors": [
            "Obsidian Black",
            "Champagne Gold",
            "Imperial Emerald",
            "Midnight Sunburst"
        ],
        "images": [
            {
                "url": "https://images.unsplash.com/photo-1547996160-71dfabb4e803?w=800&auto=format&fit=crop&q=80"
            },
            {
                "url": "https://images.unsplash.com/photo-1614164185128-e4ec99c436d7?w=800&auto=format&fit=crop&q=80"
            }
        ],
        "ratings": {
            "average": 4.7,
            "count": 216
        },
        "specs": {
            "Movement": "Column-Wheel Integrated Chronograph Calibre (28,800 vph)",
            "Case Diameter": "41mm (Lug-to-Lug: 48mm)",
            "Case Material": "CuSn8 Marine Solid Bronze",
            "Crystal": "Dual-Curved Sapphire with Multi-Layer Anti-Reflective Coating",
            "Water Resistance": "300 Meters / 30 ATM (ISO 6425 Certified)",
            "Power Reserve": "48 Hours",
            "Strap": "Handcrafted Italian Full-Grain Alligator-Pattern Leather",
            "Warranty": "5-Year Global Chrononix Horology Warranty"
        }
    },
    {
        "_id": "watch-chr-065",
        "name": "Chrononix Titanium Ultra-Deep 500M",
        "tagline": "Extreme depth 500-meter water resistance with automatic helium purge valve",
        "description": "Handcrafted in accordance with classical horological traditions, the Chrononix Titanium Ultra-Deep 500M represents the pinnacle of precision watchmaking. Featuring extreme depth 500-meter water resistance with automatic helium purge valve, this timepiece is encased in aerospace grade 5 titanium with a double-curved scratch-proof sapphire crystal. Every component is individually regulated and inspected for chronometer-grade accuracy before delivery.",
        "price": 95000,
        "discount_price": 81999,
        "category": "Dive & Sports Heritage",
        "stock": 13,
        "is_featured": false,
        "badge": "500M Titanium",
        "sizes": [
            "42mm",
            "41mm"
        ],
        "colors": [
            "Obsidian Black",
            "Champagne Gold",
            "Imperial Emerald",
            "Midnight Sunburst"
        ],
        "images": [
            {
                "url": "https://images.unsplash.com/photo-1614164185128-e4ec99c436d7?w=800&auto=format&fit=crop&q=80"
            },
            {
                "url": "https://images.unsplash.com/photo-1547996160-71dfabb4e803?w=800&auto=format&fit=crop&q=80"
            }
        ],
        "ratings": {
            "average": 4.8,
            "count": 223
        },
        "specs": {
            "Movement": "Column-Wheel Integrated Chronograph Calibre (28,800 vph)",
            "Case Diameter": "42mm (Lug-to-Lug: 48mm)",
            "Case Material": "Aerospace Grade 5 Titanium",
            "Crystal": "Dual-Curved Sapphire with Multi-Layer Anti-Reflective Coating",
            "Water Resistance": "500 Meters / 50 ATM (Helium Valve)",
            "Power Reserve": "48 Hours",
            "Strap": "Grade 5 Titanium Link Bracelet with Micro-Adjustment",
            "Warranty": "5-Year Global Chrononix Horology Warranty"
        }
    },
    {
        "_id": "watch-chr-066",
        "name": "Chrononix Vintage Tropic 1968",
        "tagline": "Domed acrylic-look box sapphire crystal with aged faux-patina luminous markers",
        "description": "Handcrafted in accordance with classical horological traditions, the Chrononix Vintage Tropic 1968 represents the pinnacle of precision watchmaking. Featuring domed acrylic-look box sapphire crystal with aged faux-patina luminous markers, this timepiece is encased in 316l surgical grade stainless steel with a double-curved scratch-proof sapphire crystal. Every component is individually regulated and inspected for chronometer-grade accuracy before delivery.",
        "price": 59000,
        "discount_price": 49999,
        "category": "Dive & Sports Heritage",
        "stock": 14,
        "is_featured": true,
        "badge": "Heritage 1968",
        "sizes": [
            "41mm",
            "43mm"
        ],
        "colors": [
            "Obsidian Black",
            "Champagne Gold",
            "Imperial Emerald",
            "Midnight Sunburst"
        ],
        "images": [
            {
                "url": "https://images.unsplash.com/photo-1587836374828-4dbafa94cf0e?w=800&auto=format&fit=crop&q=80"
            },
            {
                "url": "https://images.unsplash.com/photo-1524805444758-089113d48a6d?w=800&auto=format&fit=crop&q=80"
            }
        ],
        "ratings": {
            "average": 4.9,
            "count": 230
        },
        "specs": {
            "Movement": "Column-Wheel Integrated Chronograph Calibre (28,800 vph)",
            "Case Diameter": "41mm (Lug-to-Lug: 48mm)",
            "Case Material": "316L Surgical Grade Stainless Steel",
            "Crystal": "Dual-Curved Sapphire with Multi-Layer Anti-Reflective Coating",
            "Water Resistance": "100 Meters / 10 ATM",
            "Power Reserve": "48 Hours",
            "Strap": "Handcrafted Italian Full-Grain Alligator-Pattern Leather",
            "Warranty": "5-Year Global Chrononix Horology Warranty"
        }
    },
    {
        "_id": "watch-chr-067",
        "name": "Chrononix Pepsi Bezel Dual-Time Diver",
        "tagline": "Iconic red and blue 24-hour ceramic bezel for timing dual world time zones",
        "description": "Handcrafted in accordance with classical horological traditions, the Chrononix Pepsi Bezel Dual-Time Diver represents the pinnacle of precision watchmaking. Featuring iconic red and blue 24-hour ceramic bezel for timing dual world time zones, this timepiece is encased in 316l surgical grade stainless steel with a double-curved scratch-proof sapphire crystal. Every component is individually regulated and inspected for chronometer-grade accuracy before delivery.",
        "price": 76000,
        "discount_price": 64999,
        "category": "Dive & Sports Heritage",
        "stock": 15,
        "is_featured": false,
        "badge": "Pepsi GMT",
        "sizes": [
            "42mm",
            "41mm"
        ],
        "colors": [
            "Obsidian Black",
            "Champagne Gold",
            "Imperial Emerald",
            "Midnight Sunburst"
        ],
        "images": [
            {
                "url": "https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=800&auto=format&fit=crop&q=80"
            },
            {
                "url": "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&auto=format&fit=crop&q=80"
            }
        ],
        "ratings": {
            "average": 5.0,
            "count": 237
        },
        "specs": {
            "Movement": "Column-Wheel Integrated Chronograph Calibre (28,800 vph)",
            "Case Diameter": "42mm (Lug-to-Lug: 48mm)",
            "Case Material": "316L Surgical Grade Stainless Steel",
            "Crystal": "Dual-Curved Sapphire with Multi-Layer Anti-Reflective Coating",
            "Water Resistance": "100 Meters / 10 ATM",
            "Power Reserve": "48 Hours",
            "Strap": "Handcrafted Italian Full-Grain Alligator-Pattern Leather",
            "Warranty": "5-Year Global Chrononix Horology Warranty"
        }
    },
    {
        "_id": "watch-chr-068",
        "name": "Chrononix Batman Black & Blue GMT",
        "tagline": "Ceramic two-tone black and royal blue bezel with independent 24-hour GMT hand",
        "description": "Handcrafted in accordance with classical horological traditions, the Chrononix Batman Black & Blue GMT represents the pinnacle of precision watchmaking. Featuring ceramic two-tone black and royal blue bezel with independent 24-hour gmt hand, this timepiece is encased in 316l surgical grade stainless steel with a double-curved scratch-proof sapphire crystal. Every component is individually regulated and inspected for chronometer-grade accuracy before delivery.",
        "price": 78000,
        "discount_price": 66999,
        "category": "Dive & Sports Heritage",
        "stock": 16,
        "is_featured": false,
        "badge": "Batman Bezel",
        "sizes": [
            "41mm",
            "43mm"
        ],
        "colors": [
            "Obsidian Black",
            "Champagne Gold",
            "Imperial Emerald",
            "Midnight Sunburst"
        ],
        "images": [
            {
                "url": "https://images.unsplash.com/photo-1619134778706-7015533a6150?w=800&auto=format&fit=crop&q=80"
            },
            {
                "url": "https://images.unsplash.com/photo-1533139502658-0198f920d8e8?w=800&auto=format&fit=crop&q=80"
            }
        ],
        "ratings": {
            "average": 4.7,
            "count": 244
        },
        "specs": {
            "Movement": "Column-Wheel Integrated Chronograph Calibre (28,800 vph)",
            "Case Diameter": "41mm (Lug-to-Lug: 48mm)",
            "Case Material": "316L Surgical Grade Stainless Steel",
            "Crystal": "Dual-Curved Sapphire with Multi-Layer Anti-Reflective Coating",
            "Water Resistance": "100 Meters / 10 ATM",
            "Power Reserve": "48 Hours",
            "Strap": "Handcrafted Italian Full-Grain Alligator-Pattern Leather",
            "Warranty": "5-Year Global Chrononix Horology Warranty"
        }
    },
    {
        "_id": "watch-chr-069",
        "name": "Chrononix Polar White Explorer Diver",
        "tagline": "Crisp arctic white enamel dial with black high-contrast dive markers",
        "description": "Handcrafted in accordance with classical horological traditions, the Chrononix Polar White Explorer Diver represents the pinnacle of precision watchmaking. Featuring crisp arctic white enamel dial with black high-contrast dive markers, this timepiece is encased in 316l surgical grade stainless steel with a double-curved scratch-proof sapphire crystal. Every component is individually regulated and inspected for chronometer-grade accuracy before delivery.",
        "price": 67000,
        "discount_price": 56999,
        "category": "Dive & Sports Heritage",
        "stock": 17,
        "is_featured": false,
        "badge": "Polar White",
        "sizes": [
            "42mm",
            "41mm"
        ],
        "colors": [
            "Obsidian Black",
            "Champagne Gold",
            "Imperial Emerald",
            "Midnight Sunburst"
        ],
        "images": [
            {
                "url": "https://images.unsplash.com/photo-1622434641406-a158123450f9?w=800&auto=format&fit=crop&q=80"
            },
            {
                "url": "https://images.unsplash.com/photo-1619134778706-7015533a6150?w=800&auto=format&fit=crop&q=80"
            }
        ],
        "ratings": {
            "average": 4.8,
            "count": 251
        },
        "specs": {
            "Movement": "Column-Wheel Integrated Chronograph Calibre (28,800 vph)",
            "Case Diameter": "42mm (Lug-to-Lug: 48mm)",
            "Case Material": "316L Surgical Grade Stainless Steel",
            "Crystal": "Dual-Curved Sapphire with Multi-Layer Anti-Reflective Coating",
            "Water Resistance": "100 Meters / 10 ATM",
            "Power Reserve": "48 Hours",
            "Strap": "Solid 316L Stainless Steel 5-Link Jubilee / Oyster Bracelet",
            "Warranty": "5-Year Global Chrononix Horology Warranty"
        }
    },
    {
        "_id": "watch-chr-070",
        "name": "Chrononix Sharkskin Textured Diver",
        "tagline": "Subtle geometric sharkskin textured dial with orange minute timing hand",
        "description": "Handcrafted in accordance with classical horological traditions, the Chrononix Sharkskin Textured Diver represents the pinnacle of precision watchmaking. Featuring subtle geometric sharkskin textured dial with orange minute timing hand, this timepiece is encased in 316l surgical grade stainless steel with a double-curved scratch-proof sapphire crystal. Every component is individually regulated and inspected for chronometer-grade accuracy before delivery.",
        "price": 64000,
        "discount_price": 53999,
        "category": "Dive & Sports Heritage",
        "stock": 18,
        "is_featured": false,
        "badge": "High Contrast",
        "sizes": [
            "42mm",
            "41mm"
        ],
        "colors": [
            "Obsidian Black",
            "Champagne Gold",
            "Imperial Emerald",
            "Midnight Sunburst"
        ],
        "images": [
            {
                "url": "https://images.unsplash.com/photo-1612817159949-195b6eb9e31a?w=800&auto=format&fit=crop&q=80"
            },
            {
                "url": "https://images.unsplash.com/photo-1614164185128-e4ec99c436d7?w=800&auto=format&fit=crop&q=80"
            }
        ],
        "ratings": {
            "average": 4.9,
            "count": 258
        },
        "specs": {
            "Movement": "Column-Wheel Integrated Chronograph Calibre (28,800 vph)",
            "Case Diameter": "42mm (Lug-to-Lug: 48mm)",
            "Case Material": "316L Surgical Grade Stainless Steel",
            "Crystal": "Dual-Curved Sapphire with Multi-Layer Anti-Reflective Coating",
            "Water Resistance": "100 Meters / 10 ATM",
            "Power Reserve": "48 Hours",
            "Strap": "Handcrafted Italian Full-Grain Alligator-Pattern Leather",
            "Warranty": "5-Year Global Chrononix Horology Warranty"
        }
    },
    {
        "_id": "watch-chr-071",
        "name": "Chrononix Kermit Green Anniversary",
        "tagline": "Anniversary edition vibrant green ceramic bezel with gloss black dial",
        "description": "Handcrafted in accordance with classical horological traditions, the Chrononix Kermit Green Anniversary represents the pinnacle of precision watchmaking. Featuring anniversary edition vibrant green ceramic bezel with gloss black dial, this timepiece is encased in 316l surgical grade stainless steel with a double-curved scratch-proof sapphire crystal. Every component is individually regulated and inspected for chronometer-grade accuracy before delivery.",
        "price": 73000,
        "discount_price": 62999,
        "category": "Dive & Sports Heritage",
        "stock": 19,
        "is_featured": true,
        "badge": "Anniversary Green",
        "sizes": [
            "41mm",
            "43mm"
        ],
        "colors": [
            "Obsidian Black",
            "Champagne Gold",
            "Imperial Emerald",
            "Midnight Sunburst"
        ],
        "images": [
            {
                "url": "https://images.unsplash.com/photo-1518131672697-613becd4fab5?w=800&auto=format&fit=crop&q=80"
            },
            {
                "url": "https://images.unsplash.com/photo-1547996160-71dfabb4e803?w=800&auto=format&fit=crop&q=80"
            }
        ],
        "ratings": {
            "average": 5.0,
            "count": 265
        },
        "specs": {
            "Movement": "Column-Wheel Integrated Chronograph Calibre (28,800 vph)",
            "Case Diameter": "41mm (Lug-to-Lug: 48mm)",
            "Case Material": "316L Surgical Grade Stainless Steel",
            "Crystal": "Dual-Curved Sapphire with Multi-Layer Anti-Reflective Coating",
            "Water Resistance": "100 Meters / 10 ATM",
            "Power Reserve": "48 Hours",
            "Strap": "Handcrafted Italian Full-Grain Alligator-Pattern Leather",
            "Warranty": "5-Year Global Chrononix Horology Warranty"
        }
    },
    {
        "_id": "watch-chr-072",
        "name": "Chrononix Stealth Abyss Carbon Diver",
        "tagline": "Forged carbon case tested to 300m with black FKM fluoroelastomer strap",
        "description": "Handcrafted in accordance with classical horological traditions, the Chrononix Stealth Abyss Carbon Diver represents the pinnacle of precision watchmaking. Featuring forged carbon case tested to 300m with black fkm fluoroelastomer strap, this timepiece is encased in forged carbon fiber composite with a double-curved scratch-proof sapphire crystal. Every component is individually regulated and inspected for chronometer-grade accuracy before delivery.",
        "price": 92000,
        "discount_price": 78999,
        "category": "Dive & Sports Heritage",
        "stock": 20,
        "is_featured": false,
        "badge": "Forged Carbon Diver",
        "sizes": [
            "42mm",
            "41mm"
        ],
        "colors": [
            "Obsidian Black",
            "Champagne Gold",
            "Imperial Emerald",
            "Midnight Sunburst"
        ],
        "images": [
            {
                "url": "https://images.unsplash.com/photo-1600003014755-ba31aa59c4b6?w=800&auto=format&fit=crop&q=80"
            },
            {
                "url": "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=800&auto=format&fit=crop&q=80"
            }
        ],
        "ratings": {
            "average": 4.7,
            "count": 22
        },
        "specs": {
            "Movement": "Column-Wheel Integrated Chronograph Calibre (28,800 vph)",
            "Case Diameter": "42mm (Lug-to-Lug: 48mm)",
            "Case Material": "Forged Carbon Fiber Composite",
            "Crystal": "Dual-Curved Sapphire with Multi-Layer Anti-Reflective Coating",
            "Water Resistance": "300 Meters / 30 ATM (ISO 6425 Certified)",
            "Power Reserve": "48 Hours",
            "Strap": "Handcrafted Italian Full-Grain Alligator-Pattern Leather",
            "Warranty": "5-Year Global Chrononix Horology Warranty"
        }
    },
    {
        "_id": "watch-chr-073",
        "name": "Chrononix Ultra-Thin 6.8mm Slender",
        "tagline": "Micro-rotor ultra-thin automatic watch slipping effortlessly under tailored shirt cuffs",
        "description": "Handcrafted in accordance with classical horological traditions, the Chrononix Ultra-Thin 6.8mm Slender represents the pinnacle of precision watchmaking. Featuring micro-rotor ultra-thin automatic watch slipping effortlessly under tailored shirt cuffs, this timepiece is encased in 316l surgical grade stainless steel with a double-curved scratch-proof sapphire crystal. Every component is individually regulated and inspected for chronometer-grade accuracy before delivery.",
        "price": 64000,
        "discount_price": 52999,
        "category": "Minimalist Dress Watches",
        "stock": 21,
        "is_featured": true,
        "badge": "6.8mm Ultra-Thin",
        "sizes": [
            "38mm",
            "41mm"
        ],
        "colors": [
            "Obsidian Black",
            "Champagne Gold",
            "Imperial Emerald",
            "Midnight Sunburst"
        ],
        "images": [
            {
                "url": "https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=800&auto=format&fit=crop&q=80"
            },
            {
                "url": "https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?w=800&auto=format&fit=crop&q=80"
            }
        ],
        "ratings": {
            "average": 4.8,
            "count": 29
        },
        "specs": {
            "Movement": "Column-Wheel Integrated Chronograph Calibre (28,800 vph)",
            "Case Diameter": "38mm (Lug-to-Lug: 48mm)",
            "Case Material": "316L Surgical Grade Stainless Steel",
            "Crystal": "Dual-Curved Sapphire with Multi-Layer Anti-Reflective Coating",
            "Water Resistance": "50 Meters / 5 ATM",
            "Power Reserve": "48 Hours",
            "Strap": "Handcrafted Italian Full-Grain Alligator-Pattern Leather",
            "Warranty": "5-Year Global Chrononix Horology Warranty"
        }
    },
    {
        "_id": "watch-chr-074",
        "name": "Chrononix Bauhaus Pure 38mm",
        "tagline": "Clean German Bauhaus typography with needle-thin blued hands and sub-seconds dial",
        "description": "Handcrafted in accordance with classical horological traditions, the Chrononix Bauhaus Pure 38mm represents the pinnacle of precision watchmaking. Featuring clean german bauhaus typography with needle-thin blued hands and sub-seconds dial, this timepiece is encased in 316l surgical grade stainless steel with a double-curved scratch-proof sapphire crystal. Every component is individually regulated and inspected for chronometer-grade accuracy before delivery.",
        "price": 45000,
        "discount_price": 36999,
        "category": "Minimalist Dress Watches",
        "stock": 22,
        "is_featured": false,
        "badge": "Bauhaus Pure",
        "sizes": [
            "38mm",
            "41mm"
        ],
        "colors": [
            "Obsidian Black",
            "Champagne Gold",
            "Imperial Emerald",
            "Midnight Sunburst"
        ],
        "images": [
            {
                "url": "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&auto=format&fit=crop&q=80"
            },
            {
                "url": "https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=800&auto=format&fit=crop&q=80"
            }
        ],
        "ratings": {
            "average": 4.9,
            "count": 36
        },
        "specs": {
            "Movement": "Column-Wheel Integrated Chronograph Calibre (28,800 vph)",
            "Case Diameter": "38mm (Lug-to-Lug: 48mm)",
            "Case Material": "316L Surgical Grade Stainless Steel",
            "Crystal": "Dual-Curved Sapphire with Multi-Layer Anti-Reflective Coating",
            "Water Resistance": "50 Meters / 5 ATM",
            "Power Reserve": "48 Hours",
            "Strap": "Handcrafted Italian Full-Grain Alligator-Pattern Leather",
            "Warranty": "5-Year Global Chrononix Horology Warranty"
        }
    },
    {
        "_id": "watch-chr-075",
        "name": "Chrononix Calatrava Gold Dress",
        "tagline": "Classic 18K yellow gold plated round case with uncluttered champagne sunburst dial",
        "description": "Handcrafted in accordance with classical horological traditions, the Chrononix Calatrava Gold Dress represents the pinnacle of precision watchmaking. Featuring classic 18k yellow gold plated round case with uncluttered champagne sunburst dial, this timepiece is encased in 18k gold pvd over 316l steel with a double-curved scratch-proof sapphire crystal. Every component is individually regulated and inspected for chronometer-grade accuracy before delivery.",
        "price": 58000,
        "discount_price": 47999,
        "category": "Minimalist Dress Watches",
        "stock": 8,
        "is_featured": false,
        "badge": "Calatrava Classic",
        "sizes": [
            "38mm",
            "41mm"
        ],
        "colors": [
            "Obsidian Black",
            "Champagne Gold",
            "Imperial Emerald",
            "Midnight Sunburst"
        ],
        "images": [
            {
                "url": "https://images.unsplash.com/photo-1548169874-53e85f753f1e?w=800&auto=format&fit=crop&q=80"
            },
            {
                "url": "https://images.unsplash.com/photo-1524805444758-089113d48a6d?w=800&auto=format&fit=crop&q=80"
            }
        ],
        "ratings": {
            "average": 5.0,
            "count": 43
        },
        "specs": {
            "Movement": "Column-Wheel Integrated Chronograph Calibre (28,800 vph)",
            "Case Diameter": "38mm (Lug-to-Lug: 48mm)",
            "Case Material": "18K Gold PVD over 316L Steel",
            "Crystal": "Dual-Curved Sapphire with Multi-Layer Anti-Reflective Coating",
            "Water Resistance": "50 Meters / 5 ATM",
            "Power Reserve": "48 Hours",
            "Strap": "Handcrafted Italian Full-Grain Alligator-Pattern Leather",
            "Warranty": "5-Year Global Chrononix Horology Warranty"
        }
    },
    {
        "_id": "watch-chr-076",
        "name": "Chrononix Nordic Minimalist Monolith",
        "tagline": "Stripped-back Nordic aesthetic with subtle embossed indices and slate leather",
        "description": "Handcrafted in accordance with classical horological traditions, the Chrononix Nordic Minimalist Monolith represents the pinnacle of precision watchmaking. Featuring stripped-back nordic aesthetic with subtle embossed indices and slate leather, this timepiece is encased in 316l surgical grade stainless steel with a double-curved scratch-proof sapphire crystal. Every component is individually regulated and inspected for chronometer-grade accuracy before delivery.",
        "price": 39000,
        "discount_price": 31999,
        "category": "Minimalist Dress Watches",
        "stock": 9,
        "is_featured": true,
        "badge": "Nordic Minimal",
        "sizes": [
            "38mm",
            "41mm"
        ],
        "colors": [
            "Obsidian Black",
            "Champagne Gold",
            "Imperial Emerald",
            "Midnight Sunburst"
        ],
        "images": [
            {
                "url": "https://images.unsplash.com/photo-1524805444758-089113d48a6d?w=800&auto=format&fit=crop&q=80"
            },
            {
                "url": "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=800&auto=format&fit=crop&q=80"
            }
        ],
        "ratings": {
            "average": 4.7,
            "count": 50
        },
        "specs": {
            "Movement": "Column-Wheel Integrated Chronograph Calibre (28,800 vph)",
            "Case Diameter": "38mm (Lug-to-Lug: 48mm)",
            "Case Material": "316L Surgical Grade Stainless Steel",
            "Crystal": "Dual-Curved Sapphire with Multi-Layer Anti-Reflective Coating",
            "Water Resistance": "50 Meters / 5 ATM",
            "Power Reserve": "48 Hours",
            "Strap": "Handcrafted Italian Full-Grain Alligator-Pattern Leather",
            "Warranty": "5-Year Global Chrononix Horology Warranty"
        }
    },
    {
        "_id": "watch-chr-077",
        "name": "Chrononix Silver Sunray Elegance",
        "tagline": "Pristine silver sunray finish dial with polished pencil hands and sapphire glass",
        "description": "Handcrafted in accordance with classical horological traditions, the Chrononix Silver Sunray Elegance represents the pinnacle of precision watchmaking. Featuring pristine silver sunray finish dial with polished pencil hands and sapphire glass, this timepiece is encased in 316l surgical grade stainless steel with a double-curved scratch-proof sapphire crystal. Every component is individually regulated and inspected for chronometer-grade accuracy before delivery.",
        "price": 48000,
        "discount_price": 39999,
        "category": "Minimalist Dress Watches",
        "stock": 10,
        "is_featured": false,
        "badge": "Silver Sunray",
        "sizes": [
            "38mm",
            "41mm"
        ],
        "colors": [
            "Obsidian Black",
            "Champagne Gold",
            "Imperial Emerald",
            "Midnight Sunburst"
        ],
        "images": [
            {
                "url": "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=800&auto=format&fit=crop&q=80"
            },
            {
                "url": "https://images.unsplash.com/photo-1524805444758-089113d48a6d?w=800&auto=format&fit=crop&q=80"
            }
        ],
        "ratings": {
            "average": 4.8,
            "count": 57
        },
        "specs": {
            "Movement": "Column-Wheel Integrated Chronograph Calibre (28,800 vph)",
            "Case Diameter": "38mm (Lug-to-Lug: 48mm)",
            "Case Material": "316L Surgical Grade Stainless Steel",
            "Crystal": "Dual-Curved Sapphire with Multi-Layer Anti-Reflective Coating",
            "Water Resistance": "50 Meters / 5 ATM",
            "Power Reserve": "48 Hours",
            "Strap": "Handcrafted Italian Full-Grain Alligator-Pattern Leather",
            "Warranty": "5-Year Global Chrononix Horology Warranty"
        }
    },
    {
        "_id": "watch-chr-078",
        "name": "Chrononix Midnight Onyx Dress Watch",
        "tagline": "Mirror-polished deep black lacquer dial without date window for absolute purity",
        "description": "Handcrafted in accordance with classical horological traditions, the Chrononix Midnight Onyx Dress Watch represents the pinnacle of precision watchmaking. Featuring mirror-polished deep black lacquer dial without date window for absolute purity, this timepiece is encased in 316l surgical grade stainless steel with a double-curved scratch-proof sapphire crystal. Every component is individually regulated and inspected for chronometer-grade accuracy before delivery.",
        "price": 52000,
        "discount_price": 42999,
        "category": "Minimalist Dress Watches",
        "stock": 11,
        "is_featured": false,
        "badge": "Onyx Black",
        "sizes": [
            "38mm",
            "41mm"
        ],
        "colors": [
            "Obsidian Black",
            "Champagne Gold",
            "Imperial Emerald",
            "Midnight Sunburst"
        ],
        "images": [
            {
                "url": "https://images.unsplash.com/photo-1533139502658-0198f920d8e8?w=800&auto=format&fit=crop&q=80"
            },
            {
                "url": "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&auto=format&fit=crop&q=80"
            }
        ],
        "ratings": {
            "average": 4.9,
            "count": 64
        },
        "specs": {
            "Movement": "Column-Wheel Integrated Chronograph Calibre (28,800 vph)",
            "Case Diameter": "38mm (Lug-to-Lug: 48mm)",
            "Case Material": "316L Surgical Grade Stainless Steel",
            "Crystal": "Dual-Curved Sapphire with Multi-Layer Anti-Reflective Coating",
            "Water Resistance": "50 Meters / 5 ATM",
            "Power Reserve": "48 Hours",
            "Strap": "Handcrafted Italian Full-Grain Alligator-Pattern Leather",
            "Warranty": "5-Year Global Chrononix Horology Warranty"
        }
    },
    {
        "_id": "watch-chr-079",
        "name": "Chrononix Small Seconds Petite",
        "tagline": "Sub-dial small seconds complication positioned at 6 o'clock with vintage crown",
        "description": "Handcrafted in accordance with classical horological traditions, the Chrononix Small Seconds Petite represents the pinnacle of precision watchmaking. Featuring sub-dial small seconds complication positioned at 6 o'clock with vintage crown, this timepiece is encased in 316l surgical grade stainless steel with a double-curved scratch-proof sapphire crystal. Every component is individually regulated and inspected for chronometer-grade accuracy before delivery.",
        "price": 46000,
        "discount_price": 37999,
        "category": "Minimalist Dress Watches",
        "stock": 12,
        "is_featured": false,
        "badge": "Small Seconds",
        "sizes": [
            "38mm",
            "41mm"
        ],
        "colors": [
            "Obsidian Black",
            "Champagne Gold",
            "Imperial Emerald",
            "Midnight Sunburst"
        ],
        "images": [
            {
                "url": "https://images.unsplash.com/photo-1547996160-71dfabb4e803?w=800&auto=format&fit=crop&q=80"
            },
            {
                "url": "https://images.unsplash.com/photo-1614164185128-e4ec99c436d7?w=800&auto=format&fit=crop&q=80"
            }
        ],
        "ratings": {
            "average": 5.0,
            "count": 71
        },
        "specs": {
            "Movement": "Column-Wheel Integrated Chronograph Calibre (28,800 vph)",
            "Case Diameter": "38mm (Lug-to-Lug: 48mm)",
            "Case Material": "316L Surgical Grade Stainless Steel",
            "Crystal": "Dual-Curved Sapphire with Multi-Layer Anti-Reflective Coating",
            "Water Resistance": "50 Meters / 5 ATM",
            "Power Reserve": "48 Hours",
            "Strap": "Handcrafted Italian Full-Grain Alligator-Pattern Leather",
            "Warranty": "5-Year Global Chrononix Horology Warranty"
        }
    },
    {
        "_id": "watch-chr-080",
        "name": "Chrononix Rose Gold Milanese Mesh",
        "tagline": "Flexible 316L Milanese magnetic mesh strap with rose gold electroplated case",
        "description": "Handcrafted in accordance with classical horological traditions, the Chrononix Rose Gold Milanese Mesh represents the pinnacle of precision watchmaking. Featuring flexible 316l milanese magnetic mesh strap with rose gold electroplated case, this timepiece is encased in 18k gold pvd over 316l steel with a double-curved scratch-proof sapphire crystal. Every component is individually regulated and inspected for chronometer-grade accuracy before delivery.",
        "price": 49000,
        "discount_price": 40999,
        "category": "Minimalist Dress Watches",
        "stock": 13,
        "is_featured": false,
        "badge": "Milanese Mesh",
        "sizes": [
            "38mm",
            "41mm"
        ],
        "colors": [
            "Obsidian Black",
            "Champagne Gold",
            "Imperial Emerald",
            "Midnight Sunburst"
        ],
        "images": [
            {
                "url": "https://images.unsplash.com/photo-1614164185128-e4ec99c436d7?w=800&auto=format&fit=crop&q=80"
            },
            {
                "url": "https://images.unsplash.com/photo-1547996160-71dfabb4e803?w=800&auto=format&fit=crop&q=80"
            }
        ],
        "ratings": {
            "average": 4.7,
            "count": 78
        },
        "specs": {
            "Movement": "Column-Wheel Integrated Chronograph Calibre (28,800 vph)",
            "Case Diameter": "38mm (Lug-to-Lug: 48mm)",
            "Case Material": "18K Gold PVD over 316L Steel",
            "Crystal": "Dual-Curved Sapphire with Multi-Layer Anti-Reflective Coating",
            "Water Resistance": "50 Meters / 5 ATM",
            "Power Reserve": "48 Hours",
            "Strap": "316L Steel Milanese Magnetic Mesh Band",
            "Warranty": "5-Year Global Chrononix Horology Warranty"
        }
    },
    {
        "_id": "watch-chr-081",
        "name": "Chrononix Roman Numeral Heritage",
        "tagline": "Crisp Roman numeral railway track dial inspired by 1920s Parisian pocket watches",
        "description": "Handcrafted in accordance with classical horological traditions, the Chrononix Roman Numeral Heritage represents the pinnacle of precision watchmaking. Featuring crisp roman numeral railway track dial inspired by 1920s parisian pocket watches, this timepiece is encased in 316l surgical grade stainless steel with a double-curved scratch-proof sapphire crystal. Every component is individually regulated and inspected for chronometer-grade accuracy before delivery.",
        "price": 54000,
        "discount_price": 44999,
        "category": "Minimalist Dress Watches",
        "stock": 14,
        "is_featured": true,
        "badge": "Roman Track",
        "sizes": [
            "38mm",
            "41mm"
        ],
        "colors": [
            "Obsidian Black",
            "Champagne Gold",
            "Imperial Emerald",
            "Midnight Sunburst"
        ],
        "images": [
            {
                "url": "https://images.unsplash.com/photo-1587836374828-4dbafa94cf0e?w=800&auto=format&fit=crop&q=80"
            },
            {
                "url": "https://images.unsplash.com/photo-1524805444758-089113d48a6d?w=800&auto=format&fit=crop&q=80"
            }
        ],
        "ratings": {
            "average": 4.8,
            "count": 85
        },
        "specs": {
            "Movement": "Column-Wheel Integrated Chronograph Calibre (28,800 vph)",
            "Case Diameter": "38mm (Lug-to-Lug: 48mm)",
            "Case Material": "316L Surgical Grade Stainless Steel",
            "Crystal": "Dual-Curved Sapphire with Multi-Layer Anti-Reflective Coating",
            "Water Resistance": "50 Meters / 5 ATM",
            "Power Reserve": "48 Hours",
            "Strap": "Handcrafted Italian Full-Grain Alligator-Pattern Leather",
            "Warranty": "5-Year Global Chrononix Horology Warranty"
        }
    },
    {
        "_id": "watch-chr-082",
        "name": "Chrononix Salmon Dial Dress Edition",
        "tagline": "Coveted vintage salmon dial finish with heat-blued steel hands and brown calfskin",
        "description": "Handcrafted in accordance with classical horological traditions, the Chrononix Salmon Dial Dress Edition represents the pinnacle of precision watchmaking. Featuring coveted vintage salmon dial finish with heat-blued steel hands and brown calfskin, this timepiece is encased in 316l surgical grade stainless steel with a double-curved scratch-proof sapphire crystal. Every component is individually regulated and inspected for chronometer-grade accuracy before delivery.",
        "price": 62000,
        "discount_price": 51999,
        "category": "Minimalist Dress Watches",
        "stock": 15,
        "is_featured": false,
        "badge": "Salmon Dial",
        "sizes": [
            "38mm",
            "41mm"
        ],
        "colors": [
            "Obsidian Black",
            "Champagne Gold",
            "Imperial Emerald",
            "Midnight Sunburst"
        ],
        "images": [
            {
                "url": "https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=800&auto=format&fit=crop&q=80"
            },
            {
                "url": "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&auto=format&fit=crop&q=80"
            }
        ],
        "ratings": {
            "average": 4.9,
            "count": 92
        },
        "specs": {
            "Movement": "Column-Wheel Integrated Chronograph Calibre (28,800 vph)",
            "Case Diameter": "38mm (Lug-to-Lug: 48mm)",
            "Case Material": "316L Surgical Grade Stainless Steel",
            "Crystal": "Dual-Curved Sapphire with Multi-Layer Anti-Reflective Coating",
            "Water Resistance": "50 Meters / 5 ATM",
            "Power Reserve": "48 Hours",
            "Strap": "Handcrafted Italian Full-Grain Alligator-Pattern Leather",
            "Warranty": "5-Year Global Chrononix Horology Warranty"
        }
    },
    {
        "_id": "watch-chr-083",
        "name": "Chrononix Square Tank Art-Deco",
        "tagline": "Rectangular geometric Art Deco tank case with curved sapphire crystal",
        "description": "Handcrafted in accordance with classical horological traditions, the Chrononix Square Tank Art-Deco represents the pinnacle of precision watchmaking. Featuring rectangular geometric art deco tank case with curved sapphire crystal, this timepiece is encased in 316l surgical grade stainless steel with a double-curved scratch-proof sapphire crystal. Every component is individually regulated and inspected for chronometer-grade accuracy before delivery.",
        "price": 56000,
        "discount_price": 46999,
        "category": "Minimalist Dress Watches",
        "stock": 16,
        "is_featured": false,
        "badge": "Tank Art-Deco",
        "sizes": [
            "38mm",
            "41mm"
        ],
        "colors": [
            "Obsidian Black",
            "Champagne Gold",
            "Imperial Emerald",
            "Midnight Sunburst"
        ],
        "images": [
            {
                "url": "https://images.unsplash.com/photo-1619134778706-7015533a6150?w=800&auto=format&fit=crop&q=80"
            },
            {
                "url": "https://images.unsplash.com/photo-1533139502658-0198f920d8e8?w=800&auto=format&fit=crop&q=80"
            }
        ],
        "ratings": {
            "average": 5.0,
            "count": 99
        },
        "specs": {
            "Movement": "Column-Wheel Integrated Chronograph Calibre (28,800 vph)",
            "Case Diameter": "38mm (Lug-to-Lug: 48mm)",
            "Case Material": "316L Surgical Grade Stainless Steel",
            "Crystal": "Dual-Curved Sapphire with Multi-Layer Anti-Reflective Coating",
            "Water Resistance": "50 Meters / 5 ATM",
            "Power Reserve": "48 Hours",
            "Strap": "Handcrafted Italian Full-Grain Alligator-Pattern Leather",
            "Warranty": "5-Year Global Chrononix Horology Warranty"
        }
    },
    {
        "_id": "watch-chr-084",
        "name": "Chrononix Tonneau Curved Dress",
        "tagline": "Ergonomically curved barrel tonneau case hugging the wrist with luxury leather",
        "description": "Handcrafted in accordance with classical horological traditions, the Chrononix Tonneau Curved Dress represents the pinnacle of precision watchmaking. Featuring ergonomically curved barrel tonneau case hugging the wrist with luxury leather, this timepiece is encased in 316l surgical grade stainless steel with a double-curved scratch-proof sapphire crystal. Every component is individually regulated and inspected for chronometer-grade accuracy before delivery.",
        "price": 68000,
        "discount_price": 56999,
        "category": "Minimalist Dress Watches",
        "stock": 17,
        "is_featured": false,
        "badge": "Tonneau Shape",
        "sizes": [
            "38mm",
            "41mm"
        ],
        "colors": [
            "Obsidian Black",
            "Champagne Gold",
            "Imperial Emerald",
            "Midnight Sunburst"
        ],
        "images": [
            {
                "url": "https://images.unsplash.com/photo-1622434641406-a158123450f9?w=800&auto=format&fit=crop&q=80"
            },
            {
                "url": "https://images.unsplash.com/photo-1619134778706-7015533a6150?w=800&auto=format&fit=crop&q=80"
            }
        ],
        "ratings": {
            "average": 4.7,
            "count": 106
        },
        "specs": {
            "Movement": "Column-Wheel Integrated Chronograph Calibre (28,800 vph)",
            "Case Diameter": "38mm (Lug-to-Lug: 48mm)",
            "Case Material": "316L Surgical Grade Stainless Steel",
            "Crystal": "Dual-Curved Sapphire with Multi-Layer Anti-Reflective Coating",
            "Water Resistance": "50 Meters / 5 ATM",
            "Power Reserve": "48 Hours",
            "Strap": "Handcrafted Italian Full-Grain Alligator-Pattern Leather",
            "Warranty": "5-Year Global Chrononix Horology Warranty"
        }
    },
    {
        "_id": "watch-chr-085",
        "name": "Chrononix Champagne Linen Textured",
        "tagline": "Rare hand-woven linen texture dial reflecting gentle golden ambient light",
        "description": "Handcrafted in accordance with classical horological traditions, the Chrononix Champagne Linen Textured represents the pinnacle of precision watchmaking. Featuring rare hand-woven linen texture dial reflecting gentle golden ambient light, this timepiece is encased in 316l surgical grade stainless steel with a double-curved scratch-proof sapphire crystal. Every component is individually regulated and inspected for chronometer-grade accuracy before delivery.",
        "price": 51000,
        "discount_price": 41999,
        "category": "Minimalist Dress Watches",
        "stock": 18,
        "is_featured": false,
        "badge": "Linen Dial",
        "sizes": [
            "38mm",
            "41mm"
        ],
        "colors": [
            "Obsidian Black",
            "Champagne Gold",
            "Imperial Emerald",
            "Midnight Sunburst"
        ],
        "images": [
            {
                "url": "https://images.unsplash.com/photo-1612817159949-195b6eb9e31a?w=800&auto=format&fit=crop&q=80"
            },
            {
                "url": "https://images.unsplash.com/photo-1614164185128-e4ec99c436d7?w=800&auto=format&fit=crop&q=80"
            }
        ],
        "ratings": {
            "average": 4.8,
            "count": 113
        },
        "specs": {
            "Movement": "Column-Wheel Integrated Chronograph Calibre (28,800 vph)",
            "Case Diameter": "38mm (Lug-to-Lug: 48mm)",
            "Case Material": "316L Surgical Grade Stainless Steel",
            "Crystal": "Dual-Curved Sapphire with Multi-Layer Anti-Reflective Coating",
            "Water Resistance": "50 Meters / 5 ATM",
            "Power Reserve": "48 Hours",
            "Strap": "Handcrafted Italian Full-Grain Alligator-Pattern Leather",
            "Warranty": "5-Year Global Chrononix Horology Warranty"
        }
    },
    {
        "_id": "watch-chr-086",
        "name": "Chrononix Ivory Porcelain Dress",
        "tagline": "Double-fired genuine ivory porcelain dial with hand-painted Arabic numerals",
        "description": "Handcrafted in accordance with classical horological traditions, the Chrononix Ivory Porcelain Dress represents the pinnacle of precision watchmaking. Featuring double-fired genuine ivory porcelain dial with hand-painted arabic numerals, this timepiece is encased in 316l surgical grade stainless steel with a double-curved scratch-proof sapphire crystal. Every component is individually regulated and inspected for chronometer-grade accuracy before delivery.",
        "price": 59000,
        "discount_price": 48999,
        "category": "Minimalist Dress Watches",
        "stock": 19,
        "is_featured": true,
        "badge": "Ivory Porcelain",
        "sizes": [
            "38mm",
            "41mm"
        ],
        "colors": [
            "Obsidian Black",
            "Champagne Gold",
            "Imperial Emerald",
            "Midnight Sunburst"
        ],
        "images": [
            {
                "url": "https://images.unsplash.com/photo-1518131672697-613becd4fab5?w=800&auto=format&fit=crop&q=80"
            },
            {
                "url": "https://images.unsplash.com/photo-1547996160-71dfabb4e803?w=800&auto=format&fit=crop&q=80"
            }
        ],
        "ratings": {
            "average": 4.9,
            "count": 120
        },
        "specs": {
            "Movement": "Column-Wheel Integrated Chronograph Calibre (28,800 vph)",
            "Case Diameter": "38mm (Lug-to-Lug: 48mm)",
            "Case Material": "316L Surgical Grade Stainless Steel",
            "Crystal": "Dual-Curved Sapphire with Multi-Layer Anti-Reflective Coating",
            "Water Resistance": "50 Meters / 5 ATM",
            "Power Reserve": "48 Hours",
            "Strap": "Handcrafted Italian Full-Grain Alligator-Pattern Leather",
            "Warranty": "5-Year Global Chrononix Horology Warranty"
        }
    },
    {
        "_id": "watch-chr-087",
        "name": "Chrononix Connected Horology Titanium",
        "tagline": "Mechanical hands floating over a hidden AMOLED high-res biometric sapphire sub-display",
        "description": "Handcrafted in accordance with classical horological traditions, the Chrononix Connected Horology Titanium represents the pinnacle of precision watchmaking. Featuring mechanical hands floating over a hidden amoled high-res biometric sapphire sub-display, this timepiece is encased in aerospace grade 5 titanium with a double-curved scratch-proof sapphire crystal. Every component is individually regulated and inspected for chronometer-grade accuracy before delivery.",
        "price": 84000,
        "discount_price": 69999,
        "category": "Smart Luxury",
        "stock": 20,
        "is_featured": true,
        "badge": "Hybrid Mechanical",
        "sizes": [
            "41mm",
            "43mm"
        ],
        "colors": [
            "Obsidian Black",
            "Champagne Gold",
            "Imperial Emerald",
            "Midnight Sunburst"
        ],
        "images": [
            {
                "url": "https://images.unsplash.com/photo-1600003014755-ba31aa59c4b6?w=800&auto=format&fit=crop&q=80"
            },
            {
                "url": "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=800&auto=format&fit=crop&q=80"
            }
        ],
        "ratings": {
            "average": 5.0,
            "count": 127
        },
        "specs": {
            "Movement": "Column-Wheel Integrated Chronograph Calibre (28,800 vph)",
            "Case Diameter": "41mm (Lug-to-Lug: 48mm)",
            "Case Material": "Aerospace Grade 5 Titanium",
            "Crystal": "Dual-Curved Sapphire with Multi-Layer Anti-Reflective Coating",
            "Water Resistance": "100 Meters / 10 ATM",
            "Power Reserve": "Up to 14 Days (Smart Mode)",
            "Strap": "Grade 5 Titanium Link Bracelet with Micro-Adjustment",
            "Warranty": "5-Year Global Chrononix Horology Warranty"
        }
    },
    {
        "_id": "watch-chr-088",
        "name": "Chrononix Quantum E-Crown Smart Tourbillon",
        "tagline": "Self-adjusting motorized electro-mechanical crown keeping atomic second precision",
        "description": "Handcrafted in accordance with classical horological traditions, the Chrononix Quantum E-Crown Smart Tourbillon represents the pinnacle of precision watchmaking. Featuring self-adjusting motorized electro-mechanical crown keeping atomic second precision, this timepiece is encased in 316l surgical grade stainless steel with a double-curved scratch-proof sapphire crystal. Every component is individually regulated and inspected for chronometer-grade accuracy before delivery.",
        "price": 115000,
        "discount_price": 96999,
        "category": "Smart Luxury",
        "stock": 21,
        "is_featured": false,
        "badge": "E-Crown Atomic",
        "sizes": [
            "42mm",
            "41mm"
        ],
        "colors": [
            "Obsidian Black",
            "Champagne Gold",
            "Imperial Emerald",
            "Midnight Sunburst"
        ],
        "images": [
            {
                "url": "https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=800&auto=format&fit=crop&q=80"
            },
            {
                "url": "https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?w=800&auto=format&fit=crop&q=80"
            }
        ],
        "ratings": {
            "average": 4.7,
            "count": 134
        },
        "specs": {
            "Movement": "Hand-Crafted Flying Tourbillon Calibre (21,600 vph, 33 jewels)",
            "Case Diameter": "42mm (Lug-to-Lug: 48mm)",
            "Case Material": "316L Surgical Grade Stainless Steel",
            "Crystal": "Dual-Curved Sapphire with Multi-Layer Anti-Reflective Coating",
            "Water Resistance": "100 Meters / 10 ATM",
            "Power Reserve": "Up to 14 Days (Smart Mode)",
            "Strap": "Handcrafted Italian Full-Grain Alligator-Pattern Leather",
            "Warranty": "5-Year Global Chrononix Horology Warranty"
        }
    },
    {
        "_id": "watch-chr-089",
        "name": "Chrononix Sapphire Connected Calibre",
        "tagline": "Full sapphire crystal front and back with titanium grade 5 case & sapphire heart rate sensors",
        "description": "Handcrafted in accordance with classical horological traditions, the Chrononix Sapphire Connected Calibre represents the pinnacle of precision watchmaking. Featuring full sapphire crystal front and back with titanium grade 5 case & sapphire heart rate sensors, this timepiece is encased in 316l surgical grade stainless steel with a double-curved scratch-proof sapphire crystal. Every component is individually regulated and inspected for chronometer-grade accuracy before delivery.",
        "price": 89000,
        "discount_price": 74999,
        "category": "Smart Luxury",
        "stock": 22,
        "is_featured": false,
        "badge": "Sapphire Smart",
        "sizes": [
            "41mm",
            "43mm"
        ],
        "colors": [
            "Obsidian Black",
            "Champagne Gold",
            "Imperial Emerald",
            "Midnight Sunburst"
        ],
        "images": [
            {
                "url": "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&auto=format&fit=crop&q=80"
            },
            {
                "url": "https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=800&auto=format&fit=crop&q=80"
            }
        ],
        "ratings": {
            "average": 4.8,
            "count": 141
        },
        "specs": {
            "Movement": "Column-Wheel Integrated Chronograph Calibre (28,800 vph)",
            "Case Diameter": "41mm (Lug-to-Lug: 48mm)",
            "Case Material": "316L Surgical Grade Stainless Steel",
            "Crystal": "Dual-Curved Sapphire with Multi-Layer Anti-Reflective Coating",
            "Water Resistance": "100 Meters / 10 ATM",
            "Power Reserve": "Up to 14 Days (Smart Mode)",
            "Strap": "Handcrafted Italian Full-Grain Alligator-Pattern Leather",
            "Warranty": "5-Year Global Chrononix Horology Warranty"
        }
    },
    {
        "_id": "watch-chr-090",
        "name": "Chrononix Golf Edition GPS Chrono",
        "tagline": "Pre-loaded with 40,000 international golf courses with laser shot distance calculation",
        "description": "Handcrafted in accordance with classical horological traditions, the Chrononix Golf Edition GPS Chrono represents the pinnacle of precision watchmaking. Featuring pre-loaded with 40,000 international golf courses with laser shot distance calculation, this timepiece is encased in 316l surgical grade stainless steel with a double-curved scratch-proof sapphire crystal. Every component is individually regulated and inspected for chronometer-grade accuracy before delivery.",
        "price": 76000,
        "discount_price": 64999,
        "category": "Smart Luxury",
        "stock": 8,
        "is_featured": false,
        "badge": "Golf Edition GPS",
        "sizes": [
            "41mm",
            "43mm"
        ],
        "colors": [
            "Obsidian Black",
            "Champagne Gold",
            "Imperial Emerald",
            "Midnight Sunburst"
        ],
        "images": [
            {
                "url": "https://images.unsplash.com/photo-1548169874-53e85f753f1e?w=800&auto=format&fit=crop&q=80"
            },
            {
                "url": "https://images.unsplash.com/photo-1524805444758-089113d48a6d?w=800&auto=format&fit=crop&q=80"
            }
        ],
        "ratings": {
            "average": 4.9,
            "count": 148
        },
        "specs": {
            "Movement": "Column-Wheel Integrated Chronograph Calibre (28,800 vph)",
            "Case Diameter": "41mm (Lug-to-Lug: 48mm)",
            "Case Material": "316L Surgical Grade Stainless Steel",
            "Crystal": "Dual-Curved Sapphire with Multi-Layer Anti-Reflective Coating",
            "Water Resistance": "100 Meters / 10 ATM",
            "Power Reserve": "Up to 14 Days (Smart Mode)",
            "Strap": "Handcrafted Italian Full-Grain Alligator-Pattern Leather",
            "Warranty": "5-Year Global Chrononix Horology Warranty"
        }
    },
    {
        "_id": "watch-chr-091",
        "name": "Chrononix Horizon Connected Ceramic",
        "tagline": "Scratch-resistant zirconia ceramic chassis with customized Swiss watch faces",
        "description": "Handcrafted in accordance with classical horological traditions, the Chrononix Horizon Connected Ceramic represents the pinnacle of precision watchmaking. Featuring scratch-resistant zirconia ceramic chassis with customized swiss watch faces, this timepiece is encased in high-tech zirconia ceramic with a double-curved scratch-proof sapphire crystal. Every component is individually regulated and inspected for chronometer-grade accuracy before delivery.",
        "price": 82000,
        "discount_price": 68999,
        "category": "Smart Luxury",
        "stock": 9,
        "is_featured": true,
        "badge": "Ceramic Smart",
        "sizes": [
            "41mm",
            "43mm"
        ],
        "colors": [
            "Obsidian Black",
            "Champagne Gold",
            "Imperial Emerald",
            "Midnight Sunburst"
        ],
        "images": [
            {
                "url": "https://images.unsplash.com/photo-1524805444758-089113d48a6d?w=800&auto=format&fit=crop&q=80"
            },
            {
                "url": "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=800&auto=format&fit=crop&q=80"
            }
        ],
        "ratings": {
            "average": 5.0,
            "count": 155
        },
        "specs": {
            "Movement": "Column-Wheel Integrated Chronograph Calibre (28,800 vph)",
            "Case Diameter": "41mm (Lug-to-Lug: 48mm)",
            "Case Material": "High-Tech Zirconia Ceramic",
            "Crystal": "Dual-Curved Sapphire with Multi-Layer Anti-Reflective Coating",
            "Water Resistance": "100 Meters / 10 ATM",
            "Power Reserve": "Up to 14 Days (Smart Mode)",
            "Strap": "Handcrafted Italian Full-Grain Alligator-Pattern Leather",
            "Warranty": "5-Year Global Chrononix Horology Warranty"
        }
    },
    {
        "_id": "watch-chr-092",
        "name": "Chrononix Explorer Titanium Expedition",
        "tagline": "Dual-frequency multi-band GPS with offline topo maps and 14-day battery reserve",
        "description": "Handcrafted in accordance with classical horological traditions, the Chrononix Explorer Titanium Expedition represents the pinnacle of precision watchmaking. Featuring dual-frequency multi-band gps with offline topo maps and 14-day battery reserve, this timepiece is encased in aerospace grade 5 titanium with a double-curved scratch-proof sapphire crystal. Every component is individually regulated and inspected for chronometer-grade accuracy before delivery.",
        "price": 79000,
        "discount_price": 66999,
        "category": "Smart Luxury",
        "stock": 10,
        "is_featured": false,
        "badge": "Expedition 14-Day",
        "sizes": [
            "41mm",
            "43mm"
        ],
        "colors": [
            "Obsidian Black",
            "Champagne Gold",
            "Imperial Emerald",
            "Midnight Sunburst"
        ],
        "images": [
            {
                "url": "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=800&auto=format&fit=crop&q=80"
            },
            {
                "url": "https://images.unsplash.com/photo-1524805444758-089113d48a6d?w=800&auto=format&fit=crop&q=80"
            }
        ],
        "ratings": {
            "average": 4.7,
            "count": 162
        },
        "specs": {
            "Movement": "Column-Wheel Integrated Chronograph Calibre (28,800 vph)",
            "Case Diameter": "41mm (Lug-to-Lug: 48mm)",
            "Case Material": "Aerospace Grade 5 Titanium",
            "Crystal": "Dual-Curved Sapphire with Multi-Layer Anti-Reflective Coating",
            "Water Resistance": "100 Meters / 10 ATM",
            "Power Reserve": "Up to 14 Days (Smart Mode)",
            "Strap": "Grade 5 Titanium Link Bracelet with Micro-Adjustment",
            "Warranty": "5-Year Global Chrononix Horology Warranty"
        }
    },
    {
        "_id": "watch-chr-093",
        "name": "Chrononix Aviator Smart Cockpit",
        "tagline": "Direct aviation METAR weather reports, worldwide airport database, and barometric altimeter",
        "description": "Handcrafted in accordance with classical horological traditions, the Chrononix Aviator Smart Cockpit represents the pinnacle of precision watchmaking. Featuring direct aviation metar weather reports, worldwide airport database, and barometric altimeter, this timepiece is encased in 316l surgical grade stainless steel with a double-curved scratch-proof sapphire crystal. Every component is individually regulated and inspected for chronometer-grade accuracy before delivery.",
        "price": 92000,
        "discount_price": 77999,
        "category": "Smart Luxury",
        "stock": 11,
        "is_featured": false,
        "badge": "Aviator Cockpit",
        "sizes": [
            "41mm",
            "43mm"
        ],
        "colors": [
            "Obsidian Black",
            "Champagne Gold",
            "Imperial Emerald",
            "Midnight Sunburst"
        ],
        "images": [
            {
                "url": "https://images.unsplash.com/photo-1533139502658-0198f920d8e8?w=800&auto=format&fit=crop&q=80"
            },
            {
                "url": "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&auto=format&fit=crop&q=80"
            }
        ],
        "ratings": {
            "average": 4.8,
            "count": 169
        },
        "specs": {
            "Movement": "Column-Wheel Integrated Chronograph Calibre (28,800 vph)",
            "Case Diameter": "41mm (Lug-to-Lug: 48mm)",
            "Case Material": "316L Surgical Grade Stainless Steel",
            "Crystal": "Dual-Curved Sapphire with Multi-Layer Anti-Reflective Coating",
            "Water Resistance": "100 Meters / 10 ATM",
            "Power Reserve": "Up to 14 Days (Smart Mode)",
            "Strap": "Handcrafted Italian Full-Grain Alligator-Pattern Leather",
            "Warranty": "5-Year Global Chrononix Horology Warranty"
        }
    },
    {
        "_id": "watch-chr-094",
        "name": "Chrononix Deep Dive Connected 100M",
        "tagline": "EN13319 certified dive computer smartwatch with real-time decompression calculator",
        "description": "Handcrafted in accordance with classical horological traditions, the Chrononix Deep Dive Connected 100M represents the pinnacle of precision watchmaking. Featuring en13319 certified dive computer smartwatch with real-time decompression calculator, this timepiece is encased in 316l surgical grade stainless steel with a double-curved scratch-proof sapphire crystal. Every component is individually regulated and inspected for chronometer-grade accuracy before delivery.",
        "price": 88000,
        "discount_price": 73999,
        "category": "Smart Luxury",
        "stock": 12,
        "is_featured": false,
        "badge": "Dive Computer",
        "sizes": [
            "42mm",
            "41mm"
        ],
        "colors": [
            "Obsidian Black",
            "Champagne Gold",
            "Imperial Emerald",
            "Midnight Sunburst"
        ],
        "images": [
            {
                "url": "https://images.unsplash.com/photo-1547996160-71dfabb4e803?w=800&auto=format&fit=crop&q=80"
            },
            {
                "url": "https://images.unsplash.com/photo-1614164185128-e4ec99c436d7?w=800&auto=format&fit=crop&q=80"
            }
        ],
        "ratings": {
            "average": 4.9,
            "count": 176
        },
        "specs": {
            "Movement": "Column-Wheel Integrated Chronograph Calibre (28,800 vph)",
            "Case Diameter": "42mm (Lug-to-Lug: 48mm)",
            "Case Material": "316L Surgical Grade Stainless Steel",
            "Crystal": "Dual-Curved Sapphire with Multi-Layer Anti-Reflective Coating",
            "Water Resistance": "100 Meters / 10 ATM",
            "Power Reserve": "Up to 14 Days (Smart Mode)",
            "Strap": "Handcrafted Italian Full-Grain Alligator-Pattern Leather",
            "Warranty": "5-Year Global Chrononix Horology Warranty"
        }
    },
    {
        "_id": "watch-chr-095",
        "name": "Chrononix Solar Charged Smart Chrono",
        "tagline": "Invisible solar cells embedded into the sapphire glass extending battery indefinitely",
        "description": "Handcrafted in accordance with classical horological traditions, the Chrononix Solar Charged Smart Chrono represents the pinnacle of precision watchmaking. Featuring invisible solar cells embedded into the sapphire glass extending battery indefinitely, this timepiece is encased in 316l surgical grade stainless steel with a double-curved scratch-proof sapphire crystal. Every component is individually regulated and inspected for chronometer-grade accuracy before delivery.",
        "price": 71000,
        "discount_price": 59999,
        "category": "Smart Luxury",
        "stock": 13,
        "is_featured": false,
        "badge": "Solar Sapphire",
        "sizes": [
            "41mm",
            "43mm"
        ],
        "colors": [
            "Obsidian Black",
            "Champagne Gold",
            "Imperial Emerald",
            "Midnight Sunburst"
        ],
        "images": [
            {
                "url": "https://images.unsplash.com/photo-1614164185128-e4ec99c436d7?w=800&auto=format&fit=crop&q=80"
            },
            {
                "url": "https://images.unsplash.com/photo-1547996160-71dfabb4e803?w=800&auto=format&fit=crop&q=80"
            }
        ],
        "ratings": {
            "average": 5.0,
            "count": 183
        },
        "specs": {
            "Movement": "Column-Wheel Integrated Chronograph Calibre (28,800 vph)",
            "Case Diameter": "41mm (Lug-to-Lug: 48mm)",
            "Case Material": "316L Surgical Grade Stainless Steel",
            "Crystal": "Dual-Curved Sapphire with Multi-Layer Anti-Reflective Coating",
            "Water Resistance": "100 Meters / 10 ATM",
            "Power Reserve": "Up to 14 Days (Smart Mode)",
            "Strap": "Handcrafted Italian Full-Grain Alligator-Pattern Leather",
            "Warranty": "5-Year Global Chrononix Horology Warranty"
        }
    },
    {
        "_id": "watch-chr-096",
        "name": "Chrononix Rose Gold Smart Elegance",
        "tagline": "PVD 18K rose gold connected timepiece with luxury Italian saffiano leather band",
        "description": "Handcrafted in accordance with classical horological traditions, the Chrononix Rose Gold Smart Elegance represents the pinnacle of precision watchmaking. Featuring pvd 18k rose gold connected timepiece with luxury italian saffiano leather band, this timepiece is encased in 18k gold pvd over 316l steel with a double-curved scratch-proof sapphire crystal. Every component is individually regulated and inspected for chronometer-grade accuracy before delivery.",
        "price": 74000,
        "discount_price": 61999,
        "category": "Smart Luxury",
        "stock": 14,
        "is_featured": true,
        "badge": "Rose Gold Smart",
        "sizes": [
            "41mm",
            "43mm"
        ],
        "colors": [
            "Obsidian Black",
            "Champagne Gold",
            "Imperial Emerald",
            "Midnight Sunburst"
        ],
        "images": [
            {
                "url": "https://images.unsplash.com/photo-1587836374828-4dbafa94cf0e?w=800&auto=format&fit=crop&q=80"
            },
            {
                "url": "https://images.unsplash.com/photo-1524805444758-089113d48a6d?w=800&auto=format&fit=crop&q=80"
            }
        ],
        "ratings": {
            "average": 4.7,
            "count": 190
        },
        "specs": {
            "Movement": "Column-Wheel Integrated Chronograph Calibre (28,800 vph)",
            "Case Diameter": "41mm (Lug-to-Lug: 48mm)",
            "Case Material": "18K Gold PVD over 316L Steel",
            "Crystal": "Dual-Curved Sapphire with Multi-Layer Anti-Reflective Coating",
            "Water Resistance": "100 Meters / 10 ATM",
            "Power Reserve": "Up to 14 Days (Smart Mode)",
            "Strap": "Handcrafted Italian Full-Grain Alligator-Pattern Leather",
            "Warranty": "5-Year Global Chrononix Horology Warranty"
        }
    },
    {
        "_id": "watch-chr-097",
        "name": "Chrononix Carbon Stealth Smartwatch",
        "tagline": "Military MIL-STD-810H certified forged carbon smartwatch with ECG and sleep telemetry",
        "description": "Handcrafted in accordance with classical horological traditions, the Chrononix Carbon Stealth Smartwatch represents the pinnacle of precision watchmaking. Featuring military mil-std-810h certified forged carbon smartwatch with ecg and sleep telemetry, this timepiece is encased in forged carbon fiber composite with a double-curved scratch-proof sapphire crystal. Every component is individually regulated and inspected for chronometer-grade accuracy before delivery.",
        "price": 86000,
        "discount_price": 71999,
        "category": "Smart Luxury",
        "stock": 15,
        "is_featured": false,
        "badge": "Carbon Military",
        "sizes": [
            "41mm",
            "43mm"
        ],
        "colors": [
            "Obsidian Black",
            "Champagne Gold",
            "Imperial Emerald",
            "Midnight Sunburst"
        ],
        "images": [
            {
                "url": "https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=800&auto=format&fit=crop&q=80"
            },
            {
                "url": "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&auto=format&fit=crop&q=80"
            }
        ],
        "ratings": {
            "average": 4.8,
            "count": 197
        },
        "specs": {
            "Movement": "Column-Wheel Integrated Chronograph Calibre (28,800 vph)",
            "Case Diameter": "41mm (Lug-to-Lug: 48mm)",
            "Case Material": "Forged Carbon Fiber Composite",
            "Crystal": "Dual-Curved Sapphire with Multi-Layer Anti-Reflective Coating",
            "Water Resistance": "100 Meters / 10 ATM",
            "Power Reserve": "Up to 14 Days (Smart Mode)",
            "Strap": "Handcrafted Italian Full-Grain Alligator-Pattern Leather",
            "Warranty": "5-Year Global Chrononix Horology Warranty"
        }
    },
    {
        "_id": "watch-chr-098",
        "name": "Chrononix Dual-Display Analog Smart",
        "tagline": "Real mechanical gear hands on top with translucent OLED notification panel beneath",
        "description": "Handcrafted in accordance with classical horological traditions, the Chrononix Dual-Display Analog Smart represents the pinnacle of precision watchmaking. Featuring real mechanical gear hands on top with translucent oled notification panel beneath, this timepiece is encased in 316l surgical grade stainless steel with a double-curved scratch-proof sapphire crystal. Every component is individually regulated and inspected for chronometer-grade accuracy before delivery.",
        "price": 69000,
        "discount_price": 57999,
        "category": "Smart Luxury",
        "stock": 16,
        "is_featured": false,
        "badge": "Dual Display",
        "sizes": [
            "41mm",
            "43mm"
        ],
        "colors": [
            "Obsidian Black",
            "Champagne Gold",
            "Imperial Emerald",
            "Midnight Sunburst"
        ],
        "images": [
            {
                "url": "https://images.unsplash.com/photo-1619134778706-7015533a6150?w=800&auto=format&fit=crop&q=80"
            },
            {
                "url": "https://images.unsplash.com/photo-1533139502658-0198f920d8e8?w=800&auto=format&fit=crop&q=80"
            }
        ],
        "ratings": {
            "average": 4.9,
            "count": 204
        },
        "specs": {
            "Movement": "Column-Wheel Integrated Chronograph Calibre (28,800 vph)",
            "Case Diameter": "41mm (Lug-to-Lug: 48mm)",
            "Case Material": "316L Surgical Grade Stainless Steel",
            "Crystal": "Dual-Curved Sapphire with Multi-Layer Anti-Reflective Coating",
            "Water Resistance": "100 Meters / 10 ATM",
            "Power Reserve": "Up to 14 Days (Smart Mode)",
            "Strap": "Handcrafted Italian Full-Grain Alligator-Pattern Leather",
            "Warranty": "5-Year Global Chrononix Horology Warranty"
        }
    },
    {
        "_id": "watch-chr-099",
        "name": "Chrononix Yachting Chrono Smart",
        "tagline": "Virtual countdown regatta timer, tide graphs, and anchor drag acoustic alarm",
        "description": "Handcrafted in accordance with classical horological traditions, the Chrononix Yachting Chrono Smart represents the pinnacle of precision watchmaking. Featuring virtual countdown regatta timer, tide graphs, and anchor drag acoustic alarm, this timepiece is encased in 316l surgical grade stainless steel with a double-curved scratch-proof sapphire crystal. Every component is individually regulated and inspected for chronometer-grade accuracy before delivery.",
        "price": 83000,
        "discount_price": 69999,
        "category": "Smart Luxury",
        "stock": 17,
        "is_featured": false,
        "badge": "Yachting Smart",
        "sizes": [
            "41mm",
            "43mm"
        ],
        "colors": [
            "Obsidian Black",
            "Champagne Gold",
            "Imperial Emerald",
            "Midnight Sunburst"
        ],
        "images": [
            {
                "url": "https://images.unsplash.com/photo-1622434641406-a158123450f9?w=800&auto=format&fit=crop&q=80"
            },
            {
                "url": "https://images.unsplash.com/photo-1619134778706-7015533a6150?w=800&auto=format&fit=crop&q=80"
            }
        ],
        "ratings": {
            "average": 5.0,
            "count": 211
        },
        "specs": {
            "Movement": "Column-Wheel Integrated Chronograph Calibre (28,800 vph)",
            "Case Diameter": "41mm (Lug-to-Lug: 48mm)",
            "Case Material": "316L Surgical Grade Stainless Steel",
            "Crystal": "Dual-Curved Sapphire with Multi-Layer Anti-Reflective Coating",
            "Water Resistance": "100 Meters / 10 ATM",
            "Power Reserve": "Up to 14 Days (Smart Mode)",
            "Strap": "Handcrafted Italian Full-Grain Alligator-Pattern Leather",
            "Warranty": "5-Year Global Chrononix Horology Warranty"
        }
    },
    {
        "_id": "watch-chr-100",
        "name": "Chrononix Black Diamond Luxury Smart",
        "tagline": "Black DLC bezel set with laboratory-grown diamond hour markers & encrypted health vault",
        "description": "Handcrafted in accordance with classical horological traditions, the Chrononix Black Diamond Luxury Smart represents the pinnacle of precision watchmaking. Featuring black dlc bezel set with laboratory-grown diamond hour markers & encrypted health vault, this timepiece is encased in 316l surgical grade stainless steel with a double-curved scratch-proof sapphire crystal. Every component is individually regulated and inspected for chronometer-grade accuracy before delivery.",
        "price": 125000,
        "discount_price": 104999,
        "category": "Smart Luxury",
        "stock": 18,
        "is_featured": false,
        "badge": "Diamond Edition",
        "sizes": [
            "41mm",
            "43mm"
        ],
        "colors": [
            "Obsidian Black",
            "Champagne Gold",
            "Imperial Emerald",
            "Midnight Sunburst"
        ],
        "images": [
            {
                "url": "https://images.unsplash.com/photo-1612817159949-195b6eb9e31a?w=800&auto=format&fit=crop&q=80"
            },
            {
                "url": "https://images.unsplash.com/photo-1614164185128-e4ec99c436d7?w=800&auto=format&fit=crop&q=80"
            }
        ],
        "ratings": {
            "average": 4.7,
            "count": 218
        },
        "specs": {
            "Movement": "Column-Wheel Integrated Chronograph Calibre (28,800 vph)",
            "Case Diameter": "41mm (Lug-to-Lug: 48mm)",
            "Case Material": "316L Surgical Grade Stainless Steel",
            "Crystal": "Dual-Curved Sapphire with Multi-Layer Anti-Reflective Coating",
            "Water Resistance": "100 Meters / 10 ATM",
            "Power Reserve": "Up to 14 Days (Smart Mode)",
            "Strap": "Handcrafted Italian Full-Grain Alligator-Pattern Leather",
            "Warranty": "5-Year Global Chrononix Horology Warranty"
        }
    }
];

export const DEMO_USERS = {
    "customer@shopnix.in": {
        "first_name": "Aman",
        "last_name": "Verma",
        "email": "customer@shopnix.in",
        "role": "customer",
        "phone": "+91 8607603050"
    },
    "admin@shopnix.in": {
        "first_name": "Chrononix",
        "last_name": "Administrator",
        "email": "admin@shopnix.in",
        "role": "admin",
        "phone": "+91 8607603050"
    }
};

export const INITIAL_ORDERS = [
    {
        "_id": "CHRONO-ORD-88201",
        "created_at": "2026-09-08T10:15:00.000Z",
        "order_status": "Delivered",
        "payment_status": "Paid",
        "payment_method": "UPI",
        "total_amount": 78999,
        "tracking_number": "SECURE-AIR-772910",
        "shipping_partner": "BlueDart Apex Armored Air",
        "estimated_delivery": "Delivered on 10 Sep 2026",
        "shipping_address": {
            "street": "Penthouse 14B, Oberoi Sky City, Western Express Highway",
            "city": "Mumbai",
            "state": "Maharashtra",
            "pincode": "400066",
            "country": "India"
        },
        "items": [
            {
                "product": "watch-chr-001",
                "name": "Chrononix Royal Sovereign Calibre 88",
                "price": 64999,
                "quantity": 1,
                "size": "41mm",
                "color": "Champagne Gold",
                "image": "https://images.unsplash.com/photo-1524805444758-089113d48a6d?w=600"
            }
        ]
    },
    {
        "_id": "CHRONO-ORD-88202",
        "created_at": "2026-09-09T14:30:00.000Z",
        "order_status": "Shipped",
        "payment_status": "Paid",
        "payment_method": "Card",
        "total_amount": 149999,
        "tracking_number": "SECURE-AIR-994102",
        "shipping_partner": "Brinks Insured Express Vault",
        "estimated_delivery": "Arriving Tomorrow by 2:00 PM",
        "shipping_address": {
            "street": "Villa 42, Palm Meadows, Whitefield",
            "city": "Bengaluru",
            "state": "Karnataka",
            "pincode": "560066",
            "country": "India"
        },
        "items": [
            {
                "product": "watch-chr-031",
                "name": "Chrononix Grand Royal Flying Tourbillon",
                "price": 249999,
                "quantity": 1,
                "size": "42mm",
                "color": "Obsidian Black",
                "image": "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=600"
            }
        ]
    }
];

export const VALID_COUPONS = {
    "CHRONO10": { code: "CHRONO10", percent: 10, description: "10% VIP Horology Discount on All Timepieces" },
    "ROYAL15": { code: "ROYAL15", percent: 15, description: "15% Exclusive Collector Privilege Discount" },
    "HOROLOGY20": { code: "HOROLOGY20", percent: 20, description: "20% Masterpiece Celebration Discount" },
    "FREESHIP": { code: "FREESHIP", freeShipping: true, description: "Complimentary White-Glove Armored Courier" }
};

// Initializer for localStorage to guarantee 100 watches load immediately
export const initShopnixStore = () => {
    try {
        if (typeof window !== "undefined" && window.localStorage) {
            if (!localStorage.getItem(STORAGE_KEYS.PRODUCTS)) {
                localStorage.setItem(STORAGE_KEYS.PRODUCTS, JSON.stringify(INITIAL_PRODUCTS));
            }
            if (!localStorage.getItem(STORAGE_KEYS.ORDERS)) {
                localStorage.setItem(STORAGE_KEYS.ORDERS, JSON.stringify(INITIAL_ORDERS));
            }
            if (!localStorage.getItem(STORAGE_KEYS.WISHLIST)) {
                // Seed initial luxury timepieces in Vault
                const initialWishlist = [INITIAL_PRODUCTS[0], INITIAL_PRODUCTS[15], INITIAL_PRODUCTS[30]];
                localStorage.setItem(STORAGE_KEYS.WISHLIST, JSON.stringify(initialWishlist));
            }
            if (!localStorage.getItem(STORAGE_KEYS.USERS)) {
                localStorage.setItem(STORAGE_KEYS.USERS, JSON.stringify(DEMO_USERS));
            }
        }
    } catch (e) {
        console.warn("Chrononix storage init warning:", e);
    }
};

// Execute initialization once
initShopnixStore();

// Storage helper functions
export const getStoredProducts = () => {
    try {
        if (typeof window === "undefined" || !window.localStorage) return INITIAL_PRODUCTS;
        const data = localStorage.getItem(STORAGE_KEYS.PRODUCTS);
        return data ? JSON.parse(data) : INITIAL_PRODUCTS;
    } catch {
        return INITIAL_PRODUCTS;
    }
};

export const saveStoredProducts = (products) => {
    try {
        if (typeof window !== "undefined" && window.localStorage) {
            localStorage.setItem(STORAGE_KEYS.PRODUCTS, JSON.stringify(products));
        }
    } catch (e) {
        console.error("Save products error:", e);
    }
};

export const getStoredWishlist = () => {
    try {
        if (typeof window === "undefined" || !window.localStorage) return [];
        const data = localStorage.getItem(STORAGE_KEYS.WISHLIST);
        return data ? JSON.parse(data) : [];
    } catch {
        return [];
    }
};

export const saveStoredWishlist = (wishlist) => {
    try {
        if (typeof window !== "undefined" && window.localStorage) {
            localStorage.setItem(STORAGE_KEYS.WISHLIST, JSON.stringify(wishlist));
        }
    } catch (e) {
        console.error("Save wishlist error:", e);
    }
};

export const getStoredOrders = () => {
    try {
        if (typeof window === "undefined" || !window.localStorage) return INITIAL_ORDERS;
        const data = localStorage.getItem(STORAGE_KEYS.ORDERS);
        return data ? JSON.parse(data) : INITIAL_ORDERS;
    } catch {
        return INITIAL_ORDERS;
    }
};

export const saveStoredOrders = (orders) => {
    try {
        if (typeof window !== "undefined" && window.localStorage) {
            localStorage.setItem(STORAGE_KEYS.ORDERS, JSON.stringify(orders));
        }
    } catch (e) {
        console.error("Save orders error:", e);
    }
};

export const createLocalOrder = (orderData) => {
    const orders = getStoredOrders();
    const newOrder = {
        _id: `CHRONO-ORD-${Math.floor(10000 + Math.random() * 90000)}`,
        created_at: new Date().toISOString(),
        order_status: "Processing",
        payment_status: orderData.payment_method === "COD" ? "Pending" : "Paid",
        payment_method: orderData.payment_method || "COD",
        total_amount: orderData.total_amount,
        tracking_number: `ARMORED-AIR-${Math.floor(100000 + Math.random() * 900000)}`,
        shipping_partner: "BlueDart Apex Armored Air",
        estimated_delivery: "Within 2-3 Business Days (Insured)",
        shipping_address: orderData.shipping_address,
        items: orderData.items
    };

    orders.unshift(newOrder);
    saveStoredOrders(orders);
    return newOrder;
};

export const updateLocalOrderStatus = (orderId, newStatus, newPaymentStatus) => {
    const orders = getStoredOrders();
    const updated = orders.map((ord) => {
        if (ord._id === orderId) {
            return {
                ...ord,
                order_status: newStatus || ord.order_status,
                payment_status: newPaymentStatus || ord.payment_status
            };
        }
        return ord;
    });
    saveStoredOrders(updated);
    return updated;
};

export const cancelLocalOrder = (orderId) => {
    const orders = getStoredOrders();
    const updated = orders.map((ord) => {
        if (ord._id === orderId) {
            return { ...ord, order_status: "Cancelled" };
        }
        return ord;
    });
    saveStoredOrders(updated);
    return updated;
};

export default {
    INITIAL_PRODUCTS,
    DEMO_USERS,
    INITIAL_ORDERS,
    VALID_COUPONS,
    getStoredProducts,
    saveStoredProducts,
    getStoredWishlist,
    saveStoredWishlist,
    getStoredOrders,
    saveStoredOrders,
    createLocalOrder,
    updateLocalOrderStatus,
    cancelLocalOrder
};
