import { useCursor } from '@/hooks/use-cursor';

export function CustomCursor() {
  const { position, isHovering } = useCursor();

  return (
    <div
      className={`custom-cursor ${isHovering ? 'scale-200' : 'scale-100'}`}
      style={{
        left: `${position.x}px`,
        top: `${position.y}px`,
      }}
    />
  );
}
