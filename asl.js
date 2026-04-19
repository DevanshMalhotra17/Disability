const skin = "#F5C5A3";
const skinDark = "#E8A87C";
const skinDarker = "#C8824E";

const ASL_SIGNS = {
  "A": (size = 120) => `\n<svg width=${size} height=${size} viewBox="0 0 120 130">
    <rect x="30" y="108" width="60" height="28" rx="10" fill="${skin}" />
    <ellipse cx="60" cy="75" rx="42" ry="48" fill="${skin}" />
    {/* Fingers curled - four bumps at top */}
    <rect x="15" y="50" width="18" height="30" rx="9" fill=${skinDark} />
    <rect x="35" y="38" width="18" height="42" rx="9" fill=${skinDark} />
    <rect x="55" y="38" width="18" height="42" rx="9" fill=${skinDark} />
    <rect x="75" y="42" width="18" height="38" rx="9" fill=${skinDark} />
    {/* Finger tops */}
    <ellipse cx="24" cy="50" rx="9" ry="9" fill=${skinDarker} />
    <ellipse cx="44" cy="38" rx="9" ry="9" fill=${skinDarker} />
    <ellipse cx="64" cy="38" rx="9" ry="9" fill=${skinDarker} />
    <ellipse cx="84" cy="42" rx="9" ry="9" fill=${skinDarker} />
    {/* Thumb sticking up side */}
    <rect x="6" y="60" width="15" height="32" rx="7" fill=${skin} transform="rotate(-15,13,76)" />
    <ellipse cx="10" cy="60" rx="7" ry="7" fill=${skinDark} transform="rotate(-15,13,76)" />
    {/* Letter */}
    <text x="60" y="125" text-anchor="middle" font-size="14" font-weight="bold" fill="#6366f1">A</text>
  </svg>\n`,
  "B": (size = 120) => `\n<svg width=${size} height=${size} viewBox="0 0 120 130">
    <rect x="30" y="108" width="60" height="28" rx="10" fill="${skin}" />
    <Palm color=${skin} />
    {/* 4 fingers straight up */}
    <rect x="18" y="20" width="16" height="58" rx="8" fill=${skinDark} />
    <rect x="36" y="14" width="16" height="64" rx="8" fill=${skinDark} />
    <rect x="54" y="14" width="16" height="64" rx="8" fill=${skinDark} />
    <rect x="72" y="18" width="16" height="60" rx="8" fill=${skinDark} />
    {/* Finger tips */}
    <ellipse cx="26" cy="20" rx="8" ry="8" fill=${skin} />
    <ellipse cx="44" cy="14" rx="8" ry="8" fill=${skin} />
    <ellipse cx="62" cy="14" rx="8" ry="8" fill=${skin} />
    <ellipse cx="80" cy="18" rx="8" ry="8" fill=${skin} />
    {/* Thumb folded across palm */}
    <rect x="12" y="80" width="34" height="14" rx="7" fill=${skinDark} />
    <ellipse cx="46" cy="87" rx="7" ry="7" fill=${skinDarker} />
    <text x="60" y="125" text-anchor="middle" font-size="14" font-weight="bold" fill="#6366f1">B</text>
  </svg>\n`,
  "C": (size = 120) => `\n<svg width=${size} height=${size} viewBox="0 0 120 130">
    <rect x="30" y="108" width="60" height="28" rx="10" fill="${skin}" />
    {/* C shape - curved hand */}
    <path d="M 85 30 Q 110 60 85 100 Q 60 115 35 100 Q 15 80 20 55 Q 25 30 50 22" stroke=${skinDark} stroke-width="22" fill="none" stroke-linecap="round" />
    <path d="M 85 30 Q 110 60 85 100 Q 60 115 35 100 Q 15 80 20 55 Q 25 30 50 22" stroke=${skin} stroke-width="16" fill="none" stroke-linecap="round" />
    <text x="60" y="125" text-anchor="middle" font-size="14" font-weight="bold" fill="#6366f1">C</text>
  </svg>\n`,
  "D": (size = 120) => `\n<svg width=${size} height=${size} viewBox="0 0 120 130">
    <rect x="30" y="108" width="60" height="28" rx="10" fill="${skin}" />
    <ellipse cx="60" cy="75" rx="42" ry="48" fill="${skin}" />
    {/* Index finger up */}
    <rect x="36" y="18" width="18" height="62" rx="9" fill=${skinDark} />
    <ellipse cx="45" cy="18" rx="9" ry="9" fill=${skin} />
    {/* Other 3 fingers curled */}
    <ellipse cx="62" cy="55" rx="9" ry="9" fill=${skinDarker} />
    <ellipse cx="78" cy="58" rx="8" ry="8" fill=${skinDarker} />
    <ellipse cx="20" cy="62" rx="8" ry="8" fill=${skinDarker} />
    {/* Thumb touching middle fingertip - circle */}
    <ellipse cx="25" cy="58" rx="9" ry="9" fill=${skinDark} />
    <path d="M 25 58 Q 40 45 55 55" stroke=${skin} stroke-width="12" fill="none" stroke-linecap="round" />
    <text x="60" y="125" text-anchor="middle" font-size="14" font-weight="bold" fill="#6366f1">D</text>
  </svg>\n`,
  "E": (size = 120) => `\n<svg width=${size} height=${size} viewBox="0 0 120 130">
    <rect x="30" y="108" width="60" height="28" rx="10" fill="${skin}" />
    <ellipse cx="60" cy="75" rx="42" ry="48" fill="${skin}" />
    {/* All fingers bent down */}
    <rect x="16" y="52" width="16" height="28" rx="8" fill=${skinDarker} />
    <rect x="34" y="46" width="16" height="34" rx="8" fill=${skinDarker} />
    <rect x="52" y="46" width="16" height="34" rx="8" fill=${skinDarker} />
    <rect x="70" y="50" width="16" height="30" rx="8" fill=${skinDarker} />
    {/* Finger tips showing */}
    <rect x="16" y="50" width="16" height="12" rx="6" fill=${skinDark} />
    <rect x="34" y="44" width="16" height="12" rx="6" fill=${skinDark} />
    <rect x="52" y="44" width="16" height="12" rx="6" fill=${skinDark} />
    <rect x="70" y="48" width="16" height="12" rx="6" fill=${skinDark} />
    {/* Thumb tucked */}
    <rect x="8" y="70" width="22" height="12" rx="6" fill=${skinDark} />
    <text x="60" y="125" text-anchor="middle" font-size="14" font-weight="bold" fill="#6366f1">E</text>
  </svg>\n`,
  "F": (size = 120) => `\n<svg width=${size} height=${size} viewBox="0 0 120 130">
    <rect x="30" y="108" width="60" height="28" rx="10" fill="${skin}" />
    <ellipse cx="60" cy="75" rx="42" ry="48" fill="${skin}" />
    {/* Index + thumb touching (OK-like) */}
    <circle cx="35" cy="72" r="12" fill="none" stroke=${skinDarker} stroke-width="12" />
    {/* Other 3 fingers up */}
    <rect x="50" y="18" width="16" height="58" rx="8" fill=${skinDark} />
    <rect x="68" y="22" width="16" height="54" rx="8" fill=${skinDark} />
    <rect x="86" y="28" width="14" height="48" rx="7" fill=${skinDark} />
    <ellipse cx="58" cy="18" rx="8" ry="8" fill=${skin} />
    <ellipse cx="76" cy="22" rx="8" ry="8" fill=${skin} />
    <ellipse cx="93" cy="28" rx="7" ry="7" fill=${skin} />
    <text x="60" y="125" text-anchor="middle" font-size="14" font-weight="bold" fill="#6366f1">F</text>
  </svg>\n`,
  "G": (size = 120) => `\n<svg width=${size} height=${size} viewBox="0 0 120 130">
    <rect x="30" y="108" width="60" height="28" rx="10" fill="${skin}" />
    <ellipse cx="60" cy="75" rx="42" ry="40" fill=${skin} />
    {/* Hand sideways, index pointing right */}
    <rect x="60" y="56" width="50" height="16" rx="8" fill=${skinDark} />
    <ellipse cx="110" cy="64" rx="8" ry="8" fill=${skin} />
    {/* Thumb pointing right below */}
    <rect x="55" y="74" width="40" height="14" rx="7" fill=${skinDark} />
    <ellipse cx="95" cy="81" rx="7" ry="7" fill=${skinDarker} />
    {/* Fingers curled */}
    <ellipse cx="48" cy="52" rx="9" ry="9" fill=${skinDarker} />
    <ellipse cx="48" cy="68" rx="9" ry="9" fill=${skinDarker} />
    <ellipse cx="48" cy="84" rx="8" ry="8" fill=${skinDarker} />
    <text x="60" y="125" text-anchor="middle" font-size="14" font-weight="bold" fill="#6366f1">G</text>
  </svg>\n`,
  "H": (size = 120) => `\n<svg width=${size} height=${size} viewBox="0 0 120 130">
    <rect x="30" y="108" width="60" height="28" rx="10" fill="${skin}" />
    <ellipse cx="60" cy="75" rx="42" ry="40" fill=${skin} />
    {/* 2 fingers pointing right */}
    <rect x="58" y="52" width="50" height="16" rx="8" fill=${skinDark} />
    <rect x="58" y="70" width="50" height="16" rx="8" fill=${skinDark} />
    <ellipse cx="108" cy="60" rx="8" ry="8" fill=${skin} />
    <ellipse cx="108" cy="78" rx="8" ry="8" fill=${skin} />
    {/* Thumb */}
    <rect x="40" y="82" width="28" height="12" rx="6" fill=${skinDark} />
    {/* Curled fingers */}
    <ellipse cx="46" cy="48" rx="9" ry="9" fill=${skinDarker} />
    <ellipse cx="46" cy="92" rx="8" ry="8" fill=${skinDarker} />
    <text x="60" y="125" text-anchor="middle" font-size="14" font-weight="bold" fill="#6366f1">H</text>
  </svg>\n`,
  "I": (size = 120) => `\n<svg width=${size} height=${size} viewBox="0 0 120 130">
    <rect x="30" y="108" width="60" height="28" rx="10" fill="${skin}" />
    <ellipse cx="60" cy="75" rx="42" ry="48" fill="${skin}" />
    {/* Pinky up */}
    <rect x="76" y="20" width="16" height="60" rx="8" fill=${skinDark} />
    <ellipse cx="84" cy="20" rx="8" ry="8" fill=${skin} />
    {/* Others curled */}
    <ellipse cx="26" cy="58" rx="9" ry="9" fill=${skinDarker} />
    <ellipse cx="44" cy="52" rx="9" ry="9" fill=${skinDarker} />
    <ellipse cx="62" cy="52" rx="9" ry="9" fill=${skinDarker} />
    {/* Thumb */}
    <rect x="10" y="68" width="22" height="12" rx="6" fill=${skinDark} />
    <text x="60" y="125" text-anchor="middle" font-size="14" font-weight="bold" fill="#6366f1">I</text>
  </svg>\n`,
  "J": (size = 120) => `\n<svg width=${size} height=${size} viewBox="0 0 120 130">
    <rect x="30" y="108" width="60" height="28" rx="10" fill="${skin}" />
    <ellipse cx="60" cy="75" rx="42" ry="48" fill="${skin}" />
    {/* Pinky up */}
    <rect x="76" y="20" width="16" height="60" rx="8" fill=${skinDark} />
    <ellipse cx="84" cy="20" rx="8" ry="8" fill=${skin} />
    {/* Others curled */}
    <ellipse cx="26" cy="58" rx="9" ry="9" fill=${skinDarker} />
    <ellipse cx="44" cy="52" rx="9" ry="9" fill=${skinDarker} />
    <ellipse cx="62" cy="52" rx="9" ry="9" fill=${skinDarker} />
    {/* Thumb */}
    <rect x="10" y="68" width="22" height="12" rx="6" fill=${skinDark} />
    {/* J motion arrow */}
    <path d="M 84 18 Q 100 5 105 25 Q 108 40 95 45" stroke="#6366f1" stroke-width="3" fill="none" stroke-dasharray="4" />
    <polygon points="92,48 99,42 95,38" fill="#6366f1" />
    <text x="60" y="125" text-anchor="middle" font-size="14" font-weight="bold" fill="#6366f1">J</text>
  </svg>\n`,
  "K": (size = 120) => `\n<svg width=${size} height=${size} viewBox="0 0 120 130">
    <rect x="30" y="108" width="60" height="28" rx="10" fill="${skin}" />
    <ellipse cx="60" cy="75" rx="42" ry="48" fill="${skin}" />
    {/* Index up */}
    <rect x="36" y="18" width="16" height="62" rx="8" fill=${skinDark} />
    <ellipse cx="44" cy="18" rx="8" ry="8" fill=${skin} />
    {/* Middle up at angle */}
    <rect x="54" y="24" width="16" height="56" rx="8" fill=${skinDark} transform="rotate(-15,62,52)" />
    <ellipse cx="62" cy="20" rx="8" ry="8" fill=${skin} transform="rotate(-15,62,52)" />
    {/* Thumb between index and middle */}
    <rect x="28" y="58" width="26" height="12" rx="6" fill=${skinDark} />
    <ellipse cx="54" cy="64" rx="8" ry="8" fill=${skinDarker} />
    {/* Curled */}
    <ellipse cx="78" cy="58" rx="8" ry="8" fill=${skinDarker} />
    <ellipse cx="18" cy="68" rx="8" ry="8" fill=${skinDarker} />
    <text x="60" y="125" text-anchor="middle" font-size="14" font-weight="bold" fill="#6366f1">K</text>
  </svg>\n`,
  "L": (size = 120) => `\n<svg width=${size} height=${size} viewBox="0 0 120 130">
    <rect x="30" y="108" width="60" height="28" rx="10" fill="${skin}" />
    <ellipse cx="60" cy="75" rx="42" ry="48" fill="${skin}" />
    {/* Index finger up */}
    <rect x="36" y="16" width="18" height="64" rx="9" fill=${skinDark} />
    <ellipse cx="45" cy="16" rx="9" ry="9" fill=${skin} />
    {/* Thumb out to left (L shape) */}
    <rect x="8" y="72" width="42" height="16" rx="8" fill=${skinDark} />
    <ellipse cx="8" cy="80" rx="8" ry="8" fill=${skin} />
    {/* Other fingers curled */}
    <ellipse cx="62" cy="58" rx="9" ry="9" fill=${skinDarker} />
    <ellipse cx="78" cy="62" rx="8" ry="8" fill=${skinDarker} />
    <text x="60" y="125" text-anchor="middle" font-size="14" font-weight="bold" fill="#6366f1">L</text>
  </svg>\n`,
  "M": (size = 120) => `\n<svg width=${size} height=${size} viewBox="0 0 120 130">
    <rect x="30" y="108" width="60" height="28" rx="10" fill="${skin}" />
    <ellipse cx="60" cy="75" rx="42" ry="48" fill="${skin}" />
    {/* 3 fingers over thumb */}
    <rect x="20" y="50" width="16" height="32" rx="8" fill=${skinDarker} />
    <rect x="38" y="44" width="16" height="38" rx="8" fill=${skinDarker} />
    <rect x="56" y="44" width="16" height="38" rx="8" fill=${skinDarker} />
    <rect x="74" y="50" width="16" height="32" rx="8" fill=${skinDarker} />
    {/* Thumb under fingers */}
    <rect x="20" y="74" width="46" height="14" rx="7" fill=${skinDark} />
    {/* Knuckle bumps */}
    <ellipse cx="28" cy="50" rx="8" ry="8" fill=${skinDark} />
    <ellipse cx="46" cy="44" rx="8" ry="8" fill=${skinDark} />
    <ellipse cx="64" cy="44" rx="8" ry="8" fill=${skinDark} />
    <ellipse cx="82" cy="50" rx="8" ry="8" fill=${skinDark} />
    <text x="60" y="125" text-anchor="middle" font-size="14" font-weight="bold" fill="#6366f1">M</text>
  </svg>\n`,
  "N": (size = 120) => `\n<svg width=${size} height=${size} viewBox="0 0 120 130">
    <rect x="30" y="108" width="60" height="28" rx="10" fill="${skin}" />
    <ellipse cx="60" cy="75" rx="42" ry="48" fill="${skin}" />
    {/* 2 fingers over thumb */}
    <rect x="28" y="50" width="16" height="32" rx="8" fill=${skinDarker} />
    <rect x="46" y="44" width="16" height="38" rx="8" fill=${skinDarker} />
    <rect x="64" y="50" width="16" height="32" rx="8" fill=${skinDarker} />
    <rect x="80" y="54" width="16" height="28" rx="8" fill=${skinDarker} />
    {/* Thumb under 2 fingers */}
    <rect x="28" y="74" width="34" height="14" rx="7" fill=${skinDark} />
    <ellipse cx="36" cy="50" rx="8" ry="8" fill=${skinDark} />
    <ellipse cx="54" cy="44" rx="8" ry="8" fill=${skinDark} />
    <ellipse cx="72" cy="50" rx="8" ry="8" fill=${skinDarker} />
    <ellipse cx="88" cy="54" rx="8" ry="8" fill=${skinDarker} />
    <text x="60" y="125" text-anchor="middle" font-size="14" font-weight="bold" fill="#6366f1">N</text>
  </svg>\n`,
  "O": (size = 120) => `\n<svg width=${size} height=${size} viewBox="0 0 120 130">
    <rect x="30" y="108" width="60" height="28" rx="10" fill="${skin}" />
    <ellipse cx="60" cy="75" rx="42" ry="48" fill="${skin}" />
    {/* O shape */}
    <ellipse cx="60" cy="55" rx="30" ry="28" fill="none" stroke=${skinDark} stroke-width="20" />
    <ellipse cx="60" cy="55" rx="30" ry="28" fill="none" stroke=${skin} stroke-width="14" />
    <text x="60" y="125" text-anchor="middle" font-size="14" font-weight="bold" fill="#6366f1">O</text>
  </svg>\n`,
  "P": (size = 120) => `\n<svg width=${size} height=${size} viewBox="0 0 120 130">
    <rect x="30" y="108" width="60" height="28" rx="10" fill="${skin}" />
    <ellipse cx="60" cy="70" rx="42" ry="40" fill=${skin} />
    {/* Index pointing down-right */}
    <rect x="52" y="64" width="16" height="50" rx="8" fill=${skinDark} transform="rotate(30,60,89)" />
    <ellipse cx="74" cy="104" rx="8" ry="8" fill=${skin} />
    {/* Middle pointing down */}
    <rect x="66" y="60" width="16" height="50" rx="8" fill=${skinDark} transform="rotate(15,74,85)" />
    <ellipse cx="82" cy="108" rx="8" ry="8" fill=${skin} />
    {/* Thumb out */}
    <rect x="20" y="62" width="38" height="14" rx="7" fill=${skinDark} />
    <ellipse cx="20" cy="69" rx="7" ry="7" fill=${skinDarker} />
    {/* Curled fingers */}
    <ellipse cx="36" cy="52" rx="9" ry="9" fill=${skinDarker} />
    <ellipse cx="36" cy="68" rx="9" ry="9" fill=${skinDarker} />
    <text x="60" y="126" text-anchor="middle" font-size="14" font-weight="bold" fill="#6366f1">P</text>
  </svg>\n`,
  "Q": (size = 120) => `\n<svg width=${size} height=${size} viewBox="0 0 120 130">
    <rect x="30" y="108" width="60" height="28" rx="10" fill="${skin}" />
    <ellipse cx="60" cy="70" rx="42" ry="40" fill=${skin} />
    {/* Index and thumb pointing down */}
    <rect x="48" y="68" width="16" height="44" rx="8" fill=${skinDark} />
    <ellipse cx="56" cy="112" rx="8" ry="8" fill=${skin} />
    <rect x="30" y="68" width="14" height="38" rx="7" fill=${skinDark} />
    <ellipse cx="37" cy="106" rx="7" ry="7" fill=${skinDarker} />
    {/* Curled fingers */}
    <ellipse cx="74" cy="56" rx="9" ry="9" fill=${skinDarker} />
    <ellipse cx="88" cy="62" rx="8" ry="8" fill=${skinDarker} />
    <ellipse cx="78" cy="74" rx="9" ry="9" fill=${skinDarker} />
    <text x="60" y="126" text-anchor="middle" font-size="14" font-weight="bold" fill="#6366f1">Q</text>
  </svg>\n`,
  "R": (size = 120) => `\n<svg width=${size} height=${size} viewBox="0 0 120 130">
    <rect x="30" y="108" width="60" height="28" rx="10" fill="${skin}" />
    <ellipse cx="60" cy="75" rx="42" ry="48" fill="${skin}" />
    {/* Index and middle crossed */}
    <rect x="36" y="16" width="16" height="64" rx="8" fill=${skinDark} />
    <rect x="50" y="18" width="16" height="62" rx="8" fill=${skinDark} transform="rotate(8,58,49)" />
    <ellipse cx="44" cy="16" rx="8" ry="8" fill=${skin} />
    <ellipse cx="62" cy="14" rx="8" ry="8" fill=${skin} transform="rotate(8,58,49)" />
    {/* Other fingers */}
    <ellipse cx="76" cy="56" rx="9" ry="9" fill=${skinDarker} />
    <ellipse cx="20" cy="62" rx="8" ry="8" fill=${skinDarker} />
    {/* Thumb */}
    <rect x="14" y="72" width="24" height="12" rx="6" fill=${skinDark} />
    <text x="60" y="125" text-anchor="middle" font-size="14" font-weight="bold" fill="#6366f1">R</text>
  </svg>\n`,
  "S": (size = 120) => `\n<svg width=${size} height=${size} viewBox="0 0 120 130">
    <rect x="30" y="108" width="60" height="28" rx="10" fill="${skin}" />
    <ellipse cx="60" cy="75" rx="42" ry="48" fill="${skin}" />
    {/* Fist - all fingers curled */}
    <rect x="16" y="52" width="16" height="28" rx="8" fill=${skinDarker} />
    <rect x="34" y="46" width="16" height="34" rx="8" fill=${skinDarker} />
    <rect x="52" y="46" width="16" height="34" rx="8" fill=${skinDarker} />
    <rect x="70" y="50" width="16" height="30" rx="8" fill=${skinDarker} />
    <rect x="16" y="50" width="70" height="12" rx="6" fill=${skinDark} />
    {/* Thumb over fingers */}
    <rect x="16" y="62" width="38" height="14" rx="7" fill=${skinDark} />
    <ellipse cx="54" cy="69" rx="8" ry="8" fill=${skinDarker} />
    <text x="60" y="125" text-anchor="middle" font-size="14" font-weight="bold" fill="#6366f1">S</text>
  </svg>\n`,
  "T": (size = 120) => `\n<svg width=${size} height=${size} viewBox="0 0 120 130">
    <rect x="30" y="108" width="60" height="28" rx="10" fill="${skin}" />
    <ellipse cx="60" cy="75" rx="42" ry="48" fill="${skin}" />
    {/* Fingers curled */}
    <rect x="16" y="52" width="16" height="28" rx="8" fill=${skinDarker} />
    <rect x="34" y="46" width="16" height="34" rx="8" fill=${skinDarker} />
    <rect x="52" y="46" width="16" height="34" rx="8" fill=${skinDarker} />
    <rect x="70" y="50" width="16" height="30" rx="8" fill=${skinDarker} />
    <rect x="16" y="50" width="70" height="12" rx="6" fill=${skinDark} />
    {/* Thumb between index and middle fingers */}
    <rect x="28" y="56" width="16" height="22" rx="7" fill=${skinDark} />
    <ellipse cx="36" cy="55" rx="8" ry="8" fill=${skin} />
    <text x="60" y="125" text-anchor="middle" font-size="14" font-weight="bold" fill="#6366f1">T</text>
  </svg>\n`,
  "U": (size = 120) => `\n<svg width=${size} height=${size} viewBox="0 0 120 130">
    <rect x="30" y="108" width="60" height="28" rx="10" fill="${skin}" />
    <ellipse cx="60" cy="75" rx="42" ry="48" fill="${skin}" />
    {/* Index + middle up together */}
    <rect x="36" y="16" width="16" height="64" rx="8" fill=${skinDark} />
    <rect x="54" y="16" width="16" height="64" rx="8" fill=${skinDark} />
    <ellipse cx="44" cy="16" rx="8" ry="8" fill=${skin} />
    <ellipse cx="62" cy="16" rx="8" ry="8" fill=${skin} />
    {/* Others curled */}
    <ellipse cx="78" cy="56" rx="9" ry="9" fill=${skinDarker} />
    <ellipse cx="20" cy="62" rx="8" ry="8" fill=${skinDarker} />
    {/* Thumb */}
    <rect x="14" y="72" width="24" height="12" rx="6" fill=${skinDark} />
    <text x="60" y="125" text-anchor="middle" font-size="14" font-weight="bold" fill="#6366f1">U</text>
  </svg>\n`,
  "V": (size = 120) => `\n<svg width=${size} height=${size} viewBox="0 0 120 130">
    <rect x="30" y="108" width="60" height="28" rx="10" fill="${skin}" />
    <ellipse cx="60" cy="75" rx="42" ry="48" fill="${skin}" />
    {/* V shape - index and middle spread */}
    <rect x="28" y="16" width="16" height="64" rx="8" fill=${skinDark} transform="rotate(-12,36,48)" />
    <rect x="60" y="16" width="16" height="64" rx="8" fill=${skinDark} transform="rotate(12,68,48)" />
    <ellipse cx="26" cy="12" rx="8" ry="8" fill=${skin} transform="rotate(-12,36,48)" />
    <ellipse cx="70" cy="12" rx="8" ry="8" fill=${skin} transform="rotate(12,68,48)" />
    {/* Others curled */}
    <ellipse cx="82" cy="58" rx="9" ry="9" fill=${skinDarker} />
    <ellipse cx="16" cy="64" rx="8" ry="8" fill=${skinDarker} />
    {/* Thumb */}
    <rect x="14" y="74" width="24" height="12" rx="6" fill=${skinDark} />
    <text x="60" y="125" text-anchor="middle" font-size="14" font-weight="bold" fill="#6366f1">V</text>
  </svg>\n`,
  "W": (size = 120) => `\n<svg width=${size} height=${size} viewBox="0 0 120 130">
    <rect x="30" y="108" width="60" height="28" rx="10" fill="${skin}" />
    <ellipse cx="60" cy="75" rx="42" ry="48" fill="${skin}" />
    {/* Index, middle, ring up and spread */}
    <rect x="22" y="16" width="16" height="64" rx="8" fill=${skinDark} transform="rotate(-10,30,48)" />
    <rect x="50" y="12" width="16" height="68" rx="8" fill=${skinDark} />
    <rect x="76" y="16" width="16" height="64" rx="8" fill=${skinDark} transform="rotate(10,84,48)" />
    <ellipse cx="22" cy="10" rx="8" ry="8" fill=${skin} transform="rotate(-10,30,48)" />
    <ellipse cx="58" cy="12" rx="8" ry="8" fill=${skin} />
    <ellipse cx="86" cy="10" rx="8" ry="8" fill=${skin} transform="rotate(10,84,48)" />
    {/* Pinky curled */}
    <ellipse cx="94" cy="60" rx="8" ry="8" fill=${skinDarker} />
    {/* Thumb */}
    <rect x="8" y="74" width="22" height="12" rx="6" fill=${skinDark} />
    <text x="60" y="125" text-anchor="middle" font-size="14" font-weight="bold" fill="#6366f1">W</text>
  </svg>\n`,
  "X": (size = 120) => `\n<svg width=${size} height=${size} viewBox="0 0 120 130">
    <rect x="30" y="108" width="60" height="28" rx="10" fill="${skin}" />
    <ellipse cx="60" cy="75" rx="42" ry="48" fill="${skin}" />
    {/* Index finger hooked/bent */}
    <path d="M 44 80 Q 44 50 50 35 Q 56 20 60 30 Q 64 42 54 55 Q 50 65 44 80" fill=${skinDark} stroke-width="14" stroke=${skinDark} stroke-linejoin="round" />
    <ellipse cx="55" cy="30" rx="8" ry="8" fill=${skin} />
    {/* Others curled */}
    <ellipse cx="62" cy="58" rx="9" ry="9" fill=${skinDarker} />
    <ellipse cx="78" cy="62" rx="8" ry="8" fill=${skinDarker} />
    <ellipse cx="20" cy="64" rx="8" ry="8" fill=${skinDarker} />
    {/* Thumb */}
    <rect x="14" y="72" width="24" height="12" rx="6" fill=${skinDark} />
    <text x="60" y="125" text-anchor="middle" font-size="14" font-weight="bold" fill="#6366f1">X</text>
  </svg>\n`,
  "Y": (size = 120) => `\n<svg width=${size} height=${size} viewBox="0 0 120 130">
    <rect x="30" y="108" width="60" height="28" rx="10" fill="${skin}" />
    <ellipse cx="60" cy="75" rx="42" ry="48" fill="${skin}" />
    {/* Pinky up */}
    <rect x="76" y="20" width="16" height="60" rx="8" fill=${skinDark} />
    <ellipse cx="84" cy="20" rx="8" ry="8" fill=${skin} />
    {/* Thumb out to left */}
    <rect x="8" y="68" width="44" height="16" rx="8" fill=${skinDark} />
    <ellipse cx="8" cy="76" rx="8" ry="8" fill=${skin} />
    {/* Other 3 curled */}
    <ellipse cx="26" cy="56" rx="9" ry="9" fill=${skinDarker} />
    <ellipse cx="44" cy="50" rx="9" ry="9" fill=${skinDarker} />
    <ellipse cx="62" cy="50" rx="9" ry="9" fill=${skinDarker} />
    <text x="60" y="125" text-anchor="middle" font-size="14" font-weight="bold" fill="#6366f1">Y</text>
  </svg>\n`,
  "Z": (size = 120) => `\n<svg width=${size} height=${size} viewBox="0 0 120 130">
    <rect x="30" y="108" width="60" height="28" rx="10" fill="${skin}" />
    <ellipse cx="60" cy="75" rx="42" ry="48" fill="${skin}" />
    {/* Index up */}
    <rect x="36" y="16" width="18" height="64" rx="9" fill=${skinDark} />
    <ellipse cx="45" cy="16" rx="9" ry="9" fill=${skin} />
    {/* Others curled */}
    <ellipse cx="62" cy="55" rx="9" ry="9" fill=${skinDarker} />
    <ellipse cx="78" cy="60" rx="8" ry="8" fill=${skinDarker} />
    <ellipse cx="20" cy="62" rx="8" ry="8" fill=${skinDarker} />
    {/* Thumb */}
    <rect x="10" y="68" width="22" height="12" rx="6" fill=${skinDark} />
    {/* Z path arrow */}
    <path d="M 72 12 L 100 12 L 72 36 L 100 36" stroke="#6366f1" stroke-width="3" fill="none" stroke-linecap="round" stroke-linejoin="round" stroke-dasharray="4" />
    <polygon points="100,33 106,36 100,40" fill="#6366f1" />
    <text x="60" y="125" text-anchor="middle" font-size="14" font-weight="bold" fill="#6366f1">Z</text>
  </svg>\n`,
  " ": (size = 120) => `\n<svg width=${size} height=${size} viewBox="0 0 120 130">
    <rect x="20" y="50" width="80" height="40" rx="10" fill="#e0e7ff" stroke="#6366f1" stroke-width="2" stroke-dasharray="6" />
    <text x="60" y="75" text-anchor="middle" font-size="13" fill="#6366f1" font-weight="bold">SPACE</text>
    <text x="60" y="125" text-anchor="middle" font-size="14" font-weight="bold" fill="#6366f1">_</text>
  </svg>\n`,
};
