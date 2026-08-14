/**
 * Builds the signed-agreement PDF in the browser.
 *
 * `pdf-lib` is ~100KB and is only ever needed on the noindex agreement page,
 * so it is imported dynamically inside the function rather than at module
 * scope — nothing else on the site pays for it.
 */
export interface AgreementRecord {
  name: string;
  phone: string;
  email: string;
  college: string;
  project: string;
  tier: string;
  version: string;
  signedAt: string;
  clauses: readonly string[];
}

const MARGIN = 56;
const TITLE_SIZE = 20;
const BODY_SIZE = 10;
const LINE = 14;

/** Wrap on width rather than character count — proportional fonts vary enough
 *  that a fixed column produces ragged, sometimes overflowing lines. */
function wrap(
  text: string,
  font: { widthOfTextAtSize(t: string, s: number): number },
  size: number,
  maxWidth: number,
): string[] {
  const words = text.split(/\s+/);
  const lines: string[] = [];
  let line = "";
  for (const word of words) {
    const candidate = line ? `${line} ${word}` : word;
    if (font.widthOfTextAtSize(candidate, size) > maxWidth && line) {
      lines.push(line);
      line = word;
    } else {
      line = candidate;
    }
  }
  if (line) lines.push(line);
  return lines;
}

export async function buildAgreementPdf(
  record: AgreementRecord,
): Promise<Uint8Array> {
  const { PDFDocument, StandardFonts, rgb } = await import("pdf-lib");

  const doc = await PDFDocument.create();
  doc.setTitle(`Student agreement — ${record.name}`);
  doc.setSubject(`Agreement v${record.version}`);
  doc.setProducer("yaseenkhatib.streamerosai.com");

  const regular = await doc.embedFont(StandardFonts.Helvetica);
  const bold = await doc.embedFont(StandardFonts.HelveticaBold);

  let page = doc.addPage();
  const { width, height } = page.getSize();
  const maxWidth = width - MARGIN * 2;
  let y = height - MARGIN;

  const ink = rgb(0.05, 0.05, 0.06);
  const muted = rgb(0.42, 0.42, 0.46);

  const nextPage = () => {
    page = doc.addPage();
    y = page.getSize().height - MARGIN;
  };

  const write = (
    text: string,
    opts: { size?: number; font?: typeof regular; color?: typeof ink } = {},
  ) => {
    const size = opts.size ?? BODY_SIZE;
    const font = opts.font ?? regular;
    for (const line of wrap(text, font, size, maxWidth)) {
      if (y < MARGIN + LINE) nextPage();
      page.drawText(line, {
        x: MARGIN,
        y,
        size,
        font,
        color: opts.color ?? ink,
      });
      y -= LINE;
    }
  };

  const gap = (n = 1) => {
    y -= LINE * n;
  };

  write("Student agreement", { size: TITLE_SIZE, font: bold });
  gap(0.4);
  write(
    `Agreement version ${record.version} · consented ${new Date(record.signedAt).toLocaleString("en-IN")}`,
    { color: muted },
  );
  gap();

  write("Student", { font: bold });
  gap(0.2);
  for (const [label, value] of [
    ["Name", record.name],
    ["Mobile", record.phone],
    ["Email", record.email],
    ["College", record.college],
    ["Project", record.project],
    ["Tier", record.tier],
  ]) {
    write(`${label}: ${value || "—"}`);
  }
  gap();

  write("Consented to each of the following", { font: bold });
  gap(0.2);
  record.clauses.forEach((clause, i) => {
    write(`${i + 1}. ${clause}`);
    gap(0.2);
  });
  gap(0.6);

  write(
    "This record was generated at the moment consent was given on yaseenkhatib.streamerosai.com/final-year-projects/agreement. The full clause text for this version is published on that page.",
    { color: muted },
  );
  gap(0.4);
  write(
    "It sits alongside the public terms at yaseenkhatib.streamerosai.com/final-year-projects/terms. Where anything differs, whatever was agreed in writing over email or WhatsApp holds.",
    { color: muted },
  );

  return doc.save();
}

/** Stable, sortable filename — the name is included so a folder of these is
 *  readable without opening each one. */
export function agreementFilename(record: AgreementRecord): string {
  const safe = record.name.replace(/[^a-z0-9]+/gi, "-").toLowerCase() || "student";
  return `${record.signedAt.slice(0, 10)}-${safe}.pdf`;
}
