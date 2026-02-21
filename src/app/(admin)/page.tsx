'use client';

import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';

export default function AdminDashboard() {
    const [prompt, setPrompt] = useState('');
    const [slug, setSlug] = useState('');
    const [loading, setLoading] = useState(false);
    const [projects, setProjects] = useState<any[]>([]);

    const fetchProjects = async () => {
        const { data } = await supabase.from('projects').select('*').order('created_at', { ascending: false });
        if (data) setProjects(data);
    };

    useEffect(() => {
        fetchProjects();
    }, []);

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
                fetchProjects();
            } else {
                const error = await res.json();
                alert(`생성 실패: ${error.error}`);
            }
        } catch (err) {
            alert('생성 중 오류 발생');
        }
        setLoading(false);
    };

    return (
        <div className="max-w-4xl mx-auto p-8 bg-slate-900 min-h-screen text-white">
            <h1 className="text-2xl font-bold mb-6">Antigravity MVP Dashboard</h1>

            <div className="bg-slate-800 p-6 rounded-lg mb-8">
                <input
                    className="w-full bg-slate-700 p-3 rounded mb-4"
                    placeholder="프로젝트 Slug (예: my-calc)"
                    value={slug} onChange={(e) => setSlug(e.target.value)}
                />
                <textarea
                    className="w-full bg-slate-700 p-3 rounded mb-4 h-24"
                    placeholder="만들고 싶은 페이지를 설명하세요..."
                    value={prompt} onChange={(e) => setPrompt(e.target.value)}
                />
                <button
                    onClick={handleGenerate}
                    disabled={loading}
                    className="bg-blue-600 hover:bg-blue-500 px-6 py-2 rounded font-bold disabled:opacity-50"
                >
                    {loading ? '생성 중 (GitHub 커밋 중)...' : '프로젝트 생성'}
                </button>
            </div>

            <h2 className="text-xl font-bold mb-4">생성된 프로젝트</h2>
            <div className="grid gap-4">
                {projects.length === 0 && <p className="text-slate-400">생성된 프로젝트가 없습니다.</p>}
                {projects.map(p => (
                    <div key={p.id} className="bg-slate-800 p-4 rounded-lg flex justify-between items-center">
                        <div>
                            <p className="font-bold">{p.slug}</p>
                            <p className="text-sm text-slate-400">{p.prompt}</p>
                        </div>
                        <div className="flex items-center gap-4">
                            <span className={`text-sm ${p.status === 'deployed' ? 'text-green-400' : 'text-yellow-400'}`}>
                                {p.status}
                            </span>
                            <a
                                href={`/projects/${p.slug}`}
                                target="_blank"
                                className="bg-slate-700 px-4 py-1 rounded hover:bg-slate-600 transition-colors"
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
