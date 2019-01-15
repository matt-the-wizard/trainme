coach = User.create!( username: 'james-clay',
                      password: 'supersecret',
                      password_confirmation: 'supersecret',
                      email: 'jamesclayfitness@gmail.com',
                      name: 'James Clay')

Client.create!(name: 'Ruth Berger', coach: coach)
Client.create!(name: 'Matthew Berger', coach: coach)
