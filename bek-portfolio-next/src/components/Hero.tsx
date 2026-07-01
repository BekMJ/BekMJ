"use client"

import { motion } from 'framer-motion'
import { Rocket, Send } from 'lucide-react'

const stats = [
  { value: '3.7', label: 'GPA' },
  { value: '$4K', label: 'Award' },
  { value: '∞', label: 'Potential' }
]

const skills = ['Python', 'React', 'AI/ML']

export default function Hero() {
  return (
    <section className="relative flex items-center justify-center min-h-[80vh] overflow-hidden aurora">
      {/* Subtle gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50/70 via-indigo-50/60 to-purple-50/70 -z-10" />

      <div className="container mx-auto flex flex-col lg:flex-row items-center gap-16 px-6 py-24 z-10">
        {/* Left: Text */}
        <div className="flex-1 space-y-6">
          <span className="inline-flex items-center px-4 py-2 bg-white/80 rounded-full shadow text-blue-600 font-medium border border-blue-200">
            🚀 Available for Opportunities
          </span>
          <h1 className="text-5xl font-extrabold text-gray-900 leading-tight">
            Crafting the Future with{' '}
            <span className="bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">
              Code & Innovation
            </span>
          </h1>
          <p className="text-lg text-gray-600">
            I'm <span className="text-blue-600 font-semibold">Bilguunzaya Mijiddorj</span>, a{' '}
            <span className="text-blue-500">AI/ML Innovator</span>
          </p>
          <p className="text-gray-500 max-w-xl">
            Bridging the gap between hardware and software at the University of Oklahoma. From methane sensors to autonomous scooters, I turn complex problems into elegant solutions.
          </p>
          {/* Stats */}
          <div className="flex gap-6 mt-8">
            {stats.map(stat => (
              <div key={stat.label} className="bg-white/80 rounded-xl shadow-md px-6 py-4 text-center border border-blue-100">
                <div className="text-2xl font-bold text-blue-600">{stat.value}</div>
                <div className="text-xs text-gray-500">{stat.label}</div>
              </div>
            ))}
          </div>
          {/* Buttons */}
          <div className="flex gap-4 mt-8">
            <button className="btn-primary flex items-center gap-2 shine-on-hover">
              <Rocket className="h-5 w-5" />
              Explore My Work
            </button>
            <button className="btn-secondary flex items-center gap-2 hover-glow">
              <Send className="h-5 w-5" />
              Let's Connect
            </button>
          </div>
        </div>
        {/* Right: Profile Card */}
        <div className="flex-1 flex justify-center">
          <div className="glass rounded-2xl p-8 flex flex-col items-center border border-blue-100 tilt-on-hover">
            <div className="w-24 h-24 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white text-3xl font-bold mb-4 shadow-lg">
              BM
            </div>
            <h3 className="text-xl font-bold text-gray-900">Bek</h3>
            <p className="text-gray-500">Norman, OK</p>
            <div className="flex gap-2 mt-4">
              {skills.map(skill => (
                <span key={skill} className="bg-blue-100 text-blue-600 px-3 py-1 rounded-full text-xs font-medium">
                  {skill}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
} 