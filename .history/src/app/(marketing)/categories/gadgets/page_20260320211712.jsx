'use client';

import { useEffect, useState } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay, EffectCoverflow } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/effect-coverflow';
import { FaSearch, FaStar, FaShoppingCart, FaTag, FaEye, FaFilter } from 'react-icons/fa';
import Image from 'next/image';

// Full 15 Beauty Products JSON Data
const beautyData = [
  {
    id: 1,
    name: 'Luxury Foundation Cream',
    category: 'Skincare',
    price: 45,
    oldPrice: 55,
    rating: 4.7,
    reviews: 800,
    image: 'https://thumbs.dreamstime.com/b/cosmetics-beauty-products-make-up-sale-banner-glowing-neon-background-pink-sparkles-discount-off-promo-advertising-146396111.jpg',
  },
  {
    id: 2,
    name: 'Premium Perfume Spray',
    category: 'Perfume',
    price: 89,
    oldPrice: 109,
    rating: 4.8,
    reviews: 950,
    image: 'https://thumbs.dreamstime.com/b/luxuriant-product-shot-luxury-perfume-bottle-close-up-view-high-quality-cosmetic-ai-generated-luxuriant-product-shot-luxury-374078583.jpg',
  },
  {
    id: 3,
    name: 'Matte Lipstick Set',
    category: 'Makeup',
    price: 29,
    oldPrice: 39,
    rating: 4.6,
    reviews: 700,
    image: 'https://thumbs.dreamstime.com/b/captivating-cosmetics-banner-showcase-luxurious-makeup-skincare-products-your-online-store-elevate-presence-379638399.jpg',
  },
  {
    id: 4,
    name: 'Hydrating Serum',
    category: 'Skincare',
    price: 59,
    oldPrice: 69,
    rating: 4.9,
    reviews: 1100,
    image: 'https://marketplace.canva.com/EAFUB5kf688/1/0/1600w/canva-skincare-product-presentation-JmwTvEHH0EQ.jpg',
  },
  {
    id: 5,
    name: 'Eau de Parfum Deluxe',
    category: 'Perfume',
    price: 119,
    oldPrice: 139,
    rating: 4.8,
    reviews: 850,
    image: 'https://i.etsystatic.com/41855169/r/il/137d66/6212281442/il_fullxfull.6212281442_btf0.jpg',
  },
  {
    id: 6,
    name: 'Glow Highlighter Palette',
    category: 'Makeup',
    price: 39,
    oldPrice: 49,
    rating: 4.7,
    reviews: 600,
    image: 'https://tint.creativemarket.com/n5FB40tiOuSCkdlSyWK94UokNgpfOE1xi-OEd6P72oU/width:1200/height:800/gravity:ce/rt:fill-down/el:1/czM6Ly9maWxlcy5jcmVhdGl2ZW1hcmtldC5jb20vaW1hZ2VzL3NjcmVlbnNob3RzL3Byb2R1Y3RzLzUxMDQvNTEwNDUvNTEwNDU5MjkvOC1iZWF1dHktYW5kLXNraW5jYXJlLW51c2luZXNzLXN0b2NrLWltYWdlLWJ1bmRsZS1vLmpwZyMxNzE5NDMzNjY0?1719433664',
  },
  {
    id: 7,
    name: 'Anti-Aging Cream',
    category: 'Skincare',
    price: 79,
    oldPrice: 99,
    rating: 4.5,
    reviews: 500,
    image: 'https://coutureusa.com/cdn/shop/articles/IMG_0017-Edit_1800x.jpg?v=1730144188',
  },
  {
    id: 8,
    name: 'Eyeshadow Palette Pro',
    category: 'Makeup',
    price: 49,
    oldPrice: 59,
    rating: 4.8,
    reviews: 750,
    image: 'https://tint.creativemarket.com/igv4dmpUZcwzznSwkTpsO5dHhe_wRjsL_1Ajw2-0fz0/width:1200/height:800/gravity:ce/rt:fill-down/el:1/czM6Ly9maWxlcy5jcmVhdGl2ZW1hcmtldC5jb20vaW1hZ2VzL3NjcmVlbnNob3RzL3Byb2R1Y3RzLzU0NzMvNTQ3MzIvNTQ3MzI4OTUvMi1vLmpwZyMxNzYzNjQ1ODk4?1763645898',
  },
  {
    id: 9,
    name: 'Rose Perfume Essence',
    category: 'Perfume',
    price: 69,
    oldPrice: 89,
    rating: 4.6,
    reviews: 650,
    image: 'https://c8.alamy.com/comp/2H3YNJJ/skincare-gel-in-golden-bottle-and-business-card-on-pink-background-2H3YNJJ.jpg',
  },
  {
    id: 10,
    name: 'Blush & Bronzer Kit',
    category: 'Makeup',
    price: 35,
    oldPrice: 45,
    rating: 4.7,
    reviews: 550,
    image: 'https://thumbs.dreamstime.com/b/makeup-cosmetic-women-products-pouring-shopping-bag-pink-background-perfume-accessories-flat-lay-beauty-cheap-discount-162056848.jpg',
  },
  {
    id: 11,
    name: 'Moisturizing Lotion',
    category: 'Skincare',
    price: 25,
    oldPrice: 35,
    rating: 4.5,
    reviews: 400,
    image: 'https://thumbs.dreamstime.com/b/cosmetics-beauty-products-make-up-sale-banner-glowing-neon-background-pink-sparkles-discount-off-promo-advertising-146396111.jpg',
  },
  {
    id: 12,
    name: 'Vanilla Perfume Spray',
    category: 'Perfume',
    price: 99,
    oldPrice: 119,
    rating: 4.8,
    reviews: 900,
    image: 'https://thumbs.dreamstime.com/b/luxuriant-product-shot-luxury-perfume-bottle-close-up-view-high-quality-cosmetic-ai-generated-luxuriant-product-shot-luxury-374078583.jpg',
  },
  {
    id: 13,
    name: 'Mascara Volume Max',
    category: 'Makeup',
    price: 19,
    oldPrice: 29,
    rating: 4.6,
    reviews: 450,
    image: 'https://thumbs.dreamstime.com/b/captivating-cosmetics-banner-showcase-luxurious-makeup-skincare-products-your-online-store-elevate-presence-379638399.jpg',
  },
  {
    id: 14,
    name: 'Eye Cream Anti-Wrinkle',
    category: 'Skincare',
    price: 39,
    oldPrice: 49,
    rating: 4.7,
    reviews: 600,
    image: 'https://marketplace.canva.com/EAFUB5kf688/1/0/1600w/canva-skincare-product-presentation-JmwTvEHH0EQ.jpg',
  },
  {
    id: 15,
    name: 'Lip Gloss Shine',
    category: 'Makeup',
    price: 15,
    oldPrice: 25,
    rating: 4.5,
    reviews: 350,
    image: 'https://i.etsystatic.com/41855169/r/il/137d66/6212281442/il_fullxfull.6212281442_btf0.jpg',
  },
];

export default function BeautyPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('price-asc');
  const [currentPage, setCurrentPage] = useState(1);
  const [filterCategory, setFilterCategory] = useState('All');
  const [showFilter, setShowFilter] = useState(false);
  const itemsPerPage = 4;

  useEffect(() => {
    AOS.init({
      duration: 1200,
      once: false,
      offset: 100,
      easing: 'ease-in-out-quad',
    });
  }, []);

  const filteredProducts = beautyData
    .filter(product => product.name.toLowerCase().includes(searchTerm.toLowerCase()))
    .filter(product => filterCategory === 'All' || product.category === filterCategory)
    .sort((a, b) => {
      if (sortBy === 'price-asc') return a.price - b.price;
      if (sortBy === 'price-desc') return b.price - a.price;
      if (sortBy === 'rating') return b.rating - a.rating;
      return 0;
    });

  const paginatedProducts = filteredProducts.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  const categories = ['All', ...new Set(beautyData.map(p => p.category))];

  return (
    <div className="min-h-screen bg-white dark:bg-slate-950 text-slate-900 dark:text-white overflow-hidden">
      {/* Hero Section */}
      <section className="relative h-[50vh] flex items-center justify-center bg-gradient-to-br from-pink-900 to-purple-900 dark:from-slate-950 dark:to-purple-950 overflow-hidden" data-aos="fade-in" data-aos-duration="1500">
        <div className="text-center z-10">
          <h1 className="text-5xl md:text-7xl font-black text-white drop-shadow-2xl">ShopMart Beauty</h1>
          <p className="text-xl text-white/90 mt-4">Discover Premium Beauty Essentials</p>
        </div>
      </section>

      {/* Search + Filters Section */}
      <section className="px-4 py-12 max-w-7xl mx-auto">
        <div className="bg-slate-100 dark:bg-slate-800 rounded-3xl p-8 shadow-2xl relative">
          <div className="flex flex-col md:flex-row items-center gap-6">
            <div className="relative flex-1 group">
              <input
                type="text"
                placeholder="Search Beauty..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-14 py-5 bg-white dark:bg-slate-700 border-2 border-slate-300 dark:border-slate-600 rounded-full text-lg font-medium transition-all duration-300 focus:border-pink-600 focus:ring-4 focus:ring-pink-200 dark:focus:ring-pink-900 group-hover:border-pink-400 shadow-md"
              />
              <FaSearch className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-500 dark:text-gray-300 text-xl group-hover:text-pink-600 transition-colors pointer-events-none" />
            </div>

            <div className="flex flex-wrap gap-4 items-center relative">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-6 py-5 bg-white dark:bg-slate-700 border-2 border-slate-300 dark:border-slate-600 rounded-full text-lg font-medium transition-all focus:border-pink-600 focus:ring-4 focus:ring-pink-200 dark:focus:ring-pink-900 shadow-md"
              >
                <option value="price-asc">Price Low → High</option>
                <option value="price-desc">Price High → Low</option>
                <option value="rating">Highest Rating</option>
              </select>

              <select
                value={filterCategory}
                onChange={(e) => setFilterCategory(e.target.value)}
                className="px-6 py-5 bg-white dark:bg-slate-700 border-2 border-slate-300 dark:border-slate-600 rounded-full text-lg font-medium transition-all focus:border-pink-600 focus:ring-4 focus:ring-pink-200 dark:focus:ring-pink-900 shadow-md"
              >
                {categories.map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>

              <button 
                onClick={() => setShowFilter(!showFilter)}
                className="px-6 py-5 bg-pink-600 text-white rounded-full text-lg font-medium hover:bg-pink-700 transition-all shadow-md flex items-center gap-2"
              >
                <FaFilter /> Filter
              </button>

              {showFilter && (
                <div 
                  className="absolute md:relative top-full left-0 md:left-auto mt-2 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-600 rounded-xl shadow-2xl p-6 z-50 min-w-[220px]" 
                  data-aos="fade-down" 
                  data-aos-duration="300"
                >
                  <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
                    <FaFilter className="text-pink-600" /> Select Category
                  </h3>
                  <div className="space-y-2 max-h-64 overflow-y-auto">
                    {categories.map(cat => (
                      <button
                        key={cat}
                        onClick={() => {
                          setFilterCategory(cat);
                          setShowFilter(false);
                        }}
                        className={`w-full text-left px-4 py-3 rounded-lg hover:bg-pink-50 dark:hover:bg-pink-900 transition-colors ${filterCategory === cat ? 'bg-pink-100 dark:bg-pink-900 text-pink-700 dark:text-pink-300 font-semibold' : 'text-gray-800 dark:text-gray-200'}`}
                      >
                        {cat}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Featured Carousel */}
      <section className="px-4 py-20 bg-slate-50 dark:bg-slate-900" data-aos="fade-up" data-aos-duration="1500">
        <h2 className="text-5xl font-black text-center mb-16">Featured Beauty Products</h2>
        <Swiper
          modules={[Navigation, Pagination, Autoplay, EffectCoverflow]}
          effect="coverflow"
          grabCursor={true}
          centeredSlides={true}
          slidesPerView={3}
          spaceBetween={40}
          autoplay={{ delay: 3000 }}
          pagination={{ clickable: true }}
          navigation={true}
          breakpoints={{ 320: { slidesPerView: 1 }, 768: { slidesPerView: 2 }, 1024: { slidesPerView: 3 } }}
          className="max-w-7xl mx-auto"
        >
          {beautyData.slice(0, 5).map((product) => (
            <SwiperSlide key={product.id}>
              <div className="bg-white dark:bg-slate-800 rounded-3xl p-8 shadow-2xl hover:shadow-[0_0_30px_rgba(236,72,153,0.5)] transition-all duration-500 hover:rotate-3">
                <Image src={product.image} alt={product.name} width={500} height={400} className="rounded-2xl mb-6 object-cover" />
                <h3 className="text-2xl font-bold mb-2">{product.name}</h3>
                <p className="text-xl mb-4">${product.price} <span className="line-through text-gray-500">${product.oldPrice}</span> <FaTag className="inline text-red-500 ml-2" /></p>
                <div className="flex items-center mb-4">
                  <FaStar className="text-yellow-400 mr-2" /> {product.rating} ({product.reviews} reviews) <FaEye className="ml-4 text-gray-500" />
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </section>

      {/* All Products Grid */}
      <section className="px-4 py-20 max-w-7xl mx-auto" data-aos="fade-up" data-aos-delay="300" data-aos-duration="1500">
        <h2 className="text-5xl font-black text-center mb-16">All Beauty Products</h2>
        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {paginatedProducts.map((product) => (
            <div 
              key={product.id} 
              className="bg-white dark:bg-slate-800 rounded-3xl p-8 shadow-2xl hover:shadow-[0_0_40px_rgba(236,72,153,0.4)] hover:scale-105 transition-all duration-500 group relative overflow-hidden flex flex-col h-full"
              data-aos="zoom-in-up" 
              data-aos-delay="200"
            >
              {/* Discount Badge */}
              {product.oldPrice && (
                <div className="absolute top-4 right-4 bg-red-600 text-white px-4 py-2 rounded-full text-sm font-bold z-10 animate-pulse">
                  {Math.round(((product.oldPrice - product.price) / product.oldPrice) * 100)}% OFF
                </div>
              )}

              <Image 
                src={product.image} 
                alt={product.name} 
                width={400} 
                height={300} 
                className="rounded-2xl mb-6 object-cover group-hover:rotate-3 transition-transform duration-700 scale-105 group-hover:scale-110" 
              />

              <h3 className="text-2xl font-bold mb-3 group-hover:text-pink-600 transition-colors truncate">
                {product.name}
              </h3>

              <p className="text-2xl font-bold mb-4">
                ${product.price} 
                <span className="text-lg line-through text-gray-500 ml-3">${product.oldPrice}</span> 
                <FaTag className="inline text-red-500 ml-3" />
              </p>

              <div className="flex items-center mb-6">
                <FaStar className="text-yellow-400 text-2xl mr-2" /> 
                <span className="text-xl font-semibold">{product.rating}</span> 
                <span className="text-gray-500 ml-2">({product.reviews})</span>
                <FaEye className="ml-6 text-gray-500 text-xl" />
              </div>

              <button className="mt-auto w-full bg-pink-600 text-white py-4 rounded-2xl flex items-center justify-center gap-4 hover:bg-pink-700 hover:scale-105 transition-all duration-300 group-hover:shadow-xl text-lg font-bold shadow-md">
                <FaShoppingCart className="text-2xl" /> Add to Cart
              </button>
            </div>
          ))}
        </div>

        {/* Pagination */}
        <div className="flex justify-center mt-16 gap-6">
          {Array.from({ length: totalPages }).map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentPage(index + 1)}
              className={`px-8 py-4 rounded-2xl shadow-lg text-lg font-bold transition-all duration-300 ${currentPage === index + 1 ? 'bg-pink-600 text-white scale-110' : 'bg-slate-200 dark:bg-slate-700 hover:bg-pink-100 dark:hover:bg-pink-900 hover:scale-105'}`}
            >
              {index + 1}
            </button>
          ))}
        </div>
      </section>
    </div>
  );
}