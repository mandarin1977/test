<template>
  <div class="w-full h-full flex flex-col">
    <!-- 뒤로가기 버튼 -->
    <div class="flex items-center justify-start mb-4 px-4">
      <button 
        @click="$emit('navigate', 'home')"
        class="w-10 h-10 bg-gray-700 rounded-full flex items-center justify-center text-white hover:bg-gray-600 transition-colors"
      >
        <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
        </svg>
      </button>
    </div>

    <!-- 상단: 타입별 코인 선택 -->
    <div class="flex items-center justify-center mb-6 px-16">
      <button 
        @click="previousCoinType"
        class="w-10 h-10 bg-gray-700 rounded-full flex items-center justify-center text-white hover:bg-gray-600 transition-colors"
      >
        <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
        </svg>
      </button>
      
      <div class="flex flex-col items-center mx-8">
        <div 
          class="w-16 h-16 rounded-full flex items-center justify-center text-2xl mb-2"
          :style="{ backgroundColor: currentCoinType.color }"
        >
          {{ currentCoinType.icon }}
        </div>
        <h2 class="text-white font-semibold text-sm">{{ t(currentCoinType.titleKey) }}</h2>
      </div>
      
      <button 
        @click="nextCoinType"
        class="w-10 h-10 bg-gray-700 rounded-full flex items-center justify-center text-white hover:bg-gray-600 transition-colors"
      >
        <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
        </svg>
      </button>
    </div>

    <!-- 중간: 진행률 바 -->
    <div class="mb-6">
      <div class="bg-gray-700 rounded-lg p-4">
        <div class="flex justify-between items-center mb-2">
          <span class="text-white text-sm font-medium">{{ t('totalProgress') }}</span>
          <span class="text-yellow-400 text-sm font-bold">{{ progress }}%</span>
        </div>
        <div class="bg-gray-600 rounded-full h-3">
          <div 
            class="bg-gradient-to-r from-yellow-400 to-orange-500 h-3 rounded-full transition-all duration-500"
            :style="{ width: `${progress}%` }"
          ></div>
        </div>
        <div class="flex justify-between text-xs text-gray-400 mt-1">
          <span>{{ formatNumber(currentAmount) }}</span>
          <span>{{ formatNumber(targetAmount) }}</span>
        </div>
      </div>
    </div>

    <!-- 하단: 랭킹 리스트 -->
    <div class="flex-1 flex flex-col relative min-h-0">
      <h3 class="text-lg font-bold text-white mb-4">{{ t('ranking') }}</h3>
      
      <div class="flex-1 overflow-y-auto space-y-3 pb-20 min-h-0">
        <div 
          v-for="(player, index) in rankings" 
          :key="index"
          class="bg-gray-700 rounded-lg p-4 flex items-center justify-between"
          :class="{ 'ring-2 ring-blue-500': player.isMe }"
        >
          <div class="flex items-center space-x-4">
            <div 
              class="w-8 h-8 rounded-full flex items-center justify-center text-white font-bold text-sm"
              :class="getRankColor(index + 1)"
            >
              {{ index + 1 }}
            </div>
            <div class="flex items-center space-x-3">
              <div 
                class="w-10 h-10 rounded-full flex items-center justify-center text-lg"
                :style="{ backgroundColor: player.avatarColor }"
              >
                {{ player.avatar }}
              </div>
              <div>
                <h3 class="text-white font-semibold text-sm">{{ player.name }}</h3>
                <p class="text-gray-400 text-xs">{{ player.level }} Level</p>
              </div>
            </div>
          </div>
          <div class="text-right">
            <p class="text-yellow-400 font-bold text-sm">{{ formatNumber(player.score) }}</p>
            <p class="text-gray-400 text-xs">{{ t(currentCoinType.titleKey) }}</p>
          </div>
        </div>
      </div>
      
      <!-- 내 랭킹 -->
      <div class="absolute bottom-0 left-0 right-0 bg-blue-600/20 rounded-lg p-4 border border-blue-500/30 z-10">
        <div class="flex items-center justify-between">
          <div class="flex items-center space-x-4">
            <div class="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold text-sm">
              {{ myRank }}
            </div>
            <div class="flex items-center space-x-3">
              <div class="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center text-lg">
                👤
              </div>
              <div>
                <h3 class="text-white font-semibold text-sm">{{ t('myRanking') }}</h3>
                <p class="text-gray-400 text-xs">{{ myLevel }} Level</p>
              </div>
            </div>
          </div>
          <div class="text-right">
            <p class="text-yellow-400 font-bold text-sm">{{ formatNumber(myScore) }}</p>
            <p class="text-gray-400 text-xs">{{ t(currentCoinType.titleKey) }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'RankingPage',
  props: {
    rankings: {
      type: Array,
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
  data() {
    return {
      currentCoinIndex: 0,
      coinTypes: [
        { icon: '₿', titleKey: 'bitcoin', color: '#f7931a' },
        { icon: 'Ξ', titleKey: 'ethereum', color: '#627eea' },
        { icon: '💎', titleKey: 'diamond', color: '#b9f2ff' },
        { icon: '🏆', titleKey: 'trophy', color: '#ffd700' },
        { icon: '⭐', titleKey: 'star', color: '#ff6b6b' }
      ],
      progress: 75,
      currentAmount: 7500000,
      targetAmount: 10000000,
      myRank: 15,
      myLevel: 25,
      myScore: 5200000
    }
  },
  computed: {
    currentCoinType() {
      return this.coinTypes[this.currentCoinIndex]
    }
  },
  methods: {
    previousCoinType() {
      this.currentCoinIndex = this.currentCoinIndex > 0 
        ? this.currentCoinIndex - 1 
        : this.coinTypes.length - 1
    },
    nextCoinType() {
      this.currentCoinIndex = this.currentCoinIndex < this.coinTypes.length - 1 
        ? this.currentCoinIndex + 1 
        : 0
    },
    getRankColor(rank) {
      if (rank === 1) return 'bg-yellow-500'
      if (rank === 2) return 'bg-gray-400'
      if (rank === 3) return 'bg-orange-500'
      return 'bg-gray-600'
    }
  },
  emits: ['navigate']
}
</script>
