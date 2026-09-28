export function runStudentCode({ type, code, testAssertions = [], onLog, onResult }) {
  const iframe = document.getElementById("academy-preview-frame");
  if (!iframe) {
    console.error("Preview frame not found");
    return;
  }

  // Clear previous logs
  if (onLog) onLog({ type: "clear" });

  let htmlContent = "";

  if (type === "html") {
    htmlContent = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <style>
          body { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif; padding: 20px; color: #1e293b; background: #ffffff; line-height: 1.5; }
          a { color: #2563eb; }
          button { cursor: pointer; padding: 8px 16px; border-radius: 6px; border: 1px solid #cbd5e1; background: #f8fafc; }
          input, textarea, select { padding: 8px 12px; border: 1px solid #cbd5e1; border-radius: 6px; }
        </style>
      </head>
      <body>
        ${code}
      </body>
      </html>
    `;
  } else if (type === "css") {
    htmlContent = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <style>
          body { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif; padding: 24px; background: #f8fafc; }
          ${code}
        </style>
      </head>
      <body>
        <div class="hero-box card">
          <h2 class="hero-title">Interactive CSS Sandbox</h2>
          <p class="highlight">Styling applied in real-time!</p>
          <div class="card-container" style="margin-top: 16px; display: flex; gap: 12px;">
            <div style="background: #e2e8f0; padding: 12px; border-radius: 6px;">Box 1</div>
            <div style="background: #e2e8f0; padding: 12px; border-radius: 6px;">Box 2</div>
          </div>
        </div>
      </body>
      </html>
    `;
  } else if (type === "javascript") {
    htmlContent = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <style>
          body { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif; padding: 20px; background: #ffffff; color: #0f172a; }
          button { padding: 8px 16px; cursor: pointer; background: #3b82f6; color: white; border: none; border-radius: 6px; }
        </style>
      </head>
      <body>
        <div id="app">
          <h2 id="status-text">System Offline</h2>
          <button id="power-btn">Power On</button>
          <div id="counter-display" style="margin-top: 12px; font-weight: bold;"></div>
        </div>
        <script>
          const interceptedLogs = [];
          const originalLog = console.log;
          const originalError = console.error;
          const originalWarn = console.warn;

          console.log = function(...args) {
            originalLog.apply(console, args);
            window.parent.postMessage({ type: 'ACADEMY_LOG', level: 'info', text: args.map(a => typeof a === 'object' ? JSON.stringify(a) : String(a)).join(' ') }, '*');
          };
          console.error = function(...args) {
            originalError.apply(console, args);
            window.parent.postMessage({ type: 'ACADEMY_LOG', level: 'error', text: args.map(a => typeof a === 'object' ? JSON.stringify(a) : String(a)).join(' ') }, '*');
          };
          console.warn = function(...args) {
            originalWarn.apply(console, args);
            window.parent.postMessage({ type: 'ACADEMY_LOG', level: 'warn', text: args.map(a => typeof a === 'object' ? JSON.stringify(a) : String(a)).join(' ') }, '*');
          };

          window.onerror = function(msg, url, line) {
            window.parent.postMessage({ type: 'ACADEMY_LOG', level: 'error', text: 'Runtime Error (line ' + line + '): ' + msg }, '*');
            return false;
          };

          try {
            ${code}
          } catch(e) {
            console.error(e.message);
          }
        </script>
      </body>
      </html>
    `;
  } else if (type === "react") {
    // In-browser React 18 + ReactDOM + Babel Standalone transpilation!
    htmlContent = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <script src="https://unpkg.com/react@18/umd/react.development.js" crossorigin></script>
        <script src="https://unpkg.com/react-dom@18/umd/react-dom.development.js" crossorigin></script>
        <script src="https://unpkg.com/@babel/standalone/babel.min.js"></script>
        <script src="https://cdn.tailwindcss.com"></script>
        <style>
          body { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif; padding: 16px; background: #0f172a; color: #f8fafc; }
        </style>
      </head>
      <body>
        <div id="root"></div>
        <script>
          console.log = function(...args) {
            window.parent.postMessage({ type: 'ACADEMY_LOG', level: 'info', text: args.map(a => typeof a === 'object' ? JSON.stringify(a) : String(a)).join(' ') }, '*');
          };
          console.error = function(...args) {
            window.parent.postMessage({ type: 'ACADEMY_LOG', level: 'error', text: args.map(a => typeof a === 'object' ? JSON.stringify(a) : String(a)).join(' ') }, '*');
          };
        </script>
        <script type="text/babel">
          try {
            ${code}
          } catch (err) {
            console.error("React Error: " + err.message);
            document.getElementById("root").innerHTML = "<div style='color:#ef4444; padding:16px; background:#1e1e2f; border-radius:8px;'>⚠️ React Rendering Error: " + err.message + "</div>";
          }
        </script>
      </body>
      </html>
    `;
  }

  // Load into iframe
  iframe.srcdoc = htmlContent;

  // Run test assertions
  const capturedLogs = [];
  const logHandler = (e) => {
    if (e.data && e.data.type === "ACADEMY_LOG") {
      capturedLogs.push(e.data.text);
      if (onLog) onLog(e.data);
    }
  };

  window.addEventListener("message", logHandler);

  setTimeout(() => {
    window.removeEventListener("message", logHandler);
    
    // Evaluate test assertions
    let allPassed = true;
    const testResults = (testAssertions || []).map(assertion => {
      let passed = false;
      try {
        passed = assertion.test(capturedLogs, code);
      } catch (err) {
        passed = false;
      }
      if (!passed) allPassed = false;
      return {
        description: assertion.description,
        passed
      };
    });

    if (onResult) {
      onResult({
        success: (testAssertions.length === 0) || allPassed,
        tests: testResults,
        logs: capturedLogs
      });
    }
  }, 400);
}
