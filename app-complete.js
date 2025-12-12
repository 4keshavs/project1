// ============================================================
// MAIN APP LOGIC - Property Loading & Management
// ============================================================

const API_BASE = 'https://travel-booking-api.onrender.com/api';
// For local testing: const API_BASE = 'http://localhost:5000/api';

// Load properties on page load
document.addEventListener('DOMContentLoaded', async function() {
    console.log('App initialized');
    await loadProperties();
});

// Load all properties from backend
async function loadProperties() {
    try {
        const response = await fetch(`${API_BASE}/properties`);
        const data = await response.json();
        
        if (data.success && data.data) {
            displayProperties(data.data);
        } else {
            // Show sample properties if API not ready
            displaySampleProperties();
        }
    } catch (error) {
        console.error('Error loading properties:', error);
        displaySampleProperties();
    }
}

// Display sample properties (for testing)
function displaySampleProperties() {
    const sampleData = [
        {
            id: 1,
            name: 'Luxury Beachfront Villa',
            location: 'Maldives',
            price: 299,
            rating: 4.9,
            image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=500&h=300&fit=crop',
            description: 'Stunning private villa with ocean views'
        },
        {
            id: 2,
            name: 'Mountain Retreat',
            location: 'Swiss Alps',
            price: 199,
            rating: 4.8,
            image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=500&h=300&fit=crop',
            description: 'Cozy mountain cabin with alpine views'
        },
        {
            id: 3,
            name: 'Urban Penthouse',
            location: 'New York City',
            price: 399,
            rating: 4.7,
            image: 'https://images.unsplash.com/photo-1512453694671-98b8180cdccb?w=500&h=300&fit=crop',
            description: 'Modern luxury apartment in Manhattan'
        },
        {
            id: 4,
            name: 'Tropical Bungalow',
            location: 'Bali',
            price: 89,
            rating: 4.9,
            image: 'https://images.unsplash.com/photo-1530521954074-e64f47ba6d0f?w=500&h=300&fit=crop',
            description: 'Authentic Balinese bungalow experience'
        },
        {
            id: 5,
            name: 'Tuscan Villa',
            location: 'Italy',
            price: 249,
            rating: 4.8,
            image: 'https://images.unsplash.com/photo-1437299546744-e3007f5b1ffe?w=500&h=300&fit=crop',
            description: 'Classic Italian countryside villa'
        },
        {
            id: 6,
            name: 'Tokyo Modern Suite',
            location: 'Japan',
            price: 179,
            rating: 4.7,
            image: 'https://images.unsplash.com/photo-1498672179288-9b57b0b36e5c?w=500&h=300&fit=crop',
            description: 'Contemporary luxury in the heart of Tokyo'
        }
    ];
    displayProperties(sampleData);
}

// Display properties in grid
function displayProperties(properties) {
    const grid = document.getElementById('propertiesGrid');
    
    if (!grid) return;
    
    if (properties.length === 0) {
        grid.innerHTML = '<div class="loading">No properties found</div>';
        return;
    }

    grid.innerHTML = properties.map(property => `
        <div class="property-card" onclick="viewProperty(${property.id})">
            <img src="${property.image || 'https://via.placeholder.com/280x200'}" 
                 alt="${property.name}" class="property-image">
            <div class="property-info">
                <h3 class="property-name">${property.name}</h3>
                <p class="property-location">
                    <i class="fas fa-map-marker-alt"></i> ${property.location}
                </p>
                <p class="property-rating">
                    <i class="fas fa-star"></i> ${property.rating}/5 (${Math.floor(Math.random() * 200) + 50} reviews)
                </p>
                <div class="property-price">
                    <span class="price-tag">$${property.price}<span class="price-per-night">/night</span></span>
                    <button class="btn-book" onclick="event.stopPropagation(); bookProperty(${property.id})">
                        Book Now
                    </button>
                </div>
            </div>
        </div>
    `).join('');
}

// View property details
function viewProperty(propertyId) {
    console.log('Viewing property:', propertyId);
    window.location.href = `pages/property.html?id=${propertyId}`;
}

// Book property
async function bookProperty(propertyId) {
    const token = localStorage.getItem('token');
    
    if (!token) {
        alert('Please login to book a property');
        openLoginModal();
        return;
    }

    console.log('Booking property:', propertyId);
    window.location.href = `pages/booking.html?propertyId=${propertyId}`;
}

// Filter properties
function filterProperties() {
    const priceFilter = document.getElementById('priceFilter').value;
    const typeFilter = document.getElementById('typeFilter').value;

    console.log('Filtering by price:', priceFilter, 'type:', typeFilter);
}

// Search properties
function searchProperties() {
    const destination = document.getElementById('searchDestination').value;
    const checkIn = document.getElementById('checkIn').value;
    const checkOut = document.getElementById('checkOut').value;
    const guests = document.getElementById('guests').value;

    if (!destination || !checkIn || !checkOut) {
        alert('Please fill in all search fields');
        return;
    }

    console.log('Searching for:', destination, checkIn, checkOut, guests);
    window.location.href = `pages/search.html?destination=${destination}&checkIn=${checkIn}&checkOut=${checkOut}&guests=${guests}`;
}

// Toggle mobile menu
function toggleMenu() {
    const navLinks = document.querySelector('.nav-links');
    if (navLinks) {
        navLinks.style.display = navLinks.style.display === 'flex' ? 'none' : 'flex';
    }
}