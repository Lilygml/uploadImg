 function sendImage(file) {
	  var fd = new FormData();
	  fd.append("file", file);
	  fd.append("taskId",task.id);
	  //fd.append("subtaskId",stid);
	  fd.append("senderId",window.localStorage["JRHTCUSERID"]);
	  fd.append("senderName",window.sessionStorage["usename"]);
	  var xhr=new XMLHttpRequest;

	  xhr.upload.addEventListener("progress", uploadProgress, false);
	  xhr.addEventListener("load", uploadComplete, false);
	  xhr.addEventListener("error", uploadFailed, false);
	  xhr.addEventListener("abort", uploadCanceled, false);
	
	  xhr.open("POST", apiBaseUrl.apiBaseUrl+"/message/osMessage/multipart" ,true);
	  xhr.send(fd);
 
	  var url=window.URL.createObjectURL(file);
	 
	 /* var reader = new FileReader();
		reader.onload = function() {
			var result = this.result;
			$(selector).before("<img style='width:3em;height:2em;margin:10px;' src='" + result + "''>");
			param.append("file", file);
		};
		reader.readAsDataURL(file);
	 */
	 
	 
	  var records = {
		  	  records: [createRecord(getCurrentLocalTime.three(),'', '<img src='+url+' /><span style="width:100%;display: inline-block;text-align:center" id="progress"></span>', true)]
		  };
	  $("#js-communication-records").append(ctemplate(records));
	  function uploadProgress(evt) {
		  scrollToBottom();
    	  if (evt.lengthComputable) {
    	    var percentComplete = Math.round(evt.loaded * 100 / evt.total);
    	    setTimeout(function(){
    	    	document.getElementById('progress').innerHTML = percentComplete.toString() + '%';
    	    })
    	  }
    	  else {
    	      document.getElementById('progress').innerHTML = 'unable to compute';
    	  }
      }
	  function uploadComplete(evt) {
		 $('#progress').remove();
	  }
			
	    //上传失败
	  function uploadFailed(evt) {
		  alert("上传失败");
	  }
		//取消上传
	  function uploadCanceled(evt) {
		  alert("您取消了本次上传.");
	  }
  }