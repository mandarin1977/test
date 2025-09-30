<template>
  <div class="w-full h-full flex flex-col">
    <h2 class="text-2xl font-bold text-center mb-4">{{ t('dailyRewards') }}</h2>
    <div class="space-y-3 overflow-y-auto p-1">
      <div class="grid grid-cols-4 gap-3">
        <div 
          v-for="reward in dailyRewards.slice(0, 4)" 
          :key="reward.day" 
          :class="rewardCardClass(reward)" 
          @click="$emit('claim-reward', reward)"
        >
          <RewardCardContent :reward="reward" :t="t" />
        </div>
      </div>
      <div class="grid grid-cols-3 gap-3">
        <div 
          v-for="reward in dailyRewards.slice(4, 7)" 
          :key="reward.day" 
          :class="rewardCardClass(reward)" 
          @click="$emit('claim-reward', reward)"
        >
          <RewardCardContent :reward="reward" :t="t" />
        </div>
      </div>
      <div class="grid grid-cols-4 gap-3">
        <div 
          v-for="reward in dailyRewards.slice(7, 11)" 
          :key="reward.day" 
          :class="rewardCardClass(reward)" 
          @click="$emit('claim-reward', reward)"
        >
          <RewardCardContent :reward="reward" :t="t" />
        </div>
      </div>
      <div class="grid grid-cols-3 gap-3">
        <div 
          v-for="reward in dailyRewards.slice(11, 14)" 
          :key="reward.day" 
          :class="rewardCardClass(reward)" 
          @click="$emit('claim-reward', reward)"
        >
          <RewardCardContent :reward="reward" :t="t" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import RewardCardContent from '../components/RewardCardContent.vue'

export default {
  name: 'CheckinPage',
  components: {
    RewardCardContent
  },
  props: {
    dailyRewards: {
      type: Array,
      required: true
    },
    rewardCardClass: {
      type: Function,
      required: true
    },
    t: {
      type: Function,
      required: true
    }
  },
  emits: ['claim-reward']
}
</script>
