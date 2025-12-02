import cityData from '../data/city.json';

const IPSTACK_API_KEY = import.meta.env.VITE_IPSTACK_API_KEY;
const IPGEOLOCATION_API_KEY = import.meta.env.VITE_IPGEOLOCATION_API_KEY;
const ABSTRACT_API_KEY = import.meta.env.VITE_ABSTRACT_API_KEY;

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

    // Attempt 1: ipgeolocation.io (Primary)
    if (IPGEOLOCATION_API_KEY) {
        try {
            const url = `https://api.ipgeolocation.io/ipgeo?apiKey=${IPGEOLOCATION_API_KEY}`;
            const response = await fetchWithTimeout(url, {}, 5000);

            if (!response.ok) throw new Error(`ipgeolocation.io returned ${response.status}`);

            const data = await response.json();

            if (data.latitude && data.longitude) {
                const lat = parseFloat(data.latitude);
                const lng = parseFloat(data.longitude);
                saveToCache(lat, lng);
                return { latitude: lat, longitude: lng };
            } else {
                console.warn('ipgeolocation.io response missing coordinates:', data);
            }
        } catch (err) {
            console.warn('ipgeolocation.io fetch failed:', err);
        }
    } else {
        console.warn('No IPGeolocation API key found, skipping primary provider.');
    }

    // Attempt 2: Abstract API (Secondary)
    if (ABSTRACT_API_KEY) {
        try {
            const url = `https://ip-intelligence.abstractapi.com/v1/?api_key=${ABSTRACT_API_KEY}`;
            const response = await fetchWithTimeout(url, {}, 5000);

            if (!response.ok) throw new Error(`Abstract API returned ${response.status}`);

            const data = await response.json();

            if (data.latitude && data.longitude) {
                saveToCache(data.latitude, data.longitude);
                return { latitude: data.latitude, longitude: data.longitude };
            } else {
                console.warn('Abstract API response missing coordinates:', data);
            }
        } catch (err) {
            console.warn('Abstract API fetch failed:', err);
        }
    } else {
        console.warn('No Abstract API key found, skipping secondary provider.');
    }

    // Attempt 3: IPStack (Tertiary)
    if (IPSTACK_API_KEY) {
        try {
            const ipstackUrl = `https://api.ipstack.com/check?access_key=${IPSTACK_API_KEY}`;
            const response = await fetchWithTimeout(ipstackUrl, {}, 5000);

            if (!response.ok) throw new Error(`IPStack returned ${response.status}`);

            const data = await response.json();

            if (data.latitude && data.longitude) {
                saveToCache(data.latitude, data.longitude);
                return { latitude: data.latitude, longitude: data.longitude };
            } else {
                console.warn('IPStack response missing coordinates:', data);
            }
        } catch (err) {
            console.warn('IPStack fetch failed:', err);
        }
    } else {
        console.warn('No IPStack API key found, skipping tertiary provider.');
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
