'use client';

import { useCustomization } from '@/contexts/CustomizationContext';
import clsx from 'clsx';

type Angle = 'front' | 'left' | 'right';

export default function HeadphonePreview({ angle = 'front' }: { angle?: Angle }) {
  const { customization } = useCustomization();

  return (
    <div className="relative w-full h-full flex items-center justify-center">
      <svg
        viewBox="0 0 600 600"
        className="w-[300px] h-[380px] md:w-[360px] md:h-[460px] lg:w-[420px] lg:h-[520px] drop-shadow-[0_10px_30px_rgba(0,0,0,0.35)]"
      >
        <defs>
          <linearGradient id="bandShade" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopOpacity="0.25" />
            <stop offset="100%" stopOpacity="0" />
          </linearGradient>
          <radialGradient id="cupShade" cx="50%" cy="40%" r="65%">
            <stop offset="0%" stopOpacity="0.25" />
            <stop offset="100%" stopOpacity="0" />
          </radialGradient>
        </defs>

        {angle === 'front' && (
          <>
            <path
              d="M120,140 C220,10 380,10 480,140"
              fill="none"
              stroke={customization.colors.band}
              strokeWidth="36"
              strokeLinecap="round"
            />
            <path
              d="M140,180 C230,75 370,75 460,180"
              fill="none"
              stroke={customization.colors.band}
              strokeWidth="16"
              strokeLinecap="round"
              opacity="0.9"
            />
            <g>
              <rect x="155" y="180" width="18" height="140" rx="8" fill={customization.colors.shell} />
              <rect x="427" y="180" width="18" height="140" rx="8" fill={customization.colors.shell} />
            </g>
            <g>
              <circle cx="180" cy="360" r="85" fill={customization.colors.earCups} />
              <circle cx="180" cy="360" r="60" fill="#0b0b0b" />
              <circle cx="180" cy="360" r="85" fill="url(#cupShade)" />
            </g>
            <g>
              <circle cx="420" cy="360" r="85" fill={customization.colors.earCups} />
              <circle cx="420" cy="360" r="60" fill="#0b0b0b" />
              <circle cx="420" cy="360" r="85" fill="url(#cupShade)" />
            </g>
            {customization.customImage && (
              <foreignObject x="360" y="300" width="120" height="120">
                <div
                  style={{
                    width: '105px',
                    height: '105px',
                    borderRadius: '9999px',
                    overflow: 'hidden',
                    border: '4px solid rgba(212,175,55,0.5)',
                  }}
                >
                  <img
                    src={customization.customImage}
                    alt=""
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                </div>
              </foreignObject>
            )}
            {customization.stickers.length > 0 && (
              <g>
                {customization.stickers.slice(0, 3).map((s, i) => (
                  <text key={i} x={145 + i * 28} y={360 + (i % 2 === 0 ? -8 : 16)} fontSize="26" textAnchor="middle">
                    {s}
                  </text>
                ))}
              </g>
            )}
            {customization.stickers.length > 3 && (
              <g>
                {customization.stickers.slice(3, 6).map((s, i) => (
                  <text key={i} x={390 + i * 28} y={360 + (i % 2 === 0 ? -8 : 16)} fontSize="26" textAnchor="middle">
                    {s}
                  </text>
                ))}
              </g>
            )}
            {customization.text.content && (
              <foreignObject x="200" y="90" width="200" height="60">
                <div
                  className={clsx('w-full text-center text-2xl font-bold truncate', customization.text.font)}
                  style={{ color: customization.text.color }}
                >
                  {customization.text.content}
                </div>
              </foreignObject>
            )}
          </>
        )}

        {angle !== 'front' && (
          <>
            <path
              d={angle === 'left' ? 'M180,140 C260,40 420,80 480,180' : 'M120,180 C180,80 340,40 420,140'}
              fill="none"
              stroke={customization.colors.band}
              strokeWidth="32"
              strokeLinecap="round"
            />
            <g>
              {angle === 'left' ? (
                <>
                  <rect x="210" y="200" width="20" height="150" rx="8" fill={customization.colors.shell} />
                  <circle cx="260" cy="370" r="90" fill={customization.colors.earCups} />
                  <circle cx="260" cy="370" r="65" fill="#0b0b0b" />
                </>
              ) : (
                <>
                  <rect x="370" y="200" width="20" height="150" rx="8" fill={customization.colors.shell} />
                  <circle cx="340" cy="370" r="90" fill={customization.colors.earCups} />
                  <circle cx="340" cy="370" r="65" fill="#0b0b0b" />
                </>
              )}
            </g>
            {customization.customImage && angle === 'right' && (
              <foreignObject x="300" y="320" width="120" height="120">
                <div
                  style={{
                    width: '100px',
                    height: '100px',
                    borderRadius: '9999px',
                    overflow: 'hidden',
                    border: '4px solid rgba(212,175,55,0.5)',
                  }}
                >
                  <img
                    src={customization.customImage}
                    alt=""
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                </div>
              </foreignObject>
            )}
            {customization.stickers.length > 0 && (
              <g>
                {(angle === 'left'
                  ? customization.stickers.slice(0, 4)
                  : customization.stickers.slice(3, 7)
                ).map((s, i) => (
                  <text key={i} x={(angle === 'left' ? 232 : 320) + i * 18} y={372 + (i % 2 === 0 ? -6 : 14)} fontSize="22" textAnchor="middle">
                    {s}
                  </text>
                ))}
              </g>
            )}
            {customization.text.content && (
              <foreignObject x="220" y="120" width="160" height="40">
                <div
                  className={clsx('w-full text-center text-xl font-bold truncate', customization.text.font)}
                  style={{ color: customization.text.color }}
                >
                  {customization.text.content}
                </div>
              </foreignObject>
            )}
          </>
        )}
      </svg>
    </div>
  );
}
