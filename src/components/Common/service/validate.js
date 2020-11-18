const validate = ({name, value}, state) =>  {
    const errors = [];
    if(state.field[name].required){
        if(!value){
          errors.push(`${name} is required`);
        } else {
          switch(name){
            case 'username':
              const reUsername = /^((?!(\blala\b|\bwawa\b|\bdada\b)).)*$/i;
              if(!reUsername.test(value)){
                errors.push(`${name} should be not be this word.`);
              }
              break;
            case 'fullName':
              const reFullName = /^(\w.+\s).+/i;
              if (!reFullName.test(value)){
                errors.push(`${name} should be two words.`);
              }
              break;
            case 'email':
              const reEmail = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/i;
              if (!reEmail.test(value)){
                errors.push(`invalid e-mail address`);
              }
              break;
            case 'password':
              const rePassword = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{6,}$/;
              if(!rePassword.test(value)) {
                errors.push(`This ${name} is invalid`);
              }
              break;
            case 'passwordVerify':
              if(value !== state.field.password.value) {
                errors.push(`passwords do not match!`);
              }
              break;
              default:
          }
      }
    }
return errors;
}
export default validate;