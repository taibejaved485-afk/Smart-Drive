import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import SEO from '../components/SEO';
import { ScrollReveal } from '../components/ScrollReveal';
import { Trophy, AlertCircle, Lightbulb, RefreshCw, ChevronRight, CheckCircle2, Info, BookOpen, Timer, Award, ShieldCheck, Zap, Star, Heart, Check, X, CheckSquare, Sparkles, Gauge, Volume2, VolumeX } from 'lucide-react';
import confetti from 'canvas-confetti';

const quizData = [
  {
    id: 1,
    difficulty: "medium",
    question: "According to the GoDriveify safety guide, why is it critical to maintain a safe distance from the vehicle ahead while driving on a highway?",
    options: [
      { text: "To stay out of the vehicle's rear blind spot.", isCorrect: false, rationale: "While true, safe following distance is legally and physical-defensively designed for reaction and stopping distance." },
      { text: "To provide more time to react in case of sudden braking.", isCorrect: true, rationale: "Keeping a wide gap gives you crucial reaction time to stop safely if the leading vehicle brakes suddenly." },
      { text: "To improve your vehicle's fuel efficiency.", isCorrect: false, rationale: "Following too closely actually causes frequent braking and acceleration, decreasing fuel efficiency." },
      { text: "To ensure the driver behind you can pass more easily.", isCorrect: false, rationale: "While lane courtesy is good, highway safe distance is primarily about your own stopping geometry and survival gap." }
    ],
    hint: "Think about physical stopping distance and reaction time at high speeds.",
    graphic: (
      <svg viewBox="0 0 160 85" className="w-full h-28 max-w-[220px] mx-auto drop-shadow-md rounded-xl" xmlns="http://www.w3.org/2000/svg">
        {/* Definition for gradients to create glossy/realistic car paint and road textures */}
        <defs>
          <linearGradient id="roadGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#1e293b" />
            <stop offset="50%" stopColor="#111827" />
            <stop offset="100%" stopColor="#0f172a" />
          </linearGradient>
          <linearGradient id="blueCarGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#0284c7" />
            <stop offset="40%" stopColor="#0ea5e9" />
            <stop offset="100%" stopColor="#0369a1" />
          </linearGradient>
          <linearGradient id="redCarGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#dc2626" />
            <stop offset="40%" stopColor="#ef4444" />
            <stop offset="100%" stopColor="#991b1b" />
          </linearGradient>
          <linearGradient id="glassGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#e0f2fe" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#bae6fd" stopOpacity="0.5" />
          </linearGradient>
        </defs>

        {/* Realistic textured asphalt road */}
        <rect x="0" y="22" width="160" height="36" fill="url(#roadGrad)" />
        <rect x="0" y="20" width="160" height="2" fill="#475569" /> {/* Shoulder border */}
        <rect x="0" y="58" width="160" height="2" fill="#475569" /> {/* Shoulder border */}
        <line x1="0" y1="40" x2="160" y2="40" stroke="#fef08a" strokeWidth="2" strokeDasharray="6,4" />

        {/* Leading car (Blue Sedan) - Detailed realistic top-down */}
        <g transform="translate(105, 29)">
          {/* Shadow */}
          <rect x="-1" y="1" width="28" height="15" fill="#020617" opacity="0.4" rx="3.5" />
          {/* Main Body */}
          <rect x="0" y="0" width="28" height="15" fill="url(#blueCarGrad)" rx="3" />
          {/* Glossy Windshield */}
          <path d="M 18,2 L 23,4 L 23,11 L 18,13 Z" fill="url(#glassGrad)" />
          {/* Rear Window */}
          <path d="M 4,2 L 8,3 L 8,12 L 4,13 Z" fill="url(#glassGrad)" />
          {/* Side Mirrors */}
          <rect x="17" y="-2" width="2" height="2" fill="#0369a1" rx="0.5" />
          <rect x="17" y="15" width="2" height="2" fill="#0369a1" rx="0.5" />
          {/* Tyres (Rubber black with alloy rims) */}
          <rect x="3" y="-1.5" width="5" height="1.5" fill="#1e293b" rx="0.5" />
          <rect x="19" y="-1.5" width="5" height="1.5" fill="#1e293b" rx="0.5" />
          <rect x="3" y="15" width="5" height="1.5" fill="#1e293b" rx="0.5" />
          <rect x="19" y="15" width="5" height="1.5" fill="#1e293b" rx="0.5" />
          {/* Glowing Red Brake Lights */}
          <circle cx="0.5" cy="2" r="1.2" fill="#ef4444" />
          <circle cx="0.5" cy="13" r="1.2" fill="#ef4444" />
          <circle cx="0.5" cy="2" r="3" fill="#ef4444" opacity="0.4" />
          <circle cx="0.5" cy="13" r="3" fill="#ef4444" opacity="0.4" />
        </g>

        {/* Following car (Red Sports Car) - Detailed realistic top-down */}
        <g transform="translate(15, 29)">
          {/* Shadow */}
          <rect x="-1" y="1" width="28" height="15" fill="#020617" opacity="0.4" rx="3.5" />
          {/* Main Body */}
          <rect x="0" y="0" width="28" height="15" fill="url(#redCarGrad)" rx="3" />
          {/* Glossy Windshield */}
          <path d="M 18,2 L 23,4 L 23,11 L 18,13 Z" fill="url(#glassGrad)" />
          {/* Rear Window */}
          <path d="M 4,2 L 8,3 L 8,12 L 4,13 Z" fill="url(#glassGrad)" />
          {/* Side Mirrors */}
          <rect x="17" y="-2" width="2" height="2" fill="#991b1b" rx="0.5" />
          <rect x="17" y="15" width="2" height="2" fill="#991b1b" rx="0.5" />
          {/* Tyres */}
          <rect x="3" y="-1.5" width="5" height="1.5" fill="#1e293b" rx="0.5" />
          <rect x="19" y="-1.5" width="5" height="1.5" fill="#1e293b" rx="0.5" />
          <rect x="3" y="15" width="5" height="1.5" fill="#1e293b" rx="0.5" />
          <rect x="19" y="15" width="5" height="1.5" fill="#1e293b" rx="0.5" />
          {/* Glowing Headlights with light beam throwing forward */}
          <path d="M 28,3 L 42,-1 L 42,16 L 28,12 Z" fill="#fef08a" opacity="0.15" />
          <circle cx="27.5" cy="3" r="1" fill="#fef08a" />
          <circle cx="27.5" cy="12" r="1" fill="#fef08a" />
        </g>

        {/* Highly polished Safe Distance Indicator bracket and dimension arrows */}
        <g>
          {/* Connecting line */}
          <line x1="47" y1="48" x2="101" y2="48" stroke="#10b981" strokeWidth="2" />
          {/* End bars */}
          <line x1="47" y1="44" x2="47" y2="52" stroke="#10b981" strokeWidth="2" />
          <line x1="101" y1="44" x2="101" y2="52" stroke="#10b981" strokeWidth="2" />
          {/* Glowing Arrowheads */}
          <polygon points="47,48 53,44 53,52" fill="#10b981" />
          <polygon points="101,48 95,44 95,52" fill="#10b981" />
          
          {/* Gorgeous premium label badge */}
          <rect x="52" y="55" width="56" height="14" fill="#065f46" rx="4" />
          <text x="80" y="65" fill="#34d399" fontSize="8" fontWeight="bold" textAnchor="middle" fontFamily="sans-serif" letterSpacing="0.5">SAFE GAP</text>
        </g>
      </svg>
    )
  },
  {
    id: 2,
    difficulty: "hard",
    question: "When preparing to change lanes on a high-speed road, what is the correct sequence for checking your surroundings based on safety principles?",
    options: [
      { text: "Signal, check rearview mirror, and turn the wheel.", isCorrect: false, rationale: "Omitting side mirror checks and physical shoulder checks leaves you vulnerable to blind-spot collisions." },
      { text: "Perform a shoulder check, signal, and immediately switch lanes.", isCorrect: false, rationale: "You must always assess rear-traffic speed through mirrors before communicating your intent." },
      { text: "Check rearview mirror, side mirrors, signal, and perform a shoulder check.", isCorrect: true, rationale: "This sequence ensures you look behind, alongside, warn others, and then check the blind spot physically before turning." },
      { text: "Check side mirrors, honk your horn, and switch lanes rapidly.", isCorrect: false, rationale: "Honking is for emergencies, and mirror checks alone are insufficient without looking over your shoulder." }
    ],
    hint: "Start from the inside mirror and move your focus outward before physically turning your head.",
    graphic: (
      <svg viewBox="0 0 120 100" className="w-28 h-28 mx-auto drop-shadow-md rounded-xl" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="laneAsphalt" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#1e293b" />
            <stop offset="100%" stopColor="#0f172a" />
          </linearGradient>
          <linearGradient id="carGrad2" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#0ea5e9" />
            <stop offset="100%" stopColor="#1d4ed8" />
          </linearGradient>
          <linearGradient id="glassGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#e0f2fe" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#bae6fd" stopOpacity="0.5" />
          </linearGradient>
        </defs>
        {/* Asphalt Background */}
        <rect x="10" y="5" width="100" height="90" fill="url(#laneAsphalt)" rx="8" />
        <line x1="60" y1="5" x2="60" y2="95" stroke="#475569" strokeWidth="1.5" strokeDasharray="5,4" />
        
        {/* Car icon top down */}
        <g transform="translate(48, 45)">
          <rect x="0" y="0" width="24" height="42" fill="url(#carGrad2)" rx="4" />
          <rect x="3.5" y="10" width="17" height="18" fill="url(#glassGrad)" rx="1.5" />
          {/* Side rearview mirrors */}
          <rect x="-3" y="13" width="3" height="2" fill="#1d4ed8" />
          <rect x="24" y="13" width="3" height="2" fill="#1d4ed8" />
        </g>

        {/* Visual checking sequence steps overlay */}
        {/* 1. Inside rearview mirror check cone */}
        <path d="M 60,55 L 45,95 L 75,95 Z" fill="#e0f2fe" opacity="0.15" />
        <circle cx="60" cy="75" r="5" fill="#0284c7" />
        <text x="60" y="77.5" fill="white" fontSize="7.5" fontWeight="bold" textAnchor="middle" fontFamily="sans-serif">1</text>
        
        {/* 2. Side mirror check cones */}
        <path d="M 46,58 L 15,75 L 20,85 Z" fill="#e0f2fe" opacity="0.15" />
        <circle cx="28" cy="70" r="5" fill="#f59e0b" />
        <text x="28" y="72.5" fill="white" fontSize="7.5" fontWeight="bold" textAnchor="middle" fontFamily="sans-serif">2</text>

        {/* 3. Signal indicators flashing */}
        <circle cx="49" cy="46" r="2.5" fill="#fbbf24" className="animate-pulse" />
        <circle cx="71" cy="46" r="2.5" fill="#fbbf24" className="animate-pulse" />
        <text x="92" y="50" fill="#fbbf24" fontSize="7" fontWeight="black" textAnchor="middle" fontFamily="sans-serif">3 SIGNAL</text>

        {/* 4. Shoulder check warning arrow */}
        <path d="M 52,48 Q 20,40 15,20" fill="none" stroke="#ef4444" strokeWidth="1.8" strokeDasharray="3,2" />
        <polygon points="15,20 12,27 19,25" fill="#ef4444" />
        <circle cx="34" cy="31" r="5" fill="#ef4444" />
        <text x="34" y="33.5" fill="white" fontSize="7.5" fontWeight="bold" textAnchor="middle" fontFamily="sans-serif">4</text>
      </svg>
    )
  },
  {
    id: 3,
    difficulty: "easy",
    question: "You approach an intersection with a flashing yellow signal light. How should you proceed?",
    options: [
      { text: "Treat it like a green light and maintain your speed.", isCorrect: false, rationale: "Failing to slow down or look for cross-traffic can lead to severe side-impact collisions." },
      { text: "Stop completely, check both ways, then proceed.", isCorrect: false, rationale: "This is the rule for a flashing red light or stop sign, not a flashing yellow." },
      { text: "Slow down and proceed with caution, yielding to hazards.", isCorrect: true, rationale: "A flashing yellow means caution; you do not have to stop completely unless cross-traffic or hazards are present." },
      { text: "Speed up to clear the intersection before it turns red.", isCorrect: false, rationale: "Speeding up increases risk at an intersection with warning lights." }
    ],
    hint: "Yellow light signifies warning. You must reduce speed and stay alert without halting unnecessarily.",
    graphic: (
      <svg viewBox="0 0 100 100" className="w-24 h-24 mx-auto drop-shadow-md" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="housingGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#334155" />
            <stop offset="50%" stopColor="#1e293b" />
            <stop offset="100%" stopColor="#0f172a" />
          </linearGradient>
          <radialGradient id="yellowGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#fef08a" />
            <stop offset="30%" stopColor="#f59e0b" />
            <stop offset="70%" stopColor="#b45309" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#78350f" stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* Traffic Light Metallic Housing */}
        <rect x="32" y="5" width="36" height="90" fill="url(#housingGrad)" rx="10" stroke="#475569" strokeWidth="2.5" />
        
        {/* Hoods / visors over each bulb casting realistic dark shadows */}
        {/* Top hood */}
        <path d="M 32,22 Q 50,11 68,22" fill="none" stroke="#0f172a" strokeWidth="5" strokeLinecap="round" />
        {/* Middle hood */}
        <path d="M 32,52 Q 50,41 68,52" fill="none" stroke="#0f172a" strokeWidth="5" strokeLinecap="round" />
        {/* Bottom hood */}
        <path d="M 32,82 Q 50,71 68,82" fill="none" stroke="#0f172a" strokeWidth="5" strokeLinecap="round" />

        {/* RED LIGHT (Unlit, realistic glossy dark lens) */}
        <circle cx="50" cy="24" r="9" fill="#7f1d1d" opacity="0.9" />
        <circle cx="50" cy="24" r="9" fill="none" stroke="#991b1b" strokeWidth="1" />
        <circle cx="47" cy="21" r="2" fill="white" opacity="0.2" /> {/* Gloss reflection */}

        {/* AMBER/YELLOW LIGHT (Bright flashing/glowing radial lens) */}
        {/* Ambient background bloom flare */}
        <circle cx="50" cy="50" r="28" fill="url(#yellowGlow)" opacity="0.95" />
        {/* Active lens body */}
        <circle cx="50" cy="50" r="11" fill="#fbbf24" stroke="#f59e0b" strokeWidth="2" />
        <circle cx="50" cy="50" r="8" fill="#fffbeb" opacity="0.75" />
        <circle cx="46" cy="46" r="3" fill="white" opacity="0.4" /> {/* Gloss reflection */}
        {/* Animated pulses */}
        <circle cx="50" cy="50" r="11" fill="none" stroke="#fef08a" strokeWidth="2" className="animate-ping" opacity="0.6" />

        {/* GREEN LIGHT (Unlit, realistic glossy dark lens) */}
        <circle cx="50" cy="76" r="9" fill="#064e3b" opacity="0.9" />
        <circle cx="50" cy="76" r="9" fill="none" stroke="#065f46" strokeWidth="1" />
        <circle cx="47" cy="73" r="2" fill="white" opacity="0.2" /> {/* Gloss reflection */}
      </svg>
    )
  },
  {
    id: 4,
    difficulty: "medium",
    question: "At an intersection without signs or signals (uncontrolled), two vehicles arrive at the same time at right angles. Who has the right-of-way?",
    options: [
      { text: "The vehicle traveling at a higher speed.", isCorrect: false, rationale: "Speed does not dictate right-of-way; safe, structural traffic laws do." },
      { text: "The vehicle on the right.", isCorrect: true, rationale: "Standard traffic rules state that at uncontrolled intersections, you must yield to the vehicle arriving from your right." },
      { text: "The vehicle on the left.", isCorrect: false, rationale: "The vehicle on the left is legally required to yield to the vehicle on its right." },
      { text: "The larger vehicle with more mass.", isCorrect: false, rationale: "Vehicle size does not give legal priority over right-of-way rules." }
    ],
    hint: "Think of the right-hand rule used universally in driving theory.",
    graphic: (
      <svg viewBox="0 0 120 120" className="w-32 h-32 mx-auto drop-shadow-md rounded-2xl" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="roadIntGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#1e293b" />
            <stop offset="100%" stopColor="#0f172a" />
          </linearGradient>
          <linearGradient id="blueCarInt" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#0ea5e9" />
            <stop offset="100%" stopColor="#1d4ed8" />
          </linearGradient>
          <linearGradient id="redCarInt" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#f87171" />
            <stop offset="100%" stopColor="#b91c1c" />
          </linearGradient>
        </defs>

        {/* Intersection Road layout */}
        <rect x="0" y="40" width="120" height="40" fill="url(#roadIntGrad)" />
        <rect x="40" y="0" width="40" height="120" fill="url(#roadIntGrad)" />
        
        {/* Curbs / sidewalks borders */}
        <rect x="0" y="38" width="38" height="2" fill="#64748b" />
        <rect x="82" y="38" width="38" height="2" fill="#64748b" />
        <rect x="0" y="80" width="38" height="2" fill="#64748b" />
        <rect x="82" y="80" width="38" height="2" fill="#64748b" />
        <rect x="38" y="0" width="2" height="38" fill="#64748b" />
        <rect x="38" y="82" width="2" height="38" fill="#64748b" />
        <rect x="80" y="0" width="2" height="38" fill="#64748b" />
        <rect x="80" y="82" width="2" height="38" fill="#64748b" />

        {/* Dotted centre lines */}
        <line x1="0" y1="60" x2="32" y2="60" stroke="#fbbf24" strokeWidth="1.5" strokeDasharray="4,3" />
        <line x1="88" y1="60" x2="120" y2="60" stroke="#fbbf24" strokeWidth="1.5" strokeDasharray="4,3" />
        <line x1="60" y1="0" x2="60" y2="32" stroke="#fbbf24" strokeWidth="1.5" strokeDasharray="4,3" />
        <line x1="60" y1="88" x2="60" y2="120" stroke="#fbbf24" strokeWidth="1.5" strokeDasharray="4,3" />

        {/* High-contrast crisp crosswalk lines */}
        <line x1="42" y1="35" x2="78" y2="35" stroke="white" strokeWidth="1.5" strokeDasharray="3,2" />
        <line x1="42" y1="85" x2="78" y2="85" stroke="white" strokeWidth="1.5" strokeDasharray="3,2" />
        <line x1="35" y1="42" x2="35" y2="78" stroke="white" strokeWidth="1.5" strokeDasharray="3,2" />
        <line x1="85" y1="42" x2="85" y2="78" stroke="white" strokeWidth="1.5" strokeDasharray="3,2" />

        {/* Vehicle A (Going straight up, Blue) */}
        <g transform="translate(48, 90)">
          {/* Shadow */}
          <rect x="-1" y="1" width="13" height="22" fill="#020617" opacity="0.4" rx="2.5" />
          {/* Car Body */}
          <rect x="0" y="0" width="13" height="22" fill="url(#blueCarInt)" rx="2" />
          <path d="M 2,15 L 11,15 L 9,19 L 4,19 Z" fill="#e0f2fe" opacity="0.8" /> {/* Windshield */}
          <text x="6.5" y="10" fill="white" fontSize="7" fontWeight="bold" textAnchor="middle" fontFamily="sans-serif">A</text>
        </g>

        {/* Vehicle B (Going straight left, Red) */}
        <g transform="translate(90, 48) rotate(270 6.5 11)">
          {/* Shadow */}
          <rect x="-1" y="1" width="13" height="22" fill="#020617" opacity="0.4" rx="2.5" />
          {/* Car Body */}
          <rect x="0" y="0" width="13" height="22" fill="url(#redCarInt)" rx="2" />
          <path d="M 2,15 L 11,15 L 9,19 L 4,19 Z" fill="#e0f2fe" opacity="0.8" /> {/* Windshield */}
          <text x="6.5" y="10" fill="white" fontSize="7" fontWeight="bold" textAnchor="middle" fontFamily="sans-serif">B</text>
        </g>

        {/* Glowing priority path indicator arrow (Green) */}
        <path d="M 100,60 Q 60,60 60,38" fill="none" stroke="#10b981" strokeWidth="2.5" strokeDasharray="3,2" />
        <polygon points="60,33 56,40 64,40" fill="#10b981" />
        <circle cx="100" cy="60" r="3" fill="#10b981" />
      </svg>
    )
  },
  {
    id: 5,
    difficulty: "easy",
    question: "What is the primary purpose of a 'Yield' sign compared to a 'Stop' sign?",
    options: [
      { text: "A yield sign is only for pedestrians, not other motor vehicles.", isCorrect: false, rationale: "Yield signs apply to all approaching road users, including motor vehicles." },
      { text: "You must always stop completely for at least 3 seconds.", isCorrect: false, rationale: "This is a mandatory stop rule, which belongs to a Stop sign." },
      { text: "They have identical legal meanings and can be used interchangeably.", isCorrect: false, rationale: "They are legally distinct; Stop demands a complete halt, Yield demands prioritization of other traffic." },
      { text: "You must slow down and be prepared to stop if traffic is approaching.", isCorrect: true, rationale: "A Yield sign requires stopping only when other vehicles are already using or approaching the lane." }
    ],
    hint: "Yielding means giving priority to others, only stopping if they are present.",
    graphic: (
      <svg viewBox="0 0 100 100" className="w-24 h-24 mx-auto drop-shadow-md" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="poleGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#94a3b8" />
            <stop offset="50%" stopColor="#cbd5e1" />
            <stop offset="100%" stopColor="#64748b" />
          </linearGradient>
          <linearGradient id="signEdge" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#f87171" />
            <stop offset="100%" stopColor="#991b1b" />
          </linearGradient>
        </defs>

        {/* Physical Sign Pole with hardware bolts */}
        <rect x="47" y="55" width="6" height="45" fill="url(#poleGrad)" />
        <circle cx="50" cy="62" r="1.5" fill="#334155" /> {/* Bolt */}
        <circle cx="50" cy="85" r="1.5" fill="#334155" /> {/* Bolt */}

        {/* Drop shadow background sheet for physical thickness */}
        <polygon points="50,56 4,12 96,12" fill="#1e293b" opacity="0.3" />

        {/* Triangular Yield Sign Outer rim */}
        <polygon points="50,53 3,9 97,9" fill="url(#signEdge)" stroke="#ffffff" strokeWidth="1" strokeLinejoin="round" />
        
        {/* Inner white highly reflective sheeting triangle */}
        <polygon points="50,42 15,16 85,16" fill="#f8fafc" />
        
        {/* Crisp text and bold warning inner styling */}
        <text x="50" y="32" fill="#b91c1c" fontSize="13" fontWeight="1000" textAnchor="middle" fontFamily="sans-serif" letterSpacing="0.2">YIELD</text>
      </svg>
    )
  },
  {
    id: 6,
    difficulty: "hard",
    question: "Hydroplaning occurs when a layer of water builds between the tires and the road. What is the safest immediate action if you feel your car hydroplaning?",
    options: [
      { text: "Ease off the accelerator and keep the steering wheel straight.", isCorrect: true, rationale: "Slowing down naturally without braking allows the tires to regain contact with the pavement." },
      { text: "Slam on the brakes immediately to slow down.", isCorrect: false, rationale: "Braking locks wheels on slick water layers, sending the car into an uncontrollable spin." },
      { text: "Turn the steering wheel sharply in the direction of the slide.", isCorrect: false, rationale: "Sharp steering inputs during zero-traction events will cause oversteer and roll risks." },
      { text: "Accelerate to push through the water patch.", isCorrect: false, rationale: "Increasing speed lifts the vehicle further off the road, worsening the loss of control." }
    ],
    hint: "Avoid sudden inputs like braking or steering; let friction do the work gently.",
    graphic: (
      <svg viewBox="0 0 120 100" className="w-28 h-28 mx-auto drop-shadow-md rounded-xl" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="waterGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#38bdf8" />
            <stop offset="50%" stopColor="#0284c7" />
            <stop offset="100%" stopColor="#0369a1" />
          </linearGradient>
          <linearGradient id="tireGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#475569" />
            <stop offset="40%" stopColor="#1e293b" />
            <stop offset="100%" stopColor="#0f172a" />
          </linearGradient>
        </defs>
        {/* Dark Asphalt road at the bottom */}
        <rect x="5" y="70" width="110" height="20" fill="#1e293b" rx="4" />
        
        {/* Thick Layer of Water on Road */}
        <rect x="5" y="65" width="110" height="8" fill="url(#waterGrad)" rx="2" />
        <path d="M 5,66 Q 30,62 60,66 Q 90,62 115,66" fill="none" stroke="#7dd3fc" strokeWidth="1.5" />
        
        {/* Large detailed vehicle tire lifted above asphalt by water wedge */}
        <g transform="translate(60, 42)">
          {/* Outer tire ring with treads */}
          <circle cx="0" cy="0" r="28" fill="url(#tireGrad)" />
          {/* Treads marks around tire */}
          <path d="M -28,0 L -24,0 M 24,0 L 28,0 M 0,-28 L 0,-24 M 0,24 L 0,28 M -20,-20 L -17,-17 M 20,-20 L 17,-17 M -20,20 L -17,17 M 20,20 L 17,17" stroke="#94a3b8" strokeWidth="2.5" strokeLinecap="round" />
          
          {/* Metallic Wheel rim core */}
          <circle cx="0" cy="0" r="16" fill="#cbd5e1" stroke="#475569" strokeWidth="2" />
          {/* Rim spokes */}
          <circle cx="0" cy="0" r="6" fill="#64748b" />
          <line x1="-16" y1="0" x2="16" y2="0" stroke="#475569" strokeWidth="2" />
          <line x1="0" y1="-16" x2="0" y2="16" stroke="#475569" strokeWidth="2" />
        </g>

        {/* Water wedge splashing forward/under tire */}
        <path d="M 28,66 C 35,66 40,64 45,58 C 42,65 35,68 28,68 Z" fill="#e0f2fe" />
        <path d="M 85,65 C 92,67 98,62 104,56 C 100,62 92,66 85,65 Z" fill="#e0f2fe" />

        {/* Warning Label "NO CONTACT" */}
        <rect x="25" y="10" width="70" height="15" fill="#7f1d1d" rx="4" />
        <text x="60" y="20.5" fill="#fca5a5" fontSize="7.5" fontWeight="black" textAnchor="middle" fontFamily="sans-serif" letterSpacing="0.8">WATER WEDGE</text>
      </svg>
    )
  },
  {
    id: 7,
    difficulty: "easy",
    question: "When an emergency vehicle with flashing lights and sirens is approaching from behind, what should you do?",
    options: [
      { text: "Stop immediately in your current lane of travel.", isCorrect: false, rationale: "Stopping suddenly in the middle of a lane blocks the vehicle behind you and causes pile-ups." },
      { text: "Speed up to stay ahead of the emergency vehicle.", isCorrect: false, rationale: "Trying to outrun an emergency vehicle is illegal and blocks their passage." },
      { text: "Pull over to the left side and maintain your speed.", isCorrect: false, rationale: "Standard emergency vehicle passing lanes expect you to pull right and come to a complete stop." },
      { text: "Pull over to the right edge of the road and stop.", isCorrect: true, rationale: "Drivers must clear the pathway by moving safely to the right side (or appropriate shoulder) and bringing the car to a halt." }
    ],
    hint: "Clear the way safely and remain completely stationary until they have gone by.",
    graphic: (
      <svg viewBox="0 0 120 100" className="w-28 h-28 mx-auto drop-shadow-md rounded-xl" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="emergencyGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#ef4444" />
            <stop offset="100%" stopColor="#dc2626" />
          </linearGradient>
          <linearGradient id="blueCarGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#0284c7" />
            <stop offset="40%" stopColor="#0ea5e9" />
            <stop offset="100%" stopColor="#0369a1" />
          </linearGradient>
          <linearGradient id="glassGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#e0f2fe" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#bae6fd" stopOpacity="0.5" />
          </linearGradient>
        </defs>
        {/* Multi-lane Road */}
        <rect x="5" y="5" width="110" height="90" fill="#1e293b" rx="8" />
        <line x1="42" y1="5" x2="42" y2="95" stroke="#475569" strokeWidth="1.2" strokeDasharray="4,4" />
        <line x1="80" y1="5" x2="80" y2="95" stroke="#475569" strokeWidth="1.2" strokeDasharray="4,4" />
        {/* Solid yellow right-hand margin boundary line */}
        <line x1="104" y1="5" x2="104" y2="95" stroke="#f59e0b" strokeWidth="1.5" />

        {/* Sirens/Flashing visual rays from emergency car */}
        <circle cx="24" cy="74" r="22" fill="#ef4444" opacity="0.15" />
        <circle cx="24" cy="74" r="14" fill="#3b82f6" opacity="0.2" />

        {/* Emergency Vehicle (Ambulance/Police back view) */}
        <g transform="translate(13, 62)">
          <rect x="0" y="0" width="22" height="25" fill="#ffffff" rx="3" stroke="#cbd5e1" strokeWidth="1" />
          {/* Red stripes */}
          <rect x="0" y="8" width="22" height="4" fill="#ef4444" />
          {/* Back Glass */}
          <rect x="3" y="2" width="16" height="5" fill="#475569" rx="1" />
          {/* Highly active sirens flashing */}
          <rect x="4" y="-3.5" width="6" height="3" fill="#ef4444" rx="1" />
          <rect x="12" y="-3.5" width="6" height="3" fill="#3b82f6" rx="1" />
          <circle cx="7" cy="-2" r="3" fill="#fca5a5" className="animate-ping" opacity="0.7" />
          <circle cx="15" cy="-2" r="3" fill="#93c5fd" className="animate-ping" opacity="0.7" />
        </g>

        {/* Standard car safely pulled over to the right and stopped */}
        <g transform="translate(86, 25) rotate(10)">
          <rect x="0" y="0" width="18" height="30" fill="url(#blueCarGrad)" rx="3" />
          <rect x="2.5" y="8" width="13" height="12" fill="url(#glassGrad)" rx="1" />
          {/* Right blinker flashing safely */}
          <circle cx="1" cy="3" r="1.5" fill="#f59e0b" className="animate-pulse" />
        </g>

        {/* Arrow indicating path of normal car pulling right */}
        <path d="M 60,45 Q 85,42 90,34" fill="none" stroke="#10b981" strokeWidth="2" strokeDasharray="3,2" />
        <polygon points="91,30 85,35 90,38" fill="#10b981" />
      </svg>
    )
  },
  {
    id: 8,
    difficulty: "medium",
    question: "In a roundabout, which of the following is a correct rule of operation?",
    options: [
      { text: "Traffic inside must yield to vehicles entering from the right.", isCorrect: false, rationale: "Incoming drivers must yield, not those who are already inside the roundabout flow." },
      { text: "Yield to traffic already in the circle and move counter-clockwise.", isCorrect: true, rationale: "Vehicles already navigating the circular path have priority. Entrance must always be towards the left (counter-clockwise)." },
      { text: "You can move in both clockwise and counter-clockwise directions.", isCorrect: false, rationale: "Roundabouts are strictly unidirectional systems designed to avoid head-on traffic." },
      { text: "Always stop completely before entering the circular intersection.", isCorrect: false, rationale: "You only yield; if the circle is empty, you can merge smoothly without stopping." }
    ],
    hint: "Drivers inside have the priority. Always turn left to enter the circle.",
    graphic: (
      <svg viewBox="0 0 100 100" className="w-24 h-24 mx-auto drop-shadow-md" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="blueSignGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#2563eb" />
            <stop offset="30%" stopColor="#1d4ed8" />
            <stop offset="100%" stopColor="#1e3a8a" />
          </linearGradient>
          <linearGradient id="rimGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#ffffff" />
            <stop offset="40%" stopColor="#cbd5e1" />
            <stop offset="100%" stopColor="#64748b" />
          </linearGradient>
          <linearGradient id="postGradRound" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#94a3b8" />
            <stop offset="50%" stopColor="#e2e8f0" />
            <stop offset="100%" stopColor="#475569" />
          </linearGradient>
        </defs>

        {/* Physical sign post and mounting hardware */}
        <rect x="47" y="55" width="6" height="45" fill="url(#postGradRound)" />
        <circle cx="50" cy="65" r="1.5" fill="#334155" /> {/* Screw */}
        <circle cx="50" cy="88" r="1.5" fill="#334155" /> {/* Screw */}

        {/* 3D Drop shadow for sign blank */}
        <circle cx="50" cy="46" r="43" fill="#0f172a" opacity="0.3" />

        {/* Outer realistic reflective silver bevel rim */}
        <circle cx="50" cy="44" r="43" fill="url(#rimGrad)" />
        <circle cx="50" cy="44" r="41" fill="#ffffff" />

        {/* Sign Face - High-contrast reflective blue */}
        <circle cx="50" cy="44" r="39" fill="url(#blueSignGrad)" />

        {/* Beautiful high-fidelity roundabout loop arrows */}
        <g transform="translate(50,44)">
          {/* Arrow 1 */}
          <path d="M -15,15 A 21,21 0 0,1 -15,-15" fill="none" stroke="#ffffff" strokeWidth="4.5" strokeLinecap="round" />
          <polygon points="-15,-15 -22,-8 -11,-8" fill="#ffffff" transform="rotate(-15 -15 -15)" />
          {/* Arrow 2 */}
          <path d="M -10,-18 A 21,21 0 0,1 18,-8" fill="none" stroke="#ffffff" strokeWidth="4.5" strokeLinecap="round" />
          <polygon points="18,-8 13,-16 10,-9" fill="#ffffff" transform="rotate(35 18 -8)" />
          {/* Arrow 3 */}
          <path d="M 18,8 A 21,21 0 0,1 -5,20" fill="none" stroke="#ffffff" strokeWidth="4.5" strokeLinecap="round" />
          <polygon points="-5,20 -1,13 -9,14" fill="#ffffff" transform="rotate(85 -5 20)" />
        </g>
        
        {/* Subtle glass reflection overlay */}
        <path d="M 14,30 Q 50,15 86,30 A 39,39 0 0,0 14,30 Z" fill="#ffffff" opacity="0.1" />
      </svg>
    )
  },
  {
    id: 9,
    difficulty: "hard",
    question: "If your vehicle is equipped with Anti-lock Braking System (ABS), how should you perform an emergency stop?",
    options: [
      { text: "Pump the brake pedal rapidly to prevent wheel lock.", isCorrect: false, rationale: "Pumping manually fights the computer system and decreases braking efficiency." },
      { text: "Apply light pressure and steer into the nearest curb.", isCorrect: false, rationale: "Light pressure will not stop the car in time, and steering into curbs causes catastrophic damage." },
      { text: "Apply firm, steady pressure and do not let go.", isCorrect: true, rationale: "ABS rapidly pumps the brakes automatically; your job is to keep pressure constant and steer." },
      { text: "Pull the handbrake while tapping the foot brake.", isCorrect: false, rationale: "Using the handbrake at speed locks the rear tires, triggering a spinout." }
    ],
    hint: "Let the computer pump the brakes for you while you press down hard.",
    graphic: (
      <svg viewBox="0 0 120 100" className="w-28 h-28 mx-auto drop-shadow-md rounded-xl" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="pedalMetal" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#cbd5e1" />
            <stop offset="50%" stopColor="#94a3b8" />
            <stop offset="100%" stopColor="#475569" />
          </linearGradient>
        </defs>
        {/* Dark background inside floorbox */}
        <rect x="5" y="5" width="110" height="90" fill="#0f172a" rx="8" />
        
        {/* Foot accelerator pedal on the right (Unpressed, slim) */}
        <rect x="85" y="25" width="12" height="50" fill="#1e293b" rx="2" stroke="#334155" />
        
        {/* Broad heavy brake pedal (Pressed hard down) */}
        <g transform="translate(35, 30)">
          {/* Pedal arm */}
          <rect x="11" y="-20" width="8" height="35" fill="url(#pedalMetal)" />
          {/* Pedal pad */}
          <rect x="0" y="10" width="30" height="22" fill="#1e293b" rx="3" stroke="#cbd5e1" strokeWidth="2.5" />
          {/* Rubber anti-slip grips on brake pedal */}
          <rect x="4" y="14" width="4" height="14" fill="#0f172a" />
          <rect x="13" y="14" width="4" height="14" fill="#0f172a" />
          <rect x="22" y="14" width="4" height="14" fill="#0f172a" />
        </g>

        {/* Stepping shoe outline (pressing hard) */}
        <path d="M 12,5 L 35,45 L 60,45 L 45,15 Z" fill="#475569" opacity="0.45" stroke="#94a3b8" strokeWidth="1.5" />

        {/* ABS Pulse Rings radiating from brake pedal */}
        <circle cx="50" cy="46" r="22" fill="none" stroke="#fbbf24" strokeWidth="1.5" strokeDasharray="4,3" className="animate-ping" opacity="0.6" />
        <circle cx="50" cy="46" r="14" fill="none" stroke="#fbbf24" strokeWidth="1" strokeDasharray="3,2" />

        {/* ABS Glowing dash symbol in top left corner */}
        <rect x="12" y="12" width="28" height="13" fill="#78350f" rx="3" stroke="#d97706" strokeWidth="1" />
        <text x="26" y="21.5" fill="#fbbf24" fontSize="7.5" fontWeight="black" textAnchor="middle" fontFamily="monospace">ABS</text>
      </svg>
    )
  },
  {
    id: 10,
    difficulty: "easy",
    question: "Which of the following is true regarding a blind spot when driving a standard passenger vehicle?",
    options: [
      { text: "It is an area around the vehicle that cannot be seen in the mirrors.", isCorrect: true, rationale: "Physical pillars of the car and mirror angles create zones alongside the car that only shoulder-checks can reveal." },
      { text: "It is the direct path of visibility through the front windshield.", isCorrect: false, rationale: "This is your primary vision field, which is completely clear." },
      { text: "It is only present when driving large commercial semi-trucks.", isCorrect: false, rationale: "Every passenger car, SUV, and motorcycle has blind spots that need checking." },
      { text: "It can be completely eliminated by adjusting your rearview mirror upwards.", isCorrect: false, rationale: "No mirror adjustment can completely eliminate the need for head shoulder checks." }
    ],
    hint: "It requires a physical head turn to see.",
    graphic: (
      <svg viewBox="0 0 120 120" className="w-28 h-28 mx-auto drop-shadow-md rounded-2xl" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="hostCarGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#94a3b8" />
            <stop offset="50%" stopColor="#cbd5e1" />
            <stop offset="100%" stopColor="#475569" />
          </linearGradient>
          <linearGradient id="otherCarGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#f97316" />
            <stop offset="100%" stopColor="#c2410c" />
          </linearGradient>
          <linearGradient id="blindSpotRed" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#ef4444" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#7f1d1d" stopOpacity="0.1" />
          </linearGradient>
          <linearGradient id="clearViewGreen" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#10b981" stopOpacity="0.25" />
            <stop offset="100%" stopColor="#064e3b" stopOpacity="0.02" />
          </linearGradient>
          <linearGradient id="glassGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#e0f2fe" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#bae6fd" stopOpacity="0.5" />
          </linearGradient>
        </defs>

        {/* Real dark asphalt lane background overlay */}
        <rect x="10" y="5" width="100" height="110" fill="#1e293b" rx="8" />
        <line x1="60" y1="5" x2="60" y2="115" stroke="#334155" strokeWidth="1.5" strokeDasharray="5,4" />

        {/* Green safe clear view cone */}
        <path d="M 60,65 L 12,5 L 108,5 Z" fill="url(#clearViewGreen)" />
        <text x="60" y="24" fill="#34d399" fontSize="7" fontWeight="bold" textAnchor="middle" fontFamily="sans-serif" letterSpacing="0.2">CLEAR VIEW</text>

        {/* Highly detailed main host car (Silver sedan) */}
        <g transform="translate(48, 48)">
          {/* Shadow */}
          <rect x="-1" y="1" width="24" height="42" fill="#020617" opacity="0.4" rx="4.5" />
          {/* Main Body */}
          <rect x="0" y="0" width="24" height="42" fill="url(#hostCarGrad)" rx="4" />
          {/* Glossy panoramic glass sunroof */}
          <rect x="3.5" y="10" width="17" height="18" fill="url(#glassGrad)" rx="1.5" />
          {/* Dual exhaust pipes */}
          <rect x="4" y="41.5" width="2" height="1.5" fill="#94a3b8" />
          <rect x="18" y="41.5" width="2" height="1.5" fill="#94a3b8" />
          {/* Side rearview mirrors */}
          <rect x="-3" y="13" width="3" height="2" fill="#475569" rx="0.5" />
          <rect x="24" y="13" width="3" height="2" fill="#475569" rx="0.5" />
          {/* Rear lights */}
          <rect x="1" y="41.2" width="4" height="1" fill="#ef4444" />
          <rect x="19" y="41.2" width="4" height="1" fill="#ef4444" />
        </g>

        {/* Left Side Blind Spot (Dangerous sector with orange car entering) */}
        <path d="M 45,61 L 12,85 L 12,110 L 45,95 Z" fill="url(#blindSpotRed)" stroke="#ef4444" strokeWidth="1" strokeDasharray="3,2" />
        <text x="25" y="94" fill="#fca5a5" fontSize="6.5" fontWeight="bold" textAnchor="middle" fontFamily="sans-serif">BLIND SPOT</text>

        {/* Detailed hazard car starting to merge inside the left blind spot */}
        <g transform="translate(18, 88) rotate(5)">
          <rect x="0" y="0" width="13" height="20" fill="url(#otherCarGrad)" rx="2.5" />
          <rect x="2" y="5" width="9" height="8" fill="url(#glassGrad)" rx="0.5" />
        </g>

        {/* Right Side Blind Spot */}
        <path d="M 75,61 L 108,85 L 108,110 L 75,95 Z" fill="url(#blindSpotRed)" stroke="#ef4444" strokeWidth="1" strokeDasharray="3,2" />
        <text x="94" y="94" fill="#fca5a5" fontSize="6.5" fontWeight="bold" textAnchor="middle" fontFamily="sans-serif">BLIND SPOT</text>
      </svg>
    )
  },
  {
    id: 11,
    difficulty: "medium",
    question: "While driving in heavy rainfall, what is the safest recommended following distance?",
    options: [
      { text: "At least 4 seconds to compensate for reduced tyre friction.", isCorrect: true, rationale: "Slippery roads heavily reduce tyre grip and increase the stopping distance, requiring at least a 4-second gap." },
      { text: "Maintain the standard 2-second rule regardless of weather.", isCorrect: false, rationale: "The 2-second rule is only safe for perfect dry-pavement daylight situations." },
      { text: "A gap of 1 car length for every 50 km/h of speed.", isCorrect: false, rationale: "Using car lengths is highly inaccurate at modern speeds and rain conditions." },
      { text: "Flicker high beams frequently to warn the driver in front.", isCorrect: false, rationale: "Flickering high beams blurs mirrors, blinding the leading driver and increasing risk." }
    ],
    hint: "Rainwater cuts brake competence in half. Double your normal stopping gap.",
    graphic: (
      <svg viewBox="0 0 120 100" className="w-28 h-28 mx-auto drop-shadow-md rounded-xl" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="wetRoad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#0f172a" />
            <stop offset="50%" stopColor="#1e293b" />
            <stop offset="100%" stopColor="#0f172a" />
          </linearGradient>
          <linearGradient id="blueCarGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#0284c7" />
            <stop offset="40%" stopColor="#0ea5e9" />
            <stop offset="100%" stopColor="#0369a1" />
          </linearGradient>
          <linearGradient id="redCarGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#dc2626" />
            <stop offset="40%" stopColor="#ef4444" />
            <stop offset="100%" stopColor="#991b1b" />
          </linearGradient>
          <linearGradient id="glassGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#e0f2fe" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#bae6fd" stopOpacity="0.5" />
          </linearGradient>
        </defs>
        {/* Road surface */}
        <rect x="10" y="5" width="100" height="90" fill="url(#wetRoad)" rx="8" />
        <line x1="60" y1="5" x2="60" y2="95" stroke="#334155" strokeWidth="1.5" strokeDasharray="5,4" />

        {/* Water drops representing rainfall (slant lines) */}
        <line x1="20" y1="10" x2="15" y2="25" stroke="#38bdf8" strokeWidth="1" opacity="0.5" />
        <line x1="50" y1="15" x2="45" y2="30" stroke="#38bdf8" strokeWidth="1" opacity="0.5" />
        <line x1="90" y1="8" x2="85" y2="23" stroke="#38bdf8" strokeWidth="1" opacity="0.5" />
        <line x1="30" y1="50" x2="25" y2="65" stroke="#38bdf8" strokeWidth="1" opacity="0.5" />
        <line x1="100" y1="60" x2="95" y2="75" stroke="#38bdf8" strokeWidth="1" opacity="0.5" />
        <line x1="75" y1="35" x2="70" y2="50" stroke="#38bdf8" strokeWidth="1" opacity="0.5" />

        {/* Lead car top down (Red sedan) */}
        <g transform="translate(49, 12)">
          <rect x="0" y="0" width="22" height="34" fill="url(#redCarGrad)" rx="3.5" />
          <rect x="3" y="8" width="16" height="15" fill="url(#glassGrad)" rx="1" />
          <circle cx="3" cy="34" r="1.5" fill="#ef4444" />
          <circle cx="19" cy="34" r="1.5" fill="#ef4444" />
        </g>

        {/* Following car top down (Blue sedan) */}
        <g transform="translate(49, 64)">
          <rect x="0" y="0" width="22" height="34" fill="url(#blueCarGrad)" rx="3.5" />
          <rect x="3" y="8" width="16" height="15" fill="url(#glassGrad)" rx="1" />
          {/* Beam headlamps illuminating rain spray */}
          <path d="M 3,0 L -8,-15 L 12,-15 L 3,0 Z" fill="#fef08a" opacity="0.12" />
          <path d="M 19,0 L 8,-15 L 28,-15 L 19,0 Z" fill="#fef08a" opacity="0.12" />
        </g>

        {/* Safety measurement lines */}
        <g>
          <line x1="40" y1="48" x2="40" y2="62" stroke="#fbbf24" strokeWidth="1.5" />
          <polygon points="40,48 37,53 43,53" fill="#fbbf24" />
          <polygon points="40,62 37,57 43,57" fill="#fbbf24" />
          
          {/* 4s Badge */}
          <rect x="15" y="49" width="22" height="11" fill="#78350f" rx="3" stroke="#d97706" strokeWidth="1" />
          <text x="26" y="58" fill="#fbbf24" fontSize="7" fontWeight="black" textAnchor="middle" fontFamily="monospace">4s+</text>
        </g>
      </svg>
    )
  },
  {
    id: 12,
    difficulty: "hard",
    question: "You are cruising at 100 km/h and experience a sudden tyre blowout. What is the safest response?",
    options: [
      { text: "Slam the brakes immediately and turn off the road.", isCorrect: false, rationale: "Braking hard on a blown tyre will instantly destabilize the car, potentially causing a roll." },
      { text: "Hold the steering wheel firmly straight, ease off the gas, and brake gently once stable.", isCorrect: true, rationale: "Keeping the wheel steady prevents initial loss of control. Letting deceleration occur naturally is safest." },
      { text: "Shift immediately into reverse or park to force a lockup.", isCorrect: false, rationale: "This will shred your transmission and lock wheels, triggering an uncontrollable roll." },
      { text: "Turn the wheel rapidly towards the direction of the blown tyre.", isCorrect: false, rationale: "Abrupt steering inputs at high speed during tyre blowouts lead to severe rollover crashes." }
    ],
    hint: "Prioritize keeping the vehicle straight and avoiding any abrupt control inputs.",
    graphic: (
      <svg viewBox="0 0 120 100" className="w-28 h-28 mx-auto drop-shadow-md rounded-xl" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="wheelRubber" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#334155" />
            <stop offset="100%" stopColor="#0f172a" />
          </linearGradient>
        </defs>
        {/* Asphalt backdrop */}
        <rect x="5" y="5" width="110" height="90" fill="#1e293b" rx="8" />

        {/* Tire showing rupture at bottom right */}
        <g transform="translate(60, 42)">
          {/* Flattened/burst tire outline */}
          <path d="M -24,-12 C -10,-28 10,-28 24,-12 C 30,-2 28,14 18,22 C 10,24 -10,24 -18,22 C -28,14 -30,-2 -24,-12 Z" fill="url(#wheelRubber)" stroke="#0f172a" strokeWidth="2" />
          {/* Tear mark where air escapes */}
          <path d="M 18,12 L 28,18 L 20,20" stroke="#ef4444" strokeWidth="2" fill="none" />
          
          {/* Steel alloy Rim */}
          <circle cx="0" cy="0" r="14" fill="#94a3b8" stroke="#475569" strokeWidth="2" />
          <circle cx="0" cy="0" r="4" fill="#cbd5e1" />
        </g>

        {/* Deflation sparks / air escape streams */}
        <path d="M 78,60 L 92,68 M 80,55 L 94,57 M 76,64 L 88,74" stroke="#f59e0b" strokeWidth="2" strokeLinecap="round" />
        <path d="M 78,60 L 86,63" stroke="#ef4444" strokeWidth="1.5" />

        {/* Warning Badge "STEER STRAIGHT" */}
        <rect x="25" y="74" width="70" height="15" fill="#065f46" rx="4" />
        <text x="60" y="84.5" fill="#34d399" fontSize="7.2" fontWeight="black" textAnchor="middle" fontFamily="sans-serif" letterSpacing="0.4">HOLD FIRM STRAIGHT</text>
        
        {/* Straight arrows pointing up to represent keeping control */}
        <path d="M 22,35 L 22,15" fill="none" stroke="#10b981" strokeWidth="2" />
        <polygon points="22,12 18,19 26,19" fill="#10b981" />
        <path d="M 98,35 L 98,15" fill="none" stroke="#10b981" strokeWidth="2" />
        <polygon points="98,12 94,19 102,19" fill="#10b981" />
      </svg>
    )
  },
  {
    id: 13,
    difficulty: "easy",
    question: "What does an unbroken, solid white line painted along your side of the lane indicate?",
    options: [
      { text: "You are allowed to overtake but must do so rapidly.", isCorrect: false, rationale: "Broken or dashed lines indicate overtaking permissions, not solid unbroken lanes." },
      { text: "Changing lanes or crossing this line is highly discouraged and often illegal.", isCorrect: true, rationale: "Unbroken white lines signify lane borders designed to prevent crossing in high-hazard areas." },
      { text: "It marks a designated pathway only for slow-moving trucks.", isCorrect: false, rationale: "Solid white lines partition standard lanes, they do not denote specific vehicles." },
      { text: "This line is only active as a marker during nighttime operations.", isCorrect: false, rationale: "Lane markings are active constantly, regardless of ambient lighting." }
    ],
    hint: "Solid borders are visual blockades. They indicate you must stick to your present lane.",
    graphic: (
      <svg viewBox="0 0 120 75" className="w-28 h-28 mx-auto drop-shadow-md rounded-xl" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="roadAsphalt" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#1e293b" />
            <stop offset="100%" stopColor="#0f172a" />
          </linearGradient>
          <linearGradient id="blueCarGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#0284c7" />
            <stop offset="40%" stopColor="#0ea5e9" />
            <stop offset="100%" stopColor="#0369a1" />
          </linearGradient>
          <linearGradient id="redCarGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#dc2626" />
            <stop offset="40%" stopColor="#ef4444" />
            <stop offset="100%" stopColor="#991b1b" />
          </linearGradient>
          <linearGradient id="glassGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#e0f2fe" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#bae6fd" stopOpacity="0.5" />
          </linearGradient>
        </defs>

        {/* Textured dark asphalt roadway */}
        <rect x="0" y="10" width="120" height="55" fill="url(#roadAsphalt)" />
        <rect x="0" y="8" width="120" height="2" fill="#475569" />
        <rect x="0" y="65" width="120" height="2" fill="#475569" />

        {/* Double solid white line representing illegal crossing barrier */}
        <line x1="0" y1="35" x2="120" y2="35" stroke="#ffffff" strokeWidth="2.5" />
        <line x1="0" y1="39" x2="120" y2="39" stroke="#ffffff" strokeWidth="2.5" />

        {/* Yellow exterior lane boundaries */}
        <line x1="0" y1="16" x2="120" y2="16" stroke="#f59e0b" strokeWidth="1" strokeDasharray="5,4" />
        <line x1="0" y1="58" x2="120" y2="58" stroke="#f59e0b" strokeWidth="1" strokeDasharray="5,4" />

        {/* Blue sedan staying safely in lane (Left) */}
        <g transform="translate(15, 19)">
          <rect x="0" y="0" width="18" height="10" fill="url(#blueCarGrad)" rx="2" />
          <rect x="11" y="2" width="5" height="6" fill="url(#glassGrad)" />
        </g>

        {/* Red sports car illegally crossing double line (Middle Right) */}
        <g transform="translate(75, 30) rotate(14)">
          <rect x="0" y="0" width="18" height="10" fill="url(#redCarGrad)" rx="2" />
          <rect x="11" y="2" width="5" height="6" fill="url(#glassGrad)" />
        </g>

        {/* Glossy 3D Prohibitory Sign Overlay over the offending vehicle */}
        <g transform="translate(85, 35)">
          <circle cx="0" cy="0" r="10" fill="none" stroke="#ef4444" strokeWidth="3.2" />
          <line x1="-7" y1="-7" x2="7" y2="7" stroke="#ef4444" strokeWidth="3.2" />
        </g>
      </svg>
    )
  },
  {
    id: 14,
    difficulty: "medium",
    question: "Under what circumstances is performing a mid-road U-turn illegal or unsafe?",
    options: [
      { text: "Near hillcrests, sharp curves, or where vision is restricted.", isCorrect: true, rationale: "You need ample visible clearance in both directions to safely complete a U-turn without forcing oncoming cars to slam brakes." },
      { text: "Only when the temperature exceeds 40°C on concrete structures.", isCorrect: false, rationale: "Weather conditions do not govern U-turn legality; visibility and clearance do." },
      { text: "Anytime there is no law enforcement vehicle actively watching.", isCorrect: false, rationale: "Safety rules are structural and legal constants, not conditional upon enforcement presence." },
      { text: "Whenever you are driving with a full fuel tank.", isCorrect: false, rationale: "Fuel level has no impact on driving maneuver legality." }
    ],
    hint: "Think about whether oncoming traffic can see you from a safe distance.",
    graphic: (
      <svg viewBox="0 0 100 100" className="w-24 h-24 mx-auto drop-shadow-md" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="redSignRing" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#ef4444" />
            <stop offset="100%" stopColor="#991b1b" />
          </linearGradient>
          <linearGradient id="poleGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#94a3b8" />
            <stop offset="50%" stopColor="#cbd5e1" />
            <stop offset="100%" stopColor="#64748b" />
          </linearGradient>
          <linearGradient id="rimGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#ffffff" />
            <stop offset="40%" stopColor="#cbd5e1" />
            <stop offset="100%" stopColor="#64748b" />
          </linearGradient>
        </defs>

        {/* Physical steel sign post */}
        <rect x="47" y="55" width="6" height="45" fill="url(#poleGrad)" />
        <circle cx="50" cy="65" r="1.5" fill="#334155" />
        <circle cx="50" cy="88" r="1.5" fill="#334155" />

        {/* Drop shadow for physical feel */}
        <circle cx="50" cy="46" r="43" fill="#0f172a" opacity="0.3" />

        {/* Outer Silver Beveled Metal Rim */}
        <circle cx="50" cy="44" r="43" fill="url(#rimGrad)" />
        <circle cx="50" cy="44" r="41" fill="#ffffff" />

        {/* Bold Prohibitory Red Outer Ring with 3D gradient look */}
        <circle cx="50" cy="44" r="39" fill="url(#redSignRing)" />
        
        {/* White retroreflective background core */}
        <circle cx="50" cy="44" r="30" fill="#f8fafc" />

        {/* Black printed U-Turn arrow */}
        <path d="M 60,54 L 60,39 A 10,10 0 0,0 40,39 L 40,51" fill="none" stroke="#0f172a" strokeWidth="5.5" strokeLinecap="round" />
        <polygon points="40,54 34,46 46,46" fill="#0f172a" />

        {/* Bold Diagonal Cancel Slash with 3D glossy appeal */}
        <line x1="25" y1="19" x2="75" y2="69" stroke="url(#redSignRing)" strokeWidth="6.5" />

        {/* Glass reflection sheen */}
        <path d="M 17,28 Q 50,15 83,28 A 39,39 0 0,0 17,28 Z" fill="#ffffff" opacity="0.1" />
      </svg>
    )
  },
  {
    id: 15,
    difficulty: "hard",
    question: "If you double your driving speed (e.g., from 40 km/h to 80 km/h), what happens to your vehicle's physical stopping distance?",
    options: [
      { text: "It doubles in a linear 1:1 relationship.", isCorrect: false, rationale: "Kinetic energy does not scale linearly; it scales quadratically, making stopping distance much worse than double." },
      { text: "It remains exactly the same due to brake friction.", isCorrect: false, rationale: "Higher speeds mean far more kinetic energy to disperse, requiring significantly greater track distance." },
      { text: "It increases by approximately four times (quadruples).", isCorrect: true, rationale: "Deceleration kinetic energy equation is (E = 1/2 * m * v²). When velocity (v) doubles, kinetic energy (and slide distance) increases by four." },
      { text: "It increases tenfold due to aerodynamic vacuum drag.", isCorrect: false, rationale: "Aerodynamic resistance helps decelerate vehicles slightly, but the kinetic stopping distance increases four times based on tire physics." }
    ],
    hint: "Kinetic energy scales quadratically with speed (v squared).",
    graphic: (
      <svg viewBox="0 0 120 100" className="w-28 h-28 mx-auto drop-shadow-md rounded-xl" xmlns="http://www.w3.org/2000/svg">
        {/* Clean graph background */}
        <rect x="5" y="5" width="110" height="90" fill="#0f172a" rx="8" />
        
        {/* Formula Display */}
        <text x="60" y="20" fill="#94a3b8" fontSize="8" fontWeight="bold" textAnchor="middle" fontFamily="monospace">E_k = 1/2 * m * v²</text>

        {/* Track 1: 40 km/h */}
        <text x="12" y="38" fill="#cbd5e1" fontSize="7" fontWeight="bold" fontFamily="sans-serif">40 km/h</text>
        {/* Track bar background */}
        <rect x="12" y="42" width="96" height="6" fill="#1e293b" rx="2" />
        {/* Track bar active (short stopping distance) */}
        <rect x="12" y="42" width="20" height="6" fill="#10b981" rx="2" />
        <text x="36" y="47.5" fill="#34d399" fontSize="6.5" fontWeight="extrabold" fontFamily="sans-serif">1X DIST</text>

        {/* Track 2: 80 km/h */}
        <text x="12" y="64" fill="#cbd5e1" fontSize="7" fontWeight="bold" fontFamily="sans-serif">80 km/h (2x Speed)</text>
        {/* Track bar background */}
        <rect x="12" y="68" width="96" height="6" fill="#1e293b" rx="2" />
        {/* Track bar active (4x stopping distance!) */}
        <rect x="12" y="68" width="80" height="6" fill="#ef4444" rx="2" />
        <text x="96" y="73.5" fill="#fca5a5" fontSize="6.5" fontWeight="extrabold" fontFamily="sans-serif">4X DIST</text>

        {/* Kinetic warning notice */}
        <text x="60" y="88" fill="#fbbf24" fontSize="7" fontWeight="black" textAnchor="middle" fontFamily="sans-serif" letterSpacing="0.2">QUADRUPLED STOPPING RISK</text>
      </svg>
    )
  }
];

const LOCAL_STORAGE_KEY = "godriveify_quiz_progress_v1";

interface QuizProgress {
  currentIdx: number;
  selectedOpt: number | null;
  isSubmitted: boolean;
  score: number;
  quizStarted: boolean;
  quizFinished: boolean;
  timeLeft: number;
  studentName: string;
  streak: number;
  maxStreak: number;
  history: Array<{
    question: string;
    selected: string;
    isCorrect: boolean;
    rationale: string;
    correctText: string;
  }>;
  selectedDifficulty: "all" | "easy" | "medium" | "hard";
}

const getSavedProgress = (): QuizProgress | null => {
  if (typeof window === "undefined") return null;
  try {
    const saved = localStorage.getItem(LOCAL_STORAGE_KEY);
    return saved ? JSON.parse(saved) : null;
  } catch (e) {
    console.error("Failed to parse quiz progress", e);
    return null;
  }
};

// --- MULTI-THICK COATED OFFLINE V8 SIMULATOR ENGINE USING BROWSER WEB AUDIO API ---
function createV8SynthEngine() {
  let ctx: AudioContext | null = null;
  let matches = false;
  
  // Audio Nodes
  let osc1: OscillatorNode | null = null;
  let osc2: OscillatorNode | null = null;
  let subOsc: OscillatorNode | null = null;
  let engineGain: GainNode | null = null;
  let lowpass: BiquadFilterNode | null = null;
  let bandpass: BiquadFilterNode | null = null;
  let masterGain: GainNode | null = null;
  
  return {
    start() {
      if (matches) return;
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      if (!AudioCtx) return;
      
      ctx = new AudioCtx();
      matches = true;
      
      const now = ctx.currentTime;
      
      // Master output volume control
      masterGain = ctx.createGain();
      masterGain.gain.setValueAtTime(0, now);
      masterGain.connect(ctx.destination);
      
      // V8 cylinder throbbing oscillators
      osc1 = ctx.createOscillator();
      osc1.type = "sawtooth";
      osc1.frequency.setValueAtTime(22, now); // Low thrumming V8 pulse
      
      osc2 = ctx.createOscillator();
      osc2.type = "triangle";
      osc2.frequency.setValueAtTime(14, now); // Offset to produce organic sound pressure wave beats!
      
      // Deep sub-bass pulse representing cylinder firing strokes
      subOsc = ctx.createOscillator();
      subOsc.type = "sine";
      subOsc.frequency.setValueAtTime(30, now);
      
      // Set up volume envelope for cylinder group
      engineGain = ctx.createGain();
      engineGain.gain.setValueAtTime(0.5, now);
      
      osc1.connect(engineGain);
      osc2.connect(engineGain);
      subOsc.connect(engineGain);
      
      // Lowpass and resonant filters representing physical engine block muffling
      lowpass = ctx.createBiquadFilter();
      lowpass.type = "lowpass";
      lowpass.frequency.setValueAtTime(180, now);
      
      bandpass = ctx.createBiquadFilter();
      bandpass.type = "bandpass";
      bandpass.frequency.setValueAtTime(85, now);
      bandpass.Q.setValueAtTime(2.5, now);
      
      engineGain.connect(lowpass);
      lowpass.connect(bandpass);
      bandpass.connect(masterGain);
      
      // Start the oscillators
      osc1.start(now);
      osc2.start(now);
      subOsc.start(now);
      
      // --- Physical Ignition Flare Sequence ---
      // 1. Starter motor high-speed cranking clicks
      const crankOsc = ctx.createOscillator();
      crankOsc.type = "sine";
      crankOsc.frequency.setValueAtTime(180, now);
      
      const crankGain = ctx.createGain();
      crankGain.gain.setValueAtTime(0.25, now);
      crankGain.gain.exponentialRampToValueAtTime(0.001, now + 0.45);
      
      crankOsc.connect(crankGain);
      crankGain.connect(ctx.destination);
      crankOsc.start(now);
      crankOsc.stop(now + 0.5);
      
      // 2. Motor ignites and roars (Flare up)
      osc1.frequency.setValueAtTime(22, now);
      osc1.frequency.exponentialRampToValueAtTime(110, now + 0.5); // high pitch combustion roar!
      osc1.frequency.exponentialRampToValueAtTime(32, now + 1.2);  // settles to smooth idle
      
      osc2.frequency.setValueAtTime(14, now);
      osc2.frequency.exponentialRampToValueAtTime(80, now + 0.5);  // high pitch combustion roar!
      osc2.frequency.exponentialRampToValueAtTime(24, now + 1.2);  // settles to smooth idle
      
      subOsc.frequency.setValueAtTime(30, now);
      subOsc.frequency.linearRampToValueAtTime(95, now + 0.5);
      subOsc.frequency.linearRampToValueAtTime(45, now + 1.2);
      
      // 3. Main gain spikes at ignition, then throttles back to deep rumble idle volume
      masterGain.gain.setValueAtTime(0, now);
      masterGain.gain.linearRampToValueAtTime(0.85, now + 0.5); // combustion loud roar!
      masterGain.gain.linearRampToValueAtTime(0.40, now + 1.2); // settle down to safe rumble idle
    },
    
    rev() {
      if (!matches || !ctx || !osc1 || !osc2 || !subOsc || !masterGain || !bandpass) return;
      const now = ctx.currentTime;
      
      // Clear previous ramps and trigger full throttle RPM sweep!
      osc1.frequency.cancelScheduledValues(now);
      osc1.frequency.setValueAtTime(osc1.frequency.value, now);
      osc1.frequency.exponentialRampToValueAtTime(175, now + 0.28); // Engine screams at high rpm
      osc1.frequency.exponentialRampToValueAtTime(32, now + 0.85); // return to cozy warm idle
      
      osc2.frequency.cancelScheduledValues(now);
      osc2.frequency.setValueAtTime(osc2.frequency.value, now);
      osc2.frequency.exponentialRampToValueAtTime(135, now + 0.28);
      osc2.frequency.exponentialRampToValueAtTime(24, now + 0.85);
      
      subOsc.frequency.cancelScheduledValues(now);
      subOsc.frequency.setValueAtTime(subOsc.frequency.value, now);
      subOsc.frequency.linearRampToValueAtTime(185, now + 0.28);
      subOsc.frequency.linearRampToValueAtTime(45, now + 0.85);
      
      // Bandpass sweeps up, venting heat and resonance
      bandpass.frequency.cancelScheduledValues(now);
      bandpass.frequency.setValueAtTime(bandpass.frequency.value, now);
      bandpass.frequency.exponentialRampToValueAtTime(400, now + 0.28);
      bandpass.frequency.exponentialRampToValueAtTime(85, now + 0.85);
      
      // Volume throttle boost
      masterGain.gain.cancelScheduledValues(now);
      masterGain.gain.setValueAtTime(masterGain.gain.value, now);
      masterGain.gain.linearRampToValueAtTime(0.85, now + 0.28); // high volume roar
      masterGain.gain.linearRampToValueAtTime(0.40, now + 0.85); // drop smoothly back to idle
    },
    
    stop() {
      if (!matches || !ctx || !masterGain) return;
      const now = ctx.currentTime;
      
      masterGain.gain.cancelScheduledValues(now);
      masterGain.gain.setValueAtTime(masterGain.gain.value, now);
      masterGain.gain.linearRampToValueAtTime(0, now + 0.25); // smoothly zero volume
      
      setTimeout(() => {
        try {
          osc1?.stop();
          osc2?.stop();
          subOsc?.stop();
          ctx?.close();
        } catch (e) {}
        osc1 = null;
        osc2 = null;
        subOsc = null;
        ctx = null;
        matches = false;
      }, 300);
    }
  };
}

export default function QuizPage() {
  const [currentIdx, setCurrentIdx] = useState(() => getSavedProgress()?.currentIdx ?? 0);
  const [selectedOpt, setSelectedOpt] = useState<number | null>(() => getSavedProgress()?.selectedOpt ?? null);
  const [isSubmitted, setIsSubmitted] = useState(() => getSavedProgress()?.isSubmitted ?? false);
  const [score, setScore] = useState(() => getSavedProgress()?.score ?? 0);
  const [quizStarted, setQuizStarted] = useState(() => getSavedProgress()?.quizStarted ?? false);
  const [quizFinished, setQuizFinished] = useState(() => getSavedProgress()?.quizFinished ?? false);
  const [showHint, setShowHint] = useState(false);
  const [timeLeft, setTimeLeft] = useState(() => getSavedProgress()?.timeLeft ?? 60);
  const [studentName, setStudentName] = useState(() => getSavedProgress()?.studentName ?? "");
  const [streak, setStreak] = useState(() => getSavedProgress()?.streak ?? 0);
  const [maxStreak, setMaxStreak] = useState(() => getSavedProgress()?.maxStreak ?? 0);
  const [showCertificate, setShowCertificate] = useState(false);
  const [reviewFilter, setReviewFilter] = useState<"all" | "correct" | "incorrect">("all");
  const [shareToast, setShareToast] = useState(false);
  const [history, setHistory] = useState<Array<{
    question: string;
    selected: string;
    isCorrect: boolean;
    rationale: string;
    correctText: string;
  }>>(() => getSavedProgress()?.history ?? []);
  const [selectedDifficulty, setSelectedDifficulty] = useState<"all" | "easy" | "medium" | "hard">(() => getSavedProgress()?.selectedDifficulty ?? "easy");
  const [passedLevels, setPassedLevels] = useState<string[]>(() => {
    const saved = localStorage.getItem('passedLevels');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem('passedLevels', JSON.stringify(passedLevels));
  }, [passedLevels]);

  // Synchronize state changes to localStorage
  useEffect(() => {
    const progress: QuizProgress = {
      currentIdx,
      selectedOpt,
      isSubmitted,
      score,
      quizStarted,
      quizFinished,
      timeLeft,
      studentName,
      streak,
      maxStreak,
      history,
      selectedDifficulty,
    };
    try {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(progress));
    } catch (e) {
      console.error("Failed to save progress to localStorage", e);
    }
  }, [
    currentIdx,
    selectedOpt,
    isSubmitted,
    score,
    quizStarted,
    quizFinished,
    timeLeft,
    studentName,
    streak,
    maxStreak,
    history,
    selectedDifficulty,
  ]);

  // --- V8 ENGINE SOUND SYNTHESIZER AND INTERACTIVE DASHBOARD STATES ---
  const v8EngineRef = React.useRef<any>(null);
  const [engineActive, setEngineActive] = useState(false);
  const [engineRpm, setEngineRpm] = useState(0);

  // Initialize synthesized engine reference smoothly
  const getV8Engine = () => {
    if (!v8EngineRef.current) {
      v8EngineRef.current = createV8SynthEngine();
    }
    return v8EngineRef.current;
  };

  const startEngine = () => {
    // Attempt standard preloaded sound first (CORS may block or defer, but it will attempt)
    const globalPlayer = (window as any).playEngineSound;
    if (globalPlayer && typeof globalPlayer === "function") {
      try {
        globalPlayer();
      } catch (e) {
        console.warn("Global player deferred, starting offline engine synthesizer");
      }
    }

    try {
      const engine = getV8Engine();
      engine.start();
      setEngineActive(true);
      
      // Ignition sequence animation for RPM Gauge
      setEngineRpm(0);
      let rpm = 0;
      const ignitionInterval = setInterval(() => {
        rpm += 160;
        if (rpm >= 3500) { // Ignition high flare roar!
          clearInterval(ignitionInterval);
          // Settle down to deep throbbing idle
          const settleInterval = setInterval(() => {
            rpm -= 180;
            if (rpm <= 850) {
              rpm = 850;
              clearInterval(settleInterval);
            }
            setEngineRpm(rpm);
          }, 20);
        }
        setEngineRpm(rpm);
      }, 10);
    } catch (err) {
      console.error("V8 startup failed", err);
    }
  };

  const stopEngine = () => {
    try {
      const engine = getV8Engine();
      engine.stop();
      setEngineActive(false);
      setEngineRpm(0);
    } catch (err) {
      console.error("V8 shutdown failed", err);
    }
  };

  const revEngine = () => {
    try {
      const engine = getV8Engine();
      if (!engineActive) {
        // Auto start if clicked while off
        startEngine();
        return;
      }
      engine.rev();
      
      // RPM Gauge needle swing animation
      let rpm = 850;
      const revUp = setInterval(() => {
        rpm += 450;
        if (rpm >= 6800) { // Redline limit
          rpm = 6800;
          clearInterval(revUp);
          
          // Settle back to warm idle
          const revDown = setInterval(() => {
            rpm -= 350;
            if (rpm <= 850) {
              rpm = 850;
              clearInterval(revDown);
            }
            setEngineRpm(rpm);
          }, 15);
        }
        setEngineRpm(rpm);
      }, 10);
    } catch (err) {
      console.error("V8 rev failed", err);
    }
  };

  // Clean up Web Audio on unmount
  useEffect(() => {
    return () => {
      if (v8EngineRef.current) {
        v8EngineRef.current.stop();
      }
    };
  }, []);

  const activeQuestions = React.useMemo(() => {
    if (selectedDifficulty === "all") return quizData;
    return quizData.filter(q => q.difficulty === selectedDifficulty);
  }, [selectedDifficulty]);

  const handleSubmit = (forcedByTimeout: boolean = false) => {
    if (isSubmitted) return;
    if (selectedOpt === null && !forcedByTimeout) return;

    const currentQuestion = activeQuestions[currentIdx];
    const hasChosen = selectedOpt !== null;
    const isCorrect = hasChosen ? currentQuestion.options[selectedOpt].isCorrect : false;

    if (isCorrect) {
      setScore(prev => prev + 1);
      setStreak(prev => {
        const next = prev + 1;
        if (next > maxStreak) setMaxStreak(next);
        return next;
      });
    } else {
      setStreak(0);
    }

    const correctOption = currentQuestion.options.find(o => o.isCorrect);

    setHistory(prev => [...prev, {
      question: currentQuestion.question,
      selected: hasChosen ? currentQuestion.options[selectedOpt].text : "No option selected (Time out)",
      isCorrect: isCorrect,
      rationale: hasChosen 
        ? currentQuestion.options[selectedOpt].rationale 
        : `Time ran out! The correct answer is: "${correctOption?.text}". ${correctOption?.rationale}`,
      correctText: correctOption?.text || ""
    }]);

    setIsSubmitted(true);
  };

  // Reset timer on question change
  useEffect(() => {
    if (quizStarted && !quizFinished && !isSubmitted) {
      setTimeLeft(60);
    }
  }, [currentIdx, quizStarted, quizFinished, isSubmitted]);

  // Handle countdown timer
  useEffect(() => {
    if (!quizStarted || quizFinished || isSubmitted) return;

    if (timeLeft <= 0) {
      handleSubmit(true);
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft(prev => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft, quizStarted, quizFinished, isSubmitted]);

  const handleStart = () => {
    // Automatically fire up simulated V8 engine upon beginning the simulator
    startEngine();

    setQuizStarted(true);
    setQuizFinished(false);
    setCurrentIdx(0);
    setScore(0);
    setStreak(0);
    setMaxStreak(0);
    setHistory([]);
    setSelectedOpt(null);
    setIsSubmitted(false);
    setTimeLeft(60);
    setShowCertificate(false);
  };

  const handleOptionClick = (idx: number) => {
    if (isSubmitted) return;
    setSelectedOpt(idx);
  };

  const handleNext = () => {
    setShowHint(false);
    setSelectedOpt(null);
    setIsSubmitted(false);

    if (currentIdx + 1 < activeQuestions.length) {
      setCurrentIdx(prev => prev + 1);
    } else {
      setQuizFinished(true);
    }
  };

  // Filtered review list
  const filteredHistory = history.filter(item => {
    if (reviewFilter === "correct") return item.isCorrect;
    if (reviewFilter === "incorrect") return !item.isCorrect;
    return true;
  });

  const progressPct = ((currentIdx + (isSubmitted ? 1 : 0)) / activeQuestions.length) * 100;
  const isPassing = score >= Math.ceil(activeQuestions.length * 0.7);
  const finalPercent = Math.round((score / activeQuestions.length) * 100);

  useEffect(() => {
    if (quizFinished && isPassing) {
      if (selectedDifficulty === 'easy') {
        setPassedLevels(prev => [...new Set([...prev, 'easy'])]);
      } else if (selectedDifficulty === 'medium') {
        setPassedLevels(prev => [...new Set([...prev, 'medium'])]);
      }
    }
  }, [quizFinished, isPassing, selectedDifficulty]);

  // Trigger modern canvas-confetti on successful quiz completion
  useEffect(() => {
    if (quizFinished && isPassing) {
      // Dynamic bursts of celebratory stars and paper
      const duration = 4 * 1000;
      const animationEnd = Date.now() + duration;
      const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 99999 };

      const randomInRange = (min: number, max: number) => {
        return Math.random() * (max - min) + min;
      };

      const interval = setInterval(() => {
        const timeLeft = animationEnd - Date.now();

        if (timeLeft <= 0) {
          return clearInterval(interval);
        }

        const particleCount = 50 * (timeLeft / duration);
        // Left & right celebration cannons
        confetti({ 
          ...defaults, 
          particleCount, 
          origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 } 
        });
        confetti({ 
          ...defaults, 
          particleCount, 
          origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 } 
        });
      }, 250);

      return () => clearInterval(interval);
    }
  }, [quizFinished, isPassing]);

  const handleShare = () => {
    setShareToast(true);
    setTimeout(() => setShareToast(false), 3000);
  };

  const quizSchema = {
    "@context": "https://schema.org",
    "@type": "Quiz",
    "name": "GoDriveify Driving School Student Theory Quiz",
    "description": "Test your defensive driving skills and theoretical highway knowledge in Faisalabad with premium interactive tools.",
    "about": {
      "@type": "Thing",
      "name": "Defensive driving theory and license preparedness"
    }
  };

  return (
    <div className="font-sans text-gray-900 bg-slate-50/50 min-h-screen flex flex-col antialiased">
      <SEO 
        title="Students Driving Theory Quiz | GoDriveify"
        description="Verify your theoretical highway rules, road safety regulations, and defensive driving preparedness with GoDriveify Faisalabad interactive testing suite."
        keywords="driving test Pakistan, traffic sign quiz Faisalabad, driving license prep, defensive driving quiz"
        schema={quizSchema}
      />
      <Navbar />

      {/* Header Banner - Sleek dynamic gradient design with modern highway visual mask */}
      <section className="relative py-16 sm:py-20 flex items-center justify-center text-white overflow-hidden bg-slate-950">
        <div className="absolute inset-0 z-0 bg-cover bg-center opacity-30 mix-blend-overlay scale-105 transform motion-safe:animate-[pulse_10s_infinite]"
          style={{ backgroundImage: "url('https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?auto=format&fit=crop&w=1200&q=80')" }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#002060]/95 via-indigo-950/80 to-[#FF7112]/20 mix-blend-multiply z-1" />
        
        {/* Abstract glowing fluid rings inside header mask */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#FF7112]/10 rounded-full blur-3xl pointer-events-none z-1 transform translate-x-1/3 -translate-y-1/3" />
        <div className="absolute -bottom-10 -left-10 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl pointer-events-none z-1" />

        <div className="relative z-10 text-center px-4 max-w-2xl mx-auto">
          <ScrollReveal direction="down">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-black bg-[#FF7112] text-white tracking-widest uppercase mb-4 shadow-md shadow-orange-500/20 select-none animate-pulse">
              <Sparkles className="w-3.5 h-3.5" /> Theory Exam Simulator
            </span>
          </ScrollReveal>
          <ScrollReveal direction="up" delay={0.1}>
            <h1 className="text-3xl sm:text-5xl font-black font-display tracking-tight text-white uppercase drop-shadow-md">
              Students Academy Quiz
            </h1>
          </ScrollReveal>
          <ScrollReveal direction="up" delay={0.2}>
            <p className="text-slate-300 text-xs sm:text-sm font-medium tracking-wide mt-3 max-w-xl mx-auto leading-relaxed">
              Based on official Punjab Driving Licensing manual and defensive road protection paradigms. Secure your driving skills seamlessly.
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* Quiz Area Container */}
      <main className="flex-grow py-8 sm:py-12 px-4 max-w-2xl mx-auto w-full relative z-10">
        <ScrollReveal>
          {!quizStarted ? (
            /* LANDING VIEW */
            <div className="bg-white border border-slate-200/90 rounded-3xl p-6 sm:p-10 shadow-xl overflow-hidden relative">
              <div className="absolute right-0 top-0 w-48 h-48 bg-[#FF7112]/5 rounded-bl-full pointer-events-none z-0" />
              <div className="absolute left-0 bottom-0 w-48 h-48 bg-blue-500/5 rounded-tr-full pointer-events-none z-0" />
              
              <div className="flex flex-col items-center text-center max-w-2xl mx-auto py-2 relative z-10">
                <div className="w-16 h-16 bg-gradient-to-tr from-[#002060] to-indigo-900 text-white rounded-2xl flex items-center justify-center mb-6 shadow-lg shadow-indigo-900/20">
                  <BookOpen className="w-8 h-8" />
                </div>
                
                <h2 className="text-2xl sm:text-3xl font-black text-[#002060] tracking-tight mb-4 font-display">
                  Test Your Defensive Road Intuition
                </h2>
                
                <p className="text-slate-600 text-sm sm:text-base leading-relaxed mb-8 max-w-lg">
                  Before facing public roads in Faisalabad, verify your capability in critical stopping geometry, blind-spot precautions, roundabout priority, and emergency tire situations.
                </p>

                {/* Name Input for Certificate customization */}
                <div className="w-full max-w-md mb-8 bg-slate-50 border border-slate-200/60 p-5 rounded-2xl text-left shadow-sm">
                  <label htmlFor="student-name-input" className="block text-[11px] font-black uppercase text-[#002060] tracking-wider mb-2">
                    🎓 Enter Your Full Name (For Certificate)
                  </label>
                  <input
                    id="student-name-input"
                    type="text"
                    placeholder="Enter full name for custom diploma..."
                    value={studentName}
                    onChange={(e) => setStudentName(e.target.value)}
                    className="w-full bg-white border border-slate-250 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500/50 focus:border-orange-500 font-semibold transition-all placeholder:text-slate-400"
                  />
                  <p className="text-[10px] text-slate-400 mt-1.5 leading-normal">
                    Passing this simulator at &gt;70% generates a downloadable certificate with your legal name!
                  </p>
                </div>

                {/* Essential Indicators panel */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 w-full mb-8 text-left">
                  <div className="p-4 bg-white border border-slate-100 rounded-2xl flex items-start gap-3.5 shadow-sm hover:border-[#FF7112]/30 transition-all">
                    <div className="p-2 rounded-xl bg-orange-50 text-orange-600">
                      <Zap className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="font-extrabold text-xs text-slate-800 uppercase tracking-wider">{activeQuestions.length} Questions</h4>
                      <p className="text-[11px] text-slate-500 mt-0.5">Defensive scenario based</p>
                    </div>
                  </div>
                  <div className="p-4 bg-white border border-slate-100 rounded-2xl flex items-start gap-3.5 shadow-sm hover:border-[#FF7112]/30 transition-all">
                    <div className="p-2 rounded-xl bg-green-50 text-emerald-600">
                      <ShieldCheck className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="font-extrabold text-xs text-slate-800 uppercase tracking-wider">70% to Pass</h4>
                      <p className="text-[11px] text-slate-500 mt-0.5">Require {Math.ceil(activeQuestions.length * 0.7)}/{activeQuestions.length} correct</p>
                    </div>
                  </div>
                  <div className="p-4 bg-white border border-slate-100 rounded-2xl flex items-start gap-3.5 shadow-sm hover:border-[#FF7112]/30 transition-all">
                    <div className="p-2 rounded-xl bg-indigo-50 text-indigo-600">
                      <Award className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="font-extrabold text-[#002060] text-xs uppercase tracking-wider">Certify Instantly</h4>
                      <p className="text-[11px] text-slate-500 mt-0.5">Faisalabad premium digital tier</p>
                    </div>
                  </div>
                </div>

                {/* Challenge Tier Selection Card Grid */}
                <div className="w-full mb-8">
                  <h3 className="text-xs font-black text-[#002060] uppercase tracking-widest mb-4 flex items-center justify-center gap-1.5 leading-none bg-[#002060]/5 w-fit mx-auto px-3.5 py-1.5 rounded-full select-none">
                    <AlertCircle className="w-3.5 h-3.5 text-orange-500" /> CHOOSE TEST DIFFICULTY
                  </h3>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    {[
                      { id: "all", label: "Full Test (All)", desc: "15 Random Qs", icon: Star, color: "text-[#002060]", activeColor: "border-[#002060] bg-[#002060]/5 text-[#002060]" },
                      { id: "easy", label: "Easy Tier", desc: "Basic signs", icon: CheckCircle2, color: "text-emerald-600", activeColor: "border-emerald-500 bg-emerald-50/40 text-emerald-950" },
                      { id: "medium", label: "Medium Tier", desc: "Right of way", icon: ShieldCheck, color: "text-amber-600", activeColor: "border-amber-500 bg-amber-50/40 text-amber-950" },
                      { id: "hard", label: "Hard Tier", desc: "Blowouts & ABS", icon: Zap, color: "text-rose-600", activeColor: "border-rose-500 bg-rose-50/40 text-rose-950" }
                    ].map((tier) => {
                      const isSelected = selectedDifficulty === tier.id;
                      const IconComponent = tier.icon;
                      
                      // Check if tier is locked
                      const isLocked = tier.id !== 'all' && tier.id !== 'easy' && !passedLevels.includes(tier.id === 'hard' ? 'medium' : 'easy');

                      return (
                        <button
                          key={tier.id}
                          type="button"
                          onClick={() => !isLocked && setSelectedDifficulty(tier.id as any)}
                          disabled={isLocked}
                          className={`p-4 rounded-2xl border text-center transition-all duration-150 cursor-pointer flex flex-col items-center group relative overflow-hidden ${
                            isLocked ? "opacity-50 cursor-not-allowed bg-slate-100" : ""
                          } ${
                            isSelected 
                              ? `${tier.activeColor} ring-2 ring-orange-500/30 font-extrabold shadow-sm` 
                              : "border-slate-200 bg-slate-50/20 hover:bg-slate-50 text-slate-705 text-slate-700"
                          }`}
                        >
                          <IconComponent className={`w-5 h-5 mb-2 transition-transform group-hover:scale-110 ${isSelected ? tier.color : "text-slate-400"}`} />
                          <span className="block text-xs uppercase tracking-wider font-extrabold leading-none">
                            {tier.label}
                          </span>
                          <span className="block text-[10px] text-slate-500 mt-1.5 font-medium select-none">
                            {tier.desc}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* 🚗 INTERACTIVE DRIVING SIMULATOR DASHBOARD CONSOLE */}
                <div className="w-full mb-8 mt-4 bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-950 border-4 border-slate-800 text-white p-6 sm:p-8 rounded-3xl shadow-2xl relative overflow-hidden text-center">
                  {/* Subtle carbon texture lines or glows */}
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(99,102,241,0.15),transparent)] pointer-events-none" />
                  <div className="absolute right-3 top-3 bg-red-400/20 text-red-400 border border-red-500/20 px-2.5 py-1 rounded-md text-[9px] font-black tracking-widest font-mono uppercase animate-pulse select-none z-10">
                    V8 DOHC ACTIVE SIM
                  </div>

                  <h3 className="text-sm font-black uppercase text-indigo-400 tracking-widest mb-1.5 flex items-center justify-center gap-2 select-none">
                    <Gauge className="w-4 h-4 text-[#FF7112]" /> DRIVING SIMULATION DASHBOARD & INSTRUMENTS
                  </h3>
                  <p className="text-slate-400 text-[11px] leading-normal mb-6 max-w-md mx-auto">
                    Turn on the simulated car ignition below and rev the high-fidelity V8 performance block!
                  </p>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
                    {/* Visual Tachometer Instrument Panel */}
                    <div className="flex flex-col items-center justify-center bg-slate-950/60 border border-slate-800/60 p-4 rounded-2xl relative overflow-hidden">
                      {/* Tachometer Arc & Needle */}
                      <div className="w-36 h-20 relative flex items-end justify-center overflow-hidden mb-2">
                        {/* Semi-circular gauge border track */}
                        <div className="absolute w-36 h-36 rounded-full border-8 border-slate-800 border-t-indigo-600 border-r-rose-600 border-l-slate-700 bottom-0 left-1/2 transform -translate-x-1/2" style={{ clipPath: 'polygon(0 0, 100% 0, 100% 50%, 0 50%)' }} />
                        
                        {/* Radial tick markers for tachometer */}
                        <div className="absolute bottom-1 font-mono text-[9px] font-bold text-slate-500 left-4">0</div>
                        <div className="absolute bottom-10 font-mono text-[9px] font-bold text-slate-500 left-3">2</div>
                        <div className="absolute top-1.5 font-mono text-[9px] font-bold text-slate-400 left-1/2 transform -translate-x-12">4</div>
                        <div className="absolute top-1.5 font-mono text-[9px] font-bold text-rose-500 left-1/2 transform translate-x-8">6</div>
                        <div className="absolute bottom-1 font-mono text-[9px] font-bold text-rose-600 right-4">8</div>

                        {/* Needle pin center */}
                        <div className="absolute w-3.5 h-3.5 bg-rose-500 rounded-full z-20 bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1 py-1 px-1.5 shadow-md shadow-rose-500/40" />

                        {/* Pulsing indicator redline glow line */}
                        <div className="absolute w-12 h-12 bg-red-500/10 rounded-full filter blur-md bottom-0 left-1/2 transform -translate-x-1/2" />

                        {/* Needle rotated dynamic logic */}
                        {/* 0 RPM is -180deg (Left), 8000 RPM is 0deg (Right) */}
                        <div 
                          className="absolute w-14 h-1 bg-gradient-to-r from-transparent to-rose-500 bottom-0 left-1/2 origin-left z-10 transition-transform duration-75 ease-out shadow-lg"
                          style={{ 
                            transform: `rotate(${((engineRpm / 8000) * 180) - 180}deg)`,
                          }}
                        />
                      </div>

                      {/* Display readout */}
                      <div className="mt-2 text-center select-none">
                        <div className="font-mono text-xl font-black text-rose-400 tracking-tight leading-none">
                          {engineRpm.toLocaleString()} <span className="text-[10px] text-slate-500 font-bold">RPM</span>
                        </div>
                        <div className="text-[9px] mt-1 uppercase font-bold tracking-widest text-[#FF7112] h-4">
                          {engineActive ? (engineRpm > 1000 ? "Throttle Revved! 🏎️💨" : "Engine Idle (V8 Ready) 🚗") : "System Ignition Required 🔑"}
                        </div>
                      </div>
                    </div>

                    {/* Cockpit Ignition Switches & Exhaust Pedals */}
                    <div className="flex flex-col gap-4 items-stretch justify-center">
                      <div className="flex items-center gap-3">
                        {/* circular engine start switch */}
                        <button
                          key="start_stop_button"
                          type="button"
                          onClick={engineActive ? stopEngine : startEngine}
                          className={`flex-1 py-4 px-4 rounded-2xl font-black uppercase text-xs tracking-wider transition-all duration-200 shadow-lg flex items-center justify-center gap-2 cursor-pointer border ${
                            engineActive
                              ? 'bg-gradient-to-r from-red-600 to-rose-700 hover:from-red-500 hover:to-rose-600 text-white border-red-500 shadow-red-950/40'
                              : 'bg-gradient-to-r from-emerald-600 to-green-700 hover:from-emerald-500 hover:to-green-600 text-white border-green-500 shadow-green-950/40'
                          }`}
                        >
                          <span className={`w-2.5 h-2.5 rounded-full ${engineActive ? 'bg-red-400 animate-ping' : 'bg-green-400 animate-pulse'}`} />
                          {engineActive ? "🔴 stop simulation" : "🔑 Start Engine"}
                        </button>
                      </div>

                      {/* Rev pedal button */}
                      <button
                        key="rev_pedal_button"
                        type="button"
                        onClick={revEngine}
                        disabled={!engineActive}
                        className={`py-4 px-6 rounded-2xl font-black uppercase text-xs tracking-widest transition-all duration-150 transform active:scale-98 cursor-pointer flex items-center justify-center gap-2 border shadow-lg ${
                          engineActive 
                            ? 'bg-gradient-to-r from-indigo-600 to-violet-700 hover:from-indigo-500 hover:to-violet-600 text-white border-indigo-500 shadow-indigo-950/40'
                            : 'bg-slate-800 border-slate-700 text-slate-500 cursor-not-allowed shadow-none'
                        }`}
                      >
                        <Volume2 className="w-4 h-4 text-orange-400 animate-pulse" /> Accelerator / Rev Pedal 🔥
                      </button>

                      <div className="text-[10px] text-slate-500 text-center leading-normal italic select-none">
                        Note: Tap <b>Accelerator</b> to hear the starting roar / rev. It works immediately on all browsers without any plug-ins.
                      </div>
                    </div>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={handleStart}
                  className="w-full sm:w-auto px-12 py-4 bg-[#FF7112] hover:bg-[#E05A00] text-white font-extrabold rounded-2xl shadow-xl shadow-orange-500/25 hover:shadow-orange-500/35 transform hover:-translate-y-0.5 active:translate-y-0 active:scale-98 transition-all cursor-pointer text-xs sm:text-sm tracking-wider uppercase flex items-center justify-center gap-2"
                >
                  Start Exam Simulator <ChevronRight className="w-4 h-4 text-white" />
                </button>
              </div>
            </div>
          ) : quizFinished ? (
            /* COMPLETION SENSATIONAL VIEW WITH CERTIFICATE */
            <div className="bg-white border border-slate-200/80 rounded-3xl p-6 sm:p-10 shadow-xl overflow-hidden relative">
              <div className="absolute right-0 top-0 w-64 h-64 bg-slate-50 rounded-full blur-3xl pointer-events-none -translate-y-1/2 translate-x-1/2" />
              
              <div className="text-center py-6 flex flex-col items-center">
                <div className={`w-20 h-20 rounded-3xl flex items-center justify-center mb-6 shadow-lg transform scale-102 ${
                  isPassing 
                    ? 'bg-gradient-to-br from-green-500 to-emerald-600 text-white shadow-green-500/20' 
                    : 'bg-gradient-to-br from-rose-500 to-red-600 text-white shadow-red-500/20'
                }`}>
                  {isPassing ? <Award className="w-10 h-10 animate-[bounce_1.5s_infinite]" /> : <AlertCircle className="w-10 h-10 animate-pulse" />}
                </div>
                
                <h2 className="text-3xl sm:text-4xl font-extrabold text-[#002060] tracking-tight font-display uppercase">
                  {isPassing ? "🔥 Excellent Pass!" : "⚠️ Drive Practice Core"}
                </h2>
                <p className="text-slate-500 text-sm mt-3 max-w-md mx-auto leading-relaxed">
                  {isPassing 
                    ? `Brilliant job, ${studentName || "Candidate"}! You have shown elite preparedness for real Pakistani roads.` 
                    : `You scored ${finalPercent}%. In Pakistan driving safety regulations, the passing rate is strictly 70%. We suggest running the test again.`
                  }
                </p>

                {/* Score panel detailed breakdown */}
                <div className="my-8 grid grid-cols-2 sm:grid-cols-4 gap-4 w-full">
                  <div className="p-4 bg-slate-50/70 border border-slate-200/50 rounded-2xl shadow-xs text-center">
                    <span className="block text-3xl font-black text-[#002060] tracking-tight mb-1 font-mono">{score} / {activeQuestions.length}</span>
                    <span className="text-[10px] text-slate-400 font-extrabold uppercase tracking-wide">Correct Qs</span>
                  </div>
                  <div className="p-4 bg-slate-50/70 border border-slate-200/50 rounded-2xl shadow-xs text-center">
                    <span className="block text-3xl font-black text-[#FF7112] tracking-tight mb-1 font-mono">{finalPercent}%</span>
                    <span className="text-[10px] text-slate-400 font-extrabold uppercase tracking-wide">Final Percent</span>
                  </div>
                  <div className="p-4 bg-slate-50/70 border border-slate-200/50 rounded-2xl shadow-xs text-center">
                    <span className="block text-3xl font-black text-emerald-600 tracking-tight mb-1 font-mono">{maxStreak}🔥</span>
                    <span className="text-[10px] text-slate-400 font-extrabold uppercase tracking-wide">Max Streak</span>
                  </div>
                  <div className="p-4 bg-slate-50/70 border border-slate-200/50 rounded-2xl shadow-xs text-center">
                    <span className={`block text-xl font-extrabold tracking-tight mb-2 uppercase ${isPassing ? 'text-emerald-600' : 'text-rose-600'}`}>
                      {isPassing ? 'CERTIFIED' : 'PENDING'}
                    </span>
                    <span className="text-[10px] text-slate-400 font-extrabold uppercase tracking-wide">Status badge</span>
                  </div>
                </div>

                {/* Certificate Generator Trigger Block if passed */}
                {isPassing && (
                  <div className="w-full max-w-md bg-gradient-to-r from-[#002060] to-indigo-950 p-6 rounded-3xl text-white shadow-xl mb-8 relative overflow-hidden text-left">
                    <div className="absolute right-0 bottom-0 translate-y-1/4 translate-x-1/4 opacity-10 pointer-events-none">
                      <Award className="w-48 h-48 text-white" />
                    </div>
                    <h3 className="font-extrabold text-base mb-1 flex items-center gap-2">
                      <Award className="w-5 h-5 text-amber-400 animate-pulse" /> Custom Safe-Driving Badge
                    </h3>
                    <p className="text-xs text-slate-300 leading-relaxed mb-4">
                      Download your certificate immediately printed under your candidate name: <strong>{studentName || "Guest Student"}</strong>.
                    </p>
                    <button
                      type="button"
                      onClick={() => setShowCertificate(!showCertificate)}
                      className="w-full bg-amber-400 hover:bg-amber-300 text-[#002060] font-black py-3 rounded-xl text-xs uppercase tracking-widest cursor-pointer transition-all active:scale-98 flex items-center justify-center gap-2 shadow-lg hover:shadow-amber-500/10"
                    >
                      {showCertificate ? "Close Certificate View" : "View Safe Driver Certificate"}
                    </button>
                  </div>
                )}

                {/* The Live Certificate View element */}
                {showCertificate && isPassing && (
                  <div className="w-full border-4 border-double border-amber-500 bg-amber-50/10 p-4 sm:p-8 rounded-2xl my-6 relative bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-white to-amber-50/40 text-slate-900 shadow-2xl">
                    <div className="border border-amber-600/30 p-6 rounded-xl flex flex-col items-center">
                      <div className="flex justify-between items-center w-full mb-6">
                        <div className="text-left">
                          <span className="text-[10px] font-black tracking-widest text-[#002060] uppercase">GoDriveify Academic</span>
                        </div>
                        <Award className="w-12 h-12 text-amber-500" />
                        <div className="text-right">
                          <span className="text-[10px] font-mono text-slate-500 font-black">REGID: GD-{new Date().getFullYear()}-{Math.floor(1000 + Math.random() * 9005)}</span>
                        </div>
                      </div>

                      <h4 className="font-serif text-2xl sm:text-3xl font-extrabold text-[#002060] tracking-tight my-2">
                        SAFE DRIVER CERTIFICATE
                      </h4>
                      <p className="text-xs text-slate-500 uppercase tracking-widest font-semibold italic mb-6">
                        This document honors the academic achievement of
                      </p>

                      <p className="font-sans text-xl sm:text-2xl font-black text-slate-900 border-b border-dashed border-slate-400 px-6 pb-2 inline-block min-w-[200px] text-center italic">
                        {studentName || "Graduate Scholar"}
                      </p>

                      <p className="text-xs text-slate-600 max-w-md mx-auto leading-relaxed mt-6">
                        For verifying stellar mastery in theoretical highway driving metrics, passing the high-fidelity simulator with a cumulative score of <strong>{finalPercent}%</strong> correct.
                      </p>

                      <div className="grid grid-cols-2 gap-12 w-full mt-10 border-t border-slate-200/80 pt-6">
                        <div className="text-center">
                          <p className="font-serif text-sm italic font-extrabold">Faisalabad Board</p>
                          <p className="text-[9px] text-slate-400 uppercase tracking-wider font-bold mt-1">Authorized Agency Branch</p>
                        </div>
                        <div className="text-center">
                          <p className="font-serif text-sm italic font-extrabold">GoDriveify Principal</p>
                          <p className="text-[9px] text-slate-400 uppercase tracking-wider font-bold mt-1">Official Academy Stamp</p>
                        </div>
                      </div>

                      {/* Download Simulated Trigger */}
                      <button 
                        type="button" 
                        onClick={handleShare}
                        className="mt-8 text-xs text-[#002060] hover:text-[#FF7112] font-black uppercase tracking-wider underline flex items-center gap-1 cursor-pointer"
                      >
                        <RefreshCw className="w-3.5 h-3.5" /> Force PDF Generate (Simulated)
                      </button>
                    </div>
                  </div>
                )}
              </div>

              {/* Share Toast */}
              {shareToast && (
                <div className="fixed bottom-10 left-1/2 transform -translate-x-1/2 bg-slate-900 text-white text-xs px-6 py-3 rounded-full shadow-2xl z-50 animate-bounce flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-green-400 rounded-full animate-ping" />
                  <span>Certificate loaded! Ready to save to device storage.</span>
                </div>
              )}

              {/* Review Answers Box with filter toggles */}
              <div className="border border-slate-100 rounded-2xl bg-slate-50/50 p-4 sm:p-6 mb-8">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between border-b border-slate-200 pb-4 mb-4 gap-3">
                  <h3 className="font-extrabold text-[#002060] text-sm uppercase tracking-wider flex items-center gap-2">
                    <Info className="w-4 h-4 text-[#FF7112]" /> Review Questions and Rationales
                  </h3>
                  
                  {/* Practical review Filter Controls */}
                  <div className="flex bg-white border border-slate-250 p-1 rounded-xl text-xs gap-1 shadow-2xs">
                    {[
                      { id: "all", label: `All (${history.length})` },
                      { id: "correct", label: `Correct (${history.filter(h=>h.isCorrect).length})` },
                      { id: "incorrect", label: `Wrong (${history.filter(h=>!h.isCorrect).length})` }
                    ].map(btn => (
                      <button
                        key={btn.id}
                        type="button"
                        onClick={() => setReviewFilter(btn.id as any)}
                        className={`px-3 py-1.5 rounded-lg font-bold transition-all cursor-pointer ${
                          reviewFilter === btn.id 
                            ? "bg-[#002060] text-white shadow-xs" 
                            : "text-slate-500 hover:text-[#002060] hover:bg-slate-50"
                        }`}
                      >
                        {btn.label}
                      </button>
                    ))}
                  </div>
                </div>
                
                <div className="space-y-4 max-h-[380px] overflow-y-auto pr-1">
                  {filteredHistory.length === 0 ? (
                    <div className="text-center py-10 text-slate-400 text-sm italic">
                      No matching records found for this filter.
                    </div>
                  ) : (
                    filteredHistory.map((item, idx) => (
                      <div key={idx} className={`p-4 rounded-xl border bg-white shadow-2xs transition-all hover:border-slate-350 ${item.isCorrect ? 'border-green-200' : 'border-red-200'}`}>
                        <div className="flex justify-between items-start gap-2 mb-2">
                          <p className="font-bold text-slate-800 text-sm leading-snug">{idx + 1}. {item.question}</p>
                          <span className={`text-[9px] uppercase tracking-widest px-2.5 py-0.5 rounded-full font-black ${item.isCorrect ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-00 text-red-800'}`}>
                            {item.isCorrect ? "Correct" : "Incorrect"}
                          </span>
                        </div>
                        
                        <div className="text-xs text-slate-650 mb-2">
                          <strong>Your Selection:</strong> <span className={item.isCorrect ? 'text-green-700 font-semibold' : 'text-rose-600 font-semibold md:font-bold'}>{item.selected}</span>
                        </div>

                        {!item.isCorrect && (
                          <div className="text-xs text-slate-600 mb-2.5">
                            <strong>Correct Answer:</strong> <span className="text-emerald-700 font-bold">{item.correctText}</span>
                          </div>
                        )}
                        
                        <div className="text-xs bg-slate-50 p-3 rounded-lg border border-slate-100/80 text-slate-500 flex gap-2">
                          <span className="font-extrabold text-[#002060] shrink-0">Rationale:</span>
                          <span className="italic leading-relaxed">{item.rationale}</span>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-3">
                <button
                  type="button"
                  onClick={() => {
                    handleStart();
                    setQuizStarted(false);
                  }}
                  className="flex-1 bg-[#002060] hover:bg-opacity-95 text-white font-extrabold py-4 px-6 rounded-2xl transition cursor-pointer flex items-center justify-center gap-2 text-xs uppercase tracking-wider shadow-lg active:scale-98"
                >
                  <RefreshCw className="w-4 h-4 animate-spin-reverse" /> Retake Test or Change Level
                </button>
              </div>
            </div>
          ) : (
            /* ACTIVE QUIZ CARD VIEW */
            <div className="bg-white border border-slate-200/80 rounded-3xl p-5 sm:p-10 shadow-xl overflow-hidden relative">
              {/* Question metadata row */}
              <div className="flex flex-wrap justify-between items-center gap-3 mb-4 text-xs font-bold text-slate-500 uppercase tracking-widest pb-3 border-b border-slate-100">
                <div className="flex items-center gap-2">
                  <span>QUESTION {currentIdx + 1} OF {activeQuestions.length}</span>
                  <span className={`px-2.5 py-0.5 rounded-full text-[9px] font-black border uppercase tracking-wider ${
                    activeQuestions[currentIdx]?.difficulty === 'easy' 
                      ? 'bg-emerald-50 border-emerald-250 text-emerald-700' 
                      : activeQuestions[currentIdx]?.difficulty === 'medium'
                        ? 'bg-amber-50 border-amber-250 text-amber-700'
                        : 'bg-rose-50 border-rose-250 text-rose-700'
                  }`}>
                    {activeQuestions[currentIdx]?.difficulty}
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  {streak > 0 && (
                    <span className="font-mono text-xs text-orange-600 bg-orange-100/50 px-2.5 py-1 rounded-full animate-bounce">
                      STRK: {streak}🔥
                    </span>
                  )}
                  <span className="font-mono text-indigo-700 bg-indigo-50 px-2.5 py-1 rounded-full">SCOREID: {score}</span>
                </div>
              </div>

              {/* Progress bar with glowing handle */}
              <div className="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden mb-8 relative">
                <div
                  className="bg-gradient-to-r from-[#002060] to-[#FF7112] h-full transition-all duration-300 rounded-full"
                  style={{ width: `${progressPct}%` }}
                />
              </div>

              {/* Visual Countdown Timer Bar */}
              <div className="mb-8 p-4 rounded-2xl bg-slate-50 border border-slate-200/60 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 shadow-2xs">
                <div className="flex items-center gap-2.5">
                  <div className={`p-2 rounded-xl transition-all ${
                    timeLeft === 0 || (isSubmitted && selectedOpt === null)
                      ? 'bg-red-100 text-red-650 animate-bounce'
                      : timeLeft < 15 
                        ? 'bg-red-100 text-red-600 animate-pulse' 
                        : timeLeft < 30 
                          ? 'bg-amber-100 text-amber-500' 
                          : 'bg-[#FF7112]/10 text-[#FF7112]'
                  }`}>
                    <Timer className={`w-5 h-5 ${(timeLeft < 15 || timeLeft === 0 || (isSubmitted && selectedOpt === null)) ? 'animate-[pulse_1s_infinite]' : ''}`} />
                  </div>
                  <div>
                    <p className="text-[9px] font-black text-slate-500 uppercase tracking-widest leading-none mb-1">
                      {(timeLeft === 0 || (isSubmitted && selectedOpt === null)) ? "Status" : "Time Remaining"}
                    </p>
                    <p className={`text-sm sm:text-base font-black font-mono leading-none ${
                      timeLeft === 0 || (isSubmitted && selectedOpt === null)
                        ? 'text-red-600 uppercase font-black tracking-wide animate-pulse'
                        : timeLeft < 15 
                          ? 'text-red-600 animate-pulse' 
                          : timeLeft < 30 
                            ? 'text-amber-600' 
                            : 'text-[#002060]'
                    }`}>
                      {(timeLeft === 0 || (isSubmitted && selectedOpt === null)) ? "⏱️ Time's Up!" : `${timeLeft} seconds ${timeLeft <= 15 ? '⚠️' : ''}`}
                    </p>
                  </div>
                </div>

                <div className="flex-grow sm:max-w-[280px] md:max-w-[360px] h-2 bg-slate-200 rounded-full overflow-hidden">
                  <div 
                    className={`h-full rounded-full transition-all duration-1000 ${
                      timeLeft === 0 || (isSubmitted && selectedOpt === null)
                        ? 'bg-red-600'
                        : timeLeft < 15 
                          ? 'bg-gradient-to-r from-red-500 to-rose-600' 
                          : timeLeft < 30 
                            ? 'bg-gradient-to-r from-amber-400 to-amber-500' 
                            : 'bg-gradient-to-r from-[#002060] to-indigo-600'
                    }`}
                    style={{ width: (timeLeft === 0 || (isSubmitted && selectedOpt === null)) ? '100%' : `${(timeLeft / 60) * 100}%` }}
                  />
                </div>
              </div>

              {/* Actual Question Header */}
              <h3 className="text-base sm:text-lg font-extrabold text-[#002060] mb-6 leading-relaxed">
                {activeQuestions[currentIdx]?.question}
              </h3>

              {/* Graphic Frame for visual questions (traffic signs, lights, lanes, etc.) */}
              {activeQuestions[currentIdx]?.graphic && (
                <motion.div 
                  whileHover={{ scale: 1.02, rotate: 1 }}
                  whileTap={{ scale: 0.98, rotate: -1 }}
                  className="flex justify-center items-center p-4 sm:p-6 mb-6 bg-slate-50 border border-slate-150 rounded-2xl max-w-sm mx-auto shadow-inner cursor-pointer"
                >
                  {activeQuestions[currentIdx].graphic}
                </motion.div>
              )}

              {/* Options list structured identically to driver tests */}
              <div className="space-y-3 mb-6">
                {activeQuestions[currentIdx]?.options.map((option, idx) => {
                  let optionStyles = "border-slate-200/80 hover:bg-slate-50/50 text-slate-700 hover:border-slate-350";
                  
                  if (selectedOpt === idx) {
                    optionStyles = "border-[#FF7112] bg-orange-50/20 text-[#002060] font-semibold ring-1 ring-orange-500/20";
                  }

                  if (isSubmitted) {
                    if (option.isCorrect) {
                      optionStyles = "border-green-500 bg-green-50/40 text-green-950 font-bold";
                    } else if (selectedOpt === idx) {
                      optionStyles = "border-red-500 bg-red-50/40 text-red-955 font-semibold";
                    } else {
                      optionStyles = "border-slate-100 bg-slate-50/30 text-slate-405 text-slate-400 cursor-not-allowed";
                    }
                  }

                  const isSelectedWrong = isSubmitted && selectedOpt === idx && !option.isCorrect;

                  return (
                    <button
                      key={idx}
                      disabled={isSubmitted}
                      onClick={() => handleOptionClick(idx)}
                      className={`w-full text-left p-4 rounded-xl sm:rounded-2xl border transition-all duration-150 flex items-start gap-4 cursor-pointer outline-none ${optionStyles} ${isSelectedWrong ? 'shake-wrong' : ''}`}
                      type="button"
                    >
                      {/* Interactive Check Badge bubble resembling A, B, C, D */}
                      <span className={`w-6 h-6 rounded-lg border-2 flex items-center justify-center shrink-0 text-xs font-black transition-all ${
                        selectedOpt === idx 
                          ? 'border-[#FF7112] bg-[#FF7112] text-white' 
                          : 'border-slate-300 bg-white text-slate-600'
                      } ${
                        isSubmitted && option.isCorrect 
                          ? 'border-green-600 bg-green-600 text-white' 
                          : ''
                      } ${
                        isSubmitted && !option.isCorrect && selectedOpt === idx 
                          ? 'border-red-600 bg-red-600 text-white' 
                          : ''
                      }`}>
                        {String.fromCharCode(65 + idx)}
                      </span>
                      <span className="text-xs sm:text-sm pt-0.5 leading-normal sm:leading-snug">{option.text}</span>
                    </button>
                  );
                })}
              </div>

              {/* Active feedback banner when submitted */}
              {isSubmitted && (() => {
                const hasChosen = selectedOpt !== null;
                const isCorrect = hasChosen ? activeQuestions[currentIdx]?.options[selectedOpt].isCorrect : false;
                const correctOption = activeQuestions[currentIdx]?.options.find(o => o.isCorrect);

                return (
                  <div className={`p-4 rounded-2xl border mb-6 text-xs sm:text-sm leading-relaxed ${
                    isCorrect 
                      ? 'bg-green-50/80 border-green-200 text-green-900' 
                      : 'bg-red-50/80 border-red-200 text-red-900'
                  }`}>
                    <p className="font-extrabold mb-1.5 flex items-center gap-1.5 uppercase tracking-wide">
                      {!hasChosen 
                        ? "⏱️ Time's Up!" 
                        : isCorrect 
                          ? "✓ Correct Answer!" 
                          : "✕ Incorrect Option Selected"
                      }
                    </p>
                    <p className="font-medium text-slate-700">
                      {!hasChosen 
                        ? `You ran out of time to answer this question. The correct answer is: "${correctOption?.text}". ${correctOption?.rationale}`
                        : activeQuestions[currentIdx]?.options[selectedOpt].rationale
                      }
                    </p>
                  </div>
                );
              })()}

              {/* Optional dynamic hint reveal box */}
              {showHint && !isSubmitted && (
                <div className="p-4 rounded-2xl bg-amber-50/50 border border-amber-200/50 text-amber-900 text-xs sm:text-sm mb-6 flex gap-3">
                  <Lightbulb className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                  <p>
                    <strong className="font-extrabold text-amber-950">Study Hint:</strong> {activeQuestions[currentIdx]?.hint}
                  </p>
                </div>
              )}

              {/* Bottom Control Bar Action Panel */}
              <div className="flex justify-between items-center border-t border-slate-100 pt-6 gap-4">
                {!isSubmitted ? (
                  <>
                    <button
                      type="button"
                      onClick={() => setShowHint(!showHint)}
                      className="text-slate-400 hover:text-[#FF7112] text-xs sm:text-sm font-extrabold uppercase tracking-wider transition-colors cursor-pointer flex items-center gap-1 leading-none"
                    >
                      <Lightbulb className="w-4 h-4" /> {showHint ? "Hide Hint" : "Get Hint"}
                    </button>
                    <button
                      type="button"
                      onClick={() => handleSubmit(false)}
                      disabled={selectedOpt === null}
                      className={`px-6 sm:px-8 py-3 rounded-xl sm:rounded-2xl font-black text-xs uppercase tracking-widest text-white shadow-md transition-all ${
                        selectedOpt === null 
                          ? 'bg-slate-200 cursor-not-allowed shadow-none text-slate-400' 
                          : 'bg-[#002060] hover:bg-[#FF7112] transform hover:-translate-y-0.5 active:translate-y-0 active:scale-98 cursor-pointer'
                      }`}
                    >
                      Submit Response
                    </button>
                  </>
                ) : (
                  <button
                    type="button"
                    onClick={handleNext}
                    className="w-full bg-[#FF7112] hover:bg-[#E05A00] text-white font-black py-4 rounded-xl sm:rounded-2xl transition-all shadow-md flex items-center justify-center gap-1 text-xs uppercase tracking-widest cursor-pointer active:scale-98"
                  >
                    {currentIdx + 1 < activeQuestions.length ? "Next Question" : "Finish & View Score"} <ChevronRight className="w-4 h-4" />
                  </button>
                )}
              </div>

              {/* Auto Saved Progress Indicator & Restart Option */}
              <div className="flex items-center justify-between mt-6 pt-5 border-t border-slate-100 text-[11px] text-slate-400 select-none">
                <span className="flex items-center gap-1.5 font-bold uppercase tracking-wider text-[10px] text-slate-400">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-[pulse_1.5s_infinite]" />
                  Progress Auto-Saved
                </span>
                <button
                  type="button"
                  onClick={() => {
                    if (window.confirm("Are you sure you want to restart the quiz? This will reset your current score, answers, and progress.")) {
                      handleStart();
                    }
                  }}
                  className="text-red-500 hover:text-red-650 hover:underline font-extrabold uppercase tracking-wider font-sans transition-colors cursor-pointer"
                >
                  Reset &amp; Start Over
                </button>
              </div>
            </div>
          )}
        </ScrollReveal>
      </main>

      <Footer />
    </div>
  );
}

function BadgeCheckPlaceholder(props: any) {
  return <CheckCircle2 {...props} />;
}
