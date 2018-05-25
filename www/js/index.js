/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
var app = {
    // Application Constructor
    initialize: function() {
        this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        //document.addEventListener('deviceready', this.onDeviceReady, false);
        document.addEventListener('deviceready', function() {
            this.onDeviceReady;

            var today = new Date();
            var tomorrow = new Date();
            tomorrow.setDate(today.getDate());
            tomorrow.setHours(17);
            tomorrow.setMinutes(13);
            tomorrow.setSeconds(0);
            var tomorrow_at_6_am = new Date(tomorrow);

            cordova.plugins.notification.local.schedule({
                id: 10,
                title: "Meeting in 15 minutes!",
                text: "Jour fixe Produktionsbesprechung",
                at: tomorrow_at_6_am,
                data: { meetingId:"#123FG8" }
            });
            // Join BBM Meeting when user has clicked on the notification 
            cordova.plugins.notification.local.on("click", function (notification) {
                if (notification.id == 10) {
                    joinMeeting(notification.data.meetingId);
                }
            });

            // Notification has reached its trigger time (Tomorrow at 8:45 AM)
            cordova.plugins.notification.local.on("trigger", function (notification) {
                if (notification.id != 10)
                    return;

                // After 10 minutes update notification's title 
                setTimeout(function () {
                    cordova.plugins.notification.local.update({
                        id: 10,
                        title: "Meeting in 5 minutes!"
                    });
                }, 600000);
            });

        }, false);
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicitly call 'app.receivedEvent(...);'
    onDeviceReady: function() {
        app.receivedEvent('deviceready');
    },
    // Update DOM on a Received Event
    receivedEvent: function(id) {
        var parentElement = document.getElementById(id);
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');

        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');

        console.log('Received Event: ' + id);
    }
};
