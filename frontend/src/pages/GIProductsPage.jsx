import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MapPin, Search, AlertCircle, ShoppingBag, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

const GiProductsPage = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  // Categories derived from data later or hardcoded based on known values
  const categories = ['All', 'Textile', 'Fruit', 'Rice', 'Handicraft', 'Sweet', 'Dairy', 'Shrimp', 'Fish', 'Confectionery', 'Livestock', 'Perfume'];

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        // Using Render API exclusively
        const baseUrl = import.meta.env.VITE_API_URL || 'https://geo-bd-apis.onrender.com/api';
        const res = await fetch(`${baseUrl}/giproducts`);
        if (!res.ok) {
          throw new Error(`Failed to load GI Products (Status: ${res.status}).`);
        }
        const data = await res.json();
        setProducts(data.data || []);
      } catch (err) {
        console.error(err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const filteredProducts = products.filter(p => {
    const matchesSearch = p.gi_product_name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          p.origin.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || p.category.toLowerCase() === selectedCategory.toLowerCase();
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-[var(--bg)] pt-20">
      
      {/* Header Section */}
      <div className="bg-[var(--bg-secondary)] border-b border-[var(--border)] overflow-hidden relative">
        <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-accent/5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />
        
        <div className="max-w-7xl mx-auto container-padding py-12 relative z-10">
          <Link to="/" className="inline-flex items-center gap-2 text-[var(--text-muted)] hover:text-primary transition-colors mb-6">
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </Link>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-[var(--bg)] border border-[var(--border)] rounded-full mb-4 shadow-sm">
              <ShoppingBag className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium">Complete Catalog</span>
            </div>
            <h1 className="text-3xl md:text-5xl font-bold mb-4 text-[var(--text)]">Geographical Indications (GI)</h1>
            <p className="text-[var(--text-secondary)] max-w-2xl text-lg">
              Explore the entire collection of unique and culturally significant GI products of Bangladesh. 
              Currently showcasing {loading ? '...' : products.length} registered products.
            </p>
          </motion.div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto container-padding py-12">

        {/* Search & Filters */}
        <div className="flex flex-col md:flex-row gap-4 mb-12 items-center justify-between bg-[var(--bg)] p-4 rounded-2xl border border-[var(--border)] shadow-sm">
          <div className="relative w-full md:w-96">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--text-muted)] w-5 h-5" />
            <input 
              type="text" 
              placeholder="Search by name or origin..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-[var(--bg-secondary)] border border-[var(--border)] rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all text-[var(--text)]"
            />
          </div>
          <div className="flex gap-2 overflow-x-auto w-full md:w-auto pb-2 md:pb-0 hide-scrollbar">
            {categories.slice(0, 5).map(cat => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-6 py-2.5 rounded-xl whitespace-nowrap text-sm font-medium transition-all ${
                  selectedCategory === cat 
                    ? 'bg-primary text-white shadow-md' 
                    : 'bg-[var(--bg-secondary)] text-[var(--text-secondary)] hover:bg-[var(--hover)]'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Content */}
        {loading ? (
          <div className="flex justify-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
          </div>
        ) : error ? (
          <div className="col-span-full">
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }}
              className="card p-8 text-center border-red-500/20 bg-red-500/5 max-w-2xl mx-auto"
            >
              <AlertCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2 text-red-600 dark:text-red-400">Oops, couldn't load data</h3>
              <p className="text-[var(--text-secondary)] mb-4">{error}</p>
              <p className="text-sm font-semibold p-3 bg-red-100 dark:bg-red-900/30 rounded-lg inline-block">
                Please make sure the Render backend is live!
              </p>
            </motion.div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <AnimatePresence mode="popLayout">
              {filteredProducts.map((product, idx) => (
                <motion.div
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.3, delay: idx * 0.05 }}
                  key={product.application_no || product.sl_no}
                  className="card group hover:border-primary/50 transition-colors p-6 flex flex-col h-full bg-[var(--bg)] shadow-sm hover:shadow-xl"
                >
                  <div className="flex justify-between items-start mb-4">
                    <span className="text-xs font-bold text-primary bg-primary/10 py-1 px-3 rounded-full">
                      {product.category}
                    </span>
                    <span className="text-xs text-[var(--text-muted)] font-mono">
                      #{product.application_no}
                    </span>
                  </div>
                  
                  <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors">
                    {product.gi_product_name}
                  </h3>
                  
                  <div className="flex items-center gap-2 mb-4 text-sm text-[var(--text-secondary)]">
                    <MapPin className="w-4 h-4 text-accent" />
                    <span>{product.origin}</span>
                  </div>
                  
                  <p className="text-sm text-[var(--text-secondary)] leading-relaxed mt-auto border-t border-[var(--border)] pt-4">
                    {product.short_description}
                  </p>
                </motion.div>
              ))}
            </AnimatePresence>
            
            {filteredProducts.length === 0 && (
              <motion.div 
                initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                className="col-span-full text-center py-12"
              >
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-[var(--bg)] border border-[var(--border)] mb-4">
                  <Search className="w-6 h-6 text-[var(--text-muted)]" />
                </div>
                <h3 className="text-lg font-medium text-[var(--text)]">No GI products found</h3>
                <p className="text-[var(--text-muted)]">Try adjusting your search or category filter</p>
              </motion.div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default GiProductsPage;
