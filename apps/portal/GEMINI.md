# Portal Mothership Context (Local)

이 파일은 `apps/portal` 프로젝트의 개발 및 유지보수를 담당하는 에이전트를 위한 로컬 가이드라인이다.

## 1. 프로젝트 역할 (Role)

본 프로젝트는 Antigravity 시스템의 **'모함(Mothership)'**이다. 독립적으로 존재하는 서브 앱(`@sub_apps/*`)들을 하나의 통합된 UI/UX 환경으로 묶어 서비스하는 역할을 한다.

## 2. 핵심 기술 스택

* **Framework**: Next.js (App Router)
* **Styling**: Tailwind CSS
* **Icons**: Lucide-React
* **Architecture**: Bridge-based Injection (서브 앱의 코드를 브릿지 페이지를 통해 렌더링)

## 3. 핵심 설계 원칙 (Design Principles)

* **Dark Futuristic UI**: `docs/specs/portal_ui_spec.md`에 정의된 색상 체계와 디자인 컨셉을 엄격히 준수한다.
* **Zero Logic in Bridge**: `app/[route_path]/page.tsx` 브릿지 파일은 서브 앱을 임포트하여 배치하는 역할만 수행하며, 서브 앱의 비즈니스 로직을 포함하지 않는다.
* **Dynamic Navigation**: 사이드바 메뉴는 `packages/sub_apps`의 구성을 반영하도록 설계되어야 한다.

## 4. 작업 시 주의사항

1. **의존성 관리**: 서브 앱의 파일을 상대 경로(`../../packages/...`)로 직접 참조하지 말고, 반드시 Workspace 패키지명(`@sub_apps/...`)을 사용하여 참조한다.
2. **배포 최적화**: `vercel.json` 설정에 따라 모노레포 빌드 환경이 유지되도록 파일 구조를 관리한다.
3. **레이아웃 일관성**: 모든 신규 페이지는 `app/layout.tsx`에서 정의된 글로벌 레이아웃(사이드바, 헤더 포함) 내에서 작동해야 한다.

## 5. 참조 문서

* 전체 규칙: `@antigravity/GEMINI.md`
* UI 스펙: `@docs/specs/portal_ui_spec.md`
* 브릿지 패턴: `@antigravity/rules/03-monorepo-architecture.md`