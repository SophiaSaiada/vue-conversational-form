<template>
  <div id="app">
    <ConversationalForm @submit="submit">
      <fieldset>
        <label for="name">What's your name?</label>
        <input required data-question="Hi there! What's your name? " type="text" name="name" id="name">
      </fieldset>

      <fieldset>
        <label for="name">What's your gender?</label>
        <input type="radio" data-question="What's your gender?" name="gender" value="male" data-text="Male" /> Male<br>
        <input type="radio" name="gender" value="female" data-text="Female" /> Female<br>
        <input type="radio" name="gender" value="other" data-text="Other" /> Other
      </fieldset>

      <fieldset>
        <label for="occupation">Occupation</label>
        <select data-question="Great to meet you, {name}! I'm a web form, what do you do?|Awesome, {name}! And what do you do?" name="occupation" id="occupation">
          <option value="developer">Developer</option>
          <option value="designer">Designer</option>
          <option value="curious-mind">Curious mind</option>
          <option value="lost-cause">Lost cause</option>
        </select>
      </fieldset>

      <fieldset>
        <label for="company">Company</label>
        <input data-question="{occupation}, nice! Which company are you with?" type="text" name="company" id="company">
      </fieldset>

      <fieldset>
        <label for="opinion">Will conversational interfaces be everywhere?</label>
        <select data-question="Do you think conversational forms will replace web forms in the future?" name="opinion" id="opinion">
          <option></option>
          <option>Definitely</option>
          <option>Maybe</option>
          <option>No</option>
        </select>
      </fieldset>

      <fieldset>
        <label for="email">Email</label>
        <input pattern=".+\@.+\..+" data-invalid="E-mail not correct" data-question="Please give me your email."
          type="email" name="email" id="your-email">
      </fieldset>

      <fieldset>
        <label for="thats-all">Are you ready to submit the form?</label>
        <button data-question="Are you ready to submit the form?" data-success="Submited! Yay! 😄" name="submit" type="submit" data-cancel="Nope">Yup</button>
      </fieldset>

      <fieldset>
        <label for="thats-all">Want to start over?</label>
        <button data-question="Want to start over?" name="reset" type="reset" data-cancel="No">Yes, let's go again</button>
      </fieldset>
    </ConversationalForm>
  </div>
</template>

<style>
body {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  padding: 0;
  margin: 0;
  background-image: url(pexels.jpg);
  background-size: cover;
  background-position: center;
}
body>div {
    box-shadow: 0 4px 5px -1px rgba(0,0,0,.1), 0 7px 8px 0 rgba(0,0,0,.07), 0 1px 18px 0 rgba(0,0,0,.06);
    border-radius: 5px;
    overflow: hidden;
}
</style>

<script>
import ConversationalForm from './components/ConversationalForm'

export default {
  name: 'App',
  components: {
    ConversationalForm
  },
  methods: {
    submit (o) {
      console.log('Submit:')
      console.log(o)
    }
  }
}
</script>
