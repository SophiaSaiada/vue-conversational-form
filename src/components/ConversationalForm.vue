<template>
  <div>
    <div class="vcf-container">
      <div class="vcf-messages">
        <div ref="scroll-box">
          <template v-for="(row,i) of screenplay" v-if="i <= step">
            <div class="vcf-question" :key="`q${i}`">
              <span>{{ parse(row) }}</span>
            </div>
            <div class="vcf-answer" :key="`a${i}`">
              <transition name="scale">
                <span v-if="row.answer">{{ row.answer }}</span>
              </transition>
            </div>
          </template>
        </div>
      </div>
      <div :class="{'vcf-input-container': true, finished}">
        <transition name="fade">
          <div class="vcf-options" ref="options" v-if="currentStepType === 'select' || currentStepType == 'button'">
            <div v-for="(option, i) of screenplay[step].options" :key="`o${i}`" class="vcf-option" @click="choose(option)">
              {{ option.text }}
            </div>
          </div>
        </transition>
        <transition name="fade">
          <div class="vcf-options-arrows" v-if="currentStepType === 'select' || currentStepType == 'button'">
            <div class="backward" :class="{visible: scrollBackward}" @mouseenter="doScrollBackward" @mouseleave="stopScroll"></div>
            <div class="forward" :class="{visible: scrollForward}" @mouseover="doScrollForward" @mouseleave="stopScroll"></div>
          </div>
        </transition>
        <input class="vcf-input" :type="currentStepType" :disabled="finished" @keypress.enter="send" ref="input" v-model="q" autofocus />
        <transition name="fade">
          <div class="vcf-send-button" @click="send" v-show="!(currentStepType === 'select' || currentStepType == 'button')"></div>
        </transition>
      </div>
    </div>
  </div>
</template>
<style lang="scss" scoped>
@import 'style/_main';
</style>
<script>
import VueScrollTo from 'vue-scrollto'

export default {
  name: 'ConversationalForm',
  data () {
    return {
      step: 0,
      q: '',
      screenplay: Array,
      values: Array,
      patterns: Array,
      finished: false,
      scrollBackward: false,
      scrollForward: false,
      scrollInterval: null
    }
  },
  mounted () {
    this.init()
  },
  computed: {
    currentStepType () {
      return (this.screenplay[this.step] || { type: 'text' }).type
    }
  },
  methods: {
    init () {
      this.screenplay = this.$slots.default.filter(s => s.tag === 'fieldset').map(s => {
        let input = s.children.filter(i => ['input', 'select', 'button'].includes(i.tag))
        if (input.length === 0) {
          return null
        } else {
          input = input[0]
        }
        let desc = input.data.attrs.placeholder || input.data.attrs.name
        if (input.data.attrs['data-question']) {
          desc = input.data.attrs['data-question'].split('|')
          desc = desc[Math.floor(Math.random() * desc.length)]
        }
        if (input.data.attrs.pattern) {
          this.patterns[input.data.attrs.name] = new RegExp(input.data.attrs.pattern)
        }
        if (input.tag === 'input' && input.data.attrs.type === 'radio') {
          let options = s.children.filter(i => i.tag === 'input' && i.data.attrs.type === 'radio').map(c => {
            if (!c.data.attrs) return {text: '', value: ''}
            return { text: c.data.attrs['data-text'], value: c.data.attrs.value }
          }).filter(o => o.value !== '')
          return {
            type: 'select',
            name: input.data.attrs.name,
            options,
            desc
          }
        }
        switch (input.tag) {
          case 'input':
            return {
              type: input.data.attrs.type,
              name: input.data.attrs.name,
              invalidMessage: input.data.attrs['data-invalid'] || 'Not Valid',
              desc
            }
          case 'select':
            return {
              type: 'select',
              name: input.data.attrs.name,
              options: input.children.filter(c => c.tag).filter(c => c.tag === 'option').map(c => {
                let text = (c.children || [{text: ''}])[0].text
                if (!c.data) return {text, value: text}
                let value = (c.data.attrs || {value: text}).value
                return { text, value }
              }).filter(o => o.value !== ''),
              desc
            }
          case 'button':
            return {
              type: 'button',
              name: input.data.attrs.name,
              successMessage: input.data.attrs['data-success'],
              options: [{ text: (input.children || [{text: 'Submit'}])[0].text, value: (input.data || {attrs: {value: 'submit'}}).attrs.value, action: input.data.attrs.type }, {text: input.data.attrs['data-cancel'] || 'Not Valid', value: 'no', type: input.data.attrs.type, action: 'cancel'}],
              desc
            }
        }
      }).filter(o => o)
      this.step = 0
      this.finished = false
      this.values = {}
    },
    parse (row) {
      let alternatives = row.desc.replace(/(\{)([a-z]+)(\})/g, (f, ob, m, cb) => (this.values[m] || {text: m}).text).split('|')
      return (alternatives.length === 1) ? alternatives[0] : alternatives[Math.floor(Math.random() * alternatives.length)]
    },
    choose (option) {
      if (this.finished) return
      if (!['select', 'button'].includes(this.currentStepType)) return
      let increaseStep = true
      if (this.currentStepType === 'button') {
        if (option.action === 'submit') {
          let output = Object.keys(this.values).reduce((previous, current) => {
            previous[current] = this.values[current].value
            return previous
          }, {})
          this.$emit('submit', output)
          if (this.screenplay[this.step].successMessage) {
            this.screenplay.splice(this.step + 1, 0, { type: 'message', name: this.screenplay[this.step].name, desc: this.screenplay[this.step].successMessage, successMessage: this.screenplay[this.step].successMessage })
          }
          this.screenplay[this.step].answer = this.q
          this.finished = true
        }
        if (option.action === 'reset') {
          increaseStep = false
          this.init()
        }
        if (option.action === 'cancel' && option.type === 'reset') {
          this.screenplay[this.step].answer = this.q
          this.finished = true
        }
      }
      if (increaseStep) {
        this.screenplay[this.step].answer = option.text
        this.values[this.screenplay[this.step].name] = option
        this.doStep()
      }
    },
    send () {
      if (this.finished) return
      if (['select', 'submit'].includes(this.currentStepType)) return
      if (this.q.trim() === '') return
      if (this.patterns[this.screenplay[this.step].name] instanceof RegExp) {
        let valid = this.patterns[this.screenplay[this.step].name].test(this.q)
        if (!valid) {
          this.screenplay.splice(this.step + 1, 0, { type: 'message', name: this.screenplay[this.step].name, desc: this.screenplay[this.step].invalidMessage, invalidMessage: this.screenplay[this.step].invalidMessage })
          this.screenplay[this.step].answer = this.q
          this.doStep()
          return
        }
      }
      this.screenplay[this.step].answer = this.q
      this.values[this.screenplay[this.step].name] = {text: this.q, value: this.q}
      this.doStep()
    },
    doStep () {
      this.scrollToBottom()
      this.q = ''
      this.step++
      this.scrollBackward = false
      this.scrollForward = false
      if (['select', 'button'].includes(this.currentStepType)) {
        this.$nextTick(() => setTimeout(() => { this.stopScroll() }, 600))
      } else {
        this.$nextTick(() => this.$refs.input.focus())
      }
    },
    scrollToBottom () {
      let messages = this.$refs['scroll-box'].children
      VueScrollTo.scrollTo(messages[messages.length - 1], 300, {
        container: this.$refs['scroll-box'],
        easing: 'ease-in',
        y: true,
        x: false
      })
    },
    doScrollBackward () {
      const options = this.$refs.options
      this.scrollInterval = setInterval(() => {
        options.scrollLeft -= 5
        if (!options.scrollLeft) {
          this.stopScroll()
        }
      }, 25)
    },
    doScrollForward () {
      const options = this.$refs.options
      const rightEdge = options.scrollWidth - options.clientWidth
      this.scrollInterval = setInterval(() => {
        options.scrollLeft += 5
        if (options.scrollLeft === rightEdge) {
          this.stopScroll()
        }
      }, 25)
    },
    stopScroll () {
      const options = this.$refs.options
      const rightEdge = options.scrollWidth - options.clientWidth
      this.scrollBackward = options.scrollLeft > 10
      this.scrollForward = options.scrollLeft < rightEdge - 10
      clearInterval(this.scrollInterval)
    }
  }
}
</script>
