// ChatWidgetRenderer — switches on a ChatWidget's discriminator and renders
// the matching inline visual. Adding a new widget type = adding a new branch
// here + a new variant in the ChatWidget union in lib/chat/types.ts.

import type { ChatWidget } from '@/lib/chat/types';
import ProjectedBillCard from '@/components/widgets/ProjectedBillCard';

interface Props {
  widget: ChatWidget;
}

export default function ChatWidgetRenderer({ widget }: Props) {
  switch (widget.type) {
    case 'projected-bill':
      return (
        // Explicit width — inside an `align-items: flex-start` flex column the
        // wrapper would otherwise shrink to its children's natural width and
        // collapse the absolutely-positioned track + pills onto each other.
        <div className="mt-2 mb-1 w-[460px] max-w-full">
          <ProjectedBillCard
            current={widget.current}
            projected={widget.projected}
            progressPct={widget.progressPct}
            showSeeMore={false}
          />
        </div>
      );
    default:
      return null;
  }
}
