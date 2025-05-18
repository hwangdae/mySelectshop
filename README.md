## 🛍️ MySelectshop

내 주변의 쇼핑몰을 탐색하고 리뷰를 남길 수 있는 플랫폼입니다.<br>위치 기반 서비스를 통해 사용자 주변의 셀렉트샵을 찾아보고, 리뷰를 남기거나 다른 사람들의 리뷰를 확인할 수 있습니다.


## 🌍 배포 주소 (Deployment)

<li>https://myselectshop.shop</li>

## 🔧 설치 및 실행 (Installation & Run)
```bash
git clone https://github.com/hwangdae/mySelectshop.git

cd mySelectshop

npm install or yarn install

npm run dev or yarn dev
```

## .env .example
```env
# 🔑 Kakao Maps API
NEXT_PUBLIC_KAKAO_APP_JS_KEY=your-kakao-js-key

# 🔐 NextAuth
NEXTAUTH_SECRET=your-nextauth-secret
NEXTAUTH_URL=http://localhost:3000

# 🔐 JWT
JWT_SECRET=your-jwt-secret

# 🗄️ PostgreSQL (Prisma 사용)
DATABASE_URL=postgresql://user:password@localhost:5432/your-db

# ☁️ Cloudinary
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=your-cloud-name
NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET=your-upload-preset
```
## 🧪 테스트 계정 (Test Account)
```env
아이디: admin1@dev.com
비밀번호: admin1234!
```
## 📍 테스트 좌표 (Test Location)
리뷰는 위치 기반으로 표시되기 때문에, 이를 위해 테스트용 좌표(성수)로 고정했습니다.

## ✨ 기술 스택 (Tech Stack)

| 기술            | 설명 |
|-----------------|------|
| **Next.js (App Router)** | 파일 기반 라우팅과 서버 컴포넌트 지원을 통한 전체 구조 구성 |
| **React** | 사용자 인터페이스 구성에 사용된 핵심 라이브러리 |
| **TypeScript** | 정적 타입을 적용해 안정적인 코드 작성 |
| **React Query** | 서버 상태 캐싱 및 비동기 데이터 관리 |
| **Zustand** | 클라이언트 상태 관리 |
| **Context API** | 모달 UI의 전역 상태 관리를 위해 사용 |
| **React Hook Form** | 폼 상태 관리 및 유효성 검사를 위한 경량화된 라이브러리 |
| **Zod** | React Hook Form과 함께 사용한 타입 안전한 폼 유효성 검사 도구 |
| **NextAuth** | 자체 로그인 구현을 위한 인증 시스템 |
| **PostgreSQL** | 리뷰, 사용자, 쇼핑몰 등 데이터를 저장하는 관계형 데이터베이스 |
| **Prisma (ORM)** | PostgreSQL과 연결된 ORM으로, 타입 기반으로 안전하게 DB 쿼리 작성 |
| **Cloudinary** | 이미지 업로드 및 최적화를 위한 이미지 호스팅 서비스 |
| **Kakao Maps API** | 사용자의 현재 위치 기반 주변 쇼핑몰 표시에 활용 |


## 📸 주요 기능 스크린샷 (Key Feature Screenshots)
**로그인/회원가입**<br>
<img src="https://github.com/user-attachments/assets/c814384f-80d3-43fc-a606-a15163241636"  width="480" height="237"/>
<img src="https://github.com/user-attachments/assets/c00b4aec-0c45-44dc-afef-de54df7b41ba"  width="480" height="237"/>
<br>
<br>
**현재 위치 기반 매장 탐색**<br>
<img src="https://github.com/user-attachments/assets/906c9b5d-a043-4d3e-bf7f-dc3e5e49ed30"  width="480" height="237"/>
<br>
<br>
**리뷰 작성 페이지**<br>
<img src="https://github.com/user-attachments/assets/4102b157-8bdf-4f72-b496-5642677527cd"  width="480" height="237"/>
<img src="https://github.com/user-attachments/assets/a86681d0-0c54-4d02-b7c5-fecbfa8cd3cb"  width="480" height="237"/>
<br>
<br>
**팔로우/팔로워 기능**<br>
<img src="https://github.com/user-attachments/assets/4e650d8c-1a6f-4894-a89d-0a4757a1b424"  width="480" height="237"/>
<br>
<br>
**채팅 기능**<br>
<img src="https://github.com/user-attachments/assets/d2b34321-59e2-4cae-bd8e-cbc53d7b036d"  width="480" height="237"/>
<img src="https://github.com/user-attachments/assets/98c2e7ab-7a82-4b6b-9943-4fd4ae151574"  width="480" height="237"/>
<br>
<br>
**베스트 리뷰어**<br>
<img src="https://github.com/user-attachments/assets/cc531b4f-bfb3-47cf-9476-98134fa885f4"  width="480" height="237"/>
<br>

## 🚀 주요 기능 (Key Features)

- **사용자 인증 (로그인 / 회원가입)**  
  이메일 기반으로 계정을 만들고 로그인할 수 있습니다.

- **사용자 정보 수정**  
  사용자의 프로필 이미지, 닉네임을 변경할 수 있습니다.

- **위치 기반 쇼핑몰 탐색**  
  현재 위치를 기준으로 근처의 쇼핑몰 목록을 확인할 수 있습니다.  

- **리뷰 작성 및 수정, 삭제**  
  각 쇼핑몰에 이미지, 텍스트 리뷰를 남기고 수정/삭제가 가능합니다.

- **방문한 쇼핑몰 / 미방문 쇼핑몰 구분**  
  사용자가 리뷰를 남긴 쇼핑몰과 아직 방문하지 않은 쇼핑몰을 따로 볼 수 있습니다.

- **베스트 리뷰어**  
  현재 위치를 기준으로 리뷰를 많이 남긴 사용자 TOP10을 확인할 수 있습니다.

- **팔로우 / 언팔로우 기능**  
  관심 있는 유저를 팔로우하고, 팔로우 및 팔로워 리스트를 확인할 수 있습니다. 
  
- **💬 실시간 채팅 기능**  
  유저 간 1:1 채팅이 가능하며, 모달을 통해 실시간으로 대화를 주고받을 수 있습니다.

<br>

## 🧭 프로젝트 구조 (Project Structure)

src/  
├── app/          # Next.js App Router 디렉토리  
│   ├── actions/    # 서버에서 실행되는 유틸리티 (ex. 현재 유저 가져오기)  
│   ├── api/                # API 라우트 (ex. follow, review, chat 등)  
│   ├── auth/               # 로그인, 회원가입, 프로필 페이지  
│   ├── bestReviewer/       # 베스트 리뷰어 페이지  
│   ├── chat/               # 채팅 페이지  
│   ├── follow/             # 팔로우/팔로워 페이지  
│   ├── nearbySelectshop/   # 내 주변 셀렉트샵  
│   ├── notVisiteSelectshop/# 미방문 셀렉트샵  
│   ├── visitedSelectshop/  # 방문한 셀렉트샵  
│   └── layout.tsx          # App Router 레이아웃  
│  
├── assets/                 # SVG 이미지  
│  
├── components/             # UI 및 기능 컴포넌트  
│   ├── bestReviewers/      # 베스트 리뷰어 관련 컴포넌트  
│   ├── chat/               # 채팅 관련 컴포넌트  
│   ├── common/             # 공통 UI 컴포넌트  
│   ├── layout/             # 레이아웃 관련 컴포넌트  
│   ├── login/              # 로그인 관련  
│   ├── map/                # 지도 관련 컴포넌트  
│   ├── profile/            # 유저 프로필 관련  
│   ├── register/           # 회원가입 관련  
│   ├── reviewEditor/       # 리뷰 작성기  
│   ├── selectshop/         # 셀렉트샵 관련  
│   └── sidebar/            # 사이드바 관련 컴포넌트  
│  
├── context/                # React Context (모달 컨텍스트)  
├── globalState/            # Zustand 전역 상태  
├── hook/                   # 커스텀 훅  
├── lib/                    # API, prisma 클라이언트 등 유틸  
├── pages/api/              # 인증 관련 NextAuth API  
├── styles/                 # 전역 스타일 및 테마  
├── types/                  # 타입 정의  
├── ui/                     # 공통 UI 컴포넌트 (ex. 모달)  
├── utils/                  # 유틸리티 함수  
├── validators/             # 입력값 유효성 검사기 (Zod)  
└── middleware.ts           # 인증 등의 미들웨어 설정  
