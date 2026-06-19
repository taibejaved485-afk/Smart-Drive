import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import SEO from '../components/SEO';
import { ScrollReveal } from '../components/ScrollReveal';
import { Trophy, AlertCircle, Lightbulb, RefreshCw, ChevronRight, CheckCircle2, Info, BookOpen, Timer, Award, ShieldCheck, Zap, Star, Heart, Check, X, CheckSquare, Sparkles } from 'lucide-react';
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
    hint: "Think about physical stopping distance and reaction time at high speeds."
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
    hint: "Start from the inside mirror and move your focus outward before physically turning your head."
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
    hint: "Yellow light signifies warning. You must reduce speed and stay alert without halting unnecessarily."
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
    hint: "Think of the right-hand rule used universally in driving theory."
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
    hint: "Yielding means giving priority to others, only stopping if they are present."
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
    hint: "Avoid sudden inputs like braking or steering; let friction do the work gently."
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
    hint: "Clear the way safely and remain completely stationary until they have gone by."
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
    hint: "Drivers inside have the priority. Always turn left to enter the circle."
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
    hint: "Let the computer pump the brakes for you while you press down hard."
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
    hint: "It requires a physical head turn to see."
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
    hint: "Rainwater cuts brake competence in half. Double your normal stopping gap."
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
    hint: "Prioritize keeping the vehicle straight and avoiding any abrupt control inputs."
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
    hint: "Solid borders are visual blockades. They indicate you must stick to your present lane."
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
    hint: "Think about whether oncoming traffic can see you from a safe distance."
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
    hint: "Kinetic energy scales quadratically with speed (v squared)."
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
  const [selectedDifficulty, setSelectedDifficulty] = useState<"all" | "easy" | "medium" | "hard">(() => getSavedProgress()?.selectedDifficulty ?? "all");

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

        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
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
      <main className="flex-grow py-8 sm:py-12 px-4 max-w-4xl mx-auto w-full relative z-10">
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
                      { id: "easy", label: "Easy Tier", desc: "Basic signs", icon: BadgeCheckPlaceholder, color: "text-emerald-600", activeColor: "border-emerald-500 bg-emerald-50/40 text-emerald-950" },
                      { id: "medium", label: "Medium Tier", desc: "Right of way", icon: ShieldCheck, color: "text-amber-600", activeColor: "border-amber-500 bg-amber-50/40 text-amber-950" },
                      { id: "hard", label: "Hard Tier", desc: "Blowouts & ABS", icon: Zap, color: "text-rose-600", activeColor: "border-rose-500 bg-rose-50/40 text-rose-950" }
                    ].map((tier) => {
                      const isSelected = selectedDifficulty === tier.id;
                      const IconComponent = tier.id === "easy" ? CheckCircle2 : tier.icon;
                      return (
                        <button
                          key={tier.id}
                          type="button"
                          onClick={() => setSelectedDifficulty(tier.id as any)}
                          className={`p-4 rounded-2xl border text-center transition-all duration-150 cursor-pointer flex flex-col items-center group relative overflow-hidden ${
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
                  onClick={handleStart}
                  className="flex-1 bg-[#002060] hover:bg-opacity-95 text-white font-extrabold py-4 px-6 rounded-2xl transition cursor-pointer flex items-center justify-center gap-2 text-xs uppercase tracking-wider shadow-lg active:scale-98"
                >
                  <RefreshCw className="w-4 h-4 animate-spin-reverse" /> Retake Test Simulator
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
                    timeLeft < 15 
                      ? 'bg-red-100 text-red-600 animate-pulse' 
                      : timeLeft < 30 
                        ? 'bg-amber-100 text-amber-605' 
                        : 'bg-[#FF7112]/10 text-[#FF7112]'
                  }`}>
                    <Timer className={`w-5 h-5 ${timeLeft < 15 ? 'animate-[pulse_1s_infinite]' : ''}`} />
                  </div>
                  <div>
                    <p className="text-[9px] font-black text-slate-500 uppercase tracking-widest leading-none mb-1">Time Remaining</p>
                    <p className={`text-sm sm:text-base font-black font-mono leading-none ${
                      timeLeft < 15 
                        ? 'text-red-600 animate-pulse' 
                        : timeLeft < 30 
                          ? 'text-amber-600' 
                          : 'text-[#002060]'
                    }`}>
                      {timeLeft} seconds {timeLeft <= 15 && '⚠️'}
                    </p>
                  </div>
                </div>

                <div className="flex-grow sm:max-w-[280px] md:max-w-[360px] h-2 bg-slate-200 rounded-full overflow-hidden">
                  <div 
                    className={`h-full rounded-full transition-all duration-1000 ${
                      timeLeft < 15 
                        ? 'bg-gradient-to-r from-red-500 to-rose-600' 
                        : timeLeft < 30 
                          ? 'bg-gradient-to-r from-amber-400 to-amber-500' 
                          : 'bg-gradient-to-r from-[#002060] to-indigo-600'
                    }`}
                    style={{ width: `${(timeLeft / 60) * 100}%` }}
                  />
                </div>
              </div>

              {/* Actual Question Header */}
              <h3 className="text-base sm:text-lg font-extrabold text-[#002060] mb-6 leading-relaxed">
                {activeQuestions[currentIdx]?.question}
              </h3>

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
