import React from 'react';
import { ArrowRight, Recycle, Users, Leaf } from 'lucide-react';

const Hero: React.FC = () => {
  return (
    <section className="relative min-h-[70vh] flex items-center justify-center overflow-hidden bg-gradient-to-br from-[var(--color-secondary)] via-white to-[var(--color-accent)]/10">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%234A7C59' fill-opacity='0.4'%3E%3Ccircle cx='30' cy='30' r='4'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }} />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
        {/* Main Heading */}
        <div className="max-w-4xl mx-auto mb-8">
          <h1 className="heading-1 mb-6 text-[var(--color-gray-900)]">
            Give Your Clothes a 
            <span className="text-[var(--color-primary)] relative">
              <span className="relative z-10"> Second Life</span>
              <svg 
                className="absolute -bottom-2 left-0 w-full h-3 text-[var(--color-accent)]" 
                viewBox="0 0 100 12" 
                preserveAspectRatio="none"
              >
                <path 
                  d="M0,8 Q25,2 50,6 T100,4" 
                  stroke="currentColor" 
                  strokeWidth="2" 
                  fill="none"
                />
              </svg>
            </span>
          </h1>
          <p className="body-lg text-[var(--color-gray-600)] max-w-2xl mx-auto leading-relaxed">
            Join our sustainable community where fashion meets purpose. Trade, swap, and discover 
            unique pieces while reducing waste and building connections.
          </p>
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
          <button className="btn-base btn-primary px-8 py-4 group">
            Start Swapping
            <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform duration-200" />
          </button>
          <button className="btn-base btn-outline px-8 py-4">
            Browse Items
          </button>
        </div>

        {/* Feature Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 max-w-4xl mx-auto">
          <div className="text-center group">
            <div className="w-16 h-16 mx-auto mb-4 bg-[var(--color-primary)]/10 rounded-2xl flex items-center justify-center group-hover:bg-[var(--color-primary)]/20 transition-colors duration-300">
              <Recycle className="w-8 h-8 text-[var(--color-primary)]" />
            </div>
            <h3 className="heading-5 mb-2 text-[var(--color-gray-900)]">10,000+</h3>
            <p className="body-sm text-[var(--color-gray-600)]">Items Exchanged</p>
          </div>
          
          <div className="text-center group">
            <div className="w-16 h-16 mx-auto mb-4 bg-[var(--color-accent)]/10 rounded-2xl flex items-center justify-center group-hover:bg-[var(--color-accent)]/20 transition-colors duration-300">
              <Users className="w-8 h-8 text-[var(--color-accent)]" />
            </div>
            <h3 className="heading-5 mb-2 text-[var(--color-gray-900)]">5,000+</h3>
            <p className="body-sm text-[var(--color-gray-600)]">Community Members</p>
          </div>
          
          <div className="text-center group">
            <div className="w-16 h-16 mx-auto mb-4 bg-[var(--color-success)]/10 rounded-2xl flex items-center justify-center group-hover:bg-[var(--color-success)]/20 transition-colors duration-300">
              <Leaf className="w-8 h-8 text-[var(--color-success)]" />
            </div>
            <h3 className="heading-5 mb-2 text-[var(--color-gray-900)]">2 Tons</h3>
            <p className="body-sm text-[var(--color-gray-600)]">Waste Prevented</p>
          </div>
        </div>

        {/* Floating Elements */}
        <div className="absolute top-20 left-10 w-20 h-20 bg-[var(--color-primary)]/5 rounded-full animate-pulse hidden lg:block"></div>
        <div className="absolute bottom-20 right-10 w-16 h-16 bg-[var(--color-accent)]/5 rounded-full animate-pulse hidden lg:block" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-1/2 left-20 w-12 h-12 bg-[var(--color-success)]/5 rounded-full animate-pulse hidden lg:block" style={{ animationDelay: '0.5s' }}></div>
      </div>
    </section>
  );
};

export default Hero;