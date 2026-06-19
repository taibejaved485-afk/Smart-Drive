import React, { useState, useMemo } from 'react';
import { 
  BookOpen, 
  Search, 
  HelpCircle, 
  ArrowRight, 
  Grid, 
  List, 
  Trophy, 
  RotateCcw, 
  Check, 
  X, 
  Info,
  Award
} from 'lucide-react';

interface TrafficSign {
  id: number;
  title: string;
  urduTitle: string;
  category: "regulatory" | "warning" | "informative";
  meaning: string;
  urduMeaning: string;
  icon: React.ReactNode;
}

const signsData: TrafficSign[] = [
  {
    id: 1,
    title: "Stop Sign",
    urduTitle: "لازمی رکیں",
    category: "regulatory",
    meaning: "You must come to a complete stop behind the stop line, observe intersecting traffic, yield to pedestrians, and proceed only when perfectly safe.",
    urduMeaning: "لازمی طور پر سڑک کی حد لائن سے پیچھے گاڑی روکیں، ٹریفک اور پیدل چلنے والوں کو اولیت دیں اور مکمل تسلی کے بعد آگے بڑھیں۔",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" className="w-16 h-16 drop-shadow-md">
        <polygon points="30,5 70,5 95,30 95,70 70,95 30,95 5,70 5,30" fill="#dc2626" />
        <polygon points="32,8 68,8 92,32 92,68 68,92 32,92 8,68 8,32" fill="none" stroke="white" strokeWidth="2.5" />
        <text x="50" y="58" fill="white" fontSize="18" fontWeight="900" textAnchor="middle" fontFamily="Inter, system-ui, sans-serif">STOP</text>
      </svg>
    )
  },
  {
    id: 2,
    title: "No Entry",
    urduTitle: "داخلہ ممنوع ہے",
    category: "regulatory",
    meaning: "Entry is strictly prohibited for all vehicles in this direction to prevent head-on accidents on one-way lanes.",
    urduMeaning: "اس سمت میں کسی بھی قسم کی گاڑی کا داخلہ سخت ممنوع ہے۔ یہ یکطرفہ ٹریفک والے راستوں پر سنگین حادثات سے بچنے کے لیے ہے۔",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" className="w-16 h-16 drop-shadow-md">
        <circle cx="50" cy="50" r="45" fill="#dc2626" />
        <circle cx="50" cy="50" r="39" fill="none" stroke="white" strokeWidth="2.5" />
        <rect x="20" y="42" width="60" height="16" fill="white" rx="2" />
      </svg>
    )
  },
  {
    id: 3,
    title: "Speed Limit 50",
    urduTitle: "رفتار کی حد ۵۰ کلومیٹر",
    category: "regulatory",
    meaning: "The maximum legal speed limit under dry daylight conditions is 50 km/h. Reduce speed during wet conditions, bad visibility, or around crowds.",
    urduMeaning: "خشک اور صاف موسم میں گاڑی کی انتہائی تیز رفتار کی حد 50 کلومیٹر فی گھنٹہ ہے۔ خراب موسم یا گنجان علاقوں میں رفتار لازمی کم کریں۔",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" className="w-16 h-16 drop-shadow-md">
        <circle cx="50" cy="50" r="45" fill="white" stroke="#dc2626" strokeWidth="8" />
        <text x="50" y="60" fill="black" fontSize="28" fontWeight="900" textAnchor="middle" fontFamily="JetBrains Mono, monospace">50</text>
      </svg>
    )
  },
  {
    id: 4,
    title: "Give Way",
    urduTitle: "راستہ دیں",
    category: "regulatory",
    meaning: "You must slow down or stop to allow vehicles on the main or intersecting road to pass before moving forward.",
    urduMeaning: "شاہراہ پر آنے سے پہلے لازمی رفتار کم کریں یا ضرورت پڑنے پر گاڑی روک کر دیگر گاڑیاں گزرنے دیں اور پھر خود آگے بڑھیں۔",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" className="w-16 h-16 drop-shadow-md">
        <polygon points="50,90 5,15 95,15" fill="white" stroke="#dc2626" strokeWidth="8" strokeLinejoin="round" />
        <polygon points="50,75 14,21 86,21" fill="none" stroke="white" strokeWidth="1" />
      </svg>
    )
  },
  {
    id: 5,
    title: "Pedestrian Crossing",
    urduTitle: "پیدل چلنے والوں کا راستہ",
    category: "warning",
    meaning: "Approaching a zebra crossing area. Slow down, scan curbs for pedestrians, and prepare to come to a full stop to grant safety right-of-way.",
    urduMeaning: "آگے پیدل چلنے والوں کی کراسنگ (زیبرا کراسنگ) ہے۔ گاڑی آہستہ کریں اور سڑک عبور کرنے والوں کو اولیت کا راستہ دینے کے لیے تیار رہیں۔",
    icon: (
      <svg viewBox="0 0 100 100" className="w-16 h-16 drop-shadow-md">
        <polygon points="50,12 92,85 8,85" fill="white" stroke="#dc2626" strokeWidth="8" strokeLinejoin="round" />
        {/* Zebra lines */}
        <line x1="30" y1="74" x2="70" y2="74" stroke="black" strokeWidth="3.5" strokeLinecap="round" />
        <line x1="35" y1="79" x2="65" y2="79" stroke="black" strokeWidth="3.5" strokeLinecap="round" />
        {/* Walking person detailed silhouette */}
        <circle cx="50" cy="35" r="4.5" fill="black" />
        <path d="M48,41 h4 l3,9.5 l-2,1.5 l-2.5,-8 h-1 L45,64 h-3.5 l4,-17 L44,46 L41,52 l-2.5,-1.5 Z" fill="black" />
        <path d="M48,51 l4.5,13 h3.5 l-6.5,-15 Z" fill="black" />
      </svg>
    )
  },
  {
    id: 6,
    title: "Slippery Road Ahead",
    urduTitle: "پھسلن والی سڑک",
    category: "warning",
    meaning: "The road ahead is prone to loss of friction. Slippery when wet or dusty. Reduce speed, avoid rapid acceleration, and steer with gentle actions.",
    urduMeaning: "آگے سڑک پر پھسلن ہو سکتی ہے جس سے ٹائروں کی گرفت کم ہوگی۔ رفتار مناسب رکھیں اور اچانک بریک دبانے یا تیز موڑ کاٹنے سے گریز کریں۔",
    icon: (
      <svg viewBox="0 0 100 100" className="w-16 h-16 drop-shadow-md">
        <polygon points="50,12 92,85 8,85" fill="white" stroke="#dc2626" strokeWidth="8" strokeLinejoin="round" />
        {/* Tilted car body (rear-view) representing a skid */}
        <g transform="translate(50, 48) rotate(12) translate(-50, -48)">
          <path d="M42,42 c2,-3 14,-3 16,0 l4,8 h-24 Z" fill="black" />
          <path d="M44,43 h12 l2.5,4.5 h-17 Z" fill="white" />
          <rect x="34" y="50" width="32" height="8" rx="2" fill="black" />
          <rect x="36" y="52" width="4" height="2" fill="white" />
          <rect x="60" y="52" width="4" height="2" fill="white" />
          <rect x="38" y="58" width="5" height="4" fill="black" />
          <rect x="57" y="58" width="5" height="4" fill="black" />
        </g>
        {/* S-shaped overlap skidding tires tracks from wheels onto road */}
        <path d="M38,62 c-6,5 0,11 8,9 c10,-3 12,-11 4,-14" fill="none" stroke="black" strokeWidth="2.5" strokeLinecap="round" />
        <path d="M57,62 c-6,5 0,11 8,9 c10,-3 12,-11 4,-14" fill="none" stroke="black" strokeWidth="2.5" strokeLinecap="round" />
      </svg>
    )
  },
  {
    id: 7,
    title: "School Ahead",
    urduTitle: "آگے اسکول ہے",
    category: "warning",
    meaning: "School playground or building area adjacent to the road. Slow down to local safety criteria and react proactively to kids entering road ways.",
    urduMeaning: "قریب ہی سکول موجود ہے۔ بچوں کی سڑک عبور کرنے کی توقع رکھیں۔ اپنی رفتار کو حد درجہ کم رکھیں اور دونوں کناروں کو دھیان سے دیکھیں۔",
    icon: (
      <svg viewBox="0 0 100 100" className="w-16 h-16 drop-shadow-md">
        <polygon points="50,12 92,85 8,85" fill="white" stroke="#dc2626" strokeWidth="8" strokeLinejoin="round" />
        {/* Left Child (Taller silhouette) */}
        <g transform="translate(-2, 2)">
          <circle cx="44" cy="35" r="4" fill="black" />
          <path d="M41,40 h6 l2.5,14 h-2.5 l-1,10 h-3 l-1,-10 h-2 Z" fill="black" />
          <rect x="37" y="42" width="4" height="6.5" rx="1" fill="black" />
        </g>
        {/* Right Child (Smaller silhouette) */}
        <g transform="translate(3, 5)">
          <circle cx="56" cy="38" r="3.5" fill="black" />
          <polygon points="56,43 51,54 61,54" fill="black" />
          <rect x="53.5" y="54" width="2" height="7" fill="black" />
          <rect x="56.5" y="54" width="2" height="7" fill="black" />
        </g>
      </svg>
    )
  },
  {
    id: 8,
    title: "U-Turn Zone Ahead",
    urduTitle: "آگے یوٹرن ہے",
    category: "warning",
    meaning: "An upcoming U-turn opening on the highway median. Actively monitor vehicles decelerating to turn or spinning back into your traffic lanes.",
    urduMeaning: "آگے سڑک پر واپس مڑنے کا یو ٹرن کا نشان ہے۔ یکدم مڑنے والی یا لین تبدیل کرنے والی گاڑیوں پر نظر رکھیں اور رفتار متوازن رکھیں۔",
    icon: (
      <svg viewBox="0 0 100 100" className="w-16 h-16 drop-shadow-md">
        <polygon points="50,12 92,85 8,85" fill="white" stroke="#dc2626" strokeWidth="8" strokeLinejoin="round" />
        {/* Circular U-Turn arrow curve */}
        <path d="M62,64 L62,47 a 12,12 0 0 0 -24,0 L38,64" stroke="black" strokeWidth="6" strokeLinecap="round" fill="none" />
        {/* Downward pointing arrowhead on the left leg */}
        <polygon points="31,61 38,72 45,61" fill="black" />
      </svg>
    )
  },
  {
    id: 9,
    title: "Hospital Inside Zone",
    urduTitle: "ہسپتال کا علاقہ ہے",
    category: "informative",
    meaning: "Medical facilities ahead. Drivers are legally obligated to refrain from driving with high engine sound, using pressure sounds, or honking.",
    urduMeaning: "قریب ہی ہسپتال موجود ہے۔ مریضوں کی تندرستی اور سہولت کے پیش نظر سائلنسر کا شور کم رکھیں اور ہارن کا استعمال ہرگز نہ کریں۔",
    icon: (
      <svg viewBox="0 0 100 100" className="w-16 h-16 drop-shadow-md">
        <rect x="10" y="10" width="80" height="80" rx="12" fill="#002060" stroke="white" strokeWidth="3" />
        <path d="M50,22 v 18 M41,31 h 18" stroke="#e11d48" strokeWidth="6" strokeLinecap="round" />
        <path d="M28,49 v 25 M72,49 v 25 M28,62 h 44" stroke="white" strokeWidth="6" strokeLinecap="round" />
      </svg>
    )
  },
  {
    id: 10,
    title: "Fuel Refill Station",
    urduTitle: "پٹرول پمپ",
    category: "informative",
    meaning: "An authorized commercial petrol/diesel fuel station is adjacent to the roadway, offering fueling, battery support, or tire inflating.",
    urduMeaning: "قریب ہی پٹرول / ڈیزل پمپ کی سہولت دستیاب ہے۔ طویل سفر کے دوران سفری ایندھن اور دیگر مسائل کا ازالہ کرنے میں مدد ملتی ہے۔",
    icon: (
      <svg viewBox="0 0 100 100" className="w-16 h-16 drop-shadow-md">
        <rect x="10" y="10" width="80" height="80" rx="12" fill="#002060" stroke="white" strokeWidth="3" />
        <rect x="30" y="32" width="22" height="38" rx="2" fill="white" />
        <rect x="34" y="36" width="14" height="12" fill="#002060" />
        <path d="M56,40 h 3 v 18 c 0,4 -3,6 -6,6 h -1" stroke="white" strokeWidth="3" fill="none" />
        <rect x="54" y="58" width="5" height="10" fill="white" />
      </svg>
    )
  },
  {
    id: 11,
    title: "Parking Lot Area",
    urduTitle: "پارکنگ کی جگہ",
    category: "informative",
    meaning: "Authorized parking bays for motor vehicle parking. Always keep within designated coordinate markings to ensure optimal public space utilization.",
    urduMeaning: "گاڑیاں کھڑی کرنے کی مخصوص پارکنگ۔ ٹریفک کی روانی برقرار رکھنے کے لیے ہمیشہ گاڑی پارکنگ لائنوں کے اندر ڈسپلن سے کھڑی کریں۔",
    icon: (
      <svg viewBox="0 0 100 100" className="w-16 h-16 drop-shadow-md">
        <rect x="10" y="10" width="80" height="80" rx="12" fill="#002060" stroke="white" strokeWidth="3" />
        <text x="50" y="65" fill="white" fontSize="42" fontWeight="900" textAnchor="middle" fontFamily="Inter, system-ui, sans-serif">P</text>
      </svg>
    )
  },
  {
    id: 12,
    title: "Bus Stop Terminal",
    urduTitle: "بس اسٹاپ",
    category: "informative",
    meaning: "Designated stop for buses. Exercise vigilance around commuters who may rush onto the road, and anticipate slow-starting public buses.",
    urduMeaning: "پبلک بسوں کے رکنے کے لیے مقررہ بس اسٹاپ۔ مسافروں کی آمد و رفت اور بسوں کے اچانک رکنے یا چل پڑنے کے پیشِ نظر محتاط رہیں۔",
    icon: (
      <svg viewBox="0 0 100 100" className="w-16 h-16 drop-shadow-md">
        <rect x="10" y="10" width="80" height="80" rx="12" fill="#002060" stroke="white" strokeWidth="3" />
        <rect x="25" y="32" width="50" height="32" rx="6" fill="white" />
        <rect x="30" y="37" width="12" height="10" fill="#002060" />
        <rect x="46" y="37" width="10" height="10" fill="#002060" />
        <rect x="58" y="37" width="12" height="10" fill="#002060" />
        <circle cx="37" cy="64" r="5.5" fill="black" stroke="white" strokeWidth="2" />
        <circle cx="63" cy="64" r="5.5" fill="black" stroke="white" strokeWidth="2" />
      </svg>
    )
  }
];

export default function TrafficSigns() {
  const [activeCategory, setActiveCategory] = useState<"all" | "regulatory" | "warning" | "informative">("all");
  const [flippedCardId, setFlippedCardId] = useState<number | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [studyMode, setStudyMode] = useState<"grid" | "directory">("grid");

  // Game states
  const [gameIndex, setGameIndex] = useState(0);
  const [gameScore, setGameScore] = useState(0);
  const [answeredGame, setAnsweredGame] = useState<boolean>(false);
  const [selectedGameAnswer, setSelectedGameAnswer] = useState<number | null>(null);
  const [shuffledAnswers, setShuffledAnswers] = useState<TrafficSign[]>([]);
  const [isPlayingGame, setIsPlayingGame] = useState(false);

  // Search filter
  const filteredSigns = useMemo(() => {
    return signsData.filter(sign => {
      const categoryMatch = activeCategory === "all" || sign.category === activeCategory;
      const cleanQuery = searchQuery.toLowerCase().trim();
      if (!cleanQuery) return categoryMatch;

      const titleMatch = sign.title.toLowerCase().includes(cleanQuery);
      const meaningMatch = sign.meaning.toLowerCase().includes(cleanQuery);
      const urduTitleMatch = sign.urduTitle.includes(cleanQuery);
      const urduMeaningMatch = sign.urduMeaning.includes(cleanQuery);

      return categoryMatch && (titleMatch || meaningMatch || urduTitleMatch || urduMeaningMatch);
    });
  }, [activeCategory, searchQuery]);

  const handleCardClick = (id: number) => {
    setFlippedCardId(prev => prev === id ? null : id);
  };

  const startSignQuiz = () => {
    setIsPlayingGame(true);
    setupNewGameQuestion(0);
  };

  const setupNewGameQuestion = (index: number) => {
    setAnsweredGame(false);
    setSelectedGameAnswer(null);
    setGameIndex(index);

    const currentSign = signsData[index % signsData.length];
    
    // Pick 3 random distractor signs
    const otherSigns = signsData.filter(s => s.id !== currentSign.id);
    const shuffledOthers = [...otherSigns].sort(() => 0.5 - Math.random());
    const distractors = shuffledOthers.slice(0, 3);
    
    // Combine correct and distractors
    const allChoices = [currentSign, ...distractors].sort(() => 0.5 - Math.random());
    setShuffledAnswers(allChoices);
  };

  const handleGameAnswer = (signId: number) => {
    if (answeredGame) return;
    setSelectedGameAnswer(signId);
    setAnsweredGame(true);
    const currentSign = signsData[gameIndex % signsData.length];
    if (signId === currentSign.id) {
      setGameScore(prev => prev + 1);
    }
  };

  const nextGameQuestion = () => {
    setupNewGameQuestion(gameIndex + 1);
  };

  const resetGame = () => {
    setGameScore(0);
    setIsPlayingGame(false);
  };

  return (
    <section id="traffic-signs" className="py-20 bg-gradient-to-b from-slate-50 to-white border-t border-b border-slate-200/70 scroll-mt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <span className="text-xs font-black uppercase tracking-widest text-[#FF7112] bg-orange-100/50 border border-orange-200/50 px-4 py-2 rounded-2xl inline-flex items-center gap-1.5 mb-4 select-none">
            <BookOpen className="w-3.5 h-3.5 text-[#FF7112]" /> Interactive Study Guide
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#002060] tracking-tight">
            Pakistan Road & Traffic Signs Directory
          </h2>
          <p className="text-slate-500 text-sm sm:text-base mt-3 leading-relaxed">
            Master official road regulations, indicators, warnings, and route updates with high-fidelity visuals. Excellent for the driver license theory check (سائن ٹیسٹ کی تیاری).
          </p>
        </div>

        {/* Dashboard Control Panel */}
        <div className="bg-white border border-slate-200 rounded-3xl p-5 mb-12 shadow-xs">
          <div className="flex flex-col lg:flex-row gap-5 items-stretch lg:items-center justify-between">
            
            {/* Search Input */}
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search signs in English or Urdu / تلاش کریں..."
                className="w-full pl-11 pr-4 py-3 bg-slate-50 border border-slate-200/80 rounded-2xl text-xs sm:text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-orange-500/30 font-medium transition-all"
              />
              {searchQuery && (
                <button 
                  onClick={() => setSearchQuery("")}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 font-bold text-xs cursor-pointer"
                >
                  Clear
                </button>
              )}
            </div>

            {/* View controllers */}
            <div className="flex flex-wrap items-center gap-3">
              <button
                type="button"
                onClick={() => {
                  if (isPlayingGame) {
                    resetGame();
                  } else {
                    startSignQuiz();
                  }
                }}
                className={`py-3 px-5 rounded-2xl font-black text-xs uppercase tracking-wider flex items-center gap-2 border select-none transition-all cursor-pointer ${
                  isPlayingGame 
                    ? 'bg-[#FF7112] text-white border-[#FF7112]' 
                    : 'bg-white hover:bg-orange-50 border-orange-200 text-orange-600 outline-none'
                }`}
              >
                {isPlayingGame ? (
                  <>
                    <RotateCcw className="w-3.5 h-3.5" /> Back to Study
                  </>
                ) : (
                  <>
                    <Trophy className="w-3.5 h-3.5 text-amber-500" /> Start Sign Quiz Game
                  </>
                )}
              </button>

              {!isPlayingGame && (
                <div className="bg-slate-100 p-1.5 rounded-xl flex gap-1 select-none">
                  <button
                    onClick={() => setStudyMode("grid")}
                    className={`p-2 rounded-lg cursor-pointer transition-all ${studyMode === 'grid' ? 'bg-white shadow-xs text-[#002060]' : 'text-slate-400 hover:text-slate-700'}`}
                    title="Flashcard Flip Deck View"
                  >
                    <Grid className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => {
                      setStudyMode("directory");
                      setFlippedCardId(null);
                    }}
                    className={`p-2 rounded-lg cursor-pointer transition-all ${studyMode === 'directory' ? 'bg-white shadow-xs text-[#002060]' : 'text-slate-400 hover:text-slate-700'}`}
                    title="Clear Detailed Directory View"
                  >
                    <List className="w-4 h-4" />
                  </button>
                </div>
              )}
            </div>
          </div>

          {!isPlayingGame && (
            <div className="flex flex-wrap gap-2 mt-4 border-t border-slate-100 pt-4">
              {[
                { id: "all", label: "Show All Road Signs", activeColor: "bg-[#002060] text-white" },
                { id: "regulatory", label: "Regulatory (سرخ دائرے - لازمی)", activeColor: "bg-rose-600 text-white" },
                { id: "warning", label: "Warning (انتباہی - تکون)", activeColor: "bg-amber-500 text-white" },
                { id: "informative", label: "Informative (نیلے چوکور)", activeColor: "bg-blue-600 text-white" }
              ].map((cat) => (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => {
                    setActiveCategory(cat.id as any);
                    setFlippedCardId(null);
                  }}
                  className={`px-4 py-2.5 rounded-xl font-bold text-[11px] uppercase tracking-wider transition-all duration-150 cursor-pointer ${
                    activeCategory === cat.id
                      ? `${cat.activeColor} shadow-xs`
                      : 'bg-slate-50 border border-slate-200/50 hover:bg-slate-100 text-slate-600'
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Game view */}
        {isPlayingGame ? (
          <div className="w-full max-w-2xl mx-auto bg-gradient-to-r from-slate-900 to-slate-950 text-white border border-slate-800 rounded-3xl p-6 md:p-8 shadow-xl relative overflow-hidden transition-all duration-300">
            <div className="absolute top-0 right-0 w-32 h-32 bg-orange-500/10 rounded-full blur-2xl pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-32 h-32 bg-blue-500/10 rounded-full blur-2xl pointer-events-none" />

            <div className="flex justify-between items-center mb-6 pb-4 border-b border-slate-800/80">
              <div className="flex items-center gap-2">
                <span className="p-2 bg-amber-500/15 text-amber-400 rounded-xl">
                  <Award className="w-4 h-4" />
                </span>
                <div>
                  <h4 className="text-xs font-black uppercase tracking-widest text-[#FF7112] leading-none">Flash Trainer</h4>
                  <p className="text-[10px] text-slate-400 font-medium">Practice & Build Instincts</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <span className="font-mono text-xs bg-slate-800 border border-slate-700 px-3 py-1 rounded-full text-slate-200">
                  PROGRESS: {gameIndex + 1}
                </span>
                <span className="font-mono text-xs text-yellow-400 bg-yellow-500/10 border border-yellow-500/20 px-3 py-1 rounded-full font-bold font-mono">
                  SCORE: {gameScore}
                </span>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-5 gap-6 items-center">
              <div className="md:col-span-2 flex flex-col items-center justify-center p-6 bg-slate-900/60 rounded-2xl border border-slate-800 min-h-[180px]">
                <div className="p-4 bg-slate-950 border border-slate-800 rounded-full flex items-center justify-center w-28 h-28 transform shadow-inner relative hover:scale-105 transition-all">
                  {signsData[gameIndex % signsData.length].icon}
                </div>
                <span className="text-[10px] uppercase font-black tracking-widest text-slate-500 mt-4 leading-none">
                  Identify This Sign
                </span>
              </div>

              <div className="md:col-span-3 space-y-3">
                {shuffledAnswers.map((choice) => {
                  const isCorrectAnswer = choice.id === signsData[gameIndex % signsData.length].id;
                  const isSelected = selectedGameAnswer === choice.id;
                  
                  let optionColor = "border-slate-800 bg-slate-900/50 text-slate-100 hover:bg-slate-800 hover:border-slate-700";
                  if (answeredGame) {
                    if (isCorrectAnswer) {
                      optionColor = "border-emerald-600 bg-emerald-500/10 text-emerald-300 font-extrabold";
                    } else if (isSelected) {
                      optionColor = "border-rose-600 bg-rose-500/15 text-rose-300 font-medium line-through";
                    } else {
                      optionColor = "border-slate-900 bg-slate-950/20 text-slate-500";
                    }
                  }

                  return (
                    <button
                      key={choice.id}
                      type="button"
                      disabled={answeredGame}
                      onClick={() => handleGameAnswer(choice.id)}
                      className={`w-full p-4 rounded-xl border text-left text-xs transition-all duration-155 flex items-center justify-between ${optionColor} ${!answeredGame ? 'cursor-pointer' : 'cursor-default'}`}
                    >
                      <div className="flex-1">
                        <span className="block font-black text-slate-200">{choice.title}</span>
                        <span className="block text-[10px] text-slate-400 mt-0.5" dir="rtl">{choice.urduTitle}</span>
                      </div>
                      {answeredGame && (
                        <div>
                          {isCorrectAnswer ? (
                            <div className="w-5 h-5 rounded-full bg-emerald-600 flex items-center justify-center text-white text-[10px]">
                              <Check className="w-3" />
                            </div>
                          ) : isSelected ? (
                            <div className="w-5 h-5 rounded-full bg-rose-600 flex items-center justify-center text-white text-[10px]">
                              <X className="w-3" />
                            </div>
                          ) : null}
                        </div>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>

            {answeredGame && (
              <div className="mt-6 p-4 bg-slate-900 border border-slate-800 rounded-2xl flex gap-3.5 animate-fadeIn">
                <div className={`p-2 rounded-xl h-fit shrink-0 ${
                  selectedGameAnswer === signsData[gameIndex % signsData.length].id 
                    ? 'bg-emerald-500/10 text-emerald-400' 
                    : 'bg-rose-500/10 text-rose-400'
                }`}>
                  <Info className="w-5 h-5" />
                </div>
                <div className="flex-1">
                  <h4 className={`text-xs font-black uppercase tracking-wider ${
                    selectedGameAnswer === signsData[gameIndex % signsData.length].id ? 'text-emerald-400' : 'text-rose-400'
                  }`}>
                    {selectedGameAnswer === signsData[gameIndex % signsData.length].id 
                      ? '✓ Perfect Instinct!' 
                      : `✗ Incorrect Option Chosen`
                    }
                  </h4>
                  <p className="text-xs text-slate-300 mt-1.5 leading-relaxed">
                    <strong>Rule:</strong> {signsData[gameIndex % signsData.length].meaning}
                  </p>
                  <p className="text-xs text-slate-400 mt-2 leading-relaxed" dir="rtl">
                    <strong>تفصیل:</strong> {signsData[gameIndex % signsData.length].urduMeaning}
                  </p>
                </div>
              </div>
            )}

            <div className="mt-8 pt-4 border-t border-slate-800/80 flex items-center justify-between gap-4">
              <button
                type="button"
                onClick={resetGame}
                className="text-xs text-slate-400 hover:text-white font-extrabold uppercase tracking-widest cursor-pointer select-none"
              >
                Quit Game
              </button>
              {answeredGame && (
                <button
                  type="button"
                  onClick={nextGameQuestion}
                  className="bg-[#FF7112] hover:bg-[#E05A00] text-white font-extrabold text-xs px-5 py-3 rounded-xl uppercase tracking-widest flex items-center gap-1.5 cursor-pointer shadow-md transform hover:scale-102"
                >
                  Next Question <ArrowRight className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>
        ) : (
          /* Directory/Flashcard views */
          <>
            {filteredSigns.length === 0 ? (
              <div className="text-center py-16 border-2 border-dashed border-slate-200 rounded-3xl bg-slate-50/50">
                <HelpCircle className="w-10 h-10 text-slate-400 mx-auto mb-3" />
                <h3 className="text-sm font-extrabold text-slate-700">No matching traffic signs found</h3>
                <p className="text-xs text-slate-400 mt-1">Try refining your keyword in English or Urdu characters</p>
              </div>
            ) : (
              <>
                {studyMode === "grid" ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                    {filteredSigns.map((sign) => {
                      const isFlipped = flippedCardId === sign.id;

                      return (
                        <div
                          key={sign.id}
                          onClick={() => handleCardClick(sign.id)}
                          className="h-72 cursor-pointer perspective"
                        >
                          <div
                            className={`w-full h-full duration-550 preserve-3d relative ${
                              isFlipped ? 'rotate-y-180' : ''
                            }`}
                          >
                            {/* FRONT CARD SIDE */}
                            <div className="absolute w-full h-full backface-hidden bg-white border border-slate-200/85 rounded-3xl shadow-xs hover:shadow-md px-5 py-6 flex flex-col items-center justify-between hover:border-slate-300 transition-all duration-200">
                              <div className="w-full flex items-center justify-between border-b border-slate-100 pb-2 mb-2 select-none">
                                <span className={`px-2 py-0.5 rounded-full text-[9px] font-black uppercase tracking-wider ${
                                  sign.category === 'regulatory' 
                                    ? 'bg-rose-50 text-rose-600 border border-rose-100' 
                                    : sign.category === 'warning'
                                      ? 'bg-amber-50 text-amber-700 border border-amber-100'
                                      : 'bg-blue-50 text-blue-700 border border-blue-100'
                                }`}>
                                  {sign.category}
                                </span>
                                <span className="text-[10px] font-bold text-slate-400 font-mono">ID #{sign.id}</span>
                              </div>
                              
                              <div className="w-24 h-24 flex items-center justify-center bg-slate-50 rounded-full select-none transform hover:scale-105 transition-all">
                                {sign.icon}
                              </div>
                              
                              <div className="text-center w-full mt-2">
                                <h3 className="text-base font-black text-[#002060] tracking-tight">{sign.title}</h3>
                                <p className="text-xs font-bold text-orange-600 mt-0.5">{sign.urduTitle}</p>
                              </div>

                              <span className="text-[9px] text-[#FF7112] font-black uppercase tracking-widest flex items-center gap-1 select-none pt-2 border-t border-slate-50 w-full justify-center">
                                Tap to Learn <ArrowRight className="w-3 h-3 animate-pulse" />
                              </span>
                            </div>

                            {/* BACK CARD SIDE */}
                            <div className="absolute w-full h-full backface-hidden rotate-y-180 bg-[#0c1322] border border-slate-800 rounded-3xl p-5 flex flex-col justify-between text-white shadow-lg">
                              <div className="space-y-3.5">
                                <div className="flex items-center justify-between border-b border-slate-800 pb-2 mb-1">
                                  <div>
                                    <span className="text-[9px] font-black uppercase tracking-widest text-orange-400">
                                      {sign.category} Sign Details
                                    </span>
                                    <h3 className="text-sm font-black text-slate-100 tracking-tight leading-none mt-1">
                                      {sign.title}
                                    </h3>
                                  </div>
                                  <span className="text-[9px] bg-slate-800 px-2 py-0.5 rounded text-slate-400 font-mono">#{sign.id}</span>
                                </div>
                                
                                <div className="space-y-2.5">
                                  <div className="p-2 border-l-2 border-[#FF7112] bg-slate-900/50 rounded-r-lg">
                                    <h4 className="text-[8px] font-extrabold text-slate-400 uppercase tracking-widest mb-0.5">English Rule</h4>
                                    <p className="text-[11px] leading-relaxed text-slate-300 text-xs text-left">
                                      {sign.meaning}
                                    </p>
                                  </div>
                                  <div className="p-2 border-r-2 border-blue-500 bg-slate-900/50 rounded-l-lg text-right">
                                    <h4 className="text-[8px] font-extrabold text-slate-400 uppercase tracking-widest mb-0.5 text-right">ٹریفک کوڈ قانون</h4>
                                    <p className="text-[11px] leading-relaxed text-slate-300 font-semibold text-xs text-right" dir="rtl">
                                      {sign.urduMeaning}
                                    </p>
                                  </div>
                                </div>
                              </div>

                              <span className="text-[9px] text-center text-slate-500 font-bold uppercase tracking-widest block select-none">
                                Tap card to flip back
                              </span>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                ) : (
                  <div className="space-y-4">
                    {filteredSigns.map((sign) => (
                      <div 
                        key={sign.id}
                        className="bg-white border border-slate-200/80 rounded-2xl p-4 sm:p-5 flex flex-col sm:flex-row items-center gap-5 hover:shadow-md transition-all"
                      >
                        <div className="w-20 h-20 bg-slate-50 border border-slate-150 rounded-2xl flex items-center justify-center shrink-0">
                          <div className="transform scale-80 select-none">
                            {sign.icon}
                          </div>
                        </div>

                        <div className="flex-1 text-center sm:text-left min-w-0">
                          <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2 mb-1.5">
                            <span className="text-[9px] font-bold text-slate-400 font-mono">#{sign.id}</span>
                            <span className="text-gray-400">·</span>
                            <span className={`px-2 py-0.5 rounded text-[9px] font-black uppercase tracking-wider ${
                              sign.category === 'regulatory' 
                                ? 'bg-rose-50 text-rose-600' 
                                : sign.category === 'warning'
                                  ? 'bg-amber-50 text-amber-700'
                                  : 'bg-blue-50 text-blue-700'
                            }`}>
                              {sign.category}
                            </span>
                            <span className="text-gray-400">·</span>
                            <span className="text-xs font-extrabold text-orange-600">{sign.urduTitle}</span>
                          </div>

                          <h3 className="text-base font-black text-[#002060]">{sign.title}</h3>
                          
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-3 pt-3 border-t border-slate-100">
                            <div className="text-left">
                              <span className="block text-[8px] font-extrabold text-slate-400 uppercase tracking-widest mb-0.5 text-left">License Theory Criterion</span>
                              <p className="text-xs text-slate-600 leading-relaxed text-left">{sign.meaning}</p>
                            </div>
                            <div className="text-right">
                              <span className="block text-[8px] font-extrabold text-slate-400 uppercase tracking-widest mb-0.5 text-right">ٹریفک قانون طریقہ کار</span>
                              <p className="text-xs text-slate-700 font-semibold leading-relaxed text-right" dir="rtl">{sign.urduMeaning}</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </>
            )}
          </>
        )}

      </div>

      <style>{`
        .perspective {
          perspective: 1200px;
        }
        .preserve-3d {
          transform-style: preserve-3d;
        }
        .backface-hidden {
          backface-visibility: hidden;
        }
        .rotate-y-180 {
          transform: rotateY(180deg);
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(8px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeIn {
          animation: fadeIn 0.2s ease-out forwards;
        }
      `}</style>
    </section>
  );
}
