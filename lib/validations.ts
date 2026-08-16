export interface ValidationResult {
  success: boolean;
  errors: Record<string, string>;
}

export interface CabBookingInput {
  customerName?: string | null;
  customerPhone?: string | null;
  customerEmail?: string | null;
  pickupLocation?: string | null;
  dropLocation?: string | null;
  vehicleType?: string | null;
  bookingDate?: string | null;
  bookingTime?: string | null;
  passengers?: string | number | null;
}

export interface TempoBookingInput {
  customerName?: string | null;
  customerPhone?: string | null;
  customerEmail?: string | null;
  pickupLocation?: string | null;
  dropLocation?: string | null;
  goodsType?: string | null;
  vehicleType?: string | null;
  bookingDate?: string | null;
  bookingTime?: string | null;
  estimatedWeight?: string | number | null;
}

export function validatePhone(phone: string): boolean {
  const phoneRegex = /^[6-9]\d{9}$/; // Indian mobile numbers start with 6-9 and have 10 digits
  return phoneRegex.test(phone.trim());
}

export function validateEmail(email?: string): boolean {
  if (!email || email.trim() === '') return true; // Optional
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email.trim());
}

export function validateCabBooking(data: CabBookingInput): ValidationResult {
  const errors: Record<string, string> = {};

  if (!data.customerName || data.customerName.trim().length < 2) {
    errors.customerName = 'Name must be at least 2 characters.';
  }

  if (!data.customerPhone || !validatePhone(data.customerPhone)) {
    errors.customerPhone = 'Enter a valid 10-digit Indian mobile number.';
  }

  if (data.customerEmail && !validateEmail(data.customerEmail)) {
    errors.customerEmail = 'Enter a valid email address.';
  }

  if (!data.pickupLocation || data.pickupLocation.trim().length < 3) {
    errors.pickupLocation = 'Pickup location is required.';
  }

  if (!data.dropLocation || data.dropLocation.trim().length < 3) {
    errors.dropLocation = 'Drop location is required.';
  }

  const validCabTypes = ['hatchback', 'sedan', 'suv', 'premium', 'tempo', 'tata_ace', 'mahindra_supro', 'pickup'];
  if (!data.vehicleType || !validCabTypes.includes(data.vehicleType.toLowerCase())) {
    errors.vehicleType = 'Please select a valid cab type.';
  }

  if (!data.bookingDate) {
    errors.bookingDate = 'Travel date is required.';
  } else {
    const selectedDate = new Date(data.bookingDate);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    if (selectedDate < today) {
      errors.bookingDate = 'Travel date cannot be in the past.';
    }
  }

  if (!data.bookingTime || data.bookingTime.trim() === '') {
    errors.bookingTime = 'Travel time is required.';
  }

  const passengers = parseInt(String(data.passengers || ''));
  if (isNaN(passengers) || passengers < 1 || passengers > 26) {
    errors.passengers = 'Number of passengers must be between 1 and 26.';
  }

  return {
    success: Object.keys(errors).length === 0,
    errors,
  };
}

export function validateTempoBooking(data: TempoBookingInput): ValidationResult {
  const errors: Record<string, string> = {};

  if (!data.customerName || data.customerName.trim().length < 2) {
    errors.customerName = 'Name must be at least 2 characters.';
  }

  if (!data.customerPhone || !validatePhone(data.customerPhone)) {
    errors.customerPhone = 'Enter a valid 10-digit Indian mobile number.';
  }

  if (data.customerEmail && !validateEmail(data.customerEmail)) {
    errors.customerEmail = 'Enter a valid email address.';
  }

  if (!data.pickupLocation || data.pickupLocation.trim().length < 3) {
    errors.pickupLocation = 'Pickup location is required.';
  }

  if (!data.dropLocation || data.dropLocation.trim().length < 3) {
    errors.dropLocation = 'Drop location is required.';
  }

  if (!data.goodsType || data.goodsType.trim().length < 2) {
    errors.goodsType = 'Specify the type of goods to transport.';
  }

  const validTempoTypes = ['tata_ace', 'mahindra_supro', 'pickup', 'small_truck', 'medium_truck'];
  if (!data.vehicleType || !validTempoTypes.includes(data.vehicleType.toLowerCase())) {
    errors.vehicleType = 'Please select a valid vehicle type.';
  }

  if (!data.bookingDate) {
    errors.bookingDate = 'Required date is required.';
  } else {
    const selectedDate = new Date(data.bookingDate);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    if (selectedDate < today) {
      errors.bookingDate = 'Required date cannot be in the past.';
    }
  }

  if (!data.bookingTime || data.bookingTime.trim() === '') {
    errors.bookingTime = 'Required time is required.';
  }

  if (data.estimatedWeight !== undefined && data.estimatedWeight !== null && data.estimatedWeight !== '') {
    const weight = parseFloat(String(data.estimatedWeight || ''));
    if (isNaN(weight) || weight <= 0) {
      errors.estimatedWeight = 'Estimated weight must be a positive number.';
    }
  }

  return {
    success: Object.keys(errors).length === 0,
    errors,
  };
}
