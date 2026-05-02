"use client";

import type { ReactNode } from "react";
import React from "react";

type Props = {
  children: ReactNode;
  fallback: ReactNode;
};

type State = { hasError: boolean };

/**
 * Error boundary is required for the 3D canvas:
 * WebGL contexts can fail on some devices/drivers and must not break the page.
 */
export class ErrorBoundary extends React.Component<Props, State> {
  state: State = { hasError: false };

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch() {
    // Intentionally no console noise in production-ready build.
  }

  render() {
    if (this.state.hasError) return this.props.fallback;
    return this.props.children;
  }
}

