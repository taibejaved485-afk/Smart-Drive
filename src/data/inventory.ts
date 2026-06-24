
export interface RentalCar {
  id: string;
  name: string;
  transmission: 'Automatic' | 'Manual';
  rentPrice: string;
  rentUnit: 'Day' | 'Hour';
  imageUrl: string;
  images?: string[];
  city: string;
  status: 'Available' | 'Booked';
  availabilityStatus?: 'Available' | 'Rented Out';
  type: 'Economy' | 'Sedan' | 'Luxury';
  isVerified?: boolean;
  hasRealPhoto?: boolean;
  registrationNumber?: string;
  ownerName?: string;
  ownerPhone?: string;
  fuelType?: string;
  description?: string;
  withDriver?: boolean;
  area?: string;
  rentalsCompleted?: number;
  rating?: number;
  landlordRating?: number;
}

export const isCarComplete = (car: any): boolean => {
  if (!car) return false;
  if (!car.id) return false;
  if (!car.name || car.name.trim() === '') return false;
  
  // Name shouldn't contain dummy skeleton text
  const nameLower = car.name.toLowerCase();
  if (nameLower.includes('placeholder') || nameLower.includes('skeleton') || nameLower.includes('draft')) {
    return false;
  }
  
  // Rent price must exist, not be empty or 0, and be a valid number
  const priceStr = car.rentPrice ? String(car.rentPrice).trim() : '';
  if (!priceStr || priceStr === '0' || priceStr.toLowerCase().includes('tbd') || priceStr.toLowerCase().includes('n/a')) {
    return false;
  }
  const priceNum = parseInt(priceStr.replace(/[^0-9]/g, ''), 10) || 0;
  if (priceNum <= 0) return false;

  // City must be valid
  if (!car.city || car.city.trim() === '') return false;

  // Contact info is essential for booking to be functional
  if (!car.ownerPhone || car.ownerPhone.trim() === '') return false;

  // Image must be valid
  const hasImg = (car.images && car.images.length > 0 && !!car.images[0]) || (car.imageUrl && car.imageUrl.trim() !== '');
  if (!hasImg) return false;

  return true;
};

export const INITIAL_RENTAL_FLEET: RentalCar[] = [
  {
    id: 'rc-1',
    name: 'Honda Civic Pro (VTEC)',
    transmission: 'Automatic',
    rentPrice: '12,000',
    rentUnit: 'Day',
    imageUrl: 'https://images.unsplash.com/photo-1580273916550-e323be2ae537?auto=format&fit=crop&q=80&w=600',
    images: [
      'https://images.unsplash.com/photo-1580273916550-e323be2ae537?auto=format&fit=crop&q=80&w=600',
      'https://images.unsplash.com/photo-1590362891991-f70281b373ee?auto=format&fit=crop&q=80&w=600',
      'https://images.unsplash.com/photo-1550355291-bbee04a92027?auto=format&fit=crop&q=80&w=600',
      'https://images.unsplash.com/photo-1549314488-87cc9c3bc89a?auto=format&fit=crop&q=80&w=600'
    ],
    city: 'Faisalabad',
    status: 'Available',
    type: 'Sedan',
    isVerified: true,
    registrationNumber: 'FSD-22-6710',
    ownerName: 'GoDriveify Official',
    ownerPhone: '923097666928',
    fuelType: 'Petrol',
    description: 'Pristine, fully loaded automatic sedan.',
    rentalsCompleted: 14,
    rating: 4.9,
    landlordRating: 4.9
  },
  {
    id: 'rc-2',
    name: 'Toyota Yaris Ativ',
    transmission: 'Automatic',
    rentPrice: '6,500',
    rentUnit: 'Day',
    imageUrl: 'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&q=80&w=600',
    images: [
      'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&q=80&w=600',
      'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?auto=format&fit=crop&q=80&w=600'
    ],
    city: 'Lahore',
    status: 'Available',
    type: 'Sedan',
    isVerified: true,
    registrationNumber: 'LHR-21-9954',
    ownerName: 'Mian Fawad',
    ownerPhone: '923015467812',
    fuelType: 'Petrol',
    description: 'Clean compact sedan with phenomenal fuel average.',
    rentalsCompleted: 8,
    rating: 4.85,
    landlordRating: 4.85
  },
  {
    id: 'rc-3',
    name: 'Toyota Corolla Altis',
    transmission: 'Manual',
    rentPrice: '7,500',
    rentUnit: 'Day',
    imageUrl: 'https://images.unsplash.com/photo-1542282088-fe8426682b8f?auto=format&fit=crop&q=80&w=600',
    images: [
      'https://images.unsplash.com/photo-1542282088-fe8426682b8f?auto=format&fit=crop&q=80&w=600',
      'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&q=80&w=600'
    ],
    city: 'Islamabad',
    status: 'Booked',
    type: 'Sedan',
    isVerified: false,
    registrationNumber: 'ICT-18-5002',
    ownerName: 'Chaudhary Bilal',
    ownerPhone: '923214567890',
    fuelType: 'Petrol',
    description: 'Highly comfortable luxury cruiser.',
    rentalsCompleted: 1,
    rating: 4.2
  },
  {
    id: 'rc-4',
    name: 'Suzuki Swift GLX',
    transmission: 'Automatic',
    rentPrice: '5,500',
    rentUnit: 'Day',
    imageUrl: 'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?auto=format&fit=crop&q=80&w=600',
    images: [
      'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?auto=format&fit=crop&q=80&w=600'
    ],
    city: 'Karachi',
    status: 'Available',
    type: 'Economy',
    isVerified: true,
    registrationNumber: 'KHI-23-4551',
    ownerName: 'Hamza Malik',
    ownerPhone: '923331234567',
    fuelType: 'Petrol',
    description: 'Nifty and dynamic city hatchback.',
    rentalsCompleted: 7,
    rating: 4.92,
    landlordRating: 4.92
  },
  {
    id: 'rc-5',
    name: 'Hyundai Elantra GLS',
    transmission: 'Automatic',
    rentPrice: '9,000',
    rentUnit: 'Day',
    imageUrl: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&q=80&w=600',
    images: [
      'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&q=80&w=600',
      'https://images.unsplash.com/photo-1549314488-87cc9c3bc89a?auto=format&fit=crop&q=80&w=600'
    ],
    city: 'Lahore',
    status: 'Available',
    type: 'Sedan',
    isVerified: true,
    registrationNumber: 'LHR-22-3810',
    ownerName: 'Mian Fawad',
    ownerPhone: '923015467812',
    fuelType: 'Petrol',
    description: 'Luxurious premium ride with standard leather suite.',
    rentalsCompleted: 4,
    rating: 4.7,
    landlordRating: 4.7
  },
  {
    id: 'rc-6',
    name: 'Honda City Aspire',
    transmission: 'Manual',
    rentPrice: '6,000',
    rentUnit: 'Day',
    imageUrl: 'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&q=80&w=600',
    images: [
      'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&q=80&w=600'
    ],
    city: 'Faisalabad',
    status: 'Available',
    type: 'Economy',
    isVerified: false,
    registrationNumber: 'FSD-19-4402',
    ownerName: 'Usman Ghani',
    ownerPhone: '923014455667',
    fuelType: 'Petrol',
    description: 'Efficient and reliable economy commute.',
    rentalsCompleted: 2,
    rating: 4.4,
    landlordRating: 4.4
  },
  {
    id: 'rc-7',
    name: 'Toyota Fortuner Legender',
    transmission: 'Automatic',
    rentPrice: '45,000',
    rentUnit: 'Day',
    imageUrl: 'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&q=80&w=600',
    city: 'Islamabad',
    status: 'Available',
    type: 'Luxury',
    isVerified: true,
    registrationNumber: 'ICT-23-4001',
    ownerName: 'Malik Tanveer',
    ownerPhone: '923129876543',
    fuelType: 'Diesel',
    description: 'Dominant 4x4 off-roader for elite travel.',
    rentalsCompleted: 15,
    rating: 4.95,
    landlordRating: 4.95
  },
  {
    id: 'rc-8',
    name: 'Mercedes Benz C-Class',
    transmission: 'Automatic',
    rentPrice: '38,000',
    rentUnit: 'Day',
    imageUrl: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&q=80&w=600',
    city: 'Lahore',
    status: 'Available',
    type: 'Luxury',
    isVerified: true,
    registrationNumber: 'LHR-22-9901',
    ownerName: 'Salman Sethi',
    ownerPhone: '923021122334',
    fuelType: 'Petrol',
    description: 'Executive status sedan with unrivaled comfort.',
    rentalsCompleted: 9,
    rating: 4.88,
    landlordRating: 4.88
  }
];

export const INITIAL_SALE_FLEET: RentalCar[] = [
  {
    id: 'sc-1',
    name: 'Toyota Corolla GLi 1.3',
    transmission: 'Manual',
    rentPrice: '3,250,000',
    rentUnit: 'Day', // Dummy unit required by interface, will be ignored for sales
    imageUrl: 'https://images.unsplash.com/photo-1617469767053-d3b508a0d825?auto=format&fit=crop&q=80&w=600',
    images: [
      'https://images.unsplash.com/photo-1617469767053-d3b508a0d825?auto=format&fit=crop&q=80&w=600'
    ],
    city: 'Faisalabad',
    status: 'Available',
    type: 'Sedan',
    isVerified: true,
    registrationNumber: 'FSD-18-4231',
    ownerName: 'Zahid Mehmood',
    ownerPhone: '923097666928',
    fuelType: 'Petrol',
    description: 'First hand family used car, bumper-to-bumper genuine condition. Excellent fuel average.',
    rentalsCompleted: 0,
    rating: 5.0,
    landlordRating: 5.0
  },
  {
    id: 'sc-2',
    name: 'Suzuki Alto VXL',
    transmission: 'Automatic',
    rentPrice: '2,650,000',
    rentUnit: 'Day',
    imageUrl: 'https://images.unsplash.com/photo-1605559424843-9e4c228bf1c2?auto=format&fit=crop&q=80&w=600',
    images: [
      'https://images.unsplash.com/photo-1605559424843-9e4c228bf1c2?auto=format&fit=crop&q=80&w=600'
    ],
    city: 'Lahore',
    status: 'Available',
    type: 'Economy',
    isVerified: true,
    registrationNumber: 'LEC-22-1150',
    ownerName: 'Amjad Ali',
    ownerPhone: '923015467812',
    fuelType: 'Petrol',
    description: 'Perfect daily runner, AGs automatic transmission, chilled AC, minor scratches on back bumper.',
    rentalsCompleted: 0,
    rating: 4.8,
    landlordRating: 4.8
  },
  {
    id: 'sc-3',
    name: 'Honda Civic Oriel 1.8 i-VTEC',
    transmission: 'Automatic',
    rentPrice: '5,800,000',
    rentUnit: 'Day',
    imageUrl: 'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&q=80&w=600',
    images: [
      'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&q=80&w=600'
    ],
    city: 'Islamabad',
    status: 'Available',
    type: 'Sedan',
    isVerified: true,
    registrationNumber: 'ICT-20-8891',
    ownerName: 'Muhammad Salman',
    ownerPhone: '923214567890',
    fuelType: 'Petrol',
    description: 'Sunroof, cruise control, leather seats, entirely maintained by Honda dealership. Immaculate body line.',
    rentalsCompleted: 0,
    rating: 4.9,
    landlordRating: 4.9
  },
  {
    id: 'sc-4',
    name: 'Toyota Prado TX 3.0D',
    transmission: 'Automatic',
    rentPrice: '14,500,000',
    rentUnit: 'Day',
    imageUrl: 'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&q=80&w=600',
    images: [
      'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&q=80&w=600'
    ],
    city: 'Karachi',
    status: 'Available',
    type: 'Luxury',
    isVerified: true,
    registrationNumber: 'BC-9954',
    ownerName: 'Sardar Khosa',
    ownerPhone: '923331234567',
    fuelType: 'Diesel',
    description: 'TZ G-Frontier model, 7-seater, adjustable suspension, dual AC, perfect sunroof, completely loaded.',
    rentalsCompleted: 0,
    rating: 4.95,
    landlordRating: 4.95
  }
];

