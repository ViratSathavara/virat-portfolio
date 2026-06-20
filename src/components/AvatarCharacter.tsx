type AvatarState =
  | "idle"
  | "running"
  | "jumping"
  | "laughing"
  | "celebrating"
  | "waving";

interface AvatarCharacterProps {
  state: AvatarState;
  scale?: number;
}

export function AvatarCharacter({ state, scale = 1 }: AvatarCharacterProps) {
  const getBodyAnim = () => {
    switch (state) {
      case "running":
        return "avatar-body-run";
      case "jumping":
        return "avatar-body-jump";
      case "laughing":
        return "avatar-body-laugh";
      case "celebrating":
        return "avatar-body-celebrate";
      case "waving":
        return "avatar-body-wave";
      default:
        return "avatar-body-idle";
    }
  };

  const getLeftArmAnim = () => {
    switch (state) {
      case "running":
        return "avatar-larm-run";
      case "waving":
        return "avatar-larm-wave";
      case "celebrating":
        return "avatar-arm-celebrate";
      case "laughing":
        return "avatar-arm-laugh";
      case "jumping":
        return "avatar-arm-jump";
      default:
        return "";
    }
  };

  const getRightArmAnim = () => {
    switch (state) {
      case "running":
        return "avatar-rarm-run";
      case "celebrating":
        return "avatar-arm-celebrate";
      case "laughing":
        return "avatar-arm-laugh";
      case "jumping":
        return "avatar-arm-jump";
      default:
        return "";
    }
  };

  const getLeftLegAnim = () => {
    switch (state) {
      case "running":
        return "avatar-lleg-run";
      case "jumping":
        return "avatar-leg-jump";
      default:
        return "";
    }
  };

  const getRightLegAnim = () => {
    switch (state) {
      case "running":
        return "avatar-rleg-run";
      case "jumping":
        return "avatar-leg-jump";
      default:
        return "";
    }
  };

  const getHeadAnim = () => {
    switch (state) {
      case "laughing":
        return "avatar-head-laugh";
      case "celebrating":
        return "avatar-head-celebrate";
      case "running":
        return "avatar-head-run";
      default:
        return "";
    }
  };

  return (
    <svg
      width={80 * scale}
      height={120 * scale}
      viewBox="0 0 80 120"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="drop-shadow-2xl"
      style={{
        filter:
          state === "celebrating"
            ? "drop-shadow(0 0 10px hsl(38 90% 55% / 0.9))"
            : state === "laughing"
            ? "drop-shadow(0 0 6px hsl(38 90% 55% / 0.5))"
            : "drop-shadow(0 4px 14px rgba(0,0,0,0.5))",
      }}
    >
      <defs>
        <radialGradient id="skinGrad" cx="50%" cy="40%" r="55%">
          <stop offset="0%" stopColor="#FDDBB4" />
          <stop offset="100%" stopColor="#F0A868" />
        </radialGradient>
        <radialGradient id="hairGrad" cx="50%" cy="30%" r="60%">
          <stop offset="0%" stopColor="#8B6914" />
          <stop offset="100%" stopColor="#5C420A" />
        </radialGradient>
        <linearGradient id="jacketGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#5B8BCC" />
          <stop offset="100%" stopColor="#3A6EA8" />
        </linearGradient>
        <linearGradient id="shirtGrad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#F5F5F0" />
          <stop offset="100%" stopColor="#E0E0D8" />
        </linearGradient>
        <linearGradient id="pantsGrad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#2A2A2A" />
          <stop offset="100%" stopColor="#111111" />
        </linearGradient>
        <linearGradient id="shoeGrad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#333333" />
          <stop offset="100%" stopColor="#111111" />
        </linearGradient>
        <radialGradient id="glowGrad" cx="50%" cy="50%" r="50%">
          <stop
            offset="0%"
            stopColor="hsl(38 90% 55%)"
            stopOpacity="0.4"
          />
          <stop
            offset="100%"
            stopColor="hsl(38 90% 55%)"
            stopOpacity="0"
          />
        </radialGradient>
      </defs>

      {/* Glow when celebrating */}
      {(state === "celebrating" || state === "laughing") && (
        <ellipse
          cx="40"
          cy="60"
          rx="38"
          ry="55"
          fill="url(#glowGrad)"
          className="avatar-glow-pulse"
        />
      )}

      {/* Shadow */}
      <ellipse
        cx="40"
        cy="118"
        rx="20"
        ry="4"
        fill="rgba(0,0,0,0.25)"
        className={state === "jumping" ? "avatar-shadow-jump" : ""}
      />

      {/* === LEGS === */}
      {/* Left leg */}
      <g
        className={getLeftLegAnim()}
        style={{ transformOrigin: "38px 87px" }}
      >
        <rect x="31" y="87" width="12" height="16" rx="5" fill="url(#pantsGrad)" />
        <rect x="31" y="100" width="12" height="13" rx="4" fill="url(#pantsGrad)" />
        <ellipse cx="36" cy="114" rx="9" ry="5" fill="url(#shoeGrad)" />
        <ellipse cx="39" cy="113" rx="5" ry="3" fill="#444" />
        <line
          x1="33"
          y1="112"
          x2="40"
          y2="112"
          stroke="white"
          strokeWidth="0.8"
          strokeDasharray="2,1.5"
        />
      </g>

      {/* Right leg */}
      <g
        className={getRightLegAnim()}
        style={{ transformOrigin: "50px 87px" }}
      >
        <rect x="43" y="87" width="12" height="16" rx="5" fill="url(#pantsGrad)" />
        <rect x="43" y="100" width="12" height="13" rx="4" fill="url(#pantsGrad)" />
        <ellipse cx="48" cy="114" rx="9" ry="5" fill="url(#shoeGrad)" />
        <ellipse cx="51" cy="113" rx="5" ry="3" fill="#444" />
        <line
          x1="44"
          y1="112"
          x2="52"
          y2="112"
          stroke="white"
          strokeWidth="0.8"
          strokeDasharray="2,1.5"
        />
      </g>

      {/* === BODY === */}
      <g className={getBodyAnim()} style={{ transformOrigin: "40px 70px" }}>
        {/* Torso - inner shirt */}
        <rect x="28" y="58" width="24" height="30" rx="6" fill="url(#shirtGrad)" />

        {/* Jacket panels */}
        <path
          d="M22 58 L34 58 L33 88 L20 88 Q18 80 18 72 Q18 62 22 58Z"
          fill="url(#jacketGrad)"
        />
        <path
          d="M58 58 L46 58 L47 88 L60 88 Q62 80 62 72 Q62 62 58 58Z"
          fill="url(#jacketGrad)"
        />
        {/* Jacket collar */}
        <path d="M34 58 L28 64 L32 70 L38 63Z" fill="#4A7AB8" />
        <path d="M46 58 L52 64 L48 70 L42 63Z" fill="#4A7AB8" />
        <path d="M35 62 L40 70 L45 62 L40 58Z" fill="url(#shirtGrad)" />

        {/* Jacket buttons */}
        <circle cx="35" cy="72" r="1.2" fill="#2A5A9A" />
        <circle cx="37" cy="78" r="1.2" fill="#2A5A9A" />

        {/* Left arm */}
        <g
          className={getLeftArmAnim()}
          style={{ transformOrigin: "23px 63px" }}
        >
          <rect x="16" y="58" width="10" height="22" rx="5" fill="url(#jacketGrad)" />
          <rect x="16" y="74" width="10" height="5" rx="2.5" fill="#4A7AB8" />
          <ellipse cx="21" cy="82" rx="5" ry="5.5" fill="url(#skinGrad)" />
          <path
            d="M18 80 Q21 79 24 80"
            stroke="#E09060"
            strokeWidth="0.8"
            fill="none"
          />
        </g>

        {/* Right arm */}
        <g
          className={getRightArmAnim()}
          style={{ transformOrigin: "57px 63px" }}
        >
          <rect x="54" y="58" width="10" height="22" rx="5" fill="url(#jacketGrad)" />
          <rect x="54" y="74" width="10" height="5" rx="2.5" fill="#4A7AB8" />
          <ellipse cx="59" cy="82" rx="5" ry="5.5" fill="url(#skinGrad)" />
          <path
            d="M56 80 Q59 79 62 80"
            stroke="#E09060"
            strokeWidth="0.8"
            fill="none"
          />
        </g>

        {/* === HEAD === */}
        <g className={getHeadAnim()} style={{ transformOrigin: "40px 32px" }}>
          {/* Neck */}
          <rect x="36" y="50" width="8" height="10" rx="4" fill="url(#skinGrad)" />
          {/* Head */}
          <ellipse cx="40" cy="30" rx="18" ry="20" fill="url(#skinGrad)" />
          {/* Hair */}
          <path
            d="M22 28 Q22 10 40 8 Q58 10 58 28 Q55 18 50 17 Q46 10 40 10 Q34 10 30 17 Q25 18 22 28Z"
            fill="url(#hairGrad)"
          />
          <path
            d="M34 10 Q36 4 40 6 Q44 4 46 10"
            fill="url(#hairGrad)"
          />
          <path d="M38 8 Q40 2 42 8" fill="url(#hairGrad)" />
          {/* Ears */}
          <ellipse cx="22" cy="32" rx="3.5" ry="4.5" fill="url(#skinGrad)" />
          <ellipse cx="22" cy="32" rx="2" ry="2.5" fill="#E09060" />
          <ellipse cx="58" cy="32" rx="3.5" ry="4.5" fill="url(#skinGrad)" />
          <ellipse cx="58" cy="32" rx="2" ry="2.5" fill="#E09060" />

          {/* Eyes */}
          {state === "laughing" || state === "celebrating" ? (
            <>
              <path
                d="M31 28 Q34 25 37 28"
                stroke="#2A1A00"
                strokeWidth="2"
                fill="none"
                strokeLinecap="round"
              />
              <path
                d="M43 28 Q46 25 49 28"
                stroke="#2A1A00"
                strokeWidth="2"
                fill="none"
                strokeLinecap="round"
              />
              <ellipse cx="30" cy="35" rx="4" ry="2.5" fill="rgba(255,100,100,0.3)" />
              <ellipse cx="50" cy="35" rx="4" ry="2.5" fill="rgba(255,100,100,0.3)" />
            </>
          ) : (
            <>
              <ellipse cx="33" cy="29" rx="4.5" ry="5" fill="white" />
              <ellipse cx="47" cy="29" rx="4.5" ry="5" fill="white" />
              <ellipse cx="34" cy="30" rx="2.5" ry="3" fill="#2A1A00" />
              <ellipse cx="48" cy="30" rx="2.5" ry="3" fill="#2A1A00" />
              <ellipse cx="35" cy="28.5" rx="1" ry="1.2" fill="white" />
              <ellipse cx="49" cy="28.5" rx="1" ry="1.2" fill="white" />
              <path
                d="M29 24 Q33 22 37 24"
                stroke="#5C420A"
                strokeWidth="2"
                fill="none"
                strokeLinecap="round"
              />
              <path
                d="M43 24 Q47 22 51 24"
                stroke="#5C420A"
                strokeWidth="2"
                fill="none"
                strokeLinecap="round"
              />
            </>
          )}

          {/* Nose */}
          <path
            d="M38 35 Q40 38 42 35"
            stroke="#C07840"
            strokeWidth="1.2"
            fill="none"
            strokeLinecap="round"
          />

          {/* Mouth */}
          {state === "laughing" || state === "celebrating" ? (
            <>
              <path
                d="M32 40 Q40 47 48 40"
                stroke="#2A1A00"
                strokeWidth="2"
                fill="none"
                strokeLinecap="round"
              />
              <path d="M34 40 Q40 46 46 40" fill="rgba(200,50,50,0.6)" />
              <path
                d="M35 40 Q40 43 45 40 L44 42 Q40 44 36 42Z"
                fill="white"
              />
            </>
          ) : state === "waving" ? (
            <path
              d="M34 40 Q40 44 46 40"
              stroke="#2A1A00"
              strokeWidth="1.8"
              fill="none"
              strokeLinecap="round"
            />
          ) : (
            <path
              d="M34 40 Q40 43 46 40"
              stroke="#2A1A00"
              strokeWidth="1.5"
              fill="none"
              strokeLinecap="round"
            />
          )}

          {/* Ear stud */}
          <circle cx="58" cy="30" r="1.5" fill="#E8C040" />
        </g>
      </g>
    </svg>
  );
}
