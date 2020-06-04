
# Curling Coach
[![jeff-sexton](https://circleci.com/gh/jeff-sexton/curling-coach.svg?style=svg)](https://app.circleci.com/pipelines/github/jeff-sexton/curling-coach)


An app to assist coaching a curling team - Provides an interactive UI to record shot by shot rock positions and record statistics for each shot. Provides animated playback of game progress to discuss strategy with players and shot analytics.

Application is hosted for demonstration purposes: https://secret-stream-22394.herokuapp.com/

Video Demonstration:

https://youtu.be/sFFX88RGneU

## Group Members

* Jeff Sexton - https://github.com/jeff-sexton
* Yasu - https://github.com/yasu71
* Alan Marx - https://github.com/Alan-Marx


## Final Product

!["Main Game View Page"](https://github.com/jeff-sexton/curling-coach/blob/master/docs/Curling%20Coach%20-%20Main%20Game%20View.png?raw=true)


!["Game Dashboard Page"](https://github.com/jeff-sexton/curling-coach/blob/master/docs/Curling%20Coach%20-%20Game%20Dashboard.png?raw=true)


!["Game Stats Page"](https://github.com/jeff-sexton/curling-coach/blob/master/docs/Curling%20Coach%20-%20Stats%20Page.png?raw=true)


## Setup

1. clone repository to local machine 
2. run ```bundle install```
3. run ```yarn install```
4. Configure local or remote instance of PostgreSQL and add connection details to config/database.yml
5. Create database ```rails db:create```
6. Run database migrations ``` bin/rails db:migrate ```
7. Seed database ``` bin/rails db:seed ```
8. Start web pack for live updates during development and initial pack ```bin/webpack-dev-server```
9. Start rails server ``` rails server ```


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
