import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, useScroll, useTransform, useSpring } from 'framer-motion';
import emailjs from '@emailjs/browser';
import {
    MapPin,
    Clock,
    Phone,
    Calendar,
    Users,
    User,
    Utensils,
    X,
    ArrowRight,
    Map,
    ExternalLink,
    ChevronDown,
    ChevronUp,
    Instagram,
    Twitter,
    Facebook
} from 'lucide-react';

// --- Framer Motion Shared Configurations ---

const springConfig = { type: "spring", stiffness: 300, damping: 25 };

const staggerContainer = {
    hidden: { opacity: 0 },
    show: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1,
            delayChildren: 0.1
        }
    }
};

const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    show: { opacity: 1, y: 0, transition: springConfig }
};

const revealText = {
    hidden: { opacity: 0, y: "150%" },
    show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } }
};

// --- Components ---

const Navbar = ({ onReserve }) => {
    const [scrolled, setScrolled] = useState(false);
    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 20);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const navLinks = [
        { name: 'Menu', href: '#menu' },
        { name: 'About', href: '#about' },
        { name: 'Gallery', href: '#gallery' },
        { name: 'Location', href: '#location' }
    ];

    return (
        <nav className={`fixed top-0 w-full z-50 transition-all duration-500 ${scrolled ? 'bg-white/80 backdrop-blur-2xl border-b border-gray-200/50 py-3 shadow-sm' : 'bg-transparent py-6'
            }`}>
            <div className="container mx-auto px-6 md:px-12 flex justify-between items-center">
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={springConfig}
                    className="flex items-center gap-2 cursor-pointer"
                >
                    <span className={`text-2xl font-bold tracking-tight transition-colors duration-500 ${scrolled ? 'text-[#1D1D1F]' : 'text-white'}`}>
                        Lumina.
                    </span>
                </motion.div>

                <div className="hidden md:flex space-x-10 items-center">
                    {navLinks.map((link, i) => (
                        <motion.a
                            key={link.name}
                            href={link.href}
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.1, ...springConfig }}
                            className={`text-sm font-medium transition-colors relative group ${scrolled ? 'text-[#86868B] hover:text-[#1D1D1F]' : 'text-white/80 hover:text-white'}`}
                        >
                            {link.name}
                            <span className={`absolute -bottom-1 left-0 w-0 h-[2px] transition-all duration-300 group-hover:w-full rounded-full ${scrolled ? 'bg-[#1D1D1F]' : 'bg-white'}`} />
                        </motion.a>
                    ))}
                    <motion.button
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        transition={springConfig}
                        onClick={onReserve}
                        className={`px-6 py-2.5 text-sm font-semibold rounded-full transition-all shadow-lg ${scrolled ? 'bg-[#1D1D1F] text-white hover:bg-black' : 'bg-white text-black hover:bg-white/90'}`}
                    >
                        Reserve
                    </motion.button>
                </div>

                <div className="md:hidden">
                    <motion.button
                        whileTap={{ scale: 0.9 }}
                        onClick={onReserve}
                        className={`px-4 py-2 text-sm font-medium rounded-full shadow-md ${scrolled ? 'bg-[#1D1D1F] text-white' : 'bg-white text-black'}`}
                    >
                        Reserve
                    </motion.button>
                </div>
            </div>
        </nav>
    );
};

const Hero = ({ onReserve }) => {
    const { scrollY } = useScroll();

    // Spring physics for smooth parallax
    const smoothY = useSpring(scrollY, { damping: 30, stiffness: 200 });

    const y1 = useTransform(smoothY, [0, 800], [0, 250]);
    const opacity = useTransform(scrollY, [0, 400], [1, 0]);
    const scale = useTransform(smoothY, [0, 400], [1, 0.95]);

    return (
        <section className="relative pt-32 pb-20 md:pt-48 md:pb-32 px-6 md:px-12 h-screen flex flex-col justify-center overflow-hidden bg-black">
            {/* Full High-Res Background Image */}
            <div className="absolute inset-0 z-0 h-full w-full overflow-hidden">
                <motion.img
                    initial={{ scale: 1.1 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 1.5, ease: "easeOut" }}
                    src="https://images.unsplash.com/photo-1559339352-11d035aa65de?auto=format&fit=crop&q=80&w=2000"
                    className="w-full h-full object-cover opacity-60"
                    alt="Cafe Interior"
                />
                {/* Gradient overlay for better text contrast */}
                <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/20 to-[#F5F5F7]" />
            </div>

            <motion.div style={{ willChange: "transform, opacity", y: y1, opacity, scale }} className="text-center z-10 relative max-w-7xl mx-auto -mt-20">
                <div className="overflow-hidden inline-block mb-3">
                    <motion.div
                        initial="hidden"
                        animate="show"
                        variants={{
                            hidden: { opacity: 0 },
                            show: { opacity: 1, transition: { staggerChildren: 0.1 } }
                        }}
                    >
                        <motion.h1 className="text-6xl md:text-[7rem] lg:text-[8.5rem] font-extrabold tracking-tighter text-white leading-[1.05] drop-shadow-2xl">
                            <motion.span variants={revealText} className="block">Taste the</motion.span>
                            <motion.span variants={revealText} className="block text-white/80">extraordinary.</motion.span>
                        </motion.h1>
                    </motion.div>
                </div>

                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.4, ...springConfig }}
                    className="mt-6 md:mt-10 text-xl md:text-3xl text-white/90 max-w-3xl mx-auto font-medium tracking-tight drop-shadow-lg"
                >
                    A Premium sensory experience in the heart of the city. Seamlessly blending art, space, and flavor.
                </motion.p>

                <motion.button
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.5, ...springConfig }}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={onReserve}
                    className="mt-10 md:mt-14 inline-block px-10 py-4 bg-white text-[#1D1D1F] text-lg font-bold rounded-full shadow-[0_10px_30px_rgba(255,255,255,0.2)] hover:shadow-[0_15px_40px_rgba(255,255,255,0.3)] transition-all mx-auto"
                >
                    Secure a Reservation
                </motion.button>
            </motion.div>
        </section>
    );
};

const MenuSection = () => {
    const [activeCategory, setActiveCategory] = useState('Reserve Brews');
    const [showAll, setShowAll] = useState(false);

    const categories = ['Reserve Brews', 'High Tea', 'Gourmet Brunch', 'Artisanal Pastries', 'Exclusive Desserts', 'Cold Infusions'];

    const menuData = {
        'Reserve Brews': [
            { name: "Ethiopian Yirgacheffe", price: "₹650", desc: "Floral notes with a bright, citrusy acidity and a clean finish. Sourced directly from single-estate farms.", img: "https://images.unsplash.com/photo-1497935586351-b67a49e012bf?sig=1" },
            { name: "Panama Geisha Pour-over", price: "₹1200", desc: "The world's most exclusive coffee, featuring delicate jasmine aroma and sweet tropical fruit flavors.", img: "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?sig=2" },
            { name: "Colombian Supremo", price: "₹550", desc: "Medium-bodied with a rich, nutty flavor profile and subtle hints of dark chocolate.", img: "https://images.unsplash.com/photo-1559525839-b184a4d698c7?sig=3" },
            { name: "Madagascar Vanilla Latte", price: "₹750", desc: "Double espresso pulled over house-made Madagascar vanilla bean syrup and velvety micro-foam.", img: "https://images.unsplash.com/photo-1541167760496-1628856ab772?sig=4" },
            { name: "Guatemalan Antigua", price: "₹600", desc: "Complex and spicy, grown in volcanic soil offering notes of cocoa and crisp green apple.", img: "https://images.unsplash.com/photo-1588195538326-c5b1e9f6f5b4?sig=5" },
            { name: "Himalayan Honey Cortado", price: "₹650", desc: "Equal parts espresso and steamed milk, sweetened perfectly with rare raw Himalayan honey.", img: "https://images.unsplash.com/photo-1512568400610-62da28bc8a13?sig=6" },
            { name: "Smoked Butterscotch Mocha", price: "₹800", desc: "Artisanal dark chocolate paired with smoked butterscotch, finished with a sea salt dusting.", img: "https://images.unsplash.com/photo-1572442388796-11668a67e53d?sig=7" },
            { name: "Kona Peaberry Espresso", price: "₹950", desc: "A rare Hawaiian bean yielding an intensely smooth, sweet, and robust double espresso shot.", img: "https://images.unsplash.com/photo-1510591509098-f4fdc6d0fd24?sig=8" },
            { name: "Aged Sumatra Mandheling", price: "₹700", desc: "Earthy, full-bodied coffee with low acidity and distinct notes of cedar and sweet tobacco.", img: "https://images.unsplash.com/photo-1498603536246-15572faa67a6?sig=9" },
            { name: "Signature 24k Gold Cappuccino", price: "₹1500", desc: "Our darkest reserve roast, beautifully textured with steamed oat milk and adorned with edible 24k gold leaf.", img: "https://images.unsplash.com/photo-1534687941688-1b2286e92f28?sig=10" }
        ],
        'High Tea': [
            { name: "Darjeeling First Flush", price: "₹750", desc: "The 'Champagne of Teas', featuring a delicate muscatel flavor and a bright, golden liquor.", img: "https://images.unsplash.com/photo-1576092762791-dd9e222040d3?sig=11" },
            { name: "Imperial Matcha Ceremony", price: "₹1100", desc: "Ceremonial grade Uji matcha, whisked to perfection and served in traditional artisan stoneware.", img: "https://images.unsplash.com/photo-1515823662972-da6a2e4d3002?sig=12" },
            { name: "Silver Needle White Tea", price: "₹850", desc: "Rare top buds only, naturally sun-dried to preserve a subtle, sweet, and incredibly smooth floral finish.", img: "https://images.unsplash.com/photo-1544787219-7f47ccb76574?sig=13" },
            { name: "Earl Grey Reserve", price: "₹650", desc: "Premium black tea infused with authentic cold-pressed Calabrian bergamot oil and blue cornflowers.", img: "https://images.unsplash.com/photo-1594631252845-29fc4cc8cbf9?sig=14" },
            { name: "Jasmine Dragon Pearls", price: "₹900", desc: "Hand-rolled green tea leaves scented with fresh jasmine blossoms that beautifully unfurl in your cup.", img: "https://images.unsplash.com/photo-1558160074-4d7d8bdf4256?sig=15" },
            { name: "Rooibos Vanilla Bourbon", price: "₹700", desc: "A caffeine-free South African red bush tea blended with rich Madagascar vanilla and a hint of oak.", img: "https://images.unsplash.com/photo-1563822249548-9a72b6353cd1?sig=16" },
            { name: "Oolong Tie Guan Yin", price: "₹800", desc: "An 'Iron Goddess' oolong offering a complex profile of roasted nuts, fresh orchids, and sweet honey.", img: "https://images.unsplash.com/photo-1597481499750-3a25121b6d91?sig=17" },
            { name: "Himalayan Chamomile", price: "₹650", desc: "Whole golden chamomile blossoms delivering a profoundly soothing, sweet, and apple-like tasting note.", img: "https://images.unsplash.com/photo-1599598425947-33002621ecf4?sig=18" },
            { name: "Artisan Masala Chai", price: "₹600", desc: "A robust Assam black tea simmered with freshly ground cardamom, clove, ginger, and star anise.", img: "https://images.unsplash.com/photo-1578328731114-6fd6a81a4eb8?sig=19" },
            { name: "Ruby Rose Petal Infusion", price: "₹850", desc: "A caffeine-free blend of Moroccan rose petals and hibiscus, yielding a tart, refreshing, and ruby-red cup.", img: "https://images.unsplash.com/photo-1558160074-ce4ceb6bdeaa?sig=20" }
        ],
        'Gourmet Brunch': [
            { name: "Truffle Avocado Toast", price: "₹850", desc: "Sourdough batard topped with smashed Hass avocado, micro-greens, poached egg, and white truffle oil.", img: "https://images.unsplash.com/photo-1525351484163-470eebfded9e?sig=21" },
            { name: "Lobster Eggs Benedict", price: "₹1800", desc: "Butter-poached lobster tail on toasted brioche with perfectly poached organic eggs and saffron hollandaise.", img: "https://images.unsplash.com/photo-1608039829572-78524f79c4c7?sig=22" },
            { name: "Wagyu Steak & Eggs", price: "₹2400", desc: "A5 Grade Wagyu striploin served with sunny-side-up quail eggs and robust rosemary fingerling potatoes.", img: "https://images.unsplash.com/photo-1544025162-8e12d5cd5d0b?sig=23" },
            { name: "Smoked Salmon Tartine", price: "₹1100", desc: "Norwegian smoked salmon, dill cream cheese, capers, and pickled shallots on artisan rye bread.", img: "https://images.unsplash.com/photo-1525351326368-efbb5cb6814d?sig=24" },
            { name: "Ricotta Lemon Pancakes", price: "₹750", desc: "Fluffy ricotta hotcakes infused with lemon zest, topped with fresh berries and pure maple syrup.", img: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?sig=25" },
            { name: "Wild Mushroom Frittata", price: "₹800", desc: "Farm-fresh eggs folded with seasonal wild mushrooms, gruyere cheese, and a hint of fresh thyme.", img: "https://images.unsplash.com/photo-1588195538326-c5b1e9f6f5b4?sig=26" },
            { name: "Caviar & Blinis", price: "₹3200", desc: "Premium Beluga caviar served with traditional buckwheat blinis, crême fraîche, and chives.", img: "https://images.unsplash.com/photo-1555507036-ab1e4001da61?sig=27" },
            { name: "Brioche French Toast", price: "₹850", desc: "Thick-cut brioche soaked in vanilla custard, pan-seared and topped with caramelized bananas and pecans.", img: "https://images.unsplash.com/photo-1484723091791-0f73df9978db?sig=28" },
            { name: "Duck Confit Hash", price: "₹1400", desc: "Slow-cooked duck leg over crispy root vegetables, topped with a duck egg and whole grain mustard sauce.", img: "https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?sig=29" },
            { name: "Quinoa Superfood Bowl", price: "₹950", desc: "Organic tri-color quinoa, roasted sweet potatoes, kale, pomegranate seeds, and a tahini-lemon dressing.", img: "https://images.unsplash.com/photo-1490645935967-10de6ba17061?sig=30" }
        ],
        'Artisanal Pastries': [
            { name: "Butter Croissant", price: "₹350", desc: "A classic French crescent, boasting 27 layers of Isigny Ste-Mère butter for an incredibly flaky crust.", img: "https://images.unsplash.com/photo-1509365465994-3e2125f5ee26?sig=31" },
            { name: "Pain au Chocolat", price: "₹450", desc: "Our signature laminated dough enveloping two generous batons of rich, 70% dark Valrhona chocolate.", img: "https://images.unsplash.com/photo-1621236378699-8597fc6a195b?sig=32" },
            { name: "Almond Twice-Baked Croissant", price: "₹550", desc: "Filled with luscious almond frangipane, topped with toasted flaked almonds and a dusting of snow sugar.", img: "https://images.unsplash.com/photo-1616172778734-7097945db47a?sig=33" },
            { name: "Raspberry Rose Cruffin", price: "₹600", desc: "A hybrid croissant-muffin, piped full of a delicate raspberry coulis and rosewater-infused cream.", img: "https://images.unsplash.com/photo-1587314168485-3236d6e71954?sig=34" },
            { name: "Pistachio Escargot", price: "₹500", desc: "Spiral-shaped pastry layered with a rich, nutty pistachio cream and scattered with crushed Iranian pistachios.", img: "https://images.unsplash.com/photo-1605807646983-377bc5a7644e?sig=35" },
            { name: "Classic French Canelé", price: "₹300", desc: "A specialty of Bordeaux with a deeply caramelized, crisp exterior and a soft, rum-vanilla custard center.", img: "https://images.unsplash.com/photo-1550617931-e17a7b70dce2?sig=36" },
            { name: "Kouign-Amann", price: "₹600", desc: "A Breton cake with layers of butter and sugar folded in, baked until impeccably crunchy and caramelized.", img: "https://images.unsplash.com/photo-1612204079893-9c8a00b21238?sig=37" },
            { name: "Blueberry Lemon Danise", price: "₹450", desc: "A crisp pastry crown holding a tart lemon curd topped with fresh, wild blueberries and glacé icing.", img: "https://images.unsplash.com/photo-1605493725798-25091c0fffa4?sig=38" },
            { name: "Matcha White Chocolate Scone", price: "₹400", desc: "A buttery scone infused with Uji matcha and studded with Belgian white chocolate chunks.", img: "https://images.unsplash.com/photo-1504936357997-e8dbd809a7b9?sig=39" },
            { name: "Gourmet Macaron Assortment", price: "₹950", desc: "A box of six exquisite macarons including flavors like salted caramel, lavender, and passionfruit.", img: "https://images.unsplash.com/photo-1569864358642-9d1684040f43?sig=40" }
        ],
        'Exclusive Desserts': [
            { name: "Gold Leaf Opera Cake", price: "₹1200", desc: "Layers of almond sponge soaked in coffee syrup, chocolate ganache, and coffee buttercream, topped with gold.", img: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?sig=41" },
            { name: "Madagascar Vanilla Bean Tart", price: "₹950", desc: "A delicate shortcrust pastry shell filled with an impossibly smooth, intensely vanilla-rich velvety custard.", img: "https://images.unsplash.com/photo-1495147466023-fa5c96626c28?sig=42" },
            { name: "Valrhona Chocolate Soufflé", price: "₹1400", desc: "Baked to order. A towering, cloud-like dark chocolate soufflé served with a side of crème anglaise.", img: "https://images.unsplash.com/photo-1549448881-30de9bfdc0e5?sig=43" },
            { name: "Deconstructed Lemon Meringue", price: "₹1100", desc: "Zesty lemon curd spheres, toasted meringue shards, and a buttery biscuit crumble with micro basil.", img: "https://images.unsplash.com/photo-1601002573617-1f488667b9de?sig=44" },
            { name: "Hazelnut Praline Mille-Feuille", price: "₹1300", desc: "A thousand leaves of shattered pastry layered with Piedmont hazelnut praline mousseline.", img: "https://images.unsplash.com/photo-1550302396-419b4eaf54d6?sig=45" },
            { name: "Matcha Tiramisu", price: "₹1050", desc: "Our Asian twist on the Italian classic, using ceremonial matcha, mascarpone, and ladyfingers.", img: "https://images.unsplash.com/photo-1587314168485-3236d6e71954?sig=46" },
            { name: "Raspberry Lychee Rose Entremet", price: "₹1450", desc: "A mirror-glazed dome consisting of lychee mousse, a raspberry insert, and an almond dacquoise base.", img: "https://images.unsplash.com/photo-1588195538326-c5b1e9f6f5b4?sig=47" },
            { name: "Caramelized Fig Pavlova", price: "₹1150", desc: "A crisp marshmallowy meringue crowned with whipped vanilla cream, fresh roasted figs, and balsamic glaze.", img: "https://images.unsplash.com/photo-1563714193581-344405ef7d66?sig=48" },
            { name: "Saffron & RoseWater Panna Cotta", price: "₹900", desc: "A delicate, wobbling Italian cream dessert elevated with Persian saffron and a pistachio crumb.", img: "https://images.unsplash.com/photo-1550965027-e4bb1d5300be?sig=49" },
            { name: "Triple Chocolate Lava Cake", price: "₹1500", desc: "A molten center of intense dark, milk, and white chocolates, served with house-spun Tahitian vanilla gelato.", img: "https://images.unsplash.com/photo-1624353365286-3f8d62daad51?sig=50" }
        ],
        'Cold Infusions': [
            { name: "Nitro Cold Brew", price: "₹550", desc: "Our signature blend, steeped for 24 hours and infused with nitrogen for a creamy, stout-like texture.", img: "https://images.unsplash.com/photo-1461023058943-07fcbe16d735?sig=51" },
            { name: "Lavender Lemonade Tonic", price: "₹650", desc: "Freshly squeezed lemons muddled with house-made lavender syrup and topped with sparkling tonic water.", img: "https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?sig=52" },
            { name: "Watermelon Mint Agua Fresca", price: "₹600", desc: "Cold-pressed watermelon juice lightly blended with fresh mint leaves and a hint of organic agave.", img: "https://images.unsplash.com/photo-1556679343-c7306c1976bc?sig=53" },
            { name: "Iced Kyoto Matcha Latte", price: "₹850", desc: "Vibrant ceremonial grade matcha poured over iced oat milk, lightly sweetened with pure maple.", img: "https://images.unsplash.com/photo-1536935338788-846bb9981813?sig=54" },
            { name: "Hibiscus & Passionflower Iced Tea", price: "₹700", desc: "A tart, ruby-red infusion of hibiscus blossoms, passionflower extracts, and sliced Florida oranges.", img: "https://images.unsplash.com/photo-1558160074-ce4ceb6bdeaa?sig=55" },
            { name: "Yuzu Espresso Spritz", price: "₹800", desc: "A bright and effervescent mix of double espresso, Japanese yuzu citrus juice, and sparkling soda water.", img: "https://images.unsplash.com/photo-1595981267035-7b04d84b50ad?sig=56" },
            { name: "Coconut Water Cascara", price: "₹650", desc: "Refreshing coffee cherry tea (cascara) steeped directly in pure, young Thai coconut water.", img: "https://images.unsplash.com/photo-1521305417409-9f7eeebf3a38?sig=57" },
            { name: "Peach & Basil Iced Oolong", price: "₹750", desc: "Cold-brewed Taiwanese oolong tea gently shaken with white peach purée and ripped fresh Italian basil.", img: "https://images.unsplash.com/photo-1556679343-c7306c1976bc?sig=58" },
            { name: "Blue Butterfly Pea Latte", price: "₹900", desc: "An enchanting caffeine-free iced latte that changes color, featuring butterfly pea flower and vanilla almond milk.", img: "https://images.unsplash.com/photo-1544145945-f90425340c7e?sig=59" },
            { name: "Signature Iced Mocha", price: "₹850", desc: "Double espresso and melted Gianduja chocolate shaken vigorously with milk and ice until perfectly frothy.", img: "https://images.unsplash.com/photo-1517701550927-30cf4ba1dba5?sig=60" }
        ]
    };

    const currentItems = menuData[activeCategory] || [];
    const displayedItems = showAll ? currentItems : currentItems.slice(0, 4);

    return (
        <section id="menu" className="py-24 md:py-32 bg-white rounded-[3rem] md:rounded-[4rem] shadow-[0_-20px_50px_rgba(0,0,0,0.03)] z-20 relative">
            <div className="container mx-auto px-6 md:px-12 max-w-7xl">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={springConfig}
                    className="text-center mb-16"
                >
                    <h2 className="text-4xl md:text-7xl font-bold tracking-tight text-[#1D1D1F]">Menu.</h2>
                    <p className="mt-4 text-xl md:text-2xl text-[#86868B] font-medium tracking-tight">An uncompromising commitment to Food.</p>
                </motion.div>

                <div className="flex justify-center mb-16">
                    <div className="bg-[#F5F5F7] p-2 rounded-full inline-flex md:space-x-2 overflow-x-auto no-scrollbar max-w-full shadow-inner items-center">
                        <AnimatePresence>
                            {categories.map((cat) => (
                                <motion.button
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    key={cat}
                                    onClick={() => {
                                        setActiveCategory(cat);
                                        setShowAll(false);
                                    }}
                                    className={`relative px-6 md:px-8 py-3.5 rounded-full text-sm font-bold transition-colors duration-300 flex-shrink-0 ${activeCategory === cat ? 'text-[#1D1D1F]' : 'text-[#86868B] hover:text-[#1D1D1F]'
                                        }`}
                                >
                                    {activeCategory === cat && (
                                        <motion.div
                                            layoutId="activeCategory"
                                            className="absolute inset-0 bg-white rounded-full shadow-[0_4px_12px_rgba(0,0,0,0.08)] border border-black/5"
                                            transition={springConfig}
                                        />
                                    )}
                                    <span className="relative z-10">{cat}</span>
                                </motion.button>
                            ))}
                        </AnimatePresence>
                    </div>
                </div>

                <div className="w-full min-h-[400px]">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={`${activeCategory}-${showAll}`}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            transition={{ duration: 0.3, ease: "easeInOut" }}
                            className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10"
                        >
                            {displayedItems.map((item, idx) => (
                                <div
                                    key={item.name}
                                    className="flex gap-5 p-5 md:p-6 bg-[#F5F5F7] rounded-[2rem] md:rounded-[2.5rem] hover:shadow-[0_20px_40px_rgba(0,0,0,0.08)] hover:-translate-y-1 transition-all duration-300 group cursor-pointer border border-transparent hover:border-black/5"
                                >
                                    <div className="w-28 h-28 md:w-36 md:h-36 bg-gray-200 rounded-[1.5rem] overflow-hidden flex-shrink-0 relative">
                                        <img loading="lazy" decoding="async" src={item.img} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out will-change-transform" alt={item.name} />
                                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />
                                    </div>
                                    <div className="flex-1 py-1 flex flex-col justify-center">
                                        <div className="flex justify-between items-start mb-2">
                                            <h4 className="text-xl md:text-2xl font-bold text-[#1D1D1F] tracking-tight group-hover:text-blue-600 transition-colors">{item.name}</h4>
                                            <span className="text-[#1D1D1F] font-bold bg-white px-4 py-1.5 rounded-full text-sm shadow-sm border border-black/5">{item.price}</span>
                                        </div>
                                        <p className="text-[#86868B] leading-relaxed font-medium text-sm md:text-base">{item.desc}</p>
                                    </div>
                                </div>
                            ))}
                        </motion.div>
                    </AnimatePresence>
                </div>

                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    className="mt-16 text-center"
                >
                    <motion.button
                        whileHover={{ scale: 1.05, backgroundColor: "#E5E5E9" }}
                        whileTap={{ scale: 0.95 }}
                        transition={springConfig}
                        onClick={() => setShowAll(!showAll)}
                        className="inline-flex items-center gap-3 px-8 py-4 bg-[#F5F5F7] text-[#1D1D1F] rounded-full font-bold shadow-sm border border-transparent hover:border-black/5"
                    >
                        <span>{showAll ? 'Show Less' : 'View All 10 Choices'}</span>
                        <motion.div
                            animate={{ rotate: showAll ? 180 : 0 }}
                            transition={springConfig}
                        >
                            <ChevronDown size={18} />
                        </motion.div>
                    </motion.button>
                </motion.div>
            </div>
        </section>
    );
};

const AboutSection = () => {
    return (
        <section id="about" className="py-24 md:py-36 bg-white relative overflow-hidden flex items-center min-h-[80vh]">

            {/* Faint classical watermark aesthetic from reference image */}
            <div className="absolute right-[-20%] lg:right-0 top-1/2 -translate-y-1/2 opacity-[0.03] pointer-events-none select-none flex items-center justify-center">
                <div className="w-[500px] h-[500px] lg:w-[800px] lg:h-[800px] border-[20px] lg:border-[30px] border-[#1D1D1F] rounded-full flex items-center justify-center">
                    <span className="text-[8rem] lg:text-[14rem] font-serif text-[#1D1D1F] pr-10 lg:pr-20">est</span>
                </div>
            </div>

            {/* TEXT ON LEFT */}
            <div className="container mx-auto px-6 md:px-12 max-w-[1400px] relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 md:gap-16 items-center">

                    {/* EXACT TEXT MATCH FROM REFERENCE */}
                    <motion.div
                        variants={staggerContainer}
                        initial="hidden"
                        whileInView="show"
                        viewport={{ once: true, margin: "-100px" }}
                        className="max-w-2xl pt-10"
                    >
                        <motion.p variants={fadeInUp} className="text-[#8B7355] font-medium tracking-wide text-sm md:text-base mb-4 font-sans uppercase">
                            Five-Star Establishment Serving The City
                        </motion.p>
                        <motion.h3 variants={fadeInUp} style={{ fontFamily: 'Georgia, serif' }} className="text-5xl md:text-[5.5rem] font-normal text-[#333333] mb-8 leading-[1.05] tracking-tight">
                            Brewing hope & <br className="hidden md:block" /> great coffee in the <br className="hidden md:block" /> heart of the city
                        </motion.h3>
                        <motion.div variants={fadeInUp} className="space-y-6 text-[#555555] text-lg font-sans leading-relaxed max-w-xl">
                            <p>
                                Once a dream, now a beacon of ambition — <strong className="text-[#333]">Lumina Cafe</strong> is a unique & eclectic café revitalizing the neighborhood through <strong className="text-[#333]">community, careers</strong>, and <strong className="text-[#333]">coffee</strong>.
                            </p>
                            <p className="font-bold text-[#333] pt-6">
                                Open 8am – 10pm Monday-Sunday
                            </p>
                        </motion.div>
                    </motion.div>

                    {/* PHOTOREALISTIC WHITE COFFEE MUG */}
                    <motion.div
                        initial={{ opacity: 0, x: 150 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 1.2, type: "spring", bounce: 0.3 }}
                        className="relative flex justify-center items-center h-[350px] lg:h-[500px]"
                    >
                        <motion.img
                            animate={{ y: [0, -10, 0] }}
                            transition={{ repeat: Infinity, duration: 4.5, ease: "easeInOut" }}
                            src="/coffee-cup.png"
                            className="w-full max-w-[400px] lg:max-w-[500px] object-contain z-10 lg:scale-110 lg:translate-x-10"
                            alt="Photorealistic White Hot Coffee Mug on Saucer"
                        />
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

// Advanced Mobile Swipe-Card Stack Overlay
const MobileGallerySection = ({ images }) => {
    const [cardIndex, setCardIndex] = useState(0);
    const [exitX, setExitX] = useState(-300); // Direction of swipe exit

    return (
        <section id="gallery-mobile" className="flex md:hidden flex-col items-center justify-center relative w-full bg-[#1D1D1F] py-20 overflow-hidden min-h-[90vh]">

            {/* Frozen Cinematic Title */}
            <div className="w-full text-center z-50 px-6 mb-10">
                <span className="text-white/60 font-bold tracking-widest uppercase text-xs mb-3 block">Swipe to explore</span>
                <h2 className="text-5xl font-bold tracking-tight text-white mb-2">Gallery.</h2>
                <p className="text-white/40 text-sm font-medium">Drag cards horizontally to view more.</p>
            </div>

            {/* The Absolute Deck */}
            <div className="relative w-full h-[55vh] px-8 max-w-[450px] flex items-center justify-center pointer-events-none">
                <AnimatePresence mode="popLayout">
                    {images.map((img, i) => {
                        // Unmount cards that have already been swiped
                        if (i < cardIndex) return null;

                        const isTop = i === cardIndex;
                        const offsetIdx = i - cardIndex; // Ensures underlying cards natively shrink away based on dept, 0=Top, 1=Under, 2=Deep

                        return (
                            <motion.div
                                key={img}
                                initial={{ opacity: 0, scale: 0.8, y: 50 }}
                                animate={{
                                    opacity: 1,
                                    scale: 1 - (offsetIdx * 0.05), // Gives physical depth layering
                                    y: offsetIdx * 30,             // Vertically cascades them
                                    zIndex: images.length - i
                                }}
                                exit={{ x: exitX, opacity: 0, rotate: exitX > 0 ? 15 : -15, transition: { duration: 0.3 } }}
                                transition={{ type: "spring", stiffness: 300, damping: 25 }}
                                drag={isTop ? "x" : false}
                                dragConstraints={{ left: 0, right: 0 }} // Causes snap-back if not fully swiped
                                dragElastic={0.8}
                                onDragEnd={(e, { offset }) => {
                                    const swipeDist = offset.x;
                                    if (swipeDist < -100 || swipeDist > 100) {
                                        // User crossed threshold
                                        setExitX(swipeDist > 0 ? 300 : -300); // Throw it the way they swiped
                                        if (cardIndex < images.length - 1) {
                                            setCardIndex(cardIndex + 1);
                                        } else { // Hard reset back into bundle exactly when done picking
                                            setCardIndex(0);
                                        }
                                    }
                                }}
                                className="absolute top-0 w-[calc(100%-2rem)] h-full max-h-[500px] rounded-[2rem] overflow-hidden shadow-[0_30px_60px_rgba(0,0,0,0.8)] border border-white/20 will-change-transform pointer-events-auto"
                            >
                                <img src={img} className="w-full h-full object-cover pointer-events-none" alt={`Lumina Gallery ${i}`} loading="lazy" decoding="async" />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />
                            </motion.div>
                        )
                    })}
                </AnimatePresence>
            </div>

            {/* Pagination Indicators */}
            <div className="mt-12 flex justify-center gap-2 z-10 relative">
                {images.map((_, i) => (
                    <div key={i} className={`w-2 h-2 rounded-full transition-colors ${i === cardIndex ? 'bg-white' : 'bg-white/30'}`} />
                ))}
            </div>
        </section>
    );
};

const AmbienceGallery = () => {
    const images = [
        "https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&q=80&w=800",
        "https://images.unsplash.com/photo-1507133750040-4a8f57021571?auto=format&fit=crop&q=80&w=800",
        "https://images.unsplash.com/photo-1521017432531-fbd92d768814?auto=format&fit=crop&q=80&w=800",
        "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&q=80&w=800",
        "https://images.unsplash.com/photo-1559339352-11d035aa65de?auto=format&fit=crop&q=80&w=800",
        "https://images.unsplash.com/photo-1445116572660-236099ec97a0?auto=format&fit=crop&q=80&w=800"
    ];

    // Using Framer Motion to create a beautifully animated staggered grid.
    return (
        <>
            {/* Mobile Full-Screen Scroll Trap */}
            <MobileGallerySection images={images} />

            {/* Standard Desktop Grid Section */}
            <section id="gallery" className="hidden md:block py-24 md:py-32 bg-white overflow-visible">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="container mx-auto px-6 md:px-12 max-w-7xl mb-16 md:mb-20 text-center"
                >
                    <span className="text-blue-600 font-bold tracking-widest uppercase text-sm mb-4 block">Exclusive Visuals</span>
                    <h2 className="text-5xl md:text-7xl font-bold tracking-tight text-[#1D1D1F]">Gallery.</h2>
                </motion.div>

                <div className="container mx-auto px-6 md:px-12 max-w-7xl">
                    {/* Desktop Grid Layout */}
                    <motion.div
                        variants={staggerContainer}
                        initial="hidden"
                        whileInView="show"
                        viewport={{ once: true, margin: "-100px" }}
                        className="hidden md:grid md:grid-cols-2 lg:grid-cols-3 gap-8"
                    >
                        {images.map((img, i) => (
                            <motion.div
                                key={i}
                                variants={{
                                    hidden: { opacity: 0, scale: 0.9, y: 50, rotate: i % 2 === 0 ? -5 : 5 },
                                    show: { opacity: 1, scale: 1, y: 0, rotate: 0, transition: springConfig }
                                }}
                                whileHover={{
                                    scale: 1.05,
                                    y: -15,
                                    zIndex: 10,
                                    rotate: i % 2 === 0 ? 2 : -2
                                }}
                                className={`relative aspect-[3/4] w-full rounded-[2.5rem] overflow-hidden shadow-md hover:shadow-2xl transition-shadow duration-300 group
                                ${i === 1 || i === 4 ? "lg:translate-y-16" : ""}
                            `}
                            >
                                <img loading="lazy" decoding="async" src={img} className="w-full h-full object-cover origin-center group-hover:scale-110 transition-transform duration-700 ease-out will-change-transform" alt={`Lumina interior ${i + 1}`} />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </section>
        </>
    );
};

const Location = () => {
    return (
        <section id="location" className="py-32 bg-[#F5F5F7] relative">
            <div className="container mx-auto px-6 md:px-12 max-w-5xl">
                <motion.div
                    initial={{ opacity: 0, y: 40, scale: 0.95 }}
                    whileInView={{ opacity: 1, y: 0, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="bg-white p-10 md:p-20 rounded-[4rem] shadow-[0_20px_60px_rgba(0,0,0,0.04)] text-center max-w-4xl mx-auto border border-black/5 relative overflow-hidden"
                >
                    <div className="relative z-10">
                        <span className="text-blue-600 font-bold tracking-widest uppercase text-sm mb-4 block">Visit Us</span>
                        <h2 className="text-4xl md:text-6xl font-bold tracking-tight text-[#1D1D1F] mb-16">Find us.</h2>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-12">
                            <motion.div whileHover={{ y: -5 }} className="flex flex-col items-center group cursor-pointer">
                                <div className="w-16 h-16 bg-[#F5F5F7] rounded-[1.5rem] flex items-center justify-center text-[#1D1D1F] mb-6 shadow-sm border border-black/5 group-hover:bg-[#1D1D1F] group-hover:text-white transition-colors duration-300">
                                    <MapPin size={24} />
                                </div>
                                <h4 className="text-xl font-bold text-[#1D1D1F]">Address</h4>
                                <p className="text-[#86868B] text-base mt-2 font-medium">R.S puram<br />Coimbatore, Tamilnadu</p>
                            </motion.div>

                            <motion.div whileHover={{ y: -5 }} className="flex flex-col items-center group cursor-pointer">
                                <div className="w-16 h-16 bg-[#F5F5F7] rounded-[1.5rem] flex items-center justify-center text-[#1D1D1F] mb-6 shadow-sm border border-black/5 group-hover:bg-[#1D1D1F] group-hover:text-white transition-colors duration-300">
                                    <Clock size={24} />
                                </div>
                                <h4 className="text-xl font-bold text-[#1D1D1F]">Hours</h4>
                                <p className="text-[#86868B] text-base mt-2 font-medium">Mon - Sun<br />08:00 - 22:00</p>
                            </motion.div>

                            <motion.div whileHover={{ y: -5 }} className="flex flex-col items-center group cursor-pointer">
                                <div className="w-16 h-16 bg-[#F5F5F7] rounded-[1.5rem] flex items-center justify-center text-[#1D1D1F] mb-6 shadow-sm border border-black/5 group-hover:bg-[#1D1D1F] group-hover:text-white transition-colors duration-300">
                                    <Phone size={24} />
                                </div>
                                <h4 className="text-xl font-bold text-[#1D1D1F]">Contact</h4>
                                <p className="text-[#86868B] text-base mt-2 font-medium">+91 012-345-6789<br />hello@lumina.cafe</p>
                            </motion.div>
                        </div>

                        <motion.a
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            href="https://maps.google.com/?q=R.S+puram,+Coimbatore,+Tamilnadu"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="mt-16 mx-auto inline-flex items-center justify-center gap-3 px-10 py-5 bg-[#1D1D1F] text-white rounded-full font-bold text-base hover:bg-black transition-colors shadow-[0_12px_30px_rgba(0,0,0,0.15)] hover:shadow-[0_16px_40px_rgba(0,0,0,0.2)]"
                        >
                            <Map size={20} />
                            Open in Google Maps
                            <ExternalLink size={18} className="text-gray-400" />
                        </motion.a>
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

// ... Reservation logic
const loadRazorpay = () => {
    return new Promise((resolve) => {
        const script = document.createElement("script");
        script.src = "https://checkout.razorpay.com/v1/checkout.js";
        script.onload = () => resolve(true);
        script.onerror = () => resolve(false);
        document.body.appendChild(script);
    });
};

const ReservationModal = ({ isOpen, onClose }) => {
    const [name, setName] = useState('');
    const [date, setDate] = useState('');
    const [guests, setGuests] = useState('');
    const [occasion, setOccasion] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [statusMsg, setStatusMsg] = useState('');
    const [timeLeft, setTimeLeft] = useState(300); // 5 minutes
    const [timerActive, setTimerActive] = useState(false);

    useEffect(() => {
        let timer;
        if (timerActive) {
            timer = setInterval(() => {
                setTimeLeft((prev) => {
                    if (prev <= 1) {
                        clearInterval(timer);
                        setTimerActive(false);
                        alert("Payment session expired. Please assemble your reservation again.");
                        window.location.reload(); // Hard reload effectively securely destroys Razorpay's overlay
                        return 0;
                    }
                    return prev - 1;
                });
            }, 1000);
        }
        return () => {
            if (timer) clearInterval(timer);
        };
    }, [timerActive]);

    // Cleanup when manual close occurs
    useEffect(() => {
        if (!isOpen) {
            setTimerActive(false);
            setTimeLeft(300);
            setIsSubmitting(false);
            setStatusMsg('');
        }
    }, [isOpen]);

    const formatTime = (seconds) => {
        const m = Math.floor(seconds / 60).toString().padStart(2, '0');
        const s = (seconds % 60).toString().padStart(2, '0');
        return `${m}:${s}`;
    };

    const processEmail = () => {
        setTimerActive(false); // Stop countdown on successful pay
        setIsSubmitting(true);
        setStatusMsg('Payment verified! Confirming...');

        const SERVICE_ID = 'service_bqaco5f';
        const TEMPLATE_ID = 'template_4mhhanj';
        const PUBLIC_KEY = 'WjOFbAVDToUIt3sIA';

        const templateParams = { name, date, guests, occasion: occasion || 'None', to_name: 'Lumina Cafe' };

        emailjs.send(SERVICE_ID, TEMPLATE_ID, templateParams, PUBLIC_KEY)
            .then(() => {
                setStatusMsg('Reservation successfully booked!');
                setTimeout(() => { setIsSubmitting(false); setStatusMsg(''); onClose(); }, 2000);
            }, () => {
                setStatusMsg('Failed to send. Check API keys.');
                setIsSubmitting(false);
            });
    };

    const handleConfirm = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        setStatusMsg('Connecting securely...');

        const res = await loadRazorpay();
        if (!res) {
            setStatusMsg('Failed to load payment gateway.');
            setIsSubmitting(false);
            return;
        }

        const options = {
            key: "rzp_live_SV8JIon4Z6xAeF",
            amount: 100000,
            currency: "INR",
            name: "Lumina Cafe",
            description: "Five-Star Experience Advance",
            image: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=100&h=100",
            handler: function () { processEmail(); },
            prefill: { name: name },
            theme: { color: "#1D1D1F" },
            modal: {
                ondismiss: function () {
                    setTimerActive(false); // Stop timer if user manually exits Razorpay
                    setTimeLeft(300);
                    setIsSubmitting(false);
                    setStatusMsg('Payment cancelled by user.');
                }
            }
        };

        const paymentObject = new window.Razorpay(options);
        paymentObject.on('payment.failed', function () {
            setTimerActive(false); // Stop timer on failure
            setTimeLeft(300);
            setStatusMsg('Payment failed. Please try again.');
            setIsSubmitting(false);
        });

        setStatusMsg('Awaiting payment...');
        setTimerActive(true); // START TIMER HERE
        paymentObject.open();
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
                    <motion.div
                        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                        className="absolute inset-0 bg-black/40 backdrop-blur-md"
                        onClick={onClose}
                    />
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, y: 40 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: 20 }}
                        transition={springConfig}
                        className="relative w-full max-w-xl bg-white/95 backdrop-blur-3xl rounded-[3rem] p-8 md:p-14 shadow-[0_40px_100px_rgba(0,0,0,0.3)] border border-white/50"
                    >
                        <motion.button
                            whileHover={{ scale: 1.1, rotate: 90 }} whileTap={{ scale: 0.9 }} onClick={onClose}
                            className="absolute top-6 right-6 p-2 bg-gray-100/80 hover:bg-gray-200 rounded-full text-gray-500 hover:text-gray-800 transition-colors backdrop-blur-sm"
                        >
                            <X size={20} />
                        </motion.button>

                        <div className="mb-10 text-center">
                            {timerActive && (
                                <div className="flex justify-center mb-5">
                                    <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-red-50 text-red-600 text-sm font-bold border border-red-100 shadow-sm">
                                        <Clock size={16} className={timeLeft < 60 ? "animate-pulse" : ""} />
                                        <span>Time to Complete Payment:</span>
                                        <span className={`tabular-nums ${timeLeft < 60 ? "text-red-700 font-extrabold animate-pulse" : ""}`}>
                                            {formatTime(timeLeft)}
                                        </span>
                                    </span>
                                </div>
                            )}
                            <h2 className="text-4xl font-bold tracking-tight text-[#1D1D1F] mb-3">Secure Reservation.</h2>
                            <p className="text-[#86868B] font-medium text-sm">A ₹1000 deposit is required to secure your experience.</p>
                        </div>

                        <form className="space-y-6" onSubmit={handleConfirm}>
                            <div className="space-y-4">
                                <div className="bg-white p-2 rounded-[1.5rem] border border-gray-200 shadow-sm focus-within:shadow-md focus-within:border-gray-300 transition-all">
                                    <div className="flex items-center gap-3 px-5 py-4 border-b border-gray-100">
                                        <User size={18} className="text-[#4b4b4e]" />
                                        <input type="text" value={name} onChange={(e) => setName(e.target.value)} required placeholder="Your Full Name" className="bg-transparent outline-none text-[16px] w-full text-[#1D1D1F] font-bold placeholder-[#a1a1aa]" disabled={isSubmitting} />
                                    </div>
                                    <label className="flex items-center gap-3 px-5 py-4 cursor-pointer">
                                        <Calendar size={18} className="text-[#4b4b4e]" />
                                        <input
                                            type="date"
                                            value={date}
                                            onChange={(e) => setDate(e.target.value)}
                                            required
                                            className="bg-transparent outline-none text-[16px] w-full text-[#1D1D1F] font-bold cursor-pointer"
                                            disabled={isSubmitting}
                                        />
                                    </label>
                                </div>

                                <div className="bg-white p-2 rounded-[1.5rem] border border-gray-200 shadow-sm focus-within:shadow-md focus-within:border-gray-300 transition-all">
                                    <div className="flex items-center gap-3 px-5 py-4 border-b border-gray-100">
                                        <Users size={18} className="text-[#4b4b4e]" />
                                        <input type="number" value={guests} onChange={(e) => setGuests(e.target.value)} required placeholder="Number of Guests" className="bg-transparent outline-none text-[16px] w-full text-[#1D1D1F] font-bold placeholder-[#a1a1aa]" disabled={isSubmitting} />
                                    </div>
                                    <div className="flex items-center gap-3 px-5 py-4">
                                        <Utensils size={18} className="text-[#4b4b4e]" />
                                        <input type="text" value={occasion} onChange={(e) => setOccasion(e.target.value)} placeholder="Special Occasion?" className="bg-transparent outline-none text-[16px] w-full text-[#1D1D1F] font-bold placeholder-[#a1a1aa]" disabled={isSubmitting} />
                                    </div>
                                </div>
                            </div>

                            {statusMsg && (
                                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="text-sm text-blue-600 font-bold text-center bg-blue-50 py-3 rounded-xl border border-blue-100">
                                    {statusMsg}
                                </motion.div>
                            )}

                            <motion.button
                                whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} type="submit" disabled={isSubmitting}
                                className="w-full mt-6 py-5 bg-[#1D1D1F] text-white rounded-[1.5rem] font-bold text-[16px] hover:bg-black transition-all shadow-[0_8px_20px_rgba(0,0,0,0.15)] hover:shadow-[0_12px_25px_rgba(0,0,0,0.2)] flex justify-center items-center gap-2"
                            >
                                {isSubmitting ? 'Processing Payment...' : 'Secure Reservation (₹1000)'}
                            </motion.button>
                        </form>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
};

export default function App() {
    const [isReserving, setIsReserving] = useState(false);

    return (
        <div className="bg-[#F5F5F7] text-[#1D1D1F] min-h-screen font-sans selection:bg-blue-200 selection:text-blue-900 overflow-x-hidden">
            <style dangerouslySetInnerHTML={{
                __html: `
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap');
        body { 
            font-family: -apple-system, BlinkMacSystemFont, 'Inter', "Segoe UI", Roboto, Helvetica, Arial, sans-serif; 
            background: #F5F5F7; 
            scroll-behavior: smooth;
            -webkit-font-smoothing: antialiased;
            -moz-osx-font-smoothing: grayscale;
        }
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}} />

            <Navbar onReserve={() => setIsReserving(true)} />
            <Hero onReserve={() => setIsReserving(true)} />
            <MenuSection />
            <AboutSection />
            <AmbienceGallery />
            <Location />

            <footer className="py-16 text-center bg-[#1D1D1F] border-t border-black">
                <div className="container mx-auto px-6">
                    <span className="text-3xl font-extrabold tracking-tight text-white">Lumina.</span>
                    <div className="flex justify-center gap-6 mt-8 mb-8 text-white/70">
                        <motion.a whileHover={{ scale: 1.1, color: "#fff", y: -3 }} href="https://instagram.com" target="_blank" rel="noreferrer" className="transition-all"><Instagram size={24} /></motion.a>
                        <motion.a whileHover={{ scale: 1.1, color: "#fff", y: -3 }} href="https://twitter.com" target="_blank" rel="noreferrer" className="transition-all"><Twitter size={24} /></motion.a>
                        <motion.a whileHover={{ scale: 1.1, color: "#fff", y: -3 }} href="https://facebook.com" target="_blank" rel="noreferrer" className="transition-all"><Facebook size={24} /></motion.a>
                    </div>
                    <p className="text-sm text-white/40 font-bold tracking-widest uppercase">© 2024 Five Star Establishment</p>
                </div>
            </footer>

            <ReservationModal isOpen={isReserving} onClose={() => setIsReserving(false)} />
        </div>
    );
}