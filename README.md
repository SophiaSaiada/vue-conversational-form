# Vue.js Conversational Form
Turning web forms into conversations using Vue.js.  
[Demo](https://yossi787.github.io/vue-conversational-form/)

## Install
``` bash
npm i --save vue-conversational-form
```

## Usage
``` html
<template>
    <ConversationalForm @submit="submit">
      <fieldset>
        <label for="name">What's your name?</label>
        <input required data-question="Hi there! What's your name? " type="text" name="name" id="name">
      </fieldset>
      <fieldset>
        <label for="thats-all">Are you ready to submit the form?</label>
        <button data-question="Are you ready to submit the form?" data-success="Submited! Yay! 😄" name="submit" type="submit" data-cancel="Nope">Yup</button>
      </fieldset>
    </ConversationalForm>
</template>
<script>
import ConversationalForm from 'vue-conversational-form'

export default {
  name: 'App',
  components: {
    ConversationalForm
  },
  methods: {
    submit (o) {
      console.log('Submit:')
      console.log(o) // get form data
    }
  }
}
</script>
```

## Documentation
For every input typw, the question will be defined in the `data-question` attribute.  
Multple questions options will be seperated by `|`. Use inserted values using `{value-name}`.  
For submit buttons. use `data-success` for defining success message.  
For submit/reset buttons, use `data-cancel` for defining the cancel button's text.  
  
Define a text/email/password input:
``` html
<fieldset>
  <label for="name">What's your name?</label>
  <input required data-question="Hi there! What's your name? " type="text" name="name" id="name">
</fieldset>
```  
Define a radio buttons' group:
``` html
<fieldset>
   <label for="name">Gender</label><br />
   <input type="radio" data-question="What's your gender?" name="gender" value="male" data-text="Male" /> Male<br>
   <input type="radio" name="gender" value="female" data-text="Female" /> Female<br>
   <input type="radio" name="gender" value="other" data-text="Other" /> Other
</fieldset>
```
Define a select group:
``` html
<fieldset>
    <label for="opinion">Will conversational interfaces be everywhere?</label>
    <select data-question="Do you think conversational forms will replace web forms in the future?" name="opinion" id="opinion">
        <option></option>
        <option>Definitely</option>
        <option>Maybe</option>
        <option>No</option>
    </select>
</fieldset>
```
Define a submit button:
``` html
<fieldset>
    <label for="thats-all">Are you ready to submit the form?</label>
    <button data-question="Are you ready to submit the form?" data-success="Submited! Yay! 😄" name="submit" type="submit" data-cancel="Nope">Yup</button>
</fieldset>
```
Define a reset button:
``` html
<fieldset>
    <label for="thats-all">Want to start over?</label>
    <button data-question="Want to start over?" name="reset" type="reset" data-cancel="No">Yes, let's go again</button>
</fieldset>
```
Use inserted values as a part of a question:
``` html
<fieldset>
    <label for="company">Company</label>
    <input data-question="{occupation}, nice! Which company are you with?" type="text" name="company" id="company">
</fieldset>
```
