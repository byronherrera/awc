setTimeout(function () {
    console.log (window.document.body.innerHTML,'0');
    console.log (document.getElementsByTagName("frame")[0].document, '2');
    document.getElementById('mainFrame').onload = function() {
        console.log ("date");
        setTimeout(function () {
            var tets = document.getElementsByTagName("frame")[0].document;

            var x = document.getElementById("mainFrame");
            var y = (x.contentWindow || x.contentDocument);
            if (y.document)y = y.document;
            y.body.style.backgroundColor = "red";
            console.log (y.body.innerHTML);
        }, 1000)
    }
}, 2000);