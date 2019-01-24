# README

## Configuration

Ruby Version: 2.5.3

Rails Version: 2.5.3

Node Version: 10.15.0

## Setup

Setup the react client from within the `react-client` directory

`cd react-client && npm install`

Setup the rails api from the root directory

`bundle install`

`bundle exec rake db:setup`


## Running the Application

`bundle exec foreman start -f Procfile.dev`

NOTE: Recommended foreman is not in the gemfile, so you may have to install this outside of bundler. 

EX: `gem install foreman`
