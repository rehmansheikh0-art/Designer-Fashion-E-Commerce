import { Product, Order, Coupon, BlogPost, Testimonial } from '../types';

export const INITIAL_PRODUCTS: Product[] = [
  {
    id: 'prod-01',
    sku: 'AV-BR-001',
    name: 'Royal Velvet Empress Gown',
    category: 'Bridal Dresses',
    collection: 'Royal Heritage 2026',
    price: 2450,
    discountPrice: 2150,
    rating: 4.9,
    reviewsCount: 38,
    images: [
      'https://images.unsplash.com/photo-1566174053879-31528523f8ae?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1539109136881-3be0616acf4b?auto=format&fit=crop&w=1000&q=80'
    ],
    fabric: 'Pure Italian Micro Velvet & Zardozi Gold Wire Embroidery',
    washingInstructions: 'Dry Clean Only by Luxury Specialist. Store in breathable canvas garment bag.',
    availableSizes: ['XS', 'S', 'M', 'L', 'XL', 'Custom Stitching'],
    availableColors: ['Emerald Green', 'Royal Maroon', 'Midnight Navy'],
    colorHexes: ['#0B6623', '#800020', '#000080'],
    stock: 8,
    description: 'An ethereal bridal ensemble handcrafted with hand-beaded crystals, metallic tilla threadwork, and rich silk velvet lining. Designed for unforgettable heritage weddings.',
    details: [
      'Hand-stitched metallic bullion embroidery',
      'Scalloped organza dupatta border',
      'Bespoke waist corset structure',
      'Includes complimentary satin inner slip'
    ],
    isNewArrival: true,
    isBestSeller: true,
    isBridal: true,
    featured: true,
    reviews: [
      {
        id: 'rev-01',
        userName: 'Eleanor Vance',
        rating: 5,
        date: '2026-06-12',
        title: 'Breathtaking Bridal Gown!',
        comment: 'The intricate gold handwork is even more magnificent in person. Fits like a glove with custom stitching!',
        verifiedPurchase: true
      },
      {
        id: 'rev-02',
        userName: 'Sofia Al-Mansoor',
        rating: 5,
        date: '2026-05-28',
        title: 'Royalty Personified',
        comment: 'Wore this for my reception in London. Received endless compliments on the rich velvet texture and gold embroidery.',
        verifiedPurchase: true
      }
    ]
  },
  {
    id: 'prod-02',
    sku: 'AV-BR-002',
    name: 'Celestial Silk Organza Ballgown',
    category: 'Bridal Dresses',
    collection: 'Lumière Bridal',
    price: 3200,
    discountPrice: 2890,
    rating: 5.0,
    reviewsCount: 24,
    images: [
      'https://images.unsplash.com/photo-1594552072238-b8a33785b261?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1518895949257-7621c3c786d7?auto=format&fit=crop&w=1000&q=80'
    ],
    fabric: '100% French Silk Organza & Pearl Embellished Tulle',
    washingInstructions: 'Professional Dry Clean. Handle with silk preservation care.',
    availableSizes: ['XS', 'S', 'M', 'L', 'Custom Stitching'],
    availableColors: ['Ivory Pearl', 'Soft Champagne', 'Powder Rose'],
    colorHexes: ['#FFFFF0', '#F7E7CE', '#FFE4E1'],
    stock: 5,
    description: 'A fairytale ballgown featuring a drop waist corset adorned with pearls, a cascading silk organza skirt, and hand-embroidered floral motifs.',
    details: [
      'Structured internal bone corsetry',
      'Hand-sewn freshwater pearl accents',
      'Detachable cathedral length train',
      'Hidden back zipper with covered silk buttons'
    ],
    isNewArrival: true,
    isBridal: true,
    featured: true,
    reviews: [
      {
        id: 'rev-03',
        userName: 'Isabella Ross',
        rating: 5,
        date: '2026-07-04',
        title: 'Dream Wedding Dress',
        comment: 'Felt like total royalty on my big day. Lightweight organza despite the massive dramatic train.',
        verifiedPurchase: true
      }
    ]
  },
  {
    id: 'prod-03',
    sku: 'AV-LP-001',
    name: 'Aurelia Draped Chiffon Gown',
    category: 'Luxury Pret',
    collection: 'Opulence Spring 2026',
    price: 890,
    discountPrice: 750,
    rating: 4.8,
    reviewsCount: 42,
    images: [
      'https://images.unsplash.com/photo-1496747611176-843222e1e57c?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1529139574466-a303027c1d8b?auto=format&fit=crop&w=1000&q=80'
    ],
    fabric: 'Pure Silk Chiffon with Swarvoski Crystal neckline',
    washingInstructions: 'Specialist Dry Clean Only.',
    availableSizes: ['XS', 'S', 'M', 'L', 'XL'],
    availableColors: ['Saffron Gold', 'Rose Quartz', 'Champagne Beige'],
    colorHexes: ['#F4C430', '#AA98A9', '#F5F5DC'],
    stock: 14,
    description: 'Flowing asymmetrical silhouette rendered in ethereal silk chiffon with an embellished neckline and flutter sleeves for high-fashion galas.',
    details: [
      'Hand-pleated crossover bodice',
      'Fully lined in breathable silk habotai',
      'High waist cinching cutouts',
      'Invisible side zip closure'
    ],
    isBestSeller: true,
    featured: true,
    reviews: []
  },
  {
    id: 'prod-04',
    sku: 'AV-FD-001',
    name: 'Nocturne Satin Maxi Dress',
    category: 'Formal Dresses',
    collection: 'Midnight Atelier',
    price: 640,
    rating: 4.7,
    reviewsCount: 29,
    images: [
      'https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1502716119720-b23a93e5fe1b?auto=format&fit=crop&w=1000&q=80'
    ],
    fabric: 'Heavyweight Silk Satin Duchesse',
    washingInstructions: 'Dry Clean or Gentle Hand Wash in Cold Water.',
    availableSizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
    availableColors: ['Midnight Black', 'Ruby Red', 'Deep Emerald'],
    colorHexes: ['#121212', '#9B111E', '#046307'],
    stock: 12,
    description: 'Sculptural bias-cut silhouette that drapes effortless over curves. Features an elegant cowl neckline and floor-sweeping hem.',
    details: [
      'Bias cut for fluid drape',
      'Adjustable delicate spaghetti straps',
      'Deep v-back detail',
      'High side leg slit'
    ],
    isBestSeller: true,
    reviews: []
  },
  {
    id: 'prod-05',
    sku: 'AV-PW-001',
    name: 'Sequined Prism Gala Gown',
    category: 'Party Wear',
    collection: 'Starlight Soirée',
    price: 1150,
    discountPrice: 980,
    rating: 4.9,
    reviewsCount: 56,
    images: [
      'https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=1000&q=80'
    ],
    fabric: 'Hand-appliqué Sequins over Micro Tulle Net',
    washingInstructions: 'Dry Clean Only. Avoid direct ironing on sequin detail.',
    availableSizes: ['XS', 'S', 'M', 'L', 'XL'],
    availableColors: ['Iridescent Silver', 'Champagne Gold', 'Midnight Obsidian'],
    colorHexes: ['#C0C0C0', '#D4AF37', '#1A1A1A'],
    stock: 7,
    description: 'A showstopping evening gown saturated in light-reflecting micro sequins creating an ombre wave effect down the mermaid hem.',
    details: [
      'All-over hand stitched sequins',
      'Internal stretch lining for comfort',
      'Structured sweetheart neckline',
      'Concealed back zipper'
    ],
    isNewArrival: true,
    featured: true,
    reviews: []
  },
  {
    id: 'prod-06',
    sku: 'AV-CW-001',
    name: 'Seraphina Linen Shirt Dress',
    category: 'Casual Wear',
    collection: 'Resort & Riviera',
    price: 340,
    rating: 4.6,
    reviewsCount: 18,
    images: [
      'https://images.unsplash.com/photo-1585487000160-6ebcfceb0d03?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?auto=format&fit=crop&w=1000&q=80'
    ],
    fabric: '100% Organic European Flax Linen',
    washingInstructions: 'Machine wash delicate cycle 30°C. Line dry in shade.',
    availableSizes: ['XS', 'S', 'M', 'L', 'XL'],
    availableColors: ['Pure White', 'Terracotta', 'Olive Sage'],
    colorHexes: ['#FFFFFF', '#E2725B', '#8A9A86'],
    stock: 22,
    description: 'Effortlessly refined linen dress with mother-of-pearl buttons, sash waist tie, and relaxed tailored collar for chic sun-drenched days.',
    details: [
      'Natural Mother-of-Pearl buttons',
      'Self-fabric waist belt included',
      'Functional deep side pockets',
      'Rolled cuffs with tab button option'
    ],
    reviews: []
  },
  {
    id: 'prod-07',
    sku: 'AV-KC-001',
    name: 'Little Duchess Tulle & Lace Dress',
    category: 'Kids Collection',
    collection: 'Petit Atelier',
    price: 280,
    discountPrice: 240,
    rating: 4.9,
    reviewsCount: 15,
    images: [
      'https://images.unsplash.com/photo-1518831959646-742c3a14ebf7?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1621452773781-0f992fd1f5cb?auto=format&fit=crop&w=1000&q=80'
    ],
    fabric: 'Soft Cotton Lining with Layered Swiss Dot Tulle',
    washingInstructions: 'Hand wash cold with baby detergent. Lay flat to dry.',
    availableSizes: ['XS', 'S', 'M', 'L'], // 2Y, 4Y, 6Y, 8Y mapped
    availableColors: ['Blush Pink', 'Ivory White'],
    colorHexes: ['#FFB6C1', '#FFFFF0'],
    stock: 15,
    description: 'Charming flower girl or celebration dress crafted with itchy-free soft cotton lining, hand-embroidered bodice lace, and a fluffy tulle skirt.',
    details: [
      '100% hypersensitive-safe cotton lining',
      'Satin tie sash at waist',
      'Soft hidden back zip',
      'Matching hair bow accessory included'
    ],
    reviews: []
  },
  {
    id: 'prod-08',
    sku: 'AV-MC-001',
    name: 'Imperial Velvet Embroidered Sherwani',
    category: 'Men\'s Collection',
    collection: 'Groom & Gentry Couture',
    price: 1850,
    discountPrice: 1650,
    rating: 5.0,
    reviewsCount: 12,
    images: [
      'https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1593032465175-481ac7f401a0?auto=format&fit=crop&w=1000&q=80'
    ],
    fabric: 'Luxury Italian Raw Silk Velvet with Dabka & Threadwork',
    washingInstructions: 'Dry Clean Only by Specialty Men Couture Cleaners.',
    availableSizes: ['S', 'M', 'L', 'XL', 'Custom Stitching'],
    availableColors: ['Royal Navy', 'Ivory Cream', 'Bordeaux Maroon'],
    colorHexes: ['#0A1128', '#F5F5DC', '#4A0E17'],
    stock: 6,
    description: 'Regal structured jacket for groom or black-tie galas, tailored with high mandarin collar, custom brass crest buttons, and tonal embroidery.',
    details: [
      'Padded structured shoulder framing',
      'Handcrafted antique brass buttons',
      'Includes matching silk pajama pants',
      'Inner satin monogrammed lining'
    ],
    isNewArrival: true,
    reviews: []
  },
  {
    id: 'prod-09',
    sku: 'AV-BR-003',
    name: 'Magnolia Lace Mermaid Gown',
    category: 'Bridal Dresses',
    collection: 'Lumière Bridal',
    price: 2950,
    rating: 4.8,
    reviewsCount: 22,
    images: [
      'https://images.unsplash.com/photo-1546804784-896d0dca3814?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1522673607200-164d1b6ce486?auto=format&fit=crop&w=1000&q=80'
    ],
    fabric: 'Alençon Lace over Nude Stretch Mesh',
    washingInstructions: 'Dry Clean Only. Keep away from heat.',
    availableSizes: ['XS', 'S', 'M', 'L', 'Custom Stitching'],
    availableColors: ['Ivory Nude', 'Pure White'],
    colorHexes: ['#F7F2EC', '#FFFFFF'],
    stock: 4,
    description: 'Intricate corded lace sculpts every line in this dramatic mermaid bridal gown with a illusion plunging illusion neck and sheer chapel train.',
    details: [
      'Sheer illusion lace back',
      'Scalloped lace hemline',
      'Built-in cup support & corset stay',
      'Pearl button closure down back'
    ],
    isBridal: true,
    reviews: []
  },
  {
    id: 'prod-10',
    sku: 'AV-LP-002',
    name: 'Elixir Crystal Silk Kaftan',
    category: 'Luxury Pret',
    collection: 'Opulence Spring 2026',
    price: 780,
    discountPrice: 690,
    rating: 4.7,
    reviewsCount: 31,
    images: [
      'https://images.unsplash.com/photo-1576995853123-5a10305d93c0?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=1000&q=80'
    ],
    fabric: '100% Pure Silk Crepe de Chine',
    washingInstructions: 'Dry Clean Only.',
    availableSizes: ['XS', 'S', 'M', 'L', 'XL'],
    availableColors: ['Royal Turquoise', 'Amethyst Purple', 'Amber Gold'],
    colorHexes: ['#40E0D0', '#9966CC', '#FFBF00'],
    stock: 9,
    description: 'Fluid bohemian elegance meets haute couture. Decorated with crystal neckline applique and winged kimono sleeves.',
    details: [
      'Internal adjustable cinch waistband',
      'Swarovski embellished collar',
      'Side slits for effortless movement',
      'Unlined ultra-breathable pure silk'
    ],
    reviews: []
  },
  {
    id: 'prod-11',
    sku: 'AV-FD-002',
    name: 'Siren Sculpted Corset Gown',
    category: 'Formal Dresses',
    collection: 'Midnight Atelier',
    price: 920,
    discountPrice: 820,
    rating: 4.9,
    reviewsCount: 45,
    images: [
      'https://images.unsplash.com/photo-1550639525-c97d455acf70?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=1000&q=80'
    ],
    fabric: 'Structured Double-Faced Satin & Steel Corsetry',
    washingInstructions: 'Specialist Dry Clean Only.',
    availableSizes: ['XS', 'S', 'M', 'L', 'XL'],
    availableColors: ['Crimson Scarlet', 'Obsidian Black', 'Midnight Plum'],
    colorHexes: ['#DC143C', '#0B0B0B', '#2E0854'],
    stock: 11,
    description: 'An architectural evening gown designed to accent curves. Features visible corsetry boning, off-shoulder folded straps, and a thigh slit.',
    details: [
      'Visible translucent boning channels',
      'Folded off-the-shoulder straps',
      'Trailing train hem',
      'Concealed back zip'
    ],
    isBestSeller: true,
    featured: true,
    reviews: []
  },
  {
    id: 'prod-12',
    sku: 'AV-PW-002',
    name: 'Metropolis Metallic Pleated Dress',
    category: 'Party Wear',
    collection: 'Starlight Soirée',
    price: 580,
    rating: 4.5,
    reviewsCount: 19,
    images: [
      'https://images.unsplash.com/photo-1539109136881-3be0616acf4b?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1496747611176-843222e1e57c?auto=format&fit=crop&w=1000&q=80'
    ],
    fabric: 'Sunray Micro-Pleated Metallic Foil Mesh',
    washingInstructions: 'Hand Wash Cold Water. Steam only, do not iron.',
    availableSizes: ['XS', 'S', 'M', 'L', 'XL'],
    availableColors: ['Liquid Gold', 'Metallic Bronze', 'Chromium Silver'],
    colorHexes: ['#FFD700', '#CD7F32', '#E5E4E2'],
    stock: 16,
    description: 'Catch every ray of light under party chandeliers in this micro-pleated midi length dress with plunge V-neckline and dynamic motion hem.',
    details: [
      'Sunray permanent micro-pleating',
      'Deep plunge neckline with illusion wire',
      'Elastic waist band for seamless fit',
      'Fully lined hem'
    ],
    reviews: []
  },
  {
    id: 'prod-13',
    sku: 'AV-CW-002',
    name: 'Botanica Floral Tiered Sundress',
    category: 'Casual Wear',
    collection: 'Resort & Riviera',
    price: 290,
    discountPrice: 245,
    rating: 4.8,
    reviewsCount: 27,
    images: [
      'https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1585487000160-6ebcfceb0d03?auto=format&fit=crop&w=1000&q=80'
    ],
    fabric: 'Cotton Voile with Hand Block Print Floral Art',
    washingInstructions: 'Machine Wash Cold Delicate. Hang in shade.',
    availableSizes: ['XS', 'S', 'M', 'L', 'XL'],
    availableColors: ['Azure Floral', 'Coral Blossom'],
    colorHexes: ['#007FFF', '#FF7F50'],
    stock: 20,
    description: 'Breezy tier-skirt dress printed with handcrafted garden botanical motifs. Ideal for summer garden soirees and vacation getaways.',
    details: [
      'Tie-up bow shoulder straps',
      'Smocked back torso panel for flex fit',
      'Tiered ruffle skirt design',
      '100% soft cotton lining'
    ],
    reviews: []
  },
  {
    id: 'prod-14',
    sku: 'AV-LP-003',
    name: 'Gilded Feather Organza Wrap Dress',
    category: 'Luxury Pret',
    collection: 'Opulence Spring 2026',
    price: 940,
    rating: 4.9,
    reviewsCount: 33,
    images: [
      'https://images.unsplash.com/photo-1529139574466-a303027c1d8b?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1518895949257-7621c3c786d7?auto=format&fit=crop&w=1000&q=80'
    ],
    fabric: 'Silk Organza with Real Ostrich Feather Trim & Gold Foil Thread',
    washingInstructions: 'Dry Clean Specialist Only. Do not wet feathers.',
    availableSizes: ['XS', 'S', 'M', 'L', 'Custom Stitching'],
    availableColors: ['Pearl Blush', 'Midnight Charcoal'],
    colorHexes: ['#FFE4E1', '#36454F'],
    stock: 6,
    description: 'High luxury wrap gown framed with ostrich feather cuffs and delicate gold foil threads that shimmer gracefully with every step.',
    details: [
      'Hand-attached feather trim on cuffs',
      'Self-tie silk waist sash',
      'High-low tulip hem line',
      'Complimentary matching inner slip'
    ],
    isNewArrival: true,
    reviews: []
  },
  {
    id: 'prod-15',
    sku: 'AV-KC-002',
    name: 'Mini Princess Embroidered Lehenga',
    category: 'Kids Collection',
    collection: 'Petit Atelier',
    price: 310,
    discountPrice: 265,
    rating: 5.0,
    reviewsCount: 9,
    images: [
      'https://images.unsplash.com/photo-1621452773781-0f992fd1f5cb?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1518831959646-742c3a14ebf7?auto=format&fit=crop&w=1000&q=80'
    ],
    fabric: 'Dupion Silk Skirt with Soft Net Dupatta',
    washingInstructions: 'Gentle Dry Clean Only.',
    availableSizes: ['XS', 'S', 'M', 'L'],
    availableColors: ['Royal Yellow', 'Pastel Mint'],
    colorHexes: ['#FFD700', '#98FF98'],
    stock: 10,
    description: 'Adorable traditional wedding wear for young girls with delicate sequins work, comfortable elastic waistband, and light sheer dupatta.',
    details: [
      'Soft cotton lining inside top & skirt',
      'Tasselled drawstring waist',
      'Non-scratch embroidery finish',
      'Easy snap buttons at back'
    ],
    reviews: []
  },
  {
    id: 'prod-16',
    sku: 'AV-MC-002',
    name: 'Bespoke Linen Tuxedo Suit',
    category: 'Men\'s Collection',
    collection: 'Groom & Gentry Couture',
    price: 1450,
    rating: 4.9,
    reviewsCount: 14,
    images: [
      'https://images.unsplash.com/photo-1593032465175-481ac7f401a0?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=1000&q=80'
    ],
    fabric: 'Fine Wool-Silk Blend with Satin Peak Lapels',
    washingInstructions: 'Specialist Suit Dry Clean Only.',
    availableSizes: ['S', 'M', 'L', 'XL', 'Custom Stitching'],
    availableColors: ['Classic Tuxedo Black', 'Midnight Blue', 'Ivory Dinner Jacket'],
    colorHexes: ['#0A0A0A', '#000033', '#FFFFF0'],
    stock: 7,
    description: 'Impeccably tailored two-piece tux suit featuring hand-rolled satin lapels, trousers with side satin stripes, and bespoke inner vest options.',
    details: [
      'Half-canvas interior tailoring',
      'Satin covered jacket buttons',
      'Unhemmed trousers for custom length adjustment',
      'Includes suit garment bag & wooden hanger'
    ],
    reviews: []
  },
  {
    id: 'prod-17',
    sku: 'AV-PW-003',
    name: 'Venus Off-Shoulder Column Dress',
    category: 'Party Wear',
    collection: 'Starlight Soirée',
    price: 690,
    discountPrice: 590,
    rating: 4.6,
    reviewsCount: 22,
    images: [
      'https://images.unsplash.com/photo-1502716119720-b23a93e5fe1b?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?auto=format&fit=crop&w=1000&q=80'
    ],
    fabric: 'Heavy Crepe & Sculpting Bonded Fabric',
    washingInstructions: 'Dry Clean Only.',
    availableSizes: ['XS', 'S', 'M', 'L', 'XL'],
    availableColors: ['Ivory White', 'Plum Wine', 'Electric Sapphire'],
    colorHexes: ['#FAFAFA', '#4A154B', '#0F52BA'],
    stock: 13,
    description: 'Minimalist red carpet glamour. Folded off-shoulder portrait neckline with sleek column silhouette and back slit.',
    details: [
      'Internal sticky silicone grip band on shoulders',
      'Fully lined in stretch satin',
      'Discreet back zip',
      'Form-fitting structure'
    ],
    reviews: []
  },
  {
    id: 'prod-18',
    sku: 'AV-FD-003',
    name: 'Valentina Rose Velvet Gown',
    category: 'Formal Dresses',
    collection: 'Midnight Atelier',
    price: 880,
    rating: 4.8,
    reviewsCount: 36,
    images: [
      'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=1000&q=80'
    ],
    fabric: 'Silk Blend Stretch Velvet with Crystal Shoulder Brooch',
    washingInstructions: 'Dry Clean Only.',
    availableSizes: ['XS', 'S', 'M', 'L', 'XL'],
    availableColors: ['Deep Wine Red', 'Forest Emerald'],
    colorHexes: ['#58111A', '#0B3B24'],
    stock: 9,
    description: 'Plush velvet gown featuring long sleeves, side thigh gathers, and a crystal embellished shoulder brooch brooch detail.',
    details: [
      'Removable crystal vintage shoulder brooch',
      'Ruched waist detail to sculpt waistline',
      'Floor length with modest train',
      'Plush winter-warm feel'
    ],
    reviews: []
  },
  {
    id: 'prod-19',
    sku: 'AV-CW-003',
    name: 'Aria Silk Slip Midi Dress',
    category: 'Casual Wear',
    collection: 'Resort & Riviera',
    price: 360,
    discountPrice: 295,
    rating: 4.7,
    reviewsCount: 40,
    images: [
      'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1496747611176-843222e1e57c?auto=format&fit=crop&w=1000&q=80'
    ],
    fabric: '100% Pure Mulberry Silk',
    washingInstructions: 'Hand Wash Cold with Silk Shampoo or Dry Clean.',
    availableSizes: ['XS', 'S', 'M', 'L', 'XL'],
    availableColors: ['Champagne Nude', 'Sage Green', 'Classic Black'],
    colorHexes: ['#E3D5CA', '#9CAF88', '#000000'],
    stock: 25,
    description: 'The ultimate essential pure silk 19 momme slip dress. Layer under blazers or wear solo with heels for minimalist luxury.',
    details: [
      '19 Momme 100% Grade A Mulberry Silk',
      'Adjustable thin straps',
      'French seams finish inside',
      'Naturally hypoallergenic & temperature regulating'
    ],
    isBestSeller: true,
    reviews: []
  },
  {
    id: 'prod-20',
    sku: 'AV-BR-004',
    name: 'Duchess Victoria Cathedral Wedding Dress',
    category: 'Bridal Dresses',
    collection: 'Royal Heritage 2026',
    price: 4500,
    discountPrice: 3990,
    rating: 5.0,
    reviewsCount: 19,
    images: [
      'https://images.unsplash.com/photo-1518895949257-7621c3c786d7?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1566174053879-31528523f8ae?auto=format&fit=crop&w=1000&q=80'
    ],
    fabric: 'Silk Mikado & Hand-embroidered Swarovski Crystal Mesh',
    washingInstructions: 'Museum Preservation Clean Only.',
    availableSizes: ['XS', 'S', 'M', 'L', 'Custom Stitching'],
    availableColors: ['Pure Ivory', 'Champagne Pearl'],
    colorHexes: ['#FFFFF0', '#F7E7CE'],
    stock: 3,
    description: 'The flagship gown of the 2026 Royal Heritage collection. Architectural Mikado silk ballgown with a 3-meter cathedral train and crystal sheer sleeves.',
    details: [
      '3-meter detachable cathedral train with bustle tie',
      'Swarovski crystal beaded sheer illusion sleeves',
      'Pocket detail hidden in Mikado silk folds',
      'Internal steel boned corset'
    ],
    isNewArrival: true,
    isBridal: true,
    featured: true,
    reviews: []
  }
];

export const INITIAL_ORDERS: Order[] = [
  {
    id: 'ORD-88291',
    date: '2026-07-28',
    customerInfo: {
      fullName: 'Sophia Martinez',
      email: 'sophia.m@example.com',
      phone: '+1 (555) 392-1082',
      address: '742 Park Avenue, Apt 14B',
      city: 'New York',
      state: 'NY',
      zipCode: '10021',
      country: 'United States'
    },
    items: [
      {
        id: 'cart-demo-01',
        product: INITIAL_PRODUCTS[0],
        selectedSize: 'M',
        selectedColor: 'Emerald Green',
        quantity: 1,
        customMeasurements: {
          bust: '36 in',
          waist: '28 in',
          hips: '39 in',
          height: '5 ft 8 in'
        }
      }
    ],
    subtotal: 2150,
    discount: 215,
    shippingFee: 0,
    tax: 154.8,
    total: 2089.8,
    couponCode: 'BRIDAL20',
    paymentMethod: 'Credit Card (Visa)',
    paymentStatus: 'Paid',
    status: 'Stitching',
    estimatedDelivery: '2026-08-10',
    courierName: 'DHL Express Couture',
    trackingNumber: 'DHL-8829104-NY',
    trackingHistory: [
      { status: 'Order Received', timestamp: '2026-07-28 09:15 AM', description: 'Order successfully placed and verified.', completed: true },
      { status: 'Payment Confirmed', timestamp: '2026-07-28 09:18 AM', description: 'Payment of $2,089.80 verified via Visa.', completed: true },
      { status: 'Processing', timestamp: '2026-07-29 11:30 AM', description: 'Measurements sent to Atelier Master Tailors.', completed: true },
      { status: 'Stitching', timestamp: '2026-07-30 02:00 PM', description: 'Hand-zardozi wire embroidery in progress at Studio.', completed: true },
      { status: 'Quality Check', timestamp: 'Pending', description: '30-point luxury finish inspection.', completed: false },
      { status: 'Packed', timestamp: 'Pending', description: 'Bespoke wooden box & garment dustbag packaging.', completed: false },
      { status: 'Shipped', timestamp: 'Pending', description: 'Handed to courier for global air shipment.', completed: false },
      { status: 'Out for Delivery', timestamp: 'Pending', description: 'Local driver out for signature delivery.', completed: false },
      { status: 'Delivered', timestamp: 'Pending', description: 'Package signed and delivered.', completed: false }
    ]
  },
  {
    id: 'ORD-77402',
    date: '2026-07-25',
    customerInfo: {
      fullName: 'Emma Watson',
      email: 'emma.watson@example.com',
      phone: '+44 20 7946 0912',
      address: '14 Mayfair Square',
      city: 'London',
      state: 'Greater London',
      zipCode: 'W1J 8AJ',
      country: 'United Kingdom'
    },
    items: [
      {
        id: 'cart-demo-02',
        product: INITIAL_PRODUCTS[3],
        selectedSize: 'S',
        selectedColor: 'Ruby Red',
        quantity: 1
      }
    ],
    subtotal: 640,
    discount: 0,
    shippingFee: 25,
    tax: 51.2,
    total: 716.2,
    paymentMethod: 'PayPal Express',
    paymentStatus: 'Paid',
    status: 'Shipped',
    estimatedDelivery: '2026-08-04',
    courierName: 'FedEx Priority International',
    trackingNumber: 'FDX-994102-UK',
    trackingHistory: [
      { status: 'Order Received', timestamp: '2026-07-25 04:20 PM', description: 'Order verified.', completed: true },
      { status: 'Payment Confirmed', timestamp: '2026-07-25 04:21 PM', description: 'PayPal payment processed.', completed: true },
      { status: 'Processing', timestamp: '2026-07-26 10:00 AM', description: 'Assigned to fulfillment center.', completed: true },
      { status: 'Stitching', timestamp: '2026-07-26 03:00 PM', description: 'Garment pre-pressed & hemmed.', completed: true },
      { status: 'Quality Check', timestamp: '2026-07-27 01:00 PM', description: 'Passed quality assurance inspection.', completed: true },
      { status: 'Packed', timestamp: '2026-07-27 05:30 PM', description: 'Packed in silk-lined gift box.', completed: true },
      { status: 'Shipped', timestamp: '2026-07-28 08:00 AM', description: 'Departed London Heathrow air hub.', completed: true },
      { status: 'Out for Delivery', timestamp: 'Pending', description: 'Scheduled for local courier drop-off.', completed: false },
      { status: 'Delivered', timestamp: 'Pending', description: 'Awaiting customer receipt.', completed: false }
    ]
  }
];

export const INITIAL_COUPONS: Coupon[] = [
  { code: 'BRIDAL20', discountType: 'percentage', discountValue: 20, expiryDate: '2026-12-31', active: true },
  { code: 'FIRST10', discountType: 'fixed', discountValue: 50, expiryDate: '2026-12-31', active: true },
  { code: 'ATELIER15', discountType: 'percentage', discountValue: 15, expiryDate: '2026-12-31', active: true }
];

export const BLOG_POSTS: BlogPost[] = [
  {
    id: 'blog-01',
    title: 'The Art of Zardozi: Preserving 16th Century Royal Embroidery',
    slug: 'art-of-zardozi-embroidery',
    excerpt: 'Discover how master artisans spend over 300 hours hand-weaving metallic gold wires into raw velvet for luxury bridal gowns.',
    content: `Zardozi embroidery was once reserved exclusively for royal courts, adornments of gold bullion wire, seed pearls, and semi-precious stones. At Aria Vance Atelier, we continue this centuries-old technique with master craftsmen who spend hundreds of hours hand-crafting every bridal bodice.
    
    The process begins with freehand tracing on sheer organza or heavy velvet stretched tightly over wooden frame looms (Karkhanas). Silver and gold metallic threads are coaxed into floral arabesques, scallops, and royal coat motifs.`,
    author: 'Aria Vance',
    date: 'July 14, 2026',
    category: 'Craftsmanship',
    readTime: '6 min read',
    image: 'https://images.unsplash.com/photo-1566174053879-31528523f8ae?auto=format&fit=crop&w=1000&q=80'
  },
  {
    id: 'blog-02',
    title: 'How to Choose the Perfect Silhouette for Your Body Type',
    slug: 'choose-perfect-gown-silhouette',
    excerpt: 'From architectural Mikado ballgowns to fluid 19 momme silk slips, find the flattering lines that celebrate your unique form.',
    content: `Finding your dream dress starts with understanding line, proportion, and weight. 
    
    1. Hourglass Figures: Embrace structured corsetry and bias-cut satin gowns like the Nocturne or Siren Gown that accentuate waist definition.
    2. Petite Frames: Opt for high-waisted empire silhouettes or column gowns with vertical seam lines to elongate your stance.
    3. Pear Shapes: A-line silk organza skirts balance shoulders while floating comfortably over hips.`,
    author: 'Elena Moreau (Lead Stylist)',
    date: 'June 28, 2026',
    category: 'Styling Guide',
    readTime: '4 min read',
    image: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=1000&q=80'
  },
  {
    id: 'blog-03',
    title: 'Luxury Garment Care: Caring for Silk, Organza & Feather Trims',
    slug: 'luxury-fabric-care-guide',
    excerpt: 'Essential rules for storing, steaming, and preserving delicate couture garments to last a lifetime.',
    content: `Designer garments are investment pieces that require mindful preservation:
    - Never store silk or velvet in plastic dry-clean bags. Use breathable unbleached cotton garment bags.
    - Always steam silk organza from the interior lining outwards; direct heat crushes organza crispness.
    - Ostrich feather trims should be shaken gently out to revive fluff after travel.`,
    author: 'Gaston Duprès (Master Conservator)',
    date: 'May 19, 2026',
    category: 'Fabric Care',
    readTime: '5 min read',
    image: 'https://images.unsplash.com/photo-1585487000160-6ebcfceb0d03?auto=format&fit=crop&w=1000&q=80'
  }
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: 'test-01',
    name: 'Princess Layla Al-Sabah',
    role: 'Verified Bride',
    location: 'Dubai & Milan',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
    quote: 'Aria Vance designed my entire bridal couture trousseau. The craftsmanship, gold wire handwork, and personal bespoke fitting sessions exceeded every expectation.',
    rating: 5
  },
  {
    id: 'test-02',
    name: 'Charlotte Sterling',
    role: 'Vogue Contributing Editor',
    location: 'Paris, France',
    avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=400&q=80',
    quote: 'The level of finish on the silk organza ballgown equals Paris Fashion Week standards. Absolute perfection in drape and corsetry.',
    rating: 5
  },
  {
    id: 'test-03',
    name: 'Camila Rodriguez',
    role: 'Red Carpet Client',
    location: 'Los Angeles, USA',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80',
    quote: 'The order tracking system let me follow my gown step-by-step from the stitching atelier in Europe straight to my hotel suite in LA!',
    rating: 5
  }
];
