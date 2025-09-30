<template>
  <footer class="py-1 px-2 grid grid-cols-6 gap-1 bg-gray-900/50 z-10">
    <button 
      @click="$emit('navigate', 'home')" 
      class="flex flex-col items-center px-1 py-1 rounded-lg"
      :class="{'text-sky-400': currentPage === 'home', 'text-gray-400': currentPage !== 'home'}"
    >
      <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
        <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
      </svg>
      <span class="text-xs mt-0.5">{{ t('home') }}</span>
    </button>
    
    <button 
      @click="$emit('navigate', 'shop')" 
      class="flex flex-col items-center px-1 py-1 rounded-lg"
      :class="{'text-sky-400': currentPage === 'shop', 'text-gray-400': currentPage !== 'shop'}"
    >
      <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
        <path d="M3 1a1 1 0 000 2h1.22l.305 1.222a.997.997 0 00.01.042l1.358 5.43-.893.892C3.74 11.846 4.632 14 6.414 14H15a1 1 0 000-2H6.414l1-1H14a1 1 0 00.894-.553l3-6A1 1 0 0017 3H6.28l-.31-1.243A1 1 0 005 1H3zM16 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM6.5 18a1.5 1.5 0 100-3 1.5 1.5 0 000 3z" />
      </svg>
      <span class="text-xs mt-0.5">{{ t('shop') }}</span>
    </button>
    
    <button 
      @click="$emit('navigate', 'quest')" 
      class="flex flex-col items-center px-1 py-1 rounded-lg"
      :class="{'text-sky-400': currentPage === 'quest', 'text-gray-400': currentPage !== 'quest'}"
    >
      <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
        <path fill-rule="evenodd" d="M5 5a3 3 0 015.255-2.193c.306.419.643.812.99 1.182A3.001 3.001 0 0115 5v5.5a2.5 2.5 0 01-5 0V5a3 3 0 01-5 0zm0 2.5a.5.5 0 011 0V10a1.5 1.5 0 003 0V5a2 2 0 10-4 0v2.5z" clip-rule="evenodd" />
        <path d="M4.182 12.318a4 4 0 015.636 0l1.414 1.414a1 1 0 01-1.414 1.414L8.4 13.732a2 2 0 00-2.828 0L4.182 15.15a1 1 0 01-1.414-1.414l1.414-1.414z" />
      </svg>
      <span class="text-xs mt-0.5">{{ t('quest') }}</span>
    </button>
    
    <button 
      @click="$emit('navigate', 'invest')" 
      class="flex flex-col items-center px-1 py-1 rounded-lg relative"
      :class="{'text-sky-400': currentPage === 'invest', 'text-gray-400': currentPage !== 'invest'}"
    >
      <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
        <path d="M4 4a2 2 0 00-2 2v1h16V6a2 2 0 00-2-2H4zM18 9H2v5a2 2 0 002 2h12a2 2 0 002-2V9zM4 13a1 1 0 011-1h1a1 1 0 110 2H5a1 1 0 01-1-1zm5-1a1 1 0 100 2h1a1 1 0 100-2H9z" />
      </svg>
      <span class="text-xs mt-0.5">{{ t('invest') }}</span>
    </button>
    
    <button 
      @click="$emit('navigate', 'task')" 
      class="flex flex-col items-center px-1 py-1 rounded-lg relative"
      :class="{'text-sky-400 bg-purple-600/20': currentPage === 'task', 'text-gray-400': currentPage !== 'task'}"
    >
      <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
        <path fill-rule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clip-rule="evenodd" />
      </svg>
      <span class="text-xs mt-0.5">{{ t('task') }}</span>
      <span class="absolute -top-1 -right-1 w-4 h-4 bg-orange-500 rounded text-xs flex items-center justify-center text-white font-bold">9+</span>
    </button>
    
    <button 
      @click="$emit('navigate', 'invite')" 
      class="flex flex-col items-center px-1 py-1 rounded-lg"
      :class="{'text-sky-400': currentPage === 'invite', 'text-gray-400': currentPage !== 'invite'}"
    >
      <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
        <path d="M8 9a3 3 0 100-6 3 3 0 000 6zM8 11a6 6 0 016 6H2a6 6 0 016-6zM16 11a1 1 0 10-2 0v1h-1a1 1 0 100 2h1v1a1 1 0 102 0v-1h1a1 1 0 100-2h-1v-1z" />
      </svg>
      <span class="text-xs mt-0.5">{{ t('invite') }}</span>
    </button>
  </footer>
</template>

<script>
export default {
  name: 'FooterNavigation',
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
