import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { Octokit } from '@octokit/rest';
import fs from 'fs';
import path from 'path';

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);
const octokit = new Octokit({ auth: process.env.GITHUB_PAT });

export async function POST(req: Request) {
    try {
        const { prompt, slug } = await req.json();

        // 1. Supabase 기록 (Pending)
        const { error: insertError } = await supabase.from('projects').insert([{ slug, prompt, status: 'pending' }]);
        if (insertError) {
            console.error('Supabase Insert Error:', insertError);
            return NextResponse.json({ success: false, error: `DB 기록 실패: ${insertError.message}` }, { status: 500 });
        }

        // 2. 하니스 규칙 로드
        const rulesPath = path.join(process.cwd(), 'harness', 'global-rules.md');
        if (!fs.existsSync(rulesPath)) {
            return NextResponse.json({ success: false, error: '하니스 규칙 파일을 찾을 수 없습니다.' }, { status: 500 });
        }
        const globalRules = fs.readFileSync(rulesPath, 'utf8');

        // [디버깅] 현재 API 키로 사용 가능한 모델 목록 확인
        // const modelCheck = await fetch(`https://generativelanguage.googleapis.com/v1beta/models?key=${process.env.GEMINI_API_KEY}`);
        // const availableModels = await modelCheck.json();
        // console.log("사용 가능한 모델 목록:", availableModels.models?.map((m: any) => m.name));

        // 3. AI 코드 생성 (Gemini)
        // 확인된 사용 가능한 모델 목록 중 가장 상위의 'gemini-2.5-flash'를 사용합니다.
        const model = genAI.getGenerativeModel({ model: 'gemini-2.5-flash' });
        const fullPrompt = `${globalRules}\n\n사용자 요청: ${prompt}`;
        const result = await model.generateContent(fullPrompt);
        let generatedCode = result.response.text();

        // AI 출력에서 마크다운 백틱 제거 (정제)
        generatedCode = generatedCode.replace(/```(?:tsx|typescript|javascript)?/gi, '').replace(/```/g, '').trim();

        // 4. GitHub 커밋
        const filePath = `src/app/projects/${slug}/page.tsx`;
        const contentEncoded = Buffer.from(generatedCode).toString('base64');

        try {
            await octokit.repos.createOrUpdateFileContents({
                owner: process.env.GITHUB_OWNER!,
                repo: process.env.GITHUB_REPO!,
                path: filePath,
                message: `feat(harness): auto-generate project ${slug}`,
                content: contentEncoded,
            });
        } catch (githubError: any) {
            console.error('GitHub Commit Error:', githubError);
            return NextResponse.json({ success: false, error: `GitHub 커밋 실패: ${githubError.message}` }, { status: 500 });
        }

        // 5. Supabase 업데이트 (Deployed)
        const { error: updateError } = await supabase.from('projects').update({ status: 'deployed' }).eq('slug', slug);
        if (updateError) {
            console.error('Supabase Update Error:', updateError);
        }

        return NextResponse.json({ success: true, slug });

    } catch (error: any) {
        console.error('Unexpected Error:', error);
        return NextResponse.json({ success: false, error: `예상치 못한 에러: ${error.message}` }, { status: 500 });
    }
}
