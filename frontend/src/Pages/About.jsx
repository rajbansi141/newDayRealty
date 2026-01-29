import React from 'react';
import { motion } from 'framer-motion';
import { Users, Award, Target, Heart, Home, MapPin, Phone, Mail } from 'lucide-react';

export default function About() {
  const stats = [
    { number: "500+", label: "Properties Listed", icon: Home },
    { number: "1000+", label: "Happy Clients", icon: Users },
    { number: "15+", label: "Years Experience", icon: Award },
    { number: "24/7", label: "Support Available", icon: Heart }
  ];

  const teamMembers = [
    {
      name: "Sarah Johnson",
      role: "Founder & CEO",
      image: "https://placehold.co/300x300/4f46e5/white?text=SJ",
      bio: "With over 15 years of experience in real estate, Sarah founded newDay Realty with a vision to transform the property buying experience."
    },
    {
      name: "Michael Chen",
      role: "Senior Agent",
      image: "https://placehold.co/300x300/4f46e5/white?text=MC",
      bio: "Michael specializes in luxury properties and has consistently ranked among the top 1% of agents nationwide."
    },
    {
      name: "Emily Rodriguez",
      role: "Property Consultant",
      image: "https://placehold.co/300x300/4f46e5/white?text=ER",
      bio: "Emily's expertise in market analysis helps clients make informed decisions and find their perfect investment."
    },
    {
      name: "David Kim",
      role: "Client Relations",
      image: "https://placehold.co/300x300/4f46e5/white?text=DK",
      bio: "David ensures every client receives personalized attention and seamless service throughout their journey."
    }
  ];

  return (
    <div className="min-h-screen bg-linear
    -to-br from-blue-50 to-indigo-100">
      {/* Header Section */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center px-4 py-2 bg-white/80 backdrop-blur-sm rounded-full border border-white/50 shadow-lg mb-8"
          >
            <Users className="w-4 h-4 text-blue-600 mr-2" />
            <span className="text-sm font-medium text-blue-700">About Our Company</span>
          </motion.div>
          
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-4xl md:text-6xl lg:text-7xl font-bold text-gray-900 mb-6 leading-tight"
          >
            Who We Are
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed"
          >
            At newDay Realty, we're more than just real estate agents – we're your trusted partners in finding the perfect place to call home.
          </motion.p>
        </div>
      </section>

      {/* Mission & Vision Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                Our Mission & Vision
              </h2>
              <p className="text-gray-600 mb-6 leading-relaxed">
                Founded in 2009, newDay Realty has been dedicated to redefining the real estate experience through innovation, integrity, and exceptional service. 
                We believe that finding your dream home should be an exciting and stress-free journey.
              </p>
              <p className="text-gray-600 mb-8 leading-relaxed">
                Our vision is to be the most trusted real estate partner in Nepal, helping families and individuals find not just houses, but homes where memories are made and dreams come true.
              </p>
              
              <div className="flex flex-wrap gap-4">
                <div className="flex items-center space-x-3">
                  <div className="bg-linear
                  -to-r from-blue-600 to-indigo-600 w-10 h-10 rounded-full flex items-center justify-center">
                    <Target className="w-5 h-5 text-white" />
                  </div>
                  <span className="font-medium text-gray-900">Client-Centric Approach</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="bg-linear
                  -to-r from-blue-600 to-indigo-600 w-10 h-10 rounded-full flex items-center justify-center">
                    <Award className="w-5 h-5 text-white" />
                  </div>
                  <span className="font-medium text-gray-900">Industry Excellence</span>
                </div>
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="bg-white rounded-2xl shadow-xl p-8 h-96 flex items-center justify-center">
                <div className="text-center">
                  <MapPin className="w-16 h-16 text-blue-600 mx-auto mb-4" />
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">Serving Nepal Since 2009</h3>
                  <p className="text-gray-600">From Bhaktapur to Kathmandu and beyond</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white/50">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => {
              const IconComponent = stat.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="text-center p-6"
                >
                  <div className="bg-linear
                  -to-r from-blue-600 to-indigo-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                    <IconComponent className="w-8 h-8 text-white" />
                  </div>
                  <div className="text-3xl font-bold text-gray-900 mb-2">{stat.number}</div>
                  <div className="text-gray-600">{stat.label}</div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Meet Our Expert Team
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Our dedicated professionals bring years of experience and passion to help you achieve your real estate goals.
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {teamMembers.map((member, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
              >
                <img 
                  src={member.image} 
                  alt={member.name}
                  className="w-full h-64 object-cover"
                />
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-1">{member.name}</h3>
                  <p className="text-blue-600 font-medium mb-3">{member.role}</p>
                  <p className="text-gray-600 text-sm leading-relaxed">{member.bio}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact CTA Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-linear
      -to-r from-blue-600 to-indigo-600">
        <div className="max-w-4xl mx-auto text-center">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-bold text-white mb-6"
          >
            Ready to Start Your Journey?
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="text-blue-100 mb-8 text-lg"
          >
            Contact us today and let our expert team guide you to your dream property.
          </motion.p>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: true }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <a 
              href="tel:+9779841234567" 
              className="flex items-center justify-center space-x-2 bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-colors"
            >
              <Phone className="w-5 h-5" />
              <span>Call Now</span>
            </a>
            <a 
              href="mailto:info@newdayrealty.com" 
              className="flex items-center justify-center space-x-2 bg-white/20 text-white px-6 py-3 rounded-lg font-semibold hover:bg-white/30 transition-colors"
            >
              <Mail className="w-5 h-5" />
              <span>Email Us</span>
            </a>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
