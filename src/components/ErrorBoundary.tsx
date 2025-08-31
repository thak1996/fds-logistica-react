import React from 'react';

type ErrorBoundaryState = { hasError: boolean; error?: unknown };

export default class ErrorBoundary extends React.Component<React.PropsWithChildren, ErrorBoundaryState> {
    constructor(props: React.PropsWithChildren) {
        super(props);
        this.state = { hasError: false };
    }

    static getDerivedStateFromError(error: unknown): ErrorBoundaryState {
        return { hasError: true, error };
    }

    componentDidCatch(error: unknown, errorInfo: unknown) {
        // Log to console so we can see issues in Pages instead of a blank screen

        console.error('App crashed:', error, errorInfo);
    }

    render() {
        if (this.state.hasError) {
            return (
                <div style={{ padding: '1.5rem', fontFamily: 'system-ui, -apple-system, Segoe UI, sans-serif' }}>
                    <h1 style={{ color: '#b91c1c', marginBottom: '0.5rem' }}>Ops, algo deu errado ao carregar o aplicativo.</h1>
                    <p style={{ color: '#374151' }}>Atualize a página (Ctrl/Cmd + F5). Se o problema persistir, entre em contato.</p>
                </div>
            );
        }
        return this.props.children;
    }
}
