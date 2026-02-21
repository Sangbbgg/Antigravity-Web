# Monorepo Architecture & Bridge Routing Rules

에이전트가 서브 프로젝트 생성을 완료하고 메인 포털에 라우트를 주입(Injection)할 때 준수해야 하는 절대 규칙입니다. 메인 포털의 기존 코드를 손상시키지 않고 안전하게 연결하는 것이 핵심입니다.

## 1. 서브 앱 패키지 명명 규칙 (Package Naming)
`packages/sub_apps/[app_id]` 내부에 생성되는 `package.json`은 반드시 아래의 네이밍 컨벤션을 따릅니다.
- `name`: "@sub_apps/[app_id]"
- `main`: "index.ts" (진입점)

## 2. 서브 앱 진입점 내보내기 (Entry Point Export)
서브 앱의 루트 경로(`packages/sub_apps/[app_id]/index.ts`)에는 반드시 메인 UI 컴포넌트를 통합해서 내보내는 진입점이 있어야 합니다.

    // 예시: packages/sub_apps/calculator/index.ts
    export { default as CalculatorApp } from './components/CalculatorMain';

## 3. 메인 포털 브릿지 라우트 생성 (Portal Bridge Injection)
기획안의 `route_path`를 참조하여, 메인 포털(`apps/portal/app/[route_path]/page.tsx`)에 라우트 파일을 생성합니다. 
이 파일은 오직 서브 앱을 불러와 화면에 렌더링하는 '브릿지(Bridge)' 역할만 수행하며, 비즈니스 로직을 포함하지 않습니다.

    // 예시: apps/portal/app/calculator/page.tsx
    import { CalculatorApp } from '@sub_apps/calculator';

    export default function CalculatorPage() {
      return (
        <main className="w-full h-full min-h-screen">
          <CalculatorApp />
        </main>
      );
    }

## 4. 의존성 격리 위반 금지 (Dependency Isolation)
- 메인 포털(`apps/portal`)은 서브 앱의 내부 파일(예: `../packages/sub_apps/...`)을 상대 경로로 직접 참조해서는 안 됩니다. 반드시 패키지명(`@sub_apps/...`)으로만 가져옵니다.
- 서브 앱은 메인 포털의 코드를 직접 참조하지 않습니다. 공통으로 필요한 기능(UI 컴포넌트, DB 클라이언트)은 추후 별도의 `@packages/shared` 등으로 분리하여 참조합니다.