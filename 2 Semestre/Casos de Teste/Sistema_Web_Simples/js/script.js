// script.js - comportamento simples de autenticação e registro usando localStorage
(function(){
  function getUsers(){
    try { return JSON.parse(localStorage.getItem('users')||'[]'); } catch(e){ return []; }
  }
  function saveUsers(u){ localStorage.setItem('users', JSON.stringify(u)); }
  function setSession(username){ localStorage.setItem('session_user', username); }
  function clearSession(){ localStorage.removeItem('session_user'); }
  function getSession(){ return localStorage.getItem('session_user'); }

  // criar usuário de teste padrão se não existir
  if(!getUsers().some(u=>u.username==='teste')){
    const u = getUsers();
    u.push({username:'teste', password:'1234', name:'Usuário Teste', email:'teste@example.com'});
    saveUsers(u);
  }

  // Registros de eventos para páginas
  document.addEventListener('DOMContentLoaded', function(){
    const path = location.pathname.split('/').pop();
    if(path === '' || path === 'index.html'){
      // nada
    } else if(path === 'login.html'){
      const form = document.getElementById('loginForm');
      const msg = document.getElementById('msg');
      form.addEventListener('submit', function(e){
        e.preventDefault();
        const username = document.getElementById('username').value.trim();
        const password = document.getElementById('password').value;
        const user = getUsers().find(u=>u.username === username && u.password === password);
        if(user){
          setSession(user.username);
          location.href = 'home.html';
        } else {
          msg.textContent = 'Usuário ou senha inválidos.';
        }
      });
    } else if(path === 'cadastro.html'){
      const form = document.getElementById('registerForm');
      const msg = document.getElementById('msg');
      form.addEventListener('submit', function(e){
        e.preventDefault();
        const name = document.getElementById('name').value.trim();
        const username = document.getElementById('regUsername').value.trim();
        const email = document.getElementById('email').value.trim();
        const password = document.getElementById('regPassword').value;
        if(!name || !username || !email || !password){
          msg.textContent = 'Por favor, preencha todos os campos.';
          return;
        }
        const users = getUsers();
        if(users.some(u=>u.username===username)){
          msg.textContent = 'Usuário já existe. Escolha outro.';
          return;
        }
        users.push({username, password, name, email});
        saveUsers(users);
        msg.style.color = 'green';
        msg.textContent = 'Cadastro realizado com sucesso. Redirecionando para o login...';
        setTimeout(()=> location.href = 'login.html', 1200);
      });
    } else if(path === 'home.html'){
      const welcome = document.getElementById('welcome');
      const logoutBtn = document.getElementById('logoutBtn');
      const session = getSession();
      if(!session){
        location.href = 'login.html';
        return;
      }
      const user = getUsers().find(u=>u.username === session) || {name:session};
      welcome.innerHTML = '<p>Bem-vindo, <strong>' + (user.name || user.username) + '</strong>!</p>';
      logoutBtn.addEventListener('click', function(){
        clearSession();
        location.href = 'login.html';
      });
    }
  });
})();