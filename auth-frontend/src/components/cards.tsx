import React, { useState } from 'react';
import { Star, ChevronLeft, ChevronRight } from 'lucide-react';

// Featured Services Component
function FeaturedServices() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const cardsPerView = {
    mobile: 1,
    tablet: 2,
    desktop: 3,
    wide: 4
  };

  const services = [
    {
      id: 1,
      title: 'Reserve Tank Cleaning',
      provider: 'Clean Services',
      rating: 4.3,
      reviews: 4,
      price: 'Rs. 3,200.00',
      description: 'Keep your water safe and hygienic with our expert reserve tank cleaning services.',
      image: 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="400" height="300"%3E%3Crect fill="%235C7C94" width="400" height="300"/%3E%3Ctext x="50%25" y="50%25" dominant-baseline="middle" text-anchor="middle" fill="white" font-size="24" font-family="Arial"%3ETank Cleaning%3C/text%3E%3C/svg%3E',
      verified: true,
    },
    {
      id: 2,
      title: 'Painting',
      provider: 'Sajito Sewa',
      rating: 4.7,
      reviews: 13,
      price: 'Rs. 25.00 / Sq.Ft',
      description: 'Give your home a fresh new look with vibrant colors and professional painting.',
      image: 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="400" height="300"%3E%3Crect fill="%23E8B86D" width="400" height="300"/%3E%3Ctext x="50%25" y="50%25" dominant-baseline="middle" text-anchor="middle" fill="white" font-size="24" font-family="Arial"%3EPainting%3C/text%3E%3C/svg%3E',
      verified: true,
    },
    {
      id: 3,
      title: 'Winter Offer on Geysers',
      provider: 'Sajito Sewa',
      rating: 4.7,
      reviews: 13,
      price: 'From Rs. 9,500.00',
      description: 'Keep your home warm this winter with exclusive discounts on Hilltak geysers.',
      image: 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="400" height="300"%3E%3Crect fill="%23FF6B6B" width="400" height="300"/%3E%3Ctext x="50%25" y="50%25" dominant-baseline="middle" text-anchor="middle" fill="white" font-size="24" font-family="Arial"%3EGeyser Offer%3C/text%3E%3C/svg%3E',
      verified: true,
    },
    {
      id: 4,
      title: 'Bathroom Renovation',
      provider: 'Sajito Project',
      rating: 5.0,
      reviews: 8,
      price: 'From Rs. 1,000.00',
      description: 'Ready to transform your outdated or leaking bathroom into a modern space.',
      image: 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="400" height="300"%3E%3Crect fill="%234ECDC4" width="400" height="300"/%3E%3Ctext x="50%25" y="50%25" dominant-baseline="middle" text-anchor="middle" fill="white" font-size="24" font-family="Arial"%3EBathroom%3C/text%3E%3C/svg%3E',
      verified: true,
    },
    {
      id: 5,
      title: 'Hire a Plumber',
      provider: 'Sajito Sewa',
      rating: 4.7,
      reviews: 13,
      price: 'Rs. 500.00 / Hour',
      description: 'Looking for expert plumbing services in Kathmandu? Available 24/7.',
      image: 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="400" height="300"%3E%3Crect fill="%23B026FF" width="400" height="300"/%3E%3Ctext x="50%25" y="50%25" dominant-baseline="middle" text-anchor="middle" fill="white" font-size="24" font-family="Arial"%3EPlumber%3C/text%3E%3C/svg%3E',
      verified: true,
    },
    {
      id: 6,
      title: 'Electrical Services',
      provider: 'Power Solutions',
      rating: 4.8,
      reviews: 20,
      price: 'Rs. 600.00 / Hour',
      description: 'Professional electrical installation, repair, and maintenance services.',
      image: 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="400" height="300"%3E%3Crect fill="%23F39C12" width="400" height="300"/%3E%3Ctext x="50%25" y="50%25" dominant-baseline="middle" text-anchor="middle" fill="white" font-size="24" font-family="Arial"%3EElectrical%3C/text%3E%3C/svg%3E',
      verified: true,
    },
    {
      id: 7,
      title: 'Carpentry Work',
      provider: 'Wood Masters',
      rating: 4.6,
      reviews: 15,
      price: 'Rs. 800.00 / Day',
      description: 'Custom furniture, door installation, and all types of carpentry work.',
      image: 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="400" height="300"%3E%3Crect fill="%238B4513" width="400" height="300"/%3E%3Ctext x="50%25" y="50%25" dominant-baseline="middle" text-anchor="middle" fill="white" font-size="24" font-family="Arial"%3ECarpentry%3C/text%3E%3C/svg%3E',
      verified: true,
    },
    {
      id: 8,
      title: 'AC Installation & Repair',
      provider: 'Cool Tech',
      rating: 4.9,
      reviews: 25,
      price: 'Rs. 1,500.00',
      description: 'Expert air conditioner installation, servicing, and repair services.',
      image: 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="400" height="300"%3E%3Crect fill="%2300BCD4" width="400" height="300"/%3E%3Ctext x="50%25" y="50%25" dominant-baseline="middle" text-anchor="middle" fill="white" font-size="24" font-family="Arial"%3EAC Service%3C/text%3E%3C/svg%3E',
      verified: true,
    },
    {
      id: 9,
      title: 'Home Cleaning',
      provider: 'Clean Home',
      rating: 4.5,
      reviews: 30,
      price: 'Rs. 2,000.00',
      description: 'Deep cleaning services for your entire home. Professional and reliable.',
      image: 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="400" height="300"%3E%3Crect fill="%239C27B0" width="400" height="300"/%3E%3Ctext x="50%25" y="50%25" dominant-baseline="middle" text-anchor="middle" fill="white" font-size="24" font-family="Arial"%3ECleaning%3C/text%3E%3C/svg%3E',
      verified: true,
    },
    {
      id: 10,
      title: 'Pest Control',
      provider: 'Pest Away',
      rating: 4.4,
      reviews: 12,
      price: 'Rs. 1,800.00',
      description: 'Effective pest control solutions for homes and offices. Safe and eco-friendly.',
      image: '',
      verified: true,
    },
    {
      id: 11,
      title: 'Gardening Services',
      provider: 'Green Thumb',
      rating: 4.6,
      reviews: 18,
      price: 'Rs. 1,200.00',
      description: 'Professional landscaping, lawn care, and garden maintenance services.',
      image: 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="400" height="300"%3E%3Crect fill="%2366BB6A" width="400" height="300"/%3E%3Ctext x="50%25" y="50%25" dominant-baseline="middle" text-anchor="middle" fill="white" font-size="24" font-family="Arial"%3EGardening%3C/text%3E%3C/svg%3E',
      verified: true,
    },
    {
      id: 12,
      title: 'Interior Design',
      provider: 'Design Hub',
      rating: 4.9,
      reviews: 22,
      price: 'Rs. 5,000.00',
      description: 'Transform your space with our expert interior design consultation services.',
      image: 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="400" height="300"%3E%3Crect fill="%23FF5722" width="400" height="300"/%3E%3Ctext x="50%25" y="50%25" dominant-baseline="middle" text-anchor="middle" fill="white" font-size="24" font-family="Arial"%3EInterior%3C/text%3E%3C/svg%3E',
      verified: true,
    },
  ];

  const getCardsToShow = () => {
    if (typeof window !== 'undefined') {
      if (window.innerWidth < 768) return cardsPerView.mobile;
      if (window.innerWidth < 1024) return cardsPerView.tablet;
      if (window.innerWidth < 1280) return cardsPerView.desktop;
      return cardsPerView.wide;
    }
    return cardsPerView.desktop;
  };

  const [cardsToShow, setCardsToShow] = useState(getCardsToShow());

  React.useEffect(() => {
    const handleResize = () => {
      setCardsToShow(getCardsToShow());
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const maxIndex = Math.max(0, services.length - cardsToShow);

  const nextSlide = () => {
    setCurrentIndex((prev) => Math.min(prev + 1, maxIndex));
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => Math.max(prev - 1, 0));
  };

  const visibleServices = services.slice(currentIndex, currentIndex + cardsToShow);

  return (
    <div className="w-full bg-white py-8 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-8 sm:mb-12">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900">
            Featured Services
          </h2>
          
          <div className="flex gap-2">
            <button
              onClick={prevSlide}
              disabled={currentIndex === 0}
              className="p-2 rounded-full bg-gray-100 hover:bg-[#5C7C94] hover:text-white transition shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <ChevronLeft size={24} />
            </button>
            <button
              onClick={nextSlide}
              disabled={currentIndex >= maxIndex}
              className="p-2 rounded-full bg-gray-100 hover:bg-[#5C7C94] hover:text-white transition shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <ChevronRight size={24} />
            </button>
          </div>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 transition-all duration-500">
          {visibleServices.map((service) => (
            <ServiceCard key={service.id} service={service} />
          ))}
        </div>

        {/* Pagination Dots */}
        <div className="flex justify-center gap-2 mt-8">
          {Array.from({ length: maxIndex + 1 }).map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentIndex(idx)}
              className={`h-2 rounded-full transition-all ${
                idx === currentIndex ? 'bg-[#5C7C94] w-8' : 'bg-gray-300 w-2'
              }`}
            />
          ))}
        </div>

        {/* View All Button */}
        <div className="text-center mt-10">
          <button className="px-8 py-3 bg-[#5C7C94] hover:bg-[#B026FF] text-white font-semibold rounded-lg transition shadow-lg">
            View All Services
          </button>
        </div>
      </div>
    </div>
  );
}

// Service Card Component
function ServiceCard({ service }: { service: any }) {
  return (
    <div className="group bg-white rounded-xl overflow-hidden border border-gray-100 shadow-sm 
      hover:shadow-xl hover:-translate-y-2 hover:scale-[1.02]
      transition-all duration-300 ease-out flex flex-col h-full">

      {/* Header */}
      <div className="relative h-40 overflow-hidden">
        <div className="w-full h-full flex items-center justify-center 
          bg-linear-to-br from-[#5C7C94] to-[#B026FF]
          group-hover:scale-110 transition-transform duration-500">
          <span className="text-white text-lg font-bold text-center px-3 leading-snug">
            {service.title}
          </span>
        </div>

        {/* Rating */}
        <div className="absolute top-2 right-2 bg-white/90 backdrop-blur px-2.5 py-1 rounded-full 
          flex items-center gap-1 shadow text-xs">
          <Star size={14} className="fill-yellow-400 text-yellow-400" />
          <span className="font-semibold text-gray-800">{service.rating}</span>
          <span className="text-gray-500">({service.reviews})</span>
        </div>
      </div>

      {/* Content */}
      <div className="p-4 flex flex-col grow">
        <h3 className="text-base font-bold text-gray-900 mb-1 line-clamp-2">
          {service.title}
        </h3>

        <div className="flex items-center gap-1.5 mb-2">
          <span className="text-sm font-medium text-gray-600">
            {service.provider}
          </span>
          {service.verified && (
            <span className="text-[10px] bg-orange-500 text-white px-2 py-0.5 rounded-full">
              Verified
            </span>
          )}
        </div>

        <p className="text-sm text-gray-600 mb-3 line-clamp-2">
          {service.description}
        </p>

        {/* Footer */}
        <div className="mt-auto pt-3 border-t flex items-center justify-between">
          <span className="text-base font-bold text-[#5C7C94]">
            {service.price}
          </span>

          <button className="px-4 py-1.5 text-sm font-semibold rounded-lg
            bg-[#5C7C94] text-white
            hover:bg-[#B026FF] active:scale-95
            transition-all duration-200 shadow hover:shadow-md">
            Book
          </button>
        </div>
      </div>
    </div>
  );
}



export default FeaturedServices;