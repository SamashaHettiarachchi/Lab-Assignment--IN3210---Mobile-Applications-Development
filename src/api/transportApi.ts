import axios from "axios";
import type { TransportRoute, LoginCredentials, AuthResponse } from "../types";

// Using DummyJSON public API
const baseURL = "https://dummyjson.com";
const api = axios.create({ baseURL });

// Fetch transport routes (using products API and mapping to routes)
export const getRoutes = async (): Promise<TransportRoute[]> => {
  const response = await api.get("/products", {
    params: { limit: 30, select: "id,title,description,thumbnail,price,category" }
  });
  
  // Transport route templates
  const transportRoutes = [
    { prefix: "Central Line", type: "Metro", desc: "Express metro service connecting major city hubs", schedule: "Every 5 mins", hours: "5:00 AM - 12:00 AM" },
    { prefix: "Airport Shuttle", type: "Bus", desc: "Direct bus service to international airport terminal", schedule: "Every 20 mins", hours: "24 Hours" },
    { prefix: "Coastal Express", type: "Train", desc: "Scenic coastal railway with multiple beach stops", schedule: "Every 30 mins", hours: "6:00 AM - 10:00 PM" },
    { prefix: "North Circular", type: "Bus", desc: "Circular bus route covering northern suburbs", schedule: "Every 15 mins", hours: "5:30 AM - 11:30 PM" },
    { prefix: "Green Line", type: "Metro", desc: "Underground rapid transit through business district", schedule: "Every 3 mins", hours: "5:00 AM - 1:00 AM" },
    { prefix: "River Ferry", type: "Ferry", desc: "Waterway transport along the main river route", schedule: "Every 45 mins", hours: "7:00 AM - 9:00 PM" },
    { prefix: "Blue Line", type: "Metro", desc: "High-frequency metro connecting residential areas", schedule: "Every 4 mins", hours: "5:00 AM - 12:00 AM" },
    { prefix: "East Express", type: "Train", desc: "Fast train service to eastern destinations", schedule: "Every 20 mins", hours: "6:00 AM - 11:00 PM" },
    { prefix: "City Loop", type: "Tram", desc: "Historic tram loop around city center attractions", schedule: "Every 10 mins", hours: "7:00 AM - 10:00 PM" },
    { prefix: "South Link", type: "Bus", desc: "Regional bus connecting southern communities", schedule: "Every 25 mins", hours: "6:00 AM - 11:00 PM" },
    { prefix: "Red Line", type: "Metro", desc: "Major metro line with 24-hour service", schedule: "Every 6 mins", hours: "24 Hours" },
    { prefix: "Mountain Route", type: "Bus", desc: "Scenic mountain pass route with viewpoints", schedule: "Every 60 mins", hours: "8:00 AM - 6:00 PM" },
    { prefix: "Harbor Cruise", type: "Ferry", desc: "Regular ferry service across the harbor", schedule: "Every 30 mins", hours: "6:00 AM - 10:00 PM" },
    { prefix: "Orange Line", type: "Metro", desc: "Newly opened metro line with modern facilities", schedule: "Every 5 mins", hours: "5:30 AM - 12:30 AM" },
    { prefix: "West Connector", type: "Bus", desc: "High-frequency bus connecting western suburbs", schedule: "Every 12 mins", hours: "5:00 AM - 11:00 PM" },
    { prefix: "Purple Line", type: "Metro", desc: "Express metro to university and research district", schedule: "Every 8 mins", hours: "5:00 AM - 1:00 AM" },
    { prefix: "Valley Route", type: "Train", desc: "Regional train through scenic valley landscape", schedule: "Every 40 mins", hours: "7:00 AM - 9:00 PM" },
    { prefix: "Night Owl", type: "Bus", desc: "24-hour night bus service across all zones", schedule: "Every 30 mins", hours: "24 Hours" },
    { prefix: "Yellow Line", type: "Tram", desc: "Light rail connecting shopping districts", schedule: "Every 10 mins", hours: "8:00 AM - 11:00 PM" },
    { prefix: "Island Ferry", type: "Ferry", desc: "Daily ferry service to nearby islands", schedule: "Every 90 mins", hours: "7:00 AM - 8:00 PM" },
    { prefix: "Campus Shuttle", type: "Bus", desc: "University campus circular bus route", schedule: "Every 15 mins", hours: "7:00 AM - 10:00 PM" },
    { prefix: "Brown Line", type: "Metro", desc: "Underground service to historical district", schedule: "Every 7 mins", hours: "5:00 AM - 12:00 AM" },
    { prefix: "Beach Express", type: "Bus", desc: "Summer express bus to popular beaches", schedule: "Every 20 mins", hours: "6:00 AM - 9:00 PM" },
    { prefix: "Silver Line", type: "Train", desc: "High-speed rail to neighboring cities", schedule: "Every 30 mins", hours: "5:30 AM - 11:30 PM" },
    { prefix: "Park & Ride", type: "Bus", desc: "Connecting parking facilities to city center", schedule: "Every 10 mins", hours: "6:00 AM - 10:00 PM" },
    { prefix: "Sports Stadium", type: "Shuttle", desc: "Event shuttle service on game days", schedule: "Event Days", hours: "Match Times" },
    { prefix: "Pink Line", type: "Tram", desc: "Light rail through entertainment district", schedule: "Every 12 mins", hours: "10:00 AM - 2:00 AM" },
    { prefix: "Highway Express", type: "Bus", desc: "Limited-stop express bus on main highway", schedule: "Every 15 mins", hours: "5:00 AM - 11:00 PM" },
    { prefix: "Golden Route", type: "Train", desc: "Premium tourist train with panoramic views", schedule: "Every 60 mins", hours: "9:00 AM - 7:00 PM" },
    { prefix: "Medical Center", type: "Shuttle", desc: "Free shuttle connecting hospitals and clinics", schedule: "Every 20 mins", hours: "6:00 AM - 10:00 PM" }
  ];
  
  // Map products to transport routes with realistic transport data
  const routes: TransportRoute[] = response.data.products.map((product: any, index: number) => {
    const template = transportRoutes[index % transportRoutes.length];
    const routeNum = Math.floor(Math.random() * 900) + 100;
    
    // Transport-themed images using unsplash
    const transportImages = [
      'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=400', // train
      'https://images.unsplash.com/photo-1570125909232-eb263c188f7e?w=400', // bus
      'https://images.unsplash.com/photo-1474487548417-781cb71495f3?w=400', // metro
      'https://images.unsplash.com/photo-1589308078059-be1415eab4c7?w=400', // ferry
      'https://images.unsplash.com/photo-1554672408-17e7c4e5d4f7?w=400', // tram
      'https://images.unsplash.com/photo-1464219789935-c2d9d9aba644?w=400', // train station
      'https://images.unsplash.com/photo-1543783207-ec64e4d95325?w=400', // bus interior
      'https://images.unsplash.com/photo-1583266260445-5c0371e2117d?w=400', // subway
      'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=400', // transport
      'https://images.unsplash.com/photo-1530536875268-1d2ea6a87e4e?w=400', // railway
    ];
    
    return {
      id: product.id,
      title: `${template.prefix} (${template.type} ${routeNum})`,
      description: template.desc,
      status: product.price > 500 ? "Active" : "Upcoming",
      image: transportImages[index % transportImages.length],
      schedule: template.schedule,
      frequency: template.schedule,
      operatingHours: template.hours,
    };
  });
  
  return routes;
};

// Login API using DummyJSON auth
export const loginUser = async (credentials: LoginCredentials): Promise<AuthResponse> => {
  try {
    const response = await api.post<AuthResponse>("/auth/login", {
      username: credentials.username,
      password: credentials.password,
    });
    return response.data;
  } catch (error: any) {
    if (error.response?.status === 400) {
      throw new Error("Invalid username or password");
    }
    throw new Error(error.response?.data?.message || "Login failed. Please try again.");
  }
};

export default api;
