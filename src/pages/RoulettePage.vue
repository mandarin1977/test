<template>
  <div class="w-full h-full flex flex-col items-center justify-center space-y-6">
    <div class="roulette-container">
      <div class="roulette-pointer"></div>
      <div class="roulette-center"></div>
      <div class="roulette-wheel" :style="rouletteStyle">
        <div 
          v-for="(prize, index) in roulettePrizes" 
          :key="index" 
          class="roulette-label" 
          :style="{ transform: 'rotate(' + (index * (360 / roulettePrizes.length) + (360 / roulettePrizes.length / 2)) + 'deg) translate(90px)' }"
        >
          <span 
            :style="{ transform: 'rotate(-' + (index * (360 / roulettePrizes.length) + (360 / roulettePrizes.length / 2)) + 'deg)' }" 
            class="inline-block text-sm"
          >
            {{ prize.label }}
          </span>
        </div>
      </div>
    </div>
    
    <div class="text-center">
      <button 
        @click="$emit('spin-wheel')" 
        :disabled="isSpinning || spinTickets <= 0" 
        class="bg-amber-500 hover:bg-amber-600 disabled:bg-gray-500 disabled:cursor-not-allowed text-white font-bold py-3 px-8 rounded-full text-xl transition-all shadow-lg"
      >
        {{ t('spin') }}
      </button>
      <p class="mt-3 text-gray-300">{{ t('tickets') }}: {{ spinTickets }}</p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'RoulettePage',
  props: {
    roulettePrizes: {
      type: Array,
      required: true
    },
    rouletteStyle: {
      type: Object,
      required: true
    },
    isSpinning: {
      type: Boolean,
      default: false
    },
    spinTickets: {
      type: Number,
      default: 0
    },
    t: {
      type: Function,
      required: true
    }
  },
  emits: ['spin-wheel']
}
</script>
