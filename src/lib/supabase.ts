import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

// 빌드 시 환경 변수가 없어도 에러가 발생하지 않도록 처리합니다.
// 실제 런타임에서는 이 값이 비어있으면 API 호출 시 에러가 발생하겠지만, 빌드는 통과하게 됩니다.
export const supabase = createClient(supabaseUrl, supabaseKey);
