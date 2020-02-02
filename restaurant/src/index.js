import {createNavBar, clearContent} from './navigation.js'
import {loadHome} from './home.js'
import {loadMenu} from './menu.js'
import {loadContact} from './contact.js'
import {loadAbout} from './about.js'

createNavBar()
loadContact()
loadMenu()
loadAbout()
clearContent()
loadHome()
