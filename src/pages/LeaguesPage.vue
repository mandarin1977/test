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

    <!-- 상단: 등급 선택 -->
    <div class="px-4 mb-6">
      <div class="flex items-center justify-between">
        <button 
          @click="previousTier"
          class="w-8 h-8 bg-gray-700 rounded-full flex items-center justify-center text-white hover:bg-gray-600 transition-colors"
        >
          <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        
        <!-- 등급 메달 -->
        <div class="flex flex-col items-center">
          <div 
            class="w-20 h-20 rounded-lg flex items-center justify-center text-3xl mb-3 relative"
            :style="{ backgroundColor: currentTier.color }"
          >
            <div class="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent rounded-lg"></div>
            <div class="relative z-10">{{ currentTier.icon }}</div>
          </div>
          <h2 class="text-white text-xl font-bold">{{ t(currentTier.nameKey) }}</h2>
        </div>
        
        <button 
          @click="nextTier"
          class="w-8 h-8 bg-gray-700 rounded-full flex items-center justify-center text-white hover:bg-gray-600 transition-colors"
        >
          <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>
    </div>

    <!-- 중간: 보너스 정보 -->
    <div class="px-4 mb-6">
      <div class="bg-gray-800/50 rounded-lg p-4 border border-gray-700">
        <div class="flex justify-between items-start">
          <div>
            <p class="text-gray-300 text-sm mb-1">From Staking Power:</p>
            <p class="text-white text-lg font-bold">{{ currentTier.requirement }}</p>
          </div>
          <div class="text-right">
            <div class="flex items-center mb-2">
              <span class="text-white text-sm font-medium">Bonus:</span>
              <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4 text-gray-400 ml-1" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z"/>
              </svg>
            </div>
            <div class="space-y-1 text-xs text-gray-300">
              <p>Invest Cards: +1 levels</p>
              <p>Invite Friends Rewards: +1 yuzu</p>
              <p>14 Day Daily Reward: +100 yuzu</p>
              <p>Profit per hour: +100%</p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 하단: 유저 랭킹 -->
    <div class="flex-1 flex flex-col relative min-h-0">
      <div class="flex-1 overflow-y-auto space-y-3 pb-20 min-h-0 px-4">
        <div 
          v-for="(player, index) in players" 
          :key="index"
          class="bg-gray-700 rounded-lg p-4 flex items-center justify-between"
          :class="{ 'ring-2 ring-blue-500': player.isMe }"
        >
          <div class="flex items-center space-x-4">
            <div 
              class="w-12 h-12 rounded-full flex items-center justify-center text-white font-bold text-lg"
              :class="getRankColor(index + 1)"
            >
              {{ index + 1 }}
            </div>
            <div class="flex items-center space-x-3">
              <div 
                class="w-12 h-12 rounded-full flex items-center justify-center text-lg"
                :style="{ backgroundColor: player.avatarColor }"
              >
                {{ player.avatar }}
              </div>
              <div>
                <h3 class="text-white font-semibold text-sm">{{ player.name }}</h3>
                <p class="text-gray-400 text-xs">{{ player.stakingPower }}M Staking Power</p>
              </div>
            </div>
          </div>
          <div class="flex items-center space-x-2">
            <div class="w-6 h-6 bg-yellow-500 rounded-full flex items-center justify-center">
              <span class="text-xs">💰</span>
            </div>
            <span class="text-gray-400 text-xs">✌️</span>
          </div>
        </div>
      </div>
      
      <!-- 내 랭킹 -->
      <div v-if="myRanking" class="absolute bottom-0 left-0 right-0 bg-blue-600/20 rounded-lg p-4 border border-blue-500/30 z-10 mx-4">
        <div class="flex items-center justify-between">
          <div class="flex items-center space-x-4">
            <div class="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold text-lg">
              {{ players.findIndex(p => p.isMe) + 1 }}
            </div>
            <div class="flex items-center space-x-3">
              <div 
                class="w-12 h-12 rounded-full flex items-center justify-center text-lg"
                :style="{ backgroundColor: myRanking.avatarColor }"
              >
                {{ myRanking.avatar }}
              </div>
              <div>
                <h3 class="text-white font-semibold text-sm">{{ myRanking.name }}</h3>
                <p class="text-gray-400 text-xs">{{ myRanking.stakingPower }}M Staking Power</p>
              </div>
            </div>
          </div>
          <div class="flex items-center space-x-2">
            <div class="w-6 h-6 bg-yellow-500 rounded-full flex items-center justify-center">
              <span class="text-xs">💰</span>
            </div>
            <span class="text-gray-400 text-xs">✌️</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'LeaguesPage',
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
      currentTierIndex: 0,
      tiers: [
        { nameKey: 'bronze', icon: '🥉', color: '#cd7f32', requirement: '25M $BARA' },
        { nameKey: 'silver', icon: '🥈', color: '#c0c0c0', requirement: '50M $BARA' },
        { nameKey: 'gold', icon: '🥇', color: '#ffd700', requirement: '100M $BARA' },
        { nameKey: 'platinum', icon: '💎', color: '#e5e7eb', requirement: '200M $BARA' },
        { nameKey: 'diamond', icon: '💠', color: '#b9f2ff', requirement: '500M $BARA' },
        { nameKey: 'master', icon: '👑', color: '#8b5cf6', requirement: '1B $BARA' }
      ],
      players: [
        { name: 'Ryan M', avatar: '🐹', avatarColor: '#6b7280', stakingPower: 224.2, isMe: false },
        { name: 'Mark Adams', avatar: '🐕', avatarColor: '#8b4513', stakingPower: 224.2, isMe: false },
        { name: 'Bendegúz Kívés', avatar: '👨‍🦱', avatarColor: '#d97706', stakingPower: 223.7, isMe: false },
        { name: 'M J', avatar: '👨‍🎤', avatarColor: '#7c3aed', stakingPower: 223.2, isMe: false },
        { name: 'Player5', avatar: '👤', avatarColor: '#3b82f6', stakingPower: 220.5, isMe: false },
        { name: 'Player6', avatar: '👤', avatarColor: '#10b981', stakingPower: 218.8, isMe: false },
        { name: 'Player7', avatar: '👤', avatarColor: '#ef4444', stakingPower: 215.3, isMe: false },
        { name: 'Player8', avatar: '👤', avatarColor: '#eab308', stakingPower: 212.1, isMe: false },
        { name: 'Player9', avatar: '👤', avatarColor: '#f97316', stakingPower: 208.7, isMe: false },
        { name: 'Player10', avatar: '👤', avatarColor: '#ec4899', stakingPower: 205.2, isMe: true }
      ]
    }
  },
  computed: {
    currentTier() {
      return this.tiers[this.currentTierIndex]
    },
    myRanking() {
      return this.players.find(player => player.isMe)
    }
  },
  methods: {
    previousTier() {
      this.currentTierIndex = this.currentTierIndex > 0 
        ? this.currentTierIndex - 1 
        : this.tiers.length - 1
    },
    nextTier() {
      this.currentTierIndex = this.currentTierIndex < this.tiers.length - 1 
        ? this.currentTierIndex + 1 
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
