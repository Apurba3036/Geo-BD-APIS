import { motion } from 'framer-motion'
import { MapPin, Search, Navigation, Layers, Info, ChevronRight, Building, GraduationCap, Users, Code } from 'lucide-react'

const MapDocumentation = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-blue-50 border border-blue-200 rounded-xl p-6 mb-6"
    >
      <div className="flex items-center space-x-2 mb-4">
        <Info className="w-5 h-5 text-blue-600" />
        <h3 className="font-semibold text-blue-900">Who Can Use This API?</h3>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div className="space-y-3">
          <div className="flex items-start space-x-3">
            <Building className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
            <div>
              <h4 className="font-medium text-gray-900 mb-1">Government Services</h4>
              <p className="text-sm text-gray-600">Administrative data for e-governance and public services</p>
            </div>
          </div>
          
          <div className="flex items-start space-x-3">
            <GraduationCap className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
            <div>
              <h4 className="font-medium text-gray-900 mb-1">Education & Research</h4>
              <p className="text-sm text-gray-600">Academic studies and geographical research projects</p>
            </div>
          </div>
          
          <div className="flex items-start space-x-3">
            <Users className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
            <div>
              <h4 className="font-medium text-gray-900 mb-1">Business & Logistics</h4>
              <p className="text-sm text-gray-600">Location-based services and delivery optimization</p>
            </div>
          </div>
        </div>
        
        <div className="space-y-3">
          <div className="flex items-start space-x-3">
            <Code className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
            <div>
              <h4 className="font-medium text-gray-900 mb-1">Developers</h4>
              <p className="text-sm text-gray-600">Integrate geographical data into applications</p>
            </div>
          </div>
          
          <div className="flex items-start space-x-3">
            <MapPin className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
            <div>
              <h4 className="font-medium text-gray-900 mb-1">Mapping Services</h4>
              <p className="text-sm text-gray-600">GPS navigation and location-based apps</p>
            </div>
          </div>
          
          <div className="flex items-start space-x-3">
            <Navigation className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
            <div>
              <h4 className="font-medium text-gray-900 mb-1">Tourism & Travel</h4>
              <p className="text-sm text-gray-600">Travel planning and location discovery</p>
            </div>
          </div>
        </div>
      </div>

      <div className="border-t border-blue-200 pt-4 mb-4">
        <h4 className="font-medium text-gray-900 mb-3">API Features:</h4>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-sm">
          <div className="bg-white rounded-lg p-3 text-center">
            <div className="text-green-600 font-bold text-lg">8</div>
            <div className="text-gray-600">Divisions</div>
          </div>
          <div className="bg-white rounded-lg p-3 text-center">
            <div className="text-green-600 font-bold text-lg">64</div>
            <div className="text-gray-600">Districts</div>
          </div>
          <div className="bg-white rounded-lg p-3 text-center">
            <div className="text-green-600 font-bold text-lg">495+</div>
            <div className="text-gray-600">Upazilas</div>
          </div>
          <div className="bg-white rounded-lg p-3 text-center">
            <div className="text-green-600 font-bold text-lg">4.5K+</div>
            <div className="text-gray-600">Unions</div>
          </div>
        </div>
      </div>

      <div className="border-t border-blue-200 pt-4 mb-4">
        <h4 className="font-medium text-gray-900 mb-3">API Endpoints Examples:</h4>
        <div className="space-y-2 text-sm">
          <div className="bg-gray-50 p-2 rounded font-mono text-xs">
            <div className="text-blue-600">GET /api/divisions</div>
            <div className="text-gray-500">→ All 8 divisions</div>
          </div>
          <div className="bg-gray-50 p-2 rounded font-mono text-xs">
            <div className="text-blue-600">GET /api/districts?division_id=1</div>
            <div className="text-gray-500">→ Districts in Barishal</div>
          </div>
          <div className="bg-gray-50 p-2 rounded font-mono text-xs">
            <div className="text-blue-600">GET /api/upazilas?district_id=1</div>
            <div className="text-gray-500">→ Upazilas in Barguna</div>
          </div>
          <div className="bg-gray-50 p-2 rounded font-mono text-xs">
            <div className="text-blue-600">GET /api/unions?upazila_id=1</div>
            <div className="text-gray-500">→ Unions in Amtali</div>
          </div>
          <div className="bg-gray-50 p-2 rounded font-mono text-xs">
            <div className="text-blue-600">GET /api/unions/1</div>
            <div className="text-gray-500">→ Union details by ID</div>
          </div>
        </div>
      </div>
      
      <div className="mt-4 p-3 bg-green-50 border border-green-200 rounded-lg">
        <div className="flex items-center space-x-2 text-green-800">
          <ChevronRight className="w-4 h-4" />
          <span className="text-sm font-medium">
            <strong>Map View:</strong> Select Division → District to fly to specific locations across Bangladesh!
          </span>
        </div>
      </div>
      
      <div className="mt-3 p-3 bg-blue-50 border border-blue-200 rounded-lg">
        <div className="flex items-center space-x-2 text-blue-800">
          <ChevronRight className="w-4 h-4" />
          <span className="text-sm font-medium">
            <strong>Live Testing:</strong> Try the API Explorer below for real-time endpoint testing!
          </span>
        </div>
      </div>
    </motion.div>
  )
}

export default MapDocumentation
