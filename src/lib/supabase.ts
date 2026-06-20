import { createClient } from '@supabase/supabase-js';

// @ts-ignore
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || import.meta.env.NEXT_PUBLIC_SUPABASE_URL || 'https://gzepvqpygnfgyahjfann.supabase.co';
// @ts-ignore
const supabaseKey = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY || import.meta.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY || 'sb_publishable_VN4CNJYtHYvx0VHFcEJV7Q_95mUpgnX';

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
    const { error } = await supabase.from(tableName).select('id').limit(1);
    if (error) {
      if (error.code === 'P0001') {
        console.warn(`[Supabase] Table "${tableName}" does not exist or has SQL error (P0001).`);
        return false;
      }
      if (error.message?.includes('does not exist') || error.code === '42P01') {
        console.warn(`[Supabase] Table "${tableName}" does not exist (42P01). Make sure to run your SQL schema script in the Supabase SQL Editor.`);
        return false;
      }
      console.error(`[Supabase] Unexpected error checking table "${tableName}":`, error);
    }
    return true;
  } catch (err) {
    console.error(`[Supabase] Exception checking table "${tableName}":`, err);
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
          window.dispatchEvent(new Event('sale_cars_updated'));
          return mapped;
        }
      }
    } catch (e) {
      console.error('Supabase fetchSaleCars failed, falling back to LocalStorage', e);
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
          window.dispatchEvent(new Event('pending_sale_cars_updated'));
          return mapped;
        }
      }
    } catch (e) {
      console.error('Supabase fetchPendingSaleCars failed, falling back to LocalStorage', e);
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
      console.error('Supabase insertSaleCar failed, retained safely in local storage only', e);
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
      console.error('approveSaleCarBackend error', e);
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
      console.error('deleteSaleCarBackend error', e);
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
          window.dispatchEvent(new Event('rental_cars_updated'));
          return mapped;
        }
      }
    } catch (e) {
      console.error('Supabase fetchRentalCars failed', e);
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
          window.dispatchEvent(new Event('pending_cars_updated'));
          return mapped;
        }
      }
    } catch (e) {
      console.error('Supabase fetchPendingRentalCars failed', e);
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
      console.error('Supabase insertRentalCar failed', e);
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
      console.error('approveRentalCarBackend error', e);
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
      console.error('deleteRentalCarBackend error', e);
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
      console.error('updateRentalCarStatusBackend error', e);
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
          window.dispatchEvent(new Event('driving_bookings_updated'));
          return mapped;
        }
      }
    } catch (e) {
      console.error('Supabase fetchDrivingBookings failed', e);
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
      console.error('Supabase insertDrivingBooking failed', e);
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
      console.error('updateDrivingBookingStatus error', e);
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
      console.error('deleteDrivingBooking error', e);
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
          window.dispatchEvent(new Event('customer_requests_updated'));
          return mapped;
        }
      }
    } catch (e) {
      console.error('Supabase fetchCustomerRequests failed', e);
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
      console.error('Supabase insertCustomerRequest failed', e);
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
      console.error('updateCustomerRequestStatus error', e);
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
      console.error('deleteCustomerRequest error', e);
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
// Helper Normalizers for Instructors, Blog Posts, and Driving Courses
// -------------------------------------------------------------------------

export interface DbInstructor {
  id?: string;
  name: string;
  role: string;
  description: string;
  image: string;
  certifications: string[];
  rating: number;
  reviews: number;
  gender: string;
  availability: string;
  hours: string;
  success_rate: string;
  languages: string[];
  experience?: string;
  specialty?: string;
  categories?: string[];
  detailed_bio?: string;
  reviews_list?: any;
  created_at?: string;
}

export interface DbBlogPost {
  id?: string;
  title: string;
  author: string;
  image_url: string;
  content: string;
  date: string;
  author_avatar?: string;
  author_role?: string;
  image_alt?: string;
  meta_title?: string;
  meta_description?: string;
  focus_keywords?: string;
  excerpt?: string;
  status: string;
  scheduled_at?: string;
  created_at?: string;
}

export interface DbDrivingCourse {
  id?: string;
  custom_id?: string;
  name: string;
  price: string;
  duration: string;
  badge?: string;
  is_popular: boolean;
  transmission: string;
  description?: string;
  features: string[];
  specifications: any[];
  created_at?: string;
}

function normalizeDbInstructor(item: any): any {
  const defaultMapping: Record<string, any> = {
    'Zahid Mahmood': {
      experience: '12+ Years Exp',
      specialty: 'Manual & Automatic',
      categories: ['Defensive', 'Manual', 'Automatic'],
      detailedBio: 'Zahid Mahmood has served as an elite trainer for over a decade. Formerly a consultant on road discipline, his modules cover tricky situations like heavy motorway traffic, parking in compressed spaces, and slope maintenance without handbrakes.',
      reviewsList: [
        { student: 'Haris Munir', comment: 'Zahid sir made manual driving feel incredibly logical. No stress, highly professional methods!' },
        { student: 'Usman Ghani', comment: 'The highway training is unbeatable. His control tips worked miracles for my confidence.' }
      ]
    },
    'Ayesha Khan': {
      experience: '8+ Years Exp',
      specialty: 'Automatic Transmission Only',
      categories: ['Female Only', 'Automatic'],
      detailedBio: 'Ayesha is leading our female-only training program in Faisalabad. She is highly celebrated for her micro-adjustments techniques, safety prioritization, and structured feedback that leaves no room for nervousness.',
      reviewsList: [
        { student: 'Saba Fatima', comment: 'Ayesha apa is the best instructor ever! Zero panic, she explains every tiny detail so sweetly.' },
        { student: 'Zainab Bibi', comment: 'Loved my 10-day class. I went from never touching a steering wheel to driving to office alone.' }
      ]
    },
    'Muhammad Bilal': {
      experience: '10+ Years Exp',
      specialty: 'Commercial & Light Vehicles',
      categories: ['Defensive', 'Manual'],
      detailedBio: 'Bilal focuses deeply on defensive driving theories. His training covers active hazards, brake reaction times under rainfall, and local regulatory protocols to make sure you can clear your driving licensing exam with sheer ease.',
      reviewsList: [
        { student: 'Ahmad Raza', comment: 'He knows exactly what testing officers look for. Passed my test in the first attempt!' },
        { student: 'Kamran Shah', comment: 'Professional, punctual, and highly skilled. His highway hazard awareness tips are gold.' }
      ]
    },
    'Sania Malik': {
      experience: '5+ Years Exp',
      specialty: 'Automatic & Manual Dual-Wing',
      categories: ['Female Only', 'Automatic', 'Manual'],
      detailedBio: 'Sania combines mental coaching with steering mechanics to support students struggling with driving anxiety. She uses low-stress lanes and steady exposure to build confidence block by block.',
      reviewsList: [
        { student: 'Areeba Jamil', comment: 'I had terrible driving phobia. Sania completely cured it. Highly recommended for beginners!' },
        { student: 'Maria Butt', comment: 'So appreciative of her gentle, repetitive teaching style. She made parallel parking feel like child play.' }
      ]
    }
  };

  const fallbacks = defaultMapping[item.name] || {
    experience: '5+ Years Exp',
    specialty: 'Automatic & Manual',
    categories: ['Manual', 'Automatic'],
    detailedBio: item.description || '',
    reviewsList: []
  };

  return {
    id: item.id,
    name: item.name,
    role: item.role,
    description: item.description || '',
    image: item.image || '',
    certifications: item.certifications || [],
    rating: parseFloat(item.rating || '5.0'),
    reviews: parseInt(item.reviews || '0', 10),
    gender: item.gender || 'Male',
    availability: item.availability || 'Available',
    hours: item.hours || '',
    successRate: item.success_rate || '',
    languages: item.languages || [],
    createdAt: item.created_at,
    
    experience: item.experience || fallbacks.experience,
    specialty: item.specialty || fallbacks.specialty,
    categories: item.categories || item.categories_list || fallbacks.categories,
    detailedBio: item.detailed_bio || item.detailedBio || fallbacks.detailedBio,
    reviewsList: typeof item.reviews_list === 'string' 
      ? JSON.parse(item.reviews_list) 
      : (item.reviews_list || item.reviewsList || fallbacks.reviewsList)
  };
}

function normalizeDbBlogPost(item: any): any {
  return {
    id: item.id,
    title: item.title,
    author: item.author || 'GoDriveify Team',
    imageUrl: item.image_url || '',
    content: item.content || '',
    date: item.date || '',
    authorAvatar: item.author_avatar || '',
    authorRole: item.author_role || '',
    imageAlt: item.image_alt || '',
    metaTitle: item.meta_title || '',
    metaDescription: item.meta_description || '',
    focusKeywords: item.focus_keywords || '',
    excerpt: item.excerpt || '',
    status: item.status || 'Draft',
    scheduledAt: item.scheduled_at || '',
    createdAt: item.created_at
  };
}

function normalizeDbDrivingCourse(item: any): any {
  return {
    id: item.id,
    customId: item.custom_id,
    name: item.name,
    price: item.price ? parseFloat(item.price.toString().replace(/,/g, '')).toLocaleString() : '0',
    duration: item.duration || '',
    badge: item.badge || '',
    isPopular: item.is_popular || false,
    transmission: item.transmission || 'Manual',
    description: item.description || '',
    features: item.features || [],
    specifications: typeof item.specifications === 'string' 
      ? JSON.parse(item.specifications) 
      : (item.specifications || []),
    createdAt: item.created_at
  };
}

// -------------------------------------------------------------------------
// 5. INSTRUCTORS LOGISTIC OPERATIONS
// -------------------------------------------------------------------------

const DEFAULT_SEEDED_INSTRUCTORS = [
  {
    name: 'Zahid Mahmood',
    role: 'Chief Instructor & Training Lead',
    experience: '15+ Years Exp',
    image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=600&q=80',
    description: 'Zahid is our head instructor with countless hours of on-road mentoring. He specializes in advanced clutch control, route planning, and defensive road strategies.',
    certifications: ['NHA Certified Lead', 'Advanced Defensive Driving', 'Dual-Pedal Coach'],
    specialty: 'Manual & Automatic',
    rating: 4.9,
    reviews: 320,
    gender: 'Male',
    availability: 'Available',
    hours: '3,800+',
    successRate: '99%',
    languages: ['Urdu', 'Punjabi', 'English'],
    categories: ['Defensive', 'Manual', 'Automatic'],
    detailedBio: 'Zahid Mahmood has served as an elite trainer for over a decade. Formerly a consultant on road discipline, his modules cover tricky situations like heavy motorway traffic, parking in compressed spaces, and slope maintenance without handbrakes.',
    reviewsList: [
      { student: 'Haris Munir', comment: 'Zahid sir made manual driving feel incredibly logical. No stress, highly professional methods!' },
      { student: 'Usman Ghani', comment: 'The highway training is unbeatable. His control tips worked miracles for my confidence.' }
    ]
  },
  {
    name: 'Ayesha Khan',
    role: 'Senior Instructor - Female Training',
    experience: '8+ Years Exp',
    image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=600&q=80',
    description: 'Dedicated to providing a relaxed, secure environment for women. Ayesha is known for her extreme patience, constructive feedback, and mastery of automatic vehicles.',
    certifications: ['Female Safety Lead', 'Automatic Specialist', 'First-Aid Certified'],
    specialty: 'Automatic Transmission Only',
    rating: 5.0,
    reviews: 245,
    gender: 'Female',
    availability: 'Available',
    hours: '2,600+',
    successRate: '100%',
    languages: ['Urdu', 'Punjabi'],
    categories: ['Female Only', 'Automatic'],
    detailedBio: 'Ayesha is leading our female-only training program in Faisalabad. She is highly celebrated for her micro-adjustments techniques, safety prioritization, and structured feedback that leaves no room for nervousness.',
    reviewsList: [
      { student: 'Saba Fatima', comment: 'Ayesha apa is the best instructor ever! Zero panic, she explains every tiny detail so sweetly.' },
      { student: 'Zainab Bibi', comment: 'Loved my 10-day class. I went from never touching a steering wheel to driving to office alone.' }
    ]
  },
  {
    name: 'Muhammad Bilal',
    role: 'Senior Defensive Coach',
    experience: '10+ Years Exp',
    image: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=600&q=80',
    description: 'Muhammad is an expert on local traffic laws and highway navigation. He excels at preparing students for tough test routes, ensuring high first-time success rates.',
    certifications: ['License Test Expert', 'Highway Protocol Certified', 'Elite Defensive Coach'],
    specialty: 'Commercial & Light Vehicles',
    rating: 4.8,
    reviews: 198,
    gender: 'Male',
    availability: 'In Session',
    hours: '2,100+',
    successRate: '98%',
    languages: ['Urdu', 'Punjabi', 'English'],
    categories: ['Defensive', 'Manual'],
    detailedBio: 'Bilal focuses deeply on defensive driving theories. His training covers active hazards, brake reaction times under rainfall, and local regulatory protocols to make sure you clear your driving licensing exam with sheer ease.',
    reviewsList: [
      { student: 'Ahmad Raza', comment: 'He knows exactly what testing officers look for. Passed my test in the first attempt!' },
      { student: 'Kamran Shah', comment: 'Professional, punctual, and highly skilled. His highway hazard awareness tips are gold.' }
    ]
  },
  {
    name: 'Sania Malik',
    role: 'Defensive Driving Specialist',
    experience: '5+ Years Exp',
    image: 'https://images.unsplash.com/photo-1580894732444-8fecef2271da?auto=format&fit=crop&w=600&q=80',
    description: 'An expert in slow-speed lane navigation, heavy-congestion lane splits, parallel parking mechanics, and active hazard observation.',
    certifications: ['License Prep Specialist', 'Dual-Control Coach', 'Safe Driver Faisalabad Award'],
    specialty: 'Automatic & Manual Dual-Wing',
    rating: 4.7,
    reviews: 132,
    gender: 'Female',
    availability: 'Available',
    hours: '1,400+',
    successRate: '97%',
    languages: ['Urdu', 'English'],
    categories: ['Female Only', 'Automatic', 'Manual'],
    detailedBio: 'Sania combines mental coaching with steering mechanics to support students struggling with driving anxiety. She uses low-stress lanes and steady exposure to build confidence block by block.',
    reviewsList: [
      { student: 'Areeba Jamil', comment: 'I had terrible driving phobia. Sania completely cured it. Highly recommended for beginners!' },
      { student: 'Maria Butt', comment: 'So appreciative of her gentle, repetitive teaching style. She made parallel parking feel like child play.' }
    ]
  }
];

export async function fetchInstructors(): Promise<any[]> {
  const localSaved = localStorage.getItem('instructors');
  let fallback = localSaved ? JSON.parse(localSaved) : DEFAULT_SEEDED_INSTRUCTORS;

  if (supabase) {
    try {
      const active = await tableExists('instructors');
      if (active) {
        const { data, error } = await supabase
          .from('instructors')
          .select('*')
          .order('created_at', { ascending: true });

        if (!error && data) {
          if (data.length > 0) {
            const mapped = data.map(normalizeDbInstructor);
            localStorage.setItem('instructors', JSON.stringify(mapped));
            window.dispatchEvent(new Event('instructors_updated'));
            return mapped;
          } else {
            console.log("Seeding default instructors to database...");
            for (const inst of DEFAULT_SEEDED_INSTRUCTORS) {
              const mappedInst = {
                name: inst.name,
                role: inst.role,
                description: inst.description || '',
                image: inst.image || '',
                certifications: inst.certifications || [],
                rating: Number(inst.rating) || 5.0,
                reviews: Number(inst.reviews) || 0,
                gender: inst.gender || 'Male',
                availability: inst.availability || 'Available',
                hours: inst.hours || '',
                success_rate: inst.successRate || '',
                languages: inst.languages || [],
                experience: inst.experience || '5+ Years Exp',
                specialty: inst.specialty || 'Automatic & Manual',
                categories: inst.categories || [],
                detailed_bio: inst.detailedBio || '',
                reviews_list: inst.reviewsList || []
              };
              await supabase.from('instructors').insert([mappedInst]);
            }
            // Refetch
            const { data: refetched } = await supabase
              .from('instructors')
              .select('*')
              .order('created_at', { ascending: true });
            if (refetched && refetched.length > 0) {
              const mapped = refetched.map(normalizeDbInstructor);
              localStorage.setItem('instructors', JSON.stringify(mapped));
              window.dispatchEvent(new Event('instructors_updated'));
              return mapped;
            }
            return fallback;
          }
        }
      }
    } catch (e) {
      console.error('Supabase fetchInstructors failed', e);
    }
  }
  return fallback;
}

export async function insertInstructor(instructor: any): Promise<boolean> {
  const mapped: DbInstructor = {
    name: instructor.name,
    role: instructor.role,
    description: instructor.description || '',
    image: instructor.image || '',
    certifications: instructor.certifications || [],
    rating: Number(instructor.rating) || 5.0,
    reviews: Number(instructor.reviews) || 0,
    gender: instructor.gender || 'Male',
    availability: instructor.availability || 'Available',
    hours: instructor.hours || '',
    success_rate: instructor.successRate || '',
    languages: instructor.languages || [],
    experience: instructor.experience || '5+ Years Exp',
    specialty: instructor.specialty || 'Automatic & Manual',
    categories: instructor.categories || [],
    detailed_bio: instructor.detailedBio || '',
    reviews_list: instructor.reviewsList || []
  };

  // Add locally first
  const existingLocal = localStorage.getItem('instructors');
  const localList = existingLocal ? JSON.parse(existingLocal) : [];
  
  // Update or insert locally
  let updatedLocal: any[];
  const localId = instructor.id || 'inst-' + Date.now().toString();
  const fullObj = { ...instructor, id: localId };
  
  if (localList.some((item: any) => item.id === instructor.id)) {
    updatedLocal = localList.map((item: any) => item.id === instructor.id ? fullObj : item);
  } else {
    updatedLocal = [...localList, fullObj];
  }
  localStorage.setItem('instructors', JSON.stringify(updatedLocal));
  window.dispatchEvent(new Event('instructors_updated'));
  window.dispatchEvent(new Event('storage'));

  if (supabase) {
    try {
      const active = await tableExists('instructors');
      if (active) {
        // Look up if an instructor with the same name or ID exists in the database
        const isUuid = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(instructor.id);
        
        let existingId: string | null = null;
        if (isUuid) {
          existingId = instructor.id;
        } else {
          // Query by name to see if we already have this instructor in Supabase
          const { data: dbMatched } = await supabase
            .from('instructors')
            .select('id')
            .eq('name', instructor.name)
            .limit(1);
          if (dbMatched && dbMatched.length > 0) {
            existingId = dbMatched[0].id;
          }
        }

        let result;
        if (existingId) {
          result = await supabase
            .from('instructors')
            .update(mapped)
            .eq('id', existingId)
            .select();
        } else {
          result = await supabase
            .from('instructors')
            .insert([mapped])
            .select();
        }

        if (!result.error && result.data && result.data.length > 0) {
          const synced = normalizeDbInstructor(result.data[0]);
          const currentList = JSON.parse(localStorage.getItem('instructors') || '[]');
          const filtered = currentList.filter((item: any) => item.id !== localId && item.id !== synced.id);
          filtered.push(synced);
          localStorage.setItem('instructors', JSON.stringify(filtered));
          window.dispatchEvent(new Event('instructors_updated'));
          return true;
        }
      }
    } catch (e) {
      console.error('Supabase insertInstructor failed', e);
    }
  }
  return true;
}

export async function deleteInstructorBackend(id: string): Promise<boolean> {
  // Delete locally
  const existingLocal = localStorage.getItem('instructors');
  if (existingLocal) {
    const localList = JSON.parse(existingLocal);
    const updated = localList.filter((item: any) => item.id !== id);
    localStorage.setItem('instructors', JSON.stringify(updated));
    window.dispatchEvent(new Event('instructors_updated'));
    window.dispatchEvent(new Event('storage'));
  }

  if (supabase) {
    try {
      const active = await tableExists('instructors');
      if (active) {
        const isUuid = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(id);
        if (isUuid) {
          const { error } = await supabase
            .from('instructors')
            .delete()
            .eq('id', id);
          if (!error) return true;
        }
      }
    } catch (e) {
      console.error('deleteInstructorBackend error', e);
    }
  }
  return true;
}

export async function saveInstructorsList(list: any[]): Promise<boolean> {
  localStorage.setItem('instructors', JSON.stringify(list));
  window.dispatchEvent(new Event('instructors_updated'));
  window.dispatchEvent(new Event('storage'));

  if (supabase) {
    try {
      const active = await tableExists('instructors');
      if (active) {
        for (const item of list) {
          await insertInstructor(item);
        }
        return true;
      }
    } catch (e) {
      console.error('saveInstructorsList failed', e);
    }
  }
  return true;
}

// -------------------------------------------------------------------------
// 6. BLOG POSTS OPERATIONS
// -------------------------------------------------------------------------

export async function fetchBlogPosts(): Promise<any[]> {
  const localSaved = localStorage.getItem('blogPosts');
  let fallback = localSaved ? JSON.parse(localSaved) : [];

  if (supabase) {
    try {
      const active = await tableExists('blog_posts');
      if (active) {
        const { data, error } = await supabase
          .from('blog_posts')
          .select('*')
          .order('created_at', { ascending: false });

        if (!error && data) {
          if (data.length > 0) {
            const mapped = data.map(normalizeDbBlogPost);
            localStorage.setItem('blogPosts', JSON.stringify(mapped));
            window.dispatchEvent(new Event('blog_editors_updated'));
            return mapped;
          } else {
            return fallback;
          }
        }
      }
    } catch (e) {
      console.error('Supabase fetchBlogPosts failed', e);
    }
  }
  return fallback;
}

export async function insertBlogPost(post: any): Promise<boolean> {
  const mapped: DbBlogPost = {
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
    status: post.status || 'Draft',
    scheduled_at: post.scheduledAt || ''
  };

  // Add locally first
  const existingLocal = localStorage.getItem('blogPosts');
  const localList = existingLocal ? JSON.parse(existingLocal) : [];
  
  let updatedLocal: any[];
  const localId = post.id || 'blog-' + Date.now().toString();
  const fullObj = { ...post, id: localId };
  
  if (localList.some((item: any) => String(item.id) === String(post.id))) {
    updatedLocal = localList.map((item: any) => String(item.id) === String(post.id) ? fullObj : item);
  } else {
    updatedLocal = [fullObj, ...localList];
  }
  localStorage.setItem('blogPosts', JSON.stringify(updatedLocal));
  window.dispatchEvent(new Event('blog_editors_updated'));
  window.dispatchEvent(new Event('storage'));

  if (supabase) {
    try {
      const active = await tableExists('blog_posts');
      if (active) {
        const isUuid = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(post.id);
        
        let existingId: string | null = null;
        if (isUuid) {
          existingId = post.id;
        } else {
          const { data: dbMatched } = await supabase
            .from('blog_posts')
            .select('id')
            .eq('title', post.title)
            .limit(1);
          if (dbMatched && dbMatched.length > 0) {
            existingId = dbMatched[0].id;
          }
        }

        let result;
        if (existingId) {
          result = await supabase
            .from('blog_posts')
            .update(mapped)
            .eq('id', existingId)
            .select();
        } else {
          result = await supabase
            .from('blog_posts')
            .insert([mapped])
            .select();
        }

        if (!result.error && result.data && result.data.length > 0) {
          const synced = normalizeDbBlogPost(result.data[0]);
          const currentList = JSON.parse(localStorage.getItem('blogPosts') || '[]');
          const filtered = currentList.filter((item: any) => String(item.id) !== String(localId) && String(item.id) !== String(synced.id));
          filtered.unshift(synced);
          localStorage.setItem('blogPosts', JSON.stringify(filtered));
          window.dispatchEvent(new Event('blog_editors_updated'));
          return true;
        }
      }
    } catch (e) {
      console.error('Supabase insertBlogPost failed', e);
    }
  }
  return true;
}

export async function deleteBlogPostBackend(id: string): Promise<boolean> {
  // Delete locally
  const existingLocal = localStorage.getItem('blogPosts');
  if (existingLocal) {
    const localList = JSON.parse(existingLocal);
    const updated = localList.filter((item: any) => String(item.id) !== String(id));
    localStorage.setItem('blogPosts', JSON.stringify(updated));
    window.dispatchEvent(new Event('blog_editors_updated'));
    window.dispatchEvent(new Event('storage'));
  }

  if (supabase) {
    try {
      const active = await tableExists('blog_posts');
      if (active) {
        const isUuid = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(id);
        if (isUuid) {
          const { error } = await supabase
            .from('blog_posts')
            .delete()
            .eq('id', id);
          if (!error) return true;
        }
      }
    } catch (e) {
      console.error('deleteBlogPostBackend error', e);
    }
  }
  return true;
}

// -------------------------------------------------------------------------
// 7. DRIVING COURSES OPERATIONS
// -------------------------------------------------------------------------

export async function fetchDrivingCourses(): Promise<any[]> {
  const localSaved = localStorage.getItem('driving_courses_v4');
  let fallback = localSaved ? JSON.parse(localSaved) : [];

  if (supabase) {
    try {
      const active = await tableExists('driving_courses');
      if (active) {
        const { data, error } = await supabase
          .from('driving_courses')
          .select('*')
          .order('created_at', { ascending: true });

        if (!error && data && data.length > 0) {
          const mapped = data.map(normalizeDbDrivingCourse);
          localStorage.setItem('driving_courses_v4', JSON.stringify(mapped));
          window.dispatchEvent(new Event('driving_courses_updated'));
          return mapped;
        }
      }
    } catch (e) {
      console.error('Supabase fetchDrivingCourses failed', e);
    }
  }
  return fallback;
}

export async function insertDrivingCourse(course: any): Promise<boolean> {
  const mapped: DbDrivingCourse = {
    custom_id: course.customId || course.id || '',
    name: course.name,
    price: course.price ? course.price.toString().replace(/,/g, '') : '0',
    duration: course.duration || '',
    badge: course.badge || '',
    is_popular: course.isPopular || false,
    transmission: course.transmission || 'Manual',
    description: course.description || '',
    features: course.features || [],
    specifications: course.specifications || []
  };

  // Add locally first
  const existingLocal = localStorage.getItem('driving_courses_v4');
  const localList = existingLocal ? JSON.parse(existingLocal) : [];
  
  let updatedLocal: any[];
  const localId = course.id || 'course-' + Date.now().toString();
  const fullObj = { ...course, id: localId };
  
  if (localList.some((item: any) => item.id === course.id)) {
    updatedLocal = localList.map((item: any) => item.id === course.id ? fullObj : item);
  } else {
    updatedLocal = [...localList, fullObj];
  }
  localStorage.setItem('driving_courses_v4', JSON.stringify(updatedLocal));
  window.dispatchEvent(new Event('driving_courses_updated'));
  window.dispatchEvent(new Event('storage'));

  if (supabase) {
    try {
      const active = await tableExists('driving_courses');
      if (active) {
        const isUuid = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(course.id);
        
        let existingId: string | null = null;
        if (isUuid) {
          existingId = course.id;
        } else {
          const { data: dbMatched } = await supabase
            .from('driving_courses')
            .select('id')
            .eq('name', course.name)
            .limit(1);
          if (dbMatched && dbMatched.length > 0) {
            existingId = dbMatched[0].id;
          }
        }

        let result;
        if (existingId) {
          result = await supabase
            .from('driving_courses')
            .update(mapped)
            .eq('id', existingId)
            .select();
        } else {
          result = await supabase
            .from('driving_courses')
            .insert([mapped])
            .select();
        }

        if (!result.error && result.data && result.data.length > 0) {
          const synced = normalizeDbDrivingCourse(result.data[0]);
          const currentList = JSON.parse(localStorage.getItem('driving_courses_v4') || '[]');
          const filtered = currentList.filter((item: any) => item.id !== localId && item.id !== synced.id);
          filtered.push(synced);
          localStorage.setItem('driving_courses_v4', JSON.stringify(filtered));
          window.dispatchEvent(new Event('driving_courses_updated'));
          return true;
        }
      }
    } catch (e) {
      console.error('Supabase insertDrivingCourse failed', e);
    }
  }
  return true;
}

export async function deleteDrivingCourseBackend(id: string): Promise<boolean> {
  // Delete locally
  const existingLocal = localStorage.getItem('driving_courses_v4');
  if (existingLocal) {
    const localList = JSON.parse(existingLocal);
    const updated = localList.filter((item: any) => item.id !== id);
    localStorage.setItem('driving_courses_v4', JSON.stringify(updated));
    window.dispatchEvent(new Event('driving_courses_updated'));
    window.dispatchEvent(new Event('storage'));
  }

  if (supabase) {
    try {
      const active = await tableExists('driving_courses');
      if (active) {
        const isUuid = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(id);
        if (isUuid) {
          const { error } = await supabase
            .from('driving_courses')
            .delete()
            .eq('id', id);
          if (!error) return true;
        }
      }
    } catch (e) {
      console.error('deleteDrivingCourseBackend error', e);
    }
  }
  return true;
}

export async function saveDrivingCoursesList(list: any[]): Promise<boolean> {
  localStorage.setItem('driving_courses_v4', JSON.stringify(list));
  window.dispatchEvent(new Event('driving_courses_updated'));
  window.dispatchEvent(new Event('storage'));

  if (supabase) {
    try {
      const active = await tableExists('driving_courses');
      if (active) {
        for (const item of list) {
          await insertDrivingCourse(item);
        }
        return true;
      }
    } catch (e) {
      console.error('saveDrivingCoursesList failed', e);
    }
  }
  return true;
}

