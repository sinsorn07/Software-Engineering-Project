import React, { useEffect } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

const MapComponent = ({ latitude = 13.736717, longitude = 100.523186, locationName = 'Location' }) => {
    useEffect(() => {
        // Initialize the map
        const map = L.map('map').setView([latitude, longitude], 13);

        // Add OpenStreetMap tiles
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; OpenStreetMap contributors',
        }).addTo(map);

        // Add a marker
        L.marker([latitude, longitude])
            .addTo(map)
            .bindPopup(`<b>${locationName}</b>`)
            .openPopup();

        // Cleanup map on component unmount
        return () => {
            map.remove();
        };
    }, [latitude, longitude, locationName]);

    return <div id="map" style={{ height: '300px', width: '100%' }}></div>;
};

export default MapComponent;
