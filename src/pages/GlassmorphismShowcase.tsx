import React, { useState } from 'react';
import {
  GlassCard,
  GlassButton,
  GlassInput,
  GlassModal,
  GlassNavigation,
} from '@/components/atoms/GlassComponents';
import { useGlassOnScroll, useAdaptiveGlass } from '@/hooks/useGlass';
import { Button, Heading2, Heading3 } from '@/components/atoms';
import { Sparkles, Eye, Settings, Heart, Star, Download } from 'lucide-react';

/**
 * Glassmorphism showcase component for demonstration
 */
export default function GlassmorphismShowcase() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const isGlassy = useGlassOnScroll(100);
  const { glassClass, textClass } = useAdaptiveGlass();

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-400 via-pink-500 to-red-500 relative overflow-hidden">
      {/* Background elements for visual depth */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-20 left-10 w-72 h-72 bg-white rounded-full filter blur-xl opacity-20"></div>
        <div className="absolute top-40 right-10 w-96 h-96 bg-yellow-300 rounded-full filter blur-xl opacity-20"></div>
        <div className="absolute bottom-20 left-1/3 w-80 h-80 bg-blue-300 rounded-full filter blur-xl opacity-20"></div>
      </div>

      {/* Glass Navigation - shows more glass effect when scrolled */}
      <GlassNavigation
        variant={isGlassy ? 'strong' : 'light'}
        className="transition-all duration-300"
      >
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Sparkles className="h-6 w-6 text-white" />
              <span className="text-white font-bold text-lg">
                Glassmorphism Demo
              </span>
            </div>
            <div className="flex items-center gap-4">
              <GlassButton variant="light" className="text-white">
                <Eye className="h-4 w-4 mr-2" />
                Preview
              </GlassButton>
              <GlassButton variant="medium" className="text-white">
                <Settings className="h-4 w-4 mr-2" />
                Settings
              </GlassButton>
            </div>
          </div>
        </div>
      </GlassNavigation>

      {/* Main content */}
      <div className="container mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <Heading2 className="text-white mb-4 text-4xl font-bold">
            Glassmorphism Components
          </Heading2>
          <p className="text-white/80 text-lg max-w-2xl mx-auto">
            Beautiful glass-like UI elements with backdrop blur and transparency
            effects
          </p>
        </div>

        {/* Card Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {/* Basic Glass Card */}
          <GlassCard variant="light" className="p-6" interactive>
            <div className="text-center">
              <Heart className="h-12 w-12 text-red-400 mx-auto mb-4" />
              <Heading3 className="text-white mb-2">Light Glass</Heading3>
              <p className="text-white/70 text-sm mb-4">
                Subtle glass effect with light transparency
              </p>
              <GlassButton variant="frosted" className="w-full">
                Learn More
              </GlassButton>
            </div>
          </GlassCard>

          {/* Medium Glass Card */}
          <GlassCard variant="medium" className="p-6" interactive>
            <div className="text-center">
              <Star className="h-12 w-12 text-yellow-400 mx-auto mb-4" />
              <Heading3 className="text-white mb-2">Medium Glass</Heading3>
              <p className="text-white/70 text-sm mb-4">
                Balanced glass effect for general use
              </p>
              <GlassButton variant="gradient-border" className="w-full">
                Explore
              </GlassButton>
            </div>
          </GlassCard>

          {/* Strong Glass Card */}
          <GlassCard
            variant="strong"
            className="p-6"
            interactive
            animated="shimmer"
          >
            <div className="text-center">
              <Download className="h-12 w-12 text-green-400 mx-auto mb-4" />
              <Heading3 className="text-white mb-2">Strong Glass</Heading3>
              <p className="text-white/70 text-sm mb-4">
                Intense glass effect with shimmer animation
              </p>
              <GlassButton variant="primary" className="w-full">
                Download
              </GlassButton>
            </div>
          </GlassCard>
        </div>

        {/* Form Example */}
        <GlassCard variant="frosted" className="max-w-md mx-auto p-8 mb-12">
          <Heading3 className="text-white mb-6 text-center">
            Glass Form
          </Heading3>
          <div className="space-y-4">
            <GlassInput
              variant="light"
              placeholder="Enter your email"
              type="email"
            />
            <GlassInput
              variant="light"
              placeholder="Your message"
              type="text"
            />
            <GlassButton variant="gradient-border" className="w-full">
              Send Message
            </GlassButton>
          </div>
        </GlassCard>

        {/* Interactive Demo */}
        <div className="text-center">
          <GlassCard
            variant="medium"
            className="inline-block p-8"
            animated="pulse"
          >
            <Heading3 className="text-white mb-4">
              Interactive Glass Modal
            </Heading3>
            <p className="text-white/70 mb-6">
              Click to see glassmorphism in a modal overlay
            </p>
            <Button
              onClick={() => setIsModalOpen(true)}
              className="bg-white/20 hover:bg-white/30 text-white border-white/30"
            >
              Open Glass Modal
            </Button>
          </GlassCard>
        </div>

        {/* Adaptive Glass Demo */}
        <div className="mt-12">
          <GlassCard className={`${glassClass} p-6 max-w-lg mx-auto`}>
            <Heading3 className={`${textClass} mb-4 text-center`}>
              Adaptive Glass
            </Heading3>
            <p className={`${textClass} text-center`}>
              This card adapts its glass effect based on your system theme
              preference. Try switching between light and dark mode to see the
              effect!
            </p>
          </GlassCard>
        </div>

        {/* Scroll indicator */}
        <div className="fixed bottom-8 right-8 z-50">
          <GlassCard
            variant={isGlassy ? 'strong' : 'light'}
            className="p-3 transition-all duration-300"
          >
            <p className="text-white text-xs">
              Scroll: {isGlassy ? 'Glassy' : 'Normal'}
            </p>
          </GlassCard>
        </div>
      </div>

      {/* Glass Modal */}
      <GlassModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        variant="frosted"
      >
        <div className="text-center">
          <Sparkles className="h-16 w-16 text-purple-400 mx-auto mb-4" />
          <Heading3 className="text-white mb-4">Glass Modal</Heading3>
          <p className="text-white/80 mb-6">
            This modal demonstrates glassmorphism with a blurred backdrop and
            frosted glass content area. The effect creates beautiful depth and
            visual hierarchy.
          </p>
          <div className="flex gap-3 justify-center">
            <GlassButton variant="light" onClick={() => setIsModalOpen(false)}>
              Close
            </GlassButton>
            <GlassButton variant="gradient-border">Action</GlassButton>
          </div>
        </div>
      </GlassModal>
    </div>
  );
}
