'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import {
  MapPin,
  Phone,
  Clock,
  Mail,
  Star,
  ChefHat,
  Utensils,
  Wine,
  Coffee
} from 'lucide-react'

interface MenuItem {
  id: number
  category: string
  name: string
  description: string
  price: string
  popular?: boolean
  image?: string
}

export default function RestaurantWebsite() {
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [menuItems, setMenuItems] = useState<MenuItem[]>([])
  const [isLoading, setIsLoading] = useState(true)

  const menuCategories = [
    { id: 'all', name: 'All Items', icon: Utensils },
    { id: 'pide', name: 'Pide', icon: ChefHat },
    { id: 'lahmacun', name: 'Lahmacun', icon: Utensils },
    { id: 'pizza', name: 'Pizza', icon: ChefHat },
    { id: 'corba', name: 'Çorba', icon: Coffee },
    { id: 'tatlilar', name: 'Tatlilar', icon: Utensils },
    { id: 'icecek', name: 'İçecek', icon: Wine }
  ]

  // Real food-related images for each menu item - using reliable URLs
  const menuItemsWithImages: MenuItem[] = [
    // Pide Items
    {
      id: 1,
      category: 'pide',
      name: 'Kıymalı Pide',
      description: 'Traditional Turkish pizza with ground meat, onions, and spices',
      price: '$18',
      popular: true,
      image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=400&h=300&fit=crop&auto=format'
    },
    {
      id: 2,
      category: 'pide',
      name: 'Peynirli Pide',
      description: 'Turkish flatbread with melted cheese and parsley',
      price: '$16',
      image: 'https://images.unsplash.com/photo-1571091718767-18b5b1457add?w=400&h=300&fit=crop&auto=format'
    },
    {
      id: 3,
      category: 'pide',
      name: 'Sucuklu Pide',
      description: 'Turkish sausage with cheese and peppers',
      price: '$19',
      popular: true,
      image: 'https://images.unsplash.com/photo-1528207776546-365bb710ee93?w=400&h=300&fit=crop&auto=format'
    },
    {
      id: 4,
      category: 'pide',
      name: 'Yumurtalı Pide',
      description: 'Pide with egg, cheese, and sucuk',
      price: '$17',
      image: 'https://images.unsplash.com/photo-1565958011703-44f9829ba187?w=400&h=300&fit=crop&auto=format'
    },
    // Lahmacun Items
    {
      id: 5,
      category: 'lahmacun',
      name: 'Klasik Lahmacun',
      description: 'Thin crispy dough with minced meat, vegetables, and spices',
      price: '$12',
      popular: true,
      image: 'https://images.unsplash.com/photo-1590301157890-4810ed352733?w=400&h=300&fit=crop&auto=format'
    },
    {
      id: 6,
      category: 'lahmacun',
      name: 'Acılı Lahmacun',
      description: 'Spicy version with hot peppers and extra spices',
      price: '$13',
      image: 'https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?w=400&h=300&fit=crop&auto=format'
    },
    {
      id: 7,
      category: 'lahmacun',
      name: 'Sebzeli Lahmacun',
      description: 'Vegetarian version with fresh vegetables and herbs',
      price: '$11',
      image: 'https://images.unsplash.com/photo-1565958011703-44f9829ba187?w=400&h=300&fit=crop&auto=format'
    },
    // Pizza Items
    {
      id: 8,
      category: 'pizza',
      name: 'Turkish Pizza',
      description: 'Special blend with Turkish spices, sucuk, and bell peppers',
      price: '$22',
      popular: true,
      image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=400&h=300&fit=crop&auto=format'
    },
    {
      id: 9,
      category: 'pizza',
      name: 'Margarita',
      description: 'Classic mozzarella, tomato, and basil',
      price: '$18',
      image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=400&h=300&fit=crop&auto=format'
    },
    {
      id: 10,
      category: 'pizza',
      name: 'Meat Lovers',
      description: 'Pepperoni, sucuk, ground beef, and bacon',
      price: '$24',
      image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=400&h=300&fit=crop&auto=format'
    },
    {
      id: 11,
      category: 'pizza',
      name: 'Vegetarian',
      description: 'Bell peppers, mushrooms, olives, and tomatoes',
      price: '$19',
      image: 'https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?w=400&h=300&fit=crop&auto=format'
    },
    // Pide 1.5 (Large Size)
    {
      id: 12,
      category: 'pide',
      name: 'Büyük Kıymalı Pide (1.5)',
      description: 'Large size traditional pide with ground meat',
      price: '$25',
      popular: true,
      image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=400&h=300&fit=crop&auto=format'
    },
    {
      id: 13,
      category: 'pide',
      name: 'Büyük Peynirli Pide (1.5)',
      description: 'Large size pide with extra cheese',
      price: '$23',
      image: 'https://images.unsplash.com/photo-1571091718767-18b5b1457add?w=400&h=300&fit=crop&auto=format'
    },
    {
      id: 14,
      category: 'pide',
      name: 'Büyük Sucuklu Pide (1.5)',
      description: 'Large size pide with Turkish sausage',
      price: '$26',
      image: 'https://images.unsplash.com/photo-1528207776546-365bb710ee93?w=400&h=300&fit=crop&auto=format'
    },
    // Çorba (Soups)
    {
      id: 15,
      category: 'corba',
      name: 'Mercimek Çorbası',
      description: 'Traditional red lentil soup with mint and lemon',
      price: '$8',
      popular: true,
      image: 'https://images.unsplash.com/photo-1547592166-23ac45744acd?w=400&h=300&fit=crop&auto=format'
    },
    {
      id: 16,
      category: 'corba',
      name: 'Ezogelin Çorbası',
      description: 'Legendary Turkish soup with red lentils and bulgur',
      price: '$9',
      image: 'https://images.unsplash.com/photo-1547592166-23ac45744acd?w=400&h=300&fit=crop&auto=format'
    },
    {
      id: 17,
      category: 'corba',
      name: 'Domates Çorbası',
      description: 'Creamy tomato soup with croutons',
      price: '$7',
      image: 'https://images.unsplash.com/photo-1476124369491-e7addf5db371?w=400&h=300&fit=crop&auto=format'
    },
    {
      id: 18,
      category: 'corba',
      name: 'Tavuk Çorbası',
      description: 'Hearty chicken noodle soup with vegetables',
      price: '$9',
      image: 'https://images.unsplash.com/photo-1547592166-23ac45744acd?w=400&h=300&fit=crop&auto=format'
    },
    // Tatlilar (Desserts)
    {
      id: 19,
      category: 'tatlilar',
      name: 'Baklava',
      description: 'Layers of phyllo pastry with nuts and honey syrup',
      price: '$10',
      popular: true,
      image: 'https://images.unsplash.com/photo-1622621746668-59fb299bc4d7?w=400&h=300&fit=crop&auto=format'
    },
    {
      id: 20,
      category: 'tatlilar',
      name: 'Künefe',
      description: 'Hot cheese pastry with syrup and pistachios',
      price: '$12',
      image: 'https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?w=400&h=300&fit=crop&auto=format'
    },
    {
      id: 21,
      category: 'tatlilar',
      name: 'Sütlaç',
      description: 'Traditional Turkish rice pudding with cinnamon',
      price: '$8',
      image: 'https://images.unsplash.com/photo-1565958011703-44f9829ba187?w=400&h=300&fit=crop&auto=format'
    },
    {
      id: 22,
      category: 'tatlilar',
      name: 'Kadayıf',
      description: 'Shredded wheat dessert with nuts and syrup',
      price: '$11',
      image: 'https://images.unsplash.com/photo-1579372786545-d24232daf58c?w=400&h=300&fit=crop&auto=format'
    },
    // İçecek (Drinks)
    {
      id: 23,
      category: 'icecek',
      name: 'Ayran',
      description: 'Traditional Turkish yogurt drink',
      price: '$4',
      image: 'https://images.unsplash.com/photo-1525373612132-b3e820b87cea?w=400&h=300&fit=crop&auto=format'
    },
    {
      id: 24,
      category: 'icecek',
      name: 'Türk Kahvesi',
      description: 'Strong Turkish coffee',
      price: '$5',
      popular: true,
      image: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=400&h=300&fit=crop&auto=format'
    },
    {
      id: 25,
      category: 'icecek',
      name: 'Çay',
      description: 'Traditional Turkish tea',
      price: '$3',
      image: 'https://images.unsplash.com/photo-1544787219-7f47ccb76574?w=400&h=300&fit=crop&auto=format'
    },
    {
      id: 26,
      category: 'icecek',
      name: 'Soda',
      description: 'Soft drinks (Coke, Fanta, Sprite)',
      price: '$4',
      image: 'https://images.unsplash.com/photo-1527960471264-932f39eb5846?w=400&h=300&fit=crop&auto=format'
    },
    {
      id: 27,
      category: 'icecek',
      name: 'Su',
      description: 'Mineral water',
      price: '$2',
      image: 'https://images.unsplash.com/photo-1548839140-29a749e1cf4d?w=400&h=300&fit=crop&auto=format'
    },
    {
      id: 28,
      category: 'icecek',
      name: 'Taze Sıkılmış Meyve Suyu',
      description: 'Fresh squeezed orange juice',
      price: '$6',
      image: 'https://images.unsplash.com/photo-1600271886742-f049cd451bba?w=400&h=300&fit=crop&auto=format'
    }
  ]

  const galleryImages = [
    { id: 1, alt: 'Restaurant interior', url: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=600&h=400&fit=crop&auto=format' },
    { id: 2, alt: 'Chef preparing pide', url: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=600&h=400&fit=crop&auto=format' },
    { id: 3, alt: 'Elegant Turkish dining area', url: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=600&h=400&fit=crop&auto=format' },
    { id: 4, alt: 'Fresh Turkish bread and ingredients', url: 'https://images.unsplash.com/photo-1549931319-a545dcf3bc73?w=600&h=400&fit=crop&auto=format' },
    { id: 5, alt: 'Traditional Turkish kitchen', url: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=600&h=400&fit=crop&auto=format' },
    { id: 6, alt: 'Turkish coffee and baklava', url: 'https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?w=600&h=400&fit=crop&auto=format' }
  ]

  // Initialize menu items with real images
  useEffect(() => {
    setIsLoading(true)
    // Simulate loading for smooth animation
    setTimeout(() => {
      setMenuItems(menuItemsWithImages)
      setIsLoading(false)
    }, 500)
  }, [])

  const filteredMenuItems = selectedCategory === 'all'
    ? menuItems
    : menuItems.filter(item => item.category === selectedCategory)

  // Animation on scroll
  useEffect(() => {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-in')
        }
      })
    }, observerOptions)

    // Observe all sections
    const sections = document.querySelectorAll('section')
    sections.forEach(section => observer.observe(section))

    return () => observer.disconnect()
  }, [])

  return (
    <div className="min-h-screen bg-white">
      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        @keyframes slideInLeft {
          from {
            opacity: 0;
            transform: translateX(-50px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes slideInRight {
          from {
            opacity: 0;
            transform: translateX(50px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes scaleIn {
          from {
            opacity: 0;
            transform: scale(0.9);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }

        .animate-in {
          animation: fadeInUp 0.8s ease-out forwards;
        }

        .animate-delay-100 {
          animation-delay: 0.1s;
        }

        .animate-delay-200 {
          animation-delay: 0.2s;
        }

        .animate-delay-300 {
          animation-delay: 0.3s;
        }

        .hero-animate {
          animation: fadeIn 1.2s ease-out;
        }

        .slide-in-left {
          animation: slideInLeft 0.8s ease-out;
        }

        .slide-in-right {
          animation: slideInRight 0.8s ease-out;
        }

        .scale-in {
          animation: scaleIn 0.6s ease-out;
        }

        .menu-card {
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          height: 100%;
          display: flex;
          flex-direction: column;
        }

        .menu-card:hover {
          transform: translateY(-8px) scale(1.02);
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.15);
        }

        .menu-card:hover .menu-image {
          transform: scale(1.1);
        }

        .menu-image {
          transition: transform 0.3s ease;
        }

        .menu-card-content {
          flex: 1;
          display: flex;
          flex-direction: column;
        }

        .menu-card-body {
          flex: 1;
          padding: 1.5rem;
        }

        .menu-card-footer {
          padding: 1rem 1.5rem;
          border-top: 1px solid #f3f4f6;
          display: flex;
          justify-content: flex-end;
          align-items: center;
        }

        .float-animation {
          animation: float 3s ease-in-out infinite;
        }

        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }

        .pulse-animation {
          animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }

        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.7; }
        }

        .gradient-shift {
          background: linear-gradient(135deg, #f97316, #ea580c);
          background-size: 200% 200%;
          animation: gradient 3s ease infinite;
        }

        @keyframes gradient {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }

        .category-btn {
          transition: all 0.3s ease;
        }

        .category-btn:hover {
          transform: translateY(-2px);
        }

        .gallery-item {
          transition: all 0.3s ease;
        }

        .gallery-item:hover {
          transform: scale(1.05);
          z-index: 10;
        }

        .nav-link {
          position: relative;
          transition: color 0.3s ease;
        }

        .nav-link::after {
          content: '';
          position: absolute;
          bottom: -2px;
          left: 0;
          width: 0;
          height: 2px;
          background: #f97316;
          transition: width 0.3s ease;
        }

        .nav-link:hover::after {
          width: 100%;
        }

        .skeleton {
          background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
          background-size: 200% 100%;
          animation: loading 1.5s infinite;
        }

        @keyframes loading {
          0% { background-position: 200% 0; }
          100% { background-position: -200% 0; }
        }

        .hero-button {
          background: white;
          border: 2px solid white;
          color: #1f2937;
          transition: all 0.3s ease;
        }

        .hero-button:hover {
          background: #f3f4f6;
          color: #1f2937;
          border-color: white;
          transform: scale(1.05);
          box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
        }
      `}</style>

      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2 slide-in-left">
              <ChefHat className="h-8 w-8 text-orange-600" />
              <span className="text-xl font-bold text-gray-900">Anadolu Kitchen</span>
            </div>
            <div className="hidden md:flex items-center space-x-8 slide-in-right">
              <a href="#home" className="nav-link text-gray-700 hover:text-orange-600 transition">Home</a>
              <a href="#menu" className="nav-link text-gray-700 hover:text-orange-600 transition">Menu</a>
              <a href="#about" className="nav-link text-gray-700 hover:text-orange-600 transition">About</a>
              <a href="#gallery" className="nav-link text-gray-700 hover:text-orange-600 transition">Gallery</a>
              <a href="#contact" className="nav-link text-gray-700 hover:text-orange-600 transition">Contact</a>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section - Fixed to 100vh */}
      <section id="home" className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/50 z-10"></div>
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=1920&h=1080&fit=crop&crop=center"
            alt="Turkish Restaurant"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="relative z-20 text-center text-white px-4 max-w-4xl mx-auto hero-animate">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 float-animation">
            Welcome to Anadolu Kitchen
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-gray-200 animate-delay-200">
            Experience authentic Turkish cuisine with traditional pide, lahmacun, and more
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-delay-300">
            <Button
              size="lg"
              className="hero-button px-8 py-4 text-lg font-semibold"
              onClick={() => document.getElementById('menu')?.scrollIntoView({ behavior: 'smooth' })}
            >
              View Menu
            </Button>
          </div>
        </div>
      </section>

      {/* Menu Section */}
      <section id="menu" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Our Menu</h2>
            <p className="text-xl text-gray-600">Discover authentic Turkish flavors</p>
          </div>

          {/* Category Filter */}
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            {menuCategories.map((category, index) => {
              const Icon = category.icon
              return (
                <Button
                  key={category.id}
                  variant={selectedCategory === category.id ? "default" : "outline"}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`category-btn ${selectedCategory === category.id ? "gradient-shift" : ""} animate-delay-${index * 100}`}
                >
                  <Icon className="h-4 w-4 mr-2" />
                  {category.name}
                </Button>
              )
            })}
          </div>

          {/* Menu Items */}
          {isLoading ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(6)].map((_, index) => (
                <Card key={index} className="menu-card overflow-hidden">
                  <CardContent className="menu-card-content p-0">
                    <div className="skeleton h-48 w-full"></div>
                    <div className="menu-card-body">
                      <div className="flex justify-between items-start mb-2">
                        <div className="skeleton h-6 w-3/4 rounded"></div>
                        <div className="skeleton h-6 w-16 rounded"></div>
                      </div>
                      <div className="skeleton h-4 w-full rounded"></div>
                    </div>
                    <div className="menu-card-footer">
                      <div className="skeleton h-8 w-24 rounded"></div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredMenuItems.map((item, index) => (
                <Card key={item.id} className={`menu-card overflow-hidden animate-delay-${index * 100}`}>
                  <CardContent className="menu-card-content p-0">
                    <div className="relative h-48 overflow-hidden">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="menu-image w-full h-full object-cover"
                      />
                      {item.popular && (
                        <Badge className="absolute top-4 right-4 bg-orange-500 text-white">
                          Popular
                        </Badge>
                      )}
                    </div>
                    <div className="menu-card-body">
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="text-lg font-semibold text-gray-900">
                          {item.name}
                        </h3>
                        <span className="text-lg font-bold text-orange-600">{item.price}</span>
                      </div>
                      <p className="text-gray-600 text-sm">{item.description}</p>
                    </div>
                    <div className="menu-card-footer">
                      <Button size="sm" variant="outline" className="hover:bg-orange-600 hover:text-white transition">
                        Add to Order
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="slide-in-left">
              <h2 className="text-4xl font-bold text-gray-900 mb-6">Our Story</h2>
              <p className="text-lg text-gray-600 mb-6">
                Founded in 2015, Anadolu Kitchen brings the authentic flavors of Turkey to your table.
                Our head chef, Mehmet Yılmaz, learned the art of Turkish cooking from his grandmother
                in Gaziantep and has perfected these traditional recipes over the past 25 years.
              </p>
              <p className="text-lg text-gray-600 mb-8">
                We believe in using only the freshest ingredients, following traditional cooking methods.
                From wood-fired pide to handmade lahmacun, every dish is prepared with love and respect
                for our culinary heritage.
              </p>
              <div className="grid grid-cols-3 gap-8">
                <div className="text-center scale-in">
                  <div className="text-3xl font-bold text-orange-600 mb-2">8+</div>
                  <div className="text-gray-600">Years Experience</div>
                </div>
                <div className="text-center scale-in animate-delay-100">
                  <div className="text-3xl font-bold text-orange-600 mb-2">30+</div>
                  <div className="text-gray-600">Turkish Recipes</div>
                </div>
                <div className="text-center scale-in animate-delay-200">
                  <div className="text-3xl font-bold text-orange-600 mb-2">15k+</div>
                  <div className="text-gray-600">Happy Customers</div>
                </div>
              </div>
            </div>
            <div className="relative slide-in-right">
              <img
                src="https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=600&h=400&fit=crop"
                alt="Turkish chef cooking"
                className="rounded-lg shadow-xl hover:shadow-2xl transition-shadow duration-300"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section id="gallery" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Gallery</h2>
            <p className="text-xl text-gray-600">Take a look at our restaurant and Turkish dishes</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {galleryImages.map((image, index) => (
              <div key={image.id} className={`gallery-item relative overflow-hidden rounded-lg group animate-delay-${index * 100}`}>
                <img
                  src={image.url}
                  alt={image.alt}
                  className="w-full h-full object-cover transition duration-300"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition duration-300"></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12">
            <div className="slide-in-left">
              <h2 className="text-4xl font-bold text-gray-900 mb-8">Visit Us</h2>

              <div className="space-y-6">
                <div className="flex items-start space-x-4 hover:translate-x-2 transition-transform">
                  <MapPin className="h-6 w-6 text-orange-600 mt-1" />
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">Address</h3>
                    <p className="text-gray-600">
                      123 Turkish Street<br />
                      Cultural District<br />
                      New York, NY 10001
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4 hover:translate-x-2 transition-transform">
                  <Phone className="h-6 w-6 text-orange-600 mt-1" />
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">Phone</h3>
                    <p className="text-gray-600">(555) 123-4567</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4 hover:translate-x-2 transition-transform">
                  <Mail className="h-6 w-6 text-orange-600 mt-1" />
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">Email</h3>
                    <p className="text-gray-600">info@anadolukitchen.com</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4 hover:translate-x-2 transition-transform">
                  <Clock className="h-6 w-6 text-orange-600 mt-1" />
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">Opening Hours</h3>
                    <div className="text-gray-600">
                      <p>Monday - Thursday: 11:00 AM - 10:00 PM</p>
                      <p>Friday - Saturday: 11:00 AM - 11:00 PM</p>
                      <p>Sunday: 12:00 PM - 9:00 PM</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="rounded-lg overflow-hidden h-96 slide-in-right shadow-lg">
              <iframe
                title="Anadolu Kitchen Location"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3022.9663095113216!2d-74.00425882346696!3d40.74076153954!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c259bf5c1654f3%3A0xc80f9cfce5383d5d!2sChelsea%2C%20New%20York%2C%20NY%2010001!5e0!3m2!1sen!2sus!4v1700000000000!5m2!1sen!2sus"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <ChefHat className="h-8 w-8 text-orange-500" />
                <span className="text-xl font-bold">Anadolu Kitchen</span>
              </div>
              <p className="text-gray-400">
                Authentic Turkish cuisine in the heart of the city.
              </p>
            </div>

            <div>
              <h3 className="font-semibold mb-4">Quick Links</h3>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#menu" className="hover:text-orange-500 transition">Menu</a></li>
                <li><a href="#about" className="hover:text-orange-500 transition">About Us</a></li>
                <li><a href="#gallery" className="hover:text-orange-500 transition">Gallery</a></li>
                <li><a href="#contact" className="hover:text-orange-500 transition">Contact</a></li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold mb-4">Contact</h3>
              <ul className="space-y-2 text-gray-400">
                <li>123 Turkish Street</li>
                <li>New York, NY 10001</li>
                <li>(555) 123-4567</li>
                <li>info@anadolukitchen.com</li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold mb-4">Follow Us</h3>
              <div className="flex space-x-4">
                <div className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-orange-600 transition cursor-pointer transform hover:scale-110">
                  <span className="text-sm">f</span>
                </div>
                <div className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-orange-600 transition cursor-pointer transform hover:scale-110">
                  <span className="text-sm">t</span>
                </div>
                <div className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-orange-600 transition cursor-pointer transform hover:scale-110">
                  <span className="text-sm">i</span>
                </div>
              </div>
            </div>
          </div>

          <Separator className="my-8 bg-gray-800" />

          <div className="text-center text-gray-400">
            <p>© 2024 Anadolu Kitchen. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}