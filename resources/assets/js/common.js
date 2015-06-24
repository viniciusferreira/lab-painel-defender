function openOldSystem(){
	var altura = window.screen.height - 50;
	var largura = window.screen.width;
	var win = window.open('/wcli/job.php',_janela,'height = '+ altura +' width = '+ largura +' top = 0 left = 0');
}
function logoff() {
	try {
	top.location.href = "/wcli/logout.php";
/*
		if (window.parent.opener!=null) {
			window.parent.opener.location.href = "/wcli/logout.php?<?=(isset($_SESSION['url_retorno'])?:'');?>";
			window.parent.close();
		} else {
			top.location.href = "/wcli/logout2.php?<?=(isset($_SESSION['url_retorno'])?:'');?>";
		}
*/
	}
  catch(e) {
	top.location.href = "/wcli/logout2.php?"+_urlReturn;
	}
}