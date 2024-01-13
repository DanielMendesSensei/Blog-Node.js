//Swich Function Dark Mode
const swichTheme = () => {
    //Get root elements and date theme value
    const rootElement = document.documentElement
    let dataTheme = rootElement.getAttribute('data-theme'),
      newTheme
    
    newTheme = (dataTheme === 'light') ? 'dark' : 'light'
    if (newTheme === 'dark'){
      document.getElementById("dark_mode").innerHTML = "light_mode";
    } else{
      document.getElementById("dark_mode").innerHTML = "dark_mode";
    }
  
    //Set the new HTML attribute
    rootElement.setAttribute('data-theme', newTheme)
  }
  
  //Add event listner for the theme switcher
  document.querySelector('#dark_mode').addEventListener('click', swichTheme)

//Swich Function Login/Register
const wrapper = document.querySelector('.form-box');
const loginLink = document.querySelector('.login-link');
const registerLink = document.querySelector('.register-link');
const btnPopup = document.querySelector('.btnLogin-popup');
const btnPopupMobile = document.querySelector('.btnLogin-popup-mobile');
const iconClose = document.querySelector('.icon-close');

//Mobile variables
const mobileMenulink = document.querySelector('#mobile_menu');
const closeMenu = document.querySelector('#close_mobile_menu');
const mobileMenu = document.querySelector('.nav_mobile');

loginLink.addEventListener('click', ()=> {
  wrapper.classList.remove('active');
});

registerLink.addEventListener('click', ()=> {
  wrapper.classList.add('active');
});

btnPopup.addEventListener('click', ()=> {
  wrapper.classList.add('active-popup');
});

btnPopupMobile.addEventListener('click', ()=> {
  wrapper.classList.add('active-popup');
  mobileMenu.classList.remove('active-menu');
  closeMenu.classList.remove('transform-close');
  mobileMenulink.classList.remove('active');

});

iconClose.addEventListener('click', ()=> {
  wrapper.classList.remove('active-popup');
});

//Mobile Menu Function
mobileMenulink.addEventListener('click', ()=> {
  mobileMenu.classList.add('active-menu');
  closeMenu.classList.add('transform-close');
  mobileMenulink.classList.add('active');
});

closeMenu.addEventListener('click', ()=>{
  mobileMenu.classList.remove('active-menu');
  closeMenu.classList.remove('transform-close');
  mobileMenulink.classList.remove('active');
});