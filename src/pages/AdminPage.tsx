import React, { useState, useEffect, useRef } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import CTABanner from '../components/CTABanner';
import { Edit, Trash2, Upload, Image as ImageIcon, Plus, X, ArrowLeft, Save, Sparkles, Check, Globe, Copy, ShieldAlert, Mail, AlertCircle, FileSpreadsheet, Car, Sliders, Clock, CheckCircle2, ShieldCheck, Search, ChevronDown, Tag, Bold, Italic, List, ListOrdered, BookOpen, User, Calendar, Zap, UserCheck } from 'lucide-react';
import { Link } from 'react-router-dom';
import { RentalCar } from '../data/inventory';
import { 
  fetchSaleCars, 
  fetchPendingSaleCars, 
  fetchRentalCars, 
  fetchPendingRentalCars,
  fetchDrivingBookings, 
  fetchCustomerRequests,
  approveSaleCarBackend,
  deleteSaleCarBackend,
  approveRentalCarBackend,
  deleteRentalCarBackend,
  updateDrivingBookingStatus,
  deleteDrivingBooking,
  updateCustomerRequestStatus,
  deleteCustomerRequest
} from '../lib/supabase';

interface BlogPost {
  id: string;
  title: string;
  author: string;
  imageUrl: string;
  content: string;
  date: string;
  authorAvatar?: string;
  authorRole?: string;
  imageAlt?: string;
  metaTitle?: string;
  metaDescription?: string;
  focusKeywords?: string;
  excerpt?: string;
  status?: 'Draft' | 'Published' | 'Scheduled';
  scheduledAt?: string;
}

interface BlogEditor {
  id: string;
  name: string;
  role: string;
  avatar: string;
  email: string;
  status: 'Active' | 'Inactive';
}

const PRESET_CAR_IMAGES = [
  {
    url: 'https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?auto=format&fit=crop&q=80&w=600',
    label: 'White Sedan (Honda Civic)'
  },
  {
    url: 'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&q=80&w=600',
    label: 'Silver Sedan (Toyota Yaris)'
  },
  {
    url: 'https://images.unsplash.com/photo-1542282088-fe8426682b8f?auto=format&fit=crop&q=80&w=600',
    label: 'Premium Blue Sedan (Elantra)'
  },
  {
    url: 'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?auto=format&fit=crop&q=80&w=600',
    label: 'Dark Luxury Sedan'
  },
  {
    url: 'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&q=80&w=600',
    label: 'Off-Road Compact SUV'
  },
  {
    url: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&q=80&w=600',
    label: 'Sleek Sports Coupe'
  }
];

const PRESET_IMAGES = [
  {
    url: 'https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?auto=format&fit=crop&q=80&w=600',
    label: 'Instructing Student'
  },
  {
    url: 'https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?auto=format&fit=crop&q=80&w=600',
    label: 'Steering Wheel & Dash'
  },
  {
    url: 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&q=80&w=600',
    label: 'Highway Practice'
  },
  {
    url: 'https://images.unsplash.com/photo-1510133768194-a81d2614a9a8?auto=format&fit=crop&q=80&w=600',
    label: 'Car Key & Driving'
  },
  {
    url: 'https://images.unsplash.com/photo-1580273916550-e323be2ae537?auto=format&fit=crop&q=80&w=600',
    label: 'Parallel Parking'
  },
  {
    url: 'https://images.unsplash.com/photo-1598257006458-087169a1f08d?auto=format&fit=crop&q=80&w=600',
    label: 'Driving Lesson'
  }
];

interface CustomerRequest {
  id: string;
  name: string;
  whatsapp: string;
  carModel: string;
  transmission: 'Automatic' | 'Manual' | 'Any';
  city: string;
  area: string;
  startDate: string;
  endDate: string;
  maxBudget: string;
  driverRequired: 'Yes' | 'No';
  status: 'pending' | 'live';
  createdAt: string;
  cnicDoc?: string;
  licenseDoc?: string;
  travelScope?: 'Within City (Local)' | 'Outstation (Long Trip)';
  fuelPreference?: 'Any Fuel' | 'Petrol' | 'Hybrid' | 'Diesel';
  urgency?: 'Standard' | 'Urgent';
  estimatedKM?: 'Under 500 KM' | '500 - 1500 KM' | '1500+ KM';
}

interface DrivingCourse {
  id: string;
  courseTitle: string;
  courseDescription: string;
  courseFee: string;
  carImage: string;
  lessonDuration: string;
  dailyTime: string;
  theoryDuration: string;
  coursePeriod: string;
  additionalTime: string;
}

const DEFAULT_DRIVING_COURSES: DrivingCourse[] = [
  {
    id: "course-1",
    courseTitle: "Basic Driving Course",
    courseDescription: "Excellent foundational course covering vital steering control, brake safety, and real-world road signals.",
    courseFee: "15000",
    carImage: "https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?auto=format&fit=crop&q=80&w=600",
    lessonDuration: "10 Driving Classes Included",
    dailyTime: "1,500 PKR Per Class Rate",
    theoryDuration: "35 Mins Practice Lesson",
    coursePeriod: "10 Days Training Duration",
    additionalTime: "Essential Signboard Theory"
  },
  {
    id: "course-2",
    courseTitle: "Standard Driving Course",
    courseDescription: "Our most popular training track covering parallel parking, reverse controls, and highway driving confidence.",
    courseFee: "20000",
    carImage: "https://images.unsplash.com/photo-1542282088-fe8426682b8f?auto=format&fit=crop&q=80&w=600",
    lessonDuration: "15 Driving Classes Included",
    dailyTime: "1,333 PKR Per Class Rate",
    theoryDuration: "35 Mins Practice Lesson",
    coursePeriod: "15 Days Training Duration",
    additionalTime: "Highway Session & Parking Guide"
  },
  {
    id: "course-3",
    courseTitle: "Premium Driving Course",
    courseDescription: "Complete masterclass including city grid navigation, night driving safety, and expert-level license exam preparation.",
    courseFee: "25000",
    carImage: "https://images.unsplash.com/photo-1617469767053-d3b508a0d825?auto=format&fit=crop&q=80&w=600",
    lessonDuration: "20 Driving Classes Included",
    dailyTime: "1,250 PKR Per Class Rate",
    theoryDuration: "35 Mins Practice Lesson",
    coursePeriod: "20 Days Complete Mastery Plan",
    additionalTime: "Full License Test Preparation"
  }
];

const DEFAULT_EDITORS: BlogEditor[] = [
  { id: 'editor-1', name: 'Taibe Javed', role: 'Head of Content', avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=120', email: 'taibejaved485@gmail.com', status: 'Active' },
  { id: 'editor-2', name: 'Arham Sohail', role: 'Chief Driving Coach', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=120', email: 'arham@godriveify.com', status: 'Active' },
  { id: 'editor-3', name: 'Ayesha Khan', role: 'Road Safety Officer', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=120', email: 'ayesha@godriveify.com', status: 'Active' }
];

export default function AdminPage() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [editingPostId, setEditingPostId] = useState<string | null>(null);
  const [newPost, setNewPost] = useState({ 
    title: '', 
    author: '', 
    imageUrl: '', 
    content: '', 
    authorAvatar: '', 
    authorRole: '',
    imageAlt: '',
    metaTitle: '',
    metaDescription: '',
    focusKeywords: '',
    excerpt: '',
    status: 'Draft' as 'Draft' | 'Published' | 'Scheduled',
    scheduledAt: ''
  });
  const [isDragging, setIsDragging] = useState(false);
  
  // Blog registered editors state
  const [blogEditors, setBlogEditors] = useState<BlogEditor[]>([]);
  const [isAddingEditor, setIsAddingEditor] = useState(false);
  const [newEditor, setNewEditor] = useState({ name: '', role: '', avatar: '', email: '', status: 'Active' as 'Active' | 'Inactive' });
  const [editorSearch, setEditorSearch] = useState('');
  const [blogSearchQuery, setBlogSearchQuery] = useState('');
  const [editorWorkspaceTab, setEditorWorkspaceTab] = useState<'write' | 'preview'>('write');
  const [editorAuthorSelectMode, setEditorAuthorSelectMode] = useState<'dropdown' | 'custom'>('dropdown');
  const [activeTab, setActiveTab] = useState<'bookings' | 'blogs' | 'dns' | 'rentals' | 'requests' | 'courses' | 'car-sales'>('bookings');
  const [copiedText, setCopiedText] = useState<string | null>(null);
  const [toastMessage, setToastMessage] = useState<{ text: string; type: 'success' | 'info' | 'error' } | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const carFileInputRef = useRef<HTMLInputElement>(null);
  const blogTextareaRef = useRef<HTMLTextAreaElement>(null);
  const wysiwygEditorRef = useRef<HTMLDivElement>(null);

  // Driving school course states
  const [drivingCourses, setDrivingCourses] = useState<DrivingCourse[]>([]);
  const [editingCourseId, setEditingCourseId] = useState<string | null>(null);
  const [newCourse, setNewCourse] = useState<Omit<DrivingCourse, 'id'>>({
    courseTitle: '',
    courseDescription: '',
    courseFee: '',
    carImage: '',
    lessonDuration: '30 Mins Driving Lesson',
    dailyTime: '40 min Per Day',
    theoryDuration: '10 min Theory Session',
    coursePeriod: '10 Days Course',
    additionalTime: 'Additional Time Available'
  });

  const showToast = (text: string, type: 'success' | 'info' | 'error' = 'success') => {
    setToastMessage({ text, type });
    setTimeout(() => {
      setToastMessage(null);
    }, 4500);
  };

  // Car Fleet State
  const [rentalCars, setRentalCars] = useState<RentalCar[]>([]);
  const [editingCarId, setEditingCarId] = useState<string | null>(null);
  const [newCar, setNewCar] = useState({
    name: '',
    transmission: 'Automatic' as 'Automatic' | 'Manual',
    rentPrice: '',
    rentUnit: 'Day' as 'Day' | 'Hour',
    imageUrl: '',
    city: 'Faisalabad',
    status: 'Available' as 'Available' | 'Booked',
    type: 'Sedan' as 'Economy' | 'Sedan' | 'Luxury',
    availabilityStatus: 'Available' as 'Available' | 'Rented Out'
  });

  // Driving Academy Bookings & Pending Onboard Cars State
  const [bookings, setBookings] = useState<any[]>([]);
  const [bookingSearch, setBookingSearch] = useState('');
  const [bookingStatusFilter, setBookingStatusFilter] = useState('All');
  const [pendingCars, setPendingCars] = useState<any[]>([]);
  const [pendingSaleCars, setPendingSaleCars] = useState<any[]>([]);
  const [saleCars, setSaleCars] = useState<any[]>([]);
  const [verifiedToggles, setVerifiedToggles] = useState<Record<string, boolean>>({});
  
  // Customer Requests State
  const [customerRequests, setCustomerRequests] = useState<CustomerRequest[]>([]);

  // Vault Modal State
  const [vaultSelectedDocs, setVaultSelectedDocs] = useState<{ cnic?: string, registration?: string, license?: string, title: string } | null>(null);

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedText(id);
    setTimeout(() => setCopiedText(null), 3000);
  };

  const purgeLocalStorage = () => {
    if (window.confirm("CRITICAL WARNING: This will permanently wipe all local application state (fleet listings, customer requests, and academy bookings). This action is non-reversible. Proceed with full system reset?")) {
      localStorage.clear();
      window.location.reload();
    }
  };

  const loadDataAndSync = () => {
    // 1. Load blog posts
    const savedPosts = localStorage.getItem('blogPosts');
    if (savedPosts) {
      try {
        const parsed = JSON.parse(savedPosts);
        if (Array.isArray(parsed)) {
          setPosts(parsed);
        } else {
          setPosts([]);
        }
      } catch (e) {
        setPosts([]);
      }
    }

    // 2. Load Driving School Bookings
    const savedBookings = localStorage.getItem('driving_bookings');
    if (savedBookings) {
      try {
        const parsed = JSON.parse(savedBookings);
        if (Array.isArray(parsed)) {
          setBookings(parsed);
        } else {
          setBookings([]);
        }
      } catch (err) {
        setBookings([]);
      }
    } else {
      setBookings([]);
    }
    // Fetch background from Supabase
    fetchDrivingBookings().then(data => {
      if (data && data.length > 0) {
        setBookings(data);
      }
    }).catch(() => {});

    // 3. Load Pending submitted owner cars
    const savedPending = localStorage.getItem('pending_cars');
    if (savedPending) {
      try {
        const parsed = JSON.parse(savedPending);
        if (Array.isArray(parsed)) {
          let updated = false;
          const sanitized = parsed.map((car, idx) => {
            if (!car.id) {
              car.id = 'owner-' + idx + '-' + Date.now().toString();
              updated = true;
            }
            return car;
          });
          if (updated) {
            localStorage.setItem('pending_cars', JSON.stringify(sanitized));
          }
          setPendingCars(sanitized);
        } else {
          setPendingCars([]);
        }
      } catch (err) {
        setPendingCars([]);
      }
    } else {
      setPendingCars([]);
    }
    fetchPendingRentalCars().then(data => {
      if (data) {
        setPendingCars(data);
      }
    }).catch(() => {});

    // Load Pending submitted sale cars
    const savedPendingSale = localStorage.getItem('pending_sale_cars');
    if (savedPendingSale) {
      try {
        const parsed = JSON.parse(savedPendingSale);
        if (Array.isArray(parsed)) {
          setPendingSaleCars(parsed);
        } else {
          setPendingSaleCars([]);
        }
      } catch (err) {
        setPendingSaleCars([]);
      }
    } else {
      setPendingSaleCars([]);
    }
    fetchPendingSaleCars().then(data => {
      if (data) {
        setPendingSaleCars(data);
      }
    }).catch(() => {});

    // Load Approved active sale cars
    const savedSaleCars = localStorage.getItem('sale_cars');
    if (savedSaleCars) {
      try {
        const parsed = JSON.parse(savedSaleCars);
        if (Array.isArray(parsed)) {
          setSaleCars(parsed);
        } else {
          setSaleCars([]);
        }
      } catch (err) {
        setSaleCars([]);
      }
    } else {
      setSaleCars([]);
    }
    fetchSaleCars().then(data => {
      if (data) {
        setSaleCars(data);
      }
    }).catch(() => {});

    // 4. Load approved active car fleet
    const savedCars = localStorage.getItem('rental_cars');
    let baseList: RentalCar[] = [];
    if (savedCars) {
      try {
        const parsed = JSON.parse(savedCars);
        if (Array.isArray(parsed)) {
          baseList = parsed;
        } else {
          baseList = [];
        }
      } catch (e) {
        baseList = [];
      }
    } else {
      baseList = [];
    }

    let approvedList: RentalCar[] = [];
    const savedApproved = localStorage.getItem('approved_cars');
    if (savedApproved) {
      try {
        const parsed = JSON.parse(savedApproved);
        if (Array.isArray(parsed)) {
          approvedList = parsed;
        }
      } catch (e) {
        approvedList = [];
      }
    }

    const merged = [...approvedList, ...baseList];
    const uniqueCars: RentalCar[] = [];
    const seenIds = new Set<string>();
    
    for (const car of merged) {
      if (!seenIds.has(car.id)) {
        seenIds.add(car.id);
        uniqueCars.push(car);
      }
    }
    setRentalCars(uniqueCars);

    // Try fetching rental cars from backend
    fetchRentalCars().then(data => {
      if (data && data.length > 0) {
        const uniqueBackend: RentalCar[] = [];
        const seenBackendIds = new Set<string>();
        for (const car of data) {
          if (!seenBackendIds.has(car.id)) {
            seenBackendIds.add(car.id);
            uniqueBackend.push(car);
          }
        }
        setRentalCars(uniqueBackend);
      }
    }).catch(() => {});

    // 5. Load Customer Requests
    const savedCustomerRequests = localStorage.getItem('customer_requests');
    if (savedCustomerRequests) {
      try {
        const parsed = JSON.parse(savedCustomerRequests);
        if (Array.isArray(parsed)) {
          setCustomerRequests(parsed);
        } else {
          setCustomerRequests([]);
        }
      } catch (err) {
        setCustomerRequests([]);
      }
    } else {
      setCustomerRequests([]);
    }
    fetchCustomerRequests().then(data => {
      if (data) {
        setCustomerRequests(data);
      }
    }).catch(() => {});

    // 6. Load Driving Courses Registry
    const savedCourses = localStorage.getItem('driving_courses_v4');
    if (savedCourses) {
      try {
        const parsed = JSON.parse(savedCourses);
        if (Array.isArray(parsed) && parsed.length > 0) {
          setDrivingCourses(parsed);
        } else {
          setDrivingCourses(DEFAULT_DRIVING_COURSES);
        }
      } catch (err) {
        setDrivingCourses(DEFAULT_DRIVING_COURSES);
      }
    } else {
      setDrivingCourses(DEFAULT_DRIVING_COURSES);
      localStorage.setItem('driving_courses_v4', JSON.stringify(DEFAULT_DRIVING_COURSES));
    }

    // 7. Load Blog Editors Directory
    const savedEditors = localStorage.getItem('blog_editors');
    if (savedEditors) {
      try {
        const parsed = JSON.parse(savedEditors);
        if (Array.isArray(parsed) && parsed.length > 0) {
          setBlogEditors(parsed);
        } else {
          setBlogEditors(DEFAULT_EDITORS);
          localStorage.setItem('blog_editors', JSON.stringify(DEFAULT_EDITORS));
        }
      } catch (err) {
        setBlogEditors(DEFAULT_EDITORS);
      }
    } else {
      setBlogEditors(DEFAULT_EDITORS);
      localStorage.setItem('blog_editors', JSON.stringify(DEFAULT_EDITORS));
    }
  };

  useEffect(() => {
    loadDataAndSync();
    
    // Cross-tab real-time sync listeners
    window.addEventListener('storage', loadDataAndSync);
    window.addEventListener('driving_bookings_updated', loadDataAndSync);
    window.addEventListener('pending_cars_updated', loadDataAndSync);
    window.addEventListener('pending_sale_cars_updated', loadDataAndSync);
    window.addEventListener('sale_cars_updated', loadDataAndSync);
    window.addEventListener('customer_requests_updated', loadDataAndSync);
    window.addEventListener('driving_courses_updated', loadDataAndSync);
    window.addEventListener('blog_editors_updated', loadDataAndSync);
    
    // Background polling interval for extra visual reactivity safety (every 3s)
    const syncInterval = setInterval(loadDataAndSync, 3000);
    
    return () => {
      window.removeEventListener('storage', loadDataAndSync);
      window.removeEventListener('driving_bookings_updated', loadDataAndSync);
      window.removeEventListener('pending_cars_updated', loadDataAndSync);
      window.removeEventListener('pending_sale_cars_updated', loadDataAndSync);
      window.removeEventListener('sale_cars_updated', loadDataAndSync);
      window.removeEventListener('customer_requests_updated', loadDataAndSync);
      window.removeEventListener('driving_courses_updated', loadDataAndSync);
      window.removeEventListener('blog_editors_updated', loadDataAndSync);
      clearInterval(syncInterval);
    };
  }, []);

  // Handler methods for Driving Academy Bookings
  const changeBookingStatus = async (id: string, newStatus: string) => {
    const updated = bookings.map(b => b.id === id ? { ...b, status: newStatus } : b);
    setBookings(updated);
    localStorage.setItem('driving_bookings', JSON.stringify(updated));
    window.dispatchEvent(new Event('driving_bookings_updated'));
    window.dispatchEvent(new Event('storage'));

    await updateDrivingBookingStatus(id, newStatus);
    loadDataAndSync();
  };

  const removeBookingRecord = async (id: string) => {
    if (window.confirm('Are you sure you want to permanently delete this scheduling request?')) {
      const updated = bookings.filter(b => String(b.id) !== String(id));
      setBookings(updated);
      localStorage.setItem('driving_bookings', JSON.stringify(updated));
      window.dispatchEvent(new Event('driving_bookings_updated'));
      window.dispatchEvent(new Event('storage'));

      await deleteDrivingBooking(id);
      showToast('Booking record removed.', 'info');
      loadDataAndSync();
    }
  };

  const getStudentWhatsAppLink = (b: any) => {
    const defaultPhone = '923097666928'; // fallback
    let rawPhone = b.phone || defaultPhone;
    let cleanNumber = rawPhone.replace(/[^0-9]/g, '');
    if (cleanNumber.startsWith('0')) {
      cleanNumber = '92' + cleanNumber.substring(1);
    }
    
    // Construct pre-filled dynamic message depending on booker current status
    let messageText = '';
    if (b.status === 'Confirmed') {
      messageText = `===============================\n  🚗 GODRIVEIFY TRAINING UPDATE  \n===============================\n\nAssalam-o-Alaikum ${b.fullName}!\n\nWe are pleased to inform you that your registration appointment for "${b.subject}" at GoDriveify Academy has been officially CONFIRMED!\n\nOur certified instructor will cooperate with you soon on the scheduled slot timings.\n\nThank you for choosing GoDriveify!`;
    } else if (b.status === 'Rescheduled') {
      messageText = `===============================\n  🚗 GODRIVEIFY TIMING RESCHEDULE  \n===============================\n\nAssalam-o-Alaikum ${b.fullName}!\n\nRegarding your lesson appointment for "${b.subject}", we need to modify or reschedule the timing slot. Kindly send us your available hourly timings so we can configure your calendar!`;
    } else if (b.status === 'Cancelled') {
      messageText = `===============================\n  🚗 GODRIVEIFY LESSON CANCELLED  \n===============================\n\nAssalam-o-Alaikum ${b.fullName}!\n\nYour appointment/booking for "${b.subject}" has been cancelled due to slot non-availability. Please share alternate timing slots so we can accommodate your schedule!`;
    } else {
      messageText = `===============================\n  🚗 GODRIVEIFY ENROLLMENT INQUIRY \n===============================\n\nAssalam-o-Alaikum ${b.fullName}!\n\nThank you for registering for "${b.subject}" with GoDriveify Academy! We have received your enrollment and are checking instructor slots. Let's arrange your timing plan!`;
    }
    
    return `https://wa.me/${cleanNumber}?text=${encodeURIComponent(messageText)}`;
  };

  // Handler methods for Car Owner Registration Onboarding
  const approveCarOnboarding = async (car: any, isVerified: boolean = false) => {
    const cardId = `pending-card-${car.id}`;
    const cardEl = document.getElementById(cardId);
    const btnEl = document.getElementById(`btn-approve-${car.id}`);

    // Create a micro-state change feedback right before the card disappears.
    if (cardEl) {
      cardEl.classList.remove('border-gray-200', 'hover:border-gray-300');
      cardEl.classList.add('border-emerald-500', 'ring-4', 'ring-emerald-500/20', 'bg-emerald-50/30');
      cardEl.style.transition = 'all 0.6s ease-in-out';
      cardEl.style.opacity = '0';
      cardEl.style.transform = 'scale(0.95)';
    }

    if (btnEl) {
      btnEl.innerHTML = '✓ Approved';
      btnEl.classList.remove('bg-green-600', 'hover:bg-green-700');
      btnEl.classList.add('bg-emerald-600', 'hover:bg-emerald-600');
      btnEl.style.transition = 'all 0.3s ease-in-out';
    }

    showToast(`Vehicle approved successfully! "${car.name}" is now live on the public fleet directory.`, 'success');

    await approveRentalCarBackend(car.id);

    setTimeout(() => {
      // 1. Save to approved cars
      const savedCustomApproved = localStorage.getItem('approved_cars');
      let customApprovedList: any[] = [];
      if (savedCustomApproved) {
        try {
          const parsed = JSON.parse(savedCustomApproved);
          if (Array.isArray(parsed)) {
            customApprovedList = parsed;
          }
        } catch (e) {}
      }
      
      const vettedCar: RentalCar = {
        ...car,
        id: car.id || 'owner-' + Date.now().toString(),
        status: 'Available' as const,
        isVerified: isVerified,
        type: car.type || 'Sedan',
        availabilityStatus: car.availabilityStatus || 'Available'
      };
      
      customApprovedList = [vettedCar, ...customApprovedList.filter(c => c.id !== vettedCar.id)];
      localStorage.setItem('approved_cars', JSON.stringify(customApprovedList));

      // 2. Insert into basic rental_cars fleet too of local storage
      const savedActiveFleet = localStorage.getItem('rental_cars');
      let activeFleet: any[] = [];
      if (savedActiveFleet) {
        try {
          const parsed = JSON.parse(savedActiveFleet);
          if (Array.isArray(parsed)) {
            activeFleet = parsed;
          }
        } catch (e) {}
      }
      activeFleet = [vettedCar, ...activeFleet.filter(c => c.id !== vettedCar.id)];
      localStorage.setItem('rental_cars', JSON.stringify(activeFleet));

      // 3. Delete from pending
      setPendingCars(prev => {
        const remainingPending = prev.filter(c => c.id !== car.id);
        localStorage.setItem('pending_cars', JSON.stringify(remainingPending));
        return remainingPending;
      });

      window.dispatchEvent(new Event('pending_cars_updated'));
      window.dispatchEvent(new Event('storage'));
      loadDataAndSync();
    }, 750);
  };

  const rejectCarOnboarding = async (id: string) => {
    if (window.confirm('Reject and permanently discard this owner submission?')) {
      setPendingCars(prev => {
        const remainingPending = prev.filter(c => c.id !== id);
        localStorage.setItem('pending_cars', JSON.stringify(remainingPending));
        return remainingPending;
      });
      
      await deleteRentalCarBackend(id);

      window.dispatchEvent(new Event('pending_cars_updated'));
      window.dispatchEvent(new Event('storage'));
      loadDataAndSync();
    }
  };

  const approveSaleCarOnboarding = async (car: any) => {
    const cardId = `pending-sale-card-${car.id}`;
    const cardEl = document.getElementById(cardId);
    const btnEl = document.getElementById(`btn-approve-sale-${car.id}`);

    if (cardEl) {
      cardEl.classList.remove('border-gray-200', 'hover:border-gray-300');
      cardEl.classList.add('border-emerald-500', 'ring-4', 'ring-emerald-500/20', 'bg-emerald-50/30');
      cardEl.style.transition = 'all 0.6s ease-in-out';
      cardEl.style.opacity = '0';
      cardEl.style.transform = 'scale(0.95)';
    }

    if (btnEl) {
      btnEl.innerHTML = '✓ Approved';
      btnEl.classList.remove('bg-green-600', 'hover:bg-green-700');
      btnEl.classList.add('bg-emerald-600', 'hover:bg-emerald-600');
    }

    showToast(`Car sale submission approved! "${car.name}" is now live on the public Car Sale page.`, 'success');

    await approveSaleCarBackend(car.id);

    setTimeout(() => {
      // 1. Save to approved sale cars
      const savedSaleCars = localStorage.getItem('sale_cars');
      let customSaleList: any[] = [];
      if (savedSaleCars) {
        try {
          const parsed = JSON.parse(savedSaleCars);
          if (Array.isArray(parsed)) {
            customSaleList = parsed;
          }
        } catch (e) {}
      }
      
      const vettedCar = {
        ...car,
        id: car.id || 'sale-' + Date.now().toString(),
        approved: true
      };
      
      customSaleList = [vettedCar, ...customSaleList.filter(c => c.id !== vettedCar.id)];
      localStorage.setItem('sale_cars', JSON.stringify(customSaleList));

      // 2. Delete from pending sale cars
      setPendingSaleCars(prev => {
        const remainingPending = prev.filter(c => c.id !== car.id);
        localStorage.setItem('pending_sale_cars', JSON.stringify(remainingPending));
        return remainingPending;
      });

      window.dispatchEvent(new Event('sale_cars_updated'));
      window.dispatchEvent(new Event('pending_sale_cars_updated'));
      window.dispatchEvent(new Event('storage'));
      loadDataAndSync();
    }, 750);
  };

  const rejectSaleCarOnboarding = async (id: string) => {
    if (window.confirm('Reject and permanently discard this sale owner submission?')) {
      setPendingSaleCars(prev => {
        const remainingPending = prev.filter(c => c.id !== id);
        localStorage.setItem('pending_sale_cars', JSON.stringify(remainingPending));
        return remainingPending;
      });
      
      await deleteSaleCarBackend(id);

      window.dispatchEvent(new Event('pending_sale_cars_updated'));
      window.dispatchEvent(new Event('storage'));
      loadDataAndSync();
    }
  };

  const deleteApprovedSaleCar = async (id: string) => {
    if (window.confirm('Are you sure you want to permanently delete this sale car listing?')) {
      const savedSaleCars = localStorage.getItem('sale_cars');
      if (savedSaleCars) {
        try {
          const parsed = JSON.parse(savedSaleCars);
          if (Array.isArray(parsed)) {
            const updated = parsed.filter((c: any) => c.id !== id);
            localStorage.setItem('sale_cars', JSON.stringify(updated));
            setSaleCars(updated);
          }
        } catch (e) {}
      }

      await deleteSaleCarBackend(id);

      showToast('Sale car deleted successfully.', 'info');
      window.dispatchEvent(new Event('sale_cars_updated'));
      window.dispatchEvent(new Event('storage'));
      loadDataAndSync();
    }
  };

  // Handler methods for Customer Rental Requests
  const handleApproveRequest = async (id: string) => {
    const updated = customerRequests.map(r => r.id === id ? { ...r, status: 'live' as const } : r);
    setCustomerRequests(updated);
    localStorage.setItem('customer_requests', JSON.stringify(updated));
    window.dispatchEvent(new Event('customer_requests_updated'));
    window.dispatchEvent(new Event('storage'));

    await updateCustomerRequestStatus(id, 'live');
    loadDataAndSync();
  };

  const handleRejectRequest = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this customer request?')) {
      const saved = localStorage.getItem('customer_requests');
      if (saved) {
        try {
          const parsed = JSON.parse(saved);
          if (Array.isArray(parsed)) {
            const updated = parsed.filter(r => String(r.id) !== String(id));
            setCustomerRequests(updated);
            localStorage.setItem('customer_requests', JSON.stringify(updated));
            showToast('Customer request deleted.', 'info');
            window.dispatchEvent(new Event('customer_requests_updated'));
            window.dispatchEvent(new Event('storage'));
          }
        } catch (e) {}
      }

      await deleteCustomerRequest(id);
      loadDataAndSync();
    }
  };


  const handleCarImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        if (typeof reader.result === 'string') {
          setNewCar(prev => ({ ...prev, imageUrl: reader.result as string }));
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const startEditingCar = (car: RentalCar) => {
    setEditingCarId(car.id);
    setNewCar({
      name: car.name,
      transmission: car.transmission as 'Automatic' | 'Manual',
      rentPrice: car.rentPrice.replace(/,/g, ''),
      rentUnit: (car.rentUnit || 'Day') as 'Day' | 'Hour',
      imageUrl: car.imageUrl || '',
      city: car.city || 'Faisalabad',
      status: car.status as 'Available' | 'Booked',
      type: car.type || 'Sedan',
      availabilityStatus: car.availabilityStatus || 'Available'
    });
    // Scroll to the top where the form is
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const cancelEditingCar = () => {
    setEditingCarId(null);
    setNewCar({
      name: '',
      transmission: 'Automatic',
      rentPrice: '',
      rentUnit: 'Day',
      imageUrl: '',
      city: 'Faisalabad',
      status: 'Available',
      type: 'Sedan',
      availabilityStatus: 'Available'
    });
    if (carFileInputRef.current) carFileInputRef.current.value = '';
  };

  const addRentalCar = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCar.name || !newCar.rentPrice || !newCar.city) {
      showToast('Please fill out the name, rent price, and city fields.', 'error');
      return;
    }

    const cleanPrice = newCar.rentPrice.replace(/,/g, '').trim();
    const priceNum = parseFloat(cleanPrice);
    if (isNaN(priceNum)) {
      showToast('Please enter a valid rental price.', 'error');
      return;
    }

    const finalPrice = priceNum.toLocaleString();

    let updated: RentalCar[];
    
    if (editingCarId) {
      updated = rentalCars.map(car => 
        car.id === editingCarId 
          ? {
              ...car,
              name: newCar.name,
              transmission: newCar.transmission,
              rentPrice: finalPrice,
              rentUnit: newCar.rentUnit,
              imageUrl: newCar.imageUrl || car.imageUrl || PRESET_CAR_IMAGES[0].url,
              city: newCar.city,
              status: newCar.status,
              type: newCar.type,
              availabilityStatus: newCar.availabilityStatus,
            }
          : car
      );
      showToast('Rental vehicle updated successfully!', 'success');
    } else {
      const carId = 'rc-' + Date.now().toString();
      const finalCar: RentalCar = {
        id: carId,
        name: newCar.name,
        transmission: newCar.transmission,
        rentPrice: finalPrice,
        rentUnit: newCar.rentUnit,
        imageUrl: newCar.imageUrl || PRESET_CAR_IMAGES[0].url,
        city: newCar.city,
        status: newCar.status,
        type: newCar.type,
        availabilityStatus: newCar.availabilityStatus,
        isVerified: false
      };
      updated = [finalCar, ...rentalCars];
      showToast('Rental vehicle added to fleet!', 'success');
    }

    setRentalCars(updated);
    localStorage.setItem('rental_cars', JSON.stringify(updated));
    
    // Trigger a window sync event for other routes
    window.dispatchEvent(new Event('storage'));

    cancelEditingCar();
  };

  const deleteRentalCar = (id: string) => {
    if (window.confirm('Are you sure you want to remove this car from the fleet?')) {
      // 1. Get current base fleet (ensuring we use defaults if key is missing/null)
      const savedCars = localStorage.getItem('rental_cars');
      let currentBase: RentalCar[] = [];
      if (savedCars) {
        try {
          const parsed = JSON.parse(savedCars);
          if (Array.isArray(parsed)) currentBase = parsed;
        } catch (e) {}
      }
      const updatedBase = currentBase.filter(c => String(c.id) !== String(id));
      localStorage.setItem('rental_cars', JSON.stringify(updatedBase));

      // 2. Update approved_cars key (owner-submitted fleet)
      const savedApproved = localStorage.getItem('approved_cars');
      if (savedApproved) {
        try {
          const parsed = JSON.parse(savedApproved);
          if (Array.isArray(parsed)) {
            const updatedApproved = parsed.filter(c => String(c.id) !== String(id));
            localStorage.setItem('approved_cars', JSON.stringify(updatedApproved));
          }
        } catch (e) {}
      }

      showToast('Vehicle removed from inventory.', 'info');
      window.dispatchEvent(new Event('storage'));
      window.dispatchEvent(new Event('pending_cars_updated'));
      
      // Refresh local state lists instantly
      loadDataAndSync();
    }
  };

  const toggleCarStatus = (id: string, newStatusOverride?: 'Available' | 'Rented Out') => {
    // Helper to toggle in a specific storage key
    const toggleInStorage = (key: string) => {
      const saved = localStorage.getItem(key);
      if (saved) {
        try {
          const parsed = JSON.parse(saved);
          if (Array.isArray(parsed)) {
            const updated = parsed.map(c => {
              if (String(c.id) === String(id)) {
                // If override provided, use it. Otherwise toggle standard status.
                if (newStatusOverride) {
                  return { 
                    ...c, 
                    availabilityStatus: newStatusOverride,
                    status: newStatusOverride === 'Available' ? 'Available' : 'Booked'
                  };
                }
                const isCurrentlyAvailable = (c.availabilityStatus || c.status) === 'Available';
                const nextStatus = isCurrentlyAvailable ? 'Rented Out' : 'Available';
                return { 
                  ...c, 
                  availabilityStatus: nextStatus as 'Available' | 'Rented Out',
                  status: nextStatus === 'Available' ? 'Available' : 'Booked'
                };
              }
              return c;
            });
            localStorage.setItem(key, JSON.stringify(updated));
          }
        } catch (e) {}
      }
    };

    toggleInStorage('rental_cars');
    toggleInStorage('approved_cars');

    window.dispatchEvent(new Event('storage'));
    window.dispatchEvent(new Event('pending_cars_updated'));
    
    // Refresh local state lists instantly
    loadDataAndSync();
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (username === 'admin' && password === 'admin123') {
      setIsLoggedIn(true);
    } else {
      showToast('Invalid credentials! Default is admin / admin123', 'error');
    }
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        if (typeof reader.result === 'string') {
          setNewPost(prev => ({ 
            ...prev, 
            imageUrl: reader.result as string,
            imageAlt: file.name.split('.')[0].replace(/[-_]/g, ' ')
          }));
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onloadend = () => {
        if (typeof reader.result === 'string') {
          setNewPost(prev => ({ 
            ...prev, 
            imageUrl: reader.result as string,
            imageAlt: file.name.split('.')[0].replace(/[-_]/g, ' ')
          }));
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const markdownToHtml = (markdown: string): string => {
    if (!markdown) return '';
    return markdown
      .split('\n')
      .map(line => {
        const trimmed = line.trim();
        if (!trimmed) return '<p><br></p>';
        
        // Unordered list item
        if (trimmed.startsWith('- ')) {
          const content = trimmed.substring(2);
          const parsed = content
            .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
            .replace(/\*(.*?)\*/g, '<em>$1</em>');
          return `<ul><li>${parsed}</li></ul>`;
        }
        
        // Ordered list item
        if (/^\d+\.\s/.test(trimmed)) {
          const content = trimmed.replace(/^\d+\.\s/, '');
          const parsed = content
            .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
            .replace(/\*(.*?)\*/g, '<em>$1</em>');
          return `<ol><li>${parsed}</li></ol>`;
        }
        
        // Blockquote
        if (trimmed.startsWith('> ')) {
          const content = trimmed.substring(2);
          const parsed = content
            .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
            .replace(/\*(.*?)\*/g, '<em>$1</em>');
          return `<blockquote>${parsed}</blockquote>`;
        }
        
        // Heading 1 (##)
        if (trimmed.startsWith('## ')) {
          const content = trimmed.substring(3);
          const parsed = content
            .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
            .replace(/\*(.*?)\*/g, '<em>$1</em>');
          return `<h2>${parsed}</h2>`;
        }
        
        // Heading 2 (###)
        if (trimmed.startsWith('### ')) {
          const content = trimmed.substring(4);
          const parsed = content
            .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
            .replace(/\*(.*?)\*/g, '<em>$1</em>');
          return `<h3>${parsed}</h3>`;
        }
        
        // Regular paragraph or plain line
        const parsed = line
          .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
          .replace(/\*(.*?)\*/g, '<em>$1</em>');
        return `<p>${parsed}</p>`;
      })
      .join('');
  };

  const htmlToMarkdown = (html: string): string => {
    if (!html) return '';
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = html;
    const lines: string[] = [];

    const traverse = (node: Node) => {
      if (node.nodeType === Node.ELEMENT_NODE) {
        const el = node as HTMLElement;
        const tagName = el.tagName.toUpperCase();

        if (tagName === 'H1' || tagName === 'H2') {
          lines.push(`## ${cleanInlineStyles(el.innerHTML)}`);
        } else if (tagName === 'H3' || tagName === 'H4') {
          lines.push(`### ${cleanInlineStyles(el.innerHTML)}`);
        } else if (tagName === 'BLOCKQUOTE') {
          lines.push(`> ${cleanInlineStyles(el.innerHTML)}`);
        } else if (tagName === 'LI') {
          const parentTag = el.parentElement?.tagName.toUpperCase();
          if (parentTag === 'OL') {
            lines.push(`1. ${cleanInlineStyles(el.innerHTML)}`);
          } else {
            lines.push(`- ${cleanInlineStyles(el.innerHTML)}`);
          }
        } else if (tagName === 'P' || tagName === 'DIV') {
          const innerHTML = el.innerHTML;
          if (innerHTML === '<br>' || innerHTML === '') {
            lines.push('');
          } else {
            const hasBlockChildren = Array.from(el.children).some(child => 
              ['P', 'DIV', 'H1', 'H2', 'H3', 'H4', 'UL', 'OL', 'LI'].includes(child.tagName.toUpperCase())
            );
            if (hasBlockChildren) {
              Array.from(el.childNodes).forEach(traverse);
            } else {
              lines.push(cleanInlineStyles(innerHTML));
            }
          }
        } else if (tagName === 'UL' || tagName === 'OL') {
          Array.from(el.childNodes).forEach(traverse);
        } else if (['STRONG', 'B', 'EM', 'I', 'SPAN'].includes(tagName)) {
          const textVal = cleanInlineStyles(el.outerHTML);
          if (textVal) lines.push(textVal);
        } else {
          const hasBlockChildren = Array.from(el.children).some(child => 
            ['P', 'DIV', 'H1', 'H2', 'H3', 'H4', 'UL', 'OL', 'LI'].includes(child.tagName.toUpperCase())
          );
          if (hasBlockChildren) {
            Array.from(el.childNodes).forEach(traverse);
          } else {
            const textVal = cleanInlineStyles(el.innerHTML);
            if (textVal) lines.push(textVal);
          }
        }
      } else if (node.nodeType === Node.TEXT_NODE) {
        const text = node.nodeValue;
        if (text && text.trim()) {
          lines.push(text.trim());
        }
      }
    };

    const cleanInlineStyles = (contents: string): string => {
      let text = contents;
      text = text.replace(/<strong[^>]*>(.*?)<\/strong>/gi, '**$1**');
      text = text.replace(/<b[^>]*>(.*?)<\/b>/gi, '**$1**');
      text = text.replace(/<em[^>]*>(.*?)<\/em>/gi, '*$1*');
      text = text.replace(/<i[^>]*>(.*?)<\/i>/gi, '*$1*');
      text = text.replace(/<[^>]*>/g, '');
      text = text
        .replace(/&nbsp;/g, ' ')
        .replace(/&amp;/g, '&')
        .replace(/&lt;/g, '<')
        .replace(/&gt;/g, '>');
      return text.trim();
    };

    Array.from(tempDiv.childNodes).forEach(traverse);
    return lines.join('\n');
  };

  const updateWysiwygContent = (markdown: string) => {
    if (wysiwygEditorRef.current) {
      wysiwygEditorRef.current.innerHTML = markdownToHtml(markdown);
    }
  };

  const startEdit = (post: BlogPost) => {
    setEditingPostId(post.id);
    setNewPost({
      title: post.title,
      author: post.author,
      imageUrl: post.imageUrl || '',
      content: post.content,
      authorAvatar: post.authorAvatar || '',
      authorRole: post.authorRole || '',
      imageAlt: post.imageAlt || '',
      metaTitle: post.metaTitle || '',
      metaDescription: post.metaDescription || '',
      focusKeywords: post.focusKeywords || '',
      excerpt: post.excerpt || '',
      status: post.status || 'Draft',
      scheduledAt: post.scheduledAt || ''
    });
    
    setTimeout(() => {
      updateWysiwygContent(post.content);
    }, 100);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const executeCommand = (command: string, arg: string = '') => {
    document.execCommand(command, false, arg);
    if (wysiwygEditorRef.current) {
      const mdValue = htmlToMarkdown(wysiwygEditorRef.current.innerHTML);
      setNewPost(prev => ({ ...prev, content: mdValue }));
    }
  };

  const formatBlock = (tag: string) => {
    let success = false;
    try {
      // 1. Try standard upper case tag (e.g., 'H2')
      success = document.execCommand('formatBlock', false, tag.toUpperCase());
    } catch (e) {
      console.warn('formatBlock tag uppercase failed, trying with angle brackets:', e);
    }

    if (!success) {
      try {
        // 2. Try angle brackets wrapping (e.g., '<h2>' or '<H2>')
        success = document.execCommand('formatBlock', false, `<${tag.toUpperCase()}>`);
      } catch (e) {
        try {
          // 3. Try fallback standard lowercase
          success = document.execCommand('formatBlock', false, tag.toLowerCase());
        } catch (err) {
          console.error('All formatBlock techniques failed:', err);
        }
      }
    }

    if (wysiwygEditorRef.current) {
      const mdValue = htmlToMarkdown(wysiwygEditorRef.current.innerHTML);
      setNewPost(prev => ({ ...prev, content: mdValue }));
    }
  };

  const insertTemplate = (text: string) => {
    const htmlToInsert = markdownToHtml(text);
    if (wysiwygEditorRef.current) {
      if (!wysiwygEditorRef.current.innerHTML || wysiwygEditorRef.current.innerHTML === '<p><br></p>') {
        wysiwygEditorRef.current.innerHTML = htmlToInsert;
      } else {
        wysiwygEditorRef.current.innerHTML += '<p><br></p>' + htmlToInsert;
      }
      const mdValue = htmlToMarkdown(wysiwygEditorRef.current.innerHTML);
      setNewPost(prev => ({ ...prev, content: mdValue }));
    }
  };

  const cancelEdit = () => {
    setEditingPostId(null);
    setNewPost({ 
      title: '', 
      author: '', 
      imageUrl: '', 
      content: '', 
      authorAvatar: '', 
      authorRole: '',
      imageAlt: '',
      metaTitle: '',
      metaDescription: '',
      focusKeywords: '',
      excerpt: '',
      status: 'Draft',
      scheduledAt: ''
    });
    if (wysiwygEditorRef.current) {
      wysiwygEditorRef.current.innerHTML = '';
    }
  };

  const parseBoldAndItalic = (text: string) => {
    const parts = text.split(/(\*\*.*?\*\*|\*.*?\*)/g);
    return parts.map((part, i) => {
      if (part.startsWith('**') && part.endsWith('**')) {
        return <strong key={i} className="font-extrabold text-slate-950">{part.slice(2, -2)}</strong>;
      }
      if (part.startsWith('*') && part.endsWith('*')) {
        return <em key={i} className="text-red-650 font-semibold italic">{part.slice(1, -1)}</em>;
      }
      return part;
    });
  };

  const renderPreviewBlogContent = (content: string) => {
    if (!content) return null;
    return content.split('\n').map((line, index) => {
      const trimmed = line.trim();
      if (!trimmed) return <div key={index} className="h-3" />;

      if (trimmed.startsWith('## ')) {
        return (
          <h3 key={index} className="text-xl md:text-2xl font-black text-slate-900 mt-6 mb-3 border-b border-gray-100 pb-1.5 font-sans">
            {trimmed.replace('## ', '')}
          </h3>
        );
      }

      if (trimmed.startsWith('### ')) {
        return (
          <h4 key={index} className="text-lg md:text-xl font-extrabold text-slate-800 mt-4 mb-2 font-sans">
            {trimmed.replace('### ', '')}
          </h4>
        );
      }

      if (trimmed.startsWith('> ')) {
        return (
          <blockquote key={index} className="border-l-4 border-[#FF5500] pl-4 italic text-[#002060] my-4 bg-slate-50/80 p-3.5 rounded-r-xl text-left font-sans text-sm md:text-base">
            {parseBoldAndItalic(trimmed.replace('> ', ''))}
          </blockquote>
        );
      }

      if (trimmed.startsWith('- ')) {
        return (
          <li key={index} className="ml-5 list-disc text-slate-705 my-1 pl-1 text-[13px] sm:text-sm leading-relaxed">
            {parseBoldAndItalic(trimmed.replace('- ', ''))}
          </li>
        );
      }

      if (/^\d+\.\s/.test(trimmed)) {
        const parts = trimmed.split(/^\d+\.\s/);
        return (
          <li key={index} className="ml-5 list-decimal text-slate-705 my-1 pl-1 text-[13px] sm:text-sm leading-relaxed">
            {parseBoldAndItalic(parts[1] || '')}
          </li>
        );
      }

      return (
        <p key={index} className="text-slate-600 text-[13px] sm:text-sm leading-relaxed mb-3 text-left font-normal font-sans">
          {parseBoldAndItalic(line)}
        </p>
      );
    });
  };

  const publishPost = (statusOverride?: 'Draft' | 'Published' | 'Scheduled') => {
    if (!newPost.title || !newPost.content) {
      showToast('Please fill out the Title and Content fields.', 'error');
      return;
    }

    const finalStatus = statusOverride || newPost.status || 'Draft';
    if (finalStatus === 'Scheduled' && !newPost.scheduledAt) {
      showToast('Please set an exact future Date & Time for scheduling!', 'error');
      return;
    }

    const finalImageUrl = newPost.imageUrl || PRESET_IMAGES[0].url;

    if (editingPostId) {
      const updatedPosts = posts.map(p => {
        if (p.id === editingPostId) {
          return {
            ...p,
            title: newPost.title,
            author: newPost.author || 'GoDriveify Team',
            imageUrl: finalImageUrl,
            content: newPost.content,
            authorAvatar: newPost.authorAvatar,
            authorRole: newPost.authorRole,
            imageAlt: newPost.imageAlt,
            metaTitle: newPost.metaTitle,
            metaDescription: newPost.metaDescription,
            focusKeywords: newPost.focusKeywords,
            excerpt: newPost.excerpt,
            status: finalStatus,
            scheduledAt: finalStatus === 'Scheduled' ? newPost.scheduledAt : ''
          };
        }
        return p;
      });
      setPosts(updatedPosts);
      localStorage.setItem('blogPosts', JSON.stringify(updatedPosts));
      setEditingPostId(null);
      showToast(`Post updated successfully as ${finalStatus === 'Draft' ? 'Draft' : finalStatus}!`, 'success');
    } else {
      const post: BlogPost = {
        title: newPost.title,
        author: newPost.author || 'GoDriveify Team',
        imageUrl: finalImageUrl,
        content: newPost.content,
        id: Date.now().toString(),
        date: new Date().toLocaleDateString(),
        authorAvatar: newPost.authorAvatar,
        authorRole: newPost.authorRole,
        imageAlt: newPost.imageAlt,
        metaTitle: newPost.metaTitle,
        metaDescription: newPost.metaDescription,
        focusKeywords: newPost.focusKeywords,
        excerpt: newPost.excerpt,
        status: finalStatus,
        scheduledAt: finalStatus === 'Scheduled' ? newPost.scheduledAt : ''
      };
      const updatedPosts = [post, ...posts]; // Add new posts at the top
      setPosts(updatedPosts);
      localStorage.setItem('blogPosts', JSON.stringify(updatedPosts));
      showToast(`Post saved successfully as ${finalStatus === 'Draft' ? 'Draft' : finalStatus}!`, 'success');
    }

    // Reset post form
    setNewPost({ 
      title: '', 
      author: '', 
      imageUrl: '', 
      content: '', 
      authorAvatar: '', 
      authorRole: '',
      imageAlt: '',
      metaTitle: '',
      metaDescription: '',
      focusKeywords: '',
      excerpt: '',
      status: 'Draft',
      scheduledAt: ''
    });
    
    if (wysiwygEditorRef.current) {
      wysiwygEditorRef.current.innerHTML = '';
    }
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const handleAutoGenerateSEO = () => {
    if (!newPost.content && !newPost.title) {
      showToast('Please write some content or title first to run AI SEO generation!', 'error');
      return;
    }

    // 1. Strip HTML tags from markdown representation
    const temp = document.createElement('div');
    temp.innerHTML = markdownToHtml(newPost.content);
    let plainText = temp.textContent || temp.innerText || '';
    plainText = plainText.replace(/\n+/g, ' ').replace(/\s+/g, ' ').trim();

    // 2. Generate Excerpt & Meta Description (150-char summary)
    let excerptText = '';
    if (plainText) {
      excerptText = plainText.substring(0, 150).trim();
      if (plainText.length > 150) {
        excerptText += '...';
      }
    } else {
      excerptText = (newPost.title ? `Read our ultimate guide about ${newPost.title} for Pakistani drivers.` : '');
    }

    // 3. Generate Focus Keywords
    // Grab words, filter out stop words, count frequencies
    const words = plainText
      .toLowerCase()
      .replace(/[^\w\s\u0600-\u06FF]/g, '') // Keep English & Arabic/Urdu unicode chars
      .split(/\s+/);

    const stopWords = new Set([
      'the', 'is', 'at', 'which', 'on', 'and', 'a', 'an', 'to', 'in', 'of', 'for', 'with', 'this', 'our', 'your', 'we', 'you', 'are', 'be', 'that', 'from', 'by', 'as', 'it', 'or', 'has', 'have',
      'کا', 'کی', 'کے', 'سے', 'کو', 'میں', 'پر', 'اور', 'ہے', 'ہیں', 'تھا', 'تھی', 'تھے', 'گا', 'گی', 'گے', 'نہ', 'سب', 'یہ', 'وہ'
    ]);

    const keywordCounts: Record<string, number> = {};
    words.forEach(w => {
      if (w.length > 3 && !stopWords.has(w)) {
        keywordCounts[w] = (keywordCounts[w] || 0) + 1;
      }
    });

    const sortedKeywords = Object.keys(keywordCounts).sort((a, b) => keywordCounts[b] - keywordCounts[a]);
    const focusKeywords = sortedKeywords.slice(0, 5).join(', ');

    // 4. Generate Meta Title
    let metaTitleText = '';
    if (newPost.title) {
      const suffix = ' | GoDriveify';
      if (newPost.title.length + suffix.length <= 60) {
        metaTitleText = newPost.title + suffix;
      } else {
        metaTitleText = newPost.title.substring(0, 60 - suffix.length) + suffix;
      }
    }

    setNewPost(prev => ({
      ...prev,
      excerpt: excerptText,
      metaTitle: metaTitleText,
      metaDescription: excerptText.substring(0, 150),
      focusKeywords: focusKeywords
    }));

    showToast('AI Metadata & SEO tags generated instantly!', 'success');
  };

  // Blog Editor Operations
  const handleAddNewEditor = () => {
    if (!newEditor.name.trim() || !newEditor.role.trim()) {
      showToast('Please type both Editor Name and Role Designation!', 'error');
      return;
    }

    const finalEmail = newEditor.email.trim() || `${newEditor.name.toLowerCase().replace(/\s+/g, '')}@godriveify.com`;
    const finalAvatar = newEditor.avatar.trim() || 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=120';

    const createdEditor: BlogEditor = {
      id: `editor-${Date.now()}`,
      name: newEditor.name,
      role: newEditor.role,
      avatar: finalAvatar,
      email: finalEmail,
      status: newEditor.status || 'Active'
    };

    const updated = [...blogEditors, createdEditor];
    setBlogEditors(updated);
    localStorage.setItem('blog_editors', JSON.stringify(updated));
    window.dispatchEvent(new CustomEvent('blog_editors_updated', { detail: updated }));
    
    // reset state
    setNewEditor({ name: '', role: '', avatar: '', email: '', status: 'Active' });
    setIsAddingEditor(false);
    showToast(`Verification credential saved! Active roster: ${createdEditor.name}`, 'success');
  };

  const handleToggleEditorStatus = (id: string) => {
    const updated = blogEditors.map(editor => {
      if (editor.id === id) {
        const nextStatus = editor.status === 'Active' ? 'Inactive' : 'Active';
        showToast(`${editor.name} is now ${nextStatus}`, 'info');
        return { ...editor, status: nextStatus };
      }
      return editor;
    });
    setBlogEditors(updated);
    localStorage.setItem('blog_editors', JSON.stringify(updated));
    window.dispatchEvent(new CustomEvent('blog_editors_updated', { detail: updated }));
  };

  const handleDeleteEditor = (id: string, name: string) => {
    if (window.confirm(`Are you sure you want to permanently remove registered editor ${name}?`)) {
      const updated = blogEditors.filter(e => e.id !== id);
      setBlogEditors(updated);
      localStorage.setItem('blog_editors', JSON.stringify(updated));
      window.dispatchEvent(new CustomEvent('blog_editors_updated', { detail: updated }));
      showToast(`Removed editor: ${name}`, 'info');
    }
  };

  const deletePost = (id: string) => {
    if (window.confirm('Are you sure you want to delete this blog post?')) {
      const updatedPosts = posts.filter(p => String(p.id) !== String(id));
      setPosts(updatedPosts);
      localStorage.setItem('blogPosts', JSON.stringify(updatedPosts));
      showToast('Blog post deleted successfully.', 'info');
      if (editingPostId === id) {
        cancelEdit();
      }
    }
  };

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-red-50 to-gray-100 flex items-center justify-center p-4">
        <form onSubmit={handleLogin} className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-sm border border-red-100">
          <div className="text-center mb-8">
            <div className="bg-red-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 text-red-600">
              <Sparkles className="w-8 h-8" />
            </div>
            <h2 className="text-3xl font-black text-gray-900 tracking-tight">Admin Portal</h2>
            <p className="text-gray-500 mt-2">Access the hidden blog content manager</p>
          </div>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-1">Username</label>
              <input 
                type="text" 
                placeholder="e.g. admin" 
                className="w-full border border-gray-300 p-3 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none transition" 
                value={username} 
                onChange={e => setUsername(e.target.value)} 
              />
            </div>
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-1">Password</label>
              <input 
                type="password" 
                placeholder="••••••••" 
                className="w-full border border-gray-300 p-3 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none transition" 
                value={password} 
                onChange={e => setPassword(e.target.value)} 
              />
            </div>
          </div>
          
          <button className="w-full bg-red-600 hover:bg-red-700 text-white py-3.5 rounded-xl font-bold transition mt-6 tracking-wide shadow-md shadow-red-200">
            Secure Sign In
          </button>
          
          <div className="text-center mt-4">
            <Link to="/blog" className="text-xs text-gray-500 hover:text-red-600 flex items-center justify-center gap-1">
              <ArrowLeft className="w-3.5 h-3.5" /> Back to Blogs
            </Link>
          </div>
        </form>

        {toastMessage && (
          <div className="fixed z-50 bottom-6 right-6 max-w-sm w-full bg-slate-900 border border-slate-800 text-white rounded-2xl p-4 shadow-2xl flex items-start gap-3 animate-slide-up">
            <div className={`p-1.5 rounded-lg shrink-0 mt-0.5 ${
              toastMessage.type === 'success' ? 'bg-emerald-500/10 text-emerald-400' :
              toastMessage.type === 'error' ? 'bg-red-500/10 text-red-400' :
              'bg-blue-500/10 text-blue-400'
            }`}>
              {toastMessage.type === 'success' ? <Check className="w-5 h-5" /> :
               toastMessage.type === 'error' ? <AlertCircle className="w-5 h-5" /> :
               <Sparkles className="w-5 h-5" />}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs font-bold uppercase tracking-wider text-slate-400">
                System Notification
              </p>
              <p className="text-xs sm:text-sm font-semibold text-slate-100 mt-1 leading-relaxed">
                {toastMessage.text}
              </p>
            </div>
            <button 
              onClick={() => setToastMessage(null)}
              className="text-slate-500 hover:text-slate-300 p-1 rounded-lg transition"
              type="button"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50/50 flex flex-col">
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 flex-grow w-full">
        
        {/* Professional Header Panel */}
        <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 shadow-sm flex flex-col md:flex-row md:items-center md:justify-between gap-6 mb-8 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-red-500/5 rounded-full blur-[120px] pointer-events-none" />
          <div className="absolute -bottom-10 left-1/3 w-64 h-64 bg-slate-100 rounded-full blur-2xl pointer-events-none" />
          
          <div className="relative z-10">
            <div className="flex flex-wrap items-center gap-2 mb-3">
              <span className="bg-red-50 text-red-700 text-[10px] font-black uppercase tracking-wider px-2.5 py-1 rounded-full border border-red-100">
                SYSTEM OPERATOR PAGE
              </span>
              <span className="bg-slate-100 text-slate-800 text-[10px] font-black uppercase tracking-wider px-2.5 py-1 rounded-full border border-slate-200">
                ADMIN ENVIRONMENT
              </span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight leading-none">
              Administrative Control Board
            </h1>
            <p className="text-slate-500 text-xs sm:text-sm mt-2 font-medium max-w-2xl">
              Create, edit, manage, and audit local Faisalabad driving school curriculums, student registrations, rental marketplace vehicles, and content listings instantly.
            </p>
          </div>
          <div className="flex items-center gap-2 shrink-0 relative z-10 w-full md:w-auto">
            <Link 
              to="/blog" 
              className="w-full md:w-auto bg-slate-900 hover:bg-slate-800 text-white px-5 py-3 rounded-xl text-xs font-black uppercase tracking-widest text-center flex items-center justify-center gap-2 transition shadow-md shadow-slate-900/10"
            >
              <ArrowLeft className="w-4 h-4" /> Exit Board
            </Link>
            <button 
              onClick={purgeLocalStorage}
              className="p-3 bg-white border border-slate-200 text-slate-400 hover:text-red-650 hover:border-red-200 hover:bg-red-50 rounded-xl transition cursor-pointer shadow-sm shrink-0"
              title="Factory Reset LocalStorage State"
            >
              <Trash2 className="w-4.5 h-4.5" />
            </button>
          </div>
        </div>

        {/* Live System Diagnostics Rows */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <div className="bg-white border border-slate-200 p-5 rounded-2xl shadow-sm hover:shadow-md transition-all duration-200">
            <div className="flex items-center justify-between mb-2">
              <span className="text-slate-400 text-[10px] font-black uppercase tracking-wider">Bookings Registered</span>
              <div className="w-7 h-7 bg-red-50 rounded-lg flex items-center justify-center text-red-650">
                <FileSpreadsheet className="w-4 h-4" />
              </div>
            </div>
            <p className="text-2xl sm:text-3xl font-black text-slate-900 leading-none">
              {bookings.length}
            </p>
            <div className="text-[10px] text-emerald-600 font-extrabold mt-2 flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
              <span>Online submissions</span>
            </div>
          </div>

          <div className="bg-white border border-slate-200 p-5 rounded-2xl shadow-sm hover:shadow-md transition-all duration-200">
            <div className="flex items-center justify-between mb-2">
              <span className="text-slate-400 text-[10px] font-black uppercase tracking-wider">Fleet Approved</span>
              <div className="w-7 h-7 bg-blue-50 rounded-lg flex items-center justify-center text-blue-600">
                <Car className="w-4 h-4" />
              </div>
            </div>
            <p className="text-2xl sm:text-3xl font-black text-slate-900 leading-none">
              {rentalCars.length}
            </p>
            <div className="text-[10px] text-sky-600 font-extrabold mt-2 flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-sky-500 animate-pulse"></span>
              <span>Available rentals</span>
            </div>
          </div>

          <div className="bg-white border border-slate-200 p-5 rounded-2xl shadow-sm hover:shadow-md transition-all duration-200">
            <div className="flex items-center justify-between mb-2">
              <span className="text-slate-400 text-[10px] font-black uppercase tracking-wider">Verification Work</span>
              <div className="w-7 h-7 bg-amber-50 rounded-lg flex items-center justify-center text-amber-600">
                <Clock className="w-4 h-4" />
              </div>
            </div>
            <p className="text-2xl sm:text-3xl font-black text-slate-900 leading-none">
              {pendingCars.length + customerRequests.length}
            </p>
            <div className="text-[10px] text-amber-600 font-extrabold mt-2 flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse"></span>
              <span>Awaiting review</span>
            </div>
          </div>

          <div className="bg-white border border-slate-200 p-5 rounded-2xl shadow-sm hover:shadow-md transition-all duration-200">
            <div className="flex items-center justify-between mb-2">
              <span className="text-slate-400 text-[10px] font-black uppercase tracking-wider">Academy Curriculums</span>
              <div className="w-7 h-7 bg-purple-50 rounded-lg flex items-center justify-center text-purple-650">
                <Sliders className="w-4 h-4" />
              </div>
            </div>
            <p className="text-2xl sm:text-3xl font-black text-slate-900 leading-none">
              {drivingCourses.length}
            </p>
            <div className="text-[10px] text-purple-600 font-extrabold mt-2 flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-purple-500 animate-pulse"></span>
              <span>Active courses</span>
            </div>
          </div>
        </div>

        {/* Dynamic Multi-Column Master Workspace Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-12">
          
          {/* LEFT COMMAND SIDEBAR */}
          <div className="lg:col-span-3 space-y-4">
            <div className="bg-white border border-slate-200 rounded-2xl p-4 shadow-sm space-y-4">
              <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-2 border-b border-slate-100 pb-2">
                Operations Directory
              </h3>
              
              {/* Responsive Tab Buttons Stack */}
              <div className="flex flex-row lg:flex-col overflow-x-auto lg:overflow-x-visible gap-1.5 pb-2 lg:pb-0 scrollbar-none">
                <button
                  type="button"
                  onClick={() => setActiveTab('bookings')}
                  className={`w-full text-left flex items-center justify-between px-4 py-3 rounded-xl transition duration-200 shrink-0 lg:shrink whitespace-nowrap cursor-pointer ${
                    activeTab === 'bookings'
                      ? 'bg-red-700 text-white font-extrabold shadow-md shadow-red-700/10'
                      : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900 font-bold'
                  }`}
                >
                  <div className="flex items-center gap-2.5 text-xs sm:text-sm">
                    <FileSpreadsheet className="w-4 h-4" />
                    <span>Academy Bookings</span>
                  </div>
                  <span className={`text-[10px] px-2 py-0.5 rounded-md font-black min-w-5 text-center ${
                    activeTab === 'bookings' ? 'bg-white/20 text-white' : 'bg-slate-100 text-slate-600'
                  }`}>
                    {bookings.length}
                  </span>
                </button>

                <button
                  type="button"
                  onClick={() => setActiveTab('courses')}
                  className={`w-full text-left flex items-center justify-between px-4 py-3 rounded-xl transition duration-200 shrink-0 lg:shrink whitespace-nowrap cursor-pointer ${
                    activeTab === 'courses'
                      ? 'bg-red-700 text-white font-extrabold shadow-md shadow-red-700/10'
                      : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900 font-bold'
                  }`}
                >
                  <div className="flex items-center gap-2.5 text-xs sm:text-sm">
                    <Sliders className="w-4 h-4" />
                    <span>Academy Courses</span>
                  </div>
                  <span className={`text-[10px] px-2 py-0.5 rounded-md font-black min-w-5 text-center ${
                    activeTab === 'courses' ? 'bg-white/20 text-white' : 'bg-slate-100 text-slate-600'
                  }`}>
                    {drivingCourses.length}
                  </span>
                </button>

                <button
                  type="button"
                  onClick={() => setActiveTab('rentals')}
                  className={`w-full text-left flex items-center justify-between px-4 py-3 rounded-xl transition duration-200 shrink-0 lg:shrink whitespace-nowrap cursor-pointer ${
                    activeTab === 'rentals'
                      ? 'bg-red-700 text-white font-extrabold shadow-md shadow-red-700/10'
                      : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900 font-bold'
                  }`}
                >
                  <div className="flex items-center gap-2.5 text-xs sm:text-sm">
                    <Car className="w-4 h-4" />
                    <span>Rental Fleet</span>
                  </div>
                  <span className={`text-[10px] px-2 py-0.5 rounded-md font-black min-w-5 text-center ${
                    activeTab === 'rentals' ? 'bg-white/20 text-white' : 'bg-slate-100 text-slate-600'
                  }`}>
                    {rentalCars.length}
                  </span>
                </button>

                <button
                  type="button"
                  onClick={() => setActiveTab('requests')}
                  className={`w-full text-left flex items-center justify-between px-4 py-3 rounded-xl transition duration-200 shrink-0 lg:shrink whitespace-nowrap cursor-pointer ${
                    activeTab === 'requests'
                      ? 'bg-red-700 text-white font-extrabold shadow-md shadow-red-700/10'
                      : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900 font-bold'
                  }`}
                >
                  <div className="flex items-center gap-2.5 text-xs sm:text-sm">
                    <Clock className="w-4 h-4" />
                    <span>Market Requests</span>
                  </div>
                  <span className={`text-[10px] px-2 py-0.5 rounded-md font-black min-w-5 text-center ${
                    activeTab === 'requests' ? 'bg-white/20 text-white' : 'bg-slate-100 text-slate-600'
                  }`}>
                    {customerRequests.length}
                  </span>
                </button>

                <button
                  type="button"
                  onClick={() => setActiveTab('car-sales')}
                  className={`w-full text-left flex items-center justify-between px-4 py-3 rounded-xl transition duration-200 shrink-0 lg:shrink whitespace-nowrap cursor-pointer ${
                    activeTab === 'car-sales'
                      ? 'bg-red-700 text-white font-extrabold shadow-md shadow-red-700/10'
                      : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900 font-bold'
                  }`}
                >
                  <div className="flex items-center gap-2.5 text-xs sm:text-sm">
                    <Tag className="w-4 h-4" />
                    <span>Car Sales</span>
                  </div>
                  <span className={`text-[10px] px-2 py-0.5 rounded-md font-black min-w-5 text-center ${
                    activeTab === 'car-sales' ? 'bg-white/20 text-white' : 'bg-slate-100 text-slate-600'
                  }`}>
                    {pendingSaleCars.length}
                  </span>
                </button>

                <button
                  type="button"
                  onClick={() => setActiveTab('blogs')}
                  className={`w-full text-left flex items-center justify-between px-4 py-3 rounded-xl transition duration-200 shrink-0 lg:shrink whitespace-nowrap cursor-pointer ${
                    activeTab === 'blogs'
                      ? 'bg-red-700 text-white font-extrabold shadow-md shadow-red-700/10'
                      : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900 font-bold'
                  }`}
                >
                  <div className="flex items-center gap-2.5 text-xs sm:text-sm">
                    <Plus className="w-4 h-4" />
                    <span>Blogs Manager</span>
                  </div>
                  <span className={`text-[10px] px-2 py-0.5 rounded-md font-black min-w-5 text-center ${
                    activeTab === 'blogs' ? 'bg-white/20 text-white' : 'bg-slate-100 text-slate-600'
                  }`}>
                    {posts.length}
                  </span>
                </button>

                <button
                  type="button"
                  onClick={() => setActiveTab('dns')}
                  className={`w-full text-left flex items-center justify-between px-4 py-3 rounded-xl transition duration-200 shrink-0 lg:shrink whitespace-nowrap cursor-pointer ${
                    activeTab === 'dns'
                      ? 'bg-red-700 text-white font-extrabold shadow-md shadow-red-700/10'
                      : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900 font-bold'
                  }`}
                >
                  <div className="flex items-center gap-2.5 text-xs sm:text-sm">
                    <ShieldAlert className="w-4 h-4" />
                    <span>SEO & DNS</span>
                  </div>
                  <span className={`text-[10px] px-2 py-0.5 rounded-full font-black ${
                    activeTab === 'dns' ? 'bg-white/30 text-white' : 'bg-amber-100 text-amber-800'
                  }`}>
                    SSL
                  </span>
                </button>
              </div>
            </div>
          </div>

          {/* RIGHT WORKSPACE DISPLAY VIEWPORT */}
          <div className="lg:col-span-9 space-y-6">
            {activeTab === 'bookings' && (
              <div className="bg-white rounded-2xl border border-slate-200/90 shadow-sm p-6 sm:p-8 animate-fade-in space-y-6">
                <div className="border-b border-gray-100 pb-5">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div>
                      <h2 className="text-2xl font-black text-gray-900 tracking-tight flex items-center gap-2">
                        <FileSpreadsheet className="w-6 h-6 text-red-650" />
                        Manage Driving Academy Bookings (بکنگز مینیجر)
                  </h2>
                  <p className="text-gray-500 text-xs sm:text-sm mt-1">
                    Process incoming course submissions. Select appropriate status modes like Confirm, Reschedule, or Cancel to coordinate with driver education pupils.
                  </p>
                </div>
                
                {/* Metric Summary count badges */}
                <div className="flex gap-2">
                  <span className="bg-red-50 text-red-650 px-3.5 py-1.5 rounded-xl text-xs font-bold border border-red-100">
                    Total: {bookings.length}
                  </span>
                  <span className="bg-yellow-50 text-yellow-700 px-3.5 py-1.5 rounded-xl text-xs font-bold border border-yellow-100">
                    Awaiting: {bookings.filter(b => b.status === 'Pending').length}
                  </span>
                </div>
              </div>
            </div>

            {/* Search & Filter Controls */}
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 bg-gray-50 p-4 rounded-xl border border-gray-150">
              {/* Search text input */}
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search student, email, phone number, or course..."
                  value={bookingSearch}
                  onChange={(e) => setBookingSearch(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-250 rounded-xl focus:border-red-500 focus:ring-1 focus:ring-red-500 outline-none text-xs sm:text-sm bg-white text-gray-800 transition"
                />
                {bookingSearch && (
                  <button
                    onClick={() => setBookingSearch('')}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 font-bold"
                  >
                    ×
                  </button>
                )}
              </div>

              {/* Status categories badges */}
              <div className="flex gap-2 overflow-x-auto pb-1 lg:pb-0 scrollbar-none">
                {['All', 'Pending', 'Confirmed', 'Rescheduled', 'Cancelled'].map((status) => {
                  const isActive = bookingStatusFilter === status;
                  const count = status === 'All' 
                    ? bookings.length 
                    : bookings.filter(b => b.status === status).length;

                  return (
                    <button
                      key={status}
                      onClick={() => setBookingStatusFilter(status)}
                      className={`px-3 py-1.5 rounded-xl text-xs font-black min-w-[64px] transition cursor-pointer select-none text-center ${
                        isActive
                          ? 'bg-red-600 text-white shadow-sm'
                          : 'bg-white text-gray-650 hover:bg-gray-100 hover:text-gray-900 border border-gray-200'
                      }`}
                    >
                      {status}
                      <span className={`ml-1 text-[10px] ${isActive ? 'text-white/80' : 'text-gray-400'}`}>
                        ({count})
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {bookings.length === 0 ? (
              <div className="text-center py-20 bg-gray-50 rounded-2xl border border-dashed border-gray-200 p-6">
                <FileSpreadsheet className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                <h3 className="font-extrabold text-gray-850">No Bookings Recorded Yet</h3>
                <p className="text-xs text-gray-400 mt-1 max-w-sm mx-auto">
                  When visitors submit timing slots via the academy "Get Appointments" form on the homepage, listings will populate right here.
                </p>
              </div>
            ) : (() => {
              const filteredBookings = bookings.filter((b) => {
                if (bookingStatusFilter !== 'All' && b.status !== bookingStatusFilter) {
                  return false;
                }
                if (bookingSearch.trim() !== '') {
                  const query = bookingSearch.toLowerCase();
                  const nameMatch = b.fullName?.toLowerCase().includes(query);
                  const emailMatch = b.email?.toLowerCase().includes(query);
                  const phoneMatch = b.phone ? b.phone.toLowerCase().includes(query) : false;
                  const subjectMatch = b.subject?.toLowerCase().includes(query);
                  const commentMatch = b.comments?.toLowerCase().includes(query);
                  return nameMatch || emailMatch || phoneMatch || subjectMatch || commentMatch;
                }
                return true;
              });

              if (filteredBookings.length === 0) {
                return (
                  <div className="text-center py-12 bg-gray-50 rounded-xl border border-dashed border-gray-200 p-4">
                    <p className="text-gray-400 text-xs sm:text-sm">No bookings fit the search queries or status criteria.</p>
                    <button 
                      onClick={() => { setBookingSearch(''); setBookingStatusFilter('All'); }}
                      className="mt-3 text-xs text-red-650 font-bold hover:underline font-sans cursor-pointer"
                    >
                      Clear filters & view all
                    </button>
                  </div>
                );
              }

              return (
                <div className="overflow-x-auto rounded-xl border border-gray-150">
                  <table className="w-full text-left border-collapse text-xs sm:text-sm">
                    <thead>
                      <tr className="bg-gray-50 border-b border-gray-150 text-gray-400 font-extrabold uppercase tracking-wider text-[10px]">
                        <th className="p-4">Student (طالب علم)</th>
                        <th className="p-4">Course Requested</th>
                        <th className="p-4">Date Submited</th>
                        <th className="p-4">Academy Status</th>
                        <th className="p-4 text-right">Actions (انتظامی کنٹرول)</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-150">
                      {filteredBookings.map((b) => {
                        const isPending = b.status === 'Pending';
                        const isConfirmed = b.status === 'Confirmed';
                        const isRescheduled = b.status === 'Rescheduled';
                        const isCancelled = b.status === 'Cancelled';

                        let badgeCol = 'bg-gray-100 text-gray-600';
                        if (isConfirmed) badgeCol = 'bg-green-100 text-green-700 font-bold';
                        if (isPending) badgeCol = 'bg-yellow-50 text-yellow-750 font-bold border border-yellow-100';
                        if (isRescheduled) badgeCol = 'bg-blue-50 text-blue-700 font-bold border border-blue-100';
                        if (isCancelled) badgeCol = 'bg-red-55 text-red-750 font-bold border border-red-150';

                        return (
                          <tr key={b.id} className="hover:bg-gray-50/60 transition-colors">
                            <td className="p-4">
                              <p className="font-extrabold text-gray-900">{b.fullName}</p>
                              <p className="text-xs text-gray-400 font-mono select-all mt-0.5">{b.email}</p>
                              {b.phone ? (
                                <div className="flex flex-col gap-1.5 mt-2">
                                  <p className="text-xs text-green-750 font-mono font-bold flex items-center gap-1 bg-green-50 px-2.5 py-1 rounded border border-green-100 w-fit">
                                    <span>📞 {b.phone}</span>
                                  </p>
                                  <a 
                                    href={`https://wa.me/${b.phone.replace(/[^0-9]/g, '')}`} 
                                    target="_blank" 
                                    rel="noreferrer"
                                    className="flex items-center gap-1.5 bg-[#25D366] hover:bg-[#20ba59] text-white px-2.5 py-1 rounded text-[10px] font-bold transition w-fit shadow-sm shadow-green-100"
                                  >
                                    <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 fill-current"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 1.996-1.413.242-.695.242-1.291.171-1.413-.072-.123-.267-.197-.565-.346zM12.008 21c-1.623 0-3.212-.436-4.598-1.261L3 21l1.288-4.274A8.95 8.95 0 013 12.008c0-4.964 4.044-9.008 9.008-9.008 4.964 0 9.008 4.044 9.008 9.008 0 4.964-4.044 9.008-9.008 9.008zM12 2.045a9.948 9.948 0 00-9.943 9.943c0 1.758.455 3.475 1.319 4.99L2.045 22l5.183-1.359c1.466.8 3.111 1.22 4.772 1.22 5.482 0 9.943-4.461 9.943-9.943 0-5.482-4.461-9.943-9.943-9.943z"/></svg>
                                    Chat with Student
                                  </a>
                                </div>
                              ) : (
                                <span className="text-[10px] text-gray-450 font-semibold italic block mt-1">No phone supplied</span>
                              )}
                            </td>
                            <td className="p-4">
                              <span className="font-bold text-gray-800">{b.subject}</span>
                              {b.comments && (
                                <p className="text-[11px] text-gray-400 italic mt-1 line-clamp-1 max-w-xs" title={b.comments}>
                                  "{b.comments}"
                                </p>
                              )}
                            </td>
                            <td className="p-4 text-xs font-medium text-gray-400 font-mono">
                              {b.createdAt ? new Date(b.createdAt).toLocaleString('en-US', { dateStyle: 'short', timeStyle: 'short' }) : 'Today'}
                            </td>
                            <td className="p-4">
                              <span className={`px-2.5 py-1 rounded-full text-[10px] uppercase tracking-wider ${badgeCol}`}>
                                {b.status || 'Pending'}
                              </span>
                            </td>
                            <td className="p-4 text-right">
                              <div className="flex items-center justify-end gap-1.5 flex-wrap">
                                <button
                                  onClick={() => {
                                    changeBookingStatus(b.id, 'Confirmed');
                                    showToast(`Booking for ${b.fullName} has been Confirmed!`, 'success');
                                  }}
                                  className={`px-2.5 py-1 rounded font-extrabold text-[10px] uppercase tracking-wide cursor-pointer shadow-sm transition ${
                                    isConfirmed 
                                      ? 'bg-green-700 text-white border border-green-800' 
                                      : 'bg-green-600 hover:bg-green-700 text-white shadow-green-100'
                                  }`}
                                  type="button"
                                >
                                  {isConfirmed ? '✓ Confirmed' : 'Confirm'}
                                </button>
                                <button
                                  onClick={() => {
                                    changeBookingStatus(b.id, 'Rescheduled');
                                    showToast(`Booking for ${b.fullName} set to Rescheduled status.`, 'info');
                                  }}
                                  className={`px-2.5 py-1 rounded font-extrabold text-[10px] uppercase tracking-wide cursor-pointer shadow-sm transition ${
                                    isRescheduled
                                      ? 'bg-blue-700 text-white border border-blue-850'
                                      : 'bg-blue-600 hover:bg-blue-700 text-white shadow-blue-100'
                                  }`}
                                  type="button"
                                >
                                  {isRescheduled ? '✓ Rescheduled' : 'Reschedule'}
                                </button>
                                <button
                                  onClick={() => {
                                    changeBookingStatus(b.id, 'Cancelled');
                                    showToast(`Booking for ${b.fullName} marked as Cancelled.`, 'error');
                                  }}
                                  className={`px-2.5 py-1 rounded font-extrabold text-[10px] uppercase tracking-wide cursor-pointer transition ${
                                    isCancelled
                                      ? 'bg-red-700 text-white border border-red-800'
                                      : 'bg-red-650 hover:bg-red-700 text-white'
                                  }`}
                                  type="button"
                                >
                                  {isCancelled ? '✓ Cancelled' : 'Cancel'}
                                </button>

                                {/* WhatsApp notification shortcut launcher */}
                                <a
                                  href={getStudentWhatsAppLink(b)}
                                  target="_blank"
                                  referrerPolicy="no-referrer"
                                  className="px-2.5 py-1 rounded bg-[#25D366] hover:bg-[#20ba5a] text-white font-extrabold text-[10px] uppercase tracking-wide cursor-pointer flex items-center gap-1.5 shadow-sm font-sans transition-colors"
                                  title="Send WhatsApp update to this student"
                                >
                                  <svg className="w-3 h-3 fill-white" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L0 24l6.335-1.662c1.746.953 3.71 1.455 5.703 1.455h.008c6.56 0 11.895-5.335 11.898-11.893a11.821 11.821 0 00-3.48-8.413z" />
                                  </svg>
                                  WhatsApp Update
                                </a>

                                <button
                                  onClick={() => removeBookingRecord(b.id)}
                                  className="p-1.5 text-gray-400 hover:text-red-650 hover:bg-red-50 rounded transition cursor-pointer ml-1"
                                  title="Delete Booking Permanently"
                                  type="button"
                                >
                                  <Trash2 className="w-4 h-4" />
                                </button>
                              </div>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              );
            })()}
          </div>
        )}

        {activeTab === 'blogs' && (
          <div className="space-y-8 animate-fade-in">
            {/* Upper Stats bar */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-[#002060] p-5 rounded-2xl text-white shadow-md border border-[#002060]/20 flex items-center justify-between">
                <div>
                  <p className="text-white/70 text-xs font-bold uppercase tracking-wider">Total Articles Published</p>
                  <p className="text-3xl font-black mt-1">{posts.length}</p>
                </div>
                <div className="p-3 bg-white/10 rounded-xl">
                  <BookOpen className="w-6 h-6 text-[#FF5500]" />
                </div>
              </div>
              <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-sm flex items-center justify-between">
                <div>
                  <p className="text-gray-500 text-xs font-bold uppercase tracking-wider">Active Blog Editors</p>
                  <p className="text-3xl font-black text-[#002060] mt-1">
                    {blogEditors?.filter(e => e.status === 'Active').length || 0}
                  </p>
                </div>
                <div className="p-3 bg-emerald-50 rounded-xl text-emerald-600 font-sans">
                  <Sliders className="w-6 h-6" />
                </div>
              </div>
              <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-sm flex items-center justify-between">
                <div>
                  <p className="text-gray-500 text-xs font-bold uppercase tracking-wider">Estimated Monthly Reach</p>
                  <p className="text-3xl font-black text-gray-900 mt-1">
                    {posts.length * 142 + 24} <span className="text-xs text-emerald-600 font-bold font-sans">+12%</span>
                  </p>
                </div>
                <div className="p-3 bg-red-50 rounded-xl text-red-600">
                  <Sparkles className="w-6 h-6" />
                </div>
              </div>
            </div>

            <div className="grid lg:grid-cols-12 gap-8 items-start">
              {/* Left Column: Advanced Workspace (Post Form) with Nested Sidebar Configs */}
              <div className="lg:col-span-8 space-y-6">
                
                {/* Editing Notification Banner */}
                {editingPostId && (
                  <div className="bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-200 rounded-2xl p-4 flex items-center justify-between shadow-sm animate-fade-in text-left">
                    <div className="flex items-center gap-3">
                      <div className="p-2.5 bg-amber-500/15 text-amber-600 rounded-xl shrink-0">
                        <Edit className="w-5 h-5 animate-pulse" />
                      </div>
                      <div className="min-w-0">
                        <p className="text-[10px] font-extrabold uppercase tracking-widest text-amber-800 font-sans">Active Editing Session</p>
                        <p className="text-xs font-bold text-slate-800 truncate font-sans">Modifying: "{newPost.title || 'Untitled Post'}"</p>
                      </div>
                    </div>
                    <button 
                      onClick={cancelEdit} 
                      className="text-[11px] font-bold text-amber-900 bg-amber-100 hover:bg-amber-200 border border-amber-200 px-3 py-1.5 rounded-xl transition cursor-pointer flex items-center gap-1 shrink-0 font-sans ml-3"
                    >
                      <X className="w-3.5 h-3.5" /> Discard
                    </button>
                  </div>
                )}

                <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
                  {/* Editor Top Bar Header */}
                  <div className="bg-slate-50 px-6 py-4 border-b border-gray-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div className="text-left">
                      <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                        {editingPostId ? (
                          <>
                            <span className="p-1.5 bg-yellow-500/10 text-yellow-600 rounded-lg">
                              <Edit className="w-5 h-5" />
                            </span>
                            Edit Academy Post
                          </>
                        ) : (
                          <>
                            <span className="p-1.5 bg-[#FF5500]/10 text-[#FF5500] rounded-lg">
                              <Plus className="w-5 h-5" />
                            </span>
                            Create New Article
                          </>
                        )}
                      </h2>
                      <p className="text-xs text-gray-500 mt-1 font-medium font-sans">Draft guidelines, driver safety tutorials, and license instructions</p>
                    </div>

                    {editingPostId && (
                      <button 
                        onClick={cancelEdit} 
                        className="text-xs font-bold text-red-650 hover:text-white hover:bg-red-655 bg-red-50 border border-red-200 px-3 py-1.5 rounded-lg flex items-center gap-1 transition cursor-pointer"
                      >
                        <X className="w-3.5 h-3.5" /> Stop Editing
                      </button>
                    )}
                  </div>

                  <div className="p-6 space-y-6">
                    {/* Header: Title and Cover Zone */}
                    <div className="grid grid-cols-1 md:grid-cols-1 gap-6">
                      {/* Title Input */}
                      <div className="text-left">
                        <label className="block text-xs font-bold uppercase tracking-wider text-gray-650 mb-1.5 font-sans">Article Title *</label>
                        <input 
                          type="text"
                          className="w-full border border-gray-300 px-4 py-3 rounded-xl focus:ring-2 focus:ring-[#FF5500] focus:border-[#FF5500] outline-none transition font-sans text-base text-gray-900 placeholder:text-gray-400 font-semibold shadow-sm" 
                          placeholder="e.g. 5 Critical Road Signals Every Pakistani Driver Must Understand ..." 
                          value={newPost.title} 
                          onChange={e => setNewPost({...newPost, title: e.target.value})} 
                        />
                      </div>

                      {/* Drag & Drop Main Cover Zone */}
                      <div className="text-left">
                        <label className="block text-xs font-bold uppercase tracking-wider text-gray-650 mb-1.5 font-sans">Feature Cover Image *</label>
                        
                        {newPost.imageUrl ? (
                          <div className="relative rounded-xl overflow-hidden border border-gray-200 group bg-slate-50 transition shadow-inner">
                            <img src={newPost.imageUrl} alt={newPost.imageAlt || "Cover image preview"} className="w-full h-44 md:h-56 object-cover" />
                            <div className="absolute inset-0 bg-slate-900/60 opacity-0 group-hover:opacity-100 transition-all duration-200 flex items-center justify-center gap-3">
                              <button
                                type="button"
                                onClick={() => fileInputRef.current?.click()}
                                className="px-4 py-2 bg-white hover:bg-slate-100 text-[#002060] text-xs font-black rounded-lg transition-all flex items-center gap-1 cursor-pointer"
                              >
                                <Upload className="w-3.5 h-3.5" />
                                Replace
                              </button>
                              <button
                                type="button"
                                onClick={() => setNewPost(prev => ({ ...prev, imageUrl: '', imageAlt: '' }))}
                                className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white text-xs font-black rounded-lg transition-all flex items-center gap-1 cursor-pointer"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                                Remove
                              </button>
                            </div>
                            <div className="absolute top-3 left-3 bg-[#002060]/95 backdrop-blur text-white text-[9px] font-black uppercase tracking-wider px-2.5 py-1 rounded-full shadow-md">
                              Main Feature Cover
                            </div>
                          </div>
                        ) : (
                          <div 
                            onDragOver={handleDragOver}
                            onDragLeave={handleDragLeave}
                            onDrop={handleDrop}
                            onClick={() => fileInputRef.current?.click()}
                            className={`relative h-44 border-2 border-dashed rounded-xl flex flex-col items-center justify-center text-center p-6 cursor-pointer transition-all duration-200 ${
                              isDragging 
                                ? 'border-[#FF5500] bg-orange-50/20 shadow-lg scale-[0.99] ring-4 ring-orange-100' 
                                : 'border-slate-300 hover:border-[#FF5500] bg-slate-50/50 hover:bg-white hover:shadow-sm'
                            }`}
                          >
                            <input 
                              type="file" 
                              ref={fileInputRef} 
                              accept="image/*" 
                              className="hidden" 
                              onChange={handleImageUpload} 
                            />
                            <div className="p-3 bg-white hover:bg-slate-50 border border-slate-200 shadow-sm text-slate-500 rounded-xl mb-3 transition-transform">
                              <Upload className="w-6 h-6 text-slate-400" />
                            </div>
                            <p className="text-xs font-bold text-slate-700 font-sans">
                              Drag &amp; drop post cover imagery here, or <span className="text-[#FF5500]">browse device</span>
                            </p>
                          </div>
                        )}
                        
                        <div className="mt-3 text-left">
                          <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wide font-sans mb-1 block">Image Alt Text (SEO)</label>
                          <input 
                            type="text"
                            className="w-full bg-slate-50 border border-gray-200 px-3.5 py-2 rounded-xl focus:ring-1 focus:ring-[#FF5500] focus:border-[#FF5500] outline-none text-xs text-slate-800 placeholder:text-gray-400 font-sans shadow-inner" 
                            placeholder="Describe this image for screen readers ..." 
                            value={newPost.imageAlt || ''} 
                            onChange={e => setNewPost({...newPost, imageAlt: e.target.value})} 
                          />
                        </div>
                      </div>
                    </div>

                    {/* WYSIWYG Workspace Container */}
                    <div>
                      <div className="flex items-center justify-between border-b border-gray-200 pb-2 mb-4">
                        <div className="flex gap-1.5 font-sans">
                          <button
                            type="button"
                            onClick={() => setEditorWorkspaceTab('write')}
                            className={`px-4 py-2 rounded-lg font-bold text-xs tracking-wide uppercase transition-all flex items-center gap-1.5 cursor-pointer ${
                              editorWorkspaceTab === 'write'
                                ? 'bg-[#002060] text-white shadow-sm font-black'
                                : 'bg-slate-100 text-gray-600 hover:bg-slate-200'
                            }`}
                          >
                            <Edit className="w-3.5 h-3.5" />
                            Write Content
                          </button>

                          <button
                            type="button"
                            onClick={() => setEditorWorkspaceTab('preview')}
                            className={`px-4 py-2 rounded-lg font-bold text-xs tracking-wide uppercase transition-all flex items-center gap-1.5 cursor-pointer ${
                              editorWorkspaceTab === 'preview'
                                ? 'bg-[#FF5500] text-white shadow-sm font-black'
                                : 'bg-slate-100 text-gray-600 hover:bg-slate-200'
                            }`}
                          >
                            <Globe className="w-3.5 h-3.5" />
                            Live Preview
                          </button>
                        </div>
                        <span className="hidden sm:inline-flex text-[11px] text-slate-400 font-extrabold uppercase tracking-widest font-sans">
                          WYSIWYG Workspace
                        </span>
                      </div>

                      {editorWorkspaceTab === 'write' ? (
                        <div className="space-y-2 font-sans">
                          {/* Formatting Toolbar */}
                          <div className="bg-slate-50 border border-b-0 border-gray-300 rounded-t-2xl p-2.5 flex flex-wrap gap-2 items-center">
                            <div className="flex gap-1 pr-2 border-r border-gray-200">
                              <button
                                type="button"
                                onMouseDown={(e) => { e.preventDefault(); executeCommand('bold'); }}
                                className="p-2 bg-white hover:bg-slate-100 border border-gray-200 rounded-lg transition-all cursor-pointer"
                              >
                                <Bold className="w-4 h-4 text-slate-700" />
                              </button>
                              <button
                                type="button"
                                onMouseDown={(e) => { e.preventDefault(); executeCommand('italic'); }}
                                className="p-2 bg-white hover:bg-slate-100 border border-gray-200 rounded-lg transition-all cursor-pointer"
                              >
                                <Italic className="w-4 h-4 text-slate-700" />
                              </button>
                            </div>

                            <button
                              type="button"
                              onMouseDown={(e) => { e.preventDefault(); formatBlock('h2'); }}
                              className="px-3 py-2 bg-white hover:bg-[#002060] hover:text-white border border-gray-200 text-[11px] font-black rounded-lg transition-all cursor-pointer"
                            >
                              H2
                            </button>

                            <button
                              type="button"
                              onMouseDown={(e) => { e.preventDefault(); insertTemplate('> “ٹائپ کیجئے اپنی اہم بات...”'); }}
                              className="px-3 py-2 bg-white hover:bg-slate-100 border border-gray-200 text-[10px] font-extrabold rounded-lg flex items-center gap-1 transition-all cursor-pointer"
                            >
                              <span className="text-[#FF5500] font-black text-xs">“</span> Blockquote
                            </button>

                            <div className="flex flex-wrap gap-1.5 items-center pl-1 border-l border-gray-200 ml-1">
                              <button
                                type="button"
                                onClick={() => insertTemplate(`## 🚗 اہم حفاظتی تدابیر\n- سیٹ بیلٹ کا استعمال لازمی بنائیں۔\n- شیشوں کو اپنی سیٹ کے مطابق ایڈجسٹ کریں۔`)}
                                className="px-2 py-1 text-[9px] font-black text-red-700 bg-red-50 hover:bg-red-100 rounded-lg uppercase tracking-wide cursor-pointer"
                              >
                                + Safety Template
                              </button>
                            </div>
                          </div>

                          <div
                            ref={wysiwygEditorRef}
                            contentEditable
                            className="w-full border border-gray-300 p-4 rounded-b-2xl focus:ring-2 focus:ring-[#FF5500] focus:border-[#FF5500] outline-none transition min-h-[380px] max-h-[600px] overflow-y-auto font-sans text-sm leading-relaxed bg-white text-gray-900 prose prose-slate max-w-none wysiwyg-editor text-left"
                            onInput={(e) => {
                              const htmlValue = e.currentTarget.innerHTML;
                              const mdValue = htmlToMarkdown(htmlValue);
                              setNewPost(prev => ({ ...prev, content: mdValue }));
                            }}
                            style={{ outline: 'none' }}
                          />
                        </div>
                      ) : (
                        <div className="border border-gray-200 rounded-2xl p-6 bg-white min-h-[400px] max-h-[600px] overflow-y-auto font-sans text-left">
                          <h1 className="text-2xl font-black text-slate-900 mb-4">{newPost.title || 'Untitled Post'}</h1>
                          {newPost.imageUrl && (
                            <img src={newPost.imageUrl} alt="" className="w-full h-48 object-cover rounded-xl mb-6 shadow-sm" />
                          )}
                          <div className="prose prose-slate max-w-none">
                            {renderPreviewBlogContent(newPost.content)}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Column: SEO Assistant & Scheduling */}
              <div className="lg:col-span-4 space-y-6">
                {/* AI SEO Assistant */}
                <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden text-left">
                  <div className="bg-slate-900 px-5 py-4 border-b border-slate-800 flex items-center justify-between">
                    <h3 className="text-xs font-black text-white uppercase tracking-widest flex items-center gap-2">
                      <Sparkles className="w-4 h-4 text-[#FF5500]" /> AI SEO ASSISTANT
                    </h3>
                    <button 
                      onClick={handleAutoGenerateSEO}
                      className="p-1.5 bg-white/10 hover:bg-white/20 text-white rounded-lg transition-all cursor-pointer"
                      title="Run AI Autogen"
                    >
                      <Zap className="w-3.5 h-3.5" />
                    </button>
                  </div>
                  <div className="p-5 space-y-4">
                    <div>
                      <label className="block text-[10px] font-black text-slate-400 uppercase tracking-wider mb-1.5">Meta Title</label>
                      <input 
                        type="text" 
                        className="w-full bg-slate-50 border border-slate-200 px-3.5 py-2.5 rounded-xl text-xs font-bold text-slate-800 focus:ring-1 focus:ring-[#FF5500] outline-none"
                        placeholder="Optimized title tag..."
                        value={newPost.metaTitle || ''}
                        onChange={e => setNewPost({...newPost, metaTitle: e.target.value})}
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-black text-slate-400 uppercase tracking-wider mb-1.5">Focus Keywords</label>
                      <input 
                        type="text" 
                        className="w-full bg-slate-50 border border-slate-200 px-3.5 py-2.5 rounded-xl text-xs font-bold text-slate-800 focus:ring-1 focus:ring-[#FF5500] outline-none"
                        placeholder="driving-school, faisalabad, safety..."
                        value={newPost.focusKeywords || ''}
                        onChange={e => setNewPost({...newPost, focusKeywords: e.target.value})}
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-black text-slate-400 uppercase tracking-wider mb-1.5">Meta Description / Excerpt</label>
                      <textarea 
                        className="w-full bg-slate-50 border border-slate-200 px-3.5 py-2.5 rounded-xl text-xs font-bold text-slate-800 focus:ring-1 focus:ring-[#FF5500] outline-none min-h-[80px] resize-none"
                        placeholder="Brief summary for Google results..."
                        value={newPost.metaDescription || ''}
                        onChange={e => setNewPost({...newPost, metaDescription: e.target.value})}
                      />
                    </div>
                  </div>
                </div>

                {/* Scheduling & Publish Flow */}
                <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden text-left">
                  <div className="bg-slate-50 px-5 py-4 border-b border-gray-200">
                    <h3 className="text-xs font-black text-slate-900 uppercase tracking-widest flex items-center gap-2">
                      <Clock className="w-4 h-4 text-[#FF5500]" /> Scheduling
                    </h3>
                  </div>
                  <div className="p-5 space-y-4">
                    <div className="flex items-center gap-2 bg-slate-50 p-3 rounded-xl border border-slate-100">
                      <input 
                        type="datetime-local" 
                        className="w-full bg-transparent text-xs font-bold text-slate-800 outline-none"
                        value={newPost.scheduledAt || ''}
                        onChange={e => {
                          setNewPost(prev => ({ ...prev, scheduledAt: e.target.value, status: e.target.value ? 'Scheduled' : 'Draft' }));
                        }}
                      />
                    </div>
                    <button 
                      onClick={() => publishPost(newPost.scheduledAt ? 'Scheduled' : 'Published')}
                      className={`w-full py-4 rounded-2xl font-black text-sm transition-all shadow-lg flex items-center justify-center gap-2 cursor-pointer ${
                        editingPostId ? 'bg-yellow-500 hover:bg-yellow-600 text-white' : 'bg-[#002060] hover:bg-slate-900 text-white'
                      }`}
                    >
                      {editingPostId ? (
                        <><Save className="w-4 h-4" /> Save Changes</>
                      ) : (
                        newPost.scheduledAt ? (
                          <><Clock className="w-4 h-4" /> Schedule Post</>
                        ) : (
                          <><Globe className="w-4 h-4" /> Publish Now</>
                        )
                      )}
                    </button>
                    {editingPostId && (
                      <button 
                        onClick={cancelEdit}
                        className="w-full py-3.5 rounded-2xl bg-gray-100 border border-gray-200 text-gray-600 font-bold text-xs hover:bg-gray-200 transition-all cursor-pointer"
                      >
                        Cancel Editing
                      </button>
                    )}
                    <button 
                      onClick={() => publishPost('Draft')}
                      className="w-full py-3.5 rounded-2xl bg-white border border-slate-300 text-slate-500 font-bold text-xs hover:bg-slate-50 transition-all cursor-pointer"
                    >
                      Save as Draft
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Manage / List Existing Posts */}
            <div className="lg:col-span-12 space-y-8 mt-12 pt-12 border-t border-gray-200">
              {/* Manage Posts List */}
              <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm flex flex-col min-h-[400px]">
                <div className="mb-4 border-b border-gray-100 pb-3 flex items-center justify-between">
                  <div>
                    <h2 className="text-lg font-bold text-gray-900 flex items-center gap-2">
                      <BookOpen className="w-5 h-5 text-[#002060]" />
                      Manage Posts ({posts.length})
                    </h2>
                    <p className="text-xs text-gray-400 font-sans mt-0.5">Select posts to live edit or permanently delete.</p>
                  </div>
                </div>

                {posts.length === 0 ? (
                  <div className="text-center py-10 flex-grow flex flex-col justify-center items-center bg-gray-50 border border-dashed rounded-xl p-6 font-sans">
                    <ImageIcon className="w-10 h-10 text-gray-300 mb-2" />
                    <p className="text-gray-500 font-bold text-xs">No blogs posted yet.</p>
                    <p className="text-[10px] text-gray-400 mt-1 max-w-[180px]">Create your first post using the left panel.</p>
                  </div>
                ) : (
                  <div className="space-y-3 max-h-[600px] overflow-y-auto pr-1 flex-grow font-sans text-left">
                    {posts.map(post => {
                      const isCurrentlyEditing = editingPostId === post.id;
                      return (
                        <div 
                          key={post.id} 
                          className={`p-3 rounded-xl border transition flex items-start gap-3 ${
                            isCurrentlyEditing 
                              ? 'border-yellow-400 bg-yellow-50/40 ring-1 ring-yellow-100' 
                              : 'border-gray-150 hover:border-gray-250 bg-white'
                          }`}
                        >
                          <img 
                            src={post.imageUrl || PRESET_IMAGES[0].url} 
                            alt="" 
                            className="w-14 h-10 object-cover rounded-lg border border-gray-100 shrink-0 bg-gray-100" 
                          />
                          <div className="min-w-0 flex-1">
                            <h3 className="font-bold text-gray-800 text-xs truncate leading-snug">{post.title}</h3>
                            <p className="text-[10px] text-gray-500 mt-0.5 truncate uppercase font-black tracking-wider shadow-sm inline-block px-1.5 py-0.5 bg-slate-50 border border-slate-100 rounded">By {post.author || 'GoDriveify'}</p>
                            <div className="flex items-center gap-2 mt-1.5">
                              <span className="text-[9px] text-gray-400">{post.date}</span>
                              <span className={`text-[8px] font-black px-1.5 py-0.5 rounded uppercase ${
                                post.status === 'Published' ? 'bg-emerald-50 text-emerald-600' : 
                                post.status === 'Scheduled' ? 'bg-blue-50 text-blue-600' : 'bg-gray-100 text-gray-500'
                              }`}>
                                {post.status || 'Draft'}
                              </span>
                            </div>
                          </div>
                          <div className="flex items-center gap-1 shrink-0 self-center">
                            <button 
                              onClick={() => startEdit(post)} 
                              title="Edit this post"
                              className="p-1.5 text-gray-400 hover:text-yellow-600 hover:bg-yellow-50 rounded-md transition cursor-pointer"
                            >
                              <Edit className="w-3.5 h-3.5" />
                            </button>
                            <button 
                              onClick={() => deletePost(post.id)} 
                              title="Delete this post"
                              className="p-1.5 text-gray-400 hover:text-red-650 hover:bg-red-50 rounded-md transition cursor-pointer"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'dns' && (
          /* SEO, DMARC & DNS Recommendations Dashboard */
          <div className="bg-white p-6 sm:p-8 rounded-2xl border border-gray-200 shadow-sm space-y-8">
            <div className="border-b border-gray-100 pb-5">
              <div className="flex items-center gap-2.5 mb-2">
                <span className="p-2 bg-red-50 text-red-600 rounded-lg">
                  <Globe className="w-5 h-5" />
                </span>
                <h2 className="text-2xl font-black text-gray-900 tracking-tight">SEO &amp; Email Authentication settings</h2>
              </div>
              <p className="text-gray-500 text-sm max-w-3xl leading-relaxed">
                theHoth SEO Checker has recommended configuring email security protocols to protect your official domain address <strong className="text-red-650">godriveify.com</strong>. Setting up a DMARC and SPF policy boosts your general email deliverability rates to clients (preventing Gmail/Outlook spam filters) and strengthens your overall online authority ranking.
              </p>
              <div className="mt-4 bg-yellow-50 border border-yellow-200/80 rounded-xl p-4 text-xs sm:text-sm text-yellow-800 leading-relaxed">
                <strong>Urdu Guide (رہنمائی):</strong> اپنے ڈومین رجسٹرار (جیسے Cloudflare, Namecheap, GoDaddy یا cPanel) کی DNS Settings میں جا کر نیچے دیے گئے <strong>TXT</strong> ریکارڈز کو کاپی کر کے شامل کریں۔ DMARC آپ کی Driving School ای میلز کی سیکیورٹی اور ڈیلیوری کو بہترین بناتا ہے اور دوسروں کو آپ کے نام پر جعلی ای میلز بھیجنے سے روکتا ہے۔
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {/* DMARC Record Card */}
              <div className="border border-gray-200 rounded-xl p-5 hover:border-gray-300 transition bg-slate-50/50 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-xs font-black uppercase bg-red-100 text-red-700 px-2.5 py-1 rounded-md tracking-wider">
                      DMARC Record (Required)
                    </span>
                    <span className="flex items-center gap-1 text-[11px] text-yellow-600 font-bold">
                      <span className="w-1.5 h-1.5 rounded-full bg-yellow-500 animate-pulse"></span>
                      Needs DNS entry
                    </span>
                  </div>
                  <h3 className="font-bold text-gray-900 text-sm mb-1.5">Configure TXT record for DMARC SPF validation</h3>
                  <p className="text-xs text-gray-500 mb-4 leading-relaxed">
                    This directly resolves the target error reported on theHoth. It utilizes Gmail reporting to secure incoming/outgoing school communications.
                  </p>

                  <div className="space-y-3">
                    {/* Host */}
                    <div className="bg-white px-3 py-2 rounded-lg border border-gray-200 flex items-center justify-between">
                      <div>
                        <p className="text-[10px] text-gray-400 font-bold uppercase">Record HOST / NAME</p>
                        <p className="font-mono text-xs text-gray-800 font-bold">_dmarc</p>
                      </div>
                      <button 
                        onClick={() => copyToClipboard('_dmarc', 'dmarc-host')}
                        className="text-xs text-red-600 hover:text-red-750 font-bold flex items-center gap-1 bg-red-50 hover:bg-red-100 px-2.5 py-1 rounded-md transition"
                      >
                        {copiedText === 'dmarc-host' ? <span className="text-green-600">Copied!</span> : <><Copy className="w-3 h-3" /> Copy</>}
                      </button>
                    </div>

                    {/* Type */}
                    <div className="bg-white px-3 py-2 rounded-lg border border-gray-200 flex items-center justify-between">
                      <div>
                        <p className="text-[10px] text-gray-400 font-bold uppercase">Record Type</p>
                        <p className="font-mono text-xs text-gray-800 font-bold">TXT</p>
                      </div>
                      <button 
                        onClick={() => copyToClipboard('TXT', 'dmarc-type')}
                        className="text-xs text-red-600 hover:text-red-750 font-bold flex items-center gap-1 bg-red-50 hover:bg-red-100 px-2.5 py-1 rounded-md transition"
                      >
                        {copiedText === 'dmarc-type' ? <span className="text-green-600">Copied!</span> : <><Copy className="w-3 h-3" /> Copy</>}
                      </button>
                    </div>

                    {/* Value */}
                    <div className="bg-white px-3 py-2.5 rounded-lg border border-gray-200">
                      <div className="flex items-center justify-between mb-1.5">
                        <p className="text-[10px] text-gray-400 font-bold uppercase">Record VALUE / CONTENT</p>
                        <button 
                          onClick={() => copyToClipboard('v=DMARC1; p=none; rua=mailto:trainingdrivingschool@gmail.com; pct=100', 'dmarc-val')}
                          className="text-[11px] text-red-600 hover:text-red-750 font-bold flex items-center gap-1 bg-red-50 hover:bg-red-100 px-2.5 py-1 rounded-md transition"
                        >
                          {copiedText === 'dmarc-val' ? <span className="text-green-600">Copied!</span> : <><Copy className="w-3 h-3" /> Copy Full Code</>}
                        </button>
                      </div>
                      <p className="font-mono text-[11px] text-gray-700 bg-gray-50 p-2 rounded border border-gray-150 overflow-x-auto whitespace-pre-wrap select-all font-semibold break-all leading-relaxed">
                        v=DMARC1; p=none; rua=mailto:trainingdrivingschool@gmail.com; pct=100
                      </p>
                    </div>
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-gray-200/65 text-[11px] text-gray-400 italic">
                  Note: The email address is configured dynamically with your official mailbox.
                </div>
              </div>

              {/* SPF Record Card */}
              <div className="border border-gray-200 rounded-xl p-5 hover:border-gray-300 transition bg-slate-50/50 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-xs font-black uppercase bg-blue-100 text-blue-700 px-2.5 py-1 rounded-md tracking-wider">
                      SPF Record (Recommended)
                    </span>
                    <span className="flex items-center gap-1 text-[11px] text-yellow-600 font-bold">
                      <span className="w-1.5 h-1.5 rounded-full bg-yellow-500 animate-pulse"></span>
                      Needs DNS entry
                    </span>
                  </div>
                  <h3 className="font-bold text-gray-900 text-sm mb-1.5">Configure TXT record for Sender Policy Framework</h3>
                  <p className="text-xs text-gray-500 mb-4 leading-relaxed">
                    Authorizes Google Workspace or custom mail servers to send communications on behalf of godriveify.com, dramatically lowering bounce rates.
                  </p>

                  <div className="space-y-3">
                    {/* Host */}
                    <div className="bg-white px-3 py-2 rounded-lg border border-gray-200 flex items-center justify-between">
                      <div>
                        <p className="text-[10px] text-gray-400 font-bold uppercase">Record HOST / NAME</p>
                        <p className="font-mono text-xs text-gray-800 font-bold">@ (or leave blank)</p>
                      </div>
                      <button 
                        onClick={() => copyToClipboard('@', 'spf-host')}
                        className="text-xs text-red-600 hover:text-red-750 font-bold flex items-center gap-1 bg-red-50 hover:bg-red-100 px-2.5 py-1 rounded-md transition"
                      >
                        {copiedText === 'spf-host' ? <span className="text-green-600">Copied!</span> : <><Copy className="w-3 h-3" /> Copy</>}
                      </button>
                    </div>

                    {/* Type */}
                    <div className="bg-white px-3 py-2 rounded-lg border border-gray-200 flex items-center justify-between">
                      <div>
                        <p className="text-[10px] text-gray-400 font-bold uppercase">Record Type</p>
                        <p className="font-mono text-xs text-gray-800 font-bold font-semibold">TXT</p>
                      </div>
                      <button 
                        onClick={() => copyToClipboard('TXT', 'spf-type')}
                        className="text-xs text-red-600 hover:text-red-750 font-bold flex items-center gap-1 bg-red-50 hover:bg-red-100 px-2.5 py-1 rounded-md transition"
                      >
                        {copiedText === 'spf-type' ? <span className="text-green-600">Copied!</span> : <><Copy className="w-3 h-3" /> Copy</>}
                      </button>
                    </div>

                    {/* Value */}
                    <div className="bg-white px-3 py-2.5 rounded-lg border border-gray-200">
                      <div className="flex items-center justify-between mb-1.5">
                        <p className="text-[10px] text-gray-400 font-bold uppercase">Record VALUE / CONTENT</p>
                        <button 
                          onClick={() => copyToClipboard('v=spf1 include:_spf.google.com ~all', 'spf-val')}
                          className="text-[11px] text-red-600 hover:text-red-750 font-bold flex items-center gap-1 bg-red-50 hover:bg-red-100 px-2.5 py-1 rounded-md transition"
                        >
                          {copiedText === 'spf-val' ? <span className="text-green-600">Copied!</span> : <><Copy className="w-3 h-3" /> Copy Full Code</>}
                        </button>
                      </div>
                      <p className="font-mono text-[11px] text-gray-700 bg-gray-50 p-2 rounded border border-gray-150 overflow-x-auto whitespace-pre-wrap select-all font-semibold break-all leading-relaxed">
                        v=spf1 include:_spf.google.com ~all
                      </p>
                    </div>
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-gray-200/65 text-[11px] text-gray-400 italic">
                  Note: If you use regular webhost mail instead of Google Workspace, use <code className="font-mono text-gray-600">v=spf1 +mx +a ~all</code>.
                </div>
              </div>
            </div>

            {/* General Site Analytics, Robots, and Sitemaps Status */}
            <div className="border border-gray-200 rounded-xl p-5 bg-gradient-to-br from-gray-50 to-white">
              <h3 className="font-bold text-gray-900 text-base mb-4 flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-red-600 animate-spin" style={{ animationDuration: '6s' }} />
                Active Site Integrations Status (Completed Tasks)
              </h3>

              <div className="grid sm:grid-cols-3 gap-4">
                {/* Google Analytics */}
                <div className="bg-white p-4 rounded-xl border border-gray-150 shadow-sm flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <p className="text-xs font-bold text-gray-800">Google Analytics 4</p>
                      <span className="bg-green-100 text-green-700 text-[9px] font-black uppercase px-2 py-0.5 rounded-full">Active</span>
                    </div>
                    <p className="text-[11px] text-gray-500 leading-relaxed mb-3">
                      Global performance and SEO tracker code is dynamically loaded in head element.
                    </p>
                  </div>
                  <div className="bg-gray-50 p-2 rounded text-center border">
                    <p className="text-[10px] text-gray-400 font-bold uppercase">Measurement ID</p>
                    <p className="font-mono text-xs font-black text-gray-800 tracking-wider">G-8L7Y8XJDPV</p>
                  </div>
                </div>

                {/* XML Sitemap */}
                <div className="bg-white p-4 rounded-xl border border-gray-150 shadow-sm flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <p className="text-xs font-bold text-gray-800">Sitemap XML File</p>
                      <span className="bg-green-100 text-green-700 text-[9px] font-black uppercase px-2 py-0.5 rounded-full">Generated</span>
                    </div>
                    <p className="text-[11px] text-gray-500 leading-relaxed mb-3">
                      Provides automatic index mappings for theHoth, Google Search Console, and Web crawlers.
                    </p>
                  </div>
                  <a 
                    href="/sitemap.xml" 
                    target="_blank" 
                    rel="noreferrer" 
                    className="bg-red-50 hover:bg-red-100 border border-red-200 p-2 rounded text-center block text-xs font-bold text-red-650 transition cursor-pointer"
                  >
                    View sitemap.xml &rarr;
                  </a>
                </div>

                {/* Robots.txt */}
                <div className="bg-white p-4 rounded-xl border border-gray-150 shadow-sm flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <p className="text-xs font-bold text-gray-800">crawler Instructions</p>
                      <span className="bg-green-100 text-green-700 text-[9px] font-black uppercase px-2 py-0.5 rounded-full">Optimized</span>
                    </div>
                    <p className="text-[11px] text-gray-500 leading-relaxed mb-3">
                      Allows main navigation pathways while pointing crawlers to your global sitemap location.
                    </p>
                  </div>
                  <a 
                    href="/robots.txt" 
                    target="_blank" 
                    rel="noreferrer" 
                    className="bg-gray-100 hover:bg-gray-200 border border-gray-250 p-2 rounded text-center block text-xs font-bold text-gray-700 transition cursor-pointer"
                  >
                    View robots.txt &rarr;
                  </a>
                </div>
              </div>
            </div>

            {/* Quick 3-Step Domain instructions card */}
            <div className="bg-red-50/50 border border-red-150 rounded-xl p-5">
              <h3 className="font-bold text-gray-900 text-sm mb-3 flex items-center gap-2">
                <AlertCircle className="w-5 h-5 text-red-600 shrink-0" />
                How to implement this / DNS me isy add krnay ka triqa:
              </h3>
              <ol className="list-decimal list-inside space-y-2.5 text-xs sm:text-sm text-gray-700 leading-relaxed font-medium">
                <li>Go to your Domain Manager (where you bought the domain, like <strong className="text-gray-900">Cloudflare, Namecheap, or GoDaddy</strong>).</li>
                <li>Find the <strong>DNS Settings</strong> or <strong>DNS Zone Editor</strong> panel.</li>
                <li>Click <strong>Add New Record</strong> and choose type <strong>TXT</strong>.</li>
                <li>Enter <code className="bg-white px-1.5 py-0.5 rounded border font-mono">_dmarc</code> for the Name/Host, select TTL to Auto/Default, and paste the copied Value content there.</li>
                <li>Click <strong>Save</strong>. In 1 to 24 hours, the record will propagate and verification tools like theHoth will show perfect 100% SEO Compliance!</li>
              </ol>
            </div>
          </div>
        )}

        {activeTab === 'rentals' && (
          <div className="space-y-8 animate-fade-in">
            {/* Standard Fleet Summary Metrics Blocks */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {/* Total Submissions Card */}
              <div className="bg-slate-950 text-white rounded-2xl border border-slate-800 p-6 flex items-center justify-between shadow-2xl relative overflow-hidden">
                <div className="absolute right-0 bottom-0 translate-x-4 translate-y-4 opacity-5 pointer-events-none">
                  <Car className="w-28 h-28 text-white" />
                </div>
                <div className="space-y-1.5 relative z-10">
                  <span className="text-[10px] font-black uppercase text-slate-400 tracking-widest block">Total Cars Submissions</span>
                  <p className="text-4xl font-black font-mono text-amber-500">
                    {pendingCars.length + rentalCars.length}
                  </p>
                  <p className="text-[10px] text-slate-500 font-semibold uppercase">
                    Approved active: {rentalCars.length} in fleet
                  </p>
                </div>
                <div className="p-3.5 bg-slate-900 border border-slate-800 rounded-xl text-amber-500 relative z-10 shrink-0 shadow-lg">
                  <Car className="w-6 h-6" />
                </div>
              </div>

              {/* Pending Approvals Card */}
              <div className="bg-slate-950 text-white rounded-2xl border border-slate-800 p-6 flex items-center justify-between shadow-2xl relative overflow-hidden">
                <div className="absolute right-0 bottom-0 translate-x-4 translate-y-4 opacity-5 pointer-events-none">
                  <Sliders className="w-28 h-28 text-white" />
                </div>
                <div className="space-y-1.5 relative z-10">
                  <span className="text-[10px] font-black uppercase text-slate-400 tracking-widest block">Pending Approvals</span>
                  <p className="text-4xl font-black font-mono text-amber-500">
                    {pendingCars.length}
                  </p>
                  <p className="text-[10px] text-slate-500 font-semibold uppercase">
                    Awaiting manual vetting
                  </p>
                </div>
                <div className="p-3.5 bg-slate-900 border border-slate-800 rounded-xl text-amber-500 relative z-10 shrink-0 shadow-lg">
                  <Clock className="w-6 h-6 animate-pulse" />
                </div>
              </div>

              {/* Lessons Booked Card */}
              <div className="bg-slate-950 text-white rounded-2xl border border-slate-800 p-6 flex items-center justify-between shadow-2xl relative overflow-hidden">
                <div className="absolute right-0 bottom-0 translate-x-4 translate-y-4 opacity-5 pointer-events-none">
                  <CheckCircle2 className="w-28 h-28 text-white" />
                </div>
                <div className="space-y-1.5 relative z-10">
                  <span className="text-[10px] font-black uppercase text-slate-400 tracking-widest block">Lessons / Driving Booked</span>
                  <p className="text-4xl font-black font-mono text-amber-500">
                    {bookings.length}
                  </p>
                  <p className="text-[10px] text-slate-500 font-semibold uppercase">
                    Active academy enrollment
                  </p>
                </div>
                <div className="p-3.5 bg-slate-900 border border-slate-800 rounded-xl text-amber-500 relative z-10 shrink-0 shadow-lg">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
              </div>
            </div>

            {/* Owner Listings Pending Approval Section */}
            <div className="bg-white rounded-2xl border border-gray-200/90 shadow-sm p-6 sm:p-8 space-y-6">
              <div className="border-b border-gray-100 pb-5">
                <h2 className="text-xl sm:text-2xl font-black text-gray-900 tracking-tight flex items-center gap-2">
                  <Car className="w-6 h-6 text-red-650" />
                  Car Owner Submissions Awaiting Approval
                </h2>
                <p className="text-gray-500 text-xs sm:text-sm mt-1">
                  Vet pending peer-to-peer rental car registrations. Approving a vehicle instantly maps it into the dynamically updated local marketplace directory.
                </p>
              </div>

              {pendingCars.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-20 bg-gray-50/40 rounded-3xl border border-dashed border-gray-200 text-center animate-fade-in px-6">
                  <div className="w-14 h-14 bg-white rounded-2xl shadow-sm border border-gray-150 flex items-center justify-center mb-5 text-gray-300">
                    <Car className="w-7 h-7" />
                  </div>
                  <h3 className="text-gray-900 font-extrabold text-lg tracking-tight">Approval Queue is Clear</h3>
                  <p className="text-gray-500 text-sm mt-1.5 max-w-sm font-medium">
                    No pending owner submissions are currently awaiting moderation. All new peer-to-peer registrations will appear here for verification.
                  </p>
                </div>
              ) : (
                <div id="admin-cars-container" className="grid md:grid-cols-2 gap-6">
                  {pendingCars.map((car) => {
                    const isVerifiedChecked = verifiedToggles[car.id] !== false; // checked by default
                    return (
                      <div 
                        key={car.id} 
                        id={`pending-card-${car.id}`}
                        className="bg-gray-50 border border-gray-200 rounded-2xl p-4 sm:p-5 flex flex-col sm:flex-row gap-4 relative overflow-hidden group hover:border-gray-300 transition hover:shadow-md"
                      >
                        {/* Visual Asset */}
                        <div className="w-full sm:w-28 h-20 sm:h-24 rounded-xl overflow-hidden bg-white shrink-0 border relative">
                          <img 
                            src={car.images && car.images.length > 0 ? car.images[0] : (car.imageUrl || 'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&q=80&w=300')} 
                            alt={car.name} 
                            className="w-full h-full object-cover"
                            referrerPolicy="no-referrer"
                          />
                        </div>

                        {/* Specs & Owner Profile Details */}
                        <div className="flex-grow min-w-0 flex flex-col justify-between">
                          <div>
                            <div className="flex justify-between items-start gap-1">
                              <h3 className="font-bold text-gray-950 text-sm sm:text-base leading-snug truncate">
                                {car.name}
                              </h3>
                              <span className="text-xs font-black font-mono text-red-650 shrink-0">
                                PKR {car.rentPrice} / {car.rentUnit || 'Day'}
                              </span>
                            </div>

                            <div className="flex flex-wrap gap-1.5 mt-1.5">
                              <span className="bg-white text-gray-600 text-[9px] font-black px-1.5 py-0.5 rounded border uppercase">
                                {car.transmission}
                              </span>
                              <span className="bg-white text-gray-600 text-[9px] font-black px-1.5 py-0.5 rounded border uppercase">
                                {car.fuelType || 'Petrol'}
                              </span>
                              <span className="bg-white text-gray-600 text-[9px] font-black px-1.5 py-0.5 rounded border">
                                Hub: {car.city}
                              </span>
                            </div>

                            {/* Retro Registration Badge */}
                            <div className="mt-2.5">
                              <span className="inline-flex items-center gap-1 bg-yellow-50 text-yellow-800 border border-yellow-200 text-[9px] font-mono font-bold px-2 py-0.5 rounded-md">
                                REG: {car.registrationNumber || 'Pending verification'}
                              </span>
                            </div>

                            {/* Contact Landlord Profile Card */}
                            <div className="bg-white rounded-lg p-2.5 border mt-3 text-[11px] text-gray-500 space-y-1">
                              <p className="font-bold text-gray-800 flex items-center gap-1">
                                <span>Owner:</span>
                                <strong className="text-red-650">{car.ownerName || 'Unknown Owner'}</strong>
                              </p>
                              {car.ownerPhone && (
                                <p className="font-mono">
                                  <span>Phone:</span> {car.ownerPhone}
                                </p>
                              )}
                              {car.description && (
                                <p className="italic mt-1 text-[10px] text-gray-400 truncate line-clamp-1">
                                  "{car.description}"
                                </p>
                              )}
                            </div>
                          </div>

                          {/* Verify Toggle Control */}
                          <div className="mt-3.5 flex items-center gap-1.5 bg-emerald-50 border border-emerald-100 p-2 rounded-xl text-[11px] font-bold text-emerald-800">
                            <input 
                              type="checkbox" 
                              id={`verify-${car.id}`}
                              checked={isVerifiedChecked}
                              onChange={() => {
                                setVerifiedToggles(prev => ({
                                  ...prev,
                                  [car.id]: !isVerifiedChecked
                                }));
                              }}
                              className="accent-emerald-600 shrink-0 cursor-pointer"
                            />
                            <label htmlFor={`verify-${car.id}`} className="cursor-pointer select-none">
                              Mark Car as Verified (Green Shield badge on fleet list)
                            </label>
                          </div>

                          {/* Verification Vault Trigger */}
                          <div className="mt-3">
                            <button
                              type="button"
                              onClick={() => setVaultSelectedDocs({ cnic: car.cnicDoc, registration: car.registrationDoc, title: `Verification Lockbox: ${car.ownerName}` })}
                              className="w-full flex items-center justify-center gap-2 bg-indigo-50 hover:bg-indigo-100 text-indigo-700 font-bold text-xs uppercase tracking-wide py-2.5 rounded-xl transition border border-indigo-200 cursor-pointer"
                            >
                              <ShieldCheck className="w-4 h-4" /> Review Verification Vault
                            </button>
                          </div>

                          {/* Approval Actions */}
                          <div className="flex gap-2.5 mt-3 pt-3 border-t border-gray-100">
                            <button
                              id={`btn-approve-${car.id}`}
                              type="button"
                              onClick={() => approveCarOnboarding(car, isVerifiedChecked)}
                              className="flex-1 bg-green-600 hover:bg-green-700 text-white font-extrabold text-xs uppercase tracking-wider py-2.5 rounded-xl transition shadow-md shadow-green-150 cursor-pointer"
                            >
                              Approve Listing
                            </button>
                            <button
                              type="button"
                              onClick={() => rejectCarOnboarding(car.id)}
                              className="flex-1 bg-red-50 hover:bg-red-150 text-red-750 font-extrabold text-xs uppercase tracking-wider py-2.5 rounded-xl border border-red-200 transition cursor-pointer"
                            >
                              Reject &amp; Discard
                            </button>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Direct Fleet and Inventory Administration Sub-grid */}
            <div className="grid lg:grid-cols-12 gap-8">
            {/* Add New/Edit Rental Car Form */}
            <div className="lg:col-span-6 space-y-6">
              <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm transition">
                <div className="flex items-center gap-2 mb-6 border-b border-gray-100 pb-4">
                  <span className="p-2 bg-red-50 text-red-600 rounded-lg">
                    <Car className="w-5 h-5" />
                  </span>
                  <h2 className="text-xl font-bold text-gray-900">{editingCarId ? 'Edit Rental Car' : 'Add New Rental Car'}</h2>
                  {editingCarId && (
                    <button 
                      type="button" 
                      onClick={cancelEditingCar}
                      className="ml-auto text-xs font-bold text-gray-500 hover:text-red-600 underline"
                    >
                      Cancel Edit
                    </button>
                  )}
                </div>

                <form onSubmit={addRentalCar} className="space-y-4">
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-1">Car Model Name *</label>
                    <input 
                      required
                      type="text" 
                      className="w-full border border-gray-300 p-3 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none transition text-sm font-medium" 
                      placeholder="e.g. Toyota Civic, Honda City, Fortuner 2024" 
                      value={newCar.name} 
                      onChange={e => setNewCar({...newCar, name: e.target.value})} 
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-bold text-gray-700 mb-1">Transmission *</label>
                      <select 
                        className="w-full border border-gray-300 p-3 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none bg-white transition text-xs sm:text-sm font-medium"
                        value={newCar.transmission}
                        onChange={e => setNewCar({...newCar, transmission: e.target.value as 'Automatic' | 'Manual' })}
                      >
                        <option value="Automatic">Automatic (آٹومیٹک)</option>
                        <option value="Manual">Manual (مینول)</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-bold text-gray-700 mb-1">City Hub *</label>
                      <select 
                        className="w-full border border-gray-300 p-3 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none bg-white transition text-xs sm:text-sm font-medium"
                        value={newCar.city}
                        onChange={e => setNewCar({...newCar, city: e.target.value})}
                      >
                        <option value="Faisalabad">Faisalabad</option>
                        <option value="Lahore">Lahore</option>
                        <option value="Islamabad">Islamabad</option>
                        <option value="Karachi">Karachi</option>
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-bold text-gray-700 mb-1">Rent Cost (PKR) *</label>
                      <input 
                        required
                        type="text" 
                        className="w-full border border-gray-300 p-3 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none transition text-sm font-mono font-bold" 
                        placeholder="e.g. 6,500" 
                        value={newCar.rentPrice} 
                        onChange={e => setNewCar({...newCar, rentPrice: e.target.value})}
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-bold text-gray-700 mb-1">Billing Interval *</label>
                      <select 
                        className="w-full border border-gray-300 p-3 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none bg-white transition text-xs sm:text-sm font-medium"
                        value={newCar.rentUnit}
                        onChange={e => setNewCar({...newCar, rentUnit: e.target.value as 'Day' | 'Hour' })}
                      >
                        <option value="Day">Per Day (روزانہ)</option>
                        <option value="Hour">Per Hour (گھنٹہ)</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-1">Car Cover Image URL</label>
                    <input 
                      type="text" 
                      className="w-full border border-gray-300 p-3 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none transition text-xs font-mono" 
                      placeholder="Or enter custom URL instead of preset" 
                      value={newCar.imageUrl} 
                      onChange={e => setNewCar({...newCar, imageUrl: e.target.value})} 
                    />
                  </div>

                  {/* Preset Library Grid & Custom uploader */}
                  <div className="bg-gray-50 p-4 rounded-xl border border-dashed border-gray-300 space-y-4">
                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                      <div>
                        <h4 className="font-bold text-xs text-gray-800 flex items-center gap-1.5 uppercase tracking-wide">
                          <ImageIcon className="w-4 h-4 text-gray-500" /> Choose Car Preset
                        </h4>
                      </div>
                      <div>
                        <label className="inline-flex items-center gap-1.5 bg-white hover:bg-gray-100 text-gray-700 border border-gray-300 px-3.5 py-1.5 rounded-lg cursor-pointer text-xs font-bold transition">
                          <Upload className="w-3.5 h-3.5 text-gray-500" />
                          Upload Device File
                          <input 
                            type="file" 
                            ref={carFileInputRef} 
                            accept="image/*" 
                            className="hidden" 
                            onChange={handleCarImageUpload} 
                          />
                        </label>
                      </div>
                    </div>

                    <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
                      {PRESET_CAR_IMAGES.map((img, i) => {
                        const isSelected = newCar.imageUrl === img.url;
                        return (
                          <button
                            key={i}
                            type="button"
                            title={img.label}
                            onClick={() => setNewCar(prev => ({ ...prev, imageUrl: img.url }))}
                            className={`relative aspect-video rounded-lg overflow-hidden border-2 transition-all ${
                              isSelected ? 'border-red-650 scale-95 ring-2 ring-red-100' : 'border-transparent hover:border-gray-400'
                            }`}
                          >
                            <img src={img.url} alt={img.label} className="w-full h-full object-cover" />
                            {isSelected && (
                              <div className="absolute inset-0 bg-red-600/20 flex items-center justify-center">
                                <span className="bg-red-600 text-white rounded-full p-0.5">
                                  <Check className="w-3 h-3" />
                                </span>
                              </div>
                            )}
                          </button>
                        );
                      })}
                    </div>

                    {newCar.imageUrl && (
                      <div className="flex items-center gap-3 bg-white p-2.5 rounded-lg border border-gray-200">
                        <img src={newCar.imageUrl} alt="Car Preview" className="w-16 h-10 object-cover rounded-md" />
                        <div className="min-w-0 flex-1">
                          <p className="text-xs font-bold text-gray-800 truncate">Selected Image Preview</p>
                          <p className="text-[10px] text-gray-500 truncate">{newCar.imageUrl}</p>
                        </div>
                        <button 
                          type="button" 
                          onClick={() => setNewCar(prev => ({ ...prev, imageUrl: '' }))} 
                          className="text-gray-400 hover:text-red-500 p-1 rounded-full hover:bg-gray-100 transition"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-1">Availability Status</label>
                    <div className="flex gap-4">
                      {['Available', 'Booked'].map((status) => (
                        <button
                          key={status}
                          type="button"
                          onClick={() => setNewCar(prev => ({ ...prev, status: status as 'Available' | 'Booked' }))}
                          className={`flex-1 py-2.5 rounded-xl text-xs font-bold font-mono tracking-wide border-2 transition-all cursor-pointer ${
                            newCar.status === status 
                              ? status === 'Available'
                                ? 'bg-green-50 text-green-700 border-green-500 scale-98'
                                : 'bg-red-50 text-red-750 border-red-550 scale-98'
                              : 'bg-white text-gray-600 border-gray-200'
                          }`}
                        >
                          {status}
                        </button>
                      ))}
                    </div>
                  </div>

                  <button 
                    type="submit" 
                    className="w-full bg-red-600 hover:bg-red-700 text-white py-3.5 rounded-xl font-bold transition flex items-center justify-center gap-2 shadow-md shadow-red-200 cursor-pointer text-sm"
                  >
                    {editingCarId ? (
                      <>
                        <Check className="w-4 h-4" /> Save Changes
                      </>
                    ) : (
                      <>
                        <Plus className="w-4 h-4" /> Add Car to Active Fleet
                      </>
                    )}
                  </button>
                </form>
              </div>
            </div>

            {/* Inventory Fleet List */}
            <div className="lg:col-span-6">
              <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm h-full flex flex-col">
                <div className="mb-6 border-b border-gray-100 pb-4">
                  <h2 className="text-xl font-bold text-gray-900 font-black">Inventory Fleet ({rentalCars.length} Cars)</h2>
                  <p className="text-xs text-gray-500 mt-1">Select availability toggles to change lease status or delete vehicles.</p>
                </div>

                {rentalCars.length === 0 ? (
                  <div className="text-center py-20 flex-grow flex flex-col justify-center items-center bg-gray-50 border border-dashed rounded-xl p-6">
                    <Car className="w-12 h-12 text-gray-300 mb-3" />
                    <p className="text-gray-500 font-bold text-sm">Your rental fleet is empty.</p>
                    <p className="text-xs text-gray-400 mt-1 max-w-[200px]">Add vehicles using the form panel on the left.</p>
                  </div>
                ) : (
                  <div className="space-y-3.5 max-h-[650px] overflow-y-auto pr-1 flex-grow">
                    {rentalCars.map((car) => {
                      const isAvailable = car.status === 'Available';
                      return (
                        <div 
                          key={car.id} 
                          className="p-3.5 rounded-2xl border border-gray-200 hover:border-gray-250 bg-white transition flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
                        >
                          <div className="flex items-center gap-3.5">
                            <img 
                              src={car.images && car.images.length > 0 ? car.images[0] : (car.imageUrl || PRESET_CAR_IMAGES[0].url)} 
                              alt={car.name} 
                              className="w-20 h-14 object-cover rounded-xl border border-gray-100 shrink-0 bg-gray-50" 
                            />
                            <div className="min-w-0">
                              <h3 className="font-extrabold text-gray-900 text-sm sm:text-base leading-snug">{car.name}</h3>
                              
                              <div className="flex flex-wrap items-center gap-2 mt-1.5">
                                <span className="bg-slate-50 text-gray-600 text-[10px] font-bold px-2 py-0.5 rounded border border-gray-100 uppercase">
                                  {car.transmission}
                                </span>
                                <span className="bg-red-50 text-red-650 text-[10px] font-semibold px-2 py-0.5 rounded border border-red-100/50">
                                  {car.city}
                                </span>
                                <span className="text-gray-900 text-xs font-black font-mono">
                                  PKR {car.rentPrice}/{car.rentUnit || 'Day'}
                                </span>
                              </div>
                            </div>
                          </div>

                          <div className="flex items-center sm:self-center justify-between w-full sm:w-auto gap-3.5 border-t sm:border-0 pt-2.5 sm:pt-0">
                            {/* Toggle availability status dropdown */}
                            <div className="relative group/select">
                              <select 
                                value={car.availabilityStatus || (car.status === 'Booked' ? 'Rented Out' : 'Available')}
                                onChange={(e) => toggleCarStatus(car.id, e.target.value as 'Available' | 'Rented Out')}
                                className={`text-[10px] sm:text-xs font-black uppercase tracking-wider px-3 py-2 rounded-xl border appearance-none outline-none transition-all cursor-pointer pr-8 ${
                                  (car.availabilityStatus || (car.status === 'Booked' ? 'Rented Out' : 'Available')) === 'Available'
                                    ? 'bg-green-50 text-green-700 border-green-200 hover:border-green-400' 
                                    : 'bg-amber-50 text-amber-700 border-amber-200 hover:border-amber-400'
                                }`}
                              >
                                <option value="Available">Mark as Available</option>
                                <option value="Rented Out">Mark as Rented Out</option>
                              </select>
                              <ChevronDown className="w-3 h-3 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none opacity-50" />
                            </div>

                            <div className="flex items-center gap-1.5">
                              {/* Edit Button */}
                              <button 
                                onClick={() => startEditingCar(car)} 
                                title="Edit vehicle"
                                type="button"
                                className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition cursor-pointer"
                              >
                                <Edit className="w-5 h-5" />
                              </button>

                              {/* Delete Button */}
                              <button 
                                onClick={() => deleteRentalCar(car.id)} 
                                title="Remove vehicle from inventory"
                                type="button"
                                className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-xl transition cursor-pointer"
                              >
                                <Trash2 className="w-5 h-5" />
                              </button>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            </div>
          </div>
          </div>
        )}

        {activeTab === 'requests' && (
          <div className="bg-white rounded-2xl border border-gray-200/90 shadow-sm p-6 sm:p-8 animate-fade-in space-y-6">
            <div className="border-b border-gray-100 pb-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h2 className="text-2xl font-black text-gray-900 tracking-tight flex items-center gap-2">
                  <Clock className="w-6 h-6 text-indigo-600" />
                  Approve Car Requests
                </h2>
                <p className="text-gray-500 text-xs sm:text-sm mt-1">
                  Review and publish customer requests for rental cars. Approved requests appear on the public directory.
                </p>
              </div>
              <div className="flex gap-2">
                <span className="bg-gray-100 text-gray-700 px-3.5 py-1.5 rounded-xl text-xs font-bold border border-gray-200">
                  Total: {customerRequests.length}
                </span>
                <span className="bg-yellow-50 text-yellow-700 px-3.5 py-1.5 rounded-xl text-xs font-bold border border-yellow-100">
                  Pending: {customerRequests.filter(r => r.status === 'pending').length}
                </span>
              </div>
            </div>

            {customerRequests.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-20 bg-gray-50/40 rounded-3xl border border-dashed border-gray-200 text-center animate-fade-in px-6">
                <div className="w-14 h-14 bg-white rounded-2xl shadow-sm border border-gray-150 flex items-center justify-center mb-5 text-gray-300">
                  <Clock className="w-7 h-7" />
                </div>
                <h3 className="text-gray-900 font-extrabold text-lg tracking-tight">No Active Requests</h3>
                <p className="text-gray-500 text-sm mt-1.5 max-w-sm font-medium">
                  When customers submit car rental requirements through the reverse directory, they will appear here for verification and approval.
                </p>
              </div>
            ) : (
              <div className="overflow-x-auto rounded-xl border border-gray-150">
                <table className="w-full text-left border-collapse text-xs sm:text-sm">
                  <thead>
                    <tr className="bg-gray-50 border-b border-gray-150 text-gray-400 font-extrabold uppercase tracking-wider text-[10px]">
                      <th className="p-4">Customer Details</th>
                      <th className="p-4">Car Wanted</th>
                      <th className="p-4">Duration & Budget</th>
                      <th className="p-4">Status</th>
                      <th className="p-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-150">
                    {customerRequests.map((req) => (
                      <tr key={req.id} className="hover:bg-gray-50/60 transition-colors">
                        <td className="p-4">
                          <p className="font-extrabold text-gray-900">{req.name}</p>
                          <p className="text-xs text-gray-500 mt-0.5">{req.whatsapp}</p>
                          <p className="text-xs text-gray-400">{req.city} {req.area && `(${req.area})`}</p>
                        </td>
                        <td className="p-4">
                          <p className="font-bold text-gray-800">{req.carModel} {req.urgency === 'Urgent' && <span className="text-red-600 text-[10px] font-black uppercase ml-1 animate-pulse">🔥 URGENT</span>}</p>
                          <p className="text-[10px] text-gray-500 uppercase mt-0.5">{req.transmission} • {req.fuelPreference || 'Any Fuel'} • Driver: {req.driverRequired}</p>
                          <p className="text-[10px] text-indigo-600 mt-0.5 font-bold bg-indigo-50 px-1.5 py-0.5 rounded inline-block">{req.travelScope || 'Local'} ({req.estimatedKM || 'Under 500 KM'})</p>
                        </td>
                        <td className="p-4">
                          <p className="font-mono font-bold text-gray-800">{req.startDate} to {req.endDate}</p>
                          <p className="text-xs text-indigo-600 font-black mt-0.5">{req.maxBudget} PKR/Day</p>
                        </td>
                        <td className="p-4">
                          <span className={`px-2.5 py-1 rounded-full text-[10px] uppercase font-bold tracking-wider ${req.status === 'live' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-750'}`}>
                            {req.status}
                          </span>
                        </td>
                        <td className="p-4 text-right">
                          <div className="flex items-center justify-end gap-2">
                            <button
                              onClick={() => setVaultSelectedDocs({ cnic: req.cnicDoc, license: req.licenseDoc, title: `Customer Docs: ${req.name}` })}
                              className="px-3 py-1.5 rounded-lg bg-indigo-50 border border-indigo-100 text-indigo-700 hover:bg-indigo-100 font-bold text-[10px] uppercase tracking-wide transition cursor-pointer"
                              title="Review Vault"
                            >
                              <ShieldCheck className="w-3.5 h-3.5" /> Vault
                            </button>
                            {req.status === 'pending' && (
                              <button
                                onClick={() => handleApproveRequest(req.id)}
                                className="px-3 py-1.5 rounded-lg bg-green-600 hover:bg-green-700 text-white font-extrabold text-[10px] uppercase tracking-wide cursor-pointer flex items-center gap-1"
                              >
                                <Check className="w-3.5 h-3.5" /> Approve
                              </button>
                            )}
                            <button
                              onClick={() => handleRejectRequest(req.id)}
                              className="p-1.5 text-gray-400 hover:text-red-650 hover:bg-red-50 rounded-lg transition cursor-pointer"
                              title="Delete Request"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}

        {activeTab === 'car-sales' && (
          <div className="space-y-8 animate-fade-in" id="sales-admin-hub">
            {/* Header stats bar */}
            <div className="bg-white rounded-2xl border border-gray-200/90 shadow-sm p-6 sm:p-8 space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h2 className="text-2xl font-black text-gray-900 tracking-tight flex items-center gap-2">
                    <Tag className="w-6 h-6 text-red-650" />
                    Car Sales Onboarding & Verification
                  </h2>
                  <p className="text-gray-500 text-xs sm:text-sm mt-1">
                    Verify owner submissions for selling their cars. Approved vehicles are instantly published to the public Car Sale catalog feed.
                  </p>
                </div>
                <div className="flex flex-wrap gap-2">
                  <span className="bg-amber-50 text-amber-800 px-3.5 py-1.5 rounded-xl text-xs font-bold border border-amber-150 border-solid">
                    Awaiting Review: {pendingSaleCars.length}
                  </span>
                  <span className="bg-green-50 text-green-800 px-3.5 py-1.5 rounded-xl text-xs font-bold border border-green-150 border-solid">
                    Live Listings: {saleCars.length}
                  </span>
                </div>
              </div>
            </div>

            {/* Pending Approvals Sub-section */}
            <div className="space-y-4">
              <h3 className="text-lg font-black text-slate-800 tracking-tight flex items-center gap-2 border-b border-gray-150 pb-2">
                <span className="w-2.5 h-2.5 rounded-full bg-amber-500 animate-pulse"></span>
                Pending Review Submissions ({pendingSaleCars.length})
              </h3>

              {pendingSaleCars.length === 0 ? (
                <div className="bg-white rounded-2xl border border-gray-150 p-12 text-center shadow-sm">
                  <Car className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                  <p className="text-sm font-bold text-gray-500">Zabardast! No pending submissions to review.</p>
                  <p className="text-xs text-gray-400 mt-1">Any new submissions from the "Sale Your Car" form will appear here.</p>
                </div>
              ) : (
                <div className="grid md:grid-cols-2 gap-6">
                  {pendingSaleCars.map((car) => (
                    <div 
                      key={car.id} 
                      id={`pending-sale-card-${car.id}`}
                      className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden flex flex-col transition hover:border-gray-300"
                    >
                      {/* Car Thumbnail Image */}
                      <div className="relative h-48 bg-slate-900">
                        <img 
                          src={car.imageUrl} 
                          alt={car.name} 
                          referrerPolicy="no-referrer"
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute top-3 right-3 bg-black/70 text-white px-2.5 py-1 rounded-lg font-bold font-mono text-[10px] uppercase">
                          {car.city}
                        </div>
                        <div className="absolute bottom-3 left-3 bg-red-650 text-white px-3 py-1 rounded-lg font-black text-xs font-mono">
                          PKR {car.rentPrice}
                        </div>
                      </div>

                      {/* Content details */}
                      <div className="p-5 flex-grow space-y-4">
                        <div>
                          <div className="flex justify-between items-start gap-2">
                            <h4 className="text-base font-black text-gray-900 leading-snug">{car.name}</h4>
                            <span className="text-[10px] font-black uppercase text-gray-400 bg-gray-50 border border-gray-100 border-solid rounded px-1.5 py-0.5 whitespace-nowrap">
                              {car.transmission}
                            </span>
                          </div>
                          {car.registrationNumber && (
                            <p className="text-xs font-mono font-bold text-gray-500 mt-0.5">Reg #: {car.registrationNumber}</p>
                          )}
                        </div>

                        {/* Owner details */}
                        <div className="bg-slate-50 rounded-xl p-3 border border-slate-100 border-solid text-xs space-y-2.5">
                          <div className="flex justify-between font-medium">
                            <span className="text-gray-400 font-bold uppercase tracking-wider text-[9px]">Seller:</span>
                            <span className="font-extrabold text-gray-800">{car.ownerName}</span>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="text-gray-400 font-bold uppercase tracking-wider text-[9px]">Contact:</span>
                            <span className="font-bold text-gray-800 font-mono flex items-center gap-1.5">
                              {car.displayPhone || car.ownerPhone}
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-400 font-bold uppercase tracking-wider text-[9px]">Sub City:</span>
                            <span className="font-bold text-gray-800">{car.ownerCity}</span>
                          </div>
                          {car.fuelType && (
                            <div className="flex justify-between">
                              <span className="text-gray-400 font-bold uppercase tracking-wider text-[9px]">Fuel Type:</span>
                              <span className="font-bold text-gray-800 uppercase text-[10px]">{car.fuelType}</span>
                            </div>
                          )}
                        </div>

                        <div className="text-xs text-gray-600 font-medium leading-relaxed bg-amber-50/40 p-3 rounded-lg border border-amber-100 border-solid">
                          <span className="font-bold text-amber-800">Description: </span>
                          {car.description}
                        </div>
                      </div>

                      {/* Approve / Reject buttons */}
                      <div className="bg-gray-50 border-t border-gray-100 p-4 shrink-0 flex gap-3">
                        <button
                          id={`btn-approve-sale-${car.id}`}
                          onClick={() => approveSaleCarOnboarding(car)}
                          className="flex-1 bg-green-600 hover:bg-green-700 text-white font-bold py-2.5 rounded-xl transition text-xs shrink-0 cursor-pointer"
                        >
                          Approve Listing
                        </button>
                        <button
                          onClick={() => rejectSaleCarOnboarding(car.id)}
                          className="bg-gray-100 hover:bg-red-50 text-gray-700 hover:text-red-600 font-extrabold px-4 py-2.5 rounded-xl transition text-xs cursor-pointer border border-gray-200 border-solid hover:border-red-100 shrink-0"
                        >
                          Reject
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Published Active Listings View */}
            <div className="space-y-4">
              <h3 className="text-lg font-black text-slate-800 tracking-tight flex items-center gap-2 border-b border-gray-150 pb-2">
                <span className="w-2.5 h-2.5 rounded-full bg-green-500"></span>
                Active Published Sale Cars ({saleCars.length})
              </h3>

              {saleCars.length === 0 ? (
                <div className="bg-white rounded-2xl border border-gray-150 p-8 text-center shadow-sm">
                  <p className="text-sm font-bold text-gray-500">No active vehicles on checkout feed yet.</p>
                  <p className="text-xs text-gray-400 mt-1">Once you approve any pending car sale request, it will be displayed here.</p>
                </div>
              ) : (
                <div className="bg-white rounded-2xl border border-gray-200 border-solid shadow-sm overflow-hidden animate-fade-in">
                  <div className="overflow-x-auto">
                    <table className="w-full text-left text-xs border-collapse">
                      <thead>
                        <tr className="bg-gray-50 border-b border-gray-100 border-solid font-bold text-gray-400 uppercase tracking-wider text-[9px]">
                          <th className="p-4">Car Model</th>
                          <th className="p-4">City</th>
                          <th className="p-4">Asking Price</th>
                          <th className="p-4">Transmission</th>
                          <th className="p-4 font-bold">Owner Name</th>
                          <th className="p-4">Owner WhatsApp</th>
                          <th className="p-4 text-center">Action</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-100 font-medium">
                        {saleCars.map((car) => (
                          <tr key={car.id} className="hover:bg-slate-50/50 transition duration-150">
                            <td className="p-4">
                              <div className="flex items-center gap-3">
                                <img src={car.imageUrl} alt={car.name} className="w-10 h-7 rounded object-cover shadow-sm " />
                                <div>
                                  <span className="font-extrabold text-slate-800 text-sm">{car.name}</span>
                                  {car.registrationNumber && <p className="text-[10px] text-gray-400 font-mono">Reg: {car.registrationNumber}</p>}
                                </div>
                              </div>
                            </td>
                            <td className="p-4 text-slate-650 font-bold">{car.city}</td>
                            <td className="p-4 font-black font-mono text-slate-800 text-sm">PKR {car.rentPrice}</td>
                            <td className="p-4">
                              <span className="bg-slate-100 text-slate-700 font-black uppercase text-[10px] px-2 py-0.5 rounded border border-slate-150 border-solid">
                                {car.transmission}
                              </span>
                            </td>
                            <td className="p-4 font-bold text-slate-700">{car.ownerName}</td>
                            <td className="p-4 font-mono text-slate-500">{car.displayPhone || car.ownerPhone}</td>
                            <td className="p-4 text-center">
                              <button
                                onClick={() => deleteApprovedSaleCar(car.id)}
                                className="p-2 text-slate-400 hover:text-red-650 hover:bg-red-50 rounded-xl transition cursor-pointer"
                                title="Remove listing permanently"
                              >
                                <Trash2 className="w-5 h-5" />
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {activeTab === 'courses' && (
          <div className="space-y-8 animate-fade-in" id="courses-admin-hub">
            {/* Courses Tab Head */}
            <div className="bg-white rounded-2xl border border-gray-200/90 shadow-sm p-6 sm:p-8 space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h2 className="text-2xl font-black text-gray-900 tracking-tight flex items-center gap-2">
                    <Sliders className="w-6 h-6 text-red-650" />
                    Manage Academy Driving Courses (ڈرائیونگ کورسز مینیجر)
                  </h2>
                  <p className="text-gray-500 text-xs sm:text-sm mt-1">
                    Configure high-fidelity package courses. All updates are synchronized dynamically across the public pricing catalog view in real-time.
                  </p>
                </div>
                <div className="flex gap-2">
                  <span className="bg-red-50 text-red-650 px-3.5 py-1.5 rounded-xl text-xs font-bold border border-red-100">
                    Active Courses: {drivingCourses.length}
                  </span>
                </div>
              </div>
            </div>

            <div className="grid lg:grid-cols-12 gap-8">
              {/* Left Column: Form */}
              <div className="lg:col-span-5 space-y-6">
                <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm">
                  <div className="flex items-center gap-2 mb-6 border-b border-gray-100 pb-4">
                    <span className="p-2 bg-red-50 text-red-600 rounded-lg">
                      <Plus className="w-5 h-5" />
                    </span>
                    <h3 className="text-xl font-extrabold text-gray-900">
                      {editingCourseId ? 'Edit Academy Course' : 'Create New Course'}
                    </h3>
                  </div>

                  <form onSubmit={(e) => {
                    e.preventDefault();
                    if (!newCourse.courseTitle || !newCourse.courseFee) {
                      showToast('Course Title and Course Fee are required.', 'error');
                      return;
                    }
                    if (editingCourseId) {
                      const updated = drivingCourses.map(c => c.id === editingCourseId ? { ...newCourse, id: editingCourseId } : c);
                      setDrivingCourses(updated);
                      localStorage.setItem('driving_courses_v4', JSON.stringify(updated));
                      setEditingCourseId(null);
                      setNewCourse({
                        courseTitle: '',
                        courseDescription: '',
                        courseFee: '',
                        carImage: '',
                        lessonDuration: '30 Mins Driving Lesson',
                        dailyTime: '40 min Per Day',
                        theoryDuration: '10 min Theory Session',
                        coursePeriod: '10 Days Course',
                        additionalTime: 'Additional Time Available'
                      });
                      showToast('Course package updated successfully!', 'success');
                    } else {
                      const courseId = 'course-' + Date.now().toString();
                      const finalCourse = { ...newCourse, id: courseId };
                      const updated = [finalCourse, ...drivingCourses];
                      setDrivingCourses(updated);
                      localStorage.setItem('driving_courses_v4', JSON.stringify(updated));
                      setNewCourse({
                        courseTitle: '',
                        courseDescription: '',
                        courseFee: '',
                        carImage: '',
                        lessonDuration: '30 Mins Driving Lesson',
                        dailyTime: '40 min Per Day',
                        theoryDuration: '10 min Theory Session',
                        coursePeriod: '10 Days Course',
                        additionalTime: 'Additional Time Available'
                      });
                      showToast('New course package added successfully!', 'success');
                    }
                    window.dispatchEvent(new Event('driving_courses_updated'));
                    window.dispatchEvent(new Event('storage'));
                  }} className="space-y-4">
                    <div>
                      <label className="block text-sm font-bold text-gray-700 mb-1">Course Title *</label>
                      <input 
                        required
                        type="text" 
                        className="w-full border border-gray-300 p-3 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none transition text-sm font-medium" 
                        placeholder="e.g. Honda Civic (Manual)" 
                        value={newCourse.courseTitle} 
                        onChange={e => setNewCourse({...newCourse, courseTitle: e.target.value})} 
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-bold text-gray-700 mb-1">Course Description *</label>
                      <input 
                        required
                        type="text" 
                        className="w-full border border-gray-300 p-3 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none transition text-sm font-medium" 
                        placeholder="e.g. Learn driving with automatic or manual Honda Civic." 
                        value={newCourse.courseDescription} 
                        onChange={e => setNewCourse({...newCourse, courseDescription: e.target.value})} 
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-bold text-gray-700 mb-1">Course Fee (PKR) *</label>
                      <input 
                        required
                        type="text" 
                        className="w-full border border-gray-300 p-3 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none transition text-sm font-mono font-bold" 
                        placeholder="e.g. 25000" 
                        value={newCourse.courseFee} 
                        onChange={e => setNewCourse({...newCourse, courseFee: e.target.value})} 
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-bold text-gray-700 mb-1">Car Cover Image URL</label>
                      <input 
                        type="text" 
                        className="w-full border border-gray-300 p-3 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none transition text-xs font-mono" 
                        placeholder="Or leave empty & choose a preset image below" 
                        value={newCourse.carImage} 
                        onChange={e => setNewCourse({...newCourse, carImage: e.target.value})} 
                      />
                    </div>

                    {/* Presets and custom uploader */}
                    <div className="bg-gray-50 p-4 rounded-xl border border-dashed border-gray-300 space-y-4">
                      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                        <span className="font-bold text-xs text-gray-800 flex items-center gap-1.5 uppercase tracking-wide">
                          <ImageIcon className="w-4 h-4 text-gray-500" /> Choose Car Preset
                        </span>
                        <label className="inline-flex items-center gap-1.5 bg-white hover:bg-gray-100 text-gray-700 border border-gray-300 px-3 py-1.5 rounded-lg cursor-pointer text-xs font-bold transition">
                          <Upload className="w-3.5 h-3.5 text-gray-500" /> Upload File
                          <input 
                            type="file" 
                            accept="image/*" 
                            className="hidden" 
                            onChange={(e) => {
                              const file = e.target.files?.[0];
                              if (file) {
                                const reader = new FileReader();
                                reader.onloadend = () => {
                                  if (typeof reader.result === 'string') {
                                    setNewCourse(prev => ({ ...prev, carImage: reader.result as string }));
                                  }
                                };
                                reader.readAsDataURL(file);
                              }
                            }} 
                          />
                        </label>
                      </div>

                      <div className="grid grid-cols-6 gap-2">
                        {PRESET_CAR_IMAGES.map((img, i) => {
                          const isSelected = newCourse.carImage === img.url;
                          return (
                            <button
                              key={i}
                              type="button"
                              title={img.label}
                              onClick={() => setNewCourse(prev => ({ ...prev, carImage: img.url }))}
                              className={`relative aspect-video rounded-lg overflow-hidden border-2 transition-all ${
                                isSelected ? 'border-red-650 scale-95 ring-2 ring-red-100' : 'border-transparent hover:border-gray-400'
                              }`}
                            >
                              <img src={img.url} alt={img.label} className="w-full h-full object-cover" />
                              {isSelected && (
                                <div className="absolute inset-0 bg-red-600/20 flex items-center justify-center">
                                  <span className="bg-red-600 text-white rounded-full p-0.5">
                                    <Check className="w-2.5 h-2.5" />
                                  </span>
                                </div>
                              )}
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    <div className="border-t border-gray-150 pt-4 mt-2 space-y-4">
                      <p className="text-xs font-black uppercase text-gray-500 tracking-wider">Course Bullet Parameters (سہولیات):</p>
                      
                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <label className="block text-[11px] font-bold text-gray-500 mb-1">Lesson Duration</label>
                          <input 
                            type="text" 
                            className="w-full border border-gray-300 p-2.5 rounded-lg text-xs" 
                            placeholder="e.g. 30 Mins Driving Lesson" 
                            value={newCourse.lessonDuration} 
                            onChange={e => setNewCourse({...newCourse, lessonDuration: e.target.value})} 
                          />
                        </div>
                        <div>
                          <label className="block text-[11px] font-bold text-gray-500 mb-1">Daily Timing</label>
                          <input 
                            type="text" 
                            className="w-full border border-gray-300 p-2.5 rounded-lg text-xs" 
                            placeholder="e.g. 40 min Per Day" 
                            value={newCourse.dailyTime} 
                            onChange={e => setNewCourse({...newCourse, dailyTime: e.target.value})} 
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <label className="block text-[11px] font-bold text-gray-500 mb-1">Theory Session</label>
                          <input 
                            type="text" 
                            className="w-full border border-gray-300 p-2.5 rounded-lg text-xs" 
                            placeholder="e.g. 10 min Theory Session" 
                            value={newCourse.theoryDuration} 
                            onChange={e => setNewCourse({...newCourse, theoryDuration: e.target.value})} 
                          />
                        </div>
                        <div>
                          <label className="block text-[11px] font-bold text-gray-500 mb-1">Course Period</label>
                          <input 
                            type="text" 
                            className="w-full border border-gray-300 p-2.5 rounded-lg text-xs" 
                            placeholder="e.g. 10 Days Course" 
                            value={newCourse.coursePeriod} 
                            onChange={e => setNewCourse({...newCourse, coursePeriod: e.target.value})} 
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-[11px] font-bold text-gray-500 mb-1">Additional Time Info</label>
                        <input 
                          type="text" 
                          className="w-full border border-gray-300 p-2.5 rounded-lg text-xs" 
                          placeholder="e.g. Additional Time Available" 
                          value={newCourse.additionalTime} 
                          onChange={e => setNewCourse({...newCourse, additionalTime: e.target.value})} 
                        />
                      </div>
                    </div>

                    <div className="flex gap-2 pt-2">
                      <button 
                        type="submit"
                        className="flex-grow bg-red-650 hover:bg-red-700 text-white py-3.5 rounded-xl font-bold transition flex items-center justify-center gap-2 shadow-md shadow-red-200 cursor-pointer text-sm font-sans"
                      >
                        <Save className="w-4 h-4" />
                        {editingCourseId ? 'Save Core Package' : 'Publish Package'}
                      </button>
                      {editingCourseId && (
                        <button 
                          type="button"
                          onClick={() => {
                            setEditingCourseId(null);
                            setNewCourse({
                              courseTitle: '',
                              courseDescription: '',
                              courseFee: '',
                              carImage: '',
                              lessonDuration: '30 Mins Driving Lesson',
                              dailyTime: '40 min Per Day',
                              theoryDuration: '10 min Theory Session',
                              coursePeriod: '10 Days Course',
                              additionalTime: 'Additional Time Available'
                            });
                          }}
                          className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-3.5 rounded-xl text-xs font-bold transition font-sans cursor-pointer"
                        >
                          Cancel
                        </button>
                      )}
                    </div>
                  </form>
                </div>
              </div>

              {/* Right Column: Dynamic Course Index List */}
              <div className="lg:col-span-7 space-y-6">
                <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm min-h-[400px]">
                  <div className="border-b border-gray-100 pb-4 mb-4">
                    <h3 className="font-extrabold text-gray-900 text-lg">Active Course Templates ({drivingCourses.length})</h3>
                    <p className="text-gray-500 text-xs text-sans">These templates are editable. Changes apply to the public facing catalog index instantly.</p>
                  </div>

                  {drivingCourses.length === 0 ? (
                    <div className="text-center py-20 bg-gray-50 border border-dashed rounded-xl p-6">
                      <Sliders className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                      <p className="text-gray-500 font-bold text-sm">Course template registry is empty.</p>
                      <p className="text-xs text-gray-400 mt-1">Please insert parameters on the left to republish packages.</p>
                    </div>
                  ) : (
                    <div className="grid sm:grid-cols-2 gap-4">
                      {drivingCourses.map((course) => (
                        <div key={course.id} className="bg-gray-50/70 border border-gray-200 rounded-2xl p-4 flex flex-col justify-between hover:border-gray-350 hover:shadow-sm transition">
                          <div>
                            <div className="aspect-video w-full rounded-xl overflow-hidden bg-gray-200 border border-gray-200/50 mb-3 relative">
                              <img 
                                src={course.carImage || 'https://images.unsplash.com/photo-1617469767053-d3b508a0d825?auto=format&fit=crop&q=80&w=300'} 
                                alt={course.courseTitle} 
                                className="w-full h-full object-cover" 
                                referrerPolicy="no-referrer"
                              />
                              <div className="absolute top-2.5 right-2.5 bg-red-600 text-white font-mono font-black text-xs px-2.5 py-1 rounded-lg">
                                PKR {course.courseFee}
                              </div>
                            </div>

                            <h3 className="font-black text-gray-900 text-base leading-snug">{course.courseTitle}</h3>
                            <p className="text-xs text-gray-500 leading-relaxed mt-1 font-sans">{course.courseDescription}</p>

                            <ul className="text-[10px] space-y-1.5 mt-3 font-medium text-gray-600 bg-white p-2.5 rounded-xl border border-gray-150">
                              <li className="flex items-center gap-1.5"><Check className="w-3.5 h-3.5 text-red-600 shrink-0" /> {course.lessonDuration}</li>
                              <li className="flex items-center gap-1.5"><Check className="w-3.5 h-3.5 text-red-600 shrink-0" /> {course.dailyTime}</li>
                              <li className="flex items-center gap-1.5"><Check className="w-3.5 h-3.5 text-red-650 shrink-0" /> {course.theoryDuration}</li>
                              <li className="flex items-center gap-1.5"><Check className="w-3.5 h-3.5 text-red-650 shrink-0" /> {course.coursePeriod}</li>
                              <li className="flex items-center gap-1.5"><Check className="w-3.5 h-3.5 text-red-650 shrink-0" /> {course.additionalTime}</li>
                            </ul>
                          </div>

                          <div className="flex gap-2 mt-4 pt-3 border-t border-gray-200">
                            <button
                              type="button"
                              onClick={() => {
                                setEditingCourseId(course.id);
                                setNewCourse(course);
                                window.scrollTo({ top: 300, behavior: 'smooth' });
                              }}
                              className="flex-1 bg-white hover:bg-gray-50 text-gray-700 border border-gray-300 font-bold text-xs py-2 rounded-xl transition flex items-center justify-center gap-1.5 cursor-pointer font-sans"
                            >
                              <Edit className="w-3.5 h-3.5 text-gray-500" /> Edit Details
                            </button>
                            <button
                              type="button"
                              onClick={() => {
                                if (window.confirm(`Delete "${course.courseTitle}" course template?`)) {
                                  const updated = drivingCourses.filter(c => c.id !== course.id);
                                  setDrivingCourses(updated);
                                  localStorage.setItem('driving_courses_v4', JSON.stringify(updated));
                                  showToast('Course package deleted.', 'info');
                                  window.dispatchEvent(new Event('driving_courses_updated'));
                                  window.dispatchEvent(new Event('storage'));
                                }
                              }}
                              className="bg-white hover:bg-red-50 text-red-600 border border-red-200 hover:border-red-300 font-bold text-xs p-2 rounded-xl transition cursor-pointer"
                              title="Delete template"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
          </div> {/* Closes right workspace lg:col-span-9 */}
        </div> {/* Closes master workspace grid */}
      </div> {/* Closes main container max-w-7xl */}

      {/* Verification Vault Modal */}
      {vaultSelectedDocs && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setVaultSelectedDocs(null)} />
          <div className="bg-white rounded-3xl overflow-hidden shadow-2xl relative w-full max-w-2xl max-h-[90vh] flex flex-col z-10 animate-fade-in relative">
            <div className="flex items-center justify-between p-5 border-b border-gray-100 bg-gray-50/50">
              <h3 className="font-black text-gray-900 tracking-tight flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-indigo-600" />
                {vaultSelectedDocs.title}
              </h3>
              <button 
                onClick={() => setVaultSelectedDocs(null)}
                className="p-2 bg-gray-100 hover:bg-gray-200 text-gray-500 rounded-full transition cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-6 overflow-y-auto space-y-8 h-full">
              {vaultSelectedDocs.cnic ? (
                <div>
                  <h4 className="text-xs font-black uppercase tracking-wider text-gray-700 mb-3 border-b pb-1">CNIC Document (Front & Back)</h4>
                  <img src={vaultSelectedDocs.cnic} alt="CNIC Document" className="w-full rounded-xl border border-gray-200 shadow-sm object-contain max-h-96" />
                </div>
              ) : (
                <div className="bg-gray-50 text-gray-400 text-center p-4 rounded-xl text-sm italic font-medium">No CNIC uploaded</div>
              )}

              {vaultSelectedDocs.registration && (
                <div>
                  <h4 className="text-xs font-black uppercase tracking-wider text-gray-700 mb-3 border-b pb-1">Vehicle Registration Book</h4>
                  <img src={vaultSelectedDocs.registration} alt="Registration Document" className="w-full rounded-xl border border-gray-200 shadow-sm object-contain max-h-96" />
                </div>
              )}

              {vaultSelectedDocs.license && (
                <div>
                  <h4 className="text-xs font-black uppercase tracking-wider text-gray-700 mb-3 border-b pb-1">Driving License</h4>
                  <img src={vaultSelectedDocs.license} alt="Driving License" className="w-full rounded-xl border border-gray-200 shadow-sm object-contain max-h-96" />
                </div>
              )}
            </div>
            <div className="p-5 border-t border-gray-100 bg-gray-50 flex justify-end">
              <button 
                onClick={() => setVaultSelectedDocs(null)}
                className="px-6 py-2.5 bg-gray-900 text-white font-bold text-xs uppercase tracking-wider rounded-xl transition hover:bg-gray-800"
              >
                Close Vault
              </button>
            </div>
          </div>
        </div>
      )}

      {toastMessage && (
        <div className="fixed z-50 bottom-12 right-6 max-w-sm w-full bg-slate-950 border border-slate-800 text-white rounded-2xl p-4 shadow-2xl flex items-start gap-3 animate-slide-up">
          <div className={`p-1.5 rounded-lg shrink-0 mt-0.5 ${
            toastMessage.type === 'success' ? 'bg-emerald-500/10 text-emerald-400' :
            toastMessage.type === 'error' ? 'bg-red-500/10 text-red-400' :
            'bg-blue-500/10 text-blue-400'
          }`}>
            {toastMessage.type === 'success' ? <CheckCircle2 className="w-5 h-5 text-emerald-400" /> :
             toastMessage.type === 'error' ? <AlertCircle className="w-5 h-5 text-red-400" /> :
             <Sparkles className="w-5 h-5 text-amber-400" />}
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-xs font-bold uppercase tracking-wider text-slate-400">
              System Notification
            </p>
            <p className="text-xs sm:text-sm font-semibold text-slate-100 mt-1 leading-relaxed">
              {toastMessage.text}
            </p>
          </div>
          <button 
            onClick={() => setToastMessage(null)}
            className="text-slate-500 hover:text-slate-300 p-1 rounded-lg transition"
            type="button"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      <CTABanner />
      <Footer />
    </div>
  );
}
