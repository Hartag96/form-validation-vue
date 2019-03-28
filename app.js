const formValidator = new Vue({
  el: '#form_main',
  data: {
    state: 1,
    langs: ['C', 'C++', 'Java', 'Perl', 'Delphi'],
    selectedLangs: [],

    name: '',
    surname: '',
    city: '',
    code: '',
    province: '',

    email: '',
    ipAddr: '',
    url: '',
    password: ''
  },

  computed: {
    countSelected() {
      return this.selectedLangs.length
    },

    progressValue(){
      let validatedInputs = [
        (this.countSelected > 0 && this.countSelected < 4),
        this.validText(this.name),
        this.validText(this.surname),
        this.validText(this.city),
        this.validPostCode(),
        this.province !== '',
        this.validEmail(),
        this.validIpAddr(),
        this.validUrl(),
        this.validPassword()
      ];
      return validatedInputs.filter(p => p === true).length;
    },

    scorePassword(){
      let score = 0;
      if (!this.password)
          return score;

      let letters = new Object();
      for (let i=0; i<this.password.length; i++) {
          letters[this.password[i]] = (letters[this.password[i]] || 0) + 1;
          score += 5.0 / letters[this.password[i]];
      }

      let variationCount = this.passwordComplex()
      score += (variationCount - 1) * 10;

      return parseInt(score);
      }
  },

  methods: {
    handleNext: function () {
      this.state <= 3 ? this.state++ : null
    },

    handlePrev: function () {
      this.state > 1 ? this.state-- : null
    },

    langPosition: function (lang) {
      return this.selectedLangs.indexOf(lang)
    },

    selectLang: function (lang) {
      this.langPosition(lang) < 0 ? this.selectedLangs.push(lang) : this.selectedLangs = this.selectedLangs.filter(l => l !== lang )
    },

    validText: function (data) {
      return ((/^[^\x00-\x7F]|[A-Z]/.test(data)) && data.length > 1 && data.length < 20) ? true : false;
    },

    validPostCode: function () {
      return  this.code.length === 6 && (/^(\d+-?)+\d+$/).test(this.code)
    },

    validEmail: function () {
      let re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return re.test(String(this.email).toLowerCase());
    },

    validIpAddr: function () {
      let re = /^(?!0)(?!.*\.$)((1?\d?\d|25[0-5]|2[0-4]\d)(\.|$)){4}$/
      return re.test(this.ipAddr);
    },

    validUrl: function () {
      let re = /(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/
      return re.test(this.url)
    },

    validPassword: function() {
      return this.password.length >= 8 && this.passwordComplex() > 2 ? true : false
    },

    passwordComplex: function(){
      let variations = {
          digits: /\d/.test(this.password),
          lower: /[a-z]/.test(this.password),
          upper: /[A-Z]/.test(this.password),
          nonWords: /\W/.test(this.password),
      }

      let variationCount = 0;
      for (let check in variations) {
          variationCount += (variations[check] == true) ? 1 : 0;
      }
      return variationCount;
    },

    postCodeValue: function(code) {
      if(this.code && this.code.length > 2 && !this.code.includes('-')) {
        this.code = [this.code.substr(0, 2), '-', this.code.substr(2, this.code.length)].join('')
      }
    },
    
    submit: function () {
      alert(this.progressValue === 10 ? 'Pola ustawione poprawnie' : 'Popraw pola formularzu')
    }
  }
});
