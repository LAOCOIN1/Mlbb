import { MLBBCheckResult } from "../types";

// MLBB Zone to Region helper mapping
export function getZoneRegion(zoneId: string): string {
  const num = parseInt(zoneId, 10);
  if (isNaN(num)) return "Unknown Region";
  if (num >= 9000 && num <= 9999) return "Advanced / Beta Server";
  if (num >= 2000 && num < 3000) return "Indonesia / Southeast Asia (ID)";
  if (num >= 3000 && num < 4000) return "Philippines / Malaysia / Singapore (PH/MY/SG)";
  if (num >= 4000 && num < 5000) return "Latin America (LATAM / BR)";
  if (num >= 5000 && num < 6000) return "North America / Europe (NA/EU)";
  if (num >= 6000 && num < 7000) return "CIS / Russia / Eastern Europe (CIS)";
  if (num >= 7000 && num < 8000) return "Middle East & South Asia (MENA/TR/IN)";
  if (num >= 8000 && num < 9000) return "East Asia (JP/KR/TW)";
  if (num >= 1000 && num < 2000) return "Global / Legacy Server";
  return `Server Zone ${zoneId}`;
}

export async function checkMLBBAccount(id: string, server: string): Promise<MLBBCheckResult> {
  const cleanId = id.trim();
  const cleanServer = server.trim();
  const estimatedRegion = getZoneRegion(cleanServer);

  const targetApiUrl = `https://yanjiestore.com/submitt.php?ID=${encodeURIComponent(cleanId)}&server=${encodeURIComponent(cleanServer)}`;

  // List of CORS proxies to try
  const proxies = [
    `https://api.allorigins.win/get?url=${encodeURIComponent(targetApiUrl)}`,
    `https://corsproxy.io/?url=${encodeURIComponent(targetApiUrl)}`,
    `https://api.codetabs.com/v1/proxy?quest=${encodeURIComponent(targetApiUrl)}`,
  ];

  // Helper to parse HTML response from Yanjiestore
  const parseYanjieHtml = (rawHtml: string) => {
    const nicknameMatch = rawHtml.match(/Nickname:\s*([^<\n\r]+)/i);
    const countryMatch = rawHtml.match(/Akun Dibuat Negara:\s*([^<\n\r]+)/i);
    if (nicknameMatch || countryMatch) {
      return {
        nickname: nicknameMatch ? nicknameMatch[1].trim() : "Unknown",
        country: countryMatch ? countryMatch[1].trim() : "Unknown",
        raw: rawHtml,
      };
    }
    return null;
  };

  // Try Yanjiestore via proxies
  for (const proxyUrl of proxies) {
    try {
      const res = await fetch(proxyUrl, { signal: AbortSignal.timeout(4500) });
      if (!res.ok) continue;

      let content = "";
      if (proxyUrl.includes("allorigins")) {
        const data = await res.json() as { contents?: string };
        content = data.contents || "";
      } else {
        content = await res.text();
      }

      const parsed = parseYanjieHtml(content);
      if (parsed && (parsed.nickname !== "Unknown" || parsed.country !== "Unknown")) {
        return {
          success: true,
          id: cleanId,
          server: cleanServer,
          nickname: parsed.nickname,
          country: parsed.country,
          serverRegion: estimatedRegion,
          source: "yanjiestore",
          raw: parsed.raw,
          timestamp: Date.now(),
        };
      }
    } catch {
      // Continue to next proxy
    }
  }

  // Fallback 1: API Cek ID Game
  try {
    const apiGameUrl = `https://api-cek-id-game-ten.vercel.app/api/check-id-game?type_name=mobile_legends&userId=${encodeURIComponent(cleanId)}&zoneId=${encodeURIComponent(cleanServer)}`;
    const res = await fetch(apiGameUrl, { signal: AbortSignal.timeout(4500) });
    if (res.ok) {
      const data = await res.json() as {
        status?: boolean;
        nickname?: string;
        username?: string;
        data?: { username?: string; nickname?: string };
      };
      const nick = data.nickname || data.username || data.data?.username || data.data?.nickname;
      if (data.status && nick) {
        return {
          success: true,
          id: cleanId,
          server: cleanServer,
          nickname: nick,
          country: estimatedRegion,
          serverRegion: estimatedRegion,
          source: "api-game-id",
          timestamp: Date.now(),
        };
      }
    }
  } catch {
    // Continue
  }

  // Fallback 2: Smile.one Check
  try {
    const res = await fetch("https://www.smile.one/merchant/mobilelegends/checkrole", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: `user_id=${encodeURIComponent(cleanId)}&zone_id=${encodeURIComponent(cleanServer)}&pid=26&checkrole=1`,
      signal: AbortSignal.timeout(4000),
    });
    if (res.ok) {
      const data = await res.json() as { code?: number; username?: string };
      if (data.code === 200 && data.username) {
        return {
          success: true,
          id: cleanId,
          server: cleanServer,
          nickname: data.username,
          country: estimatedRegion,
          serverRegion: estimatedRegion,
          source: "smileone",
          timestamp: Date.now(),
        };
      }
    }
  } catch {
    // Fail
  }

  return {
    success: false,
    id: cleanId,
    server: cleanServer,
    nickname: "",
    country: "",
    serverRegion: estimatedRegion,
    error: "Account not found / ไม่พบข้อมูลบัญชี Mobile Legends หรือ Server Zone ไม่ถูกต้อง",
    timestamp: Date.now(),
  };
}
