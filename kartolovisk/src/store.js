const store = {
    _id: '',
    _username: '',
    _email: '',
    _token: '',
  
    isLogged () {
      return this.token
    },

    set id (str) {
        this.id = str
        localStorage.setItem('id', str)
      },
      get id () {
        return this.id || localStorage.getItem('id')
      },
  
    set username (str) {
      this._username = str
      localStorage.setItem('username',str)
    },
    get username () {
      return this._username || localStorage.getItem('username')
    },
  
    set email (str) {
      this._email = str
      localStorage.setItem('email',str)
    },
    get email () {
      return this._email || localStorage.getItem('email')
    },
  
    set token (str) {
      this._token = str
      localStorage.setItem('token',str)
    },
    get token () {
      return this._token || localStorage.getItem('token')
    }
  
  }
  export default store;