// Copyright 2017 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.
//'use strict';

var boton = 'Mantengamos la calma.';

var datos = [['Atención', 'logos/01.png', 'Evita saludar dando la mano o beso!'],
    ['Hora de Re hidratarte', 'logos/stay_hydrated.png', 'No lo olvides cada tres horas!'],
    ['Atención', 'logos/02.png', 'Lávate las manos al menos cada 3 horas'],
    ['Atención', 'logos/03.png', 'Si presentas algún sintoma comunicate al 171'],
    ['Hora de Re hidratarte', 'logos/stay_hydrated.png', 'No lo olvides cada tres horas!'],
    ['Atención', 'logos/04.png', 'Evita lugares de alta concurrencia de personas o aglomeraciones'],
    ['Atención', 'logos/05.png', 'Si estornudas procura usar un pañuero o la manga'],
    ['Hora de Re hidratarte', 'logos/stay_hydrated.png', 'No lo olvides cada tres horas!']
];

var mensaje_actual = 0;


chrome.alarms.onAlarm.addListener(function () {
    //chrome.browserAction.setBadgeText({text: ''});

    // se recupera el usuario grabado
    chrome.storage.local.get('userAMC', function (result) {
        // en caso que si esta asignado el usuario

        var xmlhttp = new XMLHttpRequest();
        var url = "https://amcmatis.quito.gob.ec/modules/desktop/recordatorios/server/consultas.php?usuario=bherrera";
        xmlhttp.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {
                var myArr = JSON.parse(this.responseText);


//                myFunction(myArr);

                mensaje_actual++;
                chrome.notifications.create({
                    type: 'basic',
                    iconUrl: datos[mensaje_actual][1],
                    title: myArr[1].nombre,
                    //message: datos[mensaje_actual][2],
                    message: myArr[1].tema +  '; Fecha: ' + myArr[1].fecha,
                    buttons: [
                        {title: boton}
                    ],
                    priority: 0
                });
            }
        };
        xmlhttp.open("GET", url, true);
        xmlhttp.send();

        function myFunction(arr) {
            var out = "";
            var i;
            for (i = 0; i < arr.length; i++) {
                out += arr[i].tema + ' : ' +
                    arr[i].fecha + '<br>';
            }
            document.getElementById("id01").innerHTML = out;
        }


    });




});


chrome.notifications.onButtonClicked.addListener(function () {
    chrome.storage.sync.get(['minutes'], function (item) {
        chrome.browserAction.setBadgeText({text: 'ON'});
        chrome.alarms.create({delayInMinutes: item.minutes});
    });
});


// Set up listeners to trigger the first time registration.
chrome.runtime.onInstalled.addListener(firstTimeRegistration);
chrome.runtime.onStartup.addListener(firstTimeRegistration);


function firstTimeRegistration() {
    // minutes = 0.2;

    // definimos la variable de usuario
    chrome.storage.local.set({userAMC: "bherrera"});

    chrome.browserAction.setBadgeText({text: 'ON'});
    chrome.alarms.create({delayInMinutes: 1});
    chrome.storage.local.set({minutes: 1});
}