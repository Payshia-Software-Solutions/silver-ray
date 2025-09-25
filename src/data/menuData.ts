
import type { RestaurantMenuType, MenuItemType } from '@/types';

const mainRestaurantMenu: RestaurantMenuType = {
  venueId: 'main-restaurant',
  venueName: 'Main Restaurant',
  venueDescription: "Experience our diverse culinary offerings, offering lovely international selections and authentic Sri Lankan delights in a vibrant and elegant setting.",
  heroImageUrl: 'https://images.unsplash.com/photo-1528908929486-dfaa209c6986?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwxMHx8ZWxlZ2FudCUyMHJlc3RhdXJhbnQlMjBpbnRlcmlvciUyMHRhYmxlc3xlbnwwfHx8fDE3NDkxNDYwNzZ8MA&ixlib-rb-4.1.0&q=80&w=1080',
  heroImageHint: 'elegant restaurant interior tables',
  categories: [
    {
      id: 'breakfast',
      name: 'Breakfast',
      items: [
        {
          id: 'bf-001',
          name: 'Continental Breakfast Platter',
          description: 'A delightful spread of freshly baked pastries, seasonal fruits, yogurt, and artisanal cheeses. Served with your choice of coffee or tea.',
          price: 'LKR 2,800',
          imageUrl: 'https://images.unsplash.com/photo-1493770348161-369560ae357d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHw1fHxjb250aW5lbnRhbCUyMGJyZWFrZmFzdCUyMHBsYXR0ZXJ8ZW58MHx8fHwxNzQ5MTQ2MDc2fDA&ixlib-rb-4.1.0&q=80&w=1080',
          imageHint: 'continental breakfast platter',
          dietaryIndicators: [{ type: 'vegetarian', label: 'Vegetarian', color: 'bg-green-500' }],
        },
        {
          id: 'bf-002',
          name: 'Sri Lankan Sunrise Bowl',
          description: 'String hoppers (idiyappam) served with a flavorful dhal curry, coconut sambol, and a gently poached egg. A local favorite.',
          price: 'LKR 2,500',
          imageUrl: 'https://images.unsplash.com/photo-1465014925804-7b9ede58d0d7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwxfHxzcmklMjBsYW5rYW4lMjBicmVha2Zhc3QlMjBib3dsfGVufDB8fHx8MTc0OTE0NjA3Nnww&ixlib-rb-4.1.0&q=80&w=1080',
          imageHint: 'sri lankan breakfast bowl',
          dietaryIndicators: [
            { type: 'vegetarian', label: 'Vegetarian', color: 'bg-green-500' },
            { type: 'spicy', label: 'Spicy', color: 'bg-red-500' }
          ],
        },
      ],
    },
    {
      id: 'starters',
      name: 'Starters / Appetizers',
      items: [
        {
          id: 'st-001',
          name: 'Seared Scallops with Lemon Butter',
          description: 'Pan-seared jumbo scallops served on a bed of asparagus puree with a tangy lemon butter sauce.',
          price: 'LKR 3,500',
          imageUrl: 'https://images.unsplash.com/photo-1734770395200-134b33ec8fb9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHw5fHxzZWFyZWQlMjBzY2FsbG9wcyUyMGFwcGV0aXplcnxlbnwwfHx8fDE3NDkxNDYwNzZ8MA&ixlib-rb-4.1.0&q=80&w=1080',
          imageHint: 'seared scallops appetizer',
        },
        {
          id: 'st-002',
          name: 'Caprese Salad Tower',
          description: 'Layers of fresh mozzarella, ripe tomatoes, and basil, drizzled with balsamic glaze and extra virgin olive oil.',
          price: 'LKR 2,200',
          imageUrl: 'https://images.unsplash.com/photo-1703224204050-695c5dffc734?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwzfHxjYXByZXNlJTIwc2FsYWQlMjB0b3dlcnxlbnwwfHx8fDE3NDkxNDYwNzZ8MA&ixlib-rb-4.1.0&q=80&w=1080',
          imageHint: 'caprese salad tower',
          dietaryIndicators: [{ type: 'vegetarian', label: 'Vegetarian', color: 'bg-green-500' }],
        },
      ],
    },
    {
      id: 'main-international',
      name: 'Main Courses (International)',
      items: [
        {
          id: 'mc-int-001',
          name: 'Grilled Salmon with Roasted Vegetables',
          description: 'Sustainably sourced salmon fillet, grilled to perfection, served with seasonal roasted vegetables and a dill yogurt sauce.',
          price: 'LKR 4,800',
          imageUrl: 'https://images.unsplash.com/photo-1559847844-d9d2bc807d82?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHw0fHxncmlsbGVkJTIwc2FsbW9uJTIwdmVnZXRhYmxlc3xlbnwwfHx8fDE3NDkxNDYwNzZ8MA&ixlib-rb-4.1.0&q=80&w=1080',
          imageHint: 'grilled salmon vegetables',
        },
        {
          id: 'mc-int-002',
          name: 'Mushroom Risotto',
          description: 'Creamy Arborio rice cooked with a medley of wild mushrooms, parmesan cheese, and a hint of truffle oil.',
          price: 'LKR 3,900',
          imageUrl: 'https://images.unsplash.com/photo-1488327092868-3dbcb3cacba6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHw5fHxtdXNocm9vbSUyMHJpc290dG8lMjBnb3VybWV0fGVufDB8fHx8MTc0OTE0NjA3Nnww&ixlib=rb-4.1.0&q=80&w=1080',
          imageHint: 'mushroom risotto gourmet',
          dietaryIndicators: [{ type: 'vegetarian', label: 'Vegetarian', color: 'bg-green-500' }],
          isChefSpecial: true,
        },
      ],
    },
    {
      id: 'main-local',
      name: 'Main Courses (Local / Sri Lankan)',
      items: [
        {
          id: 'mc-sl-001',
          name: 'Traditional Chicken Curry with Naan',
          description: 'Tender chicken pieces simmered in a rich, aromatic Sri Lankan curry blend, served with freshly baked naan bread.',
          price: 'LKR 3,600',
          imageUrl: 'https://images.unsplash.com/photo-1543206810-8f8cdd91d05e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHw0fHxjaGlja2VuJTIwY3VycnklMjBuYWFufGVufDB8fHx8MTc0OTE0NjA3Nnww&ixlib-rb-4.1.0&q=80&w=1080',
          imageHint: 'chicken curry naan',
          dietaryIndicators: [{ type: 'spicy', label: 'Spicy', color: 'bg-red-500' }],
        },
      ],
    },
    {
      id: 'chef-specials',
      name: "Chef's Specials",
      items: [
         {
          id: 'cs-001',
          name: 'Prime Ribeye with Truffle Mash',
          description: 'Juicy ribeye steak, truffle-infused mashed potatoes, and seasonal vegetables. A house favorite for a reason!',
          price: 'LKR 6,500',
          imageUrl: 'https://images.unsplash.com/photo-1592771582174-777dbbd2945e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwyfHxyaWJleWUlMjBzdGVhayUyMHRydWZmbGV8ZW58MHx8fHwxNzQ5MTQ2MDc2fDA&ixlib-rb-4.1.0&q=80&w=1080',
          imageHint: 'ribeye steak truffle',
          isChefSpecial: true,
          dietaryIndicators: [{ type: 'spicy', label: 'Mildly Spicy', color: 'bg-orange-500' }],
        },
        {
          id: 'mc-int-002', // Re-using from above as an example
          name: 'Mushroom Risotto (Chef Recommended)',
          description: 'Creamy Arborio rice cooked with a medley of wild mushrooms, parmesan cheese, and a hint of truffle oil. Highlighted by our Chef.',
          price: 'LKR 3,900',
          imageUrl: 'https://images.unsplash.com/photo-1543904856-8257e34283d9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwxMHx8bXVzaHJvb20lMjByaXNvdHRvJTIwZ291cm1ldHxlbnwwfHx8fDE3NDkxNDYwNzZ8MA&ixlib=rb-4.1.0&q=80&w=1080',
          imageHint: 'mushroom risotto gourmet',
          dietaryIndicators: [{ type: 'vegetarian', label: 'Vegetarian', color: 'bg-green-500' }],
          isChefSpecial: true,
        },
      ],
    },
    {
      id: 'desserts',
      name: 'Desserts',
      items: [
        {
          id: 'ds-001',
          name: 'Molten Chocolate Lava Cake',
          description: 'Rich chocolate cake with a warm, gooey center, served with vanilla bean ice cream and fresh berries.',
          price: 'LKR 1,800',
          imageUrl: 'https://images.unsplash.com/photo-1477505982272-ead89926a577?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwxMHx8Y2hvY29sYXRlJTIwbGF2YSUyMGNha2UlMjBkZXNzZXJ0fGVufDB8fHx8MTc0OTE0NTE2NHww&ixlib-rb-4.1.0&q=80&w=1080',
          imageHint: 'chocolate lava cake dessert',
          dietaryIndicators: [{ type: 'vegetarian', label: 'Vegetarian', color: 'bg-green-500' }],
        },
      ],
    },
     {
      id: 'beverages',
      name: 'Beverages',
      items: [
        {
          id: 'bv-001',
          name: 'Freshly Squeezed Juices',
          description: 'Orange, Pineapple, Watermelon, or Mixed Fruit.',
          price: 'LKR 900',
          imageUrl: 'https://images.unsplash.com/photo-1542932883-fe7e7dbad533?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHw0fHxmcmVzaCUyMGp1aWNlcyUyMGFzc29ydG1lbnR8ZW58MHx8fHwxNzQ5MTQ2MDc2fDA&ixlib-rb-4.1.0&q=80&w=1080',
          imageHint: 'fresh juices assortment',
          dietaryIndicators: [
            { type: 'vegetarian', label: 'Vegetarian', color: 'bg-green-500' },
            { type: 'vegan', label: 'Vegan', color: 'bg-blue-500' }
          ],
        },
      ],
    }
  ],
};

const cafe101Menu: RestaurantMenuType = {
  venueId: 'cafe-101',
  venueName: 'Cafe 101',
  venueDescription: "Authentic, traditional dishes in a relaxed atmosphere. Perfect for a casual meal or a quick bite.",
  heroImageUrl: 'https://placehold.co/1920x500.png',
  heroImageHint: 'cozy cafe interior',
  categories: [
    {
      id: 'sandwiches',
      name: 'Sandwiches & Wraps',
      items: [
        {
          id: 'sand-001',
          name: 'Club Sandwich',
          description: 'Classic triple-decker with chicken, bacon, lettuce, tomato, and egg. Served with fries.',
          price: 'LKR 2,000',
          imageUrl: 'https://placehold.co/300x200.png',
          imageHint: 'club sandwich fries',
        },
      ],
    },
  ],
};

const indianRestaurantMenu: RestaurantMenuType = {
  venueId: 'indian-restaurant',
  venueName: 'Indian Restaurant',
  venueDescription: "Traditional Indian flavors brought to life with aromatic spices and authentic recipes.",
  heroImageUrl: 'https://placehold.co/1920x500.png',
  heroImageHint: 'indian restaurant decor',
  categories: [
    {
      id: 'curries',
      name: 'Signature Curries',
      items: [
        {
          id: 'curry-001',
          name: 'Butter Chicken',
          description: 'Tender chicken tikka simmered in a creamy tomato and butter sauce. A timeless classic.',
          price: 'LKR 3,200',
          imageUrl: 'https://placehold.co/300x200.png',
          imageHint: 'butter chicken curry',
          dietaryIndicators: [{ type: 'spicy', label: 'Mildly Spicy', color: 'bg-orange-500' }],
        },
      ],
    },
  ],
};

export const AllRestaurantMenus: RestaurantMenuType[] = [
  mainRestaurantMenu,
  cafe101Menu,
  indianRestaurantMenu,
];

export const getMenuByVenueId = (venueId: string): RestaurantMenuType | undefined => {
  return AllRestaurantMenus.find(menu => menu.venueId === venueId);
};
