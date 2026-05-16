import { motion } from 'motion/react';

const locations = [
  { name: 'Manhattan', count: 25, image: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&q=80&w=1000', span: 'col-span-1 md:col-span-2' },
  { name: 'Staten Island', count: 23, image: 'https://images.unsplash.com/photo-1543716091-a840c05249ec?auto=format&fit=crop&q=80&w=1000', span: 'col-span-1' },
  { name: 'Long Island', count: 25, image: 'https://images.unsplash.com/photo-1518391846015-55a9cc003b25?auto=format&fit=crop&q=80&w=1000', span: 'row-span-2 col-span-1 md:col-span-1' },
  { name: 'Bronx', count: 24, image: 'https://images.unsplash.com/photo-1567496898669-ee935f5f647a?auto=format&fit=crop&q=80&w=1000', span: 'col-span-1' },
  { name: 'Queens', count: 27, image: 'https://images.unsplash.com/photo-1543716091-a840c05249ec?auto=format&fit=crop&q=80&w=1000', span: 'col-span-1' },
  { name: 'Brooklyn', count: 23, image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&q=80&w=1000', span: 'col-span-1' },
];

export default function Locations() {
  return (
    <section className=" bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-4xl md:text-5xl font-bold text-slate-900 tracking-tight text-center mb-16">Featured Locations</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 h-[400px] md:h-[800px]">
          {locations.map((loc, idx) => (
            <motion.div
              key={loc.name}
              whileHover={{ scale: 0.98 }}
              className={`relative overflow-hidden rounded-2xl group cursor-pointer ${loc.span}`}
            >
              <img src={loc.image} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
              <div className="absolute bottom-8 left-8">
                <h3 className="text-2xl font-bold text-white mb-1">{loc.name}</h3>
                <p className="text-gray-300 font-medium">{loc.count} Listings</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
