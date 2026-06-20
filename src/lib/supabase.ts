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
