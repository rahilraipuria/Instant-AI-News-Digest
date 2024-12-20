if (!document.getElementById("react-sidebar-root")) {
  const sidebar = document.createElement("div");
  sidebar.id = "react-sidebar-root";
  sidebar.style.cssText = `
    position: fixed;
    top: 0;
    right: 0;
    width: 400px;
    height: 100%;
    z-index: 9999;
    background: white;
    box-shadow: -2px 0 5px rgba(0,0,0,0.3);
  `;
  document.body.appendChild(sidebar);

  
  const iframe = document.createElement("iframe");
  iframe.src = "http://localhost:5173/";
  iframe.style.cssText = "width: 100%; height: 100%; border: none;";
  sidebar.appendChild(iframe);
} else {
  document.getElementById("react-sidebar-root").remove(); 
}
