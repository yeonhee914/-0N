# 냉장고ON Food Keeper

냉장고ON은 식재료 재고, 소비기한, 가격, 냉털 레시피를 관리하는 대학 과제용 MVP 웹앱입니다. Next.js 15 App Router, TypeScript, Tailwind CSS, Firebase Authentication, Firestore, Storage 기반으로 만들었고 Vercel 배포를 목표로 합니다.

## 주요 기능

- 이메일 회원가입, 로그인, 로그아웃, 비밀번호 재설정
- Firebase 인증 상태 유지와 자동 로그인
- 사용자별 식재료 데이터 완전 분리
- 식재료 등록, 조회, 수정, 삭제
- 카테고리, 수량, 구매일, 소비기한, 메모, 가격, 이미지 저장
- 식품별 기본 소비기한 자동 입력
- 소비기한 7일 이하 노란색, 3일 이하 빨간색 강조
- 소비기한 임박 식재료 상단 노출
- 전체 식재료 가격 합계 표시
- 검색, 카테고리 필터, 등록순/소비기한순/이름순 정렬
- JSON 기반 냉털 레시피 추천 엔진
- 영수증 등록 시뮬레이션
- Chart.js 기반 통계 화면
- 모바일 우선 반응형 UI와 하단 탭 네비게이션

## 로컬 실행

```bash
npm install
cp .env.local.example .env.local
npm run dev
```

`.env.local`에 Firebase 프로젝트 설정값을 입력한 뒤 `http://localhost:3000`에서 실행합니다.

## Firebase 설정

1. Firebase Console에서 새 프로젝트를 생성합니다.
2. Authentication에서 이메일/비밀번호 로그인을 활성화합니다.
3. Firestore Database를 생성합니다.
4. Storage를 생성합니다.
5. 프로젝트 설정의 웹 앱 SDK 값을 `.env.local`에 입력합니다.
6. `firestore.rules` 내용을 Firestore Rules에 배포합니다.
7. `storage.rules` 내용을 Storage Rules에 배포합니다.

## 데이터 구조

```txt
users/{uid}
users/{uid}/foods/{foodId}
```

식재료 문서:

```ts
{
  name: string;
  category: string;
  quantity: number;
  price: number;
  purchaseDate: Timestamp;
  expireDate: Timestamp;
  createdAt: Timestamp;
  memo?: string;
  imageUrl?: string;
}
```

## GitHub 업로드

```bash
git init
git add .
git commit -m "Initial Food Keeper MVP"
git branch -M main
git remote add origin https://github.com/USER/REPOSITORY.git
git push -u origin main
```

## Vercel 배포

1. GitHub에 저장소를 업로드합니다.
2. Vercel에서 해당 GitHub 저장소를 Import합니다.
3. Environment Variables에 `.env.local.example`의 키를 등록합니다.
4. Deploy를 실행합니다.

## 주요 폴더

```txt
app/          Next.js App Router 페이지
components/   재사용 UI 컴포넌트
lib/          Firebase, 서비스, 추천 엔진, 유틸
public/       정적 파일
```
