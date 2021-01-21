console.log (111)
setTimeout(function () {
    console.log ("test");
    console.log (window.document.body.innerHTML);
    console.log (document.getElementsByTagName("frame").length);
    console.log (document.getElementsByTagName("frame")[0]);
    console.log (document.getElementsByTagName("frame")[0].document.body.innerHTML);
    console.log (window.frames['topFrame'].document);
    window.frames['topFrame'].document.body.style.border = "5px solid red";
    window.frames['leftFrame'].document.body.style.border = "5px solid blue";
    window.frames['mainFrame'].document.body.style.border = "5px solid green";
}, 2000);

console.log (2222)
