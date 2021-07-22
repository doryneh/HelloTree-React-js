import $ from "jquery";

function UserType() {
    $("#form-checkout Input[name='inlineRadioOptions']").change(function(){
      var Checkbox =$(this).val();
      if(Checkbox === 'option2'){
        $('#companyName').css('display' , "none");
      }
      else{
        $('#companyName').css('display' , "block");
      }
      $('#companyName').toggle();
    });
    }
    
export default UserType;