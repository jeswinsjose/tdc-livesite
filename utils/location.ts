import cityData from '../data/city.json';

const IPSTACK_API_KEY = import.meta.env.VITE_IPSTACK_API_KEY;
const CACHE_KEY = 'user_location_cache';
const CACHE_DURATION = 24 * 60 * 60 * 1000; // 24 hours

interface UserLocation {
    latitude: number;
    longitude: number;
    timestamp: number;
}

interface City {
    city: string;
    lat: string;
    lng: string;
    PresentedNumber: string;
    presentedNumberNoSpace: string;
    Address: string;
}

// Haversine formula to calculate distance between two points
const calculateDistance = (lat1: number, lon1: number, lat2: number, lon2: number): number => {
    const R = 6371; // Radius of the earth in km
    const dLat = deg2rad(lat2 - lat1);
    const dLon = deg2rad(lon2 - lon1);
    const a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) *
        Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const d = R * c; // Distance in km
    return d;
};

const deg2rad = (deg: number): number => {
    return deg * (Math.PI / 180);
};

export const getUserLocation = async (): Promise<{ latitude: number; longitude: number } | null> => {
    // Check cache first
    const cached = localStorage.getItem(CACHE_KEY);
    if (cached) {
        const data: UserLocation = JSON.parse(cached);
        if (Date.now() - data.timestamp < CACHE_DURATION) {
            return { latitude: data.latitude, longitude: data.longitude };
        }
    }

    try {
        // Attempt 1: IPStack (if key is present)
        if (IPSTACK_API_KEY) {
            try {
                const ipstackUrl = `https://api.ipstack.com/check?access_key=${IPSTACK_API_KEY}`;
                const response = await fetch(ipstackUrl);
                const data = await response.json();

                if (data.latitude && data.longitude) {
                    const locationData: UserLocation = {
                        latitude: data.latitude,
                        longitude: data.longitude,
                        timestamp: Date.now(),
                    };
                    localStorage.setItem(CACHE_KEY, JSON.stringify(locationData));
                    return { latitude: data.latitude, longitude: data.longitude };
                }
            } catch (err) {
                console.warn('IPStack fetch failed, trying fallback...');
            }
        }

        // Attempt 2: Fallback to ipapi.co
        const fallbackResponse = await fetch('https://ipapi.co/json/');
        const fallbackData = await fallbackResponse.json();

        if (fallbackData.latitude && fallbackData.longitude) {
            const locationData: UserLocation = {
                latitude: fallbackData.latitude,
                longitude: fallbackData.longitude,
                timestamp: Date.now(),
            };
            localStorage.setItem(CACHE_KEY, JSON.stringify(locationData));
            return { latitude: fallbackData.latitude, longitude: fallbackData.longitude };
        }

    } catch (error) {
        console.error('Error fetching location:', error);
    }

    return null;
};

export const getNearestCity = (userLat: number, userLon: number): City | null => {
    let nearestCity: City | null = null;
    let minDistance = Infinity;

    cityData.cities.forEach((city: any) => {
        const cityLat = parseFloat(city.lat);
        const cityLng = parseFloat(city.lng);

        if (!isNaN(cityLat) && !isNaN(cityLng)) {
            const distance = calculateDistance(userLat, userLon, cityLat, cityLng);
            if (distance < minDistance) {
                minDistance = distance;
                nearestCity = city;
            }
        }
    });

    return nearestCity;
};
