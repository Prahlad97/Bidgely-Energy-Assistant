'use client';

import { create } from 'zustand';
import type { ChatMessage, FlowName, FlowData, PanelKey } from './types';

// Panels that require a fake 4-second load (mirrors original HTML)
const PANELS_REQUIRING_LOAD = new Set<PanelKey>([
  'solar-dynamic',
  'ev',
  'bill-report',
  'rate-report',
  'optimizer',
]);

/** Source rect for the modal's morph-from-widget entry animation.
 *  Insets are measured from the viewport edges (px). */
export interface ModalOrigin {
  top: number;
  right: number;
  bottom: number;
  left: number;
  radius: number;
}

interface ChatStore {
  // Modal (Energy Assistant fullscreen popup)
  modalOpen: boolean;
  /** If set, modal animates from this rect (morph). Null = slide-up from bottom. */
  modalOrigin: ModalOrigin | null;

  // Chat state
  chatMode: boolean;
  messages: ChatMessage[];
  isTyping: boolean;

  // Panel state
  activePanel: PanelKey | null;
  panelTitle: string;
  panelLoading: boolean;

  // Conversational flow
  flow: FlowName;
  flowStep: number;
  flowData: FlowData;

  // Panel-supplied download handler (set by panels that can export PDF)
  panelDownloadHandler: (() => void | Promise<void>) | null;

  // Actions
  openModal: (origin?: ModalOrigin | null) => void;
  closeModal: () => void;
  /** Clear the morph origin after the close transition completes. */
  clearModalOrigin: () => void;
  setChatMode: (v: boolean) => void;
  addMessage: (msg: ChatMessage) => void;
  setIsTyping: (v: boolean) => void;
  openPanel: (key: PanelKey, title: string) => void;
  closePanel: () => void;
  setFlow: (flow: FlowName, step?: number, data?: FlowData) => void;
  advanceFlow: (step: number, data?: Partial<FlowData>) => void;
  resetFlow: () => void;
  setPanelDownloadHandler: (handler: (() => void | Promise<void>) | null) => void;
}

export const useChatStore = create<ChatStore>()((set, get) => ({
  modalOpen: false,
  modalOrigin: null,
  chatMode: false,
  messages: [],
  isTyping: false,
  activePanel: null,
  panelTitle: '',
  panelLoading: false,
  flow: null,
  flowStep: 0,
  flowData: {},
  panelDownloadHandler: null,

  openModal: (origin = null) => set({
    modalOpen: true,
    modalOrigin: origin,
    messages: [],
    chatMode: false,
    isTyping: false,
    activePanel: null,
    panelTitle: '',
    panelLoading: false,
    flow: null,
    flowStep: 0,
    flowData: {},
    panelDownloadHandler: null,
  }),
  // Always slide down on close — clearing the origin switches the modal back
  // to the `slide` variant before the closing transition runs.
  closeModal: () => set({ modalOpen: false, modalOrigin: null }),
  clearModalOrigin: () => set({ modalOrigin: null }),
  setChatMode: (v) => set({ chatMode: v }),
  setPanelDownloadHandler: (handler) => set({ panelDownloadHandler: handler }),

  addMessage: (msg) => set((s) => ({ messages: [...s.messages, msg] })),

  setIsTyping: (v) => set({ isTyping: v }),

  openPanel: (key, title) => {
    const needsLoad = PANELS_REQUIRING_LOAD.has(key);
    set({ activePanel: key, panelTitle: title, panelLoading: needsLoad });
    if (needsLoad) {
      setTimeout(() => set({ panelLoading: false }), 4000);
    }
  },

  closePanel: () => set({ activePanel: null, panelTitle: '', panelLoading: false, panelDownloadHandler: null }),

  setFlow: (flow, step = 0, data = {}) => set({ flow, flowStep: step, flowData: data }),

  advanceFlow: (step, data = {}) =>
    set((s) => ({ flowStep: step, flowData: { ...s.flowData, ...data } })),

  resetFlow: () => set({ flow: null, flowStep: 0, flowData: {} }),
}));
