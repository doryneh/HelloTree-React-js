
function ShowPassConfi() {
    var x = document.getElementById("myInputConfirmation");
    if (x.type === "password") {
      x.type = "text";
    } else {
      x.type = "password";
    }
  }

export default ShowPassConfi;