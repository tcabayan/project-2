# fsf-p02
# Full Stack Flex Project 2

Listen, Hear is the only app that you need in order to track and playback your favorite podcasts.
Add your favorite podcasts to the Listen, Hear database
See most recently-updated episodes on the Listen, Hear homepage
Listen to your added podcast episodes at any time on Listen, Hear

### Lovingly created by: KFC&T
Katherine Treadwell, Frank Flores, Christopher Zenner, and Tamar Cabayan

### New Technologies
#### Passport
Passport is advertised as “simple, unobtrusive authentication for Node.js”.  It is not simple but it is unobtrusive.  We used Passport as our authentication middleware and passport-github as our authentication strategy.  Since our classmates each have a GitHub account, we felt that this was the best platform to use for authentication.  GitHub also has a built-in OAuth App which can act on behalf of the user and perform user-to-server requests.  With Passport, we chose to enable persistent sessions instead of utilizing tokens ensuring that Listen, Hear users maintained consistent access to their Podcasts so long as they remained logged in on the same browser.

### webpack
We used webpack as part of our deployment strategy.  webpack is a JavaScript module bundler that takes the code from an application and makes it usable in a web browser.  webpack helped us maintain consistency in styling across web browsers and also enhance performance by reducing browser loading times.


### Pre-Login Page 
will display a list of the most recent podcasts and episodes that were added by users, with a button asking you to login:
![Alt Text](https://i.imgur.com/roWMQFB.png)

### Authentication
clicking the login button will take you to the authentication page and ask you to login before you can add your own podcasts
![Alt Text](https://i.imgur.com/EqHMB68.png)

### Login Page
Once you are logged in it will show your GitHub username and will let you add your own podcasts to the page, searching the iTunes database your podcast options are plentiful
![Alt Text](https://i.imgur.com/iHDLuXv.png)

Project Management
https://trello.com/b/RWTaG3hz/listen-hear

Application
https://fsf-po2.herokuapp.com/

GitHub
https://github.com/icn2you/fsf-p02

