document.addEventListener("DOMContentLoaded", function(){
    document.getElementById("searchq").addEventListener("keyup", function(){
        getApiResponse();
    });
});
const URL = "db.json";

function createXMLHttpRequestObject(){

	if(window.XMLHttpRequest){
		xmlHTTPRequest = new XMLHttpRequest();
	}
	else{
		xmlHTTPRequest = new ActiveXObject("Microsoft.XMLHTTP");
	}
	return xmlHTTPRequest;
}

let _ = new createXMLHttpRequestObject();
function getApiResponse(){
    if(_!=null){
        _.open("GET", URL, true);
        _.onreadystatechange = processResponse;
        _.send(null);
    }
    else{
        console.log("Request object not created");
    }

}

function processResponse(){
    let qs = document.getElementById("searchq").value;
    if(_.readyState==4 && _.status==200){

        let jsObj = JSON.parse(_.responseText);
        let wrapper = document.getElementById("fullform");
        wrapper.innerHTML="";
        for (var i=0; i<jsObj.length; i++){
            if(jsObj[i].id.toUpperCase()==qs.toUpperCase()){// match if the ID is equal to the text that is there in the text box
                let dEle = document.createElement("span")
                dEle.innerHTML=jsObj[i].value
                wrapper.appendChild(dEle);
            }
        }
    }
}
