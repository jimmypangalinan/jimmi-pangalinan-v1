const OWNER_EMAIL = "pangalinan.jimmi@gmail.com";
const CV_FILE_ID = "1ua8avstcLSnwym6ap1s8j03y4TkPi4Dz";
const RATE_LIMIT_SECONDS = 600;

const ALLOWED_NEEDS = [
  "Hiring / Recruitment",
  "Project Collaboration / Freelance",
  "DevOps, Cloud, or CI/CD Consulting",
  "Networking / Other",
];

function doGet() {
  return jsonResponse_({
    ok: true,
    message: "Portfolio contact sender is active.",
  });
}

function doPost(e) {
  try {
    const form = e && e.parameter ? e.parameter : {};

    if (String(form.website || "").trim()) {
      return jsonResponse_({ ok: true });
    }

    const requestType = String(form.requestType || "cv").trim();
    const name = String(form.name || "").trim();
    const email = String(form.email || "").trim().toLowerCase();
    const phone = String(form.phone || "").trim();
    const need = String(form.need || "").trim();

    if (!["cv", "call"].includes(requestType)) {
      throw new Error("Invalid request type.");
    }

    if (name.length < 2 || name.length > 80) {
      throw new Error("Please enter a valid name.");
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      throw new Error("Please enter a valid email address.");
    }

    if (requestType === "call" && !isValidPhone_(phone)) {
      throw new Error("Please enter a valid phone or WhatsApp number.");
    }

    if (!ALLOWED_NEEDS.includes(need)) {
      throw new Error("Please select one of the available purposes.");
    }

    const cache = CacheService.getScriptCache();
    const rateKey = createRateKey_(requestType, email);

    if (cache.get(rateKey)) {
      throw new Error("This request was already submitted. Please wait a few minutes.");
    }

    if (requestType === "cv") {
      sendCvEmail_(name, email, need);
    } else {
      sendCallRequest_(name, email, phone, need);
    }

    cache.put(rateKey, "sent", RATE_LIMIT_SECONDS);

    return jsonResponse_({
      ok: true,
      message:
        requestType === "cv"
          ? "Your CV request was completed successfully."
          : "Your call request was submitted successfully.",
    });
  } catch (error) {
    return jsonResponse_({
      ok: false,
      message: error.message || "Something went wrong while processing your request.",
    });
  }
}

function testSendCv() {
  sendCvEmail_(
    "Jimmi Test",
    OWNER_EMAIL,
    "DevOps, Cloud, or CI/CD Consulting"
  );

  Logger.log("CV test email sent successfully.");
}

function testCallRequest() {
  sendCallRequest_(
    "Jimmi Test",
    OWNER_EMAIL,
    "+62 857 7823 3885",
    "Project Collaboration / Freelance"
  );

  Logger.log("Call request test email sent successfully.");
}

function sendCvEmail_(name, email, need) {
  assertQuota_(2);

  const safeName = escapeHtml_(name);
  const safeEmail = escapeHtml_(email);
  const safeNeed = escapeHtml_(need);
  const cvFile = DriveApp.getFileById(CV_FILE_ID);
  const cvAttachment = cvFile
    .getAs(MimeType.PDF)
    .setName("CV-Jimmi-Pangalinan.pdf");

  const visitorText =
    "Hello " +
    name +
    ",\n\n" +
    "Thank you for visiting my portfolio.\n" +
    "My CV is attached to this email.\n\n" +
    "Your selected purpose: " +
    need +
    "\n\n" +
    "Best regards,\nJimmi Pangalinan\nDevOps Engineer\nhttps://jimmilabs.me";

  const visitorHtml = `
    <div style="font-family:Arial,sans-serif;line-height:1.7;color:#202124">
      <h2 style="color:#b52d4f">Hello ${safeName},</h2>
      <p>Thank you for visiting my portfolio.</p>
      <p>My CV is attached to this email.</p>
      <p><strong>Your selected purpose:</strong><br>${safeNeed}</p>
      <p>
        Best regards,<br>
        <strong>Jimmi Pangalinan</strong><br>
        DevOps Engineer
      </p>
      <p>
        <a href="https://jimmilabs.me" style="color:#b52d4f">jimmilabs.me</a>
      </p>
    </div>
  `;

  MailApp.sendEmail(
    email,
    "CV — Jimmi Pangalinan, DevOps Engineer",
    visitorText,
    {
      htmlBody: visitorHtml,
      attachments: [cvAttachment],
      name: "Jimmi Pangalinan",
      replyTo: OWNER_EMAIL,
    }
  );

  const ownerText =
    "A new CV request was received.\n\n" +
    "Name: " +
    name +
    "\n" +
    "Email: " +
    email +
    "\n" +
    "Purpose: " +
    need;

  const ownerHtml = `
    <div style="font-family:Arial,sans-serif;line-height:1.7;color:#202124">
      <h2 style="color:#b52d4f">New CV Request</h2>
      <p><strong>Name:</strong> ${safeName}</p>
      <p><strong>Email:</strong> ${safeEmail}</p>
      <p><strong>Purpose:</strong> ${safeNeed}</p>
      <p>Reply to this email to contact ${safeName}.</p>
    </div>
  `;

  MailApp.sendEmail(
    OWNER_EMAIL,
    "New CV request from " + name,
    ownerText,
    {
      htmlBody: ownerHtml,
      name: "Jimmi Pangalinan Portfolio",
      replyTo: email,
    }
  );
}

function sendCallRequest_(name, email, phone, need) {
  assertQuota_(1);

  const safeName = escapeHtml_(name);
  const safeEmail = escapeHtml_(email);
  const safePhone = escapeHtml_(phone);
  const safeNeed = escapeHtml_(need);
  const whatsappNumber = toWhatsAppNumber_(phone);
  const whatsappUrl = "https://wa.me/" + whatsappNumber;

  const ownerText =
    "A new call request was received.\n\n" +
    "Name: " +
    name +
    "\n" +
    "Email: " +
    email +
    "\n" +
    "Phone / WhatsApp: " +
    phone +
    "\n" +
    "Purpose: " +
    need +
    "\n\n" +
    "Open WhatsApp: " +
    whatsappUrl;

  const ownerHtml = `
    <div style="font-family:Arial,sans-serif;line-height:1.7;color:#202124">
      <h2 style="color:#b52d4f">New Call Request</h2>
      <p><strong>Name:</strong> ${safeName}</p>
      <p><strong>Email:</strong> <a href="mailto:${safeEmail}" style="color:#b52d4f">${safeEmail}</a></p>
      <p><strong>Phone / WhatsApp:</strong> <a href="${whatsappUrl}" style="color:#b52d4f">${safePhone}</a></p>
      <p><strong>Purpose:</strong> ${safeNeed}</p>
      <p style="margin:24px 0">
        <a href="${whatsappUrl}" style="display:inline-block;padding:11px 18px;border-radius:8px;background:#b52d4f;color:#ffffff;text-decoration:none;font-weight:bold">
          Open WhatsApp
        </a>
      </p>
      <p>Review the request before contacting this person.</p>
    </div>
  `;

  MailApp.sendEmail(
    OWNER_EMAIL,
    "New call request from " + name,
    ownerText,
    {
      htmlBody: ownerHtml,
      name: "Jimmi Pangalinan Portfolio",
      replyTo: email,
    }
  );
}

function isValidPhone_(phone) {
  const value = String(phone || "").trim();

  if (!/^\+?[0-9 .()-]{8,20}$/.test(value)) {
    return false;
  }

  const digits = value.replace(/\D/g, "");
  return digits.length >= 8 && digits.length <= 15;
}

function toWhatsAppNumber_(phone) {
  const digits = String(phone || "").replace(/\D/g, "");

  if (digits.indexOf("0") === 0) {
    return "62" + digits.slice(1);
  }

  return digits;
}

function assertQuota_(requiredRecipients) {
  if (MailApp.getRemainingDailyQuota() < requiredRecipients) {
    throw new Error("The email delivery quota for today has been reached.");
  }
}

function createRateKey_(requestType, email) {
  const digest = Utilities.computeDigest(
    Utilities.DigestAlgorithm.SHA_256,
    requestType + ":" + email.toLowerCase()
  );

  return "request_" + Utilities.base64EncodeWebSafe(digest).slice(0, 40);
}

function escapeHtml_(value) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function jsonResponse_(data) {
  return ContentService
    .createTextOutput(JSON.stringify(data))
    .setMimeType(ContentService.MimeType.JSON);
}
