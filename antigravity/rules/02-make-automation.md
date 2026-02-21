# Make Automation & Webhook Trigger Rules

이 문서는 docs/02_approved/ 디렉토리에 기획안(.md)이 추가되거나 이동되었을 때, 자동화 툴(Make)이 Antigravity 에이전트를 호출(Trigger)하는 통신 규약입니다.

## 1. 트리거 감지 조건 (Trigger Condition)
- 감지 경로: /docs/02_approved/*.md 파일 생성 또는 수정 이벤트
- 실행 동작: 이벤트 감지 시, 에이전트의 Webhook URL로 아래의 JSON 페이로드를 POST 전송.

## 2. Webhook JSON 페이로드 규격 (Payload Schema)
Make는 마크다운 파일의 프론트매터(YAML)와 본문을 파싱하여 아래와 같은 정형화된 JSON 형태로 에이전트에게 전달해야 합니다.

    {
      "event_type": "scaffold_sub_app",
      "timestamp": "{{current_timestamp}}",
      "document": {
        "file_name": "calculator.md",
        "app_id": "calculator",
        "route_path": "/calculator",
        "db_required": false,
        "tech_stack": ["Next.js", "Tailwind CSS", "Zustand"],
        "body_content": "## 1. 서비스 개요\n..."
      }
    }

## 3. 에이전트 최초 실행 지시어 (Initial Agent Prompt)
에이전트는 위 페이로드를 수신하면 즉시 아래의 프롬프트를 내부적으로 실행하여 스캐폴딩 파이프라인을 가동합니다.

    "새로운 승인된 기획안 페이로드를 수신했습니다. document.app_id를 기반으로 packages/sub_apps/{app_id}에 격리된 워크스페이스 패키지를 생성하십시오. document.tech_stack의 의존성을 해당 서브 앱의 package.json에 주입하고, document.body_content를 분석하여 초기 UI 컴포넌트를 작성하십시오. 코드가 완성되면 apps/portal/app/{route_path}/page.tsx에 브릿지 라우트를 연결하십시오. 모든 과정은 @./03-monorepo-architecture.md 규칙을 엄격히 따릅니다."

## 4. 예외 처리 (Error Handling)
- 필수 프론트매터 누락 시: 에이전트는 스캐폴딩을 중단하고 Make 웹훅에 에러 응답(400 Bad Request)과 누락된 필드명을 반환하여 기획안 수정을 유도한다.
- 패키지 중복 시: packages/sub_apps/ 내에 동일한 app_id가 이미 존재하면 덮어쓰지 않고 작업을 중단한다.