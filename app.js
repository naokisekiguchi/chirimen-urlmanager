window.addEventListener("load", function() {
  const urlmanager = new UrlManager({
    domain:"http://127.0.0.1:3000/api/",
    id:"meidai",
  });

  setInterval(urlmanager.polling.bind(urlmanager),1000);
});

function UrlManager(configs){
  this.domain = configs.domain;
  this.id = configs.id;
  this.lastupdated = null;
  this.frame = document.getElementById("myframe");
}

UrlManager.prototype = {
  polling:function(){
    let self = this;
    let xhr = new XMLHttpRequest({mozSystem: true});
    let url = this.domain+this.id;
    xhr.open('GET', url, true);
    xhr.onreadystatechange = function(){
      // 本番用
      if (xhr.readyState === 4 && xhr.status === 200){
        console.log(xhr.responseText);
        self.openUrl(JSON.parse(xhr.responseText)[0]);
      }
    };
    xhr.send(null);
  },
  openUrl:function(json){
    let url = json.url;
    if(this.lastupdated != json.lastupdated){
      this.lastupdated = json.lastupdated;
      let dd= new Date();
      url += "?"+dd;
      this.frame.src = url;
    }
  }
}
