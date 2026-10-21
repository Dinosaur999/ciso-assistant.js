
 // ==UserScript==
 // @name        CISO Study Helper
 // @description Local cybersecurity and IT concept explainer
 
 // ==/UserScript==

(() => {
  "use strict";

  if (!document.body ||
      document.getElementById("ciso-local-helper")) return;

  const rules = [
    {
      terms: ["https", "tls", "ssl", "encrypted connection"],
      name: "Transport encryption",
      principle: "TLS protects data in transit and helps authenticate the server.",
      tip: "HTTPS is HTTP protected by TLS.",
      keywords: ["https", "tls", "certificate"]
    },
    {
      terms: ["dns", "domain name system", "resolve a hostname"],
      name: "DNS",
      principle: "DNS translates domain names into records such as IP addresses.",
      tip: "Name resolution points to DNS; address assignment points to DHCP.",
      keywords: ["dns", "hostname", "domain name"]
    },
    {
      terms: ["dhcp", "assign ip", "automatic ip address"],
      name: "DHCP",
      principle: "DHCP leases network configuration such as IP addresses and gateways.",
      tip: "Remember DORA: Discover, Offer, Request, Acknowledge.",
      keywords: ["dhcp", "lease", "ip address"]
    },
    {
      terms: ["least privilege", "minimum permissions"],
      name: "Principle of least privilege",
      principle: "Give each user or process only the access needed for its task.",
      tip: "Choose the option that limits permissions and exposure.",
      keywords: ["least privilege", "minimum access", "permissions"]
    },
    {
      terms: ["phishing", "fraudulent email", "social engineering"],
      name: "Social engineering",
      principle: "Attackers manipulate people into revealing information or taking unsafe actions.",
      tip: "Look for deception, urgency, impersonation, or suspicious links.",
      keywords: ["phishing", "impersonation", "social engineering"]
    },
    {
      terms: ["hash", "hashing", "integrity check"],
      name: "Cryptographic hashing",
      principle: "A hash produces a fixed-length digest used to check data integrity.",
      tip: "Hashing is not encryption; a secure hash is not designed to be decrypted.",
      keywords: ["hash", "digest", "integrity"]
    },
    {
      terms: ["firewall", "filter network traffic"],
      name: "Firewall",
      principle: "A firewall permits or blocks traffic according to configured rules.",
      tip: "A firewall filters traffic; an IDS detects suspicious activity.",
      keywords: ["firewall", "traffic rules", "filter"]
    },
    {
      terms: ["ids", "ips", "intrusion detection", "intrusion prevention"],
      name: "Intrusion detection and prevention",
      principle: "An IDS detects suspicious activity; an IPS can also block it.",
      tip: "Detection versus active prevention is the key distinction.",
      keywords: ["ids", "ips", "intrusion"]
    },
    {
      terms: ["multi-factor", "mfa", "two-factor", "2fa"],
      name: "Multi-factor authentication",
      principle: "MFA combines different factor types, such as knowledge, possession, and inherence.",
      tip: "Two passwords alone are not two different factor types.",
      keywords: ["mfa", "2fa", "authentication factors"]
    },
    {
      terms: ["backup", "disaster recovery", "restore data"],
      name: "Backup and recovery",
      principle: "Backups support restoration after loss, corruption, or ransomware.",
      tip: "A backup is useful only if it can be restored; test recovery regularly.",
      keywords: ["backup", "restore", "recovery"]
    }
  ];

  const el = (tag, text) => {
    const node = document.createElement(tag);
    if (text) node.textContent = text;
    return node;
  };

  const panel = el("section");
  panel.id = "ciso-local-helper";

  Object.assign(panel.style, {
    position: "fixed",
    right: "12px",
    bottom: "12px",
    width: "min(360px, calc(100vw - 24px))",
    maxHeight: "75vh",
    overflowY: "auto",
    zIndex: "2147483647",
    padding: "14px",
    background: "#fff",
    color: "#182033",
    border: "1px solid #b9c3d0",
    borderRadius: "14px",
    boxShadow: "0 4px 24px #0004",
    font: "14px/1.5 -apple-system, sans-serif"
  });

  const title = el("strong", "CISO Study Helper");
  title.style.fontSize = "18px";

  const intro = el("p",
    "Paste a practice question and its answer choices.");

  const input = el("textarea");
  input.placeholder = "Question and choices...";
  input.setAttribute("aria-label", "Practice question");

  Object.assign(input.style, {
    boxSizing: "border-box",
    width: "100%",
    minHeight: "110px",
    padding: "9px",
    font: "inherit"
  });

  const analyze = el("button", "Explain concept");
  const close = el("button", "Close");
  const output = el("div");

  output.setAttribute("aria-live", "polite");

  for (const button of [analyze, close]) {
    Object.assign(button.style, {
      padding: "9px",
      margin: "8px 6px 0 0",
      borderRadius: "8px",
      border: "1px solid #9aa7b7",
      background: "#edf3fb",
      color: "#172033",
      font: "inherit"
    });
  }

  function addResult(label, value) {
    const section = el("p");
    const heading = el("strong", label + ": ");
    section.append(heading, document.createTextNode(value));
    output.appendChild(section);
  }

  analyze.addEventListener("click", () => {
    output.replaceChildren();

    const text = input.value.trim().toLowerCase();

    if (!text) {
      addResult("Next step", "Enter a question first.");
      return;
    }

    const matches = rules.filter(rule =>
      rule.terms.some(term => text.includes(term))
    );

    if (!matches.length) {
      addResult("Concept", "No matching rule found.");
      addResult("Next step",
        "Identify the key technical term and compare each choice with your course material.");
      addResult("Confidence", "Low: no local rule matched.");
      return;
    }

    for (const rule of matches) {
      addResult("Concept", rule.name);
      addResult("Key principle", rule.principle);
      addResult("Exam tip", rule.tip);
      addResult("Confidence",
        "Moderate that this concept matches; the correct option is not verified.");
    }

    addResult("Important",
      "This is a keyword-based study aid, not an AI model. " +
      "It does not reliably select or verify the correct answer.");
  });

  close.addEventListener("click", () => panel.remove());

  panel.append(title, intro, input, analyze, close, output);
  document.body.appendChild(panel);
})();
