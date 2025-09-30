// src/stores/gameStore.js
import { defineStore } from 'pinia'
import { apiService } from '../services/api'

export const useGameStore = defineStore('game', {
  state: () => ({
    score: 0,
    clickPower: 1000,
    premiumCurrency: 0,
    shopItems: [],
    rankings: [],
    dailyRewards: []
  }),
  
  actions: {
    async loadGameData() {
      const data = await apiService.getGameData()
      this.score = data.score
      this.clickPower = data.clickPower
      this.premiumCurrency = data.premiumCurrency
    },
    
    async updateScore(newScore) {
      this.score = newScore
      await apiService.updateScore(newScore)
    },
    
    async buyItem(itemId) {
      const result = await apiService.buyItem(itemId)
      if (result.success) {
        this.score -= result.cost
        this.clickPower += result.powerIncrease
      }
    }
  }
})