<template>
  <div id="app">
    <h1>Vue.js Conversational Form</h1>
    <form>
      <fieldset>
        <label for="name">Name</label>
        <input required data-question="Hi there! What's your name? " type="text" name="name" id="name">
      </fieldset>

      <fieldset>
        <label for="name">Gender</label><br />
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
    </form>
    <div></div>
    <ConversationalForm @submit="submit" id="vcf">
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
@import url('https://fonts.googleapis.com/css?family=Cairo');
body {
  display: flex;
  min-height: 100vh;
  padding: 0;
  margin: 0;
  align-items: center;
  font-family: 'Cairo', sans-serif;
  background-image: url(https://i.imgur.com/6ad2oBV.jpg);
  background-size: cover;
  background-position: center;
}
h1, #app>div:first-of-type {
  color: #fff;
  text-shadow: 1px 1px 4px rgba(0, 0, 0, 0.3), 0px 1px 2px rgba(0, 0, 0, 0.5);
}
h1 {
  font-size: 2rem;
  grid-column: 1 / 4;
}

#app {
  display: grid;
  align-items: center;
  justify-items: center;
  grid-template-rows: min-content 1fr;
  grid-template-columns: minmax(min-content, 1fr) 40px minmax(min-content, 1fr);
  flex-grow: 1;
}

#app>div:first-of-type {
  display: flex;
  align-items: center;
  justify-content: center;
}

#app>div:first-of-type::before {
  content: '⇒';
  font-size: 40px;
}

form {
  width: 100vw;
  max-width: 460px;
}

fieldset {
  background: #fff;
}

#vcf .vcf-container,
form {
  box-shadow: 0 4px 5px -1px rgba(0, 0, 0, .1), 0 7px 8px 0 rgba(0, 0, 0, .07), 0 1px 18px 0 rgba(0, 0, 0, .06);
  border-radius: 5px;
  overflow: hidden;
}

@media only screen and (max-width: 980px) {
  #app {
    grid-template-columns: 1fr;
    grid-template-rows: min-content max-content 60px max-content;
  }
  #app>div:first-of-type::before {
    content: '⇓';
  }
  h1 {
    grid-column: 1 / 2;
    grid-row: 1 / 2;
  }
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
