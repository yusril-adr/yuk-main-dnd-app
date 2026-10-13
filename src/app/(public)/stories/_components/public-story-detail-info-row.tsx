import type { TPublicStoryDetailInfoRowProps } from "@/app/(public)/stories/_types/public-story-components-props";

export default function PublicStoryDetailInfoRow({
  icon: Icon,
  label,
  value,
}: TPublicStoryDetailInfoRowProps) {
  return (
    <div className="flex items-start gap-3">
      <span className="flex size-9 shrink-0 items-center justify-center rounded-sm border bg-muted text-muted-foreground [&>svg]:size-4">
        <Icon />
      </span>
      <div className="flex min-w-0 flex-col">
        <span className="text-xs font-medium tracking-wide text-muted-foreground uppercase">
          {label}
        </span>
        <span className="break-words text-sm font-medium">{value}</span>
      </div>
    </div>
  );
}
