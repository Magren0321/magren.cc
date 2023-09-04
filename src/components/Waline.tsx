'use client'

import { init } from '@waline/client';
import '@waline/client/dist/waline-meta.css';
import '@waline/client/dist/waline.css';
import React, { useEffect, useRef } from 'react';

import type { WalineInitOptions, WalineInstance } from '@waline/client';

export type WalineOptions = Omit<WalineInitOptions, 'el'> & { path: string };

export default function Waline(props: WalineOptions){
  const walineInstanceRef = useRef<WalineInstance | null>(null);
  const containerRef = React.createRef<HTMLDivElement>();

  useEffect(() => {
    walineInstanceRef.current = init({
      ...props,
      el: containerRef.current,
    });
  },[containerRef, props]);

  useEffect(() => {
    walineInstanceRef.current?.update(props);
  }, [props]);

  return (
    <div ref={containerRef} />
  );
};
