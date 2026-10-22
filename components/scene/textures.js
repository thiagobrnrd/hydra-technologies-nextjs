import * as THREE from "three";

const FONT = '"Inter Variable", Inter, system-ui, sans-serif';
const DISPLAY = '"Sora Variable", Sora, "Inter Variable", system-ui, sans-serif';
const MONO = '"JetBrains Mono", ui-monospace, monospace';

export function rr(ctx, x, y, w, h, r) {
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.arcTo(x + w, y, x + w, y + h, r);
  ctx.arcTo(x + w, y + h, x, y + h, r);
  ctx.arcTo(x, y + h, x, y, r);
  ctx.arcTo(x, y, x + w, y, r);
  ctx.closePath();
}

/** Cria uma CanvasTexture e redesenha quando as fontes web terminam de carregar. */
export function canvasTexture(w, h, draw) {
  const canvas = document.createElement("canvas");
  canvas.width = w;
  canvas.height = h;
  const ctx = canvas.getContext("2d");
  const tex = new THREE.CanvasTexture(canvas);
  tex.colorSpace = THREE.SRGBColorSpace;
  tex.anisotropy = 8;
  const paint = () => {
    ctx.clearRect(0, 0, w, h);
    draw(ctx, w, h);
    tex.needsUpdate = true;
  };
  paint();
  if (typeof document !== "undefined" && document.fonts?.ready) document.fonts.ready.then(paint);
  return tex;
}

/* ─────────── Camadas do "site institucional" explodido ─────────── */
export function siteLayer(kind) {
  return canvasTexture(1024, 640, (c, W, H) => {
    if (kind === 0) {
      // Base: moldura do navegador
      const g = c.createLinearGradient(0, 0, W, H);
      g.addColorStop(0, "#0b1324");
      g.addColorStop(1, "#060a14");
      rr(c, 4, 4, W - 8, H - 8, 28);
      c.fillStyle = g;
      c.fill();
      c.strokeStyle = "rgba(120,190,255,0.35)";
      c.lineWidth = 3;
      c.stroke();
      c.fillStyle = "rgba(255,255,255,0.04)";
      c.fillRect(4, 52, W - 8, 2);
      ["#ff5f57", "#febc2e", "#28c840"].forEach((col, i) => {
        c.beginPath();
        c.arc(38 + i * 26, 30, 8, 0, Math.PI * 2);
        c.fillStyle = col;
        c.fill();
      });
      rr(c, 300, 16, 424, 28, 14);
      c.fillStyle = "rgba(255,255,255,0.06)";
      c.fill();
      c.fillStyle = "rgba(200,220,255,0.75)";
      c.font = `500 15px ${MONO}`;
      c.textAlign = "center";
      c.fillText("suaempresa.com.br", W / 2, 35);
      // grid sutil
      c.strokeStyle = "rgba(76,201,255,0.06)";
      c.lineWidth = 1;
      for (let x = 40; x < W; x += 40) {
        c.beginPath();
        c.moveTo(x, 60);
        c.lineTo(x, H - 10);
        c.stroke();
      }
      for (let y = 80; y < H; y += 40) {
        c.beginPath();
        c.moveTo(10, y);
        c.lineTo(W - 10, y);
        c.stroke();
      }
    }
    if (kind === 1) {
      // Layout: wireframe
      c.strokeStyle = "rgba(76,201,255,0.9)";
      c.setLineDash([10, 8]);
      c.lineWidth = 2.5;
      const box = (x, y, w, h, r = 10) => {
        rr(c, x, y, w, h, r);
        c.stroke();
      };
      box(40, 76, W - 80, 44);
      box(40, 150, 520, 230, 16);
      box(590, 150, 394, 230, 16);
      [0, 1, 2].forEach((i) => box(40 + i * 318, 410, 296, 150, 16));
      c.setLineDash([]);
      c.fillStyle = "rgba(76,201,255,0.9)";
      c.font = `600 14px ${MONO}`;
      c.fillText("<header/>", 54, 104);
      c.fillText("<hero/>", 56, 176);
      c.fillText("<section/>", 56, 436);
    }
    if (kind === 2) {
      // Conteúdo
      c.fillStyle = "#e8f1ff";
      c.font = `700 30px ${DISPLAY}`;
      c.fillText("HYDRA", 56, 108);
      ["Início", "Serviços", "Sobre", "Contato"].forEach((t, i) => {
        c.font = `500 17px ${FONT}`;
        c.fillStyle = "rgba(220,232,255,0.7)";
        c.fillText(t, 560 + i * 100, 104);
      });
      c.fillStyle = "#ffffff";
      c.font = `700 46px ${DISPLAY}`;
      c.fillText("Seu negócio,", 60, 222);
      c.fillText("em outro nível.", 60, 276);
      c.fillStyle = "rgba(200,215,240,0.6)";
      [0, 1].forEach((i) => {
        rr(c, 60, 300 + i * 22, 380 - i * 90, 10, 5);
        c.fill();
      });
      const g = c.createLinearGradient(590, 150, 984, 380);
      g.addColorStop(0, "#00b8ff");
      g.addColorStop(0.55, "#2a5bff");
      g.addColorStop(1, "#7a5cff");
      rr(c, 590, 150, 394, 230, 16);
      c.fillStyle = g;
      c.fill();
      c.globalAlpha = 0.35;
      c.beginPath();
      c.arc(800, 270, 80, 0, Math.PI * 2);
      c.fillStyle = "#ffffff";
      c.fill();
      c.globalAlpha = 1;
      [0, 1, 2].forEach((i) => {
        const x = 40 + i * 318;
        rr(c, x, 410, 296, 150, 16);
        c.fillStyle = "rgba(255,255,255,0.05)";
        c.fill();
        rr(c, x + 20, 430, 44, 44, 12);
        c.fillStyle = ["#00b8ff", "#4cc9ff", "#7a5cff"][i];
        c.fill();
        c.fillStyle = "#ffffff";
        c.font = `600 20px ${DISPLAY}`;
        c.fillText(["Atendimento", "Qualidade", "Localização"][i], x + 20, 506);
        c.fillStyle = "rgba(200,215,240,0.5)";
        rr(c, x + 20, 522, 220, 8, 4);
        c.fill();
        rr(c, x + 20, 538, 170, 8, 4);
        c.fill();
      });
    }
    if (kind === 3) {
      // Interação
      rr(c, 60, 340, 250, 56, 28);
      const g = c.createLinearGradient(60, 0, 310, 0);
      g.addColorStop(0, "#00b8ff");
      g.addColorStop(1, "#4cc9ff");
      c.fillStyle = g;
      c.shadowColor = "#00b8ff";
      c.shadowBlur = 30;
      c.fill();
      c.shadowBlur = 0;
      c.fillStyle = "#03111f";
      c.font = `700 19px ${FONT}`;
      c.textAlign = "center";
      c.fillText("Solicitar orçamento", 185, 375);
      c.textAlign = "left";
      // botão WhatsApp flutuante
      c.beginPath();
      c.arc(944, 560, 38, 0, Math.PI * 2);
      c.fillStyle = "#25d366";
      c.shadowColor = "#25d366";
      c.shadowBlur = 30;
      c.fill();
      c.shadowBlur = 0;
      c.strokeStyle = "#ffffff";
      c.lineWidth = 5;
      c.beginPath();
      c.arc(944, 560, 16, 0.2, Math.PI * 1.75);
      c.stroke();
      // cursor
      c.fillStyle = "#ffffff";
      c.beginPath();
      c.moveTo(286, 380);
      c.lineTo(286, 418);
      c.lineTo(296, 408);
      c.lineTo(304, 426);
      c.lineTo(311, 423);
      c.lineTo(303, 405);
      c.lineTo(316, 405);
      c.closePath();
      c.fill();
      // toast
      rr(c, 640, 80, 330, 56, 14);
      c.fillStyle = "rgba(10,20,38,0.95)";
      c.fill();
      c.strokeStyle = "rgba(37,211,102,0.8)";
      c.lineWidth = 2;
      c.stroke();
      c.beginPath();
      c.arc(670, 108, 9, 0, Math.PI * 2);
      c.fillStyle = "#25d366";
      c.fill();
      c.fillStyle = "#ffffff";
      c.font = `600 17px ${FONT}`;
      c.fillText("Novo contato recebido", 690, 114);
    }
  });
}

/* ─────────── Dashboard (sistemas internos) ─────────── */
export function dashBoardTexture() {
  return canvasTexture(1024, 660, (c, W, H) => {
    const g = c.createLinearGradient(0, 0, W, H);
    g.addColorStop(0, "#0a1222");
    g.addColorStop(1, "#060912");
    rr(c, 0, 0, W, H, 30);
    c.fillStyle = g;
    c.fill();
    c.strokeStyle = "rgba(120,190,255,0.3)";
    c.lineWidth = 3;
    c.stroke();
    // sidebar
    rr(c, 18, 18, 170, H - 36, 20);
    c.fillStyle = "rgba(255,255,255,0.035)";
    c.fill();
    c.fillStyle = "#4cc9ff";
    c.font = `700 22px ${DISPLAY}`;
    c.fillText("Painel", 40, 62);
    ["Visão geral", "Agenda", "Clientes", "Serviços", "Financeiro", "Lembretes"].forEach((t, i) => {
      if (i === 1) {
        rr(c, 30, 92 + i * 46, 146, 36, 10);
        c.fillStyle = "rgba(0,184,255,0.16)";
        c.fill();
      }
      c.fillStyle = i === 1 ? "#ffffff" : "rgba(210,222,245,0.6)";
      c.font = `500 17px ${FONT}`;
      c.fillText(t, 44, 116 + i * 46);
    });
    c.fillStyle = "rgba(210,222,245,0.45)";
    c.font = `500 13px ${MONO}`;
    c.fillText("AGENDA DE HOJE", 214, 300);
  });
}

export function kpiTexture(label, value, accent) {
  return canvasTexture(512, 300, (c, W, H) => {
    rr(c, 4, 4, W - 8, H - 8, 34);
    c.fillStyle = "#0d1830";
    c.fill();
    c.strokeStyle = accent;
    c.globalAlpha = 0.7;
    c.lineWidth = 4;
    c.stroke();
    c.globalAlpha = 1;
    c.fillStyle = "rgba(205,220,245,0.7)";
    c.font = `600 30px ${MONO}`;
    c.fillText(label.toUpperCase(), 36, 82);
    c.fillStyle = "#ffffff";
    c.font = `700 92px ${DISPLAY}`;
    c.fillText(value, 34, 200);
    rr(c, 36, 236, 140, 12, 6);
    c.fillStyle = accent;
    c.fill();
  });
}

export function notifyTexture() {
  return canvasTexture(768, 220, (c, W, H) => {
    rr(c, 4, 4, W - 8, H - 8, 40);
    c.fillStyle = "rgba(9,18,34,0.96)";
    c.fill();
    c.strokeStyle = "rgba(37,211,102,0.85)";
    c.lineWidth = 4;
    c.stroke();
    c.beginPath();
    c.arc(96, H / 2, 46, 0, Math.PI * 2);
    c.fillStyle = "#25d366";
    c.fill();
    c.strokeStyle = "#fff";
    c.lineWidth = 7;
    c.beginPath();
    c.arc(96, H / 2, 20, 0.2, Math.PI * 1.75);
    c.stroke();
    c.fillStyle = "#ffffff";
    c.font = `700 40px ${DISPLAY}`;
    c.fillText("Novo agendamento", 170, 96);
    c.fillStyle = "rgba(210,225,245,0.75)";
    c.font = `500 32px ${FONT}`;
    c.fillText("Corte + escova · hoje, 14:00", 170, 150);
  });
}

/* ─────────── IoT ─────────── */
export function pcbTexture() {
  return canvasTexture(1024, 1024, (c, W, H) => {
    c.fillStyle = "#06261f";
    c.beginPath();
    c.arc(W / 2, H / 2, W / 2, 0, Math.PI * 2);
    c.fill();
    c.strokeStyle = "rgba(214,176,106,0.75)";
    c.lineWidth = 5;
    const rnd = mulberry(7);
    for (let i = 0; i < 46; i++) {
      const a = rnd() * Math.PI * 2;
      const r1 = 140 + rnd() * 120;
      const r2 = 330 + rnd() * 150;
      c.beginPath();
      c.moveTo(W / 2 + Math.cos(a) * r1, H / 2 + Math.sin(a) * r1);
      const mid = r1 + (r2 - r1) * 0.5;
      c.lineTo(W / 2 + Math.cos(a) * mid, H / 2 + Math.sin(a) * mid);
      c.lineTo(W / 2 + Math.cos(a + 0.12) * r2, H / 2 + Math.sin(a + 0.12) * r2);
      c.stroke();
      c.beginPath();
      c.arc(W / 2 + Math.cos(a + 0.12) * r2, H / 2 + Math.sin(a + 0.12) * r2, 9, 0, Math.PI * 2);
      c.fillStyle = "#d6b06a";
      c.fill();
    }
    c.strokeStyle = "rgba(76,201,255,0.5)";
    c.lineWidth = 3;
    c.beginPath();
    c.arc(W / 2, H / 2, W / 2 - 14, 0, Math.PI * 2);
    c.stroke();
  });
}

export function deviceScreenTexture() {
  return canvasTexture(512, 512, (c, W, H) => {
    const g = c.createRadialGradient(W / 2, H / 2, 10, W / 2, H / 2, W / 2);
    g.addColorStop(0, "#0b1f3d");
    g.addColorStop(1, "#02060e");
    c.fillStyle = g;
    c.beginPath();
    c.arc(W / 2, H / 2, W / 2, 0, Math.PI * 2);
    c.fill();
    c.strokeStyle = "#00b8ff";
    c.lineWidth = 14;
    c.lineCap = "round";
    c.beginPath();
    c.arc(W / 2, H / 2, 190, Math.PI * 0.75, Math.PI * 1.95);
    c.stroke();
    c.textAlign = "center";
    c.fillStyle = "#ffffff";
    c.font = `700 120px ${DISPLAY}`;
    c.fillText("24°", W / 2, H / 2 + 30);
    c.fillStyle = "#4cc9ff";
    c.font = `600 34px ${MONO}`;
    c.fillText("ONLINE", W / 2, H / 2 + 100);
  });
}

export function glowTexture(inner = "rgba(80,190,255,1)", outer = "rgba(0,60,255,0)") {
  return canvasTexture(256, 256, (c, W, H) => {
    const g = c.createRadialGradient(W / 2, H / 2, 0, W / 2, H / 2, W / 2);
    g.addColorStop(0, inner);
    g.addColorStop(0.35, "rgba(0,140,255,0.35)");
    g.addColorStop(1, outer);
    c.fillStyle = g;
    c.fillRect(0, 0, W, H);
  });
}

export function keyboardTexture() {
  return canvasTexture(1024, 680, (c, W, H) => {
    c.fillStyle = "#121419";
    c.fillRect(0, 0, W, H);
    const kw = 62,
      kh = 50,
      gap = 9;
    for (let r = 0; r < 5; r++) {
      for (let k = 0; k < 14; k++) {
        const x = 40 + k * (kw + gap) - (r % 2) * 10;
        const y = 34 + r * (kh + gap);
        if (x + kw > W - 30) continue;
        rr(c, x, y, kw, kh, 8);
        c.fillStyle = "#0b0c10";
        c.fill();
      }
    }
    rr(c, 260, 34 + 5 * (kh + gap), 500, kh, 8);
    c.fillStyle = "#0b0c10";
    c.fill();
    rr(c, 330, 430, 364, 220, 18);
    c.fillStyle = "#17191f";
    c.fill();
    c.strokeStyle = "rgba(255,255,255,0.05)";
    c.lineWidth = 2;
    c.stroke();
  });
}

function mulberry(a) {
  return function () {
    let t = (a += 0x6d2b79f5);
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}
export { mulberry };
