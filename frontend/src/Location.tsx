import { useEffect } from 'react';
import { MapPin, Phone, Mail } from 'lucide-react';
import L from 'leaflet';
import Navigation from './components/user/Navigation';

export default function Location() {
  useEffect(() => {
    // Load Leaflet script
    const script = document.createElement('script');
    script.src = "https://unpkg.com/leaflet@1.9.4/dist/leaflet.js";
    script.integrity = "sha256-20nQCchB9co0qIjJZRGuk2/Z9VM+kNiyxNV1lvTlZBo=";
    script.crossOrigin = "";
    script.async = true;

    script.onload = () => {
      // Initialize map
      const map = L.map('map').setView([44.0165, 21.0059], 7); // Serbia coordinates

      L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '© OpenStreetMap'
      }).addTo(map);

      // Add marker for Belgrade
      L.marker([44.7866, 20.4489]).addTo(map)
        .bindPopup('Belgrade, Serbia')
        .openPopup();
    };

    document.body.appendChild(script);

    // Cleanup
    return () => {
      if (document.body.contains(script)) {
        document.body.removeChild(script);
      }
    };
  }, []);

  const locationInfo = [
    {
      icon: <MapPin className="w-6 h-6 text-indigo-400" />,
      title: "Address",
      content: "Belgrade, Serbia"
    },
    {
      icon: <Phone className="w-6 h-6 text-indigo-400" />,
      title: "Phone",
      content: "+381 61 234-1748",
      link: "tel:+381612341748"
    },
    {
      icon: <Mail className="w-6 h-6 text-indigo-400" />,
      title: "Email",
      content: "dusanmilekic0511@gmail.com",
      link: "mailto:dusanmilekic0511@gmail.com"
    }
  ];

  return (
    <>
      {/* Leaflet CSS */}

      <link
        rel="stylesheet"
        href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css"
        integrity="sha256-p4NxAoJBhIIN+hmNHrzRCf9tD/miZyoHS5obTRR9BMY="
        crossOrigin=""
      />
      <Navigation/>
      <div className="min-h-screen bg-neutral-900">
        {/* Hero Section */}
        <section className="relative bg-neutral-800 py-24">
          <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/10 to-transparent"></div>
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
              Our Location
            </h1>
            <p className="text-xl text-neutral-400 max-w-3xl mx-auto">
              Find us in the heart of Serbia. We're here to serve you with excellence.
            </p>
          </div>
        </section>

        {/* Location Info Cards */}
        <section className="py-16 bg-neutral-900">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
              {locationInfo.map((info, index) => (
                <div
                  key={index}
                  className="bg-neutral-800 p-8 rounded-xl border border-neutral-700 hover:border-indigo-500 transition-all duration-300 text-center group"
                >
                  <div className="flex justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                    {info.icon}
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-3">
                    {info.title}
                  </h3>
                  {info.link ? (
                    <a
                      href={info.link}
                      className="text-neutral-400 hover:text-indigo-400 transition-colors duration-300 break-all"
                    >
                      {info.content}
                    </a>
                  ) : (
                    <p className="text-neutral-400">{info.content}</p>
                  )}
                </div>
              ))}
            </div>

            {/* Map Section */}
            <div className="bg-neutral-800 rounded-xl border border-neutral-700 p-6">
              <h2 className="text-3xl font-bold text-white mb-6 text-center">
                Find Us on the Map
              </h2>
              <div className="bg-neutral-900 rounded-lg h-[500px] overflow-hidden">
                <div id="map" className="w-full h-full"></div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-neutral-800">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl font-bold text-white mb-4">
              Ready to Visit Us?
            </h2>
            <p className="text-neutral-400 text-lg mb-8">
              Get in touch to schedule a visit or ask any questions
            </p>
            <a
              href="/contact"
              className="inline-block bg-indigo-600 text-white px-10 py-4 rounded-lg font-semibold text-lg hover:bg-indigo-700 transition-colors duration-300 shadow-lg shadow-indigo-500/20"
            >
              Contact Us
            </a>
          </div>
        </section>
      </div>
    </>
  );
}