<template>
  <nav class="py-1 px-2 bg-gray-900/50 z-10 overflow-x-auto overflow-y-hidden">
    <div class="flex space-x-2 min-w-max">
      <button 
        @click="$emit('navigate', 'ranking')" 
        class="flex flex-col items-center px-2 py-1 rounded-lg transition-all flex-shrink-0"
        :class="{'text-green-400 bg-gray-700': currentPage === 'ranking', 'text-gray-400 hover:bg-gray-800': currentPage !== 'ranking'}"
      >
        <div class="w-6 h-6 mb-1 flex items-center justify-center">
          <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
            <path d="M5 16L3 5l5.5 5L12 4l3.5 6L21 5l-2 11H5zm2.7-2h8.6l.9-5.4L12 8.5 6.8 8.6l.9 5.4z"/>
          </svg>
        </div>
        <span class="text-xs font-medium uppercase">{{ t('ranking') }}</span>
      </button>

      <button 
        @click="$emit('navigate', 'topCountries')" 
        class="flex flex-col items-center px-2 py-1 rounded-lg transition-all flex-shrink-0"
        :class="{'text-green-400 bg-gray-700': currentPage === 'topCountries', 'text-gray-400 hover:bg-gray-800': currentPage !== 'topCountries'}"
      >
        <div class="w-6 h-6 mb-1 flex items-center justify-center">
          <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.94-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/>
          </svg>
        </div>
        <span class="text-xs font-medium uppercase">{{ t('topCountries') }}</span>
      </button>

      <button 
        @click="$emit('navigate', 'cityBoost')" 
        class="flex flex-col items-center px-2 py-1 rounded-lg transition-all flex-shrink-0"
        :class="{'text-green-400 bg-gray-700': currentPage === 'cityBoost', 'text-gray-400 hover:bg-gray-800': currentPage !== 'cityBoost'}"
      >
        <div class="w-6 h-6 mb-1 flex items-center justify-center">
          <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
          </svg>
        </div>
        <span class="text-xs font-medium uppercase">{{ t('cityBoost') }}</span>
      </button>

      <button 
        @click="$emit('navigate', 'leagues')" 
        class="flex flex-col items-center px-2 py-1 rounded-lg transition-all flex-shrink-0"
        :class="{'text-green-400 bg-gray-700': currentPage === 'leagues', 'text-gray-400 hover:bg-gray-800': currentPage !== 'leagues'}"
      >
        <div class="w-6 h-6 mb-1 flex items-center justify-center">
          <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
            <path d="M7 4V2C7 1.45 7.45 1 8 1H16C16.55 1 17 1.45 17 2V4H20C20.55 4 21 4.45 21 5S20.55 6 20 6H19V19C19 20.1 18.1 21 17 21H7C5.9 21 5 20.1 5 19V6H4C3.45 6 3 5.55 3 5S3.45 4 4 4H7ZM9 3V4H15V3H9ZM7 6V19H17V6H7Z"/>
          </svg>
        </div>
        <span class="text-xs font-medium uppercase">{{ t('leagues') }}</span>
      </button>
      
      <button 
        @click="$emit('navigate', 'roulette')" 
        class="flex flex-col items-center px-2 py-1 rounded-lg transition-all flex-shrink-0"
        :class="{'text-green-400 bg-gray-700': currentPage === 'roulette', 'text-gray-400 hover:bg-gray-800': currentPage !== 'roulette'}"
      >
        <div class="w-6 h-6 mb-1 flex items-center justify-center">
          <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-13h2v6h-2zm0 8h2v2h-2z"/>
          </svg>
        </div>
        <span class="text-xs font-medium uppercase">{{ t('roulette') }}</span>
      </button>
      
      <button 
        @click="$emit('navigate', 'checkin')" 
        class="flex flex-col items-center px-2 py-1 rounded-lg transition-all flex-shrink-0"
        :class="{'text-green-400 bg-gray-700': currentPage === 'checkin', 'text-gray-400 hover:bg-gray-800': currentPage !== 'checkin'}"
      >
        <div class="w-6 h-6 mb-1 flex items-center justify-center">
          <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
            <path d="M19 3h-1V1h-2v2H8V1H6v2H5c-1.11 0-1.99.9-1.99 2L3 19c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V8h14v11zM7 10h5v5H7z"/>
          </svg>
        </div>
        <span class="text-xs font-medium uppercase">{{ t('checkin') }}</span>
      </button>
    </div>
  </nav>
</template>

<script>
export default {
  name: 'NavigationBar',
  props: {
    currentPage: {
      type: String,
      required: true
    },
    t: {
      type: Function,
      required: true
    }
  },
  emits: ['navigate']
}
</script>
