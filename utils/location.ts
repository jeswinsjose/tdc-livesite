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

const fetchWithTimeout = async (url: string, options: RequestInit = {}, timeout = 5000) => {
    const controller = new AbortController();
    const id = setTimeout(() => controller.abort(), timeout);
    try {
        const response = await fetch(url, {
            ...options,
            signal: controller.signal
        });
        clearTimeout(id);
        return response;
    } catch (error) {
        clearTimeout(id);
        throw error;
    }
};

export const getUserLocation = async (): Promise<{ latitude: number; longitude: number } | null> => {
    // Check cache first
    const cached = localStorage.getItem(CACHE_KEY);
    if (cached) {
        try {
            const data: UserLocation = JSON.parse(cached);
            if (Date.now() - data.timestamp < CACHE_DURATION) {
                console.log('Using cached location');
                return { latitude: data.latitude, longitude: data.longitude };
            }
        } catch (e) {
            console.warn('Error parsing cached location:', e);
            localStorage.removeItem(CACHE_KEY);
        }
    }

    const saveToCache = (lat: number, lng: number) => {
        const locationData: UserLocation = {
            latitude: lat,
            longitude: lng,
            timestamp: Date.now(),
        };
        localStorage.setItem(CACHE_KEY, JSON.stringify(locationData));
    };

    // Attempt 1: IPStack (Primary)
    if (IPSTACK_API_KEY) {
        try {
            console.log('Attempting to fetch location from IPStack...');
            const ipstackUrl = `https://api.ipstack.com/check?access_key=${IPSTACK_API_KEY}`;
            const response = await fetchWithTimeout(ipstackUrl, {}, 5000);

            if (!response.ok) throw new Error(`IPStack returned ${response.status}`);

            const data = await response.json();

            if (data.latitude && data.longitude) {
                console.log('Location fetched from IPStack');
                saveToCache(data.latitude, data.longitude);
                return { latitude: data.latitude, longitude: data.longitude };
            } else {
                console.warn('IPStack response missing coordinates:', data);
            }
        } catch (err) {
            console.warn('IPStack fetch failed:', err);
        }
    } else {
        console.warn('No IPStack API key found, skipping primary provider.');
    }

    // Attempt 2: ipapi.co (Secondary Fallback)
    try {
        console.log('Attempting to fetch location from ipapi.co (fallback)...');
        const fallbackResponse = await fetchWithTimeout('https://ipapi.co/json/', {}, 5000);

        if (!fallbackResponse.ok) throw new Error(`ipapi.co returned ${fallbackResponse.status}`);

        const fallbackData = await fallbackResponse.json();

        if (fallbackData.latitude && fallbackData.longitude) {
            console.log('Location fetched from ipapi.co');
            saveToCache(fallbackData.latitude, fallbackData.longitude);
            return { latitude: fallbackData.latitude, longitude: fallbackData.longitude };
        } else {
            console.warn('ipapi.co response missing coordinates:', fallbackData);
        }
    } catch (error) {
        console.error('All location services failed:', error);
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
