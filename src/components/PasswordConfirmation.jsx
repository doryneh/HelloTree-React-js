import $ from "jquery";

function PasswordConfirmation() {
    $("#btnSubmit").click(function () {
      var password = $("#myInput").val();
      var confirmPassword = $("#myInputConfirmation").val();
      if (password !== confirmPassword) {
        alert("Your password does not match");
        return false;
      }
      return true;
    });
  };

export default PasswordConfirmation;