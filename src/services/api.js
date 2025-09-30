// API 서비스
const API_BASE_URL = 'http://localhost:8000/api'

export const apiService = {
  // 사용자 관련
  getUser: () => fetch(`${API_BASE_URL}/user`),
  updateUser: (data) => fetch(`${API_BASE_URL}/user`, { method: 'PUT', body: JSON.stringify(data) }),
  
  // 게임 데이터
  getGameData: () => fetch(`${API_BASE_URL}/game`),
  updateScore: (score) => fetch(`${API_BASE_URL}/game/score`, { method: 'POST', body: JSON.stringify({ score }) }),
  
  // 상점
  getShopItems: () => fetch(`${API_BASE_URL}/shop`),
  buyItem: (itemId) => fetch(`${API_BASE_URL}/shop/buy`, { method: 'POST', body: JSON.stringify({ itemId }) }),
  
  // 랭킹
  getRankings: () => fetch(`${API_BASE_URL}/rankings`),
  
  // 출석체크
  getDailyRewards: () => fetch(`${API_BASE_URL}/daily-rewards`),
  claimReward: (day) => fetch(`${API_BASE_URL}/daily-rewards/claim`, { method: 'POST', body: JSON.stringify({ day }) })
}