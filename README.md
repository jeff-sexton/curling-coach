# README

This README would normally document whatever steps are necessary to get the
application up and running.

Things you may want to cover:

* Ruby version

* System dependencies

* Configuration

* Database creation

* Database initialization

* How to run the test suite

* Services (job queues, cache servers, search engines, etc.)

* Deployment instructions

* ...

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



An app to assist coaching a curling team - Provides an interactive UI to record shot by shot rock positions and record statistics for each shot. Provides animated playback of game progress to discuss strategy with players and shot analytics.





# Jungle

A mini e-commerce application built with Rails 4.2 for purposes of learning rails. The core project was inherited from a Lighthouse Labs template.

Added features/fixes inculde:
- Product stock indicators
- Price Formatting
- Admin console dashboard, category and sales pages
- Admin console basic HTTP Authentication
- User login, registration and authentication using bcrypt
- Site wide sales that impact product price
- Completed Order display and order indexing by user
- Static about page
- product inventory updates based on orders

The project has been hosted at https://guarded-meadow-74842.herokuapp.com/ for demonstration purposes.

Note: Admin console is accessable with the default username and password shown in the example .env file.

## Final Product

!["Product Index Page"](https://raw.githubusercontent.com/jeff-sexton/jungle-rails/master/docs/Product_index.png)
!["Cart Page"](https://raw.githubusercontent.com/jeff-sexton/jungle-rails/master/docs/Shopping_cart.png)
!["Checkout with Stripe Integration"](https://raw.githubusercontent.com/jeff-sexton/jungle-rails/master/docs/Stripe_checkout.png)
!["Order Confirmation"](https://raw.githubusercontent.com/jeff-sexton/jungle-rails/master/docs/Order%20Confirmation.png)
!["Admin Dashboard"](https://raw.githubusercontent.com/jeff-sexton/jungle-rails/master/docs/Admin%20Dashboard.png)
!["Add new sale"](https://raw.githubusercontent.com/jeff-sexton/jungle-rails/master/docs/Adding%20Sale.png)
!["Sale Index"](https://raw.githubusercontent.com/jeff-sexton/jungle-rails/master/docs/Sale%20Index.png)
!["Admin Product List"](https://raw.githubusercontent.com/jeff-sexton/jungle-rails/master/docs/Admin%20Product%20List.png)


## Setup

1. Run `bundle install` to install dependencies
2. Create `config/database.yml` by copying `config/database.example.yml`
3. Create `config/secrets.yml` by copying `config/secrets.example.yml`
4. Run `bin/rake db:reset` to create, load and seed db
5. Create .env file based on .env.example
6. Sign up for a Stripe account
7. Put Stripe (test) keys into appropriate .env vars
8. Run `bin/rails s -b 0.0.0.0` to start the server

## Stripe Testing

Use Credit Card # 4111 1111 1111 1111 for testing success scenarios.

More information in their docs: <https://stripe.com/docs/testing#cards>

## Dependencies

* Rails 4.2 [Rails Guide](http://guides.rubyonrails.org/v4.2/)
* PostgreSQL 9.x
* Stripe
* bcrypt
* bootstrap-sass
* font-awesome-rails
* money-rails
* carrierwave
* rmagick

## Development & Testing Dependencies

* capybara
* poltergeist
* database_cleaner
* dotenv-rails
* rspec-rails
* faker

## Possible Future Features

* Email order confirmations
* Product Reviews & Comments 
* Add more interactivce styling to Admin dashboard