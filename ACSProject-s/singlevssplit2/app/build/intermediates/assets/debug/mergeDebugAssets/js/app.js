document.addEventListener("DOMContentLoaded", () => {
    const sidebar = document.getElementById("sidebar");
    const menuToggle = document.getElementById("menu-toggle");
    const navList = document.getElementById("nav-list");
    const moduleTitle = document.getElementById("module-title");
    const moduleDesc = document.getElementById("module-desc");
    const codeSnippet = document.getElementById("code-snippet");
    const sandboxContainer = document.getElementById("sandbox-container");
    const consoleOutput = document.getElementById("console-output");

    // Logger helper to display text in custom UI console
    function logToConsole(message) {
        const time = new Date().toLocaleTimeString().split(" ")[0];
        consoleOutput.innerHTML = `[${time}] ${message}<br>` + consoleOutput.innerHTML;
    }

    // Toggle Mobile Sidebar Drawer
    menuToggle.addEventListener("click", () => {
        sidebar.classList.toggle("open");
    });

    // Populate Sidebar Navigation Items
    MODULES_DATA.forEach((module, index) => {
        const li = document.createElement("li");
        li.className = `nav-item ${index === 0 ? 'active' : ''}`;
        li.textContent = module.title;
        li.addEventListener("click", () => {
            loadModule(module);
            
            // Highlight active navigation tab
            document.querySelectorAll(".nav-item").forEach(item => item.classList.remove("active"));
            li.classList.add("active");

            // Close mobile sidebar if open
            sidebar.classList.remove("open");
        });
        navList.appendChild(li);
    });

    // Module Loading Engine
    function loadModule(module) {
        moduleTitle.textContent = module.title;
        moduleDesc.textContent = module.description;
        codeSnippet.textContent = module.code;
        
        // Clear previous sandbox view
        sandboxContainer.innerHTML = "";
        
        // Execute dynamic sandbox rendering logic
        module.renderSandbox(sandboxContainer, logToConsole);
        
        logToConsole(`Loaded module: ${module.title}`);
    }

    // Initialize with first topic module
    if (MODULES_DATA.length > 0) {
        loadModule(MODULES_DATA[0]);
    }
});
