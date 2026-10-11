/**
 * Module Data and Sandbox Render Configurations
 */
const MODULES_DATA = [
    {
        id: "html-css-touch",
        title: "1. Touch Viewport & Touch Target CSS",
        description: "Setting optimal mobile viewports and styling responsive, touch-friendly UI components.",
        code: `<!-- Viewport Tag in <head> -->
<meta name="viewport" content="width=device-width, initial-scale=1.0, user-scalable=no">

/* CSS Touch Optimizations */
.button {
    min-width: 48px;  /* Recommended touch target size */
    min-height: 48px;
    touch-action: manipulation; /* Eliminates 300ms click delay */
    -webkit-tap-highlight-color: transparent;
}`,
        renderSandbox: (container, log) => {
            container.innerHTML = `
                <button id="demo-btn" class="btn-primary">Tap Me Target</button>
            `;
            const btn = document.getElementById("demo-btn");
            btn.addEventListener("click", () => {
                log("Button tapped! Target size meets 48px standard.");
            });
        }
    },
    {
        id: "dom-manipulation",
        title: "2. DOM Traversal & Mutation",
        description: "Selecting, creating, dynamically updating, and styling DOM elements programmatically.",
        code: `// Dynamic element creation & manipulation
const list = document.createElement("ul");
const item = document.createElement("li");

item.textContent = "New Dynamic Entry";
item.classList.add("highlight");
item.style.color = "#00e676";

list.appendChild(item);
document.body.appendChild(list);`,
        renderSandbox: (container, log) => {
            container.innerHTML = `
                <button id="add-elem-btn" class="btn-primary">Add Dynamic Item</button>
                <div id="dynamic-list" style="width:100%; text-align:center;"></div>
            `;
            const btn = document.getElementById("add-elem-btn");
            const list = document.getElementById("dynamic-list");
            let count = 1;

            btn.addEventListener("click", () => {
                const tag = document.createElement("div");
                tag.style.background = "#282830";
                tag.style.padding = "8px";
                tag.style.marginTop = "6px";
                tag.style.borderRadius = "4px";
                tag.style.border = "1px solid #383842";
                tag.textContent = `Dynamic Element #${count++}`;
                list.appendChild(tag);
                log(`Created dynamic element node #${count - 1}`);
            });
        }
    },
    {
        id: "touch-events",
        title: "3. Mobile Touch Events API",
        description: "Handling touchstart, touchmove, and touchend coordinates and gesture tracking.",
        code: `const touchBox = document.querySelector('.touch-pad');

touchBox.addEventListener('touchstart', (e) => {
    const touch = e.touches[0];
    console.log("Touch Start X:", touch.clientX, "Y:", touch.clientY);
});

touchBox.addEventListener('touchmove', (e) => {
    // Prevent default scroll behavior while swiping inside target
    e.preventDefault();
    const touch = e.touches[0];
    console.log("Dragging at:", touch.clientX, touch.clientY);
}, { passive: false });`,
        renderSandbox: (container, log) => {
            container.innerHTML = `
                <div id="touch-pad" class="touch-pad">Touch / Drag Inside This Box</div>
            `;
            const pad = document.getElementById("touch-pad");

            pad.addEventListener("touchstart", (e) => {
                const t = e.touches[0];
                pad.style.borderColor = "#00e676";
                log(`Touch Start -> X: ${Math.round(t.clientX)}, Y: ${Math.round(t.clientY)}`);
            });

            pad.addEventListener("touchmove", (e) => {
                e.preventDefault();
                const t = e.touches[0];
                pad.textContent = `X: ${Math.round(t.clientX)} | Y: ${Math.round(t.clientY)}`;
                log(`Touch Move -> X: ${Math.round(t.clientX)}, Y: ${Math.round(t.clientY)}`);
            }, { passive: false });

            pad.addEventListener("touchend", () => {
                pad.style.borderColor = "#383842";
                pad.textContent = "Touch / Drag Inside This Box";
                log("Touch Released (touchend)");
            });
        }
    },
    {
        id: "webview-integration",
        title: "4. Android WebView & JS Interfaces",
        description: "Communication bridge between JavaScript runtime and native Android Java/Kotlin host applications.",
        code: `// Calling Native Android Code from JS
if (window.AndroidInterface) {
    // Invoke exposed Java/Kotlin @JavascriptInterface method
    window.AndroidInterface.showNativeToast("Hello from Web Context!");
} else {
    console.log("Running standard mobile web environment");
}`,
        renderSandbox: (container, log) => {
            container.innerHTML = `
                <button id="android-bridge-btn" class="btn-primary">Test Bridge Call</button>
            `;
            const btn = document.getElementById("android-bridge-btn");
            btn.addEventListener("click", () => {
                if (window.AndroidInterface) {
                    window.AndroidInterface.showNativeToast("Bridge Call Triggered");
                    log("Executed: window.AndroidInterface.showNativeToast()");
                } else {
                    log("Fallback: AndroidInterface not found (Running in Browser)");
                }
            });
        }
    }
];
