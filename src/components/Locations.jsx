import { motion } from "motion/react";
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Locations() {
  const navigate = useNavigate();
  const [locations, setLocations] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLocations = async () => {
      try {
        const response = await axios.get("/api/featuredlocations");
        setLocations(response.data.data || []);
      } catch (error) {
        console.error("Error fetching locations:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchLocations();
  }, []);

  const getSpanClass = (index) => {
    const spans = [
      "col-span-1 md:col-span-2",
      "col-span-1",
      "row-span-2 col-span-1",
      "col-span-1",
      "col-span-1",
      "col-span-1",
    ];
    return spans[index] || "col-span-1";
  };

  const handleLocationClick = (locationTitle, propertyCount) => {
    // Navigate to search page with location filter
    navigate('/search', { 
      state: { 
        searchFilters: {
          status: 'All',
          region: locationTitle,  // Set the clicked location
          type: 'Property Type',
          minPrice: '',
          maxPrice: '',
        }
      } 
    });
  };

  if (loading) {
    return (
      <section className="bg-white py-20">
        <div className="text-center">Loading locations...</div>
      </section>
    );
  }

  return (
    <section className="bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-4xl md:text-5xl font-bold text-slate-900 tracking-tight text-center mb-16">
          Featured Locations
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 h-auto md:h-[800px]">
          {locations.map((loc, idx) => (
            <motion.div
              key={loc.id}
              whileHover={{ scale: 0.98 }}
              onClick={() => handleLocationClick(loc.title, loc.property_count)}
              className={`relative overflow-hidden rounded-2xl group cursor-pointer ${getSpanClass(idx)}`}
            >
              <img
                src={`https://properties.omsoftsolution.net.in/public/${loc.image}`}
                alt={loc.title}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

              <div className="absolute bottom-8 left-8">
                <h3 className="text-2xl font-bold text-white mb-1">
                  {loc.title}
                </h3>

                <p className="text-gray-300 font-medium">
                  {loc.property_count || 0} Listings
                </p>
              </div>
              
              {/* Hover overlay effect */}
              <div className="absolute inset-0 bg-blue-600/0 group-hover:bg-blue-600/20 transition-all duration-300" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}