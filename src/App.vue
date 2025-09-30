<template>
  <div id="app">
    <!-- 메인 앱 컨테이너 -->
    <div class="bg-gray-800 rounded-2xl shadow-2xl overflow-hidden main-container" style="width: 100vw; height: 100vh; position: fixed; top: 0; left: 0; border-radius: 0;">
      
      <!-- 1. 최상단 헤더 컴포넌트 -->
      <HeaderComponent 
        v-if="currentPage === 'home'"
        @open-settings="currentPage = 'settings'" 
        @open-notification="currentPage = 'notification'" 
      />

      <!-- Toast 알림 -->
      <ToastNotification :show="toast.show" :message="toast.message" />

      <!-- 2. 상단 네비게이션 컴포넌트 -->
      <NavigationBar 
        v-if="currentPage === 'home'"
        :current-page="currentPage" 
        :t="t"
        @navigate="handlePageChange" 
      />

      <!-- 3. 메인 컨텐츠 영역 -->
      <main class="flex-grow flex flex-col items-center justify-center p-4 relative overflow-hidden">
        <!-- 현재 페이지에 맞는 컴포넌트를 동적으로 렌더링 -->
        <component 
          :is="activeComponent"
          v-bind="activeComponentProps"
          @manual-click="manualClick"
          @claim-reward="claimReward"
          @spin-wheel="spinWheel"
          @buy-item="buyItem"
          @copy-user-id="copyUserId"
          @close-settings="currentPage = 'home'"
          @update:isPressing="isPressing = $event"
          @update:soundEnabled="updateSoundEnabled"
          @change-language="changeLanguage"
          @notification-click="handleNotificationClick"
          @invite-friend="handleInviteFriend"
          @refresh-friends="refreshFriends"
          @copy-invite-link="copyInviteLink"
          @invest="handleInvest"
          @task-click="handleTaskClick"
          @task-toggle="handleTaskToggle"
          @navigate="handlePageChange"
        />

      </main>

      <!-- 5. 하단 푸터 네비게이션 컴포넌트 -->
      <FooterNavigation 
        v-if="currentPage !== 'notification' && currentPage !== 'ranking' && currentPage !== 'topCountries' && currentPage !== 'cityBoost' && currentPage !== 'leagues'"
        :current-page="currentPage" 
        :t="t"
        @navigate="handlePageChange" 
      />
    </div>
  </div>
</template>

<script>
import { ref, computed, onMounted } from 'vue'
import HeaderComponent from './components/HeaderComponent.vue'
import NavigationBar from './components/NavigationBar.vue'
import FooterNavigation from './components/FooterNavigation.vue'
import ToastNotification from './components/ToastNotification.vue'
import { audioService } from './services/audioService.js'
import HomePage from './pages/HomePage.vue'
import RankingPage from './pages/RankingPage.vue'
import RoulettePage from './pages/RoulettePage.vue'
import CheckinPage from './pages/CheckinPage.vue'
import ShopPage from './pages/ShopPage.vue'
import SettingsPage from './pages/SettingsPage.vue'
import PlaceholderPage from './pages/PlaceholderPage.vue'
import NotificationPage from './pages/NotificationPage.vue'
import InvitePage from './pages/InvitePage.vue'
import InvestPage from './pages/InvestPage.vue'
import TaskPage from './pages/TaskPage.vue'
import TopCountriesPage from './pages/TopCountriesPage.vue'
import CityBoostPage from './pages/CityBoostPage.vue'
import LeaguesPage from './pages/LeaguesPage.vue'

export default {
  name: 'App',
  components: {
    HeaderComponent,
    NavigationBar,
    FooterNavigation,
    ToastNotification,
    HomePage,
    RankingPage,
    RoulettePage,
    CheckinPage,
    ShopPage,
    SettingsPage,
    PlaceholderPage,
    NotificationPage,
    InvitePage,
    InvestPage,
    TaskPage,
    TopCountriesPage,
    CityBoostPage,
    LeaguesPage
  },
  setup() {
    // ------------------ 상태 (State) ------------------
    const currentPage = ref('home')
    const score = ref(0)
    const clickPower = ref(1000)
    const premiumCurrency = ref(0)
    const isPressing = ref(false)
    const floatingNumbers = ref([])
    const ripples = ref([])
    const speechBubbles = ref([])
    const clickCombo = ref(0)
    const toast = ref({ show: false, message: '' })
    const soundEnabled = ref(true)
    const userId = ref('')
    const spinTickets = ref(1)
    const isSpinning = ref(false)
    const rouletteRotation = ref(0)
    const currentLanguage = ref('ko')

    const roulettePrizes = ref([
      { label: '1M', value: 1000000, type: 'coin', color: '#ef4444' },
      { label: 'x2', value: 2, type: 'multiplier', color: '#f97316' },
      { label: '50M', value: 50000000, type: 'coin', color: '#eab308' },
      { label: '꽝', value: 0, type: 'nothing', color: '#84cc16' },
      { label: '100', value: 100, type: 'premium', color: '#22c55e' },
      { label: '1B', value: 1000000000, type: 'coin', color: '#14b8a6' },
      { label: 'x5', value: 5, type: 'multiplier', color: '#06b6d4' },
      { label: '100M', value: 100000000, type: 'coin', color: '#3b82f6' },
    ])

    const shopItems = ref([
      { id: 1, nameKey: 'sturdyFinger', descriptionKey: 'clickPower500', cost: 10000, powerIncrease: 500, icon: '👆' },
      { id: 2, nameKey: 'mechanicalKeyboard', descriptionKey: 'clickPower2500', cost: 80000, powerIncrease: 2500, icon: '⌨️' },
      { id: 3, nameKey: 'gamingMouse', descriptionKey: 'clickPower15000', cost: 500000, powerIncrease: 15000, icon: '🖱️' },
      { id: 4, nameKey: 'energyDrink', descriptionKey: 'clickPower100k', cost: 3000000, powerIncrease: 100000, icon: '🥤' },
    ])

    const rankings = ref([
      { name: 'ClickMaster', score: 15023000000, level: 50, avatar: '👑', avatarColor: '#ffd700', isMe: false },
      { name: 'TapTitan', score: 120540000, level: 45, avatar: '⚡', avatarColor: '#ff6b6b', isMe: false },
      { name: 'ProGamer', score: 98760000, level: 42, avatar: '🎮', avatarColor: '#4ecdc4', isMe: false },
      { name: 'VueLover', score: 75430000, level: 38, avatar: '💚', avatarColor: '#45b7d1', isMe: false },
      { name: 'Gemini', score: 51230000, level: 35, avatar: '🤖', avatarColor: '#96ceb4', isMe: false },
      { name: 'CryptoKing', score: 45670000, level: 32, avatar: '₿', avatarColor: '#f7931a', isMe: false },
      { name: 'DiamondHands', score: 38920000, level: 30, avatar: '💎', avatarColor: '#b9f2ff', isMe: false },
      { name: 'MoonWalker', score: 32150000, level: 28, avatar: '🚀', avatarColor: '#ff9ff3', isMe: false },
      { name: 'HODLer', score: 27890000, level: 26, avatar: '💪', avatarColor: '#54a0ff', isMe: false },
      { name: 'DeFiMaster', score: 23450000, level: 24, avatar: '🏦', avatarColor: '#5f27cd', isMe: false }
    ])

    const dailyRewards = ref([
      { day: 1, type: 'coin', amount: '300M', description: null, status: 'upcoming' },
      { day: 2, type: 'coin', amount: '300M', description: null, status: 'upcoming' },
      { day: 3, type: 'coin', amount: '300M', description: null, status: 'upcoming' },
      { day: 4, type: 'coin', amount: '300M', description: null, status: 'upcoming' },
      { day: 5, type: 'boost', amount: 'x3 Gold Income', description: 'Boost for 1h', status: 'upcoming' },
      { day: 6, type: 'coin', amount: '300M', description: null, status: 'upcoming' },
      { day: 7, type: 'special', amount: '1', description: 'Extra Wheel Spin', status: 'upcoming' },
      { day: 8, type: 'coin', amount: '300M', description: null, status: 'upcoming' },
      { day: 9, type: 'token', amount: '1', description: 'Skip Token', status: 'upcoming' },
      { day: 10, type: 'coin', amount: '300M', description: null, status: 'upcoming' },
      { day: 11, type: 'boost', amount: '20%', description: 'City Boost for 1h', status: 'upcoming' },
      { day: 12, type: 'coin', amount: '300M', description: null, status: 'upcoming' },
      { day: 13, type: 'token', amount: '1 Day', description: 'Tariff Insurance', status: 'upcoming' },
      { day: 14, type: 'special', amount: '50', description: 'Yuzu', status: 'upcoming' },
    ])

    // 다국어 지원
    const translations = {
      ko: {
        settings: '설정',
        general: '일반',
        language: '언어',
        country: '국가',
        southKorea: 'South Korea',
        sound: '사운드',
        account: '계정',
        userId: '유저 ID',
        shareWithFriends: '친구에게 공유하기',
        home: '홈',
        ranking: '랭킹',
        totalProgress: '전체 진행률',
        myRanking: '내 랭킹',
        roulette: '룰렛',
        checkin: '출석체크',
        topCountries: 'TOP COUNTRIES',
        topCities: 'TOP CITIES',
        topMayors: 'TOP MAYORS',
        cityBoost: 'CITY BOOST',
        topBoostingPlayers: 'TOP BOOSTING PLAYERS',
        topBoostedCities: 'TOP BOOSTED CITIES',
        leagues: 'LEAGUES',
        bronze: 'Bronze',
        silver: 'Silver',
        gold: 'Gold',
        platinum: 'Platinum',
        diamond: 'Diamond',
        master: 'Master',
        shop: '상점',
        quest: '퀘스트',
        invite: '초대',
        clickCount: '클릭 횟수',
        totalCoinBalance: 'Total Coin Balance',
        premiumCurrency: '유료 재화',
        dailyRewards: 'Daily Rewards',
        store: '상점',
        spin: 'SPIN',
        tickets: '이용권',
        buy: '구매',
        claim: 'Claim',
        questTitle: '퀘스트',
        inviteTitle: '친구 초대',
        inviteFriends: '친구 초대!',
        inviteSubtitle: 'Both you and your friend will receive bonuses',
        inviteFriend: '친구 초대',
        inviteWithTelegram: '텔레그램 프리미엄으로 친구 초대',
        bonus1_5M: '+1.5M for you and your friend',
        bonus3M: '+3M for you and your friend',
        friendsList: 'List of your friends',
        noFriends: 'No friends invited yet',
        joined: 'Joined',
        invest: 'Invest',
        investSubtitle: 'Grow your wealth with smart investments',
        basicInvestment: 'Basic Investment',
        basicInvestmentDesc: 'Safe and steady returns',
        premiumInvestment: 'Premium Investment',
        premiumInvestmentDesc: 'Higher returns with moderate risk',
        vipInvestment: 'VIP Investment',
        vipInvestmentDesc: 'Maximum returns for VIP members',
        dailyReturn: 'Daily Return',
        minInvestment: 'Min Investment',
        currentInvestments: 'Current Investments',
        noInvestments: 'No active investments',
        invested: 'Invested',
        profit: 'Profit',
        task: 'Task',
        taskSubtitle: 'Complete tasks to earn rewards',
        progress: 'Progress',
        daily: 'Daily',
        weekly: 'Weekly',
        special: 'Special',
        noTasks: 'No tasks available',
        click100Times: 'Click 100 Times',
        click100TimesDesc: 'Click the main button 100 times',
        buyFirstItem: 'Buy First Item',
        buyFirstItemDesc: 'Purchase your first item from the shop',
        spinWheel5Times: 'Spin Wheel 5 Times',
        spinWheel5TimesDesc: 'Use the roulette wheel 5 times',
        claimDailyReward: 'Claim Daily Reward',
        claimDailyRewardDesc: 'Collect your daily check-in reward',
        inviteFriend: 'Invite a Friend',
        inviteFriendDesc: 'Invite a friend to join the game',
        dailyCombo: '데일리 콤보',
        reward: '보상',
        timeLeft: '남은 시간',
        skipFor: '스킵',
        tech: '테크',
        fun: '펀',
        web3: '웹3',
        events: '이벤트',
        hire: '채용',
        profitPerHour: '시간당 수익',
        schools: '학교',
        learningForFuture: '미래를 위한 학습',
        freeInternet: '무료 인터넷',
        connectWithoutLimits: '제한 없는 연결',
        gamingCenter: '게임 센터',
        playAndEarn: '플레이하고 수익을 얻으세요',
        cryptoMining: '암호화폐 채굴',
        mineDigitalGold: '디지털 골드를 채굴하세요',
        nftGallery: 'NFT 갤러리',
        collectAndTrade: '수집하고 거래하세요',
        eventHall: '이벤트 홀',
        hostAmazingEvents: '놀라운 이벤트를 개최하세요',
        roaringKittenEducation: '로어링 키튼 교육부 장관',
        wiseCatOnceSaid: '현명한 고양이가 한 번 말했듯이...',
        pepeCulture: '페페 문화부 장관',
        frogsForCulture: '문화를 위한 개구리들',
        woojakCity: '우자크 도시부 장관',
        notBobButBuilder: '그는 밥이 아니지만 건설가입니다',
        wsbTrading: 'WSB 거래부 장관',
        expertlyNavigatingMarkets: '전문적으로 시장을 탐색하여 수익을 창출',
        dogeMeme: '도지 밈부 장관',
        muchWowVeryProfit: '많은 와우, 매우 수익적',
        elonMars: '엘론 화성부 장관',
        toTheMoonAndBeyond: '달을 넘어서',
        satoshiBitcoin: '사토시 비트코인부 장관',
        digitalGoldCreator: '디지털 골드 창조자',
        vitalikEthereum: '비탈릭 이더리움부 장관',
        smartContractMaster: '스마트 컨트랙트 마스터',
        cryptoPunk: '크립토펑크 NFT부 장관',
        originalNftLegend: '원조 NFT 전설',
        defiYield: 'DeFi 수익부 장관',
        yieldFarmingExpert: '수익 농사 전문가',
        metaverseParty: '메타버스 파티부 장관',
        virtualWorldCelebration: '가상 세계 축제',
        nftAuction: 'NFT 경매부 장관',
        bidAndWinRare: '희귀한 아이템을 입찰하고 획득',
        unlockNuclearPowerPlant: '원자력 발전소를 레벨 5까지 업그레이드',
        unlockBitcoinTreasury: '비트코인 국고를 레벨 8까지 업그레이드',
        unlockDefiProtocol: 'DeFi 프로토콜을 레벨 10까지 업그레이드',
        socialMedia: '소셜 미디어',
        taskList: '태스크 리스트',
        telegram: '텔레그램',
        xTwitter: 'X',
        sendBoinkersToMoon: '3개의 보잉커를 달로 보내고...',
        joinPokergram: '포커그램에 가입하고 무료 칩을...',
        joinPools: 'P00LS에 가입하고 5번 스핀을...',
        inviteFriends: '친구 초대',
        completeDailyQuest: '일일 퀘스트 완료',
        shareOnSocial: '소셜 미디어에 공유',
        watchAd: '광고 시청',
        rateApp: '앱 평가하기',
        myCountry: '내 국가',
        myCity: '내 도시',
        myLeague: '내 리그',
        featured: '추천',
        capybaraNation: '카피바라 네이션',
        delphiTrade: '델파이 트레이드',
        capynationChallenges: '카피네이션 챌린지',
        tasksLeft: '개 작업 남음',
        new: '신규',
        southKorea: '대한민국',
        busan: '부산',
        goldLeague: '골드 리그',
        // 국가명
        unitedStates: '미국',
        china: '중국',
        japan: '일본',
        germany: '독일',
        unitedKingdom: '영국',
        india: '인도',
        france: '프랑스',
        canada: '캐나다',
        australia: '호주',
        singapore: '싱가포르',
        hongKong: '홍콩',
        uae: 'UAE',
        seoul: '서울',
        newYork: '뉴욕',
        tokyo: '도쿄',
        london: '런던',
        shanghai: '상하이',
        losAngeles: '로스앤젤레스',
        paris: '파리',
        sydney: '시드니',
        dubai: '두바이',
        mayorKim: '김시장',
        mayorJohnson: '존슨시장',
        mayorTanaka: '다나카시장',
        mayorSmith: '스미스시장',
        mayorWang: '왕시장',
        mayorGarcia: '가르시아시장',
        mayorDubois: '뒤부아시장',
        mayorWilson: '윌슨시장',
        mayorAlRashid: '알라시드시장',
        mayorLee: '이시장',
        player1: '플레이어1',
        player2: '플레이어2',
        player3: '플레이어3',
        player4: '플레이어4',
        player5: '플레이어5',
        player6: '플레이어6',
        player7: '플레이어7',
        player8: '플레이어8',
        player9: '플레이어9',
        player10: '플레이어10',
        // 지역명
        northAmerica: '북미',
        asia: '아시아',
        europe: '유럽',
        oceania: '오세아니아',
        // 도시명
        newYork: '뉴욕',
        tokyo: '도쿄',
        london: '런던',
        shanghai: '상하이',
        losAngeles: '로스앤젤레스',
        paris: '파리',
        seoul: '서울',
        sydney: '시드니',
        dubai: '두바이',
        // 리그명
        diamondLeague: '다이아몬드 리그',
        platinumLeague: '플래티넘 리그',
        silverLeague: '실버 리그',
        bronzeLeague: '브론즈 리그',
        ironLeague: '아이언 리그',
        copperLeague: '코퍼 리그',
        woodLeague: '우드 리그',
        stoneLeague: '스톤 리그',
        // 티어명
        master: '마스터',
        expert: '전문가',
        advanced: '고급',
        intermediate: '중급',
        beginner: '초급',
        novice: '신입',
        rookie: '루키',
        starter: '스타터',
        basic: '기본',
        // 코인 타입
        bitcoin: '비트코인',
        ethereum: '이더리움',
        diamond: '다이아몬드',
        trophy: '트로피',
        star: '스타',
        preparing: '이 페이지는 현재 준비 중입니다.',
        sturdyFinger: '튼튼한 손가락',
        mechanicalKeyboard: '기계식 키보드',
        gamingMouse: '게이밍 마우스',
        energyDrink: '에너지 드링크',
        clickPower500: '클릭 파워 +500',
        clickPower2500: '클릭 파워 +2,500',
        clickPower15000: '클릭 파워 +15,000',
        clickPower100k: '클릭 파워 +100K',
        notification: '알림',
        notificationSubtitle: 'The Ultimate Notification Hub',
        notificationDescription: 'Stay updated and never miss important events!',
        all: '전체',
        tasks: '작업',
        updates: '업데이트',
        reminders: '리마인더',
        tariffWarReminder: '관세 전쟁 리마인더',
        tariffWarDescription: '관세 전쟁 투표가 새로고침되었습니다! 리셋 전에 투표하고 경제를 형성하세요!',
        claimDailyRewards: '일일 보상 받기',
        claimDailyDescription: '일일 보상이 준비되었습니다! 보너스를 놓치지 마세요—지금 받으세요!',
        allianceVoteReminder: '동맹 투표 리마인더',
        allianceVoteDescription: '동맹 투표가 새로고침되었습니다! 리셋 전에 투표하고 경제를 형성하세요!',
        newChallenges: '새로운 도전 과제',
        newChallengesDescription: '당신의 국가가 도움이 필요합니다! 내일 수입을 늘리기 위해 오늘 할 수 있는 일을 확인하세요!',
        noNotifications: '알림이 없습니다',
        minutesAgo: '분 전',
        hoursAgo: '시간 전',
        daysAgo: '일 전'
      },
      en: {
        settings: 'Settings',
        general: 'General',
        language: 'Language',
        country: 'Country',
        southKorea: 'South Korea',
        sound: 'Sound',
        account: 'Account',
        userId: 'User ID',
        shareWithFriends: 'Share with Friends',
        home: 'Home',
        ranking: 'Ranking',
        totalProgress: 'Total Progress',
        myRanking: 'My Ranking',
        roulette: 'Roulette',
        checkin: 'Check-in',
        topCountries: 'TOP COUNTRIES',
        topCities: 'TOP CITIES',
        topMayors: 'TOP MAYORS',
        cityBoost: 'CITY BOOST',
        topBoostingPlayers: 'TOP BOOSTING PLAYERS',
        topBoostedCities: 'TOP BOOSTED CITIES',
        leagues: 'LEAGUES',
        bronze: 'Bronze',
        silver: 'Silver',
        gold: 'Gold',
        platinum: 'Platinum',
        diamond: 'Diamond',
        master: 'Master',
        shop: 'Shop',
        quest: 'Quest',
        invite: 'Invite',
        clickCount: 'Click Count',
        totalCoinBalance: 'Total Coin Balance',
        premiumCurrency: 'Premium Currency',
        dailyRewards: 'Daily Rewards',
        store: 'Store',
        spin: 'SPIN',
        tickets: 'Tickets',
        buy: 'Buy',
        claim: 'Claim',
        questTitle: 'Quest',
        inviteTitle: 'Invite Friends',
        inviteFriends: 'Invite friends!',
        inviteSubtitle: 'Both you and your friend will receive bonuses',
        inviteFriend: 'Invite a friend',
        inviteWithTelegram: 'Invite a friend with Telegram Premium',
        bonus1_5M: '+1.5M for you and your friend',
        bonus3M: '+3M for you and your friend',
        friendsList: 'List of your friends',
        noFriends: 'No friends invited yet',
        joined: 'Joined',
        invest: 'Invest',
        investSubtitle: 'Grow your wealth with smart investments',
        basicInvestment: 'Basic Investment',
        basicInvestmentDesc: 'Safe and steady returns',
        premiumInvestment: 'Premium Investment',
        premiumInvestmentDesc: 'Higher returns with moderate risk',
        vipInvestment: 'VIP Investment',
        vipInvestmentDesc: 'Maximum returns for VIP members',
        dailyReturn: 'Daily Return',
        minInvestment: 'Min Investment',
        currentInvestments: 'Current Investments',
        noInvestments: 'No active investments',
        invested: 'Invested',
        profit: 'Profit',
        task: 'Task',
        taskSubtitle: 'Complete tasks to earn rewards',
        progress: 'Progress',
        daily: 'Daily',
        weekly: 'Weekly',
        special: 'Special',
        noTasks: 'No tasks available',
        click100Times: 'Click 100 Times',
        click100TimesDesc: 'Click the main button 100 times',
        buyFirstItem: 'Buy First Item',
        buyFirstItemDesc: 'Purchase your first item from the shop',
        spinWheel5Times: 'Spin Wheel 5 Times',
        spinWheel5TimesDesc: 'Use the roulette wheel 5 times',
        claimDailyReward: 'Claim Daily Reward',
        claimDailyRewardDesc: 'Collect your daily check-in reward',
        inviteFriend: 'Invite a Friend',
        inviteFriendDesc: 'Invite a friend to join the game',
        dailyCombo: 'Daily combo',
        reward: 'Reward',
        timeLeft: 'Time left',
        skipFor: 'Skip for',
        tech: 'Tech',
        fun: 'Fun',
        web3: 'Web3',
        events: 'Events',
        hire: 'Hire',
        profitPerHour: 'Profit per hour',
        schools: 'Schools',
        learningForFuture: 'Learning for the future',
        freeInternet: 'Free Internet',
        connectWithoutLimits: 'Connect without limits',
        gamingCenter: 'Gaming Center',
        playAndEarn: 'Play and earn',
        cryptoMining: 'Crypto Mining',
        mineDigitalGold: 'Mine digital gold',
        nftGallery: 'NFT Gallery',
        collectAndTrade: 'Collect and trade',
        eventHall: 'Event Hall',
        hostAmazingEvents: 'Host amazing events',
        roaringKittenEducation: 'Roaring Kitten Education Minister',
        wiseCatOnceSaid: 'A wise cat once said...',
        pepeCulture: 'PeePee Culture Minister',
        frogsForCulture: 'Frogs for the culture',
        woojakCity: 'Woojak Guy City Minister',
        notBobButBuilder: 'He\'s not Bob, but he\'s a builder',
        wsbTrading: 'WSB Dude Trading Minister',
        expertlyNavigatingMarkets: 'Expertly navigating markets for profits',
        dogeMeme: 'Doge Meme Minister',
        muchWowVeryProfit: 'Much wow, very profit',
        elonMars: 'Elon Mars Minister',
        toTheMoonAndBeyond: 'To the moon and beyond',
        satoshiBitcoin: 'Satoshi Bitcoin Minister',
        digitalGoldCreator: 'Digital gold creator',
        vitalikEthereum: 'Vitalik Ethereum Minister',
        smartContractMaster: 'Smart contract master',
        cryptoPunk: 'CryptoPunk NFT Minister',
        originalNftLegend: 'Original NFT legend',
        defiYield: 'DeFi Yield Minister',
        yieldFarmingExpert: 'Yield farming expert',
        metaverseParty: 'Metaverse Party Minister',
        virtualWorldCelebration: 'Virtual world celebration',
        nftAuction: 'NFT Auction Minister',
        bidAndWinRare: 'Bid and win rare items',
        unlockNuclearPowerPlant: 'Unlock Nuclear Power Plant to Lvl 5',
        unlockBitcoinTreasury: 'Unlock Bitcoin Treasury to Lvl 8',
        unlockDefiProtocol: 'Unlock DeFi Protocol to Lvl 10',
        socialMedia: 'Social Media',
        taskList: 'Task List',
        telegram: 'Telegram',
        xTwitter: 'X',
        sendBoinkersToMoon: 'Send 3 Boinkers to the Moon and s...',
        joinPokergram: 'Join Pokergram & Grab your free ch...',
        joinPools: 'Join P00LS and play 5x spins on an...',
        inviteFriends: 'Invite Friends',
        completeDailyQuest: 'Complete Daily Quest',
        shareOnSocial: 'Share on Social Media',
        watchAd: 'Watch Advertisement',
        rateApp: 'Rate the App',
        myCountry: 'My Country',
        myCity: 'My City',
        myLeague: 'My League',
        featured: 'Featured',
        capybaraNation: 'Capybara Nation',
        delphiTrade: 'Delphi trade',
        capynationChallenges: 'Capynation Challenges',
        tasksLeft: 'Tasks Left',
        new: 'New',
        southKorea: 'South Korea',
        busan: 'Busan',
        goldLeague: 'Gold League',
        // 국가명
        unitedStates: 'United States',
        china: 'China',
        japan: 'Japan',
        germany: 'Germany',
        unitedKingdom: 'United Kingdom',
        india: 'India',
        france: 'France',
        canada: 'Canada',
        australia: 'Australia',
        singapore: 'Singapore',
        hongKong: 'Hong Kong',
        uae: 'UAE',
        seoul: 'Seoul',
        newYork: 'New York',
        tokyo: 'Tokyo',
        london: 'London',
        shanghai: 'Shanghai',
        losAngeles: 'Los Angeles',
        paris: 'Paris',
        sydney: 'Sydney',
        dubai: 'Dubai',
        mayorKim: 'Mayor Kim',
        mayorJohnson: 'Mayor Johnson',
        mayorTanaka: 'Mayor Tanaka',
        mayorSmith: 'Mayor Smith',
        mayorWang: 'Mayor Wang',
        mayorGarcia: 'Mayor Garcia',
        mayorDubois: 'Mayor Dubois',
        mayorWilson: 'Mayor Wilson',
        mayorAlRashid: 'Mayor Al-Rashid',
        mayorLee: 'Mayor Lee',
        player1: 'Player1',
        player2: 'Player2',
        player3: 'Player3',
        player4: 'Player4',
        player5: 'Player5',
        player6: 'Player6',
        player7: 'Player7',
        player8: 'Player8',
        player9: 'Player9',
        player10: 'Player10',
        // 지역명
        northAmerica: 'North America',
        asia: 'Asia',
        europe: 'Europe',
        oceania: 'Oceania',
        // 도시명
        newYork: 'New York',
        tokyo: 'Tokyo',
        london: 'London',
        shanghai: 'Shanghai',
        losAngeles: 'Los Angeles',
        paris: 'Paris',
        seoul: 'Seoul',
        sydney: 'Sydney',
        dubai: 'Dubai',
        // 리그명
        diamondLeague: 'Diamond League',
        platinumLeague: 'Platinum League',
        silverLeague: 'Silver League',
        bronzeLeague: 'Bronze League',
        ironLeague: 'Iron League',
        copperLeague: 'Copper League',
        woodLeague: 'Wood League',
        stoneLeague: 'Stone League',
        // 티어명
        master: 'Master',
        expert: 'Expert',
        advanced: 'Advanced',
        intermediate: 'Intermediate',
        beginner: 'Beginner',
        novice: 'Novice',
        rookie: 'Rookie',
        starter: 'Starter',
        basic: 'Basic',
        // 코인 타입
        bitcoin: 'Bitcoin',
        ethereum: 'Ethereum',
        diamond: 'Diamond',
        trophy: 'Trophy',
        star: 'Star',
        preparing: 'This page is currently under preparation.',
        sturdyFinger: 'Sturdy Finger',
        mechanicalKeyboard: 'Mechanical Keyboard',
        gamingMouse: 'Gaming Mouse',
        energyDrink: 'Energy Drink',
        clickPower500: 'Click Power +500',
        clickPower2500: 'Click Power +2,500',
        clickPower15000: 'Click Power +15,000',
        clickPower100k: 'Click Power +100K',
        notification: 'Notification',
        notificationSubtitle: 'The Ultimate Notification Hub',
        notificationDescription: 'Stay updated and never miss important events!',
        all: 'All',
        tasks: 'Tasks',
        updates: 'Updates',
        reminders: 'Reminders',
        tariffWarReminder: 'Tariff War Reminder',
        tariffWarDescription: 'Tariff War Voting has been refreshed! Cast your vote before the reset and shape the economy!',
        claimDailyRewards: 'Claim Daily Rewards',
        claimDailyDescription: 'Daily Rewards are ready! Don\'t leave your bonuses behind—claim now!',
        allianceVoteReminder: 'Alliance Vote Reminder',
        allianceVoteDescription: 'Alliance Voting has been refreshed! Cast your vote before the reset and shape the economy!',
        newChallenges: 'New Capynation Challenges',
        newChallengesDescription: 'Your nation requires your help! Check out what you can do today to boost your income tomorrow!',
        noNotifications: 'No notifications',
        minutesAgo: 'm ago',
        hoursAgo: 'h ago',
        daysAgo: 'd ago'
      }
    }

    const t = (key) => {
      return translations[currentLanguage.value][key] || key
    }

    // ------------------ 계산된 속성 (Computed) ------------------
    const formatNumber = (num) => {
      if (num < 1e6) return num.toLocaleString()
      if (num >= 1e6 && num < 1e9) return (num / 1e6).toFixed(2).replace(/\.00$/, '') + 'M'
      if (num >= 1e9 && num < 1e12) return (num / 1e9).toFixed(2).replace(/\.00$/, '') + 'B'
      if (num >= 1e12 && num < 1e15) return (num / 1e12).toFixed(2).replace(/\.00$/, '') + 'T'
      if (num >= 1e15) return (num / 1e15).toFixed(2).replace(/\.00$/, '') + 'Q'
      return num.toLocaleString()
    }

    const formattedScore = computed(() => formatNumber(score.value))
    const formattedPremiumCurrency = computed(() => formatNumber(premiumCurrency.value))

    const rouletteStyle = computed(() => {
      const segs = roulettePrizes.value.length
      const angle = 360 / segs
      const grads = roulettePrizes.value.map((p, i) => 
        `${p.color} ${i * angle}deg ${(i + 1) * angle}deg`
      ).join(', ')
      return {
        transform: `rotate(${rouletteRotation.value}deg)`,
        background: `conic-gradient(${grads})`
      }
    })

    // 현재 페이지에 따라 어떤 컴포넌트를 보여줄지 결정
    const activeComponent = computed(() => {
      const pageComponents = {
        home: 'HomePage',
        ranking: 'RankingPage',
        topCountries: 'TopCountriesPage',
        cityBoost: 'CityBoostPage',
        leagues: 'LeaguesPage',
        roulette: 'RoulettePage',
        checkin: 'CheckinPage',
        shop: 'ShopPage',
        settings: 'SettingsPage',
        quest: 'PlaceholderPage',
        invest: 'InvestPage',
        task: 'TaskPage',
        invite: 'InvitePage',
        notification: 'NotificationPage'
      }
      return pageComponents[currentPage.value] || 'HomePage'
    })

    // 현재 페이지 컴포넌트에 전달할 props
    const activeComponentProps = computed(() => {
      switch (currentPage.value) {
        case 'home':
          return {
            score: formattedScore.value,
            premiumCurrency: formattedPremiumCurrency.value,
            floatingNumbers: floatingNumbers.value,
            ripples: ripples.value,
            speechBubbles: speechBubbles.value,
            isPressing: isPressing.value,
            t: t
          }
        case 'ranking':
          return {
            rankings: rankings.value,
            formatNumber: formatNumber,
            t: t
          }
        case 'roulette':
          return {
            roulettePrizes: roulettePrizes.value,
            rouletteStyle: rouletteStyle.value,
            isSpinning: isSpinning.value,
            spinTickets: spinTickets.value,
            t: t
          }
        case 'checkin':
          return {
            dailyRewards: dailyRewards.value,
            rewardCardClass: rewardCardClass,
            t: t
          }
        case 'shop':
          return {
            shopItems: shopItems.value,
            score: score.value,
            formatNumber: formatNumber,
            t: t
          }
        case 'settings':
          return {
            soundEnabled: soundEnabled.value,
            userId: userId.value,
            currentLanguage: currentLanguage.value,
            t: t
          }
        case 'topCountries':
          return { formatNumber: formatNumber, t: t }
        case 'cityBoost':
          return { formatNumber: formatNumber, t: t }
        case 'leagues':
          return { formatNumber: formatNumber, t: t }
        case 'quest':
          return { pageTitle: t('questTitle'), t: t }
        case 'invest':
          return { t: t }
        case 'task':
          return { t: t }
        case 'invite':
          return { t: t }
        case 'notification':
          return { t: t }
        default:
          return {}
      }
    })

    // ------------------ 메소드 (Methods) ------------------
    const showToast = (message) => {
      toast.value = { show: true, message }
      setTimeout(() => {
        toast.value.show = false
      }, 2000)
    }

    const rewardCardClass = (reward) => [
      'bg-indigo-900/80',
      'p-2',
      'rounded-xl',
      'flex',
      'flex-col',
      'items-center',
      'text-center',
      'h-28',
      'justify-around',
      'transition-transform',
      'duration-200',
      {
        'bg-gradient-to-br from-violet-500 to-indigo-600 shadow-lg shadow-indigo-500/30 cursor-pointer hover:scale-105 active:scale-95': reward.status === 'claimable',
        'opacity-50': reward.status === 'claimed'
      }
    ]

    const claimReward = (reward) => {
      if (reward.status !== 'claimable') return
      reward.status = 'claimed'
      audioService.play('coin') // 보상 획득 사운드
      
      let msg
      if (reward.type === 'coin') {
        const val = parseInt(reward.amount.replace('M', '')) * 1e6
        score.value += val
        msg = `+${reward.amount} 포인트를 획득했습니다!`
      } else if (reward.description?.includes('Wheel Spin')) {
        const val = parseInt(reward.amount) || 1
        spinTickets.value += val
        msg = `+${val} 룰렛 이용권 획득!`
      } else {
        msg = `"${reward.description || reward.amount}" 아이템 획득!`
      }
      showToast(msg)
      const today = new Date().toISOString().split('T')[0]
      localStorage.setItem('checkInStreak', reward.day)
      localStorage.setItem('lastClaimedDate', today)
    }


    const spinWheel = () => {
      if (isSpinning.value || spinTickets.value <= 0) return
      isSpinning.value = true
      spinTickets.value--
      audioService.play('roulette') // 룰렛 스핀 사운드
      
      const segs = roulettePrizes.value.length
      const angle = 360 / segs
      const targetIdx = Math.floor(Math.random() * segs)
      const offset = Math.random() * (angle - 4) + 2
      const targetRot = 360 - (targetIdx * angle) - offset
      rouletteRotation.value += (5 * 360 + targetRot)
      
      setTimeout(() => {
        const prize = roulettePrizes.value[targetIdx]
        let msg
        switch (prize.type) {
          case 'coin':
            score.value += prize.value
            audioService.play('coin') // 코인 획득 사운드
            msg = `${formatNumber(prize.value)} 포인트를 획득!`
            break
          case 'premium':
            premiumCurrency.value += prize.value
            audioService.play('win') // 승리 사운드
            msg = `유료 재화 ${prize.value}개 획득!`
            break
          case 'multiplier':
            score.value *= prize.value
            audioService.play('levelUp') // 레벨업 사운드
            msg = `모든 포인트가 ${prize.value}배!`
            break
          case 'nothing':
            audioService.play('lose') // 실패 사운드
            msg = '아쉽지만, 꽝입니다!'
            break
        }
        showToast(msg)
        isSpinning.value = false
      }, 5000)
    }

    const buyItem = (item) => {
      if (score.value >= item.cost) {
        score.value -= item.cost
        clickPower.value += item.powerIncrease
        audioService.play('purchase') // 구매 사운드
        showToast(currentLanguage.value === 'ko' ? `${t(item.nameKey)} 구매 완료!` : `${t(item.nameKey)} purchased!`)
        item.cost = Math.floor(item.cost * 1.2)
      } else {
        audioService.play('lose') // 실패 사운드
        showToast(currentLanguage.value === 'ko' ? '포인트가 부족합니다!' : 'Insufficient points!')
      }
    }

    const manualClick = (event) => {
      // 클릭 사운드 재생
      audioService.play('click')
      
      score.value += clickPower.value
      const btn = event.currentTarget
      const rect = btn.getBoundingClientRect()
      const x = event.clientX - rect.left
      const y = event.clientY - rect.top
      
      ripples.value.push({
        id: Date.now(),
        top: `${y}px`,
        left: `${x}px`
      })
      setTimeout(() => {
        ripples.value.shift()
      }, 700)
      
      clickCombo.value++
      // 10콤보 이펙트는 제거 (앱 시작 시에만 실행)
      
      floatingNumbers.value.push({
        id: Date.now() + Math.random(),
        value: clickPower.value,
        top: `${y - 30}px`,
        left: `${x - 25}px`
      })
      setTimeout(() => {
        floatingNumbers.value.shift()
      }, 1200)
      
      const texts = ['냐옹', '냥!', '캬악!', '냐냥!']
      speechBubbles.value.push({
        id: Date.now() + Math.random(),
        text: texts[Math.floor(Math.random() * texts.length)],
        style: {
          top: `calc(50% - ${80 + Math.random() * 40}px)`,
          left: `calc(50% + ${60 + Math.random() * 20}px)`
        }
      })
      setTimeout(() => {
        speechBubbles.value.shift()
      }, 1400)
    }

    const initializeCheckIn = () => {
      const streak = parseInt(localStorage.getItem('checkInStreak') || '0', 10)
      const lastDate = localStorage.getItem('lastClaimedDate')
      const today = new Date().toISOString().split('T')[0]
      
      dailyRewards.value.forEach(r => {
        r.status = r.day <= streak ? 'claimed' : 'upcoming'
      })
      
      if (lastDate !== today && streak < dailyRewards.value.length) {
        const next = dailyRewards.value.find(r => r.day === streak + 1)
        if (next) next.status = 'claimable'
      }
    }

    const copyUserId = () => {
      const input = document.createElement('input')
      input.value = userId.value
      document.body.appendChild(input)
      input.select()
      document.execCommand('copy')
      document.body.removeChild(input)
      showToast(currentLanguage.value === 'ko' ? '유저 ID가 복사되었습니다.' : 'User ID copied.')
    }

    const changeLanguage = (lang) => {
      currentLanguage.value = lang
      localStorage.setItem('language', lang)
      audioService.play('button') // 버튼 클릭 사운드
      showToast(lang === 'ko' ? '언어가 변경되었습니다.' : 'Language changed.')
    }

    const handleNotificationClick = (notification) => {
      // 알림 클릭 시 처리 로직
      console.log('Notification clicked:', notification)
      showToast(currentLanguage.value === 'ko' ? '알림을 확인했습니다.' : 'Notification checked.')
    }

    const handleInviteFriend = (type) => {
      console.log('Invite friend:', type)
      showToast(currentLanguage.value === 'ko' ? '친구 초대 링크가 생성되었습니다.' : 'Invite link generated.')
    }

    const refreshFriends = () => {
      console.log('Refresh friends')
      showToast(currentLanguage.value === 'ko' ? '친구 목록을 새로고침했습니다.' : 'Friends list refreshed.')
    }

    const copyInviteLink = () => {
      const inviteLink = `https://example.com/invite/${userId.value}`
      navigator.clipboard.writeText(inviteLink).then(() => {
        showToast(currentLanguage.value === 'ko' ? '초대 링크가 복사되었습니다.' : 'Invite link copied.')
      }).catch(() => {
        showToast(currentLanguage.value === 'ko' ? '복사에 실패했습니다.' : 'Copy failed.')
      })
    }

    const handleInvest = (type) => {
      console.log('Invest:', type)
      showToast(currentLanguage.value === 'ko' ? '투자가 시작되었습니다.' : 'Investment started.')
    }

    const handleTaskClick = (task) => {
      console.log('Task clicked:', task)
      showToast(currentLanguage.value === 'ko' ? '태스크를 확인했습니다.' : 'Task checked.')
    }

    const handleTaskToggle = (task) => {
      console.log('Task toggled:', task)
      if (task.completed) {
        audioService.play('levelUp') // 태스크 완료 사운드
        showToast(currentLanguage.value === 'ko' ? '태스크를 완료했습니다!' : 'Task completed!')
      }
    }

    const updateSoundEnabled = (enabled) => {
      soundEnabled.value = enabled
      audioService.setEnabled(enabled)
      localStorage.setItem('soundEnabled', enabled.toString())
    }

    // ------------------ 라이프사이클 훅 (Lifecycle) ------------------
    onMounted(() => {
      initializeCheckIn()
      userId.value = String(Math.floor(10000000 + Math.random() * 90000000))
      const savedLanguage = localStorage.getItem('language')
      if (savedLanguage) {
        currentLanguage.value = savedLanguage
      }
      
      // 사운드 설정 로드
      const savedSoundEnabled = localStorage.getItem('soundEnabled')
      if (savedSoundEnabled !== null) {
        soundEnabled.value = savedSoundEnabled === 'true'
        audioService.setEnabled(soundEnabled.value)
      }
      
      // 첫 화면 진입 시 코인 획득 사운드 재생
      setTimeout(() => {
        audioService.play('coin')
      }, 500) // 0.5초 후 재생 (페이지 로딩 완료 후)
    })

    // 화면 변경 감지
    const handlePageChange = (newPage) => {
      currentPage.value = newPage
      // 화면 변경 시 코인 사운드 재생
      audioService.play('coin')
    }

    return {
      currentPage,
      score,
      clickPower,
      premiumCurrency,
      isPressing,
      floatingNumbers,
      ripples,
      speechBubbles,
      rankings,
      dailyRewards,
      toast,
      soundEnabled,
      userId,
      spinTickets,
      isSpinning,
      rouletteRotation,
      shopItems,
      formattedScore,
      formattedPremiumCurrency,
      rouletteStyle,
      activeComponent,
      activeComponentProps,
      manualClick,
      claimReward,
      spinWheel,
      buyItem,
      copyUserId,
      rewardCardClass,
      showToast,
      currentLanguage,
      t,
      changeLanguage,
      handleNotificationClick,
      handleInviteFriend,
      refreshFriends,
      copyInviteLink,
      handleInvest,
      handleTaskClick,
      handleTaskToggle,
      updateSoundEnabled,
      handlePageChange
    }
  }
}
</script>

<style>
@import './assets/styles.css';
</style>
