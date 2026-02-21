# Markdown Parsing Rules & Template

이 문서는 에이전트가 서브 앱 생성을 위해 기획안(.md)을 파싱할 때 사용하는 기준 스키마입니다. 기획안은 반드시 아래의 YAML 프론트매터(Frontmatter)와 본문 구조(Heading)를 준수해야 합니다.

## 1. 필수 YAML 프론트매터 스키마
문서 최상단에 `---`로 감싸진 메타데이터가 완벽히 작성되어야 파이프라인이 동작합니다.

---
app_id: "calculator"              
route_path: "/calculator"         
status: "approved"                
db_required: false                
tech_stack: ["Next.js", "Tailwind CSS", "Zustand"] 
---

## 2. 본문 구조 (Body Template)
에이전트는 아래의 H2(##) 단계를 기준으로 코드를 분할하여 생성합니다.

### ## 1. 서비스 개요 (Overview)
- 서브 앱의 목적과 핵심 타겟 기능을 한 문단으로 명확히 서술.

### ## 2. 핵심 기능 및 요구사항 (Requirements)
- 컴포넌트 단위로 분리할 수 있도록 기능 요구사항을 목록화(-).
- 에이전트는 이 목록을 바탕으로 packages/sub_apps/[app_id]/components/ 하위에 파일을 생성함.

### ## 3. 데이터베이스 스키마 (DB Schema - db_required가 true일 경우만)
- 필요한 Supabase 테이블명, 컬럼명, 데이터 타입, 제약조건 명시.
- 에이전트는 이를 기반으로 SQL DDL 스크립트를 생성함.

### ## 4. UI/UX 레이아웃 (Layout)
- 화면 구성 요소의 배치와 Tailwind CSS 스타일링 방향성 명시.

## 3. 에이전트 파싱 행동 지침
1. app_id를 추출하여 packages/sub_apps/{app_id} 디렉토리를 생성한다.
2. tech_stack을 확인하여 해당 패키지의 package.json 의존성을 추가한다.
3. db_required가 true일 경우, 백엔드 연결 로직(Supabase client) 보일러플레이트를 우선 생성한다.