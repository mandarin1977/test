<template>
  <div class="w-full h-full flex flex-col">
    <section class="p-4 grid grid-cols-2 gap-4 text-center">
      <div class="bg-gray-900/50 p-3 rounded-lg">
        <p class="text-xs text-gray-400">{{ t('totalCoinBalance') }}</p>
        <p class="text-2xl font-bold text-sky-400">{{ score }}</p>
      </div>
      <div class="bg-gray-900/50 p-3 rounded-lg">
        <p class="text-sm text-gray-400">{{ t('premiumCurrency') }}</p>
        <p class="text-2xl font-bold text-amber-400">{{ premiumCurrency }}</p>
      </div>
    </section>
    
    <div class="w-full h-full flex items-center justify-center relative flex-grow">
      <!-- 중앙 메인 버튼 -->
      <button 
        @mousedown="$emit('update:isPressing', true)" 
        @mouseup="$emit('update:isPressing', false)" 
        @mouseleave="$emit('update:isPressing', false)" 
        @click="$emit('manual-click', $event)" 
        class="w-64 h-64 max-sm:w-48 max-sm:h-48 max-[330px]:w-40 max-[330px]:h-40 rounded-[4rem] flex items-center justify-center text-gray-800 font-bold text-4xl max-sm:text-3xl max-[330px]:text-2xl shadow-2xl click-button-animation z-10 relative overflow-hidden bg-white"
        :class="{ 'click-button-feedback': isPressing }"
        style="background-image: url('/src/assets/img/mainButton.png'); background-size: cover; background-position: center;"
      >
        <span 
          v-for="ripple in ripples" 
          :key="ripple.id" 
          class="ripple" 
          :style="{ top: ripple.top, left: ripple.left }"
        ></span>
      </button>

      <!-- 좌측 상단 버튼 -->
      <div class="absolute top-16 left-2 flex flex-col items-center">
        <button class="w-10 h-10 bg-gradient-to-br from-red-500 to-pink-600 rounded-2xl flex items-center justify-center shadow-lg hover:scale-105 transition-transform relative">
          <div class="text-lg">💰</div>
          <div class="absolute -top-1 -right-1 w-4 h-4 bg-orange-500 rounded-full flex items-center justify-center">
            <span class="text-xs font-bold text-white">1</span>
          </div>
        </button>
        <span class="text-xs font-bold text-white mt-2">TARIFFS</span>
      </div>

      <!-- 우측 상단 버튼 -->
      <div class="absolute top-16 right-2 flex flex-col items-center">
        <button class="w-10 h-10 bg-gradient-to-br from-blue-500 to-cyan-600 rounded-2xl flex items-center justify-center shadow-lg hover:scale-105 transition-transform relative">
          <div class="text-lg">🤝</div>
          <div class="absolute -top-1 -right-1 w-4 h-4 bg-orange-500 rounded-full flex items-center justify-center">
            <span class="text-xs font-bold text-white">1</span>
          </div>
        </button>
        <span class="text-xs font-bold text-white mt-2">ALLIANCE</span>
      </div>

      <!-- 좌측 하단 버튼 -->
      <div class="absolute bottom-16 left-2 flex flex-col items-center">
        <button @click="$emit('navigate', 'shop')" class="w-10 h-10 bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl flex items-center justify-center shadow-lg hover:scale-105 transition-transform relative">
          <div class="text-lg">🛒</div>
          <div class="absolute -top-1 -right-1 w-4 h-4 bg-orange-500 rounded-full flex items-center justify-center">
            <span class="text-xs font-bold text-white">9</span>
          </div>
        </button>
        <span class="text-xs font-bold text-white mt-2">SHOP</span>
      </div>

      <!-- 우측 하단 버튼 -->
      <div class="absolute bottom-16 right-2 flex flex-col items-center">
        <button class="w-10 h-10 bg-gradient-to-br from-yellow-500 to-orange-600 rounded-2xl flex items-center justify-center shadow-lg hover:scale-105 transition-transform">
          <div class="text-lg">🥚</div>
        </button>
        <span class="text-xs font-bold text-white mt-2">CAPYDROP</span>
      </div>
      
      <div 
        v-for="num in floatingNumbers" 
        :key="num.id" 
        class="floating-number" 
        :style="{ top: num.top, left: num.left }"
      >
        +{{ num.value }}
      </div>
      
      <div 
        v-for="bubble in speechBubbles" 
        :key="bubble.id" 
        class="speech-bubble" 
        :style="bubble.style"
      >
        {{ bubble.text }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'HomePage',
  props: {
    score: {
      type: String,
      required: true
    },
    premiumCurrency: {
      type: String,
      required: true
    },
    floatingNumbers: {
      type: Array,
      default: () => []
    },
    ripples: {
      type: Array,
      default: () => []
    },
    speechBubbles: {
      type: Array,
      default: () => []
    },
    isPressing: {
      type: Boolean,
      default: false
    },
    t: {
      type: Function,
      required: true
    }
  },
  emits: ['manual-click', 'update:isPressing', 'navigate']
}
</script>
