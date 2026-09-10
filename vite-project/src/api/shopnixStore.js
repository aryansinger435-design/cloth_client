// Shopnix Resilient Local-First Store & Catalog Engine
// Ensures 100% of all features, buttons, cart, wishlist, orders, and admin functions
// work smoothly with persistence across browser refreshes.

const STORAGE_KEYS = {
    PRODUCTS: "shopnix_catalog_v3",
    CART: "shopnix_cart_v2",
    WISHLIST: "shopnix_wishlist_v2",
    ORDERS: "shopnix_orders_v2",
    USERS: "shopnix_users_v2",
    CURRENT_USER: "cloth_user",
    CURRENT_TOKEN: "cloth_token",
    COUPONS: "shopnix_applied_coupon"
};

export const INITIAL_PRODUCTS = [
    {
        _id: "prod-snx-001",
        name: "Shopnix Quantum Ultra Smart Watch",
        tagline: "Titanium casing with Sapphire OLED display & ECG Monitor",
        description: "Next-gen flagship smartwatch engineered with aero-grade titanium casing, always-on 2000-nit Retina OLED display, dual-frequency GPS, and 100-hour expedition battery life. Features blood oxygen, body temperature, continuous ECG tracking, and water resistance up to 100 meters.",
        price: 24999,
        discount_price: 18999,
        category: "Smart Devices",
        stock: 28,
        is_featured: true,
        badge: "Bestseller",
        sizes: ["41mm", "45mm", "49mm Ultra"],
        colors: ["Titanium Silver", "Midnight Shadow", "Cyber Violet"],
        images: [
            { url: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&auto=format&fit=crop&q=80" },
            { url: "https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=800&auto=format&fit=crop&q=80" },
            { url: "https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?w=800&auto=format&fit=crop&q=80" }
        ],
        ratings: { average: 4.9, count: 248 },
        specs: {
            "Display": "2.02-inch Ultra Retina LTPO OLED (2000 nits)",
            "Battery": "Up to 5 days normal use, 100h power reserve",
            "Sensors": "ECG, SpO2, Optical Heart Rate, Skin Temp, Barometer",
            "Water Resistance": "100m (WR100 & EN13319 certified)",
            "Connectivity": "Bluetooth 5.4, Dual GPS, NFC Tap-to-Pay",
            "Warranty": "2 Years Pan-India Official Replacement"
        }
    },
    {
        _id: "prod-snx-002",
        name: "Shopnix Pulse ANC Wireless Earbuds",
        tagline: "Active Noise Cancellation with 360 Spatial Audio",
        description: "Studio-mastered wireless earbuds with 48dB Hybrid Active Noise Cancellation, personalized spatial audio with dynamic head tracking, and graphene diaphragm dual drivers. Includes wireless fast-charging cyber-case providing up to 40 hours total playtime.",
        price: 9999,
        discount_price: 6499,
        category: "Audio",
        stock: 45,
        is_featured: true,
        badge: "Hot Deal",
        sizes: ["Standard Fit"],
        colors: ["Obsidian Black", "Frost White", "Neon Violet"],
        images: [
            { url: "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=800&auto=format&fit=crop&q=80" },
            { url: "https://images.unsplash.com/photo-1572536147248-ac59a8abfa4b?w=800&auto=format&fit=crop&q=80" }
        ],
        ratings: { average: 4.8, count: 184 },
        specs: {
            "Noise Cancellation": "Hybrid ANC up to 48dB depth",
            "Battery Life": "8.5h earbuds + 32h wireless charging case",
            "Driver Size": "11mm Titanium-coated dynamic drivers",
            "Latency": "38ms Ultra-low latency Gaming Mode",
            "Microphones": "6-Mic beamforming setup with AI wind reduction",
            "Waterproof": "IPX5 Splash & Sweat Resistant"
        }
    },
    {
        _id: "prod-snx-003",
        name: "CyberSound Studio Over-Ear Headphones",
        tagline: "Lossless LDAC Hi-Res Audio with Memory Foam Earcups",
        description: "Professional high-resolution wireless studio headphones with 50mm beryllium-infused drivers, custom EQ sound profiles, ambient transparency mode, and ultra-plush protein leather memory foam ear cushions for fatigue-free marathon listening.",
        price: 18999,
        discount_price: 13999,
        category: "Audio",
        stock: 19,
        is_featured: true,
        badge: "Top Rated",
        sizes: ["Adjustable Fit"],
        colors: ["Matte Cyber Black", "Gunmetal Grey", "Deep Indigo"],
        images: [
            { url: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&auto=format&fit=crop&q=80" },
            { url: "https://images.unsplash.com/photo-1546435770-a3e426bf472b?w=800&auto=format&fit=crop&q=80" }
        ],
        ratings: { average: 5.0, count: 112 },
        specs: {
            "Drivers": "50mm Beryllium High-Definition Transducers",
            "Frequency Response": "10Hz - 45,000Hz (Hi-Res Audio Certified)",
            "Playtime": "65 Hours with fast recharge (10 min = 5 hours)",
            "Codecs": "LDAC, aptX Adaptive, AAC, SBC",
            "Build": "Aviation-grade aluminum yoke with breathable headband",
            "Microphones": "Quad-mic ENC noise cancellation for crisp calls"
        }
    },
    {
        _id: "prod-snx-004",
        name: "Shopnix Nova VR Spatial Headset",
        tagline: "4K HDR Per Eye with 6DoF Inside-Out Optical Tracking",
        description: "Enter the metaverse and AAA VR gaming with ultra-crisp 4K dual Micro-OLED displays, 120Hz refresh rate, 115° field of view, and optical hand-tracking controllers. Completely standalone with optional high-speed PC VR wireless streaming.",
        price: 39999,
        discount_price: 31999,
        category: "Gaming",
        stock: 14,
        is_featured: true,
        badge: "New Launch",
        sizes: ["Standard Adjustable"],
        colors: ["Cosmic White", "Stealth Grey"],
        images: [
            { url: "https://images.unsplash.com/photo-1622979135225-d2ba269bc1df?w=800&auto=format&fit=crop&q=80" },
            { url: "https://images.unsplash.com/photo-1593508512255-86ab42a8e620?w=800&auto=format&fit=crop&q=80" }
        ],
        ratings: { average: 4.9, count: 76 },
        specs: {
            "Resolution": "Dual 4K Micro-OLED (3840 x 2160 per eye)",
            "Refresh Rate": "90Hz / 120Hz native low-persistence",
            "Field of View": "115 degrees wide angle pancake lens",
            "Processor": "Snapdragon XR2+ Gen 2 with 12GB LPDDR5 RAM",
            "Storage": "256GB High-speed UFS 3.1",
            "Controllers": "Haptic TrueTouch 6DoF optical controllers"
        }
    },
    {
        _id: "prod-snx-005",
        name: "AeroX 4K Gimbal Drone Pro",
        tagline: "3-Axis Mechanical Gimbal with 36-min Flight Time",
        description: "Compact foldable camera drone with 1-inch CMOS 48MP sensor capable of recording cinematic 4K video at 60fps. Equipped with 360-degree omnidirectional obstacle avoidance, 12km HD video transmission, and AI MasterShots tracking.",
        price: 54999,
        discount_price: 44999,
        category: "Cameras",
        stock: 11,
        is_featured: true,
        badge: "Pro Choice",
        sizes: ["Fly More Combo", "Single Battery Pack"],
        colors: ["Space Titanium", "Matte Carbon"],
        images: [
            { url: "https://images.unsplash.com/photo-1508614589041-895b88991e3e?w=800&auto=format&fit=crop&q=80" },
            { url: "https://images.unsplash.com/photo-1527977966376-1c8408f9f108?w=800&auto=format&fit=crop&q=80" }
        ],
        ratings: { average: 4.8, count: 95 },
        specs: {
            "Camera": "1-inch 48MP CMOS Sensor (f/1.8 - f/11)",
            "Video": "4K/60fps HDR, 10-bit D-Log M color profile",
            "Flight Time": "Up to 36 minutes per battery pack",
            "Range": "12 km OcuSync 4.0 Digital Transmission",
            "Obstacle Sensing": "Omnidirectional binocular vision sensors",
            "Max Wind Resistance": "Level 6 (12 m/s wind speed)"
        }
    },
    {
        _id: "prod-snx-006",
        name: "Shopnix Halo AI Smart Assistant Hub",
        tagline: "360° Spatial Audio with Holographic LED Ambient Ring",
        description: "Voice-activated AI home hub featuring rich room-filling audio, continuous privacy controls, Zigbee/Matter smart home bridge, and a captivating cyberpunk LED ring that shifts colors dynamically to your room lighting and music beat.",
        price: 8999,
        discount_price: 5999,
        category: "AI Devices",
        stock: 32,
        is_featured: true,
        badge: "Smart Home",
        sizes: ["Standard Hub"],
        colors: ["Charcoal Obsidian", "Pure Arctic White"],
        images: [
            { url: "https://images.unsplash.com/photo-1589492477829-5e65395b66cc?w=800&auto=format&fit=crop&q=80" },
            { url: "https://images.unsplash.com/photo-1543512214-318c7553f230?w=800&auto=format&fit=crop&q=80" }
        ],
        ratings: { average: 4.7, count: 142 },
        specs: {
            "Audio": "Dual 2.5-inch neodymium woofers + silk-dome tweeters",
            "Microphone Array": "4-mic far-field voice recognition",
            "Connectivity": "Wi-Fi 6, Bluetooth 5.3, Matter, Thread & Zigbee",
            "AI Engine": "Local Neural Engine for instant voice commands",
            "Lighting": "Addressable 64-LED customizable RGB halo ring",
            "Power": "Fast 30W Type-C adapter included"
        }
    },
    {
        _id: "prod-snx-007",
        name: "Vortex Mech 87 RGB Wireless Keyboard",
        tagline: "Hot-Swappable Optical Switches with CNC Aluminium Frame",
        description: "Premium mechanical gaming keyboard built with CNC-milled anodized aluminum case, pre-lubed Gateron optical switches, hot-swappable sockets, PBT double-shot keycaps, sound-dampening silicone gaskets, and south-facing RGB lighting.",
        price: 11999,
        discount_price: 8499,
        category: "Gaming",
        stock: 24,
        is_featured: false,
        badge: "Gamers Pick",
        sizes: ["Tenkeyless (87 Key)", "Compact 65%"],
        colors: ["Cyberpunk Violet", "Dark Stealth", "Retro Chalk"],
        images: [
            { url: "https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=800&auto=format&fit=crop&q=80" },
            { url: "https://images.unsplash.com/photo-1618384887929-16ec33fab9ef?w=800&auto=format&fit=crop&q=80" }
        ],
        ratings: { average: 4.9, count: 167 },
        specs: {
            "Switches": "Hot-swappable Pre-lubed Linear Red / Tactile Brown",
            "Keycaps": "Durable PBT Cherry Profile Double-Shot",
            "Connectivity": "Tri-Mode: 2.4GHz Wireless, Bluetooth 5.1, USB-C",
            "Battery": "4000mAh (up to 200 hours RGB off)",
            "Lighting": "Per-key programmable 16.8M RGB with 22 dynamic modes",
            "Software": "Web-based VIA/QMK compatible customizer"
        }
    },
    {
        _id: "prod-snx-008",
        name: "ShadowGlide Pro Wireless Gaming Mouse",
        tagline: "Ultra-lightweight 49g with 32,000 DPI Optical Sensor",
        description: "Competitor-grade esports mouse weighing just 49 grams with pure virgin-grade PTFE skates, optical microswitches rated for 90 million clicks, and zero wireless latency with 4000Hz polling rate support.",
        price: 6499,
        discount_price: 4499,
        category: "Gaming",
        stock: 35,
        is_featured: false,
        badge: "Esports Edition",
        sizes: ["Medium Ergonomic", "Compact"],
        colors: ["Neon Black", "Ghost White", "Electric Lime"],
        images: [
            { url: "https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?w=800&auto=format&fit=crop&q=80" },
            { url: "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=800&auto=format&fit=crop&q=80" }
        ],
        ratings: { average: 4.8, count: 88 },
        specs: {
            "Weight": "49 grams featherlight solid shell",
            "Sensor": "PAW3395 32,000 DPI / 650 IPS / 50G Acceleration",
            "Polling Rate": "Supports 1000Hz / 4000Hz hyper-polling",
            "Switches": "Optical GM 8.0 switches (90M click lifespan)",
            "Battery Life": "Up to 80 continuous hours on 2.4GHz",
            "Skates": "100% Virgin PTFE rounded curved feet"
        }
    },
    {
        _id: "prod-snx-009",
        name: "Horizon 34-Inch Curved Ultrawide Monitor",
        tagline: "WQHD 165Hz 1000R Curve with 1ms G-Sync & FreeSync",
        description: "Immersive curved 21:9 ultrawide gaming display with quantum dot colors, 165Hz ultra-smooth refresh rate, HDR400 brightness, and built-in KVM switch with USB-C 90W fast power delivery for laptops.",
        price: 45999,
        discount_price: 36999,
        category: "Electronics",
        stock: 9,
        is_featured: true,
        badge: "Flagship",
        sizes: ["34-Inch Ultrawide", "27-Inch Fast IPS"],
        colors: ["Cyber Titanium", "Matte Black"],
        images: [
            { url: "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=800&auto=format&fit=crop&q=80" },
            { url: "https://images.unsplash.com/photo-1547082299-de196ea013d6?w=800&auto=format&fit=crop&q=80" }
        ],
        ratings: { average: 4.9, count: 62 },
        specs: {
            "Panel Type": "Quantum Dot Fast VA / 1000R Deep Curve",
            "Resolution": "WQHD 3440 x 1440 Pixels (21:9 Aspect Ratio)",
            "Refresh Rate": "165Hz with 1ms GtG response time",
            "Color Gamut": "98% DCI-P3, 125% sRGB, 10-bit Color",
            "Ports": "2x HDMI 2.1, 1x DP 1.4, 1x USB-C 90W PD, 4x USB Hub",
            "Stand": "Height, tilt, and swivel ergonomic adjustment"
        }
    },
    {
        _id: "prod-snx-010",
        name: "ActionCam 5K Waterproof Tough Cam",
        tagline: "Dual Screens with RockSteady 4.0 & HorizonLock",
        description: "Rugged action camera made for extreme adventures. Shoots 5.3K video at 60fps, waterproof down to 18 meters without a case, features full-color front and rear touchscreens, and includes magnetic quick-release mounts.",
        price: 32999,
        discount_price: 26999,
        category: "Cameras",
        stock: 22,
        is_featured: false,
        badge: "Adventure Ready",
        sizes: ["Adventure Combo", "Standard Kit"],
        colors: ["Charcoal Grey", "Sunset Orange"],
        images: [
            { url: "https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?w=800&auto=format&fit=crop&q=80" },
            { url: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=800&auto=format&fit=crop&q=80" }
        ],
        ratings: { average: 4.7, count: 73 },
        specs: {
            "Resolution": "5.3K @ 60fps, 4K @ 120fps slow motion, 27MP Stills",
            "Stabilization": "HyperSmooth 6.0 with 360-degree Horizon Lock",
            "Screens": "2.27\" Rear Touchscreen + 1.4\" Front Vlog Screen",
            "Waterproofing": "18 meters (60ft) waterproof straight out of the box",
            "Battery": "Enduro cold-weather 1770mAh battery (up to 150 mins)",
            "Audio": "3 Microphones with advanced stereo wind suppression"
        }
    },
    {
        _id: "prod-snx-011",
        name: "SoundStorm Portable Cyber Bluetooth Speaker",
        tagline: "40W Punchy Bass with Beat-Sync 360 RGB Lights",
        description: "Rugged IP67 waterproof outdoor speaker featuring dual passive radiators, 40W stereo output with DeepBass boost, up to 24 hours of playtime, and reverse power bank capability to charge your smartphone on the go.",
        price: 5999,
        discount_price: 3899,
        category: "Audio",
        stock: 50,
        is_featured: false,
        badge: "Best Value",
        sizes: ["Standard 40W", "Mini 20W"],
        colors: ["Midnight Blue", "Cyber Violet", "Camo Olive"],
        images: [
            { url: "https://images.unsplash.com/photo-1545454675-3531b543be5d?w=800&auto=format&fit=crop&q=80" },
            { url: "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=800&auto=format&fit=crop&q=80" }
        ],
        ratings: { average: 4.8, count: 215 },
        specs: {
            "Output": "40W RMS with Dual Neodymium Drivers + Twin Subwoofers",
            "Battery": "6000mAh (Up to 24 hours playtime, doubles as power bank)",
            "Waterproof": "IP67 Dustproof and waterproof (can be fully submerged)",
            "Pairing": "PartyLink mode connects up to 100+ speakers wirelessly",
            "Bluetooth": "Bluetooth 5.3 with 30m transmission range",
            "Lighting": "Beat-synced dynamic 360-degree RGB lighting rings"
        }
    },
    {
        _id: "prod-snx-012",
        name: "Aura Ring Gen 3 Smart Health Tracker",
        tagline: "Discreet Titanium Health & Sleep Analysis on Your Finger",
        description: "Ultra-comfortable lightweight titanium health ring that tracks deep sleep stages, recovery scores, heart rate variability (HRV), and skin temperature variations without requiring a bulky screen on your wrist.",
        price: 21999,
        discount_price: 16999,
        category: "Smart Devices",
        stock: 16,
        is_featured: true,
        badge: "Trendsetter",
        sizes: ["Size 8", "Size 9", "Size 10", "Size 11"],
        colors: ["Stealth Matte Black", "Glossy Gold", "Brushed Silver"],
        images: [
            { url: "https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=800&auto=format&fit=crop&q=80" },
            { url: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=800&auto=format&fit=crop&q=80" }
        ],
        ratings: { average: 4.9, count: 104 },
        specs: {
            "Materials": "Durable titanium with PVD scratch-resistant coating",
            "Sensors": "Infrared PPG sensors, negative temperature coefficient (NTC)",
            "Weight": "Under 4 grams (barely noticeable on finger)",
            "Battery": "Up to 7 days continuous on a single 45-min wireless charge",
            "Water Resistance": "Water resistant up to 100m (safe for swimming)",
            "Compatibility": "iOS & Android health app synchronization"
        }
    },
    {
        _id: "prod-snx-013",
        name: "Shopnix Titan Pro 65W GaN Charger Station",
        tagline: "Ultra-compact 4-Port Fast Charger for Laptop & Phones",
        description: "Next-gen Gallium Nitride (GaN III) charging brick with 2x USB-C PD 3.0 ports and 2x USB-A QC 4.0 ports. Fast charges MacBook Pro, iPhone, and Android devices simultaneously with smart thermal temperature monitoring.",
        price: 3499,
        discount_price: 2199,
        category: "Accessories",
        stock: 60,
        is_featured: false,
        badge: "Essential",
        sizes: ["65W Multi-Port", "100W Multi-Port"],
        colors: ["Matte Cyber Black", "Pure White"],
        images: [
            { url: "https://images.unsplash.com/photo-1583863788434-e58a36330cf0?w=800&auto=format&fit=crop&q=80" }
        ],
        ratings: { average: 4.8, count: 310 },
        specs: {
            "Power Output": "65W Max Power Delivery 3.0 / PPS",
            "Ports": "2x USB-C (65W single port), 2x USB-A (30W max)",
            "Technology": "GaN III Semiconductor for 50% smaller size & cooler ops",
            "Protection": "Over-voltage, over-current, short-circuit, active thermal temp",
            "Input": "AC 100-240V 50/60Hz worldwide travel ready",
            "Included": "Includes 2-meter braided 100W e-mark Type-C to Type-C cable"
        }
    },
    {
        _id: "prod-snx-014",
        name: "Smart RoboClean Laser Robot Vacuum",
        tagline: "LiDAR Navigation with 5000Pa Suction & Sonic Mopping",
        description: "Intelligent autonomous robot vacuum and mop equipped with LDS laser radar mapping, 5000Pa hurricane suction, sonic vibration scrubbing, and carpet boost recognition with customizable no-go zones via the mobile app.",
        price: 34999,
        discount_price: 27999,
        category: "AI Devices",
        stock: 15,
        is_featured: false,
        badge: "Smart Home",
        sizes: ["Standard Cleaner", "Auto-Empty Dock Station"],
        colors: ["Obsidian Black", "Arctic White"],
        images: [
            { url: "https://images.unsplash.com/photo-1518640467707-6811f4a6ab73?w=800&auto=format&fit=crop&q=80" }
        ],
        ratings: { average: 4.7, count: 52 },
        specs: {
            "Suction Power": "5000Pa Turbo High-Efficiency Motor",
            "Navigation": "360-degree LiDAR laser scanner with multi-floor maps",
            "Mopping": "Sonic vibration mops vibrating at 3000 times/minute",
            "Battery": "5200mAh (cleans up to 2500 sq ft on single charge)",
            "Dustbin": "450ml dustbin + 200ml electronically controlled water tank",
            "Smart Home": "Works with Alexa, Google Assistant & Siri shortcuts"
        }
    },
    {
        _id: "prod-snx-015",
        name: "Shopnix CyberShield RFID Tech Sling Bag",
        tagline: "Waterproof Cordura Fabric with Built-in USB Charging",
        description: "Aerodynamic minimalist tech sling pack crafted with tear-proof 1000D Cordura ballistic nylon, waterproof YKK zippers, RFID-shielded card pockets, magnetic buckle clasp, and dedicated cushioned compartment for iPad and accessories.",
        price: 3999,
        discount_price: 2499,
        category: "Accessories",
        stock: 40,
        is_featured: false,
        badge: "Everyday Carry",
        sizes: ["8L Standard Sling", "12L Pro Sling"],
        colors: ["Stealth Black", "Cyber Heather Grey"],
        images: [
            { url: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=800&auto=format&fit=crop&q=80" }
        ],
        ratings: { average: 4.9, count: 189 },
        specs: {
            "Material": "1000D Ballistic Cordura with water-repellent coating",
            "Zippers": "Heavy-duty YKK Aquaguard weatherproof zips",
            "Storage": "Fits up to 11-inch iPad Pro, Nintendo Switch, passport & phone",
            "Security": "Hidden anti-theft back pocket with RFID signal blocker",
            "Strap": "Fidlock quick-release magnetic German buckle",
            "Pass-through": "External USB pass-through port for power bank"
        }
    },
    {
        _id: "prod-snx-016",
        name: "NeoGlow Smart Hexagon Light Panels (10-Pack)",
        tagline: "Modular Touch & Music-Sync RGBIC Wall Ambient Lights",
        description: "Transform your setup into a futuristic cyber battle station. Modular snap-together geometric LED panels with 16 million colors, gradient scene modes, music visualizer sync, and touch-sensitive interactive animation controls.",
        price: 7999,
        discount_price: 5299,
        category: "AI Devices",
        stock: 30,
        is_featured: false,
        badge: "Creator Setup",
        sizes: ["10 Panels Pack", "15 Panels Master Kit"],
        colors: ["RGBIC Gradient"],
        images: [
            { url: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=800&auto=format&fit=crop&q=80" }
        ],
        ratings: { average: 4.8, count: 140 },
        specs: {
            "Panels": "10x Hexagonal RGBIC LED interlocking light modules",
            "Color Tech": "Segmented RGBIC allows multiple colors simultaneously",
            "Music Sync": "Built-in high sensitivity microphone syncs to gaming audio",
            "Control": "Wi-Fi + BLE mobile app, touch surface, desktop app",
            "Mounting": "Tool-free damage-free 3M mounting tape included",
            "Compatibility": "Razer Chroma, Corsair iCUE, Alexa & Google Home"
        }
    },
    {
        _id: "prod-snx-017",
        name: "Shopnix Vision Pro AR Smart Glasses",
        tagline: "Micro-OLED Heads-Up HUD with Real-time AI Audio Translation",
        description: "Featherweight everyday smart eyewear featuring dual Micro-OLED 120Hz displays projecting a virtual 130-inch workspace. Features instantaneous voice translation in 40+ languages, open-ear directional stereo audio, and gesture controls.",
        price: 44999,
        discount_price: 36999,
        category: "Smart Devices",
        stock: 18,
        is_featured: true,
        badge: "AI Powered",
        sizes: ["Standard Fit", "Prescription Clip Edition"],
        colors: ["Matte Cyber Black", "Titanium Silver"],
        images: [
            { url: "https://images.unsplash.com/photo-1593508512255-86ab42a8e620?w=800&auto=format&fit=crop&q=80" },
            { url: "https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=800&auto=format&fit=crop&q=80" }
        ],
        ratings: { average: 4.9, count: 91 },
        specs: {
            "Display": "Dual Sony Micro-OLED 1080p per eye, 120Hz, 1800 nits",
            "Virtual Canvas": "Simulated 130-inch private high-definition cinema screen",
            "Audio": "Directional dual micro-speakers with privacy beamforming",
            "Weight": "76g ultra-light aero-magnesium alloy frame",
            "Battery": "5 hours continuous AR display, 48h standby",
            "Connectivity": "USB-C DisplayPort, Bluetooth 5.3 low energy"
        }
    },
    {
        _id: "prod-snx-018",
        name: "NeuroBand Sleep & Focus EEG Smart Headband",
        tagline: "Clinical-grade EEG Brainwave Tracking with Binaural Somno-Audio",
        description: "Breakthrough non-invasive neurofeedback smart headband engineered with gold-plated dry EEG electrodes. Analyzes real-time Delta, Theta, and Alpha brainwave patterns to induce restorative sleep and track deep REM cycles with adaptive soundscapes.",
        price: 19999,
        discount_price: 15499,
        category: "Smart Devices",
        stock: 22,
        is_featured: false,
        badge: "Biohacking",
        sizes: ["Flexible Adjustable Headband"],
        colors: ["Midnight Blue", "Stealth Carbon"],
        images: [
            { url: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800&auto=format&fit=crop&q=80" }
        ],
        ratings: { average: 4.8, count: 64 },
        specs: {
            "Sensors": "4x Dry EEG frontal sensors, PPG heart rate, 3D accelerometer",
            "Sound Engine": "Bone-conduction binaural acoustic beat induction",
            "Material": "Hypoallergenic breathable bamboo-silk fabric",
            "Battery": "14 hours continuous all-night sleep monitoring",
            "App": "NeuroSync iOS & Android dashboard with circadian insights"
        }
    },
    {
        _id: "prod-snx-019",
        name: "BioGlow Continuous Health & Fitness Band 2",
        tagline: "14-Day Battery Life with Non-Invasive Optical Biomarkers",
        description: "Sleek screenless minimalist fitness tracker encased in bead-blasted aerospace titanium. Continuously samples skin temperature, strain, HRV, sleep quality, and respiratory rate with medical-grade precision without annoying notifications.",
        price: 7999,
        discount_price: 5499,
        category: "Smart Devices",
        stock: 40,
        is_featured: false,
        badge: "Athlete Choice",
        sizes: ["S/M (130-175mm)", "M/L (165-210mm)"],
        colors: ["Cyber Black", "Solar Orange", "Neon Purple"],
        images: [
            { url: "https://images.unsplash.com/photo-1575311373937-040b8e1fd5b6?w=800&auto=format&fit=crop&q=80" }
        ],
        ratings: { average: 4.7, count: 118 },
        specs: {
            "Battery Life": "Up to 14 days on a single fast wireless slide-on charge",
            "Waterproofing": "10 ATM (100 meters dive & swim proof)",
            "Sensors": "Multi-wavelength 5-LED optical sensor array",
            "Strap": "Water-repellent ultra-stretch woven nylon with titanium clasp",
            "Sync": "Instant automatic sync with Apple Health & Google Health Connect"
        }
    },
    {
        _id: "prod-snx-020",
        name: "Apex Planar Magnetic Audiophile In-Ear Monitors",
        tagline: "14.5mm Ultra-thin Planar Diaphragm with OCC Silver-plated Cable",
        description: "Audiophile-certified in-ear monitors equipped with a 14.5mm sub-nanometer planar magnetic driver delivering electrostatic-like lightning treble, laser-tight sub-bass, and a massive holographic soundstage. CNC resin acoustic housing.",
        price: 17999,
        discount_price: 13499,
        category: "Audio",
        stock: 19,
        is_featured: false,
        badge: "Audiophile",
        sizes: ["0.78mm 2-Pin (3.5mm & 4.4mm Balanced Plugs)"],
        colors: ["Cosmic Nebula", "Smoked Obsidian"],
        images: [
            { url: "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=800&auto=format&fit=crop&q=80" }
        ],
        ratings: { average: 5.0, count: 83 },
        specs: {
            "Driver": "14.5mm Custom Planar Magnetic Transducer (N52 Neodymium)",
            "Frequency Response": "7Hz - 42,000Hz",
            "Impedance": "16 Ohms @ 1kHz (Easy to drive from phones & DACs)",
            "Cable": "High-purity monocrystalline silver-plated copper 8-core",
            "Tips": "Includes 6 pairs silicone + 3 pairs memory foam tips"
        }
    },
    {
        _id: "prod-snx-021",
        name: "Shopnix SonicBar Cyber 240W Dolby Atmos Soundbar",
        tagline: "5.1.2 Surround with Wireless Subwoofer & RGB Underglow",
        description: "Transform your living room into an IMAX theater. Features 9 high-output drivers with dedicated up-firing spatial height channels, wireless 8-inch deep bass subwoofer, 4K HDMI eARC pass-through, and customizable cyberpunk ambient LED underglow.",
        price: 31999,
        discount_price: 24999,
        category: "Audio",
        stock: 12,
        is_featured: true,
        badge: "Home Cinema",
        sizes: ["Soundbar + Wireless Sub Combo"],
        colors: ["Stealth Matte Black"],
        images: [
            { url: "https://images.unsplash.com/photo-1545454675-3531b543be5d?w=800&auto=format&fit=crop&q=80" }
        ],
        ratings: { average: 4.9, count: 97 },
        specs: {
            "Total Power": "240W RMS / 480W Peak Output",
            "Audio Tech": "Dolby Atmos, DTS:X, Spatial Sound Expansion",
            "Subwoofer": "8-inch down-firing wireless subwoofer (down to 28Hz)",
            "Ports": "HDMI eARC 2.1, Optical Audio, AUX 3.5mm, USB audio",
            "Wireless": "Bluetooth 5.3, Apple AirPlay 2, Spotify Connect"
        }
    },
    {
        _id: "prod-snx-022",
        name: "SoundSphere Levitating 360 Magnetic Speaker",
        tagline: "True Magnetic Levitation with 360° Omnidirectional Sound",
        description: "Futuristic magnetic levitation orb speaker that floats in mid-air above its glowing induction pedestal while spinning smoothly. Emits crystal-clear 360-degree spatial audio and features wireless charging directly through the magnetic field.",
        price: 15999,
        discount_price: 10999,
        category: "Audio",
        stock: 25,
        is_featured: false,
        badge: "Futuristic",
        sizes: ["Levitating Sphere + Base"],
        colors: ["Cyber Black / Neon Blue", "Arctic White / Purple Glow"],
        images: [
            { url: "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=800&auto=format&fit=crop&q=80" }
        ],
        ratings: { average: 4.8, count: 129 },
        specs: {
            "Levitation Height": "18mm stable magnetic floating clearance",
            "Acoustic Driver": "52mm neodymium dynamic driver with passive radiator",
            "Playtime": "Up to 12 hours playback (infinite on charging base)",
            "Lighting": "Breathing neon LED ring with 7 selectable glow moods",
            "Base Features": "Subwoofer base + 15W Qi phone fast charger on top"
        }
    },
    {
        _id: "prod-snx-023",
        name: "Shopnix NeoGrip Hall Effect Wireless Controller",
        tagline: "Zero-Drift Magnetic Hall Effect Sticks with Mechanical Triggers",
        description: "Pro esports gamepad equipped with electromagnetic Hall effect analog joysticks and triggers guaranteed for zero stick drift forever. Features microswitch mechanical ABXY buttons, 1000Hz wireless polling rate, and 4 programmable rear remappable paddles.",
        price: 5999,
        discount_price: 4199,
        category: "Gaming",
        stock: 35,
        is_featured: false,
        badge: "Zero Drift",
        sizes: ["Standard Pro Layout"],
        colors: ["Cyber Translucent Purple", "Stealth Black", "Frost White"],
        images: [
            { url: "https://images.unsplash.com/photo-1600080972464-8e5f35f63d08?w=800&auto=format&fit=crop&q=80" }
        ],
        ratings: { average: 4.9, count: 154 },
        specs: {
            "Sticks & Triggers": "Electromagnetic Hall Effect Sensors (Zero drift)",
            "Face Buttons": "Kailh mechanical switches with 0.3mm quick actuation",
            "Polling Rate": "1000Hz hyper-polling rate on 2.4GHz wireless & wired",
            "Vibration": "Dual asymmetric HD linear resonant haptic motors",
            "Compatibility": "PC, Steam Deck, Nintendo Switch, Android, iOS"
        }
    },
    {
        _id: "prod-snx-024",
        name: "CyberChair Ergonomic Lumbar Battle Throne",
        tagline: "Dynamic 4D Lumbar Spine Support with Breathable Carbon Mesh",
        description: "Heavy-duty ergonomic gaming & workstation chair crafted with dual-zone breathable carbon-fiber weave mesh, 4-directional self-adjusting lumbar spine tracker, magnetic memory foam neck pillow with cooling gel, and Class-4 explosion-proof pneumatic cylinder.",
        price: 26999,
        discount_price: 21999,
        category: "Gaming",
        stock: 10,
        is_featured: true,
        badge: "Ergonomic King",
        sizes: ["Standard (Up to 135kg)", "XL (Up to 160kg)"],
        colors: ["Obsidian Black / Cyber Violet", "Stealth Grey"],
        images: [
            { url: "https://images.unsplash.com/photo-1598550476439-6847785fcea6?w=800&auto=format&fit=crop&q=80" }
        ],
        ratings: { average: 4.9, count: 88 },
        specs: {
            "Frame": "Seamless 2mm robot-welded steel skeleton",
            "Mechanism": "Heavy-duty multi-tilt frog mechanism with 165° recline",
            "Armrests": "Full 4D metal-core armrests with magnetic swappable tops",
            "Mesh": "Kevlar-reinforced high-tensile breathable elastomeric mesh",
            "Warranty": "5 Years Structural Frame & Hydraulics Warranty"
        }
    },
    {
        _id: "prod-snx-025",
        name: "SkyScout Mini 4K Pocket Drone Combo",
        tagline: "Sub-249g Ultralight with 3-Axis 4K HDR True Vertical Camera",
        description: "Palm-sized folding camera drone under 249g requiring no DGCA permit registration for recreational flying. Features true 90-degree vertical camera rotation for Instagram & TikTok reels, 31-min flight time, and 10km HD video transmission.",
        price: 39999,
        discount_price: 32999,
        category: "Cameras",
        stock: 14,
        is_featured: false,
        badge: "Sub-249g",
        sizes: ["Pocket Combo (2 Batteries + Case)", "Standard Single Kit"],
        colors: ["Space White", "Cyber Titanium"],
        images: [
            { url: "https://images.unsplash.com/photo-1527977966376-1c8408f9f108?w=800&auto=format&fit=crop&q=80" }
        ],
        ratings: { average: 4.8, count: 119 },
        specs: {
            "Weight": "246 grams (Regulation compliant without permit)",
            "Camera": "1/1.3-inch 48MP CMOS sensor with f/1.7 large aperture",
            "Video": "4K HDR @ 60fps, 1080p @ 120fps Slow-mo, Vertical mode",
            "Flight Time": "Up to 31 minutes per intelligent flight battery",
            "Transmission": "10km stable anti-interference FHD video feed"
        }
    },
    {
        _id: "prod-snx-026",
        name: "Shopnix CineGimbal 3-Axis AI Smartphone Stabilizer",
        tagline: "Built-in AI Vision Tracker with Magnetic Bi-Color Fill Light",
        description: "Professional handheld smartphone gimbal equipped with standalone AI visual tracking sensor—tracks your face and body without needing an app or Bluetooth connection. Features 3-axis anti-shake motors, built-in extension selfie rod, and tripod legs.",
        price: 12999,
        discount_price: 8999,
        category: "Cameras",
        stock: 28,
        is_featured: false,
        badge: "Creator Essential",
        sizes: ["Stabilizer Pro Kit"],
        colors: ["Midnight Grey", "Cyber Violet"],
        images: [
            { url: "https://images.unsplash.com/photo-1589492477829-5e65395b66cc?w=800&auto=format&fit=crop&q=80" }
        ],
        ratings: { average: 4.7, count: 142 },
        specs: {
            "AI Tracking": "Autonomous vision hardware tracking chip (gesture activated)",
            "Lighting": "Magnetic bi-color RGB fill light with 3 brightness modes",
            "Extension": "215mm built-in aluminum alloy extension selfie stick",
            "Battery Life": "Up to 10 hours continuous shooting with phone charging",
            "Modes": "Inception 360, Dolly Zoom, Hitchcock effect, Timelapse"
        }
    },
    {
        _id: "prod-snx-027",
        name: "CyberNight NVG Infrared Tactical 4K Monocular",
        tagline: "850nm Starlight Night Vision with 1000m Detection & 4K Recording",
        description: "Military-inspired tactical digital night vision monocular equipped with ultra-sensitive starlight CMOS sensor, 850nm adjustable 7-level infrared illuminator, 8x digital zoom, and built-in 4K video recording with 1.5-inch IPS viewfinder.",
        price: 29999,
        discount_price: 22999,
        category: "Cameras",
        stock: 8,
        is_featured: true,
        badge: "Tactical Tech",
        sizes: ["Tactical Monocular Kit"],
        colors: ["Matte Armor Black"],
        images: [
            { url: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=800&auto=format&fit=crop&q=80" }
        ],
        ratings: { average: 4.9, count: 47 },
        specs: {
            "Sensor": "Ultra-low illumination Starlight CMOS sensor",
            "IR Illuminator": "3W 850nm infrared LED with 7 adjustment intensities",
            "Range": "Full pitch-black observation distance up to 1000 meters",
            "Recording": "4K Ultra-HD video with audio recording + 40MP photos",
            "Waterproofing": "IP66 weatherproof rubberized non-slip armor housing"
        }
    },
    {
        _id: "prod-snx-028",
        name: "HoloDesk 3D Holographic LED Fan Display",
        tagline: "High-Speed POV 3D Floating Holographic Video Projector",
        description: "Cast stunning 3D holographic animations floating mid-air with zero glasses required. Features a 52cm 4-blade high-speed rotating LED fan with 1024x1024 pixel resolution. Upload 3D logos, animations, and custom videos directly from your smartphone app.",
        price: 17999,
        discount_price: 12499,
        category: "AI Devices",
        stock: 16,
        is_featured: false,
        badge: "Showstopper",
        sizes: ["52cm Standard", "65cm Ultra"],
        colors: ["Cyber Black"],
        images: [
            { url: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=800&auto=format&fit=crop&q=80" }
        ],
        ratings: { average: 4.8, count: 68 },
        specs: {
            "Diameter": "52cm high-velocity 4-blade rotor (POV display)",
            "Resolution": "1024 x 1024 pixels with 2000cd/m² high brightness",
            "Content Support": "MP4, AVI, RMVB, GIF, JPG, PNG 3D animation files",
            "Control": "Wi-Fi mobile app (iOS & Android) + infrared remote control",
            "Safety": "Includes clear acrylic protective display cover & wall mount"
        }
    },
    {
        _id: "prod-snx-029",
        name: "PureAir Cyber Ionizing Smart Air Purifier",
        tagline: "Medical-Grade H13 HEPA with UV-C Sterilizer & OLED PM2.5 Monitor",
        description: "Industrial-grade air filtration in a cyberpunk monolith tower. Cleans up to 800 sq ft in 12 minutes using 5-stage medical HEPA H13, coconut shell activated carbon, UV-C germicidal light, and negative ion plasma generator. Real-time air quality OLED display.",
        price: 21999,
        discount_price: 15999,
        category: "AI Devices",
        stock: 20,
        is_featured: false,
        badge: "Health Tech",
        sizes: ["500 CADR Room Unit"],
        colors: ["Obsidian Black", "Cyber Grey"],
        images: [
            { url: "https://images.unsplash.com/photo-1585771724684-38269d6639fd?w=800&auto=format&fit=crop&q=80" }
        ],
        ratings: { average: 4.9, count: 104 },
        specs: {
            "CADR Rating": "500 m³/h (Cleans 800 sq ft room in under 12 minutes)",
            "Filtration": "5-Stage: Pre-filter, H13 HEPA, Active Carbon, UV-C, Ionizer",
            "Sensors": "Laser PM2.5 optical sensor + TVOC odor sensor + humidity",
            "Noise Level": "Ultra-silent 22dB sleep whisper mode with display dimming",
            "Smart Control": "Google Home, Amazon Alexa & Shopnix AI home app"
        }
    },
    {
        _id: "prod-snx-030",
        name: "MagPower Cyber 20000mAh Transparent Power Bank",
        tagline: "100W Dual-Directional PD Fast Charging with Smart IPS Screen",
        description: "Iconic cyberpunk transparent power bank showcasing internal gold capacitors, heatsinks, and circuit traces through scratch-proof crystal-clear casing. Delivers up to 100W PD charging to fast-charge laptops, phones, and tablets with real-time wattmeter.",
        price: 6499,
        discount_price: 4299,
        category: "Accessories",
        stock: 45,
        is_featured: true,
        badge: "Cyber Essential",
        sizes: ["20000mAh 100W Edition"],
        colors: ["Cyber Translucent Purple", "Smoked Transparent Gold"],
        images: [
            { url: "https://images.unsplash.com/photo-1609592807963-8a39ec867c42?w=800&auto=format&fit=crop&q=80" }
        ],
        ratings: { average: 4.9, count: 265 },
        specs: {
            "Capacity": "20,000mAh (74Wh airline cabin approved)",
            "Max Output": "100W Single Port PD 3.0 / PPS (Charges MacBook 0-50% in 30m)",
            "Display": "Full-color IPS screen showing volts, amps, watts & battery temp",
            "Ports": "2x USB-C (100W IN/OUT), 1x USB-A (22.5W Fast Charge)",
            "Safety": "Dual thermal sensors with 12-layer hardware safety protection"
        }
    },
    {
        _id: "prod-snx-031",
        name: "NexaDock Thunderbolt 4 14-in-1 Dual 4K Docking Station",
        tagline: "40Gbps Intel Goshen Ridge Chip with 100W Laptop Power Delivery",
        description: "Ultimate all-in-one desktop expansion hub powered by official Intel Thunderbolt 4 controller. Connects dual 4K@60Hz or single 8K displays, gigabit Ethernet, UHS-II SD card readers, and 4 high-speed USB ports through a single braided cable to your laptop.",
        price: 18999,
        discount_price: 14499,
        category: "Accessories",
        stock: 15,
        is_featured: false,
        badge: "Workstation Pro",
        sizes: ["14-in-1 Desktop Hub"],
        colors: ["Space Anodized Aluminium"],
        images: [
            { url: "https://images.unsplash.com/photo-1583863788434-e58a36330cf0?w=800&auto=format&fit=crop&q=80" }
        ],
        ratings: { average: 4.8, count: 74 },
        specs: {
            "Bandwidth": "40Gbps bidirectional Thunderbolt 4 speed",
            "Video Output": "Dual 4K @ 60Hz or Single 8K @ 30Hz via DP 1.4 & TB4",
            "Host Charging": "100W Upstream Power Delivery (charges MacBook / ThinkPad)",
            "Ports": "3x TB4, 4x USB-A 3.2 (10Gbps), Gigabit RJ45, SD/microSD 4.0, 3.5mm",
            "Enclosure": "Passive-cooling solid CNC aluminum heatsink chassis"
        }
    },
    {
        _id: "prod-snx-032",
        name: "CyberTek Waterproof Techwear Utility Trenchcoat",
        tagline: "3-Layer Waterproof eVent Fabric with Fidlock Magnetic Straps",
        description: "Futuristic dystopian cyberpunk techwear trenchcoat tailored from waterproof, windproof, and breathable 3-layer laminated fabric. Features 12 concealed pockets, Fidlock magnetic modular cross-body straps, storm hood, and reflective cyberpunk accents.",
        price: 15999,
        discount_price: 11499,
        category: "Apparel",
        stock: 20,
        is_featured: true,
        badge: "Techwear",
        sizes: ["M", "L", "XL", "XXL"],
        colors: ["Stealth Matte Black", "Cyber Shadow Grey"],
        images: [
            { url: "https://images.unsplash.com/photo-1544022613-e87ca75a784a?w=800&auto=format&fit=crop&q=80" },
            { url: "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=800&auto=format&fit=crop&q=80" }
        ],
        ratings: { average: 4.9, count: 96 },
        specs: {
            "Fabric": "3-Layer Technical eVent Laminated Membrane (20,000mm waterproof)",
            "Zippers": "YKK AquaGuard waterproof seam-sealed zippers throughout",
            "Hardware": "German Fidlock V-buckle magnetic quick-release chest harness",
            "Pockets": "12 multi-functional pockets with RFID-shielded gadget pouch",
            "Care": "Machine washable on gentle cold cycle"
        }
    },
    {
        _id: "prod-snx-033",
        name: "NeonMatrix Programmable LED Cyber Hoodie",
        tagline: "Integrated 16x16 RGB LED Pixel Matrix with Bluetooth App Control",
        description: "Heavyweight 420 GSM fleece cyberpunk streetwear hoodie featuring a flexible, water-sealed front 16x16 RGB LED matrix panel. Draw pixel art, text animations, equalizers, and scrolling messages live directly from the companion smartphone app.",
        price: 9499,
        discount_price: 6999,
        category: "Apparel",
        stock: 28,
        is_featured: true,
        badge: "Viral Edition",
        sizes: ["S", "M", "L", "XL", "XXL"],
        colors: ["Cyber Black", "Deep Violet"],
        images: [
            { url: "https://images.unsplash.com/photo-1556905055-8f358a7a47b2?w=800&auto=format&fit=crop&q=80" }
        ],
        ratings: { average: 4.8, count: 135 },
        specs: {
            "LED Display": "Flexible 16x16 full-color RGB LED matrix (256 pixels)",
            "Power": "Runs on any standard 5V USB power bank in the interior pocket",
            "Control": "Bluetooth iOS & Android app with custom drawing & music visualizer",
            "Fabric": "420 GSM ultra-heavyweight combed organic cotton fleece",
            "Washing": "Detachable LED panel allows 100% standard machine washing"
        }
    }
];

export const DEMO_USERS = {
    customer: {
        _id: "user-demo-customer-101",
        first_name: "Aman",
        last_name: "Verma",
        email: "customer@shopnix.in",
        phone: "+91 8607603050",
        role: "customer",
        gender: "male",
        pincode: "136027",
        profile_img: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=200&auto=format&fit=crop&q=80",
        address_list: [
            {
                _id: "addr-001",
                street: "Flat 402, Cyber Tower, Sector 14",
                city: "Kaithal",
                state: "Haryana",
                country: "India",
                pincode: "136027",
                phone: "+91 8607603050",
                address_type: "home",
                is_default: true
            },
            {
                _id: "addr-002",
                street: "Shop 12, Tech Innovation Center",
                city: "Gurugram",
                state: "Haryana",
                country: "India",
                pincode: "122002",
                phone: "+91 9876543210",
                address_type: "office",
                is_default: false
            }
        ]
    },
    admin: {
        _id: "user-demo-admin-999",
        first_name: "Shopnix",
        last_name: "Administrator",
        email: "admin@shopnix.in",
        phone: "+91 8607603050",
        role: "admin",
        gender: "male",
        pincode: "136027",
        profile_img: "https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?w=200&auto=format&fit=crop&q=80",
        address_list: [
            {
                _id: "addr-admin-01",
                street: "Headquarters, Shopnix Tech Campus",
                city: "Kaithal",
                state: "Haryana",
                country: "India",
                pincode: "136027",
                phone: "+91 8607603050",
                address_type: "office",
                is_default: true
            }
        ]
    }
};

export const INITIAL_ORDERS = [
    {
        _id: "SNX-ORD-98241",
        created_at: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
        order_status: "Shipped",
        payment_status: "Paid",
        payment_method: "UPI",
        total_amount: 25498,
        tracking_number: "DELHIVERY-SNX-98241",
        shipping_partner: "Delhivery Express Surface",
        estimated_delivery: "Within 2 Days",
        shipping_address: {
            street: "Flat 402, Cyber Tower, Sector 14",
            city: "Kaithal",
            state: "Haryana",
            country: "India",
            pincode: "136027",
            phone: "+91 8607603050"
        },
        items: [
            {
                product: "prod-snx-001",
                name: "Shopnix Quantum Ultra Smart Watch",
                price: 18999,
                quantity: 1,
                size: "45mm",
                color: "Titanium Silver",
                image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600"
            },
            {
                product: "prod-snx-002",
                name: "Shopnix Pulse ANC Wireless Earbuds",
                price: 6499,
                quantity: 1,
                size: "Standard Fit",
                color: "Neon Violet",
                image: "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=600"
            }
        ]
    },
    {
        _id: "SNX-ORD-77190",
        created_at: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
        order_status: "Delivered",
        payment_status: "Paid",
        payment_method: "Card",
        total_amount: 8499,
        tracking_number: "BLUEDART-SNX-77190",
        shipping_partner: "BlueDart Air Express",
        estimated_delivery: "Delivered on Monday",
        shipping_address: {
            street: "Flat 402, Cyber Tower, Sector 14",
            city: "Kaithal",
            state: "Haryana",
            country: "India",
            pincode: "136027",
            phone: "+91 8607603050"
        },
        items: [
            {
                product: "prod-snx-007",
                name: "Vortex Mech 87 RGB Wireless Keyboard",
                price: 8499,
                quantity: 1,
                size: "Tenkeyless (87 Key)",
                color: "Cyberpunk Violet",
                image: "https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=600"
            }
        ]
    }
];

export const VALID_COUPONS = {
    "SHOPNIX20": { code: "SHOPNIX20", percent: 20, description: "20% Flat Discount on all items" },
    "WELCOME10": { code: "WELCOME10", percent: 10, description: "10% First Order Welcome Discount" },
    "FREESHIP": { code: "FREESHIP", freeShipping: true, description: "Free Express Shipping Nationwide" }
};

// Initializer for localStorage to ensure items are always seeded
export const initShopnixStore = () => {
    try {
        if (!localStorage.getItem(STORAGE_KEYS.PRODUCTS)) {
            localStorage.setItem(STORAGE_KEYS.PRODUCTS, JSON.stringify(INITIAL_PRODUCTS));
        }
        if (!localStorage.getItem(STORAGE_KEYS.ORDERS)) {
            localStorage.setItem(STORAGE_KEYS.ORDERS, JSON.stringify(INITIAL_ORDERS));
        }
        if (!localStorage.getItem(STORAGE_KEYS.WISHLIST)) {
            // Seed 2 initial wishlist items for immediate visual feedback
            const initialWishlist = [INITIAL_PRODUCTS[0], INITIAL_PRODUCTS[1]];
            localStorage.setItem(STORAGE_KEYS.WISHLIST, JSON.stringify(initialWishlist));
        }
        if (!localStorage.getItem(STORAGE_KEYS.USERS)) {
            localStorage.setItem(STORAGE_KEYS.USERS, JSON.stringify(DEMO_USERS));
        }
    } catch (e) {
        console.warn("Storage init warning:", e);
    }
};

// Execute initialization once
initShopnixStore();

// Storage helper functions
export const getStoredProducts = () => {
    try {
        const data = localStorage.getItem(STORAGE_KEYS.PRODUCTS);
        return data ? JSON.parse(data) : INITIAL_PRODUCTS;
    } catch {
        return INITIAL_PRODUCTS;
    }
};

export const saveStoredProducts = (products) => {
    try {
        localStorage.setItem(STORAGE_KEYS.PRODUCTS, JSON.stringify(products));
    } catch (e) {
        console.error("Save products error:", e);
    }
};

export const getStoredWishlist = () => {
    try {
        const data = localStorage.getItem(STORAGE_KEYS.WISHLIST);
        return data ? JSON.parse(data) : [];
    } catch {
        return [];
    }
};

export const saveStoredWishlist = (wishlist) => {
    try {
        localStorage.setItem(STORAGE_KEYS.WISHLIST, JSON.stringify(wishlist));
    } catch (e) {
        console.error("Save wishlist error:", e);
    }
};

export const getStoredOrders = () => {
    try {
        const data = localStorage.getItem(STORAGE_KEYS.ORDERS);
        return data ? JSON.parse(data) : INITIAL_ORDERS;
    } catch {
        return INITIAL_ORDERS;
    }
};

export const saveStoredOrders = (orders) => {
    try {
        localStorage.setItem(STORAGE_KEYS.ORDERS, JSON.stringify(orders));
    } catch (e) {
        console.error("Save orders error:", e);
    }
};

export const createLocalOrder = (orderData) => {
    const orders = getStoredOrders();
    const newOrder = {
        _id: `SNX-ORD-${Math.floor(10000 + Math.random() * 90000)}`,
        created_at: new Date().toISOString(),
        order_status: "Processing",
        payment_status: orderData.payment_method === "COD" ? "Pending" : "Paid",
        payment_method: orderData.payment_method || "COD",
        total_amount: orderData.total_amount,
        tracking_number: `DELHIVERY-SNX-${Math.floor(10000 + Math.random() * 90000)}`,
        shipping_partner: "Delhivery FastTrack Air",
        estimated_delivery: "Within 3-4 Days",
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
