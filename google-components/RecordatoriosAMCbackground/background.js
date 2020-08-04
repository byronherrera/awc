// Copyright 2017 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.
//'use strict';

var boton = 'Aceptar.';

chrome.alarms.onAlarm.addListener(function () {
    // se recupera el usuario grabado
    chrome.storage.local.get('userAMC', function (result) {
        // en caso que si esta asignado el usuario
        var xmlhttp = new XMLHttpRequest();
        var url = "https://amcmatis.quito.gob.ec/modules/desktop/recordatorios/server/consultas.php?usuario=" + result.userAMC;
        xmlhttp.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {
                var responseArr = JSON.parse(this.responseText);
                if (responseArr.length > 0) {
                    // valida que exista contenido que mostrar
                    if (responseArr[0].tema.length > 0) {
                        // crea items
                        var itemsNotificacion = [];
                        responseArr.forEach(function (item, index){
                            itemsNotificacion.push({title: item.fecha, message: item.tema});
                        });
    
                        chrome.notifications.create({
                            type: 'list',
                            iconUrl: 'logo_amc48.png',
                            title: responseArr[0].nombre + ", tareas por entregar",
                            message:  + '; Fecha: ' + responseArr[0].fecha,
                            items:itemsNotificacion,
                            priority: 0
                        });
                    }
                } else {
                    chrome.notifications.create({
                        type: 'basic',
                        iconUrl: 'logo_amc48.png',
                        title: "Atención",
                        message: "Configure el componente",
                        priority: 0
                    });
                }
            }
        };
        xmlhttp.open("GET", url, true);
        xmlhttp.send();

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
    minutes = 1;
    //time_interval = 1000 * 60 * 10;
    time_interval = 1000 * 60 * 1;
    chrome.storage.local.set({minutes: minutes});
    chrome.browserAction.setBadgeText({text: 'ON'});

    chrome.alarms.create({delayInMinutes: 0});

    setInterval(function () {
        chrome.alarms.create({delayInMinutes: 0});
    }, time_interval);
}