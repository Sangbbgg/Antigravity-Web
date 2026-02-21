'use client';

import { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/lib/supabase';

interface Project {
    id: string;
    slug: string;
    prompt: string;
    status: string;
    created_at: string;
}

export default function Home() {
    const [prompt, setPrompt] = useState('');
    const [slug, setSlug] = useState('');
    const [loading, setLoading] = useState(false);
    const [projects, setProjects] = useState<Project[]>([]);

    const fetchProjects = useCallback(async (isMounted: boolean = true) => {
        const { data } = await supabase.from('projects').select('*').order('created_at', { ascending: false });
        if (isMounted && data) setProjects(data as Project[]);
    }, []);

    useEffect(() => {
        let isMounted = true;
        fetchProjects(isMounted);
        return () => { isMounted = false; };
    }, [fetchProjects]);

    const handleGenerate = async () => {
        if (!slug || !prompt) {
            alert('Slug와 프롬프트를 모두 입력해주세요.');
            return;
        }
        setLoading(true);
        try {
            const res = await fetch('/api/generate', {
                method: 'POST',
                body: JSON.stringify({ prompt, slug }),
                headers: { 'Content-Type': 'application/json' },
            });

            if (res.ok) {
                setPrompt(''); setSlug('');
                await fetchProjects();
            } else {
                const error = await res.json();
                alert(`생성 실패: ${error.error}`);
            }
        } catch {
            alert('생성 중 오류 발생');
        }
        setLoading(false);
    };

    return (
        <div style={{ maxWidth: '64rem', margin: '0 auto', padding: '2rem', backgroundColor: '#0f172a', minHeight: '100vh', color: 'white', fontFamily: 'sans-serif' }}>
            <h1 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '1.5rem' }}>Antigravity MVP Dashboard</h1>

            <div style={{ backgroundColor: '#1e293b', padding: '1.5rem', borderRadius: '0.5rem', marginBottom: '2rem' }}>
                <input
                    style={{ width: '100%', backgroundColor: '#334155', padding: '0.75rem', borderRadius: '0.25rem', marginBottom: '1rem', border: 'none', color: 'white' }}
                    placeholder="프로젝트 Slug (예: my-calc)"
                    value={slug} onChange={(e) => setSlug(e.target.value)}
                />
                <textarea
                    style={{ width: '100%', backgroundColor: '#334155', padding: '0.75rem', borderRadius: '0.25rem', marginBottom: '1rem', height: '6rem', border: 'none', color: 'white' }}
                    placeholder="만들고 싶은 페이지를 설명하세요..."
                    value={prompt} onChange={(e) => setPrompt(e.target.value)}
                />
                <button
                    onClick={handleGenerate}
                    disabled={loading}
                    style={{ backgroundColor: '#2563eb', color: 'white', padding: '0.5rem 1.5rem', borderRadius: '0.25rem', fontWeight: 'bold', border: 'none', cursor: loading ? 'not-allowed' : 'pointer', opacity: loading ? 0.5 : 1 }}
                >
                    {loading ? '생성 중 (GitHub 커밋 중)...' : '프로젝트 생성'}
                </button>
            </div>

            <h2 style={{ fontSize: '1.25rem', fontWeight: 'bold', marginBottom: '1rem' }}>생성된 프로젝트</h2>
            <div style={{ display: 'grid', gap: '1rem' }}>
                {projects.length === 0 && <p style={{ color: '#94a3b8' }}>생성된 프로젝트가 없습니다.</p>}
                {projects.map(p => (
                    <div key={p.id} style={{ backgroundColor: '#1e293b', padding: '1rem', borderRadius: '0.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <div>
                            <p style={{ fontWeight: 'bold', margin: 0 }}>{p.slug}</p>
                            <p style={{ fontSize: '0.875rem', color: '#94a3b8', margin: '0.25rem 0 0 0' }}>{p.prompt}</p>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                            <span style={{ fontSize: '0.875rem', color: p.status === 'deployed' ? '#4ade80' : '#facc15' }}>
                                {p.status}
                            </span>
                            <a
                                href={`/projects/${p.slug}`}
                                target="_blank"
                                style={{ backgroundColor: '#334155', padding: '0.25rem 1rem', borderRadius: '0.25rem', color: 'white', textDecoration: 'none', fontSize: '0.875rem' }}
                            >
                                열기
                            </a>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
