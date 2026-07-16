import { createClient } from '@supabase/supabase-js';

// @ts-ignore
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || import.meta.env.NEXT_PUBLIC_SUPABASE_URL || 'https://dqqlqjloddysncowgadi.supabase.co';
// @ts-ignore
const supabaseKey = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY || import.meta.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY || 'sb_publishable_Xv2JhwrjFQesfZ5rjs_Hew_UwPUoQDN';

// Let's create the client. If variables are missing, we don't crash, instead we handle it gracefully.
export const supabase = supabaseUrl && supabaseKey 
  ? createClient(supabaseUrl, supabaseKey) 
  : null;

if (!supabase) {
  console.warn(
    "⚠️ Supabase credentials are missing or empty in environment. The application is running in local-first fallback mode utilizing LocalStorage persistence."
  );
}

// -------------------------------------------------------------------------
// Helper Types matching database schemas
// -------------------------------------------------------------------------

export interface DbSaleCar {
  id?: string;
  name: string;
  owner_name: string;
  owner_phone: string;
  owner_city: string;
  city: string;
  transmission: string;
  fuel_type: string;
  rent_price: string;
  rent_unit?: string;
  description?: string;
  image_url?: string;
  images?: string[];
  registration_number?: string;
  cnic_doc?: string;
  registration_doc?: string;
  status?: string;
  approved?: boolean;
  created_at?: string;
}

export interface DbRentalCar {
  id?: string;
  name: string;
  owner_name?: string;
  owner_phone?: string;
  owner_city?: string;
  city: string;
  transmission: string;
  fuel_type: string;
  rent_price: string;
  rent_unit?: string;
  description?: string;
  image_url?: string;
  images?: string[];
  registration_number?: string;
  cnic_doc?: string;
  registration_doc?: string;
  status?: string;
  approved?: boolean;
  created_at?: string;
}

export interface DbDrivingBooking {
  id?: string;
  course_id: string;
  course_name: string;
  price: string;
  customer_name: string;
  phone: string;
  email?: string;
  starting_date: string;
  preferred_slot: string;
  status?: string;
  created_at?: string;
}

export interface DbCustomerRequest {
  id?: string;
  car_id?: string;
  car_name: string;
  customer_name: string;
  phone: string;
  days: string;
  total_price: string;
  status?: string;
  created_at?: string;
}

// Map database column names to camelCase if needed, or maintain both compatible shapes.
// To make integration extremely bulletproof, we provide simple functions that save/get.

// Helper to check if a specific table exists on Supabase.
async function tableExists(tableName: string): Promise<boolean> {
  if (!supabase) return false;
  try {
    const { error } = await supabase.from(tableName).select('*').limit(1);
    if (error) {
      // Common codes for missing tables or permission issues that we handle with local fallback
      const isMissingOrProtected = 
        error.code === 'P0001' || 
        error.code === '42P01' || 
        error.code === '42501' || 
        error.message?.includes('does not exist') ||
        error.message?.includes('not found');

      if (isMissingOrProtected) {
        console.warn(`[Supabase] Table "${tableName}" is not active or accessible (Code: ${error.code}). Local fallback mode is active.`);
        return false;
      }
      
      // If it's a code 0 (usually network/CORS) or other unexpected error, we still fallback gracefully
      console.warn(`[Supabase] Potential connectivity issue or unexpected response for table "${tableName}":`, error);
      return false; 
    }
    return true;
  } catch (err) {
    console.warn(`[Supabase] Exception encountered while checking table "${tableName}". Entering fallback mode.`, err);
    return false;
  }
}

// -------------------------------------------------------------------------
// 1. CAR SALES OPERATIONS
// -------------------------------------------------------------------------

export async function fetchSaleCars(): Promise<any[]> {
  // Always synchronize with local storage
  const localSaved = localStorage.getItem('sale_cars');
  let cars = localSaved ? JSON.parse(localSaved) : [];

  if (supabase) {
    try {
      const active = await tableExists('sale_cars');
      if (active) {
        const { data, error } = await supabase
          .from('sale_cars')
          .select('*')
          .eq('approved', true)
          .order('created_at', { ascending: false });

        if (!error && data) {
          // Normalize names
          const mapped = data.map(normalizeDbCar);
          localStorage.setItem('sale_cars', JSON.stringify(mapped));
          return mapped;
        }
      }
    } catch (e) {
      console.warn('Supabase fetchSaleCars failed, falling back to LocalStorage', e);
    }
  }
  return cars;
}

export async function fetchPendingSaleCars(): Promise<any[]> {
  const localSaved = localStorage.getItem('pending_sale_cars');
  let cars = localSaved ? JSON.parse(localSaved) : [];

  if (supabase) {
    try {
      const active = await tableExists('sale_cars');
      if (active) {
        const { data, error } = await supabase
          .from('sale_cars')
          .select('*')
          .eq('approved', false)
          .order('created_at', { ascending: false });

        if (!error && data) {
          const mapped = data.map(normalizeDbCar);
          localStorage.setItem('pending_sale_cars', JSON.stringify(mapped));
          return mapped;
        }
      }
    } catch (e) {
      console.warn('Supabase fetchPendingSaleCars failed, falling back to LocalStorage', e);
    }
  }
  return cars;
}

export async function insertSaleCar(car: any): Promise<boolean> {
  const isSale = true;
  // Format for DB insertion
  const mappedCar: DbSaleCar = {
    name: car.name,
    owner_name: car.ownerName || car.owner_name || 'Anonymous',
    owner_phone: car.ownerPhone || car.owner_phone || '',
    owner_city: car.ownerCity || car.owner_city || '',
    city: car.city || 'Faisalabad',
    transmission: car.transmission || 'Automatic',
    fuel_type: car.fuelType || car.fuel_type || 'Petrol',
    rent_price: car.rentPrice ? car.rentPrice.toString().replace(/,/g, '') : '0',
    rent_unit: car.rentUnit || '',
    description: car.description || '',
    image_url: car.imageUrl || '',
    images: car.images || [],
    registration_number: car.registrationNumber || '',
    cnic_doc: car.cnicDoc || '',
    registration_doc: car.registrationDoc || '',
    status: car.status || 'Available',
    approved: car.approved || false
  };

  // Add to Local LocalStorage first
  const key = car.approved ? 'sale_cars' : 'pending_sale_cars';
  const eventName = car.approved ? 'sale_cars_updated' : 'pending_sale_cars_updated';
  const existingLocal = localStorage.getItem(key);
  const localList = existingLocal ? JSON.parse(existingLocal) : [];
  
  // Create an temporary ID if not present
  const fullCarObj = { ...car, id: car.id || 'local-' + Date.now().toString() };
  localList.unshift(fullCarObj);
  localStorage.setItem(key, JSON.stringify(localList));
  window.dispatchEvent(new Event(eventName));
  window.dispatchEvent(new Event('storage'));

  if (supabase) {
    try {
      const active = await tableExists('sale_cars');
      if (active) {
        const { data, error } = await supabase
          .from('sale_cars')
          .insert([mappedCar])
          .select();

        if (!error && data && data.length > 0) {
          // Replace local temp item with real synced object
          const synced = normalizeDbCar(data[0]);
          const currentList = JSON.parse(localStorage.getItem(key) || '[]');
          const filtered = currentList.filter((c: any) => c.id !== fullCarObj.id);
          filtered.unshift(synced);
          localStorage.setItem(key, JSON.stringify(filtered));
          window.dispatchEvent(new Event(eventName));
          window.dispatchEvent(new Event('storage'));
          return true;
        } else if (error) {
          console.warn('Supabase DB error, fallback to local write was successful:', error.message);
        }
      }
    } catch (e) {
      console.warn('Supabase insertSaleCar failed, retained safely in local storage only', e);
    }
  }
  return true;
}

export async function approveSaleCarBackend(carId: string): Promise<boolean> {
  if (supabase) {
    try {
      const active = await tableExists('sale_cars');
      if (active) {
        const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
        if (uuidRegex.test(carId)) {
          const { error } = await supabase
            .from('sale_cars')
            .update({ approved: true })
            .eq('id', carId);
          if (!error) return true;
        }
      }
    } catch (e) {
      console.warn('approveSaleCarBackend error', e);
    }
  }
  return false;
}

export async function deleteSaleCarBackend(carId: string): Promise<boolean> {
  if (supabase) {
    try {
      const active = await tableExists('sale_cars');
      if (active) {
        const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
        if (uuidRegex.test(carId)) {
          const { error } = await supabase
            .from('sale_cars')
            .delete()
            .eq('id', carId);
          if (!error) return true;
        }
      }
    } catch (e) {
      console.warn('deleteSaleCarBackend error', e);
    }
  }
  return false;
}

// -------------------------------------------------------------------------
// 2. RENTAL CAR FLEET OPERATIONS
// -------------------------------------------------------------------------

export async function fetchRentalCars(): Promise<any[]> {
  const localSaved = localStorage.getItem('rental_cars');
  let cars = localSaved ? JSON.parse(localSaved) : [];

  if (supabase) {
    try {
      const active = await tableExists('rental_cars');
      if (active) {
        const { data, error } = await supabase
          .from('rental_cars')
          .select('*')
          .eq('approved', true)
          .order('created_at', { ascending: false });

        if (!error && data) {
          const mapped = data.map(normalizeDbCar);
          localStorage.setItem('rental_cars', JSON.stringify(mapped));
          return mapped;
        }
      }
    } catch (e) {
      console.warn('Supabase fetchRentalCars failed', e);
    }
  }
  return cars;
}

export async function fetchPendingRentalCars(): Promise<any[]> {
  const localSaved = localStorage.getItem('pending_cars');
  let cars = localSaved ? JSON.parse(localSaved) : [];

  if (supabase) {
    try {
      const active = await tableExists('rental_cars');
      if (active) {
        const { data, error } = await supabase
          .from('rental_cars')
          .select('*')
          .eq('approved', false)
          .order('created_at', { ascending: false });

        if (!error && data) {
          const mapped = data.map(normalizeDbCar);
          localStorage.setItem('pending_cars', JSON.stringify(mapped));
          return mapped;
        }
      }
    } catch (e) {
      console.warn('Supabase fetchPendingRentalCars failed', e);
    }
  }
  return cars;
}

export async function insertRentalCar(car: any): Promise<boolean> {
  const mappedCar: DbRentalCar = {
    name: car.name,
    owner_name: car.ownerName || car.owner_name || 'Anonymous',
    owner_phone: car.ownerPhone || car.owner_phone || '',
    owner_city: car.ownerCity || car.owner_city || '',
    city: car.city || 'Faisalabad',
    transmission: car.transmission || 'Automatic',
    fuel_type: car.fuelType || car.fuel_type || 'Petrol',
    rent_price: car.rentPrice ? car.rentPrice.toString().replace(/,/g, '') : '0',
    rent_unit: car.rentUnit || 'day',
    description: car.description || '',
    image_url: car.imageUrl || '',
    images: car.images || [],
    registration_number: car.registrationNumber || '',
    cnic_doc: car.cnicDoc || '',
    registration_doc: car.registrationDoc || '',
    status: car.status || 'Available',
    approved: car.approved || false
  };

  const key = car.approved ? 'rental_cars' : 'pending_cars';
  const eventName = car.approved ? 'rental_cars_updated' : 'pending_cars_updated';
  const existingLocal = localStorage.getItem(key);
  const localList = existingLocal ? JSON.parse(existingLocal) : [];
  
  const fullCarObj = { ...car, id: car.id || 'local-' + Date.now().toString() };
  localList.unshift(fullCarObj);
  localStorage.setItem(key, JSON.stringify(localList));
  window.dispatchEvent(new Event(eventName));
  window.dispatchEvent(new Event('storage'));

  if (supabase) {
    try {
      const active = await tableExists('rental_cars');
      if (active) {
        const { data, error } = await supabase
          .from('rental_cars')
          .insert([mappedCar])
          .select();

        if (!error && data && data.length > 0) {
          const synced = normalizeDbCar(data[0]);
          const currentList = JSON.parse(localStorage.getItem(key) || '[]');
          const filtered = currentList.filter((c: any) => c.id !== fullCarObj.id);
          filtered.unshift(synced);
          localStorage.setItem(key, JSON.stringify(filtered));
          window.dispatchEvent(new Event(eventName));
          window.dispatchEvent(new Event('storage'));
          return true;
        }
      }
    } catch (e) {
      console.warn('Supabase insertRentalCar failed', e);
    }
  }
  return true;
}

export async function approveRentalCarBackend(carId: string): Promise<boolean> {
  if (supabase) {
    try {
      const active = await tableExists('rental_cars');
      if (active) {
        const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
        if (uuidRegex.test(carId)) {
          const { error } = await supabase
            .from('rental_cars')
            .update({ approved: true })
            .eq('id', carId);
          if (!error) return true;
        }
      }
    } catch (e) {
      console.warn('approveRentalCarBackend error', e);
    }
  }
  return false;
}

export async function deleteRentalCarBackend(carId: string): Promise<boolean> {
  if (supabase) {
    try {
      const active = await tableExists('rental_cars');
      if (active) {
        const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
        if (uuidRegex.test(carId)) {
          const { error } = await supabase
            .from('rental_cars')
            .delete()
            .eq('id', carId);
          if (!error) return true;
        }
      }
    } catch (e) {
      console.warn('deleteRentalCarBackend error', e);
    }
  }
  return false;
}

export async function updateRentalCarStatusBackend(carId: string, status: 'Available' | 'Rented Out'): Promise<boolean> {
  if (supabase) {
    try {
      const active = await tableExists('rental_cars');
      if (active) {
        const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
        if (uuidRegex.test(carId)) {
          const dbStatus = status === 'Rented Out' ? 'Booked' : 'Available';
          const { error } = await supabase
            .from('rental_cars')
            .update({ status: dbStatus })
            .eq('id', carId);
          if (!error) return true;
        }
      }
    } catch (e) {
      console.warn('updateRentalCarStatusBackend error', e);
    }
  }
  return false;
}

// -------------------------------------------------------------------------
// 3. DRIVING LESSONS BOOKINGS
// -------------------------------------------------------------------------

export async function fetchDrivingBookings(): Promise<any[]> {
  const localSaved = localStorage.getItem('driving_bookings');
  let bookings = localSaved ? JSON.parse(localSaved) : [];

  if (supabase) {
    try {
      const active = await tableExists('driving_bookings');
      if (active) {
        const { data, error } = await supabase
          .from('driving_bookings')
          .select('*')
          .order('created_at', { ascending: false });

        if (!error && data) {
          const mapped = data.map(normalizeDbBooking);
          localStorage.setItem('driving_bookings', JSON.stringify(mapped));
          return mapped;
        }
      }
    } catch (e) {
      console.warn('Supabase fetchDrivingBookings failed', e);
    }
  }
  return bookings;
}

export async function insertDrivingBooking(booking: any): Promise<boolean> {
  const mapped: DbDrivingBooking = {
    course_id: booking.courseId || booking.id || 'course-default',
    course_name: booking.courseName || booking.name || 'Premium Driving Course',
    price: booking.price ? booking.price.toString().replace(/,/g, '') : '0',
    customer_name: booking.customerName || booking.name || 'Guest User',
    phone: booking.phone || '',
    email: booking.email || '',
    starting_date: booking.startingDate || booking.date || '',
    preferred_slot: booking.preferredSlot || booking.timeSlot || 'Morning 09:00 AM',
    status: booking.status || 'Pending'
  };

  const existingLocal = localStorage.getItem('driving_bookings');
  const localList = existingLocal ? JSON.parse(existingLocal) : [];
  const fullObj = { ...booking, id: booking.id || 'booking-' + Date.now().toString() };
  localList.unshift(fullObj);
  localStorage.setItem('driving_bookings', JSON.stringify(localList));
  window.dispatchEvent(new Event('driving_bookings_updated'));
  window.dispatchEvent(new Event('storage'));

  if (supabase) {
    try {
      const active = await tableExists('driving_bookings');
      if (active) {
        const { data, error } = await supabase
          .from('driving_bookings')
          .insert([mapped])
          .select();

        if (!error && data && data.length > 0) {
          const synced = normalizeDbBooking(data[0]);
          const currentList = JSON.parse(localStorage.getItem('driving_bookings') || '[]');
          const filtered = currentList.filter((b: any) => b.id !== fullObj.id);
          filtered.unshift(synced);
          localStorage.setItem('driving_bookings', JSON.stringify(filtered));
          window.dispatchEvent(new Event('driving_bookings_updated'));
          window.dispatchEvent(new Event('storage'));
          return true;
        }
      }
    } catch (e) {
      console.warn('Supabase insertDrivingBooking failed', e);
    }
  }
  return true;
}

export async function updateDrivingBookingStatus(id: string, status: string): Promise<boolean> {
  if (supabase) {
    try {
      const active = await tableExists('driving_bookings');
      if (active) {
        const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
        if (uuidRegex.test(id)) {
          const { error } = await supabase
            .from('driving_bookings')
            .update({ status })
            .eq('id', id);
          if (!error) return true;
        }
      }
    } catch (e) {
      console.warn('updateDrivingBookingStatus error', e);
    }
  }
  return false;
}

export async function deleteDrivingBooking(id: string): Promise<boolean> {
  if (supabase) {
    try {
      const active = await tableExists('driving_bookings');
      if (active) {
        const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
        if (uuidRegex.test(id)) {
          const { error } = await supabase
            .from('driving_bookings')
            .delete()
            .eq('id', id);
          if (!error) return true;
        }
      }
    } catch (e) {
      console.warn('deleteDrivingBooking error', e);
    }
  }
  return false;
}

// -------------------------------------------------------------------------
// 4. CUSTOMER RENTAL INQUIRY REQUESTS
// -------------------------------------------------------------------------

export async function fetchCustomerRequests(): Promise<any[]> {
  const localSaved = localStorage.getItem('customer_requests');
  let requests = localSaved ? JSON.parse(localSaved) : [];

  if (supabase) {
    try {
      const active = await tableExists('customer_requests');
      if (active) {
        const { data, error } = await supabase
          .from('customer_requests')
          .select('*')
          .order('created_at', { ascending: false });

        if (!error && data) {
          const mapped = data.map(normalizeDbRequest);
          localStorage.setItem('customer_requests', JSON.stringify(mapped));
          return mapped;
        }
      }
    } catch (e) {
      console.warn('Supabase fetchCustomerRequests failed', e);
    }
  }
  return requests;
}

export async function insertCustomerRequest(req: any): Promise<boolean> {
  const mapped: DbCustomerRequest = {
    car_id: req.carId || req.id || '',
    car_name: req.carName || req.name || 'Sample Vehicle',
    customer_name: req.customerName || req.name || 'Guest Inquirer',
    phone: req.phone || '',
    days: req.days ? req.days.toString() : '1',
    total_price: req.totalPrice ? req.totalPrice.toString().replace(/,/g, '') : '0',
    status: req.status || 'pending'
  };

  const existingLocal = localStorage.getItem('customer_requests');
  const localList = existingLocal ? JSON.parse(existingLocal) : [];
  const fullObj = { ...req, id: req.id || 'req-' + Date.now().toString() };
  localList.unshift(fullObj);
  localStorage.setItem('customer_requests', JSON.stringify(localList));
  window.dispatchEvent(new Event('customer_requests_updated'));
  window.dispatchEvent(new Event('storage'));

  if (supabase) {
    try {
      const active = await tableExists('customer_requests');
      if (active) {
        const { data, error } = await supabase
          .from('customer_requests')
          .insert([mapped])
          .select();

        if (!error && data && data.length > 0) {
          const synced = normalizeDbRequest(data[0]);
          const currentList = JSON.parse(localStorage.getItem('customer_requests') || '[]');
          const filtered = currentList.filter((r: any) => r.id !== fullObj.id);
          filtered.unshift(synced);
          localStorage.setItem('customer_requests', JSON.stringify(filtered));
          window.dispatchEvent(new Event('customer_requests_updated'));
          window.dispatchEvent(new Event('storage'));
          return true;
        }
      }
    } catch (e) {
      console.warn('Supabase insertCustomerRequest failed', e);
    }
  }
  return true;
}

export async function updateCustomerRequestStatus(id: string, status: string): Promise<boolean> {
  if (supabase) {
    try {
      const active = await tableExists('customer_requests');
      if (active) {
        const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
        if (uuidRegex.test(id)) {
          const { error } = await supabase
            .from('customer_requests')
            .update({ status })
            .eq('id', id);
          if (!error) return true;
        }
      }
    } catch (e) {
      console.warn('updateCustomerRequestStatus error', e);
    }
  }
  return false;
}

export async function deleteCustomerRequest(id: string): Promise<boolean> {
  if (supabase) {
    try {
      const active = await tableExists('customer_requests');
      if (active) {
        const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
        if (uuidRegex.test(id)) {
          const { error } = await supabase
            .from('customer_requests')
            .delete()
            .eq('id', id);
          if (!error) return true;
        }
      }
    } catch (e) {
      console.warn('deleteCustomerRequest error', e);
    }
  }
  return false;
}


// -------------------------------------------------------------------------
// Helper Normalizers to bridge Postgres underscore layout to app's camelCase
// -------------------------------------------------------------------------

function normalizeDbCar(item: any): any {
  const isBooked = item.status === 'Booked' || item.status === 'Rented Out';
  return {
    id: item.id,
    name: item.name,
    ownerName: item.owner_name || 'Owner',
    ownerPhone: item.owner_phone || '',
    ownerCity: item.owner_city || '',
    city: item.city || 'Faisalabad',
    transmission: item.transmission || 'Automatic',
    fuelType: item.fuel_type || 'Petrol',
    rentPrice: item.rent_price ? parseFloat(item.rent_price.toString().replace(/,/g, '')).toLocaleString() : '0',
    rentUnit: item.rent_unit || '',
    description: item.description,
    imageUrl: item.image_url,
    images: item.images || [],
    registrationNumber: item.registration_number,
    cnicDoc: item.cnic_doc,
    registrationDoc: item.registration_doc,
    status: item.status || 'Available',
    availabilityStatus: isBooked ? 'Rented Out' : 'Available',
    approved: item.approved || false,
    createdAt: item.created_at
  };
}

function normalizeDbBooking(item: any): any {
  return {
    id: item.id,
    courseId: item.course_id,
    courseName: item.course_name,
    price: item.price ? parseFloat(item.price.replace(/,/g, '')).toLocaleString() : '0',
    customerName: item.customer_name,
    phone: item.phone,
    email: item.email,
    startingDate: item.starting_date,
    preferredSlot: item.preferred_slot,
    status: item.status || 'Pending',
    createdAt: item.created_at
  };
}

function normalizeDbRequest(item: any): any {
  return {
    id: item.id,
    carId: item.car_id,
    carName: item.car_name,
    customerName: item.customer_name,
    phone: item.phone,
    days: parseInt(item.days || '1', 10),
    totalPrice: item.total_price ? parseFloat(item.total_price.replace(/,/g, '')).toLocaleString() : '0',
    status: item.status || 'pending',
    createdAt: item.created_at
  };
}

// -------------------------------------------------------------------------
// 5. SYSTEM METADATA STATS OPERATIONS
// -------------------------------------------------------------------------

export interface DbSystemMetadata {
  key: string;
  value: string;
  updated_at?: string;
}

const DEFAULT_METADATA: Record<string, string> = {
  years_active: '8',
  students_trained: '4500+',
  certified_instructors: '25',
  happy_reviews: '150+'
};

export async function fetchSystemMetadata(): Promise<Record<string, string>> {
  // Load local cache or default first
  const localSaved = localStorage.getItem('system_metadata');
  let currentMetadata = localSaved ? JSON.parse(localSaved) : { ...DEFAULT_METADATA };

  if (supabase) {
    try {
      const active = await tableExists('system_metadata');
      if (active) {
        const { data, error } = await supabase
          .from('system_metadata')
          .select('key, value');

        if (!error && data) {
          const dbMetadata: Record<string, string> = {};
          // Initialize with default values, override with database values
          Object.assign(dbMetadata, DEFAULT_METADATA);
          data.forEach((row: { key: string; value: string }) => {
            dbMetadata[row.key] = row.value;
          });
          
          localStorage.setItem('system_metadata', JSON.stringify(dbMetadata));
          return dbMetadata;
        }
      }
    } catch (e) {
      console.warn('Supabase fetchSystemMetadata failed, using cached / default metrics', e);
    }
  }

  return currentMetadata;
}

export async function updateSystemMetadata(key: string, value: string): Promise<boolean> {
  const localSaved = localStorage.getItem('system_metadata');
  const currentMetadata = localSaved ? JSON.parse(localSaved) : { ...DEFAULT_METADATA };
  currentMetadata[key] = value;
  
  localStorage.setItem('system_metadata', JSON.stringify(currentMetadata));
  window.dispatchEvent(new Event('system_metadata_updated'));
  window.dispatchEvent(new Event('storage'));

  if (supabase) {
    try {
      const active = await tableExists('system_metadata');
      if (active) {
        const { error } = await supabase
          .from('system_metadata')
          .upsert({ key, value, updated_at: new Date().toISOString() }, { onConflict: 'key' });
        
        if (!error) {
          return true;
        } else {
          console.warn('Supabase upsert system_metadata error, fallback is active:', error.message);
        }
      }
    } catch (e) {
      console.warn('Supabase updateSystemMetadata failed, saved to LocalStorage', e);
    }
  }
  return true;
}

// -------------------------------------------------------------------------
// 6. STORAGE BUCKET OPERATIONS FOR CAR LISTING IMAGES
// -------------------------------------------------------------------------

/**
 * Uploads a file to the 'car-listings' Supabase storage bucket.
 * Automatically handles bucket creation if needed, and falls back to base64 if Supabase is offline.
 */
export async function uploadCarImage(file: File): Promise<string> {
  if (supabase) {
    try {
      // 1. Attempt to ensure 'car-listings' bucket exists
      try {
        await supabase.storage.createBucket('car-listings', {
          public: true,
          fileSizeLimit: 5242880, // 5MB
          allowedMimeTypes: ['image/*']
        });
      } catch (bucketErr) {
        // Bucket might already exist, safe to ignore
      }

      // 2. Upload file with unique path
      const uniqueName = `${Date.now()}_${file.name.replace(/[^a-zA-Z0-9.]/g, '_')}`;
      const { data, error } = await supabase.storage
        .from('car-listings')
        .upload(uniqueName, file, {
          cacheControl: '3600',
          upsert: true
        });

      if (!error && data) {
        // 3. Retrieve public URL
        const { data: { publicUrl } } = supabase.storage
          .from('car-listings')
          .getPublicUrl(uniqueName);
        
        return publicUrl;
      } else {
        console.warn('Supabase storage upload error, falling back to base64 reader:', error?.message);
      }
    } catch (e) {
      console.warn('Supabase storage upload failed:', e);
    }
  }

  // Fallback: Read file as Base64 DataURL (so it works perfectly in local mode too)
  return new Promise<string>((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      resolve(reader.result as string);
    };
    reader.onerror = () => {
      reject(new Error('Failed to read file as base64 fallback'));
    };
    reader.readAsDataURL(file);
  });
}


// -------------------------------------------------------------------------
// 7. BIOMETRIC RATES AND EXCISE TAX SLABS OPERATIONS
// -------------------------------------------------------------------------

export interface DbBiometricRate {
  id: string;
  name: string;
  urdu_name: string;
  base_fee: number;
  filer_wht: number;
  non_filer_wht: number;
  icon?: string;
  created_at?: string;
}

export async function fetchBiometricRates(): Promise<any[]> {
  const localSaved = localStorage.getItem('godriveify_excise_rates');
  let rates = localSaved ? JSON.parse(localSaved) : [];

  if (supabase) {
    try {
      const active = await tableExists('biometric_rates');
      if (active) {
        const { data, error } = await supabase
          .from('biometric_rates')
          .select('*')
          .order('base_fee', { ascending: true });

        if (!error && data) {
          const mapped = data.map(item => ({
            id: item.id,
            name: item.name,
            urduName: item.urdu_name,
            baseFee: Number(item.base_fee),
            filerWht: Number(item.filer_wht),
            nonFilerWht: Number(item.non_filer_wht),
            icon: item.icon || '🚗'
          }));
          localStorage.setItem('godriveify_excise_rates', JSON.stringify(mapped));
          return mapped;
        }
      }
    } catch (e) {
      console.warn('Supabase fetchBiometricRates failed, using cached LocalStorage', e);
    }
  }
  return rates;
}

export async function upsertBiometricRate(rate: any): Promise<boolean> {
  const mapped = {
    id: rate.id,
    name: rate.name,
    urdu_name: rate.urduName || rate.urdu_name || '',
    base_fee: Number(rate.baseFee || rate.base_fee || 0),
    filer_wht: Number(rate.filerWht || rate.filer_wht || 0),
    non_filer_wht: Number(rate.nonFilerWht || rate.non_filer_wht || 0),
    icon: rate.icon || '🚗'
  };

  // Sync locally first
  const localSaved = localStorage.getItem('godriveify_excise_rates');
  let currentList = localSaved ? JSON.parse(localSaved) : [];
  const idx = currentList.findIndex((r: any) => r.id === rate.id);
  const localRateObj = {
    id: rate.id,
    name: rate.name,
    urduName: mapped.urdu_name,
    baseFee: mapped.base_fee,
    filerWht: mapped.filer_wht,
    nonFilerWht: mapped.non_filer_wht,
    icon: mapped.icon
  };
  if (idx > -1) {
    currentList[idx] = localRateObj;
  } else {
    currentList.push(localRateObj);
  }
  localStorage.setItem('godriveify_excise_rates', JSON.stringify(currentList));
  window.dispatchEvent(new Event('godriveify_excise_rates_updated'));

  if (supabase) {
    try {
      const active = await tableExists('biometric_rates');
      if (active) {
        const { error } = await supabase
          .from('biometric_rates')
          .upsert([mapped], { onConflict: 'id' });
        
        if (!error) return true;
        console.warn('Supabase upsertBiometricRate error:', error.message);
      }
    } catch (e) {
      console.warn('Supabase upsertBiometricRate failed', e);
    }
  }
  return true;
}

export async function deleteBiometricRate(id: string): Promise<boolean> {
  // Sync locally first
  const localSaved = localStorage.getItem('godriveify_excise_rates');
  if (localSaved) {
    const currentList = JSON.parse(localSaved);
    const filtered = currentList.filter((r: any) => r.id !== id);
    localStorage.setItem('godriveify_excise_rates', JSON.stringify(filtered));
    window.dispatchEvent(new Event('godriveify_excise_rates_updated'));
  }

  if (supabase) {
    try {
      const active = await tableExists('biometric_rates');
      if (active) {
        const { error } = await supabase
          .from('biometric_rates')
          .delete()
          .eq('id', id);
        
        if (!error) return true;
      }
    } catch (e) {
      console.warn('Supabase deleteBiometricRate failed', e);
    }
  }
  return true;
}


// -------------------------------------------------------------------------
// 8. DRIVING COURSES OPERATIONS (DYNAMIC PRICING & DATA)
// -------------------------------------------------------------------------

export async function fetchDrivingCoursesSupabase(): Promise<any[]> {
  const localSaved = localStorage.getItem('driving_courses_v4');
  let courses = localSaved ? JSON.parse(localSaved) : [];

  if (supabase) {
    try {
      const active = await tableExists('driving_courses');
      if (active) {
        const { data, error } = await supabase
          .from('driving_courses')
          .select('*')
          .order('course_fee', { ascending: true });

        if (!error && data && data.length > 0) {
          const mapped = data.map(item => ({
            id: item.id,
            courseTitle: item.course_title,
            courseDescription: item.course_description,
            courseFee: item.course_fee,
            lessonDuration: item.lesson_duration,
            dailyTime: item.daily_time,
            theoryDuration: item.theory_duration,
            carImage: item.car_image
          }));
          localStorage.setItem('driving_courses_v4', JSON.stringify(mapped));
          return mapped;
        }
      }
    } catch (e) {
      console.warn('Supabase fetchDrivingCoursesSupabase failed, fallback to LocalStorage', e);
    }
  }
  return courses;
}

export async function upsertDrivingCourseSupabase(course: any): Promise<boolean> {
  const mapped = {
    id: course.id || 'course-' + Date.now().toString(),
    course_title: course.courseTitle || '',
    course_description: course.courseDescription || '',
    course_fee: course.courseFee ? course.courseFee.toString() : '0',
    lesson_duration: course.lessonDuration || '',
    daily_time: course.dailyTime || '',
    theory_duration: course.theoryDuration || '',
    car_image: course.carImage || ''
  };

  // Sync locally first
  const localSaved = localStorage.getItem('driving_courses_v4');
  let currentList = localSaved ? JSON.parse(localSaved) : [];
  const idx = currentList.findIndex((c: any) => c.id === mapped.id);
  const localCourseObj = {
    id: mapped.id,
    courseTitle: mapped.course_title,
    courseDescription: mapped.course_description,
    courseFee: mapped.course_fee,
    lessonDuration: mapped.lesson_duration,
    dailyTime: mapped.daily_time,
    theoryDuration: mapped.theory_duration,
    carImage: mapped.car_image
  };

  if (idx > -1) {
    currentList[idx] = localCourseObj;
  } else {
    currentList.push(localCourseObj);
  }
  localStorage.setItem('driving_courses_v4', JSON.stringify(currentList));
  window.dispatchEvent(new Event('driving_courses_updated'));

  if (supabase) {
    try {
      const active = await tableExists('driving_courses');
      if (active) {
        const { error } = await supabase
          .from('driving_courses')
          .upsert([mapped], { onConflict: 'id' });
        
        if (!error) return true;
        console.warn('Supabase upsertDrivingCourseSupabase error:', error.message);
      }
    } catch (e) {
      console.warn('Supabase upsertDrivingCourseSupabase failed', e);
    }
  }
  return true;
}

export async function deleteDrivingCourseSupabase(id: string): Promise<boolean> {
  // Sync locally first
  const localSaved = localStorage.getItem('driving_courses_v4');
  if (localSaved) {
    const currentList = JSON.parse(localSaved);
    const filtered = currentList.filter((c: any) => c.id !== id);
    localStorage.setItem('driving_courses_v4', JSON.stringify(filtered));
    window.dispatchEvent(new Event('driving_courses_updated'));
  }

  if (supabase) {
    try {
      const active = await tableExists('driving_courses');
      if (active) {
        const { error } = await supabase
          .from('driving_courses')
          .delete()
          .eq('id', id);
        
        if (!error) return true;
      }
    } catch (e) {
      console.warn('Supabase deleteDrivingCourseSupabase failed', e);
    }
  }
  return true;
}

// -------------------------------------------------------------------------
// BLOG POST OPERATIONS WITH GLOBAL SUPABASE SYNC AND LOCAL FALLBACK
// -------------------------------------------------------------------------

function ensureUUID(id: any): string {
  const str = String(id || '');
  const isUuid = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(str);
  if (isUuid) {
    return str;
  }
  // Standard fallback UUID generator
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
    const r = Math.random() * 16 | 0;
    const v = c === 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
}

function normalizeDbBlogPost(item: any): any {
  return {
    id: String(item.id),
    title: item.title,
    author: item.author || 'GoDriveify Team',
    imageUrl: item.image_url || '',
    content: item.content || '',
    date: item.date || new Date().toLocaleDateString(),
    authorAvatar: item.author_avatar || '',
    authorRole: item.author_role || '',
    imageAlt: item.image_alt || '',
    metaTitle: item.meta_title || '',
    metaDescription: item.meta_description || '',
    focusKeywords: item.focus_keywords || '',
    excerpt: item.excerpt || '',
    status: item.status || 'Published',
    scheduledAt: item.scheduled_at || '',
    category: item.category || 'Safety Guide'
  };
}

export async function fetchBlogPostsSupabase(): Promise<any[]> {
  const localSaved = localStorage.getItem('blogPosts');
  let posts = localSaved ? JSON.parse(localSaved) : [];

  if (supabase) {
    try {
      const { data, error } = await supabase
        .from('blog_posts')
        .select('*')
        .order('created_at', { ascending: false });

      if (!error && data) {
        const mapped = data.map(normalizeDbBlogPost);
        localStorage.setItem('blogPosts', JSON.stringify(mapped));
        return mapped;
      } else if (error) {
        console.warn('Supabase fetchBlogPostsSupabase error:', error.message);
      }
    } catch (e) {
      console.warn('Supabase fetchBlogPostsSupabase failed', e);
    }
  }
  return posts;
}

export async function upsertBlogPostSupabase(post: any): Promise<boolean> {
  const postUuid = ensureUUID(post.id);
  
  // Database object schema (does not contain 'category' column)
  const dbMapped: any = {
    id: postUuid,
    title: post.title,
    author: post.author || 'GoDriveify Team',
    image_url: post.imageUrl || '',
    content: post.content || '',
    date: post.date || new Date().toLocaleDateString(),
    author_avatar: post.authorAvatar || '',
    author_role: post.authorRole || '',
    image_alt: post.imageAlt || '',
    meta_title: post.metaTitle || '',
    meta_description: post.metaDescription || '',
    focus_keywords: post.focusKeywords || '',
    excerpt: post.excerpt || '',
    status: post.status || 'Published',
    scheduled_at: post.scheduledAt || ''
  };

  if (supabase) {
    try {
      const { error } = await supabase
        .from('blog_posts')
        .upsert([dbMapped], { onConflict: 'id' });
      
      if (error) {
        console.warn('Supabase upsertBlogPostSupabase error:', error.message);
        return false;
      }
    } catch (e) {
      console.warn('Supabase upsertBlogPostSupabase failed', e);
      return false;
    }
  }

  // Sync locally on success (keeping 'category' for local layout rendering)
  const localSaved = localStorage.getItem('blogPosts');
  let currentList = localSaved ? JSON.parse(localSaved) : [];
  const idx = currentList.findIndex((p: any) => String(p.id) === String(postUuid) || String(p.id) === String(post.id));
  
  const localPostObj = {
    id: postUuid,
    title: dbMapped.title,
    author: dbMapped.author,
    imageUrl: dbMapped.image_url,
    content: dbMapped.content,
    date: dbMapped.date,
    authorAvatar: dbMapped.author_avatar,
    authorRole: dbMapped.author_role,
    imageAlt: dbMapped.image_alt,
    metaTitle: dbMapped.meta_title,
    metaDescription: dbMapped.meta_description,
    focusKeywords: dbMapped.focus_keywords,
    excerpt: dbMapped.excerpt,
    status: dbMapped.status,
    scheduledAt: dbMapped.scheduled_at,
    category: post.category || 'Safety Guide'
  };

  if (idx > -1) {
    currentList[idx] = localPostObj;
  } else {
    currentList.unshift(localPostObj);
  }
  localStorage.setItem('blogPosts', JSON.stringify(currentList));
  window.dispatchEvent(new Event('blog_posts_updated'));

  return true;
}

export async function deleteBlogPostSupabase(id: string): Promise<boolean> {
  const cleanId = String(id || '').trim();
  let blogTitleToDelete: string | null = null;

  // Sync locally first
  const localSaved = localStorage.getItem('blogPosts');
  if (localSaved) {
    const currentList = JSON.parse(localSaved);
    const postToDelete = currentList.find((p: any) => String(p.id) === cleanId);
    if (postToDelete && postToDelete.title) {
      blogTitleToDelete = postToDelete.title;
    }
  }

  if (supabase) {
    const isUuid = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(cleanId);
    let success = false;
    
    if (isUuid) {
      try {
        const { data, error } = await supabase
          .from('blog_posts')
          .delete()
          .eq('id', cleanId)
          .select();
        
        if (!error) {
          success = true;
          console.log('Supabase blog delete success, affected rows:', data?.length);
        } else {
          console.warn('Supabase deleteBlogPostSupabase error:', error.message);
        }
      } catch (e) {
        console.warn('Supabase deleteBlogPostSupabase failed', e);
      }
    } else if (blogTitleToDelete) {
      // Fallback: Delete from Supabase by title if ID is not a valid UUID
      try {
        console.log(`Attempting fallback Supabase deletion by title: "${blogTitleToDelete}"`);
        const { data, error } = await supabase
          .from('blog_posts')
          .delete()
          .eq('title', blogTitleToDelete)
          .select();
        
        if (!error) {
          success = true;
          console.log('Supabase delete by title success, affected rows:', data?.length);
        } else {
          console.warn('Supabase delete by title error:', error.message);
        }
      } catch (e) {
        console.warn('Supabase delete by title failed', e);
      }
    } else {
      success = true; // non-UUID post not in local posts (probably local-only post already deleted)
    }

    // If deleting from database failed due to RLS policy blocking or schema issue,
    // we still return true so the client can optimistic-delete from LocalStorage,
    // but we log a warning.
    if (!success) {
      console.warn('Could not complete database deletion. Cleaning local cache anyway.');
    }
  }

  if (localSaved) {
    const currentList = JSON.parse(localSaved);
    const filtered = currentList.filter((p: any) => String(p.id) !== cleanId);
    localStorage.setItem('blogPosts', JSON.stringify(filtered));
    window.dispatchEvent(new Event('blog_posts_updated'));
  }

  return true;
}

// --- Marketing Subscribers ---

export async function fetchMarketingSubscribers() {
  if (supabase) {
    try {
      const { data, error } = await supabase
        .from('marketing_subscribers')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (!error && data) {
        localStorage.setItem('marketing_subscribers', JSON.stringify(data));
        return data;
      }
    } catch (e) {
      console.warn('Supabase fetchMarketingSubscribers failed', e);
    }
  }
  const saved = localStorage.getItem('marketing_subscribers');
  return saved ? JSON.parse(saved) : [];
}

export async function upsertMarketingSubscriber(sub: any) {
  if (supabase) {
    try {
      const { error } = await supabase
        .from('marketing_subscribers')
        .upsert([sub], { onConflict: 'email' });
      
      if (error) {
        console.warn('Supabase upsertMarketingSubscriber error:', error.message);
      }
    } catch (e) {
      console.warn('Supabase upsertMarketingSubscriber failed', e);
    }
  }

  const saved = localStorage.getItem('marketing_subscribers');
  let currentList = saved ? JSON.parse(saved) : [];
  const idx = currentList.findIndex((s: any) => s.email === sub.email);
  if (idx > -1) {
    currentList[idx] = { ...currentList[idx], ...sub };
  } else {
    currentList.unshift(sub);
  }
  localStorage.setItem('marketing_subscribers', JSON.stringify(currentList));
  window.dispatchEvent(new Event('marketing_sub_updated'));
  return true;
}

export async function deleteMarketingSubscriber(id: string) {
  if (supabase) {
    try {
      const { error } = await supabase
        .from('marketing_subscribers')
        .delete()
        .eq('id', id);
      if (error) {
        console.warn('Supabase deleteMarketingSubscriber error:', error.message);
      }
    } catch (e) {
      console.warn('Supabase deleteMarketingSubscriber failed', e);
    }
  }

  const saved = localStorage.getItem('marketing_subscribers');
  if (saved) {
    const list = JSON.parse(saved);
    const filtered = list.filter((s: any) => s.id !== id);
    localStorage.setItem('marketing_subscribers', JSON.stringify(filtered));
    window.dispatchEvent(new Event('marketing_sub_updated'));
  }
  return true;
}

// --- Marketing Campaigns ---

export async function fetchMarketingCampaigns() {
  if (supabase) {
    try {
      const { data, error } = await supabase
        .from('marketing_campaigns')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (!error && data) {
        localStorage.setItem('marketing_campaigns', JSON.stringify(data));
        return data;
      }
    } catch (e) {
      console.warn('Supabase fetchMarketingCampaigns failed', e);
    }
  }
  const saved = localStorage.getItem('marketing_campaigns');
  return saved ? JSON.parse(saved) : [];
}

export async function saveMarketingCampaign(campaign: any) {
  if (supabase) {
    try {
      const dbCampaign = {
        id: ensureUUID(campaign.id),
        subject: campaign.subject || '',
        content: campaign.content || campaign.body || '',
        recipients_count: campaign.recipients_count || campaign.sent_count || 0,
        target_segment: campaign.target_segment || 'all',
        status: campaign.status || 'Sent',
        created_at: campaign.created_at || new Date().toISOString()
      };
      const { error } = await supabase
        .from('marketing_campaigns')
        .insert([dbCampaign]);
      
      if (error) {
        console.warn('Supabase saveMarketingCampaign error:', error.message);
      }
    } catch (e) {
      console.warn('Supabase saveMarketingCampaign failed', e);
    }
  }

  const saved = localStorage.getItem('marketing_campaigns');
  let currentList = saved ? JSON.parse(saved) : [];
  currentList.unshift(campaign);
  localStorage.setItem('marketing_campaigns', JSON.stringify(currentList));
  window.dispatchEvent(new Event('marketing_campaign_updated'));
  return true;
}


// -------------------------------------------------------------------------
// 10. CONTACT PAGE MESSAGES & SUBMISSIONS
// -------------------------------------------------------------------------

export async function fetchContactMessages(): Promise<any[]> {
  if (supabase) {
    try {
      const { data, error } = await supabase
        .from('contact_messages')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (!error && data) {
        localStorage.setItem('contact_messages', JSON.stringify(data));
        return data;
      }
    } catch (e) {
      console.warn('Supabase fetchContactMessages failed', e);
    }
  }
  const saved = localStorage.getItem('contact_messages');
  return saved ? JSON.parse(saved) : [];
}

export async function insertContactMessage(msg: any): Promise<boolean> {
  const newMsg = {
    id: ensureUUID(msg.id),
    name: msg.name,
    phone: msg.phone,
    email: msg.email,
    course: msg.course || 'Complete Driving Course',
    message: msg.message,
    status: msg.status || 'unread',
    created_at: msg.created_at || new Date().toISOString()
  };

  // 1. Save to contact_messages table
  if (supabase) {
    try {
      const { error } = await supabase
        .from('contact_messages')
        .insert([newMsg]);
      
      if (error) {
        console.warn('Supabase insertContactMessage error:', error.message);
      }
    } catch (e) {
      console.warn('Supabase insertContactMessage failed', e);
    }
  }

  // Save to localStorage fallback
  const saved = localStorage.getItem('contact_messages');
  let currentList = saved ? JSON.parse(saved) : [];
  currentList.unshift(newMsg);
  localStorage.setItem('contact_messages', JSON.stringify(currentList));
  window.dispatchEvent(new Event('contact_messages_updated'));

  // 2. Also register as a Marketing Lead automatically!
  try {
    await upsertMarketingSubscriber({
      email: msg.email,
      name: msg.name,
      type: 'lead',
      source: 'Contact Us Form',
      status: 'active'
    });
  } catch (e) {
    console.warn('Cross-saving contact message as marketing lead failed:', e);
  }

  return true;
}

export async function updateContactMessageStatus(id: string, status: string): Promise<boolean> {
  if (supabase) {
    try {
      const { error } = await supabase
        .from('contact_messages')
        .update({ status })
        .eq('id', id);
      
      if (error) {
        console.warn('Supabase updateContactMessageStatus error:', error.message);
      }
    } catch (e) {
      console.warn('Supabase updateContactMessageStatus failed', e);
    }
  }

  const saved = localStorage.getItem('contact_messages');
  let currentList = saved ? JSON.parse(saved) : [];
  const idx = currentList.findIndex((m: any) => m.id === id);
  if (idx > -1) {
    currentList[idx].status = status;
    localStorage.setItem('contact_messages', JSON.stringify(currentList));
    window.dispatchEvent(new Event('contact_messages_updated'));
  }
  return true;
}

export async function deleteContactMessage(id: string): Promise<boolean> {
  if (supabase) {
    try {
      const { error } = await supabase
        .from('contact_messages')
        .delete()
        .eq('id', id);
      
      if (error) {
        console.warn('Supabase deleteContactMessage error:', error.message);
      }
    } catch (e) {
      console.warn('Supabase deleteContactMessage failed', e);
    }
  }

  const saved = localStorage.getItem('contact_messages');
  let currentList = saved ? JSON.parse(saved) : [];
  const filtered = currentList.filter((m: any) => m.id !== id);
  localStorage.setItem('contact_messages', JSON.stringify(filtered));
  window.dispatchEvent(new Event('contact_messages_updated'));
  return true;
}




