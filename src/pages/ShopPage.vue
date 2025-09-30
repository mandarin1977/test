<template>
  <div class="w-full h-full flex flex-col">
    <h2 class="text-2xl font-bold text-center mb-4">{{ t('store') }}</h2>
    <div class="space-y-3 overflow-y-auto p-1">
      <div 
        v-for="item in shopItems" 
        :key="item.id" 
        class="bg-gray-700 p-3 rounded-lg flex items-center justify-between"
      >
        <div class="flex items-center space-x-4">
          <div class="w-12 h-12 bg-gray-600 rounded-lg flex items-center justify-center text-2xl">
            {{ item.icon }}
          </div>
          <div>
            <p class="font-semibold">{{ t(item.nameKey) }}</p>
            <p class="text-xs text-gray-400">{{ t(item.descriptionKey) }}</p>
          </div>
        </div>
        <div class="text-right">
          <p class="font-bold text-amber-400">{{ formatNumber(item.cost) }}</p>
          <button 
            @click="$emit('buy-item', item)" 
            :disabled="score < item.cost" 
            class="mt-1 px-3 py-1 bg-green-500 text-white text-sm rounded-md disabled:bg-gray-500 disabled:cursor-not-allowed hover:bg-green-600 transition-colors"
          >
            {{ t('buy') }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ShopPage',
  props: {
    shopItems: {
      type: Array,
      required: true
    },
    score: {
      type: Number,
      required: true
    },
    formatNumber: {
      type: Function,
      required: true
    },
    t: {
      type: Function,
      required: true
    }
  },
  emits: ['buy-item']
}
</script>
