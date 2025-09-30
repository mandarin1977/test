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

    <!-- 상단: 탭메뉴 -->
    <div class="px-4 mb-6">
      <div class="relative">
        <div class="flex justify-center space-x-2">
          <button 
            v-for="(tab, index) in tabs" 
            :key="index"
            @click="currentTabIndex = index"
            class="flex-1 px-3 py-2 rounded-lg text-xs font-medium transition-colors"
            :class="currentTabIndex === index 
              ? 'bg-purple-800 text-white' 
              : 'bg-gray-800 text-gray-300 hover:bg-gray-700'"
          >
            {{ t(tab.titleKey) }}
          </button>
        </div>
        <!-- 활성 탭 표시기 -->
        <div class="absolute bottom-0 left-0 h-1 bg-yellow-400 rounded-full transition-all duration-300"
             :style="{ 
               width: `${100 / tabs.length}%`, 
               transform: `translateX(${currentTabIndex * 100}%)` 
             }">
        </div>
      </div>
    </div>

    <!-- BOOSTERS 바 -->
    <div class="w-screen -mx-4 mb-6">
      <div class="bg-gradient-to-r from-orange-400 to-orange-600 px-4 py-3">
        <span class="text-white font-bold text-sm">BOOSTERS</span>
      </div>
    </div>

    <!-- 컨텐츠 -->
    <div class="px-4 mb-6">
      <!-- 중앙 지구본 -->
      <div class="relative flex justify-center mb-6">
        <div class="relative">
          <!-- 지구본 -->
          <div class="w-20 h-20 bg-gradient-to-br from-blue-400 to-green-400 rounded-full flex items-center justify-center relative overflow-hidden">
            <!-- 대륙 효과 -->
            <div class="absolute inset-2 bg-green-500 rounded-full opacity-80"></div>
            <div class="absolute top-1 left-1 w-2 h-2 bg-red-500 rounded-full"></div>
            <div class="absolute top-3 right-2 w-1.5 h-1.5 bg-red-500 rounded-full"></div>
            <div class="absolute bottom-2 left-3 w-1 h-1 bg-red-500 rounded-full"></div>
            <div class="absolute bottom-1 right-1 w-1.5 h-1.5 bg-red-500 rounded-full"></div>
          </div>
          <!-- 글로우 효과 -->
          <div class="absolute inset-0 w-20 h-20 bg-yellow-400/30 rounded-full blur-md"></div>
        </div>
      </div>
      
      <!-- 하단 텍스트 -->
      <div class="text-center">
        <h2 class="text-white text-xl font-bold mb-2">{{ t(tabs[currentTabIndex].titleKey) }}</h2>
        <p class="text-gray-300 text-sm">City boost rankings and player stats</p>
      </div>
    </div>

    <!-- 하단: 랭킹 리스트 -->
    <div class="flex-1 flex flex-col relative min-h-0">
      
      <div class="flex-1 overflow-y-auto space-y-3 pb-20 min-h-0 px-4">
        <div 
          v-for="(item, index) in currentRankings" 
          :key="index"
          class="bg-gray-700 rounded-lg p-4 flex items-center justify-between"
          :class="{ 'ring-2 ring-blue-500': item.isMe }"
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
                :style="{ backgroundColor: item.flagColor }"
              >
                {{ item.flag }}
              </div>
              <div>
                <h3 class="text-white font-semibold text-sm">{{ t(item.nameKey) }}</h3>
                <p class="text-gray-400 text-xs">
                  <span v-if="currentTabIndex === 0">{{ t(item.regionKey) }}</span>
                  <span v-if="currentTabIndex === 1">{{ t(item.countryKey) }}</span>
                </p>
              </div>
            </div>
          </div>
          <div class="text-right">
            <p class="text-yellow-400 font-bold text-sm">{{ formatNumber(item.score) }}</p>
            <p class="text-gray-400 text-xs">{{ t(currentCoinType.titleKey) }}</p>
          </div>
        </div>
      </div>
      
      <!-- 내 랭킹 -->
      <div v-if="currentMyRanking" class="absolute bottom-0 left-0 right-0 bg-blue-600/20 rounded-lg p-4 border border-blue-500/30 z-10">
        <div class="flex items-center justify-between">
          <div class="flex items-center space-x-4">
            <div class="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold text-sm">
              {{ currentRankings.findIndex(item => item.isMe) + 1 }}
            </div>
            <div class="flex items-center space-x-3">
              <div 
                class="w-10 h-10 rounded-full flex items-center justify-center text-lg"
                :style="{ backgroundColor: currentMyRanking.flagColor }"
              >
                {{ currentMyRanking.flag }}
              </div>
              <div>
                <h3 class="text-white font-semibold text-sm">{{ t(currentMyRanking.nameKey) }}</h3>
                <p class="text-gray-400 text-xs">
                  <span v-if="currentTabIndex === 0">{{ t(currentMyRanking.regionKey) }}</span>
                  <span v-if="currentTabIndex === 1">{{ t(currentMyRanking.countryKey) }}</span>
                </p>
              </div>
            </div>
          </div>
          <div class="text-right">
            <p class="text-yellow-400 font-bold text-sm">{{ formatNumber(currentMyRanking.score) }}</p>
            <p class="text-gray-400 text-xs">{{ t(currentCoinType.titleKey) }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CityBoostPage',
  props: {
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
      currentTabIndex: 0,
      tabs: [
        { titleKey: 'topBoostingPlayers' },
        { titleKey: 'topBoostedCities' }
      ],
      currentCoinIndex: 0,
      coinTypes: [
        { icon: '₿', titleKey: 'bitcoin', color: '#f7931a' },
        { icon: 'Ξ', titleKey: 'ethereum', color: '#627eea' },
        { icon: '💎', titleKey: 'diamond', color: '#b9f2ff' },
        { icon: '🏆', titleKey: 'trophy', color: '#ffd700' },
        { icon: '⭐', titleKey: 'star', color: '#ff6b6b' }
      ],
      boostingPlayers: [
        { nameKey: 'player1', regionKey: 'asia', flag: '👤', flagColor: '#3b82f6', score: 18500000, isMe: false },
        { nameKey: 'player2', regionKey: 'northAmerica', flag: '👤', flagColor: '#10b981', score: 16200000, isMe: false },
        { nameKey: 'player3', regionKey: 'europe', flag: '👤', flagColor: '#ef4444', score: 14800000, isMe: false },
        { nameKey: 'player4', regionKey: 'asia', flag: '👤', flagColor: '#eab308', score: 13500000, isMe: false },
        { nameKey: 'player5', regionKey: 'northAmerica', flag: '👤', flagColor: '#f97316', score: 12200000, isMe: false },
        { nameKey: 'player6', regionKey: 'europe', flag: '👤', flagColor: '#ec4899', score: 10800000, isMe: false },
        { nameKey: 'player7', regionKey: 'asia', flag: '👤', flagColor: '#06b6d4', score: 9500000, isMe: false },
        { nameKey: 'player8', regionKey: 'asia', flag: '👤', flagColor: '#6366f1', score: 8700000, isMe: false },
        { nameKey: 'player9', regionKey: 'asia', flag: '👤', flagColor: '#14b8a6', score: 7800000, isMe: false },
        { nameKey: 'player10', regionKey: 'oceania', flag: '👤', flagColor: '#8b5cf6', score: 6800000, isMe: true }
      ],
      boostedCities: [
        { nameKey: 'newYork', countryKey: 'unitedStates', flag: '🏙️', flagColor: '#1e40af', score: 18500000, isMe: false },
        { nameKey: 'tokyo', countryKey: 'japan', flag: '🏯', flagColor: '#dc2626', score: 16200000, isMe: false },
        { nameKey: 'london', countryKey: 'unitedKingdom', flag: '🏰', flagColor: '#1e40af', score: 14800000, isMe: false },
        { nameKey: 'shanghai', countryKey: 'china', flag: '🌆', flagColor: '#dc2626', score: 13500000, isMe: false },
        { nameKey: 'losAngeles', countryKey: 'unitedStates', flag: '🌴', flagColor: '#059669', score: 12200000, isMe: false },
        { nameKey: 'paris', countryKey: 'france', flag: '🗼', flagColor: '#1e40af', score: 10800000, isMe: false },
        { nameKey: 'seoul', countryKey: 'southKorea', flag: '🏢', flagColor: '#1e40af', score: 9500000, isMe: false },
        { nameKey: 'singapore', countryKey: 'singapore', flag: '🌃', flagColor: '#dc2626', score: 8700000, isMe: false },
        { nameKey: 'hongKong', countryKey: 'hongKong', flag: '🏬', flagColor: '#dc2626', score: 7800000, isMe: false },
        { nameKey: 'sydney', countryKey: 'australia', flag: '🏛️', flagColor: '#1e40af', score: 6800000, isMe: false },
        { nameKey: 'dubai', countryKey: 'uae', flag: '🏗️', flagColor: '#059669', score: 5800000, isMe: false },
        { nameKey: 'busan', countryKey: 'southKorea', flag: '🏙️', flagColor: '#1e40af', score: 2800000, isMe: true }
      ]
    }
  },
  computed: {
    currentCoinType() {
      return this.coinTypes[this.currentCoinIndex]
    },
    currentRankings() {
      if (this.currentTabIndex === 0) return this.boostingPlayers
      return this.boostedCities
    },
    currentMyRanking() {
      if (this.currentTabIndex === 0) return this.boostingPlayers.find(item => item.isMe)
      return this.boostedCities.find(item => item.isMe)
    }
  },
  methods: {
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
