export const formatName = (raw = "") => {
  const cleaned = raw.replace(/\s*\(\d+\)\s*$/, "").trim();
  const [last, ...rest] = cleaned.split(/\s+/);
  return rest.length ? `${rest.join(" ")} ${last}` : cleaned;
};

export const extractShiftTime = (text = "") => {
  const match = text.match(
    /Whole Shift:(\d{1,2}):?(\d{0,2})?\s*-\s*(\d{1,2}):?(\d{0,2})?/
  );
  if (!match) return "";
  const [, sh, sm = "0", eh, em = "0"] = match;
  const pad = (n) => n.toString().padStart(2, "0");
  return `${pad(sh)}:${pad(sm)}–${pad(eh)}:${pad(em)}`;
};

export const timeToMinutes = (t) => {
  const [h, m] = t.split(":").map(Number);
  return h * 60 + m;
};
