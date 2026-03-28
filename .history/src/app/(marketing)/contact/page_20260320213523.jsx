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
import {
  FaPhone,
  FaEnvelope,
  FaMapMarkerAlt,
  FaClock,
  FaFacebook,
  FaTwitter,
  FaLinkedin,
  FaInstagram,
  FaPaperPlane,
  FaHeadset,
  FaRocket,
  FaShieldAlt,
  FaCheckCircle,
  FaSmile,
  FaUsers,
  FaBox,
  FaUndo,
  FaCrown,
  FaShoppingCart,
  FaUser,
  FaArrowRight,
  FaGlobe,
  FaStar,
  FaWrench
} from 'react-icons/fa';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  useEffect(() => {
    AOS.init({
      duration: 1200,
      once: false,
      offset: 100,
      easing: 'ease-in-out-quad'
    });
  }, []);

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <div suppressHydrationWarning className="w-full min-h-screen bg-white dark:bg-slate-950 overflow-hidden">
      {/* ===== ADVANCED 3D HERO SECTION ===== */}
      <section className="relative h-screen flex items-center justify-center px-4 bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 dark:from-slate-950 dark:via-purple-950 dark:to-slate-950 overflow-hidden">
        
        {/* 3D Animated Background Spheres */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div 
            className="absolute top-1/4 -left-32 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl"
            style={{
              animation: 'float 8s ease-in-out infinite',
              backdropFilter: 'blur(40px)'
            }}
          ></div>
          <div 
            className="absolute bottom-1/4 -right-32 w-96 h-96 bg-pink-500/20 rounded-full blur-3xl"
            style={{
              animation: 'float 10s ease-in-out infinite',
              animationDelay: '2s',
              backdropFilter: 'blur(40px)'
            }}
          ></div>
          <div 
            className="absolute top-1/2 left-1/3 w-80 h-80 bg-purple-500/15 rounded-full blur-3xl"
            style={{
              animation: 'float 12s ease-in-out infinite',
              animationDelay: '4s'
            }}
          ></div>
        </div>

        {/* 3D Animated Grid */}
        <div className="absolute inset-0 opacity-10">
          <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid slice">
            <defs>
              <pattern id="grid3d" x="10" y="10" width="10" height="10" patternUnits="userSpaceOnUse">
                <path d="M 10 0 L 0 0 0 10" fill="none" stroke="white" strokeWidth="0.5"/>
              </pattern>
            </defs>
            <rect width="100" height="100" fill="url(#grid3d)" />
          </svg>
        </div>

        {/* Hero Content with 3D Perspective */}
        <div className="relative z-10 text-center max-w-5xl" data-aos="fade-up" data-aos-duration="1500">
          <div className="mb-8" style={{ perspective: '1200px' }}>
            <h1 
              className="text-5xl md:text-7xl lg:text-8xl font-black text-white mb-8 leading-tight tracking-tighter drop-shadow-2xl"
              style={{
                textShadow: '0 20px 40px rgba(0,0,0,0.5), 0 0 40px rgba(99,102,241,0.3)',
                backgroundImage: 'linear-gradient(45deg, #60a5fa, #a78bfa, #f472b6)',
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                animation: 'bounceText 3s ease-in-out infinite'
              }}
            >
              Connect With Us
            </h1>
          </div>
          
          <p 
            className="text-xl md:text-2xl text-white/90 leading-relaxed drop-shadow-lg max-w-2xl mx-auto"
            data-aos="fade-up"
            data-aos-delay="200"
            data-aos-duration="1200"
          >
            Transform your questions into solutions. We're here to support your journey.
          </p>

          {/* Animated CTA Arrow */}
          <div 
            className="mt-12 flex justify-center"
            data-aos="fade-up"
            data-aos-delay="400"
          >
            <div className="animate-bounce">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
              </svg>
            </div>
          </div>
        </div>

        {/* Floating 3D Cards (Hero Section) */}
        <div className="absolute bottom-10 left-0 right-0 flex justify-center gap-8 flex-wrap px-4">
          {[
            { icon: FaRocket, label: 'Fast Support', value: '< 2hr' },
            { icon: FaShieldAlt, label: 'Secure & Safe', value: '100%' },
            { icon: FaHeadset, label: '24/7 Online', value: 'Always' }
          ].map((item, idx) => (
            <div
              key={idx}
              className="backdrop-blur-md bg-white/10 border border-white/20 rounded-2xl p-6 min-w-[150px] hover:bg-white/20 transition-all duration-300 hover:scale-110"
              data-aos="zoom-in"
              data-aos-delay={idx * 100}
              style={{
                animation: `float ${4 + idx}s ease-in-out infinite`,
                animationDelay: `${idx * 0.5}s`
              }}
            >
              <item.icon className="text-3xl text-blue-400 mx-auto mb-3" />
              <p className="text-sm font-semibold text-white text-center">{item.label}</p>
              <p className="text-lg font-bold text-blue-300 text-center">{item.value}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ===== ADVANCED 3D CONTACT CARDS ===== */}
      <section className="px-4 py-32 max-w-7xl mx-auto">
        <div className="text-center mb-20" data-aos="fade-up">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-slate-900 dark:text-white mb-8">
            Multiple Ways to Connect
          </h2>
          <div className="flex gap-3 justify-center">
            <div className="w-24 h-1 bg-gradient-to-r from-blue-600 to-transparent rounded-full"></div>
            <div className="w-24 h-1 bg-gradient-to-r from-purple-600 to-transparent rounded-full"></div>
            <div className="w-24 h-1 bg-gradient-to-r from-pink-600 to-transparent rounded-full"></div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-20">
          {[
            {
              icon: FaPhone,
              title: 'Call Us',
              content: '+1 (555) 123-4567',
              subtext: 'Mon-Fri, 9AM-6PM EST',
              color: 'from-blue-500 to-cyan-500',
              delay: 0
            },
            {
              icon: FaEnvelope,
              title: 'Email Us',
              content: 'support@example.com',
              subtext: 'Response within 24hr',
              color: 'from-purple-500 to-pink-500',
              delay: 100
            },
            {
              icon: FaMapMarkerAlt,
              title: 'Visit Us',
              content: '123 Business St',
              subtext: 'City, State 12345',
              color: 'from-orange-500 to-red-500',
              delay: 200
            },
            {
              icon: FaClock,
              title: 'Live Chat',
              content: 'Chat Now',
              subtext: 'Online 24/7',
              color: 'from-emerald-500 to-teal-500',
              delay: 300
            }
          ].map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="group relative h-80"
                data-aos="flip-left"
                data-aos-delay={item.delay}
                data-aos-duration="1200"
              >
                {/* 3D Card Container */}
                <div 
                  className="relative w-full h-full cursor-pointer"
                  style={{ perspective: '1200px' }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'rotateX(15deg) rotateY(-20deg)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'rotateX(0) rotateY(0)';
                  }}
                >
                  <div 
                    className={`absolute inset-0 bg-gradient-to-br ${item.color} rounded-3xl p-8 flex flex-col items-center justify-center text-white shadow-2xl`}
                    style={{
                      transformStyle: 'preserve-3d',
                      filter: 'drop-shadow(0 25px 50px rgba(0,0,0,0.3))',
                      transition: 'all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)'
                    }}
                  >
                    {/* Glassmorphism Overlay */}
                    <div className="absolute inset-0 rounded-3xl bg-white/10 backdrop-blur-sm"></div>

                    {/* Icon with 3D Glow */}
                    <div 
                      className="relative z-10 mb-6 text-6xl group-hover:scale-125 transition-transform duration-500"
                      style={{
                        textShadow: '0 0 30px rgba(255,255,255,0.5)',
                        filter: 'drop-shadow(0 10px 20px rgba(0,0,0,0.2))'
                      }}
                    >
                      <Icon />
                    </div>

                    {/* Content */}
                    <div className="relative z-10 text-center">
                      <h3 className="text-2xl font-bold mb-3">{item.title}</h3>
                      <p className="text-lg font-semibold mb-2">{item.content}</p>
                      <p className="text-sm opacity-90">{item.subtext}</p>
                    </div>

                    {/* Animated Border */}
                    <div 
                      className="absolute inset-0 rounded-3xl border-2 border-white/30"
                      style={{
                        boxShadow: 'inset 0 0 30px rgba(255,255,255,0.1)'
                      }}
                    ></div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* ===== CONTACT FORM WITH 3D EFFECTS ===== */}
      <section className="px-4 py-32 bg-gradient-to-b from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Left Side - Text */}
            <div data-aos="fade-right" data-aos-duration="1200">
              <h2 className="text-4xl md:text-5xl font-black text-slate-900 dark:text-white mb-8">
                Send us a Message
              </h2>
              <p className="text-xl text-slate-600 dark:text-gray-300 mb-8 leading-relaxed">
                Have a question or feedback? We'd love to hear from you. Fill out the form and we'll get back to you as soon as possible.
              </p>

              {/* Benefit Cards */}
              <div className="space-y-5">
                {[
                  { icon: FaCheckCircle, text: 'Fast Response Times' },
                  { icon: FaCheckCircle, text: 'Expert Team Support' },
                  { icon: FaCheckCircle, text: 'Secure Communication' },
                  { icon: FaCheckCircle, text: 'Available 24/7' }
                ].map((benefit, idx) => (
                  <div 
                    key={idx}
                    className="flex items-center gap-4 p-4 bg-white/50 dark:bg-white/10 backdrop-blur-sm rounded-xl hover:bg-white/80 dark:hover:bg-white/20 transition-all duration-300"
                    data-aos="fade-right"
                    data-aos-delay={idx * 50}
                  >
                    <benefit.icon className="text-2xl text-green-600 dark:text-green-400 flex-shrink-0" />
                    <p className="text-lg font-semibold text-slate-900 dark:text-white">{benefit.text}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Side - Form with 3D Effects */}
            <div 
              data-aos="fade-left" 
              data-aos-duration="1200"
              style={{ perspective: '1200px' }}
            >
              <div 
                className="bg-white dark:bg-slate-800 rounded-3xl p-8 md:p-12 shadow-2xl border border-slate-100 dark:border-slate-700"
                style={{
                  boxShadow: '0 20px 60px rgba(0,0,0,0.15), inset 0 1px 0 rgba(255,255,255,0.2)',
                  backdropFilter: 'blur(20px)'
                }}
              >
                <form className="space-y-6">
                  {/* Name Input */}
                  <div className="relative group" data-aos="fade-up" data-aos-delay="100">
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleFormChange}
                      placeholder="Your Full Name"
                      className="w-full px-6 py-4 bg-slate-50 dark:bg-slate-700 border-2 border-slate-200 dark:border-slate-600 rounded-2xl font-medium transition-all duration-300 text-slate-900 dark:text-white placeholder-slate-500 dark:placeholder-slate-400 focus:outline-none focus:border-blue-600 focus:ring-4 focus:ring-blue-100 dark:focus:ring-blue-900 group-hover:border-slate-300 dark:group-hover:border-slate-500"
                    />
                  </div>

                  {/* Email Input */}
                  <div className="relative group" data-aos="fade-up" data-aos-delay="150">
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleFormChange}
                      placeholder="Your Email Address"
                      className="w-full px-6 py-4 bg-slate-50 dark:bg-slate-700 border-2 border-slate-200 dark:border-slate-600 rounded-2xl font-medium transition-all duration-300 text-slate-900 dark:text-white placeholder-slate-500 dark:placeholder-slate-400 focus:outline-none focus:border-blue-600 focus:ring-4 focus:ring-blue-100 dark:focus:ring-blue-900 group-hover:border-slate-300 dark:group-hover:border-slate-500"
                    />
                  </div>

                  {/* Subject Input */}
                  <div className="relative group" data-aos="fade-up" data-aos-delay="200">
                    <input
                      type="text"
                      name="subject"
                      value={formData.subject}
                      onChange={handleFormChange}
                      placeholder="Subject"
                      className="w-full px-6 py-4 bg-slate-50 dark:bg-slate-700 border-2 border-slate-200 dark:border-slate-600 rounded-2xl font-medium transition-all duration-300 text-slate-900 dark:text-white placeholder-slate-500 dark:placeholder-slate-400 focus:outline-none focus:border-blue-600 focus:ring-4 focus:ring-blue-100 dark:focus:ring-blue-900 group-hover:border-slate-300 dark:group-hover:border-slate-500"
                    />
                  </div>

                  {/* Message Textarea */}
                  <div className="relative group" data-aos="fade-up" data-aos-delay="250">
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleFormChange}
                      placeholder="Your Message"
                      rows="5"
                      className="w-full px-6 py-4 bg-slate-50 dark:bg-slate-700 border-2 border-slate-200 dark:border-slate-600 rounded-2xl font-medium transition-all duration-300 text-slate-900 dark:text-white placeholder-slate-500 dark:placeholder-slate-400 focus:outline-none focus:border-blue-600 focus:ring-4 focus:ring-blue-100 dark:focus:ring-blue-900 group-hover:border-slate-300 dark:group-hover:border-slate-500 resize-none"
                    />
                  </div>

                  {/* Submit Button with 3D Effect */}
                  <button
                    type="submit"
                    className="w-full bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 hover:from-blue-700 hover:via-purple-700 hover:to-pink-700 text-white font-bold py-4 px-6 rounded-2xl transition-all duration-300 flex items-center justify-center gap-3 shadow-xl hover:shadow-2xl hover:scale-105 active:scale-95 group transform"
                    data-aos="fade-up"
                    data-aos-delay="300"
                    style={{
                      backgroundSize: '200% 200%',
                      animation: 'gradientFlow 3s ease infinite'
                    }}
                  >
                    <FaPaperPlane className="text-lg group-hover:rotate-45 transition-transform duration-300" />
                    <span>Send Message</span>
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== FAQ WITH 3D CARDS ===== */}
      <section className="px-4 py-32 max-w-6xl mx-auto">
        <div className="text-center mb-20" data-aos="fade-up">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-slate-900 dark:text-white mb-8">
            Frequently Asked Questions
          </h2>
          <p className="text-xl text-slate-600 dark:text-gray-300">Find answers to common questions</p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {[
            {
              q: 'How quickly will I receive a response?',
              a: 'We aim to respond to all inquiries within 2 hours during business hours.',
              icon: FaClock
            },
            {
              q: 'What are your business hours?',
              a: 'We are open 24/7 for inquiries. Our team responds within 2 hours.',
              icon: FaHeadset
            },
            {
              q: 'Can I schedule a call?',
              a: 'Yes! You can schedule a call directly from our contact form.',
              icon: FaPhone
            },
            {
              q: 'Is my information secure?',
              a: 'Absolutely. We use enterprise-level encryption for all communications.',
              icon: FaShieldAlt
            }
          ].map((faq, idx) => {
            const Icon = faq.icon;
            return (
              <div
                key={idx}
                className="group relative bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-800 dark:to-slate-700 p-8 rounded-3xl border-2 border-slate-200 dark:border-slate-600 hover:border-blue-500 dark:hover:border-blue-400 transition-all duration-300 cursor-pointer overflow-hidden"
                data-aos="zoom-in"
                data-aos-delay={idx * 100}
              >
                {/* Icon */}
                <Icon className="text-4xl text-blue-600 dark:text-blue-400 mb-4 group-hover:scale-125 transition-transform duration-300" />

                {/* Content */}
                <div className="relative z-10">
                  <h4 className="text-xl font-bold text-slate-900 dark:text-white mb-4 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300">
                    {faq.q}
                  </h4>
                  <p className="text-slate-600 dark:text-gray-300 leading-relaxed">
                    {faq.a}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* ===== STATISTICS SECTION ===== */}
      <section className="px-4 py-24 bg-gradient-to-b from-white to-slate-50 dark:from-slate-900 dark:to-slate-800">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-20" data-aos="fade-up">
            <h2 className="text-4xl md:text-5xl font-black text-slate-900 dark:text-white mb-6">
              Trusted by Thousands
            </h2>
            <p className="text-xl text-slate-600 dark:text-gray-300">Join our growing community of satisfied customers</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              { number: '50K+', label: 'Happy Customers', Icon: FaSmile, color: 'from-blue-500 to-cyan-500' },
              { number: '24/7', label: 'Support Available', Icon: FaHeadset, color: 'from-purple-500 to-pink-500' },
              { number: '99%', label: 'Satisfaction Rate', Icon: FaStar, color: 'from-orange-500 to-red-500' },
              { number: '150+', label: 'Team Members', Icon: FaUsers, color: 'from-emerald-500 to-teal-500' }
            ].map((stat, idx) => (
              <div
                key={idx}
                className="group relative bg-white dark:bg-slate-800 rounded-3xl p-8 text-center overflow-hidden border-2 border-slate-100 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-500 transition-all duration-300"
                data-aos="flip-left"
                data-aos-delay={idx * 100}
              >
                <div className="relative z-10">
                  <div className="text-6xl mb-4 group-hover:scale-125 transition-transform duration-300">
                    <stat.Icon className="mx-auto" />
                  </div>
                  <h3 className="text-4xl md:text-5xl font-black text-slate-900 dark:text-white mb-2">
                    {stat.number}
                  </h3>
                  <p className="text-lg font-semibold text-slate-600 dark:text-gray-300">{stat.label}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== SERVICES SECTION ===== */}
      <section className="px-4 py-24 bg-slate-50 dark:bg-slate-800">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-20" data-aos="fade-up">
            <h2 className="text-4xl md:text-5xl font-black text-slate-900 dark:text-white mb-6">
              Our Services
            </h2>
            <p className="text-xl text-slate-600 dark:text-gray-300">Comprehensive support solutions designed for you</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { title: 'Technical Support', desc: 'Expert help for all technical issues', Icon: FaWrench, color: 'from-blue-500 to-cyan-500' },
              { title: 'Sales Assistance', desc: 'Find exactly what you need', Icon: FaShoppingCart, color: 'from-pink-500 to-rose-500' },
              { title: 'Account Management', desc: 'Manage your account with ease', Icon: FaUser, color: 'from-purple-500 to-indigo-500' },
              { title: 'Order Tracking', desc: 'Real-time tracking and updates', Icon: FaBox, color: 'from-orange-500 to-amber-500' },
              { title: 'Returns & Refunds', desc: 'Hassle-free return process', Icon: FaUndo, color: 'from-emerald-500 to-teal-500' },
              { title: 'Premium Support', desc: 'Priority assistance anytime', Icon: FaCrown, color: 'from-yellow-500 to-orange-500' }
            ].map((service, idx) => (
              <div
                key={idx}
                className="group relative bg-white dark:bg-slate-900 rounded-2xl p-8 h-full overflow-hidden border-2 border-slate-200 dark:border-slate-700 hover:border-slate-400 dark:hover:border-slate-500 transition-all duration-300 hover:shadow-xl"
                data-aos="zoom-in"
                data-aos-delay={idx * 50}
              >
                <div className="relative z-10">
                  <div className="text-5xl mb-4 group-hover:scale-125 transition-transform duration-300 inline-block">
                    <service.Icon />
                  </div>
                  <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-3 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300">
                    {service.title}
                  </h3>
                  <p className="text-slate-600 dark:text-gray-400">
                    {service.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== GOOGLE MAP SECTION ===== */}
      <section className="px-4 py-24 bg-white dark:bg-slate-900">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16" data-aos="fade-up">
            <h2 className="text-4xl md:text-5xl font-black text-slate-900 dark:text-white mb-6">
              Locate Us
            </h2>
            <p className="text-xl text-slate-600 dark:text-gray-300">Visit us at our main office or explore our locations worldwide</p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            <div 
              className="lg:col-span-2 relative rounded-3xl overflow-hidden shadow-2xl h-96 lg:h-full min-h-[500px] border-2 border-slate-200 dark:border-slate-700"
              data-aos="zoom-in"
              data-aos-duration="1200"
            >
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3024.2219901290355!2d-74.00601!3d40.71277!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c25a317d4b0b03%3A0xd5f7d0f3d7d7d7d7!2s123%20Business%20St!5e0!3m2!1sen!2sus!4v1234567890"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>

            <div className="space-y-6">
              {[
                { title: 'Main Office', icon: FaGlobe, address: '123 Business St, New York, NY 10001', phone: '+1 (555) 123-4567', delay: 0 },
                { title: 'Support Center', icon: FaGlobe, address: '456 Tech Avenue, San Francisco, CA 94105', phone: '+1 (555) 987-6543', delay: 100 },
                { title: 'Global Hub', icon: FaGlobe, address: '789 International Blvd, London, UK', phone: '+44 (20) 7123-4567', delay: 200 }
              ].map((location, idx) => (
                <div
                  key={idx}
                  className="group bg-gradient-to-br from-blue-50 to-purple-50 dark:from-slate-800 dark:to-slate-700 rounded-2xl p-6 border-2 border-slate-200 dark:border-slate-600 hover:border-blue-500 dark:hover:border-blue-400 transition-all duration-300 hover:shadow-lg hover:-translate-y-2"
                  data-aos="fade-left"
                  data-aos-delay={location.delay}
                >
                  <div className="flex items-center gap-3 mb-3">
                    <location.icon className="text-xl text-blue-600 dark:text-blue-400" />
                    <h3 className="text-lg font-bold text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                      {location.title}
                    </h3>
                  </div>
                  <p className="text-sm text-slate-600 dark:text-gray-400 mb-2 flex items-start gap-2">
                    <FaMapMarkerAlt className="text-blue-600 dark:text-blue-400 flex-shrink-0 mt-0.5" />
                    <span>{location.address}</span>
                  </p>
                  <p className="text-sm text-slate-600 dark:text-gray-400 flex items-center gap-2">
                    <FaPhone className="text-blue-600 dark:text-blue-400" />
                    <a href={`tel:${location.phone.match(/[\d+\-()]+/g).join('')}`} className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                      {location.phone}
                    </a>
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ===== TESTIMONIALS SECTION - SWIPER CAROUSEL ===== */}
      <section className="px-4 py-32 bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 dark:from-slate-950 dark:via-purple-950 dark:to-slate-950 relative min-h-screen flex items-center justify-center overflow-hidden">
        
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div 
            className="absolute top-1/4 -left-32 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl"
            style={{ animation: 'float 8s ease-in-out infinite', backdropFilter: 'blur(40px)' }}
          ></div>
        </div>

        <div className="max-w-6xl mx-auto w-full relative z-10">
          <div className="text-center mb-20" data-aos="fade-up">
            <h2 className="text-5xl md:text-6xl lg:text-7xl font-black text-white mb-6 drop-shadow-2xl">
              What Our Customers Say
            </h2>
            <p className="text-xl md:text-2xl text-white/80 drop-shadow-lg">
              Swipe to see real feedback from our satisfied customers
            </p>
          </div>

          <div className="relative w-full h-full min-h-96 md:min-h-[500px] flex items-center justify-center pb-20">
            <Swiper
              modules={[Navigation, Pagination, Autoplay, EffectCoverflow]}
              effect="coverflow"
              grabCursor={true}
              centeredSlides={true}
              slidesPerView={3}
              spaceBetween={30}
              breakpoints={{
                320: { slidesPerView: 1, spaceBetween: 20 },
                768: { slidesPerView: 2, spaceBetween: 25 },
                1024: { slidesPerView: 3, spaceBetween: 30 }
              }}
              coverflowEffect={{
                rotate: 30,
                stretch: 50,
                depth: 200,
                modifier: 1.5,
                slideShadows: true,
              }}
              autoplay={{ delay: 5000, disableOnInteraction: false }}
              pagination={{ clickable: true }}
              navigation={true}
              loop={true}
              className="w-full h-full"
              style={{ '--swiper-navigation-color': '#fff', '--swiper-pagination-color': '#fff' }}
            >
              {[
                { name: 'Sarah Johnson', role: 'Business Owner', text: 'Exceptional service and support. The team went above and beyond.', rating: 5, initials: 'SJ' },
                { name: 'Michael Chen', role: 'Tech Enthusiast', text: 'Amazing experience from start to finish. Unmatched attention to detail.', rating: 5, initials: 'MC' },
                { name: 'Emily Rodriguez', role: 'Marketing Manager', text: 'Professional, responsive, and incredibly helpful team.', rating: 5, initials: 'ER' }
              ].map((testimonial, idx) => (
                <SwiperSlide key={idx} className="h-80 md:h-96 flex items-center justify-center p-4">
                  <div className="relative w-full h-full rounded-3xl p-8 md:p-10 flex flex-col justify-center items-center text-center overflow-hidden bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 shadow-2xl">
                    <div className="absolute inset-0 rounded-3xl bg-white/10 backdrop-blur-md"></div>
                    <div className="relative z-10 w-full flex flex-col items-center justify-center h-full">
                      <div className="flex gap-1 mb-6 justify-center">
                        {[...Array(testimonial.rating)].map((_, i) => (
                          <FaStar key={i} className="text-3xl text-yellow-300 animate-bounce" style={{ animationDelay: `${i * 0.1}s` }} />
                        ))}
                      </div>
                      <p className="text-white text-lg lg:text-2xl font-bold mb-8 leading-relaxed" style={{ textShadow: '0 4px 12px rgba(0,0,0,0.3)' }}>
                        "{testimonial.text}"
                      </p>
                      <div className="flex flex-col items-center gap-4">
                        <div className="w-20 h-20 rounded-full bg-white/20 backdrop-blur-md border-2 border-white/40 flex items-center justify-center text-2xl font-bold text-white">
                          {testimonial.initials}
                        </div>
                        <div>
                          <p className="text-white font-black text-lg lg:text-2xl drop-shadow-lg">
                            {testimonial.name}
                          </p>
                          <p className="text-white/80 text-sm lg:text-lg font-semibold drop-shadow-lg">
                            {testimonial.role}
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="absolute inset-0 rounded-3xl border-2 border-white/30" style={{ boxShadow: 'inset 0 0 40px rgba(255,255,255,0.1)' }}></div>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>

          <div className="text-center mt-20" data-aos="fade-up" data-aos-delay="300">
            <p className="text-white/80 text-lg mb-6">Join thousands of satisfied customers</p>
            <button className="px-8 py-4 bg-white text-purple-600 font-bold rounded-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 active:scale-95">
              Start Your Journey
            </button>
          </div>
        </div>
      </section>

      {/* ===== NEWSLETTER SECTION ===== */}
      <section className="px-4 py-24 bg-gradient-to-r from-purple-600 via-pink-600 to-red-600 dark:from-purple-800 dark:via-pink-800 dark:to-red-800 relative overflow-hidden">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-40 -right-40 w-96 h-96 bg-white/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-white/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
        </div>

        <div className="max-w-2xl mx-auto relative z-10 text-center" data-aos="zoom-in">
          <h2 className="text-4xl md:text-5xl font-black text-white mb-6">
            Stay Connected
          </h2>
          <p className="text-xl text-white/90 mb-8">
            Subscribe to our newsletter for exclusive offers and updates
          </p>

          <form className="flex flex-col sm:flex-row gap-4 mb-6">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-6 py-4 rounded-xl font-medium transition-all duration-300 bg-white/90 backdrop-blur-md text-slate-900 placeholder-slate-500 focus:outline-none focus:ring-4 focus:ring-white/30 hover:bg-white"
            />
            <button
              type="submit"
              className="px-8 py-4 bg-white text-purple-600 font-bold rounded-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 active:scale-95 whitespace-nowrap"
            >
              Subscribe
            </button>
          </form>

          <p className="text-white/80 text-sm">
            ✓ No spam, just great content. Unsubscribe anytime.
          </p>
        </div>
      </section>

      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) translateX(0px); }
          25% { transform: translateY(-20px) translateX(-10px); }
          50% { transform: translateY(-30px) translateX(0px); }
          75% { transform: translateY(-20px) translateX(10px); }
        }

        @keyframes bounceText {
          0%, 100% { 
            transform: translateY(0);
            textShadow: 0 20px 40px rgba(0,0,0,0.5), 0 0 40px rgba(99,102,241,0.3);
          }
          50% { 
            transform: translateY(-10px);
            textShadow: 0 30px 60px rgba(0,0,0,0.5), 0 0 60px rgba(99,102,241,0.5);
          }
        }

        @keyframes gradientFlow {
          0%, 100% { backgroundPosition: 0% 50%; }
          50% { backgroundPosition: 100% 50%; }
        }

        [data-aos="flip-left"] {
          opacity: 0;
          transform: perspective(600px) rotateY(-100deg);
        }

        [data-aos="flip-left"].aos-animate {
          opacity: 1;
          transform: perspective(600px) rotateY(0);
        }

        :global(.swiper-button-next)::after,
        :global(.swiper-button-prev)::after {
          font-size: 24px;
          font-weight: bold;
        }

        :global(.swiper-pagination-bullet) {
          background: rgba(255, 255, 255, 0.5);
          width: 12px;
          height: 12px;
        }

        :global(.swiper-pagination-bullet-active) {
          background: white;
        }
      `}</style>
    </div>
  );
}
