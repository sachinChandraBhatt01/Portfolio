/* ===== EDIT YOUR DETAILS HERE (the only place you need to change) ===== */
const CONFIG = {
  whatsapp: "+918178464397",          // country code + number, digits only (e.g. 919876543210)
  github: "https://github.com/sachinChandraBhatt01/",
  // linkedin: "https://www.linkedin.com/in/your-username"
};
/* ====================================================================== */

const $ = (s, r = document) => r.querySelector(s);
const $$ = (s, r = document) => [...r.querySelectorAll(s)];
const reduceMotion = matchMedia("(prefers-reduced-motion: reduce)").matches;

/* ---------- Contact links ---------- */
const targets = {
  whatsapp: `https://wa.me/${CONFIG.whatsapp}?text=${encodeURIComponent("Hi Sachin, I found your portfolio and would like to talk about a project.")}`,
  github: CONFIG.github,
  // linkedin: CONFIG.linkedin
};
$$("[data-contact]").forEach(a => (a.href = targets[a.dataset.contact]));

/* ---------- Mobile menu ---------- */
const btn = $(".menu-btn"), links = $("#links");
const setMenu = open => {
  links.classList.toggle("open", open);
  btn.setAttribute("aria-expanded", open);
  btn.setAttribute("aria-label", open ? "Close menu" : "Open menu");
};
btn.addEventListener("click", () => setMenu(!links.classList.contains("open")));
$$("#links a").forEach(a => a.addEventListener("click", () => setMenu(false)));
document.addEventListener("keydown", e => e.key === "Escape" && setMenu(false));

/* ---------- Nav: shadow after scrolling, highlight current section ---------- */
const nav = $(".nav");
const onScroll = () => nav.classList.toggle("scrolled", scrollY > 8);
onScroll();
addEventListener("scroll", onScroll, { passive: true });
const navLinks = $$("#links a[href^='#']:not(.btn)");
const io = new IntersectionObserver(entries => entries.forEach(en => {
  if (en.isIntersecting) navLinks.forEach(a => a.classList.toggle("on", a.getAttribute("href") === "#" + en.target.id));
}), { rootMargin: "-45% 0px -50% 0px" });
$$("main section[id]").forEach(s => io.observe(s));

/* ---------- Hero: count the numbers up once ---------- */
const fmtCount = (n, el) => {
  const d = +el.dataset.decimals || 0;
  const v = el.dataset.format === "inr" ? Math.round(n).toLocaleString("en-IN") : n.toFixed(d);
  return (el.dataset.prefix || "") + v + (el.dataset.suffix || "");
};
if (!reduceMotion) {
  $$("[data-count]").forEach(el => {
    const end = parseFloat(el.dataset.count), t0 = performance.now() + 350, dur = 1300;
    el.textContent = fmtCount(0, el);
    const tick = now => {
      const p = Math.min(Math.max((now - t0) / dur, 0), 1), e = 1 - Math.pow(1 - p, 3);
      el.textContent = fmtCount(end * e, el);
      if (p < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  });
}

/* ---------- Website previews: desktop / phone (EstateEase, Studio Mitti) ---------- */
$$(".frame.web").forEach(box => {
  const screen = $(".screen", box), frame = $("iframe", screen);
  const fit = () => {
    const w = screen.clientWidth, h = screen.clientHeight;
    if (screen.dataset.mode === "phone") {
      const s = (h - 28) / 844;
      frame.style.cssText = `width:390px;height:844px;transform:scale(${s});left:${(w - 390 * s) / 2}px;top:14px`;
    } else {
      const s = w / 1440;
      frame.style.cssText = `width:1440px;height:900px;transform:scale(${s});left:0;top:0`;
    }
  };
  fit();
  new ResizeObserver(fit).observe(screen);
  $$(".seg-btn[data-mode]", box).forEach(b => b.addEventListener("click", () => {
    screen.dataset.mode = b.dataset.mode;
    $$(".seg-btn[data-mode]", box).forEach(x => { x.classList.toggle("on", x === b); x.setAttribute("aria-pressed", x === b); });
    fit();
  }));
});

/* ---------- RetailPulse: live dashboard from the 500 orders ---------- */
if (typeof RP !== "undefined" && $("#mChart")) {
  const inr = n => "₹" + Math.round(n).toLocaleString("en-IN");
  const short = n => n >= 1e5 ? "₹" + (n / 1e5).toFixed(2) + " L" : "₹" + Math.round(n / 1e3) + "K";
  const axis = n => n >= 1e5 ? "₹" + (n / 1e5).toFixed(1).replace(".0", "") + " L" : "₹" + Math.round(n / 1e3) + "K";
  const mon = i => RP.months[i];
  const state = { cat: -1, chan: -1, city: -1 };
  const tip = $("#tip");

  // Filter controls
  const seg = (host, items, key) => {
    [["All", -1], ...items.map((n, i) => [n, i])].forEach(([label, val]) => {
      const b = document.createElement("button");
      b.type = "button"; b.textContent = label; b.className = "chipbtn"; b.dataset.val = val;
      b.addEventListener("click", () => { state[key] = val; render(); });
      host.appendChild(b);
    });
  };
  seg($("#fCat"), RP.cats, "cat");
  seg($("#fChan"), RP.chans, "chan");
  const citySel = $("#fCity");
  [["All cities", -1], ...RP.cities.map((n, i) => [n, i])].forEach(([n, v]) => citySel.add(new Option(n, v)));
  citySel.addEventListener("change", () => { state.city = +citySel.value; render(); });
  $("#fReset").addEventListener("click", () => { state.cat = state.chan = state.city = -1; render(); });

  const bars = (host, entries, max) => {
    host.innerHTML = entries.map(([name, v]) =>
      `<div class="hrow"><span class="hname">${name}</span><span class="htrack"><i style="width:${max ? (v / max * 100) : 0}%"></i></span><span class="hval">${short(v)}</span></div>`
    ).join("");
  };

  function render() {
    // sync controls
    $$("#fCat .chipbtn").forEach(b => b.setAttribute("aria-pressed", +b.dataset.val === state.cat));
    $$("#fChan .chipbtn").forEach(b => b.setAttribute("aria-pressed", +b.dataset.val === state.chan));
    citySel.value = state.city;

    const rows = RP.rows.filter(r =>
      (state.cat < 0 || r[1] === state.cat) && (state.city < 0 || r[2] === state.city) && (state.chan < 0 || r[3] === state.chan));
    const rev = rows.reduce((a, r) => a + r[6], 0), profit = rows.reduce((a, r) => a + r[7], 0);
    $("#kRev").textContent = inr(rev);
    $("#kProfit").textContent = inr(profit);
    $("#kOrders").textContent = rows.length.toLocaleString("en-IN");
    $("#kMargin").textContent = rev ? (profit / rev * 100).toFixed(1) + "%" : "0%";

    const empty = !rows.length;
    $$(".dcard").forEach(c => c.classList.toggle("is-empty", empty));
    if (empty) {
      $("#mChart").innerHTML = $("#cityBars").innerHTML = $("#prodBars").innerHTML = "";
      $("#insights").innerHTML = "<li>No orders match these filters. Press Reset to see everything.</li>";
      return;
    }

    // Monthly stacked bars: profit + cost = revenue
    const m = RP.months.map((_, i) => ({ rev: 0, profit: 0, n: 0 }));
    rows.forEach(r => { const x = m[r[0]]; x.rev += r[6]; x.profit += r[7]; x.n++; });
    const top = Math.max(...m.map(x => x.rev));
    const best = m.findIndex(x => x.rev === top);
    const step = top >= 1e5 ? 5e4 : 1e4;
    const ymax = Math.ceil(top / step) * step;
    const ticks = [ymax, ymax / 2, 0];
    $("#mChart").innerHTML =
      `<div class="grid">${ticks.map(t => `<span style="bottom:${t / ymax * 100}%"><em>${t ? axis(t) : "0"}</em></span>`).join("")}</div>` +
      `<div class="cols12">${m.map((x, i) => {
        const h = x.rev / ymax * 100, ph = x.rev ? x.profit / x.rev * 100 : 0;
        return `<button type="button" class="mcol${i === best ? " best" : ""}" data-i="${i}" aria-label="${mon(i)}: revenue ${inr(x.rev)}, profit ${inr(x.profit)}, ${x.n} orders">` +
          `<span class="plot">${i === best ? `<b class="mval">${short(x.rev)}</b>` : ""}<span class="stk" style="height:${h}%"><i class="c" style="height:${100 - ph}%"></i><i class="p" style="height:${ph}%"></i></span></span>` +
          `<small>${mon(i).slice(0, 3)}</small></button>`;
      }).join("")}</div>`;

    // Cities and products
    const by = (idx, n) => { const a = Array(n).fill(0); rows.forEach(r => (a[r[idx]] += r[6])); return a; };
    const cities = by(2, RP.cities.length).map((v, i) => [RP.cities[i], v]).filter(x => x[1] > 0).sort((a, b) => b[1] - a[1]);
    const prods = by(4, RP.prods.length).map((v, i) => [RP.prods[i], v]).filter(x => x[1] > 0).sort((a, b) => b[1] - a[1]);
    bars($("#cityBars"), cities, cities[0][1]);
    bars($("#prodBars"), prods.slice(0, 5), prods[0][1]);

    // Written insights (like the Excel version)
    const lines = [
      `Best month: <b>${mon(best)}</b> with ${inr(top)}, ${(top / rev * 100).toFixed(1)}% of revenue.`,
      state.city < 0 && cities.length > 1 ? `Top city: <b>${cities[0][0]}</b> with ${(cities[0][1] / rev * 100).toFixed(1)}% of revenue.` : null,
      `Best seller: <b>${prods[0][0]}</b> with ${inr(prods[0][1])}.`,
      state.chan < 0 ? `Online brings <b>${Math.round(rows.filter(r => r[3] === 0).reduce((a, r) => a + r[6], 0) / rev * 100)}%</b> of revenue.` : null
    ].filter(Boolean);
    $("#insights").innerHTML = lines.map(l => `<li>${l}</li>`).join("");
  }

  // Tooltip for monthly bars (hover and keyboard focus)
  const chart = $("#mChart");
  const showTip = col => {
    const i = +col.dataset.i;
    const rows = RP.rows.filter(r => r[0] === i && (state.cat < 0 || r[1] === state.cat) && (state.city < 0 || r[2] === state.city) && (state.chan < 0 || r[3] === state.chan));
    const rev = rows.reduce((a, r) => a + r[6], 0), pr = rows.reduce((a, r) => a + r[7], 0);
    tip.innerHTML = `<strong>${mon(i)}</strong><span>Revenue <b>${inr(rev)}</b></span><span>Profit <b>${inr(pr)}</b></span><span>Orders <b>${rows.length}</b></span>`;
    tip.hidden = false;
    const c = col.getBoundingClientRect(), host = tip.offsetParent.getBoundingClientRect();
    let x = c.left - host.left + c.width / 2 - tip.offsetWidth / 2;
    x = Math.max(8, Math.min(x, host.width - tip.offsetWidth - 8));
    tip.style.left = x + "px";
    tip.style.top = (c.top - host.top + 20 - tip.offsetHeight) + "px";
  };
  const hideTip = () => (tip.hidden = true);
  chart.addEventListener("mouseover", e => { const c = e.target.closest(".mcol"); c ? showTip(c) : hideTip(); });
  chart.addEventListener("mouseleave", hideTip);
  chart.addEventListener("focusin", e => { const c = e.target.closest(".mcol"); if (c) showTip(c); });
  chart.addEventListener("focusout", hideTip);
  render();

  // Tabs: live dashboard / Excel screenshot
  const tabs = $$("[data-tab]");
  const pick = name => tabs.forEach(t => {
    const on = t.dataset.tab === name;
    t.classList.toggle("on", on); t.setAttribute("aria-selected", on); t.tabIndex = on ? 0 : -1;
    $("#p-" + t.dataset.tab).hidden = !on;
    hideTip();
  });
  tabs.forEach(t => {
    t.addEventListener("click", () => pick(t.dataset.tab));
    t.addEventListener("keydown", e => {
      if (e.key === "ArrowRight" || e.key === "ArrowLeft") { const o = tabs.find(x => x !== t); pick(o.dataset.tab); o.focus(); }
    });
  });
}

/* ---------- Contact form: opens WhatsApp with your message ready to send ---------- */
(() => {
  const form = $("#form");
  if (!form) return;

  const statusEl = $("#status"), sendBtn = $("#send");
  const field = n => form.elements.namedItem(n);
  const inputs = { name: field("name"), msg: field("msg") };
  const service = field("service");
  const waReady = /^\d{10,15}$/.test(CONFIG.whatsapp) && !/0{8,}$/.test(CONFIG.whatsapp);

  const clean = s => String(s).replace(/[\r\t]+/g, " ").replace(/ {2,}/g, " ").trim();

  const copyText = async text => {
    try { await navigator.clipboard.writeText(text); return true; } catch (_) {}
    try {
      const t = document.createElement("textarea");
      t.value = text; t.setAttribute("readonly", "");
      t.style.cssText = "position:fixed;opacity:0;top:0;left:0";
      document.body.append(t); t.select();
      const ok = document.execCommand("copy"); t.remove(); return ok;
    } catch (_) { return false; }
  };

  const setStatus = (text, kind, extras) => {
    statusEl.textContent = text;
    statusEl.dataset.kind = kind || "";
    if (extras && extras.length) {
      const wrap = document.createElement("span");
      wrap.className = "status-links";
      extras.forEach((node, i) => { if (i) wrap.append(" · "); wrap.append(node); });
      statusEl.append(wrap);
    }
  };

  const buildMessage = v =>
    `Hi Sachin, I'm ${v.name}.\nI'm looking for: ${v.service}.\n\n${v.msg}`;

  const waUrl = text => `https://wa.me/${CONFIG.whatsapp}?text=${encodeURIComponent(text)}`;

  Object.values(inputs).forEach(i => i.addEventListener("input", () => i.removeAttribute("aria-invalid")));

  form.addEventListener("submit", e => {
    e.preventDefault();
    const v = {
      name: clean(inputs.name.value),
      service: service ? service.value : "a project",
      msg: inputs.msg.value.trim()
    };

    const errs = {};
    if (v.name.length < 2) errs.name = "Please enter your name.";
    if (v.msg.length < 10) errs.msg = "Please add a few words about what you need (at least 10 characters).";
    Object.entries(inputs).forEach(([k, i]) => {
      if (errs[k]) i.setAttribute("aria-invalid", "true"); else i.removeAttribute("aria-invalid");
    });
    const bad = ["name", "msg"].find(k => errs[k]);
    if (bad) { setStatus(errs[bad], "error"); inputs[bad].focus(); return; }

    if (!waReady) {
      setStatus("Setup needed: put your WhatsApp number in CONFIG.whatsapp at the top of script.js.", "error");
      return;
    }

    const text = buildMessage(v), url = waUrl(text);

    // A real link click inside the submit gesture is not blocked as a pop-up
    const a = document.createElement("a");
    a.href = url; a.target = "_blank"; a.rel = "noopener noreferrer";
    document.body.append(a); a.click(); a.remove();

    const again = document.createElement("a");
    again.href = url; again.target = "_blank"; again.rel = "noopener noreferrer";
    again.textContent = "tap here to open WhatsApp";
    const copy = document.createElement("button");
    copy.type = "button"; copy.textContent = "copy the message";
    copy.addEventListener("click", async () => {
      copy.textContent = (await copyText(text)) ? "message copied" : "copy failed";
    });
    setStatus("Opening WhatsApp with your message ready. Press Send there. If nothing opened,", "ok", [again, copy]);
  });
})();

/* ---------- Floating WhatsApp button appears after the hero ---------- */
const fab = $("#waFab");
const fabShow = () => fab.classList.toggle("show", scrollY > 500);
fabShow();
addEventListener("scroll", fabShow, { passive: true });

$("#year").textContent = new Date().getFullYear();
