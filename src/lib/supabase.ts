import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://placeholder.supabase.co';
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'placeholder-key';

// 빌드 시 환경 변수가 없어도 에러가 발생하지 않도록 유효한 URL 형식을 기본값으로 제공합니다.
// 실제 런타임(Vercel 서버)에서는 대시보드에 설정된 환경 변수가 우선적으로 사용됩니다.
export const supabase = createClient(supabaseUrl, supabaseKey);
