# Curling Coach

An app to assist coaching a curling team - Provides an interactive UI to record shot by shot rock positions and record statistics for each shot. Provides animated playback of game progress to discuss strategy with players and shot analytics.

Application is hosted for demonstration purposes: https://secret-stream-22394.herokuapp.com/


## Final Product

!["Main Game View Page"](https://github.com/jeff-sexton/curling-coach/blob/master/docs/Curling%20Coach%20-%20Main%20Game%20View.png?raw=true)


!["Game Dashboard Page"](https://github.com/jeff-sexton/curling-coach/blob/master/docs/Curling%20Coach%20-%20Game%20Dashboard.png?raw=true)


!["Game Stats Page"](https://github.com/jeff-sexton/curling-coach/blob/master/docs/Curling%20Coach%20-%20Stats%20Page.png?raw=true)


## Setup

1. clone 
2. run ```bundle install```
3. run ```yarn install```
4. run ```yarn update```
5. Create database ```rails db:create```
6. migrate ``` bin/rails db:migrate ```
6. seed ``` bin/rails db:seed ```
7. Start web pack for live updates during development and initial pack ```bin/webpack-dev-server```
6. Start rails server ``` rails server ```


## Dependencies

* React 16.x
* Rails 6.0 [Rails Guide](https://guides.rubyonrails.org/v6.0/)
* PostgreSQL 12.x
* Webpack
* Material UI
* Prettier+
* ESLint
* Axios
* Moment


## Development & Testing Dependencies

* storybook
* rspec-rails


## Possible Future Features

* Add New Games/ Teams/ Players
* Add user login
* Graphs and visualizations for team and player statistics 
* Comprehensive automatic testing 
* Allow a user to specify the target or intention of a shot before it is recorded 
* Rotate rocks based on their rotation attribute during a replay