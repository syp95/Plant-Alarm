(()=>{"use strict";self.addEventListener("push",(function(t){const e=JSON.parse(t.data.text());var n;console.log("start"),t.waitUntil((n=e.time,new Promise((t=>{setTimeout(t,n)}))).then((()=>{console.log(e.time/1e3+"second"),registration.showNotification(e.title,{body:e.message,icon:"/icons/192logo.png"})})))})),self.addEventListener("notificationclick",(function(t){t.notification.close(),t.waitUntil(clients.matchAll({type:"window",includeUncontrolled:!0}).then((function(t){if(t.length>0){let e=t[0];for(let n=0;n<t.length;n++)t[n].focused&&(e=t[n]);return e.focus()}return clients.openWindow("/")})))}))})();