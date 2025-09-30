<template>
  <div class="w-full h-full flex flex-col overflow-y-auto">
    <!-- 헤더 -->
    <div class="text-center mb-6">
      <h1 class="text-2xl font-bold text-white mb-2">{{ t('inviteFriends') }}</h1>
      <p class="text-gray-400 text-sm">{{ t('inviteSubtitle') }}</p>
    </div>

    <!-- 초대 옵션들 -->
    <div class="space-y-4 mb-6">
      <!-- 일반 초대 -->
      <div class="bg-gray-700 rounded-lg p-4 flex items-center space-x-4 cursor-pointer hover:bg-gray-600 transition-colors"
           @click="handleInvite('normal')">
        <div class="w-12 h-12 bg-amber-500 rounded-lg flex items-center justify-center">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
          </svg>
        </div>
        <div class="flex-1">
          <h3 class="font-semibold text-white">{{ t('inviteFriend') }}</h3>
          <div class="flex items-center space-x-2 mt-1">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
              <path d="M8.433 7.418c.155-.103.346-.196.567-.267v1.698a2.305 2.305 0 01-.567-.267C8.07 8.34 8 8.114 8 8c0-.114.07-.34.433-.582zM11 12.849v-1.698c.22.071.412.164.567.267.364.243.433.468.433.582 0 .114-.07.34-.433.582a2.305 2.305 0 01-.567.267z" />
              <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-13a1 1 0 10-2 0v.092a4.535 4.535 0 00-1.676.662C6.602 6.234 6 7.009 6 8c0 .99.602 1.765 1.324 2.246.48.32 1.054.545 1.676.662v1.941c-.391-.127-.68-.317-.843-.504a1 1 0 10-1.51 1.31c.562.649 1.413 1.076 2.353 1.253V15a1 1 0 102 0v-.092a4.535 4.535 0 001.676-.662C13.398 13.766 14 12.991 14 12c0-.99-.602-1.765-1.324-2.246A4.535 4.535 0 0011 9.092V7.151c.391.127.68.317.843.504a1 1 0 101.511-1.31c-.563-.649-1.413-1.076-2.354-1.253V5z" clip-rule="evenodd" />
            </svg>
            <span class="text-yellow-400 text-sm font-medium">{{ t('bonus1_5M') }}</span>
          </div>
        </div>
        <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
        </svg>
      </div>

      <!-- 텔레그램 프리미엄 초대 -->
      <div class="bg-gray-700 rounded-lg p-4 flex items-center space-x-4 cursor-pointer hover:bg-gray-600 transition-colors"
           @click="handleInvite('premium')">
        <div class="w-12 h-12 bg-pink-500 rounded-lg flex items-center justify-center">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7" />
          </svg>
        </div>
        <div class="flex-1">
          <h3 class="font-semibold text-white">{{ t('inviteWithTelegram') }}</h3>
          <div class="flex items-center space-x-2 mt-1">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
              <path d="M8.433 7.418c.155-.103.346-.196.567-.267v1.698a2.305 2.305 0 01-.567-.267C8.07 8.34 8 8.114 8 8c0-.114.07-.34.433-.582zM11 12.849v-1.698c.22.071.412.164.567.267.364.243.433.468.433.582 0 .114-.07.34-.433.582a2.305 2.305 0 01-.567.267z" />
              <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-13a1 1 0 10-2 0v.092a4.535 4.535 0 00-1.676.662C6.602 6.234 6 7.009 6 8c0 .99.602 1.765 1.324 2.246.48.32 1.054.545 1.676.662v1.941c-.391-.127-.68-.317-.843-.504a1 1 0 10-1.51 1.31c.562.649 1.413 1.076 2.353 1.253V15a1 1 0 102 0v-.092a4.535 4.535 0 001.676-.662C13.398 13.766 14 12.991 14 12c0-.99-.602-1.765-1.324-2.246A4.535 4.535 0 0011 9.092V7.151c.391.127.68.317.843.504a1 1 0 101.511-1.31c-.563-.649-1.413-1.076-2.354-1.253V5z" clip-rule="evenodd" />
            </svg>
            <span class="text-yellow-400 text-sm font-medium">{{ t('bonus3M') }}</span>
          </div>
        </div>
        <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
        </svg>
      </div>
    </div>

    <!-- 친구 목록 -->
    <div class="flex-1 flex flex-col">
      <div class="flex items-center justify-between mb-4">
        <h2 class="text-gray-400 text-sm">{{ t('friendsList') }} ({{ friends.length }})</h2>
        <button @click="refreshFriends" class="text-gray-400 hover:text-white transition-colors">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
          </svg>
        </button>
      </div>

      <!-- 친구 목록 -->
      <div class="flex-1 overflow-y-auto space-y-2">
        <div v-if="friends.length === 0" class="text-center py-8">
          <div class="w-16 h-16 bg-gray-600 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
          </div>
          <p class="text-gray-400 text-sm">{{ t('noFriends') }}</p>
        </div>

        <div v-for="friend in friends" :key="friend.id" 
             class="bg-gray-700 rounded-lg p-3 flex items-center space-x-3">
          <div class="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center">
            <span class="text-white font-bold">{{ friend.name.charAt(0) }}</span>
          </div>
          <div class="flex-1">
            <h3 class="font-semibold text-white text-sm">{{ friend.name }}</h3>
            <p class="text-gray-400 text-xs">{{ t('joined') }} {{ formatDate(friend.joinedAt) }}</p>
          </div>
          <div class="text-right">
            <p class="text-yellow-400 text-sm font-medium">+{{ formatNumber(friend.bonus) }}</p>
          </div>
        </div>
      </div>
    </div>

    <!-- 하단 버튼들 -->
    <div class="flex space-x-3 mt-6">
      <button @click="handleInvite('normal')" 
              class="flex-1 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-bold py-3 px-6 rounded-lg hover:from-purple-600 hover:to-pink-600 transition-all">
        {{ t('inviteFriend') }}
      </button>
      <button @click="copyInviteLink" 
              class="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center hover:from-purple-600 hover:to-pink-600 transition-all">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
        </svg>
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'InvitePage',
  props: {
    t: {
      type: Function,
      required: true
    }
  },
  data() {
    return {
      friends: [
        // 예시 친구 데이터 (현재는 비어있음)
      ]
    }
  },
  methods: {
    handleInvite(type) {
      this.$emit('invite-friend', type)
    },
    refreshFriends() {
      this.$emit('refresh-friends')
    },
    copyInviteLink() {
      this.$emit('copy-invite-link')
    },
    formatDate(date) {
      return new Date(date).toLocaleDateString()
    },
    formatNumber(num) {
      if (num < 1e6) return num.toLocaleString()
      if (num >= 1e6 && num < 1e9) return (num / 1e6).toFixed(1) + 'M'
      if (num >= 1e9) return (num / 1e9).toFixed(1) + 'B'
      return num.toLocaleString()
    }
  },
  emits: ['invite-friend', 'refresh-friends', 'copy-invite-link']
}
</script>
