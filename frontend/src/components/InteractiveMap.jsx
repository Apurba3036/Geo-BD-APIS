import { useState, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { MapPin, ChevronDown, Loader } from 'lucide-react'
import { geoAPI } from '../services/api'
import toast from 'react-hot-toast'
import maplibregl from 'maplibre-gl'
import 'maplibre-gl/dist/maplibre-gl.css'
import MapDocumentation from './MapDocumentation'

const InteractiveMap = () => {
  const [divisions, setDivisions] = useState([])
  const [districts, setDistricts] = useState([])
  const [allDistricts, setAllDistricts] = useState([])
  const [selectedDivision, setSelectedDivision] = useState('')
  const [selectedDistrict, setSelectedDistrict] = useState('')
  const [loading, setLoading] = useState(false)
  const [mapInitialized, setMapInitialized] = useState(false)
  const mapContainer = useRef(null)
  const map = useRef(null)
  const popupRef = useRef(null)

  // Bangladesh boundary coordinates
  const bangladeshBounds = [
    [88.0, 20.5], // Southwest
    [92.5, 26.5]  // Northeast
  ]

  const getMapStyle = () => ({
    version: 8,
    sources: {
      'raster-tiles': {
        type: 'raster',
        tiles: [
          'https://a.basemaps.cartocdn.com/rastertiles/voyager_nolabels/{z}/{x}/{y}@2x.png'
        ],
        tileSize: 256,
        attribution: '&copy; OSM &copy; CARTO'
      }
    },
    layers: [{
      id: 'base-tiles',
      type: 'raster',
      source: 'raster-tiles'
    }]
  })

  const setupMapLayers = (m) => {
    // Add Bangladesh boundary
    if (!m.getSource('bangladesh')) {
      m.addSource('bangladesh', {
        type: 'geojson',
        data: {
          type: 'Feature',
          geometry: {
            type: 'Polygon',
            coordinates: [[
              [88.0, 26.5], // Northwest
              [92.5, 26.5], // Northeast
              [92.5, 21.0], // Southeast
              [88.0, 21.0], // Southwest
              [88.0, 26.5]  // Close polygon
            ]]
          }
        }
      })
    }

    if (!m.getLayer('bangladesh-fill')) {
      m.addLayer({
        id: 'bangladesh-fill',
        type: 'fill',
        source: 'bangladesh',
        paint: {
          'fill-color': '#006A4E',
          'fill-opacity': 0.1
        }
      })
    }

    if (!m.getLayer('bangladesh-outline')) {
      m.addLayer({
        id: 'bangladesh-outline',
        type: 'line',
        source: 'bangladesh',
        paint: {
          'line-color': '#006A4E',
          'line-width': 2,
          'line-opacity': 0.8
        }
      })
    }

    // Add district markers and labels if districts are loaded
    if (allDistricts.length > 0) {
      addDistrictMarkersAndLabels(m)
    }
  }

  const addDistrictMarkersAndLabels = (m) => {
    // Remove existing markers and labels
    if (m.getSource('district-markers')) {
      m.removeLayer('district-markers')
      m.removeSource('district-markers')
    }
    if (m.getSource('district-labels')) {
      m.removeLayer('district-labels')
      m.removeSource('district-labels')
    }

    // Create district markers
    const districtFeatures = allDistricts
      .filter(district => district.lat && district.lon)
      .map(district => ({
        type: 'Feature',
        geometry: {
          type: 'Point',
          coordinates: [parseFloat(district.lon), parseFloat(district.lat)]
        },
        properties: {
          name: district.name,
          bn_name: district.bn_name,
          id: district.id,
          url: district.url
        }
      }))

    // Add district markers source
    m.addSource('district-markers', {
      type: 'geojson',
      data: {
        type: 'FeatureCollection',
        features: districtFeatures
      }
    })

    // Add district markers layer
    m.addLayer({
      id: 'district-markers',
      type: 'circle',
      source: 'district-markers',
      paint: {
        'circle-radius': 4,
        'circle-color': '#006A4E',
        'circle-stroke-color': '#ffffff',
        'circle-stroke-width': 2,
        'circle-opacity': 0.8
      }
    })

    // Add district labels
    m.addSource('district-labels', {
      type: 'geojson',
      data: {
        type: 'FeatureCollection',
        features: districtFeatures
      }
    })

    m.addLayer({
      id: 'district-labels',
      type: 'symbol',
      source: 'district-labels',
      layout: {
        'text-field': ['get', 'name'],
        'text-font': ['Open Sans Bold', 'Arial Unicode MS Bold', 'sans-serif'],
        'text-size': 11,
        'text-anchor': 'top',
        'text-offset': [0, 1.5],
        'text-allow-overlap': false,
        'text-ignore-placement': false,
        'text-max-width': 10
      },
      paint: {
        'text-color': '#006A4E',
        'text-halo-color': '#ffffff',
        'text-halo-width': 2,
        'text-opacity': 1
      }
    })

    // Add click handlers for districts
    m.on('click', 'district-markers', (e) => {
      const props = e.features[0].properties
      showLocationPopup(
        e.lngLat,
        props.name,
        `${props.bn_name} • District${props.url ? `<br><a href="https://${props.url}" target="_blank" style="color: #006A4E">Visit Website →</a>` : ''}`
      )
    })

    // Change cursor on hover
    m.on('mouseenter', 'district-markers', () => {
      m.getCanvas().style.cursor = 'pointer'
    })
    m.on('mouseleave', 'district-markers', () => {
      m.getCanvas().style.cursor = ''
    })
  }

  useEffect(() => {
    loadDivisions()
    loadAllDistricts()
    return () => {
      if (map.current && map.current.remove) {
        map.current.remove()
      }
    }
  }, [])

  useEffect(() => {
    if (selectedDivision) {
      loadDistricts(selectedDivision)
    } else {
      setDistricts([])
      setSelectedDistrict('')
    }
  }, [selectedDivision])

  const loadDivisions = async () => {
    try {
      setLoading(true)
      const response = await geoAPI.getDivisions()
      setDivisions(response.data.data)
    } catch (error) {
      toast.error('Failed to load divisions')
    } finally {
      setLoading(false)
    }
  }

  const loadAllDistricts = async () => {
    try {
      const response = await geoAPI.getDistricts()
      setAllDistricts(response.data.data)
    } catch (error) {
      toast.error('Failed to load all districts')
    }
  }

  const loadDistricts = async (divisionId) => {
    try {
      setLoading(true)
      const response = await geoAPI.getDistricts(divisionId)
      setDistricts(response.data.data)
    } catch (error) {
      toast.error('Failed to load districts')
    } finally {
      setLoading(false)
    }
  }

  const initializeMap = () => {
    if (!mapContainer.current || map.current) return

    const m = new maplibregl.Map({
      container: mapContainer.current,
      style: getMapStyle(),
      center: [90.4125, 23.8103], // Bangladesh center
      zoom: 6.5,
      antialias: true
    })

    m.on('load', () => {
      map.current = m
      m.resize()
      
      // Add Bangladesh boundary first
      if (!m.getSource('bangladesh')) {
        m.addSource('bangladesh', {
          type: 'geojson',
          data: {
            type: 'Feature',
            geometry: {
              type: 'Polygon',
              coordinates: [[
                [88.0, 26.5], // Northwest
                [92.5, 26.5], // Northeast
                [92.5, 21.0], // Southeast
                [88.0, 21.0], // Southwest
                [88.0, 26.5]  // Close polygon
              ]]
            }
          }
        })
      }

      if (!m.getLayer('bangladesh-fill')) {
        m.addLayer({
          id: 'bangladesh-fill',
          type: 'fill',
          source: 'bangladesh',
          paint: {
            'fill-color': '#006A4E',
            'fill-opacity': 0.1
          }
        })
      }

      if (!m.getLayer('bangladesh-outline')) {
        m.addLayer({
          id: 'bangladesh-outline',
          type: 'line',
          source: 'bangladesh',
          paint: {
            'line-color': '#006A4E',
            'line-width': 2,
            'line-opacity': 0.8
          }
        })
      }
      
      // Add district markers and labels if districts are loaded
      if (allDistricts.length > 0) {
        addDistrictMarkersAndLabels(m)
      }
      
      // Fit to Bangladesh bounds
      m.fitBounds(bangladeshBounds, { padding: 50, duration: 1500 })
      
      setMapInitialized(true)
    })

    // Add navigation controls
    m.addControl(new maplibregl.NavigationControl(), 'top-right')
    m.addControl(new maplibregl.ScaleControl(), 'bottom-left')

    // Handle map interactions
    m.on('click', (e) => {
      const coords = e.lngLat
      showLocationPopup(coords, 'Bangladesh', 'Click on a location from the dropdown to see details')
    })
  }

  const showLocationPopup = (coords, name, description) => {
    if (popupRef.current) popupRef.current.remove()

    popupRef.current = new maplibregl.Popup({ 
      className: 'custom-popup', 
      closeButton: true,
      closeOnClick: true 
    })
      .setLngLat(coords)
      .setHTML(`
        <div class="px-4 py-3 bg-white rounded-xl shadow-lg">
          <h4 class="text-sm font-bold text-green-600 mb-1">${name}</h4>
          <p class="text-xs text-gray-600">${description}</p>
        </div>
      `)
      .addTo(map.current)
  }

  const updateMapWithLocation = async (type, id) => {
    if (!map.current) return

    try {
      let location = null
      
      if (type === 'district') {
        const response = await geoAPI.getDistrict(id)
        location = response.data.data
      }
      
      if (location && location.lat && location.lon) {
        const lng = parseFloat(location.lon)
        const lat = parseFloat(location.lat)
        
        console.log('Flying to location:', location.name, 'coords:', [lng, lat])
        
        // Fly to location
        map.current.flyTo({
          center: [lng, lat],
          zoom: 10,
          speed: 1.2,
          curve: 1.4,
          essential: true
        })

        // Add marker
        const marker = new maplibregl.Marker({
          color: '#006A4E',
          scale: 1.2
        })
          .setLngLat([lng, lat])
          .addTo(map.current)

        // Show popup
        showLocationPopup(
          [lng, lat], 
          location.name, 
          `${location.bn_name || ''} • District${location.url ? `<br><a href="https://${location.url}" target="_blank" style="color: #006A4E">Visit Website →</a>` : ''}`
        )

        toast.success(`Showing ${location.name}`)
      } else {
        console.log('Location data missing:', location)
        toast.error('Location coordinates not found')
      }
    } catch (error) {
      console.error('Error updating map:', error)
      toast.error('Failed to update map')
    }
  }

  useEffect(() => {
    if (mapContainer.current && !map.current) {
      initializeMap()
    }
  }, [mapContainer.current])

  useEffect(() => {
    if (map.current && mapInitialized && allDistricts.length > 0) {
      // Wait a bit for the map to be fully ready
      setTimeout(() => {
        addDistrictMarkersAndLabels(map.current)
      }, 100)
    }
  }, [allDistricts, mapInitialized])

  useEffect(() => {
    if (selectedDistrict && mapInitialized) {
      updateMapWithLocation('district', selectedDistrict)
    }
  }, [selectedDistrict, mapInitialized])

  return (
    <section id="map" className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Bangladesh Map
          </h2>
          <div className="w-16 h-1 bd-green-bg mx-auto rounded mb-4"></div>
        </motion.div>

        <MapDocumentation />

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Controls */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="space-y-4"
          >
            {/* Division Dropdown */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Division
              </label>
              <div className="relative">
                <select
                  value={selectedDivision}
                  onChange={(e) => setSelectedDivision(e.target.value)}
                  className="input-field appearance-none pr-10"
                  disabled={loading}
                >
                  <option value="">Select Division</option>
                  {divisions.map((division) => (
                    <option key={division.id} value={division.id}>
                      {division.name}
                    </option>
                  ))}
                </select>
                <ChevronDown className="absolute right-3 top-3 w-4 h-4 text-gray-500 pointer-events-none" />
              </div>
            </div>

            {/* District Dropdown */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                District
              </label>
              <div className="relative">
                <select
                  value={selectedDistrict}
                  onChange={(e) => setSelectedDistrict(e.target.value)}
                  className="input-field appearance-none pr-10"
                  disabled={!selectedDivision || loading}
                >
                  <option value="">Select District</option>
                  {districts.map((district) => (
                    <option key={district.id} value={district.id}>
                      {district.name}
                    </option>
                  ))}
                </select>
                <ChevronDown className="absolute right-3 top-3 w-4 h-4 text-gray-500 pointer-events-none" />
              </div>
            </div>

            {/* Selection Info */}
            {(selectedDivision || selectedDistrict) && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="card p-4"
              >
                <h3 className="font-semibold text-gray-900 mb-2">Selected Location</h3>
                <div className="space-y-1 text-sm text-gray-600">
                  {selectedDivision && (
                    <div>Division: {divisions.find(d => d.id === selectedDivision)?.name}</div>
                  )}
                  {selectedDistrict && (
                    <div>District: {districts.find(d => d.id === selectedDistrict)?.name}</div>
                  )}
                </div>
              </motion.div>
            )}

            {/* Map Status */}
            <div className="bg-green-50 border border-green-200 rounded-lg p-3">
              <div className="flex items-center space-x-2">
                <div className={`w-2 h-2 rounded-full ${mapInitialized ? 'bg-green-500' : 'bg-yellow-500 animate-pulse'}`}></div>
                <span className="text-sm text-green-700">
                  {mapInitialized ? 'Map Active' : 'Loading Map...'}
                </span>
              </div>
            </div>
          </motion.div>

          {/* Map */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="lg:col-span-3"
          >
            <div className="card p-0 overflow-hidden relative">
              <div 
                ref={mapContainer} 
                className="w-full h-96 lg:h-full min-h-96"
                style={{ minHeight: '500px' }}
              />
              {!mapInitialized && (
                <div className="absolute inset-0 flex items-center justify-center bg-gray-100 z-10">
                  <div className="text-center">
                    <Loader className="w-8 h-8 bd-green mx-auto mb-4 animate-spin" />
                    <p className="text-gray-600">Loading interactive map...</p>
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default InteractiveMap
