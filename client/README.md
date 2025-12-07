# 🎰 LOTTO 1145

> **실시간 멀티플레이어 로또 게임 플랫폼**  
> AXIOS, Socket.IO 기반 라이브 추첨 시스템으로 즐기는 로또 프로젝트

[![Deploy](https://img.shields.io/badge/Deploy-Vercel-black?style=for-the-badge&logo=vercel)](https://lotto1145-front.vercel.app)
[![React](https://img.shields.io/badge/React-19.2.0-61DAFB?style=for-the-badge&logo=react)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-7.2.2-646CFF?style=for-the-badge&logo=vite)](https://vitejs.dev/)

---

## 🎯 핵심 기능

### 🎲 자동 로또 번호 생성
- **원클릭 생성** - 버튼 하나로 6개의 랜덤 로또 번호 생성
- **5초 쿨타임** - 스피너 애니메이션과 함께 중복 생성 방지
- **즉시 히스토리 저장** - 생성된 번호는 자동으로 히스토리에 기록

### ⏰ 2분 단위 자동 추첨 시스템
- **실시간 카운트다운** - 다음 추첨까지 남은 시간 표시 (MM:SS)
- **자동 추첨 발표** - 2분마다 서버에서 자동으로 당첨번호 추첨
- **Socket 실시간 전파** - 모든 참가자에게 동시에 결과 전송
- **최고득점자 알림** - 해당 회차 최고득점자 실시간 토스트 알림

### 👥 사용자 시스템
- **UUID 자동 생성** - 로컬스토리지 기반 영구 사용자 식별
- **닉네임 설정/변경** - 최대 7자, 중복 검증, 툴팁 안내
- **랭킹 시스템** - MaxScore 기준 실시간 순위 (🥇🥈🥉 메달 표시)
- **내 순위 확인** - 랭킹 모달 하단에 내 위치 고정 표시

### 📊 대시보드 & 히스토리
- **3단 레이어 구조**
  - 상단: 다음 추첨 타이머 & 현재 회차 정보
  - 중단: 내가 생성한 최신 로또 번호
  - 하단: 생성 버튼 & 히스토리 뷰
- **드래그 스크롤** - 마우스 드래그로 히스토리 탐색
- **컬러 코딩 볼** - 번호 구간별 5가지 색상 (1-10: 노랑, 11-20: 파랑 등)

---

## 🏗️ 아키텍처 & 기술 스택

### **Frontend Core**
```
React 19.2.0 + Vite 7.2.2 + Redux Toolkit 2.11.0
```
- **React 19** - 최신 Concurrent 기능 지원
- **Vite** - 빠른 HMR 및 최적화된 빌드
- **Redux Toolkit** - 예측 가능한 전역 상태 관리

### **상태 관리 설계 (Redux Slices)**

#### 1️⃣ **lottoSlice** - 사용자 로또 데이터
```javascript
State: {
  newLottoList: {},      // 최신 생성한 로또 (No, Seq, UUID, AnsCount, Num1-6)
  historyLottoList: []   // 생성 히스토리 (Footer에서 표시)
}

Actions:
- setNewLottoList()      // 새 로또 생성 시 최신 데이터 저장
- setHistoryLottoList()  // 히스토리 앞에 추가 (unshift 방식)
```

#### 2️⃣ **seqLottoSlice** - 현재 진행중인 회차 정보
```javascript
State: {
  No: null,              // 회차 번호
  Seq: null,             // 추첨 시간 (YYYY-MM-DD HH:mm)
  seqLottoList: {}       // 당첨 번호 (Num1-6)
}

Actions:
- setSeqLottoInfo()      // Socket 'updateNewSeq' 이벤트로 업데이트
```

#### 3️⃣ **userSlice** - 현재 사용자 정보
```javascript
State: {
  No: null,              // DB PK
  UUID: null,            // 로컬스토리지 고유ID
  MaxScore: null,        // 최고 득점 (랭킹 기준)
  Nickname: null,        // 닉네임 (nullable)
  status: 'idle'         // API 로딩 상태
}

AsyncThunk:
- getUserSlice()         // GET /api/users/getUser
```

#### 4️⃣ **userListSlice** - 전체 랭킹 데이터
```javascript
State: {
  userListForRank: [],   // 전체 유저 랭킹 (MaxScore DESC)
  status: 'idle',
  updateAt: null
}

AsyncThunk:
- getUserListSlice()     // GET /api/users/getMaxScore
```

### **실시간 통신 (Socket.IO)**
```javascript
// services/api/socket.js
const socket = io(baseURL, {
  withCredentials: true,
  transports: ['websocket']
});

// App.jsx에서 구독하는 이벤트
socket.on('updateNewSeq', (data) => {
  // 새 회차 정보 수신 → seqLottoSlice 업데이트
});

socket.on('curSeqHighScoreUser', (data) => {
  // 최고득점자 발표 → 토스트 알림
});
```

### **HTTP 통신 (Axios)**
```javascript
// services/api/index.js
baseURL: import.meta.env.VITE_API_BASE_URL
withCredentials: true  // 쿠키 기반 세션 관리

// API 엔드포인트
GET  /api/users/init              // 사용자 초기화
GET  /api/users/getUser           // 사용자 정보 조회
GET  /api/users/getMaxScore       // 랭킹 조회
POST /api/users/updateNickname    // 닉네임 변경
GET  /api/user-lotto/create       // 로또 번호 생성
GET  /api/user-lotto/user/mylist  // 내 히스토리 조회
```

### **로컬 저장소 (LocalStorage)**
```javascript
// services/storage/userStorage.js
H_U_I_1 = UUID v4  // 영구 사용자 식별자
```

### **UI/UX 라이브러리**
```javascript
react-toastify 11.0.5    // 토스트 알림 (성공/에러/정보)
dayjs 1.11.19            // 날짜 포맷팅 (YYYY-MM-DD HH:mm)
uuid 13.0.0              // UUID v4 생성
```

---

## 📁 프로젝트 구조 분석

```
src/
├── App.jsx                         # 🔴 루트 컴포넌트 (초기화 로직)
│   ├── useEffect (초기화)
│   │   ├── loadUser()             # UUID 로드/생성
│   │   ├── initUser(uuid)         # 서버에 UUID 등록
│   │   ├── getUserSlice()         # 사용자 정보 Redux에 저장
│   │   └── getUserLottoList()     # 히스토리 로드
│   ├── useEffect (Socket 구독)
│   │   ├── socket.on('updateNewSeq')
│   │   └── socket.on('curSeqHighScoreUser')
│   └── <Header /> <Dashboard /> <Footer />
│
├── main.jsx                        # Redux Provider 래핑
│
├── components/
│   ├── Header.jsx                  # 메뉴바 렌더링
│   │   └── <SideMenubar />
│   │
│   ├── Dashboard.jsx               # 메인 콘텐츠 영역
│   │   ├── <DashboardUpContent />  # 상단: 타이머 & 회차정보
│   │   ├── <LottoCircle />         # 중단: 내 최신 번호
│   │   └── {children}              # 하단: <LottoButton />
│   │
│   ├── DashboardUpContent.jsx      # 🔴 타이머 & 회차 표시
│   │   ├── Redux: seqLotto.No, Seq, seqLottoList
│   │   ├── <Timer />               # 2분 카운트다운
│   │   └── <LottoCircle />         # 당첨번호 표시
│   │
│   ├── Timer.jsx                   # ⏰ 2분 단위 카운트다운
│   │   ├── calculateTimeLeft()    # 다음 120초 마크까지 계산
│   │   └── setInterval(1초)       # 매초 업데이트
│   │
│   ├── LottoButton.jsx             # 🔴 번호 생성 버튼
│   │   ├── buttonHandler()
│   │   │   ├── getNewLotto()      # API: 새 번호 생성
│   │   │   ├── setNewLottoList()
│   │   │   ├── setHistoryLottoList()
│   │   │   └── 5초 쿨타임 타이머
│   │   └── spinner 애니메이션
│   │
│   ├── LottoCircle.jsx             # 🎨 로또 공 렌더링
│   │   └── lotto-ball-1~5 클래스  # 번호 구간별 색상
│   │
│   ├── Footer.jsx                  # 📜 히스토리 뷰
│   │   ├── Redux: lotto.historyLottoList
│   │   ├── 드래그 스크롤 (useEffect)
│   │   └── map → <LottoCircle />
│   │
│   ├── SideMenubar.jsx             # 메뉴 토글
│   │   ├── state: toggleMenubar
│   │   ├── onClick → Ranking/Nickname 모달
│   │   └── 오버레이 클릭 닫기
│   │
│   └── modals/
│       ├── Modal.jsx               # 범용 모달 컴포넌트
│       │   ├── Props: isOpen, onClose, onOkPost, onOkGet
│       │   └── 헤더/바디/푸터 구조
│       │
│       ├── Ranking.jsx             # 🏆 랭킹 모달
│       │   ├── getUserListSlice() # Redux AsyncThunk
│       │   ├── Top 50 테이블
│       │   ├── 내 순위 고정 표시
│       │   └── 메달 이모지 (🥇🥈🥉)
│       │
│       └── Nickname.jsx            # ✏️ 닉네임 변경 모달
│           ├── updateUserNickname() # API: POST
│           ├── maxLength={7}
│           ├── 툴팁 애니메이션
│           └── 중복 검증 에러 처리
│
└── services/
    ├── api/
    │   ├── index.js                # Axios 인스턴스
    │   │   ├── baseURL: VITE_API_BASE_URL
    │   │   ├── withCredentials: true
    │   │   └── interceptors (요청/응답)
    │   │
    │   ├── socket.js               # Socket.IO 클라이언트
    │   ├── lotto.js                # 로또 API
    │   │   ├── getNewLotto()
    │   │   └── getUserLottoList()
    │   │
    │   └── user.js                 # 사용자 API
    │       ├── initUser(id)
    │       ├── getUser()
    │       ├── getUserWithMaxSource()
    │       └── updateUserNickname(nickname)
    │
    ├── hooks/
    │   └── useToast.js             # 토스트 알림 훅
    │       └── showToast(type, message)
    │
    ├── storage/
    │   └── userStorage.js          # LocalStorage 관리
    │       ├── createUser()        # UUID v4 생성
    │       └── loadUser()          # UUID 로드
    │
    └── store/
        ├── store.js                # Redux 스토어 설정
        ├── lottoSlice.js           # 내 로또 상태
        ├── seqLottoSlice.js        # 현재 회차 상태
        ├── userSlice.js            # 내 정보 상태
        └── userListSlice.js        # 랭킹 상태
```

---

## 🔄 실제 서비스 플로우 (소스 기반)

### 1️⃣ **앱 초기화 플로우** (App.jsx)
```
1. useEffect 첫 실행 (initRef 가드)
2. loadUser() → H_U_I_1 로드 (없으면 UUID 생성)
3. initUser(uuid) → POST /api/users/init
4. getUserSlice() → GET /api/users/getUser → Redux 저장
5. getUserLottoList() → GET /api/user-lotto/user/mylist → historyLottoList 초기화
6. Socket 이벤트 구독 시작
```

### 2️⃣ **로또 번호 생성 플로우** (LottoButton.jsx)
```
사용자 클릭
   ↓
buttonCreateLottoRef.current === false 확인 (중복 방지)
   ↓
setBtnState(true) → 스피너 시작
   ↓
getNewLotto() → GET /api/user-lotto/create
   ↓
dispatch(setNewLottoList(res.data))  // Dashboard에 표시
   ↓
dispatch(setHistoryLottoList([res.data]))  // Footer에 추가
   ↓
5초 카운트다운 타이머 시작 (setBtnTimer)
   ↓
setTimeout 5초 → buttonCreateLottoRef = false (재활성화)
```

### 3️⃣ **2분 자동 추첨 플로우** (Timer.jsx + Socket)
```
Timer.jsx: setInterval (1초마다)
   ↓
calculateTimeLeft() → 다음 120초 마크까지 계산
   ↓
timeLeft === 0 도달
   ↓
서버: 자동 추첨 실행 (2분마다)
   ↓
Socket: 'updateNewSeq' 이벤트 emit
   ↓
App.jsx: socket.on('updateNewSeq')
   ↓
dispatch(setSeqLottoInfo(data))
   ↓
DashboardUpContent: Redux 업데이트 감지
   ↓
회차 번호(No), 시간(Seq), 당첨번호(seqLottoList) 표시
   ↓
Socket: 'curSeqHighScoreUser' 이벤트 emit (최고득점자)
   ↓
showToast("새로운 회차 최고득점 {score}! {userList}")
```

### 4️⃣ **랭킹 조회 플로우** (Ranking.jsx)
```
SideMenubar: "랭킹보기" 클릭
   ↓
setShowRanking(true)
   ↓
<Ranking onClose={...} /> 렌더링
   ↓
useEffect: dispatch(getUserListSlice())
   ↓
AsyncThunk: GET /api/users/getMaxScore
   ↓
Redux: userList.userListForRank 업데이트
   ↓
map → Top 50 + 메달 이모지
   ↓
findIndex(UUID) → 내 순위 계산 (하단 고정 표시)
```

### 5️⃣ **닉네임 변경 플로우** (Nickname.jsx)
```
SideMenubar: "닉네임변경" 클릭
   ↓
<Nickname onClose={...} /> 렌더링
   ↓
useEffect: 현재 닉네임 로드 (userNickname)
   ↓
사용자 입력: onChange → setNewNickname
   ↓
onKeyDown: 7글자 초과 시 툴팁 표시
   ↓
확인 버튼: okPostHandler()
   ↓
updateUserNickname(newNickname) → POST /api/users/updateNickname
   ↓
Success: dispatch(setNickname) + showToast("성공")
   ↓
Error: 중복 / UUID 없음 처리 → showToast("error")
```

### 6️⃣ **히스토리 드래그 스크롤** (Footer.jsx)
```
useEffect: 마우스 이벤트 리스너 등록
   ↓
mousedown → isDown = true, startY 기록
   ↓
mousemove → isDown일 때만 스크롤
   ↓
scrollTop = scrollTop - (y - startY) * 0.7
   ↓
mouseup / mouseleave → isDown = false
```

---

## 🎨 UI 디자인 시스템

### **로또 볼 색상 코딩**
```css
.lotto-ball-1  /* 1-10:  노랑 #f6c94b */
.lotto-ball-2  /* 11-20: 파랑 #4aa0ff */
.lotto-ball-3  /* 21-30: 빨강 #ff6b6b */
.lotto-ball-4  /* 31-40: 회색 #bdbdbd */
.lotto-ball-5  /* 41-45: 초록 #58d68d */
```

### **컴포넌트 스타일링**
- **Dashboard**: 3단 레이어 (타이머/번호/버튼)
- **Timer**: 3rem 볼드, 콜론(:) 연하게
- **LottoButton**: 스피너 애니메이션 (spin 1.5s)
- **Modal**: Fade-in 0.2s, 오버레이 rgba(0,0,0,0.5)
- **Ranking**: 스크롤 숨김, 내 순위 하이라이트

---

## 🚀 시작하기

### **환경 변수 설정**
```bash
# .env
VITE_API_BASE_URL=http://localhost:3000  # 백엔드 서버 주소
```

### **설치 및 실행**
```bash
# 의존성 설치
npm install

# 개발 서버 (http://localhost:5173)
npm run dev

# 프로덕션 빌드
npm run build

# 빌드 미리보기
npm run preview
```

---

## 📦 핵심 의존성

| 패키지 | 버전 | 역할 |
|--------|------|------|
| react | 19.2.0 | UI 프레임워크 |
| @reduxjs/toolkit | 2.11.0 | 상태 관리 |
| react-redux | 9.2.0 | React-Redux 바인딩 |
| socket.io-client | 4.8.1 | 실시간 통신 |
| axios | 1.13.2 | HTTP 클라이언트 |
| dayjs | 1.11.19 | 날짜/시간 관리 |
| react-toastify | 11.0.5 | 토스트 알림 |
| uuid | 13.0.0 | UUID 생성 |
| vite | 7.2.2 | 빌드 도구 |

---

## 🔐 API 명세

### **사용자 API**
```
POST /api/users/init              # UUID로 사용자 초기화
GET  /api/users/getUser           # 현재 사용자 정보 조회
GET  /api/users/getMaxScore       # 전체 랭킹 조회 (MaxScore DESC)
POST /api/users/updateNickname    # 닉네임 변경 (body: {nickname})
```

### **로또 API**
```
GET /api/user-lotto/create        # 새 로또 번호 생성 (6개 랜덤)
GET /api/user-lotto/user/mylist   # 내 로또 히스토리 조회
```

### **Socket 이벤트**
```javascript
// 클라이언트 수신
'updateNewSeq'          // 새 회차 정보 (No, Seq, Num1-6)
'curSeqHighScoreUser'   // 최고득점자 목록 (UUID[], AnsCount)
```

---

## ✨ 주요 기술적 특징

✅ **UUID 기반 영구 세션** - 브라우저 재접속 시에도 데이터 유지  
✅ **2분 자동 추첨** - Timer 컴포넌트 + 서버 스케줄러 동기화  
✅ **Redux AsyncThunk** - 비동기 API 호출 상태 관리  
✅ **Socket.IO 실시간 업데이트** - 모든 클라이언트 동시 반영  
✅ **5초 쿨타임 시스템** - useRef로 중복 클릭 방지  
✅ **드래그 스크롤 UX** - 마우스 드래그로 히스토리 탐색  
✅ **중복 닉네임 검증** - 서버 에러 핸들링 + 사용자 피드백  
✅ **반응형 토스트** - 성공/에러/정보 3가지 타입 지원

---

## 👨‍💻 개발 정보

**GitHub**: [scv-c/lotto1145_front](https://github.com/scv-c/lotto1145_front)  
**Live Demo**: [lotto1145-front.vercel.app](https://lotto1145-front.vercel.app)

---

<div align="center">

**🎲 행운을 빕니다! 🍀**

Made with ❤️ by scv-c

</div>
