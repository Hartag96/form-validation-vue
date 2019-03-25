var shoppingList = new Vue({
  el: '#form_main',
  data: {
    state: 2,
    selectedLangs: [],
    langs: [
      {
        label: 'C',
        selected: false,
      },
      {
        label: 'C++',
        selected: false,
      },
      {
        label: 'Java',
        selected: false,
      },
      {
        label: 'Perl',
        selected: false,
      },
      {
        label: 'Delphi',
        selected: false,
      }
    ],
    personal1: [
      {
        label: 'Imię',
        value: null,
        valid: null
      },
      {
        label: 'Nazwisko',
        value: "ty",
        valid: null
      },
      {
        label: 'Miasto',
        value: null,
        valid: null
      },
      {
        label: 'Kod Pocztowy',
        value: null,
        valid: null
      },
      {
        label: 'Wojewodztwo',
        value: null,
        valid: null
      }
    ]
  },
  computed: {
    countSelected() {
      // return this.langs.map(l => l.selected).filter(s => s).length
      return this.selectedLangs.length
    },
    // reversedItems() {
    //   return this.items.slice(0).reverse();
    // }
    postCodeValue(){
      obj = this.personal1.find(p => p.label === "Kod Pocztowy");
      console.log(obj);
      if(obj.value && obj.value.length > 2) {
        return obj.value = obj.value.substr(0, 1).concat('-').concat(obj.value.substr(2, obj.value.length))
      }else{
        return obj.value
      }
    },
    countLen(data) {
      return (data.value.length > 1 && data.value.length < 20) ? true : false
    }
  },
  methods: {
    handleNext: function () {
      this.state <= 3 ? this.state++ : null
    },

    handlePrev: function () {
      this.state > 1 ? this.state-- : null
    },

    selectLang: function (lang) {
      this.langs.find(l => l.label === lang.label).selected = !lang.selected
      lang.selected ? this.selectedLangs.push(lang.label) : this.selectedLangs = this.selectedLangs.filter(l => l !== lang.label )
    },

    iksde: function(data){
      let len = (data.value && (/^[^\x00-\x7F]|[A-Z]/.test(data.value)) && data.value.length > 1 && data.value.length < 20) ? true : false
      this.personal1.find(p => p.label === data.label).valid = len
      console.log(data.value);
    },
    postCode: function (data) {
      // if(data.value.length == 2 && !data.value.includes('-'))
       // this.personal1.find(p => p.label === data.label).value = data.value.concat('-')
      console.log(data.value);
    }
    // saveItem: function() {
    //   this.items.push({
    //     label: this.newItem,
    //     purchased: false,
    //     highPrority: false
    //   })
    //   this.newItem = '';
    // },
    // changeState: function(newState) {
    //   this.state = newState;
    //   this.newItem = '';
    // },
    // tooglePurchased: function(item) {
    //   item.purchased = !item.purchased
    // }
  }
});
