// Copyright 2017 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.
'use strict';
 
function setAlarm(event) {
  var  minutes = parseFloat(event.target.value);
  chrome.browserAction.setBadgeText({text: 'ON'});
  chrome.alarms.create({delayInMinutes: minutes});
  chrome.storage.sync.set({minutes: minutes});
  window.close();
}

function clearAlarm() {
  chrome.browserAction.setBadgeText({text: ''});
  chrome.alarms.clearAll();
  window.close();
}

function setUsuario() {
    chrome.storage.local.set({userAMC: document.getElementById("usuario").value});
    //TODO validar usuario
    window.close();
}

chrome.storage.local.get(['userAMC'], function(result) {
    document.getElementById("usuario").value = result.userAMC;
});
//An Alarm delay of less than the minimum 1 minute will fire
// in approximately 1 minute incriments if released
document.getElementById('sampleSecond').addEventListener('click', setAlarm);
document.getElementById('15min').addEventListener('click', setAlarm);
document.getElementById('cancelAlarm').addEventListener('click', clearAlarm);
document.getElementById('grabar').addEventListener('click', setUsuario);
