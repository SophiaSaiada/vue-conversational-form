# vue-conversational-form
Turning web forms into conversations using Vue.js
[Demo](https://yossi787.github.io/vue-conversational-form/)

## Install
``` bash
npm i --save vue-conversational-form
```

## Usage
``` bash
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
