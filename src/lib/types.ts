export type ApiResponse<T> = { success: boolean; message: string; data: T };

export type Service = {
  _id: string;
  serviceName: string;
  category: string;
  description: string;
  price: number;
  duration: number;
  image: string;
  status: "active" | "inactive";
  createdAt: string;
};

export type AppointmentStatus = "pending" | "confirmed" | "cancelled";

export type Appointment = {
  _id: string;
  serviceId: string;
  customerId: string;
  appointmentDate: string;
  timeSlot: string;
  message: string;
  servicePrice: number;
  paymentStatus: "unpaid" | "paid";
  status: AppointmentStatus;
  serviceName: string;
  serviceImage: string;
  serviceCategory: string;
  customerName: string;
  customerEmail: string;
  createdAt: string;
};

export type AppUser = {
  _id: string;
  name: string;
  email: string;
  image?: string | null;
  phone?: string | null;
  role: "customer" | "admin";
  isBlocked?: boolean;
  appointmentCount?: number;
  createdAt: string;
};

export type Transaction = {
  _id: string;
  appointmentId: string;
  customerId: string;
  amount: number;
  currency: string;
  stripeSessionId: string;
  status: "paid" | "failed";
  createdAt: string;
  appointment?: Appointment;
};

export type StatusCounts = { total: number; pending: number; confirmed: number; cancelled: number };

export type CustomerStats = StatusCounts & { paid: number; upcoming: Appointment[] };

export type AdminStats = {
  totalServices: number;
  activeServices: number;
  totalCustomers: number;
  blockedUsers: number;
  appointments: StatusCounts;
  revenue: number;
  paidPayments: number;
  recent: Appointment[];
};
