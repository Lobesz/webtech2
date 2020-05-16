Vue.use(VueResource);

var app = new Vue({
  el: '#app',

  data(){
    return {
      'user'        :   {'cart':[]},
      'items'       :   [],
      'state'       :   'allbook',
      loading       :   false,
      searchQuery   :   '',
      selectedItem  :   {}
    }
  },
  created: function(){
    this.fetchData();
  },
  methods: {
    fetchData : function(){
      var _this = this;
      _this.loading = true;
      _this.$http.get('/api/user')
      .then(response => {
        _this.user = response.body[0];
        return _this.$http.get('/api/books');
      })
      .then(response=>{
        _this.items=response.body;
        _this.smallLoadEffect();
      });
    },

    smallLoadEffect : function(){
      var _this = this;
      _this.loading = true;
      setTimeout(function(){
          _this.loading=false;
      }, 300);
      return 'ok';
    },

    addCart : function(item) {

      if(item.db <= 0) return;

      if(parseInt(this.user.money)<parseInt(item.ar)) return;

      if(this.user.cart.findIndex(k => k.id==item.id) == -1){
          this.user.cart.push(item);
          this.user.money -= parseInt(item.ar);
          item.db--;

          $.ajax({
            url  : '/api/user',
            data: this.user,
            method: 'PUT'
          });
          $.ajax({
            url  : '/api/books/'+item.id,
            data: item,
            method: 'PUT'
          });
      }

    },

    removeCart : function(item) {

      var index = this.user.cart.findIndex(k => k.id==item.id);
      if(index != -1){
          this.user.cart.splice(index, 1);
          this.user.money += parseInt(item.ar);
          item.db++;

          $.ajax({
            url  : '/api/user',
            data: this.user,
            method: 'PUT'
          });
          $.ajax({
            url  : '/api/books/'+item.id,
            data: item,
            method: 'PUT'
          });
      }

    },

    saveuser: function(){
      $.ajax({
        url  : '/api/user',
        data: this.user,
        method: 'PUT'
      });
    }

  },

  watch : {
    state : function(newState){
      switch(newState) {
        case 'allbook' : this.smallLoadEffect();break;
        case 'search' : this.smallLoadEffect();break;
        case 'contact' : this.smallLoadEffect();break;
        case 'settings' : this.smallLoadEffect();break;
        case 'cart' : this.smallLoadEffect();break;
        case 'details' : this.smallLoadEffect();break;
      }
    },
  },

  computed : {
    filteredItems : function(){
      var _this = this;
      return _this.items.filter(item=>{
        return JSON.stringify(item).toUpperCase().indexOf(_this.searchQuery.toUpperCase()) !== -1;
      })
    }
  }

}).mount