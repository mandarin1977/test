<template>
  <div class="w-full h-full flex flex-col overflow-y-auto">
    <!-- 상단 돈 표시 -->
    <div class="text-center mb-6">
      <div class="flex items-center justify-center space-x-2 mb-2">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 text-yellow-400" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
        </svg>
        <span class="text-3xl font-bold text-white">{{ formatNumber(currentMoney) }}</span>
      </div>
    </div>

    <!-- 데일리 콤보 UI 박스 -->
    <div class="bg-gray-700 rounded-lg p-4 mb-4">
      <div class="flex items-center justify-between mb-3">
        <div class="flex items-center space-x-2">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <span class="text-white font-medium">{{ t('dailyCombo') }}</span>
        </div>
        <div class="text-right">
          <div class="text-2xl font-bold text-yellow-400">300,000,000</div>
          <div class="text-xs text-gray-400">{{ t('reward') }}</div>
        </div>
      </div>
      
      <div class="flex items-center justify-between">
        <div class="flex items-center space-x-2">
          <span class="text-sm text-gray-400">{{ t('timeLeft') }}:</span>
          <span class="text-lg font-mono text-green-400">04:12:46</span>
        </div>
        <div class="flex space-x-1">
          <div v-for="i in 3" :key="i" 
               class="w-2 h-2 rounded-full"
               :class="i <= comboProgress ? 'bg-yellow-400' : 'bg-gray-500'">
          </div>
        </div>
      </div>
    </div>

    <!-- 스킵 버튼 -->
    <div class="text-center mb-6">
      <button class="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-8 py-3 rounded-lg font-medium flex items-center space-x-2 mx-auto hover:from-purple-600 hover:to-pink-600 transition-all">
        <span>{{ t('skipFor') }} 250 Yuzu</span>
        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
        </svg>
      </button>
    </div>

    <!-- 탭 메뉴 -->
    <div class="flex space-x-1 mb-6 sticky top-0 z-10 bg-gray-800 py-2">
      <button 
        v-for="tab in tabs" 
        :key="tab.key"
        @click="activeTab = tab.key"
        class="flex-1 py-2 px-3 rounded-lg text-sm font-medium transition-all relative"
        :class="activeTab === tab.key 
          ? 'bg-purple-600 text-white' 
          : 'bg-gray-700 text-gray-300 hover:bg-gray-600'"
      >
        {{ t(tab.nameKey) }}
        <div v-if="activeTab === tab.key" class="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-orange-400 rounded-full"></div>
      </button>
    </div>

    <!-- 레벨 박스들 -->
    <div class="grid grid-cols-2 gap-4">
      <div v-for="item in filteredItems" :key="item.id" 
           class="bg-gray-700 rounded-lg p-4 cursor-pointer hover:bg-gray-600 transition-colors"
           @click="handleInvest(item)">
        <div class="text-center mb-3">
          <div class="text-lg font-bold text-white mb-1">Lvl {{ item.level }}</div>
          <div class="flex items-center justify-center space-x-1 text-sm text-yellow-400">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
            </svg>
            <span>{{ t('profitPerHour') }}: +{{ formatNumber(item.profitPerHour) }}</span>
          </div>
        </div>
        
        <!-- 아이템 이미지 (임시로 아이콘 사용) -->
        <div class="w-full h-20 bg-gray-600 rounded-lg flex items-center justify-center mb-3">
          <div class="text-4xl">{{ item.icon }}</div>
        </div>
        
        <div class="text-center">
          <div class="text-white font-medium mb-1">{{ t(item.nameKey) }}</div>
          <div class="text-xs text-gray-400 mb-2">{{ t(item.descriptionKey) }}</div>
          
          <!-- 비용 또는 언락 조건 -->
          <div v-if="item.unlocked" class="flex items-center justify-center space-x-1 text-yellow-400 text-sm">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
            </svg>
            <span>{{ formatNumber(item.cost) }}</span>
          </div>
          <div v-else class="text-xs text-gray-500 text-center">
            {{ t(item.unlockCondition) }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'InvestPage',
  props: {
    t: {
      type: Function,
      required: true
    }
  },
  data() {
    return {
      currentMoney: 1200352400,
      comboProgress: 2,
      activeTab: 'tech',
      tabs: [
        { key: 'tech', nameKey: 'tech' },
        { key: 'fun', nameKey: 'fun' },
        { key: 'web3', nameKey: 'web3' },
        { key: 'events', nameKey: 'events' },
        { key: 'hire', nameKey: 'hire' }
      ],
      items: [
        {
          id: 1,
          nameKey: 'roaringKittenEducation',
          descriptionKey: 'wiseCatOnceSaid',
          level: 0,
          profitPerHour: 14400,
          cost: 62500,
          icon: '🐱',
          category: 'tech',
          unlocked: true
        },
        {
          id: 2,
          nameKey: 'pepeCulture',
          descriptionKey: 'frogsForCulture',
          level: 0,
          profitPerHour: 14400,
          cost: 83500,
          icon: '🐸',
          category: 'tech',
          unlocked: true
        },
        {
          id: 3,
          nameKey: 'woojakCity',
          descriptionKey: 'notBobButBuilder',
          level: 0,
          profitPerHour: 18000,
          icon: '🔒',
          category: 'tech',
          unlocked: false,
          unlockCondition: 'unlockNuclearPowerPlant'
        },
        {
          id: 4,
          nameKey: 'wsbTrading',
          descriptionKey: 'expertlyNavigatingMarkets',
          level: 0,
          profitPerHour: 18000,
          icon: '🔒',
          category: 'tech',
          unlocked: false,
          unlockCondition: 'unlockBitcoinTreasury'
        },
        {
          id: 5,
          nameKey: 'dogeMeme',
          descriptionKey: 'muchWowVeryProfit',
          level: 0,
          profitPerHour: 22000,
          cost: 150000,
          icon: '🐕',
          category: 'fun',
          unlocked: true
        },
        {
          id: 6,
          nameKey: 'elonMars',
          descriptionKey: 'toTheMoonAndBeyond',
          level: 0,
          profitPerHour: 28000,
          cost: 200000,
          icon: '🚀',
          category: 'fun',
          unlocked: true
        },
        {
          id: 7,
          nameKey: 'satoshiBitcoin',
          descriptionKey: 'digitalGoldCreator',
          level: 0,
          profitPerHour: 35000,
          cost: 500000,
          icon: '₿',
          category: 'web3',
          unlocked: true
        },
        {
          id: 8,
          nameKey: 'vitalikEthereum',
          descriptionKey: 'smartContractMaster',
          level: 0,
          profitPerHour: 42000,
          cost: 750000,
          icon: 'Ξ',
          category: 'web3',
          unlocked: true
        },
        {
          id: 9,
          nameKey: 'cryptoPunk',
          descriptionKey: 'originalNftLegend',
          level: 0,
          profitPerHour: 50000,
          cost: 1000000,
          icon: '👾',
          category: 'web3',
          unlocked: true
        },
        {
          id: 10,
          nameKey: 'defiYield',
          descriptionKey: 'yieldFarmingExpert',
          level: 0,
          profitPerHour: 60000,
          icon: '🔒',
          category: 'web3',
          unlocked: false,
          unlockCondition: 'unlockDefiProtocol'
        },
        {
          id: 11,
          nameKey: 'metaverseParty',
          descriptionKey: 'virtualWorldCelebration',
          level: 0,
          profitPerHour: 45000,
          cost: 300000,
          icon: '🎉',
          category: 'events',
          unlocked: true
        },
        {
          id: 12,
          nameKey: 'nftAuction',
          descriptionKey: 'bidAndWinRare',
          level: 0,
          profitPerHour: 55000,
          cost: 400000,
          icon: '🔨',
          category: 'events',
          unlocked: true
        }
      ]
    }
  },
  computed: {
    filteredItems() {
      return this.items.filter(item => item.category === this.activeTab)
    }
  },
  methods: {
    handleInvest(type) {
      this.$emit('invest', type)
    },
    formatNumber(num) {
      if (num < 1e6) return num.toLocaleString()
      if (num >= 1e6 && num < 1e9) return (num / 1e6).toFixed(1) + 'M'
      if (num >= 1e9) return (num / 1e9).toFixed(1) + 'B'
      return num.toLocaleString()
    }
  },
  emits: ['invest']
}
</script>
